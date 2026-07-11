export type LiveDemoRecord = {
  slug: string;
  name: string;
  category: string;
  description: string;
  url: string;
  screenshotFile: string;
  screenshotAlt: string;
};

function projectUrl(value: string): string {
  if (!value.startsWith("https://")) {
    throw new Error(`Project URL must use https:// — received "${value}"`);
  }
  return value;
}

export const liveDemoRecords: LiveDemoRecord[] = [
  {
    slug: "americana-grill",
    name: "Americana Grill",
    category: "Restaurant · American Diner",
    description: "Ruby's-inspired Pokhara diner with on-site cart and WhatsApp order handoff.",
    url: projectUrl(
      "https://americana-grill-3l4n4y23x-jeremys-projects-379e354f.vercel.app"
    ),
    screenshotFile: "americana-grill-desktop.png",
    screenshotAlt: "Americana Grill homepage with hero carousel and diner menu categories."
  },
  {
    slug: "san-chon",
    name: "San Chon",
    category: "Restaurant · Korean",
    description: "COTE-structured Korean dining site for Lakeside Pokhara with calm editorial motion.",
    url: projectUrl(
      "https://san-chon-6s5kof8zg-jeremys-projects-379e354f.vercel.app"
    ),
    screenshotFile: "san-chon-desktop.png",
    screenshotAlt: "San Chon Korean restaurant homepage with dark hero and reservation call to action."
  },
  {
    slug: "dorjes",
    name: "Dorje's Resort & Spa",
    category: "Hospitality · Boutique Resort",
    description: "Aman-inspired eco-luxury resort storytelling for Phewa Lake views and curated stays.",
    url: projectUrl(
      "https://dorjes-k2ow015ll-jeremys-projects-379e354f.vercel.app"
    ),
    screenshotFile: "dorjes-desktop.png",
    screenshotAlt: "Dorje's Resort homepage with lake-view hero and editorial accommodation story."
  },
  {
    slug: "the-juicery-cafe",
    name: "The Juicery Cafe",
    category: "Cafe · Farm-to-Table",
    description: "Gymkhana-structured juice and brunch site with sunlit North Lakeside personality.",
    url: projectUrl(
      "https://the-juicery-cafe-pkv2i8edm-jeremys-projects-379e354f.vercel.app"
    ),
    screenshotFile: "the-juicery-cafe-desktop.png",
    screenshotAlt: "The Juicery Cafe homepage with green hero and cold-pressed juice story."
  },
  {
    slug: "avya-club",
    name: "Avya Club",
    category: "Fitness · Wellbeing Club",
    description: "Republic-inspired fitness, recovery, and membership site for Pokhara's Avya Club.",
    url: projectUrl(
      "https://avya-club-fjmwlb1ev-jeremys-projects-379e354f.vercel.app"
    ),
    screenshotFile: "avya-club-desktop.png",
    screenshotAlt: "Avya Club homepage with full-bleed fitness imagery and membership pathways."
  }
];

export const liveDemoCount = liveDemoRecords.length;
