"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Star } from "lucide-react";
import type { BiteVenue } from "@/lib/data/bites";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type HighlightCarouselProps = {
  items: BiteVenue[];
};

export function HighlightCarousel({ items }: HighlightCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) {
      return;
    }

    const update = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Client carousel
          </p>
          <h2 className="text-2xl font-semibold">Featured now</h2>
        </div>
        <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {String(current).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </div>
      </div>

      <Carousel setApi={setApi} opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-3">
          {items.map((item) => (
            <CarouselItem key={item.slug} className="basis-[88%] pl-3">
              <motion.div
                animate={
                  items[current - 1]?.slug === item.slug
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0.74, y: 10, scale: 0.96 }
                }
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="h-full"
              >
                <Link
                  href={`/bites/${item.slug}`}
                  className="block overflow-hidden rounded-[28px] bg-card shadow-[0_18px_40px_rgba(58,42,31,0.09)] ring-1 ring-black/5"
                >
                  <div
                    className="flex aspect-[4/3] flex-col justify-between p-5 text-white"
                    style={{ backgroundImage: item.heroGradient }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Badge className="border-white/20 bg-white/12 text-white">
                        {item.category}
                      </Badge>
                      <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs">
                        <Star className="size-3.5 fill-current" />
                        {item.rating.toFixed(1)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="max-w-[13ch] text-3xl font-semibold leading-none">
                        {item.name}
                      </h3>
                      <p className="max-w-[24ch] text-sm/6 text-white/75">
                        {item.vibe}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" />
                        {item.neighborhood}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="size-4" />
                        {item.eta}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Open detail route
                      <ArrowRight className="size-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {items.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                current === index + 1 ? "w-7 bg-primary" : "w-2.5 bg-border"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            className="inline-flex h-9 items-center rounded-full border border-border bg-background px-3 text-sm font-medium"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            className="inline-flex h-9 items-center rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
