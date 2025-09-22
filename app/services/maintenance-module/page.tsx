import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Wrench, MessageSquare, Zap, Clock, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function MaintenanceModulePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-600 to-teal-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Clock className="h-4 w-4" />
                Coming Soon
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                유지보수 효율화 모듈
              </h1>
              <p className="mb-8 text-xl text-white/90">
                Framer 기반 시각화된 피드백과 프롬프트로 간단한 수정.
                커뮤니케이션 비용을 획기적으로 절감합니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-green-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
                >
                  출시 알림 신청
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-8 bg-blue-50 border-y border-blue-200">
          <div className="container">
            <div className="flex items-center justify-center gap-3 text-blue-800">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">곧 공개 예정입니다. 출시 알림을 신청하시면 가장 먼저 소식을 전해드립니다.</p>
            </div>
          </div>
        </section>

        {/* Preview Features */}
        <section className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                주요 기능 (예정)
              </h2>
              <p className="text-lg text-gray-600">
                유지보수를 더 쉽고 빠르게
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 opacity-90">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">시각화된 피드백</h3>
                <p className="text-gray-600">
                  Framer 기반으로 화면에서 직접 수정 사항을 표시하고 피드백
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  개발 중
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 opacity-90">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">프롬프트 수정</h3>
                <p className="text-gray-600">
                  간단한 텍스트 입력만으로 웹사이트 콘텐츠 수정 가능
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  개발 중
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 opacity-90">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">검수 & 배포</h3>
                <p className="text-gray-600">
                  수정 사항 검수 후 원클릭 배포와 자동 알림
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  개발 중
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Preview */}
        <section className="py-20 md:py-24 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
                기대 효과
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">커뮤니케이션 비용 80% 절감</h3>
                    <p className="text-gray-600">
                      이메일, 전화 대신 직관적인 인터페이스로 수정 요청
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">수정 시간 90% 단축</h3>
                    <p className="text-gray-600">
                      간단한 수정은 프롬프트 입력만으로 즉시 반영
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">24/7 수정 가능</h3>
                    <p className="text-gray-600">
                      업무 시간 외에도 언제든 수정 요청 가능
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">투명한 진행 상황</h3>
                    <p className="text-gray-600">
                      수정 요청부터 배포까지 실시간으로 확인
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="py-20 md:py-24 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              유지보수의 새로운 패러다임
            </h2>
            <p className="mb-8 text-xl text-white/90">
              출시 알림을 신청하고 얼리버드 혜택을 받으세요
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-green-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
            >
              출시 알림 신청하기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}