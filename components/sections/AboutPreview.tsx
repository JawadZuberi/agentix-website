import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AnimatedText } from "@/components/AnimatedText";
import { Parallax } from "@/components/Parallax";
import { Aurora } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";
import { aboutPreview } from "@/lib/content";

export function AboutPreview() {
  return (
    <section className="bg-aurora relative overflow-hidden py-24 sm:py-32">
      {/* soft drifting aurora accent */}
      <Parallax
        speed={0.3}
        className="pointer-events-none absolute -right-24 top-10 -z-10 hidden h-[28rem] w-[28rem] lg:block"
      >
        <Aurora className="absolute inset-0" intensity="soft" />
      </Parallax>

      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>
            <h2 className="display mt-5 text-balance text-4xl font-bold sm:text-5xl">
              <AnimatedText text={aboutPreview.heading} as="span" />
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-2">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted">
                {aboutPreview.body}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <Button href="/about" variant="outline" arrow>
                  More about us
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
