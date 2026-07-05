"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WorkCard } from "@/components/WorkCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
import { cases } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Selected Work — pinned horizontal-scroll showcase.
 *
 * Desktop (>=1024px, motion allowed): the section pins and a horizontal
 * track of six case studies scrubs left as you scroll. A slim gradient
 * progress bar under the heading tracks the same scrub, and each card
 * gets a subtle vertical parallax via containerAnimation.
 *
 * Mobile / reduced-motion: no pin, no transforms — the track is a native
 * horizontally-scrollable snap row, fully visible without JS.
 */
export function WorkPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          // Distance the track must travel so the last card lands just
          // inside the right edge (offsetLeft ≈ container margin; +32 pad).
          const distance = () =>
            Math.max(
              0,
              track.scrollWidth - window.innerWidth + track.offsetLeft + 32
            );

          const progress = progressRef.current;
          if (progress) {
            gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
          }

          const scrollTween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => "+=" + distance(),
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progress) gsap.set(progress, { scaleX: self.progress });
              },
            },
          });

          // Subtle per-card vertical parallax, driven by the horizontal scrub.
          gsap.utils
            .toArray<HTMLElement>("[data-card-inner]", track)
            .forEach((inner, i) => {
              gsap.fromTo(
                inner,
                { yPercent: i % 2 === 0 ? 2.5 : -2.5 },
                {
                  yPercent: i % 2 === 0 ? -2.5 : 2.5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: inner,
                    containerAnimation: scrollTween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                }
              );
            });
        }
      );

      // Recalculate measurements once all images have loaded.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-24 sm:py-32"
      >
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Proof, not <span className="text-gradient">prototypes.</span>
                </>
              }
              intro="A few of the outcomes we've shipped. Every project is built to reach production — and to be owned by the team that runs it."
            />
            <Reveal delay={0.1}>
              <Button href="/work" variant="outline" arrow className="shine">
                All case studies
              </Button>
            </Reveal>
          </div>

          {/* Scrub progress bar (desktop pinned mode only) */}
          <div
            aria-hidden
            className="mt-8 hidden h-0.5 w-full overflow-hidden rounded-full bg-line lg:block"
          >
            <div ref={progressRef} className="bg-grad h-full w-full" />
          </div>
        </div>

        {/* Horizontal track: native snap-scroll row on small screens,
            GSAP-translated (overflow visible) when pinned on desktop. */}
        <div
          ref={trackRef}
          className="container-x mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:snap-none lg:overflow-visible lg:pb-0 lg:will-change-transform"
        >
          {cases.slice(0, 6).map((item, i) => (
            <div
              key={item.slug}
              data-card
              className="w-[clamp(280px,85vw,420px)] shrink-0 snap-start lg:w-[clamp(320px,38vw,460px)] lg:snap-align-none"
            >
              <div data-card-inner className="h-full">
                <Reveal className="h-full" delay={(i % 3) * 0.06}>
                  <Tilt className="h-full" max={4}>
                    <WorkCard item={item} />
                  </Tilt>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SectionDivider className="container-x" />
    </>
  );
}
