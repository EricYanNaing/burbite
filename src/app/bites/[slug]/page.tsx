import Link from "next/link";
import { ArrowLeft, Clock3, MapPin, Sparkles, Star } from "lucide-react";
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

type BiteDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BiteDetailPage({ params }: BiteDetailPageProps) {
  const { slug } = await params;
  const bite = await getBiteBySlug(slug);

  if (!bite) {
    notFound();
  }

  return (
    <div className="space-y-5">
      <Link
        href="/discover"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to discover
      </Link>

      <section
        className="overflow-hidden rounded-[30px] p-5 text-white"
        style={{ backgroundImage: bite.heroGradient }}
      >
        <div className="flex items-center justify-between gap-3">
          <Badge className="border-white/20 bg-white/12 text-white">
            {bite.category}
          </Badge>
          <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
            <Star className="size-3.5 fill-current" />
            {bite.rating.toFixed(1)}
          </div>
        </div>

        <div className="mt-16 space-y-3">
          <p className="text-sm text-white/75">{bite.neighborhood}</p>
          <h1 className="max-w-[12ch] text-4xl font-semibold leading-none">
            {bite.name}
          </h1>
          <p className="max-w-[30ch] text-sm/6 text-white/80">
            {bite.description}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Clock3 className="size-3.5" />
              ETA
            </div>
            <p className="text-xl font-semibold">{bite.eta}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <MapPin className="size-3.5" />
              Zone
            </div>
            <p className="text-xl font-semibold">{bite.neighborhood}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[22px] border-none shadow-none ring-1 ring-black/5">
          <CardContent className="space-y-1 py-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="size-3.5" />
              Price
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
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Pickup windows</p>
            <div className="flex flex-wrap gap-2">
              {bite.pickupWindows.map((window) => (
                <span
                  key={window}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {window}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/reserve"
            className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Reserve a spot
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
