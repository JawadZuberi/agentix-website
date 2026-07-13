"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useWebGLEnabled } from "@/lib/useWebGLEnabled";

/**
 * DistortImage — hover displacement shader for work-card photos.
 *
 * The visible layer is a responsive next/image that always renders (zero-cost,
 * zero-regression path). On mouse enter — desktop + WebGL only — a lazily
 * downloaded R3F canvas (see ./DistortCanvas) mounts over it and ripples the
 * photo. On leave the effect fades and the canvas unmounts shortly after, so
 * three / r3f are code-split out of first-load JS and idle cards cost nothing.
 *
 * Concurrency guard: a module-level "active" slot ensures only ONE distortion
 * canvas (one WebGL context) is mounted at a time, so rapid hover across the
 * work grid does not churn many contexts.
 */

// three / @react-three/fiber live here and only download when a card is hovered.
const DistortCanvas = dynamic(
  () => import("./DistortCanvas").then((m) => m.DistortCanvas),
  { ssr: false },
);

// Module-level single-active-context registry.
let INSTANCE_COUNTER = 0;
let ACTIVE: { id: number; deactivate: () => void } | null = null;

export function DistortImage({
  src,
  alt,
  className,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const webglEnabled = useWebGLEnabled();
  const containerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const hoveredRef = useRef(false);
  const failedRef = useRef(false);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable per-instance id for the active-context registry.
  const idRef = useRef(0);
  if (idRef.current === 0) idRef.current = ++INSTANCE_COUNTER;

  // Immediately tear the canvas down — used both on leave-timeout and when a
  // different card claims the single active slot.
  const forceUnmount = useCallback(() => {
    if (unmountTimerRef.current !== null) {
      clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
    hoveredRef.current = false;
    setHovered(false);
    setMounted(false);
  }, []);

  const releaseActive = useCallback(() => {
    if (ACTIVE && ACTIVE.id === idRef.current) ACTIVE = null;
  }, []);

  const handleEnter = () => {
    hoveredRef.current = true;
    if (!webglEnabled || failedRef.current) return;

    if (unmountTimerRef.current !== null) {
      clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
    // Claim the single active slot, evicting whatever card held it before.
    if (ACTIVE && ACTIVE.id !== idRef.current) ACTIVE.deactivate();
    ACTIVE = { id: idRef.current, deactivate: forceUnmount };

    setMounted(true);
    setHovered(true);
  };

  const handleLeave = () => {
    hoveredRef.current = false;
    setHovered(false);
    if (unmountTimerRef.current !== null) clearTimeout(unmountTimerRef.current);
    // Let the fade-out settle, then drop the canvas (and its WebGL context).
    unmountTimerRef.current = setTimeout(() => {
      unmountTimerRef.current = null;
      setMounted(false);
      releaseActive();
    }, 700);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerRef.current.x = (e.clientX - rect.left) / rect.width;
    pointerRef.current.y = 1 - (e.clientY - rect.top) / rect.height; // flip Y into UV space
  };

  const handleLoadError = useCallback(() => {
    failedRef.current = true;
    forceUnmount();
    releaseActive();
  }, [forceUnmount, releaseActive]);

  // Full teardown when the card unmounts.
  useEffect(() => {
    return () => {
      if (unmountTimerRef.current !== null) {
        clearTimeout(unmountTimerRef.current);
        unmountTimerRef.current = null;
      }
      if (ACTIVE && ACTIVE.id === idRef.current) ACTIVE = null;
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
      {/* Always-rendered responsive fallback — the canvas simply overlays it. */}
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      {mounted && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <DistortCanvas
            src={src}
            hovered={hovered}
            pointerRef={pointerRef}
            containerRef={containerRef}
            onLoadError={handleLoadError}
          />
        </div>
      )}
    </div>
  );
}
