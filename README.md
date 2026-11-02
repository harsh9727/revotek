# Revotek Elevators — Web Application

Official website for **Revotek Elevators** (Ahmedabad, Gujarat, India).
Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env.local

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## Core Features

- **Marketing Pages**: Home, About Us, Services, Service Detail pages (`/services/[slug]`), and Contact.
- **Lead Capture & Inquiry**: Interactive inquiry form with dual-layer Zod validation and automated Nodemailer SMTP delivery to `revotekservices@gmail.com`.
- **Direct Support**: 1-click WhatsApp chat button and mobile phone calling links.
- **SEO & AI Optimization (GEO)**: Automated Schema.org JSON-LD graphs (LocalBusiness, Organization, Service, FAQPage, BreadcrumbList), dynamic OpenGraph images, and LLM discoverability via `/llms.txt`.
- **IndexNow Integration**: Automatic search engine notification on content revalidation.

---

## Detailed Documentation

For full architectural diagrams, security configurations, data flows, and specifications, see:
👉 **[`PROJECT_DETAILS.md`](./PROJECT_DETAILS.md)**

---

## Contact & Business Info

- **Email**: `revotekservices@gmail.com`
- **Phone**: +91 98981 82761 / +91 92659 99898
- **Address**: Shree Hari Darshan Industrial Park Rd, Phase IV, Vatva GIDC, Ahmedabad, Gujarat 382445, India
- **Website**: https://www.revotekelevators.com
