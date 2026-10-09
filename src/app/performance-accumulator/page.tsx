"use client";

import Link from "next/link";
import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const OVERVIEW_TITLE = "A revolution in EV power density, built for demanding performance envelopes.";
const OVERVIEW_WORDS = OVERVIEW_TITLE.split(" ");

const OVERVIEW_BODY =
  "Our Performance Accumulator is built for elite electric drivetrains. By refining material composition, optimized cooling channels, and customized BMS integration, we establish a new benchmark for automotive battery efficiency.";
const OVERVIEW_BODY_WORDS = OVERVIEW_BODY.split(" ");

const SYSTEM_FEATURES = [
  {
    title: "Composition for Perfection",
    body: "Precise cell composition optimized for weight, cooling, and BMS.",
  },
  {
    title: "Advanced Assembly",
    body: "Automated laser and ultrasonic welding with quality control.",
  },
  {
    title: "Reliability Meets Customization",
    body: "Reliable, flexible designs tailored to your requirements.",
  },
  {
    title: "Power-Packed Performance",
    body: "Up to 12 kWh, 175A continuous output, and 300A fast charging.",
  },
  {
    title: "Innovative Design",
    body: "Lightweight design with enhanced thermal performance.",
  },
  {
    title: "Efficiency Meets Innovation",
    body: "2170 Panasonic cells with 4.8Ah NMC chemistry in a compact 51V 100Ah pack.",
  },
];

const ENGINEERING_STEPS = [
  {
    id: "01",
    title: "Feasibility Assessment",
    body: "Meticulous battery pack design feasibility assessment.",
  },
  {
    id: "02",
    title: "Thermal Management",
    body: "Conductive heat-flow delivery at 0.5C with even distribution.",
  },
  {
    id: "03",
    title: "Battery Management",
    body: "Orion BMS with real-time cell monitoring.",
  },
  {
    id: "04",
    title: "Testing to Excellence",
    body: "6-month testing with charge/discharge cycles.",
  },
  {
    id: "05",
    title: "Seamless Integration",
    body: "1:1 harness, organized, seamlessly integrated.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PerformanceAccumulatorPage() {
  return (
    <>
      <Hero />
      <Overview />
      <CapacityBand />
      <HighPerformanceSystem />
      <EfficiencyBand />
      <EngineeredForPerformance />
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
// Hero — pinned, full-bleed battery visual with title bottom-left
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
      tl.from("[data-hero-image]", { autoAlpha: 0, scale: 1.05, duration: 1.2 })
        .from("[data-hero-title] span", {
          autoAlpha: 0,
          y: 30,
          stagger: 0.06,
          duration: 0.8,
        }, "-=0.7")
        .from("[data-hero-sub]", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.4");
    }, pinTarget);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const titleWords = "Performance Accumulator".split(" ");

  return (
    <section
      ref={pinRef}
      className="relative isolate h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      <div data-hero-image className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/performace-accumulator-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      {/* Vertically-centered left-aligned title + sub */}
      <div className="relative flex h-full w-full flex-col justify-center px-6 md:px-14">
        <div className="max-w-3xl">
          <h1
            data-hero-title
            className="font-display text-[40px] font-semibold uppercase leading-[1.06] text-white md:text-[68px]"
          >
            {titleWords.map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block">{w}</span>
                {i < titleWords.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </h1>
          <p
            data-hero-sub
            className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:mt-6 md:text-[18px]"
          >
            Meet our amazing Performance Accumulator — the best of the best when
            it comes to designing battery packs, carefully made to fit electric
            cars perfectly.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Overview — word-by-word scrub reveal, centered
// ---------------------------------------------------------------------------

function Overview() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-ov-word]");
      gsap.set(words, { autoAlpha: 0.14 });
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 40%",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      gsap.from("[data-ov-body]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-ov-body]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32">
      <Shell>
        <h2 className="mx-auto max-w-3xl text-left font-display text-lg font-normal leading-relaxed text-white md:text-[22px]">
          {OVERVIEW_WORDS.map((w, i) => (
            <Fragment key={i}>
              <span data-ov-word className="inline-block">{w}</span>
              {i < OVERVIEW_WORDS.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h2>
        <p
          data-ov-body
          className="mx-auto mt-8 max-w-3xl text-left font-display text-lg leading-relaxed text-white/60 md:text-[22px]"
        >
          {OVERVIEW_BODY}
        </p>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Capacity Band — "100 AH" big number + large battery image
// ---------------------------------------------------------------------------

const CAPACITY_SPECS = [
  { label: "Nominal Voltage", value: "51 V" },
  { label: "Energy", value: "5.1 kWh" },
  { label: "Cell Format", value: "21700" },
];

function CapacityBand() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Giant outlined-number watermark drifts in on scroll (depth cue)
      gsap.to("[data-cap-watermark]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%" },
        defaults: { ease: "power3.out" },
      });

      tl.from(
          "[data-cap-number]",
          { autoAlpha: 0, y: 60, duration: 0.9, ease: "back.out(1.4)" }
        )
        .from("[data-cap-caption]", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.5")
        .from("[data-cap-body]", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(
          "[data-cap-spec]",
          { autoAlpha: 0, y: 20, duration: 0.5, stagger: 0.1 },
          "-=0.4"
        )
        .from(
          "[data-cap-image]",
          { autoAlpha: 0, x: 60, scale: 0.95, duration: 1 },
          "-=1"
        )
        .from(
          "[data-cap-rail]",
          { scaleY: 0, transformOrigin: "top center", duration: 0.8, ease: "power3.inOut" },
          "-=0.6"
        );
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-20 md:py-28">
      {/* Giant outlined watermark number — anchors the section visually */}
      <span
        data-cap-watermark
        aria-hidden
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-display font-bold leading-none text-transparent md:-right-16"
        style={{
          fontSize: "clamp(220px, 36vw, 520px)",
          WebkitTextStroke: "1px rgba(255,255,255,0.05)",
        }}
      >
        100
      </span>

      <Shell>
        <div className="relative grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-16">
          {/* LEFT — stat + description + supporting specs */}
          <div className="relative">
            {/* Thin vertical accent rail on the far left of the content */}
            <span
              data-cap-rail
              aria-hidden
              className="absolute -left-6 top-2 hidden h-24 w-[2px] bg-gradient-to-b from-white via-white/40 to-transparent md:block"
            />

            <div data-cap-number className="flex items-start">
              <span className="font-sans font-regular leading-none text-white" style={{ fontSize: "clamp(84px, 11vw, 180px)" }}>
                100
              </span>
              <span className="mt-3 font-sans text-2xl font-semibold text-white md:mt-5 md:text-4xl">
                AH
              </span>
            </div>

            <p
              data-cap-caption
              className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.22em] text-white md:text-base"
            >
              Battery Capacity
            </p>

            <p
              data-cap-body
              className="mt-6 max-w-md text-sm leading-relaxed text-white/60 md:text-base"
            >
              Engineered cell topology and precision thermal routing deliver
              industry-leading energy density in a compact, race-ready form
              factor — enough runway for a full endurance stint without
              compromise.
            </p>

            {/* Supporting micro-stats row */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6 md:gap-6 md:pt-8">
              {CAPACITY_SPECS.map((s) => (
                <div key={s.label} data-cap-spec>
                  <p className="font-display text-lg font-semibold text-white md:text-2xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — contained battery image in a rounded frame */}
          <div
            data-cap-image
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.08]"
          >
            <img
              src="/Power/stat-100-section.png"
              alt="Performance Accumulator — 100 Ah battery pack"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent"
            />
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// High Performance Battery System — heading + image center + 2-col features
// ---------------------------------------------------------------------------

function HighPerformanceSystem() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hp-title]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 78%" },
      });

      gsap.from("[data-hp-image]", {
        autoAlpha: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-hp-image]", start: "top 85%" },
      });

      const items = gsap.utils.toArray<HTMLElement>("[data-hp-item]");
      items.forEach((item, i) => {
        gsap.from(item, {
          autoAlpha: 0,
          x: i % 2 === 0 ? -24 : 24,
          duration: 0.6,
          delay: (i % 3) * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
        });
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const leftFeatures = SYSTEM_FEATURES.filter((_, i) => i % 2 === 0);
  const rightFeatures = SYSTEM_FEATURES.filter((_, i) => i % 2 === 1);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <h2 data-hp-title className="heading-lg text-center">
          HIGH PERFORMANCE BATTERY SYSTEM
        </h2>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_1.1fr_1fr] md:items-center md:gap-10">
          {/* LEFT features */}
          <div className="flex flex-col gap-14 md:gap-16 md:text-right">
            {leftFeatures.map((f) => (
              <div key={f.title} data-hp-item>
                <h3 className="font-display text-base font-semibold text-white md:text-lg">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-[15px]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          {/* CENTER image */}
          <div data-hp-image className="relative mx-auto w-full">
            <div className="relative aspect-[9/8] w-full overflow-hidden rounded-xl bg-bg-card">
              <img
                src="/Power/stat-30-image.png"
                alt="High performance battery system"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT features */}
          <div className="flex flex-col gap-14 md:gap-16">
            {rightFeatures.map((f) => (
              <div key={f.title} data-hp-item>
                <h3 className="font-display text-base font-semibold text-white md:text-lg">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-[15px]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Efficiency Band — image left, "30%" big number right
// ---------------------------------------------------------------------------

function EfficiencyBand() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%" },
        defaults: { ease: "power3.out" },
      });

      tl.from("[data-eff-top]", { autoAlpha: 0, scale: 1.05, duration: 1 })
        .from(
          "[data-eff-number]",
          { autoAlpha: 0, y: 60, duration: 0.9, ease: "back.out(1.4)" },
          "-=0.5"
        )
        .from("[data-eff-caption]", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.5")
        .from("[data-eff-bottom-image]", { autoAlpha: 0, x: 40, duration: 0.9 }, "-=0.6");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      {/* Top — full-width hero image, no overlay */}
      <div data-eff-top className="relative aspect-[21/9] w-full overflow-hidden md:aspect-[32/11]">
        <img
          src="/Power/large-image-section.png"
          alt="Performance Accumulator battery pack"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Bottom — two-column: 30% number + caption LEFT, image RIGHT */}
      <Shell className="py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.6fr] md:gap-14">
          <div>
            <div data-eff-number className="flex items-start leading-none">
              <span className="font-sans text-7xl font-medium leading-none text-white md:text-[180px]">
                30
              </span>
              <span className="font-sans text-7xl font-medium leading-none text-white md:text-[180px]">
                %
              </span>
            </div>
            <p
              data-eff-caption
              className="mt-3 font-display text-base font-semibold uppercase tracking-[0.12em] text-white md:text-[18px]"
            >
              Battery Efficiency Improvement
            </p>
          </div>

          <div
            data-eff-bottom-image
            className="relative aspect-[16/9] w-full overflow-hidden bg-bg-card"
          >
            <img
              src="/Power/stat-30-image (1).png"
              alt="Performance Accumulator — orange high-current connectors"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Engineered for Performance — numbered steps with pin + scrub reveal
// ---------------------------------------------------------------------------

function EngineeredForPerformance() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial state — title visible on pin, steps dimmed/offset waiting
      // for the scrub reveal.
      const steps = gsap.utils.toArray<HTMLElement>("[data-eng-step]");
      steps.forEach((step) => {
        gsap.set(step.querySelector("[data-eng-num]"), { autoAlpha: 0, y: -16, scale: 0.6 });
        gsap.set(step.querySelector("[data-eng-step-title]"), { autoAlpha: 0, y: 24 });
        gsap.set(step.querySelector("[data-eng-step-body]"), { autoAlpha: 0, y: 20 });
      });
      gsap.set("[data-eng-rule]", { scaleX: 0, transformOrigin: "left center" });

      // Pin + scrubbed reveal timeline — points animate in as the user scrolls
      // through the pinned range. Short pin (~1 extra viewport = roughly 2
      // scroll gestures) so the user isn't locked in for long.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=80%",
          pin: section,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Header fades in at the very start of the pin
      tl.from("[data-eng-title]", { autoAlpha: 0, y: 30, duration: 0.4, ease: "power3.out" })
        .from("[data-eng-sub]", { autoAlpha: 0, y: 20, duration: 0.4, ease: "power3.out" }, "-=0.25")
        // Divider rule draws across
        .to("[data-eng-rule]", { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.1");

      // Each step reveals in sequence as the user scrolls further
      steps.forEach((step) => {
        tl.to(step.querySelector("[data-eng-num]"), {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
        }, ">-0.1")
          .to(step.querySelector("[data-eng-step-title]"), {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          }, "<+0.15")
          .to(step.querySelector("[data-eng-step-body]"), {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          }, "<+0.15");
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
      className="relative flex h-screen w-full flex-col justify-between overflow-hidden py-20 md:py-24"
    >
      {/* Background image — fills the full section */}
      <img
        src="/Power/manufacturing-section.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark gradient — slightly stronger at top & bottom where text sits */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Title block — top */}
      <Shell className="relative">
        <h2 data-eng-title className="heading-lg">
          ENGINEERED FOR PERFORMANCE
        </h2>
        <p
          data-eng-sub
          className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base"
        >
          AMEC control architecture ensures complete oversight from individual
          cell sourcing to complete integration into the vehicle chassis.
        </p>
      </Shell>

      {/* Numbered steps — bottom */}
      <Shell className="relative">
        <div data-eng-list>
          <div data-eng-rule className="h-px w-full bg-white/20" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 pt-8 md:grid-cols-5 md:gap-x-10 md:pt-10">
            {ENGINEERING_STEPS.map((step) => (
              <div key={step.id} data-eng-step>
                <span
                  data-eng-num
                  className="inline-block font-display text-sm font-medium tracking-[0.22em] text-white/60"
                >
                  {step.id}
                </span>
                <h3
                  data-eng-step-title
                  className="mt-4 font-display text-base font-semibold text-white md:text-lg"
                >
                  {step.title}
                </h3>
                <p
                  data-eng-step-body
                  className="mt-3 text-xs leading-relaxed text-white/70 md:text-[13px]"
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing CTA
// ---------------------------------------------------------------------------

const CLOSING_HEADING = "ENGINEERED FOR PERFORMANCE";
const CLOSING_SUB = "You can count on our Performance Accumulator to give you the best performance, reliability, and efficiency, meeting the high standards for electric race power and safety.";
const CLOSING_WORDS = CLOSING_HEADING.split(" ");
const CLOSING_SUB_WORDS = CLOSING_SUB.split(" ");

function ClosingCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin for a short range — one scroll gesture scrubs the full reveal
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // CTA button — fires once as section enters, no scrub
      gsap.from("[data-close-cta]", {
        autoAlpha: 0,
        y: 30,
        scale: 0.9,
        duration: 0.7,
        delay: 0.2,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });

      // Combined heading + body reveal — single scroll gesture scrubs both.
      // Timeline chains the two so heading leads, body follows within the same
      // tight +=15% pin range (≈ one wheel-notch / trackpad swipe).
      const headWords = gsap.utils.toArray<HTMLElement>("[data-close-word]");
      const subWords = gsap.utils.toArray<HTMLElement>("[data-close-subword]");
      gsap.set([...headWords, ...subWords], { autoAlpha: 0.14 });

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=15%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      revealTl
        .to(headWords, {
          autoAlpha: 1,
          ease: "none",
          duration: 1,
          stagger: 0.04,
        }, 0)
        .to(subWords, {
          autoAlpha: 1,
          ease: "none",
          duration: 1,
          stagger: 0.02,
        }, 0.6);

      // Ambient radial glow drifts slowly
      gsap.to("[data-close-glow]", {
        xPercent: 8,
        yPercent: -5,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Pulse rings — continuous outward expansion, staggered
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
      {/* Concentric pulse rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            data-close-pulse
            className="absolute aspect-square rounded-full border-2 border-white/20"
            style={{ width: "60vmax" }}
          />
        ))}
      </div>

      {/* Ambient drifting glow */}
      <div
        data-close-glow
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-8 px-6 text-center md:px-14">
        <h2 className="heading-xl max-w-5xl">
          {CLOSING_WORDS.map((word, i) => (
            <Fragment key={i}>
              <span data-close-word className="inline-block">{word}</span>
              {i < CLOSING_WORDS.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          {CLOSING_SUB_WORDS.map((word, i) => (
            <Fragment key={i}>
              <span data-close-subword className="inline-block">{word}</span>
              {i < CLOSING_SUB_WORDS.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>
        <div data-close-cta>
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
    </section>
  );
}
