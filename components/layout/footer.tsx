"use client";

import Link from "next/link";
import Image from "next/image";
import { memo, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { ChevronDown } from "lucide-react";

function FooterComponent() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer className="relative bg-black border-t border-white/[0.1] overflow-hidden">
      {/* Background gradient similar to other sections */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl" />
      <div className="container py-4 md:py-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-3 md:space-y-4">
          {/* Logo */}
          <Logo size="md" variant="light" />

          {/* Simple description */}
          <p className="text-xs sm:text-sm text-white/60 max-w-md px-4">
            빠르고 전문적인 웹사이트 개발과 데이터 추적 설정까지 한 번에
          </p>

          {/* Contact email */}
          <a
            href="mailto:contact@leanup.kr"
            className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
          >
            contact@leanup.kr
          </a>

          {/* Company Info - 모바일에서 접기 가능 */}
          <div className="pt-3 md:pt-4 border-t border-white/[0.1] w-full">
            {/* 모바일 토글 버튼 */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden flex items-center justify-center gap-2 mx-auto mb-2 text-xs text-white/60 hover:text-white/80 transition-colors min-h-[44px] touch-manipulation"
              aria-expanded={isExpanded}
              aria-label="회사 정보 보기"
            >
              회사 정보 보기
              <ChevronDown
                className={`h-3 w-3 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* 회사 정보 - 모바일에서는 토글, 데스크탑에서는 항상 표시 */}
            <div
              className={`space-y-1.5 md:space-y-2 overflow-hidden transition-all duration-300 ${
                isExpanded ? "max-h-40" : "max-h-0 md:max-h-none"
              }`}
            >
              <p className="text-[10px] sm:text-xs text-white/60">
                법인명: 위에이지 주식회사 (WEAGE Corp.)
              </p>
              <p className="text-[10px] sm:text-xs text-white/60 px-2">
                주소: 서울특별시 광진구 긴고랑로14길 64, 지하 1층(중곡동)
              </p>
              <p className="text-[10px] sm:text-xs text-white/60">
                사업자등록번호: 352-86-03601
              </p>
            </div>

            {/* Copyright - 항상 표시 */}
            <p className="text-[10px] sm:text-xs text-white/40 pt-2 md:pt-3">
              &copy; 2025 LEANUP. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);