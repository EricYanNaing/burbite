import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  MapPin,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBiteBySlug } from "@/lib/data/bites";
import { getShopById } from "@/lib/data/shop";

type BiteDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function parseEtaMinutes(eta: string) {
  return Number.parseInt(eta, 10) || 0;
}

export default async function BiteDetailPage({ params }: BiteDetailPageProps) {
  const { slug } = await params;
  const bite = await getBiteBySlug(slug);

  if (!bite) {
    notFound();
  }

  const shopsWithOffers = (
    await Promise.all(
      bite.shopOffers.map(async (offer) => {
        const shop = await getShopById(offer.shopId);

        if (!shop) {
          return null;
        }

        return { offer, shop };
      }),
    )
  ).filter(
    (
      entry,
    ): entry is {
      offer: (typeof bite.shopOffers)[number];
      shop: NonNullable<Awaited<ReturnType<typeof getShopById>>>;
    } => entry !== null,
  );

  const fastestEta = [...bite.shopOffers].sort(
    (left, right) => parseEtaMinutes(left.eta) - parseEtaMinutes(right.eta),
  )[0]?.eta;

  return (
    <div className="space-y-5">
      <Link
        href="/search"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to results
      </Link>

      <section
        className="overflow-hidden rounded-[30px] p-5 text-white"
        style={{ backgroundImage: bite.heroGradient }}
      >
        <div className="flex items-center justify-between gap-3">
          <Badge className="border-white/20 bg-white/12 text-white">
            {bite.category}
          </Badge>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
            <Store className="size-3.5" />
            {bite.shopOffers.length} shops
          </div>
        </div>

        <div className="mt-16 space-y-3">
          <p className="text-sm text-white/75">Searchable via food, category, slug, and shop names.</p>
          <h1 className="max-w-[12ch] text-4xl font-semibold leading-none">
            {bite.name}
          </h1>
          <p className="max-w-[34ch] text-sm/6 text-white/80">
            {bite.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {bite.searchAliases.map((alias) => (
              <Badge key={alias} className="border-white/20 bg-white/12 text-white">
                {alias}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Store className="size-3.5" />
              Shops
            </div>
            <p className="text-xl font-semibold">{bite.shopOffers.length}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Clock3 className="size-3.5" />
              Fastest ETA
            </div>
            <p className="text-xl font-semibold">{fastestEta ?? bite.eta}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="size-3.5" />
              Starts at
            </div>
            <p className="text-xl font-semibold">{bite.price}</p>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-[26px] border-none shadow-none ring-1 ring-black/5">
        <CardHeader>
          <CardTitle>Chef note</CardTitle>
          <CardDescription>{bite.chefNote}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-5">
          <div className="flex flex-wrap gap-2">
            {bite.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full bg-primary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Where to get {bite.name}</h2>
            <p className="text-sm text-muted-foreground">
              Choose a shop to view full details, hours, and everything we know
              for phase 1 ordering.
            </p>
          </div>
          <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-black">
            {shopsWithOffers.length} shops
          </div>
        </div>

        <div className="space-y-3">
          {shopsWithOffers.map(({ offer, shop }) => (
            <Link
              key={`${bite.slug}-${shop.id}`}
              href={`/shops/${shop.slug}`}
              className="block overflow-hidden rounded-[26px] bg-card ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-4 p-4 md:flex-row">
                <div
                  className="h-28 rounded-[22px] md:w-48"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(15,12,10,0.12), rgba(15,12,10,0.58)), url('${shop.image}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{shop.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {offer.note}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="rounded-full bg-primary text-white">
                        {offer.price}
                      </Badge>
                      <Badge
                        variant={shop.open ? "secondary" : "outline"}
                        className="rounded-full bg-primary"
                      >
                        {shop.open ? "Open" : "Closed"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      {offer.neighborhood}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-4" />
                      {offer.eta}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="size-4 fill-current" />
                      {offer.rating.toFixed(1)}
                    </span>
                  </div>


                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Open shop detail
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
