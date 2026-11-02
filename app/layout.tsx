import "@/styles/globals.css";

// seo configs
import { rootMetadata, rootStructuredData } from "@/seo-configs/metadata";
import { baseInfo } from "@/seo-configs/baseInfo";

// types
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

// fonts
import { figtree } from "@/lib/fonts";

// utils
import { cn } from "@/lib/utils";

// components
import { Header, Footer } from "@/components/layout";
import { ScrollToTopButton, WhatsAppButton } from "@/components/common";

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b92c3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b92c3" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={baseInfo.language}
      dir="ltr"
      className={cn("antialiased", "font-sans", figtree.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootStructuredData),
          }}
        />

        {/* LLM Discovery */}
        <link
          rel="llms"
          type="text/plain"
          href="/llms.txt"
          title="LLM-readable site index"
        />
      </head>

      <body>
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-9999 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
