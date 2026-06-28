export type TrekRoute = {
  slug: string;
  name: string;
  region: string;
  durationDays: number;
  maxAltitudeM: number;
  difficulty: "Introductory" | "Moderate" | "Challenging" | "Expedition";
  bestSeasons: string[];
  permits: string[];
  access: string[];
  signature: string;
  summary: string;
  stayStyle: string;
  fromUsd: number | null;
  image: string;
  highlights: string[];
  prep: string[];
  itinerary: Array<{ day: string; title: string; detail: string }>;
  sourceSlug?: string;
};

const IMG = "/alpine-bloom-assets/nepal-public-domain";

export type GuideProfile = {
  slug: string;
  name: string;
  role: string;
  gender: "woman";
  label: "Nepali woman guide";
  focus: string;
  regions: string[];
  languages: string[];
  certifications: string[];
  specialties: string[];
  avatar: string;
  color: string;
  image: string;
  bio: string;
};

export const companyProfile = {
  shortName: "Alpine Bloom",
  legalName: "Alpine Bloom Himalayan Journeys",
  email: "adventure@alpinebloom.example",
  phones: ["+977 980-000-0000"],
  address: "Kathmandu & Pokhara, Nepal",
  description:
    "Women-powered Himalayan travel house for small-group treks, Nepali guide matching, permit planning, and confidence-first mountain support.",
} as const;

export const trekRoutes: TrekRoute[] = [
  {
    slug: "everest-base-camp",
    name: "Everest Base Camp",
    region: "Khumbu",
    durationDays: 15,
    maxAltitudeM: 5545,
    difficulty: "Challenging",
    bestSeasons: ["Mar-May", "Oct-Nov"],
    permits: ["Sagarmatha National Park", "Khumbu Pasang Lhamu local fee"],
    access: ["Kathmandu-Lukla flight", "Optional helicopter return"],
    signature:
      "A classic base camp journey through Sherpa villages, glacier country, and Kala Patthar sunrise.",
    summary:
      "Best for women travelers who want the Everest story with careful acclimatization, Nepali women guide support, and a clear weather buffer.",
    stayStyle: "Kathmandu hotel, mountain teahouses, porter support",
    fromUsd: 2390,
    image: `${IMG}/everest-base-camp.jpg`,
    highlights: [
      "Base Camp and Kala Patthar viewpoints",
      "Namche Bazaar and Tengboche Monastery",
      "Built-in altitude pacing",
      "Heli return can shorten the descent",
    ],
    prep: [
      "High-altitude evacuation insurance is essential",
      "Train for long uphill days with a daypack",
      "Keep buffer days around Lukla flights",
    ],
    sourceSlug: "alpine-everest-base-camp-snapshot",
    itinerary: [
      {
        day: "1-2",
        title: "Kathmandu to Phakding",
        detail: "Briefing, gear check, Lukla flight, and a gentle first trail day.",
      },
      {
        day: "3-5",
        title: "Namche acclimatization",
        detail: "Sherpa capital, ridge walks, and a measured climb toward Tengboche.",
      },
      {
        day: "6-10",
        title: "Glacier approach",
        detail: "Dingboche, Lobuche, Base Camp, and Kala Patthar at sunrise.",
      },
      {
        day: "11-15",
        title: "Return or heli exit",
        detail: "Walk back through the Khumbu or add a weather-safe helicopter finish.",
      },
    ],
  },
  {
    slug: "annapurna-circuit",
    name: "Annapurna Circuit",
    region: "Annapurna",
    durationDays: 15,
    maxAltitudeM: 5416,
    difficulty: "Challenging",
    bestSeasons: ["Mar-May", "Oct-Dec"],
    permits: ["ACAP", "Trekking registration as required"],
    access: ["Private jeep to Chame", "Jomsom or Pokhara exit"],
    signature:
      "Nepal's shape-shifting circuit: forest, village, desert valley, and the Thorong La crossing.",
    summary:
      "A flexible private trek for travelers who want big variety and transport options without losing the high-pass drama.",
    stayStyle: "Kathmandu and Pokhara hotels with teahouse route support",
    fromUsd: 2190,
    image: `${IMG}/annapurna-hikers.jpg`,
    highlights: [
      "Thorong La high pass crossing",
      "Jeep-assisted route compression",
      "Strong cultural diversity",
      "Easy Pokhara recovery extension",
    ],
    prep: [
      "Pack for warm valleys and cold pass mornings",
      "Private transport helps varied-ability women-only groups",
      "Cash is useful outside larger villages",
    ],
    sourceSlug: "alpine-annapurna-circuit-snapshot",
    itinerary: [
      {
        day: "1-4",
        title: "Kathmandu to Manang",
        detail: "Road approach, river valleys, and slow acclimatization into the high basin.",
      },
      {
        day: "5-9",
        title: "High Annapurna country",
        detail: "Manang rest day, Yak Kharka, Thorong Phedi, and pass preparation.",
      },
      {
        day: "10",
        title: "Thorong La",
        detail: "Early start over the pass before descending toward Muktinath.",
      },
      {
        day: "11-15",
        title: "Mustang to Pokhara",
        detail: "Jeep, flight, or extended walking route back into lower valleys.",
      },
    ],
  },
  {
    slug: "mardi-himal",
    name: "Mardi Himal",
    region: "Annapurna",
    durationDays: 7,
    maxAltitudeM: 4500,
    difficulty: "Moderate",
    bestSeasons: ["Mar-May", "Oct-Nov"],
    permits: ["ACAP", "Trekking registration as required"],
    access: ["Pokhara road transfer"],
    signature:
      "A short ridge route with fast mountain exposure and Machhapuchhre close enough to feel unreal.",
    summary:
      "Perfect for travelers with a tight Nepal window who still want real trail texture, sunrise drama, and women-led support.",
    stayStyle: "Pokhara hotel and simple ridge lodges",
    fromUsd: 990,
    image: `${IMG}/ghandruk-route.jpg`,
    highlights: [
      "Big views on a compact schedule",
      "Lower transfer complexity",
      "Pairs well with Pokhara add-ons",
      "Great first Himalayan trek",
    ],
    prep: [
      "Bring warm layers for exposed mornings",
      "Expect sustained uphill walking",
      "Book early in peak rhododendron season",
    ],
    sourceSlug: "alpine-mardi-himal-snapshot",
    itinerary: [
      {
        day: "1-2",
        title: "Pokhara to forest camp",
        detail: "Short road transfer and a steady climb through wooded ridges.",
      },
      {
        day: "3-4",
        title: "High camp",
        detail: "Move above tree line for close Machhapuchhre and Annapurna views.",
      },
      {
        day: "5",
        title: "Viewpoint morning",
        detail: "Early ridge push, photos, and a careful descent.",
      },
      {
        day: "6-7",
        title: "Return to Pokhara",
        detail: "Village trails, road transfer, and a lakefront recovery night.",
      },
    ],
  },
  {
    slug: "langtang-valley",
    name: "Langtang Valley",
    region: "Langtang",
    durationDays: 10,
    maxAltitudeM: 4984,
    difficulty: "Moderate",
    bestSeasons: ["Mar-May", "Oct-Nov"],
    permits: ["Langtang National Park", "Trekking registration as required"],
    access: ["Overland via Syabrubesi"],
    signature:
      "A resilient valley trek close to Kathmandu with glaciers, culture, and no domestic flight dependency.",
    summary:
      "A smart first or second Nepal trek when travelers want mountain scale with simpler logistics and strong local story.",
    stayStyle: "Kathmandu hotel and character teahouses",
    fromUsd: 1380,
    image: `${IMG}/snowy-everest-route.jpg`,
    highlights: [
      "No Lukla-style flight risk",
      "Kyanjin Gompa and glacier viewpoints",
      "Good shoulder-season option",
      "Strong culture and mountain balance",
    ],
    prep: [
      "Private road transport improves comfort",
      "Altitude insurance still matters",
      "Good for photography-focused private trips",
    ],
    sourceSlug: "alpine-langtang-valley-snapshot",
    itinerary: [
      {
        day: "1-2",
        title: "Kathmandu to Lama Hotel",
        detail: "Drive to Syabrubesi and begin walking into forested river country.",
      },
      {
        day: "3-5",
        title: "Langtang village to Kyanjin",
        detail: "Open valley walking, rebuilt villages, monasteries, and yak pastures.",
      },
      {
        day: "6-7",
        title: "Viewpoint days",
        detail: "Optional Kyanjin Ri or glacier walks with flexible pacing.",
      },
      {
        day: "8-10",
        title: "Descend and return",
        detail: "Retrace the valley and drive back to Kathmandu.",
      },
    ],
  },
  {
    slug: "poon-hill-ghandruk",
    name: "Poon Hill & Ghandruk",
    region: "Annapurna",
    durationDays: 5,
    maxAltitudeM: 3210,
    difficulty: "Introductory",
    bestSeasons: ["Mar-May", "Oct-Dec"],
    permits: ["ACAP", "Trekking registration as required"],
    access: ["Pokhara road transfer"],
    signature:
      "A short sunrise classic with village warmth, rhododendron forests, and soft-adventure pacing.",
    summary:
      "Great for first-timers, multi-age women-only groups, and travelers who want a beautiful Himalayan sampler before or after a broader Nepal trip.",
    stayStyle: "Pokhara hotel and comfortable village lodges",
    fromUsd: 790,
    image: `${IMG}/tengboche-monastery.jpg`,
    highlights: [
      "Poon Hill sunrise panorama",
      "Ghandruk village culture",
      "Low-risk altitude profile",
      "Easy add-on from Pokhara",
    ],
    prep: [
      "Good shoes still matter on stone steps",
      "Ideal if you are altitude-curious",
      "Works well with Chitwan or wellness add-ons",
    ],
    sourceSlug: "alpine-poon-hill-ghandruk-snapshot",
    itinerary: [
      {
        day: "1",
        title: "Pokhara to Ulleri",
        detail: "Road transfer and a short first climb into lodge country.",
      },
      {
        day: "2-3",
        title: "Ghorepani and Poon Hill",
        detail: "Forest trail, early sunrise viewpoint, and Annapurna panorama.",
      },
      {
        day: "4",
        title: "Ghandruk",
        detail: "Village stay, Gurung culture, and mountain views.",
      },
      {
        day: "5",
        title: "Return to Pokhara",
        detail: "Descend to the road and recover by the lake.",
      },
    ],
  },
];

export const guideProfiles: GuideProfile[] = [
  {
    slug: "maya-sherpa",
    name: "Maya Sherpa",
    role: "Lead Everest altitude guide",
    gender: "woman",
    label: "Nepali woman guide",
    focus: "Calm acclimatization, Khumbu lodge rhythm, and clear summit-morning decisions.",
    regions: ["Khumbu", "Gokyo", "Everest Base Camp"],
    languages: ["Nepali", "English", "Sherpa"],
    certifications: ["Licensed trekking guide", "Wilderness first aid", "Altitude response"],
    specialties: ["Everest Base Camp", "Gokyo Lakes", "First high-altitude trek"],
    avatar: "MS",
    color: "#ff16a2",
    image: `${IMG}/everest-base-camp.jpg`,
    bio: "Maya is calm, direct, and trusted by first-time Himalayan trekkers who want honest altitude pacing, steady confidence, and a Nepali woman guide who will say the quiet safety thing out loud.",
  },
  {
    slug: "lhamo-gurung",
    name: "Lhamo Gurung",
    role: "Annapurna village route specialist",
    gender: "woman",
    label: "Nepali woman guide",
    focus: "Village hospitality, ridge pacing, and warm cultural interpretation in the Annapurna foothills.",
    regions: ["Annapurna", "Mardi Himal", "Ghandruk"],
    languages: ["Nepali", "English", "Gurung"],
    certifications: ["Licensed trekking guide", "Mountain safety", "Responsible tourism"],
    specialties: ["Mardi Himal", "Poon Hill", "Ghandruk homestays"],
    avatar: "LG",
    color: "#66ead6",
    image: `${IMG}/annapurna-hikers.jpg`,
    bio: "Lhamo brings village knowledge and practical mountain judgement to women-only groups that want beauty, culture, and a walking pace that leaves room for the place itself.",
  },
  {
    slug: "nima-tamang",
    name: "Nima Tamang",
    role: "Langtang safety and logistics lead",
    gender: "woman",
    label: "Nepali woman guide",
    focus: "Road-access trekking, weather buffers, and grounded safety systems near Kathmandu.",
    regions: ["Langtang", "Helambu", "Kathmandu Valley"],
    languages: ["Nepali", "English", "Tamang"],
    certifications: ["High-altitude safety", "Trail logistics", "First aid"],
    specialties: ["Langtang Valley", "Helambu", "Overland contingency planning"],
    avatar: "NT",
    color: "#14110f",
    image: `${IMG}/snowy-everest-route.jpg`,
    bio: "Nima handles route buffers, overland logistics, and practical safety checks so the Nepali women guide team can keep the group present and cared for.",
  },
  {
    slug: "asha-rai",
    name: "Asha Rai",
    role: "First-trek confidence coach",
    gender: "woman",
    label: "Nepali woman guide",
    focus: "Gentle first-Himalaya coaching, realistic training advice, and supportive trail confidence.",
    regions: ["Poon Hill", "Mardi Himal", "Pokhara"],
    languages: ["Nepali", "English", "Hindi"],
    certifications: ["Licensed trekking guide", "First aid", "Women trek leader"],
    specialties: ["First Nepal trek", "Poon Hill sunrise", "Pokhara extensions"],
    avatar: "AR",
    color: "#ff16a2",
    image: `${IMG}/ghandruk-route.jpg`,
    bio: "Asha is the guide for women who want their first Himalayan route to feel brave, realistic, and never performative.",
  },
  {
    slug: "pema-dolma-sherpa",
    name: "Pema Dolma Sherpa",
    role: "High-pass safety captain",
    gender: "woman",
    label: "Nepali woman guide",
    focus: "Disciplined pass-day timing, strong group checks, and cool-headed weather calls.",
    regions: ["Everest Three Passes", "Annapurna Circuit", "Manang"],
    languages: ["Nepali", "English", "Sherpa", "Hindi"],
    certifications: ["Licensed trekking guide", "Wilderness first aid", "High-pass safety"],
    specialties: ["Thorong La", "Everest high passes", "Fitness-forward departures"],
    avatar: "PD",
    color: "#66ead6",
    image: `${IMG}/annapurna-hikers.jpg`,
    bio: "Pema is the guide for ambitious women who want a stronger route without macho energy: disciplined preparation, honest body checks, and a plan that respects the mountain.",
  },
  {
    slug: "sita-thakuri",
    name: "Sita Thakuri",
    role: "Mustang and Annapurna logistics guide",
    gender: "woman",
    label: "Nepali woman guide",
    focus: "Permit timing, jeep-and-trail routing, and graceful backup plans for private departures.",
    regions: ["Lower Mustang", "Annapurna", "Pokhara"],
    languages: ["Nepali", "English", "Hindi"],
    certifications: ["Licensed trekking guide", "Permit operations", "Remote route logistics"],
    specialties: ["Jomsom exits", "Jeep-assisted treks", "Comfort private trips"],
    avatar: "ST",
    color: "#14110f",
    image: `${IMG}/ghandruk-route.jpg`,
    bio: "Sita keeps private trips feeling easy on the surface because the details underneath are handled: permits, transfers, lodge calls, and the soft landings that matter after long days.",
  },
];

export const travelFaqItems = [
  {
    question: "How far ahead should we book?",
    answer:
      "For spring and autumn treks, start planning early enough to hold guides, rooms, transport, and permits. Short-notice trips are easiest on classic routes around Annapurna and Langtang.",
  },
  {
    question: "Do we need trekking insurance?",
    answer:
      "Yes. Choose a policy that explicitly covers high-altitude trekking and helicopter evacuation for your route's maximum altitude.",
  },
  {
    question: "Can Alpine Bloom arrange permits?",
    answer:
      "Yes. The team can advise on ACAP, national park, local, and restricted-area permits, then fold the paperwork into the final proposal.",
  },
  {
    question: "Are women-led guide teams available?",
    answer:
      "Women-led guide requests can be included in the booking brief. Availability depends on route, season, language needs, and group size.",
  },
  {
    question: "Can the trip become private or custom?",
    answer:
      "Yes. Routes can be reshaped around your dates, pace, comfort level, transport style, hotel preference, and add-ons.",
  },
  {
    question: "What should we budget beyond the package?",
    answer:
      "Keep cash for tips, snacks, charging, hot showers, extra drinks, souvenirs, and any personal gear or insurance.",
  },
];

export function getTrekBySlug(slug: string) {
  return trekRoutes.find((route) => route.slug === slug);
}

export function formatUsd(value: number | null) {
  if (value == null) return "Custom quote";
  return `From $${value.toLocaleString()}`;
}
