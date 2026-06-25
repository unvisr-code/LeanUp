import dynamic from "next/dynamic";
import { Metadata } from "next";

// 홈페이지 재정비 중 — 기존 랜딩(HeroSection 등)은 git history에 보존.
// framer-motion 등 클라이언트 전용 코드의 SSR("self is not defined") 회피를 위해 ssr:false 로드
// (기존 page.tsx의 FeaturesSection 등과 동일 패턴).
const Maintenance = dynamic(
  () => import("@/components/maintenance").then((m) => ({ default: m.Maintenance })),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: "100dvh", background: "#0a0a0b" }} />
    ),
  },
);

export const metadata: Metadata = {
  title: "홈페이지 재정비 중",
  description:
    "LEANUP 홈페이지를 재정비하고 있습니다. 더 나은 모습으로 곧 다시 찾아뵙겠습니다. 프로젝트 문의: contact@leanup.kr",
  openGraph: {
    type: "website",
    siteName: "LEANUP",
    locale: "ko_KR",
    url: "https://leanup.kr/",
    title: "LEANUP — 홈페이지 재정비 중",
    description:
      "LEANUP 홈페이지를 재정비하고 있습니다. 더 나은 모습으로 곧 다시 찾아뵙겠습니다.",
  },
};

export default function HomePage() {
  return <Maintenance />;
}
