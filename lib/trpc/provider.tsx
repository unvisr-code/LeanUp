"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink, httpBatchLink, splitLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import superjson from "superjson";
import { type AppRouter } from "@/server/api/root";

export const api = createTRPCReact<AppRouter>();

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        // Use splitLink to batch queries but not mutations
        splitLink({
          condition: (op) => op.type === 'subscription' || op.type === 'mutation',
          // Use regular httpLink for mutations and subscriptions
          true: httpLink({
            url: "/api/trpc",
          }),
          // Batch queries for better performance
          false: httpBatchLink({
            url: "/api/trpc",
          }),
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
}