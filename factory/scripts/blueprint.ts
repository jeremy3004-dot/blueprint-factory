import { access, appendFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { captureMotion, captureScreenshots } from "./capture";
import { captureDonor } from "./capture-donor";
import { runCompare } from "./compare";
import { runChecks, summarizeChecks } from "./checks";
import { runVerify } from "./verify";
import { runTokens } from "./tokens";
import {
  pageCoverageMessage,
  routeToDir,
  summarizePageCoverage,
  type PageCoverage,
  type PagesFile
} from "./pages";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

type SiteStatus = {
  exists: boolean;
  missingFiles: string[];
  referenceReady: boolean;
  artReady: boolean;
  appExists: boolean;
  screenshotsReady: boolean;
  motionReady: boolean;
  pagesReady: boolean;
  beautyReady: boolean;
};

type NextAction =
  | "CREATE_SITE"
  | "REPAIR_REQUIRED_FILES"
  | "NEEDS_REFERENCE_FIRST"
  | "NEEDS_ART_DIRECTION"
  | "CREATE_APP"
  | "NEEDS_PREVIEW_URL"
  | "CAPTURE_SCREENSHOTS"
  | "CAPTURE_MOTION"
  | "NEEDS_PAGE_COVERAGE"
  | "RUN_BEAUTY"
  | "READY_FOR_HUMAN_REVIEW";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function requiredSiteFiles(siteSlug: string): string[] {
  return [
    `sites/${siteSlug}/brief.md`,
    `sites/${siteSlug}/art-direction.md`,
    `sites/${siteSlug}/asset-log.md`,
    `sites/${siteSlug}/deploy.md`,
    `sites/${siteSlug}/qa/run-log.md`,
    `sites/${siteSlug}/qa/visual-review.md`
  ];
}

export function requiredReferenceFirstFiles(siteSlug: string): string[] {
  return [
    `sites/${siteSlug}/references/reference-first/topology.md`,
    `sites/${siteSlug}/references/reference-first/clone-plan.md`
  ];
}

export function hasNamedSignatureMoment(markdown: string): boolean {
  const match = markdown.match(/## 3\. The signature moment \(required\)([\s\S]*?)(\n## |\n# |$)/);
  if (!match) return false;
  const body = match[1].trim();
  if (body.length <= 20) return false;

  const firstContentLine = body
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.startsWith("-"));

  if (!firstContentLine) return false;
  if (firstContentLine.includes("<") || firstContentLine.toLowerCase().startsWith("todo")) return false;
  if (firstContentLine.startsWith("The single interaction or visual that makes someone stop scrolling")) return false;

  return firstContentLine.length > 20;
}

export function hasConcreteClonePlan(markdown: string): boolean {
  const match = markdown.match(/## 6\. Implementation Stack Decision([\s\S]*?)(\n## |\n# |$)/);
  if (!match) return false;

  const decisionLine = match[1]
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.toLowerCase().startsWith("decision:"));

  if (!decisionLine) return false;

  const decision = decisionLine.replace(/^decision:\s*/i, "").trim();
  if (decision.length <= 40) return false;
  if (decision.includes("<") || decision.toLowerCase().startsWith("todo")) return false;

  return /\b(TypeScript|Next\.js|React|Tailwind|CSS|GSAP|Three\.js|WebGL|Lottie|Rive|Supabase|CMS|database)\b/i.test(decision);
}

export function hasPassingVisualReview(markdown: string): boolean {
  const latestVerdict = markdown.match(/## Latest Verdict\s+Status:\s*([A-Z_]+)/);
  if (!latestVerdict || latestVerdict[1] !== "READY_FOR_REVIEW") return false;

  if (!markdown.includes("## Signature Moment Check")) return false;
  if (!markdown.includes("## Reference Comparison")) return false;
  if (!markdown.includes("## Clone Plan Coverage")) return false;
  if (!markdown.includes("## Highest Impact Next Fix")) return false;
  if (/Status:\s*(NOT_READY|NEEDS_HUMAN_BEAUTY_PASS|FAILED)/.test(markdown)) return false;

  const scoreMatches = [...markdown.matchAll(/-\s*[^:\n]+:\s*([1-5])\b/g)];
  if (scoreMatches.length < 8) return false;

  return scoreMatches.every((match) => Number(match[1]) >= 3);
}

async function hasReferenceFirstEvidence(siteSlug: string): Promise<boolean> {
  const referenceDir = path.join(rootDir, "sites", siteSlug, "references", "reference-first");
  for (const requiredFile of requiredReferenceFirstFiles(siteSlug)) {
    if (!(await fileExists(requiredFile))) return false;
  }

  const clonePlanPath = path.join(rootDir, "sites", siteSlug, "references", "reference-first", "clone-plan.md");
  if (!hasConcreteClonePlan(await readFile(clonePlanPath, "utf8"))) return false;

  try {
    const entries = await readdir(referenceDir);
    return entries.some((entry) => entry.endsWith("-desktop.png")) && entries.some((entry) => entry.endsWith("-mobile.png"));
  } catch {
    return false;
  }
}

async function copyTemplate(templateName: string, destination: string, siteSlug: string) {
  const source = path.join(rootDir, "factory/templates", templateName);
  const raw = await readFile(source, "utf8");
  await writeFile(path.join(rootDir, destination), raw.replaceAll("{{siteSlug}}", siteSlug));
}

async function copyTemplateDirectory(source: string, destination: string, siteSlug: string) {
  await mkdir(destination, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      await copyTemplateDirectory(sourcePath, destinationPath, siteSlug);
      continue;
    }

    const raw = await readFile(sourcePath, "utf8");
    await writeFile(destinationPath, raw.replaceAll("{{siteSlug}}", siteSlug));
  }
}

async function fileExists(relativePath: string): Promise<boolean> {
  try {
    await access(path.join(rootDir, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function checkRequiredFiles(siteSlug: string): Promise<string[]> {
  const missing: string[] = [];
  for (const requiredFile of requiredSiteFiles(siteSlug)) {
    if (!(await fileExists(requiredFile))) missing.push(requiredFile);
  }
  return missing;
}

async function directoryHasFiles(relativePath: string): Promise<boolean> {
  try {
    const entries = await readdir(path.join(rootDir, relativePath));
    return entries.length > 0;
  } catch {
    return false;
  }
}

function deployProfile(markdown: string): string {
  const match = markdown.match(/^Profile:\s*(.+)$/m);
  return match ? match[1].trim() : "unknown";
}

export function nextActionForStatus(status: SiteStatus): NextAction {
  if (!status.exists) return "CREATE_SITE";
  if (status.missingFiles.length > 0) return "REPAIR_REQUIRED_FILES";
  if (!status.referenceReady) return "NEEDS_REFERENCE_FIRST";
  if (!status.artReady) return "NEEDS_ART_DIRECTION";
  if (!status.appExists) return "CREATE_APP";
  if (!status.screenshotsReady) return "CAPTURE_SCREENSHOTS";
  if (!status.motionReady) return "CAPTURE_MOTION";
  if (!status.pagesReady) return "NEEDS_PAGE_COVERAGE";
  if (!status.beautyReady) return "RUN_BEAUTY";
  return "READY_FOR_HUMAN_REVIEW";
}

async function createSite(siteSlug: string) {
  await mkdir(path.join(rootDir, "sites", siteSlug, "qa", "motion"), { recursive: true });
  await mkdir(path.join(rootDir, "sites", siteSlug, "assets"), { recursive: true });
  await mkdir(path.join(rootDir, "sites", siteSlug, "references", "reference-first"), { recursive: true });
  await mkdir(path.join(rootDir, "sites", siteSlug, "source-notes"), { recursive: true });
  await mkdir(path.join(rootDir, "sites", siteSlug, "screenshots"), { recursive: true });
  await copyTemplateDirectory(
    path.join(rootDir, "factory/templates/next-site"),
    path.join(rootDir, "sites", siteSlug, "app"),
    siteSlug
  );
  await copyTemplate("brief.template.md", `sites/${siteSlug}/brief.md`, siteSlug);
  await copyTemplate("art-direction.template.md", `sites/${siteSlug}/art-direction.md`, siteSlug);
  await copyTemplate("asset-log.template.md", `sites/${siteSlug}/asset-log.md`, siteSlug);
  await copyTemplate("deploy.template.md", `sites/${siteSlug}/deploy.md`, siteSlug);
  await copyTemplate("run-log.template.md", `sites/${siteSlug}/qa/run-log.md`, siteSlug);
  await copyTemplate("visual-review.template.md", `sites/${siteSlug}/qa/visual-review.md`, siteSlug);
  await copyTemplate("clone-plan.template.md", `sites/${siteSlug}/references/reference-first/clone-plan.md`, siteSlug);
}

async function siteStatus(siteSlug: string): Promise<SiteStatus> {
  const exists = await fileExists(`sites/${siteSlug}`);
  if (!exists) {
    return {
      exists,
      missingFiles: [],
      referenceReady: false,
      artReady: false,
      appExists: false,
      screenshotsReady: false,
      motionReady: false,
      pagesReady: false,
      beautyReady: false
    };
  }

  const artPath = `sites/${siteSlug}/art-direction.md`;
  const artReady = (await fileExists(artPath))
    ? hasNamedSignatureMoment(await readFile(path.join(rootDir, artPath), "utf8"))
    : false;
  const visualReviewPath = `sites/${siteSlug}/qa/visual-review.md`;
  const visualReview = (await fileExists(visualReviewPath))
    ? await readFile(path.join(rootDir, visualReviewPath), "utf8")
    : "";

  const coverage = await pageCoverageForSite(siteSlug);

  return {
    exists,
    missingFiles: await checkRequiredFiles(siteSlug),
    referenceReady: await hasReferenceFirstEvidence(siteSlug),
    artReady,
    appExists: await fileExists(`sites/${siteSlug}/app/package.json`),
    screenshotsReady:
      (await fileExists(`sites/${siteSlug}/screenshots/desktop.png`)) &&
      (await fileExists(`sites/${siteSlug}/screenshots/mobile.png`)),
    motionReady: await directoryHasFiles(`sites/${siteSlug}/qa/motion`),
    // No pages.json => single-page site, coverage not enforced (backward compatible).
    pagesReady: coverage ? coverage.ready : true,
    beautyReady: hasPassingVisualReview(visualReview)
  };
}

async function readPagesFile(siteSlug: string): Promise<PagesFile | null> {
  const relativePath = `sites/${siteSlug}/pages.json`;
  if (!(await fileExists(relativePath))) return null;
  try {
    const parsed = JSON.parse(await readFile(path.join(rootDir, relativePath), "utf8")) as PagesFile;
    return Array.isArray(parsed.pages) ? parsed : null;
  } catch {
    return null;
  }
}

/** Page coverage for a site, or null when the site has no machine-readable page plan (not enforced). */
async function pageCoverageForSite(siteSlug: string): Promise<PageCoverage | null> {
  const file = await readPagesFile(siteSlug);
  if (!file) return null;
  const hasShots = (route: string) => {
    const dir = path.join(rootDir, "sites", siteSlug, "screenshots", "pages", routeToDir(route));
    return existsSync(path.join(dir, "desktop.png")) && existsSync(path.join(dir, "mobile.png"));
  };
  return summarizePageCoverage(file.pages, hasShots);
}

async function appendRunLog(siteSlug: string, message: string) {
  const runLogPath = path.join(rootDir, "sites", siteSlug, "qa", "run-log.md");
  await appendFile(runLogPath, `\n### ${new Date().toISOString()}\n\n${message}\n`);
}

async function runCommand(command: string, args: string[]) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { cwd: rootDir, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code}`));
    });
  });
}

function printStatus(siteSlug: string, status: SiteStatus) {
  const next = nextActionForStatus(status);
  console.log(`SITE: ${siteSlug}`);
  console.log(`STATUS: ${next}`);
  console.log(`exists: ${status.exists ? "yes" : "no"}`);
  console.log(`references: ${status.referenceReady ? "ready" : "missing"}`);
  console.log(`art: ${status.artReady ? "ready" : "not ready"}`);
  console.log(`app: ${status.appExists ? "present" : "missing"}`);
  console.log(`screenshots: ${status.screenshotsReady ? "ready" : "missing"}`);
  console.log(`motion: ${status.motionReady ? "ready" : "missing"}`);
  console.log(`pages: ${status.pagesReady ? "covered" : "coverage incomplete"}`);
  console.log(`beauty: ${status.beautyReady ? "ready for human review" : "not ready"}`);
  if (status.missingFiles.length > 0) console.log(`missing files: ${status.missingFiles.join(", ")}`);
}

async function main() {
  const [command, rawSlug, url] = process.argv.slice(2);
  if (!command) {
    console.log("Usage: blueprint <run|status|new|capture|art|check|compare|verify|tokens|screenshots|motion|beauty|deploy> <slug> [url]");
    return;
  }

  const siteSlug = rawSlug ? slugify(rawSlug) : "";
  if (!siteSlug) throw new Error("Site slug is required");

  if (command === "new") {
    await createSite(siteSlug);
    console.log(`Created sites/${siteSlug}`);
    return;
  }

  if (command === "status") {
    const status = await siteStatus(siteSlug);
    printStatus(siteSlug, status);
    if (nextActionForStatus(status) === "NEEDS_PAGE_COVERAGE") {
      const coverage = await pageCoverageForSite(siteSlug);
      if (coverage) console.log(`NEEDS_PAGE_COVERAGE: ${pageCoverageMessage(coverage)}`);
    }
    return;
  }

  if (command === "capture") {
    if (!url) {
      console.error("Usage: blueprint capture <slug> <donor-url> [--pages N]");
      process.exit(1);
    }

    // Capture is usually step one, so scaffold the site if it does not exist yet.
    if (!(await fileExists(`sites/${siteSlug}`))) {
      await createSite(siteSlug);
      console.log(`Created sites/${siteSlug} scaffold.`);
    }

    const pagesFlagIndex = process.argv.indexOf("--pages");
    const pages = pagesFlagIndex >= 0 ? Number(process.argv[pagesFlagIndex + 1]) : undefined;

    console.log(`Capturing donor evidence for ${siteSlug} from ${url} ...`);
    const result = await captureDonor(siteSlug, url, { pages });
    await appendRunLog(
      siteSlug,
      `- Captured donor evidence pack from ${url} (${result.viewportsCaptured.length} viewports, ${result.sectionCount} sections, ${result.assetCount} assets, ${result.pageCount} pages).\n- Auto-drafted topology.md and clone-plan.md. Next gate: verify and complete the clone plan (set a real Decision: line), then art direction.`
    );

    const banner = result.cookieBannerHandled ? "A cookie banner was found and dismissed." : "No cookie banner needed dismissal.";
    console.log("");
    console.log("PLAIN-LANGUAGE SUMMARY");
    console.log(
      `We captured the donor site (${result.donorUrl}) at ${result.viewportsCaptured.length} screen sizes and ` +
        `saved ${result.sectionCount} section pictures, a scroll-through video, and a design fingerprint ` +
        `(colors, fonts, spacing). ${banner} We found ${result.pageCount} inner page${result.pageCount === 1 ? "" : "s"} to consider ` +
        `and ${result.assetCount} donor image${result.assetCount === 1 ? "" : "s"}/video${result.assetCount === 1 ? "" : "s"} ` +
        `(all reference-only — none will ship). ` +
        `${result.libraries.length ? `The donor appears to animate with ${result.libraries.join(", ")}. ` : "No animation library was detected. "}` +
        `Draft topology.md and clone-plan.md are ready under sites/${siteSlug}/references/reference-first/ — ` +
        `an agent now verifies them (especially the build stack) before art direction and build.`
    );
    console.log("");
    console.log(`Evidence: ${path.relative(rootDir, result.referenceDir)}`);
    return;
  }

  if (command === "run") {
    let status = await siteStatus(siteSlug);
    let next = nextActionForStatus(status);

    if (next === "CREATE_SITE") {
      await createSite(siteSlug);
      await appendRunLog(
        siteSlug,
        "- Created site scaffold.\n- Next gate: run reference-first research and save donor screenshots, topology notes, and the clone plan under `references/reference-first/`."
      );
      console.log(`Created sites/${siteSlug}`);
      status = await siteStatus(siteSlug);
      printStatus(siteSlug, status);
      return;
    }

    if (next === "REPAIR_REQUIRED_FILES") {
      printStatus(siteSlug, status);
      process.exit(1);
    }

    if (next === "NEEDS_REFERENCE_FIRST") {
      console.log(`NEEDS_REFERENCE_FIRST: research at least three strong references for ${siteSlug}.`);
      console.log(`Save donor screenshots to sites/${siteSlug}/references/reference-first/ with *-desktop.png and *-mobile.png names.`);
      console.log(`Write the donor structure and borrowed moves to sites/${siteSlug}/references/reference-first/topology.md.`);
      console.log(`Write the page inventory, flow map, animation audit, and stack decision to sites/${siteSlug}/references/reference-first/clone-plan.md.`);
      console.log("Then update art-direction.md with the primary donor, secondary references, and exact moves being translated.");
      return;
    }

    if (next === "NEEDS_ART_DIRECTION") {
      console.log(`NEEDS_ART_DIRECTION: fill sites/${siteSlug}/brief.md and sites/${siteSlug}/art-direction.md.`);
      console.log("Codex should draft these from the current request, references, screenshots, or an intake interview.");
      return;
    }

    if (next === "CREATE_APP") {
      await copyTemplateDirectory(
        path.join(rootDir, "factory/templates/next-site"),
        path.join(rootDir, "sites", siteSlug, "app"),
        siteSlug
      );
      await appendRunLog(siteSlug, "- Recreated missing app from the Next.js template.");
    }

    if (next === "READY_FOR_HUMAN_REVIEW") {
      printStatus(siteSlug, status);
      return;
    }

    await runCommand("pnpm", ["--filter", siteSlug, "build"]);
    status = await siteStatus(siteSlug);
    next = nextActionForStatus(status);

    if ((next === "CAPTURE_SCREENSHOTS" || next === "CAPTURE_MOTION") && !url) {
      console.log(`NEEDS_PREVIEW_URL: start the site preview, then run: pnpm blueprint:run ${siteSlug} http://localhost:<port>`);
      return;
    }

    if (!status.screenshotsReady && url) {
      const outputDir = path.join(rootDir, "sites", siteSlug, "screenshots");
      await mkdir(outputDir, { recursive: true });
      await captureScreenshots(url, outputDir);
      await appendRunLog(siteSlug, `- Captured desktop and mobile screenshots from ${url}.`);
    }

    if (!status.motionReady && url) {
      const outputDir = path.join(rootDir, "sites", siteSlug, "qa", "motion");
      await mkdir(outputDir, { recursive: true });
      await captureMotion(url, outputDir);
      await appendRunLog(siteSlug, `- Captured motion from ${url}.`);
    }

    status = await siteStatus(siteSlug);
    next = nextActionForStatus(status);

    if (next === "NEEDS_PAGE_COVERAGE") {
      const coverage = await pageCoverageForSite(siteSlug);
      console.log(`NEEDS_PAGE_COVERAGE: ${coverage ? pageCoverageMessage(coverage) : "page plan incomplete"}`);
      console.log(`Update sites/${siteSlug}/pages.json (mark each route built|deferred), then run: pnpm blueprint:screenshots ${siteSlug} ${url ?? "http://localhost:<port>"}`);
      printStatus(siteSlug, status);
      return;
    }

    if (next === "RUN_BEAUTY") {
      const reviewPath = path.join(rootDir, "sites", siteSlug, "qa", "visual-review.md");
      const entry = [
        "",
        `## Beauty Pass ${new Date().toISOString()}`,
        "",
        "Status: NEEDS_HUMAN_BEAUTY_PASS",
        "",
        "Evidence present. Run the rubric against screenshots, motion, and named references before setting Latest Verdict to READY_FOR_REVIEW.",
        ""
      ].join("\n");
      await appendFile(reviewPath, entry);
      await appendRunLog(siteSlug, "- Beauty evidence is present. Stopped at human beauty pass gate.");
    }

    printStatus(siteSlug, await siteStatus(siteSlug));
    return;
  }

  if (command === "art") {
    const artPath = `sites/${siteSlug}/art-direction.md`;
    const artDirection = await readFile(path.join(rootDir, artPath), "utf8");
    if (!hasNamedSignatureMoment(artDirection)) {
      console.error(`NOT_READY: ${artPath} needs a concrete signature moment.`);
      process.exit(1);
    }
    console.log(`READY: ${artPath} names a signature moment.`);
    return;
  }

  if (command === "check") {
    // File-existence gate (unchanged) first — a build can't be trusted if the factory
    // paperwork is missing.
    const missing = await checkRequiredFiles(siteSlug);
    if (missing.length > 0) {
      console.error(`NOT_READY: missing required files for ${siteSlug}`);
      for (const missingFile of missing) console.error(`- ${missingFile}`);
      process.exit(1);
    }
    console.log(`Required factory files exist for ${siteSlug}.`);

    // Then the real checks: typecheck -> build -> (with a preview URL) console -> links -> a11y.
    console.log(url ? `Running full check chain against ${url} ...` : "Running typecheck + build (pass a preview URL for console/link/a11y checks) ...");
    const results = await runChecks(siteSlug, url);
    for (const result of results) {
      const label = result.skipped ? "SKIP" : result.pass ? "PASS" : "FAIL";
      console.log(`[${label}] ${result.name}: ${result.detail}`);
    }
    const { allPassed, failed } = summarizeChecks(results);
    if (!allPassed) {
      console.error(`NOT_READY: ${failed.join(", ")} failed for ${siteSlug}.`);
      process.exit(1);
    }
    console.log(`READY: all checks passed for ${siteSlug}.`);
    return;
  }

  if (command === "compare") {
    if (!url) {
      console.error("Usage: blueprint compare <slug> <preview-url>");
      process.exit(1);
    }
    console.log(`Comparing ${siteSlug} build (${url}) against the donor evidence ...`);
    const result = await runCompare(siteSlug, url);
    await appendRunLog(
      siteSlug,
      `- Visual compare vs donor: desktop ${result.overallDesktop}%, mobile ${result.overallMobile}%. Worst section: ${result.worstSectionLabel ?? "n/a"} (${result.worstSectionMatch ?? "n/a"}%). Report: qa/compare/report.md.`
    );
    console.log("");
    console.log("PLAIN-LANGUAGE SUMMARY");
    console.log(
      `The build matches the donor at ${result.overallDesktop ?? "n/a"}% on desktop` +
        `${result.overallMobile !== null ? ` and ${result.overallMobile}% on mobile` : ""}. ` +
        `${result.worstSectionLabel ? `The weakest area is "${result.worstSectionLabel}" (${result.worstSectionMatch}%) — fix that first. ` : ""}` +
        `${result.structure ? `Structurally the build has ${result.structure.buildSectionCount} sections vs the donor's ${result.structure.donorSectionCount}. ` : ""}` +
        `Pixel match is expected to drop on color/imagery after brand translation while structure stays high. ` +
        `Full report and side-by-side composites are under sites/${siteSlug}/qa/compare/.`
    );
    return;
  }

  if (command === "tokens") {
    const result = await runTokens(siteSlug);
    await appendRunLog(
      siteSlug,
      `- Curated donor tokens into app/tokens.json. Fonts: heading ${result.tokens.fonts.heading.family}, body ${result.tokens.fonts.body.family}. Recorded font decisions in asset-log.md.`
    );
    console.log("");
    console.log("PLAIN-LANGUAGE SUMMARY");
    const h = result.tokens.fonts.heading;
    const b = result.tokens.fonts.body;
    console.log(
      `We turned the donor's design fingerprint into the site's tokens (colors + fonts) at ` +
        `sites/${siteSlug}/app/tokens.json, and the site now renders from it. ` +
        `Background ${result.tokens.colors.background}, primary ${result.tokens.colors.primary}, accent ${result.tokens.colors.accent}. ` +
        `Headings use ${h.family}${h.substituted ? ` (a free stand-in for the donor's ${h.donor})` : ""} and body uses ${b.family}. ` +
        `${h.substituted || b.substituted ? "Those font swaps avoid shipping a licensed donor font and are logged in asset-log.md. " : ""}` +
        `Change any value in tokens.json to restyle the whole site.`
    );
    return;
  }

  if (command === "verify") {
    if (!url) {
      console.error("Usage: blueprint verify <slug> <preview-url>");
      process.exit(1);
    }
    console.log(`Verifying ${siteSlug} end-to-end against ${url} ...`);
    const result = await runVerify(siteSlug, url);
    for (const check of result.checks) {
      const label = check.skipped ? "SKIP" : check.pass ? "PASS" : "FAIL";
      console.log(`[${label}] ${check.name}: ${check.detail}`);
    }
    await appendRunLog(siteSlug, `- Ran verify: ${result.plainLanguage}`);
    console.log("");
    console.log("PLAIN-LANGUAGE SUMMARY");
    console.log(result.plainLanguage);
    console.log("");
    console.log(`Full report: ${path.relative(rootDir, result.reportPath)}`);
    return;
  }

  if (command === "screenshots") {
    if (!url) {
      console.error("Usage: blueprint screenshots <slug> <url>");
      process.exit(1);
    }
    const outputDir = path.join(rootDir, "sites", siteSlug, "screenshots");
    await mkdir(outputDir, { recursive: true });
    await captureScreenshots(url, outputDir);

    // Capture every built route from the page plan into screenshots/pages/<route>/.
    const pagesFile = await readPagesFile(siteSlug);
    if (pagesFile) {
      const built = pagesFile.pages.filter((page) => page.status === "built");
      for (const page of built) {
        const routeUrl = new URL(page.route, url).href;
        const routeDir = path.join(outputDir, "pages", routeToDir(page.route));
        await mkdir(routeDir, { recursive: true });
        await captureScreenshots(routeUrl, routeDir);
        console.log(`Captured ${page.route} -> screenshots/pages/${routeToDir(page.route)}/`);
      }
      console.log(`Captured home + ${built.length} built route(s) for ${siteSlug}.`);
    } else {
      console.log(`Captured screenshots for ${siteSlug}.`);
    }
    return;
  }

  if (command === "motion") {
    if (!url) {
      console.error("Usage: blueprint motion <slug> <url>");
      process.exit(1);
    }
    const outputDir = path.join(rootDir, "sites", siteSlug, "qa", "motion");
    await mkdir(outputDir, { recursive: true });
    await captureMotion(url, outputDir);
    console.log(`Captured motion for ${siteSlug}.`);
    return;
  }

  if (command === "beauty") {
    const missingEvidence: string[] = [];
    if (!(await fileExists(`sites/${siteSlug}/art-direction.md`))) {
      missingEvidence.push("art-direction.md");
    }
    if (!(await fileExists(`sites/${siteSlug}/screenshots/desktop.png`))) {
      missingEvidence.push("screenshots/desktop.png");
    }
    if (!(await fileExists(`sites/${siteSlug}/screenshots/mobile.png`))) {
      missingEvidence.push("screenshots/mobile.png");
    }
    if (!(await directoryHasFiles(`sites/${siteSlug}/qa/motion`))) {
      missingEvidence.push("qa/motion capture");
    }
    for (const requiredFile of requiredReferenceFirstFiles(siteSlug)) {
      if (!(await fileExists(requiredFile))) missingEvidence.push(requiredFile);
    }
    const clonePlanRelativePath = `sites/${siteSlug}/references/reference-first/clone-plan.md`;
    const clonePlanPath = path.join(rootDir, clonePlanRelativePath);
    if ((await fileExists(clonePlanRelativePath)) && !hasConcreteClonePlan(await readFile(clonePlanPath, "utf8"))) {
      missingEvidence.push("concrete clone-plan stack decision");
    }

    const reviewPath = path.join(rootDir, "sites", siteSlug, "qa", "visual-review.md");
    const entry = [
      "",
      `## Beauty Pass ${new Date().toISOString()}`,
      "",
      missingEvidence.length > 0 ? "Status: NOT_READY" : "Status: NEEDS_HUMAN_BEAUTY_PASS",
      "",
      missingEvidence.length > 0
        ? `Missing evidence: ${missingEvidence.join(", ")}`
        : "Evidence present. Run the rubric, compare named references, record scores, and update Latest Verdict manually.",
      ""
    ].join("\n");
    await appendFile(reviewPath, entry);

    if (missingEvidence.length > 0) {
      console.log(`NOT_READY: missing evidence for ${siteSlug}: ${missingEvidence.join(", ")}`);
      return;
    }
    console.log(`NEEDS_HUMAN_BEAUTY_PASS: evidence exists for ${siteSlug}.`);
    return;
  }

  if (command === "deploy") {
    const deployPath = path.join(rootDir, "sites", siteSlug, "deploy.md");
    const deployNotes = await readFile(deployPath, "utf8");
    console.log(`Deploy profile for ${siteSlug}: ${deployProfile(deployNotes)}`);
    console.log("Production deploy is intentionally disabled in the first factory version.");
    return;
  }

  console.log(`${command} is planned but not implemented yet for ${siteSlug}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
