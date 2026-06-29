import { ServiceCard } from "@/components/ServiceCard";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/AnimatedText";
import { Reveal } from "@/components/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/content";

// 12-col bento that tiles cleanly with no gaps: two feature cards span 8
// columns, every other card spans 4 — so each row sums to exactly 12.
//   row 1: ai-automation(8) + ai-agent(4)
//   row 2: website(4) + software(4) + mobile(4)
//   row 3: saas(4) + crm(8)
//   row 4: api(4) + digital(4) + ecommerce(4)
const FEATURE = new Set(["ai-automation", "crm-dashboard-development"]);

export function Services() {
  return (
    <section id="services" className="bg-aurora relative py-24 sm:py-32">
      {/* soft aurora band behind the section */}
      <Aurora className="absolute inset-0 -z-10" intensity="soft" />

      <div className="container-x">
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

        <div className="relative mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {services.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={(i % 3) * 0.06}
              className={`${
                FEATURE.has(s.slug) ? "lg:col-span-8" : "lg:col-span-4"
              } min-h-[15rem]`}
            >
              <ServiceCard service={s} featured={FEATURE.has(s.slug)} />
            </Reveal>
          ))}
        </div>

        <SectionDivider className="mt-20" />
      </div>
    </section>
  );
}
