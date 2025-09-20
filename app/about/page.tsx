import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Users, Zap, Target, Heart } from "lucide-react";

const teamMembers = [
  { name: "개발팀", role: "Frontend/Backend 개발", description: "최신 기술 스택으로 빠르고 안정적인 웹사이트 구축" },
  { name: "디자인팀", role: "UI/UX 디자인", description: "사용자 중심의 직관적이고 아름다운 디자인" },
  { name: "PM팀", role: "프로젝트 관리", description: "체계적인 프로세스로 일정과 품질 관리" },
  { name: "데이터팀", role: "데이터 분석", description: "GA4, GTM 설정 및 데이터 기반 인사이트 제공" },
  { name: "세일즈팀", role: "고객 상담", description: "맞춤형 솔루션 제안 및 지속적인 고객 지원" },
];

const values = [
  {
    icon: Zap,
    title: "속도",
    description: "빠른 납기와 신속한 대응으로 비즈니스 성장을 가속화합니다",
  },
  {
    icon: Target,
    title: "효율",
    description: "불필요한 과정을 제거하고 핵심에 집중하여 비용을 최적화합니다",
  },
  {
    icon: Heart,
    title: "고객 중심",
    description: "고객의 성공이 우리의 성공이라는 믿음으로 함께 성장합니다",
  },
  {
    icon: Users,
    title: "협업",
    description: "투명한 소통과 체계적인 협업으로 최고의 결과를 만듭니다",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                LeanUp 소개
              </h1>
              <p className="text-lg text-gray-600">
                스타트업과 소규모 기업의 성장을 돕는
                <br />
                웹 개발 전문 팀입니다
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white md:p-12">
                <h2 className="mb-4 text-3xl font-bold">우리의 미션</h2>
                <p className="mb-6 text-lg text-blue-100">
                  &ldquo;웹사이트에 추가로 데이터 추적 셋업 + 온보딩까지 한 번에&rdquo;
                </p>
                <p className="text-white/90">
                  LeanUp은 단순한 웹 개발 회사가 아닙니다. 우리는 고객의 비즈니스 성장을 위한
                  종합적인 디지털 솔루션을 제공합니다. 웹사이트 제작부터 데이터 추적 설정,
                  온보딩, 그리고 지속적인 유지보수까지 - 모든 과정을 원스톱으로 해결하여
                  고객이 비즈니스에만 집중할 수 있도록 돕습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
                핵심 가치
              </h2>
              <p className="mb-12 text-lg text-gray-600">
                우리가 추구하는 가치
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
                우리 팀
              </h2>
              <p className="mb-12 text-lg text-gray-600">
                각 분야의 전문가들이 함께 만들어가는 LeanUp
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
                우리의 작업 방식
              </h2>
              <p className="mb-12 text-lg text-gray-600">
                스프린트 기반의 체계적인 운영
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    1. 애자일 스프린트
                  </h3>
                  <p className="text-gray-600">
                    1-2주 단위의 스프린트로 빠른 피드백과 개선을 반복합니다
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    2. 투명한 소통
                  </h3>
                  <p className="text-gray-600">
                    실시간 진행 상황 공유와 정기적인 업데이트로 신뢰를 구축합니다
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    3. 지속적인 개선
                  </h3>
                  <p className="text-gray-600">
                    데이터 기반의 의사결정과 지속적인 최적화로 성과를 향상시킵니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              함께 성장할 준비가 되셨나요?
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              LeanUp과 함께 비즈니스의 다음 단계로 나아가세요
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-primary shadow-lg transition-all hover:bg-gray-50"
            >
              프로젝트 시작하기
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}