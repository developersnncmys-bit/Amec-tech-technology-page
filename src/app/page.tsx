// -----------------------------------------------------------------------------
// Home route (`/`) — renders the Technology page content directly so the URL
// stays as `/` (no `/technology` slug visible to users). The original home
// page content is preserved in `_home-original-backup.tsx` (not routed by
// Next.js) with all its mobile/tablet optimizations untouched.
// -----------------------------------------------------------------------------

import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { TechnologyCards } from "@/components/home/TechnologyCards";
import { IndustriesCarousel } from "@/components/home/IndustriesCarousel";
import { WhyAmec } from "@/components/home/WhyAmec";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <TechnologyCards />
      <IndustriesCarousel />
      <WhyAmec />
      <CTA />
      <Footer />
    </>
  );
}
