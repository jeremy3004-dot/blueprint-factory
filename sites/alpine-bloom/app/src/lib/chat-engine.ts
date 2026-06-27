import { routeOptions } from "@/data/ops-demo";

export type ConciergeMessage = {
  role: "user" | "assistant";
  content: string;
};

function lastUser(messages: ConciergeMessage[]) {
  return [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
}

export function generateConciergeReply(messages: ConciergeMessage[]) {
  const query = lastUser(messages).toLowerCase();
  const route = routeOptions.find((item) =>
    [item.name, item.slug].some((value) => query.includes(value.toLowerCase())),
  );

  if (route) {
    return `${route.name} is a strong Alpine Bloom fit. I would start by checking your dates, pace, altitude comfort, and whether you want village stays or a more lodge-forward rhythm. For a real proposal, send the route, departure window, group size, and notes through the booking form.`;
  }

  if (query.includes("guide") || query.includes("woman") || query.includes("women")) {
    return "Yes. Alpine Bloom centers Nepali women guides and small groups. The ops desk matches guides by region, language, altitude profile, and the kind of support each traveler wants on trail.";
  }

  if (query.includes("permit") || query.includes("altitude") || query.includes("insurance")) {
    return "For Nepal, treat altitude pacing, route permits, and evacuation-capable insurance as core planning items. The safest plan leaves buffer days and does not trade acclimatization for speed.";
  }

  if (query.includes("book") || query.includes("price") || query.includes("quote")) {
    return "The next step is a proposal request: route, dates, group size, style, and any support needs. This demo captures the request locally, then a connected ops backend can store it and notify the team.";
  }

  return "I can help compare Alpine Bloom routes, think through altitude and seasonality, or shape a women-led private trek brief. Tell me your dream route, dates, and group size.";
}
