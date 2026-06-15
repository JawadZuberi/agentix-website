"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Lightweight scroll-reveal used across the site for UI-level motion.
 * (Heavier scrollytelling / pinning is handled by GSAP in ScrollStory.)
 * Respects prefers-reduced-motion automatically.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
