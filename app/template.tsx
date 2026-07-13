"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Re-mounts on every navigation, so this enter animation plays per route:
 * a subtle fade-and-rise reveal. Under reduced-motion it renders children directly.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
