"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-enhanced";
import { FeaturesSection } from "@/components/sections/features";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PortfolioAutoScroll } from "@/components/sections/portfolio-auto-scroll";
import { PartnersSection } from "@/components/sections/partners";
import { CTASection } from "@/components/sections/cta";
import { QuoteModal } from "@/components/quote-modal";

export default function HomePage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PartnersSection />
        <PortfolioAutoScroll />
        <CTASection onQuoteClick={() => setIsQuoteModalOpen(true)} />
      </main>
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
      <Footer />
    </>
  );
}