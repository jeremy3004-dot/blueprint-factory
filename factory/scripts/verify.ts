import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { captureMotion, captureScreenshots } from "./capture";
import { runChecks, summarizeChecks, type CheckResult } from "./checks";
import { runCompare, type CompareResult } from "./compare";
import { checkProtectedPreview, protectedPreviewMessage } from "./protected-preview";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export type VerifyResult = {
  slug: string;
  checks: CheckResult[];
  compare: CompareResult | null;
  screenshotsCaptured: boolean;
  motionCaptured: boolean;
  reportPath: string;
  plainLanguage: string;
};

/** Compose the plain-language, non-technical summary (3-6 sentences). */
export function plainLanguageSummary(
  slug: string,
  checks: CheckResult[],
  compare: CompareResult | null
): string {
  const { allPassed, failed } = summarizeChecks(checks);
  const sentences: string[] = [];

  if (allPassed) {
    sentences.push(`Every automated check passed for ${slug}: it compiles, builds, has no console errors, no broken internal links, and no critical accessibility problems.`);
  } else {
    sentences.push(`Some checks need attention for ${slug}: ${failed.join(", ")}. See the checklist above for details.`);
  }

  if (compare && compare.donorFound && compare.overallDesktop !== null) {
    if (compare.stage === "translation") {
      sentences.push(`The translation-stage structure score is ${compare.headlineScore ?? "n/a"}%; raw pixel match is ${compare.overallDesktop}% on desktop${compare.overallMobile !== null ? ` and ${compare.overallMobile}% on mobile` : ""}, which is informational after brand translation.`);
    } else {
      sentences.push(`The clone-stage pixel score is ${compare.headlineScore ?? compare.overallDesktop}% on desktop${compare.overallMobile !== null ? ` and ${compare.overallMobile}% on mobile` : ""}.`);
    }
    if (compare.worstSectionLabel) {
      sentences.push(`The weakest area is "${compare.worstSectionLabel}" at ${compare.worstSectionMatch}% — fix that first.`);
    }
    if (compare.structure) {
      sentences.push(`Structurally the build has ${compare.structure.buildSectionCount} sections vs the donor's ${compare.structure.donorSectionCount}, which is what should stay close even after the brand translation drops the color/imagery match.`);
    }
  } else {
    sentences.push(`No donor screenshots are on file for ${slug} yet, so there is no visual match score — run \`blueprint capture ${slug} <donor-url>\` first to enable the compare.`);
  }

  sentences.push("Nothing has been deployed to production. The next human step is the Beauty Pass: watch the motion capture and compare against the donor before approving.");
  return sentences.join(" ");
}

function renderReport(slug: string, checks: CheckResult[], compare: CompareResult | null, plain: string, at: string): string {
  const lines: string[] = [];
  lines.push(`# Verify Report: ${slug}`);
  lines.push("");
  lines.push(`Generated: ${at}`);
  lines.push("");
  lines.push("## Checks");
  lines.push("");
  lines.push("| Check | Result | Detail |");
  lines.push("| ----- | ------ | ------ |");
  for (const c of checks) {
    const result = c.skipped ? "skipped" : c.pass ? "pass" : "FAIL";
    lines.push(`| ${c.name} | ${result} | ${c.detail.replace(/\|/g, "\\|")} |`);
  }
  lines.push("");
  if (compare) {
    lines.push("## Visual Compare");
    lines.push("");
    lines.push(`- Stage: ${compare.stage}`);
    lines.push(`- Headline score: ${compare.headlineScore ?? "n/a"}%`);
    lines.push(`- Desktop match: ${compare.overallDesktop ?? "n/a"}%`);
    lines.push(`- Mobile match: ${compare.overallMobile ?? "n/a"}%`);
    if (compare.worstSectionLabel) lines.push(`- Worst section: ${compare.worstSectionLabel} (${compare.worstSectionMatch}%)`);
    lines.push(`- Full report: \`qa/compare/report.md\``);
    lines.push("");
  }
  lines.push("## Plain-language summary");
  lines.push("");
  lines.push(plain);
  lines.push("");
  return lines.join("\n");
}

export async function runVerify(
  slug: string,
  url: string,
  options: { comparedAt?: string } = {}
): Promise<VerifyResult> {
  const at = options.comparedAt ?? new Date().toISOString();
  const siteDir = path.join(rootDir, "sites", slug);
  const reportPath = path.join(siteDir, "qa", "verify-report.md");

  const protectedCheck = await checkProtectedPreview(url);
  if (protectedCheck.protected) {
    const checks = [{ name: "preview-protection", pass: false, detail: protectedPreviewMessage() }];
    return {
      slug,
      checks,
      compare: null,
      screenshotsCaptured: false,
      motionCaptured: false,
      reportPath,
      plainLanguage: `${protectedPreviewMessage()}. I did not overwrite the previous verify report because the hosted page is not the site.`
    };
  }

  // 1. typecheck -> build -> console -> links -> a11y
  const checks = await runChecks(slug, url);

  // 2. screenshots
  const screenshotsDir = path.join(siteDir, "screenshots");
  await mkdir(screenshotsDir, { recursive: true });
  await captureScreenshots(url, screenshotsDir);

  // 3. motion (scripted scroll-through + reduced-motion)
  const motionDir = path.join(siteDir, "qa", "motion");
  await mkdir(motionDir, { recursive: true });
  await captureMotion(url, motionDir);

  // 4. compare vs donor
  let compare: CompareResult | null = null;
  try {
    compare = await runCompare(slug, url, { comparedAt: at });
  } catch (error) {
    compare = null;
    checks.push({ name: "compare", pass: false, detail: error instanceof Error ? error.message : String(error) });
  }

  const plain = plainLanguageSummary(slug, checks, compare);
  await writeFile(reportPath, renderReport(slug, checks, compare, plain, at), "utf8");

  return {
    slug,
    checks,
    compare,
    screenshotsCaptured: true,
    motionCaptured: true,
    reportPath,
    plainLanguage: plain
  };
}
