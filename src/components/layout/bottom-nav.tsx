"use client";

import Link from "next/link";
import { Compass, Home, ReceiptText } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/reserve", label: "Reserve", icon: ReceiptText },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-30 w-[calc(100vw-2rem)] max-w-[406px] -translate-x-1/2 rounded-[28px] border border-border/80 bg-background/94 px-3 py-3 shadow-[0_24px_60px_rgba(56,37,26,0.18)] backdrop-blur">
      <div className="grid grid-cols-3 gap-2 rounded-[24px] bg-secondary/80 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href === "/discover" && pathname.startsWith("/bites/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-[18px] px-2 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "bg-background text-foreground shadow-[0_8px_24px_rgba(58,42,31,0.08)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
