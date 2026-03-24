export function DiscoverFeedSkeleton({
  count = 2,
}: {
  count?: number;
}) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[28px] bg-card p-3 ring-1 ring-black/5"
        >
          <div className="flex gap-3">
            <div className="h-28 w-28 shrink-0 animate-pulse rounded-[22px] bg-muted" />

            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-2">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
                  <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
                  <div className="h-4 w-28 animate-pulse rounded-full bg-muted" />
                </div>
                <div className="h-12 w-16 animate-pulse rounded-[18px] bg-muted" />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-28 animate-pulse rounded-full bg-muted" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-4/5 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/5 pt-3">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((__, tagIndex) => (
                <div
                  key={tagIndex}
                  className="h-6 w-20 animate-pulse rounded-full bg-muted"
                />
              ))}
            </div>
            <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
