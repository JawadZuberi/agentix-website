import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { Counter } from "@/components/Counter";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { AnimatedText } from "@/components/AnimatedText";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WorkCard } from "@/components/WorkCard";
import { Tilt } from "@/components/ui/Tilt";
import { Aurora } from "@/components/ui/Aurora";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { caseImage, galleryImages } from "@/lib/caseImages";
import { cases } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbLd, jsonLdScript } from "@/lib/jsonld";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  if (!item) return { title: "Case study not found" };

  const title = `${item.client} — ${item.title}`;
  const url = `${site.url}/work/${item.slug}`;
  const image = caseImage(item.slug);

  return {
    title,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description: item.summary,
      url,
      images: [{ url: image, alt: `${item.client} — ${item.title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description: item.summary,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  if (!item) notFound();

  const idx = cases.findIndex((c) => c.slug === slug);
  const next = cases[(idx + 1) % cases.length];

  // Related projects: up to 3 OTHER cases sharing at least one service tag,
  // with a stable fallback to the cases that follow this one.
  const others = cases.filter((c) => c.slug !== item.slug);
  const serviceSet = new Set(item.services);
  const related = others
    .filter((c) => c.services.some((s) => serviceSet.has(s)))
    .slice(0, 3);
  if (related.length < 3) {
    for (const c of others) {
      if (related.length >= 3) break;
      if (!related.some((r) => r.slug === c.slug)) related.push(c);
    }
  }

  const breadcrumb = breadcrumbLd([
    { name: "Home", url: site.url },
    { name: "Work", url: `${site.url}/work` },
    { name: item.client, url: `${site.url}/work/${item.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumb)}
      />
      <div className="relative overflow-hidden">
        <Aurora className="absolute inset-0 -z-10" intensity="soft" />
        <PageHeader
          eyebrow={`${item.sector} · ${item.year}`}
          title={item.title}
          intro={item.summary}
        />
      </div>

      <section className="container-x">
        {/* hero panel */}
        <Reveal>
          <div className="shine relative mb-12 aspect-[21/9] overflow-hidden rounded-3xl border border-line">
            <Parallax speed={0.18} className="absolute -inset-8">
              <Image
                src={caseImage(item.slug)}
                alt={`${item.client} — ${item.title}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </Parallax>
            {/* brand tint + legibility scrim */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(150deg, ${item.accent}66, transparent 55%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="display text-5xl font-bold text-white/90 drop-shadow-lg sm:text-7xl">
                {item.client}
              </span>
            </div>
          </div>
        </Reveal>

        {/* metrics count-up strip */}
        <Reveal>
          <div className="card-hover mb-16 grid grid-cols-1 gap-4 rounded-3xl border border-line bg-surface/40 p-6 sm:grid-cols-3">
            {item.metrics.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 0.08}
                className="text-center sm:text-left sm:border-l sm:border-line sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
              >
                <Counter
                  to={m.to}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  className="display text-4xl font-bold text-gradient sm:text-5xl"
                />
                <p className="mt-1 text-sm text-faint">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <Reveal>
              <AnimatedText
                as="h2"
                text="The challenge"
                className="display block text-2xl font-semibold"
              />
              <p className="mt-3 leading-relaxed text-muted">{item.challenge}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <AnimatedText
                as="h2"
                text="Our approach"
                className="display block text-2xl font-semibold"
              />
              <p className="mt-3 leading-relaxed text-muted">{item.approach}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <AnimatedText
                as="h2"
                text="The results"
                className="display block text-2xl font-semibold"
              />
              <ul className="mt-4 space-y-3">
                {item.results.map((r, i) => (
                  <Reveal key={r} delay={0.12 + i * 0.06} y={16}>
                    <li className="flex items-start gap-3">
                      <Icon name="bolt" className="mt-1 size-4 shrink-0 text-accent" />
                      <span className="text-fg">{r}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <aside className="card-hover h-fit space-y-6 rounded-3xl border border-line bg-surface/40 p-7">
              <div>
                <p className="text-xs uppercase tracking-wider text-faint">Client</p>
                <p className="mt-1 font-medium text-fg">{item.client}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-faint">Services</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {item.services.map((s) => (
                    <li key={s} className="rounded-full border-grad px-3 py-1 text-xs text-fg">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-faint">Stack</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <Button href="/contact" arrow className="w-full justify-center">
                Start something similar
              </Button>
            </aside>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionDivider />
        </div>

        {/* gallery */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {item.gallery.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.08}>
              <div className="card-hover shine group relative flex aspect-[4/3] items-end overflow-hidden rounded-3xl border border-line">
                <Image
                  src={galleryImages[i % galleryImages.length]}
                  alt={g.label}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(150deg, ${g.accent}66, transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <span className="relative p-5 text-sm font-medium text-white drop-shadow">
                  {g.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* outcome CTA band — reuses the FinalCta visual pattern */}
        <div className="mt-24">
          <div className="card-hover shine relative overflow-hidden rounded-3xl border border-line bg-surface/40 px-8 py-16 text-center sm:px-12 sm:py-24">
            <Aurora className="absolute inset-0 -z-10" intensity="bold" />
            <div className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-grad opacity-20 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <Reveal>
                <Eyebrow>Your project</Eyebrow>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="display mt-6 text-balance text-3xl font-bold sm:text-5xl">
                  <AnimatedText
                    text="Want results like this for your team?"
                    as="span"
                  />
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  Tell us about your {item.sector.toLowerCase()} challenge and
                  we&rsquo;ll scope an AI-driven system built to ship — and to be
                  owned outright by your team.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
                  <Button href="/contact" arrow data-cursor className="shine">
                    Start your project
                  </Button>
                  <a
                    href={`mailto:${site.email}`}
                    className="hover-underline text-sm font-medium text-muted hover:text-fg"
                  >
                    {site.email}
                  </a>
                  <span aria-hidden="true" className="text-faint">
                    ·
                  </span>
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="hover-underline text-sm font-medium text-muted hover:text-fg"
                  >
                    {site.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* related projects */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <AnimatedText
                  as="h2"
                  text="Related projects"
                  className="display block text-3xl font-semibold sm:text-4xl"
                />
              </Reveal>
              <Reveal delay={0.05}>
                <Link
                  href="/work"
                  className="hover-underline text-sm font-medium text-muted hover:text-fg"
                >
                  View all work
                </Link>
              </Reveal>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.08}>
                  <Tilt max={4} className="h-full [transform-style:preserve-3d]">
                    <WorkCard item={c} />
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 flex items-center justify-between border-t border-line pt-8">
          <Link
            href="/work"
            className="hover-underline text-sm text-muted hover:text-fg"
          >
            ← All work
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="hover-underline text-right text-sm text-muted hover:text-fg"
          >
            Next case
            <span className="block font-medium text-fg">{next.client}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
