import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  destination?: string;
  message?: string;
};

const escapeHtml = (value: string | undefined) =>
  String(value || "").replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[char];
  });

const buildRows = (rows: Array<[string, string | undefined]>) =>
  rows
    .filter(([, value]) => String(value || "").trim().length > 0)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #475569; width: 35%;">${escapeHtml(
            label,
          )}</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${escapeHtml(
            value,
          )}</td>
        </tr>
      `,
    )
    .join("");

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactBody;
    const { name, email, phone, destination, message } = body;

    const submittedName = name?.trim() || "";
    const submittedEmail = email?.trim() || "";
    const submittedPhone = phone?.trim();
    const submittedDestination = destination?.trim();
    const submittedMessage = message?.trim() || "";

    if (!submittedName || !submittedEmail || !submittedMessage) {
      return NextResponse.json(
        { success: false, message: "Please fill in the required fields." },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(submittedEmail)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_TO_EMAIL) {
      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminTemplate = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;color:#1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="background:#2CC1DA;padding:24px 32px;">
                    <h2 style="margin:0;color:#ffffff;">New Contact Form Inquiry</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px 32px;">
                    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;">A new inquiry has been submitted through the contact form.</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${buildRows([
                        ["Name", submittedName],
                        ["Email", submittedEmail],
                        ["Phone", submittedPhone],
                        ["Destination", submittedDestination],
                        ["Message", submittedMessage],
                      ])}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;">
                    Fantastic Adventure Nepal Website
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const customerTemplate = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;color:#1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="background:#2CC1DA;padding:24px 32px;">
                    <h2 style="margin:0;color:#ffffff;">Thank You for Contacting Us</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;line-height:1.8;">
                    <p>Dear ${escapeHtml(submittedName)},</p>
                    <p>Thank you for reaching out to Fantastic Adventure Nepal. We have received your message and our team will reply to your email as soon as possible.</p>
                    <p>We generally respond within 1–2 business days.</p>
                    <p>Best Regards,<br /><strong>Fantastic Adventure Nepal</strong><br />Kathmandu, Nepal</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;">
                    Fantastic Adventure Nepal Website
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Fantastic Adventure Nepal" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO_EMAIL,
      replyTo: submittedEmail,
      subject: `New Contact Inquiry - ${submittedName}`,
      html: adminTemplate,
    });

    await transporter.sendMail({
      from: `"Fantastic Adventure Nepal" <${process.env.SMTP_USER}>`,
      to: submittedEmail,
      subject: "Thank you for contacting Fantastic Adventure Nepal",
      html: customerTemplate,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Contact Form Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit inquiry.",
      },
      { status: 500 },
    );
  }
}
