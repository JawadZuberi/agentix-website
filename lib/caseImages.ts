/**
 * Themed photos per case study (verified-stable Unsplash IDs), shared by the
 * work cards and the case-detail pages. Swap any URL for a real project
 * screenshot when you have one.
 */
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1400&q=80&auto=format&fit=crop`;

export const caseImages: Record<string, string> = {
  "northwind-ops-agent": u("1553413077-190dd305871c"), // logistics / ops
  "lumen-support-agent": u("1531746790731-6c087fecd65a"), // customer support
  "atlas-brand-site": u("1467232004584-a241de8bcf5d"), // brand / marketing
  "orbit-fitness-app": u("1512941937669-90a1b58e7e9c"), // mobile app
  "nimbus-crm-dashboard": u("1504868584819-f8e8b4b6d7e3"), // analytics dashboard
  "helio-saas-platform": u("1460925895917-afdab827c52f"), // saas
  "vion-commerce-platform": u("1556742049-0cfed4f6a45d"), // ecommerce
  "vertex-internal-platform": u("1551288049-bebda4e38f71"), // dashboard / data
};

export function caseImage(slug: string): string {
  return (
    caseImages[slug] ?? `https://picsum.photos/seed/agentix-${slug}/1200/800`
  );
}

/** Generic product-UI shots used for the case gallery tiles. */
export const galleryImages: string[] = [
  u("1551288049-bebda4e38f71"), // dashboard
  u("1504868584819-f8e8b4b6d7e3"), // analytics
  u("1512941937669-90a1b58e7e9c"), // mobile
  u("1460925895917-afdab827c52f"), // laptop / data
];
