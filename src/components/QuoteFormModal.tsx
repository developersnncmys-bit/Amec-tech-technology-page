"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

const INQUIRY_TYPES = [
  "Sales/Partnership",
  "OEM/Product Development",
  "Source Hybrid energy system",
  "Mobility & EV Solutions",
  "Renewable Energy System",
  "Career/Human Resources",
  "Support/Service",
  "General Enquiry",
];

type FormState = "idle" | "submitting" | "success" | "error";

export type QuoteFormModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  defaultInquiryType?: string;
};

export function QuoteFormModal({
  open,
  onClose,
  title = "Request a Quote",
  subtitle = "Share a few details and our team will get back to you within 24 hours.",
  defaultInquiryType,
}: QuoteFormModalProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMounted(true), []);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Lock body scroll + handle Esc while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // Focus the first field after the open transition starts
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 120);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  // Reset state whenever the modal is closed, so reopening starts fresh
  useEffect(() => {
    if (!open) {
      setState("idle");
      setErrors({});
    }
  }, [open]);

  if (!open || !mounted) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email.";
    if (!message) next.message = "Please add a short message.";

    if (Object.keys(next).length) {
      setErrors(next);
      setState("error");
      return;
    }

    setErrors({});
    setState("submitting");
    window.setTimeout(() => {
      setState("success");
      form.reset();
    }, 700);
  };

  const inputBase =
    "w-full rounded-md border bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition md:text-[15px]";
  const inputOk = "border-white/10 focus:border-white/40 focus:bg-white/[0.05]";
  const inputErr = "border-red-400/60 focus:border-red-400";
  const field = (name: string) =>
    `${inputBase} ${errors[name] ? inputErr : inputOk}`;
  const labelCls =
    "block font-display text-sm font-semibold text-white md:text-[15px]";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[qmFadeIn_0.25s_ease-out]"
      />

      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[calc(100vh-3rem)] w-full max-w-2xl flex-col overflow-hidden rounded-card border border-white/[0.08] bg-bg-card shadow-[0_30px_80px_rgba(0,0,0,0.55)] animate-[qmPopIn_0.3s_ease-out]"
      >
        <div className="flex items-start justify-between gap-6 border-b border-white/[0.06] px-6 py-5 md:px-8 md:py-6">
          <div>
            <h2
              id="quote-modal-title"
              className="font-display text-xl font-semibold text-white md:text-2xl"
            >
              {title}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60 md:text-sm">
              {subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 md:px-8 md:py-7">
          {state === "success" ? (
            <div className="flex flex-col items-start gap-5 rounded border border-white/[0.06] bg-white/[0.02] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white md:text-xl">
                  Thank you — we'll be in touch.
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                  Your message is on its way. Expect a reply within one business day.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="rounded border border-white/15 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/30 hover:bg-white/5"
                >
                  Send another message
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="qm-name" className={labelCls}>Full Name</label>
                <input
                  ref={firstFieldRef}
                  id="qm-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className={`mt-2 ${field("name")}`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="qm-email" className={labelCls}>Mail ID</label>
                  <input
                    id="qm-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`mt-2 ${field("email")}`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="qm-phone" className={labelCls}>Phone Number</label>
                  <input
                    id="qm-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className={`mt-2 ${field("phone")}`}
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="qm-company" className={labelCls}>Company / Organization</label>
                  <input
                    id="qm-company"
                    name="company"
                    type="text"
                    placeholder="Enter your company name"
                    className={`mt-2 ${field("company")}`}
                  />
                </div>
                <div>
                  <label htmlFor="qm-type" className={labelCls}>Enquiry Type</label>
                  <div className="relative mt-2">
                    <select
                      id="qm-type"
                      name="type"
                      defaultValue={defaultInquiryType ?? ""}
                      className={`${field("type")} cursor-pointer appearance-none pr-12`}
                    >
                      <option value="" disabled>
                        Select your area of interest
                      </option>
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-bg-card text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="qm-message" className={labelCls}>Message</label>
                <textarea
                  id="qm-message"
                  name="message"
                  rows={4}
                  placeholder="Enter your query details…"
                  className={`mt-2 resize-none ${field("message")}`}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={state === "submitting"}
                className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-4 font-display text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
              >
                {state === "submitting" ? "Submitting…" : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes qmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes qmPopIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}
