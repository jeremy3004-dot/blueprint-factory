import {
  AUTHOR_NAME,
  AUTHOR_URL,
  SITE_ORIGIN,
  WRITING_FEED_TITLE,
  WRITING_FEED_URL
} from "../../authority";

export const dynamic = "force-static";

const publicationDate = "2026-07-18";
const timestamp = `${publicationDate}T00:00:00Z`;
const writingUrl = `${SITE_ORIGIN}/writing`;
const description =
  "Engineering writing by Jeremy Joseph Curry, a Software Engineer & App Developer based in Nepal.";

const articles = [
  {
    title: "Shipping an iOS App from Nepal: My Release Evidence Method",
    url: `${SITE_ORIGIN}/writing/shipping-ios-app-from-nepal`,
    description:
      "Jeremy Joseph Curry explains the release evidence method he uses to connect source code, IPA identity, TestFlight distribution, App Store metadata, and the public product page."
  },
  {
    title: "From Idea to Launch: The Five Product Contracts I Define Before I Build",
    url: `${SITE_ORIGIN}/writing/five-product-contracts`,
    description:
      "Jeremy Joseph Curry explains five product contracts for problem definition, interface states, data integrity, bounded AI behavior, and release evidence."
  },
  {
    title: "Reading the HimalRx Workflow as Decisions, Not Screens",
    url: `${SITE_ORIGIN}/writing/reading-the-himalrx-workflow-as-decisions-not-screens`,
    description:
      "Jeremy Joseph Curry examines the publicly presented HimalRx workflow through batch-aware inventory, connected counter actions, role-specific views, alerts, history, and operational evidence."
  }
] as const;

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;"
    };
    return entities[character];
  });
}

function authorXml() {
  return `    <author>
      <name>${escapeXml(AUTHOR_NAME)}</name>
      <uri>${escapeXml(AUTHOR_URL)}</uri>
    </author>`;
}

export function GET() {
  const entries = articles
    .map(
      (article) => `  <entry>
    <title>${escapeXml(article.title)}</title>
    <id>${escapeXml(article.url)}</id>
    <link rel="alternate" type="text/html" href="${escapeXml(article.url)}" />
    <published>${timestamp}</published>
    <updated>${timestamp}</updated>
    <summary>${escapeXml(article.description)}</summary>
${authorXml()}
  </entry>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
  <title>${escapeXml(WRITING_FEED_TITLE)}</title>
  <subtitle>${escapeXml(description)}</subtitle>
  <link rel="self" type="application/atom+xml" href="${escapeXml(WRITING_FEED_URL)}" />
  <link rel="alternate" type="text/html" href="${escapeXml(writingUrl)}" />
  <link rel="related" type="text/html" href="${escapeXml(`${SITE_ORIGIN}/`)}" title="${escapeXml(AUTHOR_NAME)}" />
  <id>${escapeXml(WRITING_FEED_URL)}</id>
  <updated>${timestamp}</updated>
${authorXml()}
${entries}
</feed>
`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8"
    }
  });
}
