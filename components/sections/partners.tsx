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
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container mb-12">
        <div className="text-center">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
            TRUSTED BY
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            함께한 회사들
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            다양한 기업들과 함께 성장하고 있습니다
          </p>
        </div>
      </div>

      {/* Partner Logos Infinite Scroll - Single Line */}
      <div className="relative">
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex">
          <div className="flex items-center gap-6 md:gap-8 animate-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0"
              >
                <div className="group flex items-center justify-center w-40 md:w-48 h-20 md:h-24 px-4 md:px-6 py-3 md:py-4 bg-gray-50 rounded-xl transition-all duration-500 hover:bg-white hover:shadow-2xl hover:scale-110 cursor-pointer">
                  <div className="relative w-32 md:w-36 h-14 md:h-16">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
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
                <div className="group flex items-center justify-center w-40 md:w-48 h-20 md:h-24 px-4 md:px-6 py-3 md:py-4 bg-gray-50 rounded-xl transition-all duration-500 hover:bg-white hover:shadow-2xl hover:scale-110 cursor-pointer">
                  <div className="relative w-32 md:w-36 h-14 md:h-16">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
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