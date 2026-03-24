"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Search,
  Star,
  Store,
  X,
} from "lucide-react";
import type { Shop } from "@/lib/data/shop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ShopMapExplorerProps = {
  shops: Shop[];
};

function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}

function shopMatchesQuery(shop: Shop, normalizedQuery: string) {
  if (!normalizedQuery) {
    return true;
  }

  const searchTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const searchableText = [
    shop.name,
    shop.neighborhood,
    shop.description,
    shop.address,
    ...shop.specialties,
  ]
    .join(" ")
    .toLowerCase();

  return searchTokens.every((token) => searchableText.includes(token));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ShopMapExplorer({ shops }: ShopMapExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedShopId, setSelectedShopId] = useState(shops[0]?.id ?? "");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeQuery(deferredQuery);
  const filteredShops = shops.filter((shop) =>
    shopMatchesQuery(shop, normalizedQuery),
  );
  const selectedShop =
    filteredShops.find((shop) => shop.id === selectedShopId) ??
    filteredShops[0] ??
    null;
  const visibleAreaLabels = Array.from(
    new Map(filteredShops.map((shop) => [shop.neighborhood, shop])).values(),
  );

  const focusShop = (shopId: string) => {
    setSelectedShopId(shopId);
    document
      .getElementById("shop-map-canvas")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <section className="space-y-4">
      <div className="rounded-[28px] bg-card p-4 shadow-[0_18px_48px_rgba(58,42,31,0.08)] ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground">
              Live Map Explore
            </p>
            <h2 className="max-w-[16ch] text-2xl font-semibold leading-tight text-foreground">
              Search kitchens directly on the map, then open the shop you want.
            </h2>
          </div>
          <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground ring-1 ring-black/5">
            {filteredShops.length} visible
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-[20px] bg-[#f7f4ed] px-4 py-3 ring-1 ring-black/5">
          <Search className="size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by shop, neighborhood, or specialty"
            className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              aria-label="Clear map search"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div
        id="shop-map-canvas"
        className="relative h-[430px] overflow-hidden rounded-[32px] bg-[#dbe5d9] shadow-[0_24px_60px_rgba(58,42,31,0.12)] ring-1 ring-black/5"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, rgba(255,255,255,0.65), transparent 24%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.4), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.08)), linear-gradient(135deg, #dbe7d6 0%, #ccd9c8 42%, #dfe8dc 100%)",
          }}
        />
        <div className="absolute -right-8 top-8 h-[360px] w-[120px] rounded-full bg-[#9cc8db]/70 blur-[1px]" />
        <div className="absolute left-10 top-14 h-[340px] w-[2px] rotate-[18deg] rounded-full bg-white/45" />
        <div className="absolute left-28 top-0 h-[380px] w-[2px] rotate-[-8deg] rounded-full bg-white/40" />
        <div className="absolute left-44 top-10 h-[360px] w-[2px] rotate-[12deg] rounded-full bg-white/35" />
        <div className="absolute left-6 top-28 h-[2px] w-[320px] rotate-[6deg] rounded-full bg-white/45" />
        <div className="absolute left-0 top-52 h-[2px] w-[340px] rotate-[-8deg] rounded-full bg-white/40" />
        <div className="absolute left-16 top-80 h-[2px] w-[300px] rotate-[4deg] rounded-full bg-white/35" />

        {visibleAreaLabels.map((shop) => (
          <span
            key={`label-${shop.neighborhood}`}
            className="absolute rounded-full bg-white/72 px-2 py-1 text-[10px] font-medium tracking-[0.08em] uppercase text-foreground/70 backdrop-blur-sm"
            style={{
              left: `${clamp(shop.mapPosition.x + 2, 6, 84)}%`,
              top: `${clamp(shop.mapPosition.y - 9, 6, 86)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {shop.neighborhood}
          </span>
        ))}

        <div className="absolute left-4 top-4 rounded-[20px] bg-white/82 px-4 py-3 backdrop-blur-sm ring-1 ring-black/5">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground">
            Bangkok coverage
          </p>
          <p className="mt-1 text-sm text-foreground">
            Tap a marker to inspect the kitchen.
          </p>
        </div>

        {shops.map((shop) => {
          const isVisible = filteredShops.some((entry) => entry.id === shop.id);
          const isSelected = selectedShop?.id === shop.id;

          return (
            <button
              key={shop.id}
              type="button"
              onClick={() => focusShop(shop.id)}
              className="absolute"
              style={{
                left: `${shop.mapPosition.x}%`,
                top: `${shop.mapPosition.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-label={`View ${shop.name} on map`}
            >
              {isSelected ? (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full bg-[#121212] px-3 py-1 text-[11px] font-medium whitespace-nowrap text-white shadow-[0_12px_24px_rgba(18,18,18,0.22)]">
                  {shop.name}
                </span>
              ) : null}

              <span
                className={`relative flex size-11 items-center justify-center rounded-full border border-white/50 shadow-[0_10px_24px_rgba(58,42,31,0.18)] transition-all ${
                  isSelected
                    ? "scale-110 bg-primary text-primary-foreground"
                    : isVisible
                      ? "bg-white text-primary"
                      : "scale-95 bg-white/35 text-foreground/45"
                }`}
              >
                {isSelected ? (
                  <span className="absolute inset-0 rounded-full border-4 border-primary/15 animate-ping" />
                ) : null}
                <MapPin className="relative z-10 size-5 fill-current" />
              </span>
            </button>
          );
        })}
      </div>

      {selectedShop ? (
        <div className="rounded-[28px] bg-card p-4 shadow-[0_18px_48px_rgba(58,42,31,0.08)] ring-1 ring-black/5">
          <div className="flex gap-3">
            <div
              className="h-28 w-28 shrink-0 rounded-[22px]"
              style={{
                backgroundImage: `${selectedShop.heroGradient}, linear-gradient(135deg, rgba(15, 12, 10, 0.18), rgba(15, 12, 10, 0.58)), url('${selectedShop.image}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.08em] uppercase text-muted-foreground">
                    <Store className="size-3.5 text-primary" />
                    {selectedShop.neighborhood}
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-foreground">
                    {selectedShop.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedShop.description}
                  </p>
                </div>
                <Badge
                  variant={selectedShop.open ? "secondary" : "outline"}
                  className="rounded-full"
                >
                  {selectedShop.open ? "Open" : "Closed"}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-2.5 py-1 ring-1 ring-black/5">
                  <Star className="size-3.5 fill-current text-primary" />
                  {selectedShop.rating.toFixed(1)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-2.5 py-1 ring-1 ring-black/5">
                  <Clock3 className="size-3.5 text-primary" />
                  {selectedShop.eta}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-2.5 py-1 ring-1 ring-black/5">
                  <MapPin className="size-3.5 text-primary" />
                  {selectedShop.address}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedShop.specialties.slice(0, 3).map((specialty) => (
              <Badge
                key={`${selectedShop.id}-${specialty}`}
                variant="outline"
                className="h-auto rounded-full border-black/10 bg-background/80 px-3 py-1 text-foreground"
              >
                {specialty}
              </Badge>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/5 pt-3">
            <p className="text-sm text-muted-foreground">
              Open the detail page for hours, dishes, and pickup timing.
            </p>
            <Link
              href={`/shops/${selectedShop.slug}?from=map`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              View shop
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-[28px] bg-card p-6 text-center ring-1 ring-black/5">
          <h3 className="text-lg font-semibold text-foreground">
            No shops match that map search
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a neighborhood like `Sathorn` or a dish like `mohinga`.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4 rounded-full"
            onClick={() => setQuery("")}
          >
            Reset map search
          </Button>
        </div>
      )}

      {filteredShops.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-2xl font-semibold">Map results</h3>
              <p className="text-sm text-muted-foreground">
                Focus a marker or jump straight into the shop detail page.
              </p>
            </div>
            <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground ring-1 ring-black/5">
              {filteredShops.length} results
            </div>
          </div>

          <div className="space-y-3">
            {filteredShops.map((shop) => {
              const isSelected = selectedShop?.id === shop.id;

              return (
                <div
                  key={shop.id}
                  className={`rounded-[24px] bg-card p-3 ring-1 shadow-[0_10px_28px_rgba(58,42,31,0.06)] transition-all ${
                    isSelected
                      ? "ring-primary/25 shadow-[0_16px_36px_rgba(227,24,55,0.10)]"
                      : "ring-black/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {shop.name}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {shop.neighborhood} · {shop.eta} · {shop.distance} km
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-3 py-1 text-sm font-semibold text-foreground ring-1 ring-black/5">
                      <Star className="size-3.5 fill-current text-primary" />
                      {shop.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => focusShop(shop.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <MapPin className="size-4 text-primary" />
                      Locate on map
                    </button>

                    <Link
                      href={`/shops/${shop.slug}?from=map`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      Open shop
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </section>
  );
}
