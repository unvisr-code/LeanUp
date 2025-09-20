import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { ProcessSection } from "@/components/sections/process";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { CTASection } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <PortfolioPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}