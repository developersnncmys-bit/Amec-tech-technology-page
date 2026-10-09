"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { HeroCTA } from "@/components/HeroCTA";

const INTRO_TEXT =
  "AMEC TECHNOLOGY is the engineering execution arm of AMEC. We develop production ready systems across electric mobility, renewable energy, and OEM engineering—bridging concepts and deployment through strong engineering fundamentals, validation, and scalable design.";

const INTRO_WORDS = INTRO_TEXT.split(" ");

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    const pinTarget = pinRef.current;
    if (!el || !pinTarget) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-media]", { autoAlpha: 0, scale: 1.05, duration: 1.4 })
        .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.8")
        .from("[data-hero-title] span", { autoAlpha: 0, y: 24, stagger: 0.08, duration: 0.8 }, "-=0.4")
        .from("[data-hero-sub]", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.5")
        .from("[data-hero-cta]", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.4");

      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=100%",
        pin: pinTarget,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const words = gsap.utils.toArray<HTMLElement>("[data-intro-word]");
      gsap.set(words, { autoAlpha: 0.12 });
      // Scrub-reveal in natural scroll flow (no pin). stagger.amount keeps
      // the full timeline short regardless of word count, and the trigger
      // range is tight so a single scroll gesture completes the reveal.
      gsap.to(words, {
        autoAlpha: 1,
        ease: "none",
        stagger: { amount: 1 },
        scrollTrigger: {
          trigger: "[data-intro]",
          start: "top 90%",
          end: "top 50%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  const scrollToIntro = () => {
    const target = document.getElementById("technology-intro");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={rootRef} className="relative isolate">
      <div ref={pinRef} className="relative overflow-hidden bg-bg-card">
          {/*
            Video expects /public/videos/hero.mp4. Until the file exists, a
            layered gradient + poster acts as the visible placeholder so the
            hero never renders empty.
          */}
          <div data-hero-media className="relative h-screen w-full">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%), radial-gradient(60% 80% at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)",
              }}
              aria-hidden
            />
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/hero.jpg"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0) 40%), radial-gradient(ellipse 90% 55% at 50% 90%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0) 85%)",
              }}
              aria-hidden
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-start justify-end gap-6 px-6 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10 md:px-14 md:pb-14 lg:gap-16 lg:px-24 lg:pb-16">
            <div className="max-w-full text-left sm:max-w-[70%]">
              <p
                data-hero-eyebrow
                className="eyebrow md:!text-[32px] md:!leading-none md:!tracking-[0.12em] md:!font-semibold md:!text-white lg:!text-[48px]"
              >
                AMEC
              </p>
              <h1
                data-hero-title
                className="mt-1 heading-xl md:!mt-2 md:!text-[52px] md:!leading-[1.06] lg:!text-[68px]"
              >
                {"TECHNOLOGY".split("").map((c, i) => (
                  <span key={i} className="inline-block">{c}</span>
                ))}
              </h1>
              <p
                data-hero-sub
                className="mt-3 body-hero md:!mt-4 md:!text-[16px] md:!leading-[1.3] lg:!text-[18px] lg:whitespace-nowrap"
              >
                Engineering Powertrain, Energy & Scalable Technologies
              </p>
            </div>
            <div data-hero-cta className="shrink-0 self-start sm:self-end">
              <HeroCTA onClick={scrollToIntro} label="Explore more" variant="primary" arrow={false} />
            </div>
          </div>
      </div>

      <div id="technology-intro" className="shell mt-16 mb-6 md:mt-24 md:mb-10">
        <p
          data-intro
          className="mx-auto max-w-4xl text-left font-display text-lg leading-relaxed text-white/70 md:text-[22px]"
        >
          {INTRO_WORDS.map((word, i) => (
            <Fragment key={i}>
              <span
                data-intro-word
                className={`inline-block ${i < 2 ? "font-semibold text-white" : ""}`}
              >
                {word}
              </span>
              {i < INTRO_WORDS.length - 1
                ? word === "Group."
                  ? <br />
                  : " "
                : ""}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
