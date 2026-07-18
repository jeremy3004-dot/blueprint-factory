import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = process.env.AUTHORITY_OUT_ROOT
  ? path.resolve(process.env.AUTHORITY_OUT_ROOT)
  : path.join(appRoot, "out");
const origin = "https://jeremyjosephcurry.com";
const authorName = "Jeremy Joseph Curry";
const authorUrl = `${origin}/about`;
const personId = `${origin}/#person`;
const portraitAlt = "Portrait of Jeremy Joseph Curry, software engineer and app developer in Nepal";
const verifiedSameAs = [
  "https://github.com/jeremy3004-dot",
  "https://apps.apple.com/us/developer/jeremy-joseph-curry/id1867562495"
];
const portraitImages = [
  `${origin}/images/jeremy-joseph-curry-1x1.jpg`,
  `${origin}/images/jeremy-joseph-curry-4x3.jpg`,
  `${origin}/images/jeremy-joseph-curry-16x9.jpg`
];
const socialImage = portraitImages[2];
const writingIndexRoute = "/writing";
const writingIndexUrl = `${origin}${writingIndexRoute}`;
const writingIndexTitle = "Writing | Jeremy Joseph Curry";
const writingIndexDescription =
  "Current engineering notes by Jeremy Joseph Curry on iOS releases, product interfaces, data contracts, bounded AI behavior, and deployment evidence.";
const writingRoute = "/writing/shipping-ios-app-from-nepal";
const writingUrl = `${origin}${writingRoute}`;
const writingTitle = "Shipping an iOS App from Nepal: My Release Evidence Method";
const writingDescription =
  "Jeremy Joseph Curry explains the release evidence method he uses to connect source code, IPA identity, TestFlight distribution, App Store metadata, and the public product page.";
const writingDate = "2026-07-18";
const approvedArticleSource = path.join(appRoot, "content", "app-store-from-nepal.md");
const productContractsRoute = "/writing/five-product-contracts";
const productContractsUrl = `${origin}${productContractsRoute}`;
const productContractsTitle =
  "From Idea to Launch: The Five Product Contracts I Define Before I Build";
const productContractsDescription =
  "Jeremy Joseph Curry explains five product contracts for problem definition, interface states, data integrity, bounded AI behavior, and release evidence.";
const approvedProductContractsSource = path.join(
  appRoot,
  "content",
  "product-from-idea-to-launch.md"
);
const himalRxArticleRoute =
  "/writing/reading-the-himalrx-workflow-as-decisions-not-screens";
const himalRxArticleUrl = `${origin}${himalRxArticleRoute}`;
const himalRxArticleTitle = "Reading the HimalRx Workflow as Decisions, Not Screens";
const himalRxArticleDescription =
  "Jeremy Joseph Curry examines the publicly presented HimalRx workflow through batch-aware inventory, connected counter actions, role-specific views, alerts, history, and operational evidence.";
const approvedHimalRxArticleSource = path.join(
  appRoot,
  "content",
  "himalrx-engineering-case-study.md"
);
const approvedHimalRxArticleSha256 =
  "24b4dadf06f2636f553e7fd8250712d7b3f79e99777e18debbb92da8945503d6";

const expectedPerson = {
  "@type": "Person",
  "@id": personId,
  name: authorName,
  url: `${origin}/`,
  jobTitle: "Software Engineer & App Developer",
  description:
    "Software engineer and independent app developer based in Nepal, building mobile apps, web applications, websites, backend systems, and AI-powered software.",
  homeLocation: {
    "@type": "Country",
    name: "Nepal"
  },
  image: portraitImages,
  sameAs: verifiedSameAs
};

const expectedProfile = {
  "@type": "ProfilePage",
  "@id": `${origin}/about#profile-page`,
  url: `${origin}/about`,
  name: "About Jeremy Joseph Curry | Software Engineer in Nepal",
  description:
    "About Jeremy Joseph Curry, a software engineer and independent app developer based in Nepal.",
  mainEntity: {
    "@id": personId
  }
};

const expectedRoutes = {
  "/": {
    file: "index.html",
    url: origin,
    title: "Jeremy Joseph Curry - Software Engineer & App Developer in Nepal",
    description:
      "Jeremy Joseph Curry is a software engineer and independent app developer based in Nepal, building mobile apps, web applications, websites, backend systems, and AI-powered software.",
    type: "website",
    schema: "home",
    requiredLinks: [writingIndexUrl, writingUrl, productContractsUrl, himalRxArticleUrl]
  },
  "/about": {
    file: "about.html",
    url: `${origin}/about`,
    title: expectedProfile.name,
    description: expectedProfile.description,
    type: "profile",
    schema: "profile"
  },
  "/links": {
    file: "links.html",
    url: `${origin}/links`,
    title: "Jeremy Joseph Curry Links | Apps and Projects",
    description:
      "Official links for Jeremy Joseph Curry, including public apps, websites, and software projects.",
    type: "website"
  },
  "/work/bible-trivia-quest": {
    file: "work/bible-trivia-quest.html",
    url: `${origin}/work/bible-trivia-quest`,
    title: "Bible Trivia Quest | Jeremy Joseph Curry",
    description: "Bible Trivia Quest, an iOS app built by Jeremy Joseph Curry.",
    type: "article",
    schema: "article"
  },
  "/work/himalrx": {
    file: "work/himalrx.html",
    url: `${origin}/work/himalrx`,
    title: "HimalRx | Jeremy Joseph Curry",
    description:
      "HimalRx is pharmacy operations software for inventory, batches, expiry dates, sales, staff, customers, reminders, and reporting.",
    type: "article",
    schema: "article"
  },
  "/work/gptrek": {
    file: "work/gptrek.html",
    url: `${origin}/work/gptrek`,
    title: "GPTrek | Jeremy Joseph Curry",
    description:
      "GPTrek is a Nepal trekking discovery, booking, route content, and AI-assisted planning platform.",
    type: "article",
    schema: "article"
  },
  "/work/gurkha-fit": {
    file: "work/gurkha-fit.html",
    url: `${origin}/work/gurkha-fit`,
    title: "Gurkha Fit | Jeremy Joseph Curry",
    description: "Gurkha Fit training app built by Jeremy Joseph Curry.",
    type: "article",
    schema: "article"
  },
  [writingIndexRoute]: {
    file: "writing.html",
    url: writingIndexUrl,
    title: writingIndexTitle,
    description: writingIndexDescription,
    type: "website",
    schema: "writingIndex",
    requiredLinks: [writingUrl, productContractsUrl, himalRxArticleUrl]
  },
  [writingRoute]: {
    file: "writing/shipping-ios-app-from-nepal.html",
    url: writingUrl,
    title: writingTitle,
    description: writingDescription,
    type: "article",
    schema: "publishedArticle",
    datePublished: writingDate,
    dateModified: writingDate,
    approvedSource: approvedArticleSource,
    requiredLinks: [
      authorUrl,
      writingIndexUrl,
      "https://apps.apple.com/us/app/gurkha-fit/id6758262705",
      "https://developer.apple.com/app-store/review/guidelines/",
      "https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/",
      "https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/",
      "https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata/",
      "https://developer.apple.com/help/app-store-connect/manage-builds/choose-a-build-to-submit/",
      `${origin}/`,
      "https://apps.apple.com/us/developer/jeremy-joseph-curry/id1867562495"
    ]
  },
  [productContractsRoute]: {
    file: "writing/five-product-contracts.html",
    url: productContractsUrl,
    title: productContractsTitle,
    description: productContractsDescription,
    type: "article",
    schema: "publishedArticle",
    datePublished: writingDate,
    dateModified: writingDate,
    approvedSource: approvedProductContractsSource,
    requiredLinks: [
      authorUrl,
      writingIndexUrl,
      "https://himalrx.com/",
      "https://www.gurkhafit.app/",
      "https://gptrek.com/",
      "https://apps.apple.com/us/app/gurkha-fit/id6758262705",
      `${origin}/`
    ]
  },
  [himalRxArticleRoute]: {
    file: "writing/reading-the-himalrx-workflow-as-decisions-not-screens.html",
    url: himalRxArticleUrl,
    title: himalRxArticleTitle,
    description: himalRxArticleDescription,
    type: "article",
    schema: "publishedArticle",
    datePublished: writingDate,
    dateModified: writingDate,
    approvedSource: approvedHimalRxArticleSource,
    approvedSourceSha256: approvedHimalRxArticleSha256,
    requiredLinks: [
      authorUrl,
      writingIndexUrl,
      "https://himalrx.com/",
      `${origin}/work/himalrx`
    ]
  }
};

const expectedWritingIndexNodes = [
  {
    "@type": "CollectionPage",
    "@id": `${writingIndexUrl}#collection-page`,
    url: writingIndexUrl,
    name: writingIndexTitle,
    description: writingIndexDescription,
    author: {
      "@id": personId
    },
    mainEntity: {
      "@id": `${writingIndexUrl}#article-list`
    }
  },
  {
    "@type": "ItemList",
    "@id": `${writingIndexUrl}#article-list`,
    name: "Jeremy Joseph Curry engineering articles",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${writingUrl}#article`,
          url: writingUrl,
          name: writingTitle
        }
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${productContractsUrl}#article`,
          url: productContractsUrl,
          name: productContractsTitle
        }
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": `${himalRxArticleUrl}#article`,
          url: himalRxArticleUrl,
          name: himalRxArticleTitle
        }
      }
    ]
  }
];

const expectedImages = {
  "/images/jeremy-joseph-curry-1x1.jpg": [1200, 1200],
  "/images/jeremy-joseph-curry-4x3.jpg": [1200, 900],
  "/images/jeremy-joseph-curry-16x9.jpg": [1200, 675]
};

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .trim();
}

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)) {
    result[match[1].toLowerCase()] = decodeHtml(match[3]);
  }
  return result;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) =>
    attributes(match[0])
  );
}

function metaValues(metas, key) {
  return metas
    .filter((meta) => meta.name === key || meta.property === key)
    .map((meta) => meta.content);
}

function requireSingle(values, expected, label) {
  assert.equal(values.length, 1, `${label}: expected exactly one value, received ${values.length}`);
  assert.equal(values[0], expected, `${label}: unexpected value`);
}

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>.*?<\/script>/gis, " ")
      .replace(/<style\b[^>]*>.*?<\/style>/gis, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
  );
}

function normalizeHref(href) {
  try {
    return new URL(href, `${origin}/`).href;
  } catch {
    return href;
  }
}

function parseJsonLd(html, route) {
  const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis)];
  return blocks.map((block, index) => {
    let value;
    try {
      value = JSON.parse(block[1]);
    } catch (error) {
      throw new Error(`${route}: JSON-LD block ${index + 1} is invalid: ${error.message}`);
    }
    assert.equal(value["@context"], "https://schema.org", `${route}: JSON-LD context must be exact`);
    assert.ok(Array.isArray(value["@graph"]), `${route}: JSON-LD must have an outer @graph array`);
    return value;
  });
}

function graphNodes(blocks) {
  return blocks.flatMap((block) => block["@graph"]);
}

function jpegDimensions(buffer) {
  assert.equal(buffer[0], 0xff, "JPEG must begin with FF D8");
  assert.equal(buffer[1], 0xd8, "JPEG must begin with FF D8");
  let offset = 2;
  const frameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;
    if (marker === 0xd8 || marker === 0xd9) continue;
    const segmentLength = buffer.readUInt16BE(offset);
    if (frameMarkers.has(marker)) {
      return [buffer.readUInt16BE(offset + 5), buffer.readUInt16BE(offset + 3)];
    }
    offset += segmentLength;
  }
  throw new Error("JPEG dimensions not found");
}

function imageDimensions(file) {
  const buffer = fs.readFileSync(file);
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
  }
  return jpegDimensions(buffer);
}

function publicFileForUrl(url) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, origin, `asset must be first-party: ${url}`);
  const relative = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");
  assert.ok(relative && !relative.includes(".."), `unsafe asset path: ${url}`);
  return path.join(outRoot, relative);
}

function expectedArticle(requirement) {
  const article = {
    "@type": "Article",
    "@id": `${requirement.url}#article`,
    url: requirement.url,
    headline: requirement.title,
    description: requirement.description,
    mainEntityOfPage: {
      "@id": requirement.url
    },
    author: {
      "@id": personId
    }
  };
  if (requirement.schema === "publishedArticle") {
    article.image = [socialImage];
    article.datePublished = requirement.datePublished;
    article.dateModified = requirement.dateModified;
  }
  return article;
}

function normalizeApprovedMarkdown(markdown) {
  return markdown
    .replaceAll("\r", "")
    .replace(/^```[^\n]*$/gm, "")
    .replace(/^---\s*$/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeArticleText(value) {
  return value.replace(/\s+([.,;:!?])/g, "$1");
}

assert.ok(fs.statSync(outRoot).isDirectory(), `built output directory not found: ${outRoot}`);

for (const [publicPath, dimensions] of Object.entries(expectedImages)) {
  const file = path.join(outRoot, publicPath.replace(/^\//, ""));
  assert.ok(fs.existsSync(file), `required portrait derivative missing: ${file}`);
  assert.deepEqual(imageDimensions(file), dimensions, `${publicPath}: actual dimensions differ`);
}

const seenTitles = new Set();
const seenDescriptions = new Set();

for (const [route, requirement] of Object.entries(expectedRoutes)) {
  const file = path.join(outRoot, requirement.file);
  assert.ok(fs.existsSync(file), `${route}: built HTML missing: ${file}`);
  const html = fs.readFileSync(file, "utf8");
  const metas = tags(html, "meta");
  const links = tags(html, "link");
  const anchors = tags(html, "a");
  const images = tags(html, "img");
  const text = visibleText(html);

  for (const expectedLink of requirement.requiredLinks || []) {
    assert.ok(
      anchors.some((anchor) => normalizeHref(anchor.href) === expectedLink),
      `${route}: required crawlable link missing: ${expectedLink}`
    );
  }
  assert.ok(
    anchors.some((anchor) => normalizeHref(anchor.href) === writingIndexUrl),
    `${route}: primary Writing link must target ${writingIndexUrl}`
  );

  const title = decodeHtml(html.match(/<title\b[^>]*>(.*?)<\/title>/is)?.[1]);
  assert.equal(title, requirement.title, `${route}: title mismatch`);
  assert.ok(!seenTitles.has(title), `${route}: title must be route-specific`);
  seenTitles.add(title);
  assert.ok(!seenDescriptions.has(requirement.description), `${route}: description must be route-specific`);
  seenDescriptions.add(requirement.description);

  const canonical = links
    .filter((link) => (link.rel || "").split(/\s+/).includes("canonical"))
    .map((link) => link.href);
  requireSingle(canonical, requirement.url, `${route} canonical`);

  const authorLinks = links
    .filter((link) => (link.rel || "").split(/\s+/).includes("author"))
    .map((link) => normalizeHref(link.href));
  requireSingle(authorLinks, authorUrl, `${route} rel=author`);

  const exactMeta = {
    description: requirement.description,
    author: authorName,
    "og:title": requirement.title,
    "og:description": requirement.description,
    "og:url": requirement.url,
    "og:type": requirement.type,
    "og:site_name": authorName,
    "og:locale": "en_US",
    "twitter:card": "summary_large_image",
    "twitter:title": requirement.title,
    "twitter:description": requirement.description,
    "og:image": socialImage,
    "og:image:width": "1200",
    "og:image:height": "675",
    "og:image:alt": portraitAlt,
    "twitter:image": socialImage,
    "twitter:image:alt": portraitAlt
  };
  if (requirement.schema === "publishedArticle") {
    exactMeta["article:published_time"] = `${requirement.datePublished}T00:00:00.000Z`;
    exactMeta["article:modified_time"] = `${requirement.dateModified}T00:00:00.000Z`;
  }
  for (const [key, expected] of Object.entries(exactMeta)) {
    requireSingle(metaValues(metas, key), expected, `${route} ${key}`);
  }

  const declaredWidth = Number(metaValues(metas, "og:image:width")[0]);
  const declaredHeight = Number(metaValues(metas, "og:image:height")[0]);
  assert.ok(Number.isInteger(declaredWidth) && declaredWidth > 0, `${route}: og:image width must be numeric`);
  assert.ok(Number.isInteger(declaredHeight) && declaredHeight > 0, `${route}: og:image height must be numeric`);
  const ogFile = publicFileForUrl(metaValues(metas, "og:image")[0]);
  assert.ok(fs.existsSync(ogFile), `${route}: declared OG asset does not exist: ${ogFile}`);
  assert.deepEqual(imageDimensions(ogFile), [declaredWidth, declaredHeight], `${route}: OG dimensions do not match asset`);

  const articleAuthors = metaValues(metas, "article:author");
  if (requirement.type === "article") {
    requireSingle(articleAuthors, authorUrl, `${route} article:author`);
  } else {
    assert.equal(articleAuthors.length, 0, `${route}: non-article must not emit article:author`);
  }

  assert.ok(!html.includes("https://github.com/jeremy3004-dot/jeremy3004-dot"), `${route}: README repository used as profile`);

  const blocks = parseJsonLd(html, route);
  const nodes = graphNodes(blocks);
  const people = nodes.filter((node) => node["@type"] === "Person");
  if (requirement.schema === "home" || requirement.schema === "profile") {
    assert.equal(people.length, 1, `${route}: exactly one full Person node required`);
    assert.deepEqual(people[0], expectedPerson, `${route}: Person node differs from exact contract`);
  } else {
    assert.equal(people.length, 0, `${route}: duplicate Person node must not be embedded`);
  }
  if (requirement.schema === "home") {
    const writingCards = [
      ...html.matchAll(
        /<a\b[^>]*class=["'][^"']*\bwritingFeature\b[^"']*["'][^>]*>(.*?)<\/a>/gis
      )
    ];
    assert.equal(writingCards.length, 3, "/: expected exactly three writing cards");
    for (const [index, card] of writingCards.entries()) {
      assert.equal(
        (card[1].match(/<h2\b/gi) || []).length,
        1,
        `/: writing card ${index + 1} must use one h2 for its title`
      );
      assert.equal(
        (card[1].match(/<strong\b/gi) || []).length,
        0,
        `/: writing card ${index + 1} must not use strong for its title`
      );
    }
  }
  if (requirement.schema === "profile") {
    const profiles = nodes.filter((node) => node["@type"] === "ProfilePage");
    assert.equal(profiles.length, 1, "/about: exactly one ProfilePage required");
    assert.deepEqual(profiles[0], expectedProfile, "/about: ProfilePage differs from exact contract");
    assert.ok(!("dateCreated" in profiles[0]), "/about: unsupported dateCreated must be omitted");
    assert.ok(!("dateModified" in profiles[0]), "/about: unsupported dateModified must be omitted");
  }
  if (requirement.schema === "writingIndex") {
    assert.deepEqual(nodes, expectedWritingIndexNodes, "/writing: collection graph differs");
    const cards = [
      ...html.matchAll(
        /<a\b[^>]*class=["'][^"']*\bwritingIndexCard\b[^"']*["'][^>]*>(.*?)<\/a>/gis
      )
    ];
    assert.equal(cards.length, 3, "/writing: expected exactly three article cards");
    for (const [index, card] of cards.entries()) {
      assert.equal(
        (card[1].match(/<h2\b/gi) || []).length,
        1,
        `/writing: card ${index + 1} must use one h2 for its title`
      );
      assert.equal(
        (card[1].match(/<strong\b/gi) || []).length,
        0,
        `/writing: card ${index + 1} must not use strong for its title`
      );
    }
    assert.ok(
      text.includes("iOS releases") &&
        text.includes("product interfaces") &&
        text.includes("data contracts") &&
        text.includes("AI behavior") &&
        text.includes("deployment evidence"),
      "/writing: current engineering scope description is incomplete"
    );
  }
  if (requirement.schema === "article" || requirement.schema === "publishedArticle") {
    const articles = nodes.filter((node) => node["@type"] === "Article");
    assert.equal(articles.length, 1, `${route}: exactly one Article node required`);
    assert.deepEqual(articles[0], expectedArticle(requirement), `${route}: Article node or author reference differs`);
    assert.ok(text.includes("Jeremy Joseph Curry"), `${route}: visible Jeremy attribution missing`);
    assert.ok(text.includes("Software Engineer & App Developer"), `${route}: visible role missing`);
    assert.ok(
      anchors.some((anchor) => normalizeHref(anchor.href) === authorUrl),
      `${route}: crawlable About link missing`
    );
  }

  if (requirement.schema === "publishedArticle") {
    assert.ok(
      fs.existsSync(requirement.approvedSource),
      `approved article source missing: ${requirement.approvedSource}`
    );
    const articleMatch = html.match(/<article\b[^>]*data-approved-article=["']true["'][^>]*>(.*?)<\/article>/is);
    assert.ok(articleMatch, `${route}: approved article wrapper missing`);
    assert.ok(
      visibleText(articleMatch[1]).includes(
        "By Jeremy Joseph Curry Software Engineer & App Developer based in Nepal"
      ),
      `${route}: exact visible author and current-role byline missing`
    );
    if (requirement.approvedSourceSha256) {
      assert.equal(
        crypto
          .createHash("sha256")
          .update(fs.readFileSync(requirement.approvedSource))
          .digest("hex"),
        requirement.approvedSourceSha256,
        `${route}: approved article source bytes differ`
      );
    }
    assert.equal(
      normalizeArticleText(visibleText(articleMatch[1])),
      normalizeArticleText(
        normalizeApprovedMarkdown(fs.readFileSync(requirement.approvedSource, "utf8"))
      ),
      `${route}: rendered title, byline, or body differs from approved source`
    );
  }

  if (route === "/" || route === "/about") {
    const portrait = images.find((image) => image.src === "/images/jeremy-joseph-curry-1x1.jpg");
    assert.ok(portrait, `${route}: visible square portrait missing`);
    assert.equal(portrait.alt, portraitAlt, `${route}: visible portrait alt mismatch`);
    assert.equal(portrait.width, "1200", `${route}: visible portrait width mismatch`);
    assert.equal(portrait.height, "1200", `${route}: visible portrait height mismatch`);
  }

  if (route === "/about") {
    assert.ok(text.includes(authorName), "/about: visible name missing");
    assert.ok(text.includes("Software Engineer & App Developer"), "/about: visible role missing");
    assert.ok(text.includes("Nepal"), "/about: visible location missing");
    for (const profile of verifiedSameAs) {
      assert.ok(
        anchors.some((anchor) => normalizeHref(anchor.href) === profile),
        `/about: visible sameAs link missing: ${profile}`
      );
    }
  }

  console.log(`PASS ${route} -> ${file}`);
}

const sitemap = fs.readFileSync(path.join(outRoot, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(
  sitemapUrls,
  Object.entries(expectedRoutes).map(([route, requirement]) => route === "/" ? `${origin}/` : requirement.url),
  "sitemap canonical URLs differ"
);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, "sitemap contains duplicate URLs");

const robots = fs.readFileSync(path.join(outRoot, "robots.txt"), "utf8");
assert.match(robots, /^User-agent: \*$/m, "robots user-agent missing");
assert.match(robots, /^Allow: \/$/m, "robots public allow missing");
assert.match(robots, new RegExp(`^Sitemap: ${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml$`, "m"), "robots sitemap mismatch");
assert.doesNotMatch(robots, /^Disallow:\s*\/$/m, "robots blocks the public site");

const llms = fs.readFileSync(path.join(outRoot, "llms.txt"), "utf8");
assert.match(llms, /GitHub profile: https:\/\/github\.com\/jeremy3004-dot(?:\s|$)/, "llms GitHub profile mismatch");
assert.doesNotMatch(llms, /github\.com\/jeremy3004-dot\/jeremy3004-dot/, "llms uses README repository as identity");
for (const requirement of Object.values(expectedRoutes)) {
  assert.ok(llms.includes(requirement.url), `llms missing controlled URL: ${requirement.url}`);
}

console.log(`PASS authority contract for ${Object.keys(expectedRoutes).length} routes in ${outRoot}`);
