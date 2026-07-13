import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Tilt } from "@/components/ui/Tilt";
import { DistortImage } from "@/components/three/DistortImage";
import { caseImage } from "@/lib/caseImages";
import type { CaseStudy } from "@/lib/content";

export function WorkCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      data-cursor
      data-cursor-label="View"
      className="card-hover shine group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/40"
    >
      {/* Visual header — real photo, zooms on hover (wrapper carries the
          scale so the hover distortion canvas zooms together with the img). */}
      <Tilt className="relative aspect-[16/10] overflow-hidden" max={5}>
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]">
          <DistortImage
            src={caseImage(item.slug, 1200)}
            alt={`${item.client} — ${item.title}`}
            className="absolute inset-0 h-full w-full"
            sizes="(min-width:1024px) 33vw, 100vw"
          />
        </div>
        {/* subtle brand tint (keeps the cards cohesive without hiding the photo) */}
        <div
          className="absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-15"
          style={{
            background: `linear-gradient(150deg, ${item.accent}55, transparent 55%)`,
          }}
        />
        {/* bottom scrim so the chips + client name stay legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* service chips */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {item.services.slice(0, 2).map((s) => (
            <span
              key={s}
              className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/95 backdrop-blur-md"
            >
              {s}
            </span>
          ))}
        </div>

        {/* client name + view chip */}
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <span className="display text-2xl font-bold text-white drop-shadow-md">
            {item.client}
          </span>
          <span className="grid size-9 shrink-0 translate-y-1 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
