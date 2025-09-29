import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { supabaseAdmin } from "@/lib/supabase";

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
      try {
        // Convert input to database format
        const leadData = {
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          company: input.company || null,
          budget: input.budget || null,
          timeline: input.timeline || null,
          requirements: input.requirements || null,
          reference_url: input.referenceUrl || null,
          industry: input.industry || null,
          include_data_module: input.includeDataModule,
          include_maintenance_module: input.includeMaintenanceModule,
          status: 'pending' as const,
        };

        // Save to Supabase
        const { data: lead, error } = await supabaseAdmin
          .from('leads')
          .insert(leadData)
          .select()
          .single();

        if (error) {
          console.error('Database error:', error);
          throw new Error('데이터베이스에 저장하는 중 오류가 발생했습니다.');
        }

        console.log('New lead created:', lead.id);

        // TODO: 이메일 알림 서비스 연동
        // await sendEmail({
        //   to: 'admin@leanup.kr',
        //   subject: `새로운 문의: ${input.name}`,
        //   data: lead,
        // });

        // TODO: CRM API 연동
        // await crm.createLead(lead);

        return {
          success: true,
          message: "문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다.",
          leadId: lead.id,
        };
      } catch (error) {
        console.error('Lead creation error:', error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "문의 접수 중 오류가 발생했습니다. 다시 시도해주세요."
        );
      }
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

  // Get all leads (admin function)
  getAll: publicProcedure
    .query(async () => {
      try {
        const { data: leads, error } = await supabaseAdmin
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Database error:', error);
          throw new Error('리드 목록을 가져오는 중 오류가 발생했습니다.');
        }

        return leads;
      } catch (error) {
        console.error('Get leads error:', error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "리드 목록을 가져오는 중 오류가 발생했습니다."
        );
      }
    }),

  // Get lead by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const { data: lead, error } = await supabaseAdmin
          .from('leads')
          .select('*')
          .eq('id', input.id)
          .single();

        if (error) {
          console.error('Database error:', error);
          throw new Error('리드를 찾을 수 없습니다.');
        }

        return lead;
      } catch (error) {
        console.error('Get lead error:', error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "리드를 가져오는 중 오류가 발생했습니다."
        );
      }
    }),

  // Update lead status
  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['pending', 'contacted', 'quoted', 'closed', 'rejected']),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { data: lead, error } = await supabaseAdmin
          .from('leads')
          .update({ status: input.status })
          .eq('id', input.id)
          .select()
          .single();

        if (error) {
          console.error('Database error:', error);
          throw new Error('리드 상태 업데이트 중 오류가 발생했습니다.');
        }

        return {
          success: true,
          message: "리드 상태가 성공적으로 업데이트되었습니다.",
          lead,
        };
      } catch (error) {
        console.error('Update lead status error:', error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "리드 상태 업데이트 중 오류가 발생했습니다."
        );
      }
    }),
});