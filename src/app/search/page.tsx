import { DiscoverFeed } from "@/components/discover/discover-feed";
import {
  getBiteCategories,
  getPopularBites,
  getTrendingBiteSearches,
} from "@/lib/data/bites";

export default async function DiscoverPage() {
  const [popularFoods, trendingSearches, categorySearches] = await Promise.all([
    getPopularBites(3),
    getTrendingBiteSearches(6),
    getBiteCategories(6),
  ]);

  return (
    <div className="space-y-5">
      <section className="text-black">
        <h1 className="mt-5 text-3xl font-semibold leading-tight">
          Search dishes and shops
        </h1>
        <p className="mt-3 max-w-[34ch] text-sm/6 text-black/70">
          Use search when you already know what you want. Home stays focused on
          discovery, while this screen helps you decide faster.
        </p>
      </section>

      <DiscoverFeed
        popularFoods={popularFoods}
        trendingSearches={trendingSearches}
        categorySearches={categorySearches}
      />
    </div>
  );
}
