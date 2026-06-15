import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AnimatedText } from "@/components/AnimatedText";
import { Aurora } from "@/components/ui/Aurora";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { whyChooseUs } from "@/lib/content";

export function WhyChooseUs() {
  return (
    <section className="bg-aurora relative overflow-hidden py-24 sm:py-32">
      <Aurora className="absolute inset-0 -z-10" intensity="soft" />

      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Why Agentix</Eyebrow>
          </Reveal>
          <h2 className="display mt-5 text-balance text-4xl font-bold sm:text-5xl">
            <AnimatedText text="Why Businesses Choose " as="span" />
            <span className="text-gradient">
              <AnimatedText text="Agentix Solution" as="span" delay={0.12} />
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              A premium technology development agency that pairs AI automation
              with engineering you can trust — built around your business,
              delivered end to end.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <div className="card-hover group relative h-full overflow-hidden rounded-3xl border border-line bg-surface/40 p-7 transition-colors duration-500 hover:border-line-strong hover:bg-surface/70">
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-grad opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
                <div className="relative">
                  <span className="text-gradient display inline-block origin-left text-3xl font-bold tabular-nums transition-transform duration-500 group-hover:scale-110">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-4 text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <SectionDivider className="mt-20" />
      </div>
    </section>
  );
}
