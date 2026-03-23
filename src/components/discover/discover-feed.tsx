"use client";

import InfiniteScroll from "react-infinite-scroll-component";
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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
  const isRefreshing =
    bitesQuery.isFetching &&
    !bitesQuery.isFetchingNextPage &&
    !bitesQuery.isPending;
  const hasSearch = trimmedSearch.length > 0;
  const noResultsSuggestions = trendingSearches.slice(0, 3).join(", ");

  useEffect(() => {
    const scrollableArea = document.getElementById("app-shell-scroll");

    scrollableArea?.scrollTo({ top: 0, behavior: "smooth" });
  }, [debouncedSearch]);

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
        <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
          <CardHeader className="gap-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Flame className="size-4 text-primary" />
              Popular foods
            </CardTitle>
            <CardDescription>
              Tap a card to see which shops carry the dish.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {popularFoods.map((item) => (
              <PopularFoodCard key={item.slug} item={item} />
            ))}
          </CardContent>
        </Card>
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
        <InfiniteScroll
          key={debouncedSearch || "discover-feed"}
          dataLength={items.length}
          next={() => void bitesQuery.fetchNextPage()}
          hasMore={Boolean(bitesQuery.hasNextPage)}
          loader={
            <div className="pt-4">
              <DiscoverFeedSkeleton count={1} />
            </div>
          }
          endMessage={
            <Card className="mt-4 rounded-[24px] border-none shadow-none ring-1 ring-black/5">
              <CardHeader>
                <CardTitle>All caught up</CardTitle>
                <CardDescription>
                  {hasSearch
                    ? "Every match for this search is already in view."
                    : "You have reached the end of the BurBite list."}
                </CardDescription>
              </CardHeader>
            </Card>
          }
          scrollThreshold="160px"
          scrollableTarget="app-shell-scroll"
          style={{ overflow: "visible" }}
        >
          <div className="space-y-4">
            {items.map((item) => (
              <DiscoverFeedCard key={item.slug} item={item} />
            ))}
          </div>
        </InfiniteScroll>
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
  const neighborhoods = shopOffers
    .map((offer) => offer.neighborhood)
    .filter(Boolean)
    .slice(0, 2)
    .join(" · ");

  return (
    <Card className="overflow-hidden rounded-[26px] border-none shadow-none ring-1 ring-black/5">
      <div className="aspect-[4/1] w-full" style={{ backgroundImage: item.heroGradient }} />
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>{item.name}</CardTitle>
            <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Store className="size-4" />
              {item.shopName}
            </div>
            <CardDescription>{item.description}</CardDescription>
          </div>
          <Badge className="rounded-full bg-secondary text-secondary-foreground">
            {item.price}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {searchAliases.slice(0, 2).map((alias) => (
            <Badge key={alias} variant="outline" className="rounded-full">
              {alias}
            </Badge>
          ))}
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-5">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Store className="size-4" />
            {shopOffers.length} shops
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" />
            {neighborhoods || item.neighborhood}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-4" />
            from {item.eta}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="size-4 fill-current" />
            {item.rating.toFixed(1)}
          </span>
        </div>

        <Link
          href={`/bites/${item.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          See all {shopOffers.length} shops
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
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
  const searchAliases = Array.isArray(item.searchAliases)
    ? item.searchAliases
    : [];
  const shopOffers = Array.isArray(item.shopOffers) ? item.shopOffers : [];

  return (
    <Link
      href={`/bites/${item.slug}`}
      className="flex w-full items-center gap-3 rounded-[22px] bg-card p-3 text-left ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
    >
      <div className="relative size-16 overflow-hidden rounded-[18px] ring-1 ring-black/5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15,12,10,0.12), rgba(15,12,10,0.55)), url('${item.heroImage}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold">{item.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {shopOffers.length} shops carrying it
            </p>
          </div>
          <Badge className="rounded-full bg-secondary text-secondary-foreground">
            {item.rating.toFixed(1)}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {searchAliases.slice(0, 2).map((alias) => (
            <Badge key={alias} variant="outline" className="rounded-full">
              {alias}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
