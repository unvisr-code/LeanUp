import { Metadata } from "next";
import PortfolioPageClient from "@/components/pages/portfolio-page-client";
import WebPageSchema from "@/components/structured-data/webpage-schema";
import BreadcrumbSchema from "@/components/structured-data/breadcrumb-schema";

export const metadata: Metadata = {
  title: "포트폴리오 | LEANUP - 웹사이트 제작 프로젝트 사례",
  description: "LEANUP이 제작한 다양한 웹사이트와 앱 프로젝트를 확인하세요. 세종대학교, 호랑에듀, 디미페이 등 성공적인 프로젝트 사례 포트폴리오",
  keywords: "웹사이트 포트폴리오, 프로젝트 사례, 웹 개발 실적, Next.js 프로젝트, 랜딩페이지 제작, 앱 개발",
  openGraph: {
    title: "포트폴리오 | LEANUP - 웹사이트 제작 프로젝트 사례",
    description: "성공적으로 완료한 웹사이트 제작 프로젝트를 확인하세요. 다양한 산업군의 프로젝트 실적",
    url: "https://leanup.kr/portfolio",
    siteName: "LEANUP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LEANUP 포트폴리오 - 웹사이트 제작 사례",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "포트폴리오 | LEANUP - 웹사이트 제작 프로젝트 사례",
    description: "성공적으로 완료한 웹사이트 제작 프로젝트를 확인하세요",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://leanup.kr/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <WebPageSchema
        name="포트폴리오 | LEANUP"
        description="LEANUP이 제작한 웹사이트와 앱 프로젝트 사례"
        url="https://leanup.kr/portfolio"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: "https://leanup.kr" },
          { name: "포트폴리오", url: "https://leanup.kr/portfolio" }
        ]}
      />
      <PortfolioPageClient />
    </>
  );
}