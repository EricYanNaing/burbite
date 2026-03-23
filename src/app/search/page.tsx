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
      <section
        className="text-black"
      >
        <h1 className="mt-5 text-3xl font-semibold leading-tight">
          Nearby Myanmar Bites
        </h1>
        <p className="mt-3 max-w-[30ch] text-sm/6 text-black/70">
          Authentic Burmese flavors curated for the Bangkok palate.
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
