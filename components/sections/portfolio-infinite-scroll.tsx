"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { api } from "@/lib/trpc/provider";

export function PortfolioInfiniteScroll() {
  const { data: portfolios, isLoading } = api.portfolio.getAll.useQuery();
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for infinite scroll effect
  const items = portfolios || [];
  const duplicatedItems = [...items, ...items, ...items]; // Triple for smoother infinite scroll

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
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400">로딩 중...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mb-12">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            포트폴리오
          </h2>
          <p className="text-lg text-gray-600">
            다양한 산업군의 성공적인 프로젝트들
          </p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div
          className={`flex gap-6 overflow-x-hidden ${isPaused ? '' : 'animate-scroll-left'}`}
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[350px] md:w-[400px] lg:w-[450px]"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full">
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      width={450}
                      height={253}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white/20">
                          {item.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Overlay with service type */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.serviceType.slice(0, 2).map((type: string, i: number) => (
                      <span
                        key={i}
                        className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-800"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="mb-3 text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Work Scope */}
                  {item.workScope && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {item.workScope.map((scope: string, i: number) => (
                        <span
                          key={i}
                          className="inline-block rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="mb-4 text-sm text-gray-500">
                    {item.techStack.join(" · ")}
                  </div>

                  {/* Link */}
                  {item.serviceLink && (
                    <a
                      href={item.serviceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary font-medium hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      사이트 방문
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row - Reverse Direction */}
      <div
        className="relative mt-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container - Reverse */}
        <div
          className={`flex gap-6 overflow-x-hidden ${isPaused ? '' : 'animate-scroll-right'}`}
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicatedItems.reverse().map((item, index) => (
            <div
              key={`${item.id}-reverse-${index}`}
              className="flex-shrink-0 w-[350px] md:w-[400px] lg:w-[450px]"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full">
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      width={450}
                      height={253}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white/20">
                          {item.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Overlay with service type */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.serviceType.slice(0, 2).map((type: string, i: number) => (
                      <span
                        key={i}
                        className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-800"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="mb-3 text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Work Scope */}
                  {item.workScope && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {item.workScope.map((scope: string, i: number) => (
                        <span
                          key={i}
                          className="inline-block rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="mb-4 text-sm text-gray-500">
                    {item.techStack.join(" · ")}
                  </div>

                  {/* Link */}
                  {item.serviceLink && (
                    <a
                      href={item.serviceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary font-medium hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      사이트 방문
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="container mt-12">
        <div className="text-center">
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