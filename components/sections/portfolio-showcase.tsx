"use client";

import { Star, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";
import { api } from "@/lib/trpc/provider";

// 미니 후기 데이터 (한 줄로 간소화)
const miniTestimonials = [
  { stars: 5, text: "2주 만에 완성, 정말 만족스럽습니다", author: "스타트업 대표" },
  { stars: 5, text: "합리적인 가격에 전문가 퀄리티", author: "마케팅 담당자" },
  { stars: 5, text: "유입 데이터를 쉽게 볼 수 있었어요", author: "홈페이지 운영 담당자" },
];

function PortfolioShowcaseSectionComponent() {
  const { data: portfolios, isLoading } = api.portfolio.getAll.useQuery();

  // 홈페이지에서는 6개만 표시 (메모화)
  const displayPortfolios = useMemo(() => {
    return portfolios?.slice(0, 6) || [];
  }, [portfolios]);

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              실제 작업 포트폴리오
            </h2>
            <p className="text-lg text-white/70">
              다양한 산업군의 성공 프로젝트
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-white/40">로딩 중...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="py-16 md:py-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      aria-label="포트폴리오 및 고객 후기"
    >
      {/* 배경 장식 */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-purple-500/5 rounded-full blur-2xl" />

      <div className="container relative z-10">
        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
            실제 작업 포트폴리오
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            다양한 산업군의 고객들과 함께한 성공 프로젝트
          </p>
        </motion.div>

        {/* 포트폴리오 그리드 - 모바일 2열, 간격 개선 */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-8 sm:mb-10 md:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {displayPortfolios.length > 0 ? (
            displayPortfolios.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-white/[0.08] border border-white/[0.15] hover:border-white/[0.25] transition-all duration-300 active:scale-[0.96] touch-manipulation shadow-sm hover:shadow-lg hover:shadow-white/[0.1]"
              >
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={index < 4}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <div className="text-2xl font-bold text-white/30">
                      {item.name.charAt(0)}
                    </div>
                  </div>
                )}

                {/* 호버 오버레이 - 모바일에서는 항상 표시, 텍스트 크기 증가 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-3">
                    <h3 className="text-white font-medium text-sm sm:text-sm truncate">
                      {item.name}
                    </h3>
                    {item.serviceLink && (
                      <ExternalLink className="h-3 w-3 md:h-3 md:w-3 text-white/60 mt-1 md:mt-1" />
                    )}
                  </div>
                </div>

                {/* 클릭 가능한 링크 */}
                {item.serviceLink && (
                  <a
                    href={item.serviceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`${item.name} 보기`}
                  />
                )}
              </motion.div>
            ))
          ) : (
            // 포트폴리오가 없을 때 플레이스홀더
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="aspect-[4/3] rounded-lg bg-white/[0.05] border border-white/[0.1] animate-pulse"
              />
            ))
          )}
        </motion.div>

        {/* 미니 고객 후기 - 모바일에서도 모든 후기 표시 */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 py-6 sm:py-6 md:py-8 border-y border-white/[0.1] px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
            {miniTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center text-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div>
                  {/* 별점 */}
                  <div className="flex justify-center gap-0.5 mb-2 md:mb-2">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  {/* 후기 텍스트 */}
                  <p className="text-sm sm:text-sm text-white/70 mb-1 md:mb-1">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  {/* 작성자 */}
                  <p className="text-xs sm:text-xs text-white/50">
                    - {testimonial.author}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center px-6 md:px-8 py-3 md:py-4 min-h-[48px] text-sm md:text-base bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-full text-white font-medium transition-all hover:bg-white/[0.12] hover:border-white/[0.25] hover:shadow-lg hover:shadow-white/10 active:scale-95 touch-manipulation"
          >
            전체 포트폴리오 보기
            <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

// 컴포넌트 메모화
export const PortfolioShowcaseSection = memo(PortfolioShowcaseSectionComponent);