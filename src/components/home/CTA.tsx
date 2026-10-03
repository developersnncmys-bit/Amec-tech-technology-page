"use client";

import Link from "next/link";
import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { ArrowRight } from "@/components/Icons";

const HEADING = "READY TO BUILD THE FUTURE TOGETHER?";
const HEADING_WORDS = HEADING.split(" ");

export function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const pinTarget = pinRef.current;
    if (!section || !pinTarget) return;

    const ctx = gsap.context(() => {
      // Pin the big card in place while the user scrolls; word reveal is
      // scrubbed to the pin range so the heading lights up as they scroll.
      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Eyebrow drops in once as the section enters view (before the pin).
      gsap.from("[data-cta-eyebrow]", {
        autoAlpha: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: pinTarget, start: "top 70%" },
      });

      // Button bounces in once as the section enters view (before the pin).
      gsap.from("[data-cta-button]", {
        autoAlpha: 0,
        y: 30,
        scale: 0.85,
        duration: 0.7,
        delay: 0.3,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: pinTarget, start: "top 70%" },
      });

      // Heading words — start dim, brighten word-by-word via scrub as the
      // user scrolls through the pinned range. stagger.amount keeps the full
      // reveal inside one unit of timeline regardless of word count, so a
      // single scroll gesture reveals the entire headline (no need to scroll
      // multiple times to march through it).
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

      // Slow radial glow drift behind the heading — sine-wave floating.
      gsap.to("[data-cta-glow]", {
        xPercent: 8,
        yPercent: -5,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-cta-card]");
      gsap.from(cards, {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-cta-cards]", start: "top 85%" },
      });

      // Radar pulses — each ring continuously expands from small to large
      // then fades out. Staggered delays give a rippling emission effect.
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

      const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => window.clearTimeout(refresh);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-20 pt-10 md:pb-28">
      {/* Main hero CTA — full-viewport dark card, pinned during scroll */}
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg"
      >
        {/* Radar pulses — continuously expanding rings that emit from center */}
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
        {/* Slow-drifting radial glow — adds motion to the negative space */}
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
          <p data-cta-eyebrow className="eyebrow">Let's build together</p>
          <h2 className="heading-xl max-w-6xl">
            {HEADING_WORDS.map((word, i) => (
              <Fragment key={i}>
                <span data-cta-word className="inline-block">{word}</span>
                {i < HEADING_WORDS.length - 1 ? " " : ""}
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

      {/* Bottom cards */}
      <div className="mx-auto mt-6 w-full max-w-[1600px] px-6 md:px-14">
        <div data-cta-cards className="grid gap-6 md:grid-cols-2">
          <Link
            href="/contact"
            data-cta-card
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-card p-10 md:p-12"
          >
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <p className="eyebrow">Collaboration</p>
                <h3 className="mt-3 text-2xl font-semibold md:text-3xl">Partner with<br />AMEC</h3>
              </div>
              <span className="inline-flex items-center gap-3 self-start rounded border border-white/20 py-1 pl-1 pr-4 text-sm font-medium text-white transition-all duration-300 ease-out group-hover:flex-row-reverse group-hover:border-white group-hover:bg-white group-hover:pl-4 group-hover:pr-1 group-hover:text-black">
                <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                Become a Partner
              </span>
            </div>
          </Link>

          <Link
            href="/careers"
            data-cta-card
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-card p-10 md:p-12"
          >
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <p className="eyebrow">Careers</p>
                <h3 className="mt-3 text-2xl font-semibold md:text-3xl">Build the<br />future with AMEC.</h3>
              </div>
              <span className="inline-flex items-center gap-3 self-start rounded border border-white/20 py-1 pl-1 pr-4 text-sm font-medium text-white transition-all duration-300 ease-out group-hover:flex-row-reverse group-hover:border-white group-hover:bg-white group-hover:pl-4 group-hover:pr-1 group-hover:text-black">
                <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover:bg-black group-hover:text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                Explore Careers
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
