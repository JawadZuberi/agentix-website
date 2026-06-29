"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/Magnetic";
import { AnimatedText } from "@/components/AnimatedText";
import { Counter } from "@/components/Counter";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Aurora } from "@/components/ui/Aurora";
import { hero, stats } from "@/lib/content";

const SplineScene = dynamic(() => import("@/components/three/SplineScene"), {
  ssr: false,
});

// ?v= busts browser/CDN cache so the latest Spline export loads.
// Bump this number whenever the Spline scene is re-exported.
const SPLINE_URL =
  "https://prod.spline.design/nQj1cHfsksNWuwQX/scene.splinecode?v=3";

/** Renders a count-up when the stat is a parseable number, else animates the text. */
function StatValue({ value }: { value: string }) {
  const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (m && !value.includes("–")) {
    return (
      <Counter
        to={parseFloat(m[1])}
        suffix={m[2]}
        decimals={m[1].includes(".") ? 1 : 0}
        className="display text-2xl font-bold text-gradient sm:text-3xl"
      />
    );
  }
  return (
    <span className="display text-2xl font-bold text-gradient sm:text-3xl">{value}</span>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      {/* Animated aurora backdrop behind everything */}
      <Aurora className="absolute inset-0 -z-10" intensity="bold" />

      {/* Floating accent shapes (gated by the global reduced-motion rule) */}
      <span
        aria-hidden="true"
        className="animate-float pointer-events-none absolute left-[8%] top-[22%] -z-10 h-24 w-24 rounded-full bg-grad opacity-20 blur-2xl"
      />
      <span
        aria-hidden="true"
        className="animate-float pointer-events-none absolute right-[12%] bottom-[18%] -z-10 h-16 w-16 rounded-full bg-grad opacity-25 blur-2xl"
        style={{ animationDelay: "1.6s" }}
      />

      <div className="container-x grid w-full grid-cols-1 items-center gap-10 py-28 lg:grid-cols-2 lg:gap-12">
        {/* LEFT: copy */}
        <div className="relative z-10 order-1 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <Eyebrow>AI automation agency · 2026</Eyebrow>
          </motion.div>

          <h1 className="display mt-8 text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            <AnimatedText text="Build Smarter. Automate Faster." by="word" delay={0.25} />{" "}
            <span className="text-gradient">
              <AnimatedText text="Scale With Confidence." by="word" delay={0.5} />
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease }}
          >
            <Magnetic>
              <Button href={hero.ctaPrimary.href} arrow data-cursor className="shine">
                {hero.ctaPrimary.label}
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={hero.ctaSecondary.href} variant="outline" data-cursor>
                {hero.ctaSecondary.label}
              </Button>
            </Magnetic>
          </motion.div>

          <motion.p
            className="mt-6 text-xs font-medium tracking-wide text-faint"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease }}
          >
            {hero.trustLine}
          </motion.p>

          <motion.dl
            className="mt-14 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { delayChildren: 1.15, staggerChildren: 0.08 },
              },
            }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                }}
              >
                <dt>
                  <StatValue value={s.value} />
                </dt>
                <dd className="mt-1 text-xs leading-snug text-faint">{s.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* RIGHT: Spline 3D scene */}
        <motion.div
          className="relative order-2 h-[34svh] w-full sm:h-[46svh] lg:order-2 lg:h-[82svh]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          {/* Soft brand gradient glow halo directly behind the robot */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-grad opacity-25 blur-[80px]"
          />
          {/* Thin animated accent ring orbiting the robot */}
          <span
            aria-hidden="true"
            className="animate-float pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line opacity-40"
          />

          <SplineScene url={SPLINE_URL} className="absolute inset-0" />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-faint">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-line-strong p-1">
          <span className="animate-float block h-2 w-0.5 rounded-full bg-grad" />
        </div>
      </div>
    </section>
  );
}
