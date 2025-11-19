import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createLead, getAllLeads, getLeadById, updateLeadStatus } from "@/lib/googlesheets";
import { sendLeadEmails } from "@/lib/email/send-lead-emails";
import { sendSlackNotification } from "@/lib/slack/send-slack-notification";

export const leadRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "이름을 입력해주세요"),
        email: z.string().email("올바른 이메일을 입력해주세요"),
        phone: z.string().optional().transform(val => val === "" ? undefined : val),
        company: z.string().optional().transform(val => val === "" ? undefined : val),
        budget: z.enum(["under-500", "500-1000", "1000-3000", "3000-5000", "over-5000"]).optional()
          .or(z.literal(""))
          .transform(val => val === "" ? undefined : val),
        timeline: z.enum(["asap", "1month", "2month", "3month", "over-3month"]).optional()
          .or(z.literal(""))
          .transform(val => val === "" ? undefined : val),
        requirements: z.string().optional().transform(val => val === "" ? undefined : val),
        referenceUrl: z
          .string()
          .optional()
          .transform(val => {
            if (!val || val === "") return undefined;
            // Add https:// if no protocol is specified
            if (!/^https?:\/\//i.test(val)) {
              return `https://${val}`;
            }
            return val;
          }),
        industry: z.string().optional().transform(val => val === "" ? undefined : val),
        includeDataModule: z.boolean().default(false),
        includeMaintenanceModule: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Validate environment variables
        if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
          console.error('Missing Google Sheets configuration');
          throw new Error('서버 설정 오류가 발생했습니다. 관리자에게 문의해주세요.');
        }

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

        // Save to Google Sheets
        console.log('[Lead Creation] Saving to Google Sheets...');
        const lead = await createLead(leadData);

        if (!lead) {
          console.error('[Lead Creation] Google Sheets error: No lead returned');
          throw new Error('Google Sheets에 저장하는 중 오류가 발생했습니다. 다시 시도해주세요.');
        }

        console.log('[Lead Creation] Google Sheets save successful, Lead ID:', lead.id);

        // Send notifications (emails + Slack)
        // Run in parallel for better performance
        console.log('[Lead Creation] Sending notifications...');
        const [emailResults, slackResult] = await Promise.all([
          sendLeadEmails(lead),
          sendSlackNotification(lead),
        ]);

        // Log email results
        if (emailResults.customerEmail.success) {
          console.log('[Lead Creation] Customer email sent:', emailResults.customerEmail.messageId);
        } else {
          console.warn('[Lead Creation] Customer email failed:', emailResults.customerEmail.error);
        }

        if (emailResults.adminEmail.success) {
          console.log('[Lead Creation] Admin email sent:', emailResults.adminEmail.messageId);
        } else {
          console.warn('[Lead Creation] Admin email failed:', emailResults.adminEmail.error);
        }

        // Log Slack notification result
        if (slackResult.success) {
          console.log('[Lead Creation] Slack notification sent successfully');
        } else if (slackResult.error) {
          console.warn('[Lead Creation] Slack notification failed:', slackResult.error);
        }

        // TODO: CRM API 연동
        // await crm.createLead(lead);

        console.log('[Lead Creation] Process completed successfully');

        return {
          success: true,
          message: "문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다.",
          leadId: lead.id,
          emailSent: {
            customer: emailResults.customerEmail.success,
            admin: emailResults.adminEmail.success,
          },
          slackSent: slackResult.success,
        };
      } catch (error) {
        console.error('[Lead Creation] Error:', error);

        // Log detailed error in development mode
        if (process.env.NODE_ENV === 'development') {
          console.error('[Lead Creation] Detailed error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            input: input,
          });
        }

        throw new Error(
          error instanceof Error
            ? error.message
            : "문의 접수 중 오류가 발생했습니다. 다시 시도해주세요."
        );
      }
    }),

  // Get all leads (admin function)
  getAll: publicProcedure
    .query(async () => {
      try {
        const leads = await getAllLeads();

        // Sort by created_at descending (most recent first)
        const sortedLeads = leads.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        return sortedLeads;
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
        const lead = await getLeadById(input.id);

        if (!lead) {
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
        const lead = await updateLeadStatus(input.id, input.status);

        if (!lead) {
          console.error('Google Sheets error: Lead not found');
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