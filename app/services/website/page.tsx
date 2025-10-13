import { Metadata } from "next";
import WebsitePageClient from "@/components/pages/website-page-client";
import WebPageSchema from "@/components/structured-data/webpage-schema";
import BreadcrumbSchema from "@/components/structured-data/breadcrumb-schema";

export const metadata: Metadata = {
  title: "웹사이트 개발 | LEANUP - 2주 MVP 완성",
  description: "템플릿과 AI를 활용한 빠르고 효율적인 웹사이트 개발. 2주 안에 MVP 완성, 7일 하이퍼케어 제공. Next.js, TypeScript 최신 기술 스택으로 확장성 확보",
  keywords: "웹사이트 개발, MVP 개발, Next.js, TypeScript, 빠른 개발, 스타트업 웹사이트, 반응형 웹, SEO 최적화, 2주 개발",
  openGraph: {
    title: "웹사이트 개발 | LEANUP - 2주 MVP 완성",
    description: "템플릿과 AI를 활용한 빠르고 효율적인 웹사이트 개발. 2주 안에 MVP 완성, 7일 하이퍼케어 제공",
    url: "https://leanup.kr/services/website",
    siteName: "LEANUP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LEANUP 웹사이트 개발 서비스 - 2주 MVP",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "웹사이트 개발 | LEANUP - 2주 MVP 완성",
    description: "템플릿과 AI를 활용한 빠르고 효율적인 웹사이트 개발. 2주 안에 MVP 완성",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://leanup.kr/services/website",
  },
};

export default function WebsitePage() {
  return (
    <>
      <WebPageSchema
        name="웹사이트 개발 | LEANUP"
        description="템플릿과 AI를 활용한 빠르고 효율적인 웹사이트 개발. 2주 안에 MVP 완성"
        url="https://leanup.kr/services/website"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: "https://leanup.kr" },
          { name: "서비스", url: "https://leanup.kr/services" },
          { name: "웹사이트 개발", url: "https://leanup.kr/services/website" }
        ]}
      />
      <WebsitePageClient />
    </>
  );
}