import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/provider";
import { ToastProvider } from "@/components/ui/toast";
import ChannelTalk from "@/components/ChannelTalk";
import StructuredData from "@/components/structured-data";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://leanup.kr'),
  title: {
    default: "LeanUp - 웹사이트에 추가로 데이터 추적 셋업 + 온보딩까지",
    template: '%s | LeanUp'
  },
  description: "빠른 납기, 저렴한 가격으로 웹사이트 제작부터 데이터 추적 셋업, 온보딩, 유지보수까지 한 번에 해결하세요.",
  keywords: "웹사이트 제작, 데이터 추적, GA4, GTM, 온보딩, 유지보수, 스타트업, 웹 개발",
  authors: [{ name: "LeanUp" }],
  creator: "LeanUp",
  publisher: "LeanUp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://leanup.kr',
  },
  openGraph: {
    title: "LeanUp - 웹사이트 제작 + 데이터 + 온보딩",
    description: "빠른 납기와 합리적인 가격으로 웹사이트를 제작하고 데이터 기반 의사결정을 시작하세요.",
    url: 'https://leanup.kr',
    siteName: "LeanUp",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LeanUp - 웹사이트 제작부터 데이터 추적까지',
      }
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "LeanUp - 웹사이트 제작 + 데이터 + 온보딩",
    description: "빠른 납기와 합리적인 가격으로 웹사이트를 제작하고 데이터 기반 의사결정을 시작하세요.",
    images: ['/twitter-image.png'],
    creator: '@leanup',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-code', // Google Search Console 인증 코드 추가 필요
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <StructuredData />
      </head>
      <body className={inter.className} style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' }}>
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
        <SpeedInsights />
        <ChannelTalk />
      </body>
    </html>
  );
}