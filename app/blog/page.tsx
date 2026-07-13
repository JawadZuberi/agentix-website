import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { Tilt } from "@/components/ui/Tilt";
import { site } from "@/lib/site";

const pageTitle = "Blog — notes on AI automation & the modern web";
const pageDescription =
  "Field notes from Agentix Solution on AI agents, automation, custom software, SaaS, CRMs, and digital growth. (Placeholder posts — real content coming soon.)";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/blog" },
  // Thin placeholder page — keep it out of the index until real posts ship,
  // but let crawlers follow the links it contains.
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${pageTitle} · ${site.name}`,
    description: pageDescription,
    url: `${site.url}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} · ${site.name}`,
    description: pageDescription,
  },
};

// Placeholder posts — replace with a CMS or MDX when content is ready.
const posts = [
  {
    title: "Intent-based, not instruction-based: the 2026 shift to AI agents",
    excerpt:
      "Why the move from chatbots to autonomous agents changes how you should brief, build, and budget for AI.",
    tag: "AI Agents",
    date: "Jun 2026",
  },
  {
    title: "Measuring the real ROI of AI automation",
    excerpt:
      "How to size the payback before you build — the metrics, baselines, and review cadence that prove automation is working.",
    tag: "Automation",
    date: "May 2026",
  },
  {
    title: "Designing CRMs and dashboards teams actually use",
    excerpt:
      "Adoption beats feature count. The data model and workflow decisions that turn a dashboard into a daily habit.",
    tag: "Product",
    date: "Apr 2026",
  },
  {
    title: "Why most AI pilots never reach production — and how to fix it",
    excerpt:
      "The gap between a slick demo and a system your team trusts. The engineering practices that close it.",
    tag: "Automation",
    date: "Mar 2026",
  },
];

export default function BlogPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <Aurora className="absolute inset-0 -z-10" intensity="soft" />
        <PageHeader
          eyebrow="Blog"
          title={
            <>
              Notes on AI, automation &{" "}
              <span className="text-gradient">the modern web.</span>
            </>
          }
          intro="Field notes and playbooks from the work. (Placeholder posts for now — real writing is on the way.)"
        />
      </div>

      <section className="container-x">
        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <Tilt className="h-full">
                <article className="card-hover group flex h-full flex-col rounded-3xl border border-line bg-surface/40 p-8">
                  <div className="flex items-center justify-between text-xs text-faint">
                    <span className="rounded-full border border-line px-3 py-1 text-muted">
                      {p.tag}
                    </span>
                    <span>{p.date}</span>
                  </div>
                  <h2 className="display mt-5 text-xl font-semibold leading-snug">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {p.excerpt}
                  </p>
                  <span className="hover-underline mt-5 inline-block w-fit text-sm font-medium text-gradient">
                    Coming soon
                  </span>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
