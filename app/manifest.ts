import type { MetadataRoute } from "next";
import { baseInfo } from "@/seo-configs/baseInfo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: baseInfo.name,
    short_name: baseInfo.shortName,
    description: baseInfo.description,
    start_url: "/?utm_source=pwa&utm_medium=homescreen",
    id: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "browser"],
    orientation: "portrait",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    scope: "/",
    icons: [
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["business"],
    lang: baseInfo.language,
    dir: "ltr",
    prefer_related_applications: false,
  };
}
