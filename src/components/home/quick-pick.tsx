"use client";

import type { BiteVenue } from "@/lib/data/bites";
import { Clock3 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type QuickPickProps = {
  items: BiteVenue[];
};

const ease = [0.22, 1, 0.36, 1] as const;

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.46,
      ease,
    },
  },
};

export function QuickPick({ items }: QuickPickProps) {
  const quickPicks = items;
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold">Quick Pick</h2>
        <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-black">
          {quickPicks.length} picks
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
        variants={reduceMotion ? undefined : listVariants}
        className="space-y-3"
      >
        {quickPicks.map((item) => (
          <motion.div
            key={item.slug}
            variants={reduceMotion ? undefined : itemVariants}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -4,
                    scale: 1.01,
                    boxShadow: "0 18px 38px rgba(58,42,31,0.12)",
                  }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.995 }}
            transition={{ duration: 0.28, ease }}
            className="group flex cursor-pointer items-center justify-between gap-3 rounded-[22px] bg-card/95 p-3 ring-1 ring-black/5 shadow-[0_10px_24px_rgba(58,42,31,0.08)]"
          >
            <motion.img
              src={item.heroImage}
              alt={item.name}
              whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -1.5 }}
              transition={{ duration: 0.35, ease }}
              className="h-12 w-12 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h3 className="text-md font-semibold">{item.name}</h3>
              <p className="text-xs text-muted-foreground">
                {item.vibe.slice(0, 30) + "..."}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 text-xs">
              <span className="flex items-center gap-1 text-md font-semibold">
                <Clock3 size={10} /> {item.eta}
              </span>
              <div className="w-fit rounded-[34px] bg-green-200 px-2 py-1 font-semibold text-green-600">
                Available
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
