import { DiscoverFeedSkeleton } from "@/components/discover/discover-feed-skeleton";

export default function Loading() {
  return (
    <div className="animate-pulse space-y-5">
      <section className="overflow-hidden rounded-[28px] bg-card p-5 text-card-foreground ring-1 ring-black/5">
        <div className="h-6 w-36 rounded-full bg-muted" />
        <div className="mt-5 h-10 w-64 rounded-2xl bg-muted" />
        <div className="mt-3 h-4 w-72 rounded-full bg-muted" />
        <div className="mt-2 h-4 w-60 rounded-full bg-muted" />
      </section>

      <div className="rounded-[24px] bg-card p-5 ring-1 ring-black/5">
        <div className="h-11 w-full rounded-[18px] bg-muted" />
        <div className="mt-3 h-4 w-32 rounded-full bg-muted" />
      </div>

      <DiscoverFeedSkeleton count={2} />
    </div>
  );
}
