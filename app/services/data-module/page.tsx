import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BarChart3, Database, Brain, LineChart, PieChart, TrendingUp, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DataModulePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-600 to-pink-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Sparkles className="h-4 w-4" />
                개발중
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                데이터 모듈
              </h1>
              <p className="mb-8 text-xl text-white/90">
                GA4, GTM, UTM, MS Clarity 기본 세팅과 퍼널 대시보드.
                AI 데이터 도우미로 프롬프트만으로 인사이트를 얻으세요.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-purple-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
                >
                  얼리버드 신청
                </Link>
                <a
                  href="https://data-module.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-base font-medium text-white transition-all hover:bg-white hover:text-purple-600"
                >
                  데모 보기
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Development Notice */}
        <section className="py-8 bg-yellow-50 border-y border-yellow-200">
          <div className="container">
            <div className="flex items-center justify-center gap-3 text-yellow-800">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">현재 개발 중인 서비스입니다. 얼리버드 신청 시 특별 혜택을 제공합니다.</p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                데이터 기본 세트
              </h2>
              <p className="text-lg text-gray-600">
                데이터 기반 의사결정을 위한 완벽한 세팅
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">GA4 설정</h3>
                <p className="text-sm text-gray-600">
                  Google Analytics 4 설치 및 주요 이벤트 설정
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">GTM 구축</h3>
                <p className="text-sm text-gray-600">
                  Google Tag Manager로 태그 관리 체계화
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <LineChart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">UTM 추적</h3>
                <p className="text-sm text-gray-600">
                  캠페인별 성과 측정을 위한 UTM 파라미터 설정
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <PieChart className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">MS Clarity</h3>
                <p className="text-sm text-gray-600">
                  히트맵과 세션 레코딩으로 사용자 행동 분석
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Data Assistant */}
        <section className="py-20 md:py-24 bg-gray-50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                  <Brain className="h-4 w-4" />
                  AI 기반 분석
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  AI 데이터 도우미 (MCP)
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  복잡한 데이터 분석도 대화하듯 쉽게.
                  프롬프트로 핵심 지표를 탐색하고 인사이트를 발견하세요.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">자연어 질의</h3>
                      <p className="text-sm text-gray-600">
                        &ldquo;지난달 전환율은?&rdquo; 같은 일상 언어로 데이터 조회
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">자동 인사이트</h3>
                      <p className="text-sm text-gray-600">
                        AI가 자동으로 중요한 변화와 패턴을 발견
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">3</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">실시간 대시보드</h3>
                      <p className="text-sm text-gray-600">
                        주요 지표를 한눈에 볼 수 있는 맞춤형 대시보드
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="https://data-module.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700"
                  >
                    데모 사이트 방문하기
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-8">
                  <div className="rounded-lg bg-white p-4 shadow-lg mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        AI
                      </div>
                      <span className="text-sm font-medium text-gray-700">데이터 도우미</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      &ldquo;지난주 가장 많이 방문한 페이지는 뭐야?&rdquo;
                    </div>
                    <div className="text-sm text-purple-600">
                      분석 중... ✨
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-4 shadow-lg">
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      📊 상위 방문 페이지 (지난주)
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">1. 홈페이지</span>
                        <span className="font-medium">2,453 views</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">2. 제품 소개</span>
                        <span className="font-medium">1,872 views</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">3. 문의하기</span>
                        <span className="font-medium">945 views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Features */}
        <section className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                퍼널 대시보드 템플릿
              </h2>
              <p className="text-lg text-gray-600">
                즉시 사용 가능한 맞춤형 대시보드 제공
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">트래픽 분석</h3>
                <p className="text-gray-600">
                  방문자 수, 페이지뷰, 체류시간 등 기본 지표 모니터링
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-blue-100">
                  <PieChart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">전환 퍼널</h3>
                <p className="text-gray-600">
                  방문→가입→구매 단계별 전환율 추적 및 개선점 발견
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-red-100">
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">캠페인 성과</h3>
                <p className="text-gray-600">
                  마케팅 채널별 ROI 분석과 최적화 인사이트
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Extension Options */}
        <section className="py-20 md:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                확장 옵션
              </h2>
              <p className="text-lg text-gray-600">
                필요에 따라 확장 가능한 고급 기능
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-3">BigQuery 연동</h3>
                <p className="text-sm text-gray-600 mb-4">
                  대용량 데이터 처리와 고급 분석을 위한 데이터 웨어하우스 구축
                </p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  Enterprise
                </span>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-3">Looker Studio</h3>
                <p className="text-sm text-gray-600 mb-4">
                  비즈니스 인텔리전스 도구로 고급 시각화와 리포트 생성
                </p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  Professional
                </span>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-3">MS Power BI</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Microsoft 생태계와 연동된 강력한 비즈니스 분석 도구
                </p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  Professional
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              데이터로 더 나은 결정을 내리세요
            </h2>
            <p className="mb-8 text-xl text-white/90">
              얼리버드 신청 시 특별 할인 혜택을 제공합니다
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-purple-600 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
            >
              얼리버드 신청하기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}