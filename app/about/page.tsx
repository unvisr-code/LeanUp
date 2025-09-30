import { Metadata } from "next";
import AboutPageClient from "@/components/pages/about-page-client";
import WebPageSchema from "@/components/structured-data/webpage-schema";
import BreadcrumbSchema from "@/components/structured-data/breadcrumb-schema";

export const metadata: Metadata = {
  title: "LeanUp 소개 | 스타트업 웹 개발 전문팀",
  description: "속도, 효율, 고객 중심으로 스타트업의 성장을 돕는 웹 개발 전문 팀입니다. 개발자, 디자이너, PM, 데이터분석가가 함께합니다.",
  keywords: "LeanUp 소개, 웹 개발팀, 스타트업 지원, 웹 에이전시, 개발 전문가, 디자인팀",
  openGraph: {
    title: "LeanUp 소개 | 스타트업 웹 개발 전문팀",
    description: "속도, 효율, 고객 중심으로 스타트업의 성장을 돕는 웹 개발 전문 팀입니다.",
    url: "https://leanup.kr/about",
    siteName: "LeanUp",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LeanUp - 스타트업 웹 개발 전문팀",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeanUp 소개 | 스타트업 웹 개발 전문팀",
    description: "속도, 효율, 고객 중심으로 스타트업의 성장을 돕는 웹 개발 전문 팀입니다.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://leanup.kr/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <WebPageSchema
        name="LeanUp 소개"
        description="속도, 효율, 고객 중심으로 스타트업의 성장을 돕는 웹 개발 전문 팀"
        url="https://leanup.kr/about"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: "https://leanup.kr" },
          { name: "소개", url: "https://leanup.kr/about" }
        ]}
      />
      <AboutPageClient />
    </>
  );
}