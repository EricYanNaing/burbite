import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  MapPin,
  Phone,
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
import { getBitesForShop } from "@/lib/data/bites";
import { getShopBySlug } from "@/lib/data/shop";

type ShopDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

export default async function ShopDetailPage({
  params,
  searchParams,
}: ShopDetailPageProps) {
  const { slug } = await params;
  const { from } = await searchParams;
  const shop = await getShopBySlug(slug);

  if (!shop) {
    notFound();
  }

  const backHref = from === "map" ? "/map" : "/shops";
  const backLabel = from === "map" ? "Back to map" : "Back to shops";

  const shopBites = (await getBitesForShop(shop.id))
    .map((bite) => {
      const offer = bite.shopOffers.find((entry) => entry.shopId === shop.id);

      if (!offer) {
        return null;
      }

      return { bite, offer };
    })
    .filter(
      (
        entry,
      ): entry is {
        bite: Awaited<ReturnType<typeof getBitesForShop>>[number];
        offer: Awaited<ReturnType<typeof getBitesForShop>>[number]["shopOffers"][number];
      } => entry !== null,
    );

  return (
    <div className="space-y-5">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {backLabel}
      </Link>

      <section
        className="overflow-hidden rounded-[30px] p-5 text-white"
        style={{
          backgroundImage: `${shop.heroGradient}, linear-gradient(135deg, rgba(10, 8, 7, 0.26), rgba(10, 8, 7, 0.72)), url('${shop.image}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <Badge className="border-white/20 bg-white/12 text-white">
            {shop.neighborhood}
          </Badge>
          <Badge
            variant={shop.open ? "secondary" : "outline"}
            className="rounded-full"
          >
            {shop.open ? "Open now" : "Closed"}
          </Badge>
        </div>

        <div className="mt-16 space-y-3">
          <h1 className="max-w-[12ch] text-4xl font-semibold leading-none">
            {shop.name}
          </h1>
          <p className="max-w-[34ch] text-sm/6 text-white/82">
            {shop.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {shop.specialties.map((specialty) => (
              <Badge
                key={specialty}
                className="border-white/20 bg-white/12 text-white"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Star className="size-3.5" />
              Rating
            </div>
            <p className="text-xl font-semibold">{shop.rating.toFixed(1)}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Clock3 className="size-3.5" />
              Pickup ETA
            </div>
            <p className="text-xl font-semibold">{shop.eta}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <MapPin className="size-3.5" />
              Distance
            </div>
            <p className="text-xl font-semibold">{shop.distance} km</p>
          </CardContent>
        </Card>
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Store className="size-3.5" />
              Hours
            </div>
            <p className="text-xl font-semibold">
              {shop.openTime} - {shop.closeTime}
            </p>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-[26px] border-none shadow-none ring-1 ring-black/5">
        <CardHeader>
          <CardTitle>Order info</CardTitle>
          <CardDescription>
            Phase 1 only shows shop information and menu coverage. There is no
            cart or account flow yet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-5">
          <div className="space-y-1">
            <p className="text-sm font-medium">Address</p>
            <p className="text-sm text-muted-foreground">{shop.address}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Phone</p>
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4" />
              {shop.phone}
            </p>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Available dishes</h2>
            <p className="text-sm text-muted-foreground">
              Open a dish to compare this shop against the other places carrying
              it.
            </p>
          </div>
          <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-black">
            {shopBites.length} dishes
          </div>
        </div>

        <div className="space-y-3">
          {shopBites.map(({ bite, offer }) => (
            <Link
              key={`${shop.id}-${bite.slug}`}
              href={`/bites/${bite.slug}`}
              className="block overflow-hidden rounded-[26px] bg-card ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-4 p-4 md:flex-row">
                <div
                  className="h-28 rounded-[22px] md:w-48"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(15,12,10,0.12), rgba(15,12,10,0.58)), url('${bite.heroImage}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{bite.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {offer.note}
                      </p>
                    </div>
                    <Badge className="rounded-full bg-secondary text-secondary-foreground">
                      {offer.price}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-4" />
                      {offer.eta}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="size-4 fill-current" />
                      {offer.rating.toFixed(1)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="size-4" />
                      {bite.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {bite.searchAliases.slice(0, 2).map((alias) => (
                      <Badge
                        key={`${bite.slug}-${alias}`}
                        variant="outline"
                        className="rounded-full"
                      >
                        {alias}
                      </Badge>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Compare all shops for this dish
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
