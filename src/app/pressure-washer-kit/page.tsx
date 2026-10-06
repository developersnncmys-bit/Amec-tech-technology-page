"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const HERO_STATS: Array<{
  topLabel: string;
  value: string;
  bottomLabel: string;
  icon: React.ReactNode;
}> = [
  {
    topLabel: "Battery",
    value: "3 HRS",
    bottomLabel: "Continuous Use",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="7" width="16" height="10" rx="2" />
        <path d="M22 11v2" />
        <path d="M6 10v4M10 10v4M14 10v4" />
      </svg>
    ),
  },
  {
    topLabel: "Pressure",
    value: "HIGH",
    bottomLabel: "Pressure Pump",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 8h11a3 3 0 1 0-3-3" />
        <path d="M3 16h14a3 3 0 1 1-3 3" />
        <path d="M3 12h18" />
        <path d="m4 4 16 16" />
      </svg>
    ),
  },
  {
    topLabel: "Power",
    value: "0",
    bottomLabel: "Sockets Needed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 2v4M15 2v4" />
        <path d="M7 6h10v6a5 5 0 0 1-10 0V6Z" />
        <path d="M12 17v5" />
      </svg>
    ),
  },
  {
    topLabel: "Cordless",
    value: "100%",
    bottomLabel: "Wireless",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76Z" />
        <path d="M16 8 2 22" />
        <path d="M17.5 15H9" />
      </svg>
    ),
  },
];

const USE_CASE_IMAGES = [
  { src: "/Pressure-washerkit/Prof-cleaning2.png", alt: "Pressure washer in action — motorcycle cleaning" },
  { src: "/Pressure-washerkit/Prof-cleaning1.png", alt: "Pressure washer in action — car cleaning" },
];

// Icons for the Engineered for Ultimate Performance tiles — match Figma glyphs
const PerfBatteryIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="7" width="16" height="10" rx="2" />
    <path d="M22 11v2" />
    <path d="M6 10v4M10 10v4M14 10v4" />
  </svg>
);
const PerfActivityIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 12h4l2-7 4 14 2-7h6" />
  </svg>
);
const PerfPlugSlashIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 2v4M15 2v4" />
    <path d="M7 6h10v6a5 5 0 0 1-10 0V6Z" />
    <path d="M12 17v5" />
    <path d="m3 3 18 18" />
  </svg>
);
const PerfArrowUpIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 20V4" />
    <path d="m6 10 6-6 6 6" />
  </svg>
);
const PerfChipIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4 7l2 2M18 15l2 2M4 17l2-2M18 9l2-2" />
  </svg>
);
const PerfMedalIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="10" r="5" />
    <path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" />
  </svg>
);
const PerfSunIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4" />
  </svg>
);
const PerfRocketIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2 7 9v6l5 3 5-3V9l-5-7Z" />
    <path d="M9 15v4M15 15v4" />
  </svg>
);

const PERF_FEATURES_LEFT = [
  {
    title: "Powerful Battery Operation",
    body: "High-voltage lithium pack delivers sustained output through every wash cycle.",
    icon: PerfBatteryIcon,
  },
  {
    title: "3 Hours Continuous Use",
    body: "Up to 3 hours of continuous water flow for prolonged cleaning sessions.",
    icon: PerfActivityIcon,
  },
  {
    title: "No Power Socket Required",
    body: "Completely cordless operation — no reliance on wall-socket power.",
    icon: PerfPlugSlashIcon,
  },
  {
    title: "Cordless & Portable",
    body: "Grab, wheel out, and start washing. No cables, no setup.",
    icon: PerfArrowUpIcon,
  },
];

const PERF_FEATURES_RIGHT = [
  {
    title: "Built-In Pressure Pump",
    body: "Compact, built-in pressure pump delivers consistent high-pressure output.",
    icon: PerfChipIcon,
  },
  {
    title: "Vehicle Detailing Optimized",
    body: "Adjustable pressure for different jobs: wheels, paint, and light surfaces.",
    icon: PerfMedalIcon,
  },
  {
    title: "Zero Power Reliance",
    body: "Just add water. No power or outlet required for operation.",
    icon: PerfSunIcon,
  },
  {
    title: "Compact & Easy to Carry",
    body: "Snap-on-lock design, compact and lightweight for any site.",
    icon: PerfRocketIcon,
  },
];

const WASH_CHIPS = ["No Socket", "No Cables", "Just Fill", "Switch On", "Wash"];

const STEPS = [
  {
    id: "01",
    title: "Fill Water",
    body: "Submerge the filter hose in any clean water bucket.",
  },
  {
    id: "02",
    title: "Connect Hose",
    body: "Click the quick connector into the coupling securely.",
  },
  {
    id: "03",
    title: "Switch ON",
    body: "Press the trigger lock to start the pressure pump.",
  },
  {
    id: "04",
    title: "Start Washing",
    body: "Select your spray angle and sweep away the grit.",
  },
];

const USE_CASES = [
  {
    id: "car",
    label: "Car Washing",
    body: "Clean cars conveniently at home, parking areas, workshops or detailing locations.",
    image: "/Pressure-washerkit/Car-wash.png",
  },
  {
    id: "bike",
    label: "Bike Washing",
    body: "Remove mud, road grit, and chain grease from motorcycles and bicycles with targeted pressure that protects delicate seals.",
    image: "/Pressure-washerkit/Bike-wash.png",
  },
  {
    id: "home",
    label: "Home Users",
    body: "Power-wash patio tiles, stone steps, driveways, garden paths, and outdoor patio furniture with zero setup hassle.",
    image: "/Pressure-washerkit/Home-users.png",
  },
  {
    id: "garage",
    label: "Workshops & Garages",
    body: "A heavy-duty, portable washing companion for auto workshops, service bays, and professional vehicle detailing centers.",
    image: "/Pressure-washerkit/workshops&garages.png",
  },
  {
    id: "mobile",
    label: "Mobile Car Wash",
    body: "The perfect all-in-one washing setup for mobile detailers — compact, battery-powered, and siphons water from any onboard tank or container.",
    image: "/Pressure-washerkit/Mobile-car-wash.png",
  },
  {
    id: "remote",
    label: "Remote & Open Areas",
    body: "Wash off-road vehicles, trucks, and equipment anywhere off the grid — beside lakes, trailheads, campsites, or open farm fields.",
    image: "/Pressure-washerkit/Remote&Openareas.png",
  },
];

type ComparisonRow = { feature: string; conv: string; aqua: string };
const COMPARISON: ComparisonRow[] = [
  {
    feature: "Power Independence",
    conv: "Requires a 230V active AC plug socket.",
    aqua: "Cordless battery-driven operation.",
  },
  {
    feature: "Water Source Requirement",
    conv: "Strictly depends on active running garden tap.",
    aqua: "Siphons from buckets, tanks, or rivers easily.",
  },
  {
    feature: "Portability Factor",
    conv: "Heavy wheels, tangled wire, rigid setup.",
    aqua: "Featherweight composite handheld body.",
  },
  {
    feature: "Setup Time",
    conv: "Takes up to 10 minutes of layout setup.",
    aqua: "Instant snap-on lock. Cleans in 30 seconds.",
  },
  {
    feature: "Storage Footprint",
    conv: "Bulky frame occupies high closet space.",
    aqua: "Disassembles to a premium compact travel case.",
  },
  {
    feature: "Continuous Runtime",
    conv: "Continuous, but heavily tied down physically.",
    aqua: "Up to 3 hours with proprietary Lithium cells.",
  },
];

const MODULES: Array<{ title: string; body: string; icon: React.ReactNode }> = [
  {
    title: "Lithium-Ion Battery Pack",
    body:
      "Intelligent thermal vents and quick-charge support protect cell longevity.",
    // Battery with lightning bolt — matches Figma glyph
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-6 w-6">
        <rect x="2" y="7" width="14" height="10" rx="2" />
        <path d="M20 10v4h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1Z" />
        <path d="m10 9-2 3h2.5l-1.5 3 3-4H9.5l1.5-2Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Heavy-Duty DC Pump",
    body:
      "Forged alloy pistons deliver stable maximum fluid flow and zero corrosion risk.",
    // Settings gear/cog
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-6 w-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </svg>
    ),
  },
  {
    title: "Compact Water Tank Option",
    body:
      "Mount the onboard tank directly or drop the hose in any external vessel.",
    // Water droplet — filled teardrop
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-6 w-6">
        <path d="M12 2.5s7 7.5 7 12.5a7 7 0 0 1-14 0c0-5 7-12.5 7-12.5Z" />
      </svg>
    ),
  },
  {
    title: "Dynamic Power Control",
    body:
      "Manage motor speeds dynamically using the tactile dual-mode pressure trigger.",
    // Lightning bolt
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-6 w-6">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    body:
      "Cordless hone ka sabse bada advantage ye hai ki basement parking mein socket dhoondne ki tension nahi. Very lightweight, easy to carry, and the battery easily lasts for a full deep wash.",
    name: "Priya Nair",
    role: "Creta Owner, Bengaluru",
    avatar: "/Pressure-washerkit/Image (Priya Nair).png",
  },
  {
    body:
      "Weekend trail ride ke baad bike pe stubborn mud jam jata tha. The 1400 PSI pressure is seriously impressive — radiator ke delicate fins ko bina damage kiye saari mitti saaf kar deta hai. Normal pressure washer se double fast ho gaya hai.",
    name: "Vikram Reddy",
    role: "Auto Detailing Studio, Hyderabad",
    avatar: "/Pressure-washerkit/Image (Vikram Reddy).png",
  },
  {
    body:
      "Pehle Sunday car wash center pe 2 ghante line mein lagna padta tha. Ab ghar ke driveway pe 20 minutes mein complete DIY wash ho jata hai. Solid machine and powerful water throw!",
    name: "Aditya Singh",
    role: "Off-Road Enthusiast, Jaipur",
    avatar: "/Pressure-washerkit/Image (Aditya Singh).png",
  },
  {
    body:
      "Society mein water hose pipe allow nahi thi wash ke liye. Aquaforce is a lifesaver. Siphon pipe bucket mein daalo aur instantly powerful spray start. Balcony tiles aur car dono easily clean ho jaate hain.",
    name: "Sneha Kapoor",
    role: "Home & Garden, Delhi NCR",
    avatar: "/Pressure-washerkit/Image (Sneha Kapoor).png",
  },
  {
    body:
      "Bhai honestly, apartment parking mein car wash karna was always a headache. Aquaforce lene ke baad wire aur socket ka jhanjhat hi khatam! Ek bucket paani aur 15 mins mein car ekdum showroom clean.",
    name: "Rahul Sharma",
    role: "Car Enthusiast, Mumbai",
    avatar: "/Pressure-washerkit/Image (Rahul Sharma).png",
  },
  {
    body:
      "The 1400 PSI pressure rating is well calibrated for automotive paintwork. No swirl marks, high flow rate, and seamless cordless portability. Absolutely worth the investment.",
    name: "Karthik Rao",
    role: "Vehicle Care Expert, Chennai",
    avatar: "/Pressure-washerkit/Image (Karthik Rao).png",
  },
  {
    body:
      "Compact design is a huge plus point. I keep it in the car boot during road trips. Whenever needed, kisi bhi bucket ya container se connect karke instant wash kar lo. Very convenient!",
    name: "Ananya Rao",
    role: "Daily Commuter, Kochi",
    avatar: "/Pressure-washerkit/Image (Ananya Rao).png",
  },
  {
    body:
      "Fleet ke 20+ vehicles clean karne ke liye ye setup zabardast hai. Bina kisi power supply ke sab kuch handle ho raha hai. Operations cost significantly reduce ho gaya.",
    name: "Manoj Kumar",
    role: "Fortuner Owner, Chandigarh",
    avatar: "/Pressure-washerkit/Image (Manoj Kumar).png",
  },
];

// Explicit column distribution to match the Figma masonry — CSS columns
// balances items by height which breaks the design, so we hand-pick which
// testimonials live in each column.
const TESTIMONIAL_COLUMNS = [
  // Column 1 — short to medium cards
  [TESTIMONIALS[0], TESTIMONIALS[4]],
  // Column 2 — tallest column (Vikram's long card at top)
  [TESTIMONIALS[1], TESTIMONIALS[3], TESTIMONIALS[7]],
  // Column 3 — Aditya's shorter card at top, then Karthik, then Ananya
  [TESTIMONIALS[2], TESTIMONIALS[5], TESTIMONIALS[6]],
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PressureWasherKitPage() {
  return (
    <>
      <Hero />
      <StatsRow />
      <ProfessionalCleaning />
      <UseCaseImages />
      <UltimatePerformance />
      <WashWithoutLimits />
      <FourSteps />
      <DiscoverUseCase />
      <WhatMakesDifferent />
      <CompactModules />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

function Shell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1600px] px-6 md:px-14 ${className}`}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-pw-hero-image]", { autoAlpha: 0, scale: 1.08, duration: 1.2 })
        .from(
          "[data-pw-hero-title]",
          { autoAlpha: 0, y: 30, duration: 0.9 },
          "-=0.7"
        )
        .from(
          "[data-pw-hero-sub]",
          { autoAlpha: 0, y: 16, duration: 0.6 },
          "-=0.4"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-screen w-full items-center overflow-hidden bg-[#0a0a0a]"
    >
      <div data-pw-hero-image className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/Pressure-Washer-Kit-Hero.mp4"
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
              "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>

      <div className="relative w-full px-6 md:px-14">
        <div className="max-w-xl">
          <h1 data-pw-hero-title className="heading-xl">
            Pressure Washer Kit
          </h1>
          <p
            data-pw-hero-sub
            className="mt-5 text-sm leading-relaxed text-white/80 md:text-base"
          >
            Wash your car anywhere with the AMEC Aquaforce 1400 — a powerful,
            battery-powered portable pressure washer. No cables, no power
            sockets, no fixed setup needed.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Stats row — 3 HRS / 100 BAR / 100%
// ---------------------------------------------------------------------------

function StatsRow() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // One-by-one choreographed reveal — each stat's icon, labels, value fade
      // in sequentially before moving to the next stat.
      const stats = gsap.utils.toArray<HTMLElement>("[data-pw-stat]");
      stats.forEach((stat, i) => {
        const icon = stat.querySelector("[data-pw-stat-icon]");
        const topLabel = stat.querySelector("[data-pw-stat-top]");
        const value = stat.querySelector("[data-pw-stat-value]");
        const bottomLabel = stat.querySelector("[data-pw-stat-bottom]");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%" },
          defaults: { ease: "power3.out" },
          delay: i * 0.35,
        });

        if (icon) {
          tl.from(icon, {
            autoAlpha: 0,
            scale: 0.4,
            rotate: -30,
            duration: 0.5,
            ease: "back.out(2)",
          }, 0);
        }
        if (topLabel) {
          tl.from(topLabel, { autoAlpha: 0, y: -8, duration: 0.4 }, 0.1);
        }
        if (value) {
          tl.from(value, { autoAlpha: 0, y: 16, duration: 0.5 }, 0.2);
        }
        if (bottomLabel) {
          tl.from(bottomLabel, { autoAlpha: 0, y: 8, duration: 0.4 }, 0.3);
        }
      });
    }, el);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full border-y border-white/[0.06] py-12 md:py-16">
      <Shell>
        <div className="grid grid-cols-2 gap-y-10 text-center md:grid-cols-4 md:gap-6">
          {HERO_STATS.map((s) => (
            <div key={s.topLabel} data-pw-stat className="flex flex-col items-center">
              <span
                data-pw-stat-icon
                className="grid h-10 w-10 place-items-center text-white md:h-11 md:w-11"
              >
                <span className="h-6 w-6 md:h-7 md:w-7">{s.icon}</span>
              </span>
              <p
                data-pw-stat-top
                className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 md:text-[11px]"
              >
                {s.topLabel}
              </p>
              <p
                data-pw-stat-value
                className="mt-3 font-display text-2xl font-semibold text-white md:mt-4 md:text-3xl lg:text-4xl"
              >
                {s.value}
              </p>
              <p
                data-pw-stat-bottom
                className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 md:text-[11px]"
              >
                {s.bottomLabel}
              </p>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Professional Cleaning — 2-col text block
// ---------------------------------------------------------------------------

function ProfessionalCleaning() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-pc-heading], [data-pc-body]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pb-10 pt-20 md:pb-14 md:pt-24">
      <Shell>
        <div className="grid gap-10 md:grid-cols-[1.7fr_1fr] md:gap-6">
          <h2 data-pc-heading className="heading-lg">
            PROFESSIONAL CLEANING
            <br />
            NO POWER SOCKET NEEDED
          </h2>
          <p
            data-pc-body
            className="text-sm leading-relaxed text-white/65 md:text-base"
          >
            Traditional pressure washers require a continuous power connection,
            making it difficult to clean vehicles in open areas, parking lots,
            or locations without convenient electrical access. Aquaforce 1400
            changes that. Its integrated lithium-ion battery system powers the
            pressure pump, allowing you to carry this machine wherever you need
            it and start cleaning without connecting it to a power socket.
          </p>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Use-case image band — 3 lifestyle photos
// ---------------------------------------------------------------------------

function UseCaseImages() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-pw-usecase]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pb-16 pt-0 md:pb-20">
      <Shell>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.7fr_1fr] md:gap-6">
          {USE_CASE_IMAGES.map((img, i) => (
            <div
              key={i}
              data-pw-usecase
              className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-bg-card md:aspect-auto md:h-[300px] lg:h-[340px]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Engineered for Ultimate Performance — center product + features either side
// ---------------------------------------------------------------------------

function UltimatePerformance() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-up-heading], [data-up-sub]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-up-image]", { autoAlpha: 0, scale: 0.92 });
      gsap.set("[data-up-item-left]", { autoAlpha: 0, x: -30 });
      gsap.set("[data-up-item-right]", { autoAlpha: 0, x: 30 });

      // Stage 1 — heading, sub, and product image fire as the section enters.
      // Non-pinned, non-scrubbed: user keeps scrolling naturally.
      const stage1 = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
      stage1
        .to("[data-up-heading]", { autoAlpha: 1, y: 0, duration: 0.5 })
        .to("[data-up-sub]", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to("[data-up-image]", { autoAlpha: 1, scale: 1, duration: 0.7 }, "-=0.3");

      // Stage 2 — left/right feature points slide in once the grid is in view.
      // Trigger on the grid itself so this fires after stage 1 as the user
      // continues scrolling. Then the section ends and scroll continues normally.
      const grid = section.querySelector<HTMLElement>("[data-up-grid]");
      if (grid) {
        const stage2 = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: grid,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        const leftItems = gsap.utils.toArray<HTMLElement>("[data-up-item-left]");
        const rightItems = gsap.utils.toArray<HTMLElement>("[data-up-item-right]");
        leftItems.forEach((item, i) => {
          const at = i * 0.12;
          stage2.to(item, { autoAlpha: 1, x: 0, duration: 0.5 }, at);
          if (rightItems[i]) {
            stage2.to(rightItems[i], { autoAlpha: 1, x: 0, duration: 0.5 }, at);
          }
        });
      }
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
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden py-14 md:py-16"
    >
      <Shell>
        <div className="text-center">
          <h2 data-up-heading className="heading-lg">
            ENGINEERED FOR ULTIMATE PERFORMANCE
          </h2>
          <p
            data-up-sub
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            Explore the mechanical innovations that make cordless high-pressure
            cleaning a reality.
          </p>
        </div>

        <div data-up-grid className="mt-10 grid gap-8 md:mt-12 md:grid-cols-[1fr_1.1fr_1fr] md:items-center md:gap-8">
          {/* LEFT features — title/body right-aligned, icon on the far right */}
          <div className="flex flex-col gap-6 md:gap-7">
            {PERF_FEATURES_LEFT.map((f) => (
              <div
                key={f.title}
                data-up-item-left
                className="flex items-start justify-end gap-3 text-right md:gap-4"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-xs font-semibold uppercase tracking-wide text-white md:text-sm lg:text-base">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-white/60 md:text-xs lg:text-[13px]">
                    {f.body}
                  </p>
                </div>
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center text-white md:h-7 md:w-7">
                  <span className="h-full w-full">{f.icon}</span>
                </span>
              </div>
            ))}
          </div>

          {/* CENTER image — no card background, slightly smaller than before */}
          <div data-up-image className="relative mx-auto w-full">
            <div className="relative mx-auto h-[260px] w-full max-w-[280px] md:h-[320px] md:max-w-[320px] lg:h-[380px] lg:max-w-[360px]">
              <img
                src="/Pressure-washerkit/Frame.png"
                alt="Aquaforce 1400"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </div>

          {/* RIGHT features — icon on the far left, title/body left-aligned */}
          <div className="flex flex-col gap-6 md:gap-7">
            {PERF_FEATURES_RIGHT.map((f) => (
              <div
                key={f.title}
                data-up-item-right
                className="flex items-start gap-3 md:gap-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center text-white md:h-7 md:w-7">
                  <span className="h-full w-full">{f.icon}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xs font-semibold uppercase tracking-wide text-white md:text-sm lg:text-base">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-white/60 md:text-xs lg:text-[13px]">
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Wash Without Limits — 3-image band + chips
// ---------------------------------------------------------------------------

function WashWithoutLimits() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-wwl-image]", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-wwl-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-wwl-chip]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.3,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-20 md:py-28">
      <Shell>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.3fr_1fr] md:items-center md:gap-6">
          <div
            data-wwl-image
            className="relative aspect-[3/4] overflow-hidden rounded-xl bg-bg-card"
          >
            <img
              src="/Pressure-washerkit/product-image-left.png"
              alt="Person washing"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div data-wwl-heading className="text-center">
            <h2 className="heading-lg">
              WASH WITHOUT
              <br />
              LIMITS
            </h2>
            <p className="mt-4 font-display text-xs font-semibold uppercase tracking-[0.22em] text-white/60 md:text-sm">
              Aquaforce 1400
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:mt-8 md:gap-3">
              {WASH_CHIPS.map((c) => (
                <span
                  key={c}
                  data-wwl-chip
                  className="rounded-[4px] border border-white/15 bg-white/[0.03] px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 md:text-xs"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div
            data-wwl-image
            className="relative aspect-[3/4] overflow-hidden rounded-xl bg-bg-card"
          >
            <img
              src="/Pressure-washerkit/product-image-right.png"
              alt="Person washing"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 4 Steps to Pristine Clean
// ---------------------------------------------------------------------------

function FourSteps() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Pin the full-height section while the user scrolls through it
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Heading reveal — eyebrow then title
      gsap.from("[data-fs-eyebrow]", {
        autoAlpha: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
      gsap.from("[data-fs-title]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      // Steps row — bottom divider draws in, then each step cascades
      gsap.from("[data-fs-rule]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 55%" },
      });

      // Each step reveals one-by-one with its own mini-timeline
      const steps = gsap.utils.toArray<HTMLElement>("[data-fs-step]");
      steps.forEach((step, i) => {
        const num = step.querySelector("[data-fs-step-num]");
        const title = step.querySelector("[data-fs-step-title]");
        const body = step.querySelector("[data-fs-step-body]");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 55%" },
          defaults: { ease: "power3.out" },
          delay: 0.4 + i * 0.25,
        });

        if (num) tl.from(num, { autoAlpha: 0, x: -20, duration: 0.5 }, 0);
        if (title) tl.from(title, { autoAlpha: 0, y: 12, duration: 0.5 }, 0.1);
        if (body) tl.from(body, { autoAlpha: 0, y: 10, duration: 0.5 }, 0.2);
      });
    }, el);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background image spanning the entire section */}
      <div className="absolute inset-0">
        <img
          src="/Pressure-washerkit/bg-image.png"
          alt="Aquaforce 1400 on a workbench"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* Top-centered heading */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-28 text-center md:pt-36">
        <p
          data-fs-eyebrow
          className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/80 md:text-base"
        >
          4 Steps to
        </p>
        <h2 data-fs-title className="mt-2 heading-xl !normal-case">
          Pristine Clean
        </h2>
      </div>

      {/* Steps row anchored to the bottom of the section */}
      <div className="relative z-10 mt-auto w-full px-6 pb-10 md:px-14 md:pb-14">
        <Shell className="!px-0">
          <div className="relative pt-10 md:pt-12">
            <span
              data-fs-rule
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-white/20"
            />
            <div className="grid gap-10 md:grid-cols-4 md:gap-8">
              {STEPS.map((s) => (
                <div key={s.id} data-fs-step className="flex items-start gap-4">
                  <span
                    data-fs-step-num
                    className="font-display text-4xl font-semibold leading-none text-white md:text-5xl lg:text-6xl"
                  >
                    {s.id}
                  </span>
                  <div className="min-w-0">
                    <h3
                      data-fs-step-title
                      className="font-display text-sm font-semibold uppercase tracking-wide text-white md:text-base"
                    >
                      {s.title}
                    </h3>
                    <p
                      data-fs-step-body
                      className="mt-2 text-xs leading-relaxed text-white/70 md:text-[13px]"
                    >
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Discover Your Use Case — left tabs + right image
// ---------------------------------------------------------------------------

function DiscoverUseCase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(USE_CASES[0].id);
  const current = USE_CASES.find((u) => u.id === active) ?? USE_CASES[0];

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-du-heading], [data-du-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-du-tab]", {
        autoAlpha: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-du-tabs]", start: "top 85%" },
      });
      gsap.from("[data-du-image]", {
        autoAlpha: 0,
        scale: 0.95,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-du-image]", start: "top 85%" },
      });
      gsap.from("[data-du-body]", {
        autoAlpha: 0,
        x: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-du-body]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <div className="text-center">
          <h2 data-du-heading className="heading-lg">
            DISCOVER YOUR USE CASE
          </h2>
          <p
            data-du-sub
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            Whether detailing high-end supercars or prepping mountain bikes, the
            Aquaforce fits the mould.
          </p>
        </div>

        {/* 3-column: tabs | image | description */}
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[0.8fr_2fr_0.9fr] md:items-center md:gap-10">
          {/* LEFT — tab list */}
          <div data-du-tabs className="flex flex-col gap-5 md:gap-6">
            {USE_CASES.map((uc) => {
              const isActive = uc.id === active;
              return (
                <button
                  key={uc.id}
                  data-du-tab
                  onClick={() => setActive(uc.id)}
                  className={`group relative text-left transition-colors ${
                    isActive ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-white transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    className={`block pl-4 font-display text-sm transition-all md:text-base lg:text-lg ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {uc.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CENTER — image swaps with active tab */}
          <div
            data-du-image
            className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-bg-card md:h-[380px] md:aspect-auto lg:h-[440px]"
          >
            {USE_CASES.map((uc) => (
              <img
                key={uc.id}
                src={uc.image}
                alt={uc.label}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  uc.id === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* RIGHT — description for active tab */}
          <p
            key={current.id}
            data-du-body
            className="text-sm leading-[1.7] text-white/70 md:text-base"
          >
            {current.body}
          </p>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// What Makes Aquaforce Different — comparison table
// ---------------------------------------------------------------------------

function WhatMakesDifferent() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-wmd-heading], [data-wmd-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });

      // Two cards slide in from their respective sides
      gsap.from("[data-wmd-card-conv]", {
        autoAlpha: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-wmd-cards]", start: "top 80%" },
      });
      gsap.from("[data-wmd-card-aqua]", {
        autoAlpha: 0,
        x: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-wmd-cards]", start: "top 80%" },
      });

      // Each row of items in both cards fades up in sequence
      gsap.from("[data-wmd-item]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.06,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-wmd-cards]", start: "top 80%" },
      });
    }, el);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-20 md:py-28">
      {/* Soft spotlight behind the winner card for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 75% 55%, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }}
      />

      <Shell className="relative">
        <div className="text-center">
          <h2 data-wmd-heading className="heading-lg">
            WHAT MAKES AQUAFORCE DIFFERENT?
          </h2>
          <p
            data-wmd-sub
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            See how the AMEC Aquaforce 1400 stacks up against a conventional
            pressure washer across every critical dimension.
          </p>
        </div>

        {/* Two cards side-by-side — Conventional (dim) vs Aquaforce (elevated) */}
        <div
          data-wmd-cards
          className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-6"
        >
          {/* CONVENTIONAL — muted, dim treatment */}
          <article
            data-wmd-card-conv
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 md:p-8"
          >
            <div className="mb-7 flex items-center gap-3 border-b border-white/[0.06] pb-6 md:mb-8 md:pb-7">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white/50">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </span>
              <div>
                <p className="font-display text-lg font-semibold uppercase tracking-wide text-white/70 md:text-xl">
                  Conventional Washer
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                  The old way
                </p>
              </div>
            </div>

            <ul className="flex flex-col gap-5 md:gap-6">
              {COMPARISON.map((row) => (
                <li key={row.feature} data-wmd-item className="flex gap-4">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/15 text-white/40">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 md:text-[11px]">
                      {row.feature}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55 md:text-[15px]">
                      {row.conv}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* AQUAFORCE — elevated, white border, "RECOMMENDED" badge */}
          <article
            data-wmd-card-aqua
            className="relative overflow-hidden rounded-2xl border border-white/[0.18] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-6 shadow-[0_30px_80px_-30px_rgba(255,255,255,0.08)] md:p-8"
          >
            {/* Recommended badge — top-right */}
            <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/60 px-3 py-1 font-display text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm md:right-6 md:top-6 md:text-[10px]">
              Recommended
            </span>

            <div className="mb-7 flex items-center gap-3 border-b border-white/[0.12] pb-6 md:mb-8 md:pb-7">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white text-black">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 12 5 5L20 7" />
                </svg>
              </span>
              <div>
                <p className="font-display text-lg font-semibold uppercase tracking-wide text-white md:text-xl">
                  Aquaforce 1400
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                  The AMEC way
                </p>
              </div>
            </div>

            <ul className="flex flex-col gap-5 md:gap-6">
              {COMPARISON.map((row) => (
                <li key={row.feature} data-wmd-item className="flex gap-4">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/30 bg-white text-black">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 md:text-[11px]">
                      {row.feature}
                    </p>
                    <p className="mt-1.5 text-sm font-medium leading-relaxed text-white md:text-[15px]">
                      {row.aqua}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Compact Dual-Module Design — 4 feature cards
// ---------------------------------------------------------------------------

function CompactModules() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-cm-heading], [data-cm-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-cm-card]", {
        autoAlpha: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-cm-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <div className="text-center">
          <h2 data-cm-heading className="heading-lg">
            COMPACT DUAL-MODULE DESIGN
          </h2>
          <p
            data-cm-sub
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            It is engineered to work as one unified, ergonomic system.
          </p>
        </div>

        {/* Grid on mobile / md, flex row on lg so we can interleave "+"
            connectors between adjacent cards. Connectors are hidden below
            lg (where the 2-col layout would make them awkward). */}
        <div
          data-cm-grid
          className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:flex lg:gap-0"
        >
          {MODULES.map((m, i) => (
            <Fragment key={m.title}>
              <article
                data-cm-card
                className="relative flex flex-1 flex-col rounded-2xl border border-white/[0.08] bg-bg-card p-6 md:p-7"
              >
                <span className="text-white">{m.icon}</span>
                <h3 className="mt-10 font-display text-base font-semibold text-white md:text-lg">
                  {m.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-white/60 md:text-[13px]">
                  {m.body}
                </p>
              </article>

              {/* Between-card "+" connector — shown only on lg (horizontal
                  layout). Reads as a modular "snap-together" seam. */}
              {i < MODULES.length - 1 && (
                <div
                  aria-hidden
                  className="hidden items-center justify-center px-3 lg:flex"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-bg-card text-white/70">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Testimonials — "What Our Users Say"
// ---------------------------------------------------------------------------

function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-ts-head]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-ts-arrows]", {
        autoAlpha: 0,
        y: 10,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-ts-card]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-ts-track]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Track scroll position for arrow enabled state
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-ts-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden py-14 md:py-16"
    >
      <Shell>
        {/* Header row — title on left, prev/next arrows on right */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-10">
          <div>
            <h2 data-ts-head className="heading-lg">
              WHAT OUR USERS SAY
            </h2>
            <p
              data-ts-head
              className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 md:text-[15px]"
            >
              Real feedback from car enthusiasts, bike owners, and professionals
              across India who trust Aquaforce 1400.
            </p>
          </div>

          <div data-ts-arrows className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canLeft}
              aria-label="Previous testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white transition hover:border-white/40 hover:bg-white/[0.08] disabled:pointer-events-none disabled:opacity-30 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canRight}
              aria-label="Next testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white transition hover:border-white/40 hover:bg-white/[0.08] disabled:pointer-events-none disabled:opacity-30 md:h-12 md:w-12"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal rail — 3 cards visible, snap-scroll, drag or arrow controls */}
        <div className="relative mt-8 md:mt-10">
          <div
            ref={trackRef}
            data-ts-track
            className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3"
            style={{ scrollbarWidth: "none" }}
          >
            <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                data-ts-card
                className="relative flex w-[260px] shrink-0 snap-start flex-col rounded-2xl border border-white/[0.08] bg-bg-card p-5 md:w-[300px] md:p-6 lg:w-[340px]"
              >
                {/* Top row — avatar + verified badge */}
                <div className="flex items-start justify-between gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12"
                  />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-emerald-400" />
                    Verified
                  </span>
                </div>

                {/* Quote mark */}
                <span
                  aria-hidden
                  className="mt-5 inline-block font-display text-3xl font-bold leading-none text-white/25 md:text-4xl"
                >
                  &ldquo;
                </span>

                {/* Body — clamped so cards share a baseline height */}
                <p className="mt-2 flex-1 font-display text-sm leading-snug text-white md:text-[15px] lg:text-base">
                  {t.body}
                </p>

                {/* Bottom — name + role with vertical accent bar */}
                <div className="mt-5 flex items-start gap-3 md:mt-6">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-block h-8 w-[2px] shrink-0 bg-white/80"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-white md:text-sm">
                      {t.name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-white/55 md:text-xs">
                      {t.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing CTA — "Ready to Make Vehicle Washing Easier?"
// Pinned section with Vercel-style word-by-word scrub reveal: each word
// starts dim and brightens to full white as the user scrolls through a
// short scroll range (~one gesture).
// ---------------------------------------------------------------------------

const CTA_HEADING = "Ready to Make Vehicle Washing Easier?";
const CTA_HEADING_WORDS = CTA_HEADING.split(" ");

function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Pin the section while the reveal plays, with a short hold after.
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=70%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Word-by-word brightness reveal — Vercel style. Each word starts at
      // 15% opacity and ramps to 100% as the user scrolls. Scrub range is
      // kept short (+=20%) so one scroll gesture carries the whole reveal.
      const words = gsap.utils.toArray<HTMLElement>("[data-cta-word]");
      gsap.set(words, { autoAlpha: 0.15 });
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=20%",
          scrub: 0.2,
          invalidateOnRefresh: true,
        },
      });

      // Button fades + lifts in as the section enters, independent of the
      // scrub so it's visible from the moment the user reaches the section.
      gsap.from("[data-cta-btn]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Ambient radial glow drifts slowly across the section
      gsap.to("[data-cta-glow]", {
        xPercent: 8,
        yPercent: -5,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Concentric pulse rings — continuous outward expansion, staggered
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
    }, el);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Concentric pulse rings — continuously expand outward from the center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            data-cta-pulse
            className="absolute aspect-square rounded-full border-2 border-white/25"
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

      <Shell className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="heading-xl">
            {CTA_HEADING_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span data-cta-word className="inline-block">
                  {word}
                </span>
                {i < CTA_HEADING_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </h2>
          <div data-cta-btn className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex flex-row-reverse items-center gap-3 rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 font-display text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              Get in Touch
            </Link>
          </div>
        </div>
      </Shell>
    </section>
  );
}
