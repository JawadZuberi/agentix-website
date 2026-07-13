"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Icon } from "@/components/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/AnimatedText";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Per-card accent, cycling through the brand palette. */
const accents = ["#2e3192", "#4448c7", "#7a2e8f", "#a8329a", "#c0392b", "#e2542c"];

/**
 * Stacked-deck services: on desktop each service is a full-size sticky card.
 * Scrolling brings the next card up OVER the current one while the covered
 * card recedes (scales down, dims) — one service in focus at a time.
 * Mobile / reduced-motion: a plain stacked list (no sticky, no transforms).
 */
export function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-stack-card]",
            rootRef.current
          );
          cards.forEach((card, i) => {
            const next = cards[i + 1];
            if (!next) return;
            // Pile-of-books: as the NEXT card travels up, this card is pushed
            // back into the pile — it scales down from its top edge but stays
            // fully opaque (a solid layer), its top edge left peeking above
            // the incoming card thanks to the cascading sticky offsets.
            gsap.to(card, {
              scale: 0.95,
              transformOrigin: "center top",
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top 20%",
                scrub: true,
              },
            });
          });
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      id="services"
      ref={rootRef}
      className="bg-aurora relative py-24 sm:py-32"
    >

      <div className="container-x">
        {/* Heading */}
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
            <h2 className="display mt-5 text-balance text-4xl font-bold sm:text-5xl">
              <AnimatedText text="Services We " as="span" />
              <span className="text-gradient">
                <AnimatedText text="Offer" as="span" delay={0.12} />
              </span>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                From AI automation and AI agent development to custom software,
                websites, mobile apps, SaaS platforms, CRMs, dashboards, and
                digital growth — one partner for the systems your business runs
                on.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button href="/services" variant="outline" arrow>
              All services
            </Button>
          </Reveal>
        </div>

        {/* Stacked deck — ALL cards share this one parent, so each card stays
            stuck at its offset until the whole deck completes: earlier cards
            pile up behind the incoming ones like a stack of books. */}
        <div className="mt-14">
          {services.map((s, i) => {
            const accent = accents[i % accents.length];
            const num = String(i + 1).padStart(2, "0");
            return (
                <article
                  key={s.slug}
                  data-stack-card
                  className="relative mb-5 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_24px_80px_-40px_rgba(11,11,16,0.18)] last:mb-0 lg:sticky lg:mb-[18vh] lg:flex lg:min-h-[68vh] lg:flex-col lg:justify-center"
                  style={{ top: `calc(5.5rem + ${i * 14}px)`, zIndex: i + 1 }}
                >
                  {/* opaque base + per-card accent wash */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(90% 120% at 85% 0%, ${accent}14, transparent 55%)`,
                    }}
                  />

                  <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-14">
                    {/* LEFT: the pitch */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-4">
                        <span className="grid size-12 place-items-center rounded-2xl bg-grad text-white shadow-[0_10px_30px_-12px_#7a2e8f]">
                          <Icon name={s.icon} className="size-6" />
                        </span>
                        <span className="display text-sm font-bold tracking-widest text-faint">
                          {num} / {String(services.length).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="display mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-lg font-medium text-gradient">
                        {s.tagline}
                      </p>
                      <p className="mt-4 max-w-xl leading-relaxed text-muted">
                        {s.description}
                      </p>

                      <div className="mt-8">
                        <Button href={`/services/${s.slug}`} arrow data-cursor>
                          {s.cta}
                        </Button>
                      </div>
                    </div>

                    {/* RIGHT: what's inside */}
                    <div
                      className="flex flex-col justify-center rounded-2xl border border-line p-6 sm:p-8"
                      style={{
                        background: `linear-gradient(160deg, ${accent}0d, transparent 70%)`,
                      }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                        Includes
                      </p>
                      <ul className="mt-4 space-y-3.5">
                        {s.includes.slice(0, 4).map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              className="mt-1.5 size-2 shrink-0 rotate-45 rounded-[2px]"
                              style={{ background: accent }}
                            />
                            <span className="text-sm leading-relaxed text-fg sm:text-base">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                        <span className="font-semibold text-fg">Best for: </span>
                        {s.bestFor}
                      </p>
                    </div>
                  </div>
                </article>
            );
          })}
        </div>

        <SectionDivider className="mt-20" />
      </div>
    </section>
  );
}
