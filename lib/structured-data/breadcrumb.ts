import { baseInfo, baseUrl, buildCanonical } from "@/seo-configs/baseInfo";

// ─────────────────────────────────────────────────────────────────────────────
// BREADCRUMB SCHEMA — BreadcrumbList + ListItem
//
// Enables:
//   • Breadcrumb trail shown directly in Google Search results URL line
//   • Replaces the raw URL with "Home > Services > Service Title" in SERPs
//   • Significant CTR improvement — users see context before clicking
//   • AI navigation — LLMs use breadcrumbs to understand site hierarchy
//
// GOOGLE RULES:
//   • Must match the visible breadcrumb UI on the page
//   • Each item must have a real, crawlable URL
//   • Last item (current page) URL is optional but recommended
//   • Minimum 2 items (home + current page)
//
// Validator: https://search.google.com/test/rich-results
// Docs: https://schema.org/BreadcrumbList
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  path: string; // Relative path — canonical URL is built from this
}

export interface BreadcrumbSchemaInput {
  // Current page path — used as the @id anchor
  currentPath: string;
  // Crumbs AFTER homepage — homepage is always prepended automatically
  // Order: left to right, shallowest to deepest
  items: BreadcrumbItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// buildBreadcrumbSchema
// Standalone — use when no other schema builder is handling breadcrumbs
// ─────────────────────────────────────────────────────────────────────────────
export function buildBreadcrumbSchema(input: BreadcrumbSchemaInput) {
  const { currentPath, items } = input;

  const canonicalUrl = buildCanonical(currentPath);

  // Homepage is always position 1 — never pass it in items[]
  const allItems: Array<{ position: number; name: string; item: string }> = [
    {
      position: 1,
      name: baseInfo.name,
      item: baseUrl,
    },
    ...items.map((crumb, index) => ({
      position: index + 2,
      name: crumb.name,
      item: buildCanonical(crumb.path),
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        itemListElement: allItems.map((item) => ({
          "@type": "ListItem",
          position: item.position,
          name: item.name,
          item: item.item,
        })),
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// buildBreadcrumbItems
// Utility — auto-generates breadcrumb items from a URL path
// ─────────────────────────────────────────────────────────────────────────────
export function buildBreadcrumbItems(path: string): BreadcrumbItem[] {
  // Strip leading slash and split into segments
  const segments = path.replace(/^\//, "").split("/").filter(Boolean);

  return segments.map((segment, index) => {
    // Build cumulative path up to this segment
    const cumulativePath = "/" + segments.slice(0, index + 1).join("/");

    // Convert slug to readable name
    const name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return { name, path: cumulativePath };
  });
}
