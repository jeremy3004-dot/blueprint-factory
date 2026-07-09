import { readFile } from "node:fs/promises";
import path from "node:path";

function checkAuth(req) {
  const password = process.env.CONSOLE_PASSWORD;
  if (!password) return true;

  const header = req.headers.authorization || req.headers.get?.("authorization") || "";
  const expected = "Basic " + Buffer.from(`owner:${password}`).toString("base64");
  return header === expected;
}

function unauthorized(res) {
  res.setHeader("WWW-Authenticate", 'Basic realm="Blueprint Factory Console"');
  res.status(401).end("Authentication required");
}

export default async function handler(req, res) {
  if (!checkAuth(req)) return unauthorized(res);

  try {
    const snapshotPath = path.join(process.cwd(), "snapshot.json");
    const raw = await readFile(snapshotPath, "utf8");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).end(raw);
  } catch {
    res.status(503).json({
      error: "No snapshot.json — run pnpm blueprint:console:deploy from the factory root first."
    });
  }
}
