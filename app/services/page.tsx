import { Metadata } from "next";
import ServicesPageClient from "@/components/pages/services-page-client";
import WebPageSchema from "@/components/structured-data/webpage-schema";
import BreadcrumbSchema from "@/components/structured-data/breadcrumb-schema";

export const metadata: Metadata = {
  title: "서비스 소개 | LEANUP - 웹사이트 제작, 데이터, 유지보수",
  description: "LEANUP의 웹사이트 제작, 데이터 모듈, 유지보수 효율화, 실시간 개발 현황 공유 서비스를 소개합니다. 비즈니스 성장을 위한 완벽한 솔루션",
  keywords: "웹사이트 제작 서비스, 데이터 추적, GA4, GTM, 유지보수, 개발 현황 공유, LEANUP 서비스",
  openGraph: {
    title: "서비스 소개 | LEANUP - 웹사이트 제작, 데이터, 유지보수",
    description: "웹사이트 제작부터 데이터 추적, 유지보수까지 비즈니스 성장을 위한 완벽한 솔루션",
    url: "https://leanup.kr/services",
    siteName: "LEANUP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LEANUP 서비스 소개",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "서비스 소개 | LEANUP - 웹사이트 제작, 데이터, 유지보수",
    description: "웹사이트 제작부터 데이터 추적, 유지보수까지 완벽한 솔루션",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://leanup.kr/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <WebPageSchema
        name="서비스 소개 | LEANUP"
        description="웹사이트 제작, 데이터 모듈, 유지보수 효율화, 실시간 개발 현황 공유"
        url="https://leanup.kr/services"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: "https://leanup.kr" },
          { name: "서비스", url: "https://leanup.kr/services" }
        ]}
      />
      <ServicesPageClient />
    </>
  );
}