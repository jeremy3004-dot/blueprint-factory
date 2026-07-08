import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildPagePlan, type PagesFile } from "./pages";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export function normalizeDonorSlug(donorName: string): string {
  const slug = donorName
    .toLowerCase()
    .replace(/^donor-/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `donor-${slug}`;
}

export function rewriteReferenceHeader(markdown: string, clientSlug: string, kind: "topology" | "clone-plan"): string {
  const firstLine = kind === "topology"
    ? `# ${clientSlug} Reference-First Topology`
    : `# Clone Plan: ${clientSlug}`;
  const lines = markdown.split("\n");
  lines[0] = firstLine;
  if (!markdown.includes("Adopted for client:")) {
    const insertAt = Math.min(lines.length, 5);
    lines.splice(insertAt, 0, `Adopted for client: ${clientSlug}`);
  }
  return lines.join("\n");
}

export function seedPagesFromDonorInventory(
  donorPages: { path: string; label: string; area: string }[],
  limit = 8
): PagesFile {
  return buildPagePlan(donorPages, limit);
}

export type AdoptResult = {
  clientSlug: string;
  donorSlug: string;
  referenceDir: string;
  pageCount: number;
};

export async function runAdopt(clientSlug: string, donorName: string): Promise<AdoptResult> {
  const donorSlug = normalizeDonorSlug(donorName);
  const donorReferenceDir = path.join(rootDir, "sites", donorSlug, "references", "reference-first");
  const clientReferenceDir = path.join(rootDir, "sites", clientSlug, "references", "reference-first");
  await mkdir(path.dirname(clientReferenceDir), { recursive: true });
  await cp(donorReferenceDir, clientReferenceDir, { recursive: true });

  const topologyPath = path.join(clientReferenceDir, "topology.md");
  const clonePlanPath = path.join(clientReferenceDir, "clone-plan.md");
  await writeFile(topologyPath, rewriteReferenceHeader(await readFile(topologyPath, "utf8"), clientSlug, "topology"), "utf8");
  await writeFile(clonePlanPath, rewriteReferenceHeader(await readFile(clonePlanPath, "utf8"), clientSlug, "clone-plan"), "utf8");

  let pageCount = 0;
  try {
    const donorPages = JSON.parse(await readFile(path.join(clientReferenceDir, "extraction", "pages.json"), "utf8")) as { path: string; label: string; area: string }[];
    const plan = seedPagesFromDonorInventory(donorPages);
    pageCount = plan.pages.length;
    await writeFile(path.join(rootDir, "sites", clientSlug, "pages.json"), JSON.stringify(plan, null, 2) + "\n", "utf8");
  } catch {
    await writeFile(path.join(rootDir, "sites", clientSlug, "pages.json"), JSON.stringify({ pages: [{ route: "/", title: "Home", status: "planned" }] }, null, 2) + "\n", "utf8");
    pageCount = 1;
  }

  return {
    clientSlug,
    donorSlug,
    referenceDir: path.relative(rootDir, clientReferenceDir),
    pageCount
  };
}
