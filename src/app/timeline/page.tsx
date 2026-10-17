"use client";

import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data — slides sequence: an "intro" opener followed by one "content" slide
// per year. The sidebar always reflects the slide's year, even when two slides
// share a year (e.g. the 2018 intro and the 2018 content slide).
// ---------------------------------------------------------------------------

type Slide =
  | { kind: "intro"; year: string }
  | { kind: "content"; year: string; title: string; body: string };

const SLIDES: Slide[] = [
  { kind: "intro", year: "2018" },
  {
    kind: "content",
    year: "2018",
    title: "The Journey Begins",
    body: "Our journey started with a simple ambition—to build better electric mobility solutions. While developing our first electric vehicle concepts, we immersed ourselves in automotive engineering, collaborated with garage experts, refined business models, and transformed ideas into practical innovations.",
  },
  {
    kind: "content",
    year: "2019",
    title: "Building Battery Expertise",
    body: "AMEC Mobility was established as a proprietorship focused on trading high-performance battery packs. As we gained deeper industry experience, we recognized critical gaps in battery technology and manufacturing, leading us to begin designing and producing our own battery packs.",
  },
  {
    kind: "content",
    year: "2020",
    title: "Scaling Manufacturing",
    body: "We established an advanced battery manufacturing facility with a production capacity of up to 800 battery packs per month, strengthening our ability to deliver reliable, high-performance energy solutions while maintaining consistent quality and operational efficiency.",
  },
  {
    kind: "content",
    year: "2021",
    title: "Expanding Our Vision",
    body: "We launched AMEC Service, creating one of India's organized EV service platforms with our first branch in Nagpur. At the same time, we accelerated the development of our next-generation electric motorcycle, expanded our engineering team, and established a larger operational workspace.",
  },
  {
    kind: "content",
    year: "2022",
    title: "Advancing R&D",
    body: "We invested heavily in research and development, expanded our product portfolio, and strengthened our engineering backbone to prepare for the next phase of growth across EV platforms, battery systems, and intelligent mobility solutions.",
  },
  {
    kind: "content",
    year: "2023",
    title: "Project Tricar",
    body: "Driven by innovation, we developed Project Tricar, a fully functional three-wheel electric vehicle featuring a double-wishbone suspension and a performance-inspired steering architecture. The project earned top honors at engineering competitions and became the foundation on which AMEC was built.",
  },
];

const SIDEBAR_YEARS = ["2018", "2019", "2020", "2021", "2022", "2023"];

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
    href: "/careers/SeniorSalesManager",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TimelinePage() {
  return (
    <>
      <TimelineSection />
      <ClosingCTA />
      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Timeline — pinned section that cycles through the slides as the user scrolls
// ---------------------------------------------------------------------------

function TimelineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Opt out of the browser restoring scroll on reload / back-nav — otherwise
    // the user lands mid-pin on a later slide instead of the 2018 intro.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    setActive(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * SLIDES.length}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            SLIDES.length - 1,
            Math.max(0, Math.floor(self.progress * SLIDES.length))
          );
          setActive(idx);
        },
      });

      // Subtle grid pulse
      gsap.to("[data-timeline-grid]", {
        opacity: 0.3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Replay the per-slide reveal every time active changes.
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-slide-year]",
        { autoAlpha: 0, y: 30, rotateX: -15, scale: 0.94 },
        { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.7 }
      )
        .fromTo(
          "[data-slide-title]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          "[data-slide-body]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          "[data-slide-image]",
          { autoAlpha: 0, scale: 0.94 },
          { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        )
        .fromTo(
          "[data-slide-marker]",
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.5"
        );
    }, section);

    return () => ctx.revert();
  }, [active]);

  const slide = SLIDES[active];
  const activeYear = slide.year;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505]"
    >
      {/* Subtle grid background */}
      <div
        data-timeline-grid
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Soft center glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Mobile — horizontal year nav strip at the top. Desktop uses the
          sidebar below. */}
      <div className="absolute inset-x-0 top-24 z-10 flex items-center justify-center gap-5 overflow-x-auto px-6 md:hidden">
        {SIDEBAR_YEARS.map((y) => {
          const isActive = y === activeYear;
          return (
            <button
              key={y}
              type="button"
              onClick={() => {
                const idx = SLIDES.findIndex((s) => s.year === y);
                if (idx !== -1) setActive(idx);
              }}
              className={`shrink-0 font-display text-sm font-semibold tabular-nums transition-colors ${
                isActive ? "text-white" : "text-white/40"
              }`}
            >
              {y}
            </button>
          );
        })}
      </div>

      {/* Layout — sidebar on the left, slide content fills the rest */}
      <div className="relative mx-auto flex h-full w-full max-w-[1600px] px-6 md:px-14">
        {/* Sidebar — year navigation */}
        <aside className="hidden h-full w-32 flex-col justify-center gap-7 md:flex md:w-40">
          {SIDEBAR_YEARS.map((y) => {
            const isActive = y === activeYear;
            return (
              <button
                key={y}
                type="button"
                onClick={() => {
                  // Jump to the first slide that matches this year
                  const idx = SLIDES.findIndex((s) => s.year === y);
                  if (idx !== -1) setActive(idx);
                }}
                className={`text-left font-display text-base font-semibold tabular-nums transition-colors duration-300 ${
                  isActive ? "text-white" : "text-[#FFFFFF8C] hover:text-white/70"
                }`}
              >
                {y}
              </button>
            );
          })}
        </aside>

        {/* Slide content — intro stays centered; content slides anchor the
            text block to the top of the sidebar's year range so title + body
            align vertically with the sidebar list. */}
        <div
          className={`flex flex-1 ${
            slide.kind === "intro"
              ? "items-center"
              : "items-center md:items-start md:pt-[32vh] tablet:items-center tablet:pt-0"
          }`}
        >
          {slide.kind === "intro" ? (
            <IntroSlide year={slide.year} />
          ) : (
            <ContentSlide
              year={slide.year}
              title={slide.title}
              body={slide.body}
            />
          )}
        </div>
      </div>

      {/* Pagination dots — one per slide */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-4">
        {SLIDES.map((_, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Jump to slide ${i + 1}`}
              className="group relative grid h-6 w-6 place-items-center"
            >
              <span
                className={`block h-1.5 w-1.5 rounded-full transition-all ${
                  isActive ? "bg-white" : "bg-white/30 group-hover:bg-white/60"
                }`}
              />
              {isActive ? (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-sm border border-white/40"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Intro slide — huge year number + two diagonally-offset overlapping cards,
// with small square markers at the top-left and bottom-right of the year.
// ---------------------------------------------------------------------------

function IntroSlide({ year }: { year: string }) {
  return (
    <div className="relative w-full">
      <div className="relative inline-block">
        {/* Dim watermark year card sitting behind the main year */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-6 top-6 font-display text-[120px] font-bold leading-none tabular-nums text-white/[0.04] md:left-10 md:top-10 md:text-[200px]"
        >
          {year}
        </span>

        <h2
          key={`intro-year-${year}`}
          data-slide-year
          className="relative font-display text-[120px] font-bold leading-none tabular-nums text-white md:text-[200px]"
        >
          {year}
        </h2>

        {/* Corner markers — outlined square with a small filled square inside */}
        <span
          data-slide-marker
          aria-hidden
          className="absolute -left-2 -top-2 grid h-3 w-3 place-items-center border border-white md:-left-3 md:-top-3 md:h-4 md:w-4"
        >
          <span className="block h-1 w-1 bg-white md:h-1.5 md:w-1.5" />
        </span>
        <span
          data-slide-marker
          aria-hidden
          className="absolute -bottom-2 -right-2 grid h-3 w-3 place-items-center border border-white md:-bottom-3 md:-right-3 md:h-4 md:w-4"
        >
          <span className="block h-1 w-1 bg-white md:h-1.5 md:w-1.5" />
        </span>
      </div>

      {/* Two overlapping cards sitting to the right of the year on laptop.
          At tablet the content area (~500px) can't fit year + 600px overlay
          side-by-side, so the overlay becomes a static block below the year
          with two smaller cards shown side-by-side. */}
      <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[480px] w-[600px] -translate-y-1/2 md:block tablet:static tablet:mt-10 tablet:flex tablet:h-auto tablet:w-full tablet:translate-y-0 tablet:items-center tablet:gap-5 xl:h-[380px] xl:w-[480px] 2xl:h-[480px] 2xl:w-[600px]">
        <div
          data-slide-image
          className="absolute left-0 top-0 h-[300px] w-[300px] bg-[#8b8b8b] tablet:static tablet:h-[180px] tablet:w-[180px] xl:h-[240px] xl:w-[240px] 2xl:h-[300px] 2xl:w-[300px]"
        />
        <div
          data-slide-image
          className="absolute bottom-0 right-0 h-[300px] w-[300px] bg-[#d9d9d9] tablet:static tablet:h-[180px] tablet:w-[180px] xl:h-[240px] xl:w-[240px] 2xl:h-[300px] 2xl:w-[300px]"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Content slide — year label + title + body on the left, single image card on
// the right. Used for every year after the intro.
// ---------------------------------------------------------------------------

function ContentSlide({
  year,
  title,
  body,
}: {
  year: string;
  title: string;
  body: string;
}) {
  return (
    <div className="grid w-full gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16 tablet:grid-cols-1 tablet:gap-10">
      {/* LEFT — year + title + body */}
      <div className="max-w-xl">
        <p
          key={`content-year-${year}-${title}`}
          data-slide-year
          className="font-display text-5xl font-bold leading-none tabular-nums text-white md:text-[64px]"
        >
          {year}
        </p>
        <h2
          key={`content-title-${title}`}
          data-slide-title
          className="mt-7 font-display text-2xl font-semibold leading-tight text-white md:mt-8 md:text-[28px]"
        >
          {title}
        </h2>
        <p
          key={`content-body-${title}`}
          data-slide-body
          className="mt-5 text-sm leading-relaxed text-[#9CA3AF] md:mt-6 md:text-[15px] md:leading-[1.7]"
        >
          {body}
        </p>
      </div>

      {/* RIGHT — single image placeholder.
          On tablet the grid collapses to 1-col (my earlier `tablet:grid-cols-1`),
          so switch the inner image from absolute right-aligned to a static,
          full-width placeholder that flows naturally below the text. */}
      <div className="relative hidden h-[380px] w-full md:block tablet:h-[280px]">
        <div
          key={`content-img-${title}`}
          data-slide-image
          className="absolute right-0 top-1/2 h-[380px] w-[400px] -translate-y-1/2 bg-[#8b8b8b] tablet:static tablet:h-full tablet:w-full tablet:translate-y-0"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Closing CTA
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
        y: 24,
        duration: 0.7,
        stagger: 0.12,
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
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-20 pt-10 md:px-14 md:pb-28">
        <div data-close-grid className="grid gap-5 md:grid-cols-2 md:gap-6">
          {CLOSING_CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              data-close-card
              className="group relative overflow-hidden rounded-2xl bg-bg-card p-10 md:p-12"
            >
              <div className="flex h-full flex-col justify-between gap-10">
                <h3 className="font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
                  {c.title}
                  <br />
                  {c.titleAccent}
                </h3>
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
      </div>
    </section>
  );
}
