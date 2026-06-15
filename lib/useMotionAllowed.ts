"use client";

import { useEffect, useState } from "react";

/** True when rich motion should run: not reduced-motion and not a touch device. */
export function useMotionAllowed() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const touch = window.matchMedia("(pointer: coarse)").matches;
      setAllowed(!reduce && !touch);
    };
    evaluate();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener?.("change", evaluate);
    return () => mq.removeEventListener?.("change", evaluate);
  }, []);

  return allowed;
}
