import type { Metadata } from "next";
import {
  baseInfo,
  baseUrl,
  buildCanonical,
  buildOgImageUrl,
  buildTitle,
} from "@/seo-configs/baseInfo";

// ─────────────────────────────────────────────────────────────────────────────
// BUILD PAGE METADATA — static and dynamic pages
// Use this for pages:
//   /about, /contact, /services, /services/[slug], etc.
//
// USAGE:
//   import { buildPageMetadata } from "@/lib/seo/buildPageMetadata";
//   export const metadata = buildPageMetadata({ ... });
//
// Or async (when you need to fetch data for metadata):
//   export async function generateMetadata(): Promise<Metadata> {
//     return buildPageMetadata({ ... });
//   }
// ─────────────────────────────────────────────────────────────────────────────

// ─── Input ────────────────────────────────────────────────────────────────────
export interface PageMetadataInput {
  // Required
  title: string; // Page-specific title — template wraps it: "Title | Brand"
  description: string; // 150–160 chars — include primary keyword naturally

  // Required — used for canonical URL and OG image path
  path: string; // Relative path eg: "/about"

  // Optional
  keywords?: readonly string[]; // Page-specific keywords — merged with global keywords
  ogImagePath?: string; // Override OG image path — defaults to page's opengraph-image
  ogImageAlt?: string; // Alt text for OG image

  // Indexing control
  // Defaults: index=true, follow=true
  // Set noIndex=true for: paginated pages beyond page 2, search results,
  // filtered views, thank-you pages, admin pages
  noIndex?: boolean;
  noFollow?: boolean;

  // Canonical override
  // Use when this page's content also lives at another URL
  // eg: a page accessible via both /services and /our-services
  canonicalUrl?: string;

  // Open Graph type
  // "website" for standard pages
  ogType?: "website" | "article";

  // Locale override — defaults to baseInfo.locale
  locale?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// buildPageMetadata
// ─────────────────────────────────────────────────────────────────────────────
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    ogImagePath,
    ogImageAlt,
    noIndex = false,
    noFollow = false,
    canonicalUrl,
    ogType = "website",
    locale,
  } = input;

  const canonical = canonicalUrl ?? buildCanonical(path);

  // OG image — use explicit override, else use page's co-located OG image
  // Falls back to root OG image if page has no opengraph-image.tsx
  const ogImage = ogImagePath
    ? `${baseUrl}${ogImagePath}`
    : buildOgImageUrl(path);

  const ogAlt = ogImageAlt ?? title;

  // Merge page keywords with global brand keywords
  // Page-specific keywords come first — more relevant to the page
  const mergedKeywords = [...(keywords ?? []), ...baseInfo.keywords];

  return {
    // ── Title ──────────────────────────────────────────────────────────────
    // Uses the template from rootMetadata: "Page Title | Brand Name"
    title,

    // ── Description ────────────────────────────────────────────────────────
    description,

    // ── Keywords ───────────────────────────────────────────────────────────
    keywords: mergedKeywords,

    // ── Canonical ──────────────────────────────────────────────────────────
    // Every page MUST have a canonical — prevents duplicate content issues
    // This is the single most important technical SEO tag after title/description
    alternates: {
      canonical,
    },

    // ── Robots ─────────────────────────────────────────────────────────────
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ── Open Graph ─────────────────────────────────────────────────────────
    openGraph: {
      type: ogType,
      locale: locale ?? baseInfo.locale,
      url: canonical,
      siteName: baseInfo.name,
      title: buildTitle(title),
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogAlt,
          type: "image/png",
        },
      ],
    },

    // ── Twitter / X ────────────────────────────────────────────────────────
    twitter: {
      card: "summary_large_image",
      site: baseInfo.social.twitter,
      creator: baseInfo.social.twitter,
      title: buildTitle(title),
      description,
      images: [
        {
          url: ogImage,
          alt: ogAlt,
        },
      ],
    },
  };
}
