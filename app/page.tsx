import dynamic from "next/dynamic";
import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "홈페이지 제작 | 빠른 AI 제작·전문가 퀄리티·자체 유지보수",
  description:
    "홈페이지 제작·웹사이트 제작·랜딩페이지 제작을 AI로 빠르게. 합리적 견적과 클라이언트 자체 유지보수 제공.",
  openGraph: {
    type: "website",
    siteName: "LEANUP",
    locale: "ko_KR",
    url: "https://leanup.kr/",
    title: "홈페이지 제작 | 빠른 AI 제작·전문가 퀄리티·자체 유지보수",
    description:
      "홈페이지 제작·웹사이트 제작·랜딩페이지 제작을 AI로 빠르게. 합리적 견적과 클라이언트 자체 유지보수 제공.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "홈페이지 제작 | 빠른 AI 제작·전문가 퀄리티·자체 유지보수",
    description:
      "홈페이지 제작·웹사이트 제작·랜딩페이지 제작을 AI로 빠르게. 합리적 견적과 클라이언트 자체 유지보수 제공.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://leanup.kr/",
  },
};

export default function HomePage() {
  return (
    <>
      <main className="bg-black">
        <HeroSection />
        <FeaturesSection />
        <PortfolioShowcaseSection />
      </main>
      <QuoteModal
        isOpen={false}
        onClose={() => {}}
      />
      <Footer />
    </>
  );
}