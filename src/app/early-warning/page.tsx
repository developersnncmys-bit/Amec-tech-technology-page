"use client";

import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

// Hero chips — icons + labels matching Figma
const HeroBoltIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

const HeroMeshIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="5" cy="6" r="1.6" fill="currentColor" />
    <circle cx="19" cy="6" r="1.6" fill="currentColor" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    <circle cx="5" cy="18" r="1.6" fill="currentColor" />
    <circle cx="19" cy="18" r="1.6" fill="currentColor" />
    <path d="M5 6 12 12 19 6M5 18 12 12 19 18M5 6v12M19 6v12" />
  </svg>
);

const HeroBatteryIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="7" width="16" height="10" rx="2" />
    <path d="M21 10v4" />
    <path d="m11 10-2 3h3l-2 3" fill="currentColor" stroke="none" />
  </svg>
);

const HeroWifiOffIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 8.8a16 16 0 0 1 5.5-3" />
    <path d="M16.5 5.8A16 16 0 0 1 22 8.8" />
    <path d="M5 12.3a11 11 0 0 1 3.5-1.9" />
    <path d="M15.5 10.4a11 11 0 0 1 3.5 1.9" />
    <path d="M8.5 15.9a6 6 0 0 1 7 0" />
    <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    <path d="m3 3 18 18" />
  </svg>
);

const HERO_CHIPS = [
  { label: "SUB-SECOND DETECTION", icon: HeroBoltIcon },
  { label: "LORA MESH NETWORK", icon: HeroMeshIcon },
  { label: "AUTONOMOUS POWER SUPPLY", icon: HeroBatteryIcon },
  { label: "NO INTERNET REQUIRED", icon: HeroWifiOffIcon },
];

const WHY_FEATURES = [
  {
    title: "LiDAR Verification",
    body:
      "LiDAR sensor array visually perceives movement signatures in sub-seconds, eliminating false alarms and alert fatigue.",
  },
  {
    title: "Solar Autonomy",
    body:
      "Each unit is entirely solar-powered with built-in battery storage, engineered for continuous off-grid operation.",
  },
  {
    title: "Self-Healing Mesh",
    body:
      "Units form an autonomous wireless mesh via long-range LoRa, requiring no local cellular or internet connectivity.",
  },
  {
    title: "Hazard Redundancy",
    body:
      "Multi-path communications present single points of failure. The mesh self-heals in real time if any units go offline.",
  },
];

// Icons for the How AMEC Works process steps (Detect / Verify / Alert / Respond)
const DetectIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="14" r="1.5" fill="currentColor" />
    <path d="M9 11a4 4 0 0 1 6 0" />
    <path d="M6.5 8.5a7.5 7.5 0 0 1 11 0" />
    <path d="M4 6a11 11 0 0 1 16 0" />
  </svg>
);

const VerifyIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2 4 5v6c0 5 3.5 8.4 8 10 4.5-1.6 8-5 8-10V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const AlertIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const RespondIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2 4 5v7c0 5 3.5 8.7 8 10 4.5-1.3 8-5 8-10V5l-8-3Z" />
  </svg>
);

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Detect",
    body: "LiDAR sensor units scan your perimeter, detecting and classifying threats in real time.",
    icon: DetectIcon,
  },
  {
    id: "02",
    title: "Verify",
    body: "Multi-sensor analysis verifies every detection, completely eliminating false alarms.",
    icon: VerifyIcon,
  },
  {
    id: "03",
    title: "Alert",
    body: "Instant alerts are sent to your team via mobile app, SMS, and central dashboard.",
    icon: AlertIcon,
  },
  {
    id: "04",
    title: "Respond",
    body: "Detailed location, time, and sensor footage enables your team to respond with speed.",
    icon: RespondIcon,
  },
];

// Icons for THE RESULT tiles — match Figma's circular glyphs
const GlobeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);

const PersonSlashIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
    <path d="m4 4 16 16" />
  </svg>
);

const RupeeSlashIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 5h10" />
    <path d="M7 9h10" />
    <path d="M8 5c3 0 5 1.5 5 4s-2 4-5 4h-1l7 7" />
    <path d="m4 3 16 18" />
  </svg>
);

const ClockRewindIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v4h4" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const RESULT_CHIPS = [
  { title1: "No", title2: "Internet Required", icon: GlobeIcon },
  { title1: "No Dedicated", title2: "Manpower Required", icon: PersonSlashIcon },
  { title1: "No Monthly", title2: "Subscription Charges", icon: RupeeSlashIcon },
  { title1: "Real-Time Warning", title2: "Exactly When It Matters", icon: ClockRewindIcon },
];

const WHY_MATTERS_POINTS = [
  "A single alert can prevent accidents.",
  "A single alert can stop theft.",
  "A single alert can save lives.",
  "A single alert can save lakhs of rupees.",
];

type ComparisonRow = {
  feature: string;
  amec: string | boolean;
  traditional: string | boolean;
};

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "False Alarm Rate", amec: "Very Low", traditional: "High" },
  { feature: "24/7 Autonomous Operation", amec: true, traditional: false },
  { feature: "Off-Grid Capability", amec: true, traditional: false },
  { feature: "Self-Healing Network", amec: true, traditional: false },
  { feature: "AI-Powered Detection", amec: true, traditional: false },
  { feature: "Operational Cost", amec: "Low (TCO)", traditional: "High (TCO)" },
];

const APPLICATIONS = [
  {
    title: "Industrial Sites",
    body: "Protect manufacturing units and perimeter walls.",
    image: "/Early warning/Image (Industrial Sites).png",
  },
  {
    title: "Solar Power Plants",
    body: "Prevent solar panel and critical equipment theft.",
    image: "/Early warning/Image (Solar Power Plants).png",
  },
  {
    title: "Construction Sites",
    body: "Monitor assets and prevent unauthorized access.",
    image: "/Early warning/Image (Construction Sites).png",
  },
  {
    title: "Warehouses",
    body: "Secure storage units and distribution centers.",
    image: "/Early warning/Image (Warehouses).png",
  },
  {
    title: "Mining & Metals",
    body: "Safeguard remote mining equipment and operations.",
    image: "/Early warning/Image (Mining & Metals).png",
  },
  {
    title: "Railways",
    body: "Protect tracks, yards, and transit corridors.",
    image: "/Early warning/Image (Railways).png",
  },
  {
    title: "NGOs & Wildlife Conservation",
    body: "Monitor habitats and prevent poaching activity.",
    image: "/Early warning/NGO's wildlife.png",
  },
  {
    title: "Government Facilities",
    body: "Secure administrative properties and public hubs.",
    image: "/Early warning/Image (Government Facilities).png",
  },
];

const TESTIMONIALS = [
  {
    body: "AMEC's system has transformed our perimeter security. False alarms dropped by 95% and response time improved drastically.",
    name: "Reliance Industries",
    role: "Head of Security",
    initials: "RI",
  },
  {
    body: "The mesh network is rock-solid even in remote areas. Setup was quick and the support team is excellent.",
    name: "Adani Solar",
    role: "Security Operations Lead",
    initials: "AS",
  },
  {
    body: "Finally, a solution that works in harsh environments without constant maintenance hassles.",
    name: "ONGC Field Specialist",
    role: "Security Manager",
    initials: "ON",
  },
];

const FAQ_ITEMS = [
  {
    q: "What types of sites does AMEC protect?",
    a: "Industrial facilities, solar farms, mining sites, warehouses, construction yards, rail infrastructure, wildlife reserves, and critical government sites — anywhere needing autonomous, off-grid perimeter awareness.",
  },
  {
    q: "How long does installation take?",
    a: "A typical 20-acre perimeter deploys in under a day. Each unit is self-contained — mount, orient, and the mesh self-forms within minutes of power-on.",
  },
  {
    q: "Does AMEC work in remote locations without power?",
    a: "Yes. Every unit runs on integrated solar with a battery buffer sized for 7+ days of autonomy. No grid, no cellular, no running cables.",
  },
  {
    q: "Can I integrate AMEC with my existing systems?",
    a: "Yes. We expose a REST API and MQTT stream for SCADA, VMS, SIEM, and incident-management platforms. Webhooks for Slack/Teams/SMS come as standard.",
  },
  {
    q: "How does AMEC handle false alarms?",
    a: "Multi-sensor verification cross-checks every LiDAR hit against radar signature and motion profile before raising an alert — in field trials this cuts false-alarm rate by 98% vs. PIR-only systems.",
  },
  {
    q: "What kind of maintenance is required?",
    a: "Minimal — the system reports its own health. Quarterly visual inspection of solar panels is the only recommended on-site task. Firmware updates deploy over-the-mesh.",
  },
  {
    q: "What happens if a device is tampered or goes offline?",
    a: "Tamper sensors trigger an immediate alert. The mesh re-routes around any offline node automatically — your coverage never drops.",
  },
  {
    q: "Are there ongoing subscription or annual costs?",
    a: "No mandatory SaaS. You own the hardware. Optional support/analytics tiers exist for teams who want managed dashboards and SLA-backed response.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EarlyWarningPage() {
  return (
    <>
      <Hero />
      <WhyOutperforms />
      <HowItWorks />
      <MeshNetwork />
      <WhyThisMatters />
      <ComparisonTable />
      <Applications />
      <Testimonials />
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
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-ew-hero-media]", { autoAlpha: 0, scale: 1.06, duration: 1.4 })
        .from("[data-ew-hero-title] span", {
          autoAlpha: 0,
          y: 32,
          stagger: 0.08,
          duration: 0.8,
        }, "-=0.9")
        .from("[data-ew-hero-sub]", { autoAlpha: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from("[data-ew-hero-chip]", {
          autoAlpha: 0,
          y: 18,
          stagger: 0.1,
          duration: 0.5,
        }, "-=0.3");
    }, el);

    return () => ctx.revert();
  }, []);

  const titleWords = ["Multipurpose", "Early Warning", "System"];

  return (
    <section ref={sectionRef} className="relative isolate h-screen w-full overflow-hidden bg-[#0d0d0d]">
      <div data-ew-hero-media className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/Early-warning-Hero.mp4"
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
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 100%), linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      <div className="relative flex h-full w-full flex-col justify-center px-6 pb-10 md:px-14 md:pb-14">
        {/* Vertically-centered left-aligned title + sub */}
        <div className="max-w-3xl">
          <h1
            data-ew-hero-title
            className="font-display font-semibold uppercase leading-[1.05] text-white"
            style={{ fontSize: "clamp(32px, 4.8vw, 56px)" }}
          >
            {titleWords.map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block">{w}</span>
                {i < titleWords.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </h1>
          <p
            data-ew-hero-sub
            className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:mt-6 md:text-[15px]"
          >
            AI-powered autonomous early warning system designed for industrial sites,
            mining, solar farms and critical infrastructure.
          </p>
        </div>

        {/* Bottom chips row — evenly spread across full width with icons */}
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/[0.08] px-6 py-6 md:justify-between md:gap-x-6 md:px-14 md:py-7">
          {HERO_CHIPS.map((c) => (
            <span
              key={c.label}
              data-ew-hero-chip
              className="inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 md:text-xs"
            >
              <span aria-hidden className="h-4 w-4 shrink-0 text-white md:h-[18px] md:w-[18px]">
                {c.icon}
              </span>
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Why AMEC Outperforms
// ---------------------------------------------------------------------------

// Icons for the WHY AMEC OUTPERFORMS tiles — match Figma glyphs
const LidarIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M8.5 12a3.5 3.5 0 0 1 7 0" />
    <path d="M6 12a6 6 0 0 1 12 0" />
    <path d="M3.5 12a8.5 8.5 0 0 1 17 0" />
  </svg>
);

const SolarIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="7" y="3" width="10" height="16" rx="2" />
    <path d="M10 3V2M14 3V2M10 22v-1M14 22v-1" />
    <path d="m13 8-3 4h4l-3 4" fill="currentColor" />
  </svg>
);

const MeshGlobeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);

const ShieldIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2 4 5v7c0 5 3.5 8.7 8 10 4.5-1.3 8-5 8-10V5l-8-3Z" />
  </svg>
);

const WHY_ICONS: Record<string, React.ReactNode> = {
  "LiDAR Verification": LidarIcon,
  "Solar Autonomy": SolarIcon,
  "Self-Healing Mesh": MeshGlobeIcon,
  "Hazard Redundancy": ShieldIcon,
};

function WhyOutperforms() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pre-state for the pin reveal
      gsap.set("[data-why-heading] span", { autoAlpha: 0, y: 30 });
      gsap.set("[data-why-image]", { autoAlpha: 0, scale: 0.9 });
      gsap.set("[data-why-ring]", { scale: 0, autoAlpha: 0, transformOrigin: "center" });
      gsap.set("[data-why-tile]", { autoAlpha: 0, y: 40 });

      // Master pinned timeline — scrubbed to scroll
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Heading word-by-word
      tl.to("[data-why-heading] span", {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
      }, 0);

      // 2. Image + concentric rings expand outward
      tl.to("[data-why-image]", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
      }, 0.4);

      tl.to("[data-why-ring]", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }, 0.5);

      // 3. Tiles cascade in (alternating sides)
      tl.to("[data-why-tile]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
      }, 0.9);

      // Continuous slow pulse on the rings — plays independently once revealed
      gsap.to("[data-why-ring]", {
        scale: 1.08,
        opacity: 0.5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.4, from: "start" },
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const headingWords = ["WHY", "AMEC", "OUTPERFORMS", "TRADITIONAL", "SYSTEMS"];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-start overflow-hidden pb-10 pt-16 md:pb-16 md:pt-20"
    >
      <Shell>
        <h2 data-why-heading className="heading-lg text-center">
          {headingWords.map((w, i) => (
            <Fragment key={i}>
              <span className="inline-block">{w}</span>
              {i < headingWords.length - 1 ? (i === 2 ? <br /> : " ") : ""}
            </Fragment>
          ))}
        </h2>

        <div
          data-why-grid
          className="relative mt-6 grid gap-5 md:mt-10 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10"
        >
          {/* Left column — tiles 0, 2 */}
          <div className="flex flex-col gap-5">
            {[WHY_FEATURES[0], WHY_FEATURES[2]].map((f) => (
              <Tile key={f.title} title={f.title} body={f.body} icon={WHY_ICONS[f.title]} />
            ))}
          </div>

          {/* Center image + expanding rings */}
          <div className="order-first flex items-center justify-center md:order-none">
            <div className="relative flex h-[360px] w-[360px] items-center justify-center md:h-[480px] md:w-[480px]">
              {/* Concentric rings — radiate outward from behind the image */}
              {[0.4, 0.6, 0.8, 1].map((s, i) => (
                <span
                  key={i}
                  data-why-ring
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full border border-white/15"
                  style={{ transform: `scale(${s})` }}
                />
              ))}
              <img
                data-why-image
                src="/Early warning/Image (AMEC Hub Device).png"
                alt="AMEC Early Warning device"
                className="relative max-h-[320px] w-auto object-contain md:max-h-[400px]"
              />
            </div>
          </div>

          {/* Right column — tiles 1, 3 */}
          <div className="flex flex-col gap-5">
            {[WHY_FEATURES[1], WHY_FEATURES[3]].map((f) => (
              <Tile key={f.title} title={f.title} body={f.body} icon={WHY_ICONS[f.title]} />
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Tile({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon?: React.ReactNode;
}) {
  return (
    <article
      data-why-tile
      className="group flex gap-4 rounded-card border border-white/[0.08] bg-bg-card p-6 transition-colors hover:border-white/20 md:gap-5 md:p-7"
    >
      {icon && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white md:h-11 md:w-11">
          <span className="h-5 w-5 md:h-5 md:w-5">{icon}</span>
        </span>
      )}
      <div className="min-w-0">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white md:text-base">
          {title}
        </h3>
        <p className="mt-3 text-xs leading-relaxed text-white/65 md:text-sm">{body}</p>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// How AMEC Works
// ---------------------------------------------------------------------------

function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal — fires on scroll-into-view so it's already visible
      // when the pin engages.
      gsap.from("[data-hw-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });

      // Hidden starting state for the pin-driven reveal.
      gsap.set("[data-hw-rail]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-hw-node]", { autoAlpha: 0, scale: 0 });
      gsap.set("[data-hw-step-text]", { autoAlpha: 0, y: 24 });

      // Pin + scrubbed master timeline. The rail draws progressively, and
      // each node + its content reveals in sequence as the user scrolls
      // through the pinned range. Pin releases after step 04 is done.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const nodes = gsap.utils.toArray<HTMLElement>("[data-hw-node]");
      const texts = gsap.utils.toArray<HTMLElement>("[data-hw-step-text]");
      const totalSteps = nodes.length;

      nodes.forEach((node, i) => {
        const at = i; // 1 "unit" of timeline per step

        // Rail segment up to this node — scaleX goes from (i / total) to
        // ((i+1) / total), drawn in parallel with the node reveal.
        tl.to(
          "[data-hw-rail]",
          { scaleX: (i + 1) / totalSteps, duration: 1, ease: "none" },
          at
        );

        // Node pop
        tl.to(
          node,
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
          at + 0.2
        );

        // Step title + body fade up
        if (texts[i]) {
          tl.to(
            texts[i],
            { autoAlpha: 1, y: 0, duration: 0.5 },
            at + 0.35
          );
        }
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
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden py-20 md:py-28"
    >
      <Shell>
        <h2 data-hw-heading className="heading-lg text-center">
          HOW AMEC WORKS
        </h2>

        <div data-hw-grid className="relative mt-16 md:mt-20">
          {/* Horizontal rail connecting the nodes */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-white/15 md:block"
          >
            <div data-hw-rail className="h-full w-full origin-left bg-white/70" />
          </div>

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {PROCESS_STEPS.map((s) => (
              <div key={s.id} className="flex flex-col items-center text-center">
                <span
                  data-hw-node
                  className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/15 bg-bg-card text-white"
                >
                  <span className="h-6 w-6">{s.icon}</span>
                </span>
                <div data-hw-step-text>
                  <h3 className="mt-6 text-base font-semibold text-white md:text-lg">{s.title}</h3>
                  <p className="mt-3 max-w-[220px] text-xs leading-relaxed text-white/65 md:text-sm">
                    {s.body}
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
// Mesh Network
// ---------------------------------------------------------------------------

function MeshNetwork() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Horizontal zigzag — 4 sensor nodes + 1 hub on the right. Matches Figma.
  const nodes = [
    { x: 80,  y: 150, label: "N1" },
    { x: 260, y: 60,  label: "N2" },
    { x: 450, y: 170, label: "N3" },
    { x: 640, y: 60,  label: "N4" },
    { x: 820, y: 150, label: "Hub", hub: true },
  ];

  // Straight-line zigzag path going through all 5 nodes
  const pathD = `
    M ${nodes[0].x} ${nodes[0].y}
    L ${nodes[1].x} ${nodes[1].y}
    L ${nodes[2].x} ${nodes[2].y}
    L ${nodes[3].x} ${nodes[3].y}
    L ${nodes[4].x} ${nodes[4].y}
  `.trim();

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Initial state — everything hidden, ready for the pinned reveal
      gsap.set("[data-mn-heading]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-mn-sub]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-mn-device-wrap]", { autoAlpha: 0, scale: 0.9 });
      gsap.set("[data-mn-node]", { autoAlpha: 0, scale: 0, transformOrigin: "center center" });
      gsap.set("[data-mn-label]", { autoAlpha: 0, y: 10 });
      gsap.set("[data-tr-heading]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-tr-chip]", { autoAlpha: 0, y: 30 });
      gsap.set("[data-tr-sub]", { autoAlpha: 0, y: 20 });

      const path = el.querySelector<SVGPathElement>("[data-mn-path]");
      let pathLen = 400;
      if (path) {
        pathLen = path.getTotalLength();
        gsap.set(path, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
      }

      // Master pinned timeline — scrub-driven reveal of everything
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 1. Heading + sub + device photo
      tl.to("[data-mn-heading]", { autoAlpha: 1, y: 0, duration: 0.5 })
        .to("[data-mn-sub]", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.25")
        .to("[data-mn-device-wrap]", { autoAlpha: 1, scale: 1, duration: 0.6 }, "-=0.3");

      // 2. Mesh path draws in
      if (path) {
        tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, "-=0.1");
      }

      // 3. Nodes pop + labels fade in sequence
      tl.to("[data-mn-node]", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(2)",
      }, "-=0.5");
      tl.to("[data-mn-label]", {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
      }, "<+0.15");

      // 4. THE RESULT heading + chips + closing paragraph
      tl.to("[data-tr-heading]", { autoAlpha: 1, y: 0, duration: 0.5 }, "+=0.1")
        .to("[data-tr-chip]", {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        }, "-=0.2")
        .to("[data-tr-sub]", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.1");

      // ------- Ambient (continuous) animations -------

      // Hub pulse ring — continuous
      gsap.fromTo(
        "[data-mn-hub-pulse]",
        { attr: { r: 20 }, opacity: 0.6 },
        { attr: { r: 44 }, opacity: 0, duration: 2.2, repeat: -1, ease: "sine.out" }
      );

      // Signal packet travels node-by-node toward the hub
      const packetTl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      packetTl.set("[data-mn-packet]", {
        attr: { cx: nodes[0].x, cy: nodes[0].y },
        opacity: 0,
      });
      packetTl.to("[data-mn-packet]", { opacity: 1, duration: 0.2 });
      for (let i = 1; i < nodes.length; i++) {
        packetTl.to("[data-mn-packet]", {
          attr: { cx: nodes[i].x, cy: nodes[i].y },
          duration: 0.7,
          ease: "power1.inOut",
        });
      }
      packetTl.to("[data-mn-packet]", { opacity: 0, duration: 0.3 });

      // Device photo gentle float
      gsap.to("[data-mn-device]", {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Concentric ring pulse behind the device
      const rings = gsap.utils.toArray<HTMLElement>("[data-mn-ring]");
      rings.forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { scale: 0.3, opacity: 0.75 },
          {
            scale: 1.7,
            opacity: 0,
            duration: 3,
            repeat: -1,
            ease: "sine.out",
            delay: i * 0.75,
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden py-16 md:py-20"
    >
      <Shell className="flex min-h-0 flex-1 flex-col">
        <div className="relative shrink-0">
          <div className="mx-auto max-w-3xl text-center">
            <h2 data-mn-heading className="heading-lg">MESH NETWORK</h2>
            <p
              data-mn-sub
              className="mt-4 text-sm leading-relaxed text-white/70 md:text-base"
            >
              Wireless LoRa units verify each detection — no internet required.
            </p>
          </div>

          {/* Device photo with concentric ring pulse behind — floating top-right */}
          <div
            data-mn-device-wrap
            aria-hidden
            className="pointer-events-none absolute -top-6 right-0 hidden h-44 w-44 items-center justify-center md:flex lg:h-56 lg:w-56"
          >
            <span className="absolute inset-0 rounded-full border border-white/15" />
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                data-mn-ring
                className="absolute inset-0 rounded-full border-2 border-white/70"
                style={{ boxShadow: "0 0 24px rgba(255,255,255,0.3)" }}
              />
            ))}
            <img
              data-mn-device
              src="/Early%20warning/Image%20(AMEC%20Hub%20Device).png"
              alt=""
              className="relative z-10 h-full w-auto object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.7)]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Mesh visual — compact so The Result fits in the same viewport */}
        <div
          data-mn-svg
          className="relative mx-auto mt-4 w-full max-w-3xl overflow-visible md:mt-6 lg:max-w-4xl"
        >
          <svg
            viewBox="0 0 900 220"
            className="relative h-auto w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="mn-node-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.75" />
              </radialGradient>
              <radialGradient id="mn-hub-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#9effd2" stopOpacity="1" />
                <stop offset="100%" stopColor="#19c37d" stopOpacity="1" />
              </radialGradient>
            </defs>

            {/* Continuous mesh path */}
            <path
              data-mn-path
              d={pathD}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Signal packet rides the path */}
            <circle
              data-mn-packet
              r="4"
              fill="#9effd2"
              style={{ filter: "drop-shadow(0 0 6px #19c37d)" }}
            />

            {/* Nodes + labels */}
            {nodes.map((n, i) => (
              <g key={`node-${i}`}>
                {n.hub && (
                  <circle
                    data-mn-hub-pulse
                    cx={n.x}
                    cy={n.y}
                    r="20"
                    fill="none"
                    stroke="rgba(25,195,125,0.7)"
                    strokeWidth="2"
                  />
                )}
                <circle
                  data-mn-node
                  cx={n.x}
                  cy={n.y}
                  r={n.hub ? 14 : 10}
                  fill={n.hub ? "url(#mn-hub-fill)" : "url(#mn-node-fill)"}
                  stroke={n.hub ? "rgba(25,195,125,1)" : "rgba(255,255,255,0.9)"}
                  strokeWidth="1.5"
                />
                <text
                  data-mn-label
                  x={n.x}
                  y={n.y + 36}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="13"
                  fontWeight="500"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* THE RESULT — merged into the Mesh Network section */}
        <div className="mt-6 shrink-0 md:mt-8">
          <h2 data-tr-heading className="heading-lg text-center">THE RESULT</h2>

          <div
            data-tr-grid
            className="mt-5 grid gap-3 md:mt-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          >
            {RESULT_CHIPS.map((c) => (
              <div
                key={c.title2}
                data-tr-chip
                className="flex items-center gap-4 rounded-card border border-white/[0.08] bg-bg-card p-4 transition-colors hover:border-white/20 md:p-5"
              >
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white md:h-12 md:w-12"
                >
                  <span className="h-5 w-5 md:h-6 md:w-6">{c.icon}</span>
                </span>
                <h3 className="text-[13px] font-semibold leading-tight text-white md:text-sm">
                  {c.title1}
                  <br />
                  {c.title2}
                </h3>
              </div>
            ))}
          </div>

          <p
            data-tr-sub
            className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-white/60 md:mt-7 md:text-sm"
          >
            The system uses LiDAR sensing, wireless LoRa IoT communication, solar-powered operation,
            and alert verification logic to reduce false triggers and ensure reliable awareness.
          </p>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Why This Matters
// ---------------------------------------------------------------------------

function WhyThisMatters() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const points = gsap.utils.toArray<HTMLElement>("[data-wtm-point]");

      // Initial state — hide everything that reveals during the pin
      gsap.set("[data-wtm-heading]", { autoAlpha: 0, y: 40, clipPath: "inset(100% 0 0 0)" });
      gsap.set("[data-wtm-rule]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-wtm-quote]", { autoAlpha: 0, x: -24 });
      points.forEach((p) => {
        gsap.set(p.querySelector("[data-wtm-dot]"), { scale: 0, autoAlpha: 0 });
        gsap.set(p.querySelector("[data-wtm-text]"), { autoAlpha: 0, x: -30 });
      });

      // Background image — slow Ken Burns-style scale as the section enters
      gsap.from("[data-wtm-bg]", {
        scale: 1.1,
        autoAlpha: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });

      // Pin + scrubbed reveal timeline — heading, rule, quote, and 4 points
      // animate in sequence as the user scrolls through the pinned range.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to("[data-wtm-heading]", { autoAlpha: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.6 })
        .to("[data-wtm-rule]", { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, "-=0.2")
        .to("[data-wtm-quote]", { autoAlpha: 1, x: 0, duration: 0.6 }, "-=0.15");

      // Points reveal one-by-one after the quote
      points.forEach((p) => {
        tl.to(
          p.querySelector("[data-wtm-dot]"),
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
          ">-0.1"
        ).to(
          p.querySelector("[data-wtm-text]"),
          { autoAlpha: 1, x: 0, duration: 0.5 },
          "<+0.1"
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden"
    >
      {/* Full-section background image */}
      <img
        data-wtm-bg
        src="/Early warning/Why-this-matters.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Left-weighted dark gradient so the text block stays legible */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Left-aligned content */}
      <div className="relative flex h-full items-center">
        <Shell>
          <div className="max-w-xl">
            <h2 data-wtm-heading className="heading-lg">
              WHY IT MATTERS
            </h2>
            {/* Accent underline below the title */}
            <span
              data-wtm-rule
              aria-hidden
              className="mt-5 block h-[2px] w-24 origin-left bg-white md:w-32"
            />

            {/* Pull quote with left vertical bar */}
            <blockquote
              data-wtm-quote
              className="mt-8 border-l-2 border-white/70 pl-5 text-sm italic leading-relaxed text-white/85 md:mt-10 md:text-base"
            >
              &ldquo;Designed for environments where traditional CCTV reacts too
              late, detecting threats before they reach your critical assets.&rdquo;
            </blockquote>

            <ul className="mt-8 space-y-5 md:mt-10">
              {WHY_MATTERS_POINTS.map((p) => (
                <li
                  key={p}
                  data-wtm-point
                  className="flex items-start gap-4 text-white"
                >
                  <span
                    data-wtm-dot
                    aria-hidden
                    className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </span>
                  <span data-wtm-text className="text-base leading-relaxed md:text-lg">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Comparison Table — AMEC vs Traditional
// ---------------------------------------------------------------------------

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-emerald-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-red-400/80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ComparisonTable() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Score each card — AMEC wins everything (6/6), Traditional loses everything (0/6)
  const amecScore = COMPARISON_ROWS.length;
  const tradScore = 0;
  const total = COMPARISON_ROWS.length;

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Initial hidden state for everything the pinned timeline reveals
      gsap.set("[data-ct-heading]", { autoAlpha: 0, y: 30, clipPath: "inset(100% 0 0 0)" });
      gsap.set("[data-ct-sub]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-ct-traditional]", { autoAlpha: 0, x: -80 });
      gsap.set("[data-ct-amec]", { autoAlpha: 0, x: 80 });
      gsap.set("[data-ct-vs]", { autoAlpha: 0, scale: 0, rotate: -180 });
      gsap.set("[data-ct-trophy]", { autoAlpha: 0, y: -14, scale: 0.6 });
      gsap.set("[data-ct-feat]", { autoAlpha: 0, x: 0 });
      gsap.set("[data-ct-feat-trad]", { x: -16 });
      gsap.set("[data-ct-feat-amec]", { x: 16 });
      gsap.set("[data-ct-bar]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-ct-score-wrap]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-ct-score-num]", { textContent: "0" });

      // Pinned scrubbed master timeline — reveals everything as the user scrolls
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 1. Heading + subhead
      tl.to("[data-ct-heading]", { autoAlpha: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.6 })
        .to("[data-ct-sub]", { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.25");

      // 2. Two cards slide in from opposite sides
      tl.to("[data-ct-traditional]", { autoAlpha: 1, x: 0, duration: 0.7 }, "+=0.1")
        .to("[data-ct-amec]", { autoAlpha: 1, x: 0, duration: 0.7 }, "<");

      // 3. VS medallion spins into place
      tl.to("[data-ct-vs]", { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2)" }, "-=0.2")
        .to("[data-ct-trophy]", { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }, "<+0.1");

      // 4. Feature rows cascade — Traditional slides right, AMEC slides left, both fade in together
      const tradFeats = gsap.utils.toArray<HTMLElement>("[data-ct-feat-trad]");
      const amecFeats = gsap.utils.toArray<HTMLElement>("[data-ct-feat-amec]");
      const bars = gsap.utils.toArray<HTMLElement>("[data-ct-bar]");

      tradFeats.forEach((feat, i) => {
        const amecFeat = amecFeats[i];
        const label = feat.closest("[data-ct-feat]");
        const amecLabel = amecFeat?.closest("[data-ct-feat]");

        tl.to([label, amecLabel], { autoAlpha: 1, duration: 0.3 }, "+=0.05")
          .to(feat, { x: 0, duration: 0.4 }, "<")
          .to(amecFeat, { x: 0, duration: 0.4 }, "<");
      });

      // 5. Score bars draw in (AMEC fills fully, Traditional stays empty)
      tl.to(bars, { scaleX: 1, duration: 0.9, stagger: 0.15, ease: "power2.out" }, "+=0.1");

      // 6. Score counters animate up
      tl.to("[data-ct-score-wrap]", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.6")
        .to("[data-ct-score-num-amec]", {
          textContent: amecScore,
          duration: 0.8,
          snap: { textContent: 1 },
          ease: "power2.out",
        }, "-=0.4");

      // ------ Ambient (continuous) animations ------

      // VS medallion pulse ring
      gsap.to("[data-ct-vs-ring]", {
        scale: 1.4,
        opacity: 0,
        duration: 2.2,
        repeat: -1,
        ease: "sine.out",
      });
      // VS medallion inner glow — subtle breathing
      gsap.to("[data-ct-vs-glow]", {
        opacity: 0.6,
        scale: 1.1,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scanline sweep across the AMEC card
      gsap.fromTo(
        "[data-ct-scanline]",
        { y: "-20%", opacity: 0 },
        {
          y: "120%",
          opacity: 1,
          duration: 3,
          repeat: -1,
          repeatDelay: 2.5,
          ease: "none",
          keyframes: {
            opacity: [
              { value: 0, duration: 0 },
              { value: 0.6, duration: 0.15 },
              { value: 0.6, duration: 0.7 },
              { value: 0, duration: 0.15 },
            ],
          },
        }
      );
    }, el);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, [amecScore]);

  const renderValue = (val: string | boolean, winner: boolean) => {
    if (typeof val === "boolean") {
      return (
        <span data-ct-mark className="inline-flex">
          {val ? <Check /> : <Cross />}
        </span>
      );
    }
    return (
      <span
        className={`text-[13px] font-medium md:text-sm ${
          winner ? "text-white" : "text-red-300/80"
        }`}
      >
        {val}
      </span>
    );
  };

  // Corner bracket SVG — tactical UI decoration for the AMEC card
  const CornerBracket = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 32 32" className={`absolute h-5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path d="M2 10V2h8" strokeLinecap="round" />
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden py-16 md:py-20"
    >
      {/* Faint grid background — adds depth without being noisy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Emerald glow bloom in the center-right (behind AMEC card) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/4 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(25,195,125,0.08) 0%, transparent 55%)",
        }}
      />

      <Shell className="relative">
        <div className="text-center">
          <h2 data-ct-heading className="heading-lg">
            AMEC VS. TRADITIONAL SECURITY
          </h2>
          <p
            data-ct-sub
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            Side-by-side on the features that actually move the needle.
          </p>
        </div>

        {/* Battle arena */}
        <div
          data-ct-battle
          className="relative mx-auto mt-10 w-full max-w-5xl md:mt-14"
        >
          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            {/* LEFT — Traditional Systems */}
            <article
              data-ct-traditional
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 md:p-8"
            >
              <header className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                    Legacy
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white/60 md:text-xl">
                    Traditional Systems
                  </h3>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-red-400/80">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </span>
              </header>

              <ul className="mt-6 space-y-3.5">
                {COMPARISON_ROWS.map((row) => (
                  <li
                    key={`trad-${row.feature}`}
                    data-ct-feat
                    className="flex items-center justify-between gap-4"
                  >
                    <span data-ct-feat-trad className="text-[13px] text-white/60 md:text-sm">
                      {row.feature}
                    </span>
                    <span className="shrink-0">
                      {renderValue(row.traditional, false)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Score bar — stays empty */}
              <div data-ct-score-wrap className="mt-8 border-t border-white/[0.06] pt-5">
                <div className="flex items-end justify-between">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                    Score
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold text-red-300/70 md:text-4xl">
                      {tradScore}
                    </span>
                    <span className="text-xs text-white/40">/ {total}</span>
                  </div>
                </div>
                <div className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <span
                    data-ct-bar
                    className="absolute left-0 top-0 h-full origin-left bg-red-400/60"
                    style={{ width: `${(tradScore / total) * 100}%` }}
                  />
                </div>
              </div>
            </article>

            {/* RIGHT — AMEC Security */}
            <article
              data-ct-amec
              className="relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/[0.08] via-white/[0.03] to-transparent p-6 shadow-[0_0_60px_rgba(25,195,125,0.15)] md:p-8"
            >
              {/* Tactical corner brackets */}
              <span className="pointer-events-none absolute left-3 top-3 text-emerald-400/60">
                <CornerBracket />
              </span>
              <span className="pointer-events-none absolute right-3 top-3 rotate-90 text-emerald-400/60">
                <CornerBracket />
              </span>
              <span className="pointer-events-none absolute bottom-3 left-3 -rotate-90 text-emerald-400/60">
                <CornerBracket />
              </span>
              <span className="pointer-events-none absolute bottom-3 right-3 rotate-180 text-emerald-400/60">
                <CornerBracket />
              </span>

              {/* Horizontal scanline sweep */}
              <span
                data-ct-scanline
                aria-hidden
                className="pointer-events-none absolute inset-x-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(25,195,125,0.9) 50%, transparent 100%)",
                  boxShadow: "0 0 12px rgba(25,195,125,0.8)",
                }}
              />

              {/* Trophy badge floating above */}
              <span
                data-ct-trophy
                aria-hidden
                className="absolute -top-4 right-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300 md:text-[11px]"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M19 4h-3V2H8v2H5v3a4 4 0 0 0 4 4 5 5 0 0 0 2 .9V15H9v2h6v-2h-2v-3.1A5 5 0 0 0 15 11a4 4 0 0 0 4-4V4Zm-12 3V6h2v3.2A2 2 0 0 1 7 7Zm10 0a2 2 0 0 1-2 2.2V6h2v1Z" />
                </svg>
                Recommended
              </span>

              <header className="relative flex items-center justify-between border-b border-emerald-400/15 pb-5">
                <div>
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                    Modern
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white md:text-xl">
                    AMEC Security
                  </h3>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/[0.08] text-emerald-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                    <path d="M12 2 4 5v7c0 5 3.5 8.7 8 10 4.5-1.3 8-5 8-10V5l-8-3Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </header>

              <ul className="relative mt-6 space-y-3.5">
                {COMPARISON_ROWS.map((row) => (
                  <li
                    key={`amec-${row.feature}`}
                    data-ct-feat
                    className="flex items-center justify-between gap-4"
                  >
                    <span data-ct-feat-amec className="text-[13px] text-white md:text-sm">
                      {row.feature}
                    </span>
                    <span className="shrink-0">
                      {renderValue(row.amec, true)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Score bar — fills to full */}
              <div data-ct-score-wrap className="relative mt-8 border-t border-emerald-400/15 pt-5">
                <div className="flex items-end justify-between">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                    Score
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span
                      data-ct-score-num
                      data-ct-score-num-amec
                      className="font-display text-3xl font-bold text-emerald-300 md:text-4xl"
                    >
                      0
                    </span>
                    <span className="text-xs text-white/40">/ {total}</span>
                  </div>
                </div>
                <div className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <span
                    data-ct-bar
                    className="absolute left-0 top-0 h-full origin-left bg-gradient-to-r from-emerald-400 to-emerald-300"
                    style={{
                      width: `${(amecScore / total) * 100}%`,
                      boxShadow: "0 0 12px rgba(25,195,125,0.8)",
                    }}
                  />
                </div>
              </div>
            </article>
          </div>

          {/* VS medallion — floating between the two cards */}
          <div
            data-ct-vs
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <div className="relative grid h-20 w-20 place-items-center md:h-24 md:w-24">
              {/* Soft emerald glow behind */}
              <span
                data-ct-vs-glow
                className="absolute inset-[-30%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(25,195,125,0.4) 0%, transparent 65%)",
                  opacity: 0.3,
                }}
              />
              {/* Expanding ambient ring */}
              <span
                data-ct-vs-ring
                className="absolute inset-0 rounded-full border border-emerald-300/50"
              />
              {/* Core medallion */}
              <span className="relative grid h-full w-full place-items-center rounded-full border border-emerald-300/40 bg-black font-display text-lg font-bold tracking-widest text-white shadow-[0_0_30px_rgba(0,0,0,0.9)] md:text-xl">
                VS
              </span>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Applications
// ---------------------------------------------------------------------------

function Applications() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-apps-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-apps-tile]", {
        autoAlpha: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-apps-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <h2 data-apps-heading className="heading-lg text-center">
          APPLICATIONS
        </h2>

        <div
          data-apps-grid
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-4 md:gap-5"
        >
          {APPLICATIONS.map((a) => (
            <article
              key={a.title}
              data-apps-tile
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-card transition-colors hover:border-white/20"
            >
              {/* Image — top portion of the card */}
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              {/* Dark info strip — title + description centered below the image */}
              <div className="flex flex-col items-center gap-2 px-4 py-5 text-center md:px-5 md:py-6">
                <h3 className="text-sm font-semibold text-white md:text-base">
                  {a.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/55 md:text-[13px]">
                  {a.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="m12 2 2.9 6.9 7.1.6-5.4 4.6 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.5l7.1-.6L12 2Z" />
    </svg>
  );
}

function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-ts-head]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-ts-card]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-ts-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <h2 data-ts-head className="heading-lg text-center">
          TRUSTED BY SECURITY PROFESSIONALS
        </h2>
        <div data-ts-head className="mt-5 flex items-center justify-center gap-3">
          {/* 4.9/5 star rating — 4 full + 1 ~90% filled */}
          <div className="relative inline-flex items-center">
            <div className="flex items-center gap-0.5 text-white/15">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </div>
            <div
              className="pointer-events-none absolute inset-0 flex items-center gap-0.5 overflow-hidden text-amber-400"
              style={{ clipPath: "inset(0 2% 0 0)" }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </div>
          </div>
          <p className="text-sm text-white/70 md:text-base">
            <span className="font-semibold text-white">4.9/5</span> from 250+ customers
          </p>
        </div>

        <div
          data-ts-grid
          className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              data-ts-card
              className="flex h-full flex-col rounded-card border border-white/[0.08] bg-bg-card p-6 md:p-8"
            >
              {/* Quote mark glyph */}
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white/50 md:h-7 md:w-7"
                fill="currentColor"
                aria-hidden
              >
                <path d="M9 7H5.5A2.5 2.5 0 0 0 3 9.5V13h4V9h2V7Zm10 0h-3.5A2.5 2.5 0 0 0 13 9.5V13h4V9h2V7Z" />
              </svg>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80 md:mt-5 md:text-[15px]">
                {t.body}
              </p>

              {/* Divider + Avatar row */}
              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.04] font-display text-[11px] font-semibold uppercase tracking-wide text-white md:h-11 md:w-11 md:text-xs"
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white md:text-base">
                      {t.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-white/55 md:text-[13px]">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-faq-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-faq-item]", {
        autoAlpha: 0,
        y: -24,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-faq-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <h2 data-faq-heading className="heading-lg text-center">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div data-faq-grid className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                data-faq-item
                className="rounded-card border border-white/[0.08] bg-bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6 md:py-6"
                >
                  <span
                    className={`text-sm font-medium transition-colors md:text-[15px] ${
                      isOpen ? "text-white" : "text-white/85"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition ${
                      isOpen ? "border-white bg-white text-black" : "border-white/25 text-white/70"
                    }`}
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path
                        d="M12 5v14"
                        style={{
                          transition: "transform 0.3s",
                          transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                          transformOrigin: "center",
                        }}
                      />
                      <path d="M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="px-5 pb-6 text-xs leading-relaxed text-white/70 md:px-6 md:text-sm">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing CTA
// ---------------------------------------------------------------------------

const CLOSING_HEADING = "READY TO BUILD THE FUTURE TOGETHER?";
const CLOSING_WORDS = CLOSING_HEADING.split(" ");

function ClosingCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const pinTarget = pinRef.current;
    if (!section || !pinTarget) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      gsap.from("[data-cta-eyebrow]", {
        autoAlpha: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: pinTarget, start: "top 70%" },
      });

      gsap.from("[data-cta-button]", {
        autoAlpha: 0,
        y: 30,
        scale: 0.85,
        duration: 0.7,
        delay: 0.3,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: pinTarget, start: "top 70%" },
      });

      const words = gsap.utils.toArray<HTMLElement>("[data-cta-word]");
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

      gsap.to("[data-cta-glow]", {
        xPercent: 8,
        yPercent: -5,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

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
            "0%":   { scale: 0.2, opacity: 0 },
            "20%":  { opacity: 0.5 },
            "100%": { scale: 1.4, opacity: 0 },
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-20 pt-10 md:pb-28">
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg"
      >
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
        <div
          data-cta-glow
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 55%)",
          }}
        />

        <div className="relative flex flex-col items-center gap-8 px-6 text-center md:px-14">
          <p data-cta-eyebrow className="eyebrow">Build with AMEC</p>
          <h2 className="heading-xl max-w-6xl">
            {CLOSING_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span data-cta-word className="inline-block">{word}</span>
                {i < CLOSING_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </h2>
          <div data-cta-button>
            <Link
              href="/contact"
              className="group inline-flex flex-row-reverse items-center gap-3 rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 text-sm font-medium text-white transition-all duration-300 ease-out hover:flex-row hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black"
            >
              Get in Touch
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
