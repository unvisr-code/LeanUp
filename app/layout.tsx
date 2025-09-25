import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/provider";
import { ToastProvider } from "@/components/ui/toast";
import ChannelTalk from "@/components/ChannelTalk";

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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WEEDL3T57E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WEEDL3T57E');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PCC8N5HD');
          `}
        </Script>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PCC8N5HD"
            height="0"
            width="0"
            style={{display:'none', visibility:'hidden'}}
          ></iframe>
        </noscript>

        <TRPCProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </TRPCProvider>
        <ChannelTalk />
      </body>
    </html>
  );
}