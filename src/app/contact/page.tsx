"use client";

import Link from "next/link";
import { Fragment, useRef, useState, type FormEvent } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { HeroCTA } from "@/components/HeroCTA";
import { ArrowRight, Mail, Phone } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const INQUIRY_TYPES = [
  "Sales/Partnership",
  "OEM/Product Development",
  "Mobility & EV Solutions",
  "Renewable Energy System",
  "Career/Human Resources",
  "Support/Service",
  "General Enquiry",
];

const CONTACT_CHANNELS = [
  {
    title: "Sales & Partnership",
    body: "For product enquiries, partnerships, and commercial discussions.",
    phone: "+91 7887870040",
    phoneHref: "tel:+917887870040",
    email: "sales@amectechnology.com",
  },
  {
    title: "Support & Service Enquiries",
    body: "For product support, service requests, and technical assistance.",
    phone: "+91 8405840555",
    phoneHref: "tel:+918405840555",
    email: "service@amectechnology.com",
  },
  {
    title: "Accounts & Payments",
    body: "For billing, invoices, payments, and finance-related communication.",
    email: "finance@amectechnology.com",
  },
];

const LOCATIONS = [
  {
    label: "Head Office & Factory",
    body:
      "Manufacturing & Assembly. Head operations, production facility and global dispatch.",
    city: "Nagpur, Maharashtra",
    address: "MIDC Industrial Area,\nNagpur – 440 022, India",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=MIDC+Industrial+Area+Nagpur",
    mapEmbed:
      "https://www.google.com/maps?q=MIDC+Industrial+Area+Nagpur+440022&output=embed",
  },
  {
    label: "AMEC Labs",
    body:
      "Research & Development. Industrial production, process control and preparation for assembly.",
    city: "Bangalore, Karnataka",
    address: "Electronics City Phase 1,\nBangalore – 560 100, India",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Electronics+City+Phase+1+Bangalore",
    mapEmbed:
      "https://www.google.com/maps?q=Electronics+City+Phase+1+Bangalore+560100&output=embed",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Hero />
      <ContactChannels />
      <HiringHR />
      <WhereWeAre />
      <JustSendIt />
      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1600px] px-6 md:px-14 ${className}`}>{children}</div>;
}

// ---------------------------------------------------------------------------
// Hero — kept with the existing full-bleed video, text content updated to
// match the new Figma copy.
// ---------------------------------------------------------------------------

function Hero() {
  const pinRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const pinTarget = pinRef.current;
    if (!pinTarget) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=100%",
        pin: pinTarget,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-title] span", {
        autoAlpha: 0,
        y: 32,
        stagger: 0.08,
        duration: 0.8,
      })
        .from("[data-hero-sub]", { autoAlpha: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from("[data-hero-cta]", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.4");

      gsap.to("[data-hero-glow]", {
        xPercent: 10,
        yPercent: -8,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pinTarget);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const titleLines = ["Let's Make", "The Future Exciting", "Together"];

  return (
    <section
      ref={pinRef}
      className="relative isolate h-screen w-full overflow-hidden bg-[#151515]"
    >
      {/* Full-bleed background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/Contact-hero.mp4"
        poster="/images/Contact-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />

      {/* Readability overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Ambient radial glow */}
      <div
        data-hero-glow
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 55%)",
        }}
      />

      {/* Content — title left, description right, CTA under title */}
      <div className="relative flex h-full items-center">
        <Shell>
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16">
            {/* LEFT — title + CTA */}
            <div>
              <h1 data-hero-title className="heading-xl">
                {titleLines.map((line, i) => (
                  <Fragment key={i}>
                    <span className="inline-block">{line}</span>
                    {i < titleLines.length - 1 ? <br /> : null}
                  </Fragment>
                ))}
              </h1>
              <div data-hero-cta className="mt-8 md:mt-10">
                <HeroCTA
                  href="#just-send-it"
                  label="Get in touch"
                  variant="primary"
                  arrow={false}
                />
              </div>
            </div>

            {/* RIGHT — description */}
            <p
              data-hero-sub
              className="max-w-xl text-sm leading-relaxed text-white/80 md:text-base"
            >
              Whether you're exploring a collaboration, have a business enquiry,
              or are interested in joining AMEC, our team is here to help. Reach
              out to us through the appropriate contact below, and we'll ensure
              your message reaches the right team.
            </p>
          </div>
        </Shell>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Contact Channels — 3-card grid: Sales / Support / Accounts
// ---------------------------------------------------------------------------

function ContactChannels() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-channel-card]", {
        autoAlpha: 0,
        y: 36,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-20">
      <Shell>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {CONTACT_CHANNELS.map((c) => (
            <article
              key={c.title}
              data-channel-card
              className="group flex flex-col rounded-card border border-white/[0.08] bg-bg-card p-7 transition-colors hover:border-white/20 md:p-8"
            >
              <h3 className="font-display text-base font-semibold text-white md:text-lg">
                {c.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60 md:text-[15px]">
                {c.body}
              </p>

              <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-5 text-sm text-white/80 md:text-[15px]">
                {c.phone && c.phoneHref && (
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-white/60" />
                    <a
                      href={c.phoneHref}
                      className="transition-colors hover:text-white"
                    >
                      {c.phone}
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-white/60" />
                  <a
                    href={`mailto:${c.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {c.email}
                  </a>
                </li>
              </ul>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Hiring & HR Support — title/description on the left, email input on the right
// ---------------------------------------------------------------------------

function HiringHR() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [email, setEmail] = useState("");

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hiring-item]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = email.trim()
      ? `mailto:hr@amectechnology.com?subject=HR%20Enquiry&body=From%3A%20${encodeURIComponent(email)}`
      : "mailto:hr@amectechnology.com";
    window.location.href = target;
  };

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16">
      <Shell>
        <div className="grid gap-8 border-y border-white/[0.08] py-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 md:py-14">
          <div data-hiring-item>
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              Hiring & HR Support
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
              For recruitment, careers, and HR inquiries.
            </p>
          </div>

          <form
            data-hiring-item
            onSubmit={onSubmit}
            className="flex w-full items-center gap-3 rounded border border-white/15 bg-white/[0.03] px-5 py-2 transition-colors hover:border-white/30 focus-within:border-white/40 md:ml-auto md:max-w-md"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Email
            </span>
            <span aria-hidden className="h-5 w-px bg-white/15" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Your email address for HR enquiry"
              className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-white/40 outline-none md:text-[15px]"
            />
            <button
              type="submit"
              aria-label="Send HR enquiry"
              className="grid h-9 w-9 shrink-0 place-items-center rounded bg-white text-black transition hover:bg-white/90"
            >
              <ArrowRight className="h-4 w-4 -rotate-45" />
            </button>
          </form>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Where We Are — 2 location cards with maps
// ---------------------------------------------------------------------------

function WhereWeAre() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-wwa-head]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-wwa-card]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-wwa-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24">
      <Shell>
        <div className="text-center">
          <h2 data-wwa-head className="font-display text-2xl font-semibold uppercase tracking-wide text-white md:text-4xl">
            Where We Are
          </h2>
          <p
            data-wwa-head
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            Strategically located across India.
          </p>
        </div>

        <div
          data-wwa-grid
          className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8"
        >
          {LOCATIONS.map((loc) => (
            <article
              key={loc.label}
              data-wwa-card
              className="group flex flex-col overflow-hidden rounded-card border border-white/[0.08] bg-bg-card transition-colors hover:border-white/20"
            >
              <div className="flex flex-col gap-6 p-7 md:p-8">
                <div>
                  <h3 className="font-display text-base font-semibold uppercase tracking-[0.18em] text-white md:text-lg">
                    {loc.label}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-[15px]">
                    {loc.body}
                  </p>
                </div>

                <div className="text-sm leading-relaxed text-white/85 md:text-[15px]">
                  <p className="font-semibold text-white">{loc.city}</p>
                  <p className="mt-2 whitespace-pre-line text-white/60">
                    {loc.address}
                  </p>
                </div>

                <a
                  href={loc.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex flex-row-reverse items-center gap-3 self-start rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 font-display text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black"
                >
                  View location
                  <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover/btn:bg-black group-hover/btn:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>

              {/* Embedded Google Map */}
              <div className="relative mt-auto aspect-[16/9] w-full overflow-hidden bg-white/[0.04]">
                <iframe
                  src={loc.mapEmbed}
                  title={`Map — ${loc.city}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0 grayscale contrast-[1.05] [filter:invert(0.92)_hue-rotate(180deg)_grayscale(1)_contrast(0.95)]"
                />
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Just Send It — the main contact form
// ---------------------------------------------------------------------------

type FormState = "idle" | "submitting" | "success" | "error";

function JustSendIt() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-jsi-left]", {
        autoAlpha: 0,
        x: -24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-jsi-form]", {
        autoAlpha: 0,
        y: 36,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

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
    "w-full rounded border bg-white/[0.03] px-5 py-4 text-sm text-white placeholder:text-white/40 outline-none transition md:text-base";
  const inputOk = "border-white/10 focus:border-white/40 focus:bg-white/[0.05]";
  const inputErr = "border-red-400/60 focus:border-red-400";
  const field = (name: string) =>
    `${inputBase} ${errors[name] ? inputErr : inputOk}`;
  const labelCls =
    "block font-display text-sm font-semibold text-white md:text-base";

  return (
    <section
      ref={sectionRef}
      id="just-send-it"
      className="w-full py-16 md:py-24"
    >
      <Shell>
        <div className="overflow-hidden rounded-card border border-white/[0.08] bg-bg-card">
          <div className="grid gap-10 p-7 md:grid-cols-[1fr_1.3fr] md:gap-12 md:p-12 lg:gap-16 lg:p-16">
            {/* LEFT — title sits lower in the column; info blocks + buttons grouped at the bottom */}
            <div data-jsi-left className="flex flex-col">
              <h2 className="mt-24 font-display font-semibold normal-case tracking-normal text-white text-[52px] leading-[1.05] md:mt-40 md:text-[72px]">
                Just<br />send it.
              </h2>

              {/* Bottom group — info blocks sit just above the buttons */}
              <div className="mt-auto flex flex-col gap-8 pt-16">
                <div className="grid gap-8 text-sm leading-relaxed sm:grid-cols-2 sm:gap-6 md:text-[15px]">
                  <div>
                    <p className="text-white/60">You don't like forms?</p>
                    <p className="mt-2 max-w-[22ch] text-white">
                      Partner with AMEC for end-to-end EV engineering — from concept to production-ready solutions.
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60">Looking to do great work?</p>
                    <p className="mt-2 max-w-[22ch] text-white">
                      Have a project in mind? Reach out and our team will get back to you within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:hello@amectechnology.com"
                    className="group/mail inline-flex flex-row-reverse items-center gap-3 rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 font-display text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black"
                  >
                    hello@amectechnology.com
                    <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover/mail:bg-black group-hover/mail:text-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                  <Link
                    href="/careers"
                    className="group/job inline-flex flex-row-reverse items-center gap-3 rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 font-display text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black"
                  >
                    Job Openings
                    <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover/job:bg-black group-hover/job:text-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT — form */}
            {state === "success" ? (
              <div
                data-jsi-form
                className="flex flex-col items-start justify-center gap-6 rounded border border-white/[0.06] bg-white/[0.02] p-8"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                    Thank you — we'll be in touch.
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                    Your message is on its way. Expect a reply within one business day.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="rounded border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/30 hover:bg-white/5"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                data-jsi-form
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <div>
                  <label htmlFor="jsi-name" className={labelCls}>Full Name</label>
                  <input
                    id="jsi-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`mt-2 ${field("name")}`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="jsi-email" className={labelCls}>Mail ID</label>
                    <input
                      id="jsi-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`mt-2 ${field("email")}`}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="jsi-phone" className={labelCls}>Phone Number</label>
                    <input
                      id="jsi-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className={`mt-2 ${field("phone")}`}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="jsi-company" className={labelCls}>Company / Organization</label>
                    <input
                      id="jsi-company"
                      name="company"
                      type="text"
                      placeholder="Enter your company name"
                      className={`mt-2 ${field("company")}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="jsi-type" className={labelCls}>Enquiry Type</label>
                    <div className="relative mt-2">
                      <select
                        id="jsi-type"
                        name="type"
                        defaultValue=""
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
                      <span aria-hidden className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/60">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="jsi-message" className={labelCls}>Message</label>
                  <textarea
                    id="jsi-message"
                    name="message"
                    rows={5}
                    placeholder="Enter your query details…"
                    className={`mt-2 resize-none ${field("message")}`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-5 font-display text-base font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 md:text-lg"
                >
                  {state === "submitting" ? "Submitting…" : "Submit Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Shell>
    </section>
  );
}
