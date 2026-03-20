"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/lib/stores/ui-store";

export function QuickSave() {
  const saved = useUiStore((state) => state.saved);
  const toggleSaved = useUiStore((state) => state.toggleSaved);

  return (
    <motion.button
      type="button"
      aria-pressed={saved}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        const nextSaved = !saved;

        toggleSaved();
        toast.success(
          nextSaved
            ? "Added to your quick saves."
            : "Removed from your quick saves.",
        );
      }}
      className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/16"
    >
      <motion.span
        animate={saved ? { scale: [1, 1.18, 1], rotate: [0, -10, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart className={cn("size-4", saved && "fill-current")} />
      </motion.span>
      {saved ? "Saved" : "Save"}
    </motion.button>
  );
}
