"use client";

import Link from "next/link";
import { Fragment, useRef, useState, type FormEvent } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { AnimateIn } from "@/components/AnimateIn";
import { Footer } from "@/components/Footer";
import { ArrowRight, Mail, MapPin, Phone } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const INQUIRY_TYPES = [
  "General Enquiry",
  "Product — SOURCE",
  "OEM Engineering",
  "Powertrain & Battery",
  "Partnerships",
  "Careers",
  "Media & Press",
];

const CHANNELS = [
  {
    label: "Request a Quote",
    body: "Pricing, lead times, and configuration for SOURCE and OEM projects.",
    href: "#contact-form",
    accent: "quote",
  },
  {
    label: "Talk to an Expert",
    body: "Deep-dive technical calls with engineering on integration and compliance.",
    href: "#contact-form",
    accent: "expert",
  },
  {
    label: "Partner with AMEC",
    body: "Strategic partnerships, distribution, and system integrator programs.",
    href: "#contact-form",
    accent: "partner",
  },
  {
    label: "Press & Media",
    body: "Press kits, interviews, and brand assets for media coverage.",
    href: "mailto:contact@company.com",
    accent: "press",
  },
];

const FAQ_ITEMS = [
  {
    q: "How quickly will I hear back after submitting the form?",
    a: "Our team responds to all enquiries within one business day. For urgent technical questions, use the Talk to an Expert channel — those requests are routed directly to engineering.",
  },
  {
    q: "Where is AMEC Technology headquartered?",
    a: "AMEC Technology operates out of our head office at 794 McAllister St, San Francisco. Visits are by appointment — drop us a line and we'll set it up.",
  },
  {
    q: "Do you ship SOURCE outside India?",
    a: "Yes. SOURCE is engineered to IEC and regional compliance standards for international deployment. Export logistics, certifications, and warranty are coordinated per-market during the quote process.",
  },
  {
    q: "Can you support custom OEM powertrain or energy builds?",
    a: "Absolutely. OEM Engineering is one of our core practices — we work with you from concept through validation to a production-ready system, including scalable design and compliance documentation.",
  },
  {
    q: "How do I apply for a role at AMEC?",
    a: "Visit the Careers page for open roles. If you don't see your role listed, use the Careers channel on this page — we review every application and keep interesting profiles on file.",
  },
];

const INTRO_TEXT =
  "Whether you're specifying SOURCE for a project, exploring an OEM collaboration, or just want to understand what we build — the fastest path is a direct conversation. Tell us about the problem, and the right engineer will get back to you.";
const INTRO_WORDS = INTRO_TEXT.split(" ");

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Hero />
      <Intro />
      <Channels />
      <ContactSection />
      <FAQ />
      <ClosingCTA />
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
// Hero
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
      tl.from("[data-hero-eyebrow]", { autoAlpha: 0, y: 20, duration: 0.6 })
        .from("[data-hero-title] span", { autoAlpha: 0, y: 24, stagger: 0.06, duration: 0.8 }, "-=0.3")
        .from("[data-hero-sub]", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from("[data-hero-cta]", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.3");

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

  return (
    <section
      ref={pinRef}
      className="relative isolate flex h-screen w-full items-end overflow-hidden bg-[#151515]"
    >
      {/* Full-bleed background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/Contact-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Readability overlay — subtle vignette so text stays legible without
          flattening the video. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Ambient radial glow — floats slowly over the video for depth */}
      <div
        data-hero-glow
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 55%)",
        }}
      />

      {/* Top-center — eyebrow + title */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-28 text-center md:pt-36">
        <p data-hero-eyebrow className="eyebrow">Contact</p>
        <h1 data-hero-title className="mt-3 heading-xl">
          {"LET'S BUILD TOGETHER".split(" ").map((word, i) => (
            <Fragment key={i}>
              <span className="inline-block">{word}</span>
              {i < 2 ? " " : ""}
            </Fragment>
          ))}
        </h1>
      </div>

      {/* Bottom row — description on the left, CTA on the right */}
      <div className="relative flex w-full flex-col gap-6 px-6 pb-12 md:flex-row md:items-end md:justify-between md:gap-10 md:px-14 md:pb-16">
        <p
          data-hero-sub
          className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
        >
          One form, one direct path to the engineers who build AMEC Technology.
          Tell us what you're working on — we'll route it to the right team.
        </p>
        <div data-hero-cta className="shrink-0">
          <a href="#contact-form" className="btn-primary">Start a Conversation</a>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Intro — scroll-scrub word reveal
// ---------------------------------------------------------------------------

function Intro() {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Tight scrub range (~15% of viewport) so a single wheel-notch /
      // trackpad swipe scrubs the full reveal — no pin, no forced empty space.
      const words = gsap.utils.toArray<HTMLElement>("[data-intro-word]");
      gsap.set(words, { autoAlpha: 0.14 });
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "top 60%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full py-20 md:py-28">
      <Shell>
        <p className="mx-auto max-w-4xl text-center font-display text-lg leading-relaxed text-white/70 md:text-2xl">
          {INTRO_WORDS.map((word, i) => (
            <Fragment key={i}>
              <span data-intro-word className="inline-block">{word}</span>
              {i < INTRO_WORDS.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Channels — numbered "ways to reach us" cards
// ---------------------------------------------------------------------------

function Channels() {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header stays visible when the section enters — fade it in once on
      // scroll-into-view so it's fully present by the time the pin engages.
      gsap.from(
        ["[data-channel-eyebrow]", "[data-channel-heading] span", "[data-channel-sub]"],
        {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // Cards start hidden — all four reveal together on the first scroll
      // gesture inside the pin.
      gsap.set("[data-channel-card]", { autoAlpha: 0, y: 60, scale: 0.94 });

      // Pin the section briefly. The first scroll gesture plays the full
      // card cascade (quick stagger across all four cards), then the pin
      // releases. ScrollTrigger ties the timeline to the pin range so a
      // single scroll completes the whole reveal.
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Fires once per direction when the user first scrolls into the pin —
        // triggers a non-scrubbed animation that plays all cards in one go.
        onEnter: () => {
          gsap.to("[data-channel-card]", {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.4)",
            overwrite: true,
          });
        },
        onEnterBack: () => {
          gsap.to("[data-channel-card]", {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const headingWords = "Four ways to reach us.".split(" ");

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden py-16 md:py-24"
    >
      {/* Ambient spotlight — adds depth during the pin */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 50% 40%, rgba(255,255,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative">
        <Shell>
          <div className="max-w-2xl">
            <p data-channel-eyebrow className="eyebrow">Channels</p>
            <h2 data-channel-heading className="mt-3 heading-lg">
              {headingWords.map((word, i) => (
                <Fragment key={i}>
                  <span className="inline-block">{word}</span>
                  {i < headingWords.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </h2>
            <p
              data-channel-sub
              className="mt-5 text-sm leading-relaxed text-white/70 md:text-base"
            >
              Pick the channel that matches your intent. Each one routes to the right desk — no
              generic inboxes, no round-robin tickets.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {CHANNELS.map((c, i) => (
              <Link
                key={c.label}
                href={c.href}
                data-channel-card
                className="group relative flex flex-col justify-between overflow-hidden rounded-card border border-white/[0.06] bg-bg-card p-6 transition-colors hover:border-white/20 md:p-7"
              >
                <div>
                  <span
                    data-channel-num
                    className="inline-block font-display text-xs font-semibold text-white/40 md:text-sm"
                  >
                    0{i + 1}
                  </span>
                  <h3
                    data-channel-title
                    className="mt-6 text-lg font-semibold text-white md:text-xl"
                  >
                    {c.label}
                  </h3>
                  <p
                    data-channel-body
                    className="mt-3 text-sm leading-relaxed text-white/60 md:text-[15px]"
                  >
                    {c.body}
                  </p>
                </div>
                <span
                  data-channel-cta
                  className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors group-hover:text-white"
                >
                  Open channel
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Shell>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Contact section — form + info side-by-side
// ---------------------------------------------------------------------------

function ContactSection() {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-contact-info]", {
        autoAlpha: 0,
        x: -24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-contact-form]", {
        autoAlpha: 0,
        y: 36,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact-form" className="relative w-full py-16 md:py-24">
      <Shell>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          {/* Left — info */}
          <div data-contact-info className="md:sticky md:top-28 md:self-start">
            <p className="eyebrow">Direct line</p>
            <h2 className="mt-3 heading-lg">Tell us about your project.</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
              Fill out the form and we'll match your enquiry with the engineer best suited to help.
              Typical response time: one business day.
            </p>

            <ul className="mt-10 space-y-5 text-sm md:text-base">
              <li className="flex items-start gap-4 text-white/80">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    Email
                  </p>
                  <a
                    href="mailto:contact@company.com"
                    className="mt-1 block transition-colors hover:text-white"
                  >
                    contact@company.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-white/80">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    Phone
                  </p>
                  <a
                    href="tel:+14146875892"
                    className="mt-1 block transition-colors hover:text-white"
                  >
                    (414) 687 – 5892
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-white/80">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    Head office
                  </p>
                  <p className="mt-1">
                    794 McAllister St
                    <br />
                    San Francisco, 94102
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right — form card */}
          <div
            data-contact-form
            className="rounded-card border border-white/[0.06] bg-bg-card p-6 md:p-10"
          >
            <ContactForm />
          </div>
        </div>
      </Shell>
    </section>
  );
}

type FormState = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const type = String(data.get("type") || "").trim();

    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email.";
    if (!type) next.type = "Please choose a topic.";
    if (!message) next.message = "Please add a short message.";

    if (Object.keys(next).length) {
      setErrors(next);
      setState("error");
      return;
    }

    setErrors({});
    setState("submitting");
    // Simulated submission — replace with real endpoint when wired.
    window.setTimeout(() => {
      setState("success");
      form.reset();
    }, 700);
  };

  if (state === "success") {
    return (
      <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/5 text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <h3 className="mt-6 heading-md text-white">Thank you — we'll be in touch.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
          Your message is on its way to the right team. Expect a reply within one business day.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-8 btn-ghost"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full rounded border bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 transition focus:outline-none focus:ring-2";
  const inputOk =
    "border-white/15 focus:border-white/40 focus:ring-white/20";
  const inputErr =
    "border-red-400/60 focus:border-red-400 focus:ring-red-400/30";

  const field = (name: string) =>
    `${inputBase} ${errors[name] ? inputErr : inputOk}`;

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Full name
          </label>
          <input id="name" name="name" type="text" placeholder="Ada Lovelace" className={`mt-2 ${field("name")}`} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Email
          </label>
          <input id="email" name="email" type="email" placeholder="you@company.com" className={`mt-2 ${field("email")}`} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="company" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Company <span className="text-white/40">(optional)</span>
          </label>
          <input id="company" name="company" type="text" placeholder="Company name" className={`mt-2 ${field("company")}`} />
        </div>
        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Phone <span className="text-white/40">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" placeholder="+91 80 4000 0000" className={`mt-2 ${field("phone")}`} />
        </div>
      </div>

      <div>
        <label htmlFor="type" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
          What's it about?
        </label>
        <div className="relative mt-2">
          <select
            id="type"
            name="type"
            defaultValue=""
            className={`${field("type")} appearance-none pr-10`}
            aria-invalid={!!errors.type}
          >
            <option value="" disabled>
              Select a topic
            </option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t} className="bg-bg-card text-white">
                {t}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
        {errors.type && <p className="mt-1 text-xs text-red-400">{errors.type}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your project, timelines, or questions…"
          className={`mt-2 resize-none ${field("message")}`}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      <div className="flex items-start gap-3 pt-1">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-transparent accent-white"
        />
        <label htmlFor="consent" className="text-xs leading-relaxed text-white/60 md:text-[13px]">
          I agree to AMEC's{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
            Privacy Policy
          </Link>{" "}
          and consent to being contacted about my enquiry.
        </label>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="group inline-flex flex-row-reverse items-center gap-3 rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Sending…" : "Send message"}
          <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </button>
        <p className="text-xs text-white/50">
          Prefer email?{" "}
          <a href="mailto:contact@company.com" className="underline underline-offset-4 hover:text-white">
            contact@company.com
          </a>
        </p>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Mirrors the Source page FAQ behaviour so every click reads as the
  // answer expanding downward from under the clicked question:
  //   1. If a different item is already open, close it first and wait for
  //      the collapse animation to finish before opening the new one.
  //   2. Pin the clicked button's viewport Y across the full close+open
  //      window so layout shifts above/below don't drag it around.
  const handleToggle = (i: number, button: HTMLButtonElement) => {
    const isSame = openIndex === i;
    const anchorY = button.getBoundingClientRect().top;

    if (isSame) {
      setOpenIndex(null);
    } else if (openIndex !== null) {
      setOpenIndex(null);
      window.setTimeout(() => setOpenIndex(i), 520);
    } else {
      setOpenIndex(i);
    }

    const start = performance.now();
    const tick = () => {
      const nowY = button.getBoundingClientRect().top;
      const delta = nowY - anchorY;
      if (Math.abs(delta) > 0.5) {
        window.scrollBy({ top: delta, behavior: "auto" });
      }
      if (performance.now() - start < 1100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  useIsomorphicLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-faq-item]", {
        autoAlpha: 0,
        y: -40,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-24">
      <Shell>
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr_0.8fr] md:gap-14">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="heading-lg">F.A.Q</h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70 md:text-base">
              Quick answers to the questions we hear most often from new customers and partners.
            </p>
          </div>

          <div ref={listRef} className="divide-y divide-white/10 border-y border-white/10">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div key={item.q} data-faq-item>
                  <button
                    type="button"
                    onClick={(e) => handleToggle(i, e.currentTarget)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 py-6 text-left transition-colors"
                  >
                    <span className={`text-[10px] tracking-[0.2em] transition-colors md:text-xs ${isOpen ? "text-white" : "text-white/40"}`}>
                      {num}
                    </span>
                    <span className={`text-sm font-medium transition-colors md:text-base ${isOpen ? "text-white" : "text-white/85"}`}>
                      {item.q}
                    </span>
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full border transition ${
                        isOpen ? "border-white bg-white text-black" : "border-white/25 text-transparent"
                      }`}
                      aria-hidden
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-[max-height] duration-500 ease-out"
                    style={{ maxHeight: isOpen ? "500px" : "0px" }}
                  >
                    <div className="grid grid-cols-[auto_1fr_auto] gap-6 pb-6">
                      <span aria-hidden />
                      <p className="text-xs leading-relaxed text-white/70 md:text-sm">
                        {item.a}
                      </p>
                      <span aria-hidden />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="md:sticky md:top-28 md:self-start">
            <p className="text-sm leading-relaxed text-white/70 md:text-base">
              Still have questions? Our team is here to help.
            </p>
            <a
              href="mailto:contact@amectechnology.com"
              className="group mt-4 inline-flex items-center gap-2 rounded border border-white/25 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              Email us
            </a>
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing CTA
// ---------------------------------------------------------------------------

const CLOSING_HEADING = "A GOOD CONVERSATION STARTS WITH ONE MESSAGE.";
const CLOSING_WORDS = CLOSING_HEADING.split(" ");

function ClosingCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      gsap.from("[data-close-eyebrow]", {
        autoAlpha: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });

      gsap.from("[data-close-cta]", {
        autoAlpha: 0,
        y: 30,
        scale: 0.9,
        duration: 0.7,
        delay: 0.2,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });

      const words = gsap.utils.toArray<HTMLElement>("[data-close-word]");
      gsap.set(words, { autoAlpha: 0.14 });
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=30%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      gsap.to("[data-close-glow]", {
        xPercent: 8,
        yPercent: -5,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const pulses = gsap.utils.toArray<HTMLElement>("[data-close-pulse]");
      pulses.forEach((pulse, i) => {
        gsap.set(pulse, { scale: 0.2, opacity: 0 });
        gsap.to(pulse, {
          scale: 1.4,
          opacity: 0.5,
          duration: 5,
          repeat: -1,
          ease: "sine.out",
          delay: i * (5 / pulses.length),
          keyframes: {
            "0%": { scale: 0.2, opacity: 0 },
            "20%": { opacity: 0.5 },
            "100%": { scale: 1.4, opacity: 0 },
          },
        });
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            data-close-pulse
            className="absolute aspect-square rounded-full border-2 border-white/25"
            style={{ width: "60vmax" }}
          />
        ))}
      </div>
      <div
        data-close-glow
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 55%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-8 px-6 text-center md:px-14">
        <p data-close-eyebrow className="eyebrow">One message away</p>
        <h2 className="heading-xl max-w-6xl">
          {CLOSING_WORDS.map((word, i) => (
            <Fragment key={i}>
              <span data-close-word className="inline-block">{word}</span>
              {i < CLOSING_WORDS.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h2>
        <div data-close-cta>
          <a
            href="#contact-form"
            className="group inline-flex flex-row-reverse items-center gap-3 rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black"
          >
            Start the Conversation
            <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
