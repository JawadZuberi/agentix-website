import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { about, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Agentix Solution | AI Automation & Technology Development Agency",
  description:
    "Agentix Solution is an AI automation and technology development agency. We combine AI automation, custom software development, and premium design to help businesses replace manual work with intelligent, reliable systems.",
};

export default function AboutPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <Aurora className="absolute inset-0 -z-10" intensity="soft" />
        <PageHeader
          eyebrow="About"
          title={
            <>
              Building the Intelligent Systems{" "}
              <span className="text-gradient">Behind Modern Businesses.</span>
            </>
          }
          intro={about.intro}
        />
      </div>

      {/* Stats */}
      <section className="container-x">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="card-hover h-full rounded-3xl border border-line bg-surface/40 p-6">
                <p className="display text-3xl font-bold text-gradient sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-faint">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="card-hover h-full rounded-3xl border border-line bg-surface/40 p-8">
              <p className="text-sm font-medium text-faint">Our Mission</p>
              <h3 className="display mt-3 text-2xl font-semibold">
                Make advanced technology practical for every business.
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{about.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="card-hover h-full rounded-3xl border border-line bg-surface/40 p-8">
              <p className="text-sm font-medium text-faint">Our Vision</p>
              <h3 className="display mt-3 text-2xl font-semibold">
                A future where every business runs on intelligent systems.
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{about.vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* From the CEO */}
      <section className="container-x py-12 sm:py-20">
        <Reveal>
          <div className="card-hover relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-8 sm:p-12">
            <Aurora className="absolute inset-0 -z-10" intensity="soft" />
            <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
              {/* portrait — real photo at public/team/jawad-zuberi.jpg, with a
                  graceful "JZ" gradient fallback behind it (no broken icon). */}
              <div className="mx-auto lg:mx-0">
                <div
                  className="relative grid aspect-[4/5] w-44 place-items-center overflow-hidden rounded-3xl border border-line sm:w-56"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 30% 10%, #7a2e8f33, transparent 60%), linear-gradient(140deg, #ffffff, #f1eee9)",
                  }}
                >
                  <span className="display text-6xl font-bold text-gradient">JZ</span>
                  <div
                    role="img"
                    aria-label="Jawad Zuberi, CEO of Agentix Solution"
                    className="absolute inset-0 bg-cover"
                    style={{
                      backgroundImage: "url(/team/jawadzuberi.jpg)",
                      backgroundPosition: "center 20%",
                    }}
                  />
                </div>
              </div>

              {/* message */}
              <div>
                <Eyebrow>From the CEO</Eyebrow>
                <p className="display mt-5 text-balance text-2xl font-medium leading-relaxed text-fg sm:text-[1.75rem]">
                  <span className="text-gradient">“</span>
                  We started Agentix Solution to do the opposite of the AI hype —
                  not flashy demos, but intelligent systems that actually ship and
                  keep working. We lead with the outcome, wrap every build in real
                  engineering, and hand you systems you fully own. Smarter
                  technology, built to last, delivered by a senior team that cares
                  about your results as much as you do.
                  <span className="text-gradient">”</span>
                </p>
                <div className="mt-8">
                  <p className="display text-lg font-semibold text-fg">
                    Jawad Zuberi
                  </p>
                  <p className="text-sm font-medium text-gradient">
                    CEO &amp; Founder, Agentix Solution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="container-x">
        <SectionDivider />
      </div>

      {/* What makes us different */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeading
          eyebrow="Why Agentix Solution"
          title={
            <>
              What makes Agentix Solution{" "}
              <span className="text-gradient">different.</span>
            </>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {about.different.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 0.06}>
              <div className="card-hover h-full rounded-3xl border border-line bg-surface/40 p-8">
                <h3 className="display text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="container-x">
        <SectionDivider />
      </div>

      {/* Our approach */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Our <span className="text-gradient">approach.</span>
            </>
          }
        />
        <Reveal>
          <div className="card-hover mt-12 rounded-3xl border border-line bg-surface/40 p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-muted">{about.approach}</p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-x py-24 sm:py-32">
        <Reveal>
          <div className="card-hover shine relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-10 text-center sm:p-16">
            <Aurora className="absolute inset-0 -z-10" intensity="soft" />
            <SectionHeading
              eyebrow="Let's build together"
              title={
                <>
                  Ready to build smarter systems for{" "}
                  <span className="text-gradient">your business?</span>
                </>
              }
            />
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted">
              Tell us about your goals and we&apos;ll help you choose the right
              automation, software, or development solution — and outline clear
              next steps to get there.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" arrow>
                Book a Free Consultation
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
