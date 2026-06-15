import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { team } from "@/lib/content";

export function Team() {
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading
        eyebrow="The team"
        title={
          <>
            Senior people, <span className="text-gradient">no hand-offs.</span>
          </>
        }
        intro="Every project is led by experienced engineers and designers — not passed down to whoever's free."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={(i % 4) * 0.06}>
            <Tilt className="h-full" max={5}>
              <div
                data-cursor
                className="card-hover group relative h-full overflow-hidden rounded-3xl border border-line bg-surface/40 p-7"
              >
                {/* portrait stand-in — swap for real photos */}
                <div
                  className="mb-6 grid aspect-square place-items-center overflow-hidden rounded-2xl"
                  style={{
                    background: `radial-gradient(120% 120% at 30% 10%, ${m.accent}2e, transparent 60%), linear-gradient(140deg, #ffffff, #f1eee9)`,
                  }}
                >
                  <span className="display text-4xl font-bold text-fg/70 transition-transform duration-500 group-hover:scale-110">
                    {m.name
                      .split(/[\s.]+/)
                      .filter(Boolean)
                      .map((p) => p[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="display text-lg font-semibold">{m.name}</h3>
                <p className="text-sm text-gradient transition-all duration-300 group-hover:translate-x-0.5 group-hover:font-medium">
                  {m.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
