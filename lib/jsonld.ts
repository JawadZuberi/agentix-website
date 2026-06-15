import { site } from "./site";
import { services, faqs } from "./content";

/** Organization schema — rendered once in the root layout. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fortune Tower, Shahrah-e-Faisal",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    sameAs: Object.values(site.social),
    logo: `${site.url}/logo.png`,
  };
}

/** Website schema with search action. */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
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
