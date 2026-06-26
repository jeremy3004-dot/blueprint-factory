import { access, appendFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { captureMotion, captureScreenshots } from "./capture";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

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

async function copyTemplate(templateName: string, destination: string, siteSlug: string) {
  const source = path.join(rootDir, "factory/templates", templateName);
  const raw = await readFile(source, "utf8");
  await writeFile(path.join(rootDir, destination), raw.replaceAll("{{siteSlug}}", siteSlug));
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

async function main() {
  const [command, rawSlug, url] = process.argv.slice(2);
  if (!command) {
    console.log("Usage: blueprint <new|art|check|screenshots|motion|beauty|deploy> <slug>");
    return;
  }

  const siteSlug = rawSlug ? slugify(rawSlug) : "";
  if (!siteSlug) throw new Error("Site slug is required");

  if (command === "new") {
    await mkdir(path.join(rootDir, "sites", siteSlug, "qa", "motion"), { recursive: true });
    await mkdir(path.join(rootDir, "sites", siteSlug, "assets"), { recursive: true });
    await mkdir(path.join(rootDir, "sites", siteSlug, "references"), { recursive: true });
    await mkdir(path.join(rootDir, "sites", siteSlug, "source-notes"), { recursive: true });
    await mkdir(path.join(rootDir, "sites", siteSlug, "screenshots"), { recursive: true });
    await copyTemplate("brief.template.md", `sites/${siteSlug}/brief.md`, siteSlug);
    await copyTemplate("art-direction.template.md", `sites/${siteSlug}/art-direction.md`, siteSlug);
    await copyTemplate("asset-log.template.md", `sites/${siteSlug}/asset-log.md`, siteSlug);
    await copyTemplate("deploy.template.md", `sites/${siteSlug}/deploy.md`, siteSlug);
    await copyTemplate("run-log.template.md", `sites/${siteSlug}/qa/run-log.md`, siteSlug);
    await copyTemplate("visual-review.template.md", `sites/${siteSlug}/qa/visual-review.md`, siteSlug);
    console.log(`Created sites/${siteSlug}`);
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
      missingEvidence.length > 0 ? "Status: NOT_READY" : "Status: READY_FOR_REVIEW",
      "",
      missingEvidence.length > 0 ? `Missing evidence: ${missingEvidence.join(", ")}` : "Evidence present. Run the rubric and record scores.",
      ""
    ].join("\n");
    await appendFile(reviewPath, entry);

    if (missingEvidence.length > 0) {
      console.log(`NOT_READY: missing evidence for ${siteSlug}: ${missingEvidence.join(", ")}`);
      return;
    }
    console.log(`READY_FOR_REVIEW: evidence exists for ${siteSlug}.`);
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
