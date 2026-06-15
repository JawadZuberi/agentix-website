"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createElement, type ElementType } from "react";

/**
 * Mask-reveal heading: splits into words (or chars) that rise from behind a
 * clip on scroll-in. Falls back to plain text under reduced-motion.
 */
export function AnimatedText({
  text,
  as = "span",
  by = "word",
  className,
  delay = 0,
  stagger = 0.04,
  once = true,
}: {
  text: string;
  as?: ElementType;
  by?: "word" | "char";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return createElement(as, { className }, text);

  const units = by === "char" ? [...text] : text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return createElement(
    motion[as as "span"] ?? motion.span,
    {
      className,
      variants: container,
      initial: "hidden",
      whileInView: "show",
      viewport: { once, margin: "-12% 0px" },
      "aria-label": text,
    },
    units.map((u, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="inline-flex overflow-hidden align-bottom"
        style={{ paddingBottom: "0.06em", marginBottom: "-0.06em" }}
      >
        <motion.span variants={child} className="inline-block will-change-transform">
          {u === " " ? " " : u}
        </motion.span>
        {by === "word" && i < units.length - 1 ? " " : null}
      </span>
    ))
  );
}
