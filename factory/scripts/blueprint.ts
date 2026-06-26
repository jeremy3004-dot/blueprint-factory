import { access, appendFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { captureMotion, captureScreenshots } from "./capture";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

type SiteStatus = {
  exists: boolean;
  missingFiles: string[];
  artReady: boolean;
  appExists: boolean;
  screenshotsReady: boolean;
  motionReady: boolean;
  beautyReady: boolean;
};

type NextAction =
  | "CREATE_SITE"
  | "REPAIR_REQUIRED_FILES"
  | "NEEDS_ART_DIRECTION"
  | "CREATE_APP"
  | "NEEDS_PREVIEW_URL"
  | "CAPTURE_SCREENSHOTS"
  | "CAPTURE_MOTION"
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

export function hasPassingVisualReview(markdown: string): boolean {
  const latestVerdict = markdown.match(/## Latest Verdict\s+Status:\s*([A-Z_]+)/);
  if (!latestVerdict || latestVerdict[1] !== "READY_FOR_REVIEW") return false;

  if (!markdown.includes("## Signature Moment Check")) return false;
  if (!markdown.includes("## Reference Comparison")) return false;
  if (!markdown.includes("## Highest Impact Next Fix")) return false;
  if (/Status:\s*(NOT_READY|NEEDS_HUMAN_BEAUTY_PASS|FAILED)/.test(markdown)) return false;

  const scoreMatches = [...markdown.matchAll(/-\s*[^:\n]+:\s*([1-5])\b/g)];
  if (scoreMatches.length < 8) return false;

  return scoreMatches.every((match) => Number(match[1]) >= 3);
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
  if (!status.artReady) return "NEEDS_ART_DIRECTION";
  if (!status.appExists) return "CREATE_APP";
  if (!status.screenshotsReady) return "CAPTURE_SCREENSHOTS";
  if (!status.motionReady) return "CAPTURE_MOTION";
  if (!status.beautyReady) return "RUN_BEAUTY";
  return "READY_FOR_HUMAN_REVIEW";
}

async function createSite(siteSlug: string) {
  await mkdir(path.join(rootDir, "sites", siteSlug, "qa", "motion"), { recursive: true });
  await mkdir(path.join(rootDir, "sites", siteSlug, "assets"), { recursive: true });
  await mkdir(path.join(rootDir, "sites", siteSlug, "references"), { recursive: true });
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
}

async function siteStatus(siteSlug: string): Promise<SiteStatus> {
  const exists = await fileExists(`sites/${siteSlug}`);
  if (!exists) {
    return {
      exists,
      missingFiles: [],
      artReady: false,
      appExists: false,
      screenshotsReady: false,
      motionReady: false,
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

  return {
    exists,
    missingFiles: await checkRequiredFiles(siteSlug),
    artReady,
    appExists: await fileExists(`sites/${siteSlug}/app/package.json`),
    screenshotsReady:
      (await fileExists(`sites/${siteSlug}/screenshots/desktop.png`)) &&
      (await fileExists(`sites/${siteSlug}/screenshots/mobile.png`)),
    motionReady: await directoryHasFiles(`sites/${siteSlug}/qa/motion`),
    beautyReady: hasPassingVisualReview(visualReview)
  };
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
  console.log(`art: ${status.artReady ? "ready" : "not ready"}`);
  console.log(`app: ${status.appExists ? "present" : "missing"}`);
  console.log(`screenshots: ${status.screenshotsReady ? "ready" : "missing"}`);
  console.log(`motion: ${status.motionReady ? "ready" : "missing"}`);
  console.log(`beauty: ${status.beautyReady ? "ready for human review" : "not ready"}`);
  if (status.missingFiles.length > 0) console.log(`missing files: ${status.missingFiles.join(", ")}`);
}

async function main() {
  const [command, rawSlug, url] = process.argv.slice(2);
  if (!command) {
    console.log("Usage: blueprint <run|status|new|art|check|screenshots|motion|beauty|deploy> <slug> [url]");
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
    printStatus(siteSlug, await siteStatus(siteSlug));
    return;
  }

  if (command === "run") {
    let status = await siteStatus(siteSlug);
    let next = nextActionForStatus(status);

    if (next === "CREATE_SITE") {
      await createSite(siteSlug);
      await appendRunLog(siteSlug, "- Created site scaffold.\n- Next gate: complete `brief.md` and `art-direction.md`.");
      console.log(`Created sites/${siteSlug}`);
      status = await siteStatus(siteSlug);
      printStatus(siteSlug, status);
      return;
    }

    if (next === "REPAIR_REQUIRED_FILES") {
      printStatus(siteSlug, status);
      process.exit(1);
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
    const missing = await checkRequiredFiles(siteSlug);
    if (missing.length > 0) {
      console.error(`NOT_READY: missing required files for ${siteSlug}`);
      for (const missingFile of missing) console.error(`- ${missingFile}`);
      process.exit(1);
    }
    console.log(`READY: required factory files exist for ${siteSlug}.`);
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
    console.log(`Captured screenshots for ${siteSlug}.`);
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
