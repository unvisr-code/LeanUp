"use client";

import { Star } from "lucide-react";

interface Testimonial {
  type: string;
  emoji: string;
  content: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    type: "스타트업",
    emoji: "🧑‍💼",
    content: `"처음엔 예산 때문에 전문 웹사이트는 엄두도 못 냈어요.
LeanUp 덕분에 합리적인 가격에 전문가 수준의 웹사이트를 만들 수 있었죠.
지금은 투자자 미팅에서도 '홈페이지 퀄리티가 좋다'는 얘기를 자주 듣습니다."`,
    author: "스타트업 대표",
  },
  {
    type: "마케팅",
    emoji: "👩‍💻",
    content: `"비용 절감이 1순위였는데, 저렴하다고 해서 퀄리티가 낮을까 걱정했어요.
막상 받아보니 브랜드 이미지를 살리는 디자인과 구조까지 완벽했습니다.
합리적인 가격에 이런 결과라니, 다시 선택해도 LeanUp이에요."`,
    author: "마케팅 담당자",
  },
  {
    type: "소상공인",
    emoji: "🛍️",
    content: `"우리 같은 작은 가게도 이제는 온라인에서 보여지는 게 중요하잖아요.
LeanUp 덕분에 저렴한 가격으로도 전문가가 만든 듯한 홈페이지를 가지게 됐습니다.
고객들이 '가게가 믿음직해 보인다'는 말을 해줘서 매출에도 도움이 됐어요."`,
    author: "소상공인",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-[#F8F8F8]">
      <div className="container">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            고객이 직접 말하는 LeanUp 경험 💬
          </h2>
        </div>

        {/* 인터뷰 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* 상단: 고객 유형 라벨 + 이모지 */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{testimonial.emoji}</span>
                <span className="text-sm font-semibold text-gray-600">
                  {testimonial.author}
                </span>
              </div>

              {/* 별점 */}
              <div className="flex gap-0.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* 인터뷰 본문 */}
              <blockquote className="text-gray-700 leading-relaxed whitespace-pre-line">
                {testimonial.content}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}