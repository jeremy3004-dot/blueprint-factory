import { chromium } from "@playwright/test";
import path from "node:path";
import { CAPTURE_VIEWPORTS, autoScroll, dismissCookieConsent, installEvalShim, resilientGoto, scriptedScrollThrough } from "./browser-utils";

// Preview screenshots for a build we control. We still auto-scroll first (lazy images,
// scroll reveals) and use resilient navigation so the shots match what a visitor sees.
// Desktop = 1440 (canonical), mobile = 390 (canonical), plus a 768 tablet pass.
export async function captureScreenshots(url: string, outputDir: string) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    await installEvalShim(page);

    await resilientGoto(page, url);
    await dismissCookieConsent(page);
    await autoScroll(page);
    await page.screenshot({ path: path.join(outputDir, "desktop.png"), fullPage: true });

    await page.setViewportSize({ width: 768, height: 1024 });
    await resilientGoto(page, url);
    await autoScroll(page);
    await page.screenshot({ path: path.join(outputDir, "tablet.png"), fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await resilientGoto(page, url);
    await autoScroll(page);
    await page.screenshot({ path: path.join(outputDir, "mobile.png"), fullPage: true });
  } finally {
    await browser.close();
  }
}

// Motion evidence for a build we control: a real scripted scroll-through (default) plus
// a prefers-reduced-motion variant so we can prove motion degrades gracefully.
export async function captureMotion(url: string, outputDir: string) {
  await recordScrollThrough(url, outputDir, "motion.webm", false);
  await recordScrollThrough(url, outputDir, "motion-reduced.webm", true);
}

async function recordScrollThrough(url: string, outputDir: string, fileName: string, reducedMotion: boolean) {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1100 },
      reducedMotion: reducedMotion ? "reduce" : "no-preference",
      recordVideo: { dir: outputDir, size: { width: 1440, height: 1100 } }
    });
    const page = await context.newPage();
    await installEvalShim(page);
    await resilientGoto(page, url);
    await dismissCookieConsent(page);
    await scriptedScrollThrough(page);
    const video = page.video();
    await context.close();
    // Playwright names videos with a random hash; rename to a stable, meaningful name.
    if (video) {
      const rawPath = await video.path();
      const { rename } = await import("node:fs/promises");
      await rename(rawPath, path.join(outputDir, fileName)).catch(() => {});
    }
  } finally {
    await browser.close();
  }
}

export { CAPTURE_VIEWPORTS };
