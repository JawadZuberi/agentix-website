"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Shape = { kind: "ico" | "torus" | "octa"; pos: [number, number, number]; scale: number; color: string };

const SHAPES: Shape[] = [
  { kind: "ico", pos: [-3, 1.4, 0], scale: 0.6, color: "#5b6cff" },
  { kind: "torus", pos: [3.2, -1, -1], scale: 0.55, color: "#e2542c" },
  { kind: "octa", pos: [2, 1.8, -2], scale: 0.5, color: "#a23bbf" },
  { kind: "ico", pos: [-2.6, -1.6, -1], scale: 0.4, color: "#c0392b" },
];

function Geo({ shape }: { shape: Shape }) {
  const ref = useRef<THREE.Mesh>(null);
  const spin = useMemo(() => 0.1 + Math.random() * 0.2, []);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * spin;
    ref.current.rotation.y = s.clock.elapsedTime * spin * 1.3;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={ref} position={shape.pos} scale={shape.scale}>
        {shape.kind === "ico" && <icosahedronGeometry args={[1, 0]} />}
        {shape.kind === "torus" && <torusKnotGeometry args={[0.7, 0.25, 80, 16]} />}
        {shape.kind === "octa" && <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={shape.color}
          emissive={shape.color}
          emissiveIntensity={0.18}
          roughness={0.3}
          metalness={0.5}
          wireframe={shape.kind === "octa"}
        />
      </mesh>
    </Float>
  );
}

/** Scattered floating geometry — ambient accent layer for sections. */
export default function FloatingGeo() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      {SHAPES.map((s, i) => (
        <Geo key={i} shape={s} />
      ))}
    </Canvas>
  );
}
