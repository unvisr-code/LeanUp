import dynamic from "next/dynamic";
import { Metadata } from "next";
import { ToolsHub } from "@/components/tools-hub";

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
  title: "LEANUP 무료 계산기 — 연봉·퇴직금·시급·대출·전역일·만나이",
  description:
    "LEANUP이 만든 2026년 기준 무료 계산기 6종. 연봉 실수령액, 퇴직금, 시급·주휴수당, 대출이자, 전역일, 만 나이를 회원가입 없이 바로 계산하세요. 프로젝트 문의: contact@leanup.kr",
  alternates: { canonical: "https://leanup.kr/" },
  openGraph: {
    type: "website",
    siteName: "LEANUP",
    locale: "ko_KR",
    url: "https://leanup.kr/",
    title: "LEANUP 무료 계산기 6종 — 연봉·퇴직금·시급·대출·전역일·만나이",
    description:
      "2026년 기준 연봉 실수령액·퇴직금·시급·대출이자·전역일·만 나이 계산기를 회원가입 없이 바로 사용하세요.",
  },
};

export default function HomePage() {
  return (
    <>
      <Maintenance />
      <ToolsHub />
    </>
  );
}
