// Automated client clone pipeline for Operator Console — adopt, brand capture, tokens, build, preview deploy.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { slugify } from "./blueprint.ts";
import { parsePreviewUrl } from "./status.ts";
import { rootDir } from "./console-data";

export type ClonePipelineStage =
  | "adopting"
  | "capturing_brand"
  | "curating_tokens"
  | "installing"
  | "building"
  | "deploying"
  | "complete";

export const CLONE_STAGE_LABELS: Record<ClonePipelineStage, string> = {
  adopting: "Adopting design",
  capturing_brand: "Saving brand from their website",
  curating_tokens: "Setting colors & fonts",
  installing: "Installing dependencies",
  building: "Building site",
  deploying: "Deploying preview",
  complete: "Preview ready"
};

export type CloneRunnerInput = {
  clientName: string;
  clientWebsite: string;
  donorShelfSlug: string;
  notes?: string;
};

export type RunCommandResult = { code: number; stdout: string; stderr: string };

export type RunCommandFn = (
  command: string,
  args: string[],
  options?: { cwd?: string }
) => Promise<RunCommandResult>;

export type CloneRunnerCallbacks = {
  appendLog: (line: string) => Promise<void>;
  updateStage: (stage: ClonePipelineStage) => Promise<void>;
};

export type ClonePipelineResult = {
  siteSlug: string;
  brandSourceSlug: string;
  adopted: boolean;
  previewUrl: string | null;
  automated: boolean;
};

export function brandSourceSlugForClient(siteSlug: string): string {
  return `${siteSlug}-brand-source`;
}

async function readPreviewUrl(siteSlug: string): Promise<string | null> {
  try {
    const deployMd = await readFile(path.join(rootDir, "sites", siteSlug, "deploy.md"), "utf8");
    return parsePreviewUrl(deployMd);
  } catch {
    return null;
  }
}

/**
 * Run the v1 automated clone pipeline: adopt donor → capture client brand → tokens → build → preview deploy.
 * Pixel-perfect clone, art direction, compare, and translation still need a Cursor worker.
 */
export async function runClonePipeline(
  input: CloneRunnerInput,
  runCommand: RunCommandFn,
  callbacks: CloneRunnerCallbacks
): Promise<ClonePipelineResult> {
  const siteSlug = slugify(input.clientName);
  const brandSlug = brandSourceSlugForClient(siteSlug);

  let adopted = false;

  await callbacks.updateStage("adopting");
  await callbacks.appendLog(`Adopting donor ${input.donorShelfSlug} for ${siteSlug}…`);
  const adopt = await runCommand("pnpm", ["blueprint:adopt", siteSlug, input.donorShelfSlug]);
  adopted = adopt.code === 0;
  if (!adopted) {
    throw new Error(`blueprint:adopt failed: ${adopt.stderr.trim() || `exit ${adopt.code}`}`);
  }

  await callbacks.updateStage("capturing_brand");
  await callbacks.appendLog(`Capturing brand source from ${input.clientWebsite} as ${brandSlug}…`);
  const capture = await runCommand("pnpm", [
    "blueprint:capture",
    brandSlug,
    input.clientWebsite,
    "--pages",
    "1"
  ]);
  if (capture.code !== 0) {
    await callbacks.appendLog(
      `[warn] Brand capture failed (non-fatal): ${capture.stderr.trim() || `exit ${capture.code}`}`
    );
  }

  await callbacks.updateStage("curating_tokens");
  await callbacks.appendLog(`Curating design tokens for ${siteSlug}…`);
  const tokens = await runCommand("pnpm", ["blueprint:tokens", siteSlug]);
  if (tokens.code !== 0) {
    await callbacks.appendLog(
      `[warn] Token curation failed (non-fatal): ${tokens.stderr.trim() || `exit ${tokens.code}`}`
    );
  }

  await callbacks.updateStage("installing");
  await callbacks.appendLog("Installing workspace dependencies…");
  const install = await runCommand("pnpm", ["install"]);
  if (install.code !== 0) {
    throw new Error(`pnpm install failed: ${install.stderr.trim() || `exit ${install.code}`}`);
  }

  await callbacks.updateStage("building");
  await callbacks.appendLog(`Building ${siteSlug}…`);
  const build = await runCommand("pnpm", ["--filter", siteSlug, "build"]);
  if (build.code !== 0) {
    throw new Error(`build failed: ${build.stderr.trim() || `exit ${build.code}`}`);
  }

  await callbacks.updateStage("deploying");
  await callbacks.appendLog(`Deploying Vercel preview for ${siteSlug}…`);
  const deploy = await runCommand("pnpm", ["blueprint:deploy", siteSlug, "--preview"]);
  if (deploy.code !== 0) {
    throw new Error(`preview deploy failed: ${deploy.stderr.trim() || `exit ${deploy.code}`}`);
  }

  const previewUrl = await readPreviewUrl(siteSlug);
  if (!previewUrl) {
    throw new Error("Deploy finished but no preview URL was recorded in deploy.md");
  }

  await callbacks.updateStage("complete");
  await callbacks.appendLog(`Preview live: ${previewUrl}`);

  return {
    siteSlug,
    brandSourceSlug: brandSlug,
    adopted,
    previewUrl,
    automated: true
  };
}
