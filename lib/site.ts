/**
 * Central site configuration. Swap real values here as they're confirmed.
 */
export const site = {
  name: "Agentix Solution",
  shortName: "Agentix",
  // Update to the real production domain before launch.
  url: "https://agentixsolution.com",
  tagline: "AI automation, agents & software that ship to production",
  description:
    "Agentix Solution is an AI automation and technology development agency. We build AI agents, automate business workflows, and deliver custom software, websites, mobile apps, SaaS platforms, CRMs and dashboards, API integrations, and digital marketing — engineered to ship to production.",
  email: "info@agentixsolution.com",
  phone: "+92 311 3857797",
  location: "Fortune Tower, Shahrah-e-Faisal, Karachi, Pakistan",
  social: {
    twitter: "https://twitter.com/",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    dribbble: "https://dribbble.com/",
  },
  keywords: [
    "AI automation agency",
    "AI agent development",
    "business automation",
    "custom software development",
    "website development company",
    "mobile app development",
    "SaaS development",
    "CRM development",
    "dashboard development",
    "API integration",
    "digital marketing agency",
    "technology development agency",
  ],
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
