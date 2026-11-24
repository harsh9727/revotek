# Technical Stability Audit Report: Revotek Elevators Website

**Date of Audit:** November 24, 2026  
**Project Workspace:** `revotek`  
**Framework:** Next.js `16.2.4` (App Router)  
**UI Library:** React `19.2.4`  
**Language:** TypeScript `^5` (Strict Mode)  
**Target:** Pre-Development Code Stability & Architecture Inspection for Contact Form Dynamic Integration  

---

## 1. Project Architecture Overview

| Parameter | Configuration / Version | Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js `16.2.4` (App Router) | Turbopack enabled for builds |
| **UI Library** | React `19.2.4` & React-DOM `19.2.4` | React Compiler (`reactCompiler: true`) enabled |
| **Language** | TypeScript `^5` (Target: `ES2017`, Module: `esnext`, Resolution: `bundler`) | Strict mode: `true` |
| **Styling** | Tailwind CSS `^4` (`@tailwindcss/postcss: ^4`, `tw-animate-css: ^1.4.0`) | Modern CSS-based Tailwind engine |
| **Component Kit** | Radix / Base UI (`@base-ui/react: ^1.4.1`, `shadcn: ^4.6.0`) | Accessible, unstyled primitives |
| **Icons** | `@hugeicons/react` (`^1.1.6`), `@hugeicons/core-free-icons` (`^4.1.1`) | SVG-based icon package |
| **Animation** | `framer-motion: ^12.38.0` | Client animations and scroll triggers |
| **Validation** | `zod: ^4.4.2` | Available in dependencies |
| **Form Management** | `@tanstack/react-form: ^1.29.1` | Installed, currently unused in static form |
| **Rendering Strategy** | Static Site Generation (`export const dynamic = "force-static"`) | Set on all major page routes |

### Route & Component Structure
- **Pages (`app/`)**:
  - `/` (`app/page.tsx`): Home page with Hero, Why Choose Us, Services, Industries, FAQs, Contact Banner.
  - `/about` (`app/about/page.tsx`): About page with Hero, Who We Are, Mission/Vision, Core Values.
  - `/services` (`app/services/page.tsx`): Services list.
  - `/services/[slug]` (`app/services/[slug]/page.tsx`): Dynamic SSG service details using `generateStaticParams()`.
  - `/contact` (`app/contact/page.tsx`): Contact page containing `Hero`, `ContactForm`, and `QuickContact`.
  - `/api/revalidate` (`app/api/revalidate/route.ts`): On-demand ISR revalidation and IndexNow ping.
  - SEO / Utilities: `manifest.ts`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `not-found.tsx`.
- **Component Hierarchy**:
  - `components/ui/`: Primitive inputs, buttons, labels, textarea, sheets, accordions, separators.
  - `components/layout/`: `Header.tsx`, `Footer.tsx`.
  - `components/common/`: `WhatsAppButton.tsx`, `ScrollToTopButton.tsx`, `breadcrumb-nav.tsx`.
  - `components/section/`: Domain-specific section blocks for `home`, `about`, `services`, `contact`.
- **Content & Configuration**:
  - `content/`: Centralized JSON dictionaries (`contact.json`, `home.json`, `services.json`, `about.json`).
  - `seo-configs/`: `baseInfo.ts` and `metadata.ts` for company info and JSON-LD structured data.

---

## 2. Overall Code Stability

The codebase exhibits good architectural separation:
- **Type Safety**: TypeScript strict mode is enabled. Source files have 0 syntax or type-casting issues.
- **Component Modularity**: UI sections are well-separated from data layers via `content/*.json`.
- **Hydration Safety**: No direct DOM manipulations or unstable `Math.random()`/date calls during SSR hydration.
- **Dependencies**: React 19 and Next.js 16 are aligned.

---

## 3. TypeScript & ESLint Results

### 3.1. ESLint (`pnpm lint`)
* **Status**: **PASS (0 Errors, 3 Warnings)**
```text
C:\Users\Infinity\Desktop\Harsh\Revotek-website\revotek\components\section\contact\QuickContact.tsx
  4:3  warning  'WhatsappBusinessFreeIcons' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\Infinity\Desktop\Harsh\Revotek-website\revotek\scripts\submit-sitemap.ts
  35:10  warning  'config' is defined but never used   @typescript-eslint/no-unused-vars
  91:3   warning  'baseUrl' is defined but never used  @typescript-eslint/no-unused-vars

✖ 3 problems (0 errors, 3 warnings)
```

### 3.2. TypeScript Compiler (`npx tsc --noEmit`)
* **Status**: **PASS in Source Code / Cache Stale Warning in Dev Types**
  * Outside `.next`, all project source code passes TypeScript checks without errors.
  * In `.next/dev/types/validator.ts(98,39)`, there was a stale route validator referencing the recently deleted `/app/api/contact/route.js`. This is caused by `tsconfig.json` including `.next/dev/types/**/*.ts` when the dev server was previously running. A fresh build or removing stale `.next` generated types clears this artifact.

---

## 4. Build & Compilation Results

### 4.1. Cache-Control Header Warning
* **Warning in `next build`**:
  ```text
  Warning: Custom Cache-Control headers detected for the following routes:
    - /_next/static/(.*)
  Setting a custom Cache-Control header can break Next.js development behavior.
  ```
* **Cause**: Located in `next.config.ts` (lines 41–48). Next.js automatically sets immutable caching headers on static assets. Defining custom headers for `/_next/static/(.*)` overrides default chunk resolution.

### 4.2. Experimental `optimizeCss: true` Build Panic
* **Status**: **FAIL during `next build`**
* **Console Output**:
  ```text
  FATAL: An unexpected Turbopack error occurred.
  Error [TurbopackInternalError]: creating new process
  Caused by:
  - node process exited before we could connect to it with exit code: 0
  Debug info:
  - Execution of <WebpackLoadersProcessedAsset as Asset>::content failed
  - Execution of WebpackLoadersProcessedAsset::process failed
  - Execution of evaluate_webpack_loader failed
  ```
* **Root Cause**: Located in `next.config.ts` (line 83). `optimizeCss: true` utilizes `critters` to inline critical CSS. In Next.js 16 with Tailwind CSS v4 on Windows environments, `critters` panics during Turbopack's `evaluate_webpack_loader` phase.

---

## 5. Existing Website Functionality Risks

1. **Footer Dead Links (404 Error Risk)**:
   * `components/layout/Footer.tsx` (lines 37–38) contains links to:
     * `/privacy-policy`
     * `/terms-and-conditions`
   * Neither page exists in `app/`. Clicking either link currently routes users to the 404 page.
2. **Revalidation Endpoint Unusable**:
   * `app/api/revalidate/route.ts` (line 36) relies on `process.env.REVALIDATION_SECRET`.
   * `REVALIDATION_SECRET` is omitted from `.env`. The endpoint always returns `401 Unauthorized`.
3. **WhatsApp & Phone Integrations**:
   * Inspected code in `WhatsAppButton.tsx` and `QuickContact.tsx` links properly to `https://wa.me/919265999898`.
   * Floating button, QuickContact WhatsApp button, and tel links function as static links.

---

## 6. Contact Form Technical Analysis

### 6.1. Current Form State
The contact form at `components/section/contact/ContactForm.tsx` is completely static:
* **Inputs & Controls**:
  * `name`: Text, required, `autoComplete="name"`
  * `phone`: Tel, numeric, required, `maxLength={10}`
  * `email`: Email, optional, `autoComplete="email"`
  * `elevatorName`: Text, required
  * `elevatorCount`: Number, required, `min={0}`
  * `basementCount`: Number, required, `min={0}`
  * `floorCount`: Number, required, `min={0}`
  * `passengerCapacity`: Number, required, `min={0}`
  * `message`: Textarea, required, `rows={5}`, `maxLength={1000}`
  * Submit Button: `<Button type="button">Send Message</Button>`
* **Submission Behavior**:
  * Form submission is intercepted with `e.preventDefault(); e.stopPropagation();`.
  * No network requests, API routes, or email handlers are currently invoked.

### 6.2. What Can Be Reused vs. What Needs Implementation
* **Reusable Directly (100% of UI)**:
  * The entire visual layout, Tailwind classes, responsive two-column grid, and labels.
  * Content labels and placeholders in `content/contact.json`.
  * Shadcn UI components (`Input`, `Label`, `Textarea`, `Button`).
* **Needs Implementation For Dynamic Resend Integration**:
  1. Frontend submission handler (`onSubmit` / `useActionState` / `@tanstack/react-form` / controlled state).
  2. Client-side loading indicators and feedback alerts (Success / Error states).
  3. Server-side API Route: `app/api/contact/route.ts` handling `POST` requests.
  4. Server-side Zod validation schema.
  5. Resend SDK integration (`resend.emails.send(...)`).
  6. Email template (HTML or React Email).

---

## 7. Security Audit

1. **Active Credentials in `.env`**:
   * `.env` contains an active Google SMTP App Password (`SMTP_PASS`), Bing Webmaster API Key, and IndexNow Key.
   * `.env` is listed in `.gitignore` and is not committed to git.
2. **Missing Rate Limiting**:
   * There is currently no rate-limiting library (e.g. Upstash Redis / in-memory sliding window). When an API route is added, automated bots could abuse it to spam emails or exhaust Resend tier limits.
3. **No Honeypot / Bot Gate**:
   * The static form currently lacks a hidden honeypot field or CAPTCHA/Turnstile protection.
4. **Security Headers**:
   * `next.config.ts` (lines 23–39) properly enforces `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.

---

## 8. Performance & Maintainability

1. **Static Rendering Architecture**:
   * All pages are pre-rendered statically (`force-static`). This gives optimal performance (near 100 PageSpeed scores).
2. **Unused Dependencies**:
   * `package.json` contains unused packages:
     * `nodemailer`: `^8.0.7`
     * `@types/nodemailer`: `^8.0.0`
     * `@tanstack/react-form`: `^1.29.1` (if standard React state/actions are preferred)
3. **Bundle Optimization**:
   * `compiler.removeConsole` is active in production, preventing sensitive console logs from leaking to user DevTools.

---

## 9. Classified Findings & Issues

| Severity | File Path | Issue Description | Why It Matters | Recommended Solution | Blocks Contact Form? |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **HIGH** | `next.config.ts:83` | `experimental: { optimizeCss: true }` causes Turbopack compilation to stall on Windows with Tailwind CSS v4. | Blocks production builds (`next build`) from completing cleanly. | Disable `optimizeCss: false` or remove `experimental.optimizeCss`. | **YES (for production build)** |
| **HIGH** | `next.config.ts:41-48` | Custom `Cache-Control` header on `/_next/static/(.*)`. | Next.js emits warnings and may malfunction during asset revalidation. | Remove the custom header block for `/_next/static/(.*)`. | No |
| **MEDIUM** | `components/layout/Footer.tsx:37-38` | Links to `/privacy-policy` and `/terms-and-conditions` lead to 404. | Negative user experience and potential SEO penalty for broken internal links. | Create static stub pages or adjust footer links until published. | No |
| **MEDIUM** | `app/api/revalidate/route.ts:36` | `REVALIDATION_SECRET` missing in `.env`. | Revalidation API fails authorization every time. | Add `REVALIDATION_SECRET` to `.env` or remove unused route. | No |
| **LOW** | `components/section/contact/QuickContact.tsx:4` | Unused import `WhatsappBusinessFreeIcons`. | Generates ESLint warnings. | Remove unused import. | No |
| **LOW** | `package.json:23` | Unused `nodemailer` and `@types/nodemailer`. | Unnecessary dependencies in `node_modules`. | Remove via package manager when Resend is introduced. | No |

---

## 10. Recommended Improvements Before / During Form Development

1. **Turn off `experimental.optimizeCss` in `next.config.ts`**:
   * Tailwind CSS v4 already outputs an optimized, small CSS stylesheet. Disabling `optimizeCss` ensures `next build` compiles in seconds without hanging.
2. **Remove Custom `/_next/static/(.*)` Cache-Control Header**:
   * Allows Next.js to manage asset hashing and immutable caching natively without warnings.
3. **Add Bot Protection to Form**:
   * Include a hidden honeypot field (e.g. `website_hp`) or Cloudflare Turnstile token to prevent spam bots from depleting your Resend monthly email quota.
4. **Implement Clean Resend API Handler**:
   * Place the handler at `app/api/contact/route.ts` with server-side Zod validation and structured HTML email template.

---

## 11. Contact Form Dynamic Development Readiness Assessment

### Overall Verdict: **READY TO PROCEED** (Subject to `optimizeCss` build adjustment)

The project structure is clean, modern, and fully compatible with Resend:
* **UI**: 100% prepared. Zero changes needed to layout, CSS, inputs, or responsive styles.
* **TypeScript & React**: Modern React 19 + TypeScript 5 environment ready for React Server Actions or Next.js App Router POST API Route handlers.
* **Validation**: `zod` is already installed and ready for validation schemas.
* **Required Prerequisites for Resend**:
  1. Obtain a **Resend API Key** (`re_...`).
  2. Have a verified sending domain or use Resend's testing address (`onboarding@resend.dev`).
  3. Set `RESEND_API_KEY` and `CONTACT_EMAIL` in `.env`.
