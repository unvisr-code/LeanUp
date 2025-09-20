import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CheckCircle, ArrowRight, Info } from "lucide-react";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                가격 안내
              </h1>
              <p className="text-lg text-gray-600">
                프로젝트 규모와 요구사항에 따른 맞춤형 견적
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Info Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              {/* Custom Quote Notice */}
              <div className="mb-12 rounded-xl border-2 border-primary bg-blue-50 p-8 text-center">
                <Info className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  맞춤형 견적 시스템
                </h2>
                <p className="mb-6 text-gray-600">
                  모든 프로젝트는 고유한 요구사항을 가지고 있습니다.
                  <br />
                  정확한 견적을 위해 상담을 통해 프로젝트 범위를 파악하고 최적의 가격을 제안합니다.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-primary/90"
                >
                  무료 견적 받기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>

              {/* Price Factors */}
              <div className="mb-12">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                  가격 결정 요소
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border bg-white p-6">
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">
                      프로젝트 규모
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>페이지 수 및 복잡도</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>필요한 기능 및 통합</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>컨텐츠 제작 범위</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border bg-white p-6">
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">
                      기술 요구사항
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>커스텀 개발 수준</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>서드파티 서비스 연동</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>성능 최적화 요구사항</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border bg-white p-6">
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">
                      디자인 요구사항
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>커스텀 디자인 vs 템플릿</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>브랜딩 작업 포함 여부</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>반응형 디자인 범위</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border bg-white p-6">
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">
                      추가 서비스
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>데이터 모듈 설정</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>유지보수 계약</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                        <span>마케팅 통합</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-12">
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                  모든 프로젝트에 포함
                </h3>

                <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">무료 초기 상담</p>
                        <p className="text-sm text-gray-600">프로젝트 요구사항 분석</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">반응형 디자인</p>
                        <p className="text-sm text-gray-600">모바일, 태블릿, PC 최적화</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">기본 SEO 설정</p>
                        <p className="text-sm text-gray-600">검색엔진 최적화</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">관리자 온보딩</p>
                        <p className="text-sm text-gray-600">30분 온보딩 세션</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">7일 하이퍼케어</p>
                        <p className="text-sm text-gray-600">런칭 후 즉시 대응</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">GA4/GTM 기본 설정</p>
                        <p className="text-sm text-gray-600">데이터 추적 기본 세팅</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                  자주 묻는 질문
                </h3>

                <div className="space-y-6">
                  <div className="rounded-lg border bg-white p-6">
                    <h4 className="mb-2 font-semibold text-gray-900">
                      최소 프로젝트 예산이 있나요?
                    </h4>
                    <p className="text-gray-600">
                      프로젝트의 규모와 복잡도에 따라 다르지만, 일반적으로 500만원부터 시작합니다.
                      정확한 견적은 상담을 통해 안내드립니다.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-white p-6">
                    <h4 className="mb-2 font-semibold text-gray-900">
                      계약금은 얼마나 필요한가요?
                    </h4>
                    <p className="text-gray-600">
                      일반적으로 전체 프로젝트 비용의 30-50%를 계약금으로 받고 있으며,
                      나머지는 프로젝트 완료 시 지불하시면 됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-white p-6">
                    <h4 className="mb-2 font-semibold text-gray-900">
                      유지보수 비용은 별도인가요?
                    </h4>
                    <p className="text-gray-600">
                      런칭 후 7일간의 하이퍼케어는 무료로 제공됩니다.
                      이후 유지보수는 선택적으로 계약하실 수 있으며, 월 단위로 합리적인 가격에 제공됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-white p-6">
                    <h4 className="mb-2 font-semibold text-gray-900">
                      추가 수정은 어떻게 진행되나요?
                    </h4>
                    <p className="text-gray-600">
                      프로젝트 진행 중 합의된 범위 내에서의 수정은 무료입니다.
                      범위를 벗어난 추가 작업은 별도 견적을 통해 진행됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              정확한 견적이 궁금하신가요?
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              무료 상담을 통해 프로젝트에 최적화된 견적을 받아보세요
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-primary shadow-lg transition-all hover:bg-gray-50"
              >
                무료 견적 받기
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="https://channel.io/leanup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 text-base font-medium text-white transition-all hover:bg-white hover:text-primary"
              >
                채널톡 상담
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}