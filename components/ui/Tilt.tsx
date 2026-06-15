"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionAllowed } from "@/lib/useMotionAllowed";

/**
 * Tilt — premium 3D hover that tilts toward the pointer (+ slight scale).
 * No-op plain div on touch / reduced-motion.
 */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const allowed = useMotionAllowed();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 200, damping: 20, mass: 0.4 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  if (!allowed) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
