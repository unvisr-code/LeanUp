"use client";

import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
}

export function PartnersSection() {
  // src 폴더에 있는 실제 파트너 회사들
  const partners: Partner[] = [
    { name: "KDMHS", logo: "/src/KDMHS.webp" },
    { name: "Myutex", logo: encodeURI("/src/Myutex 로고.png") },
    { name: "Sejong", logo: "/src/Sejong.png" },
    { name: "WEAGE", logo: "/src/WEAGE.png" },
  ];

  // 무한 스크롤을 위해 배열을 여러 번 복제
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-16 md:py-24 bg-black overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-full blur-3xl" />

      <div className="container mb-12 relative z-10">
        <div className="text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.15] text-white text-sm font-semibold shadow-sm">
            TRUSTED BY
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            함께한 회사들
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            다양한 기업들과 함께 성장하고 있습니다
          </p>
        </div>
      </div>

      {/* Partner Logos Infinite Scroll - Single Line */}
      <div className="relative">
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex">
          <div className="flex items-center gap-6 md:gap-8 animate-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0"
              >
                <div className="group flex items-center justify-center w-40 md:w-48 h-20 md:h-24 px-4 md:px-6 py-3 md:py-4 bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-white/[0.12] hover:border-white/[0.25] hover:shadow-[0_8px_32px_rgba(96,165,250,0.2)] hover:scale-110 cursor-pointer">
                  <div className="relative w-32 md:w-36 h-14 md:h-16">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter brightness-90 opacity-80 group-hover:brightness-110 group-hover:opacity-100 transition-all duration-500"
                      sizes="(max-width: 768px) 128px, 144px"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-6 md:gap-8 animate-scroll" aria-hidden="true">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-duplicate-${index}`}
                className="flex-shrink-0"
              >
                <div className="group flex items-center justify-center w-40 md:w-48 h-20 md:h-24 px-4 md:px-6 py-3 md:py-4 bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-white/[0.12] hover:border-white/[0.25] hover:shadow-[0_8px_32px_rgba(96,165,250,0.2)] hover:scale-110 cursor-pointer">
                  <div className="relative w-32 md:w-36 h-14 md:h-16">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter brightness-90 opacity-80 group-hover:brightness-110 group-hover:opacity-100 transition-all duration-500"
                      sizes="(max-width: 768px) 128px, 144px"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}