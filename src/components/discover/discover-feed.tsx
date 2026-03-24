"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Clock3,
  Flame,
  LoaderCircle,
  MapPin,
  Search,
  Star,
  Store,
  X,
} from "lucide-react";
import { fetchBites } from "@/lib/api/client";
import type { BiteCategorySearch, BiteVenue } from "@/lib/data/bites";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { useUiStore } from "@/lib/stores/ui-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DiscoverFeedSkeleton } from "@/components/discover/discover-feed-skeleton";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const PAGE_SIZE = 3;

const PLACEHOLDER_SUGGESTIONS = [
  "Mohinga",
  "ohn no khaut swe",
  "laphet thoke",
  "fish noodle soup",
  "nan gyi thoke",
  "coconut chicken noodle",
  "mont di",
  "shan khaut swe",
  "Burmese Tea House",
  "tea leaf salad",
];

function useAnimatedPlaceholder(suggestions: string[], active: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (!active) {
      return;
    }
    const current = suggestions[suggestionIndex % suggestions.length];

    const tick = () => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          timeoutRef.current = setTimeout(tick, 60);
        } else {
          timeoutRef.current = setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          timeoutRef.current = setTimeout(tick, 30);
        } else {
          setDeleting(false);
          setSuggestionIndex((i) => (i + 1) % suggestions.length);
          timeoutRef.current = setTimeout(tick, 300);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 80);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, charIndex, deleting, suggestionIndex, suggestions]);

  return active && displayed
    ? `Try "${displayed}"`
    : "Search shop, food, or tag…";
}

type DiscoverFeedProps = {
  popularFoods: BiteVenue[];
  trendingSearches: string[];
  categorySearches: BiteCategorySearch[];
};

export function DiscoverFeed({
  popularFoods,
  trendingSearches,
  categorySearches,
}: DiscoverFeedProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const animatedPlaceholder = useAnimatedPlaceholder(
    PLACEHOLDER_SUGGESTIONS,
    true,
  );
  const search = useUiStore((state) => state.discoverSearch);
  const setDiscoverSearch = useUiStore((state) => state.setDiscoverSearch);
  const clearDiscoverSearch = useUiStore((state) => state.clearDiscoverSearch);
  const saveRecentDiscoverSearch = useUiStore(
    (state) => state.saveRecentDiscoverSearch,
  );
  const trimmedSearch = search.trim();
  const debouncedSearch = useDebouncedValue(trimmedSearch, 360);
  const isDebouncing = trimmedSearch !== debouncedSearch;
  const bitesQuery = useInfiniteQuery({
    queryKey: ["bites", debouncedSearch],
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      fetchBites({
        query: debouncedSearch,
        page: pageParam,
        limit: PAGE_SIZE,
        signal,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  const items = bitesQuery.data?.pages.flatMap((page) => page.items) ?? [];
  const total = bitesQuery.data?.pages[0]?.total ?? 0;
  const isInitialLoad = bitesQuery.isPending;
  const fetchNextPage = bitesQuery.fetchNextPage;
  const hasNextPage = bitesQuery.hasNextPage;
  const isQueryPending = bitesQuery.isPending;
  const isFetchSuccessful = bitesQuery.isSuccess;
  const isFetchingNextPage = bitesQuery.isFetchingNextPage;
  const isRefreshing =
    bitesQuery.isFetching &&
    !isFetchingNextPage &&
    !bitesQuery.isPending;
  const hasSearch = trimmedSearch.length > 0;
  const hasMoreResults = Boolean(hasNextPage);
  const noResultsSuggestions = trendingSearches.slice(0, 3).join(", ");

  useEffect(() => {
    const scrollableArea = document.getElementById("app-shell-scroll");

    scrollableArea?.scrollTo({ top: 0, behavior: "smooth" });
  }, [debouncedSearch]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    const scrollableArea = document.getElementById("app-shell-scroll");

    if (
      !sentinel ||
      !scrollableArea ||
      !isFetchSuccessful ||
      !hasMoreResults
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry?.isIntersecting &&
          !isFetchingNextPage &&
          !isQueryPending &&
          hasNextPage
        ) {
          void fetchNextPage();
        }
      },
      {
        root: scrollableArea,
        rootMargin: "220px 0px",
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [
    debouncedSearch,
    hasMoreResults,
    isFetchSuccessful,
    isFetchingNextPage,
    items.length,
    fetchNextPage,
    hasNextPage,
    isQueryPending,
  ]);

  const applySearch = (value: string) => {
    const nextValue = value.trim();

    if (!nextValue) {
      return;
    }

    setDiscoverSearch(nextValue);
    saveRecentDiscoverSearch(nextValue);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedSearch) {
      return;
    }

    saveRecentDiscoverSearch(trimmedSearch);
  };

  const handleSearchBlur = () => {
    if (trimmedSearch.length >= 3 || trimmedSearch.includes(" ")) {
      saveRecentDiscoverSearch(trimmedSearch);
    }
  };

  return (
    <section className="space-y-4">
      <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
        <CardHeader className="gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-3 rounded-[18px] border border-border bg-secondary px-3 py-2"
          >
            <Search className="size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setDiscoverSearch(event.target.value)}
              onBlur={handleSearchBlur}
              placeholder={animatedPlaceholder}
              className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
            {hasSearch ? (
              <button
                type="button"
                onClick={clearDiscoverSearch}
                className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </form>

          <div className="flex items-center justify-between gap-3">
            <CardDescription>
              {isDebouncing
                ? "Waiting for you to pause typing before searching."
                : isInitialLoad
                  ? "Loading the discover feed."
                  : bitesQuery.isSuccess
                    ? hasSearch
                      ? `${items.length} of ${total} matches loaded`
                      : `${items.length} of ${total} dishes loaded`
                    : "Search across shop names, food names, slugs, and tags."}
            </CardDescription>

            {isDebouncing || isRefreshing ? (
              <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
            ) : null}
          </div>

          {categorySearches.length > 0 ? (
            <div className="space-y-2">
              <CardDescription>Browse by category</CardDescription>
              <SearchSuggestionChips
                items={categorySearches}
                onPick={applySearch}
              />
            </div>
          ) : null}
        </CardHeader>
      </Card>

      {/* {!hasSearch ? (
        <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
          <CardHeader className="gap-5">
            {hasRecentSearches ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <History className="size-4 text-primary" />
                      Recent searches
                    </CardTitle>
                    <CardDescription>
                      Stored in your browser cookie for phase 1.
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    onClick={clearRecentDiscoverSearches}
                  >
                    Clear
                  </Button>
                </div>
                <SearchSuggestionChips
                  items={recentDiscoverSearches}
                  onPick={applySearch}
                />
              </div>
            ) : null}

            <div className="space-y-3">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Search className="size-4 text-primary" />
                  Trending searches
                </CardTitle>
                <CardDescription>
                  Quick entry points built from the strongest food and shop
                  matches in the catalog.
                </CardDescription>
              </div>
              <SearchSuggestionChips items={trendingSearches} onPick={applySearch} />
            </div>
          </CardHeader>
        </Card>
      ) : null} */}

      {!hasSearch ? (
        <div className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h5 className="flex items-center gap-2 text-lg font-semibold">
                <Flame className="size-4 text-primary" />
                Popular Dishes
              </h5>
              <p className="pt-1 text-sm text-muted-foreground">
                Featured cards for browsing first. The faster comparison list
                starts right below.
              </p>
            </div>
            <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground ring-1 ring-black/5">
              {popularFoods.length} picks
            </div>
          </div>
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-3">
              {popularFoods.map((item) => (
                <CarouselItem key={item.id} className="basis-[88%] pl-3">
                  <PopularFoodCard key={item.slug} item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : null}

      {bitesQuery.isError ? (
        <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
          <CardHeader>
            <CardTitle>Query failed</CardTitle>
            <CardDescription>
              {bitesQuery.error instanceof Error
                ? bitesQuery.error.message
                : "Could not load the feed."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {isInitialLoad ? <DiscoverFeedSkeleton count={2} /> : null}

      {!isInitialLoad && bitesQuery.isSuccess && items.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h5 className="text-lg font-semibold">
                {hasSearch ? "Search Results" : "Choose Your Shop"}
              </h5>
              <p className="pt-1 text-sm text-muted-foreground">
                Compact marketplace cards to compare shop, ETA, price, and dish
                fit quickly.
              </p>
            </div>
            <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground ring-1 ring-black/5">
              {items.length} / {total}
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <DiscoverFeedCard key={item.slug} item={item} />
            ))}
          </div>

          {isFetchingNextPage ? (
            <div className="pt-1">
              <DiscoverFeedSkeleton count={1} />
            </div>
          ) : null}

          {hasMoreResults ? (
            <div ref={loadMoreRef} aria-hidden="true" className="h-1 w-full" />
          ) : (
            <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
              <CardHeader>
                <CardTitle>All caught up</CardTitle>
                <CardDescription>
                  {hasSearch
                    ? "Every match for this search is already in view."
                    : "You have reached the end of the BurBite list."}
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </section>
      ) : null}

      {!isInitialLoad && bitesQuery.isSuccess && items.length === 0 ? (
        <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
          <CardHeader>
            <CardTitle>No matches</CardTitle>
            <CardDescription>
              {noResultsSuggestions
                ? `Try searching for ${noResultsSuggestions}.`
                : "Try a shop name, food name, slug, or tag."}
            </CardDescription>
            <Button
              type="button"
              variant="secondary"
              className="mt-2 w-fit rounded-full"
              onClick={clearDiscoverSearch}
            >
              Reset search
            </Button>
          </CardHeader>
        </Card>
      ) : null}
    </section>
  );
}

function DiscoverFeedCard({ item }: { item: BiteVenue }) {
  const searchAliases = Array.isArray(item.searchAliases)
    ? item.searchAliases
    : [];
  const tags = Array.isArray(item.tags) ? item.tags : [];
  const shopOffers = Array.isArray(item.shopOffers) ? item.shopOffers : [];
  const highlightTags = Array.from(new Set([...tags, ...searchAliases])).slice(
    0,
    3,
  );
  const neighborhoods = shopOffers
    .map((offer) => offer.neighborhood)
    .filter(Boolean)
    .slice(0, 2)
    .join(" · ");
  const shopCountLabel = `${shopOffers.length} ${shopOffers.length === 1 ? "shop" : "shops"}`;

  return (
    <Link
      href={`/bites/${item.slug}`}
      className="group block overflow-hidden rounded-[28px] bg-card p-3 shadow-[0_12px_28px_rgba(58,42,31,0.07)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(58,42,31,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
    >
      <div className="flex gap-3">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[22px]">
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(15, 12, 10, 0.72), rgba(15, 12, 10, 0.12) 56%), url('${item.heroImage}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3 text-white">
            <Badge className="h-auto rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-white backdrop-blur-sm">
              {item.price}
            </Badge>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3 text-white">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
              <Clock3 className="size-3.5" />
              {item.eta}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.08em] uppercase text-muted-foreground">
                <Store className="size-3.5 text-primary" />
                {item.shopName}
              </div>
              <h3 className="text-lg font-semibold leading-tight text-foreground">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>

            <div className="rounded-[18px] bg-secondary/80 px-3 py-2 text-right ring-1 ring-black/5">
              <div className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                <Star className="size-3.5 fill-current text-primary" />
                {item.rating.toFixed(1)}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Top rated
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-2.5 py-1 ring-1 ring-black/5">
              <Store className="size-3.5 text-primary" />
              {shopCountLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-2.5 py-1 ring-1 ring-black/5">
              <MapPin className="size-3.5 text-primary" />
              {neighborhoods || item.neighborhood}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/5 pt-3">
        <div className="flex min-w-0 flex-wrap gap-2">
          {highlightTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="h-auto rounded-full border-black/10 bg-background/80 px-3 py-1 text-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
          View shops
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function SearchSuggestionChips({
  items,
  onPick,
}: {
  items: Array<string | BiteCategorySearch>;
  onPick: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const key = typeof item === "string" ? item : item.id;
        const label = typeof item === "string" ? item : item.label;
        const query = typeof item === "string" ? item : item.query;

        return (
          <Button
            key={key}
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground"
            onClick={() => onPick(query)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}

function PopularFoodCard({ item }: { item: BiteVenue }) {
  const tags = Array.isArray(item.tags) ? item.tags : [];
  const shopOffers = Array.isArray(item.shopOffers) ? item.shopOffers : [];

  return (
    <Link
      href={`/bites/${item.slug}`}
      className="group block overflow-hidden rounded-[28px] bg-card text-left shadow-[0_14px_34px_rgba(58,42,31,0.08)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(58,42,31,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
    >
      <div className="relative overflow-hidden">
        <div
          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(15, 12, 10, 0.88), rgba(15, 12, 10, 0.18) 58%), url('${item.heroImage}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 text-white">
          <Badge className="h-auto rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.12em] uppercase text-white backdrop-blur-sm">
            Popular pick
          </Badge>
          <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            <Star className="size-3.5 fill-current" />
            {item.rating.toFixed(1)}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 space-y-2 p-4 text-white">
          <Badge className="h-auto rounded-full border border-white/15 bg-primary px-3 py-1 text-white shadow-[0_8px_24px_rgba(227,24,55,0.28)]">
            {item.category}
          </Badge>
          <div className="space-y-1">
            <h3 className="max-w-[13ch] text-[1.7rem] font-semibold leading-[1.05]">
              {item.name}
            </h3>
            <p className="max-w-[28ch] text-sm leading-6 text-white/80">
              {item.vibe}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[20px] bg-secondary/80 p-3 ring-1 ring-black/5">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Store className="size-3.5" />
              Shops
            </div>
            <p className="mt-2 text-base font-semibold text-foreground">
              {shopOffers.length} nearby
            </p>
          </div>
          <div className="rounded-[20px] bg-secondary/80 p-3 ring-1 ring-black/5">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Clock3 className="size-3.5" />
              ETA
            </div>
            <p className="mt-2 text-base font-semibold text-foreground">
              From {item.eta}
            </p>
          </div>
        </div>

        <div className="rounded-[22px] bg-[#ebe8e1] p-3 ring-1 ring-black/5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-[0.08em] uppercase text-muted-foreground">
                Best matched shop
              </p>
              <p className="text-sm font-semibold text-foreground">
                {item.shopName}
              </p>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {item.neighborhood}
              </div>
            </div>
            <Badge
              variant="outline"
              className="h-auto rounded-full border-black/10 bg-background/80 px-3 py-1 font-semibold text-foreground"
            >
              {item.price}
            </Badge>
          </div>
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="h-auto rounded-full border-black/10 bg-background/80 px-3 py-1 text-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between border-t border-black/5 pt-1">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Compare shops carrying this dish
            </p>
            <p className="text-xs text-muted-foreground">
              Check pickup windows and the best fit nearby.
            </p>
          </div>
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
