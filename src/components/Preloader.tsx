"use client";

import { useEffect, useState } from "react";

const MIN_DISPLAY_MS = 600;
const FADE_MS = 500;

export function Preloader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");

  useEffect(() => {
    let removeTimer: number | undefined;
    const startFade = window.setTimeout(() => {
      setPhase("fading");
      removeTimer = window.setTimeout(() => setPhase("hidden"), FADE_MS);
    }, MIN_DISPLAY_MS);

    return () => {
      window.clearTimeout(startFade);
      if (removeTimer !== undefined) window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div
      aria-hidden={phase !== "visible"}
      role="status"
      className="pointer-events-none fixed left-0 top-0 z-[100] bg-black"
      style={{
        // Explicit viewport dimensions, no flex centering — the content block
        // below centers itself with `top: 50% / left: 50% / translate(-50%, -50%)`.
        // Flex-based centering can fail if an ancestor (e.g., GSAP pin-spacer)
        // alters the containing block; absolute-center via transform is more
        // defensive on pages with heavy ScrollTrigger pins.
        width: "100vw",
        height: "100vh",
        opacity: phase === "visible" ? 1 : 0,
        visibility: phase === "hidden" ? "hidden" : "visible",
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      <div
        className="flex flex-col items-center gap-6"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Plain <img> — avoids next/image wrapper elements interacting with
            page-level GSAP pin-spacers during hydration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/amec logo.png"
          alt="AMEC Technology"
          width={200}
          height={50}
          className="h-8 w-auto md:h-10"
          style={{ animation: "preloader-fade-in 900ms ease-out both" }}
        />

        {/* Thin light bar loader */}
        <div className="relative h-px w-40 overflow-hidden bg-white/10">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/3 bg-white/80"
            style={{ animation: "preloader-sweep 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>
    </div>
  );
}
