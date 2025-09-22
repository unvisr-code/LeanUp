"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { api } from "@/lib/trpc/provider";
import { cn } from "@/lib/utils";

export function PortfolioAutoScroll() {
  const { data: portfolios, isLoading } = api.portfolio.getAll.useQuery();

  // Duplicate items for seamless infinite scroll
  const items = portfolios || [];
  // Triple the items for smoother looping
  const tripleItems = [...items, ...items, ...items];

  if (isLoading || items.length === 0) {
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
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-gray-400">로딩 중...</div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white">

      {/* First Row - Scrolling Left */}
      <div className="relative mb-3 overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 h-full w-20 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="relative">
          <div className="flex gap-3 animate-scroll-left">
            {tripleItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-none w-[200px] md:w-[240px] lg:w-[280px] h-[120px] md:h-[135px] lg:h-[150px]"
              >
                <PortfolioImageCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row - Scrolling Right */}
      <div className="relative overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 h-full w-20 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="relative">
          <div className="flex gap-3 animate-scroll-right">
            {[...tripleItems].reverse().map((item, index) => (
              <div
                key={`${item.id}-rev-${index}`}
                className="flex-none w-[200px] md:w-[240px] lg:w-[280px] h-[120px] md:h-[135px] lg:h-[150px]"
              >
                <PortfolioImageCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

// Portfolio Image Card Component
interface PortfolioImageCardProps {
  item: any;
}

function PortfolioImageCard({ item }: PortfolioImageCardProps) {
  const content = (
    <div className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
      {item.thumbnail ? (
        <Image
          src={item.thumbnail}
          alt={item.name}
          width={360}
          height={180}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-4xl font-bold text-white/20">
            {item.name.charAt(0)}
          </div>
        </div>
      )}

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-sm mb-1">{item.name}</h3>
          {item.serviceLink && (
            <span className="inline-flex items-center text-white/80 text-xs">
              <ExternalLink className="h-3 w-3" />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (item.serviceLink) {
    return (
      <a
        href={item.serviceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {content}
      </a>
    );
  }

  return content;
}