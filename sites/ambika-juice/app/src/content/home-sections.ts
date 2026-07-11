import type { MediaAsset } from "./types.ts";

export interface HomeMedia extends MediaAsset { type: "image" | "video"; }
export interface HomeSection {
  order: number;
  id: string;
  kind: "hero" | "editorial" | "media" | "campaign" | "origin" | "press" | "category";
  theme: "paper" | "dark";
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: string;
  href?: string;
  orientation?: "left" | "right";
  media?: HomeMedia[];
}

const image = (src: string, alt: string): HomeMedia => ({ src, alt, type: "image", provenance: "generated" });
const hero = image("/images/ambika/hero-juice-maker.png", "Fresh mango juice poured at a Pokhara fruit counter");
const drinks = image("/images/ambika/signature-drinks.png", "Mango, avocado and watermelon drinks");
const sugarcane = image("/images/ambika/sugarcane-press.png", "Fresh sugarcane juice being pressed");
const visit = image("/images/ambika/visit-counter.png", "Customers visiting a neighbourhood juice counter in Pokhara");
const directions = "https://www.google.com/maps/search/?api=1&query=Ambika+Juice+Rastra+Bank+Chowk+Pokhara";

export const homeSections: HomeSection[] = [
  { order: 1, id: "pokhara-poured-fresh", kind: "hero", theme: "dark", title: "Pokhara, Poured Fresh", body: "Fresh fruit, blended and pressed to order at Rastra Bank Chowk.", cta: "Visit Us", href: directions, media: [hero] },
  { order: 2, id: "mango-season", kind: "editorial", theme: "paper", eyebrow: "Seasonal Favourite", title: "Mango Season", body: "Ripe mango, a cold glass, and nothing unnecessary. The simplest drinks are often the best.", cta: "See Fresh Juices", href: "/collections/fresh-juices", orientation: "left", media: [drinks] },
  { order: 3, id: "fruit-to-glass", kind: "media", theme: "dark", title: "Fruit To Glass", body: "Choose from the counter. We prepare it while you wait.", cta: "Explore The Menu", href: "/pages/menu", media: [hero] },
  { order: 4, id: "creamy-avocado", kind: "editorial", theme: "paper", eyebrow: "Ambika Favourite", title: "Creamy Avocado", body: "Thick, cool and unmistakably green—one of the drinks people come back for.", cta: "View Smoothies", href: "/collections/smoothies", orientation: "right", media: [drinks] },
  { order: 5, id: "pressed-now", kind: "media", theme: "dark", title: "Pressed Now", body: "Sugarcane and lime made for the heat of the day.", cta: "See Refreshers", href: "/collections/refreshers", media: [sugarcane] },
  { order: 6, id: "lassi-fruit", kind: "campaign", theme: "paper", title: "Lassi / Fresh Fruit", cta: "Explore", href: "/pages/menu", media: [drinks, visit] },
  { order: 7, id: "cool-down", kind: "media", theme: "dark", title: "Cool Down", body: "Bright fruit, plenty of ice, and a pause from the Pokhara sun.", cta: "Find Ambika", href: directions, media: [hero] },
  { order: 8, id: "neighbourhood-counter", kind: "editorial", theme: "paper", eyebrow: "Rastra Bank Chowk", title: "Your Neighbourhood Counter", body: "A straightforward place for fresh drinks, familiar favourites and a friendly welcome.", cta: "Our Story", href: "/pages/our-story", orientation: "left", media: [visit] },
  { order: 9, id: "nimbu-pani", kind: "media", theme: "dark", title: "Nimbu Pani", body: "Fresh lime and a balanced touch of sweetness.", cta: "View Refreshers", href: "/collections/refreshers", media: [sugarcane] },
  { order: 10, id: "smoothies-shakes", kind: "campaign", theme: "paper", title: "Smoothies / Milkshakes", cta: "Explore", href: "/pages/menu", media: [drinks, hero] },
  { order: 11, id: "signature-drinks", kind: "origin", theme: "dark", title: "Signature Drinks", cta: "View Menu", href: "/pages/menu", media: [drinks, drinks, drinks] },
  { order: 12, id: "made-while-you-wait", kind: "editorial", theme: "paper", eyebrow: "Freshly Prepared", title: "Made While You Wait", body: "Good fruit does the talking. Every drink starts at the counter and ends in your glass.", cta: "See The Full Menu", href: "/pages/menu", orientation: "right", media: [hero] },
  { order: 13, id: "pokhara-favourite", kind: "media", theme: "dark", title: "A Pokhara Favourite", body: "A small counter with a big menu and a steady stream of regulars.", cta: "Get Directions", href: directions, media: [visit] },
  { order: 14, id: "choose-your-fruit", kind: "editorial", theme: "paper", eyebrow: "At The Counter", title: "Choose Your Fruit", body: "Mango, pineapple, watermelon, avocado, citrus and more—availability follows the season.", cta: "Browse Juices", href: "/collections/fresh-juices", orientation: "left", media: [visit] },
  { order: 15, id: "house-specials", kind: "campaign", theme: "paper", title: "Milky Way / Tutty Frutty", cta: "House Specials", href: "/collections/house-specials", media: [drinks, drinks] },
  { order: 16, id: "damside-days", kind: "media", theme: "dark", title: "Damside Days", body: "Drop in before the lake, after errands, or whenever the day calls for something cold.", cta: "Visit Ambika", href: directions, media: [sugarcane] },
  { order: 17, id: "visit", kind: "editorial", theme: "paper", eyebrow: "Pokhara 33700", title: "Come Visit Us", body: "Find Ambika Juice at Rastra Bank Chowk on Damside Marg. Open daily from 10:00 AM to 7:30 PM.", cta: "Get Directions", href: directions, orientation: "right", media: [visit] },
  { order: 18, id: "fresh-every-day", kind: "media", theme: "dark", title: "Fresh Every Day", body: "Seasonal fruit, familiar recipes and drinks made one at a time.", cta: "Call Ambika", href: "tel:+9779804172590", media: [hero] },
  { order: 19, id: "ambika-strip", kind: "press", theme: "paper", title: "Ambika Juice", media: [hero, drinks, sugarcane, visit] },
  { order: 20, id: "category-band", kind: "category", theme: "dark", title: "Explore The Menu" },
];
