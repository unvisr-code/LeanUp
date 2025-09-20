import { createTRPCRouter } from "@/server/api/trpc";
import { leadRouter } from "@/server/api/routers/lead";
import { portfolioRouter } from "@/server/api/routers/portfolio";

export const appRouter = createTRPCRouter({
  lead: leadRouter,
  portfolio: portfolioRouter,
});

export type AppRouter = typeof appRouter;