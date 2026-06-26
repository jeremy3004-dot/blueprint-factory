import { chromium } from "@playwright/test";
import path from "node:path";

export async function captureScreenshots(url: string, outputDir: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outputDir, "desktop.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outputDir, "mobile.png"), fullPage: true });
  await browser.close();
}

export async function captureMotion(url: string, outputDir: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    recordVideo: { dir: outputDir, size: { width: 1440, height: 1100 } }
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.mouse.wheel(0, 1800);
  await page.waitForTimeout(2000);
  await context.close();
  await browser.close();
}
