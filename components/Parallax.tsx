"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Wraps decorative content and translates it as it scrolls through the
 * viewport. Positive `speed` moves slower-than-scroll (recedes); negative
 * moves faster. No-op under reduced-motion.
 */
export function Parallax({
  children,
  speed = 0.25,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 120}px`, `${speed * -120}px`]
  );

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
