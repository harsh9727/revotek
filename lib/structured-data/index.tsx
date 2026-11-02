// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA — unified export
// Import everything from here — never import from individual files directly
//
// USAGE:
//   import { buildFaqSchema, SchemaScript } from "@/lib/structured-data";
// ─────────────────────────────────────────────────────────────────────────────

export {
  buildOrganizationSchema,
  type OrganizationSchemaOverrides,
} from "./organization";

export {
  buildWebPageSchema,
  type WebPageSchemaInput,
  type WebPageType,
} from "./webpage";

export {
  buildFaqSchema,
  buildFaqMetaDescription,
  type FaqSchemaInput,
  type FaqItem,
} from "./faq";

export {
  buildBreadcrumbSchema,
  buildBreadcrumbItems,
  type BreadcrumbSchemaInput,
  type BreadcrumbItem,
} from "./breadcrumb";

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA INJECTION HELPER
// Renders a <script type="application/ld+json"> tag
// Use this in any Server Component — no dangerouslySetInnerHTML boilerplate
// ─────────────────────────────────────────────────────────────────────────────
export function SchemaScript({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
