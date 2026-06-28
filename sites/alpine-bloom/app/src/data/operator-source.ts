export type OperatorSourceFact = {
  label: string;
  value: string;
};

export type OperatorSourceItinerary = {
  day: number | null;
  title: string;
  details: string;
  ascent?: string;
  distance?: string;
  duration?: string;
};

export type OperatorSourceRoute = {
  slug: string;
  title: string;
  updatedAt: string | null;
  minDurationDays: number | null;
  maxDurationDays: number | null;
  durationType: string;
  costUsd: number | null;
  sourceDifficulty: string;
  highestAltitudeM: number | null;
  seasonWindow: string | null;
  groupSize: string | null;
  accommodation: string | null;
  activity: string | null;
  description: string[];
  highlights: string[];
  includeItems: string[];
  excludeItems: string[];
  facts: OperatorSourceFact[];
  itinerary: OperatorSourceItinerary[];
};

export const operatorSourceRoutes: OperatorSourceRoute[] = [
  {
    slug: "alpine-everest-base-camp-snapshot",
    title: "Everest Base Camp women-led snapshot",
    updatedAt: "2026-06-28",
    minDurationDays: 14,
    maxDurationDays: 16,
    durationType: "14-16 days",
    costUsd: 2390,
    sourceDifficulty: "Challenging",
    highestAltitudeM: 5545,
    seasonWindow: "Mar-May and Oct-Nov",
    groupSize: "2-10 women travelers",
    accommodation: "Kathmandu hotel and twin-share teahouse rooms where available",
    activity: "high-altitude teahouse trekking",
    description: [
      "Everest Base Camp works best with a measured ascent, two acclimatization pauses, and a Nepali women guide team that can read altitude, appetite, sleep, and morale before the route gets exposed.",
      "Alpine Bloom treats the classic trail as a women-led confidence route: clear briefing, conservative pacing, and honest weather buffers around Lukla flights.",
    ],
    highlights: ["Kala Patthar sunrise", "Namche acclimatization", "Tengboche monastery"],
    includeItems: [
      "Nepali woman lead guide or Nepali women guide team when available",
      "Kathmandu briefing, trek permits, route logistics, and airport support",
      "Lodging during the trek, daily meals on trail, and porter support",
      "Altitude check-ins, pace planning, and emergency coordination support",
      "Domestic flight coordination with weather-buffer planning",
    ],
    excludeItems: [
      "International flights and Nepal visa",
      "Travel insurance with helicopter evacuation",
      "Personal drinks, charging, hot showers, snacks, and tips",
      "Optional helicopter return or premium lodge upgrades",
    ],
    facts: [
      { label: "Primary risk", value: "Altitude and Lukla weather" },
      { label: "Best fit", value: "Women who want the iconic Everest line with strong support" },
    ],
    itinerary: [
      {
        day: 3,
        title: "Namche acclimatization",
        details: "Hold the pace, check sleep and appetite, and walk high enough to adapt.",
        duration: "4-5 hrs",
      },
      {
        day: 9,
        title: "Base Camp approach",
        details: "Move through Lobuche and Gorak Shep with extra attention to hydration and warmth.",
        duration: "6-7 hrs",
      },
    ],
  },
  {
    slug: "alpine-annapurna-circuit-snapshot",
    title: "Annapurna Circuit women-led snapshot",
    updatedAt: "2026-06-28",
    minDurationDays: 13,
    maxDurationDays: 16,
    durationType: "13-16 days",
    costUsd: 2190,
    sourceDifficulty: "Challenging",
    highestAltitudeM: 5416,
    seasonWindow: "Mar-May and Oct-Dec",
    groupSize: "2-12 women travelers",
    accommodation: "Kathmandu and Pokhara hotels with teahouses on route",
    activity: "high-pass teahouse trekking with jeep-supported access",
    description: [
      "The Annapurna Circuit is strongest when it is shaped around the group's energy: jeep compression can protect time, while a careful Manang pause protects the Thorong La crossing.",
      "For women-only private groups, the route gives huge variety without forcing everyone into one rigid expedition style.",
    ],
    highlights: ["Thorong La crossing", "Manang acclimatization", "Mustang-side descent"],
    includeItems: [
      "Women-led guide matching and porter coordination",
      "ACAP and trekking registration support",
      "Private road transfers where they improve safety or comfort",
      "Teahouse lodging and meals during the trek",
      "Pokhara recovery planning after the high pass",
    ],
    excludeItems: [
      "International flights and insurance",
      "Personal drinks, laundry, charging, hot showers, and tips",
      "Optional flights, jeep upgrades, and wellness extensions",
      "Gear purchases or rentals not listed in the final proposal",
    ],
    facts: [
      { label: "Primary risk", value: "Pass weather and major climate shifts" },
      { label: "Best fit", value: "Women who want variety, culture, and a real high-pass story" },
    ],
    itinerary: [
      {
        day: 6,
        title: "Manang rest day",
        details: "Use a slow day for acclimatization, gear checks, and group confidence before the pass.",
        duration: "2-4 hrs optional walking",
      },
      {
        day: 10,
        title: "Thorong La",
        details: "Start early, cross steadily, and descend before weather builds.",
        duration: "7-9 hrs",
      },
    ],
  },
  {
    slug: "alpine-mardi-himal-snapshot",
    title: "Mardi Himal women-led snapshot",
    updatedAt: "2026-06-28",
    minDurationDays: 5,
    maxDurationDays: 7,
    durationType: "5-7 days",
    costUsd: 990,
    sourceDifficulty: "Moderate",
    highestAltitudeM: 4500,
    seasonWindow: "Mar-May and Oct-Nov",
    groupSize: "1-8 women travelers",
    accommodation: "Pokhara hotel and simple ridge lodges",
    activity: "compact ridge trekking",
    description: [
      "Mardi Himal is the quickest way to feel close to big Annapurna scenery without the logistics of a long circuit.",
      "It is especially good for women travelers who want a first Himalayan trek with strong guide presence and a clear exit plan back to Pokhara.",
    ],
    highlights: ["Machhapuchhre close views", "short Nepal window", "Pokhara recovery"],
    includeItems: [
      "Women guide match, Pokhara transfer, ACAP support, and route briefing",
      "Trail lodging, meals during the trek, and porter support where requested",
      "Pacing guidance for first-time Himalayan trekkers",
      "Pokhara arrival and recovery-night coordination",
    ],
    excludeItems: [
      "International flights, insurance, and personal gear",
      "Personal snacks, bottled drinks, showers, charging, and tips",
      "Paragliding, spa, rafting, or other Pokhara add-ons",
    ],
    facts: [
      { label: "Primary risk", value: "Fast altitude gain on a short route" },
      { label: "Best fit", value: "Women with limited time who still want mountain drama" },
    ],
    itinerary: [
      {
        day: 3,
        title: "High Camp",
        details: "Step above the forest into open ridge views and check warmth before sunrise.",
        duration: "5-6 hrs",
      },
    ],
  },
  {
    slug: "alpine-langtang-valley-snapshot",
    title: "Langtang Valley women-led snapshot",
    updatedAt: "2026-06-28",
    minDurationDays: 8,
    maxDurationDays: 10,
    durationType: "8-10 days",
    costUsd: 1380,
    sourceDifficulty: "Moderate",
    highestAltitudeM: 4984,
    seasonWindow: "Mar-May and Oct-Nov",
    groupSize: "2-10 women travelers",
    accommodation: "Kathmandu hotel and character teahouses",
    activity: "valley trekking with overland access",
    description: [
      "Langtang Valley keeps the Himalayan feeling close to Kathmandu and removes domestic-flight risk from the plan.",
      "It is a strong women-led choice when the group wants culture, glaciers, and private overland logistics without committing to the Everest corridor.",
    ],
    highlights: ["Kyanjin Gompa", "no domestic flight", "glacier viewpoints"],
    includeItems: [
      "Nepali women guide support and private overland transfer planning",
      "National park permit support and trekking registration guidance",
      "Teahouse lodging, trail meals, and flexible Kyanjin viewpoint planning",
      "Safety checks for altitude, road timing, and weather windows",
    ],
    excludeItems: [
      "International flights, visa, insurance, and evacuation cover",
      "Personal drinks, charging, snacks, hot showers, and tips",
      "Private photography, yoga, or wellness add-ons unless quoted",
    ],
    facts: [
      { label: "Primary risk", value: "Road fatigue and high viewpoint choices" },
      { label: "Best fit", value: "Women wanting mountain scale without flight uncertainty" },
    ],
    itinerary: [
      {
        day: 5,
        title: "Kyanjin Gompa",
        details: "Settle into the high valley and choose the right viewpoint based on weather and energy.",
        duration: "3-6 hrs optional walking",
      },
    ],
  },
  {
    slug: "alpine-poon-hill-ghandruk-snapshot",
    title: "Poon Hill and Ghandruk women-led snapshot",
    updatedAt: "2026-06-28",
    minDurationDays: 4,
    maxDurationDays: 5,
    durationType: "4-5 days",
    costUsd: 790,
    sourceDifficulty: "Introductory",
    highestAltitudeM: 3210,
    seasonWindow: "Mar-May and Oct-Dec",
    groupSize: "1-10 women travelers",
    accommodation: "Pokhara hotel and comfortable village lodges",
    activity: "introductory lodge trekking",
    description: [
      "Poon Hill and Ghandruk is the Alpine Bloom soft landing: sunrise, village warmth, and enough trail texture to feel earned without pushing altitude too hard.",
      "It is the safest first recommendation for women who want a beautiful Himalayan sampler before a longer Nepal trip.",
    ],
    highlights: ["Poon Hill sunrise", "Ghandruk village stay", "low altitude risk"],
    includeItems: [
      "Women guide match, Pokhara transfer, ACAP support, and trail briefing",
      "Village lodge stays, trail meals, and porter support where requested",
      "Gentle pacing for first-time trekkers or multi-age women-only groups",
      "Return-to-Pokhara recovery planning",
    ],
    excludeItems: [
      "International flights, visa, insurance, and personal gear",
      "Personal drinks, snacks, charging, hot showers, and tips",
      "Chitwan, spa, or longer Nepal extensions unless quoted",
    ],
    facts: [
      { label: "Primary risk", value: "Stone steps and early sunrise start" },
      { label: "Best fit", value: "First-time women trekkers and short Nepal windows" },
    ],
    itinerary: [
      {
        day: 2,
        title: "Ghorepani",
        details: "Move through forest lodges and settle early before the Poon Hill sunrise wake-up.",
        duration: "5-6 hrs",
      },
    ],
  },
];

export const operatorSourceBySlug = Object.fromEntries(
  operatorSourceRoutes.map((route) => [route.slug, route]),
) as Record<string, OperatorSourceRoute>;

export function getOperatorSourceRoute(sourceSlug?: string | null) {
  if (!sourceSlug) return null;
  return operatorSourceBySlug[sourceSlug] ?? null;
}
