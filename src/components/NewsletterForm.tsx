"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("success");
    setMessage("Thanks — you're subscribed.");
    setEmail("");
  };

  const inputState =
    status === "error"
      ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/30"
      : status === "success"
        ? "border-emerald-400/60 focus:border-emerald-400 focus:ring-emerald-400/30"
        : "border-white/15 focus:border-white/40 focus:ring-white/20";

  return (
    <form className="mt-8 max-w-sm" onSubmit={handleSubmit} noValidate>
      <label htmlFor="newsletter" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
        STAY UPDATED
      </label>
      <div className="mt-3 flex items-center gap-2">
        <input
          id="newsletter"
          type="email"
          required
          aria-invalid={status === "error"}
          aria-describedby="newsletter-message"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="you@company.com"
          className={`flex-1 rounded border bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition focus:outline-none focus:ring-2 ${inputState}`}
        />
        <button
          type="submit"
          className="grid h-10 w-10 shrink-0 place-items-center rounded bg-white text-black transition hover:bg-white/90"
          aria-label="Subscribe"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>
      </div>
      <p
        id="newsletter-message"
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={`mt-2 min-h-[1.25rem] text-xs ${
          status === "error"
            ? "text-red-400"
            : status === "success"
              ? "text-emerald-400"
              : "text-transparent"
        }`}
      >
        {message || " "}
      </p>
    </form>
  );
}
