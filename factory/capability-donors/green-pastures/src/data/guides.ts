export type GuideProfile = {
  slug: string;
  name: string;
  title: string;
  focus: string;
  gender: "Women-led" | "Men-led";
  languages: string[];
  specialties: string[];
  image: string;
  bio: string;
};

export const guideProfiles: GuideProfile[] = [
  {
    slug: "sushil-nepali",
    name: "Sushil Nepali",
    title: "Mustang-born mountain guide and coffee trail host",
    focus: "Nature-first trekking across Nepal with calm mountain pacing and local coffee stops.",
    gender: "Men-led",
    languages: ["English", "Nepali", "Hindi"],
    specialties: ["Upper Mustang", "Annapurna", "Coffee farm add-ons"],
    image: "/images/guides/sushil-nepali.png",
    bio: "Sushil is from Mustang and has trekked all over Nepal. He loves wild landscapes, clear mountain days, and sharing Nepal's growing coffee culture with travelers who want the route to feel personal.",
  },
  {
    slug: "maya-sherpa",
    name: "Maya Sherpa",
    title: "Lead Everest & women-only departures guide",
    focus: "Confidence-first alpine pacing for women, couples, and first Himalayan travelers.",
    gender: "Women-led",
    languages: ["English", "Nepali", "Sherpa"],
    specialties: ["Everest Base Camp", "Gokyo", "Altitude confidence coaching"],
    image: "/images/guides/maya-sherpa.jpg",
    bio: "Maya is the kind of guide Americans and Europeans instantly trust. Calm, fast with logistics, and strong on altitude judgment, she leads some of the smoothest Khumbu departures in the business.",
  },
  {
    slug: "nima-lama",
    name: "Nima Lama",
    title: "Manaslu and remote-route guide",
    focus: "Remote valleys, permit handling, and careful mountain weather calls.",
    gender: "Men-led",
    languages: ["English", "Nepali", "Tibetan"],
    specialties: ["Manaslu", "Nar Phu", "Upper Mustang"],
    image: "/images/guides/nima-lama.jpg",
    bio: "Nima specializes in remote departures where paperwork, pacing, and contingency planning matter from the first day.",
  },
  {
    slug: "asha-gurung",
    name: "Asha Gurung",
    title: "Annapurna circuit and family travel lead",
    focus: "Warm service, family-safe itineraries, and culturally rich lodge routing.",
    gender: "Women-led",
    languages: ["English", "Nepali", "Hindi"],
    specialties: ["Annapurna Base Camp", "Poon Hill", "Family departures"],
    image: "/images/guides/asha-gurung.jpg",
    bio: "Asha is brilliant with mixed-age groups and travelers who want mountain days that feel calm, welcoming, and well paced.",
  },
  {
    slug: "sanjay-thapa",
    name: "Sanjay Thapa",
    title: "Overland and jeep-hybrid expedition guide",
    focus: "Custom private journeys combining trekking, heli sightseeing, and high-comfort transport.",
    gender: "Men-led",
    languages: ["English", "Nepali"],
    specialties: ["Upper Mustang", "Jeep + trek hybrids", "Luxury private departures"],
    image: "/images/guides/sanjay-thapa.jpg",
    bio: "Sanjay is steady with private departures, overland logistics, and comfort-focused itineraries from Kathmandu onward.",
  },
  {
    slug: "sonam-dolma",
    name: "Sonam Dolma",
    title: "High-altitude cultural storyteller",
    focus: "Women-led cultural expeditions and photography-friendly pacing on lesser-known routes.",
    gender: "Women-led",
    languages: ["English", "Nepali", "Tibetan"],
    specialties: ["Upper Mustang", "Dolpo", "Private photo trips"],
    image: "/images/guides/sonam-dolma.jpg",
    bio: "Sonam brings rare calm and deep cultural knowledge, especially on routes where village life and landscape matter equally.",
  },
  {
    slug: "pasang-rai",
    name: "Pasang Rai",
    title: "Fitness-forward summit trail captain",
    focus: "Performance-minded travelers, endurance trekkers, and ambitious classic circuit itineraries.",
    gender: "Men-led",
    languages: ["English", "Nepali"],
    specialties: ["Everest", "Three Passes", "Kanchenjunga"],
    image: "/images/guides/pasang-rai.jpg",
    bio: "Pasang is for travelers who want clarity, strong pacing, and a guide who keeps the mountain plan disciplined.",
  },
];
