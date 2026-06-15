import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Tilt } from "@/components/ui/Tilt";
import type { Service } from "@/lib/content";

/**
 * Bento service card. `featured` cards show the fuller description; compact
 * cards lead with the tagline. Both surface a few of the service's inclusions
 * as chips. Wrapped in Tilt for a premium pointer-tilt, with a gradient ring
 * (.card-hover), diagonal .shine sweep, and a gradient icon chip.
 */
export function ServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  const chips = service.includes.slice(0, featured ? 3 : 2);

  return (
    <Tilt className="h-full" max={5}>
      <Link
        href={`/services/${service.slug}`}
        data-cursor
        className="card-hover shine group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface/40 p-7 transition-colors duration-500 hover:border-line-strong hover:bg-surface/70"
      >
        {/* hover glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-grad opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-grad text-white shadow-sm transition-transform duration-500 group-hover:scale-110">
              <Icon name={service.icon} className="size-5" />
            </span>
            <h3 className="display text-xl font-semibold">{service.title}</h3>
          </div>

          <p className="mt-4 text-muted">{service.tagline}</p>

          {featured && (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-faint">
              {service.description}
            </p>
          )}
        </div>

        <div className="relative mt-6">
          <ul className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <li
                key={c}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-all duration-300 group-hover:border-line-strong group-hover:text-fg"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </Tilt>
  );
}
