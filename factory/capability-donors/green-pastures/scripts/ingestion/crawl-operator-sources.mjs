#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_OUT_DIR = ".artifacts/ingestion";
const OPERATOR_SOURCE_PATH = "src/data/operator-source.json";

function parseArgs(argv) {
  const args = {
    urls: [],
    outDir: DEFAULT_OUT_DIR,
    maxPages: 25,
    sameHostOnly: true,
    writeOperatorSource: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--url" && next) {
      args.urls.push(next);
      index += 1;
    } else if (arg === "--sources" && next) {
      args.sourcesFile = next;
      index += 1;
    } else if (arg === "--out" && next) {
      args.outDir = next;
      index += 1;
    } else if (arg === "--max-pages" && next) {
      args.maxPages = Number.parseInt(next, 10);
      index += 1;
    } else if (arg === "--all-hosts") {
      args.sameHostOnly = false;
    } else if (arg === "--write-operator-source") {
      args.writeOperatorSource = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`Unknown or incomplete argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  npm run ingest:crawl -- --url https://example.com/operator-page
  npm run ingest:crawl -- --sources ./operator-sources.json --max-pages 50

Options:
  --url URL                  Seed URL. Can be repeated.
  --sources FILE             JSON file containing URLs, strings, or objects with url/sourceUrl.
  --out DIR                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --max-pages NUMBER         Max pages to crawl. Defaults to 25.
  --all-hosts                Allow enqueueing links across hosts.
  --write-operator-source    Also write normalized records to ${OPERATOR_SOURCE_PATH}.
  --help                     Show this message.
`);
}

async function readSources(file) {
  if (!file) return [];
  const raw = await readFile(file, "utf8");
  const parsed = JSON.parse(raw);
  const items = Array.isArray(parsed) ? parsed : parsed.sources;
  if (!Array.isArray(items)) {
    throw new Error("--sources must be a JSON array or an object with a sources array");
  }

  return items.map((item) => {
    if (typeof item === "string") return item;
    return item.url ?? item.sourceUrl;
  }).filter(Boolean);
}

function textList($, selector, limit = 20) {
  return $(selector).toArray()
    .map((element) => $(element).text().replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, limit);
}

function pageToRecord({ $, request, response }) {
  const title = $("h1").first().text().replace(/\s+/g, " ").trim()
    || $("title").first().text().replace(/\s+/g, " ").trim()
    || request.loadedUrl
    || request.url;
  const description = $('meta[name="description"]').attr("content")?.trim() ?? null;

  return {
    sourceUrl: request.loadedUrl ?? request.url,
    statusCode: response.statusCode,
    crawledAt: new Date().toISOString(),
    title,
    description,
    headings: textList($, "h1, h2, h3", 40),
    bullets: textList($, "main li, article li, .content li, body li", 80),
    paragraphs: textList($, "main p, article p, .content p, body p", 80),
  };
}

function toOperatorDraft(page) {
  const slug = new URL(page.sourceUrl).pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "operator-page";

  return {
    slug,
    title: page.title,
    updatedAt: page.crawledAt,
    minDurationDays: null,
    maxDurationDays: null,
    durationType: "",
    costUsd: null,
    sourceDifficulty: "",
    highestAltitudeM: null,
    seasonWindow: null,
    groupSize: null,
    accommodation: null,
    activity: null,
    description: page.description ? [page.description] : page.paragraphs.slice(0, 3),
    pagedescription: page.description,
    highlights: page.bullets.slice(0, 12),
    includeItems: [],
    excludeItems: [],
    facts: [
      { label: "Source URL", value: page.sourceUrl },
      { label: "Crawled at", value: page.crawledAt },
    ],
    itinerary: [],
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const sourceUrls = [...args.urls, ...(await readSources(args.sourcesFile))];
  if (sourceUrls.length === 0) {
    throw new Error("Provide at least one --url or --sources file");
  }
  if (!Number.isFinite(args.maxPages) || args.maxPages < 1) {
    throw new Error("--max-pages must be a positive number");
  }

  const runId = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = path.resolve(args.outDir, runId);
  await mkdir(outDir, { recursive: true });

  process.env.CRAWLEE_STORAGE_DIR = path.join(outDir, "crawlee-storage");
  const { CheerioCrawler, Configuration, Dataset, log } = await import("crawlee");
  Configuration.getGlobalConfig().set("storageDir", path.join(outDir, "crawlee-storage"));
  const dataset = await Dataset.open(`operator-source-${runId}`);
  log.setLevel(log.LEVELS.WARNING);

  const allowedHosts = new Set(sourceUrls.map((url) => new URL(url).host));
  const crawler = new CheerioCrawler({
    maxRequestsPerCrawl: args.maxPages,
    async requestHandler({ $, request, response, enqueueLinks }) {
      const record = pageToRecord({ $, request, response });
      await dataset.pushData(record);

      await enqueueLinks({
        strategy: "same-domain",
        transformRequestFunction(nextRequest) {
          if (args.sameHostOnly && !allowedHosts.has(new URL(nextRequest.url).host)) {
            return false;
          }
          return nextRequest;
        },
      });
    },
  });

  await crawler.run(sourceUrls);

  const pages = (await dataset.getData()).items;
  const operatorDraft = pages.map(toOperatorDraft);

  await writeFile(path.join(outDir, "pages.json"), `${JSON.stringify(pages, null, 2)}\n`);
  await writeFile(path.join(outDir, "operator-source.draft.json"), `${JSON.stringify(operatorDraft, null, 2)}\n`);

  if (args.writeOperatorSource) {
    await writeFile(OPERATOR_SOURCE_PATH, `${JSON.stringify(operatorDraft, null, 2)}\n`);
  }

  console.log(`Crawled ${pages.length} page(s).`);
  console.log(`Wrote ${path.relative(process.cwd(), outDir)}/pages.json`);
  console.log(`Wrote ${path.relative(process.cwd(), outDir)}/operator-source.draft.json`);
  if (!args.writeOperatorSource) {
    console.log(`Left ${OPERATOR_SOURCE_PATH} unchanged. Use --write-operator-source to promote the draft.`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
