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
    const html = document.documentElement;

    // Hide the native cursor ONLY once our dot has a real on-screen position
    // (the first mousemove). Until then the native cursor stays visible, so
    // there is never a moment with no cursor at all. Any failure removes the
    // class so the native cursor can never be permanently lost.
    let activated = false;
    const activate = () => {
      if (activated) return;
      try {
        html.classList.add("custom-cursor");
        activated = true;
      } catch {
        try {
          html.classList.remove("custom-cursor");
        } catch {
          /* noop */
        }
      }
    };

    // Track last-dispatched values so we only setState when they actually
    // change — mousemove fires on every pixel, but hover/label rarely flip.
    let lastHovering = false;
    let lastLabelSent: string | null = null;

    const move = (e: MouseEvent) => {
      try {
        x.set(e.clientX);
        y.set(e.clientY);
        // Position is set — now it is safe to swap in the custom cursor.
        activate();

        const el = e.target as HTMLElement | null;
        const nextHovering = !!el?.closest(
          "a, button, [data-cursor], input, textarea, select"
        );
        if (nextHovering !== lastHovering) {
          lastHovering = nextHovering;
          setHovering(nextHovering);
        }

        const labelled = el?.closest<HTMLElement>("[data-cursor-label]");
        const next = labelled?.getAttribute("data-cursor-label") || null;
        if (next !== lastLabelSent) {
          lastLabelSent = next;
          setLabel(next);
          if (next) setLastLabel(next);
        }
      } catch {
        // Something in the DOM probing failed — never strand the user without
        // a cursor.
        try {
          html.classList.remove("custom-cursor");
        } catch {
          /* noop */
        }
      }
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", dn, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });
    return () => {
      html.classList.remove("custom-cursor");
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
