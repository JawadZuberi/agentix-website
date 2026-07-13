"use client";

import dynamic from "next/dynamic";
import { useWebGLEnabled } from "@/lib/useWebGLEnabled";

/**
 * Persistent ultra-light particle background: one fixed, page-wide atmospheric
 * layer (~160 points, single draw call). Gated to desktop + no-reduced-motion
 * via useWebGLEnabled; renders nothing otherwise (and nothing on the server).
 *
 * This wrapper is intentionally three-free so it stays out of the first-load
 * bundle even though it is statically imported in the root layout. The heavy
 * three / r3f canvas is pulled in via next/dynamic({ ssr: false }) only when
 * the field is actually enabled.
 */

const ParticleFieldCanvas = dynamic(
  () => import("./ParticleFieldCanvas").then((m) => m.ParticleFieldCanvas),
  { ssr: false },
);

export function ParticleField() {
  const enabled = useWebGLEnabled();

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none opacity-50"
    >
      <ParticleFieldCanvas />
    </div>
  );
}
