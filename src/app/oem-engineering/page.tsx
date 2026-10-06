"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const INTRO_LEAD =
  "“This is where AMEC becomes a long-term partner, not a vendor.”";
const INTRO_BODY =
  "AMEC OEM Solutions is dedicated to helping startups and companies transform concepts into production-ready products. We work as an extended engineering team—taking ownership across design, development, validation, and manufacturing readiness. Our approach is rooted in system-level engineering, real-world validation, and scalability, ensuring that products are not only innovative but also reliable and manufacturable.";
const INTRO_BODY_WORDS = INTRO_BODY.split(" ");

const FEATURED_PROJECTS = [
  {
    title: "Promec Aquaforce high pressure Washer system",
    body:
      "Experience powerful, portable cleaning without the need for power sockets or cables.",
    image: "/OEM/Promec Aquaforce high pressure Washer system.png",
    href: "/pressure-washer-kit",
  },
  {
    title: "Ai-edge Super Surveillance & Prevention System",
    body:
      "Real-time surveillance and intelligent alerts for safer, smarter worksite monitoring.",
    image: "/OEM/Ai-edge Super Surveillance & Prevention System.png",
    href: "/early-warning",
  },
  {
    title: "HV Performance Accumulators",
    body:
      "Advanced battery technology engineered for higher power density, thermal efficiency, and demanding EV performance.",
    image: "/OEM/HV Performance Accumulators.png",
    href: "/performance-accumulator",
  },
];

const CAPABILITIES = [
  {
    title: "Mechanical Engineering",
    body: "3D modeling, structural analysis, and precision mechanisms.",
    image: "/OEM/Mechanical-Engineering.png",
  },
  {
    title: "Electrical & Electronics",
    body: "Schematics, PCB layout, and signal integrity — prototype to production.",
    image: "/OEM/Electrical-engineering.png",
  },
  {
    title: "Embedded Systems",
    body: "Firmware, device drivers, and reliable system integration.",
    image: "/OEM/Embedded-systems.png",
  },
  {
    title: "Product Validation",
    body: "Test plans, environmental testing, and performance verification.",
    image: "/OEM/Product-validation.png",
  },
  {
    title: "Manufacturing & Certification",
    body: "DFM, tooling, and production planning for scale.",
    image: "/OEM/Manufacturing&Certification.png",
  },
];

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Concept",
    body:
      "The first stage of the design process involves interpreting our customers' vision using Amec's internal toolsets. Our team's vast experience in high-performance technology research and development supports this phase, and we work together with our customers to find the optimal solution for their application.",
    image: "/OEM/Image (Technology-1).png",
  },
  {
    id: "02",
    title: "Development",
    body:
      "System architecture, modelling, and detailed engineering across mechanical, electrical, and embedded disciplines. We make every trade-off explicit so each decision is data-backed before we commit to tooling.",
    image: "/OEM/Image (Development).png",
  },
  {
    id: "03",
    title: "Rapid Prototyping",
    body:
      "Fast, iterative prototyping cycles let us validate assumptions on the bench and in the field. We lock design intent only after real-world data confirms it.",
    image: "/OEM/Image (Rapid Prototyping).png",
  },
  {
    id: "04",
    title: "Homologation & Certification",
    body:
      "Environmental, electrical, EMC, and duty-cycle testing — each unit earns its certification path on performance, safety, and reliability metrics required for the target market.",
    image: "/OEM/Image (Homologation Certification).png",
  },
  {
    id: "05",
    title: "Industrialisation",
    body:
      "Design-for-manufacturing, supplier qualification, and process planning. We turn validated prototypes into a repeatable, cost-efficient production line.",
    image: "/OEM/Image (Industrialisation).png",
  },
  {
    id: "06",
    title: "Series Production",
    body:
      "Pilot runs, yield ramp, and continuous improvement. We hand off a design that is manufacturable at volume — not just working on the bench — with the quality systems to keep it that way.",
    image: "/OEM/Image (Series Production).png",
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: "01",
    title: "Full Project Ownership",
    body:
      "AMEC takes end-to-end responsibility for the product development lifecycle, from system architecture to validation and manufacturing readiness.",
  },
  {
    id: "02",
    title: "Co-Development",
    body:
      "A collaborative engagement where AMEC works closely with the partner's internal engineering teams, owning critical subsystems while aligning with the broader product roadmap.",
  },
  {
    id: "03",
    title: "Custom Projects",
    body:
      "Scope-defined and milestone-driven engagements focused on specific subsystems, performance challenges, or targeted engineering sprints.",
  },
];

const PARTNERS = [
  {
    label: "[ CORE VALUE 01 ]",
    title: "Startups with a concept",
    body:
      "AMEC OEM Solutions is ideal for startups that have a strong product idea but need experienced engineering support to bring it to life. We help early-stage teams translate concepts into engineered systems by defining architecture, validating feasibility, and building prototypes that are ready to scale into production. Our approach reduces technical risk and helps founders focus on marketplace business execution.",
  },
  {
    label: "[ CORE VALUE 02 ]",
    title: "Companies entering EV or energy market",
    body:
      "For companies expanding into electric mobility or energy systems, AMEC provides the technical depth required to enter new domains with confidence. We support platform development, technology selection, and system integration — ensuring products meet performance, safety, and compliance expectations from day one. This enables faster entry into complex, regulation-driven markets.",
  },
  {
    label: "[ CORE VALUE 03 ]",
    title: "OEMs needing rapid development",
    body:
      "Established OEMs partner with AMEC when speed, reliability, and engineering ownership are critical. We support rapid development of new platforms, subsystems, or performance upgrades while maintaining structured validation and manufacturing readiness. Our teams integrate seamlessly with existing processes to deliver results without disrupting ongoing programs.",
  },
];

const CLIENTS = [
  { name: "Tata Motors", logo: "/OEM/logos/tata-motors.png" },
  { name: "Hero Electric", logo: "/OEM/logos/Hero-electric-logo.png" },
  { name: "ISRO", logo: "/OEM/logos/isro-logo.png" },
  { name: "Indian Railways", logo: "/OEM/logos/Indian-railways.png" },
  { name: "Tunwal", logo: "/OEM/logos/Tunwal-logo.png" },
  { name: "Ajmera", logo: "/OEM/logos/Ajmeera.png" },
  { name: "Safairo", logo: "/OEM/logos/Safario-logo.png" },
  { name: "Pexa", logo: "/OEM/logos/pexa.png" },
  { name: "Joy", logo: "/OEM/logos/joy-logo.png", scale: 1.4 },
  { name: "Fixigo", logo: "/OEM/logos/fixigo.png" },
  { name: "MITM", logo: "/OEM/logos/MITM-logo.png" },
  { name: "Hoora", logo: "/OEM/logos/Hoora-logo.png", scale: 1.4 },
];

const AREAS_OF_INTEREST = [
  "OEM Engineering",
  "Powertrain & Battery",
  "SOURCE Energy System",
  "Partnership",
  "Other",
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OemEngineeringPage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedProjects />
      <EngineeringCapabilities />
      <OurProcess />
      <EngagementModel />
      <WhoWeWorkWith />
      <OurClients />
      <JustSendIt />
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
  const pinRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const pinTarget = pinRef.current;
    if (!pinTarget) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=80%",
        pin: pinTarget,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-oem-hero-eyebrow]", { autoAlpha: 0, y: 20, duration: 0.6 })
        .from(
          "[data-oem-hero-title] span",
          { autoAlpha: 0, y: 30, stagger: 0.08, duration: 0.9 },
          "-=0.3"
        )
        .from(
          "[data-oem-hero-image]",
          { autoAlpha: 0, scale: 0.96, duration: 1.0 },
          "-=0.6"
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
      className="relative isolate h-screen w-full overflow-hidden bg-bg"
    >
      {/* Full-bleed background video — autoplay, muted, loop */}
      <div data-oem-hero-image className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/videos/OEM-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      {/* Readability overlay — gradient + spotlight so text stays legible.
          Bottom reaches fully-opaque black so the hero blends seamlessly
          into the dark section below (no visible seam). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.45) 80%, #0A0A0A 100%), radial-gradient(60% 80% at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Top-center eyebrow + title */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-28 text-center md:pt-36">
        <p data-oem-hero-eyebrow className="eyebrow">
          Engineering Services
        </p>
        <h1 data-oem-hero-title className="mt-3 heading-xl">
          {"OEM ENGINEERING".split(" ").map((word, i) => (
            <Fragment key={i}>
              <span className="inline-block">{word}</span>
              {i === 0 ? " " : ""}
            </Fragment>
          ))}
        </h1>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Intro
// ---------------------------------------------------------------------------

function Intro() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-oem-intro-lead]", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });

      gsap.set("[data-oem-intro-word]", { autoAlpha: 0.15 });
      gsap.to("[data-oem-intro-word]", {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 20%",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Shell>
        <div className="mx-auto max-w-4xl">
          <p
            data-oem-intro-lead
            className="text-center font-display text-lg leading-relaxed text-white/50 md:text-2xl"
          >
            {INTRO_LEAD}
          </p>
          <p className="mt-10 text-left font-display text-base leading-relaxed text-white/60 md:text-xl">
            {INTRO_BODY_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span
                  data-oem-intro-word
                  className={`inline-block ${i < 3 ? "font-semibold text-white" : ""}`}
                >
                  {word}
                </span>
                {i < INTRO_BODY_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Featured Projects
// ---------------------------------------------------------------------------

function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(
        "[data-oem-projects-eyebrow], [data-oem-projects-sub]",
        {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      gsap.from("[data-oem-project-card]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-oem-project-grid]", start: "top 85%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Shell>
        <div className="mx-auto max-w-2xl text-center">
          <h2 data-oem-projects-eyebrow className="heading-lg">
            FEATURED PROJECTS
          </h2>
          <p
            data-oem-projects-sub
            className="mt-4 text-sm leading-relaxed text-white/60 md:text-base"
          >
            AMEC embodies a strong culture, driven by a talented and dedicated
            team. As we grow, so does the team.
          </p>
        </div>

        <div
          data-oem-project-grid
          className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3"
        >
          {FEATURED_PROJECTS.map((p) => (
            <article
              key={p.title}
              data-oem-project-card
              className="group flex flex-col overflow-hidden rounded-card border border-white/[0.06] bg-bg-card transition-colors hover:border-white/20"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%), url('${encodeURI(p.image)}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white md:text-lg">
                  {p.title}
                </h3>
                <p className="flex-1 text-xs leading-relaxed text-white/60 md:text-sm">
                  {p.body}
                </p>
                <Link
                  href={p.href}
                  className="group/btn mt-2 inline-flex items-center gap-3 self-start rounded border border-white/20 py-1 pl-1 pr-4 font-display text-xs font-medium text-white transition-all duration-300 ease-out hover:flex-row-reverse hover:border-white hover:bg-white hover:pl-4 hover:pr-1 hover:text-black"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover/btn:bg-black group-hover/btn:text-white">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  Explore More
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
// Engineering Capabilities
// ---------------------------------------------------------------------------

function EngineeringCapabilities() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Enable/disable arrow buttons based on current scroll position
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Mouse drag support on desktop (touch swipe handled natively via overflow)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let moved = false;
    let startX = 0;
    let scrollStart = 0;

    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest("button")) return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      scrollStart = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
      el.style.scrollBehavior = "auto";
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const walk = e.clientX - startX;
      if (Math.abs(walk) > 3) moved = true;
      el.scrollLeft = scrollStart - walk;
    };
    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = "";
      el.style.userSelect = "";
      el.style.scrollBehavior = "";
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(
        "[data-oem-cap-eyebrow], [data-oem-cap-sub]",
        {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      gsap.from("[data-oem-cap-card]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-oem-cap-rail]", start: "top 85%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-oem-cap-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Shell>
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
          <h2 data-oem-cap-eyebrow className="heading-lg">
            ENGINEERING CAPABILITIES
          </h2>
          <p
            data-oem-cap-sub
            className="text-sm leading-relaxed text-white/60 md:pb-2 md:text-base"
          >
            End-to-end engineering expertise powering next-generation products.
          </p>
        </div>

        <div data-oem-cap-rail className="relative mt-12 md:mt-16">
          <div
            ref={trackRef}
            className="flex cursor-grab snap-x snap-proximity gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                data-oem-cap-card
                className="group flex w-[80vw] shrink-0 snap-start flex-col gap-5 rounded-card border border-white/[0.06] bg-bg-card p-6 transition-colors hover:border-white/20 md:w-[360px] lg:w-[400px]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/[0.06]">
                  <div
                    aria-hidden
                    className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${encodeURI(c.image)}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white md:text-lg">
                    {c.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-white/60">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Rail navigation arrows */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous"
            className="absolute -left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/80 disabled:pointer-events-none disabled:opacity-30 md:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            aria-label="Next"
            className="absolute -right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/80 disabled:pointer-events-none disabled:opacity-30 md:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Our Process
// ---------------------------------------------------------------------------

function OurProcess() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  // Separate hover state — while hovering an inactive panel, the HOVERED
  // one takes the "wide + full copy" presentation. When mouse leaves, the
  // clicked `active` panel takes over again.
  const [hovered, setHovered] = useState<number | null>(null);
  const displayed = hovered ?? active;

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(
        "[data-oem-process-eyebrow], [data-oem-process-sub]",
        {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      gsap.from("[data-oem-process-card]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Shell>
        {/* Header row — title left, description right */}
        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-16">
          <h2 data-oem-process-eyebrow className="heading-lg">
            OUR PROCESS
          </h2>
          <p
            data-oem-process-sub
            className="text-sm leading-relaxed text-white/60 md:text-base"
          >
            AMEC OEM Solutions helps startups and companies transform concepts
            into production-ready products. As an extended engineering team,
            we take ownership across design, development, validation, and
            manufacturing — ensuring products are innovative, reliable, and
            manufacturable.
          </p>
        </div>

        {/* Accordion image rail — one wide active panel + narrow preview
            slivers for every other step. Hover expands the slivers so you
            can peek at the next step's image before clicking. Click sets a
            new active step and the active panel's content (title, body)
            swaps in with a cross-fade. */}
        <div
          data-oem-process-card
          className="mt-12 flex h-[480px] w-full overflow-hidden rounded-card border border-white/[0.06] md:mt-16 md:h-[560px]"
        >
          {PROCESS_STEPS.map((step, i) => {
            const isDisplayed = i === displayed;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                aria-pressed={i === active}
                aria-label={`${step.id} — ${step.title}`}
                className={`group/panel relative overflow-hidden border-r border-white/15 text-left transition-[flex-grow] duration-500 ease-out last:border-r-0 ${
                  isDisplayed ? "flex-[8]" : "flex-[1]"
                }`}
              >
                {/* Panel background image */}
                <div
                  aria-hidden
                  className={`absolute inset-0 transition-transform duration-700 ease-out ${
                    isDisplayed ? "scale-100" : "scale-110"
                  }`}
                  style={{
                    backgroundImage: `url('${encodeURI(step.image)}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Dark gradient — stronger when a sliver so the number stays legible */}
                <div
                  aria-hidden
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isDisplayed
                      ? "bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.9)_100%)]"
                      : "bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.9)_100%)]"
                  }`}
                />

                {/* Sliver label — vertical number at the bottom */}
                {!isDisplayed && (
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-3 pb-6 md:pb-8">
                    <span className="font-display text-xs font-semibold tracking-[0.18em] text-white/70 md:text-sm">
                      {step.id}
                    </span>
                  </div>
                )}

                {/* Displayed panel — big title + description bottom-left */}
                {isDisplayed && (
                  <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10">
                    <div
                      key={step.id}
                      className="max-w-2xl animate-[fadeInUp_0.4s_ease-out]"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-sm font-semibold tracking-[0.2em] text-white md:text-base">
                          {step.id}
                        </span>
                        <span className="font-display text-lg font-semibold text-white md:text-2xl">
                          {step.title}
                        </span>
                      </div>
                      <p className="mt-4 text-xs leading-relaxed text-white/85 md:text-sm">
                        {step.body}
                      </p>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Engagement Model
// ---------------------------------------------------------------------------

function EngagementModel() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin the whole section while the user scrolls through all 3 models.
      // Each card gets its own "scroll slot" where its big number counts in
      // and the title/body reveal.
      const cards = gsap.utils.toArray<HTMLElement>("[data-oem-em-card]");
      if (!cards.length) return;

      // Initial — header is immediate on-enter, cards start deep below and
      // dim. We scrub-reveal them one at a time during the pin.
      gsap.from("[data-oem-em-eyebrow], [data-oem-em-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });

      gsap.set(cards, { autoAlpha: 0, y: 80, scale: 0.95 });
      gsap.set("[data-oem-em-progress]", { scaleY: 0, transformOrigin: "top" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${cards.length * 30}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      // Progress rail grows across the full pin
      tl.to(
        "[data-oem-em-progress]",
        { scaleY: 1, ease: "none", duration: cards.length },
        0
      );

      // Each card gets its own 1-unit slot of the timeline
      cards.forEach((card, i) => {
        tl.to(
          card,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 },
          i
        );
        // Previous card dims as the next one takes focus
        if (i < cards.length - 1) {
          tl.to(
            card,
            { autoAlpha: 0.3, scale: 0.97, duration: 0.4 },
            i + 0.7
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
      className="relative flex h-screen w-full flex-col justify-center overflow-hidden pb-10 pt-24 md:pb-16 md:pt-28"
    >
      <Shell>
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-16">
          {/* LEFT — heading + description stacked, vertically centered against the card stack */}
          <div>
            <h2 data-oem-em-eyebrow className="heading-lg">
              ENGAGEMENT MODEL
            </h2>
            <p
              data-oem-em-sub
              className="mt-5 max-w-md text-sm leading-relaxed text-white/60 md:text-base"
            >
              Three structured ways to partner with AMEC — from full
              lifecycle ownership to targeted engineering sprints.
            </p>
          </div>

          {/* RIGHT — stacked card showcase with vertical progress rail */}
          <div className="relative grid gap-6 md:grid-cols-[auto_1fr] md:gap-8">
            {/* Progress rail — fills from top to bottom during the pin */}
            <div className="relative hidden h-full w-[2px] self-stretch bg-white/10 md:block">
              <div
                data-oem-em-progress
                aria-hidden
                className="absolute inset-x-0 top-0 h-full origin-top bg-white"
              />
            </div>

            <div className="flex flex-col gap-6">
              {ENGAGEMENT_MODELS.map((m) => (
                <article
                  key={m.id}
                  data-oem-em-card
                  className="relative overflow-hidden rounded-card border border-white/[0.08] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-6 md:p-10"
                >
                  <div className="relative">
                    {/* Title row: number + title */}
                    <div className="flex items-baseline gap-5 md:gap-6">
                      <span className="font-display text-xl font-semibold text-white md:text-3xl">
                        {m.id}
                      </span>
                      <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-white md:text-2xl">
                        {m.title}
                      </h3>
                    </div>
                    {/* Description below */}
                    <p className="mt-4 text-sm leading-relaxed text-white/70 md:mt-5 md:text-base">
                      {m.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Who We Work With
// ---------------------------------------------------------------------------

function WhoWeWorkWith() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header fades in on entry
      gsap.from("[data-oem-www-heading], [data-oem-www-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });

      // Top line draws in first for each column, then the content below fades up —
      // columns reveal one after another, left to right.
      gsap.set("[data-oem-www-line]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-oem-www-content]", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: "[data-oem-www-grid]", start: "top 85%" },
      });

      const lines = gsap.utils.toArray<HTMLElement>("[data-oem-www-line]");
      const contents = gsap.utils.toArray<HTMLElement>("[data-oem-www-content]");

      lines.forEach((line, i) => {
        const at = i * 0.5;
        tl.to(line, { scaleX: 1, duration: 0.6 }, at);
        if (contents[i]) {
          tl.to(contents[i], { autoAlpha: 1, y: 0, duration: 0.6 }, at + 0.15);
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
      className="relative w-full overflow-hidden py-20 md:py-28"
    >
      <Shell>
        {/* Header */}
        <div className="text-center">
          <h2 data-oem-www-heading className="heading-lg">
            WHO WE WORK WITH
          </h2>
          <p
            data-oem-www-sub
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            From early-stage founders to established OEMs — our model flexes
            to the way you work.
          </p>
        </div>

        {/* 3-column line-topped layout — no card background, no watermark */}
        <div
          data-oem-www-grid
          className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-12"
        >
          {PARTNERS.map((p) => (
            <article key={p.title} className="relative flex h-full flex-col">
              {/* Top hairline — draws left-to-right on reveal */}
              <span
                data-oem-www-line
                aria-hidden
                className="block h-px w-full bg-white/70"
              />

              <div data-oem-www-content className="mt-8 flex flex-1 flex-col md:mt-10">
                <span className="font-display text-xs font-semibold tracking-[0.22em] text-white/50 md:text-sm">
                  {p.label}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold leading-tight text-white md:mt-8 md:text-2xl lg:text-[28px]">
                  {p.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-white/70 md:mt-6 md:text-[15px]">
                  {p.body}
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
// Our Clients
// ---------------------------------------------------------------------------

function OurClients() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-oem-clients-heading], [data-oem-clients-sub]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });

      gsap.from("[data-oem-marquee-row]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Split logos into two rows so each marquee has visual density
  const half = Math.ceil(CLIENTS.length / 2);
  const rowA = CLIENTS.slice(0, half);
  const rowB = CLIENTS.slice(half);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Shell>
        <div className="text-center">
          <h2 data-oem-clients-heading className="heading-lg">
            OUR CLIENTS
          </h2>
          <p
            data-oem-clients-sub
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            Trusted by industry leaders across mobility, energy, defence, and
            manufacturing.
          </p>
        </div>
      </Shell>

      <div className="mt-14 flex flex-col gap-6 md:mt-20 md:gap-8">
        <MarqueeRow clients={rowA} direction="left" />
        <MarqueeRow clients={rowB} direction="right" />
      </div>
    </section>
  );
}

function MarqueeRow({
  clients,
  direction,
}: {
  clients: typeof CLIENTS;
  direction: "left" | "right";
}) {
  // Duplicate the sequence so the -50% translate loops seamlessly
  const loop = [...clients, ...clients];
  return (
    <div data-oem-marquee-row className="marquee-mask overflow-hidden">
      <div className={`marquee-track ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {loop.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="mx-4 flex h-20 w-40 shrink-0 items-center justify-center rounded-md bg-white px-6 py-4 md:mx-5 md:h-24 md:w-48"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.logo}
              alt={client.name}
              loading="lazy"
              className="max-h-10 max-w-full object-contain md:max-h-14"
              style={client.scale ? { transform: `scale(${client.scale})` } : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Just Send It CTA — contact form
// ---------------------------------------------------------------------------

function JustSendIt() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(
        "[data-oem-cta-left], [data-oem-cta-form]",
        {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("success");
    (e.currentTarget as HTMLFormElement).reset();
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Shell>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-16">
          {/* LEFT — big headline + hint (no container) */}
          <div data-oem-cta-left className="flex flex-col gap-10">
            <h2 className="heading-xl !normal-case">
              Just<br />send it.
            </h2>

            <div className="h-px w-full bg-white/10" />

            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div>
                <h3 className="text-sm font-semibold text-white md:text-base">
                  You don't like forms?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Partner with AMEC for end-to-end EV engineering — from concept
                  to production-ready solutions.
                </p>
                <a
                  href="mailto:hello@amectechnology.com"
                  className="group relative mt-5 inline-flex items-center rounded border border-white/20 bg-transparent h-9 pl-9 pr-4 font-display text-sm font-medium text-white transition-all duration-500 ease-out hover:border-white hover:bg-white hover:pl-4 hover:pr-9 hover:text-black"
                >
                  <span className="whitespace-nowrap">hello@amectechnology.com</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center overflow-hidden rounded bg-white text-black transition-all duration-500 ease-out group-hover:left-[calc(100%-2rem)] group-hover:bg-black group-hover:text-white"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white md:text-base">
                  Looking to do great work?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Have a project in mind? Reach out and our team will get back
                  to you within 24 hours.
                </p>
                <Link
                  href="#"
                  className="group relative mt-5 inline-flex items-center rounded border border-white/20 bg-transparent h-9 pl-9 pr-4 font-display text-sm font-medium text-white transition-all duration-500 ease-out hover:border-white hover:bg-white hover:pl-4 hover:pr-9 hover:text-black"
                >
                  <span className="whitespace-nowrap">Job Openings</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center overflow-hidden rounded bg-white text-black transition-all duration-500 ease-out group-hover:left-[calc(100%-2rem)] group-hover:bg-black group-hover:text-white"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT — form in its own card */}
          <form
            data-oem-cta-form
            onSubmit={handleSubmit}
            className="group/form grid grid-cols-1 gap-5 rounded-card border border-white/[0.06] bg-bg-card p-6 transition-[border-color,box-shadow] duration-300 hover:border-white/15 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] md:grid-cols-2 md:p-10"
          >
            <Field label="Full Name" placeholder="Enter your full name" name="name" />
            <Field label="Mail ID" placeholder="Enter your email" name="email" type="email" />
            <Field label="Phone Number" placeholder="Enter your phone number" name="phone" />
            <Field
              label="Company / Organization"
              placeholder="Enter your company name"
              name="company"
            />

            <div className="md:col-span-2">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Enquiry Type
              </label>
              <select
                name="area"
                defaultValue=""
                className="w-full cursor-pointer rounded border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition-all duration-200 hover:border-white/40 hover:bg-white/[0.03] focus:border-white/50 focus:ring-2 focus:ring-white/20"
              >
                <option value="" disabled className="bg-bg-card">
                  Select an area of interest
                </option>
                {AREAS_OF_INTEREST.map((a) => (
                  <option key={a} value={a} className="bg-bg-card">
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Share your query details"
                className="w-full rounded border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 hover:border-white/40 hover:bg-white/[0.03] focus:border-white/50 focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between gap-4">
              <p
                aria-live="polite"
                className={`text-xs ${
                  status === "success" ? "text-emerald-400" : "text-transparent"
                }`}
              >
                Thanks — your enquiry is in. Our team will reply within 24h.
              </p>
              <button
                type="submit"
                className="group relative inline-flex items-center rounded border border-white/20 bg-white h-9 pl-9 pr-4 font-display text-sm font-medium text-black transition-all duration-500 ease-out hover:pl-4 hover:pr-9"
              >
                <span className="whitespace-nowrap">Submit Enquiry</span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center overflow-hidden rounded bg-black text-white transition-all duration-500 ease-out group-hover:left-[calc(100%-2rem)]"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </Shell>
    </section>
  );
}

function Field({
  label,
  placeholder,
  name,
  type = "text",
}: {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
}) {
  return (
    <div className="group/field">
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors duration-200 group-hover/field:text-white group-focus-within/field:text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 hover:border-white/40 hover:bg-white/[0.03] focus:border-white/50 focus:ring-2 focus:ring-white/20"
      />
    </div>
  );
}
