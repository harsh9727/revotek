import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

// Initialize Upstash Redis & Sliding-Window Rate Limiter
// Limit: 5 submissions per 10 minutes per IP
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
  prefix: "ratelimit:contact",
});

// Zod schema for server-side validation & sanitization
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters."),

  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .or(z.literal(""))
    .optional(),

  siteAddress: z
    .string()
    .trim()
    .min(5, "Site address must be at least 5 characters.")
    .max(300, "Site address cannot exceed 300 characters."),

  elevatorName: z
    .string()
    .trim()
    .min(1, "Elevator name is required.")
    .max(100, "Elevator name cannot exceed 100 characters."),

  elevatorCount: z
    .string()
    .trim()
    .min(1, "Number of elevators is required.")
    .regex(/^[1-9]\d*$/, "Number of elevators must be a valid positive number."),

  basementCount: z
    .string()
    .trim()
    .min(1, "Number of basements is required.")
    .regex(/^\d+$/, "Number of basements must be a valid number."),

  floorCount: z
    .string()
    .trim()
    .min(1, "Number of floors is required.")
    .regex(/^[1-9]\d*$/, "Number of floors must be a valid positive number."),

  passengerCapacity: z
    .string()
    .trim()
    .min(1, "Passenger capacity is required.")
    .regex(/^[1-9]\d*$/, "Passenger capacity must be a valid positive number."),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message cannot exceed 1000 characters."),

  // Hidden honeypot field for bot detection
  website_hp: z.string().optional(),
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // 1. Basic Request Size Protection (max 100 KB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 100 * 1024) {
      return NextResponse.json(
        { success: false, message: "Payload size exceeds 100 KB limit." },
        { status: 413 }
      );
    }

    // 2. Upstash Redis Sliding-Window Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";

    const { success: rateLimitSuccess, limit, remaining, reset } =
      await ratelimit.limit(ip);

    if (!rateLimitSuccess) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many submissions from this connection. Please try again after a few minutes.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    // 3. Parse JSON Body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 4. Validate with Zod
    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Validation failed.";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    const validatedData = parseResult.data;

    // 5. Honeypot Bot Detection
    // If bot filled the hidden honeypot, return success response silently without sending email
    if (validatedData.website_hp && validatedData.website_hp.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Inquiry received successfully." },
        { status: 200 }
      );
    }

    // 6. Check Server Environment Configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.CONTACT_EMAIL || "revotekservices@gmail.com";

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        {
          success: false,
          message: "Email service is temporarily unavailable. Please try again later.",
        },
        { status: 500 }
      );
    }

    // 7. Sanitize HTML for Email Body
    const escaped = {
      name: escapeHtml(validatedData.name),
      phone: escapeHtml(validatedData.phone),
      email: validatedData.email ? escapeHtml(validatedData.email) : "Not Provided",
      siteAddress: escapeHtml(validatedData.siteAddress),
      elevatorName: escapeHtml(validatedData.elevatorName),
      elevatorCount: escapeHtml(validatedData.elevatorCount),
      basementCount: escapeHtml(validatedData.basementCount),
      floorCount: escapeHtml(validatedData.floorCount),
      passengerCapacity: escapeHtml(validatedData.passengerCapacity),
      message: escapeHtml(validatedData.message).replace(/\n/g, "<br/>"),
    };

    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL || "https://revotekelevators.com"
    ).replace(/\/$/, "");
    const logoUrl = `${siteUrl}/assets/logo.png`;

    const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Elevator Inquiry</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    img {
      border: 0;
      outline: none;
      text-decoration: none;
      display: block;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f1f5f9;
      padding: 32px 16px;
    }
    .main-card {
      max-width: 620px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 20px rgba(11, 146, 195, 0.08);
    }
    .top-brand-band {
      background: linear-gradient(135deg, #0b92c3 0%, #0284c7 100%);
      height: 6px;
    }
    .header {
      background: #ffffff;
      padding: 24px 32px 18px 32px;
      border-bottom: 1px solid #f1f5f9;
    }
    .header-table {
      width: 100%;
    }
    .badge {
      display: inline-block;
      background-color: #e0f2fe;
      color: #0b92c3;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 9999px;
      border: 1px solid #bae6fd;
    }
    .hero-banner {
      background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%);
      padding: 20px 32px 16px 32px;
      border-bottom: 1px solid #f1f5f9;
    }
    .hero-title {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.01em;
    }
    .hero-sub {
      margin: 4px 0 0 0;
      font-size: 13px;
      color: #64748b;
    }
    .content {
      padding: 24px 32px 32px 32px;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      color: #0b92c3;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 0;
    }
    .spec-grid {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 6px 16px;
      margin-top: 8px;
    }
    .data-table {
      width: 100%;
    }
    .data-row td {
      padding: 9px 0;
      font-size: 14px;
      vertical-align: top;
      border-bottom: 1px solid #f1f5f9;
    }
    .data-row:last-child td {
      border-bottom: none;
    }
    .label-col {
      width: 42%;
      color: #64748b;
      font-weight: 500;
    }
    .value-col {
      width: 58%;
      color: #0f172a;
      font-weight: 600;
      text-align: right;
    }
    .message-card {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-left: 4px solid #0b92c3;
      border-radius: 10px;
      padding: 16px 20px;
      margin-top: 10px;
      font-size: 14px;
      color: #1e293b;
      line-height: 1.6;
    }
    .cta-container {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px dashed #cbd5e1;
      text-align: center;
    }
    .btn-call {
      display: inline-block;
      background: #0b92c3;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      padding: 11px 22px;
      border-radius: 8px;
      margin: 4px 6px;
    }
    .btn-reply {
      display: inline-block;
      background: #0f172a;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      padding: 11px 22px;
      border-radius: 8px;
      margin: 4px 6px;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 32px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
    }
    .footer a {
      color: #0b92c3;
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <!-- Brand Theme Color Top Bar -->
      <div class="top-brand-band"></div>

      <!-- Header with Revotek Logo -->
      <div class="header">
        <table class="header-table" role="presentation">
          <tr>
            <td style="vertical-align: middle;">
              <a href="${siteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="${logoUrl}" alt="Revotek Elevators" width="140" style="max-width: 140px; height: auto; display: block; border: 0;" />
              </a>
            </td>
            <td style="text-align: right; vertical-align: middle;">
              <span class="badge">Website Inquiry</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Hero Announcement -->
      <div class="hero-banner">
        <h1 class="hero-title">New Elevator Project Inquiry</h1>
        <p class="hero-sub">Submitted via the contact form on www.revotekelevators.com</p>
      </div>

      <!-- Main Content -->
      <div class="content">
        <!-- Client Details Section -->
        <table style="width: 100%; margin-bottom: 4px;" role="presentation">
          <tr>
            <td style="border-bottom: 2px solid #e0f2fe; padding-bottom: 6px;">
              <span class="section-title">Client Contact Details</span>
            </td>
          </tr>
        </table>

        <div class="spec-grid" style="margin-bottom: 20px;">
          <table class="data-table" role="presentation">
            <tr class="data-row">
              <td class="label-col">Client Name</td>
              <td class="value-col">${escaped.name}</td>
            </tr>
            <tr class="data-row">
              <td class="label-col">Phone Number</td>
              <td class="value-col">
                <a href="tel:+91${escaped.phone}" style="color: #0b92c3; text-decoration: none; font-weight: 700;">+91 ${escaped.phone}</a>
              </td>
            </tr>
            <tr class="data-row">
              <td class="label-col">Email Address</td>
              <td class="value-col">
                ${validatedData.email
        ? `<a href="mailto:${escaped.email}" style="color: #0b92c3; text-decoration: none;">${escaped.email}</a>`
        : '<span style="color: #94a3b8; font-style: italic; font-weight: normal;">Not Provided</span>'
      }
              </td>
            </tr>
            <tr class="data-row">
              <td class="label-col">Site / Customer Address</td>
              <td class="value-col">${escaped.siteAddress}</td>
            </tr>
          </table>
        </div>

        <!-- Project Specifications Section -->
        <table style="width: 100%; margin-bottom: 4px;" role="presentation">
          <tr>
            <td style="border-bottom: 2px solid #e0f2fe; padding-bottom: 6px;">
              <span class="section-title">Elevator Project Specifications</span>
            </td>
          </tr>
        </table>

        <div class="spec-grid" style="margin-bottom: 20px;">
          <table class="data-table" role="presentation">
            <tr class="data-row">
              <td class="label-col">Elevator Model / Type</td>
              <td class="value-col">${escaped.elevatorName}</td>
            </tr>
            <tr class="data-row">
              <td class="label-col">Number of Elevators</td>
              <td class="value-col">${escaped.elevatorCount}</td>
            </tr>
            <tr class="data-row">
              <td class="label-col">Number of Basements</td>
              <td class="value-col">${escaped.basementCount}</td>
            </tr>
            <tr class="data-row">
              <td class="label-col">Number of Floors</td>
              <td class="value-col">${escaped.floorCount}</td>
            </tr>
            <tr class="data-row">
              <td class="label-col">Passenger Capacity</td>
              <td class="value-col">${escaped.passengerCapacity} Persons</td>
            </tr>
          </table>
        </div>

        <!-- Client Message Section -->
        <table style="width: 100%; margin-bottom: 4px;" role="presentation">
          <tr>
            <td style="border-bottom: 2px solid #e0f2fe; padding-bottom: 6px;">
              <span class="section-title">Client Requirement / Message</span>
            </td>
          </tr>
        </table>
        <div class="message-card">
          ${escaped.message}
        </div>

        <!-- Call-to-Action Buttons -->
        <div class="cta-container">
          <a href="tel:+91${escaped.phone}" class="btn-call">Call Client +91 ${escaped.phone}</a>
          ${validatedData.email
        ? `<a href="mailto:${escaped.email}?subject=Regarding%20your%20Elevator%20Inquiry%20-%20Revotek%20Elevators" class="btn-reply">Reply via Email</a>`
        : ""
      }
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #334155;">Revotek Elevators</p>
        <p style="margin: 0 0 10px 0; color: #64748b;">Quality &amp; Reliable Elevator Solutions | Ahmedabad, Gujarat</p>
        <p style="margin: 0; font-size: 11px; color: #94a3b8;">
          Submission Time: ${submissionTime} (IST)<br/>
          This is an automated inquiry notification from <a href="${siteUrl}" target="_blank">www.revotekelevators.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // 8. Dispatch Email via Resend
    const resend = new Resend(resendApiKey);

    const emailPayload: {
      from: string;
      to: string;
      subject: string;
      html: string;
      replyTo?: string;
    } = {
      from: fromEmail.includes("<")
        ? fromEmail
        : `Revotek Elevators <${fromEmail}>`,
      to: toEmail,
      subject: `New Elevator Inquiry from ${validatedData.name}`,
      html: emailHtml,
    };

    if (validatedData.email && validatedData.email.length > 0) {
      emailPayload.replyTo = validatedData.email;
    }

    const { error: resendError } = await resend.emails.send(emailPayload);

    if (resendError) {
      console.error("Resend API error:", resendError.name);
      return NextResponse.json(
        {
          success: false,
          message:
            "We were unable to deliver your message at this time. Please try again or reach us via phone or WhatsApp.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your inquiry has been sent successfully. We will contact you promptly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unhandled contact API error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
