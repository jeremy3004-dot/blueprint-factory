// Operator console HTTP server — visual dashboard + task inbox for Blueprint Factory.

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createTask,
  gatherConsoleData,
  getSiteDetail,
  listTasks,
  readProspects,
  findProspectById,
  resolveAssetPath,
  type NewTaskInput
} from "./console-data";
import {
  addManualProspect,
  buildProspectFilterMeta,
  filterProspects,
  parseProspectQuery,
  readProspectOverrides,
  toggleProspectStar,
  validateManualProspectInput,
  type ProspectTier
} from "./console-prospects";
import {
  createJob,
  getJob,
  getJobLogTail,
  listJobs,
  validateClonePairInput,
  validateProspectSearchInput,
  validateShelfCaptureInput,
  validateShelfRestockCommission
} from "./console-jobs";
import { shelfRestockJobTitle } from "./shelf-restock-commission";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const consoleDir = path.join(rootDir, "factory", "console");
const defaultPort = Number(process.env.BLUEPRINT_CONSOLE_PORT ?? 4177);

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8"
};

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body, null, 2));
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

async function serveStatic(res: ServerResponse, relativePath: string) {
  const filePath = path.join(consoleDir, relativePath);
  if (!filePath.startsWith(consoleDir)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  try {
    const data = await readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    sendJson(res, 404, { error: "Not found" });
  }
}

async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const { pathname } = url;

  if (req.method === "GET" && pathname === "/api/prospects") {
    const params = parseProspectQuery(url);
    const prospects = await readProspects();
    const filtered = filterProspects(prospects, params);
    sendJson(res, 200, {
      prospects: filtered,
      total: prospects.length,
      count: filtered.length,
      filters: buildProspectFilterMeta(prospects),
      applied: params
    });
    return;
  }

  if (req.method === "POST" && pathname.startsWith("/api/prospects/") && pathname.endsWith("/star")) {
    const id = decodeURIComponent(pathname.slice("/api/prospects/".length, -"/star".length));
    try {
      const body = JSON.parse(await readBody(req)) as { tier?: ProspectTier };
      const entry = await toggleProspectStar(id, { tier: body.tier });
      const prospect = await findProspectById(id);
      if (!prospect) {
        sendJson(res, 404, { error: "Prospect not found" });
        return;
      }
      sendJson(res, 200, {
        id,
        starred: entry?.starred ?? false,
        tier: entry?.tier ?? 0,
        favoritedAt: entry?.favoritedAt ?? null,
        prospect: {
          ...prospect,
          starred: entry?.starred ?? false,
          tier: entry?.tier ?? 0,
          favoritedAt: entry?.favoritedAt ?? null
        }
      });
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : "Invalid request" });
    }
    return;
  }

  if (req.method === "POST" && pathname === "/api/prospects/add") {
    try {
      const input = validateManualProspectInput(JSON.parse(await readBody(req)));
      const result = await addManualProspect(input, findProspectById);
      sendJson(res, 201, result);
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : "Invalid request" });
    }
    return;
  }

  if (req.method === "GET" && pathname === "/api/data") {
    sendJson(res, 200, await gatherConsoleData());
    return;
  }

  if (req.method === "GET" && pathname.startsWith("/api/sites/")) {
    const slug = decodeURIComponent(pathname.slice("/api/sites/".length));
    const detail = await getSiteDetail(slug);
    if (!detail) {
      sendJson(res, 404, { error: "Site not found" });
      return;
    }
    sendJson(res, 200, detail);
    return;
  }

  if (req.method === "GET" && pathname === "/api/tasks") {
    sendJson(res, 200, { tasks: await listTasks() });
    return;
  }

  if (req.method === "GET" && pathname === "/api/jobs") {
    sendJson(res, 200, { jobs: await listJobs() });
    return;
  }

  if (req.method === "GET" && pathname.startsWith("/api/jobs/")) {
    const jobId = decodeURIComponent(pathname.slice("/api/jobs/".length));
    const job = await getJob(jobId);
    if (!job) {
      sendJson(res, 404, { error: "Job not found" });
      return;
    }
    sendJson(res, 200, { job, logTail: await getJobLogTail(jobId) });
    return;
  }

  if (req.method === "POST" && pathname === "/api/jobs/prospect-search") {
    try {
      const input = validateProspectSearchInput(JSON.parse(await readBody(req)));
      const job = await createJob("prospect_search", input, `Prospect search — ${input.lane}`);
      sendJson(res, 201, { job });
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : "Invalid request" });
    }
    return;
  }

  if (req.method === "POST" && pathname === "/api/jobs/shelf-restock") {
    try {
      const input = validateShelfRestockCommission(JSON.parse(await readBody(req)));
      const job = await createJob("shelf_restock", input, shelfRestockJobTitle(input));
      sendJson(res, 201, { job });
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : "Invalid request" });
    }
    return;
  }

  if (req.method === "POST" && pathname === "/api/jobs/shelf-capture") {
    try {
      const input = validateShelfCaptureInput(JSON.parse(await readBody(req)));
      const title = input.urls?.length
        ? `Donor capture — ${input.urls[0]}`
        : `Shelf restock — ${input.request.split("\n")[0].slice(0, 60)}`;
      const job = await createJob("shelf_capture", input, title);
      sendJson(res, 201, { job });
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : "Invalid request" });
    }
    return;
  }

  if (req.method === "POST" && pathname === "/api/jobs/clone-pair") {
    try {
      const input = validateClonePairInput(JSON.parse(await readBody(req)));
      const job = await createJob(
        "clone_pair",
        input,
        `Clone — ${input.clientName} × ${input.donorShelfSlug}`
      );
      sendJson(res, 201, { job });
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : "Invalid request" });
    }
    return;
  }

  if (req.method === "POST" && pathname === "/api/tasks") {
    try {
      const body = JSON.parse(await readBody(req)) as NewTaskInput;
      const taskType = body.taskType ?? "new_site";
      if (taskType === "restock_shelf") {
        if (!body.restockRequest?.trim() && !body.restockCommission?.targets?.length) {
          sendJson(res, 400, { error: "restockRequest or restockCommission is required for shelf restocking" });
          return;
        }
      } else if (taskType === "stock_donor") {
        if (!body.sector?.trim() && !body.donorUrl?.trim()) {
          sendJson(res, 400, { error: "sector or donorUrl is required for shelf stocking" });
          return;
        }
        if (!body.clientName?.trim()) {
          body.clientName = body.sector?.trim() || body.donorUrl?.trim() || "donor";
        }
      } else if (!body.clientName?.trim()) {
        sendJson(res, 400, { error: "clientName is required" });
        return;
      }
      if (taskType === "new_site" && !body.clientWebsite?.trim()) {
        sendJson(res, 400, { error: "clientWebsite is required for new clone jobs" });
        return;
      }
      const result = await createTask(body);
      sendJson(res, 201, result);
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : "Invalid request" });
    }
    return;
  }

  if (req.method === "GET" && pathname.startsWith("/assets/")) {
    const assetPath = resolveAssetPath(pathname);
    if (!assetPath) {
      sendJson(res, 404, { error: "Asset not found" });
      return;
    }
    const data = await readFile(assetPath);
    const ext = path.extname(assetPath);
    res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
    return;
  }

  if (req.method === "GET" && (pathname === "/" || pathname === "/index.html")) {
    await serveStatic(res, "index.html");
    return;
  }

  if (req.method === "GET" && pathname.endsWith(".css")) {
    await serveStatic(res, pathname.slice(1));
    return;
  }

  if (req.method === "GET" && pathname.endsWith(".js")) {
    await serveStatic(res, pathname.slice(1));
    return;
  }

  sendJson(res, 404, { error: "Not found" });
}

export function startConsoleServer(port = defaultPort) {
  const server = createServer((req, res) => {
    handleRequest(req, res).catch((error) => {
      console.error(error);
      sendJson(res, 500, { error: "Internal server error" });
    });
  });

  server.listen(port, () => {
    console.log(`Blueprint Factory Operator Console`);
    console.log(`  Local:   http://localhost:${port}`);
    console.log(`  Inbox:   factory/inbox/  (tasks for Cursor)`);
    console.log(`  Refresh factory/STATUS.md: pnpm blueprint:status`);
  });

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startConsoleServer();
}
