"use client";

import Link from "next/link";
import { Compass, Heart, Home, Search, Store } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/store", label: "Store", icon: Store },
  { href: "/map", label: "Map", icon: Compass },
  { href: "/favorites", label: "Favorites", icon: Heart },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16 }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-30 w-[calc(100vw-2rem)] max-w-[406px] -translate-x-1/2 rounded-[28px] border border-border/80 bg-background/94 px-3 py-3 shadow-[0_24px_60px_rgba(56,37,26,0.18)] backdrop-blur"
    >
      <LayoutGroup id="bottom-nav">
        <div className="grid grid-cols-5 gap-2 rounded-[24px] bg-secondary/80 p-2">
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
                  "relative rounded-[18px]",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-0 rounded-[18px] bg-background shadow-[0_8px_24px_rgba(58,42,31,0.08)]"
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 28,
                    }}
                  />
                ) : null}

                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  animate={
                    isActive
                      ? { scale: 1.05, y: -1 }
                      : { scale: 1, y: 0 }
                  }
                  className="relative z-10 flex flex-col items-center gap-1 px-2 py-2 text-xs font-medium"
                >
                  <Icon className="size-4" />
                  {item.label}
                </motion.span>
              </Link>
            );
          })}
        </div>
      </LayoutGroup>
    </motion.nav>
  );
}
