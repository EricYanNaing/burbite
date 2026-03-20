export function DiscoverFeedSkeleton({
  count = 2,
}: {
  count?: number;
}) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[26px] bg-card ring-1 ring-black/5"
        >
          <div className="aspect-[4/1] w-full animate-pulse bg-muted" />
          <div className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="h-6 w-36 animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-56 animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-40 animate-pulse rounded-full bg-muted" />
              </div>
              <div className="h-7 w-12 animate-pulse rounded-full bg-muted" />
            </div>

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((__, tagIndex) => (
                <div
                  key={tagIndex}
                  className="h-6 w-20 animate-pulse rounded-full bg-muted"
                />
              ))}
            </div>

            <div className="flex gap-3">
              <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-16 animate-pulse rounded-full bg-muted" />
            </div>

            <div className="h-4 w-28 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
