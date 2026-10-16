import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RECIPIENT = process.env.CAREERS_RECIPIENT || "hr.amectechnology@gmail.com";

function esc(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form submission." },
      { status: 400 }
    );
  }

  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const city = String(form.get("city") || "").trim();
  const education = String(form.get("education") || "").trim();
  const experience = String(form.get("experience") || "").trim();
  const pastCompany = String(form.get("pastCompany") || "").trim();
  const role = String(form.get("role") || "Career Application").trim();
  const resume = form.get("resume");

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 }
    );
  }

  const attachments: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[] = [];

  if (resume && resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "Resume must be 5 MB or smaller." },
        { status: 400 }
      );
    }
    if (resume.type && resume.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Resume must be a PDF file." },
        { status: 400 }
      );
    }
    const buf = Buffer.from(await resume.arrayBuffer());

    // Magic-byte check — real PDFs begin with "%PDF-".
    if (buf.length < 5 || buf.subarray(0, 5).toString("ascii") !== "%PDF-") {
      return NextResponse.json(
        { error: "Resume must be a valid PDF file." },
        { status: 400 }
      );
    }

    attachments.push({
      filename: resume.name || "resume.pdf",
      content: buf,
      contentType: "application/pdf",
    });
  }

  const rows: [string, string][] = [
    ["Role", role],
    ["Name", name],
    ["Email", email],
    ["City", city || "—"],
    ["Education", education || "—"],
    ["Experience", experience || "—"],
    ["Past Company", pastCompany || "—"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
      <h2 style="margin:0 0 16px 0">New Career Application</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e5e5">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="border:1px solid #e5e5e5;background:#f7f7f7;font-weight:600;white-space:nowrap">${esc(
              k
            )}</td>
            <td style="border:1px solid #e5e5e5">${esc(v)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin-top:16px;color:#555;font-size:13px">
        ${attachments.length ? "Resume attached as PDF." : "No resume attached."}
      </p>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"AMEC Careers" <${user}>`,
      to: RECIPIENT,
      replyTo: `"${name}" <${email}>`,
      subject: `Career Application — ${name}${role ? ` (${role})` : ""}`,
      text,
      html,
      attachments,
    });
  } catch (err) {
    const detail =
      err instanceof Error ? err.message : "Unknown error sending email.";
    console.error("[careers] sendMail failed", err);
    return NextResponse.json(
      {
        error: "Could not send the application. Please try again.",
        detail,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
