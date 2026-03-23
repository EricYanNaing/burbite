import Link from "next/link";
import {
  Compass,
  Database,
  Server,
  Smartphone,
  Sparkles,
  ArrowRight, Clock3, MapPin, Star
} from "lucide-react";
import { motion } from "motion/react";
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
import { QuickBadge } from "@/components/home/quick-badge";
import { NearbyShops } from "@/components/home/nearby-shops";

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
            <Badge className="text-primary bg-white text-xs font-semibold">TODAY'S SPECIAL</Badge>
            <h1 className="max-w-[12ch] text-4xl leading-none font-semibold">
              Authentic
              <p className="py-3">Mandalay</p>
              <p>Mee Shay</p>
            </h1>
            <p className="max-w-[30ch] text-sm/6 text-white/78">
              A rich, savory noodle soup with a complex broth and tender pork.
            </p>
          </div>

        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <QuickBadge slidesPerView={3} />
      </Reveal>

      <Reveal delay={0.2}>
        <HighlightCarousel items={featured} />
      </Reveal>

      <Reveal delay={0.3}>
        <NearbyShops slidesPerView={1} />
      </Reveal>

    </div>
  );
}
