"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-900">
            🚀 빠른 납기 · 합리적인 가격 · 원스톱 솔루션
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            웹사이트에 추가로
            <br />
            <span className="text-primary">데이터 추적 셋업 + 온보딩</span>까지
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            간단한 유지보수는 내가 원하는 시간에 우리가 원하는 대로
            <br />
            스타트업과 소규모 기업을 위한 완벽한 웹 솔루션
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              무료 견적 받기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
            >
              포트폴리오 보기
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                7-10일 빠른 납기
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                GA4/GTM 기본 세팅 포함
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                런칭 후 7일 하이퍼케어
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
}