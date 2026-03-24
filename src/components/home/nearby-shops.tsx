import Link from "next/link";
import { getNearbyShops } from "@/lib/data/shop";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Clock3, MapPin, Star } from "lucide-react";

export async function NearbyShops() {
    const shops = await getNearbyShops();
    return (
        <section className="">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Nearby Shops</h2>
                </div>
                <Link
                    href="/shops"
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-black ring-1 ring-black/5"
                >
                    See all
                </Link>
            </div>
            <Carousel opts={{ align: "start", loop: true }} className="py-3">
                <CarouselContent className="-ml-3 py-3">
                    {shops.map((item) => (
                        <CarouselItem key={item.id} className="cursor-pointer">
                            <Link
                                href={`/shops/${item.slug}`}
                                className="block overflow-hidden rounded-[28px] ring-1 ring-black/5"
                            >
                                <div className="relative aspect-[6/3] overflow-hidden">
                                    <div
                                        className="absolute inset-0 transition-all duration-300"
                                        style={{
                                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.48) 0%, transparent 38%, transparent 52%, rgba(0,0,0,0.72) 100%), url('${item.image}')`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            filter: item.open ? "none" : "grayscale(1) blur(2px)",
                                            transform: item.open ? "scale(1)" : "scale(1.04)",
                                        }}
                                    />
                                    {/* Content layer — sharp, sits above the blur */}
                                    <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
                                        <div>
                                            {!item.open && (
                                                <span className="inline-block rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                                                    Closed
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex justify-between gap-3">
                                        <span className="font-semibold text-white">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                                </div>

                                <div className="space-y-4 p-5">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1.5">
                                            <Star className="size-3.5 fill-current text-yellow-500" />
                                            {item.rating.toFixed(1)} <span className="text-xs text-gray-500"> ({item.reviewCount})</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="size-4 text-primary" />
                                            {item.distance} km
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-black">
                                        <h5 className="max-w-[13ch] font-semibold leading-none flex items-center gap-2">
                                            <Clock3 className="size-4" />
                                            {item.openTime} - {item.closeTime}
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
}
