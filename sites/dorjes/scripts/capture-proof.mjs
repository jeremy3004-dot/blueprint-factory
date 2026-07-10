import { chromium } from "@playwright/test";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:4337";
const root = process.cwd();
const routes = [
  { route: "/", slug: "home" },
  { route: "/accommodation-in-pokhara", slug: "accommodation-in-pokhara" },
  { route: "/tastes", slug: "tastes" }
];
const viewports = [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "mobile", width: 390, height: 844 }
];

const browser = await chromium.launch();
for (const pageRoute of routes) {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const response = await page.goto(`${baseUrl}${pageRoute.route}`, { waitUntil: "networkidle" });
    if (!response?.ok()) throw new Error(`${pageRoute.route} returned ${response?.status()}`);
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const step = Math.max(320, Math.floor(window.innerHeight * 0.72));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 90));
      }
      window.scrollTo(0, 0);
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    });
    await page.addStyleTag({ content: ".skip-link{display:none!important}.site-header{position:absolute!important;width:100%!important}" });
    await page.waitForTimeout(350);
    const directory = path.join(root, "screenshots/pages", pageRoute.slug);
    await mkdir(directory, { recursive: true });
    const output = path.join(directory, `${viewport.name}.png`);
    await page.screenshot({ path: output, fullPage: true });
    if (pageRoute.slug === "home") {
      await copyFile(output, path.join(root, `screenshots/${viewport.name}.png`));
    }
    console.log(`${pageRoute.route} ${viewport.name} -> ${output}`);
    await context.close();
  }
}
await browser.close();
