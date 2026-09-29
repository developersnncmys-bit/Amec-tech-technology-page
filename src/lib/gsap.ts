"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP setup MUST run in useLayoutEffect on the client — its cleanup
// (ctx.revert() → unwrap pin-spacer) has to complete synchronously before
// React commits DOM removals, otherwise React throws `removeChild` on
// route navigation because pinned nodes have been moved into GSAP's
// pin-spacer wrapper. On the server we fall back to useEffect to avoid
// the SSR warning; the effect never runs there anyway.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger };
