"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

/**
 * DistortCanvas — the WebGL half of DistortImage, isolated into its own module
 * so three / @react-three/fiber are code-split out of the first-load bundle and
 * only downloaded when a card is actually hovered (via next/dynamic in the
 * parent). Mounts on hover, disposes texture + material on unmount.
 */

type DistortUniforms = {
  uTexture: { value: THREE.Texture | null };
  uHover: { value: number };
  uMouse: { value: THREE.Vector2 };
  uTime: { value: number };
  /** object-fit: cover crop factor (container aspect vs texture aspect). */
  uUvScale: { value: THREE.Vector2 };
};

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uUvScale;
  varying vec2 vUv;

  void main() {
    // object-fit: cover — crop the texture to the container's aspect.
    vec2 uv = (vUv - 0.5) * uUvScale + 0.5;

    // Gentle ripple driven by hover strength, time and pointer position.
    vec2 ripple = uHover * 0.03 * vec2(
      sin(uv.y * 12.0 + uTime * 2.0 + uMouse.x * 3.0),
      cos(uv.x * 12.0 + uTime * 2.0 + uMouse.y * 3.0)
    );
    vec2 duv = uv + ripple;

    // Subtle RGB shift along the pointer direction (guard against zero-length).
    vec2 m = uMouse - 0.5;
    vec2 dir = m / max(length(m), 0.001);
    float shift = uHover * 0.006;

    float r = texture2D(uTexture, duv + dir * shift).r;
    float g = texture2D(uTexture, duv).g;
    float b = texture2D(uTexture, duv - dir * shift).b;

    gl_FragColor = vec4(r, g, b, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function DistortPlane({
  uniforms,
  pointerRef,
}: {
  uniforms: DistortUniforms;
  pointerRef: React.RefObject<{ x: number; y: number }>;
}) {
  const { viewport } = useThree();

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    [uniforms],
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    const p = pointerRef.current;
    if (p) uniforms.uMouse.value.set(p.x, p.y);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

export function DistortCanvas({
  src,
  hovered,
  pointerRef,
  containerRef,
  onLoadError,
}: {
  src: string;
  hovered: boolean;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onLoadError?: () => void;
}) {
  const uniforms = useMemo<DistortUniforms>(
    () => ({
      uTexture: { value: null },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uUvScale: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  const textureRef = useRef<THREE.Texture | null>(null);
  const readyRef = useRef(false);
  // Track the latest hover state without re-running the load effect.
  const hoveredRef = useRef(hovered);
  hoveredRef.current = hovered;
  const onLoadErrorRef = useRef(onLoadError);
  onLoadErrorRef.current = onLoadError;

  /** Recompute the cover crop from container aspect vs texture aspect. */
  const applyCover = () => {
    const tex = textureRef.current;
    const el = containerRef.current;
    if (!tex || !el) return;
    const img = tex.image as { width?: number; height?: number } | undefined;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height || !img?.width || !img?.height) return;
    const containerAspect = rect.width / rect.height;
    const imageAspect = img.width / img.height;
    const scale = uniforms.uUvScale.value;
    if (containerAspect > imageAspect) {
      scale.set(1, imageAspect / containerAspect);
    } else {
      scale.set(containerAspect / imageAspect, 1);
    }
  };

  // Load the texture when the canvas mounts (i.e. on hover). Dispose on unmount.
  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      src,
      (texture) => {
        if (cancelled) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        textureRef.current = texture;
        uniforms.uTexture.value = texture;
        readyRef.current = true;
        applyCover();
        // Reveal only if the pointer is still over the card.
        if (hoveredRef.current) {
          gsap.killTweensOf(uniforms.uHover);
          gsap.to(uniforms.uHover, {
            value: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      },
      undefined,
      () => {
        // Load failed — tell the parent so the plain image simply stays.
        if (!cancelled) onLoadErrorRef.current?.();
      },
    );

    return () => {
      cancelled = true;
      gsap.killTweensOf(uniforms.uHover);
      textureRef.current?.dispose();
      textureRef.current = null;
      readyRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Fade the ripple in/out as the hover prop changes (once the texture is up).
  useEffect(() => {
    if (!readyRef.current) return; // first reveal is handled on load
    gsap.killTweensOf(uniforms.uHover);
    gsap.to(uniforms.uHover, {
      value: hovered ? 1 : 0,
      duration: hovered ? 0.6 : 0.45,
      ease: "power2.out",
    });
  }, [hovered, uniforms]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <DistortPlane uniforms={uniforms} pointerRef={pointerRef} />
    </Canvas>
  );
}
