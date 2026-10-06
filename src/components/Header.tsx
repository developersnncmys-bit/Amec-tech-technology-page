"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

type NavItem = { href: string; label: string; disabled?: boolean };

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/source", label: "Source" },
  { href: "/oem-engineering", label: "OEM Engineering" },
  { href: "/powertrain-battery", label: "Powertrain & Battery" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      const direction = current > lastScrollY.current ? "down" : "up";
      // 80px of grace so the navbar lingers slightly past the Hero fold.
      const pastHero = current > window.innerHeight - 80;

      const revealEl = document.getElementById("nav-reveal");
      // If the page has an explicit <section id="nav-reveal"> (e.g. home's
      // TechnologyCards), use its top. Otherwise fall back to ~2 viewport
      // heights, which approximates the top of the 3rd section on standard
      // product pages. This prevents the navbar from reappearing on any
      // upscroll past the hero on pages that don't declare the id.
      const revealTop = revealEl
        ? revealEl.getBoundingClientRect().top + window.scrollY
        : window.innerHeight * 2;

      if (!pastHero) {
        setHidden(false);
      } else if (direction === "up" && current <= revealTop) {
        setHidden(false);
      } else if (direction === "down") {
        setHidden(true);
      }

      lastScrollY.current = current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-500 ease-out md:px-6 md:pt-6 ${
        hidden ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <div className="pointer-events-auto w-full max-w-[1400px]">
        {/* Floating bar — frosted white glass to match Figma */}
        <div className="flex items-center justify-between gap-6 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150 md:px-6 md:py-4">
          <div className="flex shrink-0 items-center self-center">
            <Logo variant="light" />
          </div>

          <nav
            className="hidden items-center gap-8 md:flex lg:gap-10"
            aria-label="Primary"
          >
            {NAV.map((item) => {
              const active = pathname === item.href;
              if (item.disabled) {
                return (
                  <span
                    key={item.href}
                    aria-disabled="true"
                    className="cursor-default font-display text-sm font-medium text-white/70 lg:text-base"
                  >
                    {item.label}
                  </span>
                );
              }
              const cls = active
                ? "text-white"
                : "text-white/70 hover:text-white";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-display text-sm font-medium transition-colors lg:text-base ${cls}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded bg-white px-5 py-2 font-display text-sm font-medium text-black transition hover:bg-white/90 md:inline-flex lg:text-base"
            >
              Contact
            </Link>

            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={`h-px w-5 bg-white transition ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-5 bg-white transition ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-px w-5 bg-white transition ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile nav — expands below the pill */}
        <div
          className={`md:hidden ${
            open ? "mt-2 block" : "hidden"
          } overflow-hidden rounded-2xl border border-white/[0.08] bg-black/80 backdrop-blur-xl`}
        >
          <nav
            className="flex flex-col gap-1 px-4 py-4"
            aria-label="Mobile"
          >
            {NAV.map((item) =>
              item.disabled ? (
                <span
                  key={item.href}
                  aria-disabled="true"
                  className="cursor-default rounded-lg px-2 py-2 font-display text-sm text-white/80"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-2 font-display text-sm text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="mt-2 rounded bg-white px-4 py-2 text-center font-display text-sm font-medium text-black"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
