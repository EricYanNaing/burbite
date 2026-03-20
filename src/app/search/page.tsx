import { DiscoverFeed } from "@/components/discover/discover-feed";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DiscoverPage() {
  return (
    <div className="space-y-5">
      <section
        className="overflow-hidden rounded-[28px] p-5 text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at top right, rgba(191, 237, 182, 0.45), transparent 34%), linear-gradient(135deg, #123425 0%, #194f36 55%, #3f8e55 100%)",
        }}
      >
        <Badge className="border-white/20 bg-white/12 text-white">
          Infinite query feed
        </Badge>
        <h1 className="mt-5 text-3xl font-semibold leading-tight">
          Discover now uses a paged feed with cookie-backed search state.
        </h1>
        <p className="mt-3 max-w-[30ch] text-sm/6 text-white/78">
          The route stays in the App Router, while the feed itself hydrates from
          TanStack Query, infinite scroll, and a zustand store persisted to a
          cookie.
        </p>
      </section>

      <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
        <CardHeader className="gap-1">
          <CardTitle>What to look at</CardTitle>
          <CardDescription>
            `src/components/discover/discover-feed.tsx` runs the infinite query
            and `src/app/api/bites/route.ts` serves the paged data.
          </CardDescription>
        </CardHeader>
      </Card>

      <DiscoverFeed />
    </div>
  );
}
