import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WorkGallery } from "@/components/WorkGallery";
import { Reveal } from "@/components/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { cases } from "@/lib/content";
import { site } from "@/lib/site";

const projectCount = cases.length;
const serviceCount = new Set(cases.flatMap((c) => c.services)).size;

const workTitle = "Work — case studies";
const workDescription =
  "Selected work from Agentix Solution: AI automation, AI agents, software, web, mobile, SaaS, CRM and dashboards, and ecommerce — all shipped to production.";

export const metadata: Metadata = {
  title: workTitle,
  description: workDescription,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${workTitle} · ${site.name}`,
    description: workDescription,
    url: `${site.url}/work`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${workTitle} · ${site.name}`,
    description: workDescription,
  },
};

export default function WorkPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <Aurora className="absolute inset-0 -z-10" intensity="soft" />
        <PageHeader
          eyebrow="Work"
          title={
            <>
              Outcomes we&rsquo;ve <span className="text-gradient">shipped.</span>
            </>
          }
          intro="A selection of projects across AI automation, software, web, mobile, SaaS, CRM and dashboards, and ecommerce. Every one built to reach production — and to be owned by the team that runs it."
        />
        <div className="container-x -mt-6 pb-12">
          <Reveal delay={0.15}>
            <p className="text-sm text-faint">
              <span className="font-medium text-fg tabular-nums">
                {projectCount}
              </span>{" "}
              projects shipped across{" "}
              <span className="font-medium text-fg tabular-nums">
                {serviceCount}
              </span>{" "}
              service areas.
            </p>
          </Reveal>
        </div>
      </div>

      <WorkGallery cases={cases} />
    </>
  );
}
