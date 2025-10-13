import { Metadata } from "next";
import ContactPageClient from "@/components/pages/contact-page-client";
import FAQSchema from "@/components/structured-data/faq-schema";
import WebPageSchema from "@/components/structured-data/webpage-schema";
import BreadcrumbSchema from "@/components/structured-data/breadcrumb-schema";
import { faqItems } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "문의하기 | LEANUP - 웹사이트 제작 무료 견적",
  description: "LEANUP의 웹사이트 제작, 데이터 추적, 유지보수 서비스에 대해 문의하세요. 무료 상담 및 견적 제공. 빠른 개발, 안정적 유지보수, 전담 PM 배정",
  keywords: "웹사이트 제작 문의, 무료 견적, 웹 개발 상담, LEANUP 문의, 프로젝트 문의, FAQ, 자주 묻는 질문",
  openGraph: {
    title: "문의하기 | LEANUP - 웹사이트 제작 무료 견적",
    description: "무료 상담과 견적을 받아보세요. 7-10일 빠른 개발, 6개월 무상 유지보수 제공",
    url: "https://leanup.kr/contact",
    siteName: "LEANUP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LEANUP 문의하기 - 무료 견적",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "문의하기 | LEANUP - 웹사이트 제작 무료 견적",
    description: "무료 상담과 견적을 받아보세요. 빠른 개발, 안정적 유지보수",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://leanup.kr/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <FAQSchema faqItems={faqItems} />
      <WebPageSchema
        name="문의하기 | LEANUP"
        description="LEANUP의 웹사이트 제작, 데이터 추적, 유지보수 서비스 문의 및 FAQ"
        url="https://leanup.kr/contact"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: "https://leanup.kr" },
          { name: "문의하기", url: "https://leanup.kr/contact" }
        ]}
      />
      <ContactPageClient />
    </>
  );
}