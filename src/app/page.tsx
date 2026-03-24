import { HighlightCarousel } from "@/components/home/highlight-carousel";
import { HomeSearchEntry } from "@/components/home/home-search-entry";
import { NearbyShops } from "@/components/home/nearby-shops";
import { QuickBadge } from "@/components/home/quick-badge";
import { QuickPick } from "@/components/home/quick-pick";
import { Reveal } from "@/components/animation/reveal";
import { Badge } from "@/components/ui/badge";
import {
  getBurbiteStats,
  getFeaturedBites,
  getTrendingBiteSearches,
} from "@/lib/data/bites";

export default async function Home() {
  const [featured, stats, trendingSearches] = await Promise.all([
    getFeaturedBites(),
    getBurbiteStats(),
    getTrendingBiteSearches(4),
  ]);

  return (
    <div className="space-y-6">
      <Reveal>
        <section className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-muted-foreground">
              Delivery Now In Bangkok
            </p>
            <h1 className="max-w-[14ch] text-3xl font-semibold leading-tight text-foreground">
              Myanmar comfort food, built for fast dinner decisions.
            </h1>
            <p className="max-w-[34ch] text-sm/6 text-muted-foreground">
              Search for dishes, compare kitchens, and jump into the right flow
              without bouncing between duplicate tabs.
            </p>
          </div>

          <HomeSearchEntry quickSearches={trendingSearches} />

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[22px] bg-card p-4 ring-1 ring-black/5">
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground">
                Live Dishes
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {stats.liveDrops}
              </p>
            </div>
            <div className="rounded-[22px] bg-card p-4 ring-1 ring-black/5">
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground">
                Avg ETA
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {stats.averageEta}
              </p>
            </div>
            <div className="rounded-[22px] bg-card p-4 ring-1 ring-black/5">
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground">
                Open Slots
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {stats.tonightSlots}
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section
          className="relative overflow-hidden rounded-[28px] p-5 text-white shadow-[0_22px_60px_rgba(96,45,18,0.30)]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top left, rgba(220, 20, 20, 0.92) 0%, rgba(160, 10, 10, 0.75) 45%, transparent 70%), linear-gradient(160deg, rgba(38,10,10,0.96) 0%, rgba(120,10,10,0.70) 60%, rgba(20,5,5,0.85) 100%), url('https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "normal",
          }}
        >
          <div className="mt-8 space-y-3">
            <Badge className="bg-white text-xs font-semibold text-primary">
              Today&apos;s Special
            </Badge>
            <h2 className="max-w-[12ch] text-4xl font-semibold leading-none">
              Authentic
              <span className="block py-3">Mandalay</span>
              <span className="block">Mee Shay</span>
            </h2>
            <p className="max-w-[30ch] text-sm/6 text-white/78">
              A rich, savory noodle bowl with tender pork, bold broth, and the
              kind of depth that sells out first during the evening rush.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <QuickBadge slidesPerView={3} />
      </Reveal>

      <Reveal delay={0.3}>
        <HighlightCarousel items={featured} />
      </Reveal>

      <Reveal delay={0.4}>
        <NearbyShops />
      </Reveal>

      <Reveal delay={0.5}>
        <QuickPick items={featured} />
      </Reveal>
    </div>
  );
}
