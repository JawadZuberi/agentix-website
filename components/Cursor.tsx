"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionAllowed } from "@/lib/useMotionAllowed";

/**
 * Custom cursor: a precise dot + a lagging ring that grows over interactive
 * elements (a, button, [data-cursor]). Hides the native cursor while active.
 * Disabled on touch / reduced-motion.
 */
export function Cursor() {
  const allowed = useMotionAllowed();
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

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

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x, y, scale: down ? 0.6 : 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
}
