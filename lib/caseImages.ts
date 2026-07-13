/**
 * Themed photos per case study (verified-stable Unsplash IDs), shared by the
 * work cards and the case-detail pages. Swap any URL for a real project
 * screenshot when you have one.
 *
 * URLs are built on demand at a requested width so each surface can ask for a
 * size that matches how the image is actually rendered (cards vs. hero vs.
 * gallery) instead of always shipping a 1400px source.
 */

/** Build a responsive Unsplash URL from a bare photo id. */
export function caseImageUrl(id: string, width = 1400): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;
}

/** Bare Unsplash photo IDs per case study. */
const caseImageIds: Record<string, string> = {
  "northwind-ops-agent": "1553413077-190dd305871c", // logistics / ops
  "lumen-support-agent": "1531746790731-6c087fecd65a", // customer support
  "atlas-brand-site": "1467232004584-a241de8bcf5d", // brand / marketing
  "orbit-fitness-app": "1512941937669-90a1b58e7e9c", // mobile app
  "nimbus-crm-dashboard": "1504868584819-f8e8b4b6d7e3", // analytics dashboard
  "helio-saas-platform": "1460925895917-afdab827c52f", // saas
  "vion-commerce-platform": "1556742049-0cfed4f6a45d", // ecommerce
  "vertex-internal-platform": "1551288049-bebda4e38f71", // dashboard / data
};

/** Stable, on-brand fallback (laptop / data) for slugs without a mapped photo. */
const FALLBACK_ID = "1460925895917-afdab827c52f";

/**
 * Back-compat map of full-width URLs. Retained so any existing consumer that
 * reads the record keeps working; new code should prefer `caseImage()`.
 */
export const caseImages: Record<string, string> = Object.fromEntries(
  Object.entries(caseImageIds).map(([slug, id]) => [slug, caseImageUrl(id)]),
);

/** Resolve a case-study photo URL by slug at a sensible (or requested) width. */
export function caseImage(slug: string, width = 1400): string {
  return caseImageUrl(caseImageIds[slug] ?? FALLBACK_ID, width);
}

/** Generic product-UI shots used for the case gallery tiles. */
const galleryIds: string[] = [
  "1551288049-bebda4e38f71", // dashboard
  "1504868584819-f8e8b4b6d7e3", // analytics
  "1512941937669-90a1b58e7e9c", // mobile
  "1460925895917-afdab827c52f", // laptop / data
];

export const galleryImages: string[] = galleryIds.map((id) => caseImageUrl(id));
