import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 홈페이지 재정비 중 — 모든 경로(/about, /contact, /services 등)를 재정비 안내(/)로 rewrite.
// api와 정적 자산은 제외해 폼 백엔드·이미지가 정상 동작합니다.
// 복구하려면 이 파일을 삭제하세요.
export function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)",
  ],
};
