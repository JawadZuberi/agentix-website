"use client";

import dynamic from "next/dynamic";
import { useWebGLEnabled } from "@/lib/useWebGLEnabled";

// Client-only 3D accent (three.js must not SSR).
const DistortBlob = dynamic(() => import("./DistortBlob"), { ssr: false });

/**
 * Drop-in section accent. Renders the distortion blob on capable devices,
 * and a soft static gradient glow otherwise. Safe to use from server pages.
 */
export default function SectionBlob() {
  const webgl = useWebGLEnabled();
  if (!webgl) {
    return (
      <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
        <div className="animate-float size-3/4 rounded-full bg-grad opacity-20 blur-3xl" />
      </div>
    );
  }
  return <DistortBlob />;
}
