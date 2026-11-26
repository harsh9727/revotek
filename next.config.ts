import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    // Vercel Hobby budget: every (image, width, quality, format) combination
    // is a separate transformation. Source files are already WebP, so one
    // output format is enough, and a short list of widths keeps the cache small.
    formats: ["image/webp"],

    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [384],
    qualities: [75],

    loader: "default",
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/assets/aboutbanner2.webp", search: "?v=2" },
    ],

    // 31 days. Vercel keys local images by content hash, so a changed file
    // gets a new cache entry without waiting for this TTL to expire.
    minimumCacheTTL: 2678400,
    dangerouslyAllowSVG: false,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      {
        // Files in public/ are not content-hashed, so keep the browser cache
        // to one day and refresh in the background for a week after that.
        // The negative lookahead keeps this rule off /_next/* (hashed,
        // immutable build assets such as next/font files).
        source:
          "/((?!_next/).*)\\.(ico|png|jpg|jpeg|webp|avif|svg|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source:
          "/(sitemap.xml|robots.txt|llms.txt|llms-full.txt|manifest.json)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [];
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  experimental: {
    optimizePackageImports: [],

    // ppr: true,
  },

  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;
