import type { MediaAsset } from "./types.ts";

export interface HomeMedia extends MediaAsset {
  type: "image" | "video";
}

export interface HomeSection {
  order: number;
  id: string;
  kind: "hero" | "editorial" | "media" | "campaign" | "origin" | "press";
  theme: "paper" | "dark";
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: string;
  href?: string;
  orientation?: "left" | "right";
  media?: HomeMedia[];
}

const image = (src: string, alt: string): HomeMedia => ({ src, alt, type: "image", provenance: "reference-only" });
const video = (src: string, alt: string): HomeMedia => ({ src, alt, type: "video", provenance: "reference-only" });

export const homeSections: HomeSection[] = [
  {
    order: 1, id: "pilgrimage", kind: "hero", theme: "dark", title: "Join Our Pilgrimage",
    body: "Join us in seeking quality, truth and accountability in coffee. Together, we journey to find the finest and most unique coffees in the world.",
    cta: "Explore Offerings", href: "/collections/coffee",
    media: [video("https://cdn.shopify.com/videos/c/o/v/a7564b2dffc24f918e304b759c42f318.mp4", "Coffee producers walking through a green farm")],
  },
  {
    order: 2, id: "suke-quto", kind: "editorial", theme: "paper", eyebrow: "Current Offering", title: "Decaf Ethiopia Suke Quto",
    body: "Apple | Baker's Chocolate | Orange | Silky", cta: "Explore This Offering", href: "/products/decaf-ethiopia-suke-quto-26", orientation: "left",
    media: [image("https://product.onyxcontent.com/media/pages/ecom/home/043850a321-1780544053/ethiopia-offering.webp", "Decaf Ethiopia Suke Quto package")],
  },
  {
    order: 3, id: "preserve", kind: "media", theme: "dark", title: "Onyx At The Preserve",
    body: "World-class coffee, thoughtful design, vibrant food, and intentional hospitality come together in a new way.", cta: "Explore The Concept", href: "/pages/locations",
    media: [video("https://product.onyxcontent.com/media/pages/ecom/home/fcbf3059e5-1780935186/preservebanneronyxhomepage-1-1-1.mp4", "Onyx at The Preserve")],
  },
  {
    order: 4, id: "cafe-expressions", kind: "editorial", theme: "paper", eyebrow: "Finished Beverages", title: "Cafe Expressions",
    body: "A curated line of finished beverages crafted with the same care, precision, and standards that define Onyx's cafes.", cta: "Learn More", href: "/products/cafe-expressions", orientation: "right",
    media: [video("https://product.onyxcontent.com/media/pages/ecom/home/b8b0b50bb8-1783090328/trimmed-expressions.mp4", "Cafe Expressions bottles")],
  },
  {
    order: 5, id: "subscribe", kind: "media", theme: "dark", title: "Subscribe & Save",
    body: "Each roast is tracked, cupped, and published, ensuring consistency and excellence with every batch.", cta: "Explore Coffee Subscriptions", href: "/pages/subscribe",
    media: [video("https://product.onyxcontent.com/media/pages/ecom/home/cfa1f1e98e-1780544048/colombiabrewinghomepagevideo.mp4", "Coffee brewing in close detail")],
  },
  {
    order: 6, id: "classes-summer", kind: "campaign", theme: "paper", title: "Classes / Summer Menu", cta: "See Our Cafes", href: "/pages/locations",
    media: [
      video("https://product.onyxcontent.com/media/pages/ecom/home/d127e8758e-1780544045/classes.web.mp4", "Onyx beverage class"),
      video("https://product.onyxcontent.com/media/pages/ecom/home/34c33bf18d-1780588194/summermenu.mp4", "Onyx summer menu"),
    ],
  },
  {
    order: 7, id: "usa-cycling", kind: "media", theme: "dark", title: "USA Cycling",
    body: "A partnership built to wake the senses without demanding anything in return—an unspoken pact between ambition and calm.", cta: "Explore The Collab", href: "/products/usa-cycling",
    media: [video("https://product.onyxcontent.com/media/pages/ecom/home/a59b204bab-1780544086/usa-background.mp4", "USA Cycling collaboration")],
  },
  {
    order: 8, id: "producer-spotlight", kind: "editorial", theme: "paper", eyebrow: "Producer Spotlight", title: "Julio Andrés Quiceno",
    body: "Cultivating and processing distinguished varietals across three farms in Colombia.", cta: "Explore The Offering", href: "/products/colombia-la-riviera-sudan-rume-26", orientation: "left",
    media: [image("https://product.onyxcontent.com/media/pages/ecom/home/139dcc6d9a-1780544065/julio-andres-quiceno.jpg", "Julio Andrés Quiceno")],
  },
  {
    order: 9, id: "circadian", kind: "media", theme: "dark", title: "Circadian",
    body: "Good coffee should be something you can take through your day. Find your rhythm and explore Circadian.", cta: "Explore Circadian", href: "/products/circadian",
    media: [image("https://product.onyxcontent.com/media/pages/ecom/home/621d983ed3-1780544045/circadian-homepage-1.webp", "Circadian campaign")],
  },
  {
    order: 10, id: "coffee-wholesale", kind: "campaign", theme: "paper", title: "Explore Our Coffee / Wholesale", cta: "Learn More", href: "/pages/wholesale",
    media: [
      video("https://product.onyxcontent.com/media/pages/ecom/home/09cf7bb202-1781882517/webcoffee_v6_smol.mp4", "Roasted coffee offerings"),
      video("https://product.onyxcontent.com/media/pages/ecom/home/b823d0ebf9-1780544087/wholesale-video.mp4", "Onyx wholesale hospitality"),
    ],
  },
  {
    order: 11, id: "summer-offerings", kind: "media", theme: "dark", title: "Summer Offerings",
    body: "Latest offerings from around the world, brought straight to you.", cta: "Learn More", href: "/collections/coffee",
    media: [video("https://product.onyxcontent.com/media/pages/ecom/home/224fcadae6-1780544070/new.mp4", "Summer coffee offerings")],
  },
  {
    order: 12, id: "origins", kind: "origin", theme: "dark", title: "Explore By Origin", cta: "View Coffees", href: "/collections/coffee",
    media: [
      video("https://product.onyxcontent.com/media/pages/ecom/home/4108535e73-1780544059/honduras-fill.mp4", "Peru coffee landscape"),
      video("https://product.onyxcontent.com/media/pages/ecom/home/cb45055b2c-1780544046/colombia-10.mp4", "Ecuador coffee landscape"),
      image("https://product.onyxcontent.com/media/pages/ecom/home/139dcc6d9a-1780544065/julio-andres-quiceno.jpg", "Colombia coffee producer")
    ],
  },
  {
    order: 13, id: "awards", kind: "editorial", theme: "paper", eyebrow: "Recognition", title: "James Beard Awards Finalist",
    body: "At its core, this recognition is about hospitality and the care extended to every guest.", cta: "Learn More", href: "/pages/our-story", orientation: "right",
    media: [video("https://product.onyxcontent.com/media/pages/ecom/home/8fa9855ccf-1780544060/hqfootage.mp4", "Onyx hospitality at Rogers HQ")],
  },
  {
    order: 14, id: "most-awarded", kind: "media", theme: "dark", title: "The Most Awarded Coffee Roaster",
    body: "A record of competition, craft, design and hospitality since 2012.", cta: "Our Story", href: "/pages/our-story",
    media: [image("https://onyxcoffeelab.com/cdn/shop/t/31/assets/most-awarded.svg?v=108443281618992592451742949812", "The most awarded coffee roaster")],
  },
  {
    order: 15, id: "red", kind: "editorial", theme: "paper", eyebrow: "Partnership", title: "(Onyx) Red",
    body: "Everyday things can and should do powerful good.", cta: "Explore (Onyx) Red", href: "/collections/red", orientation: "left",
    media: [image("https://product.onyxcontent.com/media/pages/ecom/home/8ad943542a-1780544076/red-squareoption.webp", "Onyx RED coffee and box")],
  },
  {
    order: 16, id: "merch-matcha", kind: "campaign", theme: "paper", title: "New Merch / Specialty Matcha", cta: "Explore", href: "/collections/all-merch",
    media: [
      image("https://product.onyxcontent.com/media/pages/ecom/home/aadd7a2b26-1780544067/merch-cover-new.jpg", "Onyx merchandise"),
      image("https://product.onyxcontent.com/media/pages/ecom/home/82b25c05d6-1780544066/matcha-homepage.webp", "Onyx specialty matcha"),
    ],
  },
  {
    order: 17, id: "doyenne", kind: "media", theme: "dark", title: "Doyenne",
    body: "As Doyenne grows, we invite you to be part of this new chapter.", cta: "Order Now", href: "/collections/doyenne",
    media: [image("https://product.onyxcontent.com/media/pages/ecom/home/424bc4945f-1780544051/doyenne-3.webp", "Doyenne campaign")],
  },
  {
    order: 18, id: "visit", kind: "editorial", theme: "paper", eyebrow: "Northwest Arkansas", title: "Come Visit Us",
    body: "Our community is at the heart of what we do. See cafe hours, explore the menu, and make plans to come see us.", cta: "Our Locations", href: "/pages/locations", orientation: "right",
    media: [image("https://product.onyxcontent.com/media/pages/ecom/home/2fffa54e9c-1783090761/cafe-po.webp", "Onyx cafe interior")],
  },
  {
    order: 19, id: "b-corp", kind: "media", theme: "dark", title: "We Are A Certified B-Corp",
    body: "A statement of how we work: social and environmental performance, transparency, and accountability.", cta: "See Our Certification", href: "/pages/our-story",
    media: [image("https://product.onyxcontent.com/media/pages/ecom/home/9f7ebcff3b-1780544045/certified-b-corp.webp", "Onyx B Corp campaign")],
  },
  {
    order: 20, id: "press", kind: "press", theme: "paper", title: "In The Press",
    media: [
      image("https://product.onyxcontent.com/media/pages/ecom/home/a00768816e-1780544070/nyt-logo-01.webp", "The New York Times"),
      image("https://product.onyxcontent.com/media/pages/ecom/home/bf8dc345ae-1780544042/bon-appetit-logo-01.webp", "Bon Appetit"),
      image("https://product.onyxcontent.com/media/pages/ecom/home/c53c799a48-1780544066/logo-gear-patrol.webp", "Gear Patrol"),
      image("https://product.onyxcontent.com/media/pages/ecom/home/833717b3ba-1780544054/food-and-wine-logo-01.webp", "Food and Wine"),
    ],
  },
];
