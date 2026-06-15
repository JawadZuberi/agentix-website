"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) mesh.current.rotation.y = state.clock.elapsedTime * 0.12;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} scale={2.2}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#7a2e8f"
          emissive="#2e3192"
          emissiveIntensity={0.2}
          roughness={0.25}
          metalness={0.6}
          distort={0.38}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/** Self-contained background accent. Drop into a section as a dynamic import. */
export default function DistortBlob() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#e2542c" />
      <pointLight position={[-5, -2, 3]} intensity={1.5} color="#5b6cff" />
      <Blob />
    </Canvas>
  );
}
