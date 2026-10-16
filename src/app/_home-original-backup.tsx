// @ts-nocheck
// -----------------------------------------------------------------------------
// BACKUP — original home page content (preserved per user request).
// This file is NOT routed: Next.js only serves `page.tsx`. All mobile/tablet
// optimizations are preserved verbatim. To restore as the home page, copy this
// file's contents back into `src/app/page.tsx` (remove this header first).
// -----------------------------------------------------------------------------
"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { HeroCTA } from "@/components/HeroCTA";
import { ArrowRight } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const INTRO_BODY =
  "At AMEC, we engineer next-generation automotive and energy technologies. From advanced battery packs to integrated energy storage, every solution is built for performance and reliability.";
const INTRO_WORDS = INTRO_BODY.split(" ");

const FOUNDERS = [
  {
    name: "Aaquib Kazi",
    role: "Co-Founder and CEO",
    photo: "/Home/AAquib.png",
  },
  {
    name: "Meraj Alam",
    role: "Co-Founder and CTO",
    photo: "/Home/Meeraj.png",
  },
];

const TIMELINE_STEPS = [
  {
    year: "2018",
    body:
      "The spark. Project Teresa — our student-built electric race platform — won national engineering honours and set the trajectory for AMEC.",
  },
  {
    year: "2019",
    body:
      "Founded in 2019, AMEC Mobility set out to redefine the electric era with high-performance batteries, electric scooters, and hypercars.",
  },
  {
    year: "2020",
    body:
      "Scale begins. First partner programs, pilot pack builds, and the shift from a startup to a multi-vertical engineering group.",
  },
];

const ECOSYSTEM = [
  {
    tag: "MOBILITY",
    title: "Build the Future of Mobility",
    chips: ["EV", "Performance", "Innovation", "Smart Mobility"],
    image: "/about/Mobility.png",
    href: "/mobility",
  },
  {
    tag: "TECHNOLOGY",
    title: "Engineering Without Limits",
    chips: ["EV Tech", "Energy", "OEM", "Engineering"],
    image: "/about/Technology.png",
    href: "/technology",
  },
  {
    tag: "CODEX",
    title: "Built for Innovation",
    chips: ["Installation", "Repairs", "Maintenance", "On-Demand"],
    image: "/about/Dhoond.png",
    href: "/source",
  },
];

const WHY_POINTS = [
  {
    id: "01",
    title: "Engineering-Led Product Development",
    body:
      "We engineer products from the ground up — starting with system architecture, performance goals, and real-world constraints. Through rigorous design, testing, and validation, we build reliable, safe, and scalable technologies.",
    image: "/images/whyamec1.png",
  },
  {
    id: "02",
    title: "Deep Technical Expertise Across Domains",
    body:
      "Our teams bring hands-on expertise across mechanical, electrical, embedded, and energy systems — enabling us to own full-stack product development without external hand-offs.",
    image: "/images/whyamec2.png",
  },
  {
    id: "03",
    title: "Collaborative, Partnership-First Approach",
    body:
      "We operate as an extended engineering arm for our partners, aligning on roadmap, risk, and timing from day one so programs move at startup pace with OEM-grade rigor.",
    image: "/images/whyamec3.png",
  },
];

const CULTURE_CARDS = [
  {
    title: "Engineering-Driven Culture",
    body:
      "Build meaningful technology through innovation, ownership, and hands-on engineering.",
    cta: "Explore Open Roles",
    image: "/Home/left-image.png",
    href: "/careers",
  },
  {
    title: "Grow With AMEC",
    body:
      "Take ownership from day one, solve real engineering challenges, accelerate your career.",
    cta: "Explore Open Roles",
    image: "/Home/right-image.png",
    href: "/careers",
  },
];

const CLOSING_CARDS = [
  {
    title: "Partner",
    titleAccent: "with AMEC",
    cta: "Become a Partner",
    href: "/contact",
  },
  {
    title: "Build the",
    titleAccent: "future with AMEC",
    cta: "Explore Careers",
    href: "/careers",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Founders />
      <TimelineBlock />
      <Ecosystem />
      <WhyAmecGroup />
      <BuildTheFuture />
      <ClosingCTA />
      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 tablet:px-8 md:px-14 ${className}`}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero — "Unleashing the Power of the Future"
// ---------------------------------------------------------------------------

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-bg]", {
        autoAlpha: 0,
        scale: 1.08,
        duration: 1.4,
      })
        .from(
          "[data-hero-title] span",
          { autoAlpha: 0, y: 36, stagger: 0.08, duration: 0.9 },
          "-=0.9"
        )
        .from(
          "[data-hero-sub]",
          { autoAlpha: 0, y: 20, duration: 0.6 },
          "-=0.5"
        )
        .from(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 12, duration: 0.5 },
          "-=0.4"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  const lines = ["Unleashing", "the Power of the Future"];

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-screen min-h-[560px] w-full overflow-hidden bg-[#0a0a0a] md:min-h-[640px]"
    >
      <div data-hero-bg aria-hidden className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/Home.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Readability scrim */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      <div className="relative flex h-full w-full items-end px-6 pb-16 tablet:px-8 tablet:pb-16 md:px-14 md:pb-20">
        <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-3xl">
            <h1
              data-hero-title
              className="font-display text-[32px] font-semibold uppercase leading-[1.08] text-white md:text-[56px]"
            >
              {lines.map((line, i) => (
                <Fragment key={i}>
                  <span className="inline-block">{line}</span>
                  {i < lines.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </h1>
            <p
              data-hero-sub
              className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 md:text-base"
            >
              Through innovation, technology, and sustainable solutions.
            </p>
          </div>
          <div data-hero-cta className="shrink-0">
            <HeroCTA
              href="/contact"
              label="Partner with us"
              variant="primary"
              arrow={false}
            />
          </div>
        </div>
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
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-intro-word]", { autoAlpha: 0.15 });
      gsap.to("[data-intro-word]", {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });

      // Progress bar fills in lockstep with the word reveal.
      gsap.fromTo(
        "[data-intro-fill]",
        { width: "0%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 tablet:py-20 md:py-28">
      <Shell>
        <p className="mx-auto max-w-3xl text-center font-display text-lg leading-[1.6] text-white md:text-[22px]">
          {INTRO_WORDS.map((word, i) => (
            <Fragment key={i}>
              <span data-intro-word className="inline-block">{word}</span>
              {i < INTRO_WORDS.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>
        <div className="mt-10 flex justify-center">
          <div className="relative h-[3px] w-[220px] overflow-hidden rounded-full bg-white/20">
            <span
              data-intro-fill
              aria-hidden
              className="absolute inset-y-0 left-0 w-0 rounded-full bg-white"
            />
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Founders
// ---------------------------------------------------------------------------

function Founders() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-founders-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
      gsap.from("[data-founders-sub]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
      gsap.from("[data-founder-card]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
      gsap.from("[data-founder-quote]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.9,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 tablet:pt-28 tablet:pb-10 md:py-28">
      <Shell>
        <div className="text-center">
          <h2
            data-founders-heading
            className="heading-lg"
          >
            MEET OUR FOUNDERS
          </h2>
          <p
            data-founders-sub
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/60 md:text-[15px]"
          >
            Our success is powered by a team that embraces challenges and pushes
            technological boundaries to shape the future of mobility.
          </p>
        </div>

        {/* Mobile + small-tablet (<1024px) — stacked founder cards + quote.
            iPad Pro 11/13 (≥1024px) get the side-by-side overlay below. */}
        <div className="mt-10 flex flex-col gap-6 lg:hidden">
          {FOUNDERS.map((f) => (
            <div
              key={f.name}
              data-founder-card
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <img
                src={f.photo}
                alt={f.name}
                className="h-[420px] w-full object-cover object-top grayscale"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="flex items-start gap-2 border-t border-white/10 bg-black/80 px-5 py-4">
                <span aria-hidden className="mt-1 text-white/50">*</span>
                <div>
                  <p className="font-display text-base font-semibold text-white">
                    {f.name}
                  </p>
                  <p className="mt-1 text-xs text-white/60">{f.role}</p>
                </div>
              </div>
            </div>
          ))}
          <blockquote
            data-founder-quote
            className="mt-2 text-center font-sans text-lg font-normal italic leading-snug text-[#FFFFFF8C]"
          >
            <span>&ldquo;</span>True leadership begins where comfort ends
            <span>&rdquo;</span>
          </blockquote>
        </div>

        <div
          data-founder-card
          className="relative mx-auto mt-14 hidden w-full max-w-4xl overflow-hidden md:mt-20 lg:block"
        >
          {/* Side-by-side founder images with a wide gap for the quote */}
          <div className="grid grid-cols-2 gap-12 md:gap-[340px] lg:gap-32 xl:gap-[340px]">
            <img
              src={FOUNDERS[0].photo}
              alt={FOUNDERS[0].name}
              className="h-full w-full object-cover grayscale"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <img
              src={FOUNDERS[1].photo}
              alt={FOUNDERS[1].name}
              className="h-full w-full object-cover grayscale"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Center quote overlaid in the middle */}
          <blockquote
            data-founder-quote
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center"
          >
            <span className="max-w-xs font-sans text-xl font-normal italic leading-tight text-[#FFFFFF8C] md:text-2xl">
              <span>&ldquo;</span>True leadership begins
              <br />
              where comfort ends<span>&rdquo;</span>
            </span>
          </blockquote>

          {/* Common glass card spanning the full width at the bottom */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-black/80 px-6 py-5 backdrop-blur-md md:px-10 md:py-6">
            <div className="flex items-start gap-2">
              <span aria-hidden className="mt-1 text-white/50">
                *
              </span>
              <div className="text-left">
                <p className="font-display text-base font-semibold text-white md:text-lg">
                  {FOUNDERS[0].name}
                </p>
                <p className="mt-1 text-xs text-white/60 md:text-sm">
                  {FOUNDERS[0].role}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span aria-hidden className="mt-1 text-white/50">
                *
              </span>
              <div className="text-left">
                <p className="font-display text-base font-semibold text-white md:text-lg">
                  {FOUNDERS[1].name}
                </p>
                <p className="mt-1 text-xs text-white/60 md:text-sm">
                  {FOUNDERS[1].role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Timeline — 2018 Â· 2019 Â· 2020
// ---------------------------------------------------------------------------

function TimelineBlock() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const years = gsap.utils.toArray<HTMLElement>("[data-year]");
      const bodies = gsap.utils.toArray<HTMLElement>("[data-timeline-body]");
      const n = years.length;

      // Initial state — all years dim+small, then promote index 0 (2018) to
      // active. All bodies hidden except the first one so the section opens
      // on 2018 with its matching description visible.
      gsap.set(years, { scale: 0.65, autoAlpha: 0.15 });
      gsap.set(years[0], { scale: 1, autoAlpha: 1 });
      gsap.set(bodies, { autoAlpha: 0 });
      gsap.set(bodies[0], { autoAlpha: 1 });

      // Pin + step-through timeline: one scroll gesture per year transition,
      // snap settles on each active year.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * (n - 1)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          snap: {
            snapTo: 1 / (n - 1),
            duration: 0.35,
            delay: 0.05,
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
        },
      });

      // Each step cross-fades the previous year + body OUT while the next
      // year + body fade IN, all at the same timeline position.
      for (let i = 1; i < n; i++) {
        tl.to(
          years[i - 1],
          { scale: 0.65, autoAlpha: 0.15, duration: 1, ease: "power2.inOut" },
          i - 1
        )
          .to(
            years[i],
            { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            i - 1
          )
          .to(
            bodies[i - 1],
            { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
            i - 1
          )
          .to(
            bodies[i],
            { autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            i - 1
          );
      }

      gsap.from("[data-timeline-cta]", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      <Shell>
        {/* All years share the same base size — size + brightness driven by
            scrub timeline (scale + autoAlpha). Active year scales to 1 and
            goes fully white; others shrink to 0.65 and fade to 15% alpha. */}
        <div className="flex items-center justify-center gap-3 min-[400px]:gap-5 sm:gap-8 tablet:gap-8 md:gap-12">
          {TIMELINE_STEPS.map((s) => (
            <span
              key={s.year}
              data-year
              className="font-display text-[42px] font-semibold leading-none tabular-nums text-white min-[400px]:text-[56px] sm:text-[72px] tablet:text-[88px] md:text-[120px]"
            >
              {s.year}
            </span>
          ))}
        </div>

        {/* Subtle divider under the year row */}
        <div
          aria-hidden
          className="mx-auto mt-6 h-px w-full max-w-4xl bg-white/40 md:mt-8"
        />

        {/* Three descriptions overlaid in the same slot — the scrub timeline
            cross-fades them in sync with the active year. */}
        <div className="relative mx-auto mt-8 h-[96px] max-w-2xl md:mt-10 md:h-[80px]">
          {TIMELINE_STEPS.map((s) => (
            <p
              key={s.year}
              data-timeline-body
              className="absolute inset-0 text-center text-sm leading-relaxed text-white/70 md:text-[15px]"
            >
              {s.body}
            </p>
          ))}
        </div>

        <div data-timeline-cta className="mt-8 flex justify-center">
          <Link
            href="/timeline"
            className="group inline-flex items-center gap-3 rounded border border-white/40 bg-transparent px-5 py-2 font-display text-sm font-medium text-white transition-all duration-300 ease-out hover:border-white hover:bg-white hover:text-black md:text-base"
          >
            View Timeline
            {/* <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white md:h-8 md:w-8">
              <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </span> */}
          </Link>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Our Ecosystem — three horizontal cards
// ---------------------------------------------------------------------------

function Ecosystem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Heading reveal before the pin starts
      gsap.from("[data-eco-head]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-eco-card]");
      const n = cards.length;

      // Build a timeline that *dwells* on each card before advancing. We add a
      // long initial hold so the first card stays fully readable the moment
      // the section pins, then alternate "transition â†’ dwell" per card. Scrub
      // ties the timeline to vertical scroll, so cards only move when the
      // user actually scrolls through a dwell window.
      const DWELL = 0.9; // scroll fraction spent holding on a card
      const MOVE = 1; // scroll fraction spent transitioning between cards

      const horizontal = gsap.timeline();
      horizontal.to({}, { duration: DWELL }); // initial hold on card 0
      for (let i = 1; i < n; i++) {
        horizontal.to(track, {
          x: () => {
            // For the LAST card, translate by the full rail overflow so its
            // right edge sits at the viewport's right padding (no empty gap
            // on the right). Intermediate cards align to card 0's position.
            if (i === n - 1) {
              const overflow = track.scrollWidth - section.clientWidth;
              return overflow > 0 ? -overflow : 0;
            }
            return -(cards[i].offsetLeft - cards[0].offsetLeft);
          },
          ease: "none",
          duration: MOVE,
        });
        horizontal.to({}, { duration: DWELL }); // dwell on card i
      }

      const totalUnits = DWELL + (MOVE + DWELL) * (n - 1);
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * totalUnits}`,
        pin: true,
        animation: horizontal,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      // Per-card fade/scale brighten as each enters the viewport. The first
      // card stays visible from the start; the rest start dim + small and
      // settle to full visibility as they slide in from the right.
      cards.forEach((card, i) => {
        if (i === 0) return;
        gsap.fromTo(
          card,
          { autoAlpha: 0.35, scale: 0.94 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontal,
              start: "left right",
              end: "left center",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col overflow-hidden tablet:justify-start tablet:pt-56"
    >
      <Shell className="pt-14 pb-6 tablet:pt-16 tablet:pb-12 md:pt-24 md:pb-16">
        <div data-eco-head className="text-center">
          <h2 className="heading-lg">OUR ECOSYSTEM</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/55 md:text-[18px] md:leading-[1.55]">
            Engineering the future through mobility, technology,
            <br className="hidden md:block" />
            and intelligent services.
          </p>
        </div>
      </Shell>

      {/* Horizontal rail — pinned & scrubbed by ScrollTrigger. The rail
          fills the remaining viewport height so each card fits on-screen with
          its chips, image, and Explore button all visible at once. */}
      <div className="flex flex-1 items-center pb-6 md:pb-16 tablet:flex-none tablet:pb-0 tablet:pt-4">
        <div
          ref={trackRef}
          className="flex gap-4 pl-6 pr-6 md:gap-7 md:pl-14 md:pr-14"
          style={{ willChange: "transform" }}
        >
          {ECOSYSTEM.map((e) => (
            <article
              key={e.tag}
              data-eco-card
              className="group relative grid h-[min(500px,calc(100vh-200px))] w-[min(88vw,1100px)] shrink-0 overflow-hidden rounded-[12px] border border-[#333333] bg-transparent md:h-[min(520px,calc(100vh-320px))] md:grid-cols-[1fr_1.1fr]"
            >
              {/* LEFT — text column */}
              <div className="flex flex-col justify-between gap-5 p-5 md:gap-6 md:p-10">
                <div>
                  <p className="font-display text-3xl font-semibold uppercase tracking-wide text-white md:text-[40px]">
                    {e.tag}
                  </p>
                  <p className="mt-3 font-sans text-base leading-snug text-white/60 md:text-[18px]">
                    {e.title}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {e.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-[4px] bg-[#1D1D1D] px-3 py-1.5 text-[11px] font-medium text-white/85 md:text-xs"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={e.href}
                  className="group/btn relative inline-flex items-center self-start rounded-[4px] border border-white/20 transition-all duration-300 ease-out hover:border-white hover:bg-white"
                >
                  <span
                    aria-hidden
                    className="absolute left-1.5 top-1/2 grid h-7 w-7 -translate-y-1/2 shrink-0 place-items-center overflow-hidden rounded-[4px] bg-white text-black transition-[left,background-color,color] duration-500 ease-out group-hover/btn:left-[calc(100%-2.125rem)] group-hover/btn:bg-black group-hover/btn:text-white md:h-8 md:w-8 md:group-hover/btn:left-[calc(100%-2.375rem)]"
                  >
                    <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </span>
                  <span className="block py-2.5 pl-11 pr-5 font-display text-sm font-medium text-white transition-all duration-500 ease-out group-hover/btn:pl-5 group-hover/btn:pr-11 group-hover/btn:text-black md:pl-12 md:text-base md:group-hover/btn:pr-12">
                    Explore
                  </span>
                </Link>
              </div>

              {/* RIGHT — image column */}
              <div className="relative min-h-[180px] overflow-hidden md:min-h-full">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Why AMEC Group? — numbered points with image
// ---------------------------------------------------------------------------

function WhyAmecGroup() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-why-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-why-sub]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    const nodes = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 tablet:py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-6 tablet:px-8 md:px-10 lg:px-14">
        {/* Header */}
        <div className="text-center">
          <h2 data-why-heading className="heading-lg">
            WHY AMEC GROUP?
          </h2>
          <p
            data-why-sub
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base"
          >
            Engineering-first innovation, deep technical expertise, and
            collaborative product development that transform ideas into
            reliable, market-ready solutions.
          </p>
        </div>

        {/* Desktop (xl+): pinned showcase. Hidden at <1280px since the
            scroll-driven image swap doesn't read well when the whole section
            fits in one viewport — tablet uses the stacked card layout below. */}
        <div className="mt-20 hidden xl:grid xl:grid-cols-[1.05fr_1fr] xl:gap-16 2xl:gap-24">
          {/* Left — sticky stage */}
          <div className="relative">
            <div className="sticky top-24 h-[72vh] max-h-[620px] overflow-hidden rounded-card border border-white/[0.08] bg-bg-card">
              {WHY_POINTS.map((p, i) => (
                <div
                  key={p.id}
                  aria-hidden
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-[900ms] ease-out"
                  style={{
                    backgroundImage: `url('${p.image}')`,
                    opacity: active === i ? 1 : 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — scrolling panels */}
          <div className="flex flex-col">
            {WHY_POINTS.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                data-index={i}
                className="flex min-h-[72vh] flex-col justify-center"
              >
                <div
                  className={`transition-all duration-500 ease-out ${
                    active === i
                      ? "opacity-100 blur-0"
                      : "opacity-35 blur-[1px]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                      {p.id}
                    </span>
                    <span
                      className={`h-[1px] origin-left bg-white transition-all duration-500 ${
                        active === i ? "w-16 opacity-100" : "w-8 opacity-30"
                      }`}
                    />
                  </div>
                  <h3 className="mt-6 heading-md text-white">{p.title}</h3>
                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile + tablet: stacked cards (image + text per card). The pinned
            scroll showcase only kicks in at xl: (≥1280px). */}
        <div className="mt-14 flex flex-col gap-8 xl:hidden">
          {WHY_POINTS.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-card border border-white/[0.08] bg-bg-card"
            >
              <div
                className="aspect-[16/10] w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${p.image}')` }}
              />
              <div className="p-6">
                <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                  {p.id}
                </span>
                <h3 className="mt-3 heading-md text-white">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Build the Future with AMEC — culture + careers cards
// ---------------------------------------------------------------------------

function BuildTheFuture() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-build-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-build-sub]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-build-card]", {
        autoAlpha: 0,
        y: 48,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-build-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 tablet:py-20 md:py-28">
      <Shell>
        <div className="text-center">
          <h2
            data-build-heading
            className="font-display text-2xl font-semibold uppercase tracking-wider text-white md:text-[32px] lg:text-[40px]"
          >
            BUILD THE FUTURE WITH AMEC
          </h2>
          <p
            data-build-sub
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-[16px]"
          >
            Join a team solving real engineering challenges and building
            impactful technologies.
          </p>
        </div>

        <div
          data-build-grid
          className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6"
        >
          {CULTURE_CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              data-build-card
              className="group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[8px] border border-white/[0.06] tablet:min-h-[440px] md:min-h-[520px]"
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%), url('${c.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Glassmorphism container for the text at the bottom of the card
                  — full-width, no border, anchored to the card's bottom edge */}
              <div
                className="relative flex flex-col gap-4 bg-white/[0.08] p-6 backdrop-blur-xl md:p-7"
                style={{
                  WebkitBackdropFilter: "blur(16px) saturate(140%)",
                  backdropFilter: "blur(16px) saturate(140%)",
                }}
              >
                <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                  {c.title}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-white/80 md:text-[15px]">
                  {c.body}
                </p>
                <span className="inline-flex items-center gap-3 self-start rounded border border-white/20 py-1.5 pl-1.5 pr-5 font-display text-sm font-medium text-white transition-all duration-300 ease-out group-hover:flex-row-reverse group-hover:border-white group-hover:bg-white group-hover:pl-5 group-hover:pr-1.5 group-hover:text-black md:text-[15px]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white md:h-8 md:w-8">
                    <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </span>
                  {c.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing CTA — Ready to Build the Future Together?
// ---------------------------------------------------------------------------

const CTA_HEADING_WORDS = "Ready to Build the Future Together?".split(" ");

function ClosingCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin the headband for the full gesture — matches the Technology page
      ScrollTrigger.create({
        trigger: "[data-cta-headband]",
        start: "top top",
        end: "+=100%",
        pin: "[data-cta-headband]",
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Word-by-word scrub reveal within a tight +=15% range
      const headWords = gsap.utils.toArray<HTMLElement>("[data-cta-word]");
      gsap.set(headWords, { autoAlpha: 0.14 });
      gsap.to(headWords, {
        autoAlpha: 1,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: "[data-cta-headband]",
          start: "top top",
          end: "+=15%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      // CTA button entrance — back.out pop
      gsap.from("[data-cta-btn]", {
        autoAlpha: 0,
        y: 30,
        scale: 0.9,
        duration: 0.7,
        delay: 0.2,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: "[data-cta-headband]", start: "top 70%" },
      });

      // Ambient drifting radial glow
      gsap.to("[data-cta-glow]", {
        xPercent: 8,
        yPercent: -5,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Pulse rings — continuous outward expansion, staggered start times
      const pulses = gsap.utils.toArray<HTMLElement>("[data-cta-pulse]");
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

      // Two action cards fade/slide in below the pinned band
      gsap.from("[data-close-card]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-close-grid]", start: "top 85%" },
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      {/* Pinned full-viewport headband with pulse rings + drifting glow */}
      <div
        data-cta-headband
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A]"
      >
        {/* Pulse rings — animated, continuously expanding outward */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              data-cta-pulse
              className="absolute aspect-square rounded-full border-2 border-white/20"
              style={{ width: "60vmax" }}
            />
          ))}
        </div>

        {/* Ambient drifting radial glow */}
        <div
          data-cta-glow
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 55%)",
          }}
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center md:px-14">
          <h2 className="heading-xl max-w-5xl">
            {CTA_HEADING_WORDS.map((w, i) => (
              <Fragment key={i}>
                <span data-cta-word className="inline-block">
                  {w}
                </span>
                {i < CTA_HEADING_WORDS.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>
          <div data-cta-btn>
            <Link
              href="/contact"
              className="group inline-flex flex-row-reverse items-center gap-3 rounded border border-white/20 bg-transparent py-1.5 pl-1.5 pr-5 font-display text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-5 hover:pr-1.5 hover:text-black md:text-base"
            >
              Get in Touch
              <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white md:h-8 md:w-8">
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Two action cards below the pinned band */}
      <Shell className="pb-20 pt-10 tablet:pb-20 md:pb-28">
        <div
          data-close-grid
          className="grid gap-5 md:grid-cols-2 md:gap-6"
        >
          {CLOSING_CARDS.map((c) => (
            <article
              key={c.title}
              data-close-card
              className="group relative overflow-hidden rounded-2xl bg-bg-card p-10 md:p-12"
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                  {c.title}
                  <br />
                  {c.titleAccent}
                </h3>
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-3 self-start rounded border border-white/20 py-1.5 pl-1.5 pr-5 font-display text-sm font-medium text-white transition-all duration-300 ease-out group-hover:flex-row-reverse group-hover:border-white group-hover:bg-white group-hover:pl-5 group-hover:pr-1.5 group-hover:text-black md:text-[15px]"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white md:h-8 md:w-8">
                    <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </span>
                  {c.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Shared pill CTA — matches the standard section-CTA used elsewhere on the site
// ---------------------------------------------------------------------------

function PillCTA({
  href,
  label,
  small = false,
  asSpan = false,
}: {
  href: string;
  label: string;
  small?: boolean;
  asSpan?: boolean;
}) {
  // Arrow is absolutely positioned so it can smoothly slide from the left
  // edge to the right edge on hover (padding swaps mirror the move so the
  // label stays horizontally stable).
  const base =
    "group/cta relative inline-flex items-center rounded border border-white/20 bg-transparent transition-all duration-300 ease-out hover:border-white hover:bg-white";
  const labelClasses = `block py-1.5 pl-11 pr-5 font-display font-medium text-white transition-all duration-500 ease-out group-hover/cta:pl-5 group-hover/cta:text-black ${
    small
      ? "text-sm group-hover/cta:pr-11"
      : "text-sm md:text-base md:pl-12 group-hover/cta:pr-11 md:group-hover/cta:pr-12"
  }`;
  const arrowClasses = `absolute left-1.5 top-1/2 grid -translate-y-1/2 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-[left,background-color,color] duration-500 ease-out group-hover/cta:left-[calc(100%-2.125rem)] group-hover/cta:bg-black group-hover/cta:text-white ${
    small
      ? "h-7 w-7"
      : "h-7 w-7 md:h-8 md:w-8 md:group-hover/cta:left-[calc(100%-2.375rem)]"
  }`;

  const inner = (
    <>
      <span aria-hidden className={arrowClasses}>
        <ArrowRight className={small ? "h-3.5 w-3.5" : "h-3.5 w-3.5 md:h-4 md:w-4"} />
      </span>
      <span className={labelClasses}>{label}</span>
    </>
  );

  if (asSpan) {
    return <span className={base}>{inner}</span>;
  }
  return (
    <Link href={href} className={base}>
      {inner}
    </Link>
  );
}
