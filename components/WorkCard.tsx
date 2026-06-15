import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Tilt } from "@/components/ui/Tilt";
import type { CaseStudy } from "@/lib/content";

/**
 * Reliable, deterministic placeholder image per project (Lorem Picsum, seeded
 * by slug). Grayscale so the brand duotone overlay reads cleanly. Swap for a
 * real screenshot later by giving the case an `image` URL.
 */
function imageFor(item: CaseStudy) {
  return `https://picsum.photos/seed/agentix-${item.slug}/1200/800?grayscale`;
}

export function WorkCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      data-cursor
      className="card-hover shine group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/40"
    >
      {/* Visual header — real image with a brand duotone overlay, zooms on hover. */}
      <Tilt className="relative aspect-[16/10] overflow-hidden" max={5}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageFor(item)}
          alt={`${item.client} — ${item.title}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
        />
        {/* brand duotone tint */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background: `linear-gradient(140deg, ${item.accent}f2, #2e3192e6)`,
          }}
        />
        {/* gentle highlight so it doesn't go muddy */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
        {/* bottom scrim for the label */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* service chips */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {item.services.slice(0, 2).map((s) => (
            <span
              key={s}
              className="rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md"
            >
              {s}
            </span>
          ))}
        </div>

        {/* client name + view chip */}
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <span className="display text-2xl font-bold text-white drop-shadow-sm">
            {item.client}
          </span>
          <span className="grid size-9 shrink-0 translate-y-1 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Icon name="arrow" className="size-4" />
          </span>
        </div>
      </Tilt>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between text-xs text-faint">
          <span>{item.sector}</span>
          <span>{item.year}</span>
        </div>
        <h3 className="display mt-3 text-xl font-semibold leading-snug">
          {item.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {item.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
          View case study
          <Icon
            name="arrow"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
