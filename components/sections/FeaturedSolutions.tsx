import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { featuredSolutions } from "@/lib/content";

export function FeaturedSolutions() {
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading
        eyebrow="What you can build"
        title={
          <>
            Smart Solutions Built for{" "}
            <span className="text-gradient">Business Growth</span>
          </>
        }
        intro="Ready-to-build systems that put AI automation to work — capturing leads, supporting customers, and giving you a clear view of everything that drives revenue."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredSolutions.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 0.07}>
            <Tilt className="h-full">
              <div className="card-hover shine group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface/40 p-7">
                {/* Brand glow bloom on hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-grad opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25" />
                <div className="relative">
                  <span className="display text-gradient text-2xl font-bold tracking-tight">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-3 text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{item.body}</p>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
