import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

async function copyTemplate(templateName: string, destination: string, siteSlug: string) {
  const source = path.join(rootDir, "factory/templates", templateName);
  const raw = await readFile(source, "utf8");
  await writeFile(path.join(rootDir, destination), raw.replaceAll("{{siteSlug}}", siteSlug));
}

async function main() {
  const [command, rawSlug] = process.argv.slice(2);
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

  console.log(`${command} is planned but not implemented yet for ${siteSlug}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
