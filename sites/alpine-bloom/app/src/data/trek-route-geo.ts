export type TrekWaypoint = {
  id: string;
  name: string;
  altitudeM: number;
  coordinates: [number, number];
  note: string;
  image: string;
  overnight?: boolean;
};

export type TrekMapData = {
  center: [number, number];
  route: Array<[number, number]>;
  waypoints: TrekWaypoint[];
  visualHook: string;
};

const IMG = "/alpine-bloom-assets/generated-photos";

const everest = `${IMG}/everest-women-base-camp.jpg`;
const annapurna = `${IMG}/annapurna-women-ridge.jpg`;
const ghandruk = `${IMG}/ghandruk-women-bloom-trail.jpg`;
const snowy = `${IMG}/langtang-women-high-valley.jpg`;
const monastery = `${IMG}/tengboche-women-monastery.jpg`;

export const trekRouteGeo: Record<string, TrekMapData> = {
  "everest-base-camp": {
    center: [86.785, 27.91],
    visualHook:
      "Classic Khumbu approach where the route builds from Lukla through Namche and Dingboche toward Kala Patthar.",
    route: [
      [86.7314, 27.6886],
      [86.714, 27.805],
      [86.761, 27.836],
      [86.831, 27.892],
      [86.829, 27.981],
      [86.831, 27.995],
    ],
    waypoints: [
      { id: "lukla", name: "Lukla", altitudeM: 2860, coordinates: [86.7314, 27.6886], note: "Short runway arrival and the first place where weather buffers matter.", image: everest },
      { id: "namche", name: "Namche Bazaar", altitudeM: 3440, coordinates: [86.714, 27.805], note: "Main acclimatization anchor with lodges, gear shops, and a true route reset.", image: everest, overnight: true },
      { id: "tengboche", name: "Tengboche", altitudeM: 3860, coordinates: [86.761, 27.836], note: "Monastery stop with the signature Ama Dablam-facing view.", image: monastery },
      { id: "dingboche", name: "Dingboche", altitudeM: 4410, coordinates: [86.831, 27.892], note: "A key acclimatization stop where steady pacing matters most.", image: snowy, overnight: true },
      { id: "gorakshep", name: "Gorak Shep", altitudeM: 5164, coordinates: [86.829, 27.981], note: "Staging point for base camp and helicopter contingency planning.", image: snowy },
      { id: "kalapatthar", name: "Kala Patthar", altitudeM: 5545, coordinates: [86.831, 27.995], note: "The classic sunrise viewpoint above camp.", image: everest },
    ],
  },
  "annapurna-circuit": {
    center: [84.02, 28.67],
    visualHook:
      "A long valley-to-pass traverse where jeep access, Manang acclimatization, and Thorong La are easy to understand.",
    route: [
      [84.376, 28.234],
      [84.229, 28.553],
      [84.025, 28.669],
      [83.94, 28.783],
      [83.943, 28.796],
      [83.871, 28.817],
    ],
    waypoints: [
      { id: "besisahar", name: "Besisahar", altitudeM: 760, coordinates: [84.376, 28.234], note: "Road gateway where jeep compression options begin.", image: annapurna },
      { id: "chame", name: "Chame", altitudeM: 2670, coordinates: [84.229, 28.553], note: "A practical place to start walking after the road approach.", image: ghandruk },
      { id: "manang", name: "Manang", altitudeM: 3519, coordinates: [84.025, 28.669], note: "Acclimatization hub with strong lodge, bakery, and day-hike infrastructure.", image: annapurna, overnight: true },
      { id: "thorong-phedi", name: "Thorong Phedi", altitudeM: 4525, coordinates: [83.94, 28.783], note: "Pre-pass staging where weather, sleep, and timing are decisive.", image: snowy },
      { id: "thorong-la", name: "Thorong La", altitudeM: 5416, coordinates: [83.943, 28.796], note: "The route's highest pass crossing and most exposed mountain day.", image: snowy },
      { id: "muktinath", name: "Muktinath", altitudeM: 3800, coordinates: [83.871, 28.817], note: "Spiritual and logistical reset after the pass before the Jomsom/Pokhara exit.", image: monastery },
    ],
  },
  "mardi-himal": {
    center: [83.92, 28.43],
    visualHook:
      "A compact ridge trek where the line of travel stays visually close to Machhapuchhre for much of the journey.",
    route: [
      [83.833, 28.355],
      [83.888, 28.391],
      [83.93, 28.421],
      [83.942, 28.453],
      [83.951, 28.469],
    ],
    waypoints: [
      { id: "kande", name: "Kande", altitudeM: 1770, coordinates: [83.833, 28.355], note: "Quick transfer out of Pokhara and onto the ridge-bound approach.", image: annapurna },
      { id: "forest-camp", name: "Forest Camp", altitudeM: 2550, coordinates: [83.888, 28.391], note: "Tree-line transition and a strong first-night confidence builder.", image: ghandruk, overnight: true },
      { id: "low-camp", name: "Low Camp", altitudeM: 2990, coordinates: [83.93, 28.421], note: "The ridge becomes the story here, with Fishtail stepping into view.", image: snowy },
      { id: "high-camp", name: "High Camp", altitudeM: 3580, coordinates: [83.942, 28.453], note: "Compact alpine staging for the dawn push.", image: snowy, overnight: true },
      { id: "viewpoint", name: "Mardi Viewpoint", altitudeM: 4500, coordinates: [83.951, 28.469], note: "A short, sharp summit-style finish with wide Annapurna and Machhapuchhre views.", image: annapurna },
    ],
  },
  "langtang-valley": {
    center: [85.5, 28.22],
    visualHook:
      "A no-flight Himalayan valley with glacier views unfolding directly out of the road corridor.",
    route: [
      [85.308, 28.14],
      [85.456, 28.21],
      [85.562, 28.246],
      [85.607, 28.212],
      [85.614, 28.223],
    ],
    waypoints: [
      { id: "syabrubesi", name: "Syabrubesi", altitudeM: 1460, coordinates: [85.308, 28.14], note: "Road-head logistics point that removes Lukla-style weather dependency.", image: ghandruk },
      { id: "lama-hotel", name: "Lama Hotel", altitudeM: 2470, coordinates: [85.456, 28.21], note: "Forest-cloaked riverside stop that breaks the valley climb well.", image: ghandruk, overnight: true },
      { id: "langtang", name: "Langtang Village", altitudeM: 3430, coordinates: [85.562, 28.246], note: "Broad mountain valley views begin to dominate here.", image: snowy },
      { id: "kyanjin", name: "Kyanjin Gompa", altitudeM: 3870, coordinates: [85.607, 28.212], note: "Main high camp with monastery, yak cheese stop, and flexible acclimatization walks.", image: monastery, overnight: true },
      { id: "kyanjin-ri", name: "Kyanjin Ri", altitudeM: 4773, coordinates: [85.614, 28.223], note: "High viewpoint with huge glacier and spire views.", image: snowy },
    ],
  },
  "poon-hill-ghandruk": {
    center: [83.74, 28.38],
    visualHook:
      "A compact soft-adventure line with a big sunrise viewpoint and gentle logistics from Pokhara.",
    route: [
      [83.777, 28.237],
      [83.778, 28.329],
      [83.698, 28.403],
      [83.69, 28.404],
      [83.809, 28.379],
    ],
    waypoints: [
      { id: "nayapul", name: "Nayapul", altitudeM: 1070, coordinates: [83.777, 28.237], note: "Easy trailhead from Pokhara for a short Annapurna foothills trek.", image: annapurna },
      { id: "ulleri", name: "Ulleri", altitudeM: 2070, coordinates: [83.778, 28.329], note: "The famous stair section and the point where fitness expectations become obvious.", image: ghandruk },
      { id: "ghorepani", name: "Ghorepani", altitudeM: 2870, coordinates: [83.698, 28.403], note: "Comfortable village stop before the dawn push to the viewpoint.", image: annapurna, overnight: true },
      { id: "poon-hill", name: "Poon Hill", altitudeM: 3210, coordinates: [83.69, 28.404], note: "One of Nepal's highest-return sunrise viewpoints for a relatively short trip.", image: snowy },
      { id: "ghandruk", name: "Ghandruk", altitudeM: 1940, coordinates: [83.809, 28.379], note: "Cultural finish that pairs perfectly with Pokhara recovery nights.", image: monastery },
    ],
  },
};

export function getTrekMapData(slug: string) {
  return trekRouteGeo[slug] ?? null;
}
