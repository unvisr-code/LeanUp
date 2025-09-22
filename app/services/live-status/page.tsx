import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Bell, Activity, Users, BarChart, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LiveStatusPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-orange-500 to-red-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Bell className="h-4 w-4" />
                Coming Soon
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                실시간 개발 현황 공유
              </h1>
              <p className="mb-8 text-xl text-white/90">
                개발 진행 상황을 실시간으로 확인하고
                단계별 자동 알림을 받으세요.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-orange-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
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
              <p className="font-medium">곧 공개 예정입니다. 프로젝트 진행을 더욱 투명하게 만들어드립니다.</p>
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
                프로젝트 진행을 실시간으로
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 opacity-90">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">실시간 대시보드</h3>
                <p className="text-gray-600">
                  진행중인 작업과 완료 현황을 실시간으로 확인
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  개발 중
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 opacity-90">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">자동 알림</h3>
                <p className="text-gray-600">
                  단계 전환 시 이메일/브라우저 푸시 알림
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  개발 중
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 opacity-90">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <BarChart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">진행률 추적</h3>
                <p className="text-gray-600">
                  전체 프로젝트와 개별 작업의 진행률 시각화
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  개발 중
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Preview */}
        <section className="py-20 md:py-24 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
                알림 시점
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">단계 전환</h3>
                    <p className="text-gray-600">
                      기획 → 디자인 → 개발 → 테스트 → 배포 각 단계 진입 시
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">배포 완료</h3>
                    <p className="text-gray-600">
                      새로운 기능이나 수정 사항이 실제 서비스에 반영될 때
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">유지보수 반영</h3>
                    <p className="text-gray-600">
                      요청하신 수정 사항이 처리되고 반영될 때
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <BarChart className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">주간 리포트</h3>
                    <p className="text-gray-600">
                      데이터 인사이트와 개발 진행 상황 주간 요약
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                기대 효과
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-red-100">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">'관리받는 느낌'</h3>
                <p className="text-gray-600">
                  지속적인 업데이트로 프로젝트가 잘 진행되고 있음을 체감
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                  <AlertCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">불필요한 회의 감소</h3>
                <p className="text-gray-600">
                  진행 상황 확인을 위한 미팅 시간 80% 절감
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-teal-100">
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">투명한 진행</h3>
                <p className="text-gray-600">
                  언제든 접속해서 현재 상황을 정확히 파악
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="py-20 md:py-24 bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              프로젝트 진행을 더 투명하게
            </h2>
            <p className="mb-8 text-xl text-white/90">
              출시 알림을 신청하고 특별 혜택을 받으세요
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-orange-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
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