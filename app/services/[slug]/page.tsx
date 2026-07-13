import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { WorkCard } from "@/components/WorkCard";
import { Aurora } from "@/components/ui/Aurora";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { services, cases } from "@/lib/content";
import { site } from "@/lib/site";
import { jsonLdScript, breadcrumbLd } from "@/lib/jsonld";

const BlobAccent = dynamic(() => import("@/components/three/SectionBlob"));

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return { title: "Service not found" };
  const title = `${s.title} — ${s.tagline}`;
  const url = `${site.url}/services/${s.slug}`;
  return {
    title,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description: s.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description: s.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const idx = services.findIndex((s) => s.slug === slug);
  const next = services[(idx + 1) % services.length];
  const related = cases.filter((c) => service.relatedWork.includes(c.slug));

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/services/${service.slug}`,
  };

  const breadcrumb = breadcrumbLd([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: service.title, url: `${site.url}/services/${service.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(ld)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumb)}
      />

      {/* Hero with floating 3D accent */}
      <div className="relative overflow-hidden">
        <Aurora className="absolute inset-0 -z-10" intensity="soft" />
        <div className="pointer-events-none absolute right-0 top-24 -z-0 h-[28rem] w-[28rem] opacity-70">
          <BlobAccent />
        </div>
        <PageHeader
          eyebrow={`Services / ${service.title}`}
          title={service.title}
          intro={service.tagline}
        />
        <div className="container-x -mt-2">
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            {service.description}
          </p>
        </div>
      </div>

      {/* What this service includes */}
      <section className="container-x py-16">
        <Reveal>
          <h2 className="display text-3xl font-bold sm:text-4xl">
            What this service <span className="text-gradient">includes.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {service.includes.map((item, i) => (
            <Reveal key={item} delay={(i % 2) * 0.06}>
              <div className="card-hover flex h-full items-start gap-4 rounded-2xl border border-line bg-surface/40 p-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-grad text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-fg">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Benefits + best for */}
      <section className="container-x grid gap-5 py-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="card-hover h-full rounded-3xl border border-line bg-surface/40 p-8">
            <p className="text-xs uppercase tracking-wider text-faint">Benefits</p>
            <ul className="mt-5 space-y-4">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-lg leading-relaxed text-fg">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-grad" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="card-hover shine flex h-full flex-col justify-center overflow-hidden rounded-3xl border-grad p-8">
            <p className="text-xs uppercase tracking-wider text-faint">Best for</p>
            <p className="mt-3 text-xl font-medium leading-relaxed text-gradient">
              {service.bestFor}
            </p>
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <div className="container-x pt-8">
          <SectionDivider />
        </div>
      )}

      {/* Related work */}
      {related.length > 0 && (
        <section className="container-x py-16">
          <Reveal>
            <h2 className="display text-3xl font-bold sm:text-4xl">
              Related <span className="text-gradient">work.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {related.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 0.08}>
                <WorkCard item={c} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA + next service */}
      <section className="container-x py-16">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-faint">Ready when you are</p>
            <h2 className="display mt-1 text-2xl font-bold sm:text-3xl">
              Let&rsquo;s scope your {service.title.toLowerCase()} project.
            </h2>
          </div>
          <Button href="/contact" arrow>
            {service.cta}
          </Button>
        </div>
        <Link
          href={`/services/${next.slug}`}
          className="card-hover group mt-10 flex items-center justify-between rounded-3xl border border-line bg-surface/40 p-6"
        >
          <div>
            <p className="text-xs uppercase tracking-wider text-faint">Next service</p>
            <p className="display text-xl font-semibold">{next.title}</p>
          </div>
          <Icon
            name="arrow"
            className="size-6 text-fg transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      </section>
    </>
  );
}
