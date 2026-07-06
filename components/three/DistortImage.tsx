"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useWebGLEnabled } from "@/lib/useWebGLEnabled";

/**
 * DistortImage — hover displacement shader for work-card photos.
 *
 * Renders a plain <img> at all times (zero cost, zero regression path). On
 * mouse enter — desktop + WebGL only — an absolutely-positioned R3F canvas
 * mounts over the image and ripples it with a tiny custom shader (+ subtle
 * RGB shift toward the pointer). On leave the effect fades out and the canvas
 * unmounts shortly after, so idle cards cost nothing.
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

function DistortPlane({ uniforms }: { uniforms: DistortUniforms }) {
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
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

export function DistortImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const webglEnabled = useWebGLEnabled();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasMounted, setCanvasMounted] = useState(false);

  // Shared mutable state that survives canvas mount/unmount cycles.
  const uniformsRef = useRef<DistortUniforms | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const loadingRef = useRef(false);
  const failedRef = useRef(false);
  const hoveredRef = useRef(false);
  const disposedRef = useRef(false);
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getUniforms = (): DistortUniforms => {
    if (!uniformsRef.current) {
      uniformsRef.current = {
        uTexture: { value: null },
        uHover: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 },
        uUvScale: { value: new THREE.Vector2(1, 1) },
      };
    }
    return uniformsRef.current;
  };

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
    const scale = getUniforms().uUvScale.value;
    if (containerAspect > imageAspect) {
      scale.set(1, imageAspect / containerAspect);
    } else {
      scale.set(containerAspect / imageAspect, 1);
    }
  };

  const show = () => {
    if (disposedRef.current || !textureRef.current) return;
    if (unmountTimerRef.current !== null) {
      clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
    const uniforms = getUniforms();
    uniforms.uTexture.value = textureRef.current;
    applyCover();
    setCanvasMounted(true);
    gsap.killTweensOf(uniforms.uHover);
    gsap.to(uniforms.uHover, { value: 1, duration: 0.6, ease: "power2.out" });
  };

  const handleEnter = () => {
    hoveredRef.current = true;
    if (!webglEnabled || failedRef.current) return;

    if (textureRef.current) {
      show();
      return;
    }
    if (loadingRef.current) return;

    loadingRef.current = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      src,
      (texture) => {
        loadingRef.current = false;
        if (disposedRef.current) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        textureRef.current = texture;
        // Only reveal if the pointer is still over the card.
        if (hoveredRef.current) show();
      },
      undefined,
      () => {
        // Load failed — never mount the canvas; the plain <img> stays.
        loadingRef.current = false;
        failedRef.current = true;
      },
    );
  };

  const handleLeave = () => {
    hoveredRef.current = false;
    const uniforms = uniformsRef.current;
    if (!uniforms) return;
    gsap.killTweensOf(uniforms.uHover);
    gsap.to(uniforms.uHover, {
      value: 0,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        // Let the settled frame sit briefly, then drop the canvas entirely.
        unmountTimerRef.current = setTimeout(() => {
          unmountTimerRef.current = null;
          setCanvasMounted(false);
        }, 400);
      },
    });
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    const uniforms = uniformsRef.current;
    if (!el || !uniforms) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    uniforms.uMouse.value.set(
      (e.clientX - rect.left) / rect.width,
      1 - (e.clientY - rect.top) / rect.height, // flip Y into UV space
    );
  };

  // Full teardown when the card unmounts.
  useEffect(() => {
    disposedRef.current = false;
    return () => {
      disposedRef.current = true;
      if (unmountTimerRef.current !== null) {
        clearTimeout(unmountTimerRef.current);
        unmountTimerRef.current = null;
      }
      if (uniformsRef.current) gsap.killTweensOf(uniformsRef.current.uHover);
      textureRef.current?.dispose();
      textureRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className ? `relative ${className}` : "relative"}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      {/* Always-rendered fallback — the canvas simply overlays it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {canvasMounted && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Canvas
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
            camera={{ position: [0, 0, 5], fov: 45 }}
          >
            <DistortPlane uniforms={getUniforms()} />
          </Canvas>
        </div>
      )}
    </div>
  );
}
