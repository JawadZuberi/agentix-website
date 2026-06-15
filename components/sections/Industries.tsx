import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading
        eyebrow="Where we work"
        title={
          <>
            Industries We <span className="text-gradient">Serve</span>
          </>
        }
        intro="We build AI automation, software, and digital growth systems for teams across a wide range of sectors — each solution shaped around how that industry actually operates."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((item, i) => (
          <Reveal key={item.name} delay={(i % 3) * 0.07}>
            <Tilt className="h-full" max={5}>
              <div className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 p-6">
                {/* Brand glow bloom on hover */}
                <div className="pointer-events-none absolute -left-12 -top-12 size-32 rounded-full bg-grad opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
                <div className="relative flex items-center gap-3">
                  <span className="size-2 rounded-full bg-grad transition-transform duration-500 group-hover:scale-150" />
                  <h3 className="display text-lg font-semibold">{item.name}</h3>
                </div>
                <p className="relative mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
