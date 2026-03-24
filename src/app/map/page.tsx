import { ShopMapExplorer } from "@/components/map/shop-map-explorer";
import { getShops } from "@/lib/data/shop";

export default async function MapPage() {
  const shops = await getShops();

  return (
    <div className="space-y-5">
      <section className="text-black">
        <h1 className="mt-5 text-3xl font-semibold leading-tight">
          Explore shops on the map
        </h1>
        <p className="mt-3 max-w-[34ch] text-sm/6 text-black/70">
          Search by neighborhood, kitchen, or specialty and tap a marker to open
          the right restaurant faster.
        </p>
      </section>

      <ShopMapExplorer shops={shops} />
    </div>
  );
}
