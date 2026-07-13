import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { Aurora } from "@/components/ui/Aurora";
import { site } from "@/lib/site";
import { contactInfo, services, cases } from "@/lib/content";

const SectionBlob = dynamic(() => import("@/components/three/SectionBlob"));

const pageTitle = "Contact — start a project";
const pageDescription =
  "Tell Agentix Solution the outcome you want. We'll scope the fastest sensible path to a shipped result — AI automation, agents, websites, mobile apps, software, SaaS, CRMs, and dashboards.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${pageTitle} · ${site.name}`,
    description: pageDescription,
    url: `${site.url}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} · ${site.name}`,
    description: pageDescription,
  },
};

const steps = [
  {
    title: "Discovery call",
    body: "A short call to understand your goals, workflows, and what success looks like.",
  },
  {
    title: "Honest assessment",
    body: "A straight take on whether AI and automation actually help here — and where they don't.",
  },
  {
    title: "Scoped proposal",
    body: "A clear plan with timeline, price, and the outcome we'll ship — no surprises.",
  },
];

const stats = [
  { to: cases.length, suffix: "", label: "Projects shipped" },
  { to: services.length, suffix: "", label: "Service areas" },
  { to: 1, prefix: "<", suffix: " day", label: "Avg. first reply" },
];

/** Minimal inline icons for contact methods. */
const icons: Record<string, React.ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  phone: (
    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V21a1 1 0 0 1-1 1A17 17 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  ),
};

function MethodIcon({ name }: { name: string }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-grad text-white">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
        aria-hidden="true"
      >
        {icons[name]}
      </svg>
    </span>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* floating 3D accent */}
      <div className="pointer-events-none absolute right-0 top-24 -z-0 h-[34rem] w-[34rem] opacity-60">
        <SectionBlob />
      </div>

      {/* header band */}
      <div className="relative overflow-hidden">
        <Aurora className="absolute inset-0 -z-10" intensity="soft" />
        <PageHeader
          eyebrow="Contact"
          title={contactInfo.headline}
          intro={contactInfo.subheadline}
        />
        <div className="container-x">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-grad opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-grad" />
              </span>
              Replies within 1 business day
            </span>
          </Reveal>
        </div>
      </div>

      <section className="container-x grid gap-12 pt-12 lg:grid-cols-[0.95fr_1.1fr]">
        {/* LEFT: sticky info rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          {/* contact methods */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal>
              <a
                href={`mailto:${site.email}`}
                data-cursor
                className="card-hover shine group flex h-full flex-col gap-3 rounded-3xl border border-line bg-surface/40 p-6"
              >
                <MethodIcon name="mail" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-faint">Email us</p>
                  <p className="display mt-1 break-all text-base font-semibold text-fg">
                    {site.email}
                  </p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.06}>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                data-cursor
                className="card-hover shine group flex h-full flex-col gap-3 rounded-3xl border border-line bg-surface/40 p-6"
              >
                <MethodIcon name="phone" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-faint">Call us</p>
                  <p className="display mt-1 text-base font-semibold text-fg">
                    {site.phone}
                  </p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.1} className="sm:col-span-2">
              <div className="card-hover flex h-full items-center gap-4 rounded-3xl border border-line bg-surface/40 p-6">
                <MethodIcon name="pin" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-faint">Office</p>
                  <p className="display mt-1 text-base font-semibold text-fg">
                    {site.location}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* what happens next — timeline */}
          <div className="mt-10">
            <h2 className="display text-xl font-semibold">What happens next</h2>
            <ol className="relative mt-6 space-y-7 pl-8">
              <span
                aria-hidden="true"
                className="absolute left-[11px] top-2 h-[calc(100%-1.5rem)] w-px bg-line"
              />
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <li className="relative">
                    <span className="absolute -left-8 top-0 grid size-6 place-items-center rounded-full bg-grad text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="font-medium text-fg">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* trust stats */}
          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-3 gap-4 rounded-3xl border border-line bg-surface/40 p-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <Counter
                    to={s.to}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    className="display text-2xl font-bold text-gradient sm:text-3xl"
                  />
                  <p className="mt-1 text-xs leading-snug text-faint">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* social */}
          <Reveal delay={0.12}>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm text-faint">Follow</span>
              {Object.entries(site.social).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={key[0].toUpperCase() + key.slice(1)}
                  aria-label={key}
                  data-cursor
                  className="grid size-9 place-items-center rounded-full border border-line text-xs capitalize text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {key[0].toUpperCase()}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT: heading + the elevated form card */}
        <Reveal delay={0.1}>
          <div>
            <h2 className="display text-2xl font-bold sm:text-3xl">
              Start your <span className="text-gradient">project</span>
            </h2>
            <p className="mt-2 text-sm text-muted">
              The more you share, the sharper our first response.
            </p>
            <div className="glow mt-6 rounded-3xl">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
