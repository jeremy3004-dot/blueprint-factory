import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// ---------------------------------------------------------------------------
// Pure logic (unit-tested)
// ---------------------------------------------------------------------------

/** Extract the first https deployment URL from Vercel CLI output. */
export function extractDeployUrl(vercelOutput: string): string | null {
  // Vercel prints the deployment URL (e.g. https://slug-abc123.vercel.app) on its own line.
  const matches = vercelOutput.match(/https:\/\/[a-z0-9-]+\.vercel\.app/gi);
  return matches && matches.length > 0 ? matches[matches.length - 1] : null;
}

/** Record a verified preview URL into deploy.md (sets the Preview URL field + a dated note). */
export function recordPreviewUrl(deployMd: string, url: string, date: string): string {
  let out = deployMd;
  if (/^Preview URL:.*$/m.test(out)) {
    out = out.replace(/^Preview URL:.*$/m, `Preview URL: ${url}`);
  } else {
    out += `\nPreview URL: ${url}\n`;
  }
  out += `\n### Preview deploy ${date}\n\n- ${url} (Vercel **preview**, verified HTTP 200). Not production.\n`;
  return out;
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

function run(command: string, args: string[], cwd: string): Promise<{ code: number; output: string }> {
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd });
    let output = "";
    child.stdout?.on("data", (d) => (output += d.toString()));
    child.stderr?.on("data", (d) => (output += d.toString()));
    child.on("error", (err) => resolve({ code: 1, output: output + String(err) }));
    child.on("exit", (code) => resolve({ code: code ?? 1, output }));
  });
}

export type DeployResult = { url: string | null; verified: boolean; detail: string };

/**
 * Deploy a real Vercel PREVIEW (never production), verify it returns 200, and record it in deploy.md.
 * Builds locally first as a gate. Hard rule: this never passes --prod; production stays behind the
 * human gate.
 */
export async function runPreviewDeploy(slug: string): Promise<DeployResult> {
  const appDir = path.join(rootDir, "sites", slug, "app");

  // 1. Local build gate — never deploy something that doesn't build.
  const build = await run("pnpm", ["--filter", slug, "build"], rootDir);
  if (build.code !== 0) {
    return { url: null, verified: false, detail: `local build failed:\n${build.output.split("\n").slice(-8).join("\n")}` };
  }

  // 2. Vercel preview deploy (default target is preview; we NEVER pass --prod).
  const deploy = await run("vercel", ["deploy", "--yes"], appDir);
  const url = extractDeployUrl(deploy.output);
  if (!url) {
    return { url: null, verified: false, detail: `no preview URL in Vercel output:\n${deploy.output.split("\n").slice(-10).join("\n")}` };
  }

  // 3. Verify the URL returns 200.
  let verified = false;
  try {
    const response = await fetch(url, { method: "GET" });
    verified = response.status >= 200 && response.status < 400;
  } catch (error) {
    return { url, verified: false, detail: `deployed to ${url} but verification failed: ${error instanceof Error ? error.message : String(error)}` };
  }

  // 4. Record in deploy.md.
  const deployMdPath = path.join(rootDir, "sites", slug, "deploy.md");
  try {
    const deployMd = await readFile(deployMdPath, "utf8");
    await writeFile(deployMdPath, recordPreviewUrl(deployMd, url, new Date().toISOString()), "utf8");
  } catch {
    // deploy.md missing — non-fatal; the URL is still returned
  }

  return { url, verified, detail: verified ? `preview live and verified at ${url}` : `deployed to ${url} but did not return 200` };
}
