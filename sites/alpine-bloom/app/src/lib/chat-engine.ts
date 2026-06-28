import { guideProfiles } from "../data/green-pastures.ts";
import { routeOptions } from "../data/ops-demo.ts";

export type ConciergeMessage = {
  role: "user" | "assistant";
  content: string;
};

export function buildConciergeSystemPrompt() {
  return [
    "You are the Alpine Bloom concierge for women exploring the Himalayas.",
    "Every reply must assume women travelers, women-only trips, and Nepali women guide matching.",
    "Help with route comparison, altitude pacing, safety, trust, permits, seasons, budget, and comfort level.",
    "Recommend only Alpine Bloom's women-led guide support, women traveler examples, and brand-safe personas.",
    "Do not invent live prices, permit rules, availability, medical advice, or guaranteed bookings.",
    "Use concise, warm, practical paragraphs. Prefer concrete next steps over hype.",
  ].join("\n");
}

function lastUser(messages: ConciergeMessage[]) {
  return [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
}

export function generateConciergeReply(messages: ConciergeMessage[]) {
  const query = lastUser(messages).toLowerCase();
  const route = routeOptions.find((item) =>
    [item.name, item.slug].some((value) => query.includes(value.toLowerCase())),
  );
  const guide = guideProfiles.find((item) =>
    [item.name, item.role, ...item.regions, ...item.languages, ...item.specialties].some((value) =>
      query.includes(value.toLowerCase()),
    ),
  );

  if (route) {
    return `${route.name} is a strong Alpine Bloom fit for a women-only Himalayan trip. I would start by checking your dates, pace, altitude comfort, and whether you want village stays or a more lodge-forward rhythm. For a real proposal, send the route, departure window, group size, and women guide support notes through the booking form.`;
  }

  if (guide) {
    return `${guide.name} is one of Alpine Bloom's Nepali women guides for ${guide.regions.slice(0, 2).join(" and ")}. Her strengths are ${guide.specialties.slice(0, 2).join(" and ")}, with ${guide.languages.join(" / ")} language support. The ops desk still confirms final guide matches by date, route, altitude profile, and each woman's support needs.`;
  }

  if (query.includes("guide") || query.includes("woman") || query.includes("women")) {
    const names = guideProfiles.slice(0, 3).map((item) => item.name).join(", ");
    return `Yes. Alpine Bloom centers Nepali women guides and women-only small groups. The roster includes guides like ${names}, matched by region, language, altitude profile, and the kind of trust and support each woman wants on trail.`;
  }

  if (query.includes("permit") || query.includes("altitude") || query.includes("insurance")) {
    return "For Nepal, treat altitude pacing, route permits, women-led safety planning, and evacuation-capable insurance as core planning items. The safest plan leaves buffer days and does not trade acclimatization for speed.";
  }

  if (query.includes("book") || query.includes("price") || query.includes("quote")) {
    return "The next step is a proposal request: route, dates, group size, style, and any women guide or altitude support needs. Alpine Bloom will only treat it as submitted when the booking backend confirms storage.";
  }

  return "I can help compare Alpine Bloom routes, think through altitude and seasonality, or shape a women-only private trek brief with Nepali women guide matching. Tell me your dream route, dates, and group size.";
}
