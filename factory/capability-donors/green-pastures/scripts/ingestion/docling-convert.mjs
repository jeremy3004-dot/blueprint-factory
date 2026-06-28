#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_OUT_DIR = ".artifacts/ingestion/documents";
const DEFAULT_DOCLING_PROJECT = "/Users/dev/Projects/tools/docling";

function parseArgs(argv) {
  const args = {
    inputs: [],
    outDir: DEFAULT_OUT_DIR,
    format: "md",
    doclingProject: process.env.DOCLING_PROJECT || DEFAULT_DOCLING_PROJECT,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if ((arg === "--input" || arg === "-i") && next) {
      args.inputs.push(next);
      index += 1;
    } else if (arg === "--out" && next) {
      args.outDir = next;
      index += 1;
    } else if (arg === "--format" && next) {
      args.format = next;
      index += 1;
    } else if (arg === "--docling-project" && next) {
      args.doclingProject = next;
      index += 1;
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
  npm run ingest:docling -- --input ./operator.pdf
  npm run ingest:docling -- -i ./deck.pptx --format json --out .artifacts/ingestion/docs

Options:
  --input, -i FILE_OR_URL     Document path or URL. Can be repeated.
  --out DIR                   Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --format FORMAT             Docling output format. Defaults to md.
  --docling-project DIR       Local Docling checkout. Defaults to ${DEFAULT_DOCLING_PROJECT}.
  --help                      Show this message.

Set DOCLING_BIN to an installed docling executable when it is not on PATH.
`);
}

function commandExists(command) {
  const result = process.platform === "win32"
    ? spawnSync("where", [command], { stdio: "ignore" })
    : spawnSync("sh", ["-lc", `command -v ${command}`], { stdio: "ignore" });
  return result.status === 0;
}

async function resolveDoclingCommand(doclingProject) {
  if (process.env.DOCLING_BIN) {
    return { command: process.env.DOCLING_BIN, argsPrefix: [] };
  }

  if (commandExists("docling")) {
    return { command: "docling", argsPrefix: [] };
  }

  if (existsSync(path.join(doclingProject, "pyproject.toml")) && commandExists("uv")) {
    return { command: "uv", argsPrefix: ["run", "--project", doclingProject, "docling"] };
  }

  throw new Error(
    "Docling CLI was not found. Install docling, set DOCLING_BIN, or install uv for the local Docling checkout.",
  );
}

async function runDocling({ command, argsPrefix }, args) {
  await mkdir(args.outDir, { recursive: true });

  const doclingArgs = [
    ...argsPrefix,
    ...args.inputs,
    "--to",
    args.format,
    "--output",
    args.outDir,
  ];

  await new Promise((resolve, reject) => {
    const child = spawn(command, doclingArgs, {
      cwd: process.cwd(),
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Docling exited with status ${code}`));
      }
    });
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  if (args.inputs.length === 0) {
    throw new Error("Provide at least one --input document path or URL");
  }

  const command = await resolveDoclingCommand(args.doclingProject);
  await runDocling(command, args);
  console.log(`Docling output written to ${path.relative(process.cwd(), path.resolve(args.outDir))}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
