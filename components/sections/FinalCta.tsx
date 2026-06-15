import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/Magnetic";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/AnimatedText";
import { Aurora } from "@/components/ui/Aurora";
import { finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="card-hover shine relative overflow-hidden rounded-3xl border border-line bg-surface/40 px-8 py-16 text-center sm:px-12 sm:py-28">
        {/* Bold animated aurora wash behind the band */}
        <Aurora className="absolute inset-0 -z-10" intensity="bold" />
        {/* Soft top glow halo */}
        <div className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-grad opacity-20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow>Let&apos;s build</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display mt-6 text-balance text-4xl font-bold sm:text-6xl">
              <AnimatedText text={finalCta.heading} as="span" />
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {finalCta.body}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex justify-center">
              <Magnetic>
                <span className="relative inline-flex">
                  {/* Glow ring behind the CTA */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-grad opacity-30 blur-2xl"
                  />
                  <Button href={finalCta.cta.href} arrow data-cursor className="shine">
                    {finalCta.cta.label}
                  </Button>
                </span>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
