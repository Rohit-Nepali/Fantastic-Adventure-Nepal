import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            company,
            name,
            email,
            whatsapp,
            message,
        } = body;

        // Basic validation
        if (!company || !name || !email || !whatsapp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill all required fields.",
                },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // ==========================
        // EMAIL TO YOUR COMPANY
        // ==========================

        const adminTemplate = `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;color:#1e293b;">

            <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
                <tr>
                    <td align="center">

                        <table width="650" cellpadding="0" cellspacing="0"
                            style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">

                            <tr>
                                <td style="background:#2CC1DA;padding:24px 32px;">
                                    <h2 style="margin:0;color:#ffffff;">
                                        New B2B Partnership Inquiry 🤝
                                    </h2>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding:30px 32px;">

                                    <p style="font-size:15px;line-height:1.7;">
                                        A new B2B inquiry has been submitted through the website.
                                    </p>

                                    <table width="100%" cellpadding="0" cellspacing="0">

                                        <tr>
                                            <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
                                                <strong>🏢 Company</strong><br />
                                                ${company}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
                                                <strong>👤 Contact Person</strong><br />
                                                ${name}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
                                                <strong>📧 Email</strong><br />
                                                ${email}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
                                                <strong>📱 WhatsApp</strong><br />
                                                ${whatsapp}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding:20px 0;">
                                                <strong>📝 Partnership Goals / Requirements</strong>

                                                <div
                                                    style="
                                                        margin-top:10px;
                                                        padding:16px;
                                                        background:#f8fafc;
                                                        border-left:4px solid #2CC1DA;
                                                        border-radius:6px;
                                                        line-height:1.7;
                                                    "
                                                >
                                                    ${message || "No message provided."}
                                                </div>
                                            </td>
                                        </tr>

                                    </table>

                                </td>
                            </tr>

                            <tr>
                                <td
                                    style="
                                        padding:20px 32px;
                                        background:#f8fafc;
                                        border-top:1px solid #e2e8f0;
                                        color:#64748b;
                                        font-size:13px;
                                    "
                                >
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

        console.log("SMTP_USER:", process.env.SMTP_USER);
        console.log("B2B_RECEIVER_EMAIL:", process.env.B2B_RECEIVER_EMAIL);

        await transporter.sendMail({
            from: `"Fantastic Adventure Nepal" <${process.env.SMTP_USER}>`,
            to: process.env.B2B_RECEIVER_EMAIL,
            replyTo: email,
            subject: `New B2B Inquiry - ${company}`,
            html: adminTemplate,
        });

        // ==========================
        // AUTO REPLY TO CUSTOMER
        // ==========================

        const customerTemplate = `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;color:#1e293b;">

            <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
                <tr>
                    <td align="center">

                        <table width="650" cellpadding="0" cellspacing="0"
                            style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">

                            <tr>
                                <td style="background:#2CC1DA;padding:24px 32px;">
                                    <h2 style="margin:0;color:white;">
                                        Thank You For Contacting Us
                                    </h2>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding:32px;line-height:1.8;">

                                    <p>Dear ${name},</p>

                                    <p>
                                        Thank you for your interest in partnering with
                                        Fantastic Adventure Nepal.
                                    </p>

                                    <p>
                                        We have successfully received your inquiry and our
                                        partnership team will review the details shortly.
                                    </p>

                                    <p>
                                        We generally respond within 1–2 business days.
                                    </p>

                                    <p>
                                        We look forward to exploring opportunities to work
                                        together.
                                    </p>

                                    <br />

                                    <p>
                                        Best Regards,<br />
                                        <strong>Fantastic Adventure Nepal</strong><br />
                                        Kathmandu, Nepal
                                    </p>

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
            to: email,
            subject: "Thank You for Contacting Fantastic Adventure Nepal",
            html: customerTemplate,
        });

        return NextResponse.json({
            success: true,
            message: "Inquiry submitted successfully.",
        });
    } catch (error) {
        console.error("B2B Inquiry Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to submit inquiry.",
            },
            { status: 500 }
        );
    }
}
