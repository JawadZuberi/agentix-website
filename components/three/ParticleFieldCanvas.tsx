"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The three / @react-three/fiber half of ParticleField, isolated so it can be
 * pulled in via next/dynamic({ ssr: false }) — three then downloads only when
 * the atmospheric field is actually mounted (desktop + WebGL), never in the
 * first-load JS of every page.
 */

const COUNT = 160;

// Module-scoped input state — written by cheap passive listeners, read once per
// frame inside useFrame. No React state, no re-renders.
let scrollProgress = 0; // 0..1 across the document
let pointerX = 0; // -1..1 from viewport centre
let pointerY = 0; // -1..1 from viewport centre

/** Brand palette, biased toward indigo/purple, desaturated + darkened slightly
 *  so points stay legible on the light #f6f5f2 background with NormalBlending. */
function buildAttributes() {
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const palette = ["#2e3192", "#2e3192", "#7a2e8f", "#7a2e8f", "#e2542c"];
  const neutral = new THREE.Color("#44424d");
  const tmp = new THREE.Color();
  for (let i = 0; i < COUNT; i++) {
    // Wide, shallow box so the field reads as an atmospheric plane behind content.
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    tmp.set(palette[Math.floor(Math.random() * palette.length)]);
    tmp.lerp(neutral, 0.3); // lower saturation
    tmp.multiplyScalar(0.8); // darken for the light background
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  return { positions, colors };
}

function Particles() {
  // Outer group: scroll parallax + pointer tilt. Inner group: slow drift + bob.
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  const { positions, colors } = useMemo(buildAttributes, []);

  useFrame((_, delta) => {
    const o = outer.current;
    const g = inner.current;
    if (!o || !g) return;
    const dt = Math.min(delta, 0.1); // guard against tab-switch delta spikes
    elapsed.current += dt;

    // Collective slow drift + gentle sine bob on the whole group.
    g.rotation.y += dt * 0.015;
    g.position.y = Math.sin(elapsed.current * 0.3) * 0.08;

    // Scroll parallax: +0.4 (top) -> -0.4 (bottom), smoothed.
    const k = Math.min(1, dt * 3);
    const targetY = THREE.MathUtils.lerp(0.4, -0.4, scrollProgress);
    o.position.y += (targetY - o.position.y) * k;

    // Mouse parallax: tilt toward the pointer, capped at ±0.05 rad.
    o.rotation.x += (pointerY * 0.05 - o.rotation.x) * k;
    o.rotation.y += (pointerX * 0.05 - o.rotation.y) * k;
  });

  return (
    <group ref={outer}>
      <group ref={inner}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            sizeAttenuation
            vertexColors
            transparent
            opacity={0.55}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
}

export function ParticleFieldCanvas() {
  // Passive scroll/pointer listeners live here so they only exist while the
  // field is mounted; cleaned up on unmount.
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.25]}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      <Particles />
    </Canvas>
  );
}
