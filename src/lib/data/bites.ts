export type BiteVenue = {
  slug: string;
  name: string;
  category: string;
  neighborhood: string;
  eta: string;
  rating: number;
  price: "$" | "$$" | "$$$";
  description: string;
  tags: string[];
  vibe: string;
  chefNote: string;
  pickupWindows: string[];
  heroGradient: string;
};

const bites: BiteVenue[] = [
  {
    slug: "ember-bowl-club",
    name: "Ember Bowl Club",
    category: "Fire-grilled bowls",
    neighborhood: "Silom",
    eta: "14 min",
    rating: 4.9,
    price: "$$",
    description:
      "Charred rice bowls with short rib glaze, green chili crunch, and citrus herbs.",
    tags: ["charred", "protein-heavy", "late lunch"],
    vibe: "Fast grill energy with a polished office-lunch finish.",
    chefNote:
      "Order the smoked mushroom add-on if you want a sharper umami finish.",
    pickupWindows: ["12:10", "12:30", "13:00"],
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 185, 141, 0.45), transparent 36%), linear-gradient(135deg, #251610 0%, #6b341f 45%, #d56c3d 100%)",
  },
  {
    slug: "river-lantern-kitchen",
    name: "River Lantern Kitchen",
    category: "Broth + noodles",
    neighborhood: "Riverside",
    eta: "18 min",
    rating: 4.8,
    price: "$$",
    description:
      "Deep chicken broth, silky noodles, and bright herb bundles built for dinner runs.",
    tags: ["broth", "comfort", "night feed"],
    vibe: "Calmer, slower, and ideal for rainy-night comfort ordering.",
    chefNote:
      "The broth lands richer after a five-minute rest, so don’t rush the first sip.",
    pickupWindows: ["18:15", "18:45", "19:10"],
    heroGradient:
      "radial-gradient(circle at top right, rgba(200, 255, 225, 0.3), transparent 34%), linear-gradient(135deg, #163025 0%, #22583f 50%, #5ba16e 100%)",
  },
  {
    slug: "citrus-alley-wraps",
    name: "Citrus Alley Wraps",
    category: "Wraps + salads",
    neighborhood: "Ari",
    eta: "11 min",
    rating: 4.7,
    price: "$",
    description:
      "Bright wraps stacked with mint, grilled chicken, and tangy tamarind dressing.",
    tags: ["fresh", "quick", "office"],
    vibe: "Light, zippy, and perfect when you want speed without fast-food energy.",
    chefNote:
      "Ask for the extra pickled shallots if you want more bite in the wrap.",
    pickupWindows: ["11:40", "12:00", "12:20", "12:40"],
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 235, 159, 0.38), transparent 36%), linear-gradient(135deg, #4f3414 0%, #9d6d18 50%, #f0b74b 100%)",
  },
  {
    slug: "night-noodle-club",
    name: "Night Noodle Club",
    category: "Late-night noodles",
    neighborhood: "Phrom Phong",
    eta: "21 min",
    rating: 4.9,
    price: "$$",
    description:
      "Peppery dry noodles with seared pork, soft eggs, and chili vinegar on the side.",
    tags: ["late-night", "peppery", "crowd favorite"],
    vibe: "Dense, smoky, and tuned for after-dark cravings.",
    chefNote:
      "Mix the bowl once, then add the chili vinegar in small hits so the pepper stays balanced.",
    pickupWindows: ["20:10", "20:40", "21:05"],
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 172, 172, 0.28), transparent 30%), linear-gradient(135deg, #1d1c28 0%, #4d2d47 45%, #b9514f 100%)",
  },
  {
    slug: "miso-market-bento",
    name: "Miso Market Bento",
    category: "Bento sets",
    neighborhood: "Sathorn",
    eta: "16 min",
    rating: 4.8,
    price: "$$",
    description:
      "Compact bento drops with miso salmon, sesame greens, and tamago on rotation.",
    tags: ["balanced", "boxed", "weekday"],
    vibe: "Neat, composed, and built for repeat weekday orders.",
    chefNote:
      "The bento sells out first around 12:30, so earlier pickups usually win.",
    pickupWindows: ["12:05", "12:25", "12:55"],
    heroGradient:
      "radial-gradient(circle at top right, rgba(220, 245, 255, 0.34), transparent 33%), linear-gradient(135deg, #112737 0%, #23536f 45%, #5b91b1 100%)",
  },
  {
    slug: "seoul-sizzle-tacos",
    name: "Seoul Sizzle Tacos",
    category: "Fusion tacos",
    neighborhood: "Ekkamai",
    eta: "17 min",
    rating: 4.6,
    price: "$$",
    description:
      "Korean-marinated meat, sharp slaw, and toasted tortillas with real crunch.",
    tags: ["fusion", "spicy", "shareable"],
    vibe: "Louder flavors, bigger textures, and the best pick for group ordering.",
    chefNote:
      "Go half spicy if you want the kimchi butter to stay forward instead of the heat.",
    pickupWindows: ["19:00", "19:30", "20:00"],
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 208, 170, 0.34), transparent 34%), linear-gradient(135deg, #30130d 0%, #83361d 50%, #f17b3f 100%)",
  },
];

export async function getFeaturedBites() {
  return bites.slice(0, 4);
}

export async function getAllBites(query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return bites;
  }

  return bites.filter((bite) =>
    [bite.name, bite.category, bite.neighborhood, bite.vibe, ...bite.tags]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );
}

export async function getBiteBySlug(slug: string) {
  return bites.find((bite) => bite.slug === slug);
}

export async function getBurbiteStats() {
  return {
    liveDrops: bites.length,
    averageEta: "17m",
    tonightSlots: bites.reduce(
      (total, bite) => total + bite.pickupWindows.length,
      0,
    ),
  };
}
