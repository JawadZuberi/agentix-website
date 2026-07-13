import { site } from "./site";
import { services, faqs } from "./content";

/**
 * Keep only social URLs that point at a real profile — i.e. have a
 * non-empty path segment. Placeholder root URLs like
 * "https://twitter.com/" are dropped so we never emit bare domains.
 */
function realProfileUrls(urls: string[]): string[] {
  return urls.filter((raw) => {
    try {
      const { pathname } = new URL(raw);
      return pathname.replace(/\/+$/, "").length > 0;
    } catch {
      return false;
    }
  });
}

/** Organization schema — rendered once in the root layout. */
export function organizationLd() {
  const sameAs = realProfileUrls(Object.values(site.social));

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fortune Tower, Shahrah-e-Faisal",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    founder: {
      "@type": "Person",
      name: "Jawad Zuberi",
      jobTitle: "CEO & Founder",
    },
    // The generated OG route is a real, always-present image asset.
    logo: `${site.url}/opengraph-image`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Website schema — name, url, and publisher only (no on-site search exists). */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@type": "Organization", name: site.name },
  };
}

/**
 * BreadcrumbList schema for a page's trail.
 * @param items ordered crumbs, each `{ name, url }` (url = absolute).
 */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Service catalog — helps search and AI engines understand the services we offer. */
export function servicesLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        url: `${site.url}/services#${s.slug}`,
        provider: { "@type": "Organization", name: site.name },
      },
    })),
  };
}

/** FAQ schema — eligible for rich results and frequently cited by LLMs. */
export function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Helper to serialize JSON-LD safely into a <script> tag. */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data) };
}
