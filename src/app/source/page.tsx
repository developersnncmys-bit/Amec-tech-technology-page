"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { AnimateIn } from "@/components/AnimateIn";
import { ArrowRight } from "@/components/Icons";
import { Footer } from "@/components/Footer";

const SOURCE_IMG = "/images/Source.png";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type ModeMetric = {
  label: string;
  value: string;
  pos: string;
  accent: string;
  dotHex: string;
  // SVG line in viewBox 0–100 coords (preserveAspectRatio="none" so these
  // match CSS % positions directly). x1,y1 = line start near chip edge;
  // x2,y2 = target point on the diagram where the pulse marker sits.
  line: { x1: number; y1: number; x2: number; y2: number };
};

const MODES: Array<{
  id: string;
  num: string;
  label: string;
  tagline: string;
  body: string;
  metrics: ModeMetric[];
}> = [
  {
    id: "on-grid",
    num: "01",
    label: "On-Grid",
    tagline: "Solar first, grid connected.",
    body:
      "In on-grid operation, SOURCE prioritizes solar power for connected loads while intelligently interacting with the utility grid. Excess solar energy can be utilized efficiently, while the grid supplements power when solar generation is insufficient.",
    metrics: [
      { label: "Solar", value: "4.2 kW", pos: "left-[6%] top-[14%]", accent: "text-amber-300", dotHex: "#fcd34d", line: { x1: 20, y1: 24, x2: 46, y2: 32 } },
      { label: "Export", value: "1.1 kW", pos: "right-[4%] top-[30%]", accent: "text-sky-300", dotHex: "#7dd3fc", line: { x1: 88, y1: 40, x2: 93, y2: 45 } },
      { label: "Home load", value: "3.1 kW", pos: "right-[8%] bottom-[18%]", accent: "text-white", dotHex: "#f8fafc", line: { x1: 76, y1: 72, x2: 60, y2: 60 } },
    ],
  },
  {
    id: "off-grid",
    num: "02",
    label: "Off-Grid",
    tagline: "Complete energy independence.",
    body:
      "Complete energy independence for remote and rural installations. SOURCE runs the home directly from solar and battery, with intelligent load management ensuring reliable 24/7 power.",
    metrics: [
      { label: "Solar", value: "4.2 kW", pos: "left-[6%] top-[14%]", accent: "text-amber-300", dotHex: "#fcd34d", line: { x1: 20, y1: 24, x2: 46, y2: 32 } },
      { label: "Battery", value: "85%", pos: "left-[8%] bottom-[20%]", accent: "text-emerald-300", dotHex: "#6ee7b7", line: { x1: 22, y1: 72, x2: 54, y2: 68 } },
      { label: "Home load", value: "3.1 kW", pos: "right-[8%] bottom-[18%]", accent: "text-white", dotHex: "#f8fafc", line: { x1: 76, y1: 72, x2: 60, y2: 60 } },
    ],
  },
  {
    id: "hybrid",
    num: "03",
    label: "Hybrid",
    tagline: "Real-time power routing.",
    body:
      "Best of both worlds. SOURCE decides in real time whether to draw from solar, storage, or grid based on load, tariff, and weather forecasts — optimising cost and reliability.",
    metrics: [
      { label: "Solar", value: "4.2 kW", pos: "left-[6%] top-[14%]", accent: "text-amber-300", dotHex: "#fcd34d", line: { x1: 20, y1: 24, x2: 46, y2: 32 } },
      { label: "Grid", value: "Standby", pos: "right-[4%] top-[30%]", accent: "text-sky-300", dotHex: "#7dd3fc", line: { x1: 88, y1: 40, x2: 93, y2: 45 } },
      { label: "Battery", value: "Charging", pos: "left-[8%] bottom-[20%]", accent: "text-emerald-300", dotHex: "#6ee7b7", line: { x1: 22, y1: 72, x2: 54, y2: 68 } },
    ],
  },
  {
    id: "back-up",
    num: "04",
    label: "Back-Up",
    tagline: "20 ms switchover.",
    body:
      "Automatic islanding within 20 ms when a grid outage is detected. Critical loads keep running from stored energy; no manual switching, no downtime.",
    metrics: [
      { label: "Grid", value: "Offline", pos: "right-[4%] top-[30%]", accent: "text-rose-300", dotHex: "#fda4af", line: { x1: 88, y1: 40, x2: 93, y2: 45 } },
      { label: "Battery", value: "85%", pos: "left-[8%] bottom-[20%]", accent: "text-emerald-300", dotHex: "#6ee7b7", line: { x1: 22, y1: 72, x2: 54, y2: 68 } },
      { label: "Critical loads", value: "1.8 kW", pos: "right-[8%] bottom-[18%]", accent: "text-white", dotHex: "#f8fafc", line: { x1: 76, y1: 72, x2: 60, y2: 60 } },
    ],
  },
];

const KEY_FEATURES: Array<{ title: string; icon: React.ReactNode }> = [
  {
    title: "Smart Energy Intelligence",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    title: "Dynamic Power Management",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-3.5-7.1" />
        <path d="M21 3v6h-6" />
      </svg>
    ),
  },
  {
    title: "Grid Protection",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v7c0 5 3.5 8.7 8 10 4.5-1.3 8-5 8-10V5l-8-3Z" />
      </svg>
    ),
  },
  {
    title: "Liquid-Cooled Thermal System",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z" />
      </svg>
    ),
  },
  {
    title: "Intelligent Auto Diagnostics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: "Easy Service & Maintenance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-2.4 2.5-2.5Z" />
      </svg>
    ),
  },
];

const SPECS = [
  {
    group: "Inverter Module",
    rows: [
      ["Continuous Power Output", "6 kW"],
      ["AC Output Voltage", "230 V AC ±5%, 50 Hz"],
      ["DC Input Range", "42 V – 60 V"],
      ["Surge Power Protection (10s)", "9 kW"],
      ["Transfer Switch Time", "< 20 ms"],
      ["Operating Modes", "On-Grid, Off-Grid, Hybrid, Backup"],
    ],
  },
  {
    group: "Battery Module",
    rows: [
      ["Battery Capacity", "6.5 kWh"],
      ["Nominal Voltage", "51 V"],
      ["Battery Chemistry", "LiFePO₄ (LFP)"],
      ["Operating Temperature", "-10 °C to 55 °C"],
      ["Warranty", "10 Years"],
    ],
  },
  {
    group: "General",
    rows: [
      ["Weight", "65 kg"],
      ["Monitoring", "SOURCE™ App (BLE 5.2 / Wi-Fi)"],
      ["Housing Material", "Die-Cast Aluminum Alloy"],
      ["Mounting Options", "Wall Mount / Ground Mount"],
      ["Dimensions (L × W × D)", "930 × 485 × 200 mm"],
    ],
  },
];

const APPLICATIONS = [
  {
    title: "Residential",
    body: "Rooftop solar with 24/7 backup for homes and villas.",
    image: "/images/Source-Residential.png",
  },
  {
    title: "Commercial",
    body: "Peak-shaving and demand response for offices and retail.",
    image: "/images/Source-commercial.png",
  },
  {
    title: "Small-Scale Industry",
    body: "Continuous power for workshops and light manufacturing.",
    image: "/images/source-smallscale.png",
  },
  {
    title: "Remote Sites",
    body: "Microgrid-grade hybrid power for off-grid installations.",
    image: "/images/Source-remote.png",
  },
];

const FAQ_ITEMS = [
  {
    q: "How does SOURCE decide whether to use solar, battery, or grid power?",
    a: "SOURCE continuously monitors solar generation, battery status, grid availability, and power demand using intelligent energy management algorithms. It automatically prioritizes solar energy first, then battery storage, and finally the utility grid when required, ensuring maximum efficiency and uninterrupted power.",
  },
  {
    q: "What happens during a power outage?",
    a: "SOURCE automatically islands from the grid within 20 ms and continues supplying critical loads from stored battery energy. No manual switching, no downtime — connected appliances keep running seamlessly.",
  },
  {
    q: "Can SOURCE operate without a utility grid?",
    a: "Yes. In off-grid mode SOURCE runs the site entirely from solar and battery, with intelligent load management ensuring reliable 24/7 power — ideal for remote and rural installations.",
  },
  {
    q: "How can I monitor and control my SOURCE system?",
    a: "The SOURCE™ app (iOS & Android) provides real-time energy views, remote control, and analytics. Connectivity is over BLE 5.2 and Wi-Fi, and cloud sync means you can also manage the system from a browser.",
  },
  {
    q: "What type of battery does SOURCE use, and how long does it last?",
    a: "SOURCE uses LiFePO₄ (LFP) battery modules — chosen for their thermal stability, long cycle life, and safety. Every unit ships with an industry-leading 10-year warranty on both the inverter and battery.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SourcePage() {
  return (
    <>
      <Hero />
      <ProductOverview />
      <OneEnergyEcosystem />
      <SceneBand />
      <HybridEnergyManagement />
      <KeyFeatures />
      <SmartFeatures />
      <TechnicalSpecifications />
      <ModelDimensionsAndResources />
      <RemoteControl />
      <WhereSourceWorks />
      <MonitoringSection />
      <FAQ />
      <ClosingCTA />
      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1600px] px-6 md:px-14 ${className}`}>{children}</div>;
}

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
    }, pinTarget);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={pinRef} className="relative isolate w-full overflow-hidden bg-[#151515]">
      <div className="relative h-screen w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/Source-hero.mp4"
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
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%), radial-gradient(60% 80% at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
          }}
        />
      </div>
      {/* Top-center: eyebrow + main heading */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-28 text-center md:pt-36">
        <AnimateIn>
          <p className="eyebrow">Source</p>
          <h1 className="mt-3 heading-xl">Hybrid Energy System</h1>
        </AnimateIn>
      </div>

      {/* Bottom-left: description with CTAs stacked below */}
      <div className="absolute inset-x-0 bottom-0 flex px-6 pb-12 md:px-14 md:pb-16">
        <AnimateIn className="max-w-xl">
          <p className="text-base leading-relaxed text-white/85 md:text-lg">
            Seamlessly manage solar, grid, and battery power for maximum efficiency and uninterrupted energy.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-hero-primary">Request a Quote</Link>
            <Link href="/contact" className="btn-hero-ghost">Talk to an Expert</Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

const OVERVIEW_TEXT =
  "SOURCE is an intelligent energy management platform that seamlessly optimises power flow across solar, grid, and battery systems for maximum efficiency and reliability.";
const OVERVIEW_WORDS = OVERVIEW_TEXT.split(" ");

const PROBLEM_TEXT =
  "SOURCE overcomes grid instability and power disruptions by intelligently balancing solar, grid, and battery energy—ensuring reliable, efficient, and uninterrupted power.";
const PROBLEM_WORDS = PROBLEM_TEXT.split(" ");

function ProductOverview() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-block2-word]", { autoAlpha: 0.15 });
      gsap.set("[data-overview-rail]", { scaleY: 0.15, transformOrigin: "top" });

      // Pin removed — the earlier `pin: true` on this short +=30% range was
      // colliding with the Hero's full-viewport pin above, leaving a dark
      // dead-zone between the two sections. Scrub to natural scroll instead:
      // the words brighten and the rail grows as the user scrolls past the
      // second block, without the section being locked in place.
      const st = {
        trigger: "[data-block2-trigger]",
        start: "top 85%",
        end: "top 30%",
        scrub: 0.3,
        invalidateOnRefresh: true,
      } as const;

      gsap.to("[data-block2-word]", {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: st,
      });

      // Vertical indicator rail — grows from the "Product Overview" title down
      // to the "Problem It Solves" title as the second block reveals.
      gsap.to("[data-overview-rail]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: st,
      });

      // Problem title brightens in sync with its description.
      gsap.to("[data-block2-title]", {
        color: "rgba(255,255,255,1)",
        ease: "none",
        scrollTrigger: st,
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
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
          <div className="grid grid-cols-[1fr_auto_1.4fr] gap-x-6 gap-y-16 md:gap-x-10 md:gap-y-24">
            {/* Row 1 — Product Overview title */}
            <h2 className="font-display text-xl font-semibold text-white md:text-2xl">
              Product Overview
            </h2>
            {/* Continuous vertical divider — spans both rows, with active-block indicator */}
            <div className="relative row-span-2 w-[3px]">
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/15" aria-hidden />
              <span
                data-overview-rail
                className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-white"
                aria-hidden
              />
            </div>
            {/* Row 1 — description (always fully visible, bright) */}
            <p className="max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
              <span className="font-semibold text-white">SOURCE</span>
              {OVERVIEW_TEXT.slice("SOURCE".length)}
            </p>

            {/* Row 2 — Problem It Solves title (brightens on scrub reveal) */}
            <h2
              data-block2-title
              data-block2-trigger
              className="font-display text-xl font-semibold md:text-2xl"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Problem It Solves
            </h2>
            {/* Row 2 — description (scrubbed word reveal) */}
            <p className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              {PROBLEM_WORDS.map((word, i) => (
                <Fragment key={i}>
                  <span data-block2-word className="inline-block">{word}</span>
                  {i < PROBLEM_WORDS.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 md:justify-end">
            <img
              src="/images/source-product1.png"
              alt="SOURCE product front"
              className="max-h-[420px] w-auto object-contain"
            />
            <img
              src="/images/source-product2.png"
              alt="SOURCE product side"
              className="max-h-[420px] w-auto object-contain"
            />
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// One Energy Ecosystem — 3-column layer map (left list / centre image / right list)
// ---------------------------------------------------------------------------

// Icons for the right-side feature lists (3 states × 3 features each).
// Clean lucide-inspired paths — tested shapes that render crisply at 20px.

// STATE 1 — Foundation / Power Hardware
// AI Energy Orchestration — CPU chip with brain-dot pattern
const AiIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4 7h2M4 17h2M18 7h2M18 17h2" />
  </svg>
);
// Hybrid Power System — battery with lightning bolt
const BatteryIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="7" width="16" height="10" rx="2" />
    <path d="M22 11v2" />
    <path d="m11 10-2 3h2.5l-1.5 2 3-3h-2l1-2z" fill="currentColor" stroke="none" />
  </svg>
);
// Liquid-Cooled Design — solid water droplet
const DropletIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.5s7 7.5 7 12.5a7 7 0 0 1-14 0c0-5 7-12.5 7-12.5Z" />
  </svg>
);

// STATE 2 — Intelligence / Energy Intelligence
// Hybrid Architecture — bidirectional arrows (swap)
const SwapIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 7h14" />
    <path d="m15 4 3 3-3 3" />
    <path d="M20 17H6" />
    <path d="m9 14-3 3 3 3" />
  </svg>
);
// IoT Diagnostics — speedometer / gauge
const GaugeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 14 15.5 9.5" />
    <path d="M3 13a9 9 0 1 1 18 0" />
    <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
// Predictive Alerts — bell with clapper
const BellIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z" />
    <path d="M10 21a2 2 0 0 0 4 0" />
  </svg>
);

// STATE 3 — Performance / Solar Efficiency Tech
// Touchless CleanTech™ — 4-point sparkle twinkle
const SparkleIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2c0 5.5 4.5 10 10 10-5.5 0-10 4.5-10 10 0-5.5-4.5-10-10-10 5.5 0 10-4.5 10-10Z" />
  </svg>
);
// Smart Cleaning — brush at angle
const BrushIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m14.5 3.5 6 6-9.5 9.5c-1.5 1.5-4 1.5-5.5 0s-1.5-4 0-5.5l9-10Z" />
    <path d="m11 7 6 6" />
  </svg>
);
// Sensor Intelligence — radio/signal waves emanating
const SignalIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
    <path d="M8.5 14.5a5 5 0 0 1 7 0" />
    <path d="M5.5 11.5a9 9 0 0 1 13 0" />
    <path d="M2.5 8.5a13 13 0 0 1 19 0" />
  </svg>
);

type EcosystemState = {
  layer: { eyebrow: string; title: string; body: string };
  image: string;
  features: Array<{ title: string; body: string; icon: React.ReactNode }>;
};

const ECOSYSTEM_STATES: EcosystemState[] = [
  {
    layer: {
      eyebrow: "Foundation Layer",
      title: "Power Hardware",
      body: "Reliable power. Maximum uptime. Lower cost of energy.",
    },
    image: "/images/Shot.png",
    features: [
      { title: "AI Energy Orchestration", body: "Learns usage, weather & tariff for real-time optimization.", icon: AiIcon },
      { title: "Hybrid Power System", body: "Integrated storage, inverter & smart control.", icon: BatteryIcon },
      { title: "Liquid-Cooled Design", body: "High performance. India ready.", icon: DropletIcon },
    ],
  },
  {
    layer: {
      eyebrow: "Intelligence Layer",
      title: "Energy Intelligence",
      body: "Real-time control. Full visibility. Smarter decisions.",
    },
    image: "/images/Visual panel.png",
    features: [
      { title: "Hybrid Architecture", body: "Smart switching for uninterrupted power.", icon: SwapIcon },
      { title: "IoT Diagnostics", body: "Real-time health monitoring of the system.", icon: GaugeIcon },
      { title: "Predictive Alerts", body: "Prevents faults. Reduces downtime.", icon: BellIcon },
    ],
  },
  {
    layer: {
      eyebrow: "Performance Layer",
      title: "Solar Efficiency Tech",
      body: "More energy. Less maintenance. Better ROI.",
    },
    image: "/images/Visual panel (1).png",
    features: [
      { title: "Touchless CleanTech™", body: "Self-cleaning system for higher solar output.", icon: SparkleIcon },
      { title: "Smart Cleaning", body: "Sensors detect dust & performance loss. Cleans only when needed.", icon: BrushIcon },
      { title: "Sensor Intelligence", body: "Uses irradiance, IMUs & environmental data.", icon: SignalIcon },
    ],
  },
];

function OneEnergyEcosystem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin for N × 80% scroll range — one slot per state. Snap keeps the
      // user landing cleanly on each state rather than mid-transition.
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${ECOSYSTEM_STATES.length * 80}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value) => {
            const n = ECOSYSTEM_STATES.length;
            return Math.round(value * (n - 1)) / (n - 1);
          },
          duration: 0.3,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const idx = Math.min(
            ECOSYSTEM_STATES.length - 1,
            Math.round(self.progress * (ECOSYSTEM_STATES.length - 1))
          );
          setActive(idx);
        },
      });

      // Header fades in on first approach.
      gsap.from("[data-oee-heading], [data-oee-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const currentFeatures = ECOSYSTEM_STATES[active].features;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden py-16 md:py-20"
    >
      <Shell>
        {/* Header */}
        <div className="text-center">
          <h2 data-oee-heading className="heading-lg">ONE ENERGY ECOSYSTEM</h2>
          <p
            data-oee-sub
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            Everything working together to make energy smarter and more efficient.
          </p>
        </div>

        {/* 3-column grid: left layer list | centre image | right features */}
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1fr_1.1fr_1fr] md:items-center md:gap-10 lg:gap-14">
          {/* LEFT — three stacked layers, active one brightens, rail fills */}
          <div className="relative flex flex-col gap-8 pl-5 md:gap-12 md:pl-6">
            {/* Dim background rail */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-px bg-white/10"
            />
            {/* Active rail — height scales with active index */}
            <span
              aria-hidden
              className="absolute left-[-1px] top-0 w-[3px] origin-top bg-gradient-to-b from-white via-white/60 to-white/20 transition-[height] duration-500 ease-out"
              style={{
                height: `${((active + 1) / ECOSYSTEM_STATES.length) * 100}%`,
              }}
            />
            {ECOSYSTEM_STATES.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={s.layer.title}
                  className={`transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-35"
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 md:text-xs">
                    {s.layer.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-base font-semibold uppercase tracking-wide text-white md:text-lg">
                    {s.layer.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-white/60 md:text-[13px]">
                    {s.layer.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CENTER — raw image crossfades on state change (no card wrapper) */}
          <div className="order-first flex items-center justify-center md:order-none">
            <div className="relative aspect-square w-full max-w-[460px] md:max-w-[520px]">
              {ECOSYSTEM_STATES.map((s, i) => (
                <img
                  key={s.image}
                  src={s.image}
                  alt={s.layer.title}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — feature list swaps per state. `key={active}` forces a
              remount so the fade-in staggered animation plays on every
              change. */}
          <div key={active} className="flex flex-col gap-8 md:gap-10">
            {currentFeatures.map((f, i) => (
              <div
                key={f.title}
                className="flex items-start gap-4 md:gap-5 opacity-0"
                style={{ animation: `oeeFadeInUp 0.5s ease-out ${i * 0.08}s both` }}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white md:h-10 md:w-10">
                  <span className="h-5 w-5">{f.icon}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-white md:text-lg">
                    {f.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-white/60 md:text-[13px]">
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-10 flex justify-center gap-3 md:mt-14">
          {ECOSYSTEM_STATES.map((_, i) => (
            <span
              key={i}
              aria-hidden
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-10 bg-white" : "w-6 bg-white/25"
              }`}
            />
          ))}
        </div>
      </Shell>

      <style jsx>{`
        @keyframes oeeFadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

function SceneBand() {
  const pinRef = useRef<HTMLElement | null>(null);
  const [view, setView] = useState<"morning" | "night">("morning");

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
    }, pinTarget);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  // Preload + decode both scene images on mount so the first opacity flip has
  // a fully-decoded bitmap sitting on a GPU layer — no first-paint pop.
  useEffect(() => {
    const sources = ["/images/SourceMorning.png", "/images/Sourcenight.png"];
    sources.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.decode?.().catch(() => {});
    });
  }, []);

  return (
    <section
      ref={pinRef}
      className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#0f0f0f]"
    >
      {/* Single stable img element — src swap only, no transform. */}
      <img
        src={view === "morning" ? "/images/SourceMorning.png" : "/images/Sourcenight.png"}
        alt=""
        aria-hidden
        decoding="sync"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Bottom overlay — darkens the ground so the toggle + caption read clearly */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-6 px-6 pb-10 text-center md:px-14 md:pb-14">
        <div className="flex justify-center gap-2 rounded border border-white/15 bg-black/80 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setView("morning")}
            className={`rounded px-5 py-2 font-display text-sm font-medium transition md:text-base ${
              view === "morning" ? "bg-white text-black" : "text-white/80 hover:text-white"
            }`}
          >
            Morning View
          </button>
          <button
            type="button"
            onClick={() => setView("night")}
            className={`rounded px-5 py-2 font-display text-sm font-medium transition md:text-base ${
              view === "night" ? "bg-white text-black" : "text-white/80 hover:text-white"
            }`}
          >
            Night View
          </button>
        </div>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
          Seamlessly balances power between solar, grid, battery, and connected loads to maximise efficiency, reliability,
          and energy availability.
        </p>
      </div>
    </section>
  );
}

function HybridEnergyManagement() {
  const pinRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(MODES[0].id);
  const activeMode = MODES.find((m) => m.id === active)!;

  // Pin the section briefly so the user settles into the tab interaction
  // before scroll continues.
  useIsomorphicLayoutEffect(() => {
    const pinTarget = pinRef.current;
    if (!pinTarget) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=30%",
        pin: pinTarget,
        pinSpacing: true,
        anticipatePin: 1,
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
      className="relative flex h-screen w-full flex-col overflow-hidden pb-6 pt-24 md:pb-8 md:pt-28"
    >
      {/* Ambient radial glow — adds depth to the stage without added noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 72% 42%, rgba(34,211,238,0.08) 0%, transparent 60%)",
        }}
      />

      <Shell className="relative flex flex-1 min-h-0 flex-col">
        {/* 2-column editorial grid.
            LEFT column: sticky stacked content — eyebrow, heading, description,
                        active-mode detail (number + name + body with word reveal),
                        mode selector as big list rows.
            RIGHT column: big centered image hero with chips + lines + target
                         markers. No framed panel — the image floats in the
                         section background. */}
        <div className="grid flex-1 min-h-0 gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          {/* LEFT — editorial content */}
          <AnimateIn className="flex min-h-0 flex-col">
            <h2 className="heading-lg">
              HYBRID<br />ENERGY MANAGEMENT
            </h2>

            {/* Mode selector — vertical list, each row is a big clickable
                target with number + name + tagline. Active row has a filled
                left bar and brighter text. Reads as a table of contents. */}
            <div
              role="tablist"
              aria-label="Operating mode"
              className="mt-6 flex flex-col md:mt-8"
            >
              {MODES.map((m) => {
                const isActive = m.id === active;
                return (
                  <button
                    key={m.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(m.id)}
                    className={`group relative flex items-center gap-4 border-b border-white/10 py-3 text-left transition-colors last:border-b-0 ${
                      isActive ? "text-white" : "text-white/55 hover:text-white/85"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-gradient-to-b from-cyan-400 to-emerald-300 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="pl-3 font-display text-xs font-medium tracking-[0.22em] text-white/40">
                      {m.num}
                    </span>
                    <span className="font-display text-base font-semibold md:text-lg">
                      {m.label}
                    </span>
                    <span className="ml-auto text-[11px] text-white/40 md:text-xs">
                      {m.tagline}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active mode description — plain paragraph, swaps on tab change */}
            <p
              key={activeMode.id}
              className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:mt-8 md:text-base"
            >
              {activeMode.body}
            </p>
          </AnimateIn>

          {/* RIGHT — big image hero. No frame, just the image floating in
              the section bg. Chips + lines + targets anchored to an inner
              aspect-locked box that matches the image bounds. */}
          <div className="relative flex min-h-0 items-center justify-center">
            <div className="relative aspect-[16/11] h-full max-h-full w-full max-w-[720px]">
              <img
                src="/images/Hybrid-energy.png"
                alt="SOURCE hybrid energy management diagram"
                className="absolute inset-0 h-full w-full object-contain"
              />

              {/* Per-mode overlay — crossfades on mode change */}
              {MODES.map((m) => (
                <div
                  key={m.id}
                  aria-hidden={m.id !== active}
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
                  style={{ opacity: m.id === active ? 1 : 0 }}
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {m.metrics.map((chip, i) => (
                      <line
                        key={i}
                        x1={chip.line.x1}
                        y1={chip.line.y1}
                        x2={chip.line.x2}
                        y2={chip.line.y2}
                        stroke={chip.dotHex}
                        strokeOpacity="0.55"
                        strokeWidth="0.3"
                        strokeDasharray="1.2 0.8"
                        strokeLinecap="round"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="-4"
                          dur="1.4s"
                          repeatCount="indefinite"
                        />
                      </line>
                    ))}
                  </svg>

                  {m.metrics.map((chip, i) => (
                    <span
                      key={`t-${i}`}
                      className="absolute flex h-2 w-2 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${chip.line.x2}%`, top: `${chip.line.y2}%` }}
                    >
                      <span
                        className="absolute inset-0 animate-ping rounded-full opacity-70"
                        style={{ background: chip.dotHex, animationDelay: `${i * 300}ms` }}
                      />
                      <span
                        className="relative h-2 w-2 rounded-full"
                        style={{ background: chip.dotHex, boxShadow: `0 0 8px ${chip.dotHex}` }}
                      />
                    </span>
                  ))}

                  {m.metrics.map((chip, i) => (
                    <div
                      key={`c-${i}`}
                      className={`absolute ${chip.pos} rounded-md border border-white/15 bg-black/60 px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md`}
                      style={{
                        transform: m.id === active ? "translateY(0)" : "translateY(6px)",
                        transition: "transform 500ms ease-out",
                        transitionDelay: `${i * 60}ms`,
                        pointerEvents: m.id === active ? "auto" : "none",
                      }}
                    >
                      <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">
                        {chip.label}
                      </div>
                      <div className={`mt-0.5 text-xs font-semibold md:text-sm ${chip.accent}`}>
                        {chip.value}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function KeyFeatures() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-kf-image]", { autoAlpha: 0, scale: 0.94 });
      gsap.set("[data-kf-item]", { autoAlpha: 0, y: 24 });

      // Pinned timeline — reveals image + all feature items in sequence while
      // scroll is held. Pin releases only after the last item is revealed,
      // then the page scrolls into the next section naturally.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to("[data-kf-image]", { autoAlpha: 1, scale: 1, duration: 0.6 }, 0)
        .to(
          "[data-kf-item]",
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.15 },
          0.3
        );
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
      className="relative flex min-h-screen w-full flex-col overflow-hidden pb-10 pt-28 md:pb-16 md:pt-32"
    >
      {/* Ambient spotlight — matches Figma's dark-with-highlight look */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 72% 50%, rgba(255,255,255,0.07) 0%, transparent 60%), #0d0d0d",
        }}
      />

      <div className="relative">
        <Shell>
          <div data-kf-header className="text-center">
            <h2 className="heading-lg">KEY FEATURES</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              Advanced technologies engineered to maximise efficiency, reliability, and intelligent energy management.
            </p>
          </div>

          {/* Surround layout: 3 features on left, product image in centre, 3 on right.
              On mobile collapses to a 2-col icon grid above the image. */}
          <div className="mt-8 md:mt-10">
            {/* Mobile: 2-col grid then image */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:hidden">
              {KEY_FEATURES.map((f) => (
                <div key={f.title} data-kf-item className="flex flex-col items-center text-center">
                  <span className="grid h-8 w-8 place-items-center text-white">{f.icon}</span>
                  <h3 className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    {f.title}
                  </h3>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center md:hidden">
              <img
                src="/images/source-product2.png"
                alt="SOURCE product render"
                className="max-h-[380px] w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Desktop: [left column] [image] [right column] */}
            <div className="hidden items-center gap-8 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-12 lg:gap-20">
              {/* Left column — features 0, 1, 2 (right-aligned) */}
              <div className="flex flex-col items-end gap-10 lg:gap-14">
                {KEY_FEATURES.slice(0, 3).map((f) => (
                  <div key={f.title} data-kf-item className="flex flex-col items-center text-center">
                    <span className="grid h-10 w-10 place-items-center text-white">{f.icon}</span>
                    <h3 className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      {f.title}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Product image in the middle */}
              <div data-kf-image className="flex justify-center">
                <img
                  src="/images/source-product2.png"
                  alt="SOURCE product render"
                  className="max-h-[340px] w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] lg:max-h-[400px]"
                />
              </div>

              {/* Right column — features 3, 4, 5 (left-aligned) */}
              <div className="flex flex-col items-start gap-10 lg:gap-14">
                {KEY_FEATURES.slice(3, 6).map((f) => (
                  <div key={f.title} data-kf-item className="flex flex-col items-center text-center">
                    <span className="grid h-10 w-10 place-items-center text-white">{f.icon}</span>
                    <h3 className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      {f.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Shell>
      </div>
    </section>
  );
}

function SmartFeatures() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Section header — fires on first entry, independent of the pinned
      // timeline so the eyebrow + title are visible immediately.
      gsap.from("[data-smart-eyebrow], [data-smart-heading], [data-smart-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });

      // Pre-set the chart line's dash so it starts hidden before the pin
      // begins (avoids a flash of the fully-drawn line).
      const lines = gsap.utils.toArray<SVGPathElement>("[data-chart-line]");
      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      });

      // MASTER TIMELINE — scrubbed to scroll, no pin.
      // Full card sequence plays through within a single scroll gesture
      // (~1 viewport of scroll). Animations themselves are unchanged;
      // only the trigger strategy (removed pin, tightened end) differs.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          end: "+=100%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Walk through each card in DOM order. For each: reveal the card,
      // then animate any inner elements it contains. Reserve a fixed
      // "slot" of timeline time per card so the sequence is predictable.
      const cards = gsap.utils.toArray<HTMLElement>("[data-smart-card]");
      const SLOT = 1.2; // seconds of timeline per card

      cards.forEach((card, i) => {
        const cardAt = i * SLOT;
        const innerAt = cardAt + 0.5; // inner animations start after reveal

        // 1. Card reveal
        tl.from(
          card,
          {
            autoAlpha: 0,
            y: 60,
            scale: 0.92,
            duration: 0.5,
          },
          cardAt
        );

        // 2. Inner animations — scoped to this card only
        const metallicNum = card.querySelector("[data-metallic-num]");
        if (metallicNum) {
          tl.from(
            metallicNum,
            {
              autoAlpha: 0,
              scale: 0.6,
              duration: 0.45,
              ease: "back.out(1.6)",
            },
            innerAt
          );
        }

        const aiBlock = card.querySelector("[data-ai-block]");
        if (aiBlock) {
          tl.from(
            aiBlock,
            {
              autoAlpha: 0,
              scale: 0.7,
              rotate: -4,
              duration: 0.5,
              ease: "back.out(1.6)",
            },
            innerAt
          );

          const cardSparkles = card.querySelectorAll("[data-sparkle]");
          if (cardSparkles.length) {
            tl.from(
              cardSparkles,
              {
                autoAlpha: 0,
                scale: 0,
                duration: 0.35,
                stagger: 0.08,
                ease: "back.out(2)",
              },
              innerAt + 0.2
            );
          }
        }

        const cardLines = card.querySelectorAll("[data-chart-line]");
        cardLines.forEach((line) => {
          tl.to(
            line,
            {
              strokeDashoffset: 0,
              duration: 1.8,
              ease: "power2.inOut",
            },
            innerAt
          );
        });

        const cardAreas = card.querySelectorAll("[data-chart-area]");
        if (cardAreas.length) {
          tl.from(
            cardAreas,
            {
              autoAlpha: 0,
              duration: 1.2,
            },
            innerAt + 0.6
          );
        }

        const cardDots = card.querySelectorAll("[data-chart-dot]");
        if (cardDots.length) {
          tl.from(
            cardDots,
            {
              autoAlpha: 0,
              scale: 0,
              transformOrigin: "center",
              duration: 0.4,
              stagger: 0.15,
              ease: "back.out(2)",
            },
            innerAt + 1.3
          );
        }

        // Captions live inside cards with metallic numbers or AI block —
        // fade them up last, so the reader sees the big visual first.
        const caption = card.querySelector("[data-caption]");
        if (caption) {
          tl.from(
            caption,
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.35,
              ease: "power2.out",
            },
            innerAt + 0.35
          );
        }
      });

      // Sparkle twinkle loop — runs independently of the scrubbed timeline
      // so they keep shimmering after the pin releases.
      const allSparkles = gsap.utils.toArray<HTMLElement>("[data-sparkle]");
      allSparkles.forEach((el, i) => {
        gsap.to(el, {
          scale: 1.25,
          rotate: 25,
          opacity: 0.55,
          duration: 1.2 + i * 0.15,
          delay: i * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
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
      className="flex min-h-screen w-full flex-col justify-start overflow-hidden pb-6 pt-24 md:pb-10 md:pt-28"
    >
      <Shell>
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-start md:gap-12">
          <div>
            <h2 data-smart-heading className="heading-lg">SMART FEATURES</h2>
          </div>
          <p
            data-smart-sub
            className="max-w-md text-sm leading-relaxed text-white/70 md:ml-auto md:text-left md:text-base"
          >
            Advanced technologies engineered to maximize efficiency, reliability, and intelligent energy management.
          </p>
        </div>

        <div
          data-smart-grid
          className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-6 md:[grid-template-rows:200px_360px_200px]"
        >
          {/* Row 1 col 1 — tall Smart Appliance (image, spans rows 1–2) */}
          <SmartCard className="h-[360px] md:h-[584px] md:row-span-2">
            <ImageVisual
              src="/images/Source-smartappliance.png"
              title="SMART APPLIANCE"
              subtitle="PRIORITY SWITCHING"
              alignTitle="top"
              titlePadClass="pt-8 md:pt-10"
              objectPosition="60% 100%"
            />
          </SmartCard>

          {/* Row 1 col 2 — 24/7 */}
          <SmartCard>
            <TwentyFourSevenVisual />
          </SmartCard>

          {/* Row 1 col 3 — Grid Usage chart */}
          <SmartCard>
            <GridUsageVisual />
          </SmartCard>

          {/* Row 2 col 2 — Adaptive Charging (title top center, image centered, rays background) */}
          <SmartCard>
            {/* Background rays */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Source-rays.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            {/* Foreground content */}
            <div className="relative h-full w-full">
              <ImageVisual
                src="/images/source-adapti.png"
                title="ADAPTIVE"
                subtitle="CHARGING"
                alignTitle="top"
                titlePadClass="pt-6 md:pt-8"
                objectPosition="center center"
              />
            </div>
          </SmartCard>

          {/* Row 2 col 3 — AI Optimization Logic */}
          <SmartCard>
            <AiVisual />
          </SmartCard>

          {/* Row 3 col 1 — 10 Years Warranty */}
          <SmartCard>
            <WarrantyVisual />
          </SmartCard>

          {/* Row 3 col 2 — Real-Time Energy Monitoring (image + text side by side) */}
          <SmartCard>
            <div className="flex h-full w-full items-stretch">
              {/* Image on the left — flush with the card bottom, scaled larger */}
              <div className="relative h-full flex-[1.7]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Source-real-time.png"
                  alt="Real-Time Energy Monitoring"
                  className="absolute inset-0 h-full w-full translate-x-6 origin-bottom-right scale-125 object-contain object-right-bottom md:translate-x-10"
                />
              </div>
              {/* Title on the right — left-aligned so it sits close to the image */}
              <div className="flex flex-[0.5] items-center pl-0 pr-4 text-left md:pr-5">
                <div>
                  <p className="font-display text-base font-semibold uppercase leading-tight tracking-wide text-white md:text-lg">
                    REAL-TIME ENERGY
                  </p>
                  <p className="font-display text-base font-semibold uppercase leading-tight tracking-wide text-white md:text-lg">
                    MONITORING
                  </p>
                </div>
              </div>
            </div>
          </SmartCard>

          {/* Row 3 col 3 — Touchless Clean Tech (title top center, image attached to left edge) */}
          <SmartCard>
            <div className="flex h-full w-full flex-col">
              <div className="shrink-0 px-6 pt-6 text-center md:pt-8">
                <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
                  TOUCHLESS
                </p>
                <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
                  CLEAN TECH
                </p>
              </div>
              <div className="relative min-h-0 flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Source-Solar-panel-cleaning-machine.png"
                  alt="Touchless Clean Tech"
                  className="absolute bottom-0 left-0 h-[115%] w-auto max-w-none object-contain object-left-bottom"
                />
              </div>
            </div>
          </SmartCard>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Smart Features — card shell + individual visuals
// ---------------------------------------------------------------------------

function SmartCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-smart-card
      className={`relative h-[200px] overflow-hidden rounded-card bg-bg-card md:h-auto ${className}`}
    >
      {children}
    </div>
  );
}

function ImageVisual({
  src,
  title,
  subtitle,
  alignTitle = "top",
  titlePadClass = "pt-6 md:pt-8",
  objectPosition = "center bottom",
}: {
  src: string;
  title: string;
  subtitle?: string;
  alignTitle?: "top" | "bottom";
  /** Tailwind class for the title strip's outer padding (top for `top`, bottom for `bottom`). */
  titlePadClass?: string;
  /** CSS `object-position` value for the image. */
  objectPosition?: string;
}) {
  const isTop = alignTitle === "top";
  return (
    <div className="flex h-full w-full flex-col">
      {isTop && (
        <div className={`shrink-0 px-6 text-center ${titlePadClass}`}>
          <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
            {title}
          </p>
          {subtitle && (
            <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="relative min-h-0 flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          className="absolute inset-0 h-full w-full object-contain px-4 pt-4 md:px-6 md:pt-6"
          style={{ objectPosition }}
        />
      </div>
      {!isTop && (
        <div className={`shrink-0 px-6 text-center ${titlePadClass}`}>
          <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
            {title}
          </p>
          {subtitle && (
            <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TwentyFourSevenVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between px-6 pt-8 pb-6 md:pt-10 md:pb-8">
      <span
        data-metallic-num
        className="text-[5rem] font-bold leading-none tracking-tight md:text-[7rem]"
        style={{
          fontFamily: "'TT Supermolot Neue', 'TT Supermolot Neue Trl', sans-serif",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        24/7
      </span>
      <p data-caption className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 md:text-sm">
        Power Availability
      </p>
    </div>
  );
}

function GridUsageVisual() {
  return (
    <div className="relative flex h-full w-full flex-col px-5 py-4 md:px-6 md:py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white md:text-sm">
        Grid Usage
      </p>

      {/* Chart area */}
      <div className="relative mt-2 flex-1">
        {/* Right-side badges */}
        <div className="absolute right-0 top-0 text-right text-[10px] leading-tight text-white/60">
          <div>Imported</div>
          <div className="font-medium text-white">4 kW</div>
        </div>
        <div className="absolute bottom-6 right-0 text-right text-[10px] leading-tight text-white/60">
          <div>Exported</div>
          <div className="font-medium text-white">4 kW</div>
        </div>

        {/* Y-axis labels (left) */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-between py-1 text-[9px] text-white/40">
          <span>4 kW</span>
          <span>2 kW</span>
          <span>0 kW</span>
          <span>2 kW</span>
          <span>4 kW</span>
        </div>

        {/* Chart SVG — from left-8 to right-14 so labels don't overlap */}
        <div className="absolute inset-y-0 left-8 right-14 bottom-6">
          <svg viewBox="0 0 200 100" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gu-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(251,191,36,0.55)" />
                <stop offset="100%" stopColor="rgba(251,191,36,0)" />
              </linearGradient>
              <linearGradient id="gu-blue" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="rgba(59,130,246,0.5)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </linearGradient>
            </defs>
            {/* 0-line */}
            <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

            {/* Import area (above zero) */}
            <path
              data-chart-area
              d="M0,45 L30,10 L60,50 L60,50 L0,50 Z"
              fill="url(#gu-gold)"
            />
            {/* Export area (below zero) */}
            <path
              data-chart-area
              d="M60,50 L110,50 L140,85 L200,60 L200,50 Z"
              fill="url(#gu-blue)"
            />

            {/* Chart line */}
            <path
              data-chart-line
              d="M0,45 L30,10 L60,50 L110,50 L140,85 L200,60"
              fill="none"
              stroke="rgba(96,165,250,0.9)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {[
              { x: 30, y: 10 },
              { x: 60, y: 50 },
              { x: 110, y: 50 },
              { x: 140, y: 85 },
              { x: 200, y: 60 },
            ].map((p, i) => (
              <circle data-chart-dot key={i} cx={p.x} cy={p.y} r="1.5" fill="#60a5fa" />
            ))}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="absolute inset-x-8 bottom-0 flex justify-between text-[9px] text-white/40">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>
    </div>
  );
}

function AiVisual() {
  // Gradient tuned to match Figma: pink hits only top-left, teal dominates the rest.
  const AI_GRADIENT =
    "linear-gradient(135deg, #ff4bb8 0%, #c65cff 22%, #22d3ee 55%, #5eead4 100%)";

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6 py-6">
      {/* Sparkles — smoother 4-point twinkles, sized/placed to match Figma */}
      <Sparkle className="absolute left-[18%] top-[20%] h-7 w-7 text-fuchsia-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.55)]" />
      <Sparkle className="absolute right-[22%] top-[14%] h-9 w-9 text-pink-300 drop-shadow-[0_0_14px_rgba(249,168,212,0.6)]" />
      <Sparkle className="absolute right-[16%] top-[46%] h-4 w-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.55)]" />
      <Sparkle className="absolute left-[30%] bottom-[28%] h-3 w-3 text-cyan-200/80" />

      {/* AI block — gradient border via padded wrapper (crisper than border-image) */}
      <div
        data-ai-block
        className="relative mt-8 rounded-[16px] p-[2px] md:mt-12"
        style={{ background: AI_GRADIENT }}
      >
        <div className="rounded-[18px] bg-bg-card px-6 py-2 md:px-8 md:py-3">
          <span
            className="font-display text-[3rem] font-bold leading-none tracking-tight md:text-[4.5rem]"
            style={{
              background: AI_GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI
          </span>
        </div>
      </div>

      <p data-caption className="mt-20 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 md:mt-24 md:text-sm">
        AI Optimization Logic
      </p>
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  // Claude-style 4-point twinkle: curved concave sides for a soft glint.
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
    </svg>
  );
}

function WarrantyVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 py-6">
      <span
        data-metallic-num
        className="font-display text-[6rem] font-bold leading-none tracking-tight md:text-[8rem]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        10
      </span>
      <p data-caption className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-white md:text-base">
        Years Warranty
      </p>
    </div>
  );
}


function TechnicalSpecifications() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const summaries: Record<string, string> = {
    "Inverter Module": "6 kW • 230 V AC",
    "Battery Module": "6.5 kWh • LiFePO₄",
    General: "65 kg • 930 × 485 × 200 mm",
  };

  return (
    <section className="bg-white py-16 text-black md:py-24">
      <Shell>
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          {/* Left column — title, description, CTA */}
          <div className="md:sticky md:top-28 md:self-start">
            <AnimateIn>
              <h2 className="heading-lg text-black">Technical details</h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
                Every SOURCE unit is engineered to IEC standards and shipped with a full datasheet — inverter, battery,
                and system specs, one document.
              </p>
            </AnimateIn>
          </div>

          {/* Right column — accordion list */}
          <div className="divide-y divide-black/10 border-y border-black/10">
            {SPECS.map((group, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={group.group}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-black/70"
                  >
                    <span className={`text-lg md:text-xl ${isOpen ? "font-semibold text-black" : "font-medium text-black"}`}>
                      {group.group}
                    </span>
                    <span className="flex items-center gap-6">
                      <span className="hidden text-xs uppercase tracking-widest text-black/50 md:inline">
                        {summaries[group.group] ?? ""}
                      </span>
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-full border transition ${
                          isOpen ? "border-black bg-black text-white" : "border-black/20 text-black"
                        }`}
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                          <path d="M12 5v14" style={{ transition: "transform 0.3s", transform: isOpen ? "scaleY(0)" : "scaleY(1)", transformOrigin: "center" }} />
                          <path d="M5 12h14" />
                        </svg>
                      </span>
                    </span>
                  </button>

                  {/* Details */}
                  <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0">
                      <dl className="divide-y divide-black/10 pb-6">
                        {group.rows.map(([k, v]) => (
                          <div key={k} className="grid grid-cols-1 gap-2 py-3 md:grid-cols-[1fr_1fr] md:gap-8">
                            <dt className="text-sm text-black/60">{k}</dt>
                            <dd className="text-sm text-black">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Shell>
    </section>
  );
}

function ModelDimensionsAndResources() {
  return (
    <section className="bg-white pb-20 pt-16 text-black md:pb-28 md:pt-24">
      <Shell>
        {/* Model Dimensions — two-column layout matching Technical Details */}
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="heading-lg text-black">Model dimensions</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
              Compact enough for any wall, engineered to fit in tight installations. Front and side profiles with
              exact dimensions.
            </p>
          </div>

          <div className="flex items-center justify-center border-y border-black/10 py-10 md:py-16">
            <img
              src="/images/Model-dimensions.png"
              alt="SOURCE model dimensions — front and side views"
              className="max-h-[560px] w-auto object-contain"
            />
          </div>
        </div>

        {/* Resources — same two-column layout */}
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="heading-lg text-black">Resources</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
              Learning material, warranty policy, and datasheets — everything you need to plan, install, and support a
              SOURCE deployment.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex flex-row-reverse items-center gap-3 rounded border border-black/20 bg-transparent py-1 pl-1 pr-4 font-display text-sm font-medium text-black transition-all duration-300 ease-out hover:flex-row hover:border-black hover:bg-black hover:pl-4 hover:pr-1 hover:text-white"
            >
              Request a Quote
              <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-black text-white transition-colors duration-300 ease-out group-hover:bg-white group-hover:text-black">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {[
              { label: "Learning Center", href: "/learning-center" },
              { label: "Warranty", href: "/warranty" },
              { label: "Download Manuals", href: "/manuals" },
            ].map((r) => (
              <Link
                key={r.label}
                href={r.href}
                className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-black/60"
              >
                <span className="text-lg font-medium text-black md:text-xl">{r.label}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-black/20 text-black transition group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

const REMOTE_TABS: Array<{
  id: string;
  label: string;
  image: string;
  body: string;
}> = [
  {
    id: "remote-control",
    label: "Remote Control",
    image: "/images/Source-remotecontrol.png",
    body:
      "The SOURCE app allows users to remotely monitor and control system performance from anywhere. Users can manage modes, review system status, and respond quickly to alerts through an intuitive interface.",
  },
  {
    id: "inverter-modes",
    label: "Inverter Modes",
    image: "/images/Source-Invertermodes.png",
    body:
      "Users can select operating modes based on their needs — Eco Mode for maximum energy savings, Backup Mode for uninterrupted power to critical loads, and Performance Mode for high-demand applications.",
  },
  {
    id: "alerts-diagnostics",
    label: "Alerts & Diagnostics",
    image: "/images/Source-Aletrs&Diagnostic.png",
    body:
      "Real-time alerts and diagnostic insights keep users informed about system health, faults, and performance issues — enabling quick action and preventive maintenance.",
  },
  {
    id: "grid-insights",
    label: "Grid Insights",
    image: "/images/Source-GridInsights.png",
    body:
      "SOURCE provides visibility into grid behavior, including availability, outages, and dependency trends — helping users understand and manage their energy usage more effectively.",
  },
  {
    id: "savings-rewards",
    label: "Savings & Rewards",
    image: "/images/Source-Savings.png",
    body:
      "The platform tracks energy savings achieved through solar utilization and optimized energy management. Users gain clear insights into cost reductions, efficiency improvements, carbon footprint reduced, and long-term benefits.",
  },
];

function RemoteControl() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-28"
    >
      <Shell>
        {/* Header — compact */}
        <div className="text-center">
          <h2 className="heading-lg">Monitoring & App Ecosystem</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/60 md:text-[15px]">
            Five tools to monitor, tune, and understand every watt flowing through your home — from anywhere.
          </p>
        </div>

        {/* Content — natural height, no min-h/flex-1 since pin is removed */}
        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:items-center md:gap-14 lg:gap-20">
          {/* LEFT — tab list with inline description */}
          <div className="flex flex-col">
            {REMOTE_TABS.map((tab, i) => {
              const isActive = i === active;
              return (
                <div key={tab.id} className="border-b border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center justify-between gap-4 py-3 text-left md:py-3.5"
                  >
                    <span className="flex items-center gap-5">
                      <span
                        className={`font-display text-xs font-semibold tabular-nums tracking-wider transition-colors ${
                          isActive ? "text-white" : "text-white/30"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-base font-medium transition-colors md:text-lg ${
                          isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`h-px transition-all ${
                        isActive ? "w-10 bg-white" : "w-0 bg-white/0"
                      }`}
                    />
                  </button>

                  {/* Inline description — expands under the active row */}
                  <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0">
                      <p className="pb-4 pl-11 pr-4 text-xs leading-relaxed text-white/70 md:text-sm">
                        {tab.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT — phone image, capped so it never dominates the layout */}
          <div className="relative mx-auto flex h-full max-h-[520px] w-full items-center justify-center">
            {REMOTE_TABS.map((tab, i) => {
              const isActive = i === active;
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

function WhereSourceWorks() {
  const [active, setActive] = useState(0);
  // Pin removed — RemoteControl above already pins for +=80%, and two
  // consecutive full-viewport pins compound their pin-spacers which makes
  // the two sections visually overlap during the handoff. Section still
  // uses h-screen so the layout feels pinned-like as the user scrolls
  // through it.

  return (
    <section className="flex h-screen w-full flex-col overflow-hidden pb-8 pt-16 md:pb-12 md:pt-20">
      <Shell className="flex flex-1 min-h-0 flex-col">
        {/* Header — heading + description share the same left edge */}
        <AnimateIn className="max-w-3xl shrink-0 text-left">
          <h2 className="heading-lg">Where SOURCE works.</h2>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-white/70 md:text-sm">
            From homes and businesses to industrial facilities and remote locations, SOURCE delivers intelligent
            power management wherever it's needed.
          </p>
        </AnimateIn>

        {/* Content row — fills remaining viewport height */}
        <div className="mt-6 grid flex-1 min-h-0 gap-6 md:mt-8 md:grid-cols-[1.3fr_1fr] md:items-stretch md:gap-10">
          {/* Left — image fills column height, border hugs the actual image.
              Active <img> is relative so its intrinsic aspect drives width;
              inactive imgs sit absolutely centred for the cross-fade.
              Left-aligned (no mx-auto) so the card's left edge matches the
              heading's left edge above. */}
          <div className="flex min-h-0 flex-col">
            <div className="relative flex min-h-0 flex-1 items-center justify-start">
              {APPLICATIONS.map((a, i) => {
                const isActive = i === active;
                return (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={a.title}
                    src={a.image}
                    alt={a.title}
                    aria-hidden={!isActive}
                    className={`max-h-full max-w-full rounded-card border border-white/20 object-contain transition-opacity duration-500 ease-out ${
                      isActive
                        ? "relative h-full w-auto opacity-100"
                        : "pointer-events-none absolute inset-0 m-auto h-full w-auto opacity-0"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Right — accordion list: title row + collapsible description */}
          <div className="flex min-h-0 flex-col justify-center">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {APPLICATIONS.map((a, i) => {
                const isActive = i === active;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div key={a.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                      className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 py-3.5 text-left transition-colors md:py-4"
                    >
                      <span
                        className={`font-display text-xs tracking-[0.2em] transition-colors md:text-sm ${
                          isActive ? "text-white" : "text-white/40"
                        }`}
                      >
                        {num}
                      </span>
                      <span
                        className={`text-base font-semibold transition-colors md:text-lg ${
                          isActive ? "text-white" : "text-white/60 hover:text-white"
                        }`}
                      >
                        {a.title}
                      </span>
                      {/* Plus / minus toggle — the horizontal bar stays, the
                          vertical bar collapses when the row is active. */}
                      <span
                        aria-hidden
                        className={`relative grid h-7 w-7 place-items-center rounded-full border transition-all ${
                          isActive
                            ? "border-white bg-white text-black"
                            : "border-white/25 text-white/70"
                        }`}
                      >
                        <span className="relative block h-3 w-3">
                          <span className="absolute left-1/2 top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 bg-current" />
                          <span
                            className={`absolute left-1/2 top-1/2 h-full w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ${
                              isActive ? "scale-y-0" : "scale-y-100"
                            }`}
                          />
                        </span>
                      </span>
                    </button>

                    {/* Collapsible description */}
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0">
                        <p className="pb-5 pl-14 pr-4 text-xs leading-relaxed text-white/70 md:text-sm">
                          {a.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

const MONITORING_P1 =
  "Monitor, control, and optimize your energy ecosystem from anywhere with the SOURCE app. Gain real-time visibility into system performance, switch between Eco, Backup, and Performance modes, receive instant alerts and diagnostics, track grid behavior, and measure energy savings, cost reductions, and sustainability impact.";
const MONITORING_P2 =
  "Designed for homes, commercial facilities, small industries, and remote sites, SOURCE delivers intelligent energy management, reliable backup power, and operational efficiency across a wide range of applications.";
function MonitoringSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Simple fade-up on scroll into view — no pin, no scrub reveal.
      gsap.from(
        "[data-mon-image], [data-mon-heading], [data-mon-apps], [data-mon-p1], [data-mon-p2]",
        {
          autoAlpha: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Shell>
        {/* Phone mockups centred at the top */}
        <div data-mon-image className="flex items-center justify-center">
          <img
            src="/images/platsore-appstore.png"
            alt="SOURCE monitoring app on iPhone with QR code"
            className="max-h-[560px] w-auto object-contain"
          />
        </div>

        {/* Two-column layout below the image.
            Left column: heading + QR / app badges.
            Right column: two description paragraphs. */}
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:items-start md:gap-16">
          <div>
            <h2 data-mon-heading className="heading-lg">
              MONITORING, CONTROL<br />&amp; APPLICATIONS
            </h2>

            <div data-mon-apps className="mt-12 flex items-stretch gap-4 md:mt-16">
              {/* Two stacked store badges */}
              <div className="flex flex-1 flex-col gap-3 sm:flex-initial">
                <a
                  href="#"
                  className="inline-flex h-[52px] items-center gap-2 rounded-lg border border-white/15 bg-black px-4 text-white transition hover:border-white/30"
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden>
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[10px] text-white/70">Download on the</span>
                    <span className="text-sm font-semibold">App Store</span>
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex h-[52px] items-center gap-2 rounded-lg border border-white/15 bg-black px-4 text-white transition hover:border-white/30"
                >
                  <img src="/icon/playstore.png" alt="" className="h-6 w-6 object-contain" aria-hidden />
                  <span className="flex flex-col leading-tight">
                    <span className="text-[10px] text-white/70">GET IT ON</span>
                    <span className="text-sm font-semibold">Google Play</span>
                  </span>
                </a>
              </div>

              {/* QR card — matches the full height of both badges + gap */}
              <div className="flex h-[116px] w-[116px] shrink-0 flex-col items-center justify-center rounded-lg border border-white/15 bg-white p-2">
                <img
                  src="/images/QRcode.png"
                  alt="Scan QR code to download the SOURCE app"
                  className="h-[72px] w-[72px] object-contain"
                />
                <p className="mt-1 text-center text-[8px] font-medium leading-tight text-black/70">Scan QR to download</p>
              </div>
            </div>
          </div>

          <div>
            <p
              data-mon-p1
              className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
            >
              {MONITORING_P1}
            </p>
            <p
              data-mon-p2
              className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
            >
              {MONITORING_P2}
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // When switching from one open item to another, close the current one
  // FIRST, let it fully collapse, then open the new one. If both animate
  // simultaneously the layout shifts chaotically and the new item visually
  // looks like it's opening from the wrong direction.
  // Also pins the clicked button's viewport Y across the full ~1 s window
  // so the question that was clicked stays put and the answer always
  // visibly expands downward from under it.
  const handleToggle = (i: number, button: HTMLButtonElement) => {
    const isSame = openIndex === i;
    const anchorY = button.getBoundingClientRect().top;

    if (isSame) {
      setOpenIndex(null);
    } else if (openIndex !== null) {
      // Close current, then open new after close animation finishes
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

  return (
    <section className="py-16 md:py-24">
      <Shell>
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr_0.8fr] md:gap-14">
          {/* Left column — big heading + description */}
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="heading-lg">FREQUENTLY ASKED QUESTIONS</h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70 md:text-base">
              Straightforward answers, so you can move forward with confidence.
            </p>
          </div>

          {/* Middle column — accordion list */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div key={item.q}>
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
                    {/* Plus / minus toggle — horizontal bar stays, vertical bar
                        collapses when the row is open. */}
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition ${
                        isOpen ? "border-white bg-white text-black" : "border-white/25 text-white/70"
                      }`}
                      aria-hidden
                    >
                      <span className="relative block h-3 w-3">
                        <span className="absolute left-1/2 top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 bg-current" />
                        <span
                          className={`absolute left-1/2 top-1/2 h-full w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ${
                            isOpen ? "scale-y-0" : "scale-y-100"
                          }`}
                        />
                      </span>
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-[max-height] duration-500 ease-out"
                    style={{ maxHeight: isOpen ? "500px" : "0px" }}
                  >
                    <div className="grid grid-cols-[auto_1fr_auto] gap-6 pb-6">
                      <span aria-hidden />
                      <p className="text-xs leading-relaxed text-white/70 md:text-sm">{item.a}</p>
                      <span aria-hidden />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column — help block */}
          <div className="md:sticky md:top-28 md:self-start">
            <p className="text-sm leading-relaxed text-white/70 md:text-base">
              Still have questions? Our team is here to help.
            </p>
            <Link
              href="mailto:contact@amectechnology.com"
              className="group mt-4 inline-flex items-center gap-2 rounded border border-white/25 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              Email us
            </Link>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function ClosingCTA() {
  const pinRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const pinTarget = pinRef.current;
    if (!pinTarget) return;

    const ctx = gsap.context(() => {
      // Set initial hidden state for everything that reveals during the pin.
      gsap.set("[data-closing-card]", { autoAlpha: 0, y: 80 });
      gsap.set(
        [
          "[data-closing-heading]",
          "[data-closing-sub]",
          "[data-closing-cta]",
        ],
        { autoAlpha: 0, y: 30 }
      );
      gsap.set("[data-closing-bg]", { scale: 1.02 });

      // One scrubbed timeline tied to the pin range — as user scrolls through
      // the pinned section, the reveal progresses stage by stage.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTarget,
          start: "top top",
          end: "+=150%",
          pin: pinTarget,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
        },
      });

      tl.to("[data-closing-bg]", { scale: 1.1, ease: "none" }, 0);
      tl.to(
        "[data-closing-card]",
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.05
      );
      tl.to(
        "[data-closing-heading]",
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
        0.3
      );
      tl.to(
        "[data-closing-sub]",
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" },
        0.45
      );
      tl.to(
        "[data-closing-cta]",
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" },
        0.55
      );
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
      className="relative flex h-screen w-full items-end overflow-hidden bg-black"
    >
      {/* Full-bleed background image with subtle zoom */}
      <div
        data-closing-bg
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%), url('/images/Card.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0f0f0f",
        }}
      />

      {/* Glass card overlay near the bottom */}
      <div className="relative w-full px-6 pb-14 md:px-14 md:pb-20">
        <div
          data-closing-card
          className="mx-auto max-w-[1400px] rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-2xl md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-[1.4fr_auto] md:items-center md:gap-12">
            <div>
              <h2 data-closing-heading className="heading-xl normal-case">
                Smart Solar Energy System
              </h2>
              <p data-closing-sub className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                Seamlessly manage solar, grid, and battery power for maximum efficiency and uninterrupted energy.
              </p>
            </div>
            <div data-closing-cta className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 font-display text-sm font-medium text-black transition hover:bg-white/90 md:text-base"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 font-display text-sm font-medium text-white transition hover:bg-black/80 md:text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

