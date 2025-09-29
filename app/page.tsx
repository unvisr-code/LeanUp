"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-with-nav";
import { FeaturesSection } from "@/components/sections/features";
import { PortfolioShowcaseSection } from "@/components/sections/portfolio-showcase";

// Dynamic imports for better bundle splitting
const QuoteModal = dynamic(() => import("@/components/quote-modal").then(mod => ({ default: mod.QuoteModal })), {
  ssr: false,
});

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