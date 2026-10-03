"use client";

import { useEffect, useRef, useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";

const PILLARS = [
  {
    number: "01",
    title: "Engineering-Led Product Development",
    body:
      "At AMEC, engineering drives every decision. We don't start with assumptions or aesthetics—we start with system architecture, performance targets, and real-world constraints. From first principles to final validation, our products are built through disciplined engineering, rigorous testing, and iterative development to ensure reliability, safety, and scalability.",
    image: "/images/whyamec1.png",
  },
  {
    number: "02",
    title: "Deep Domain Expertise",
    body:
      "Our expertise spans electric mobility, power electronics, energy storage systems, control architectures, and embedded intelligence. This multi-domain capability allows us to design complete systems rather than isolated components—ensuring seamless integration, optimized performance, and long-term reliability across mobility and energy platforms.",
    image: "/images/whyamec2.png",
  },
  {
    number: "03",
    title: "Full-Cycle Development Support",
    body:
      "We provide complete product development support—from concept and feasibility to design, prototyping, validation, and production readiness. Our integrated engineering approach ensures every stage of the product lifecycle is optimized for performance, manufacturability, compliance, and scalability.",
    image: "/images/whyamec3.png",
  },
  {
    number: "04",
    title: "Custom Solutions",
    body:
      "Every application has unique technical challenges. We work closely with customers to develop tailored engineering solutions that align with their performance goals, operational requirements, and business objectives. Whether it's a custom battery system, powertrain, OEM product, or renewable energy solution, our designs are built for seamless integration and real-world deployment.",
    image: "/images/whyamec4.png",
  },
];

export function WhyAmec() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    const nodes = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-14">
        {/* Header */}
        <AnimateIn className="text-center">
          <span className="eyebrow">/ Our principles</span>
          <h2 className="heading-lg mt-4">WHY AMEC TECHNOLOGY</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            Engineering-first innovation, deep technical expertise, and
            collaborative product development that transform ideas into
            reliable, market-ready solutions.
          </p>
        </AnimateIn>

        {/* Desktop: pinned showcase */}
        <div className="mt-20 hidden md:grid md:grid-cols-[1.05fr_1fr] md:gap-16 lg:gap-24">
          {/* Left — sticky stage */}
          <div className="relative">
            <div className="sticky top-24 h-[72vh] overflow-hidden rounded-card border border-white/[0.08] bg-bg-card">
              {/* Image stack (crossfade) */}
              {PILLARS.map((p, i) => (
                <div
                  key={p.number}
                  aria-hidden
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-[900ms] ease-out"
                  style={{
                    backgroundImage: `url('${p.image}')`,
                    opacity: active === i ? 1 : 0,
                  }}
                />
              ))}

              {/* Progress rail (vertical) */}
              <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col items-end gap-3">
                {PILLARS.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-10 w-[2px] rounded-full transition-all duration-500 ease-out ${
                      active === i
                        ? "scale-y-100 bg-white"
                        : "scale-y-75 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — scrolling panels */}
          <div className="flex flex-col">
            {PILLARS.map((p, i) => (
              <div
                key={p.number}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                data-index={i}
                className="flex min-h-[72vh] flex-col justify-center"
              >
                <div
                  className={`transition-all duration-500 ease-out ${
                    active === i
                      ? "opacity-100 blur-0"
                      : "opacity-35 blur-[1px]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                      0{i + 1}
                    </span>
                    <span
                      className={`h-[1px] origin-left bg-white transition-all duration-500 ${
                        active === i ? "w-16 opacity-100" : "w-8 opacity-30"
                      }`}
                    />
                  </div>
                  <h3 className="mt-6 heading-md text-white">{p.title}</h3>
                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="mt-14 flex flex-col gap-8 md:hidden">
          {PILLARS.map((p) => (
            <AnimateIn key={p.number}>
              <article className="overflow-hidden rounded-card border border-white/[0.08] bg-bg-card">
                <div
                  className="aspect-[16/10] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <div className="p-6">
                  <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                    {p.number}
                  </span>
                  <h3 className="mt-3 heading-md text-white">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    {p.body}
                  </p>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
