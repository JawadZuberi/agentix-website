import { WorkCard } from "@/components/WorkCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/Button";
import { cases } from "@/lib/content";

export function WorkPreview() {
  return (
    <>
      <section className="container-x py-24 sm:py-32">
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

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {cases.slice(0, 4).map((item, i) => (
            <Reveal key={item.slug} delay={(i % 2) * 0.08}>
              <Tilt className="h-full" max={4}>
                <WorkCard item={item} />
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>
      <SectionDivider className="container-x" />
    </>
  );
}
