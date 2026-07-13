"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionAllowed } from "@/lib/useMotionAllowed";

/**
 * Custom cursor: a precise dot + a lagging ring that grows over interactive
 * elements (a, button, [data-cursor]). When the hovered element (or an
 * ancestor) carries data-cursor-label, the ring morphs into a solid labeled
 * pill ("View", "Drag", …) rendered without mix-blend-difference so the text
 * stays readable on any background. Hides the native cursor while active.
 * Disabled on touch / reduced-motion.
 */
export function Cursor() {
  const allowed = useMotionAllowed();
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  // Keeps the last label text mounted while the pill fades/scales out.
  const [lastLabel, setLastLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!allowed) return;
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [data-cursor], input, textarea, select"));
      const labelled = el.closest<HTMLElement>("[data-cursor-label]");
      const next = labelled?.getAttribute("data-cursor-label") || null;
      setLabel(next);
      if (next) setLastLabel(next);
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [allowed, x, y]);

  if (!allowed) return null;

  const labelActive = !!label;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x, y, scale: down ? 0.6 : 1 }}
        animate={{ opacity: labelActive ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          opacity: labelActive ? 0 : hovering ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
      {/* Labeled pill — separate element WITHOUT mix-blend-difference so the
          text stays readable on the light bg and over images alike. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-16 min-w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full bg-fg px-5 text-[11px] font-semibold uppercase tracking-wide text-bg"
        style={{ x: ringX, y: ringY }}
        initial={false}
        animate={{
          opacity: labelActive ? 1 : 0,
          scale: labelActive ? (down ? 0.9 : 1) : 0.35,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {lastLabel}
      </motion.div>
    </>
  );
}
