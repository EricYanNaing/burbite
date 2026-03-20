"use client";

import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/lib/stores/ui-store";

export function QuickSave() {
  const saved = useUiStore((state) => state.saved);
  const toggleSaved = useUiStore((state) => state.toggleSaved);

  return (
    <button
      type="button"
      aria-pressed={saved}
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
      <Heart className={cn("size-4", saved && "fill-current")} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
