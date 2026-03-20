"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useUiStore } from "@/lib/stores/ui-store";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  useEffect(() => {
    void useUiStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3200,
            style: {
              borderRadius: "20px",
              border: "1px solid rgba(56, 37, 26, 0.08)",
              background: "#fff9f1",
              color: "#40261a",
              boxShadow: "0 18px 40px rgba(56, 37, 26, 0.12)",
            },
          }}
        />
      </MotionConfig>
    </QueryClientProvider>
  );
}
