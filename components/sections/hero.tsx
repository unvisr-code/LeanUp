"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-500 py-20 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">

          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            합리적인 가격으로 만드는
            <br />
            <span className="text-white">전문 웹사이트</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg text-blue-100 md:text-xl">
            합리적인 비용으로도 전문가 퀄리티, LeanUP에서 경험하세요
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-blue-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
            >
              무료 견적 받기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-transparent px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-white/10 hover:shadow-lg"
            >
              포트폴리오 보기
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold text-white mb-2">빠른 납기</h3>
              <p className="text-sm text-blue-100">신속한 개발과 배포로 빠르게 온라인에서 만날 수 있어요</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-semibold text-white mb-2">합리적인 가격</h3>
              <p className="text-sm text-blue-100">품질은 유지하면서도 부담 없는 합리적인 비용</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">원스톱 솔루션</h3>
              <p className="text-sm text-blue-100">기획부터 런칭까지 모든 과정을 한 곳에서</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-blue-300 opacity-15 blur-3xl"></div>
      </div>
    </section>
  );
}