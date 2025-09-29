import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/[0.1] overflow-hidden">
      {/* Background gradient similar to other sections */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl" />
      <div className="container py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-3">
            <Logo size="md" variant="light" />
            <p className="text-sm text-white/60">
              웹사이트에 추가로 데이터 추적 셋업 + 온보딩까지 한 번에
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">서비스</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/services#website" className="hover:text-white/90 transition-colors">
                  웹사이트 제작
                </Link>
              </li>
              <li>
                <Link href="/services#data" className="hover:text-white/90 transition-colors">
                  데이터 모듈
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="hover:text-white/90 transition-colors">
                  유지보수 모듈
                </Link>
              </li>
              <li>
                <Link href="/services#status" className="hover:text-white/90 transition-colors">
                  실시간 현황 공유
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">회사</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/about" className="hover:text-white/90 transition-colors">
                  팀 소개
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white/90 transition-colors">
                  포트폴리오
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white/90 transition-colors">
                  가격
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">문의</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="mailto:contact@leanup.kr" className="hover:text-white/90 transition-colors">
                  contact@leanup.kr
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white/90 transition-colors">
                  견적 문의
                </Link>
              </li>
              <li>
                <a
                  href="https://channel.io/leanup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/90 transition-colors"
                >
                  채널톡
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.1] pt-8 text-center text-sm text-white/40">
          <p>&copy; 2025 LeanUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}