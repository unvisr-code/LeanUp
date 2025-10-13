"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

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
    content: `"처음엔 예산 때문에 전문 웹사이트는 엄두도 못 냈어요. LEANUP 덕분에 합리적인 가격에 전문가 수준의 웹사이트를 만들 수 있었죠."`,
    author: "스타트업 대표",
  },
  {
    type: "마케팅",
    emoji: "👩‍💻",
    content: `"비용 절감이 1순위였는데, 저렴하다고 해서 퀄리티가 낮을까 걱정했어요. 막상 받아보니 브랜드 이미지까지 완벽했습니다."`,
    author: "마케팅 담당자",
  },
  {
    type: "소상공인",
    emoji: "🛍️",
    content: `"우리 같은 작은 가게도 이제는 온라인에서 보여지는 게 중요하잖아요. 덕분에 매출에도 도움이 됐어요."`,
    author: "소상공인",
  },
  {
    type: "프리랜서",
    emoji: "💼",
    content: `"개인 포트폴리오 사이트가 필요했는데, 직접 만들 시간이 없었어요. 빠르게 완성해주셔서 클라이언트 미팅에 활용할 수 있었습니다."`,
    author: "디자이너",
  },
  {
    type: "교육기관",
    emoji: "🎓",
    content: `"학원 홈페이지를 만들면서 GA4 설정까지 해주셔서 마케팅 효과를 바로 확인할 수 있었어요. 정말 만족스럽습니다."`,
    author: "학원 원장",
  },
  {
    type: "이커머스",
    emoji: "🛒",
    content: `"온라인 쇼핑몰 구축이 복잡할 줄 알았는데, 2주 만에 완성되어서 놀랐습니다. 유지보수도 쉽게 할 수 있어서 좋아요."`,
    author: "쇼핑몰 운영자",
  },
];

export function TestimonialsSection() {
  return (
    <motion.section
      className="py-20 md:py-32 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background decoration - main의 배경이 이어지게 함 */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            고객이 직접 말하는 LEANUP 경험 ✨
          </h2>
        </div>

        {/* 인터뷰 카드 그리드 - 6개 컴팩트 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-white/[0.12] hover:border-white/[0.25] hover:shadow-[0_8px_32px_rgba(96,165,250,0.2)] hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
            >
              {/* 상단: 고객 유형 라벨 + 이모지 */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{testimonial.emoji}</span>
                <span className="text-xs font-semibold text-white/80">
                  {testimonial.author}
                </span>
              </div>

              {/* 별점 */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 transition-all duration-300"
                  />
                ))}
              </div>

              {/* 인터뷰 본문 */}
              <blockquote className="text-sm text-white/70 leading-relaxed">
                {testimonial.content}
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}