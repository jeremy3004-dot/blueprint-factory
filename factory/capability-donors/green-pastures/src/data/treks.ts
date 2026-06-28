import { nepalPhotoLibrary } from "@/data/nepal-photo-library";
import { getOperatorSourceRoute } from "@/data/operator-source";

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
  bundle: {
    helicopter?: string;
    jeep?: string;
    flight?: string;
  };
  packageOptions?: Array<{
    name: string;
    duration: string;
    difficulty: TrekRoute["difficulty"];
    bestFor: string;
    priceGuide?: string;
    positioning: string;
    highlights: string[];
  }>;
  highlights: string[];
  prep: string[];
  sourceSlug?: string;
};

type SourceAdditionConfig = Omit<
  TrekRoute,
  "durationDays" | "maxAltitudeM" | "fromUsd" | "bestSeasons"
> & {
  altitudeOverride: number;
  bestSeasonsOverride: string[];
  durationOverride?: number;
  priceOverride?: number | null;
};

function buildSourceAddition(config: SourceAdditionConfig): TrekRoute {
  const source = getOperatorSourceRoute(config.sourceSlug);

  if (!source) {
    throw new Error(`Missing operator source route for ${config.sourceSlug}`);
  }

  return {
    ...config,
    durationDays:
      config.durationOverride ??
      source.maxDurationDays ??
      source.minDurationDays ??
      0,
    maxAltitudeM: config.altitudeOverride,
    bestSeasons: config.bestSeasonsOverride,
    fromUsd: config.priceOverride ?? source.costUsd ?? null,
  };
}

const baseTrekRoutes: TrekRoute[] = [
  {
    slug: "everest-base-camp",
    name: "Everest Base Camp",
    region: "Khumbu",
    durationDays: 15,
    maxAltitudeM: 5545,
    difficulty: "Challenging",
    bestSeasons: ["Mar-May", "Oct-Nov"],
    permits: ["Sagarmatha National Park", "Khumbu Pasang Lhamu fee"],
    access: ["Kathmandu-Lukla flight", "Optional heli return"],
    signature:
      "Experience the adventure of a lifetime as you journey through Sherpa villages, glacier views, and Kala Patthar sunrise.",
    summary:
      "Built for travelers who want Everest with steady route support, careful acclimatization, and comfortable teahouse options.",
    stayStyle: "Boutique Kathmandu stay + comfortable teahouses + porter support",
    fromUsd: 2390,
    image: nepalPhotoLibrary.khumbuGokyo,
    bundle: {
      helicopter:
        "Fly out from Gorak Shep or Lobuche to skip the descent and reclaim 3-4 days.",
      flight: "Book Lukla sectors with weather buffer baked into the package.",
    },
    highlights: [
      "Pacing tuned for altitude adaptation",
      "Sherpa culture and monastery stops",
      "Optional heli extraction and luxury add-ons",
      "Emergency buffer planning for Lukla weather",
    ],
    prep: [
      "High-altitude insurance is mandatory",
      "Train for long uphill days carrying a daypack",
      "Weather buffer strongly recommended before outbound flights",
    ],
    sourceSlug: "everest-epic-everest-base-camp",
  },
  {
    slug: "annapurna-circuit",
    name: "Annapurna Circuit",
    region: "Annapurna",
    durationDays: 15,
    maxAltitudeM: 5416,
    difficulty: "Challenging",
    bestSeasons: ["Mar-May", "Oct-Dec"],
    permits: ["ACAP", "TIMS or equivalent trekking registration"],
    access: ["Jeep to Chame", "Flight or drive from Jomsom/Pokhara"],
    signature:
      "Nepal’s most versatile circuit with forests, villages, high pass drama, and huge optional jeep compression.",
    summary:
      "Ideal for travelers who want variety, flexible entry or exit points, and dramatic changes in scenery.",
    stayStyle: "Kathmandu + Pokhara hotels + upgraded teahouse chain",
    fromUsd: 2190,
    image: nepalPhotoLibrary.poonHillDusk,
    bundle: {
      jeep: "Fast-track lower sections by jeep without losing Thorong La and the core circuit.",
      flight: "Exit via Jomsom or complete overland to Pokhara.",
    },
    highlights: [
      "Jeep-assisted custom durations",
      "Thorong La crossing with weather-safe pacing",
      "Excellent cultural diversity and food options",
      "Pairs beautifully with Pokhara recovery days",
    ],
    prep: [
      "Good for mixed-ability private groups with transport upgrades",
      "Pack for both cold passes and warm valley sections",
      "Plan cash for teahouses outside bigger towns",
    ],
    sourceSlug: "annapurna-massif-trek-round-annapurna",
  },
  {
    slug: "annapurna-base-camp",
    name: "Annapurna Base Camp",
    region: "Annapurna",
    durationDays: 11,
    maxAltitudeM: 4130,
    difficulty: "Moderate",
    bestSeasons: ["Mar-May", "Oct-Nov"],
    permits: ["ACAP", "TIMS or equivalent trekking registration"],
    access: ["Drive from Pokhara", "Heli exit option"],
    signature:
      "A shorter route for travelers who want dramatic Himalayan amphitheater views without Everest-level duration.",
    summary:
      "A strong short-to-mid length trek for families, couples, and first-time Nepal hikers wanting big scenery.",
    stayStyle: "Pokhara design hotel + curated teahouse route",
    fromUsd: 1680,
    image: nepalPhotoLibrary.annapurnaBaseCamp,
    bundle: {
      helicopter: "Heli-out from base camp for luxury return and aerial photography.",
      jeep: "Private vehicle starts and finishes in Pokhara.",
    },
    highlights: [
      "Shorter leave-friendly itinerary",
      "Popular with first-time Himalayan trekkers",
      "Easy to customize with comfort upgrades",
      "Easy combination with wellness stays in Pokhara",
    ],
    prep: [
      "Still requires daily stair and ascent readiness",
      "Works well with guide diversity and women-led departures",
      "Rain gear matters in shoulder season",
    ],
    sourceSlug: "holy-himalaya-trek-abc",
  },
  {
    slug: "mardi-himal",
    name: "Mardi Himal",
    region: "Annapurna",
    durationDays: 7,
    maxAltitudeM: 4500,
    difficulty: "Moderate",
    bestSeasons: ["Mar-May", "Oct-Nov"],
    permits: ["ACAP", "TIMS or equivalent trekking registration"],
    access: ["Pokhara road transfer"],
    signature:
      "A short, photogenic ridge trek that feels boutique and private even when your Nepal window is tight.",
    summary:
      "Best for travelers craving Himalayan exposure with less time, lower budget, and minimal transfer overhead.",
    stayStyle: "Pokhara design hotel + simple ridge lodges",
    fromUsd: 990,
    image: nepalPhotoLibrary.machhapuchhre,
    bundle: {
      jeep: "Private transfer from Kathmandu or Pokhara with custom departure timing.",
    },
    highlights: [
      "Excellent short-break trek",
      "Strong mountain views fast",
      "Pairs with paragliding, rafting, or safari add-ons",
      "Ideal intro to Nepal for busy professionals",
    ],
    prep: [
      "Bring layers for cold mornings above tree line",
      "Fitness target is sustained uphill walking",
      "Good entry point for private custom departures",
    ],
    sourceSlug: "machhapuchhare-kiss-trek-mardi-himal",
  },
  {
    slug: "langtang-valley",
    name: "Langtang Valley",
    region: "Langtang",
    durationDays: 10,
    maxAltitudeM: 4984,
    difficulty: "Moderate",
    bestSeasons: ["Mar-May", "Oct-Nov"],
    permits: ["Langtang National Park", "TIMS or equivalent trekking registration"],
    access: ["Overland via Syabrubesi"],
    signature:
      "The smart route for travelers who want Himalayan scale without flight risk to Lukla.",
    summary:
      "A resilient valley trek close to Kathmandu, strong on culture, glaciers, and operational simplicity.",
    stayStyle: "Kathmandu hotel + character teahouses",
    fromUsd: 1380,
    image: nepalPhotoLibrary.forestRidge,
    bundle: {
      jeep: "Private jeep both ways for comfort and schedule control.",
    },
    highlights: [
      "No domestic flight dependency",
      "Great private-group and shoulder-season route",
      "Excellent culture and mountain balance",
      "Works well as a first Nepal trek",
    ],
    prep: [
      "Road time is longer, so private transport improves experience",
      "Insurance should still cover altitude trekking",
      "Good route for custom photography trips",
    ],
    sourceSlug: "shaman-spiritual-trek-langtang-gosainkund",
  },
  {
    slug: "manaslu-circuit",
    name: "Manaslu Circuit",
    region: "Manaslu",
    durationDays: 16,
    maxAltitudeM: 5160,
    difficulty: "Challenging",
    bestSeasons: ["Mar-May", "Oct-Nov"],
    permits: ["Restricted Area Permit", "MCAP", "ACAP", "Licensed guide required"],
    access: ["Private jeep approach and exit"],
    signature:
      "The serious trekkers’ alternative to Everest and Annapurna, wilder, less crowded, and permit-controlled.",
    summary:
      "The route for travelers who want authenticity, mountain drama, and lower crowd density while staying fully supported.",
    stayStyle:
      "Kathmandu hotel + upgraded teahouse logistics + permit handling",
    fromUsd: 2790,
    image: nepalPhotoLibrary.manasluSamdo,
    bundle: {
      jeep: "Door-to-door private jeep logistics for both trailheads.",
    },
    highlights: [
      "Restricted-area prestige",
      "Excellent for private expert-guided groups",
      "Fewer crowds, stronger expedition feel",
      "Compelling for repeat Nepal visitors",
    ],
    prep: [
      "Restricted-area permit timing matters",
      "Requires a licensed guide and minimum permit compliance",
      "Best with a licensed guide and full permit support",
    ],
    sourceSlug: "manaslu-trek",
  },
  {
    slug: "upper-mustang",
    name: "Upper Mustang",
    region: "Mustang",
    durationDays: 14,
    maxAltitudeM: 4230,
    difficulty: "Moderate",
    bestSeasons: ["May-Oct"],
    permits: ["Restricted Area Permit", "ACAP", "Licensed guide required"],
    access: ["Flight or jeep to Jomsom"],
    signature:
      "A desert-Himalaya cultural expedition with Tibetan heritage, monasteries, and remarkable highland landscapes.",
    summary:
      "For travelers who care as much about culture, landscapes, and access to hidden kingdoms as they do summit views.",
    stayStyle: "Boutique Kathmandu/Pokhara stays + comfortable lodge route",
    fromUsd: 3350,
    image: nepalPhotoLibrary.muktinathArea,
    bundle: {
      jeep: "Full overland Upper Mustang by private jeep for travelers chasing a deeper cultural expedition.",
      flight: "Fast-track Jomsom sectors for shorter itineraries.",
    },
    highlights: [
      "Monsoon-friendly due to rain shadow",
      "Culture-heavy route for custom private travel",
      "Excellent jeep + trek hybrid option",
      "High visual differentiation versus classic routes",
    ],
    prep: [
      "Permit costs are materially higher",
      "Ideal for photographers and culturally curious travelers",
      "Dry conditions mean sun, lip, and dust protection matter",
    ],
    sourceSlug: "the-forbidden-kingdom-of-nepal-upper-mustang-one-way-drive",
  },
  {
    slug: "nar-phu-valley",
    name: "Nar Phu Valley",
    region: "Annapurna",
    durationDays: 13,
    maxAltitudeM: 5320,
    difficulty: "Challenging",
    bestSeasons: ["Apr-May", "Oct-Nov"],
    permits: ["Restricted Area Permit", "ACAP", "Licensed guide required"],
    access: ["Jeep to Koto"],
    signature:
      "An off-radar valley route for people who want remote villages and expedition texture without full expedition complexity.",
    summary:
      "Best as a private add-on for experienced hikers or second-time Nepal travelers.",
    stayStyle: "Kathmandu stay + rugged teahouses with upgraded guide team",
    fromUsd: 2650,
    image: nepalPhotoLibrary.snowyHimalaya,
    bundle: {
      jeep: "Private approach to save time and reduce road fatigue.",
    },
    highlights: [
      "Remote-village immersion",
      "Excellent add-on for travelers looking beyond the obvious routes",
      "Strong guide-led storytelling opportunity",
      "Works as a standout private trip",
    ],
    prep: [
      "Restricted permits and experienced pacing required",
      "Not ideal for first-time high-altitude travelers",
      "Cash, batteries, and spare layers matter more here",
    ],
    sourceSlug: "lost-valley-of-the-annapurna-nar-phu",
  },
  {
    slug: "gokyo-and-renjo-la",
    name: "Gokyo Lakes & Renjo La",
    region: "Khumbu",
    durationDays: 14,
    maxAltitudeM: 5360,
    difficulty: "Challenging",
    bestSeasons: ["Mar-May", "Oct-Nov"],
    permits: ["Sagarmatha National Park", "Khumbu Pasang Lhamu fee"],
    access: ["Kathmandu-Lukla flight", "Optional heli return"],
    signature:
      "The Everest alternative for travelers who want fewer crowds, mirrored lakes, and elite photo moments.",
    summary:
      "A scenic Khumbu route with quieter trails, lake views, and an optional helicopter finish.",
    stayStyle: "Kathmandu design hotel + high-comfort teahouses",
    fromUsd: 2490,
    image: nepalPhotoLibrary.khumbuGokyo,
    bundle: {
      helicopter:
        "Private heli return from Gokyo or nearby zones when weather permits.",
    },
    highlights: [
      "Outstanding photography route",
      "Less crowded than classic EBC",
      "Excellent for couples and private trekkers",
      "Easy to combine with helicopter sightseeing",
    ],
    prep: [
      "Altitude profile still serious",
      "Great option for repeat Everest-region travelers",
      "Build in weather contingency for flight sectors",
    ],
  },
  {
    slug: "poon-hill-and-ghorepani",
    name: "Poon Hill & Ghorepani",
    region: "Annapurna",
    durationDays: 5,
    maxAltitudeM: 3210,
    difficulty: "Introductory",
    bestSeasons: ["Mar-May", "Oct-Dec"],
    permits: ["ACAP", "TIMS or equivalent trekking registration"],
    access: ["Pokhara road transfer"],
    signature:
      "The short Nepal classic with comfortable pacing and broad appeal.",
    summary:
      "Perfect for families, older travelers, jet-lag recovery windows, and soft-adventure upgrades from cultural tours.",
    stayStyle: "Pokhara lakefront hotel + comfortable lodges",
    fromUsd: 790,
    image: nepalPhotoLibrary.poonHillDusk,
    bundle: {
      jeep: "Easy road access for low-friction starts and finishes.",
    },
    highlights: [
      "Good fit for many ages and experience levels",
      "Fits short Nepal sampler trips",
      "Low-risk route for first-timers",
      "Excellent sunrise views",
    ],
    prep: [
      "Ideal for travelers uncertain about altitude",
      "Works well as a warm-up trek",
      "Works beautifully with Chitwan or Bhutan extensions",
    ],
    sourceSlug: "himalayan-sunrise-trek-ghorepani-ghandruk",
  },
  {
    slug: "kanchenjunga-circuit",
    name: "Kanchenjunga Circuit",
    region: "Eastern Nepal",
    durationDays: 23,
    maxAltitudeM: 5143,
    difficulty: "Expedition",
    bestSeasons: ["Apr-May", "Oct-Nov"],
    permits: [
      "Restricted Area Permit",
      "Conservation fees",
      "Licensed guide required",
    ],
    access: ["Domestic flight + jeep"],
    signature:
      "A big expedition-grade journey for travelers chasing one of Nepal’s rarest trekking experiences.",
    summary:
      "For custom departures, documentary crews, and serious repeat hikers who want true remoteness.",
    stayStyle: "Kathmandu logistics hotel + wilderness-focused support",
    fromUsd: 4790,
    image: nepalPhotoLibrary.kanchenjungaSouthPeak,
    bundle: {
      flight: "Domestic access flights shorten the long approach into eastern Nepal.",
      jeep: "Private jeep access where roads allow.",
    },
    highlights: [
      "Ultra-low crowd density",
      "Huge expedition scale and remote mountain scenery",
      "Best as a serious private guided journey",
      "Strong fit for committed long-distance trekkers",
    ],
    prep: [
      "Requires serious fitness and time budget",
      "Start permit and logistics planning early",
      "Emergency planning and comms matter more here",
    ],
    sourceSlug: "kanchenjunga-north-south-base-camp-trek",
  },
  {
    slug: "dolpo-culture-expedition",
    name: "Dolpo Culture Expedition",
    region: "Dolpo",
    durationDays: 18,
    maxAltitudeM: 5375,
    difficulty: "Expedition",
    bestSeasons: ["May-Oct"],
    permits: [
      "Restricted Area Permit",
      "National Park permits",
      "Licensed guide required",
    ],
    access: ["Domestic flight + jeep"],
    signature:
      "A rare frontier journey built around culture, remote landscapes, and days far from standard trekking corridors.",
    summary:
      "A private expedition for travelers who want Dolpo's remote villages, high passes, and distinctive Tibetan-influenced culture.",
    stayStyle: "Expedition lodges and high-support camp/teahouse mix",
    fromUsd: 5250,
    image: nepalPhotoLibrary.dolpoThuliBheri,
    bundle: {
      flight: "Strategic domestic flights to unlock viable expedition timelines.",
      jeep: "Overland segments where they improve control and comfort.",
    },
    highlights: [
      "Rare remote-route character",
      "Excellent fit for documentary and custom private travel",
      "Immense cultural and landscape depth",
      "Strong choice for travelers seeking something unusual",
    ],
    prep: [
      "Route is expensive and permit-heavy by design",
      "Better for private expert-guided teams than casual groups",
      "Needs early planning and committed travelers",
    ],
    sourceSlug: "lower-dolpo-trek",
  },
  {
    slug: "karnali-rara-dolpo-packages",
    name: "Karnali Rara & Dolpo Packages",
    region: "Karnali",
    durationDays: 22,
    maxAltitudeM: 5500,
    difficulty: "Expedition",
    bestSeasons: ["Mar-May", "Sep-Nov", "May-Oct for Dolpo"],
    permits: [
      "Rara National Park",
      "Shey Phoksundo National Park where included",
      "Restricted Area Permit for Upper Dolpo",
      "Licensed guide required for restricted areas",
    ],
    access: [
      "Fly or drive via Nepalgunj/Surkhet",
      "Jumla, Talcha, or Juphal access depending on package",
      "Private jeep support for overland Rara tours",
    ],
    signature:
      "A western Nepal collection built around Rara, Jumla, Phoksundo, and Dolpo, from easy lake escapes to full remote expeditions.",
    summary:
      "Designed for travelers who want Karnali's quieter lake country, Sinja Valley culture, and premium Dolpo wilderness without being locked into one fixed style of trip.",
    stayStyle:
      "Flexible mix of hotels, homestays, lodges, and camping support depending on the selected package",
    fromUsd: 1200,
    image: nepalPhotoLibrary.dolpoThuliBheri,
    bundle: {
      jeep: "Rara overland programs can run as family-friendly jeep tours through Surkhet, Jumla, and Mugu with short hikes near the lake.",
      flight:
        "Flight-supported Rara and Dolpo departures use Nepalgunj, Jumla, Talcha, or Juphal sectors to keep remote itineraries workable.",
    },
    packageOptions: [
      {
        name: "Rara Lake Trek",
        duration: "7-17 days",
        difficulty: "Moderate",
        bestFor: "Beginners, nature lovers, couples",
        priceGuide: "$1,200-$1,700",
        positioning: "Classic package and best seller",
        highlights: [
          "Visit Nepal's largest lake inside Rara National Park",
          "Choose budget jeep, flight-and-trek, or full trekking formats",
          "Quiet forest, wildlife, and lake scenery with easier logistics",
        ],
      },
      {
        name: "Jumla-Rara Cultural Trek",
        duration: "10-14 days",
        difficulty: "Moderate",
        bestFor: "Cultural travelers and homestay-focused groups",
        positioning: "Authentic rural tourism package",
        highlights: [
          "Start from Jumla and walk toward Rara",
          "Add Sinja Valley, associated with the origin of Nepali language",
          "Use village stays and local food experiences as the core story",
        ],
      },
      {
        name: "Phoksundo + Rara Lake Trek",
        duration: "18-22 days",
        difficulty: "Challenging",
        bestFor: "Trekkers who want two iconic western Nepal lakes",
        positioning: "Two iconic lakes in one trip",
        highlights: [
          "Combine Rara Lake with Shey Phoksundo Lake",
          "Layer lake scenery with Tibetan-influenced culture and monasteries",
          "Strong mid-to-premium package for experienced travelers",
        ],
      },
      {
        name: "Dolpo to Rara Traverse",
        duration: "18-22 days",
        difficulty: "Expedition",
        bestFor: "Foreign trekkers and remote-wilderness clients",
        positioning: "Premium adventure package",
        highlights: [
          "Cross remote high passes around or above 5,000m",
          "Travel through Bon and Tibetan-influenced communities",
          "Built for private guided teams with serious logistics",
        ],
      },
      {
        name: "Upper Dolpo Trek",
        duration: "24-28 days",
        difficulty: "Expedition",
        bestFor: "High-value luxury adventure and expedition clients",
        positioning: "Extreme remote expedition",
        highlights: [
          "Visit Shey Gompa and the high valleys of Upper Dolpo",
          "Expect high passes around 5,500m and camping-heavy support",
          "Requires restricted permits, early planning, and full logistics",
        ],
      },
      {
        name: "Rara Jeep / Overland Tour",
        duration: "6-10 days",
        difficulty: "Introductory",
        bestFor: "Families, older travelers, Nepali travelers, and Indian travelers",
        positioning: "Non-trekking starter package",
        highlights: [
          "Drive via Surkhet, Jumla, and Mugu toward Rara",
          "Add gentle lake walks, short hikes, and viewpoint stops",
          "Easy local-market product with broad seasonal appeal",
        ],
      },
    ],
    highlights: [],
    prep: [
      "Match the traveler to the right sub-package before quoting duration or difficulty",
      "Use jeep or flight access for Rara when the client wants comfort and time control",
      "Restricted Dolpo programs need early permits, guide assignment, camping gear, and contingency days",
      "Set expectations clearly: services are improving around Rara, but Dolpo remains remote by design",
    ],
  },
];

export const sourceRouteAdditions: TrekRoute[] = [
  buildSourceAddition({
    slug: "everest-three-passes",
    name: "Everest Three Passes",
    region: "Khumbu",
    difficulty: "Expedition",
    permits: ["Sagarmatha National Park", "Khumbu Pasang Lhamu fee"],
    access: ["Kathmandu-Lukla flight", "Optional heli contingency exit"],
    signature:
      "The full Khumbu high-pass journey, with three major crossings, glacier valleys, and big Everest-region variety.",
    summary:
      "For strong hikers who want Everest-region depth, more altitude, more route variety, and fewer standard out-and-back days.",
    stayStyle: "Kathmandu hotel + expedition-grade teahouse pacing",
    image: nepalPhotoLibrary.khumbuGokyo,
    bundle: {
      helicopter:
        "Weather or fatigue contingency heli exits can rescue the schedule without cheapening the route.",
      flight: "Lukla buffers matter more here because the itinerary is already long.",
    },
    highlights: [
      "Crosses Kongma La, Cho La, and Renjo La in one line",
      "Massive Everest-region variety instead of one out-and-back",
      "Strong fit for experienced hikers and private expert-led trips",
      "A natural next step after classic Everest Base Camp",
    ],
    prep: [
      "This is expedition-style trekking, not a first Himalayan route",
      "Altitude conditioning and longer leave windows are non-negotiable",
      "Carry enough flexibility for Lukla weather and pass-day shifts",
    ],
    sourceSlug: "3-passes-3-weeks-everest",
    altitudeOverride: 5535,
    bestSeasonsOverride: ["Apr-May", "Oct-Nov"],
    durationOverride: 20,
  }),
  buildSourceAddition({
    slug: "everest-base-camp-and-gokyo-lakes",
    name: "Everest Base Camp & Gokyo Lakes",
    region: "Khumbu",
    difficulty: "Expedition",
    permits: ["Sagarmatha National Park", "Khumbu Pasang Lhamu fee"],
    access: ["Kathmandu-Lukla flight", "Optional heli finish"],
    signature:
      "A longer Everest journey for travelers who want base camp, glacier energy, and the polished mirror-lake side of the Khumbu in one ticket.",
    summary:
      "An Everest-region combination for travelers who want base camp and the quieter beauty of the Gokyo Lakes in one longer journey.",
    stayStyle: "Kathmandu hotel + high-comfort teahouses with extra acclimatization",
    image: nepalPhotoLibrary.khumbuGokyo,
    bundle: {
      helicopter:
        "A heli finish works especially well here because the route earns the big visual exit.",
      flight: "Build in flight contingency at both ends of the program.",
    },
    highlights: [
      "Combines Everest Base Camp with the Gokyo lake system",
      "Better visual range than base camp alone",
      "Strong private itinerary for repeat or ambitious travelers",
      "Good storytelling route for photography-heavy departures",
    ],
    prep: [
      "Longer duration makes date planning important",
      "Altitude exposure is cumulative, not just about the highest point",
      "Best with strong guide support and clear contingency planning",
    ],
    sourceSlug: "everest-base-camp-gokyo-lake",
    altitudeOverride: 5545,
    bestSeasonsOverride: ["Apr-May", "Oct-Nov"],
    durationOverride: 18,
  }),
  buildSourceAddition({
    slug: "pikey-peak",
    name: "Pikey Peak",
    region: "Lower Everest",
    difficulty: "Moderate",
    permits: ["TIMS or equivalent trekking registration", "Local area entry where required"],
    access: ["Long scenic drive from Kathmandu", "Private jeep recommended"],
    signature:
      "The Everest-view route for people who want big Himalayan sightlines, Sherpa culture, and less crowd pressure than the Khumbu classics.",
    summary:
      "A strong mid-length choice when travelers want Everest panoramas without Lukla flights, heavy altitude stress, or the standard base-camp circuit.",
    stayStyle: "Kathmandu stay + simple but atmospheric village lodges",
    image: nepalPhotoLibrary.forestRidge,
    bundle: {
      jeep: "Private road logistics make the approach much more pleasant.",
    },
    highlights: [
      "Huge multi-range sunrise views including Everest",
      "Sherpa villages and monastery texture",
      "No Lukla dependency",
      "Excellent alternative for thoughtful first or second Nepal trips",
    ],
    prep: [
      "Road access is the tradeoff for avoiding domestic flights",
      "Works well for cultural travelers who still want mountain scale",
      "Choose it for atmosphere and view quality, not prestige checkboxes",
    ],
    sourceSlug: "pikey-peak-everest-panoramic-view-cultural-trek",
    altitudeOverride: 4065,
    bestSeasonsOverride: ["Mar-May", "Oct-Nov"],
  }),
  buildSourceAddition({
    slug: "panchase-trek",
    name: "Panchase Trek",
    region: "Pokhara Highlands",
    difficulty: "Moderate",
    permits: ["Local conservation and trekking registration as required"],
    access: ["Pokhara road transfer"],
    signature:
      "A compact ridge-and-village trek near Pokhara that works beautifully for travelers who want scenery, culture, and breathing room over altitude theatrics.",
    summary:
      "This is one of the smartest short Nepal programs for relaxed private departures, pre-trek warmups, and couples who want a softer landing into the Himalaya.",
    stayStyle: "Pokhara hotel + village lodge mix",
    image: nepalPhotoLibrary.poonHillDusk,
    bundle: {
      jeep: "Easy private transport keeps the whole program low-friction.",
    },
    highlights: [
      "Near-Pokhara convenience with real trekking feel",
      "Strong fit for soft-adventure or recovery-window travel",
      "Easy to combine with wellness, safari, or sightseeing add-ons",
      "Good option for travelers who care more about rhythm than altitude",
    ],
    prep: [
      "Best as a calm scenic route, not a peak-bagging objective",
      "Works especially well in custom private itineraries",
      "Shoulder-season departures are usually operationally straightforward",
    ],
    sourceSlug: "happy-feet-panchase-trek",
    altitudeOverride: 2500,
    bestSeasonsOverride: ["Mar-May", "Oct-Dec"],
  }),
  buildSourceAddition({
    slug: "astam-and-dhampus",
    name: "Astam & Dhampus",
    region: "Pokhara Highlands",
    difficulty: "Introductory",
    permits: ["Local trekking registration as required"],
    access: ["Pokhara transfer", "Private vehicle start and finish"],
    signature:
      "A short village trek with sunset-and-sunrise credibility, ideal when the traveler wants Nepali mountain atmosphere without turning the whole trip into an expedition.",
    summary:
      "A gentle sampler for family groups, low-altitude starters, or custom itineraries that need authentic village texture around Pokhara.",
    stayStyle: "Pokhara hotel + village guesthouse nights",
    image: nepalPhotoLibrary.forestRidge,
    bundle: {
      jeep: "Private transfers keep the short program feeling polished.",
    },
    highlights: [
      "Fast access from Pokhara",
      "Rewarding short trip for soft-adventure travelers",
      "Excellent for family or mixed-ability groups",
      "Useful add-on around longer Nepal itineraries",
    ],
    prep: [
      "Choose it for ease, scenery, and local feel",
      "Great fallback when travelers do not want altitude stress",
      "Works best when paired with a stronger hotel component",
    ],
    sourceSlug: "the-sunset-village-trek-astam-dhampus",
    altitudeOverride: 2100,
    bestSeasonsOverride: ["All season"],
    durationOverride: 3,
  }),
  buildSourceAddition({
    slug: "village-to-village-homestay",
    name: "Village to Village Homestay",
    region: "Annapurna Foothills",
    difficulty: "Introductory",
    permits: ["Local trekking registration as required"],
    access: ["Pokhara road transfer"],
    signature:
      "A culture-first foothills walk designed around village stays, local kitchens, and human-scale Nepal travel.",
    summary:
      "Strong for travelers who care about community immersion, women-led hosting, and softer trekking days that still feel like real travel.",
    stayStyle: "Homestays and community lodges",
    image: nepalPhotoLibrary.forestRidge,
    bundle: {
      jeep: "Private road support makes village-hopping logistics easier to shape.",
    },
    highlights: [
      "Community-led overnight experience",
      "Excellent women-led or family-friendly departure fit",
      "Soft-adventure alternative to teahouse classics",
      "Good short-window cultural trip",
    ],
    prep: [
      "Expectation-setting matters, this is about immersion more than altitude",
      "Best for travelers who want access to local life, not summit drama",
      "Pairs nicely with comfortable Pokhara or Kathmandu hotel stays",
    ],
    sourceSlug: "village-to-village-homestay-trek",
    altitudeOverride: 2200,
    bestSeasonsOverride: ["Oct-May"],
    durationOverride: 4,
  }),
  buildSourceAddition({
    slug: "salt-trade-route",
    name: "Salt Trade Route",
    region: "Mustang Gateway",
    difficulty: "Moderate",
    permits: ["ACAP", "TIMS or equivalent trekking registration"],
    access: ["Jomsom or overland access", "Private jeep options"],
    signature:
      "A Muktinath-and-Jomsom corridor route that leans into history, trade-path atmosphere, and dry mountain character instead of the usual Annapurna talking points.",
    summary:
      "Good for travelers who want a culturally distinctive corridor with manageable duration beyond the mainstream Annapurna trails.",
    stayStyle: "Pokhara stay + Mustang-side lodge chain",
    image: nepalPhotoLibrary.muktinathArea,
    bundle: {
      flight: "Fast Jomsom sectors can shrink the route for tight leave windows.",
      jeep: "Overland access works well for flexible custom pacing.",
    },
    highlights: [
      "Historic trade-route texture",
      "Muktinath access adds pilgrimage and cultural depth",
      "Dry Mustang-side visuals without full Upper Mustang permit cost",
      "Flexible duration and transport design",
    ],
    prep: [
      "Useful bridge between Annapurna and Mustang landscapes",
      "Choose it for cultural identity, not just the walking",
      "Wind and dust planning matter more than on greener routes",
    ],
    sourceSlug: "salt-trade-route-trek-jomsom-muktinath",
    altitudeOverride: 3800,
    bestSeasonsOverride: ["Mar-May", "Oct-Nov"],
    durationOverride: 9,
  }),
  buildSourceAddition({
    slug: "lower-dolpo-trek",
    name: "Lower Dolpo Trek",
    region: "Dolpo",
    difficulty: "Expedition",
    permits: ["Restricted Area Permit", "National Park permit", "Licensed guide required"],
    access: ["Domestic flight", "Remote overland access where needed"],
    signature:
      "The more attainable Dolpo line, still remote, cinematic, and far from standard trekking corridors.",
    summary:
      "For travelers who want Dolpo mystique, Phoksundo-level scenery, and true remoteness without the hardest expedition grade.",
    stayStyle: "Remote lodge and camping support mix",
    image: nepalPhotoLibrary.dolpoThuliBheri,
    bundle: {
      flight: "Domestic flight planning is part of the route plan.",
    },
    highlights: [
      "Remote western Nepal identity with low direct comparison pressure",
      "Phoksundo and high-pass visuals give it a real wow moment",
      "Excellent for serious private groups and documentary-minded travelers",
      "A more accessible Dolpo entry point than the biggest frontier lines",
    ],
    prep: [
      "Logistics need early commitment and realistic contingency planning",
      "Guide quality matters more than polish here",
      "Treat it as a serious remote itinerary, even if the mileage looks modest",
    ],
    sourceSlug: "lower-dolpo-trek",
    altitudeOverride: 5310,
    bestSeasonsOverride: ["May-Oct"],
    durationOverride: 16,
  }),
  buildSourceAddition({
    slug: "tsum-valley-and-manaslu",
    name: "Tsum Valley & Manaslu",
    region: "Manaslu",
    difficulty: "Expedition",
    permits: [
      "Restricted Area Permit",
      "MCAP",
      "ACAP",
      "Tsum restricted-area permit",
      "Licensed guide required",
    ],
    access: ["Private jeep approach and exit"],
    signature:
      "The deeper Manaslu play, adding Tsum Valley’s monastery culture and remoteness to an already serious mountain circuit.",
    summary:
      "For travelers who want the spiritual and cultural dimension of Tsum layered onto the raw mountain drama of the Manaslu corridor.",
    stayStyle: "Kathmandu hotel + remote teahouses with higher-support guide logistics",
    image: nepalPhotoLibrary.manasluSamdo,
    bundle: {
      jeep: "Private jeep access is the cleanest way to manage a long remote program.",
    },
    highlights: [
      "Combines Tsum Valley culture with Manaslu scale",
      "Restricted-area access keeps the route quiet and distinctive",
      "Excellent for repeat Nepal trekkers who want a stronger story",
      "Serious trip architecture with little crowd overlap",
    ],
    prep: [
      "Permit lead time and minimum-group rules need early attention",
      "Not a casual circuit; pacing and logistics both matter here",
      "Best as a guided remote departure",
    ],
    sourceSlug: "mount-manaslu-trek-tsum-valleymanaslu",
    altitudeOverride: 5106,
    bestSeasonsOverride: ["Mar-May", "Oct-Nov"],
    durationOverride: 19,
  }),
  buildSourceAddition({
    slug: "tilicho-lake-and-annapurna-massif",
    name: "Tilicho Lake & Annapurna Massif",
    region: "Annapurna",
    difficulty: "Expedition",
    permits: ["ACAP", "TIMS or equivalent trekking registration"],
    access: ["Jeep-supported Annapurna approach", "Flexible exit from Jomsom or Pokhara"],
    signature:
      "The Annapurna Circuit with Tilicho Lake added for more altitude, bigger scenery, and a memorable high-mountain detour.",
    summary:
      "A bigger, more committed Annapurna journey for trekkers who want the circuit plus a high-altitude lake detour.",
    stayStyle: "Kathmandu/Pokhara hotels + high-altitude teahouse chain",
    image: nepalPhotoLibrary.poonHillDusk,
    bundle: {
      jeep: "Jeep compression on lower sections keeps the long itinerary more comfortable and time-efficient.",
      flight: "Jomsom exit options help when leave windows are tight.",
    },
    highlights: [
      "Tilicho Lake adds a distinct high-altitude side journey",
      "High-altitude lake and pass crossing feel serious",
      "Great choice for travelers already leaning toward Annapurna",
      "Combines variety, challenge, and memorable mountain days",
    ],
    prep: [
      "Best for trekkers ready for an advanced Annapurna route",
      "Altitude and weather need early planning",
      "Keep acclimatization protected when shortening the itinerary",
    ],
    sourceSlug: "tilicho-lake-annapurna-massif-trek",
    altitudeOverride: 5416,
    bestSeasonsOverride: ["Apr-May", "Oct-Nov"],
    durationOverride: 18,
  }),
];

export const trekRoutes = [...baseTrekRoutes, ...sourceRouteAdditions];

export const newSourceRouteSlugs = new Set(
  sourceRouteAdditions.map((route) => route.slug),
);

export function isNewSourceRoute(slug: string) {
  return newSourceRouteSlugs.has(slug);
}

export const featuredTreks = trekRoutes.slice(0, 6);

export function getTrekBySlug(slug: string) {
  return trekRoutes.find((route) => route.slug === slug);
}
