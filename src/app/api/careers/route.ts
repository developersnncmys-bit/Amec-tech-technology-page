import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_ALLOWED_RE = /^[+()\-\s\d]+$/;

const RECIPIENT = process.env.CAREERS_RECIPIENT || "hr.amectechnology@gmail.com";
const APPS_SCRIPT_URL = process.env.CAREERS_APPS_SCRIPT_URL || "";
const APPS_SCRIPT_SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET || "";

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
  if (!PHONE_ALLOWED_RE.test(phone)) {
    return NextResponse.json(
      {
        error:
          "Phone number can only contain digits, spaces, +, -, and parentheses.",
      },
      { status: 400 }
    );
  }
  {
    const digits = phone.replace(/\D/g, "");
    // Accept 10 digits (local) or 11–13 digits (10 + 1–3 digit country code).
    const isLocal = digits.length === 10;
    const isWithCountryCode = digits.length >= 11 && digits.length <= 13;
    if (!isLocal && !isWithCountryCode) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit phone number (country code optional)." },
        { status: 400 }
      );
    }
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

    // Apps Script expects `experience` as a STRING of digits (its `clean()`
    // helper rejects non-strings, returning "" which then fails the
    // "Required fields are missing" check). Parse digits from free-text
    // input and send as a string so `clean()` keeps it, and the subsequent
    // `Number(experience)` call parses it to a number for range validation.
    const expMatch = experience.match(/\d+(?:\.\d+)?/);
    const experienceStr = expMatch ? expMatch[0] : "";

    const payload = {
      // Shared secret so the Apps Script can reject unauthenticated requests.
      // Must match CONFIG.SHARED_SECRET inside the Apps Script doPost handler.
      secret: APPS_SCRIPT_SECRET,
      role,
      jobTitle: role,
      name,
      phone,
      phoneNumber: phone, // alias — some handlers key off `phoneNumber`
      email,
      city,
      education,
      // String of digits (e.g. "6") for Apps Script's clean() → Number() path.
      experience: experienceStr,
      pastCompany,
      resumeBase64: resumeBuffer ? resumeBuffer.toString("base64") : "",
      resumeFileName,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        // IMPORTANT: Apps Script Web Apps deployed with "Anyone" access do NOT
        // reliably accept application/json — Google either silently drops the
        // request or redirects to a login page without invoking doPost. Using
        // text/plain avoids the preflight/CORS path and the request reaches
        // doPost. The body is still JSON; `e.postData.contents` in Apps Script
        // receives the raw JSON string which JSON.parse decodes normally.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        // Apps Script Web Apps redirect through googleusercontent.com on
        // success — allow fetch to follow those 302s.
        redirect: "follow",
      });

      if (!res.ok) {
        return { ok: false, detail: `HTTP ${res.status}` };
      }

      // Apps Script returns 200 even on validation failures — parse the body
      // to detect `{ success: false, ... }` and treat it as a real failure.
      const text = await res.text();
      let body: { success?: boolean; message?: string; debug?: string } = {};
      try {
        body = JSON.parse(text);
      } catch {
        // Non-JSON response — some Apps Script setups return HTML on error.
        return { ok: false, detail: `non-JSON response: ${text.slice(0, 200)}` };
      }
      if (body.success === false) {
        // `debug` is the actual error message surfaced by the Apps Script
        // catch block (temporarily exposed for diagnostics). `message` is the
        // generic user-safe copy.
        return {
          ok: false,
          detail: body.debug
            ? `${body.message || "rejected"} — ${body.debug}`
            : body.message || "Apps Script rejected the submission",
        };
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

  // Log sheet sync failure to server console AND include the detail in the
  // response so it's visible in the browser's Network → Response tab. Helps
  // diagnose Apps Script issues without needing server access.
  if (!sheetResult.ok) {
    console.error("[careers] Sheet sync failed:", sheetResult.detail);
  }

  return NextResponse.json({
    ok: true,
    delivered: {
      email: emailResult.ok,
      sheet: sheetResult.ok,
    },
    sheetError: sheetResult.ok ? undefined : sheetResult.detail,
    emailError: emailResult.ok ? undefined : emailResult.detail,
  });
}
