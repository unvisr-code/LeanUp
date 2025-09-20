import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// 포트폴리오 데이터 타입
export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  serviceType: string[];
  serviceLink?: string;
  category: "web" | "app" | "landing";
  thumbnail?: string;
  detailLink?: string;
  features?: string[];
  workScope?: string[];
}

// 포트폴리오 데이터
const portfolioData: PortfolioItem[] = [
  {
    id: "startup-sejong",
    name: "세종대학교 융합창업연계전공",
    description: "세종대학교 융합창업연계전공 소개 홈페이지",
    techStack: ["Next.js", "AWS", "Vibe Coding"],
    serviceType: ["Landing Page", "Web"],
    serviceLink: "https://startup-sejong.vercel.app/",
    category: "landing",
    thumbnail: "/portfolio/startup-sejong.png",
    workScope: ["기획", "디자인", "개발"],
    features: ["반응형 웹(PC/Mobile)", "화면설계", "UI 디자인", "어드민 페이지"],
  },
  {
    id: "horang-edu",
    name: "호랑에듀",
    description: "한글 프로그래밍 언어 기반의 코딩 교육 플랫폼",
    techStack: ["Next.js"],
    serviceType: ["Web"],
    serviceLink: "https://horang.it",
    category: "web",
    thumbnail: "/portfolio/horang-edu.png",
    workScope: ["개발"],
    features: ["한글 프로그래밍 언어", "코딩 교육 플랫폼"],
  },
  {
    id: "dimipay",
    name: "디미페이",
    description: "무인 매점 결제 핀테크 서비스 플랫폼",
    techStack: ["Next.js", "ETC"],
    serviceType: ["App", "Web"],
    category: "app",
    thumbnail: "/portfolio/dimipay.png",
    workScope: ["기획", "개발"],
    features: ["핀테크 서비스", "무인 매점 결제 시스템"],
  },
  {
    id: "dimigo-in",
    name: "디미고인",
    description: "교내 생활 인트라넷 플랫폼",
    techStack: ["Next.js", "ETC"],
    serviceType: ["App", "Web"],
    category: "app",
    thumbnail: "/portfolio/dimigo-in.png",
    workScope: ["기획", "개발"],
    features: ["교내 인트라넷", "학생 생활 관리"],
  },
  {
    id: "real-second-hand",
    name: "RealSecondHand",
    description: "SNS 기반 중고거래 플랫폼",
    techStack: ["React Native", "ETC"],
    serviceType: ["App"],
    category: "app",
    thumbnail: "/portfolio/real-second-hand.png",
    workScope: ["기획", "개발"],
    features: ["SNS 연동", "중고거래 기능"],
  },
  {
    id: "dalgeurak",
    name: "달그락",
    description: "교내 급식 관리 플랫폼",
    techStack: ["ETC"],
    serviceType: ["App"],
    category: "app",
    thumbnail: "/portfolio/dalgeurak.png",
    workScope: ["기획", "개발"],
    features: ["급식 메뉴 관리", "알림 시스템"],
  },
  {
    id: "hows-the-weather",
    name: "Hows the weather",
    description: "콘텐츠 제작사 웹사이트 디자인 및 개발",
    techStack: ["Next.js", "Vibe Coding"],
    serviceType: ["Landing Page", "Web"],
    serviceLink: "https://www.howstheweather.kr/",
    category: "landing",
    thumbnail: "/portfolio/hows-the-weather.png",
    workScope: ["기획", "디자인", "개발"],
    features: ["반응형 웹(PC/Mobile)", "화면설계", "UI 디자인", "폼빌더 연동"],
  },
  {
    id: "sejong-env",
    name: "세종대학교 환경융합공학과",
    description: "세종대학교 환경융합공학과 소개 홈페이지",
    techStack: ["Next.js", "Vibe Coding"],
    serviceType: ["Landing Page", "Web"],
    category: "landing",
    workScope: ["기획", "디자인", "개발"],
    features: ["반응형 웹", "학과 소개 페이지"],
  },
];

export const portfolioRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return portfolioData;
  }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.enum(["web", "app", "landing", "all"]) }))
    .query(({ input }) => {
      if (input.category === "all") {
        return portfolioData;
      }
      return portfolioData.filter((item) => item.category === input.category);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const item = portfolioData.find((p) => p.id === input.id);
      if (!item) {
        throw new Error("Portfolio item not found");
      }
      return item;
    }),
});