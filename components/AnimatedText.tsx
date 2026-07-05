"use client";

import { createElement, useRef, type ElementType } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Mask-reveal heading powered by GSAP SplitText: glyphs rise from behind a
 * line mask when the element scrolls into view.
 *
 * - Server renders the plain, unsplit text (SSR/SEO-safe, no hydration
 *   mismatch); splitting happens on mount inside useGSAP.
 * - Reduced-motion users get the plain text with no split or animation.
 * - `.text-gradient` headings are split by word with each word span carrying
 *   the gradient class itself, since background-clip gradients break when the
 *   painted text is moved out of the parent's background area.
 */
export function AnimatedText({
  text,
  as = "span",
  by = "word",
  className,
  delay = 0,
  stagger,
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
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;

      // Reduced motion: leave the plain server-rendered text untouched.
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // Gradient text: background-clip gradients break on transformed child
      // spans, so force word-splitting and give each word the gradient class.
      const isGradient = (className ?? "").includes("text-gradient");
      const mode: "word" | "char" = isGradient ? "word" : by;

      let split: SplitText | null = null;
      let cancelled = false;

      const build = contextSafe(() => {
        // Guard against double-splitting on fast remounts / late font resolve.
        if (cancelled || split || !ref.current) return;

        split = new SplitText(el, {
          type: mode === "char" ? "chars,words,lines" : "words,lines",
          mask: "lines",
          linesClass: "at-line",
          wordsClass: isGradient ? "text-gradient" : "at-word",
          charsClass: "at-char",
          aria: "none", // we set aria-label on the element ourselves
        });

        const targets = mode === "char" ? split.chars : split.words;
        if (!targets || targets.length === 0) return;

        gsap.from(targets, {
          yPercent: 115,
          rotation: mode === "char" ? 6 : 3,
          // Chars stay opaque behind the mask; words also fade in.
          opacity: mode === "char" ? 1 : 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: stagger ?? (mode === "char" ? 0.018 : 0.05),
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: once !== false,
          },
        });
      });

      // Split after webfonts resolve to avoid mid-animation reflow; fall back
      // to splitting immediately if the Font Loading API is unavailable.
      if (typeof document !== "undefined" && document.fonts) {
        if (document.fonts.status === "loaded") {
          build();
        } else {
          document.fonts.ready.then(build).catch(build);
        }
      } else {
        build();
      }

      return () => {
        cancelled = true;
        split?.revert();
        split = null;
      };
    },
    { scope: ref, dependencies: [] }
  );

  return createElement(
    as,
    { ref, className, "aria-label": text } as Record<string, unknown>,
    text
  );
}
