"use client";

import { useState } from "react";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-with-nav";
import { FeaturesSection } from "@/components/sections/features";
import { PortfolioShowcaseSection } from "@/components/sections/portfolio-showcase";
import { QuoteModal } from "@/components/quote-modal";

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