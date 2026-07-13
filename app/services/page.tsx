import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { Faq } from "@/components/sections/Faq";
import { Aurora } from "@/components/ui/Aurora";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { services, servicesPage } from "@/lib/content";
import { servicesLd, faqLd, jsonLdScript } from "@/lib/jsonld";
import { site } from "@/lib/site";

const pageTitle = "Services — AI automation, web, mobile, software & growth";
const pageDescription =
  "Agentix Solution services: AI automation, AI agent development, website and mobile app development, custom software, SaaS, CRM and dashboard development, API integration, ecommerce, and digital marketing — each built around measurable business outcomes.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${pageTitle} · ${site.name}`,
    description: pageDescription,
    url: `${site.url}/services`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} · ${site.name}`,
    description: pageDescription,
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(servicesLd())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqLd())}
      />

      <div className="relative overflow-hidden">
        <Aurora className="absolute inset-0 -z-10" intensity="soft" />
        <PageHeader
          eyebrow="Services"
          title={servicesPage.heading}
          intro={servicesPage.intro}
        />
      </div>

      {/* How we engage — qualitative engagement models (no invented pricing),
          set up front to lower budget-field friction before the enquiry. */}
      <section className="container-x">
        <Reveal>
          <div className="card-hover rounded-3xl border border-line bg-surface/40 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-wider text-faint">
              How we engage
            </p>
            <p className="mt-3 text-lg font-medium text-fg">
              We scope to your goals and budget before any commitment — most
              engagements take one of three shapes.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {[
                "Discovery sprint",
                "Fixed-scope build",
                "Ongoing automation retainer",
              ].map((model) => (
                <li
                  key={model}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-2/60 px-4 py-2 text-sm font-medium text-muted"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-grad" />
                  {model}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="container-x space-y-4">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.05}>
            <article
              id={s.slug}
              className="card-hover group grid scroll-mt-28 gap-8 rounded-3xl border border-line bg-surface/40 p-8 sm:p-10 lg:grid-cols-[auto_1fr_1fr]"
            >
              <div className="flex items-start gap-4 lg:flex-col">
                <span className="grid size-14 place-items-center rounded-2xl border-grad text-fg">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <div>
                  <p className="text-xs text-faint">0{i + 1}</p>
                  <h2 className="display text-2xl font-semibold">{s.title}</h2>
                  <Link
                    href={`/services/${s.slug}`}
                    data-cursor
                    className="hover-underline mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-gradient"
                  >
                    Explore
                    <Icon
                      name="arrow"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-faint">Overview</p>
                  <p className="mt-1 text-lg font-medium text-fg">{s.tagline}</p>
                </div>
                <div>
                  <p className="mt-1 text-muted">{s.description}</p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-faint">What it includes</p>
                  <ul className="mt-3 space-y-2">
                    {s.includes.slice(0, 4).map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-grad" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-fg"
                >
                  {s.cta}
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <div className="container-x pt-16">
        <SectionDivider />
      </div>

      {/* Why our services are different */}
      <section className="container-x py-20">
        <Reveal>
          <h2 className="display text-3xl font-bold sm:text-4xl">
            Why our services are <span className="text-gradient">different.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {servicesPage.whyDifferent.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.08}>
              <div className="card-hover h-full rounded-3xl border border-line bg-surface/40 p-8">
                <h3 className="display text-xl font-semibold">{w.title}</h3>
                <p className="mt-3 text-muted">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="container-x">
        <div className="card-hover shine flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border-grad p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-sm text-faint">One partner for every digital system</p>
            <h2 className="display mt-1 text-2xl font-bold sm:text-3xl">
              Let&rsquo;s scope the right solution for your business.
            </h2>
          </div>
          <Button href="/contact" arrow>
            Start your project
          </Button>
        </div>
      </div>

      <Faq />
    </>
  );
}
