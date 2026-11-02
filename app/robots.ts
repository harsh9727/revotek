import type { MetadataRoute } from "next";
import { baseUrl } from "@/seo-configs/baseInfo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "DotBot", "MJ12bot", "BLEXBot"],
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
