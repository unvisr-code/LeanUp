"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onQuoteClick?: () => void;
}

export function CTASection({ onQuoteClick }: CTASectionProps) {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Dark gradient overlay - main의 배경이 이어지게 함 */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="mb-8 text-lg text-white/80">
            빠른 납기와 합리적인 가격으로 웹사이트를 제작하고
            <br />
            데이터 기반 의사결정을 시작하세요
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={onQuoteClick}
              className="inline-flex items-center justify-center rounded-lg bg-white text-gray-900 px-8 py-3 text-base font-medium shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-105"
            >
              무료 견적 받기
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a
              href="https://channel.io/leanup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white/[0.08] backdrop-blur-xl border border-white/[0.2] px-8 py-3 text-base font-medium text-white transition-all hover:bg-white/[0.12] hover:border-white/[0.3]"
            >
              채널톡 상담
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}