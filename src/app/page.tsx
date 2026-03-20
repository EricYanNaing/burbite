import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Compass,
  Database,
  Server,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { HighlightCarousel } from "@/components/home/highlight-carousel";
import { QuickSave } from "@/components/home/quick-save";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/animation/reveal";
import { getBurbiteStats, getFeaturedBites } from "@/lib/data/bites";

export default async function Home() {
  // Server Component: render data here, then hand interactive pieces to clients.
  const [featured, stats] = await Promise.all([
    getFeaturedBites(),
    getBurbiteStats(),
  ]);

  const stackNotes = [
    {
      icon: Server,
      title: "Server-rendered home",
      body: "This route loads featured bites directly in a Server Component before the UI streams down.",
    },
    {
      icon: Smartphone,
      title: "Client interactions",
      body: "The carousel and save toggle are Client Components, so you can see the boundary clearly.",
    },
    {
      icon: Compass,
      title: "API + Query",
      body: "The Discover tab uses TanStack Query against a Route Handler so the fetch pattern stays reusable.",
    },
    {
      icon: Database,
      title: "Prisma CRUD demo",
      body: "The Posts route shows the same pattern against PostgreSQL with Prisma so you can extend it later.",
    },
  ];

  return (
    <div className="space-y-6">
      <Reveal>
        <section
          className="overflow-hidden rounded-[28px] p-5 text-white shadow-[0_22px_60px_rgba(96,45,18,0.22)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, rgba(255, 191, 150, 0.42), transparent 35%), linear-gradient(135deg, #261913 0%, #4d291b 45%, #d76733 100%)",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <Badge className="border-white/20 bg-white/12 text-white">
              Mobile-first starter
            </Badge>
            <QuickSave />
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-sm font-medium text-white/70">BurBite</p>
            <h1 className="max-w-[12ch] text-4xl leading-none font-semibold">
              Tight food discovery for small screens.
            </h1>
            <p className="max-w-[30ch] text-sm/6 text-white/78">
              Next.js App Router, TypeScript, Tailwind, shadcn/ui, TanStack
              Query, Zod, and an internal API example, all in one starter shell.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/discover"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-[#502b1d] shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Explore routes
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/reserve"
              className="inline-flex h-10 items-center rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Open form demo
            </Link>
            <Link
              href="/posts"
              className="inline-flex h-10 items-center rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Open CRUD demo
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="grid grid-cols-3 gap-3">
          <Card className="rounded-[22px] border-none bg-[#fff8f1] shadow-none ring-1 ring-black/5">
            <CardContent className="space-y-1 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Live
              </p>
              <p className="text-2xl font-semibold">{stats.liveDrops}</p>
              <p className="text-xs text-muted-foreground">curated drops</p>
            </CardContent>
          </Card>
          <Card className="rounded-[22px] border-none bg-[#f4f8ee] shadow-none ring-1 ring-black/5">
            <CardContent className="space-y-1 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Avg ETA
              </p>
              <p className="text-2xl font-semibold">{stats.averageEta}</p>
              <p className="text-xs text-muted-foreground">pickup ready</p>
            </CardContent>
          </Card>
          <Card className="rounded-[22px] border-none bg-[#fff3eb] shadow-none ring-1 ring-black/5">
            <CardContent className="space-y-1 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Slots
              </p>
              <p className="text-2xl font-semibold">{stats.tonightSlots}</p>
              <p className="text-xs text-muted-foreground">open tonight</p>
            </CardContent>
          </Card>
        </section>
      </Reveal>

      <Reveal delay={0.14}>
        <HighlightCarousel items={featured} />
      </Reveal>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Starter map
            </p>
            <h2 className="text-2xl font-semibold">How the example is split</h2>
          </div>
          <Sparkles className="size-5 text-primary" />
        </div>

        <div className="space-y-3">
          {stackNotes.map((note) => {
            const Icon = note.icon;

            return (
              <Reveal key={note.title} delay={0.2 + stackNotes.indexOf(note) * 0.06}>
                <Card className="rounded-[24px] border-none shadow-none ring-1 ring-black/5">
                  <CardHeader className="gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <CardTitle>{note.title}</CardTitle>
                        <CardDescription>{note.body}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Reveal delay={0.34}>
        <Card className="rounded-[28px] border-none bg-[#1f1714] text-white shadow-[0_18px_40px_rgba(31,23,20,0.18)] ring-0">
          <CardHeader className="gap-2">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Clock3 className="size-4" />
              Example app-router navigation
            </div>
            <CardTitle className="text-white">
              Jump between Home, Discover, Reserve, and dynamic bite detail pages.
            </CardTitle>
            <CardDescription className="text-white/65">
              Use the bottom tab bar or open any featured card to hit the
              `[slug]` route.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-5">
            <Link
              href={`/bites/${featured[0]?.slug ?? "ember-bowl-club"}`}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-[#1f1714]"
            >
              Open sample detail
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
