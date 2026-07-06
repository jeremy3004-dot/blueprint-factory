import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { autoScroll, dismissCookieConsent, installEvalShim, resilientGoto } from "./browser-utils";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export type CheckResult = { name: string; pass: boolean; detail: string; skipped?: boolean };

// ---------------------------------------------------------------------------
// Pure helpers (unit-tested)
// ---------------------------------------------------------------------------

export function summarizeChecks(results: CheckResult[]): { allPassed: boolean; failed: string[]; ran: number } {
  const active = results.filter((r) => !r.skipped);
  const failed = active.filter((r) => !r.pass).map((r) => r.name);
  return { allPassed: failed.length === 0, failed, ran: active.length };
}

/** Same-origin, http(s), not a fragment/asset — a real internal page link worth checking. */
export function isInternalLink(href: string, baseUrl: string): boolean {
  let resolved: URL;
  let base: URL;
  try {
    resolved = new URL(href, baseUrl);
    base = new URL(baseUrl);
  } catch {
    return false;
  }
  if (resolved.origin !== base.origin) return false;
  if (!/^https?:$/.test(resolved.protocol)) return false;
  if (/\.(pdf|jpe?g|png|gif|webp|svg|avif|mp4|webm|zip|css|js|ico|woff2?)$/i.test(resolved.pathname)) return false;
  return true;
}

/** A link is healthy on any 2xx/3xx; 4xx/5xx are broken. */
export function classifyLinkStatus(status: number): "ok" | "broken" {
  return status >= 200 && status < 400 ? "ok" : "broken";
}

// ---------------------------------------------------------------------------
// Command checks (typecheck, build)
// ---------------------------------------------------------------------------

function runCapture(command: string, args: string[]): Promise<{ code: number; output: string }> {
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd: rootDir });
    let output = "";
    child.stdout?.on("data", (d) => (output += d.toString()));
    child.stderr?.on("data", (d) => (output += d.toString()));
    child.on("error", (err) => resolve({ code: 1, output: String(err) }));
    child.on("exit", (code) => resolve({ code: code ?? 1, output }));
  });
}

function lastLines(text: string, n: number): string {
  return text.trim().split("\n").slice(-n).join(" | ").slice(0, 400);
}

export async function runTypecheck(slug: string): Promise<CheckResult> {
  const { code, output } = await runCapture("pnpm", ["--filter", slug, "exec", "tsc", "--noEmit"]);
  return { name: "typecheck", pass: code === 0, detail: code === 0 ? "no type errors" : lastLines(output, 6) };
}

export async function runBuild(slug: string): Promise<CheckResult> {
  const { code, output } = await runCapture("pnpm", ["--filter", slug, "build"]);
  return { name: "build", pass: code === 0, detail: code === 0 ? "build succeeded" : lastLines(output, 8) };
}

// ---------------------------------------------------------------------------
// Browser checks (console errors, internal links, axe a11y)
// ---------------------------------------------------------------------------

export async function scanConsoleErrors(url: string): Promise<CheckResult> {
  const browser = await chromium.launch();
  const errors: string[] = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    await installEvalShim(page);
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text().slice(0, 200));
    });
    page.on("pageerror", (err) => errors.push(err.message.slice(0, 200)));
    await resilientGoto(page, url);
    await dismissCookieConsent(page);
    await autoScroll(page);
  } finally {
    await browser.close();
  }
  return {
    name: "console-errors",
    pass: errors.length === 0,
    detail: errors.length === 0 ? "no console errors" : `${errors.length} error(s): ${errors.slice(0, 3).join(" / ")}`
  };
}

export async function checkInternalLinks(url: string, limit = 40): Promise<CheckResult> {
  const browser = await chromium.launch();
  const broken: string[] = [];
  let checked = 0;
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const page = await context.newPage();
    await installEvalShim(page);
    await resilientGoto(page, url);
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).map((a) => a.getAttribute("href") || "")
    );
    const internal = [...new Set(hrefs.filter((h) => isInternalLink(h, url)).map((h) => new URL(h, url).href))].slice(0, limit);
    for (const link of internal) {
      try {
        const response = await context.request.get(link, { timeout: 15000 });
        checked += 1;
        if (classifyLinkStatus(response.status()) === "broken") broken.push(`${response.status()} ${link}`);
      } catch {
        checked += 1;
        broken.push(`unreachable ${link}`);
      }
    }
    await context.close();
  } finally {
    await browser.close();
  }
  return {
    name: "internal-links",
    pass: broken.length === 0,
    detail: broken.length === 0 ? `${checked} internal link(s) ok` : `${broken.length} broken: ${broken.slice(0, 3).join(" / ")}`
  };
}

export async function axeQuickPass(url: string): Promise<CheckResult> {
  const browser = await chromium.launch();
  try {
    // @axe-core/playwright requires a page from an explicit context (not browser.newPage()).
    const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const page = await context.newPage();
    await installEvalShim(page);
    await resilientGoto(page, url);
    await dismissCookieConsent(page);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const serious = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
    const summary = serious
      .slice(0, 4)
      .map((v) => `${v.id}(${v.nodes.length})`)
      .join(", ");
    return {
      name: "a11y-axe",
      pass: serious.length === 0,
      detail: serious.length === 0 ? "no critical/serious axe violations" : `${serious.length} issue type(s): ${summary}`
    };
  } finally {
    await browser.close();
  }
}

/** The full check chain. Typecheck + build always run; browser checks run only with a preview URL. */
export async function runChecks(slug: string, url?: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  results.push(await runTypecheck(slug));
  results.push(await runBuild(slug));
  if (url) {
    results.push(await scanConsoleErrors(url));
    results.push(await checkInternalLinks(url));
    results.push(await axeQuickPass(url));
  } else {
    results.push({ name: "console-errors", pass: true, detail: "skipped (no preview URL)", skipped: true });
    results.push({ name: "internal-links", pass: true, detail: "skipped (no preview URL)", skipped: true });
    results.push({ name: "a11y-axe", pass: true, detail: "skipped (no preview URL)", skipped: true });
  }
  return results;
}
