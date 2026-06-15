"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether to mount the heavy WebGL hero. Returns false on the server,
 * for users who prefer reduced motion, and on small/low-power screens — those
 * get the lightweight CSS fallback instead. Re-evaluates on resize.
 */
export function useWebGLEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.matchMedia("(max-width: 767px)").matches;
      const cores = navigator.hardwareConcurrency ?? 8;
      // Confirm a WebGL context is actually obtainable before committing.
      let webglOk = true;
      try {
        const c = document.createElement("canvas");
        webglOk = !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        webglOk = false;
      }
      setEnabled(!reduce && !small && cores >= 2 && webglOk);
    };
    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  return enabled;
}
