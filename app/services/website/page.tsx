import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CheckCircle, Clock, Zap, Code, Globe, Shield, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function WebsitePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 to-purple-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Sparkles className="h-4 w-4" />
                2-4주 빠른 개발
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                웹사이트 개발
              </h1>
              <p className="mb-8 text-xl text-white/90">
                템플릿과 AI를 활용한 빠르고 효율적인 웹사이트 개발.
                전환율 최적화와 함께 30분 온보딩까지 제공합니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-blue-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
                >
                  무료 상담 받기
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-base font-medium text-white transition-all hover:bg-white hover:text-blue-600"
                >
                  포트폴리오 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                10일 완성 프로세스
              </h2>
              <p className="text-lg text-gray-600">
                체계적인 프로세스로 빠르고 정확하게 개발합니다
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

                {/* Timeline Items */}
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      D0-2
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-semibold mb-2">자료 수령 & 킥오프</h3>
                      <p className="text-gray-600">요구사항 분석, 자료 수집, 프로젝트 계획 수립</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      D3-5
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-semibold mb-2">골격 배치 & 카피/이미지 스테이징</h3>
                      <p className="text-gray-600">UI/UX 디자인, 콘텐츠 배치, 기본 구조 구현</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      D6-7
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-semibold mb-2">추적/SEO 설정</h3>
                      <p className="text-gray-600">GA4, GTM, SEO 최적화, 이벤트 추적 설정</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      D8-9
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-semibold mb-2">리비전 & QA</h3>
                      <p className="text-gray-600">수정사항 반영, 품질 테스트, 크로스 브라우징 체크</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      D10
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-md border-2 border-blue-200">
                      <h3 className="text-xl font-semibold mb-2 text-blue-900">런칭 & 7일 하이퍼케어</h3>
                      <p className="text-gray-700">배포 완료 후 7일간 집중 모니터링 및 즉시 대응</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 md:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                핵심 특징
              </h2>
              <p className="text-lg text-gray-600">
                LeanUp만의 차별화된 웹사이트 개발 서비스
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">템플릿 + AI 활용</h3>
                <p className="text-gray-600">
                  검증된 템플릿과 AI 기술을 활용하여 개발 속도와 품질을 동시에 확보
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">전환율 최적화</h3>
                <p className="text-gray-600">
                  히어로, CTA, 폼, 이벤트 등 전환 중심의 설계로 비즈니스 성과 극대화
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">30분 온보딩</h3>
                <p className="text-gray-600">
                  관리자 교육과 함께 직접 운영할 수 있도록 체계적인 온보딩 제공
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">7일 하이퍼케어</h3>
                <p className="text-gray-600">
                  런칭 후 7일간 집중 모니터링과 즉시 대응으로 안정적인 서비스 운영
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Globe className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">SEO 최적화</h3>
                <p className="text-gray-600">
                  검색 엔진 최적화로 자연 유입 트래픽 증가 및 마케팅 효과 극대화
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <Code className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">최신 기술 스택</h3>
                <p className="text-gray-600">
                  Next.js, TypeScript, tRPC 등 최신 기술로 확장성과 유지보수성 확보
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                제공 사항
              </h2>
              <p className="text-lg text-gray-600">
                웹사이트 개발과 함께 제공되는 서비스
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">기본 제공</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">반응형 웹사이트 (모바일/태블릿/PC)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">SSL 보안 인증서</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">기본 SEO 설정</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">30분 관리자 온보딩</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">7일 하이퍼케어</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">추가 옵션</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">데이터 모듈 (GA4, GTM, MS Clarity)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">유지보수 효율화 모듈</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">실시간 개발 현황 공유</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">추가 페이지 개발</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">맞춤형 기능 개발</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              10일 안에 웹사이트를 런칭하세요
            </h2>
            <p className="mb-8 text-xl text-white/90">
              지금 문의하시면 무료 상담과 함께 맞춤 견적을 제공합니다
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-blue-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                무료 상담 신청
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white hover:text-blue-600"
              >
                포트폴리오 보기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}