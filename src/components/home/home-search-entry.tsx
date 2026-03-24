"use client";

import { startTransition, useState, type FormEvent } from "react";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/lib/stores/ui-store";

type HomeSearchEntryProps = {
  quickSearches: string[];
};

export function HomeSearchEntry({ quickSearches }: HomeSearchEntryProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const setDiscoverSearch = useUiStore((state) => state.setDiscoverSearch);
  const clearDiscoverSearch = useUiStore((state) => state.clearDiscoverSearch);
  const saveRecentDiscoverSearch = useUiStore(
    (state) => state.saveRecentDiscoverSearch,
  );

  const openSearch = (nextValue?: string) => {
    const normalizedValue = nextValue?.trim() ?? "";

    if (normalizedValue) {
      setDiscoverSearch(normalizedValue);
      saveRecentDiscoverSearch(normalizedValue);
    } else {
      clearDiscoverSearch();
    }

    startTransition(() => {
      router.push("/search");
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openSearch(value);
  };

  return (
    <section className="rounded-[28px] bg-[#f8f5ee] p-4 shadow-[0_20px_48px_rgba(58,42,31,0.08)] ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground">
            Search Once, Compare Fast
          </p>
          <h2 className="max-w-[15ch] text-2xl font-semibold leading-tight text-foreground">
            Find the right dish or kitchen in seconds.
          </h2>
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-foreground ring-1 ring-black/5">
          Delivery
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <div className="flex flex-1 items-center gap-3 rounded-[20px] bg-white px-4 py-3 ring-1 ring-black/5">
          <Search className="size-4 text-muted-foreground" />
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Mohinga, tea leaf salad, or a nearby shop"
            className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <Button
          type="submit"
          size="icon-lg"
          className="size-[52px] rounded-[20px]"
        >
          <ArrowRight className="size-4" />
        </Button>
      </form>

      {quickSearches.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {quickSearches.map((query) => (
            <button
              key={query}
              type="button"
              onClick={() => openSearch(query)}
              className="rounded-full border border-black/8 bg-white px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/20 hover:bg-primary hover:text-primary-foreground"
            >
              {query}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
