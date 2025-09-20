"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/trpc/provider";
import { cn } from "@/lib/utils";

export function PortfolioCarousel() {
  const { data: portfolios, isLoading } = api.portfolio.getAll.useQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && portfolios && portfolios.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % portfolios.length);
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, portfolios]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? (portfolios?.length || 1) - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % (portfolios?.length || 1)
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-24 overflow-hidden">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              포트폴리오
            </h2>
            <p className="text-lg text-gray-600">
              다양한 산업군의 성공적인 프로젝트들
            </p>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse text-gray-400">로딩 중...</div>
          </div>
        </div>
      </section>
    );
  }

  const displayItems = portfolios || [];

  return (
    <section className="py-20 md:py-24 overflow-hidden bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            포트폴리오
          </h2>
          <p className="text-lg text-gray-600">
            다양한 산업군의 성공적인 프로젝트들
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Carousel Container */}
          <div
            className="relative overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={containerRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 px-2 md:px-4"
                >
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02]">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="aspect-video md:aspect-square bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.name}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-6xl font-bold text-white/20">
                                {item.name.charAt(0)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        {/* Tags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {item.serviceType.map((type, i) => (
                            <span
                              key={i}
                              className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                            >
                              {type}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 text-2xl md:text-3xl font-bold text-gray-900">
                          {item.name}
                        </h3>

                        {/* Description */}
                        <p className="mb-4 text-gray-600 text-lg">
                          {item.description}
                        </p>

                        {/* Work Scope */}
                        {item.workScope && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {item.workScope.map((scope, i) => (
                              <span
                                key={i}
                                className="inline-block rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                              >
                                {scope}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Tech Stack */}
                        <div className="mb-6 flex flex-wrap gap-2">
                          {item.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="text-sm text-gray-500"
                            >
                              {tech}{i < item.techStack.length - 1 && " · "}
                            </span>
                          ))}
                        </div>

                        {/* Link */}
                        {item.serviceLink && (
                          <a
                            href={item.serviceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary font-medium hover:underline"
                          >
                            사이트 방문
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {displayItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            전체 포트폴리오 보기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}