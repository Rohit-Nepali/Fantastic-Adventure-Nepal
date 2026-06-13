import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      tripName,
      budgetRange,
      numberOfTravelers,
      travelDate,
      duration,
      fullName,
      whatsAppNumber,
      emailAddress,
      streetAddress,
      country,
      referral,
      specialRequirements,
      comments,
    } = body;

    // 1. Basic validation check
    if (!tripName || !fullName || !emailAddress || !whatsAppNumber) {
      return NextResponse.json(
        { success: false, error: "Missing required form fields." },
        { status: 400 }
      );
    }

    // 2. Transporter configuration reading from standard environment parameters
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: process.env.SMTP_SECURE === "true" || true, 
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });

    // 3. Construct an elegant, easily parseable HTML template string
    const htmlEmailTemplate = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #1a202c; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4f46e5; padding: 24px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; tracking-diff: -0.05em;">New Trip Plan Inquiry</h2>
          <p style="color: #e0e7ff; margin: 4px 0 0 0; font-size: 14px;">Fantastic Adventure Nepal</p>
        </div>
        
        <div style="padding: 24px; background-color: #ffffff;">
          <h3 style="color: #4f46e5; border-bottom: 1px solid #edf2f7; padding-bottom: 8px; margin-top: 0;">1. Trip Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 40%; color: #4a5568;">Destination/Trip:</td>
              <td style="padding: 6px 0; color: #1a202c;">${tripName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Budget Range:</td>
              <td style="padding: 6px 0; color: #1a202c;">${budgetRange}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Travelers:</td>
              <td style="padding: 6px 0; color: #1a202c;">${numberOfTravelers}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Travel Date:</td>
              <td style="padding: 6px 0; color: #1a202c;">${travelDate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Duration:</td>
              <td style="padding: 6px 0; color: #1a202c;">${duration} Days</td>
            </tr>
          </table>

          <h3 style="color: #4f46e5; border-bottom: 1px solid #edf2f7; padding-bottom: 8px; margin-top: 24px;">2. Personal Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 40%; color: #4a5568;">Full Name:</td>
              <td style="padding: 6px 0; color: #1a202c;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">WhatsApp Number:</td>
              <td style="padding: 6px 0; color: #1a202c;"><a href="https://wa.me/${whatsAppNumber.replace(/[^0-9]/g, "")}" style="color: #4f46e5; text-decoration: none;">${whatsAppNumber}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Email Address:</td>
              <td style="padding: 6px 0; color: #1a202c;"><a href="mailto:${emailAddress}" style="color: #4f46e5; text-decoration: none;">${emailAddress}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Street Address:</td>
              <td style="padding: 6px 0; color: #1a202c;">${streetAddress || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Country:</td>
              <td style="padding: 6px 0; color: #1a202c;">${country}</td>
            </tr>
          </table>

          <h3 style="color: #4f46e5; border-bottom: 1px solid #edf2f7; padding-bottom: 8px; margin-top: 24px;">3. Additional Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 40%; color: #4a5568;">Referral Source:</td>
              <td style="padding: 6px 0; color: #1a202c;">${referral}</td>
            </tr>
          </table>
          
          <div style="margin-top: 12px; padding: 12px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #cbd5e1;">
            <p style="margin: 0 0 4px 0; font-weight: bold; color: #4a5568; font-size: 14px;">Special Requirements:</p>
            <p style="margin: 0; color: #334155; font-size: 14px; white-space: pre-wrap;">${specialRequirements || "None specified"}</p>
          </div>

          <div style="margin-top: 12px; padding: 12px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #cbd5e1;">
            <p style="margin: 0 0 4px 0; font-weight: bold; color: #4a5568; font-size: 14px;">Comments or Message:</p>
            <p style="margin: 0; color: #334155; font-size: 14px; white-space: pre-wrap;">${comments || "None specified"}</p>
          </div>
        </div>
        
        <div style="background-color: #f7fafc; padding: 16px; text-align: center; border-top: 1px solid #edf2f7; font-size: 12px; color: #a0aec0;">
          Received automatically via system integration portal on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    // 4. Fire the email delivery
    await transporter.sendMail({
      from: `"${fullName} via Form Inquiry" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO_EMAIL || process.env.SMTP_USER, // Delivered straight to your inbound tracking inbox
      replyTo: emailAddress, // Clicking reply inside Gmail links straight back to your client!
      subject: `✈️ Trip Inquiry: ${tripName} - from ${fullName}`,
      html: htmlEmailTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer SMTP Error Context:", error);
    return NextResponse.json(
      { success: false, error: "Internal SMTP operational delivery failure." },
      { status: 500 }
    );
  }
}