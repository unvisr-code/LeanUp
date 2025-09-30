"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-with-nav";

// Dynamic imports for better bundle splitting and faster initial load
const FeaturesSection = dynamic(
  () => import("@/components/sections/features").then(mod => ({ default: mod.FeaturesSection })),
  {
    ssr: false,
    loading: () => <div className="h-screen bg-black" />
  }
);

const PortfolioShowcaseSection = dynamic(
  () => import("@/components/sections/portfolio-showcase").then(mod => ({ default: mod.PortfolioShowcaseSection })),
  {
    ssr: false,
    loading: () => <div className="h-screen bg-black" />
  }
);

const Footer = dynamic(
  () => import("@/components/layout/footer").then(mod => ({ default: mod.Footer })),
  {
    ssr: false,
    loading: () => <div className="h-32 bg-black" />
  }
);

const QuoteModal = dynamic(
  () => import("@/components/quote-modal").then(mod => ({ default: mod.QuoteModal })),
  { ssr: false }
);

export default function HomePage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <main className="bg-black">
        <HeroSection />
        <FeaturesSection />
        <PortfolioShowcaseSection />
      </main>
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
      <Footer />
    </>
  );
}