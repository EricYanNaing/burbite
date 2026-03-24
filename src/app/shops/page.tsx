import Link from "next/link";
import { ArrowRight, Clock3, MapPin, Star, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getShops } from "@/lib/data/shop";

function parseEtaMinutes(eta: string) {
  return Number.parseInt(eta, 10) || 0;
}

export default async function ShopsPage() {
  const shops = await getShops();
  const rankedShops = [...shops].sort(
    (left, right) =>
      Number(right.open) - Number(left.open) ||
      right.rating - left.rating ||
      left.distance - right.distance,
  );
  const featuredShop = rankedShops[0];
  const openShops = rankedShops.filter((shop) => shop.open).length;
  const averageEta = Math.round(
    rankedShops.reduce((total, shop) => total + parseEtaMinutes(shop.eta), 0) /
    rankedShops.length,
  );
  const neighborhoodCount = new Set(
    rankedShops.map((shop) => shop.neighborhood),
  ).size;

  return (
    <div className="space-y-5">
      <section
        className="overflow-hidden rounded-[30px] p-5 text-white"
        style={{
          backgroundImage: `${featuredShop.heroGradient}, linear-gradient(135deg, rgba(10, 8, 7, 0.34), rgba(10, 8, 7, 0.78)), url('${featuredShop.image}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <Badge className="border-white/20 bg-white/12 text-white">
            Shop Directory
          </Badge>
          <Badge
            variant={featuredShop.open ? "secondary" : "outline"}
            className="rounded-full text-primary"
          >
            {featuredShop.open ? "Open now" : "Closed"}
          </Badge>
        </div>

        <div className="mt-16 space-y-3">
          <h1 className="max-w-[13ch] text-4xl font-semibold leading-none">
            Pick the right kitchen before you pick the dish.
          </h1>
          <p className="max-w-[34ch] text-sm/6 text-white/82">
            Merchant-first browsing for when you care more about speed,
            neighborhood, and reliability than browsing every dish first.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-[20px] bg-black/15 p-3 backdrop-blur-sm">
            <p className="text-[11px] tracking-[0.12em] uppercase text-white/72">
              Open now
            </p>
            <p className="mt-2 text-xl font-semibold">{openShops}</p>
          </div>
          <div className="rounded-[20px] bg-black/15 p-3 backdrop-blur-sm">
            <p className="text-[11px] tracking-[0.12em] uppercase text-white/72">
              Avg ETA
            </p>
            <p className="mt-2 text-xl font-semibold">{averageEta} min</p>
          </div>
          <div className="rounded-[20px] bg-black/15 p-3 backdrop-blur-sm">
            <p className="text-[11px] tracking-[0.12em] uppercase text-white/72">
              Areas
            </p>
            <p className="mt-2 text-xl font-semibold">{neighborhoodCount}</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">All shops</h2>
            <p className="text-sm text-muted-foreground">
              Browse kitchens by pace, rating, and neighborhood.
            </p>
          </div>
          <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground ring-1 ring-black/5">
            {rankedShops.length} shops
          </div>
        </div>

        <div className="space-y-3">
          {rankedShops.map((shop) => (
            <Link
              key={shop.id}
              href={`/shops/${shop.slug}`}
              className="group block overflow-hidden rounded-[28px] bg-card p-3 shadow-[0_12px_28px_rgba(58,42,31,0.07)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(58,42,31,0.12)]"
            >
              <div className="flex gap-3">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[22px]">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(15, 12, 10, 0.72), rgba(15, 12, 10, 0.18) 56%), url('${shop.image}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3 text-white">
                    <Badge
                      variant={shop.open ? "secondary" : "outline"}
                      className="h-auto rounded-full border-white/15 bg-black/20 px-2.5 py-1 text-white backdrop-blur-sm"
                    >
                      {shop.open ? "Open" : "Closed"}
                    </Badge>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                    <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                      <Clock3 className="size-3.5" />
                      {shop.eta}
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.08em] uppercase text-muted-foreground">
                        <Store className="size-3.5 text-primary" />
                        {shop.neighborhood}
                      </div>
                      <h3 className="text-lg font-semibold leading-tight text-foreground">
                        {shop.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {shop.description}
                      </p>
                    </div>

                    <div className="rounded-[18px] bg-secondary/80 px-3 py-2 text-right ring-1 ring-black/5">
                      <div className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                        <Star className="size-3.5 fill-current text-primary" />
                        {shop.rating.toFixed(1)}
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {shop.reviewCount} reviews
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-2.5 py-1 ring-1 ring-black/5">
                      <MapPin className="size-3.5 text-primary" />
                      {shop.distance} km away
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-2.5 py-1 ring-1 ring-black/5">
                      <Clock3 className="size-3.5 text-primary" />
                      {shop.openTime} - {shop.closeTime}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {shop.specialties.slice(0, 3).map((specialty) => (
                      <Badge
                        key={`${shop.id}-${specialty}`}
                        variant="outline"
                        className="h-auto rounded-full border-black/10 bg-background/80 px-3 py-1 text-foreground"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/5 pt-3">
                <p className="text-sm text-muted-foreground">
                  Open the shop for menu coverage, hours, and pickup details.
                </p>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
                  View shop
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
