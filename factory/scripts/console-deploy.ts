// Deploy the operator console to Vercel (snapshot mode + optional password).

import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractDeployUrl, recordPreviewUrl } from "./deploy";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const consoleDir = path.join(rootDir, "factory", "console");
const deployMd = path.join(consoleDir, "deploy.md");

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

async function main() {
  console.log("Exporting console snapshot from live factory state...");
  const snap = await run("pnpm", ["exec", "tsx", "factory/scripts/export-console-snapshot.ts"], rootDir);
  if (snap.code !== 0) {
    console.error(snap.output);
    process.exit(1);
  }

  console.log("Deploying to Vercel preview...");
  const deploy = await run("vercel", ["deploy", "--yes", "--name", "blueprint-factory-console"], consoleDir);
  const url = extractDeployUrl(deploy.output);
  if (!url) {
    console.error("Deploy failed — no URL in output:\n", deploy.output.slice(-2000));
    process.exit(1);
  }

  let verified = false;
  try {
    const res = await fetch(url);
    verified = res.status >= 200 && res.status < 400;
  } catch {
    verified = false;
  }

  const date = new Date().toISOString();
  let deployContent = "# Deploy: Blueprint Factory Operator Console\n\nProfile: Vercel\nProduction URL:\nPreview URL:\n\n";
  try {
    deployContent = await readFile(deployMd, "utf8");
  } catch {
    // new file
  }
  await writeFile(deployMd, recordPreviewUrl(deployContent, url, date), "utf8");

  console.log("");
  console.log("Console deployed (snapshot mode).");
  console.log(`  URL: ${url}`);
  console.log(`  Verified HTTP: ${verified ? "yes" : "no"}`);
  console.log("");
  console.log("Password protection:");
  console.log("  1. Vercel dashboard → Project → Settings → Deployment Protection");
  console.log("  2. Enable 'Password protection' for preview deployments");
  console.log("  OR set env var CONSOLE_PASSWORD in Vercel for basic auth on /api/*");
  console.log("");
  console.log("Note: hosted console shows a snapshot from deploy time.");
  console.log("      Use local blueprint.local for live data + inbox task creation.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
