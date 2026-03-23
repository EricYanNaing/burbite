"use client";

import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type QuickBadgeProps = {
    slidesPerView?: number;
};

const quickBadges = [
    {
        label: "All",
        icon: "🍜",
        value: "all",
    },
    {
        label: "Noodles",
        icon: "🍝",
        value: "noodles",
    },
    {
        label: "Salads",
        icon: "🥗",
        value: "salads",
    },
    {
        label: "Curries",
        icon: "🍛",
        value: "curries",
    },
];

export function QuickBadge({ slidesPerView = 4 }: QuickBadgeProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(1);
    const visibleSlides = Math.max(
        1,
        Math.min(Math.trunc(slidesPerView), quickBadges.length)
    );
    const activeBadge = quickBadges[current - 1]?.value;
    const itemWidth = `${100 / visibleSlides}%`;

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
        <section className="">
            <Carousel
                setApi={setApi}
                opts={{ align: "start", loop: quickBadges.length > visibleSlides }}
            >
                <CarouselContent className="-ml-3 py-2">
                    {quickBadges.map((item) => (
                        <CarouselItem
                            key={item.value}
                            className="pl-3 cursor-pointer"
                            style={{ flexBasis: itemWidth }}
                            onClick={() => api?.scrollTo(quickBadges.indexOf(item))}
                        >
                            <motion.div
                                animate={
                                    activeBadge === item.value
                                        ? { backgroundColor: "#E31837", color: "#fff" }
                                        : { backgroundColor: "#F3F3F3", color: "#000" }
                                }
                                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                                className="p-2 rounded-[34px] text-sm font-semibold flex items-center gap-2 shadow-lg"
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
}
