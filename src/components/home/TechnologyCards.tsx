"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { ArrowRight } from "@/components/Icons";

const CARDS = [
  {
    title: "Powertrain and Battery",
    body:
      "Integrated battery, motor, controller, and charging platforms for next-generation electric two-wheelers.",
    href: "/powertrain-battery",
    image: "/images/Poertrain-battery.png",
  },
  {
    title: "Source",
    body:
      "Smart solar hybrid inverters and energy management solutions for residential, commercial, and industrial applications.",
    href: "/source",
    image: "/images/Source.png",
  },
  {
    title: "OEM Engineering",
    body:
      "End-to-end product engineering—from concept and prototyping to validation and production-ready solutions.",
    href: "/oem-engineering",
    image: "/images/OEM-engineering.png",
  },
];

export function TechnologyCards() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-tech-card]");
      if (!cards.length) return;

      // Entrance timeline — plays as the section enters the viewport.
      // No pin: TC is a static showcase, so the pin was adding ~1 viewport
      // of dead scroll space with no payoff. Firing on scroll trigger lets
      // the animation play naturally as the user scrolls through.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from("[data-tech-heading]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
      })
        .from(
          "[data-tech-sub]",
          { autoAlpha: 0, y: 24, duration: 0.6 },
          "-=0.4"
        )
        .from(
          cards,
          { autoAlpha: 0, y: 40, duration: 0.7, stagger: 0.15 },
          "-=0.3"
        );
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-14">
        {/* Header: heading spans cols 1-2, description sits in col 3.
            Uses the same 3-col grid as the cards below so text edges align
            perfectly with card 1 (left) and card 3 (right). */}
        <div className="grid gap-6 md:grid-cols-3 md:items-end md:gap-6">
          <h2 data-tech-heading className="heading-lg md:col-span-2">
            TECHNOLOGY THAT<br />POWERS THE FUTURE
          </h2>
          <p
            data-tech-sub
            className="text-sm leading-relaxed text-white/70 md:pb-2 md:text-left md:text-base"
          >
            Integrated EV platforms, smart energy systems, and OEM engineering built for innovation.
          </p>
        </div>

        {/* Cards — revealed during pin */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              data-tech-card
              className="card group/card block overflow-hidden transition-colors duration-300 hover:border-white/20"
            >
              <div
                className="h-[320px] w-full"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%), url('${card.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden
              />
              <div className="p-5">
                <h3 className="text-sm font-semibold text-white md:text-base">{card.title}</h3>
                <p className="mt-2 body text-xs md:text-[13px]">{card.body}</p>
                <span
                  className="group/cta mt-4 inline-flex items-center gap-3 rounded border border-white/20 bg-transparent py-1 pl-1 pr-4 text-sm font-medium text-white transition-all duration-300 ease-out group-hover/card:border-white group-hover/card:bg-white group-hover/card:text-black"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded bg-white text-black transition-colors duration-300 ease-out group-hover/card:bg-black group-hover/card:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  Explore More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
