import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <>
      <SectionDivider className="container-x" />
      <section className="container-x py-24 sm:py-32">
        <SectionHeading
          eyebrow="What clients say"
          title={
            <>
              We don&rsquo;t demo AI.{" "}
              <span className="text-gradient">We ship it.</span>
            </>
          }
          align="center"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Tilt className="h-full" max={5}>
                <figure className="card-hover group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface/40 p-7">
                  {/* Brand glow bloom on hover */}
                  <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-grad opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
                  <blockquote className="relative text-lg leading-relaxed text-fg">
                    <span className="text-gradient">&ldquo;</span>
                    {t.quote}
                    <span className="text-gradient">&rdquo;</span>
                  </blockquote>
                  <figcaption className="relative mt-6 text-sm">
                    <span className="font-semibold text-fg">{t.name}</span>
                    <span className="block text-faint">{t.role}</span>
                  </figcaption>
                </figure>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
