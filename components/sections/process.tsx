import { FileText, Layout, Code, Rocket, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: FileText,
    day: "step1",
    title: "자료 수령 & 킥오프",
    description: "프로젝트 요구사항 파악 및 자료 수집",
  },
  {
    icon: Layout,
    day: "step2",
    title: "골격 & 카피 반영",
    description: "와이어프레임 구성 및 콘텐츠 배치",
  },
  {
    icon: Code,
    day: "step3",
    title: "스테이징 & 추적 설정",
    description: "개발 완료 및 데이터 추적 코드 설치",
  },
  {
    icon: Rocket,
    day: "step4",
    title: "QA & 런칭",
    description: "품질 검증 및 실제 서비스 배포",
  },
  {
    icon: HeartHandshake,
    day: "+n일",
    title: "유지보수",
    description: "런칭 후 n일간 즉시 대응 서비스",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            30일 완성 프로세스
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            체계적인 프로세스로 빠르고 정확하게 완성합니다
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line - Desktop Only */}
          <div className="absolute left-1/2 top-12 hidden h-1 w-full -translate-x-1/2 transform bg-gray-200 lg:block">
            <div className="absolute h-full w-2/3 bg-primary"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center">
                  <div className="relative z-10 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow-sm">
                    <p className="mb-1 text-sm font-semibold text-primary">
                      {step.day}
                    </p>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}