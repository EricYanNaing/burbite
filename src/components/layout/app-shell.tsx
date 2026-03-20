import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { ShellReveal } from "@/components/animation/reveal";
import { BottomNav } from "@/components/layout/bottom-nav";


type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="min-h-screen px-3 py-4 sm:px-6 sm:py-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(250, 178, 131, 0.35), transparent 30%), linear-gradient(180deg, #f8ecdf 0%, #f4eee7 52%, #e8f0ea 100%)",
      }}
    >
      <div className="mx-auto max-w-[430px]">
        <ShellReveal>
          <div className="flex min-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-[34px] border border-black/7 bg-background shadow-[0_36px_80px_rgba(56,37,26,0.15)]">
            <header className="border-b border-border/80 bg-background/92 backdrop-blur">
              <div className="flex items-center justify-between px-4 py-4">
                <Link href="/" className="flex items-center gap-3">
                  <Image src="/logo.png" alt="Logo" width={60} height={60} />
                  <div className="space-y-0.5">
                    <p className="text-lg font-semibold">BurBite</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      Bangkok picks, mobile shell
                    </div>
                  </div>
                </Link>
              </div>
            </header>

            <main
              id="app-shell-scroll"
              className="flex-1 overflow-y-auto px-4 pb-[calc(8.5rem+env(safe-area-inset-bottom))] pt-4"
            >
              {children}
            </main>
          </div>
        </ShellReveal>
        <BottomNav />
      </div>
    </div>
  );
}
