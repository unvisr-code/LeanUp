import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { PortfolioAutoScroll } from "@/components/sections/portfolio-auto-scroll";
import { PartnersSection } from "@/components/sections/partners";
import { CTASection } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PartnersSection />
        <PortfolioAutoScroll />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}