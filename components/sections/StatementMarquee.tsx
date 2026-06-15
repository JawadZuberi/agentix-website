import { Icon } from "@/components/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * Capabilities ticker — a single infinite row of gradient icon + label chips
 * scrolling via the CSS `animate-marquee` (translateX -50% loop), duplicated
 * twice for a seamless loop with an edge mask fade. Pure CSS, pauses under
 * reduced-motion (handled in globals.css).
 */
const items = [
  { label: "AI Automation", icon: "bolt" },
  { label: "AI Agents", icon: "agent" },
  { label: "Software", icon: "stack" },
  { label: "Websites", icon: "code" },
  { label: "Mobile Apps", icon: "mobile" },
  { label: "SaaS", icon: "cube" },
  { label: "CRM", icon: "crm" },
  { label: "Dashboards", icon: "search" },
  { label: "API", icon: "api" },
  { label: "Ecommerce", icon: "cart" },
  { label: "Digital Growth", icon: "megaphone" },
];

function Row() {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <div
        className="animate-marquee flex w-max items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
        style={{ animationDuration: "44s" }}
      >
        {row.map((it, i) => (
          <span
            key={`${it.label}-${i}`}
            className="flex shrink-0 items-center gap-10 sm:gap-14"
          >
            <span className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-grad text-white shadow-[0_8px_24px_-10px_#7a2e8f]">
                <Icon name={it.icon} className="size-5" />
              </span>
              <span className="display whitespace-nowrap text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                {it.label}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rotate-45 rounded-[2px] bg-grad opacity-70"
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatementMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-2/50 py-12 sm:py-16">
      {/* soft center glow so the band reads as a distinct, premium strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 120% at 50% 50%, #7a2e8f12, transparent 70%)",
        }}
      />
      <div className="container-x mb-8 flex justify-center sm:mb-10">
        <Eyebrow>Everything we build, in one place</Eyebrow>
      </div>
      <Row />
    </section>
  );
}
