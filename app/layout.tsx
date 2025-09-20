import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeanUp - 웹사이트에 추가로 데이터 추적 셋업 + 온보딩까지",
  description: "빠른 납기, 저렴한 가격으로 웹사이트 제작부터 데이터 추적 셋업, 온보딩, 유지보수까지 한 번에 해결하세요.",
  keywords: "웹사이트 제작, 데이터 추적, GA4, GTM, 온보딩, 유지보수, 스타트업, 웹 개발",
  openGraph: {
    title: "LeanUp - 웹사이트 제작 + 데이터 + 온보딩",
    description: "빠른 납기와 합리적인 가격으로 웹사이트를 제작하고 데이터 기반 의사결정을 시작하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "LeanUp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}