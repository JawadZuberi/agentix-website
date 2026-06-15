/**
 * Single source of truth for all website copy.
 * Field names are fixed by the content contract — page components consume these exports.
 */

export const hero = {
  headline: "Build Smarter. Automate Faster. Scale With Confidence.",
  subheadline:
    "Agentix Solution helps businesses automate workflows, build custom digital products, and create intelligent technology systems that save time, improve efficiency, and support long-term growth.",
  ctaPrimary: { label: "Start Your Project", href: "/contact" },
  ctaSecondary: { label: "Explore Our Services", href: "/services" },
  trustLine:
    "AI Automation • Software Development • Web & App Development • Digital Growth",
};

export const aboutPreview = {
  heading: "Intelligent Technology Solutions for Modern Businesses",
  body: "Agentix Solution is an AI automation agency that builds AI-powered automation systems, websites, custom software, mobile apps, CRMs, dashboards, and complete digital growth systems. We help forward-thinking businesses reduce manual work, streamline operations, and scale more efficiently with technology engineered around real goals.",
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  benefits: string[];
  bestFor: string;
  cta: string;
  /** simple line-icon key, rendered by components/Icon.tsx */
  icon: string;
  /** layout weight in the bento grid */
  span: "sm" | "md" | "lg";
  relatedWork: string[]; // case slugs
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    title: "AI Automation",
    tagline: "Put your repetitive work on autopilot.",
    description:
      "We automate repetitive business tasks, internal workflows, lead management, reporting, customer support, and operational processes so your team can focus on growth.",
    includes: [
      "Workflow and process automation",
      "Lead capture, routing, and follow-up",
      "Automated reporting and notifications",
      "Customer support automation",
      "Integration with your existing tools",
    ],
    benefits: [
      "Reclaim hours of manual work every week",
      "Fewer errors and more consistent results",
      "Faster turnaround across operations",
    ],
    bestFor: "Teams losing time to manual, repetitive work across disconnected tools.",
    cta: "Automate My Workflows",
    icon: "bolt",
    span: "lg",
    relatedWork: ["northwind-ops-agent", "lumen-support-agent"],
  },
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    tagline: "Custom AI agents that work alongside your team.",
    description:
      "We build custom AI agents that can answer questions, support customers, process data, connect with business tools, and assist teams with daily operations.",
    includes: [
      "Custom AI agent design and training",
      "Knowledge base and document understanding",
      "Connections to your business tools and data",
      "Customer support and internal assistant agents",
      "Monitoring, guardrails, and ongoing tuning",
    ],
    benefits: [
      "Round-the-clock support without added headcount",
      "Faster, more accurate responses for customers and teams",
      "Hands-free handling of multi-step tasks",
    ],
    bestFor: "Businesses that need intelligent assistance for support, data, and daily operations.",
    cta: "Build My AI Agent",
    icon: "agent",
    span: "md",
    relatedWork: ["lumen-support-agent", "northwind-ops-agent"],
  },
  {
    slug: "website-development",
    title: "Website Development",
    tagline: "Modern, fast websites built to convert.",
    description:
      "We create modern, responsive, and conversion-focused websites for businesses, agencies, startups, ecommerce brands, and professional service providers.",
    includes: [
      "Custom, responsive website design",
      "Conversion-focused page structure and copy layout",
      "Content management and easy updates",
      "SEO-ready, high-performance build",
      "Analytics and tracking setup",
    ],
    benefits: [
      "A premium online presence that builds trust",
      "Faster load times and smoother user experience",
      "More visitors turning into leads and customers",
    ],
    bestFor: "Brands that need a polished, high-performing website that drives results.",
    cta: "Start My Website",
    icon: "code",
    span: "md",
    relatedWork: ["atlas-brand-site", "vion-commerce-platform"],
  },
  {
    slug: "software-development",
    title: "Software Development",
    tagline: "Custom software built around how you work.",
    description:
      "We develop custom software solutions, admin panels, portals, internal systems, and business applications tailored to your exact workflow.",
    includes: [
      "Custom web applications and internal tools",
      "Admin panels and client portals",
      "Business process and workflow systems",
      "Secure user roles and permissions",
      "Documentation and ongoing support",
    ],
    benefits: [
      "Software that fits your process instead of forcing change",
      "Centralized, reliable systems your team can trust",
      "Room to scale as your business grows",
    ],
    bestFor: "Companies outgrowing spreadsheets and off-the-shelf tools that almost fit.",
    cta: "Discuss My Project",
    icon: "stack",
    span: "sm",
    relatedWork: ["vertex-internal-platform", "helio-saas-platform"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Mobile apps people love to use.",
    description:
      "We build modern mobile applications for iOS and Android with smooth user experience, secure backend systems, and scalable performance.",
    includes: [
      "iOS and Android app development",
      "Clean, intuitive user experience design",
      "Secure backend and data handling",
      "Third-party and payment integrations",
      "App store launch support",
    ],
    benefits: [
      "Reach customers on the devices they use most",
      "A smooth, reliable experience that keeps users engaged",
      "A scalable foundation ready for new features",
    ],
    bestFor: "Businesses and startups ready to launch a polished, production-ready app.",
    cta: "Build My App",
    icon: "mobile",
    span: "sm",
    relatedWork: ["orbit-fitness-app"],
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    tagline: "Launch and scale your SaaS platform.",
    description:
      "We help businesses build scalable SaaS platforms with user dashboards, subscriptions, payment systems, automation features, and secure cloud architecture.",
    includes: [
      "User dashboards and account management",
      "Subscription and billing systems",
      "Secure cloud-based architecture",
      "Automation and workflow features",
      "Analytics and admin controls",
    ],
    benefits: [
      "A recurring-revenue product built to scale",
      "Secure, reliable infrastructure from day one",
      "Faster path from idea to launch",
    ],
    bestFor: "Founders and businesses building a subscription-based software product.",
    cta: "Plan My SaaS",
    icon: "cube",
    span: "md",
    relatedWork: ["helio-saas-platform"],
  },
  {
    slug: "crm-dashboard-development",
    title: "CRM & Dashboard Development",
    tagline: "See and manage your business in one place.",
    description:
      "We design and develop custom CRM systems and dashboards that help businesses manage leads, customers, sales, reports, teams, and operations in one place.",
    includes: [
      "Custom CRM and pipeline management",
      "Real-time reporting dashboards",
      "Lead, customer, and sales tracking",
      "Team and role management",
      "Integrations with your existing tools",
    ],
    benefits: [
      "A single source of truth for your operations",
      "Clear insights to drive better decisions",
      "Less time spent searching across systems",
    ],
    bestFor: "Teams managing leads, sales, and operations across scattered tools.",
    cta: "Build My Dashboard",
    icon: "crm",
    span: "lg",
    relatedWork: ["nimbus-crm-dashboard", "vertex-internal-platform"],
  },
  {
    slug: "api-integration",
    title: "API Integration",
    tagline: "Connect every tool into one smooth ecosystem.",
    description:
      "We connect your business tools, platforms, databases, CRMs, payment systems, AI models, and third-party applications into one smooth digital ecosystem.",
    includes: [
      "Third-party and platform integrations",
      "CRM, payment, and database connections",
      "AI model and automation integrations",
      "Secure data sync between systems",
      "Custom API development and maintenance",
    ],
    benefits: [
      "Your tools finally talk to each other",
      "Less manual data entry and fewer errors",
      "A connected, reliable digital ecosystem",
    ],
    bestFor: "Businesses running disconnected tools that need to work as one system.",
    cta: "Connect My Tools",
    icon: "api",
    span: "sm",
    relatedWork: ["nimbus-crm-dashboard", "vion-commerce-platform"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Growth campaigns tied to real results.",
    description:
      "We help businesses grow online through SEO, paid advertising, content strategy, conversion optimization, analytics, and automation-based marketing systems.",
    includes: [
      "SEO and search visibility",
      "Paid advertising and campaign management",
      "Content strategy and creation",
      "Conversion rate optimization",
      "Analytics, tracking, and reporting",
    ],
    benefits: [
      "More qualified traffic and leads",
      "Marketing spend tied to measurable outcomes",
      "A growth engine that compounds over time",
    ],
    bestFor: "Businesses that want predictable, measurable online growth.",
    cta: "Grow My Business",
    icon: "megaphone",
    span: "md",
    relatedWork: ["atlas-brand-site"],
  },
  {
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    tagline: "Online stores built to sell.",
    description:
      "We build ecommerce websites and online stores designed for smooth shopping experiences, secure payments, product management, and higher conversions.",
    includes: [
      "Custom ecommerce store design",
      "Secure payment and checkout setup",
      "Product and inventory management",
      "Conversion-focused product pages",
      "Order, shipping, and analytics tools",
    ],
    benefits: [
      "A seamless shopping experience that drives sales",
      "Secure, trusted checkout for customers",
      "Easy product and order management",
    ],
    bestFor: "Brands ready to sell online with a fast, conversion-focused store.",
    cta: "Launch My Store",
    icon: "cart",
    span: "sm",
    relatedWork: ["vion-commerce-platform"],
  },
];

export const whyChooseUs: { title: string; body: string }[] = [
  {
    title: "AI-First Business Approach",
    body: "We bring intelligence to everything we build, using automation and AI to remove friction, reduce manual work, and help your business operate smarter.",
  },
  {
    title: "Custom Solutions, Not Generic Templates",
    body: "Every system we deliver is designed around your goals and workflows — never forced into a one-size-fits-all template.",
  },
  {
    title: "Scalable and Secure Development",
    body: "We build on solid, secure foundations so your platforms perform reliably today and scale smoothly as your business grows.",
  },
  {
    title: "Clean User Experience and Premium Design",
    body: "Thoughtful, modern design and intuitive experiences make your products a pleasure to use for customers and teams alike.",
  },
  {
    title: "Automation Built Around Real Business Goals",
    body: "We automate the processes that matter most, tying every solution to measurable outcomes rather than features for their own sake.",
  },
  {
    title: "End-to-End Support From Planning to Launch",
    body: "From the first conversation to launch and beyond, we stay involved with clear communication, dependable delivery, and ongoing support.",
  },
];

export const process: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Discover",
    body: "We understand your business goals, challenges, workflows, and project requirements.",
  },
  {
    n: "02",
    title: "Plan",
    body: "We create a clear strategy, technical roadmap, and solution structure.",
  },
  {
    n: "03",
    title: "Design",
    body: "We design a clean, modern, and user-friendly experience that supports your business goals.",
  },
  {
    n: "04",
    title: "Develop",
    body: "We build your website, software, app, automation, or digital system using modern technology.",
  },
  {
    n: "05",
    title: "Test",
    body: "We review performance, security, usability, and functionality before launch.",
  },
  {
    n: "06",
    title: "Launch & Support",
    body: "We deploy your solution and provide ongoing support, improvements, and optimization.",
  },
];

export const industries: { name: string; body: string }[] = [
  {
    name: "Real Estate",
    body: "Lead automation, listing platforms, and CRMs that keep agents focused on closing deals.",
  },
  {
    name: "Healthcare",
    body: "Secure systems, patient portals, and automation that streamline care and administration.",
  },
  {
    name: "Ecommerce",
    body: "High-converting stores, automated operations, and dashboards that grow online sales.",
  },
  {
    name: "Finance",
    body: "Secure dashboards, reporting tools, and automation built for accuracy and compliance.",
  },
  {
    name: "Education",
    body: "Learning platforms, portals, and automation that simplify teaching and administration.",
  },
  {
    name: "Legal",
    body: "Document automation, case management systems, and secure client portals.",
  },
  {
    name: "Publishing",
    body: "Content platforms, editorial workflows, and automation that scale your output.",
  },
  {
    name: "Startups",
    body: "Fast, scalable MVPs and SaaS products that take your idea from concept to launch.",
  },
  {
    name: "Local Businesses",
    body: "Websites, booking systems, and automation that bring in and retain more customers.",
  },
  {
    name: "Enterprise Teams",
    body: "Custom platforms, integrations, and automation that connect complex operations.",
  },
];

export const featuredSolutions: { title: string; body: string }[] = [
  {
    title: "AI Lead Automation System",
    body: "Capture, qualify, and route leads automatically so your team follows up faster and never misses an opportunity.",
  },
  {
    title: "AI Customer Support Agent",
    body: "An intelligent agent that answers customer questions around the clock, resolving common requests and escalating the rest.",
  },
  {
    title: "Custom Business Dashboard",
    body: "A single, real-time view of your sales, operations, and performance metrics to support faster decisions.",
  },
  {
    title: "CRM Workflow Automation",
    body: "Automated pipelines, reminders, and updates that keep your CRM accurate and your team productive.",
  },
  {
    title: "SaaS Subscription Platform",
    body: "A scalable platform with user dashboards, billing, and automation, ready to grow recurring revenue.",
  },
  {
    title: "AI Marketing Funnel",
    body: "An automated funnel that nurtures leads, optimizes conversions, and turns traffic into customers.",
  },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "40–60%", label: "less manual work, typical" },
  { value: "3×", label: "faster delivery vs. in-house" },
  { value: "90+", label: "Lighthouse performance" },
  { value: "100%", label: "you own what we build" },
];

export const finalCta = {
  heading: "Ready to Build Your Next Digital Growth System?",
  body: "Whether you need AI automation, a custom website, business software, mobile app, CRM, dashboard, or SaaS platform, Agentix Solution can help you turn your idea into a powerful digital solution.",
  cta: { label: "Book a Free Consultation", href: "/contact" },
};

export type CaseMetric = { to: number; prefix?: string; suffix?: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string;
  results: string[];
  tech: string[];
  services: string[];
  year: string;
  accent: string; // css color for the tile glow
  metrics: CaseMetric[];
  gallery: { label: string; accent: string }[];
};

/** Placeholder portfolio — believable, premium, results-driven (not real clients). */
export const cases: CaseStudy[] = [
  {
    slug: "northwind-ops-agent",
    client: "Northwind Logistics",
    sector: "Logistics",
    title: "An ops agent that clears the inbox before 9am",
    summary:
      "A document-processing agent that triages shipping exceptions automatically and keeps three systems in sync.",
    challenge:
      "Northwind's operations team spent the first half of every day wading through exception emails — damaged shipments, customs holds, address failures — and manually updating their TMS, ERP, and customer portal for each one. The backlog routinely topped 300 emails by morning, follow-ups slipped past SLA, and two senior coordinators were effectively full-time on triage. Hiring more people would only scale the cost of a broken process.",
    approach:
      "We built a multi-step agent that reads each exception, classifies it against a trained taxonomy, drafts a tailored customer response, and writes updates back to all three systems through their APIs. Low-confidence or high-value cases route to a human approval queue in Slack, so people review the edge cases instead of every email. We instrumented the whole pipeline with audit logs, confidence thresholds, and guardrails, then tuned it weekly against real outcomes for the first two months.",
    results: [
      "~55% less manual review time across the ops team",
      "300-email overnight backlog cleared by 9am daily",
      "Handled 2.4× more exceptions with zero new headcount",
    ],
    tech: ["n8n", "OpenAI", "Postgres", "Slack", "REST APIs"],
    services: ["AI Automation", "AI Agent Development"],
    year: "2026",
    accent: "#5b6cff",
    metrics: [
      { to: 55, suffix: "%", label: "less manual review" },
      { to: 9, prefix: "by ", suffix: "am", label: "backlog cleared" },
      { to: 0, label: "new headcount" },
    ],
    gallery: [
      { label: "Exception triage", accent: "#5b6cff" },
      { label: "System sync", accent: "#2e3192" },
      { label: "Approval queue", accent: "#7a2e8f" },
    ],
  },
  {
    slug: "helio-saas-platform",
    client: "Helio",
    sector: "B2B SaaS",
    title: "A subscription platform that launched in one quarter",
    summary:
      "A multi-tenant SaaS platform with metered billing, dashboards, and self-serve onboarding, live before the next funding milestone.",
    challenge:
      "Helio had validated strong demand through a manual pilot but had no real product — just a waitlist and a deadline. They needed a secure, multi-tenant subscription platform live before their next funding milestone, with billing, role-based access, and onboarding that didn't require a sales call for every signup. A misstep on architecture early would have forced an expensive rebuild a year later.",
    approach:
      "We designed and built a multi-tenant platform with isolated workspaces, role-based access control, metered subscription billing through Stripe, and a self-serve onboarding flow that gets a new account productive in minutes. A clean admin layer gave the Helio team visibility into accounts, usage, and revenue without engineering involvement. Everything shipped with automated tests, CI/CD, and observability so the platform could scale without firefighting.",
    results: [
      "Launched in a single quarter, ahead of the funding milestone",
      "Self-serve signups converting from day one with no manual setup",
      "Metered recurring revenue live and reconciling automatically at launch",
    ],
    tech: ["Next.js", "TypeScript", "Postgres", "Stripe Billing", "AWS"],
    services: ["SaaS Development", "Software Development"],
    year: "2026",
    accent: "#3f7bd6",
    metrics: [
      { to: 1, prefix: "in ", suffix: " quarter", label: "to launch" },
      { to: 99.9, suffix: "%", label: "platform uptime" },
      { to: 3, suffix: "×", label: "faster onboarding" },
    ],
    gallery: [
      { label: "User dashboard", accent: "#3f7bd6" },
      { label: "Subscription billing", accent: "#2e3192" },
      { label: "Admin controls", accent: "#5b6cff" },
    ],
  },
  {
    slug: "vion-commerce-platform",
    client: "Vion Market",
    sector: "Retail / Ecommerce",
    title: "An online store wired into every back-office system",
    summary:
      "A high-converting storefront integrated with payments, inventory, and fulfillment, with real-time sync replacing manual reconciliation.",
    challenge:
      "Vion Market's storefront lived in its own silo, disconnected from their inventory system, payment gateway, and fulfillment provider. Staff reconciled orders by hand every day, oversold popular SKUs that were actually out of stock, and shipped late because order data reached the warehouse on a spreadsheet. The mess capped how fast they could grow and quietly eroded customer trust.",
    approach:
      "We rebuilt the store on a fast, conversion-focused foundation with streamlined product pages and a frictionless checkout. Then we connected it to their payment gateway, inventory system, and fulfillment provider through reliable API integrations and webhooks, so stock levels, orders, and shipping status sync in real time. We added monitoring and automatic retries so a single failed call never silently breaks an order again.",
    results: [
      "32% higher checkout conversion after the rebuild",
      "Real-time stock and order sync ended overselling",
      "Daily manual reconciliation eliminated entirely",
    ],
    tech: ["Next.js", "TypeScript", "Stripe", "REST & webhooks", "Postgres"],
    services: ["Ecommerce Development", "API Integration"],
    year: "2026",
    accent: "#1f9c8b",
    metrics: [
      { to: 32, suffix: "%", label: "higher conversion" },
      { to: 0, label: "manual reconciliation" },
      { to: 4, label: "systems integrated" },
    ],
    gallery: [
      { label: "Storefront", accent: "#1f9c8b" },
      { label: "Checkout & payments", accent: "#157f70" },
      { label: "Inventory sync", accent: "#2e3192" },
    ],
  },
  {
    slug: "vertex-internal-platform",
    client: "Vertex Health",
    sector: "Healthcare",
    title: "Replacing five spreadsheets with one platform",
    summary:
      "A custom internal platform with an AI copilot that retired fragile spreadsheets and turned hours of reporting into seconds.",
    challenge:
      "Vertex Health ran critical scheduling, capacity, and compliance operations across five interlinked spreadsheets that only one person fully understood. Broken formulas caused real downstream errors, onboarding a new coordinator took weeks, and a single corrupted file could stall a department. Every monthly report meant hours of manual copy-paste before anyone could trust the numbers.",
    approach:
      "We mapped the spreadsheet logic into a bespoke internal platform with structured data, role-based permissions, and validation that prevents the bad-data errors the old system invited. An AI copilot lets staff search records and generate reports in plain language instead of hunting through tabs. We shipped it with a full test suite, documentation, and a hands-on handover so the team owns and extends it without depending on us.",
    results: [
      "5 brittle spreadsheets retired and consolidated",
      "Monthly reports generated in seconds, not hours",
      "Owned and operated 100% by the internal team",
    ],
    tech: ["Next.js", "TypeScript", "Postgres", "AI copilot", "Prisma"],
    services: ["Software Development", "CRM & Dashboard Development"],
    year: "2025",
    accent: "#4448c7",
    metrics: [
      { to: 5, label: "spreadsheets retired" },
      { to: 100, suffix: "%", label: "team-owned" },
      { to: 60, suffix: "×", label: "faster reporting" },
    ],
    gallery: [
      { label: "Unified data", accent: "#4448c7" },
      { label: "AI copilot", accent: "#2e3192" },
      { label: "Live reports", accent: "#7a2e8f" },
    ],
  },
  {
    slug: "lumen-support-agent",
    client: "Lumen Energy",
    sector: "Utilities / Energy",
    title: "A support agent that resolves the first reply for you",
    summary:
      "An AI customer-support agent that answers billing and account questions instantly and deflects the bulk of repetitive tickets.",
    challenge:
      "Lumen Energy's support team was buried under repetitive tickets — billing explanations, meter questions, payment plans, outage status — that all had documented answers but still needed a human to type them out. First-response times stretched past a day during peak periods, customer satisfaction dipped, and agents burned out on questions they'd answered a thousand times. Adding contractors only papered over the underlying volume problem.",
    approach:
      "We built a customer-support agent grounded in Lumen's billing policies, knowledge base, and account API, so it answers from verified facts rather than guesses. It handles the full conversation for common requests — pulling real account data, explaining charges, and setting up payment plans — while anything sensitive or low-confidence hands off cleanly to a human with full context attached. We added strict guardrails, escalation rules, and a feedback loop that flags weak answers for review and continuous tuning.",
    results: [
      "68% of tier-1 tickets resolved without a human",
      "First-response time cut from 19 hours to under 1 minute",
      "CSAT up 14 points on AI-handled conversations",
    ],
    tech: ["TypeScript", "OpenAI", "Pinecone", "Zendesk API", "Node.js"],
    services: ["AI Agent Development", "AI Automation"],
    year: "2026",
    accent: "#6a4dd6",
    metrics: [
      { to: 68, suffix: "%", label: "tickets auto-resolved" },
      { to: 1, prefix: "<", suffix: " min", label: "first response" },
      { to: 14, prefix: "+", suffix: " pts", label: "CSAT lift" },
    ],
    gallery: [
      { label: "Live chat agent", accent: "#6a4dd6" },
      { label: "Knowledge grounding", accent: "#2e3192" },
      { label: "Human handoff", accent: "#7a2e8f" },
    ],
  },
  {
    slug: "atlas-brand-site",
    client: "Atlas Advisory",
    sector: "Professional Services",
    title: "A brand site that turned traffic into booked calls",
    summary:
      "A fast, high-converting marketing site paired with a focused growth program that more than doubled qualified consultation bookings.",
    challenge:
      "Atlas Advisory's old website looked dated, loaded slowly, and buried their best work below the fold, so visitors left without ever understanding the offer. The marketing team had no clear conversion path and no reliable analytics, which made every ad dollar a guess. They needed a site that built trust on first impression and a growth engine that turned visits into booked consultations.",
    approach:
      "We designed and built a fast, responsive brand site with a clear narrative, social proof, and a single obvious path to booking a call. On launch we paired it with a focused growth program — technical SEO, landing pages for paid search, and full conversion tracking — so every channel could be measured and optimized against booked calls, not vanity clicks. Continuous A/B testing on headlines, hero, and CTA placement compounded the gains over the first three months.",
    results: [
      "2.3× more qualified consultation bookings",
      "Largest Contentful Paint under 1.2s on mobile",
      "47% lower cost per booked call from paid search",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Sanity CMS", "GA4"],
    services: ["Website Development", "Digital Marketing"],
    year: "2026",
    accent: "#e2542c",
    metrics: [
      { to: 2.3, suffix: "×", label: "more bookings" },
      { to: 1.2, prefix: "<", suffix: "s", label: "mobile LCP" },
      { to: 47, suffix: "%", label: "lower cost per call" },
    ],
    gallery: [
      { label: "Brand landing", accent: "#e2542c" },
      { label: "Booking funnel", accent: "#7a2e8f" },
      { label: "Conversion analytics", accent: "#2e3192" },
    ],
  },
  {
    slug: "orbit-fitness-app",
    client: "Orbit Fitness",
    sector: "Health & Fitness",
    title: "A cross-platform app that kept members coming back",
    summary:
      "A single iOS and Android app with class booking, progress tracking, and a backend built to scale, lifting 30-day retention.",
    challenge:
      "Orbit Fitness ran on a clumsy third-party booking tool and a separate web portal, so members juggled multiple logins just to reserve a class or check their progress. The disjointed experience drove drop-off after the first month and gave Orbit no unified view of member activity. They wanted one polished app for both platforms, backed by a system that could handle peak booking spikes without falling over.",
    approach:
      "We built a single cross-platform app for iOS and Android with class booking, real-time availability, progress tracking, and push reminders, all behind one clean sign-in. A secure, scalable backend handles the Monday-morning booking rush and gives Orbit a unified view of member engagement for the first time. We instrumented retention and booking funnels from launch so product decisions are driven by real usage, then shipped through the app stores with full release support.",
    results: [
      "30-day member retention up 41%",
      "4.8-star average across both app stores",
      "Booking time cut from 5 taps to 2",
    ],
    tech: ["React Native", "TypeScript", "Node.js", "Postgres", "Expo"],
    services: ["Mobile App Development", "Software Development"],
    year: "2025",
    accent: "#1f9c8b",
    metrics: [
      { to: 41, prefix: "+", suffix: "%", label: "30-day retention" },
      { to: 4.8, prefix: "★ ", label: "app store rating" },
      { to: 2, label: "taps to book" },
    ],
    gallery: [
      { label: "Class booking", accent: "#1f9c8b" },
      { label: "Progress tracking", accent: "#157f70" },
      { label: "Push reminders", accent: "#2e3192" },
    ],
  },
  {
    slug: "nimbus-crm-dashboard",
    client: "Nimbus Realty",
    sector: "Real Estate",
    title: "A CRM and dashboard that ended the daily data hunt",
    summary:
      "A custom CRM and live analytics dashboard that unified leads from every channel and connected the team's scattered tools.",
    challenge:
      "Nimbus Realty's agents tracked leads across a generic CRM, email, two listing portals, and a pile of spreadsheets, so nobody trusted the pipeline and follow-ups fell through the cracks. Leadership had no real-time view of conversion, agent performance, or where deals stalled, and assembling a weekly report meant a half-day of manual stitching. The disconnected tools were costing real commissions.",
    approach:
      "We built a custom CRM tailored to their sales process, with pipeline stages, automated follow-up reminders, and role-based access for agents and managers. We integrated their listing portals, email, and calendar through APIs so every lead lands in one place automatically, with no double entry. On top sits a live analytics dashboard showing pipeline health, conversion, and agent performance in real time, replacing the weekly manual report entirely.",
    results: [
      "6 disconnected tools unified into one system",
      "28% faster lead follow-up with automated reminders",
      "Weekly reporting time cut from half a day to zero",
    ],
    tech: ["Next.js", "TypeScript", "Postgres", "REST APIs", "Recharts"],
    services: ["CRM & Dashboard Development", "API Integration"],
    year: "2026",
    accent: "#a23bbf",
    metrics: [
      { to: 6, label: "tools unified" },
      { to: 28, suffix: "%", label: "faster follow-up" },
      { to: 0, suffix: " hrs", label: "manual reporting" },
    ],
    gallery: [
      { label: "Sales pipeline", accent: "#a23bbf" },
      { label: "Live dashboard", accent: "#7a2e8f" },
      { label: "Lead integrations", accent: "#2e3192" },
    ],
  },
];

export type Testimonial = { quote: string; name: string; role: string };

/** Placeholder social proof. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "They didn't just demo AI — they put it into production. The automation paid for itself in the first quarter.",
    name: "Operations Lead",
    role: "Logistics company",
  },
  {
    quote:
      "Easily the best-looking site in our category. Fast, polished, and it actually converts.",
    name: "Founder",
    role: "Creative studio",
  },
  {
    quote:
      "Senior people, real engineering, clear ownership. Exactly what we needed after a failed AI pilot.",
    name: "VP Product",
    role: "B2B SaaS",
  },
];

export type TeamMember = { name: string; role: string; bio: string; accent: string };

/** Placeholder team — swap for real people. */
export const team: TeamMember[] = [
  {
    name: "A. Rahman",
    role: "Founder & AI Lead",
    bio: "Ships agents and automation to production. Ex-platform engineer.",
    accent: "#5b6cff",
  },
  {
    name: "M. Silva",
    role: "Design Director",
    bio: "Leads product, UX, and brand design across web, software, and apps. Detail obsessive.",
    accent: "#e2542c",
  },
  {
    name: "K. Osei",
    role: "Principal Engineer",
    bio: "Custom software and platforms, with tests and CI/CD from day one.",
    accent: "#a23bbf",
  },
  {
    name: "J. Park",
    role: "Growth & Marketing Lead",
    bio: "Builds measurable growth programs across search, paid, and conversion.",
    accent: "#7a2e8f",
  },
];

/** Placeholder client logos (wordmarks rendered as text). */
export const clients: string[] = [
  "Northwind",
  "Lumen",
  "Atlas",
  "Vertex",
  "Orbit",
  "Nimbus",
  "Quanta",
  "Helix",
];

export const about = {
  heroHeadline: "Building the Intelligent Systems Behind Modern Businesses",
  intro:
    "Agentix Solution is a technology development agency built around one idea: businesses grow faster when their systems do the heavy lifting. We combine AI automation, custom software development, and premium design to help companies replace manual work with intelligent, reliable technology. From AI agents and automation to websites, apps, SaaS platforms, CRMs, and dashboards, we deliver end-to-end solutions that are built to perform and built to last.",
  mission:
    "Our mission is to make advanced technology practical and accessible for businesses of every size — helping teams automate the work that slows them down, build the products their customers love, and scale with confidence.",
  vision:
    "We envision a future where every growing business runs on intelligent, connected systems. We're building toward that future by making AI automation and custom development the foundation of how modern companies operate.",
  different: [
    {
      title: "AI at the Core",
      body: "We design intelligence into everything we build, using automation and AI to remove friction and unlock real efficiency.",
    },
    {
      title: "Built Around Your Business",
      body: "Every solution is tailored to your goals and workflows — never a generic template forced to fit.",
    },
    {
      title: "Engineering You Can Trust",
      body: "We build secure, scalable, and well-documented systems designed to perform reliably and grow with you.",
    },
    {
      title: "Design That Feels Premium",
      body: "Clean, modern, and intuitive experiences make your products a pleasure to use and a pleasure to own.",
    },
    {
      title: "True End-to-End Partnership",
      body: "From planning to launch and beyond, we stay involved with clear communication and dependable support.",
    },
  ],
  approach:
    "We start by understanding your business — your goals, your workflows, and the challenges holding you back. From there, we plan a clear strategy, design a clean experience, and build with modern, proven technology. Every project is delivered with careful testing, transparent communication, and a focus on measurable results, so the solution we hand over is one your team can rely on and grow with.",
};

export const servicesPage = {
  heading: "Technology and Automation Services That Drive Growth",
  intro:
    "From AI automation and custom software to websites, apps, SaaS platforms, and digital marketing, we deliver the systems modern businesses need to work smarter and scale faster.",
  whyDifferent: [
    {
      title: "Solutions Built Around Outcomes",
      body: "We focus on the results that matter to your business, not a checklist of features — every solution is tied to measurable goals.",
    },
    {
      title: "AI and Automation by Default",
      body: "We bring intelligence and automation into every service, helping you reduce manual work and operate more efficiently.",
    },
    {
      title: "Premium Quality, End to End",
      body: "From design to development to launch, we hold every project to a high standard of quality, security, and reliability.",
    },
    {
      title: "One Partner for Your Digital Systems",
      body: "Automation, software, web, mobile, and growth — all delivered by one team that understands how the pieces fit together.",
    },
  ],
};

export const contactInfo = {
  headline: "Let’s Build Something Intelligent Together",
  subheadline:
    "Tell us about your project, goals, or business challenge. Our team will review your requirements and help you choose the right technology solution.",
  cta: "Send Message",
};

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What services does Agentix Solution provide?",
    a: "We provide AI automation, AI agent development, website and mobile app development, custom software, SaaS platforms, CRM and dashboard development, API integration, ecommerce, and digital marketing. In short, we help businesses build and connect the digital systems they need to grow.",
  },
  {
    q: "Can you build custom AI automation for my business?",
    a: "Yes. We design automation around your specific workflows — from lead management and reporting to customer support and internal operations — so your team spends less time on repetitive tasks and more time on growth.",
  },
  {
    q: "Do you build websites and mobile apps?",
    a: "Absolutely. We build modern, responsive websites and high-performance iOS and Android apps, all designed for a smooth user experience and built on secure, scalable foundations.",
  },
  {
    q: "Can you create CRM or dashboard systems?",
    a: "Yes. We develop custom CRMs and dashboards that bring your leads, customers, sales, reports, and operations into one place, giving you clear visibility and better control over your business.",
  },
  {
    q: "Can you integrate AI with existing tools?",
    a: "We do this often. We connect AI models, CRMs, payment systems, databases, and third-party platforms through API integration, so your tools work together as one smooth, intelligent ecosystem.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines depend on scope. Smaller projects can take a few weeks, while larger platforms take longer. After an initial discovery call, we'll share a clear roadmap with realistic milestones.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. We don't disappear at launch. We offer ongoing support, improvements, and optimization to keep your systems running smoothly and evolving with your business.",
  },
  {
    q: "How do we get started?",
    a: "Simply reach out through our contact page to book a free consultation. We'll review your goals and requirements, then recommend the right solution and outline clear next steps.",
  },
];
