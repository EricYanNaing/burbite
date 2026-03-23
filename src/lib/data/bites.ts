export type BitePrice = "$" | "$$" | "$$$";

export type BiteShopOffer = {
  shopId: string;
  shopName: string;
  neighborhood: string;
  eta: string;
  rating: number;
  price: BitePrice;
  pickupWindows: string[];
  note: string;
};

export type BiteVenue = {
  id: string;
  slug: string;
  name: string;
  shopId: string;
  shopName: string;
  category: string;
  neighborhood: string;
  eta: string;
  rating: number;
  price: BitePrice;
  description: string;
  tags: string[];
  searchAliases: string[];
  vibe: string;
  chefNote: string;
  pickupWindows: string[];
  heroGradient: string;
  heroImage: string;
  shopOffers: BiteShopOffer[];
};

export type BiteCategorySearch = {
  id: string;
  label: string;
  query: string;
  heroImage: string;
};

const bites: BiteVenue[] = [
  {
    id: "1",
    slug: "mohinga",
    name: "Mohinga",
    shopId: "1",
    shopName: "Golden Myanmar Kitchen",
    category: "Fish noodle soup",
    neighborhood: "Silom",
    eta: "14 min",
    rating: 4.9,
    price: "$",
    description:
      "Myanmar's national dish with rich catfish broth, thin rice noodles, crispy fritters, herbs, and boiled egg.",
    tags: ["national dish", "broth", "breakfast"],
    searchAliases: ["fish noodle soup", "myanmar national dish", "mohinga soup"],
    vibe: "Warm, soul-filling, and the first meal every Burmese morning deserves.",
    chefNote:
      "Add the crispy split-pea fritter last so it stays crunchy in the broth.",
    pickupWindows: ["07:00", "07:30", "08:00", "08:30"],
    heroImage: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 185, 141, 0.45), transparent 36%), linear-gradient(135deg, #251610 0%, #6b341f 45%, #d56c3d 100%)",
    shopOffers: [
      {
        shopId: "1",
        shopName: "Golden Myanmar Kitchen",
        neighborhood: "Silom",
        eta: "14 min",
        rating: 4.9,
        price: "$",
        pickupWindows: ["07:00", "07:30", "08:00", "08:30"],
        note: "Classic catfish broth with extra fritter crunch.",
      },
      {
        shopId: "9",
        shopName: "Yangon Tea House",
        neighborhood: "Riverside",
        eta: "16 min",
        rating: 4.8,
        price: "$",
        pickupWindows: ["07:15", "07:45", "08:15"],
        note: "Lighter broth with more herbs and a sharp lime finish.",
      },
      {
        shopId: "8",
        shopName: "Silver Myanmar Kitchen",
        neighborhood: "Sathorn",
        eta: "19 min",
        rating: 4.7,
        price: "$",
        pickupWindows: ["08:00", "08:30", "09:00"],
        note: "Weekend breakfast batch with a thicker, slower-simmered broth.",
      },
    ],
  },
  {
    id: "2",
    slug: "ohn-no-khaut-swe",
    name: "Ohn No Khaut Swe",
    shopId: "3",
    shopName: "Burmese Tea House",
    category: "Coconut noodle soup",
    neighborhood: "Riverside",
    eta: "18 min",
    rating: 4.8,
    price: "$$",
    description:
      "Creamy coconut chicken noodle soup layered with egg noodles, crispy noodle topping, and a squeeze of lime.",
    tags: ["coconut", "creamy", "comfort"],
    searchAliases: ["ohn no khaut swe", "coconut chicken noodle", "burmese coconut soup"],
    vibe: "Rich and warming, the kind of bowl you come back to every rainy evening.",
    chefNote:
      "The broth lands richer after a five-minute rest, so do not rush the first sip.",
    pickupWindows: ["18:15", "18:45", "19:10"],
    heroImage: "https://media.istockphoto.com/id/517972668/photo/burmese-noodle-with-chicken.webp?a=1&b=1&s=612x612&w=0&k=20&c=Emt2z5UGTTb4XB3XUKeQ7nTaDSUp5mjx35aRGx9rnMs=",
    heroGradient:
      "radial-gradient(circle at top right, rgba(200, 255, 225, 0.3), transparent 34%), linear-gradient(135deg, #163025 0%, #22583f 50%, #5ba16e 100%)",
    shopOffers: [
      {
        shopId: "3",
        shopName: "Burmese Tea House",
        neighborhood: "Riverside",
        eta: "18 min",
        rating: 4.8,
        price: "$$",
        pickupWindows: ["18:15", "18:45", "19:10"],
        note: "Classic coconut chicken broth with crisp noodles on top.",
      },
      {
        shopId: "6",
        shopName: "Burmese Kitchen",
        neighborhood: "Sathorn",
        eta: "17 min",
        rating: 4.7,
        price: "$$",
        pickupWindows: ["12:10", "12:40", "13:10"],
        note: "Weekday lunch version with more shredded chicken and lime.",
      },
      {
        shopId: "5",
        shopName: "Mandalay Restaurant",
        neighborhood: "Ari",
        eta: "20 min",
        rating: 4.6,
        price: "$$",
        pickupWindows: ["18:30", "19:00", "19:30"],
        note: "Richer coconut finish with extra chili oil on the side.",
      },
    ],
  },
  {
    id: "3",
    slug: "laphet-thoke",
    name: "Laphet Thoke",
    shopId: "5",
    shopName: "Mandalay Restaurant",
    category: "Tea leaf salad",
    neighborhood: "Ari",
    eta: "11 min",
    rating: 4.7,
    price: "$",
    description:
      "Fermented tea leaves tossed with fried garlic, sesame seeds, crunchy beans, tomato, and lime juice.",
    tags: ["salad", "fermented", "quick"],
    searchAliases: ["tea leaf salad", "laphet thoke", "burmese salad"],
    vibe: "Bright, acidic, and addictively crunchy, unlike anything else on the menu.",
    chefNote:
      "Mix everything together fast and eat immediately so the crunch stays sharp.",
    pickupWindows: ["11:40", "12:00", "12:20", "12:40"],
    heroImage: "https://plus.unsplash.com/premium_photo-1712758600560-67cffbf3866f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJ1cm1lc2UlMjBmb29kfGVufDB8fDB8fHww",
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 235, 159, 0.38), transparent 36%), linear-gradient(135deg, #4f3414 0%, #9d6d18 50%, #f0b74b 100%)",
    shopOffers: [
      {
        shopId: "5",
        shopName: "Mandalay Restaurant",
        neighborhood: "Ari",
        eta: "11 min",
        rating: 4.7,
        price: "$",
        pickupWindows: ["11:40", "12:00", "12:20", "12:40"],
        note: "Balanced tea leaf dressing with extra crunchy fried beans.",
      },
      {
        shopId: "9",
        shopName: "Yangon Tea House",
        neighborhood: "Riverside",
        eta: "14 min",
        rating: 4.6,
        price: "$",
        pickupWindows: ["12:00", "12:20", "12:50"],
        note: "Sharper lime profile with more tomato and roasted sesame.",
      },
      {
        shopId: "8",
        shopName: "Silver Myanmar Kitchen",
        neighborhood: "Sathorn",
        eta: "15 min",
        rating: 4.5,
        price: "$",
        pickupWindows: ["12:10", "12:30", "13:00"],
        note: "Office-lunch version with extra cabbage and peanuts.",
      },
    ],
  },
  {
    id: "4",
    slug: "nan-gyi-thoke",
    name: "Nan Gyi Thoke",
    shopId: "4",
    shopName: "Ygn Noodle House",
    category: "Thick noodle salad",
    neighborhood: "Phrom Phong",
    eta: "21 min",
    rating: 4.9,
    price: "$$",
    description:
      "Thick round rice noodles dressed in chicken curry sauce, topped with fish cake, crispy onions, and herbs.",
    tags: ["noodle salad", "curry", "crowd favorite"],
    searchAliases: ["nan gyi thoke", "thick noodle salad", "burmese noodle salad"],
    vibe: "Dense, deeply savory, and the go-to late-night noodle for serious eaters.",
    chefNote:
      "Mix the noodles thoroughly so every strand is coated in curry sauce before your first bite.",
    pickupWindows: ["20:10", "20:40", "21:05"],
    heroImage: "https://plus.unsplash.com/premium_photo-1661661992703-089c9c981ab9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJ1cm1lc2UlMjBmb29kfGVufDB8fDB8fHww",
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 172, 172, 0.28), transparent 30%), linear-gradient(135deg, #1d1c28 0%, #4d2d47 45%, #b9514f 100%)",
    shopOffers: [
      {
        shopId: "4",
        shopName: "Ygn Noodle House",
        neighborhood: "Phrom Phong",
        eta: "21 min",
        rating: 4.9,
        price: "$$",
        pickupWindows: ["20:10", "20:40", "21:05"],
        note: "Late-night favorite with deeper curry sauce and crispy onions.",
      },
      {
        shopId: "7",
        shopName: "Maw Shan House",
        neighborhood: "Ekkamai",
        eta: "19 min",
        rating: 4.8,
        price: "$$",
        pickupWindows: ["18:45", "19:20", "19:50"],
        note: "Shan-leaning version with extra herbs and a brighter finish.",
      },
      {
        shopId: "1",
        shopName: "Golden Myanmar Kitchen",
        neighborhood: "Silom",
        eta: "18 min",
        rating: 4.7,
        price: "$$",
        pickupWindows: ["19:00", "19:30", "20:00"],
        note: "Smokier chicken curry dressing tuned for dinner pickup.",
      },
    ],
  },
  {
    id: "5",
    slug: "mont-di",
    name: "Mont Di",
    shopId: "6",
    shopName: "Burmese Kitchen",
    category: "Rice noodles",
    neighborhood: "Sathorn",
    eta: "16 min",
    rating: 4.8,
    price: "$",
    description:
      "Thin rice noodles in a light fish-based sauce topped with shredded chicken, crispy garlic, and fresh coriander.",
    tags: ["light", "rice noodles", "weekday"],
    searchAliases: ["mont di", "burmese rice noodle", "thin noodle fish sauce"],
    vibe: "Delicate, clean, and perfectly balanced for a quick midday reset.",
    chefNote:
      "Order extra crispy garlic on the side because it makes every bite better.",
    pickupWindows: ["12:05", "12:25", "12:55"],
    heroImage: "https://images.unsplash.com/photo-1709734545554-03f7c019627f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVybWVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    heroGradient:
      "radial-gradient(circle at top right, rgba(220, 245, 255, 0.34), transparent 33%), linear-gradient(135deg, #112737 0%, #23536f 45%, #5b91b1 100%)",
    shopOffers: [
      {
        shopId: "6",
        shopName: "Burmese Kitchen",
        neighborhood: "Sathorn",
        eta: "16 min",
        rating: 4.8,
        price: "$",
        pickupWindows: ["12:05", "12:25", "12:55"],
        note: "Cleanest fish sauce profile with extra crispy garlic.",
      },
      {
        shopId: "3",
        shopName: "Burmese Tea House",
        neighborhood: "Riverside",
        eta: "15 min",
        rating: 4.7,
        price: "$",
        pickupWindows: ["12:15", "12:45", "13:05"],
        note: "Tea-house lunch version with more chicken and coriander.",
      },
      {
        shopId: "1",
        shopName: "Golden Myanmar Kitchen",
        neighborhood: "Silom",
        eta: "17 min",
        rating: 4.6,
        price: "$",
        pickupWindows: ["11:50", "12:20", "12:50"],
        note: "Slightly richer sauce for office lunch pickups.",
      },
    ],
  },
  {
    id: "6",
    slug: "shan-khaut-swe",
    name: "Shan Khaut Swe",
    shopId: "7",
    shopName: "Maw Shan House",
    category: "Shan noodles",
    neighborhood: "Ekkamai",
    eta: "17 min",
    rating: 4.7,
    price: "$$",
    description:
      "Flat Shan-style rice noodles with minced pork, tomato-based sauce, pickled mustard greens, and chili oil.",
    tags: ["shan", "spicy", "shareable"],
    searchAliases: ["shan noodles", "shan khaut swe", "shan style noodle"],
    vibe: "Bold, tangy, and the most distinctive regional noodle in Burmese cuisine.",
    chefNote:
      "Go light on the chili oil first because it builds more heat than you expect.",
    pickupWindows: ["19:00", "19:30", "20:00"],
    heroImage: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&auto=format&fit=crop&q=60",
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 208, 170, 0.34), transparent 34%), linear-gradient(135deg, #30130d 0%, #83361d 50%, #f17b3f 100%)",
    shopOffers: [
      {
        shopId: "7",
        shopName: "Maw Shan House",
        neighborhood: "Ekkamai",
        eta: "17 min",
        rating: 4.7,
        price: "$$",
        pickupWindows: ["19:00", "19:30", "20:00"],
        note: "Regional Shan version with sharper tomato sauce and mustard greens.",
      },
      {
        shopId: "4",
        shopName: "Ygn Noodle House",
        neighborhood: "Phrom Phong",
        eta: "18 min",
        rating: 4.7,
        price: "$$",
        pickupWindows: ["18:20", "18:50", "19:20"],
        note: "Rounder, meatier bowl with extra minced pork and chili oil.",
      },
      {
        shopId: "9",
        shopName: "Yangon Tea House",
        neighborhood: "Riverside",
        eta: "20 min",
        rating: 4.5,
        price: "$$",
        pickupWindows: ["19:10", "19:40", "20:10"],
        note: "Tea-house twist with more herbs and less aggressive heat.",
      },
    ],
  },
];

function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}

function parseEtaMinutes(eta: string) {
  return Number.parseInt(eta, 10) || 0;
}

function getBiteSearchScore(bite: BiteVenue, query: string) {
  const normalizedTags = bite.tags.map(normalizeQuery);
  const normalizedAliases = bite.searchAliases.map(normalizeQuery);
  const normalizedName = normalizeQuery(bite.name);
  const normalizedSlug = normalizeQuery(bite.slug);
  const normalizedOfferShopNames = bite.shopOffers.map((offer) =>
    normalizeQuery(offer.shopName),
  );
  const normalizedOfferNeighborhoods = bite.shopOffers.map((offer) =>
    normalizeQuery(offer.neighborhood),
  );
  const normalizedOfferNotes = bite.shopOffers.map((offer) =>
    normalizeQuery(offer.note),
  );
  const contextualText = normalizeQuery(
    [
      bite.category,
      bite.vibe,
      bite.description,
      bite.chefNote,
      ...normalizedOfferNeighborhoods,
      ...normalizedOfferNotes,
    ].join(" "),
  );
  const searchTokens = query.split(/\s+/).filter(Boolean);

  let score = 0;

  if (normalizedName === query) score += 160;
  if (normalizedOfferShopNames.includes(query)) score += 150;
  if (normalizedSlug === query) score += 140;
  if (bite.category.toLowerCase() === query) score += 135;
  if (normalizedTags.includes(query)) score += 130;
  if (normalizedAliases.includes(query)) score += 120;

  if (normalizedName.startsWith(query)) score += 95;
  if (normalizedOfferShopNames.some((name) => name.startsWith(query))) score += 85;
  if (bite.category.toLowerCase().startsWith(query)) score += 82;
  if (normalizedAliases.some((alias) => alias.startsWith(query))) score += 80;

  if (normalizedName.includes(query)) score += 70;
  if (normalizedOfferShopNames.some((name) => name.includes(query))) score += 65;
  if (normalizedSlug.includes(query)) score += 60;
  if (normalizedTags.some((tag) => tag.includes(query))) score += 55;
  if (normalizedAliases.some((alias) => alias.includes(query))) score += 50;
  if (contextualText.includes(query)) score += 24;

  if (
    searchTokens.length > 1 &&
    searchTokens.every((token) =>
      [
        normalizedName,
        normalizedSlug,
        bite.category.toLowerCase(),
        ...normalizedTags,
        ...normalizedAliases,
        ...normalizedOfferShopNames,
        contextualText,
      ].some((field) => field.includes(token)),
    )
  ) {
    score += 36;
  }

  return score;
}

export async function getFeaturedBites() {
  return bites.slice(0, 4);
}

export async function getAllBites(query = "") {
  const normalizedQuery = normalizeQuery(query);

  if (!normalizedQuery) {
    return bites;
  }

  return bites
    .map((bite) => ({
      bite,
      score: getBiteSearchScore(bite, normalizedQuery),
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        right.bite.shopOffers.length - left.bite.shopOffers.length ||
        right.bite.rating - left.bite.rating ||
        parseEtaMinutes(left.bite.eta) - parseEtaMinutes(right.bite.eta),
    )
    .map((entry) => entry.bite);
}

export async function getBiteBySlug(slug: string) {
  return bites.find((bite) => bite.slug === slug);
}

export async function getBitesForShop(shopId: string) {
  return bites.filter((bite) =>
    bite.shopOffers.some((offer) => offer.shopId === shopId),
  );
}

export async function getPopularBites(limit = 3) {
  return [...bites]
    .sort(
      (left, right) =>
        right.shopOffers.length - left.shopOffers.length ||
        right.rating - left.rating ||
        parseEtaMinutes(left.eta) - parseEtaMinutes(right.eta),
    )
    .slice(0, Math.max(1, limit));
}

export async function getTrendingBiteSearches(limit = 6) {
  const popularBites = await getPopularBites(4);

  return Array.from(
    new Set(
      popularBites.flatMap((bite) => [
        bite.name,
        bite.category,
        bite.searchAliases[0],
        bite.shopOffers[0]?.shopName,
        bite.slug,
      ]),
    ),
  )
    .filter(Boolean)
    .slice(0, Math.max(1, limit));
}

export async function getBiteCategories(limit = 6) {
  const categories = new Map<string, BiteCategorySearch>();

  for (const bite of bites) {
    if (categories.has(bite.category)) {
      continue;
    }

    categories.set(bite.category, {
      id: bite.id,
      label: bite.category,
      query: bite.category,
      heroImage: bite.heroImage,
    });
  }

  return Array.from(categories.values()).slice(0, Math.max(1, limit));
}

export async function getBurbiteStats() {
  return {
    liveDrops: bites.length,
    averageEta: "17m",
    tonightSlots: bites.reduce(
      (total, bite) =>
        total +
        bite.shopOffers.reduce(
          (offerTotal, offer) => offerTotal + offer.pickupWindows.length,
          0,
        ),
      0,
    ),
  };
}
