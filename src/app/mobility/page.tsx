"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { HeroCTA } from "@/components/HeroCTA";
import { ArrowRight } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const OVERVIEW_1 =
  "AMEC Mobility is the future mobility and concept division of AMEC Group. It is where we explore next-generation electric vehicles, mobility experiences, and performance platforms — without the constraints of production timelines or commercial limitations.";
const OVERVIEW_1_WORDS = OVERVIEW_1.split(" ");

const OVERVIEW_2 =
  "This division focuses on imagining, designing, and validating future mobility concepts, backed by real engineering, system-level thinking, and advanced technology platforms developed within AMEC Group. AMEC Mobility exists to push boundaries, test ideas, and shape the technologies that will influence the next era of electric mobility.";
const OVERVIEW_2_WORDS = OVERVIEW_2.split(" ");

const VISION_BODY =
  "Our vision for future mobility is built on intelligent electrification, system-level engineering, and purposeful design. We believe electric vehicles must deliver performance, efficiency, and reliability without compromise, while adapting to evolving urban needs, sustainability goals, and user expectations.";

const VISION_SUPPORT_1 =
  "At AMEC Mobility, future mobility is defined by scalable platforms, connected systems, and software-driven intelligence.";
const VISION_SUPPORT_2 =
  "We envision lightweight, energy-efficient vehicles where propulsion, control, and user experience work together as a unified system to enable safer, smarter, and more sustainable mobility.";

const CONCEPT_INTRO =
  "Innovative electric mobility concepts engineered to explore future technologies, validate next-generation architectures, and accelerate the evolution of sustainable transportation.";

const CONCEPTS = [
  {
    id: "01",
    title: "Electric Two-Wheeler Concept",
    body:
      "A next-generation electric mobility platform developed around a modular electric architecture, balancing performance, efficiency, thermal management.",
    bulletLabel: "Focus Areas",
    focus: [
      "Urban electric performance optimized for stop-and-go traffic, variable load cycles, and consistent torque delivery.",
      "Integrated battery, motor control, power distribution, and vehicle control systems for intelligent energy management.",
      "Future-ready architecture supporting connected technologies, software-defined controls, and next-generation charging ecosystems.",
    ],
    image: "/images/Automotive-EV.png",
  },
  {
    id: "02",
    title: "Electric Bicycle Concept",
    body:
      "A lightweight electric bicycle concept engineered for efficient pedal assistance, rider comfort, and intelligent control, designed specifically for urban commuting and last-mile mobility.",
    bulletLabel: "Focus Areas",
    focus: [
      "Lightweight electric architecture with optimized energy efficiency and extended riding range.",
      "Designed for urban commuting, congestion reduction, and short-distance transportation.",
      "Minimal, intuitive rider interface with intelligent electric assistance for enhanced usability and safety.",
    ],
    image: "/images/Automotive-EV.png",
  },
  {
    id: "03",
    title: "Electric Hypercar Concept",
    body:
      "A high-performance electric technology demonstrator created to explore the future of electric propulsion, lightweight structures, thermal engineering, and software-defined vehicle control. Built as a research platform rather than a production vehicle, it validates next-generation electric architectures under extreme operating conditions.",
    bulletLabel: "Focus Areas",
    focus: [
      "Carbon-fiber monocoque chassis for lightweight structural engineering.",
      "High-voltage battery architecture with advanced liquid thermal management.",
      "High-performance electric propulsion with intelligent inverter systems.",
    ],
    image: "/images/Automotive-EV.png",
  },
  {
    id: "04",
    title: "Electric Two-Wheeler Infotainment System",
    body:
      "An intelligent companion platform that seamlessly connects riders with their vehicle, delivering live performance data, predictive insights, and smart connectivity for a safer and more efficient riding experience.",
    bulletLabel: "Capabilities",
    focus: [
      "Battery & Range Monitoring",
      "Charging Intelligence",
      "Ride Analytics",
      "Vehicle Diagnostics",
      "GPS Tracking",
      "Remote Security",
      "Service Management",
      "OTA Updates",
    ],
    image: "/images/Automotive-EV.png",
  },
];

type Role = { title: string; type: string; location: string };
type RoleGroup = { category: string; roles: Role[] };

const ROLE_GROUPS: RoleGroup[] = [
  {
    category: "Engineering",
    roles: [
      { title: "Vehicle Designer", type: "Full-time", location: "Bengaluru, India" },
      { title: "EV Systems Engineer", type: "Full-time", location: "Bengaluru, India" },
      { title: "Vehicle Performance Engineer", type: "Full-time", location: "Bengaluru, India" },
      { title: "Embedded Software Engineer", type: "Full-time", location: "Bengaluru, India" },
    ],
  },
  {
    category: "Design",
    roles: [
      { title: "UI/UX Designer", type: "Full-time", location: "Bengaluru, India" },
      { title: "HMI Designer", type: "Full-time", location: "Bengaluru, India" },
    ],
  },
  {
    category: "Research & Innovation",
    roles: [
      { title: "Mobility Research Engineer", type: "Full-time", location: "Bengaluru, India" },
      { title: "Prototype Development Engineer", type: "Full-time", location: "Bengaluru, India" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MobilityPage() {
  return (
    <>
      <Hero />
      <Overview />
      <Vision />
      <ConceptVehicles />
      <CareersInMobility />
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
    <div className={`mx-auto w-full max-w-[1600px] px-6 md:px-14 ${className}`}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero — full-bleed video, title bottom-left, CTA bottom-right
// ---------------------------------------------------------------------------

function Hero() {
  const pinRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = pinRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-media]", {
        autoAlpha: 0,
        scale: 1.08,
        duration: 1.2,
      })
        .from(
          "[data-hero-eyebrow]",
          { autoAlpha: 0, y: 16, duration: 0.5 },
          "-=0.6"
        )
        .from(
          "[data-hero-title] span",
          { autoAlpha: 0, y: 28, stagger: 0.08, duration: 0.7 },
          "-=0.3"
        )
        .from(
          "[data-hero-sub]",
          { autoAlpha: 0, y: 16, duration: 0.6 },
          "-=0.4"
        )
        .from(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 12, duration: 0.5 },
          "-=0.4"
        );

      // Slow drifting readability wash
      gsap.to("[data-hero-glow]", {
        xPercent: 8,
        yPercent: -6,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, el);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const titleWords = ["MOBILITY"];

  return (
    <section
      ref={pinRef}
      className="relative isolate h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      <div data-hero-media className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero.mp4"
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
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>

      <div
        data-hero-glow
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 55%)",
        }}
      />

      {/* Bottom row: title left, CTA right */}
      <div className="relative flex h-full flex-col justify-end pb-12 md:pb-16">
        <Shell>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-3xl">
              <p
                data-hero-eyebrow
                className="font-display text-xl font-semibold uppercase tracking-[0.3em] text-white md:text-[44px]"
              >
                AMEC
              </p>
              <h1
                data-hero-title
                className="mt-3 font-display text-[44px] font-semibold uppercase leading-[1.02] text-white md:mt-4 md:text-[80px]"
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
                className="mt-4 text-base leading-relaxed text-white md:text-[20px]"
              >
                Engineering the Future of Electric Mobility
              </p>
            </div>

            <div data-hero-cta>
              <HeroCTA
                href="#contact"
                label="Partner with us"
                variant="primary"
                arrow={false}
              />
            </div>
          </div>
        </Shell>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Overview — two paragraphs with word-by-word scrub reveal
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
        stagger: { amount: 1.2 },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32">
      <Shell>
        <div className="mx-auto max-w-3xl text-left">
          <p className="font-display text-lg font-normal leading-relaxed md:text-[22px] md:leading-[1.6]">
            {OVERVIEW_1_WORDS.map((word, i) => {
              const isBrand = i === 0 || i === 1; // "AMEC" + "Mobility"
              return (
                <Fragment key={`ov1-${i}`}>
                  <span
                    data-ov-word
                    className={`inline-block ${
                      isBrand ? "font-semibold text-white" : "text-[#FFFFFF8C]"
                    }`}
                  >
                    {word}
                  </span>
                  {i < OVERVIEW_1_WORDS.length - 1 ? " " : ""}
                </Fragment>
              );
            })}
          </p>
          <p className="mt-8 font-display text-lg font-normal leading-relaxed text-[#FFFFFF8C] md:mt-10 md:text-[22px] md:leading-[1.6]">
            {OVERVIEW_2_WORDS.map((word, i) => (
              <Fragment key={`ov2-${i}`}>
                <span data-ov-word className="inline-block">
                  {word}
                </span>
                {i < OVERVIEW_2_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Vision — heading + description + image + supporting copy
// ---------------------------------------------------------------------------

function Vision() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-vision-heading]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-vision-body]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
      gsap.from("[data-vision-image]", {
        autoAlpha: 0,
        scale: 1.05,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-vision-image]", start: "top 85%" },
      });
      gsap.from("[data-vision-support]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-vision-support]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <div className="mx-auto max-w-3xl text-center">
          <h2 data-vision-heading className="heading-lg">
            OUR VISION
          </h2>
          <p
            data-vision-heading
            className="mt-3 text-base tracking-[0.02em] text-[#FFFFFF8C] md:text-[18px]"
          >
            Engineering the Future of Mobility
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl md:mt-12">
          <p
            data-vision-body
            className="text-left text-base leading-relaxed text-[#FFFFFF8C] md:text-[17px] md:leading-[1.7]"
          >
            {VISION_BODY}
          </p>
        </div>

        <div
          data-vision-image
          className="relative mx-auto mt-14 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-xl bg-bg-card md:mt-16"
        >
          <Image
            src="/images/Automotive-EV.png"
            alt="AMEC Mobility vision"
            fill
            className="object-cover opacity-80"
          />
        </div>

        <div className="mx-auto mt-14 max-w-4xl md:mt-16">
          <p
            data-vision-support
            className="text-left text-base leading-relaxed text-[#FFFFFF8C] md:text-[17px] md:leading-[1.7]"
          >
            {VISION_SUPPORT_1}
          </p>
          <p
            data-vision-support
            className="mt-6 text-left text-base leading-relaxed text-[#FFFFFF8C] md:text-[17px] md:leading-[1.7]"
          >
            {VISION_SUPPORT_2}
          </p>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Concept Vehicles — intro + big index + image left / content right
// ---------------------------------------------------------------------------

function ConceptVehicles() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    const pin = pinRef.current;
    if (!el || !pin) return;

    const ctx = gsap.context(() => {
      // Pin the whole stage (heading + slide area) as one unit on desktop so
      // the heading, big index, and indicator dots stay visible while the
      // user scrubs through concepts. On mobile we render all 4 concepts
      // stacked (see JSX below) — pinning there would clip the body + bullets
      // out of the viewport.
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) return;

      ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        // N concepts need N-1 scroll steps to traverse (one gesture per
        // transition). Using CONCEPTS.length * 100% leaves a dead scroll
        // range at the end where nothing changes.
        end: () => `+=${(CONCEPTS.length - 1) * 100}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.4,
        // Snap to each concept position so one scroll gesture advances the
        // index by exactly 1 and settles there.
        snap: {
          snapTo: 1 / Math.max(1, CONCEPTS.length - 1),
          duration: 0.3,
          delay: 0.05,
          ease: "power2.inOut",
        },
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // With N-1 scroll steps, progress 0..1 maps to indices 0..N-1 by
          // simple rounding — aligns cleanly with the snap points.
          const idx = Math.round(self.progress * (CONCEPTS.length - 1));
          setActiveIndex(Math.min(CONCEPTS.length - 1, Math.max(0, idx)));
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const current = CONCEPTS[activeIndex];

  return (
    <section ref={sectionRef} className="w-full">
      {/* Mobile — all 4 concepts stacked vertically. No pin, no toggle; user
          scrolls naturally through everything. Hidden on md+ where the desktop
          pinned version takes over. */}
      <div className="w-full py-10 md:hidden">
        <Shell>
          <div>
            <h2 className="heading-lg">CONCEPT VEHICLES</h2>
            <p className="mt-3 text-base leading-relaxed text-[#FFFFFF8C]">
              {CONCEPT_INTRO}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-14">
            {CONCEPTS.map((c, i) => {
              const twoColBullets = c.focus.length >= 6;
              return (
                <article key={c.id}>
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="font-display text-[40px] font-semibold leading-none text-white"
                    >
                      {c.id}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Concept {i + 1} of {CONCEPTS.length}
                    </span>
                  </div>

                  <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-xl bg-bg-card">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#FFFFFF8C]">
                    {c.body}
                  </p>

                  <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.22em] text-white">
                    {c.bulletLabel}
                  </p>
                  <ul
                    className={`mt-3 ${
                      twoColBullets
                        ? "grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2"
                        : "flex flex-col gap-3"
                    }`}
                  >
                    {c.focus.map((f, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm leading-relaxed text-[#FFFFFF8C]"
                      >
                        <span
                          aria-hidden
                          className="mt-[9px] inline-block h-1 w-1 shrink-0 rounded-full bg-[#FFFFFF8C]"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Shell>
      </div>

      {/* Desktop — pinned scrubbed showcase (hidden on mobile). */}
      <div ref={pinRef} className="hidden w-full py-6 md:block md:py-16">
        <Shell>
          {/* Header + big index + indicator dots — same container as the
              slide stage below so the heading's left edge lines up with the
              image's left edge. */}
          <div className="grid gap-6 md:grid-cols-[1.4fr_auto] md:items-end md:gap-10 tablet:grid-cols-1 tablet:gap-6">
            <div>
              <h2 className="heading-lg">CONCEPT VEHICLES</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#FFFFFF8C] md:text-[17px] md:leading-[1.6]">
                {CONCEPT_INTRO}
              </p>
            </div>
            <div className="flex items-center gap-4 md:items-end md:gap-5">
              <div
                aria-hidden
                className="font-display text-[40px] font-semibold leading-none text-white md:text-[96px]"
              >
                {current.id}
              </div>
              {/* Page indicator — horizontal row on mobile, vertical column on md+ */}
              <div className="flex flex-row items-center gap-1.5 md:flex-col md:pb-4">
                {CONCEPTS.map((_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className={`h-[2px] w-5 rounded-full transition-colors duration-300 md:h-5 md:w-[2px] ${
                      i === activeIndex ? "bg-white" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Slide stage — fixed two-column grid: IMAGE always left, CONTENT
              always right. All four concepts render in the same grid cells
              and are toggled via opacity so the layout is identical for 01,
              02, 03, and 04. */}
          <div className="relative mt-8 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-12 tablet:grid-cols-1 tablet:gap-8">
            {/* LEFT column — image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-bg-card md:aspect-auto md:min-h-[420px]">
              {CONCEPTS.map((c, i) => (
                <div
                  key={c.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    i === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={i !== activeIndex}
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* RIGHT column — content */}
            <div className="relative">
              {CONCEPTS.map((c, i) => {
                const isActive = i === activeIndex;
                // 6+ bullets â†’ render as a two-column list so the tall
                // concept 04 doesn't overflow the pinned viewport.
                const twoColBullets = c.focus.length >= 6;
                return (
                  <div
                    key={c.id}
                    aria-hidden={!isActive}
                    className={`flex flex-col transition-opacity duration-500 ${
                      isActive
                        ? "relative opacity-100"
                        : "pointer-events-none absolute inset-0 opacity-0"
                    }`}
                  >
                    <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[#FFFFFF8C] md:text-[17px] md:leading-[1.6]">
                      {c.body}
                    </p>

                    <p className="mt-7 font-display text-xs font-semibold uppercase tracking-[0.22em] text-white md:text-[13px]">
                      {c.bulletLabel}
                    </p>
                    <ul
                      className={`mt-4 ${
                        twoColBullets
                          ? "grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
                          : "flex flex-col gap-4"
                      }`}
                    >
                      {c.focus.map((f, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-base leading-relaxed text-[#FFFFFF8C] md:text-[17px] md:leading-[1.5]"
                        >
                          <span
                            aria-hidden
                            className="mt-[11px] inline-block h-1 w-1 shrink-0 rounded-full bg-[#FFFFFF8C]"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </Shell>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Careers in Future Mobility — grouped roles with meta columns
// ---------------------------------------------------------------------------

function CareersInMobility() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-careers-head]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-careers-group]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-careers-list]", start: "top 85%" },
      });
      gsap.from("[data-career-row]", {
        autoAlpha: 0,
        y: 12,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-careers-list]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <div data-careers-head className="text-center">
          <h2 className="heading-lg">CAREERS IN FUTURE MOBILITY</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#FFFFFF8C] md:text-[18px] md:leading-[1.55]">
            Join a team of engineers, designers, and innovators building the next
            generation of electric mobility solutions.
          </p>
        </div>

        <div
          data-careers-list
          className="mx-auto mt-12 flex max-w-5xl flex-col gap-10 md:mt-16 md:gap-12"
        >
          {ROLE_GROUPS.map((g) => (
            <div key={g.category} data-careers-group>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-[#999999]">
                {g.category}
              </p>
              <div className="mt-4 flex flex-col divide-y divide-white/10 border-y border-white/10">
                {g.roles.map((r) => (
                  <div key={r.title} data-career-row>
                    {/* Mobile — title + Learn More on row 1, type · location
                        on row 2. Keeps each role compact and scannable. */}
                    <div className="flex flex-col gap-1.5 py-5 md:hidden">
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-display text-sm font-semibold text-white">
                          {r.title}
                        </span>
                        <Link
                          href="/careers/SeniorSalesManager"
                          className="inline-flex shrink-0 items-center gap-1 text-xs text-white/70 transition-colors hover:text-white"
                        >
                          Learn More
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                      <p className="text-xs text-white/60">
                        {r.type}
                        <span aria-hidden className="mx-1.5 text-white/30">·</span>
                        {r.location}
                      </p>
                    </div>

                    {/* Desktop — 4-col grid */}
                    <div className="hidden md:grid md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center md:gap-6 md:py-5">
                      <span className="font-display text-[15px] font-semibold text-white">
                        {r.title}
                      </span>
                      <span className="text-[13px] text-white">{r.type}</span>
                      <span className="text-[13px] text-white">{r.location}</span>
                      <Link
                        href="/careers/SeniorSalesManager"
                        className="inline-flex items-center gap-2 justify-self-end text-[13px] text-white transition-colors hover:text-white/80"
                      >
                        Learn More
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing CTA — full-width hero-style heading over concentric rings, with
// two action cards below. Mirrors the amectechnology.com pattern.
// ---------------------------------------------------------------------------

const MOB_CTA_WORDS = "Ready to build the future together?".split(" ");

function ClosingCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Pin the heading band so a single scroll gesture scrubs the full
      // word-by-word reveal (same pattern as careers / performance CTAs).
      ScrollTrigger.create({
        trigger: "[data-cta-headband]",
        start: "top top",
        end: "+=70%",
        pin: "[data-cta-headband]",
        pinSpacing: true,
        anticipatePin: 1,
      });

      const words = gsap.utils.toArray<HTMLElement>("[data-cta-word]");
      gsap.set(words, { autoAlpha: 0.14 });
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: "[data-cta-headband]",
          start: "top top",
          end: "+=25%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      gsap.from("[data-cta-btn]", {
        autoAlpha: 0,
        y: 24,
        scale: 0.95,
        duration: 0.7,
        delay: 0.2,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: "[data-cta-headband]", start: "top 70%" },
      });

      gsap.from("[data-cta-sub]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-cta-subs]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="w-full">
      {/* Full-bleed heading band with concentric rings backdrop, pinned */}
      <div
        data-cta-headband
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A]"
      >
        {/* Concentric rings — radar-style backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {[
            { size: 520, opacity: 0.1 },
            { size: 900, opacity: 0.07 },
            { size: 1300, opacity: 0.045 },
            { size: 1700, opacity: 0.03 },
          ].map((r) => (
            <span
              key={r.size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: `${r.size}px`,
                height: `${r.size}px`,
                borderColor: `rgba(255,255,255,${r.opacity})`,
              }}
            />
          ))}
        </div>

        {/* Soft center vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04), transparent 70%)",
          }}
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <h2 className="font-display text-[36px] font-semibold uppercase leading-[1.08] text-white md:text-[64px] lg:text-[72px]">
            {MOB_CTA_WORDS.map((w, i) => (
              <Fragment key={i}>
                <span data-cta-word className="inline-block">
                  {w}
                </span>
                {i < MOB_CTA_WORDS.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>
          <div data-cta-btn className="mt-10 md:mt-14">
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
      <Shell className="pb-20 pt-10 md:pb-28">
        <div data-cta-subs className="grid gap-6 md:grid-cols-2">
          <Link
            href="/contact"
            data-cta-sub
            className="group relative overflow-hidden rounded-2xl bg-bg-card p-10 md:p-12"
          >
            <div className="flex h-full flex-col justify-between gap-8">
              <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                Partner
                <br />
                with AMEC
              </h3>
              <span className="inline-flex items-center gap-3 self-start rounded border border-white/20 py-1.5 pl-1.5 pr-5 font-display text-sm font-medium text-white transition-all duration-300 ease-out group-hover:flex-row-reverse group-hover:border-white group-hover:bg-white group-hover:pl-5 group-hover:pr-1.5 group-hover:text-black md:text-[15px]">
                <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white md:h-8 md:w-8">
                  <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
                Become a Partner
              </span>
            </div>
          </Link>

          <Link
            href="/careers/SeniorSalesManager"
            data-cta-sub
            className="group relative overflow-hidden rounded-2xl bg-bg-card p-10 md:p-12"
          >
            <div className="flex h-full flex-col justify-between gap-8">
              <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                Build the
                <br />
                future with AMEC
              </h3>
              <span className="inline-flex items-center gap-3 self-start rounded border border-white/20 py-1.5 pl-1.5 pr-5 font-display text-sm font-medium text-white transition-all duration-300 ease-out group-hover:flex-row-reverse group-hover:border-white group-hover:bg-white group-hover:pl-5 group-hover:pr-1.5 group-hover:text-black md:text-[15px]">
                <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white md:h-8 md:w-8">
                  <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
                Explore Careers
              </span>
            </div>
          </Link>
        </div>
      </Shell>
    </section>
  );
}
