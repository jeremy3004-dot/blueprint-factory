// Async job runner for Operator Console — commission workflows that run real factory commands.

import { spawn } from "node:child_process";
import { mkdir, readdir, readFile, writeFile, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { slugify } from "./blueprint.ts";
import {
  buildRestockTaskInput,
  shelfRestockJobTitle,
  validateShelfRestockCommission,
  type ShelfRestockCommission
} from "./shelf-restock-commission";
import {
  buildMatchmakerTaskInput,
  createTask,
  rootDir,
  type ConsoleProspect,
  type NewTaskInput
} from "./console-data";
import {
  CLONE_STAGE_LABELS,
  runClonePipeline,
  type ClonePipelineStage
} from "./console-clone-runner";

export type JobStatus = "queued" | "running" | "done" | "failed";
export type JobKind = "prospect_search" | "shelf_capture" | "shelf_restock" | "clone_pair";

export type ProspectSearchInput = {
  lane: string;
  region?: string;
  notes?: string;
};

export type ShelfCaptureInput = {
  request: string;
  urls?: string[];
  notes?: string;
};

export type ShelfRestockInput = ShelfRestockCommission;

export type ClonePairInput = {
  clientName: string;
  clientWebsite: string;
  donorShelfSlug: string;
  notes?: string;
};

export type ConsoleJob = {
  id: string;
  kind: JobKind;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  title: string;
  input: ProspectSearchInput | ShelfCaptureInput | ShelfRestockInput | ClonePairInput;
  taskFilename?: string;
  logFile: string;
  stage?: ClonePipelineStage;
  result?: {
    message: string;
    prospectCount?: number;
    donorSlug?: string;
    siteSlug?: string;
    previewUrl?: string;
    stageLabel?: string;
    viewTarget?: "prospects" | "donors" | "projects";
    automated?: boolean;
    needsCursor?: boolean;
  };
  error?: string;
};

const JOBS_DIR = path.join(rootDir, "factory", "inbox", "jobs");
const PROSPECT_DATA_DIR = path.join(rootDir, ".blueprint-search-nepal");

function resolveProspectScript(): string | null {
  const candidates = [
    process.env.BLUEPRINT_SEARCH_NEPAL_SCRIPT,
    path.join(os.homedir(), ".codex/skills/blueprint-search-nepal/scripts/blueprint_search_nepal.py"),
    path.join(os.homedir(), ".agents/skills/blueprint-search-nepal/scripts/blueprint_search_nepal.py")
  ].filter((p): p is string => typeof p === "string" && p.length > 0);
  return candidates.find((p) => existsSync(p)) ?? null;
}
const NEPAL_LEADS_CSV = path.join(rootDir, "prospects", "nepal-leads.csv");

const JOB_ID_RE = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/;

export function isSafeJobId(id: string): boolean {
  if (!id || !JOB_ID_RE.test(id)) return false;
  if (id.includes("..")) return false;
  const resolved = path.resolve(JOBS_DIR, id);
  return resolved.startsWith(JOBS_DIR);
}

function jobPaths(id: string) {
  if (!isSafeJobId(id)) throw new Error("Invalid job id");
  return {
    json: path.join(JOBS_DIR, `${id}.json`),
    markdown: path.join(JOBS_DIR, `${id}.md`),
    log: path.join(JOBS_DIR, `${id}.log`)
  };
}

async function ensureJobsDir() {
  await mkdir(JOBS_DIR, { recursive: true });
}

function timestampPrefix(): string {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function makeJobId(kind: JobKind, label: string): string {
  const base = `${timestampPrefix()}-${kind}-${slugify(label).slice(0, 48)}`;
  return base.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export function extractUrls(text: string): string[] {
  const matches = text.match(/https?:\/\/[^\s<>"')\]]+/gi) ?? [];
  return [...new Set(matches.map((u) => u.replace(/[.,;]+$/, "")))];
}

function donorSlugFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const base = slugify(host.split(".")[0] || host);
    return `donor-${base}`;
  } catch {
    return `donor-${slugify(url).slice(0, 32)}`;
  }
}

async function appendLog(id: string, line: string) {
  const { log } = jobPaths(id);
  const stamp = new Date().toISOString();
  await appendFile(log, `[${stamp}] ${line}\n`, "utf8");
}

async function saveJob(job: ConsoleJob) {
  const paths = jobPaths(job.id);
  job.updatedAt = new Date().toISOString();
  await writeFile(paths.json, JSON.stringify(job, null, 2), "utf8");
  await writeFile(paths.markdown, buildJobMarkdown(job), "utf8");
}

async function updateJobStatus(
  id: string,
  patch: Partial<Pick<ConsoleJob, "status" | "stage" | "result" | "error" | "taskFilename">>
) {
  const job = await getJob(id);
  if (!job) throw new Error("Job not found");
  Object.assign(job, patch);
  await saveJob(job);
  return job;
}

function buildJobMarkdown(job: ConsoleJob): string {
  const lines = [
    `# Job: ${job.title}`,
    "",
    `Job ID: ${job.id}`,
    `Kind: ${job.kind}`,
    `Status: ${job.status}`,
    `Created: ${job.createdAt}`,
    `Updated: ${job.updatedAt}`,
    ""
  ];

  if (job.taskFilename) {
    lines.push(`Task file: factory/inbox/${job.taskFilename}`, "");
  }

  lines.push("## Request", "");
  if (job.kind === "prospect_search") {
    const input = job.input as ProspectSearchInput;
    lines.push(`- **Search lane:** ${input.lane}`);
    if (input.region?.trim()) lines.push(`- **Region:** ${input.region}`);
    if (input.notes?.trim()) lines.push(`- **Notes:** ${input.notes}`);
  } else if (job.kind === "shelf_capture") {
    const input = job.input as ShelfCaptureInput;
    lines.push(`- **Request:** ${input.request}`);
    if (input.urls?.length) lines.push(`- **URLs:** ${input.urls.join(", ")}`);
    if (input.notes?.trim()) lines.push(`- **Notes:** ${input.notes}`);
  } else if (job.kind === "shelf_restock") {
    const input = job.input as ShelfRestockInput;
    lines.push(`- **Commission:** ${shelfRestockJobTitle(input)}`);
    for (const t of input.targets) {
      lines.push(`  - ${t.field}: ${t.count} donor(s)`);
    }
    if (input.totalCap != null) lines.push(`- **Total cap:** ${input.totalCap}`);
    if (input.notes?.trim()) lines.push(`- **Notes:** ${input.notes}`);
  } else {
    const input = job.input as ClonePairInput;
    lines.push(`- **Client:** ${input.clientName}`);
    lines.push(`- **Website:** ${input.clientWebsite}`);
    lines.push(`- **Donor:** ${input.donorShelfSlug}`);
    if (input.notes?.trim()) lines.push(`- **Notes:** ${input.notes}`);
  }

  if (job.stage && job.kind === "clone_pair") {
    lines.push(`Stage: ${CLONE_STAGE_LABELS[job.stage] ?? job.stage}`, "");
  }

  lines.push("", "## Log", "", `See factory/inbox/jobs/${job.id}.log`, "");

  if (job.result) {
    lines.push("## Result", "", job.result.message, "");
    if (job.result.prospectCount != null) {
      lines.push(`Exported **${job.result.prospectCount}** prospects to \`prospects/nepal-leads.csv\`.`, "");
    }
    if (job.result.donorSlug) {
      lines.push(`Donor slug: \`${job.result.donorSlug}\``, "");
    }
    if (job.result.siteSlug) {
      lines.push(`Site slug: \`${job.result.siteSlug}\``, "");
    }
    if (job.result.previewUrl) {
      lines.push(`Preview URL: ${job.result.previewUrl}`, "");
    }
  }

  if (job.error) {
    lines.push("## Error", "", job.error, "");
  }

  return lines.join("\n");
}

function runCommand(
  id: string,
  command: string,
  args: string[],
  options: { cwd?: string } = {}
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? rootDir,
      env: { ...process.env, FORCE_COLOR: "0" },
      stdio: ["ignore", "pipe", "pipe"]
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      stdout += text;
      void appendLog(id, text.trimEnd());
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      stderr += text;
      void appendLog(id, `[stderr] ${text.trimEnd()}`);
    });

    child.on("close", (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });

    child.on("error", (err) => {
      stderr += err.message;
      void appendLog(id, `[error] ${err.message}`);
      resolve({ code: 1, stdout, stderr });
    });
  });
}

async function exportProspectsCsv(id: string): Promise<number> {
  const prospectScript = resolveProspectScript();
  if (!prospectScript) {
    await appendLog(
      id,
      "Prospect script not found. Install blueprint-search-nepal skill or set BLUEPRINT_SEARCH_NEPAL_SCRIPT."
    );
    return 0;
  }

  await mkdir(path.dirname(NEPAL_LEADS_CSV), { recursive: true });

  const args = [
    prospectScript,
    "--data-dir",
    PROSPECT_DATA_DIR,
    "export",
    "--format",
    "csv",
    "--output",
    NEPAL_LEADS_CSV
  ];

  await appendLog(id, `Running: python3 ${args.join(" ")}`);
  const { code, stderr } = await runCommand(id, "python3", args);

  if (code !== 0) {
    await appendLog(id, `Export failed (code ${code}): ${stderr || "no stderr"}`);
    return 0;
  }

  try {
    const csv = await readFile(NEPAL_LEADS_CSV, "utf8");
    const rows = csv.trim().split(/\r?\n/).length - 1;
    return Math.max(0, rows);
  } catch {
    return 0;
  }
}

async function createProspectSearchTask(job: ConsoleJob, input: ProspectSearchInput) {
  const scope = [input.lane, input.region?.trim()].filter(Boolean).join(" — ");
  const callPhrase = [
    `Commission Nepal prospect search for: ${scope}.`,
    `Job ID: ${job.id}.`,
    "Use blueprint-search-nepal skill to scout businesses with strong demand and weak websites.",
    "Score 0-100, export to prospects/nepal-leads.csv.",
    input.notes?.trim() ? `Notes: ${input.notes.trim()}` : ""
  ]
    .filter(Boolean)
    .join(" ");

  const markdown = `# Task: Prospect search — ${input.lane}

Created: ${new Date().toISOString()}
Status: pending
Type: prospect_search
Slug: ${slugify(input.lane)}
Job ID: ${job.id}

## Worker prompt

Scout Nepal businesses for the search lane below. Use \`/Users/dev/.codex/skills/blueprint-search-nepal/\`.
Import results with \`blueprint_search_nepal.py import\`, then export to \`prospects/nepal-leads.csv\`.

## Job Card

- **Search lane:** ${input.lane}
${input.region?.trim() ? `- **Region:** ${input.region.trim()}` : ""}
${input.notes?.trim() ? `- **Notes:** ${input.notes.trim()}` : ""}
- **Console job:** \`factory/inbox/jobs/${job.id}.json\`

## Call phrase

${callPhrase}

## Cursor handoff

Paste the call phrase above into Cursor chat, or point a Cursor automation at this file in \`factory/inbox/\`.
`;

  const inboxDir = path.join(rootDir, "factory", "inbox");
  await mkdir(inboxDir, { recursive: true });
  const filename = `${timestampPrefix()}-${slugify(input.lane)}-prospect-search.md`;
  await writeFile(path.join(inboxDir, filename), markdown, "utf8");
  return filename;
}

async function runProspectSearchJob(job: ConsoleJob) {
  const input = job.input as ProspectSearchInput;
  await updateJobStatus(job.id, { status: "running" });
  await appendLog(job.id, `Starting prospect search commission: ${input.lane}`);
  await appendLog(
    job.id,
    "Console step: refresh prospects/nepal-leads.csv from local SQLite + create Cursor scout task."
  );
  await appendLog(
    job.id,
    "AI web scouting does not run here — paste the inbox task into Cursor to discover new leads."
  );

  const prospectCount = await exportProspectsCsv(job.id);
  const taskFilename = await createProspectSearchTask(job, input);

  await updateJobStatus(job.id, {
    status: "done",
    taskFilename,
    result: {
      message:
        prospectCount > 0
          ? `Refreshed CSV with ${prospectCount} existing prospects. Scout task created for lane "${input.lane}" — run in Cursor to find new leads.`
          : `Scout task created for lane "${input.lane}". No prospects in local database yet — run the search in Cursor.`,
      prospectCount,
      viewTarget: "prospects",
      automated: prospectCount > 0
    }
  });
}

async function runShelfCaptureJob(job: ConsoleJob) {
  const input = job.input as ShelfCaptureInput;
  await updateJobStatus(job.id, { status: "running" });

  const urls = input.urls?.length ? input.urls : extractUrls(input.request);
  await appendLog(job.id, `Shelf capture request: ${input.request}`);
  await appendLog(job.id, `URLs detected: ${urls.length ? urls.join(", ") : "(none — scout task)"}`);

  if (!urls.length) {
    const taskInput: NewTaskInput = {
      taskType: "restock_shelf",
      restockRequest: input.request,
      notes: input.notes?.trim()
        ? `${input.notes.trim()}\n\nConsole job: ${job.id}`
        : `Console job: ${job.id}`
    };
    const { filename } = await createTask(taskInput);
    await updateJobStatus(job.id, {
      status: "done",
      taskFilename: filename,
      result: {
        message:
          "No explicit URLs — shelf restock task created. Beauty audition and capture run in Cursor.",
        viewTarget: "donors",
        automated: false
      }
    });
    return;
  }

  const captured: string[] = [];
  const errors: string[] = [];

  for (const url of urls) {
    const donorSlug = donorSlugFromUrl(url);
    await appendLog(job.id, `Capturing ${url} as ${donorSlug}…`);
    const { code, stderr } = await runCommand(job.id, "pnpm", [
      "blueprint:capture",
      donorSlug,
      url
    ]);

    if (code === 0) {
      captured.push(donorSlug);
    } else {
      errors.push(`${url}: ${stderr.trim() || `exit ${code}`}`);
    }
  }

  if (captured.length === 0) {
    await updateJobStatus(job.id, {
      status: "failed",
      error: errors.join("; ") || "Capture failed for all URLs"
    });
    return;
  }

  await updateJobStatus(job.id, {
    status: errors.length ? "done" : "done",
    result: {
      message:
        errors.length > 0
          ? `Captured ${captured.length} donor(s): ${captured.join(", ")}. Some URLs failed.`
          : `Captured ${captured.length} donor(s): ${captured.join(", ")}.`,
      donorSlug: captured[captured.length - 1],
      viewTarget: "donors",
      automated: true
    },
    error: errors.length ? errors.join("; ") : undefined
  });
}

async function runShelfRestockJob(job: ConsoleJob) {
  const input = job.input as ShelfRestockInput;
  await updateJobStatus(job.id, { status: "running" });

  const total = input.targets.reduce((sum, t) => sum + t.count, 0);
  await appendLog(job.id, `Shelf restock commission: ${shelfRestockJobTitle(input)}`);
  await appendLog(
    job.id,
    "Console step: create structured Cursor task — worker researches, beauty-auditions, and captures donors."
  );
  await appendLog(
    job.id,
    `Worker will find ${total} world-class donor(s) across ${input.targets.length} sector(s). Open the inbox task in Cursor to run.`
  );
  await appendLog(job.id, "AI web research and beauty audition do NOT run in this console subprocess.");

  const taskInput = buildRestockTaskInput(input, job.id);
  const { filename } = await createTask(taskInput);

  await updateJobStatus(job.id, {
    status: "done",
    taskFilename: filename,
    result: {
      message: `Restock commissioned — ${total} donor(s) across ${input.targets.length} sector(s). Research, beauty audition, and capture run in Cursor (inbox task created).`,
      viewTarget: "donors",
      automated: false
    }
  });
}

async function runClonePairJob(job: ConsoleJob) {
  const input = job.input as ClonePairInput;
  await updateJobStatus(job.id, { status: "running" });

  const taskInput = buildMatchmakerTaskInput(
    input.donorShelfSlug,
    {
      id: slugify(input.clientName),
      name: input.clientName,
      websiteUrl: input.clientWebsite
    } as ConsoleProspect,
    input.notes
  );

  const { filename } = await createTask(taskInput);
  await appendLog(job.id, `Created clone task (Cursor fallback): factory/inbox/${filename}`);
  await appendLog(job.id, "Starting automated pipeline on this Mac…");

  const runPipelineCommand = (command: string, args: string[], options: { cwd?: string } = {}) =>
    runCommand(job.id, command, args, options);

  try {
    const pipeline = await runClonePipeline(input, runPipelineCommand, {
      appendLog: (line) => appendLog(job.id, line),
      updateStage: async (stage) => {
        await updateJobStatus(job.id, { stage });
      }
    });

    await updateJobStatus(job.id, {
      status: "done",
      stage: "complete",
      taskFilename: filename,
      result: {
        message: pipeline.previewUrl
          ? `Preview deployed for ${pipeline.siteSlug}. Open it from Today or My Projects. Pixel-perfect clone and Beauty Pass still run in Cursor when you want polish.`
          : `Pipeline finished for ${pipeline.siteSlug} but no preview URL was recorded.`,
        donorSlug: input.donorShelfSlug,
        siteSlug: pipeline.siteSlug,
        previewUrl: pipeline.previewUrl ?? undefined,
        stageLabel: CLONE_STAGE_LABELS.complete,
        viewTarget: "projects",
        automated: pipeline.automated,
        needsCursor: true
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await appendLog(job.id, `Pipeline failed: ${message}`);
    await updateJobStatus(job.id, {
      status: "failed",
      taskFilename: filename,
      error: message,
      result: {
        message: `Automated build failed for ${slugify(input.clientName)}. Check the log below or continue from the inbox task in Cursor.`,
        donorSlug: input.donorShelfSlug,
        siteSlug: slugify(input.clientName),
        viewTarget: "projects",
        automated: false,
        needsCursor: true
      }
    });
  }
}

async function runJobById(id: string) {
  const job = await getJob(id);
  if (!job || job.status !== "queued") return;

  try {
    if (job.kind === "prospect_search") await runProspectSearchJob(job);
    else if (job.kind === "shelf_capture") await runShelfCaptureJob(job);
    else if (job.kind === "shelf_restock") await runShelfRestockJob(job);
    else if (job.kind === "clone_pair") await runClonePairJob(job);
  } catch (error) {
    await appendLog(id, `Job failed: ${error instanceof Error ? error.message : String(error)}`);
    await updateJobStatus(id, {
      status: "failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

export async function createJob(
  kind: JobKind,
  input: ProspectSearchInput | ShelfCaptureInput | ShelfRestockInput | ClonePairInput,
  title: string
): Promise<ConsoleJob> {
  await ensureJobsDir();

  const label =
    kind === "prospect_search"
      ? (input as ProspectSearchInput).lane
      : kind === "shelf_capture"
        ? (input as ShelfCaptureInput).request.slice(0, 40)
        : kind === "shelf_restock"
          ? shelfRestockJobTitle(input as ShelfRestockInput)
          : (input as ClonePairInput).clientName;

  const id = makeJobId(kind, label);
  const paths = jobPaths(id);
  const now = new Date().toISOString();

  const job: ConsoleJob = {
    id,
    kind,
    status: "queued",
    createdAt: now,
    updatedAt: now,
    title,
    input,
    logFile: `factory/inbox/jobs/${id}.log`
  };

  await writeFile(paths.log, `[${now}] Job queued: ${title}\n`, "utf8");
  await saveJob(job);

  setImmediate(() => {
    void runJobById(id);
  });

  return job;
}

export async function listJobs(): Promise<ConsoleJob[]> {
  await ensureJobsDir();
  const files = (await readdir(JOBS_DIR)).filter((f) => f.endsWith(".json"));
  const jobs: ConsoleJob[] = [];

  for (const file of files) {
    try {
      const raw = await readFile(path.join(JOBS_DIR, file), "utf8");
      jobs.push(JSON.parse(raw) as ConsoleJob);
    } catch {
      // skip corrupt job files
    }
  }

  return jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getJob(id: string): Promise<ConsoleJob | null> {
  if (!isSafeJobId(id)) return null;
  const { json } = jobPaths(id);
  try {
    const raw = await readFile(json, "utf8");
    return JSON.parse(raw) as ConsoleJob;
  } catch {
    return null;
  }
}

export async function getJobLogTail(id: string, lines = 80): Promise<string> {
  if (!isSafeJobId(id)) return "";
  const { log } = jobPaths(id);
  try {
    const content = await readFile(log, "utf8");
    return content.split("\n").slice(-lines).join("\n");
  } catch {
    return "";
  }
}

export function validateProspectSearchInput(body: unknown): ProspectSearchInput {
  if (!body || typeof body !== "object") throw new Error("Invalid body");
  const { lane, region, notes } = body as Record<string, unknown>;
  if (typeof lane !== "string" || !lane.trim()) throw new Error("lane is required");
  return {
    lane: lane.trim(),
    region: typeof region === "string" ? region.trim() : undefined,
    notes: typeof notes === "string" ? notes.trim() : undefined
  };
}

export function validateShelfCaptureInput(body: unknown): ShelfCaptureInput {
  if (!body || typeof body !== "object") throw new Error("Invalid body");
  const { request, urls, notes } = body as Record<string, unknown>;
  if (typeof request !== "string" || !request.trim()) throw new Error("request is required");
  const parsedUrls = Array.isArray(urls)
    ? urls.filter((u): u is string => typeof u === "string" && u.trim().length > 0).map((u) => u.trim())
    : undefined;
  return {
    request: request.trim(),
    urls: parsedUrls?.length ? parsedUrls : undefined,
    notes: typeof notes === "string" ? notes.trim() : undefined
  };
}

export { validateShelfRestockCommission } from "./shelf-restock-commission";

export { CLONE_STAGE_LABELS } from "./console-clone-runner";

export function validateClonePairInput(body: unknown): ClonePairInput {
  if (!body || typeof body !== "object") throw new Error("Invalid body");
  const { clientName, clientWebsite, donorShelfSlug, notes } = body as Record<string, unknown>;
  if (typeof clientName !== "string" || !clientName.trim()) throw new Error("clientName is required");
  if (typeof clientWebsite !== "string" || !clientWebsite.trim()) {
    throw new Error("clientWebsite is required");
  }
  if (typeof donorShelfSlug !== "string" || !donorShelfSlug.trim()) {
    throw new Error("donorShelfSlug is required");
  }
  return {
    clientName: clientName.trim(),
    clientWebsite: clientWebsite.trim(),
    donorShelfSlug: donorShelfSlug.trim(),
    notes: typeof notes === "string" ? notes.trim() : undefined
  };
}
