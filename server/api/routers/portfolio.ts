import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { supabaseAdmin } from "@/lib/supabase";

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
  getAll: publicProcedure.query(async () => {
    try {
      const { data: portfolios, error } = await supabaseAdmin
        .from('portfolio')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        // Fallback to hardcoded data if database is not available
        return portfolioData;
      }

      // Convert database format to frontend format
      return portfolios.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        techStack: item.tech_stack,
        serviceType: item.service_type,
        serviceLink: item.service_link,
        category: item.category as "web" | "app" | "landing",
        thumbnail: item.thumbnail,
        detailLink: item.detail_link,
        features: item.features,
        workScope: item.work_scope,
      }));
    } catch (error) {
      console.error('Get portfolios error:', error);
      // Fallback to hardcoded data
      return portfolioData;
    }
  }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.enum(["web", "app", "landing", "all"]) }))
    .query(async ({ input }) => {
      try {
        let query = supabaseAdmin
          .from('portfolio')
          .select('*')
          .eq('is_active', true);

        if (input.category !== "all") {
          query = query.eq('category', input.category);
        }

        const { data: portfolios, error } = await query
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Database error:', error);
          // Fallback to hardcoded data
          if (input.category === "all") {
            return portfolioData;
          }
          return portfolioData.filter((item) => item.category === input.category);
        }

        // Convert database format to frontend format
        return portfolios.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          techStack: item.tech_stack,
          serviceType: item.service_type,
          serviceLink: item.service_link,
          category: item.category as "web" | "app" | "landing",
          thumbnail: item.thumbnail,
          detailLink: item.detail_link,
          features: item.features,
          workScope: item.work_scope,
        }));
      } catch (error) {
        console.error('Get portfolios by category error:', error);
        // Fallback to hardcoded data
        if (input.category === "all") {
          return portfolioData;
        }
        return portfolioData.filter((item) => item.category === input.category);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const { data: portfolio, error } = await supabaseAdmin
          .from('portfolio')
          .select('*')
          .eq('id', input.id)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Database error:', error);
          // Fallback to hardcoded data
          const item = portfolioData.find((p) => p.id === input.id);
          if (!item) {
            throw new Error("Portfolio item not found");
          }
          return item;
        }

        // Convert database format to frontend format
        return {
          id: portfolio.id,
          name: portfolio.name,
          description: portfolio.description,
          techStack: portfolio.tech_stack,
          serviceType: portfolio.service_type,
          serviceLink: portfolio.service_link,
          category: portfolio.category as "web" | "app" | "landing",
          thumbnail: portfolio.thumbnail,
          detailLink: portfolio.detail_link,
          features: portfolio.features,
          workScope: portfolio.work_scope,
        };
      } catch (error) {
        console.error('Get portfolio by ID error:', error);
        // Fallback to hardcoded data
        const item = portfolioData.find((p) => p.id === input.id);
        if (!item) {
          throw new Error("Portfolio item not found");
        }
        return item;
      }
    }),

  // Admin functions for managing portfolio items
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        techStack: z.array(z.string()),
        serviceType: z.array(z.string()),
        serviceLink: z.string().optional(),
        category: z.enum(["web", "app", "landing"]),
        thumbnail: z.string().optional(),
        detailLink: z.string().optional(),
        features: z.array(z.string()).optional(),
        workScope: z.array(z.string()).optional(),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const portfolioData = {
          name: input.name,
          description: input.description,
          tech_stack: input.techStack,
          service_type: input.serviceType,
          service_link: input.serviceLink || null,
          category: input.category,
          thumbnail: input.thumbnail || null,
          detail_link: input.detailLink || null,
          features: input.features || null,
          work_scope: input.workScope || null,
          sort_order: input.sortOrder,
          is_active: true,
        };

        const { data: portfolio, error } = await supabaseAdmin
          .from('portfolio')
          .insert(portfolioData)
          .select()
          .single();

        if (error) {
          console.error('Database error:', error);
          throw new Error('포트폴리오 항목을 생성하는 중 오류가 발생했습니다.');
        }

        return {
          success: true,
          message: "포트폴리오 항목이 성공적으로 생성되었습니다.",
          portfolio,
        };
      } catch (error) {
        console.error('Create portfolio error:', error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "포트폴리오 항목 생성 중 오류가 발생했습니다."
        );
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        techStack: z.array(z.string()).optional(),
        serviceType: z.array(z.string()).optional(),
        serviceLink: z.string().optional(),
        category: z.enum(["web", "app", "landing"]).optional(),
        thumbnail: z.string().optional(),
        detailLink: z.string().optional(),
        features: z.array(z.string()).optional(),
        workScope: z.array(z.string()).optional(),
        sortOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { id, ...updateData } = input;

        // Convert camelCase to snake_case for database
        const dbUpdateData: any = {};
        if (updateData.name !== undefined) dbUpdateData.name = updateData.name;
        if (updateData.description !== undefined) dbUpdateData.description = updateData.description;
        if (updateData.techStack !== undefined) dbUpdateData.tech_stack = updateData.techStack;
        if (updateData.serviceType !== undefined) dbUpdateData.service_type = updateData.serviceType;
        if (updateData.serviceLink !== undefined) dbUpdateData.service_link = updateData.serviceLink;
        if (updateData.category !== undefined) dbUpdateData.category = updateData.category;
        if (updateData.thumbnail !== undefined) dbUpdateData.thumbnail = updateData.thumbnail;
        if (updateData.detailLink !== undefined) dbUpdateData.detail_link = updateData.detailLink;
        if (updateData.features !== undefined) dbUpdateData.features = updateData.features;
        if (updateData.workScope !== undefined) dbUpdateData.work_scope = updateData.workScope;
        if (updateData.sortOrder !== undefined) dbUpdateData.sort_order = updateData.sortOrder;
        if (updateData.isActive !== undefined) dbUpdateData.is_active = updateData.isActive;

        const { data: portfolio, error } = await supabaseAdmin
          .from('portfolio')
          .update(dbUpdateData)
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error('Database error:', error);
          throw new Error('포트폴리오 항목을 업데이트하는 중 오류가 발생했습니다.');
        }

        return {
          success: true,
          message: "포트폴리오 항목이 성공적으로 업데이트되었습니다.",
          portfolio,
        };
      } catch (error) {
        console.error('Update portfolio error:', error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "포트폴리오 항목 업데이트 중 오류가 발생했습니다."
        );
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // Soft delete by setting is_active to false
        const { error } = await supabaseAdmin
          .from('portfolio')
          .update({ is_active: false })
          .eq('id', input.id);

        if (error) {
          console.error('Database error:', error);
          throw new Error('포트폴리오 항목을 삭제하는 중 오류가 발생했습니다.');
        }

        return {
          success: true,
          message: "포트폴리오 항목이 성공적으로 삭제되었습니다.",
        };
      } catch (error) {
        console.error('Delete portfolio error:', error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "포트폴리오 항목 삭제 중 오류가 발생했습니다."
        );
      }
    }),
});