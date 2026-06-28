import { featuredTreks, trekRoutes } from "@/data/treks";
import { companyProfile } from "@/data/company";
import { guideProfiles } from "@/data/guides";
import { formatStartingRate } from "@/lib/route-pricing";

export type ConciergeMessage = {
  role: "user" | "assistant";
  content: string;
};

const bookingIntentTerms = [
  "book",
  "booking",
  "reserve",
  "reservation",
  "proposal",
  "quote",
  "price for my group",
  "dates",
  "available",
  "availability",
];

function matchTrek(query: string) {
  const lowered = query.toLowerCase();

  return trekRoutes.find((route) => {
    const values = [
      route.name,
      route.region,
      route.slug,
      route.signature,
      route.summary,
      ...route.highlights,
      ...route.permits,
    ]
      .join(" ")
      .toLowerCase();

    return values.includes(lowered) || lowered.split(" ").some((term) => values.includes(term));
  });
}

function pickGuide(query: string) {
  const lowered = query.toLowerCase();

  if (lowered.includes("woman") || lowered.includes("female")) {
    return guideProfiles.find((guide) => guide.gender === "Women-led");
  }

  return guideProfiles.find((guide) =>
    guide.specialties.join(" ").toLowerCase().includes(lowered),
  );
}

export function hasBookingIntent(messages: ConciergeMessage[]) {
  const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const query = lastUserMessage?.content.toLowerCase() ?? "";

  return bookingIntentTerms.some((term) => query.includes(term));
}

function buildBookingCallToAction() {
  return [
    "To book, use the Book tab on this site first: /book.",
    "Submit your route, dates, group size, style, and notes there so the team can prepare a detailed proposal.",
    `After submitting, you can also reach ${companyProfile.shortName} at ${companyProfile.email} or ${companyProfile.phones.join(" / ")} for follow-up.`,
  ].join(" ");
}

export function applyBookingCallToAction(
  reply: string,
  messages: ConciergeMessage[],
) {
  if (!hasBookingIntent(messages)) {
    return reply;
  }

  const bookingCallToAction = buildBookingCallToAction();

  if (reply.includes("/book") || reply.toLowerCase().includes("book tab")) {
    return reply;
  }

  return `${bookingCallToAction}\n\n${reply}`;
}

export function buildConciergeSystemPrompt() {
  const routeDigest = trekRoutes
    .map(
      (route) =>
        `${route.name}: ${route.durationDays} days, ${route.difficulty}, ${route.region}, best seasons ${route.bestSeasons.join(
          "/",
        )}, starting rate ${formatStartingRate(route.fromUsd)}, highlights ${route.highlights.slice(0, 2).join("; ")}`,
    )
    .join("\n");

  const guideDigest = guideProfiles
    .map(
      (guide) =>
        `${guide.name}: ${guide.gender}, ${guide.title}, specialties ${guide.specialties.join(", ")}`,
    )
    .join("\n");

  return [
    `You are the ${companyProfile.legalName} trip desk.`,
    `Company facts: based in ${companyProfile.address}; email ${companyProfile.email}; phones ${companyProfile.phones.join(", ")}; PAN ${companyProfile.pan}.`,
    "Audience: travelers planning guided Nepal trips.",
    "Priorities: route matching, altitude realism, permit clarity, luxury/logistics upgrades, women-led guide options, heli/jeep hybrids, and practical prep.",
    "Write like a reliable local trekking operator: concise, confident, useful, and honest about tradeoffs.",
    "Never invent permit certainty when a route is restricted. Flag where guide support or weather buffers matter.",
    "When relevant, steer users toward route pages, guide matching, and booking a proposal.",
    "For explicit booking, reservation, quote, availability, or proposal intent, the main call to action must be the Book tab on this site: /book. Tell travelers to submit the booking form there first with dates, route, group size, style, and notes. Email, WhatsApp, and phone are secondary follow-up options only after the Book tab/form.",
    `Route catalog:\n${routeDigest}`,
    `Guide roster:\n${guideDigest}`,
  ].join("\n\n");
}

export function generateConciergeReply(messages: ConciergeMessage[]) {
  const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const query = lastUserMessage?.content ?? "";
  const lowered = query.toLowerCase();

  const matchedTrek = matchTrek(query);
  const matchedGuide = pickGuide(query);

  let reply: string;

  if (matchedTrek) {
    reply = [
      `For ${matchedTrek.name}, the strongest fit is usually ${matchedTrek.durationDays} days in ${matchedTrek.region} with a ${matchedTrek.difficulty.toLowerCase()} profile.`,
      `Best seasons: ${matchedTrek.bestSeasons.join(", ")}. Key permits: ${matchedTrek.permits.join(", ")}.`,
      `If you want a premium upgrade path, I would steer you toward: ${matchedTrek.bundle.helicopter ?? matchedTrek.bundle.jeep ?? matchedTrek.bundle.flight ?? "a custom hotel and transfer layer around the core trek."}`,
    ].join(" ");
    return applyBookingCallToAction(reply, messages);
  }

  if (lowered.includes("guide") && matchedGuide) {
    reply = [
      `${matchedGuide.name} is a strong fit. ${matchedGuide.title}.`,
      `They lead ${matchedGuide.specialties.join(", ")} and speak ${matchedGuide.languages.join(", ")}.`,
      `${matchedGuide.bio}`,
    ].join(" ");
    return applyBookingCallToAction(reply, messages);
  }

  if (lowered.includes("visa") || lowered.includes("permit") || lowered.includes("insurance")) {
    reply = "For Nepal trip readiness, I’d treat three items as non-negotiable: visa prep before landing, altitude-capable travel insurance, and route-specific permit planning. Restricted routes like Manaslu, Nar Phu, Upper Mustang, Dolpo, and Kanchenjunga should be sold as guided packages because guide and permit rules are part of the product, not an afterthought.";
    return applyBookingCallToAction(reply, messages);
  }

  if (lowered.includes("best") || lowered.includes("recommend")) {
    reply = `If you want the best all-around first premium Nepal trek, start with ${featuredTreks[0].name} or ${featuredTreks[2].name}. If you want culture and jeep-friendly flexibility, choose Upper Mustang. If you want fewer crowds but serious mountain feel, Manaslu or Gokyo are stronger picks.`;
    return applyBookingCallToAction(reply, messages);
  }

  if (lowered.includes("flight")) {
    reply = "For Lukla-bound trips, I would plan around weather risk from the start. I can help you think through buffer nights, domestic connections, and when a helicopter or jeep-supported alternative makes more sense than forcing a tight flight schedule.";
    return applyBookingCallToAction(reply, messages);
  }

  reply = `I’m the ${companyProfile.shortName} trip desk. Ask me to compare Everest vs Annapurna, choose a route by number of days, suggest women-led guides, explain permits, or shape a heli or jeep-supported trek plan.`;
  return applyBookingCallToAction(reply, messages);
}
