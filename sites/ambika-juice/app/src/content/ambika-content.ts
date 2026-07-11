import type { BusinessFacts, CatalogueCategory, CatalogueProduct, NavGroup, RouteRecord } from "./types.ts";

const directionsUrl = "https://www.google.com/maps/search/?api=1&query=Ambika+Juice+Rastra+Bank+Chowk+Pokhara";

export const businessFacts: BusinessFacts = {
  name: "Ambika Juice",
  phone: "+977 980-4172590",
  address: "Rastra Bank Chowk, Damside Marg, Pokhara 33700, Nepal",
  directionsUrl,
  hours: "Open daily · 10:00 AM–7:30 PM",
};

export const referenceCategories: CatalogueCategory[] = [
  { slug: "fresh-juices", name: "Fresh Juices", description: "Fruit pressed and blended to order." },
  { slug: "smoothies", name: "Smoothies", description: "Thick fruit blends served cold." },
  { slug: "lassi", name: "Lassi", description: "Cool, creamy yogurt drinks." },
  { slug: "milkshakes", name: "Milkshakes", description: "Classic chilled shakes." },
  { slug: "fruit-salads", name: "Fruit Salads", description: "Seasonal fruit cut fresh." },
  { slug: "house-specials", name: "House Specials", description: "Ambika favourites and signature combinations." },
  { slug: "refreshers", name: "Refreshers", description: "Lime, sugarcane and everyday coolers." },
];

const imageByCategory: Record<string, string> = {
  "fresh-juices": "/images/ambika/hero-juice-maker.png",
  smoothies: "/images/ambika/signature-drinks.png",
  lassi: "/images/ambika/signature-drinks.png",
  milkshakes: "/images/ambika/signature-drinks.png",
  "fruit-salads": "/images/ambika/visit-counter.png",
  "house-specials": "/images/ambika/hero-juice-maker.png",
  refreshers: "/images/ambika/sugarcane-press.png",
};

const product = (slug: string, name: string, category: string, description: string, tastingNotes: string[]): CatalogueProduct => ({
  slug,
  name,
  category,
  description,
  tastingNotes,
  media: { src: imageByCategory[category], alt: `${name} at Ambika Juice`, provenance: "generated" },
});

export const referenceProducts: CatalogueProduct[] = [
  product("mango-juice", "Mango Juice", "fresh-juices", "A bright seasonal mango blend, prepared fresh to order.", ["Mango", "Fresh", "Seasonal"]),
  product("pineapple-juice", "Pineapple Juice", "fresh-juices", "Fresh pineapple blended into a clean, tropical refresher.", ["Pineapple", "Bright", "Tropical"]),
  product("watermelon-juice", "Watermelon Juice", "fresh-juices", "Cool watermelon blended for hot Pokhara afternoons.", ["Watermelon", "Cooling", "Light"]),
  product("creamy-avocado", "Creamy Avocado", "smoothies", "A rich avocado blend with Ambika's famously creamy texture.", ["Avocado", "Creamy", "Rich"]),
  product("mixed-fruit-smoothie", "Mixed Fruit Smoothie", "smoothies", "A colourful blend of the best fruit on the counter that day.", ["Mixed fruit", "Thick", "Fresh"]),
  product("mango-lassi", "Mango Lassi", "lassi", "Mango and cool yogurt blended until silky.", ["Mango", "Yogurt", "Silky"]),
  product("sweet-lassi", "Sweet Lassi", "lassi", "A simple, cooling yogurt classic.", ["Yogurt", "Sweet", "Cooling"]),
  product("chocolate-milkshake", "Chocolate Milkshake", "milkshakes", "A familiar, chilled chocolate shake.", ["Chocolate", "Cold", "Creamy"]),
  product("fresh-fruit-salad", "Fresh Fruit Salad", "fruit-salads", "A generous bowl of seasonal fruit cut to order.", ["Seasonal", "Colourful", "Fresh-cut"]),
  product("milky-way", "Milky Way", "house-specials", "One of Ambika's well-known house combinations.", ["House special", "Creamy", "Cold"]),
  product("tutty-frutty", "Tutty Frutty", "house-specials", "A playful mixed-fruit house favourite.", ["Mixed fruit", "House special", "Colourful"]),
  product("house-special-lassi", "House Special Lassi", "house-specials", "Ambika's signature take on the classic lassi.", ["Yogurt", "Signature", "Refreshing"]),
  product("nimbu-pani", "Nimbu Pani", "refreshers", "Fresh lime, water and a balanced touch of sweetness.", ["Lime", "Citrus", "Refreshing"]),
  product("sugarcane-juice", "Sugarcane Juice", "refreshers", "Sugarcane pressed fresh and served cold.", ["Sugarcane", "Pressed", "Cold"]),
];

export const referenceRoutes: RouteRecord[] = [
  { path: "/", title: "Ambika Juice", family: "home" },
  ...referenceCategories.map((category) => ({ path: `/collections/${category.slug}`, title: category.name, family: "collection" as const })),
  ...referenceProducts.map((item) => ({ path: `/products/${item.slug}`, title: item.name, family: "product" as const })),
  { path: "/pages/menu", title: "Full Menu", family: "editorial" },
  { path: "/pages/our-story", title: "Our Story", family: "editorial" },
  { path: "/pages/gallery", title: "Gallery", family: "editorial" },
  { path: "/pages/visit", title: "Visit Ambika Juice", family: "editorial" },
  { path: "/pages/faq", title: "Frequently Asked Questions", family: "editorial" },
  { path: "/policies/privacy-policy", title: "Privacy Policy", family: "policy" },
  { path: "/policies/terms-of-service", title: "Terms of Use", family: "policy" },
];

export const referenceNavigation: NavGroup[] = [
  {
    label: "Menu",
    items: [
      { label: "Fresh Juices", href: "/collections/fresh-juices" },
      { label: "Smoothies", href: "/collections/smoothies" },
      { label: "Lassi", href: "/collections/lassi" },
      { label: "House Specials", href: "/collections/house-specials" },
    ],
  },
  {
    label: "Ambika",
    items: [
      { label: "Full Menu", href: "/pages/menu" },
      { label: "Our Story", href: "/pages/our-story" },
      { label: "Gallery", href: "/pages/gallery" },
      { label: "Visit Us", href: "/pages/visit" },
    ],
  },
];
