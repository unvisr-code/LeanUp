import { Metadata } from "next";
import { Maintenance } from "@/components/maintenance";

// 홈페이지 재정비 중 — 기존 랜딩(HeroSection 등)은 git history에 보존.
// 복구하려면 이전 커밋의 page.tsx로 되돌리고 middleware.ts를 삭제하세요.
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
