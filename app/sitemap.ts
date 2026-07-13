import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cases, services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  // NOTE: /blog is intentionally excluded — it is a thin placeholder the
  // pages agent marks noindex, so it must not appear in the sitemap.
  // Routes below cover static pages plus every dynamic service/work slug.
  const routes = ["", "/services", "/work", "/about", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const work = cases.map((c) => ({
    url: `${site.url}/work/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const serviceDetail = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...work, ...serviceDetail];
}
