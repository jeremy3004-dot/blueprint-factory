import type { Experience, Favorite, MenuSection, NavItem } from "@/types/site";

export const site = {
  name: "San Chon",
  koreanName: "산촌다람쥐",
  category: "Korean Restaurant",
  phoneDisplay: "+977 982-4147894",
  phoneHref: "tel:+9779824147894",
  address: "Street 16, Lakeside, Pokhara 33700, Nepal",
  shortAddress: "Street 16, Lakeside · Pokhara",
  hours: "Daily, 12–10 PM",
  hoursQualifier: "Hours are listed online; please confirm on Instagram before traveling.",
  instagram: "https://www.instagram.com/san_chon_korean_restaurant/",
  directions:
    "https://www.google.com/maps/search/?api=1&query=San+Chon+Korean+Food+Pokhara",
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Experience", href: "/#experience" },
  { label: "Visit", href: "/visit" },
];

export const favorites: Favorite[] = [
  {
    eyebrow: "Tabletop fire",
    title: "Pork Belly BBQ",
    description:
      "A shared grill, crisp edges, lettuce wraps, and banchan—the meal guests most often describe as the San Chon ritual.",
    image: "/images/grill-fire.png",
    imagePosition: "72% center",
  },
  {
    eyebrow: "Warm bowls",
    title: "Bibimbap & Rice",
    description:
      "Colorful vegetables, rice, egg, sesame, and gochujang brought together at the table.",
    image: "/images/menu-spread.png",
    imagePosition: "50% 58%",
  },
  {
    eyebrow: "Made to share",
    title: "Gimbap & Banchan",
    description:
      "Mixed rolls and small dishes create the variety, freshness, and easy pace of a Korean table.",
    image: "/images/shared-feast.png",
    imagePosition: "73% 24%",
  },
  {
    eyebrow: "Sweet heat",
    title: "Tteokbokki & Chicken",
    description:
      "Chewy rice cakes and sweet-spicy chicken bring the bright, warming side of the menu.",
    image: "/images/menu-spread.png",
    imagePosition: "83% 60%",
  },
];

export const experiences: Experience[] = [
  {
    id: "grill",
    eyebrow: "Cook together",
    title: "At the Grill",
    description:
      "Tabletop barbecue turns dinner into something shared. The team can guide first-time guests through the grill, wraps, sauces, and banchan.",
  },
  {
    id: "staples",
    eyebrow: "Familiar comfort",
    title: "Korean Staples",
    description:
      "Public menus and reviews point to bibimbap, gimbap, kimchi dishes, noodles, tteokbokki, and the small sides that make the table feel complete.",
  },
  {
    id: "hospitality",
    eyebrow: "Room to exhale",
    title: "Warm Hospitality",
    description:
      "A spacious, calm dining room and a small reading corner make San Chon an easy place to slow down after Lakeside or a trek.",
  },
];

export const menuSections: MenuSection[] = [
  {
    id: "grill",
    eyebrow: "불 · Fire",
    title: "At the Grill",
    note: "Tabletop dishes are made for sharing. Ask the team what is available today.",
    items: [
      { name: "Pork Belly BBQ", description: "Pork belly for the tabletop grill with wrap greens and small sides." },
      { name: "Bulgogi", description: "Marinated meat, cooked until caramelized and served for sharing." },
      { name: "Mushrooms & Grill Vegetables", description: "A simple companion to the barbecue." },
      { name: "Kimchi Soup", description: "A warming, savory soup repeatedly mentioned by guests." },
    ],
  },
  {
    id: "bowls",
    eyebrow: "밥 · Rice",
    title: "Bowls & Noodles",
    note: "A selection of publicly documented dishes, not a complete live menu.",
    items: [
      { name: "Bibimbap", description: "Rice, vegetables, egg, sesame, and gochujang mixed at the table." },
      { name: "Kimchi Fried Rice", description: "Fried rice with kimchi and a deeply savory finish." },
      { name: "Ramen with Egg", description: "A straightforward comforting noodle bowl." },
      { name: "Black Noodles", description: "Dark-sauced noodles listed among San Chon's Korean staples." },
    ],
  },
  {
    id: "share",
    eyebrow: "함께 · Together",
    title: "Small Plates & Sharing",
    note: "Availability changes; the team can help build a balanced table.",
    items: [
      { name: "Mixed Gimbap", description: "Rice rolls with vegetables and savory fillings." },
      { name: "Tteokbokki", description: "Chewy rice cakes in a glossy sweet-spicy sauce." },
      { name: "Sweet & Spicy Chicken", description: "Crisp chicken in a Korean-style sweet heat." },
      { name: "Banchan", description: "A changing set of small vegetable, pickle, and kimchi dishes." },
    ],
  },
];

export const proofPoints = [
  { number: "01", title: "Tabletop fire", text: "A meal that unfolds together, one grill at a time." },
  { number: "02", title: "A full Korean table", text: "Bowls, rolls, soups, kimchi, and changing banchan." },
  { number: "03", title: "Room to slow down", text: "A calm Lakeside dining room with a small reading corner." },
  { number: "04", title: "Easy to find", text: "Street 16, just off Lakeside in Pokhara." },
] as const;
