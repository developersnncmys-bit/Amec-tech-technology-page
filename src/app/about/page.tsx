"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { ArrowRight, Linkedin } from "@/components/Icons";
import { IndustriesCarousel } from "@/components/home/IndustriesCarousel";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const HERO_TITLE_LINES = [
  ["Building", "Tomorrow's"],
  ["Engineering", "Solutions"],
];
const HERO_BODY =
  "AMEC Group is an engineering-driven technology company building advanced mobility and energy systems.";
const HERO_BODY_WORDS = HERO_BODY.split(" ");

const WHO_LEAD =
  "At AMEC Group, engineering is not a department — it is our identity. Every product and platform begins with first-principle thinking and robust system design.";
const WHO_LEAD_WORDS = WHO_LEAD.split(" ");

const WHO_BODY =
  "We practice performance, reliability, and scalability, building technologies that deliver beyond simulations and perform in the real world.";
const WHO_BODY_WORDS = WHO_BODY.split(" ");

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
    href: "#",
  },
];

const STORY_BODY =
  "Founded in 2019 from a passion for automotive engineering, AMEC began with a vision to create high-performance technologies for the electric era. Today, we design, engineer, and deliver advanced electric mobility solutions for the global automotive industry.";
const STORY_BODY_WORDS = STORY_BODY.split(" ");

const BUILDERS_BODY_1 =
  "Engineering comes before marketing. We focus on developing next-generation EV technologies, battery systems, and intelligent engineering solutions that improve performance, efficiency, and sustainability.";
const BUILDERS_BODY_2 =
  "Driven by innovation and continuous improvement, we turn bold ideas into reliable, production-ready technologies that shape the future of mobility.";

// Row 1 collage (right-side 3-column mosaic — 1 tall + 2 stacked + 2 stacked)
const STORY_COLLAGE = {
  tall: "/about/story1.jpg",
  midTop: "/about/story2.png",
  midBottom: "/about/story3.jpg",
  rightTop: "/about/story4.png",
  rightBottom: "/about/story6.jpg",
};
// Row 2 — big "Builder's Mindset" lead image (left side)
const STORY_BUILDERS_IMAGE = "/about/story5.png";

const VISION_BODY =
  "Our vision is to advance electric mobility through smart-class engineering and innovation. We build technologies that redefine performance, reliability, and sustainability.";
const DIRECTION_BODY =
  "Future-ready systems and EV components to fuel-ready mobility solutions. AMEC is creating the foundation for the next generation of electric vehicles.";

const FOUNDERS = [
  { name: "Aaquib Kazi", role: "Co-Founder and CTO", linkedin: "#" },
  { name: "Meraj Alam", role: "Co-Founder and CTO", linkedin: "#" },
];
const FOUNDERS_BODY_1 =
  "Born from a passion for electric mobility and inspired by our college projects, AMEC was founded to redefine the future of transportation through engineering and innovation. Our name reflects our vision — Aesthetic, Motorized, Electrical, and Concepts — the principles that continue to shape everything we build.";
const FOUNDERS_BODY_2 =
  "As an early entrant in the EV ecosystem, we faced technological and infrastructure challenges. By embracing these obstacles, we developed advanced engineering solutions that continue to drive the future of electric mobility.";

const GROWTH_INTRO =
  "From a bold idea to a multi-vertical engineering group.";

const GROWTH_IMAGES = [
  "/about/story1.jpg",
  "/about/story2.png",
  "/about/story3.jpg",
  "/about/story4.png",
];

const GROWTH_YEAR_BODY =
  "As passionate automotive enthusiasts and innovators, we set out to create fully functional threewheel electric vehicles. We incorporated a high-tech double-wishbone suspension system like those in supercars, along with a steering design and controller inspired by the McLaren P1 GTR. The successful completion of Project Tricar earned us the highest grade in our college mechanical engineering projects and won us top honours at Government Polytechnic. This achievement led to the founding of our company, AMEC.";

const NOW_ENTRIES = [
  {
    title: "AMEC Factory, Nagpur",
    subtitle: "Manufacturing & Validation",
    body: [
      "Our Nagpur facility supports manufacturing, assembly, and pilot production, enabling rigorous quality control and real-world validation of every system.",
      "From prototype to production, the facility bridges engineering design with scalable manufacturing, ensuring every solution is built for reliability and performance.",
    ],
  },
  {
    title: "AMEC Labs, Bangalore",
    subtitle: "Research & Development",
    body: [
      "AMEC Labs is our innovation hub, driving research across EV technologies, power electronics, software, and intelligent system design.",
      "With rapid prototyping, testing, and product development, the lab transforms engineering ideas into production-ready technologies across all AMEC verticals.",
    ],
  },
];

const CAPABILITIES = [
  {
    title: "Architecture & Design",
    body:
      "Designing scalable electrical, mechanical, software, and system architectures.",
    image: "/about/story1.jpg",
  },
  {
    title: "Simulation & Testing",
    body:
      "Validating designs through simulation, analysis, and real-world testing.",
    image: "/about/story4.png",
  },
  {
    title: "Prototyping & Validation",
    body:
      "Rapidly building and validating reliable, production-ready systems.",
    image: "/about/story2.png",
  },
  {
    title: "Manufacturing Readiness",
    body:
      "Preparing products for scalable, efficient, and quality-driven manufacturing.",
    image: "/about/story6.jpg",
  },
];

const INDUSTRIES = [
  { title: "Electric Mobility", image: "/images/Automotive-EV.png" },
  { title: "Renewable Energy", image: "/images/Hybrid-energy.png" },
  { title: "OEMs & Startups", image: "/images/OEM & Startup.png" },
  { title: "Automotive EV", image: "/images/Industry.png" },
];

// Customer story slides — pinned carousel cycles through these one per
// viewport of scroll. Drop real images at the listed /about/stories/* paths
// (brand logo + hero portrait); copy, stat, and label can be edited inline.
const CUSTOMER_STORIES = [
  {
    brand: "Malt",
    logo: "/about/malt-logo.png",
    heading:
      "See how Malt uses Aria to empower their global expansion journey",
    image: "/about/customer.png",
    statValue: "45",
    statLabel: "Countries covered",
  },
  {
    brand: "Jump",
    logo: "/about/jump-logo.png",
    heading: "How Jump scaled their fleet operations across 12 new cities",
    image: "/about/customer.png",
    statValue: "12",
    statLabel: "Cities launched",
  },
  {
    brand: "StaffMe",
    logo: "/about/Staffme-logo.png",
    heading:
      "StaffMe cut onboarding time in half with AMEC's integrated platform",
    image: "/about/customer.png",
    statValue: "2x",
    statLabel: "Faster onboarding",
  },
  {
    brand: "Jump",
    logo: "/about/jump-logo.png",
    heading: "Jump unified global operations with a single engineering stack",
    image: "/about/customer.png",
    statValue: "30%",
    statLabel: "Efficiency gain",
  },
];

const CLIENT_LOGOS = [
  { name: "Tata Motors", src: "/OEM/logos/tata-motors.png" },
  { name: "ISRO", src: "/OEM/logos/isro-logo.png" },
  { name: "Indian Railways", src: "/OEM/logos/Indian-railways.png" },
  { name: "MITM", src: "/OEM/logos/MITM-logo.png" },
  { name: "Tunwal", src: "/OEM/logos/Tunwal-logo.png" },
  { name: "Ajmera", src: "/OEM/logos/Ajmeera.png" },
  { name: "Hero Electric", src: "/OEM/logos/Hero-electric-logo.png" },
  { name: "Safario", src: "/OEM/logos/Safario-logo.png" },
  { name: "Fixigo", src: "/OEM/logos/fixigo.png" },
  { name: "Joy", src: "/OEM/logos/joy-logo.png" },
  { name: "Pexa", src: "/OEM/logos/pexa.png" },
  { name: "Hoora", src: "/OEM/logos/Hoora-logo.png" },
];

const CTA_HEADING_WORDS = "Ready to build the future together?".split(" ");

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Ecosystem />
      <OurStory />
      <VisionAndDirection />
      <MeetFounders />
      <GrowthStory />
      <GrowthYear />
      <EngineeringCapabilities />
      <IndustriesCarousel />
      <OurClients />
      <CustomerStories />
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
// Hero — full-bleed image with title bottom-left and copy below
// ---------------------------------------------------------------------------

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-media]", {
        autoAlpha: 0,
        scale: 1.08,
        duration: 1.3,
      })
        .from(
          "[data-hero-title] span",
          { autoAlpha: 0, y: 28, stagger: 0.07, duration: 0.8 },
          "-=0.7"
        )
        .from(
          "[data-hero-body]",
          { autoAlpha: 0, y: 16, duration: 0.6 },
          "-=0.4"
        );
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
      className="relative isolate h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      <div data-hero-media className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/about.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      <div className="relative flex h-full flex-col justify-end pb-14 md:pb-20">
        <Shell>
          <div className="max-w-3xl">
            <h1
              data-hero-title
              className="heading-xl md:!text-[56px] md:!leading-[1.06]"
            >
              {HERO_TITLE_LINES.map((line, li) => (
                <Fragment key={li}>
                  {line.map((w, wi) => (
                    <Fragment key={wi}>
                      <span className="inline-block">{w}</span>
                      {wi < line.length - 1 ? " " : null}
                    </Fragment>
                  ))}
                  {li < HERO_TITLE_LINES.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </h1>
            <p
              data-hero-body
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:mt-8 md:text-[18px] md:leading-[1.55]"
            >
              {HERO_BODY}
            </p>
          </div>
        </Shell>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Who We Are — lead statement + 2-image grid + support body
// ---------------------------------------------------------------------------

function WhoWeAre() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Scrub-reveal both bodies as the user scrolls past
      const words1 = gsap.utils.toArray<HTMLElement>("[data-who-lead-word]");
      gsap.set(words1, { autoAlpha: 0.14 });
      gsap.to(words1, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: "[data-who-lead]",
          start: "top 85%",
          end: "top 45%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      const words2 = gsap.utils.toArray<HTMLElement>("[data-who-body-word]");
      gsap.set(words2, { autoAlpha: 0.14 });
      gsap.to(words2, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: "[data-who-body]",
          start: "top 85%",
          end: "top 50%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      gsap.from("[data-who-image]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-who-images]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // First two words ("At AMEC") render BRIGHT; the rest render DIM.
  const brightWords = WHO_LEAD_WORDS.slice(0, 2);
  const dimWords = WHO_LEAD_WORDS.slice(2);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        {/* Row 1 — lead text (left) + image (right) */}
        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <p
            data-who-lead
            className="text-left font-display text-base leading-relaxed md:text-[20px] md:leading-[1.65]"
          >
            {brightWords.map((w, i) => (
              <Fragment key={`b-${i}`}>
                <span
                  data-who-lead-word
                  className="inline-block font-semibold text-white"
                >
                  {w}
                </span>
                {i < brightWords.length - 1 ? " " : null}
              </Fragment>
            ))}
            {" "}
            {dimWords.map((w, i) => (
              <Fragment key={`d-${i}`}>
                <span
                  data-who-lead-word
                  className="inline-block font-medium text-white/55"
                >
                  {w}
                </span>
                {i < dimWords.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>

          <div
            data-who-image
            className="relative aspect-[16/11] overflow-hidden rounded bg-bg-card md:-mt-4"
          >
            <Image
              src="/about/right.png"
              alt="AMEC facility"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Row 2 — image (left, pulled up) + body text (right) */}
        <div className="mt-14 grid gap-10 md:mt-0 md:grid-cols-2 md:items-center md:gap-14 tablet:mt-10">
          <div
            data-who-image
            className="relative aspect-[16/11] overflow-hidden rounded bg-bg-card tablet:mt-0 md:-mt-56"
          >
            <Image
              src="/about/left.jpg"
              alt="AMEC team"
              fill
              className="object-cover"
            />
          </div>

          <p
            data-who-body
            className="text-left font-display text-base font_regular leading-relaxed text-white/55 md:text-[20px] md:leading-[1.65]"
          >
            {WHO_BODY_WORDS.map((w, i) => (
              <Fragment key={i}>
                <span data-who-body-word className="inline-block">
                  {w}
                </span>
                {i < WHO_BODY_WORDS.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Ecosystem — 3 verticals + Dhoonu panel
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
      const DWELL = 0.9;   // scroll fraction spent holding on a card
      const MOVE = 1;      // scroll fraction spent transitioning between cards

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
      className="relative flex h-screen w-full flex-col overflow-hidden"
    >
      <Shell className="pt-20 pb-10 md:pt-24 md:pb-16">
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
      <div className="flex flex-1 items-center pb-12 md:pb-16">
        <div
          ref={trackRef}
          className="flex gap-7 pl-6 pr-6 md:pl-14 md:pr-14"
          style={{ willChange: "transform" }}
        >
          {ECOSYSTEM.map((e) => (
            <article
              key={e.tag}
              data-eco-card
              className="group relative grid h-[min(520px,calc(100vh-320px))] w-[min(88vw,1100px)] shrink-0 overflow-hidden rounded-[12px] border border-[#333333] bg-transparent md:grid-cols-[1fr_1.1fr]"
            >
              {/* LEFT — text column */}
              <div className="flex flex-col justify-between gap-6 p-6 md:p-10">
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
              <div className="relative min-h-[260px] overflow-hidden md:min-h-full">
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
// Our Story — long body + collage + Builder's Mindset block
// ---------------------------------------------------------------------------

function OurStory() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const w1 = gsap.utils.toArray<HTMLElement>("[data-story-word]");
      gsap.set(w1, { autoAlpha: 0.14 });
      gsap.to(w1, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: "[data-story-body]",
          start: "top 85%",
          end: "top 45%",
          scrub: 0.3,
        },
      });

      gsap.from("[data-builders-body]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-builders-body]",
          start: "top 85%",
        },
      });

      gsap.from("[data-story-tile]", {
        autoAlpha: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-story-collage]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        {/* 4-column flex layout matching the Figma exactly.
            Each column is a flex column so we control image heights precisely:
            Col 1 — OUR STORY text (top) + portrait image centered below
            Col 2 — SMALL image on top (fixed height), BIG image below (flex-1)
            Col 3 — single BIG image filling the full column height
            Col 4 — BIG image on top (flex-1), SMALL image below (fixed height) */}
        <div
          data-story-collage
          className="hidden gap-5 md:grid md:grid-cols-4 tablet:hidden"
          style={{ minHeight: "720px" }}
        >
          {/* Col 1 — OUR STORY text block + 480px portrait directly below.
              Image sits right after the text (no flex-center) so its position
              is deterministic, letting col 2 line up its gap center to the
              portrait's center using a fixed top spacer. */}
          <div className="flex min-h-0 flex-col">
            <div className="md:min-h-[220px]">
              <h2 className="heading-lg">OUR STORY</h2>
              <p
                data-story-body
                className="mt-6 text-left font-sans text-base font-medium leading-relaxed text-[#FFFFFF8C] md:mt-7 md:w-[calc(200%+1.25rem)] md:text-[17px] md:leading-[1.7]"
              >
                {STORY_BODY_WORDS.map((w, i) => (
                  <Fragment key={i}>
                    <span data-story-word className="inline-block">
                      {w}
                    </span>
                    {i < STORY_BODY_WORDS.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </p>
            </div>
            <div className="mt-6 md:mt-32">
              <div
                data-story-tile
                className="relative h-[420px] w-full overflow-hidden rounded-[8px] bg-bg-card md:h-[480px]"
              >
                <Image
                  src={STORY_COLLAGE.tall}
                  alt="AMEC engineer at the desk"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Col 2 — spacer + 240 top image + gap-4 + 460 bottom image. The
              spacer height is calculated so that col 2's inter-image gap
              CENTER aligns with col 1 portrait's CENTER:
                Col 1 portrait center (from column top) = 220 (text block) +
                  32 (mt-8) + 240 (half of 480) = 492
                Col 2 gap center (from column top) = spacer + 240 + 8
                â†’ spacer = 492 âˆ’ 248 = 244 */}
          <div className="flex min-h-0 flex-col gap-4">
            <div className="shrink-0 md:h-[244px]" aria-hidden />
            <div
              data-story-tile
              className="relative h-[220px] shrink-0 overflow-hidden rounded-[8px] bg-bg-card md:h-[240px]"
            >
              <Image
                src={STORY_COLLAGE.midTop}
                alt="AMEC team with race car"
                fill
                className="object-cover"
              />
            </div>
            <div
              data-story-tile
              className="relative h-[360px] shrink-0 overflow-hidden rounded-[8px] bg-bg-card md:h-[400px]"
            >
              <Image
                src={STORY_COLLAGE.midBottom}
                alt="AMEC workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Col 3 — top spacer pushes the image down; its bottom still
              lands at col 2 top image's bottom (y = 184 + 300 = 484).
              Spacer 184 + image 300 = 484, so bottom aligns with col 2 top
              image bottom and image is a bit taller than before. */}
          <div className="flex min-h-0 flex-col">
            <div className="shrink-0 md:h-[184px]" aria-hidden />
            <div
              data-story-tile
              className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-[8px] bg-bg-card md:h-[300px]"
            >
              <Image
                src={STORY_COLLAGE.rightTop}
                alt="AMEC Mobility presentation"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Col 4 — reduced heights: top image fixed, bottom image smaller.
              Small top spacer pushes col 4 top image down slightly so its top
              edge is a touch lower than col 3's. */}
          <div className="flex min-h-0 flex-col gap-4">
            <div className="shrink-0 md:h-[80px]" aria-hidden />
            <div
              data-story-tile
              className="relative h-[280px] shrink-0 overflow-hidden rounded-[8px] bg-bg-card md:h-[340px]"
            >
              <Image
                src={STORY_BUILDERS_IMAGE}
                alt="AMEC meeting room"
                fill
                className="object-cover"
              />
            </div>
            <div
              data-story-tile
              className="relative h-[160px] shrink-0 overflow-hidden rounded-[8px] bg-bg-card md:h-[180px]"
            >
              <Image
                src={STORY_COLLAGE.rightBottom}
                alt="AMEC team discussion"
                fill
                className="object-cover"
              />
            </div>

            {/* BUILDER'S MINDSET — placed inside col 4 so it flows directly
                below col 4's bottom image. Negative left margin + 2Ã— width
                extends it back into col 3 area, so the paragraph visually
                spans cols 3-4. */}
            <div className="md:mt-4 md:-ml-[calc(100%+1.25rem)] md:w-[calc(200%+1.25rem)]">
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white md:text-[22px]">
                Builder's Mindset
              </h3>
              <p
                data-builders-body
                className="mt-5 text-left font-sans text-base font-medium leading-relaxed text-[#FFFFFF8C] md:mt-6 md:text-[17px] md:leading-[1.75]"
              >
                {BUILDERS_BODY_1}
              </p>
              <p className="mt-4 text-left font-sans text-base font-medium leading-relaxed text-[#FFFFFF8C] md:mt-5 md:text-[17px] md:leading-[1.75]">
                {BUILDERS_BODY_2}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile fallback — simple stacked layout */}
        <div className="flex flex-col gap-10 md:hidden tablet:flex">
          <div>
            <h2 className="heading-lg">OUR STORY</h2>
            <p className="mt-6 font-sans text-sm leading-relaxed text-white/80">
              {STORY_BODY}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              STORY_COLLAGE.tall,
              STORY_COLLAGE.midTop,
              STORY_BUILDERS_IMAGE,
              STORY_COLLAGE.rightTop,
              STORY_COLLAGE.midBottom,
              STORY_COLLAGE.rightBottom,
            ].map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-bg-card"
              >
                <Image src={src} alt="AMEC moment" fill className="object-cover" />
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">
              Builder's Mindset
            </h3>
            <p className="mt-5 font-sans text-sm leading-relaxed text-[#FFFFFF8C]">
              {BUILDERS_BODY_1}
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#FFFFFF8C]">
              {BUILDERS_BODY_2}
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Vision & Long-Term Direction
// ---------------------------------------------------------------------------

function VisionAndDirection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-vision-card]", {
        autoAlpha: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      gsap.from("[data-vision-col]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[720px] w-full items-center justify-center overflow-hidden py-16 tablet:min-h-[640px] tablet:py-16 md:min-h-screen md:py-24"
    >
      {/* Full-bleed background image */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.6) 100%), url('/about/vision-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Shell className="relative">
        <div
          data-vision-card
          className="relative overflow-hidden rounded-[8px] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, #666666 0%, #1a1a1a 55%, #000000 100%)",
          }}
        >
          {/* subtle inner wash for glass depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 0% 0%, rgba(255,255,255,0.06), transparent 65%)",
            }}
          />

          <div className="relative grid gap-10 md:grid-cols-2 md:gap-14">
            {/* LEFT — heading, sub, CTA pinned to bottom */}
            <div
              data-vision-col
              className="flex h-full flex-col justify-between gap-10"
            >
              <div>
                <h3 className="font-display text-3xl font-semibold text-white md:text-[44px] md:leading-[1.08]">
                  Our Vision
                </h3>
                <p className="mt-3 font-display text-base text-white/80 md:text-lg">
                  Engineering the Future of Mobility
                </p>
              </div>

              <Link
                href="/contact"
                className="group/btn relative inline-flex items-center self-start rounded border border-white/20 bg-white/5 transition-all duration-300 ease-out hover:border-white hover:bg-white"
              >
                <span
                  aria-hidden
                  className="absolute left-1.5 top-1/2 grid h-7 w-7 -translate-y-1/2 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-[left,background-color,color] duration-500 ease-out group-hover/btn:left-[calc(100%-2.125rem)] group-hover/btn:bg-black group-hover/btn:text-white md:h-8 md:w-8 md:group-hover/btn:left-[calc(100%-2.375rem)]"
                >
                  <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
                <span className="block py-2 pl-11 pr-5 font-display text-sm font-medium text-white transition-all duration-500 ease-out group-hover/btn:pl-5 group-hover/btn:pr-11 group-hover/btn:text-black md:pl-12 md:text-base md:group-hover/btn:pr-12">
                  Partner with us
                </span>
              </Link>
            </div>

            {/* RIGHT — Long-Term Direction heading + both bodies */}
            <div data-vision-col className="flex flex-col gap-6">
              <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                Long-Term Direction
              </h3>
              <p className="text-[17px] leading-relaxed text-[#FFFFFF8C] md:text-[19px] md:leading-[1.6]">
                {VISION_BODY}
              </p>
              <p className="text-[17px] leading-relaxed text-[#FFFFFF8C] md:text-[19px] md:leading-[1.6]">
                {DIRECTION_BODY}
              </p>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Meet our Founders
// ---------------------------------------------------------------------------

function MeetFounders() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-founders-head]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      gsap.from("[data-founders-image]", {
        autoAlpha: 0,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-founders-image]", start: "top 85%" },
      });
      gsap.from("[data-founder-tag]", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-founders-image]", start: "top 70%" },
      });
      gsap.from("[data-founders-body]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-founders-bodies]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <div data-founders-head className="text-center">
          <h2 className="heading-lg">MEET OUR FOUNDERS</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#FFFFFF8C] md:text-[17px] md:leading-[1.6]">
            Our success is powered by a team that embraces challenges and pushes
            technological boundaries to shape the future of mobility.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-6xl md:mt-20">
          {/* Single large image with founder name tags overlaid bottom-left
              and bottom-right */}
          <div
            data-founders-image
            className="relative overflow-hidden rounded-[12px] bg-bg-card"
          >
            <Image
              src="/about/Our-Founders.png"
              alt="AMEC founders"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              priority={false}
            />

            {/* Bottom-left founder tag */}
            <div
              data-founder-tag
              className="hidden md:absolute md:bottom-10 md:left-10 md:flex md:flex-col md:gap-2"
            >
              <p className="font-display text-lg font-semibold text-white md:text-xl">
                {FOUNDERS[0].name}
              </p>
              <p className="text-sm text-white/70 md:text-[15px]">
                {FOUNDERS[0].role}
              </p>
              <a
                href={FOUNDERS[0].linkedin}
                aria-label={`${FOUNDERS[0].name} on LinkedIn`}
                className="mt-1 inline-flex h-7 w-7 items-center justify-center text-white/80 transition hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* Bottom-right founder tag */}
            <div
              data-founder-tag
              className="hidden md:absolute md:bottom-10 md:right-10 md:flex md:flex-col md:items-end md:gap-2"
            >
              <p className="font-display text-lg font-semibold text-white md:text-xl">
                {FOUNDERS[1].name}
              </p>
              <p className="text-sm text-white/70 md:text-[15px]">
                {FOUNDERS[1].role}
              </p>
              <a
                href={FOUNDERS[1].linkedin}
                aria-label={`${FOUNDERS[1].name} on LinkedIn`}
                className="mt-1 inline-flex h-7 w-7 items-center justify-center text-white/80 transition hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Mobile — tags flow below the image as a 2-col grid so names and
              roles don't collide the way they do when absolute-overlaid on a
              narrow card. Hidden on md+ where the desktop overlay above kicks in. */}
          <div className="mt-5 grid grid-cols-2 gap-4 md:hidden">
            <div data-founder-tag className="flex flex-col gap-1">
              <p className="font-display text-base font-semibold text-white">
                {FOUNDERS[0].name}
              </p>
              <p className="text-xs text-white/70">{FOUNDERS[0].role}</p>
              <a
                href={FOUNDERS[0].linkedin}
                aria-label={`${FOUNDERS[0].name} on LinkedIn`}
                className="mt-1 inline-flex h-7 w-7 items-center justify-center text-white/80 transition hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div data-founder-tag className="flex flex-col items-end gap-1 text-right">
              <p className="font-display text-base font-semibold text-white">
                {FOUNDERS[1].name}
              </p>
              <p className="text-xs text-white/70">{FOUNDERS[1].role}</p>
              <a
                href={FOUNDERS[1].linkedin}
                aria-label={`${FOUNDERS[1].name} on LinkedIn`}
                className="mt-1 inline-flex h-7 w-7 items-center justify-center text-white/80 transition hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Two paragraphs below the image */}
          <div
            data-founders-bodies
            className="mt-14 flex flex-col gap-8 md:mt-16"
          >
            <p
              data-founders-body
              className="text-left text-base leading-relaxed text-[#FFFFFF8C] md:text-[17px] md:leading-[1.65]"
            >
              {FOUNDERS_BODY_1}
            </p>
            <p
              data-founders-body
              className="text-left text-base leading-relaxed text-[#FFFFFF8C] md:text-[17px] md:leading-[1.65]"
            >
              {FOUNDERS_BODY_2}
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Growth Story — placeholder tiles
// ---------------------------------------------------------------------------

function GrowthStory() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-growth-head]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      gsap.from("[data-growth-tile]", {
        autoAlpha: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-growth-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <div data-growth-head className="text-center">
          <h2 className="heading-lg">OUR GROWTH STORY</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-[15px] md:leading-[1.6]">
            {GROWTH_INTRO}
          </p>
        </div>
      </Shell>

      {/* Image row — full-bleed; the 4 tiles sit centered so the middle 2 are
          fully visible while the outer 2 peek in from the left and right edges. */}
      <div data-growth-grid className="mt-12 w-full overflow-hidden md:mt-16">
        <div className="flex justify-center gap-5 md:gap-6">
          {GROWTH_IMAGES.map((src, i) => (
            <div
              key={i}
              data-growth-tile
              className="relative aspect-[4/4] w-[28vw] shrink-0 overflow-hidden rounded bg-bg-card"
            >
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 2017 — the founding year narrative
// ---------------------------------------------------------------------------

function GrowthYear() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin the section. 2017 is visible by default. On scroll, 2017 fades
      // out and the NOW chapter's elements reveal with a GSAP-style stagger
      // (fade + y offset, title first then entries) — no scroll-slide.
      const chapters = gsap.utils.toArray<HTMLElement>("[data-year-chapter]");

      // 2017 starts visible, NOW starts invisible
      gsap.set(chapters[0], { autoAlpha: 1 });
      gsap.set(chapters.slice(1), { autoAlpha: 0 });

      // Each NOW inner reveal item starts offset + hidden; the timeline
      // animates them in with a stagger so the chapter "reveals" neatly.
      for (let i = 1; i < chapters.length; i++) {
        const items = chapters[i].querySelectorAll<HTMLElement>("[data-reveal]");
        gsap.set(items, { autoAlpha: 0, y: 40 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${section.offsetHeight * (chapters.length - 1)}`,
          pin: true,
          scrub: 0.5,
          snap: {
            snapTo: 1 / Math.max(1, chapters.length - 1),
            duration: 0.4,
            delay: 0.08,
            ease: "power2.inOut",
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < chapters.length; i++) {
        const prev = chapters[i - 1];
        const next = chapters[i];
        const nextItems = next.querySelectorAll<HTMLElement>("[data-reveal]");

        tl.to(
          prev,
          { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" },
          i - 1
        )
          .to(
            next,
            { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
            i - 1 + 0.3
          )
          .to(
            nextItems,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: "power3.out",
            },
            i - 1 + 0.35
          );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]"
    >
      {/* 2017 chapter — visible by default */}
      <div
        data-year-chapter
        className="absolute inset-0 flex items-start pt-20 md:pt-28"
      >
        <Shell>
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-20">
            <h2 className="font-display text-[72px] font-bold leading-none text-white md:text-[120px] lg:text-[160px]">
              2017
            </h2>
            <p className="max-w-[640px] justify-self-end text-base leading-relaxed text-white/75 md:text-[18px] md:leading-[1.75]">
              {GROWTH_YEAR_BODY}
            </p>
          </div>
        </Shell>
      </div>

      {/* NOW chapter — revealed on next scroll */}
      <div
        data-year-chapter
        className="absolute inset-0 flex items-start pt-20 md:pt-28"
      >
        <Shell>
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-20">
            <h2
              data-reveal
              className="font-display text-[72px] font-bold leading-none text-white md:text-[120px] lg:text-[160px]"
            >
              NOW
            </h2>
            <div className="flex max-w-[640px] flex-col justify-self-end divide-y divide-white/10">
              {NOW_ENTRIES.map((entry, i) => {
                const isFirst = i === 0;
                const isLast = i === NOW_ENTRIES.length - 1;
                const spacing = isFirst
                  ? "pb-8 md:pb-10"
                  : isLast
                    ? "pt-8 md:pt-10"
                    : "py-8 md:py-10";
                return (
                  <div
                    key={entry.title}
                    data-reveal
                    className={spacing}
                  >
                    <h3 className="font-display text-base font-semibold text-white md:text-lg">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/60 md:text-[14px]">
                      {entry.subtitle}
                    </p>
                    {entry.body.map((p, pi) => (
                      <p
                        key={pi}
                        className="mt-5 text-sm leading-relaxed text-white/75 md:text-[15px] md:leading-[1.7]"
                      >
                        {p}
                      </p>
                    ))}
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
// Engineering & R&D Capabilities — 4 cards
// ---------------------------------------------------------------------------

function EngineeringCapabilities() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-cap-head]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      gsap.from("[data-cap-card]", {
        autoAlpha: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-cap-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        {/* Header — heading left, description right, both left-justified */}
        <div
          data-cap-head
          className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-start md:gap-16"
        >
          <h2 className="font-display text-2xl font-semibold uppercase leading-[1.1] text-white md:text-[32px] lg:text-[40px]">
            Engineering &
            <br />
            R&D Capabilities
          </h2>
          <p className="text-left text-sm leading-relaxed text-[#FFFFFF8C] md:text-[18px] md:leading-[1.6]">
            Manage tasks, collaborate in real time, and empower your team to
            achieve more — all from a single, intuitive dashboard.
          </p>
        </div>

        <div
          data-cap-grid
          className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-4"
        >
          {CAPABILITIES.map((c) => (
            <div
              key={c.title}
              data-cap-card
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-bg-card px-3 pb-3 pt-6 md:px-4 md:pb-4 md:pt-7"
            >
              <div className="px-3 md:px-4">
                <h3 className="font-display text-lg font-semibold text-white md:text-xl lg:text-[22px]">
                  {c.title}
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-white/65 md:text-[13px] md:leading-[1.6]">
                  {c.body}
                </p>
              </div>
              {/* Image — placeholder visual, swap paths later */}
              <div className="relative mt-6 min-h-[260px] w-full flex-1 overflow-hidden rounded-xl bg-[#0A0A0A] md:min-h-[300px]">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Industries We Serve
// ---------------------------------------------------------------------------

function IndustriesWeServe() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-ind-head]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      gsap.from("[data-ind-card]", {
        autoAlpha: 0,
        y: 36,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-ind-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28">
      <Shell>
        <div data-ind-head className="text-center">
          <h2 className="heading-lg">INDUSTRIES WE SERVE</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-[15px] md:leading-[1.6]">
            From electric mobility to renewable energy and defense, our
            technologies enable innovation across industries.
          </p>
        </div>

        <div
          data-ind-grid
          className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-4"
        >
          {INDUSTRIES.map((ind) => (
            <article
              key={ind.title}
              data-ind-card
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-bg-card"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={ind.image}
                  alt={ind.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-display text-base font-semibold text-white md:text-lg">
                  {ind.title}
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
// Our Clients — logo grid
// ---------------------------------------------------------------------------

function OurClients() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-clients-head]", {
        autoAlpha: 0,
        x: -24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      gsap.from("[data-client-logo]", {
        autoAlpha: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-clients-grid]", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-20">
      <Shell>
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
          <h2
            data-clients-head
            className="font-display text-2xl font-semibold uppercase tracking-wide text-white md:text-[32px] lg:text-[40px]"
          >
            Our
            <br />
            Clients
          </h2>

          <div
            data-clients-grid
            className="grid w-full max-w-[1100px] grid-cols-3 justify-self-end gap-3 md:grid-cols-4 md:gap-4 tablet:grid-cols-3 tablet:gap-3"
          >
            {CLIENT_LOGOS.map((c) => (
              <div
                key={c.name}
                data-client-logo
                className="relative flex aspect-[16/9] items-center justify-center rounded-xl bg-white p-3 md:p-4"
              >
                <Image
                  src={c.src}
                  alt={c.name}
                  width={200}
                  height={80}
                  className="max-h-[75%] max-w-[80%] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Customer Stories — video testimonial card
// ---------------------------------------------------------------------------

function CustomerStories() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    const pin = pinRef.current;
    if (!el || !pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => `+=${CUSTOMER_STORIES.length * 25}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const total = CUSTOMER_STORIES.length;
          const raw = self.progress * total;
          const idx = Math.min(total - 1, Math.floor(raw));
          const local = raw - idx; // 0 â†’ 1 within this slide
          setActiveIndex(idx);
          setProgress(local);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const current = CUSTOMER_STORIES[activeIndex];

  return (
    <section ref={sectionRef} className="w-full">
      <div
        ref={pinRef}
        className="relative flex min-h-screen w-full items-center overflow-hidden py-10 md:py-14"
      >
        <Shell className="relative w-full">
          {/* MAIN GRID — heading on left, portrait + stat on right */}
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            {/* LEFT — eyebrow + rotating heading */}
            <div className="flex flex-col gap-10 md:gap-14">
              <p className="font-display text-sm font-medium uppercase tracking-[0.18em] text-white/60 md:text-[15px]">
                Customer Stories
              </p>

              <h2 className="font-display text-3xl font-semibold leading-[1.15] text-white md:text-[44px] md:leading-[1.1]">
                {CUSTOMER_STORIES[0].heading}
              </h2>
            </div>

            {/* RIGHT — portrait with stat card overlay */}
            <div className="relative mx-auto w-full max-w-[480px]">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[12px] bg-bg-card">
                {CUSTOMER_STORIES.map((s, i) => (
                  <div
                    key={s.image}
                    aria-hidden={i !== activeIndex}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      i === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={s.image}
                      alt={`${s.brand} customer story`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Stat card overlay — bottom-right, inside the image */}
              <div className="absolute bottom-4 right-4 w-[180px] rounded-[12px] bg-white p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] md:bottom-6 md:right-6 md:w-[200px] md:p-6">
                {CUSTOMER_STORIES.map((s, i) => (
                  <div
                    key={`${s.brand}-${s.statValue}`}
                    aria-hidden={i !== activeIndex}
                    className={`transition-opacity duration-500 ${
                      i === activeIndex ? "opacity-100" : "pointer-events-none absolute inset-0 p-5 opacity-0 md:p-6"
                    }`}
                  >
                    <p className="font-display text-3xl font-semibold leading-none text-black md:text-[40px]">
                      {s.statValue}
                    </p>
                    <p className="mt-3 text-xs leading-tight text-black/70 md:text-sm">
                      {s.statLabel}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM — logo strip + active progress bar */}
          <div className="mt-8 md:mt-10">
            <div className="grid grid-cols-4 items-center gap-6 md:gap-10">
              {CUSTOMER_STORIES.map((s, i) => (
                <div
                  key={`${s.brand}-${i}`}
                  className={`relative flex h-7 items-center justify-center transition-opacity duration-300 md:h-9 ${
                    i === activeIndex ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <Image
                    src={s.logo}
                    alt={s.brand}
                    width={160}
                    height={48}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Progress rail — fills across the current slot */}
            <div className="relative mt-4 h-px w-full bg-white/10 md:mt-5">
              <div
                className="absolute left-0 top-0 h-px bg-white transition-[width] duration-200 ease-linear"
                style={{
                  width: `${((activeIndex + progress) / CUSTOMER_STORIES.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </Shell>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing CTA — pinned full-bleed heading band with concentric rings, with
// two action cards below. Mirrors the mobility / careers CTA.
// ---------------------------------------------------------------------------

function ClosingCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin the headband for the full reveal gesture — matches the Technology
      // (performance-accumulator) ClosingCTA pattern exactly.
      ScrollTrigger.create({
        trigger: "[data-cta-headband]",
        start: "top top",
        end: "+=100%",
        pin: "[data-cta-headband]",
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Word-by-word scrub reveal within a tight +=15% range so one gesture
      // completes the whole heading.
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

      // CTA button entrance — back-out pop, fires once as section enters
      gsap.from("[data-cta-btn]", {
        autoAlpha: 0,
        y: 30,
        scale: 0.9,
        duration: 0.7,
        delay: 0.2,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: "[data-cta-headband]", start: "top 70%" },
      });

      // Ambient drifting radial glow — slow yoyo
      gsap.to("[data-cta-glow]", {
        xPercent: 8,
        yPercent: -5,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Pulse rings — 5 concentric rings continuously expanding outward,
      // staggered start times so they're always visible mid-pulse.
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

      // Two action cards fade/slide in once visible below the pinned band
      gsap.from("[data-cta-sub]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-cta-subs]", start: "top 85%" },
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="w-full">
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
