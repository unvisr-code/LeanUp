import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const leadRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "이름을 입력해주세요"),
        email: z.string().email("올바른 이메일을 입력해주세요"),
        phone: z.string().optional(),
        company: z.string().optional(),
        budget: z.enum(["under-500", "500-1000", "1000-3000", "3000-5000", "over-5000"]).optional(),
        timeline: z.enum(["asap", "1month", "2month", "3month", "over-3month"]).optional(),
        requirements: z.string().optional(),
        referenceUrl: z.string().url().optional().or(z.literal("")),
        industry: z.string().optional(),
        includeDataModule: z.boolean().default(false),
        includeMaintenanceModule: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: 실제 데이터베이스에 저장
      // Lead created successfully

      // 여기서 이메일 알림, CRM 연동 등을 처리

      return {
        success: true,
        message: "문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다.",
      };
    }),

  calculateScore: publicProcedure
    .input(
      z.object({
        budget: z.string().optional(),
        timeline: z.string().optional(),
        includeDataModule: z.boolean(),
        includeMaintenanceModule: z.boolean(),
      })
    )
    .query(({ input }) => {
      let score = 50; // 기본 점수

      // 예산에 따른 점수
      if (input.budget === "over-5000") score += 20;
      else if (input.budget === "3000-5000") score += 15;
      else if (input.budget === "1000-3000") score += 10;

      // 타임라인에 따른 점수
      if (input.timeline === "asap") score += 10;
      else if (input.timeline === "1month") score += 8;

      // 추가 모듈 선택 점수
      if (input.includeDataModule) score += 10;
      if (input.includeMaintenanceModule) score += 10;

      return {
        score,
        priority: score >= 80 ? "high" : score >= 60 ? "medium" : "low",
      };
    }),
});