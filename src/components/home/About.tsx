"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { AnimateIn } from "@/components/AnimateIn";

const DESC_TEXT =
  "AMEC Technology develops and validates advanced energy and mobility solutions in India while engineering them to meet global performance, safety, and reliability standards. Our design processes align with internationally recognized frameworks, including IEC, ISO, and regional compliance requirements, ensuring every solution is ready for global deployment.";

const CAPTION_TEXT =
  "Engineered to deliver reliable performance across diverse environments and operating conditions.";

const CLOSING_TEXT =
  "Through rigorous testing, validation, and design-for-compliance practices, AMEC creates scalable energy and mobility platforms that are built not only for India but for international markets and evolving global regulatory standards.";

const HEADING_WORDS = "Built in India. Engineered for the World.".split(" ");

export function About() {
  const rootRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const headingWords = gsap.utils.toArray<HTMLElement>(
        "[data-about-heading] span[data-word]"
      );
      if (headingWords.length) {
        gsap.from(headingWords, {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: "[data-about-heading]",
            start: "top 85%",
          },
        });
      }

      gsap.utils
        .toArray<HTMLElement>("[data-about-fade]")
        .forEach((p) => {
          gsap.from(p, {
            autoAlpha: 0,
            y: 24,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
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
      ref={rootRef}
      className="w-full px-6 pb-10 pt-16 md:px-14 md:pb-12 md:pt-24"
    >
      {/* Wide outer container — section is NOT constrained to a narrow column */}
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Header — centered eyebrow + heading */}
        <AnimateIn className="flex flex-col items-center text-center">
          <p className="font-display text-base font-semibold uppercase tracking-[0.22em] text-white md:text-lg">
            About
          </p>
          <h2
            data-about-heading
            className="mt-4 font-sans font-medium text-white text-2xl leading-tight md:mt-5 md:text-[28px] md:leading-[1.3]"
          >
            {HEADING_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span data-word className="inline-block">
                  {word}
                </span>
                {i < HEADING_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </h2>
        </AnimateIn>

        {/* Description — centered column, left-aligned text. */}
        <p
          data-about-fade
          className="mx-auto mt-10 max-w-4xl text-left font-sans text-base leading-[1.7] text-white/70 md:mt-14"
        >
          {DESC_TEXT}
        </p>

        {/* 2-column layout — big tall image LEFT, small image + caption RIGHT. */}
        <div
          data-about-fade
          className="mx-auto mt-14 grid max-w-4xl gap-6 md:mt-20 md:grid-cols-2 md:gap-6"
        >
          {/* LEFT: big image — square-ish, taller than before */}
          <div className="relative aspect-square w-full overflow-hidden rounded-card border border-white/[0.06] bg-bg-card md:aspect-square">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%), url('/images/about1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden
            />
          </div>

          {/* RIGHT: small image on top, caption text below */}
          <div className="flex h-full flex-col gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-white/[0.06] bg-bg-card md:aspect-[5/4]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%), url('/images/about2.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden
              />
            </div>
            <p className="mt-auto font-sans text-base leading-[1.7] text-white/60">
              {CAPTION_TEXT}
            </p>
          </div>
        </div>

        {/* Closing — centered column, left-aligned text */}
        <p
          data-about-fade
          className="mx-auto mt-14 max-w-4xl text-left font-sans text-base leading-[1.7] text-white/60 md:mt-20"
        >
          {CLOSING_TEXT}
        </p>
      </div>
    </section>
  );
}
