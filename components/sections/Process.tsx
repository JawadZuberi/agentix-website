"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Aurora } from "@/components/ui/Aurora";
import { process } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scrollytelling process section: a vertical gradient line "fills" as you
 * scroll through the steps, and each step fades/slides in. Falls back to a
 * static layout under prefers-reduced-motion (GSAP no-ops there).
 */
export function Process() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.to(".process-line-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-list",
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 82%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" ref={root}>
      {/* Ambient brand aurora behind the whole process band */}
      <Aurora className="absolute inset-0 -z-10" intensity="soft" />
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: sticky heading column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="How we work"
            title={
              <>
                From audit to <span className="text-gradient">autonomous.</span>
              </>
            }
            intro="A tight, outcome-first process. We find where AI actually pays off, design the system, ship it to production, then scale what works."
          />
        </div>

        {/* RIGHT: scrolling steps */}
        <div className="process-list relative pl-10 sm:pl-16">
          {/* progress rail */}
          <div className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-6">
            <div className="process-line-fill h-full w-full origin-top scale-y-0 bg-grad" />
          </div>

          <div className="space-y-12">
            {process.map((step) => (
              <div key={step.n} className="process-step group relative">
                <span className="absolute -left-10 top-1 grid size-6 place-items-center rounded-full bg-grad text-[0.65rem] font-bold text-white shadow-[0_8px_24px_-10px_rgba(46,49,146,0.6)] transition-transform duration-500 group-hover:scale-110 sm:-left-16 sm:size-8 sm:text-xs">
                  {step.n}
                </span>
                <h3 className="display text-2xl font-semibold sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
