export type Shop = {
  id: string;
  slug: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: number;
  eta: string;
  neighborhood: string;
  open: boolean;
  openTime: string;
  closeTime: string;
  address: string;
  phone: string;
  description: string;
  specialties: string[];
  heroGradient: string;
};

const shops: Shop[] = [
  {
    id: "1",
    slug: "golden-myanmar-kitchen",
    name: "Golden Myanmar Kitchen",
    image:
      "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    reviewCount: 184,
    distance: 1.1,
    eta: "10 mins",
    neighborhood: "Silom",
    open: true,
    openTime: "07:00",
    closeTime: "22:00",
    address: "12 Pan Road, Silom, Bangkok",
    phone: "+66 2 110 4501",
    description:
      "Fast, polished Burmese comfort food built for office pickups and dinner runs.",
    specialties: ["mohinga", "nan gyi thoke", "mont di"],
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 207, 153, 0.4), transparent 34%), linear-gradient(135deg, #2f180f 0%, #7a351d 48%, #d77a43 100%)",
  },
  {
    id: "3",
    slug: "burmese-tea-house",
    name: "Burmese Tea House",
    image:
      "https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    reviewCount: 221,
    distance: 1.4,
    eta: "12 mins",
    neighborhood: "Riverside",
    open: true,
    openTime: "08:00",
    closeTime: "22:00",
    address: "44 Charoen Krung Soi 30, Riverside, Bangkok",
    phone: "+66 2 110 4503",
    description:
      "Tea-house calm with deeper broths, lighter noodles, and strong afternoon traffic.",
    specialties: ["ohn no khaut swe", "mont di", "mohinga"],
    heroGradient:
      "radial-gradient(circle at top right, rgba(205, 255, 232, 0.35), transparent 32%), linear-gradient(135deg, #0d2b24 0%, #1c5a49 48%, #58a07a 100%)",
  },
  {
    id: "5",
    slug: "mandalay-restaurant",
    name: "Mandalay Restaurant",
    image:
      "https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    reviewCount: 162,
    distance: 1.7,
    eta: "13 mins",
    neighborhood: "Ari",
    open: true,
    openTime: "10:30",
    closeTime: "22:00",
    address: "88 Ari Soi 2, Phaya Thai, Bangkok",
    phone: "+66 2 110 4505",
    description:
      "A bright daytime room known for fast salads, coconut soups, and clean lunch pacing.",
    specialties: ["laphet thoke", "ohn no khaut swe"],
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 235, 159, 0.34), transparent 34%), linear-gradient(135deg, #493011 0%, #8f6115 50%, #e6b34e 100%)",
  },
  {
    id: "4",
    slug: "ygn-noodle-house",
    name: "Ygn Noodle House",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.9,
    reviewCount: 267,
    distance: 2.1,
    eta: "14 mins",
    neighborhood: "Phrom Phong",
    open: true,
    openTime: "11:00",
    closeTime: "23:00",
    address: "6 Sukhumvit 39 Alley, Phrom Phong, Bangkok",
    phone: "+66 2 110 4504",
    description:
      "Late-night noodle specialist with heavier sauces, generous proteins, and fast dispatch.",
    specialties: ["nan gyi thoke", "shan khaut swe"],
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 178, 178, 0.28), transparent 30%), linear-gradient(135deg, #171621 0%, #4a2941 45%, #b44d4c 100%)",
  },
  {
    id: "6",
    slug: "burmese-kitchen",
    name: "Burmese Kitchen",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    reviewCount: 143,
    distance: 1.9,
    eta: "12 mins",
    neighborhood: "Sathorn",
    open: true,
    openTime: "09:00",
    closeTime: "23:00",
    address: "52 South Sathorn Road, Sathorn, Bangkok",
    phone: "+66 2 110 4506",
    description:
      "Reliable weekday kitchen with clean broths, boxed lunches, and steady pickup timing.",
    specialties: ["mont di", "ohn no khaut swe"],
    heroGradient:
      "radial-gradient(circle at top right, rgba(220, 245, 255, 0.34), transparent 33%), linear-gradient(135deg, #102433 0%, #24516a 45%, #5f8fae 100%)",
  },
  {
    id: "7",
    slug: "maw-shan-house",
    name: "Maw Shan House",
    image:
      "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    reviewCount: 171,
    distance: 2.4,
    eta: "15 mins",
    neighborhood: "Ekkamai",
    open: true,
    openTime: "11:30",
    closeTime: "23:00",
    address: "18 Ekkamai Soi 7, Ekkamai, Bangkok",
    phone: "+66 2 110 4507",
    description:
      "Regional Shan cooking with brighter herbs, spicier noodles, and punchy condiments.",
    specialties: ["shan khaut swe", "nan gyi thoke"],
    heroGradient:
      "radial-gradient(circle at top left, rgba(255, 208, 170, 0.34), transparent 34%), linear-gradient(135deg, #2a130d 0%, #7f341a 50%, #f17b3f 100%)",
  },
  {
    id: "8",
    slug: "silver-myanmar-kitchen",
    name: "Silver Myanmar Kitchen",
    image:
      "https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.6,
    reviewCount: 119,
    distance: 2.2,
    eta: "16 mins",
    neighborhood: "Sathorn",
    open: true,
    openTime: "07:30",
    closeTime: "21:00",
    address: "91 Naradhiwas Road, Sathorn, Bangkok",
    phone: "+66 2 110 4508",
    description:
      "Breakfast and lunch spot focused on quick Burmese staples for weekday commuters.",
    specialties: ["mohinga", "laphet thoke"],
    heroGradient:
      "radial-gradient(circle at top left, rgba(226, 230, 237, 0.4), transparent 34%), linear-gradient(135deg, #1b2430 0%, #3f4f63 45%, #8798b3 100%)",
  },
  {
    id: "9",
    slug: "yangon-tea-house",
    name: "Yangon Tea House",
    image:
      "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    reviewCount: 204,
    distance: 2.6,
    eta: "18 mins",
    neighborhood: "Riverside",
    open: true,
    openTime: "07:00",
    closeTime: "21:00",
    address: "120 Charoen Nakhon Road, Riverside, Bangkok",
    phone: "+66 2 110 4509",
    description:
      "Tea-led dining room with strong breakfast service and lighter Burmese classics.",
    specialties: ["mohinga", "laphet thoke", "shan khaut swe"],
    heroGradient:
      "radial-gradient(circle at top right, rgba(255, 241, 199, 0.35), transparent 34%), linear-gradient(135deg, #352417 0%, #705033 48%, #c89a62 100%)",
  },
];

export async function getShops() {
  return shops;
}

export async function getNearbyShops() {
  return shops.slice(0, 3);
}

export async function getShopById(id: string) {
  return shops.find((shop) => shop.id === id);
}

export async function getShopBySlug(slug: string) {
  return shops.find((shop) => shop.slug === slug);
}
