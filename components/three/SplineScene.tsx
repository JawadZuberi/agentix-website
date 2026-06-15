"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { useWebGLEnabled } from "@/lib/useWebGLEnabled";

// Spline runtime is heavy and WebGL-only — load it client-side, lazily.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

/** Soft brand-gradient glow used while loading and as the low-power fallback. */
function Glow() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="animate-float size-3/4 rounded-full bg-grad opacity-20 blur-3xl" />
    </div>
  );
}

/**
 * Embeds a Spline scene. Renders the live 3D scene on capable devices and a
 * soft gradient glow on low-power / reduced-motion (keeps the page fast).
 */
export default function SplineScene({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const webgl = useWebGLEnabled();
  const [loaded, setLoaded] = useState(false);

  if (!webgl) {
    return (
      <div className={className}>
        <Glow />
      </div>
    );
  }

  return (
    <div className={`${className ?? ""} overflow-hidden`}>
      {!loaded && <Glow />}
      {/* Render the scene taller than the frame and clip the bottom, so the
          free-tier "Built with Spline" badge (drawn at the canvas bottom) is
          cut off — without an opaque mask that would block the background glow. */}
      <div className="absolute inset-x-0 top-0" style={{ height: "calc(100% + 80px)" }}>
        <Suspense fallback={<Glow />}>
          <Spline
            scene={url}
            onLoad={(spline) => {
              // Make the scene's baked background transparent so only the
              // 3D object shows over the page.
              (spline as unknown as {
                setBackgroundColor?: (c: string) => void;
              }).setBackgroundColor?.("transparent");
              setLoaded(true);
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </div>
    </div>
  );
}
