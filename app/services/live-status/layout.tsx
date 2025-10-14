import { Metadata } from "next";

export const metadata: Metadata = {
  title: "실시간 개발 현황 공유 | LEANUP - 프로젝트 진행 상황 투명하게",
  description: "개발 진행 상황을 실시간으로 확인하고 단계별 자동 알림을 받으세요. 실시간 대시보드, 자동 알림, 진행률 추적으로 프로젝트를 투명하게 관리합니다.",
  keywords: "실시간 개발 현황, 프로젝트 진행 상황, 개발 알림, 진행률 추적, 투명한 개발, 실시간 대시보드",
  openGraph: {
    title: "실시간 개발 현황 공유 | LEANUP",
    description: "개발 진행 상황을 실시간으로 확인하고 단계별 자동 알림 받기",
    url: "https://leanup.kr/services/live-status",
    siteName: "LEANUP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LEANUP 실시간 개발 현황 공유",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "실시간 개발 현황 공유 | LEANUP",
    description: "개발 진행 상황을 실시간으로 확인하고 단계별 자동 알림 받기",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://leanup.kr/services/live-status",
  },
};

export default function LiveStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
