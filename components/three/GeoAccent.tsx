"use client";

import dynamic from "next/dynamic";
import { useWebGLEnabled } from "@/lib/useWebGLEnabled";

const FloatingGeo = dynamic(() => import("./FloatingGeo"), { ssr: false });

/** Ambient floating-geometry layer. Renders nothing on low-power/reduced-motion. */
export default function GeoAccent() {
  const webgl = useWebGLEnabled();
  if (!webgl) return null;
  return <FloatingGeo />;
}
