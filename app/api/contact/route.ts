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

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #0b92c3; padding: 24px 32px; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 32px; }
          .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0b92c3; margin: 24px 0 12px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; }
          .section-title:first-child { margin-top: 0; }
          .field-row { display: flex; margin-bottom: 10px; font-size: 14px; line-height: 1.5; }
          .field-label { width: 180px; font-weight: 600; color: #64748b; flex-shrink: 0; }
          .field-value { color: #0f172a; font-weight: 500; word-break: break-word; }
          .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #334155; }
          .footer { background: #f1f5f9; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Website Contact Inquiry</h1>
            <p>Revotek Elevators Website Form Submission</p>
          </div>
          <div class="content">
            <div class="section-title">Client Contact Details</div>
            <div class="field-row">
              <div class="field-label">Full Name:</div>
              <div class="field-value"><strong>${escaped.name}</strong></div>
            </div>
            <div class="field-row">
              <div class="field-label">Phone Number:</div>
              <div class="field-value"><a href="tel:+91${escaped.phone}" style="color: #0b92c3; text-decoration: none; font-weight: 600;">+91 ${escaped.phone}</a></div>
            </div>
            <div class="field-row">
              <div class="field-label">Email Address:</div>
              <div class="field-value">${validatedData.email ? `<a href="mailto:${escaped.email}" style="color: #0b92c3; text-decoration: none;">${escaped.email}</a>` : "<em>Not Provided</em>"}</div>
            </div>

            <div class="section-title">Elevator Project Specifications</div>
            <div class="field-row">
              <div class="field-label">Elevator Name / Model:</div>
              <div class="field-value">${escaped.elevatorName}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Number of Elevators:</div>
              <div class="field-value">${escaped.elevatorCount}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Number of Basements:</div>
              <div class="field-value">${escaped.basementCount}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Number of Floors:</div>
              <div class="field-value">${escaped.floorCount}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Passenger Capacity:</div>
              <div class="field-value">${escaped.passengerCapacity} Persons</div>
            </div>

            <div class="section-title">Client Requirement / Message</div>
            <div class="message-box">
              ${escaped.message}
            </div>
          </div>
          <div class="footer">
            Submitted on ${submissionTime} (IST)<br/>
            ${validatedData.email ? "Direct reply enabled: Click 'Reply' in your email client to respond to the client." : "Note: Client did not provide an email address. Use the phone number above to respond."}
          </div>
        </div>
      </body>
      </html>
    `;

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
