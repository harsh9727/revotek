
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string(),
  email: z.string().optional(),
  elevatorName: z.string(),
  elevatorCount: z.string(),
  basementCount: z.string(),
  floorCount: z.string(),
  passengerCapacity: z.string(),
  message: z.string().min(10),
});

// Escape HTML to safely display customer input
function escapeHtml(value: string) {
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

export async function POST(req: Request) {
  console.log("REVOTEK CONTACT API CALLED");

  try {
    console.log("CONTACT API PROCESS STARTED");

    // 1. Read and validate form data
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    console.log("CONTACT FORM DATA RECEIVED");

    // 2. Check required environment variables
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
        "Missing SMTP environment variables:",
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

    // 3. Create Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    console.log("VERIFYING SMTP CONNECTION...");

    // 4. Verify SMTP connection and authentication
    await transporter.verify();

    console.log("SMTP connection verified successfully.");

    // 5. Escape customer data for HTML email
    const name = escapeHtml(validatedData.name);
    const phone = escapeHtml(validatedData.phone);
    const email = escapeHtml(validatedData.email || "N/A");
    const elevatorName = escapeHtml(validatedData.elevatorName);
    const elevatorCount = escapeHtml(validatedData.elevatorCount);
    const basementCount = escapeHtml(validatedData.basementCount);
    const floorCount = escapeHtml(validatedData.floorCount);
    const passengerCapacity = escapeHtml(
      validatedData.passengerCapacity
    );

    const message = escapeHtml(validatedData.message).replace(
      /\r?\n/g,
      "<br/>"
    );

    // 6. Prepare email
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: validatedData.email || undefined,

      subject: `New Contact Form Submission - ${validatedData.name.replace(/[\r\n]/g, " ")}`,

      html: `
        <h2>New Contact Inquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>

        <hr/>

        <p><strong>Elevator Name:</strong> ${elevatorName}</p>
        <p><strong>Elevator Count:</strong> ${elevatorCount}</p>
        <p><strong>Basement Count:</strong> ${basementCount}</p>
        <p><strong>Floor Count:</strong> ${floorCount}</p>
        <p><strong>Passenger Capacity:</strong> ${passengerCapacity}</p>

        <hr/>

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    console.log("SENDING CONTACT EMAIL...");

    // 7. Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("CONTACT EMAIL SENT SUCCESSFULLY:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("REVOTEK CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}
