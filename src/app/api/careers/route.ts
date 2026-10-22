import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RECIPIENT = process.env.CAREERS_RECIPIENT || "hr.amectechnology@gmail.com";
const APPS_SCRIPT_URL = process.env.CAREERS_APPS_SCRIPT_URL || "";

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
  const emailConfigured = Boolean(user && pass);
  const sheetConfigured = Boolean(APPS_SCRIPT_URL);

  if (!emailConfigured && !sheetConfigured) {
    return NextResponse.json(
      { error: "Application service is not configured." },
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
  const phone = String(form.get("phone") || "").trim();
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
  if (!phone) {
    return NextResponse.json(
      { error: "Phone number is required." },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 }
    );
  }
  if (!resume || !(resume instanceof File) || resume.size === 0) {
    return NextResponse.json(
      { error: "Resume (PDF) is required." },
      { status: 400 }
    );
  }

  let resumeBuffer: Buffer | null = null;
  let resumeFileName = "";

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
    resumeBuffer = Buffer.from(await resume.arrayBuffer());

    // Magic-byte check — real PDFs begin with "%PDF-".
    if (
      resumeBuffer.length < 5 ||
      resumeBuffer.subarray(0, 5).toString("ascii") !== "%PDF-"
    ) {
      return NextResponse.json(
        { error: "Resume must be a valid PDF file." },
        { status: 400 }
      );
    }

    resumeFileName = resume.name || "resume.pdf";
  }

  const rows: [string, string][] = [
    ["Role", role],
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["City", city || "—"],
    ["Education", education || "—"],
    ["Experience", experience || "—"],
    ["Past Company", pastCompany || "—"],
  ];

  // ---- Email delivery ----
  const sendEmail = async (): Promise<{ ok: boolean; detail?: string }> => {
    if (!emailConfigured) return { ok: false, detail: "email not configured" };

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
          ${resumeBuffer ? "Resume attached as PDF." : "No resume attached."}
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
        attachments: resumeBuffer
          ? [
              {
                filename: resumeFileName,
                content: resumeBuffer,
                contentType: "application/pdf",
              },
            ]
          : [],
      });
      return { ok: true };
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Unknown error";
      console.error("[careers] sendMail failed", err);
      return { ok: false, detail };
    }
  };

  // ---- Google Sheets / Drive sync via Apps Script Web App ----
  // The Web App receives JSON with Base64-encoded PDF; it saves the PDF to a
  // Drive folder and appends a row to a Google Sheet. Setup per
  // Job_Application_Sync_Spec.pdf — set CAREERS_APPS_SCRIPT_URL to the deployed
  // /exec URL.
  const syncToSheet = async (): Promise<{ ok: boolean; detail?: string }> => {
    if (!sheetConfigured) return { ok: false, detail: "sheet not configured" };

    const payload = {
      role,
      jobTitle: role,
      name,
      phone,
      email,
      city,
      education,
      experience,
      pastCompany,
      resumeBase64: resumeBuffer ? resumeBuffer.toString("base64") : "",
      resumeFileName,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        // Apps Script Web Apps redirect through googleusercontent.com on
        // success — allow fetch to follow those 302s.
        redirect: "follow",
      });

      if (!res.ok) {
        return { ok: false, detail: `HTTP ${res.status}` };
      }
      return { ok: true };
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Unknown error";
      console.error("[careers] Apps Script sync failed", err);
      return { ok: false, detail };
    }
  };

  // Fire both in parallel. Submission succeeds if at least one destination
  // accepts the application.
  const [emailResult, sheetResult] = await Promise.all([
    sendEmail(),
    syncToSheet(),
  ]);

  if (!emailResult.ok && !sheetResult.ok) {
    return NextResponse.json(
      {
        error: "Could not deliver the application. Please try again.",
        detail: `email: ${emailResult.detail || "n/a"}; sheet: ${
          sheetResult.detail || "n/a"
        }`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: {
      email: emailResult.ok,
      sheet: sheetResult.ok,
    },
  });
}
