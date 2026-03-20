"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { useDeferredValue, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  LoaderCircle,
  MapPin,
  Search,
  Star,
  X,
} from "lucide-react";
import { fetchBites } from "@/lib/api/client";
import type { BiteVenue } from "@/lib/data/bites";
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

export function DiscoverFeed() {
  const search = useUiStore((state) => state.discoverSearch);
  const setDiscoverSearch = useUiStore((state) => state.setDiscoverSearch);
  const clearDiscoverSearch = useUiStore((state) => state.clearDiscoverSearch);
  const deferredSearch = useDeferredValue(search);
  const bitesQuery = useInfiniteQuery({
    queryKey: ["bites", deferredSearch],
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      fetchBites({
        query: deferredSearch,
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
  const hasSearch = search.trim().length > 0;

  useEffect(() => {
    const scrollableArea = document.getElementById("app-shell-scroll");

    scrollableArea?.scrollTo({ top: 0, behavior: "smooth" });
  }, [deferredSearch]);

  return (
    <section className="space-y-4">
      <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
        <CardHeader className="gap-3">
          <div className="flex items-center gap-3 rounded-[18px] border border-border bg-secondary px-3 py-2">
            <Search className="size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setDiscoverSearch(event.target.value)}
              placeholder="Search by vibe, tag, or neighborhood"
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
          </div>

          <div className="flex items-center justify-between gap-3">
            <CardDescription>
              Query status:{" "}
              {isInitialLoad
                ? "loading"
                : bitesQuery.isSuccess
                  ? `${items.length} of ${total} loaded`
                  : "idle"}
            </CardDescription>

            {isRefreshing ? (
              <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
            ) : null}
          </div>
        </CardHeader>
      </Card>

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
          key={deferredSearch}
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
              Try searching for `grill`, `late-night`, or `river`.
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
  return (
    <Card className="overflow-hidden rounded-[26px] border-none shadow-none ring-1 ring-black/5">
      <div className="aspect-[4/1] w-full" style={{ backgroundImage: item.heroGradient }} />
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </div>
          <Badge className="rounded-full bg-secondary text-secondary-foreground">
            {item.price}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-5">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" />
            {item.neighborhood}
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
          Open detail route
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
