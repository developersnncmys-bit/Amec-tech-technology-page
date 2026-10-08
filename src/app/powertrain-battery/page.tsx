"use client";

import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const INTRO_LEAD_LABEL = "AMEC's EV Drivetrain System";
const INTRO_BODY =
  "is a complete, integrated electric powertrain platform designed specifically for electric two-wheelers. Built with a system-level engineering approach, the platform combines energy storage, power electronics, control systems, and charging infrastructure into a production-ready architecture that accelerates development and reduces time-to-market.";
const INTRO_BODY_WORDS = INTRO_BODY.split(" ");

const INTRO_CLOSING =
  "This drivetrain is designed to be modular, scalable, and customizable—enabling startups, fleet operators, and OEMs to build reliable electric vehicles without starting from scratch.";
const INTRO_CLOSING_WORDS = INTRO_CLOSING.split(" ");

const PRODUCTS = [
  {
    tag: "BATTERY",
    title: "4kWh Liquid Battery",
    image: "/Powertrain/4kwh-liquid-battery.png",
    bullets: [
      "Thermal stability & performance",
      "High-energy density for extended range",
      "Long operational life & durability",
    ],
  },
  {
    tag: "PLATFORM",
    title: "Aluminum Platform",
    image: "/Powertrain/Aluminium-platform.png",
    bullets: [
      "Lightweight & structurally optimized",
      "Seamless drivetrain integration",
      "Designed for vehicle component synergy",
    ],
  },
  {
    tag: "MOTOR",
    title: "7kW Drive Motor",
    image: "/Powertrain/7kw-drive-motor.png",
    bullets: [
      "High-efficiency electric performance",
      "Optimised for urban mobility",
      "Suited for performance two-wheelers",
    ],
  },
  {
    tag: "CONTROLLER",
    title: "Drive Controller",
    image: "/Powertrain/Drive-controller.png",
    bullets: [
      "Smooth & precise torque delivery",
      "Efficiency optimization technology",
      "Reliable & consistent operation",
    ],
  },
  {
    tag: "CONTROL",
    title: "Power & Vehicle Control",
    image: "/Powertrain/Power%26-vehicle-control.png",
    bullets: [
      "Centralized power distribution",
      "Intelligent safety logic & coordination",
      "Manages energy flow across systems",
    ],
  },
  {
    tag: "CHARGING",
    title: "Flash Charging System",
    image: "/Powertrain/Flash-charging.png",
    bullets: [
      "High-power fast charging solution",
      "Reduces downtime significantly",
      "Built for commercial & fleet use",
    ],
  },
  {
    tag: "POWER",
    title: "12V Auxiliary Power",
    image: "/Powertrain/12w-auxilary-power.png",
    bullets: [
      "Dedicated low-voltage power system",
      "Supports vehicle electronics & controls",
      "Powers auxiliary loads reliably",
    ],
  },
  {
    tag: "PORTABLE",
    title: "Portable Dock Battery",
    image: "/Powertrain/Portable-doc-battery.png",
    bullets: [
      "Compact & portable energy storage",
      "Easy dock-and-charge mechanism",
      "Versatile for on-the-go power needs",
    ],
  },
];

const ARCHITECTURE_TABS = [
  {
    id: "power-flow",
    label: "Power Flow Architecture",
    image: "/Powertrain/Power-flow-architecture.png",
    body:
      "Ideal for startups looking to launch electric two-wheelers quickly using a proven, ready-to-integrate drivetrain platform.",
  },
  {
    id: "mechanical",
    label: "Mechanical Integration",
    image: "/Powertrain/Mechanical-integration.png",
    body:
      "Precision-engineered mechanical interfaces that drop into chassis designs with minimal rework, cutting integration time in half.",
  },
  {
    id: "electrical",
    label: "Electrical Architecture",
    image: "/Powertrain/Electrical%20Architecture.png",
    body:
      "Modular wiring and control topology that scales from single-vehicle prototypes to full-fleet production runs.",
  },
];

const APPLICATIONS = [
  {
    title: "Rapid Product Launch",
    image: "/Powertrain/Rapid%20Growth.png",
  },
  {
    title: "EV Startups",
    image: "/Powertrain/EV-startups.png",
  },
  {
    title: "Fleet Operators",
    image: "/Powertrain/Fleet-Operators.png",
  },
];

const CAPABILITIES = [
  {
    title: "Ready Built Platform",
    body:
      "A fully engineered drivetrain platform that significantly reduces development time and integration complexity.",
    icon: (
      // Stacked layers
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 2 8l10 5 10-5-10-5Z" />
        <path d="m2 13 10 5 10-5" />
        <path d="m2 18 10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Customization Options",
    body:
      "Configurable battery capacities, control strategies, and system parameters to meet specific vehicle or operational requirements.",
    icon: (
      // Sliders / filter
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <line x1="21" y1="4" x2="14" y2="4" />
        <line x1="10" y1="4" x2="3" y2="4" />
        <line x1="21" y1="12" x2="12" y2="12" />
        <line x1="8" y1="12" x2="3" y2="12" />
        <line x1="21" y1="20" x2="16" y2="20" />
        <line x1="12" y1="20" x2="3" y2="20" />
        <line x1="14" y1="2" x2="14" y2="6" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="16" y1="18" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    title: "Thermal Management System",
    body:
      "Integrated liquid cooling architecture designed to maintain optimal operating temperatures for battery and power electronics under demanding conditions.",
    icon: (
      // Fan
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z" />
        <circle cx="12" cy="12" r="1.2" />
      </svg>
    ),
  },
  {
    title: "Testing & Validation",
    body:
      "Each subsystem is developed and validated through structured testing and real-world evaluation to ensure performance, safety, and reliability.",
    icon: (
      // Clipboard with checkmark
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Safety & Compliances",
    body:
      "The platform is engineered with safety-first principles, incorporating protection mechanisms, fault handling, and compliance-ready design practices aligned with industry standards.",
    icon: (
      // Shield with checkmark
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PowertrainBatteryPage() {
  return (
    <>
      <Hero />
      <Intro />
      <ProductPortfolio />
      <SystemArchitecture />
      <ApplicationsBand />
      <TechnicalCapabilities />
      <BuildCTA />
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
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-media]", { autoAlpha: 0, scale: 1.05, duration: 1.2 })
        .from("[data-hero-title]", { autoAlpha: 0, y: 40, duration: 0.9 }, "-=0.7");

      // Slow parallax drift on the hero media as the user scrolls past
      gsap.to("[data-hero-media]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Full-width hero media — autoplay, muted, loop */}
      <div data-hero-media className="relative h-screen w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/Powertrain-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      {/* Localized radial scrim behind the title for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 25% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 85%)",
        }}
      />

      {/* Title overlay — left-aligned, vertically centered */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-4 text-left md:px-8 lg:px-12">
        <h1
          data-hero-title
          className="font-display text-[40px] font-semibold uppercase leading-[1.06] text-white md:text-[68px]"
        >
          Powertrain And Battery
        </h1>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Intro — word-by-word scrub reveal
// ---------------------------------------------------------------------------

function Intro() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-intro-word]", { autoAlpha: 0.15 });
      gsap.to("[data-intro-word]", {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 40%",
          scrub: 0.4,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24">
      <Shell>
        <div className="mx-auto max-w-4xl space-y-8 font-display text-base leading-[1.75] text-white/80 md:text-lg">
          <p>
            <span data-intro-word className="inline-block font-semibold text-white">
              {INTRO_LEAD_LABEL}
            </span>{" "}
            {INTRO_BODY_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span data-intro-word className="inline-block">{word}</span>
                {i < INTRO_BODY_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>
          <p>
            {INTRO_CLOSING_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span data-intro-word className="inline-block">{word}</span>
                {i < INTRO_CLOSING_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Product Portfolio — horizontal drag/arrow carousel with counter
// ---------------------------------------------------------------------------

function ProductPortfolio() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visibleIndex, setVisibleIndex] = useState(1);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-pp-eyebrow]", {
        autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      });
      gsap.from("[data-pp-counter]", {
        autoAlpha: 0, y: 16, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      });
      gsap.fromTo(
        "[data-portfolio-card]",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%" },
        }
      );

      // Pin + translate the card track horizontally. A hold phase at the start
      // keeps the pinned section still for ~half a viewport of scroll before
      // the cards begin moving. Counter updates in sync with translate progress.
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 48);
      const getHold = () => window.innerHeight * 0.5;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getHold() + getDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const hold = getHold();
            const dist = getDistance();
            if (dist === 0) return;
            const total = hold + dist;
            const translateProgress = Math.max(
              0,
              Math.min(1, (self.progress * total - hold) / dist)
            );
            const idx = Math.max(
              1,
              Math.min(
                PRODUCTS.length,
                Math.round(translateProgress * (PRODUCTS.length - 1)) + 1
              )
            );
            setVisibleIndex((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      tl.to({}, { duration: getHold() });
      tl.to(track, {
        x: () => -getDistance(),
        ease: "none",
        duration: getDistance(),
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-16 md:py-20">
      <Shell>
        <div className="flex items-end justify-between gap-6">
          <h2 data-pp-eyebrow className="heading-lg">
            PRODUCT PORTFOLIO
          </h2>
          <div data-pp-counter className="flex items-baseline gap-2 text-white/70">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">Products</span>
            <span className="font-display text-4xl font-semibold text-white md:text-5xl">
              {String(visibleIndex).padStart(2, "0")}
            </span>
            <span className="text-sm text-white/40">/{String(PRODUCTS.length).padStart(2, "0")}</span>
          </div>
        </div>
      </Shell>

      <div className="relative mt-8">
        <div
          ref={trackRef}
          className="flex gap-6 pl-6 pr-6 will-change-transform md:pl-14 md:pr-14"
        >
          {PRODUCTS.map((p) => (
            <article
              key={p.title}
              data-portfolio-card
              className="group/card relative flex w-[340px] shrink-0 flex-col rounded-xl border border-white/[0.06] bg-bg-card p-5 transition hover:border-white/20 md:w-[400px]"
            >
              <span className="inline-flex w-fit items-center rounded-md border border-white/15 bg-white/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
                {p.tag}
              </span>
              <div className="mt-3 flex h-[200px] w-full items-center justify-center md:h-[220px]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white md:text-lg">{p.title}</h3>
              <ul className="mt-3 space-y-1.5 text-xs text-white/60 md:text-[13px]">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden className="mt-[6px] inline-block h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="group/cta mt-5 inline-flex flex-row-reverse items-center gap-3 self-start rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 font-display text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black"
              >
                Explore More
                <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover/cta:bg-black group-hover/cta:text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// System Architecture — tabs + large image
// ---------------------------------------------------------------------------

function SystemArchitecture() {
  const [active, setActive] = useState(ARCHITECTURE_TABS[0].id);
  const current = ARCHITECTURE_TABS.find((t) => t.id === active) ?? ARCHITECTURE_TABS[0];
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%" },
        defaults: { ease: "power3.out" },
      });
      tl.from("[data-sa-title]", { autoAlpha: 0, y: 24, duration: 0.6 })
        .from("[data-sa-sub]", { autoAlpha: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from("[data-sa-tabs]", { autoAlpha: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from("[data-sa-image]", { autoAlpha: 0, scale: 0.95, duration: 0.8 }, "-=0.2");

      // Pin + auto-advance tabs as user scrolls through the section
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${ARCHITECTURE_TABS.length * 50}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            ARCHITECTURE_TABS.length - 1,
            Math.floor(self.progress * ARCHITECTURE_TABS.length)
          );
          const nextId = ARCHITECTURE_TABS[idx].id;
          setActive((prev) => (prev === nextId ? prev : nextId));
        },
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen w-full items-center py-20 md:py-24">
      <Shell>
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16">
          {/* LEFT — eyebrow, title, description, numbered tab list */}
          <div className="flex flex-col">
            <h2 data-sa-title className="heading-lg">
              SYSTEM<br />ARCHITECTURE
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
              A unified hardware and software architecture engineered for maximum
              efficiency, seamless integration, and dependable vehicle performance.
            </p>

            {/* Vertical numbered tabs */}
            <div
              data-sa-tabs
              role="tablist"
              aria-label="System architecture views"
              className="mt-8 flex flex-col md:mt-10"
            >
              {ARCHITECTURE_TABS.map((tab, i) => {
                const isActive = tab.id === active;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(tab.id)}
                    className={`group relative border-b border-white/10 py-4 text-left transition-colors last:border-b-0 ${
                      isActive ? "text-white" : "text-white/55 hover:text-white/85"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-1/2 h-8 w-[2px] -translate-y-1/2 bg-white transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div className="flex items-center gap-5 pl-4">
                      <span className="font-display text-xs font-medium tracking-[0.22em] text-white/40">
                        {num}
                      </span>
                      <span className="font-display text-base font-semibold md:text-lg">
                        {tab.label}
                      </span>
                    </div>
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0">
                        <p className="mt-3 max-w-md pl-11 text-sm leading-relaxed text-white/60 md:text-[15px]">
                          {tab.body}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — crossfading image stage, no container */}
          <div
            data-sa-image
            className="relative aspect-[4/3] w-full"
          >
            {ARCHITECTURE_TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <img
                  key={tab.id}
                  src={tab.image}
                  alt={tab.label}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Applications band — big tile + 2 small tiles
// ---------------------------------------------------------------------------

function ApplicationsBand() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%" },
        defaults: { ease: "power3.out" },
      });
      tl.from("[data-apps-title]", { autoAlpha: 0, y: 24, duration: 0.6 })
        .from("[data-apps-sub]", { autoAlpha: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from("[data-apps-tile]", {
          autoAlpha: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.12,
        }, "-=0.2");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-24">
      <Shell>
        <div className="grid gap-6 md:grid-cols-2 md:grid-rows-2 md:gap-6">
          {/* Top-left — title + description (text block, no card) */}
          <div className="flex flex-col justify-start">
            <h2 data-apps-title className="heading-lg">
              APPLICATIONS ACROSS<br />ELECTRIC MOBILITY
            </h2>
            <p
              data-apps-sub
              className="mt-5 max-w-md text-sm leading-relaxed text-white/60 md:mt-6 md:text-base"
            >
              From rapid product development to commercial fleet operations, our
              platform adapts to diverse electric mobility applications.
            </p>
          </div>

          {/* Top-right — Rapid Product Launch */}
          <article
            data-apps-tile
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-card"
          >
            <div className="relative aspect-[16/9] w-full md:aspect-[2/1]">
              <img
                src={APPLICATIONS[0].image}
                alt={APPLICATIONS[0].title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <h3 className="absolute inset-x-6 bottom-6 font-display text-lg font-semibold text-white md:text-xl">
                {APPLICATIONS[0].title}
              </h3>
            </div>
          </article>

          {/* Bottom row — EV Startups + Fleet Operators */}
          {APPLICATIONS.slice(1).map((app) => (
            <article
              key={app.title}
              data-apps-tile
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-card"
            >
              <div className="relative aspect-[16/9] w-full md:aspect-[2/1]">
                <img
                  src={app.image}
                  alt={app.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <h3 className="absolute inset-x-6 bottom-6 font-display text-lg font-semibold text-white md:text-xl">
                  {app.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Technical Capabilities — divided list
// ---------------------------------------------------------------------------

function TechnicalCapabilities() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from("[data-tc-title], [data-tc-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });

      // Cards — each with its own layered reveal timeline
      const cards = gsap.utils.toArray<HTMLElement>("[data-tc-card]");
      cards.forEach((card, i) => {
        const icon = card.querySelector("[data-tc-icon]");
        const title = card.querySelector("[data-tc-card-title]");
        const body = card.querySelector("[data-tc-card-body]");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 88%" },
          defaults: { ease: "power3.out" },
          delay: (i % 3) * 0.08,
        });

        tl.from(card, {
          autoAlpha: 0,
          y: 40,
          scale: 0.96,
          duration: 0.7,
        }, 0);

        if (icon) {
          tl.from(icon, {
            autoAlpha: 0,
            scale: 0.4,
            rotate: -30,
            duration: 0.55,
            ease: "back.out(1.8)",
          }, 0.2);
        }
        if (title) {
          tl.from(title, { autoAlpha: 0, y: 12, duration: 0.5 }, 0.3);
        }
        if (body) {
          tl.from(body, { autoAlpha: 0, y: 12, duration: 0.5 }, 0.38);
        }
      });

      // Hover — icon tilts + scales
      cards.forEach((card) => {
        const icon = card.querySelector("[data-tc-icon]");
        if (!icon) return;
        card.addEventListener("mouseenter", () => {
          gsap.to(icon, { rotate: -6, scale: 1.08, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: "power2.out" });
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
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        {/* Header — title left, subtitle right */}
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <h2 data-tc-title className="heading-lg">
              TECHNICAL<br />CAPABILITIES
            </h2>
          </div>
          <p
            data-tc-sub
            className="max-w-md text-sm leading-relaxed text-white/60 md:ml-auto md:pb-2 md:text-base"
          >
            The engineering foundations that make our drivetrain platform
            production-ready — from thermal design to safety compliance.
          </p>
        </div>

        {/* Editorial grid — no cards, pure typography with thin top rules */}
        <div className="mt-12 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-3 md:gap-x-14 md:gap-y-16">
          {CAPABILITIES.map((c) => (
            <article
              key={c.title}
              data-tc-card
              className="group relative pt-6"
            >
              {/* Thin top rule — short white segment grows on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-white/15"
              />
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-12 origin-left bg-white transition-transform duration-500 ease-out group-hover:scale-x-[5]"
              />

              <span
                data-tc-icon
                className="inline-grid h-10 w-10 place-items-center text-white/80 transition-colors group-hover:text-white md:h-11 md:w-11"
              >
                <span className="h-5 w-5 md:h-6 md:w-6">{c.icon}</span>
              </span>

              <h3
                data-tc-card-title
                className="mt-5 font-display text-base font-semibold uppercase tracking-wide text-white md:text-lg"
              >
                {c.title}
              </h3>

              <p
                data-tc-card-body
                className="mt-3 max-w-sm text-sm leading-relaxed text-white/55 transition-colors group-hover:text-white/75 md:text-[15px]"
              >
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Build CTA
// ---------------------------------------------------------------------------

const BUILD_CTA_HEADING = "BUILT YOUR EV WITH AMEC";
const BUILD_CTA_WORDS = BUILD_CTA_HEADING.split(" ");

function BuildCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const pinTarget = pinRef.current;
    if (!section || !pinTarget) return;

    const ctx = gsap.context(() => {
      // Pin the big card in place while the user scrolls; word reveal is
      // scrubbed to the pin range so the heading lights up as they scroll.
      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Button bounces in once as the section enters view.
      gsap.from("[data-build-cta-button]", {
        autoAlpha: 0,
        y: 30,
        scale: 0.85,
        duration: 0.7,
        delay: 0.3,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: pinTarget, start: "top 70%" },
      });

      // Heading words — start dim, brighten word-by-word via scrub as the
      // user scrolls through the pinned range. stagger.amount keeps the full
      // reveal inside one unit of timeline regardless of word count, so a
      // single scroll gesture reveals the entire headline.
      const words = gsap.utils.toArray<HTMLElement>("[data-build-cta-word]");
      gsap.set(words, { autoAlpha: 0.14 });
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: pinTarget,
          start: "top top",
          end: "+=30%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      // Slow radial glow drift behind the heading — sine-wave floating.
      gsap.to("[data-build-cta-glow]", {
        xPercent: 8,
        yPercent: -5,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Radar pulses — each ring continuously expands from small to large
      // then fades out. Staggered delays give a rippling emission effect.
      const pulses = gsap.utils.toArray<HTMLElement>("[data-build-cta-pulse]");
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
            "0%":   { scale: 0.2, opacity: 0 },
            "20%":  { opacity: 0.5 },
            "100%": { scale: 1.4, opacity: 0 },
          },
        });
      });

      const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => window.clearTimeout(refresh);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-20 pt-10 md:pb-28">
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg"
      >
        {/* Radar pulses — continuously expanding rings that emit from center */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              data-build-cta-pulse
              className="absolute aspect-square rounded-full border-2 border-white/25"
              style={{ width: "60vmax" }}
            />
          ))}
        </div>

        {/* Slow-drifting radial glow — adds motion to the negative space */}
        <div
          data-build-cta-glow
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 55%)",
          }}
        />

        <div className="relative flex flex-col items-center gap-8 px-6 text-center md:px-14">
          <h2 className="heading-xl max-w-6xl">
            {BUILD_CTA_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span data-build-cta-word className="inline-block">{word}</span>
                {i < BUILD_CTA_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </h2>
          <div data-build-cta-button>
            <Link
              href="/contact"
              className="group inline-flex flex-row-reverse items-center gap-3 rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 font-display text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black"
            >
              Start Your EV Project
              <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
