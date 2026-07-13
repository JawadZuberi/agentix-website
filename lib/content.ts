/**
 * Single source of truth for all website copy.
 * Field names are fixed by the content contract — page components consume these exports.
 */

export const hero = {
  headline: "AI automation that ships to production — not another demo.",
  subheadline:
    "We build the AI agents and automations that run your business day to day — engineered, tested, and handed over as code you own outright.",
  ctaPrimary: { label: "Start Your Project", href: "/contact" },
  ctaSecondary: { label: "Explore Our Services", href: "/services" },
  trustLine:
    "AI Automation & Agents — plus the software, web, and growth systems around them",
};

export const aboutPreview = {
  heading: "AI automation, built to run your business",
  body: "Agentix Solution is an AI automation agency. Our core work is building AI agents and automations that ship to production — and the software, websites, apps, CRMs, and dashboards that surround them. We help forward-thinking businesses replace manual work with intelligent systems they own and can rely on.",
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
  { value: "90+", label: "Lighthouse performance target" },
  { value: "100%", label: "code ownership, handed to you" },
  { value: "Senior", label: "led delivery, start to finish" },
  { value: "AI-first", label: "automation and agents by default" },
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

/**
 * Reference builds — illustrative concept projects that show the systems we
 * design and the outcomes they're built to target. These are not real signed
 * clients or measured results; company names are descriptors, and every number
 * is a design target ("built to…"), not a reported outcome. Swap in real,
 * client-approved case studies with measured results once available.
 */
export const cases: CaseStudy[] = [
  {
    slug: "northwind-ops-agent",
    client: "Logistics operations agent",
    sector: "Logistics",
    title: "An ops agent that clears the inbox before 9am",
    summary:
      "A reference build: a document-processing agent that triages shipping exceptions automatically and keeps three systems in sync.",
    challenge:
      "A typical logistics operations team spends the first half of every day wading through exception emails — damaged shipments, customs holds, address failures — and manually updating a TMS, ERP, and customer portal for each one. Backlogs routinely top hundreds of emails by morning, follow-ups slip past SLA, and senior coordinators end up effectively full-time on triage. Hiring more people only scales the cost of a broken process — the problem this build is designed to solve.",
    approach:
      "We design a multi-step agent that reads each exception, classifies it against a trained taxonomy, drafts a tailored customer response, and writes updates back to all three systems through their APIs. Low-confidence or high-value cases route to a human approval queue in Slack, so people review the edge cases instead of every email. The whole pipeline is instrumented with audit logs, confidence thresholds, and guardrails, then tuned against real outcomes after go-live.",
    results: [
      "Designed to cut manual review time across the ops team",
      "Built to clear the overnight exception backlog by 9am daily",
      "Aims to handle far more exceptions with no new headcount",
    ],
    tech: ["n8n", "OpenAI", "Postgres", "Slack", "REST APIs"],
    services: ["AI Automation", "AI Agent Development"],
    year: "Concept",
    accent: "#5b6cff",
    metrics: [
      { to: 9, prefix: "by ", suffix: "am", label: "backlog target" },
      { to: 3, label: "systems kept in sync" },
      { to: 0, label: "new headcount by design" },
    ],
    gallery: [
      { label: "Exception triage", accent: "#5b6cff" },
      { label: "System sync", accent: "#2e3192" },
      { label: "Approval queue", accent: "#7a2e8f" },
    ],
  },
  {
    slug: "helio-saas-platform",
    client: "Subscription SaaS platform",
    sector: "B2B SaaS",
    title: "A subscription platform built to launch in one quarter",
    summary:
      "A reference build: a multi-tenant SaaS platform with metered billing, dashboards, and self-serve onboarding, scoped to go live before a funding milestone.",
    challenge:
      "A common early-stage scenario: strong demand validated through a manual pilot, but no real product — just a waitlist and a deadline. The team needs a secure, multi-tenant subscription platform live before their next funding milestone, with billing, role-based access, and onboarding that doesn't require a sales call for every signup. A misstep on architecture early would force an expensive rebuild a year later — the risk this build is designed to avoid.",
    approach:
      "We design and build a multi-tenant platform with isolated workspaces, role-based access control, metered subscription billing through Stripe, and a self-serve onboarding flow that gets a new account productive in minutes. A clean admin layer gives the team visibility into accounts, usage, and revenue without engineering involvement. Everything ships with automated tests, CI/CD, and observability so the platform can scale without firefighting.",
    results: [
      "Scoped to launch in a single quarter, ahead of a funding milestone",
      "Self-serve signups designed to convert from day one with no manual setup",
      "Metered recurring revenue built to reconcile automatically at launch",
    ],
    tech: ["Next.js", "TypeScript", "Postgres", "Stripe Billing", "AWS"],
    services: ["SaaS Development", "Software Development"],
    year: "Concept",
    accent: "#3f7bd6",
    metrics: [
      { to: 1, prefix: "in ", suffix: " quarter", label: "target to launch" },
      { to: 3, label: "core systems, one platform" },
      { to: 100, suffix: "%", label: "self-serve onboarding" },
    ],
    gallery: [
      { label: "User dashboard", accent: "#3f7bd6" },
      { label: "Subscription billing", accent: "#2e3192" },
      { label: "Admin controls", accent: "#5b6cff" },
    ],
  },
  {
    slug: "vion-commerce-platform",
    client: "Integrated ecommerce platform",
    sector: "Retail / Ecommerce",
    title: "An online store wired into every back-office system",
    summary:
      "A reference build: a high-converting storefront integrated with payments, inventory, and fulfillment, with real-time sync replacing manual reconciliation.",
    challenge:
      "A frequent retail problem: a storefront that lives in its own silo, disconnected from the inventory system, payment gateway, and fulfillment provider. Staff reconcile orders by hand every day, oversell popular SKUs that are actually out of stock, and ship late because order data reaches the warehouse on a spreadsheet. That mess caps how fast a brand can grow and quietly erodes customer trust — exactly what this build is designed to fix.",
    approach:
      "We rebuild the store on a fast, conversion-focused foundation with streamlined product pages and a frictionless checkout. Then we connect it to the payment gateway, inventory system, and fulfillment provider through reliable API integrations and webhooks, so stock levels, orders, and shipping status sync in real time. Monitoring and automatic retries mean a single failed call never silently breaks an order.",
    results: [
      "Designed to lift checkout conversion after the rebuild",
      "Real-time stock and order sync built to end overselling",
      "Built to eliminate daily manual reconciliation entirely",
    ],
    tech: ["Next.js", "TypeScript", "Stripe", "REST & webhooks", "Postgres"],
    services: ["Ecommerce Development", "API Integration"],
    year: "Concept",
    accent: "#1f9c8b",
    metrics: [
      { to: 0, label: "manual reconciliation by design" },
      { to: 4, label: "systems integrated" },
      { to: 100, suffix: "%", label: "real-time stock sync" },
    ],
    gallery: [
      { label: "Storefront", accent: "#1f9c8b" },
      { label: "Checkout & payments", accent: "#157f70" },
      { label: "Inventory sync", accent: "#2e3192" },
    ],
  },
  {
    slug: "vertex-internal-platform",
    client: "Internal operations platform",
    sector: "Healthcare",
    title: "Replacing five spreadsheets with one platform",
    summary:
      "A reference build: a custom internal platform with an AI copilot that retires fragile spreadsheets and turns hours of reporting into seconds.",
    challenge:
      "A situation we see often: critical scheduling, capacity, and compliance operations run across five interlinked spreadsheets that only one person fully understands. Broken formulas cause real downstream errors, onboarding a new coordinator takes weeks, and a single corrupted file can stall a department. Every monthly report means hours of manual copy-paste before anyone can trust the numbers — the fragility this build is designed to remove.",
    approach:
      "We map the spreadsheet logic into a bespoke internal platform with structured data, role-based permissions, and validation that prevents the bad-data errors the old system invited. An AI copilot lets staff search records and generate reports in plain language instead of hunting through tabs. It ships with a full test suite, documentation, and a hands-on handover so the team owns and extends it without depending on us.",
    results: [
      "Built to retire and consolidate brittle spreadsheets",
      "Designed to generate monthly reports in seconds, not hours",
      "Handed over to be owned and operated 100% by the internal team",
    ],
    tech: ["Next.js", "TypeScript", "Postgres", "AI copilot", "Prisma"],
    services: ["Software Development", "CRM & Dashboard Development"],
    year: "Concept",
    accent: "#4448c7",
    metrics: [
      { to: 5, label: "spreadsheets it replaces" },
      { to: 100, suffix: "%", label: "team-owned by design" },
      { to: 1, prefix: "1 ", label: "source of truth" },
    ],
    gallery: [
      { label: "Unified data", accent: "#4448c7" },
      { label: "AI copilot", accent: "#2e3192" },
      { label: "Live reports", accent: "#7a2e8f" },
    ],
  },
  {
    slug: "lumen-support-agent",
    client: "Customer support agent",
    sector: "Utilities / Energy",
    title: "A support agent that resolves the first reply for you",
    summary:
      "A reference build: an AI customer-support agent that answers billing and account questions instantly and deflects the bulk of repetitive tickets.",
    challenge:
      "A common support bottleneck: a team buried under repetitive tickets — billing explanations, meter questions, payment plans, outage status — that all have documented answers but still need a human to type them out. First-response times stretch past a day during peak periods, customer satisfaction dips, and agents burn out on questions they've answered a thousand times. Adding contractors only papers over the underlying volume problem this build is designed to address.",
    approach:
      "We build a customer-support agent grounded in the client's billing policies, knowledge base, and account API, so it answers from verified facts rather than guesses. It handles the full conversation for common requests — pulling real account data, explaining charges, and setting up payment plans — while anything sensitive or low-confidence hands off cleanly to a human with full context attached. Strict guardrails, escalation rules, and a feedback loop flag weak answers for review and continuous tuning.",
    results: [
      "Designed to resolve the bulk of tier-1 tickets without a human",
      "Built to cut first-response time from hours to under a minute",
      "Aims to lift CSAT on AI-handled conversations",
    ],
    tech: ["TypeScript", "OpenAI", "Pinecone", "Zendesk API", "Node.js"],
    services: ["AI Agent Development", "AI Automation"],
    year: "Concept",
    accent: "#6a4dd6",
    metrics: [
      { to: 1, prefix: "<", suffix: " min", label: "first-response target" },
      { to: 24, prefix: "", suffix: "/7", label: "coverage" },
      { to: 100, suffix: "%", label: "grounded in verified facts" },
    ],
    gallery: [
      { label: "Live chat agent", accent: "#6a4dd6" },
      { label: "Knowledge grounding", accent: "#2e3192" },
      { label: "Human handoff", accent: "#7a2e8f" },
    ],
  },
  {
    slug: "atlas-brand-site",
    client: "Advisory brand site",
    sector: "Professional Services",
    title: "A brand site that turns traffic into booked calls",
    summary:
      "A reference build: a fast, high-converting marketing site paired with a focused growth program designed to grow qualified consultation bookings.",
    challenge:
      "A familiar professional-services problem: a dated website that loads slowly and buries the best work below the fold, so visitors leave without ever understanding the offer. The marketing team has no clear conversion path and no reliable analytics, which makes every ad dollar a guess. What's needed is a site that builds trust on first impression and a growth engine that turns visits into booked consultations — the outcome this build targets.",
    approach:
      "We design and build a fast, responsive brand site with a clear narrative, social proof, and a single obvious path to booking a call. On launch we pair it with a focused growth program — technical SEO, landing pages for paid search, and full conversion tracking — so every channel can be measured and optimized against booked calls, not vanity clicks. Continuous A/B testing on headlines, hero, and CTA placement compounds the gains over time.",
    results: [
      "Designed to grow qualified consultation bookings",
      "Built to keep Largest Contentful Paint under 1.2s on mobile",
      "Aims to lower cost per booked call from paid search",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Sanity CMS", "GA4"],
    services: ["Website Development", "Digital Marketing"],
    year: "Concept",
    accent: "#e2542c",
    metrics: [
      { to: 1.2, prefix: "<", suffix: "s", label: "mobile LCP target" },
      { to: 90, prefix: "", suffix: "+", label: "Lighthouse target" },
      { to: 1, prefix: "1 ", label: "clear path to book" },
    ],
    gallery: [
      { label: "Brand landing", accent: "#e2542c" },
      { label: "Booking funnel", accent: "#7a2e8f" },
      { label: "Conversion analytics", accent: "#2e3192" },
    ],
  },
  {
    slug: "orbit-fitness-app",
    client: "Fitness membership app",
    sector: "Health & Fitness",
    title: "A cross-platform app that keeps members coming back",
    summary:
      "A reference build: a single iOS and Android app with class booking, progress tracking, and a backend built to scale and lift 30-day retention.",
    challenge:
      "A common fitness-business setup: a clumsy third-party booking tool and a separate web portal, so members juggle multiple logins just to reserve a class or check their progress. The disjointed experience drives drop-off after the first month and gives the business no unified view of member activity. What's needed is one polished app for both platforms, backed by a system that can handle peak booking spikes without falling over — the goal of this build.",
    approach:
      "We build a single cross-platform app for iOS and Android with class booking, real-time availability, progress tracking, and push reminders, all behind one clean sign-in. A secure, scalable backend handles the Monday-morning booking rush and gives the business a unified view of member engagement for the first time. Retention and booking funnels are instrumented from launch so product decisions are driven by real usage, then shipped through the app stores with full release support.",
    results: [
      "Designed to lift 30-day member retention",
      "Built for a polished experience across both app stores",
      "Booking flow streamlined from 5 taps to 2",
    ],
    tech: ["React Native", "TypeScript", "Node.js", "Postgres", "Expo"],
    services: ["Mobile App Development", "Software Development"],
    year: "Concept",
    accent: "#1f9c8b",
    metrics: [
      { to: 2, label: "taps to book" },
      { to: 2, label: "platforms, one app" },
      { to: 100, suffix: "%", label: "unified member view" },
    ],
    gallery: [
      { label: "Class booking", accent: "#1f9c8b" },
      { label: "Progress tracking", accent: "#157f70" },
      { label: "Push reminders", accent: "#2e3192" },
    ],
  },
  {
    slug: "nimbus-crm-dashboard",
    client: "Real-estate CRM & dashboard",
    sector: "Real Estate",
    title: "A CRM and dashboard that ends the daily data hunt",
    summary:
      "A reference build: a custom CRM and live analytics dashboard that unifies leads from every channel and connects a team's scattered tools.",
    challenge:
      "A typical real-estate operation tracks leads across a generic CRM, email, two listing portals, and a pile of spreadsheets, so nobody trusts the pipeline and follow-ups fall through the cracks. Leadership has no real-time view of conversion, agent performance, or where deals stall, and assembling a weekly report means a half-day of manual stitching. Disconnected tools cost real commissions — the leak this build is designed to close.",
    approach:
      "We build a custom CRM tailored to the sales process, with pipeline stages, automated follow-up reminders, and role-based access for agents and managers. Listing portals, email, and calendar integrate through APIs so every lead lands in one place automatically, with no double entry. On top sits a live analytics dashboard showing pipeline health, conversion, and agent performance in real time, replacing the weekly manual report entirely.",
    results: [
      "Built to unify disconnected tools into one system",
      "Designed to speed up lead follow-up with automated reminders",
      "Built to cut weekly reporting from half a day to near zero",
    ],
    tech: ["Next.js", "TypeScript", "Postgres", "REST APIs", "Recharts"],
    services: ["CRM & Dashboard Development", "API Integration"],
    year: "Concept",
    accent: "#a23bbf",
    metrics: [
      { to: 6, label: "tools it unifies" },
      { to: 0, suffix: " hrs", label: "manual reporting by design" },
      { to: 1, prefix: "1 ", label: "pipeline, one view" },
    ],
    gallery: [
      { label: "Sales pipeline", accent: "#a23bbf" },
      { label: "Live dashboard", accent: "#7a2e8f" },
      { label: "Lead integrations", accent: "#2e3192" },
    ],
  },
];

export type Testimonial = { quote: string; name: string; role: string };

/**
 * Principles we build to — not client testimonials. These are unattributed
 * statements of intent that describe the kind of outcome each project is
 * designed for. Replace with real, named, client-approved quotes once you
 * have sign-off; keep the { quote, name, role } shape stable for consumers.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We don't stop at a demo. We ship AI into production — automations that run every day and earn their place in your operations.",
    name: "How we work",
    role: "AI automation & agents",
  },
  {
    quote:
      "No black boxes. Senior people, real engineering, and a system you own outright — code, infrastructure, and documentation included.",
    name: "What you get",
    role: "Ownership & engineering",
  },
  {
    quote:
      "Fast by default. We build sites and products that load in seconds and are designed to convert, not just to look good.",
    name: "Our standard",
    role: "Performance & design",
  },
  {
    quote:
      "One source of truth. We replace scattered tools and spreadsheets with a single system your team actually trusts and adopts.",
    name: "The outcome we design for",
    role: "Systems & dashboards",
  },
];

export type TeamMember = { name: string; role: string; bio: string; accent: string };

/** Real team. Add more members here as the team grows — shape stays stable. */
export const team: TeamMember[] = [
  {
    name: "Jawad Zuberi",
    role: "CEO & Founder",
    bio: "Leads Agentix Solution end to end, shipping AI automation, agents, and custom software to production for clients who want systems they own.",
    accent: "#5b6cff",
  },
];

/**
 * Real, production-grade tooling we build with (rendered as wordmarks) — not
 * client logos. Honest and verifiable in place of fabricated client names.
 */
export const clients: string[] = [
  "OpenAI",
  "Anthropic",
  "Vercel",
  "Next.js",
  "Supabase",
  "Stripe",
  "Postgres",
  "n8n",
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
      title: "AI specialists, not generalists",
      body: "Automation and AI agents are our core craft. Everything else we build exists to make that intelligence useful in your business.",
    },
    {
      title: "We ship to production",
      body: "Our work doesn't end at a prototype. We take systems all the way to live, tested, and running in the real world.",
    },
    {
      title: "You own everything",
      body: "Code, infrastructure, and documentation are handed to you. No lock-in, no black boxes, no dependence on us to keep the lights on.",
    },
    {
      title: "Senior-led craft",
      body: "Experienced people design and build your systems directly — thoughtful, modern, and a pleasure to use and to own.",
    },
    {
      title: "A partner through launch",
      body: "We stay close from first conversation to go-live and beyond, with clear communication and dependable delivery.",
    },
  ],
  approach:
    "We start by understanding your business — your goals, your workflows, and the challenges holding you back. From there, we plan a clear strategy, design a clean experience, and build with modern, proven technology. Every project is delivered with careful testing, transparent communication, and a focus on measurable results, so the solution we hand over is one your team can rely on and grow with.",
};

export const servicesPage = {
  heading: "AI Automation Services — and Everything Around Them",
  intro:
    "We lead with AI automation and agent development, then build the software, websites, apps, SaaS platforms, CRMs, and growth systems that put that intelligence to work. One team, ship to production, code you own.",
  whyDifferent: [
    {
      title: "Scoped around the result",
      body: "Every engagement starts from the outcome you need and works backward — not a fixed menu of features you may not use.",
    },
    {
      title: "AI woven through the work",
      body: "Whatever the service, we look for where automation and agents can remove manual effort and make the system smarter.",
    },
    {
      title: "Held to a production standard",
      body: "Tests, security, performance, and documentation are part of the build, so what launches is reliable from day one.",
    },
    {
      title: "One team across the stack",
      body: "Automation, software, web, mobile, and growth are handled by people who understand how the pieces connect.",
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
