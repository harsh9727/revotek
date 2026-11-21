
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

// ==========================================
// 1. CONTACT FORM VALIDATION
// ==========================================

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  elevatorName: z.string().min(1),
  elevatorCount: z.string().min(1),
  basementCount: z.string().min(1),
  floorCount: z.string().min(1),
  passengerCapacity: z.string().min(1),
  message: z.string().min(10).max(1000),
});

// ==========================================
// 2. HTML ESCAPING
// ==========================================

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

// ==========================================
// 3. CONTACT API
// ==========================================

export async function POST(req: Request) {
  console.log("[REVOTEK] Contact API called.");

  try {
    // Step 1: Read request body
    const body = await req.json();

    console.log("[REVOTEK] Request body received.");

    // Step 2: Validate form data
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      console.error(
        "[REVOTEK] Form validation failed:",
        validation.error.flatten()
      );

      return NextResponse.json(
        {
          success: false,
          message: "Please check your form details.",
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    console.log("[REVOTEK] Form validation successful.");

    // Step 3: Check SMTP environment variables
    const requiredEnv = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_SECURE",
      "SMTP_USER",
      "SMTP_PASS",
      "SMTP_FROM_EMAIL",
      "CONTACT_EMAIL",
    ];

    const missingEnv = requiredEnv.filter(
      (key) => !process.env[key]
    );

    if (missingEnv.length > 0) {
      console.error(
        "[REVOTEK] Missing environment variables:",
        missingEnv
      );

      return NextResponse.json(
        {
          success: false,
          message: "Email service configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    // Step 4: SMTP configuration
    const smtpPort = Number(process.env.SMTP_PORT);

    if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
      console.error("[REVOTEK] Invalid SMTP port.");

      return NextResponse.json(
        {
          success: false,
          message: "Invalid email service configuration.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: process.env.SMTP_SECURE === "true",

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    // Step 5: Verify SMTP connection
    console.log("[REVOTEK] Verifying Gmail SMTP connection...");

    await transporter.verify();

    console.log(
      "[REVOTEK] Gmail SMTP connection verified successfully."
    );

    // Step 6: Prepare safe email values
    const name = escapeHtml(data.name);
    const phone = escapeHtml(data.phone);
    const email = escapeHtml(data.email || "N/A");

    const elevatorName = escapeHtml(data.elevatorName);
    const elevatorCount = escapeHtml(data.elevatorCount);
    const basementCount = escapeHtml(data.basementCount);
    const floorCount = escapeHtml(data.floorCount);
    const passengerCapacity = escapeHtml(
      data.passengerCapacity
    );

    const message = escapeHtml(data.message).replace(
      /\r?\n/g,
      "<br/>"
    );

    // Step 7: Email configuration
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,

      replyTo: data.email || undefined,

      subject: `New Contact Form Submission - ${data.name.replace(/[\r\n]/g, " ")}`,

      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">

          <h2>New Contact Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>

          <hr />

          <h3>Elevator Details</h3>

          <p><strong>Elevator Name:</strong> ${elevatorName}</p>
          <p><strong>Elevator Count:</strong> ${elevatorCount}</p>
          <p><strong>Basement Count:</strong> ${basementCount}</p>
          <p><strong>Floor Count:</strong> ${floorCount}</p>
          <p><strong>Passenger Capacity:</strong> ${passengerCapacity}</p>

          <hr />

          <h3>Customer Message</h3>

          <p>${message}</p>

          <hr />

          <p>
            <strong>Revotek Elevators</strong><br />
            Your Trusted Partner in Elevator Service & Maintenance
          </p>

        </div>
      `,
    };

    // Step 8: Send email
    console.log("[REVOTEK] Sending contact inquiry email...");

    const info = await transporter.sendMail(mailOptions);

    console.log("[REVOTEK] Email sending result:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    // Step 9: Confirm recipient acceptance
    if (info.accepted.length === 0) {
      console.error(
        "[REVOTEK] Email was not accepted by the recipient."
      );

      return NextResponse.json(
        {
          success: false,
          message: "Email could not be delivered.",
        },
        { status: 502 }
      );
    }

    console.log(
      "[REVOTEK] Contact email successfully accepted by SMTP server."
    );

    // Step 10: Success response
    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        debugVersion: "REVOTEK-2026-TEST-001",
      },
      { status: 200 }
    );

  } catch (error) {
    // Step 11: Error handling
    const err = error as Error & {
      code?: string;
      command?: string;
      responseCode?: number;
    };

    console.error("[REVOTEK] CONTACT API ERROR:", {
      name: err.name,
      message: err.message,
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
    });

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
