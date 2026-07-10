export type Room = {
  name: string;
  count: string;
  description: string;
  image: string;
  hero: string;
  href: string;
};

export type Story = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export const site = {
  name: "Dorje's Resort & Spa",
  shortName: "Dorje's",
  location: "Sedi Hills, Pokhara, Nepal",
  email: "info@dorjes.com",
  phone: "+977-9765653255",
  landline: "+977-61590735",
  booking: "https://dorjes.com/booking/",
  facebook: "https://www.facebook.com/dorjes/",
  instagram: "https://www.instagram.com/dorjesresortandspa/"
} as const;

export const rooms: Room[] = [
  {
    name: "Dorje Suite",
    count: "1 suite",
    description: "A separate sitting room and private outdoor patio open toward Phewa Lake, with a jetted bathtub and outdoor shower for a deeply private stay.",
    image: "/media/room-dorje.jpg",
    hero: "/media/room-dorje-hero.jpg",
    href: "https://dorjes.com/dorje-suite/"
  },
  {
    name: "Jen Suite",
    count: "1 suite",
    description: "A generous lounge and bedroom share wide lake and emerald-hill views, while the window-side jetted bathtub turns the landscape into part of the room.",
    image: "/media/room-jen.jpg",
    hero: "/media/room-jen-hero.jpg",
    href: "https://dorjes.com/jen-suite/"
  },
  {
    name: "Deluxe Room",
    count: "14 rooms",
    description: "A comfortable double room with a spacious furnished balcony and an unobstructed lake view—an easy place to read, pause and watch the light change.",
    image: "/media/room-deluxe.jpg",
    hero: "/media/room-deluxe-hero.jpg",
    href: "https://dorjes.com/deluxe-room/"
  },
  {
    name: "Standard Room",
    count: "2 rooms",
    description: "Clean, quiet and minimalist, with a courtyard view, king-size bed and a well-designed bathroom for an uncomplicated restorative stay.",
    image: "/media/room-standard.jpg",
    hero: "/media/room-standard-hero.jpg",
    href: "https://dorjes.com/standard-room/"
  }
];

export const experiences: Story[] = [
  {
    eyebrow: "Taste",
    title: "From Sedi, to the table",
    description: "Locally sourced produce and vegetables from the nearby farm become quiet, regionally rooted meals.",
    image: "/media/local-food.jpg",
    href: "/tastes"
  },
  {
    eyebrow: "Serenity",
    title: "A lake beneath the hills",
    description: "Phewa Lake and the green folds of Pokhara sit below the resort, changing character with every hour.",
    image: "/media/lake-sunrise.jpg",
    href: "https://dorjes.com/resort/"
  },
  {
    eyebrow: "Rejuvenate",
    title: "Water, warmth, stillness",
    description: "A multi-tier pool, outdoor jacuzzi and restorative spaces invite an unhurried return to yourself.",
    image: "/media/pool-wellness.jpg",
    href: "https://dorjes.com/spa-and-wellness/"
  },
  {
    eyebrow: "Community",
    title: "Made close to home",
    description: "Local sourcing, training and hand-made ceramics keep the resort connected to the people around it.",
    image: "/media/sustainability.webp",
    href: "https://dorjes.com/sustainability/"
  }
];

export const worldStories: Story[] = [
  {
    eyebrow: "Comfort",
    title: "Eighteen rooms, one hillside",
    description: "Locally inspired cottages pair native materials with calm, contemporary interiors.",
    image: "/media/resort-architecture.jpg",
    href: "/accommodation-in-pokhara"
  },
  {
    eyebrow: "The founder",
    title: "A dream carried home",
    description: "Dorje Lama's decades in Pokhara hospitality shaped a resort built around people, place and generous welcome.",
    image: "/media/founder.jpg",
    href: "https://dorjes.com/about-dorje/"
  },
  {
    eyebrow: "Recognition",
    title: "A quieter view of Pokhara",
    description: "The resort's Sedi Hills setting and considered character have brought international travel attention.",
    image: "/media/natgeo.jpg",
    href: "https://dorjes.com/national-geographic-traveller/"
  }
];

export const dining = {
  intro: "Ingredients from the nearby farm and local markets become thoughtful meals served above the lake.",
  stories: [
    {
      eyebrow: "Farm to table",
      title: "Local flavour is the centre of the plate",
      description: "Dorje's sources ingredients from its farm and nearby markets, supporting local livelihoods while keeping the food connected to the region.",
      image: "/media/local-food.jpg"
    },
    {
      eyebrow: "Golden hour",
      title: "A scenic lake bar in the heart of nature",
      description: "Cocktails and alcohol-free drinks are served against changing views of the lake and Machhapuchhre.",
      image: "/media/gallery-g4.jpg"
    },
    {
      eyebrow: "A Pokhara story",
      title: "From Moondance to Dorje's",
      description: "Dorje opened Moondance in Lakeside in 1991. Today the resort, Moondance and Dorje's Bar & Grill offer distinct places to gather over food.",
      image: "/media/moondance.jpg"
    }
  ]
} as const;
