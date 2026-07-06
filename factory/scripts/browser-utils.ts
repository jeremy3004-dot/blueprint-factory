import type { Page } from "@playwright/test";

// Canonical capture viewports. 1440 is desktop-canonical, 390 is mobile-canonical
// (these two keep the historical gate names). 1920 and 768 add large-desktop and
// tablet coverage per the master plan.
export type Viewport = { name: string; width: number; height: number; canonical?: "desktop" | "mobile" };

export const CAPTURE_VIEWPORTS: Viewport[] = [
  { name: "1920", width: 1920, height: 1080 },
  { name: "1440", width: 1440, height: 1100, canonical: "desktop" },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844, canonical: "mobile" }
];

/**
 * Install a global `__name` shim on the page. tsx/esbuild wraps functions with a
 * `__name(fn, "…")` helper for name preservation; that helper is module-local and does
 * NOT travel into `page.evaluate` (which serializes only the function body), so any
 * evaluate throws `ReferenceError: __name is not defined`. Defining it on the browser's
 * globalThis makes the serialized calls resolve to an identity function. Passed as a raw
 * string so this shim itself is never esbuild-transformed. Must run before any evaluate;
 * addInitScript re-runs on every navigation in the context.
 */
export async function installEvalShim(page: Page): Promise<void> {
  await page.addInitScript({ content: "globalThis.__name = globalThis.__name || function (fn) { return fn; };" });
}

/**
 * Navigate resiliently. Real marketing sites keep analytics/long-poll connections
 * open forever, so `networkidle` alone hangs or times out. We wait for `load`, fall
 * back to `domcontentloaded`, and always add a short settle delay so first-paint JS
 * and fonts land. Never throws on a slow network — worst case we screenshot what we have.
 */
export async function resilientGoto(page: Page, url: string, settleMs = 2500): Promise<void> {
  try {
    await page.goto(url, { waitUntil: "load", timeout: 45000 });
  } catch {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    } catch {
      // Last resort: whatever loaded is what we capture. Do not abort the run.
    }
  }
  await page.waitForTimeout(settleMs);
}

// Common cookie/consent accept controls, in rough order of prevalence.
const CONSENT_SELECTORS = [
  "#onetrust-accept-btn-handler",
  "#truste-consent-button",
  "button[aria-label*='accept' i]",
  "button[aria-label*='agree' i]",
  "[data-testid*='accept' i]",
  ".cookie-accept",
  ".js-accept-cookies",
  "#cookie-accept"
];

const CONSENT_TEXTS = [
  "Accept all",
  "Accept All Cookies",
  "Accept all cookies",
  "Allow all",
  "Accept cookies",
  "Accept",
  "I agree",
  "Agree",
  "Got it",
  "I understand",
  "Continue"
];

/**
 * Best-effort cookie-consent dismissal. Most donors overlay a consent banner over
 * the hero; if we don't dismiss it the whole first screen is wrong. Returns whether
 * a control was clicked. Never throws — on failure the caller screenshots anyway and
 * records that the banner was present.
 */
export async function dismissCookieConsent(page: Page): Promise<boolean> {
  for (const selector of CONSENT_SELECTORS) {
    try {
      const element = page.locator(selector).first();
      if (await element.isVisible({ timeout: 500 })) {
        await element.click({ timeout: 1500 });
        await page.waitForTimeout(600);
        return true;
      }
    } catch {
      // try the next selector
    }
  }

  for (const text of CONSENT_TEXTS) {
    try {
      const button = page.getByRole("button", { name: text, exact: false }).first();
      if (await button.isVisible({ timeout: 400 })) {
        await button.click({ timeout: 1500 });
        await page.waitForTimeout(600);
        return true;
      }
    } catch {
      // try the next text
    }
  }

  return false;
}

/**
 * Stepwise scroll to the bottom and back to the top, pausing so lazy-loaded images,
 * background media, and scroll-triggered content actually render before any full-page
 * screenshot. Without this, donor captures fill with empty lazy-load boxes.
 */
export async function autoScroll(page: Page, stepMs = 250): Promise<void> {
  await page.evaluate(async (pauseMs) => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const step = Math.max(320, Math.floor(window.innerHeight * 0.85));
    let last = -1;
    // Scroll down, re-measuring height each step so lazily-growing pages are fully covered.
    for (let guard = 0; guard < 200; guard += 1) {
      const y = window.scrollY;
      if (y === last) break;
      last = y;
      window.scrollBy(0, step);
      await wait(pauseMs);
      const maxY = document.body.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxY) {
        // one more settle at the very bottom for late lazy content
        await wait(pauseMs);
        break;
      }
    }
    window.scrollTo(0, 0);
    await wait(pauseMs);
  }, stepMs);
  // Give the browser a beat to decode any images that just entered the viewport.
  await page.waitForTimeout(600);
}

/**
 * A real scripted scroll-through for motion capture: slow top-to-bottom travel over
 * ~totalMs with pauses, so scroll-triggered animations actually fire on video. This
 * replaces the old "one wheel event + 2 seconds" that missed almost all motion.
 */
export async function scriptedScrollThrough(page: Page, totalMs = 22000): Promise<void> {
  await page.evaluate(async (durationMs) => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const maxY = Math.max(0, document.body.scrollHeight - window.innerHeight);
    const steps = 28;
    const stepPause = Math.max(120, Math.floor(durationMs / (steps + 8)));
    await wait(stepPause * 2); // let the hero breathe first
    for (let i = 1; i <= steps; i += 1) {
      window.scrollTo({ top: Math.round((maxY * i) / steps), behavior: "smooth" });
      await wait(stepPause);
    }
    await wait(stepPause * 2); // hold at the bottom
    window.scrollTo({ top: 0, behavior: "smooth" });
    await wait(stepPause * 2);
  }, totalMs);
}
