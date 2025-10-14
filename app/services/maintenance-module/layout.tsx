import { Metadata } from "next";

export const metadata: Metadata = {
  title: "유지보수 효율화 모듈 | LEANUP - GUI 피드백과 프롬프트 수정",
  description: "GUI 기반 시각화된 피드백과 프롬프트로 간단한 수정. 커뮤니케이션 비용을 획기적으로 절감하는 유지보수 솔루션. 24/7 수정 가능, 실시간 진행 상황 확인",
  keywords: "유지보수 효율화, GUI 피드백, 프롬프트 수정, 웹사이트 유지보수, 커뮤니케이션 절감, 실시간 수정",
  openGraph: {
    title: "유지보수 효율화 모듈 | LEANUP",
    description: "GUI 기반 피드백과 프롬프트로 간단한 수정. 커뮤니케이션 비용 80% 절감",
    url: "https://leanup.kr/services/maintenance-module",
    siteName: "LEANUP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LEANUP 유지보수 효율화 모듈",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "유지보수 효율화 모듈 | LEANUP",
    description: "GUI 기반 피드백과 프롬프트로 간단한 수정. 커뮤니케이션 비용 80% 절감",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://leanup.kr/services/maintenance-module",
  },
};

export default function MaintenanceModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
