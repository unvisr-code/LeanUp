import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-3">
            <Image
              src="/assets/main.png"
              alt="LeanUp"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              웹사이트에 추가로 데이터 추적 셋업 + 온보딩까지 한 번에
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">서비스</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services#website" className="hover:text-primary">
                  웹사이트 제작
                </Link>
              </li>
              <li>
                <Link href="/services#data" className="hover:text-primary">
                  데이터 모듈
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="hover:text-primary">
                  유지보수 모듈
                </Link>
              </li>
              <li>
                <Link href="/services#status" className="hover:text-primary">
                  실시간 현황 공유
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">회사</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  팀 소개
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary">
                  포트폴리오
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary">
                  가격
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">문의</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contact@leanup.kr" className="hover:text-primary">
                  contact@leanup.kr
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  견적 문의
                </Link>
              </li>
              <li>
                <a
                  href="https://channel.io/leanup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  채널톡
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 LeanUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}