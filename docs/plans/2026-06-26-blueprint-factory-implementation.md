# Blueprint Factory Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the first usable Blueprint Factory scaffold: repo instructions, templates, a thin command tool, a reusable Next.js site template, and one example site that proves the workflow.

**Architecture:** The repo is a pnpm workspace with a root command tool and independent site apps under `sites/<slug>/app`. Factory guidance, templates, rubrics, and reference snippets live under `factory/`; active sites copy from those assets rather than importing shared runtime code.

**Tech Stack:** Node.js, pnpm workspaces, TypeScript for the command tool, Next.js, Tailwind CSS, GSAP, Lenis, Playwright for screenshots and motion capture.

---

### Task 1: Add Root Factory Metadata

**Files:**
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/AGENTS.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/README.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/package.json`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/pnpm-workspace.yaml`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/.gitignore`

**Step 1: Write repo instructions**

Create `AGENTS.md` from the approved spec. It must include:

```markdown
# Blueprint Factory: Agent Operating Instructions

Blueprint Factory builds high-craft animated websites. Optimize for standout visual quality first.

Every site must have:
- `brief.md`
- `art-direction.md` with one named signature moment
- `asset-log.md`
- `deploy.md`
- desktop and mobile screenshots
- motion capture when animation or scroll experience matters
- visual review

Sites under `sites/<slug>/app` are self-contained. Copy reusable patterns from `factory/reference-library/`; do not import shared runtime code from the factory.

Ask before production deploys, paid service changes, external messages, destructive cleanup, major art-direction changes, or repo graduation.
```

**Step 2: Write owner README**

Create `README.md` with a short owner-facing overview:

```markdown
# Blueprint Factory

Blueprint Factory is a repeatable workshop for building beautiful, animated websites.

New sites start under `sites/<slug>/`. Each site has its own Next.js app and its own brief, art direction, asset log, screenshots, and QA trail.

The factory favors standout visual quality over generic speed. A site is not ready unless it has a signature moment and passes the Beauty Pass.
```

**Step 3: Add root package manifest**

Create `package.json`:

```json
{
  "name": "blueprint-factory",
  "private": true,
  "type": "module",
  "scripts": {
    "blueprint": "tsx factory/scripts/blueprint.ts",
    "blueprint:new": "tsx factory/scripts/blueprint.ts new",
    "blueprint:art": "tsx factory/scripts/blueprint.ts art",
    "blueprint:check": "tsx factory/scripts/blueprint.ts check",
    "blueprint:screenshots": "tsx factory/scripts/blueprint.ts screenshots",
    "blueprint:motion": "tsx factory/scripts/blueprint.ts motion",
    "blueprint:beauty": "tsx factory/scripts/blueprint.ts beauty",
    "blueprint:deploy": "tsx factory/scripts/blueprint.ts deploy",
    "test": "tsx --test factory/scripts/*.test.ts"
  },
  "devDependencies": {
    "@playwright/test": "latest",
    "tsx": "latest",
    "typescript": "latest"
  }
}
```

**Step 4: Add workspace config**

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "sites/*/app"
```

**Step 5: Add gitignore**

Create `.gitignore`:

```gitignore
node_modules/
.next/
out/
dist/
.vercel/
.wrangler/
.DS_Store
playwright-report/
test-results/
```

**Step 6: Verify**

Run:

```bash
pnpm install
pnpm test
```

Expected:
- install succeeds
- test command may report no tests until Task 3 adds them

**Step 7: Commit**

```bash
git add AGENTS.md README.md package.json pnpm-workspace.yaml .gitignore
git commit -m "chore: bootstrap blueprint factory repo"
```

---

### Task 2: Add Factory Templates And Rubrics

**Files:**
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/brief.template.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/art-direction.template.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/asset-log.template.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/deploy.template.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/run-log.template.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/visual-review.template.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/qa/beauty-pass-rubric.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/playbooks/site-lifecycle.md`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/loops/beauty-pass-loop.md`

**Step 1: Create brief template**

`brief.template.md`:

```markdown
# Brief: {{siteSlug}}

Status: draft

## What This Site Is

## Audience

## Inputs Provided

## Source Notes

## Required Pages Or Sections

## Deploy Expectation

## Ready Criteria
```

**Step 2: Create art direction template**

Use Claude's `art-direction.template.md` as source material, keeping these required headings:

```markdown
# Art Direction: {{siteSlug}}

Date:
Status: draft | approved
Owner sign-off: pending | yes

## 1. What this site is
## 2. The visual world
## 3. The signature moment (required)
## 4. Motion language
## 5. Typography
## 6. Color world
## 7. Layout system
## 8. Reference comparanda
## 9. Anti-goals
## 10. Deploy and backend expectation
## 11. What must be true before this site is called ready
```

**Step 3: Create support templates**

Create:

`asset-log.template.md`:

```markdown
# Asset Log: {{siteSlug}}

## Images
## Video
## Fonts
## Logos
## Generated Assets
## References
## Unknown Or Needs Review
```

`deploy.template.md`:

```markdown
# Deploy: {{siteSlug}}

Profile: Vercel | Cloudflare static | Cloudflare Worker
Production URL:
Preview URL:
Backend: none | Supabase

## Notes
```

`run-log.template.md`:

```markdown
# Run Log: {{siteSlug}}

## Entries
```

`visual-review.template.md`:

```markdown
# Visual Review: {{siteSlug}}

## Latest Verdict

Status: NOT_READY

## Signature Moment Check

## Reference Comparison

## Scores

## Highest Impact Next Fix
```

**Step 4: Create Beauty Pass rubric**

Use Claude's `beauty-pass-rubric.md` as source material, preserving:

- required inputs
- signature-moment pass/fail check
- reference comparison
- 1-5 score dimensions
- fail conditions
- stop conditions
- what to record

**Step 5: Create playbook and loop docs**

`site-lifecycle.md` should describe:

```markdown
# Site Lifecycle

1. Intake
2. Art Direction
3. Build
4. Beauty Pass
5. QA
6. Deploy
7. Graduation when needed
```

`beauty-pass-loop.md` should describe one bounded pass:

```markdown
# Beauty Pass Loop

Capture evidence, check the signature moment, compare references, pick one issue, make one focused change, recapture, then stop if passed, stalled, or human review is needed.
```

**Step 6: Verify**

Run:

```bash
test -f factory/templates/art-direction.template.md
test -f factory/qa/beauty-pass-rubric.md
```

Expected: no output and exit code 0.

**Step 7: Commit**

```bash
git add factory
git commit -m "docs: add factory templates and rubrics"
```

---

### Task 3: Build The Thin Blueprint CLI Skeleton

**Files:**
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/scripts/blueprint.ts`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/scripts/blueprint.test.ts`

**Step 1: Write failing tests**

Create `blueprint.test.ts`:

```ts
import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { slugify, requiredSiteFiles } from "./blueprint";

describe("slugify", () => {
  it("normalizes names into site slugs", () => {
    assert.equal(slugify("Big Mart Nepal!"), "big-mart-nepal");
  });
});

describe("requiredSiteFiles", () => {
  it("lists factory gate files", () => {
    assert.deepEqual(requiredSiteFiles("demo"), [
      "sites/demo/brief.md",
      "sites/demo/art-direction.md",
      "sites/demo/asset-log.md",
      "sites/demo/deploy.md",
      "sites/demo/qa/run-log.md",
      "sites/demo/qa/visual-review.md"
    ]);
  });
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
pnpm test
```

Expected: FAIL because `blueprint.ts` does not exist or exports are missing.

**Step 3: Implement CLI skeleton**

Create `blueprint.ts` with exported helpers and a command dispatcher:

```ts
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function requiredSiteFiles(siteSlug: string): string[] {
  return [
    `sites/${siteSlug}/brief.md`,
    `sites/${siteSlug}/art-direction.md`,
    `sites/${siteSlug}/asset-log.md`,
    `sites/${siteSlug}/deploy.md`,
    `sites/${siteSlug}/qa/run-log.md`,
    `sites/${siteSlug}/qa/visual-review.md`
  ];
}

async function copyTemplate(templateName: string, destination: string, siteSlug: string) {
  const source = path.join(rootDir, "factory/templates", templateName);
  const raw = await readFile(source, "utf8");
  await writeFile(path.join(rootDir, destination), raw.replaceAll("{{siteSlug}}", siteSlug));
}

async function main() {
  const [command, rawSlug] = process.argv.slice(2);
  if (!command) {
    console.log("Usage: blueprint <new|art|check|screenshots|motion|beauty|deploy> <slug>");
    return;
  }

  const siteSlug = rawSlug ? slugify(rawSlug) : "";
  if (!siteSlug) throw new Error("Site slug is required");

  if (command === "new") {
    await mkdir(path.join(rootDir, "sites", siteSlug, "qa", "motion"), { recursive: true });
    await mkdir(path.join(rootDir, "sites", siteSlug, "assets"), { recursive: true });
    await mkdir(path.join(rootDir, "sites", siteSlug, "references"), { recursive: true });
    await mkdir(path.join(rootDir, "sites", siteSlug, "source-notes"), { recursive: true });
    await mkdir(path.join(rootDir, "sites", siteSlug, "screenshots"), { recursive: true });
    await copyTemplate("brief.template.md", `sites/${siteSlug}/brief.md`, siteSlug);
    await copyTemplate("art-direction.template.md", `sites/${siteSlug}/art-direction.md`, siteSlug);
    await copyTemplate("asset-log.template.md", `sites/${siteSlug}/asset-log.md`, siteSlug);
    await copyTemplate("deploy.template.md", `sites/${siteSlug}/deploy.md`, siteSlug);
    await copyTemplate("run-log.template.md", `sites/${siteSlug}/qa/run-log.md`, siteSlug);
    await copyTemplate("visual-review.template.md", `sites/${siteSlug}/qa/visual-review.md`, siteSlug);
    console.log(`Created sites/${siteSlug}`);
    return;
  }

  console.log(`${command} is planned but not implemented yet for ${siteSlug}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
```

**Step 4: Run tests**

Run:

```bash
pnpm test
```

Expected: PASS.

**Step 5: Commit**

```bash
git add factory/scripts package.json
git commit -m "feat: add blueprint cli skeleton"
```

---

### Task 4: Implement Site Validation Commands

**Files:**
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/scripts/blueprint.ts`
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/scripts/blueprint.test.ts`

**Step 1: Write failing tests**

Add tests for art-direction validation:

```ts
import { hasNamedSignatureMoment } from "./blueprint";

describe("hasNamedSignatureMoment", () => {
  it("passes when the required section has concrete content", () => {
    const markdown = "## 3. The signature moment (required)\nA hero object rotates as the page scrolls.\n\n## 4. Motion language";
    assert.equal(hasNamedSignatureMoment(markdown), true);
  });

  it("fails when the required section is blank", () => {
    const markdown = "## 3. The signature moment (required)\n\n## 4. Motion language";
    assert.equal(hasNamedSignatureMoment(markdown), false);
  });
});
```

**Step 2: Run test to verify it fails**

Run:

```bash
pnpm test
```

Expected: FAIL because `hasNamedSignatureMoment` is missing.

**Step 3: Add validation helpers and commands**

Implement:

```ts
export function hasNamedSignatureMoment(markdown: string): boolean {
  const match = markdown.match(/## 3\. The signature moment \(required\)([\s\S]*?)(\n## |\n# |$)/);
  if (!match) return false;
  return match[1].trim().length > 20;
}
```

Update `main()` so:

- `blueprint art <slug>` reads `sites/<slug>/art-direction.md` and exits 1 if the signature moment is missing.
- `blueprint check <slug>` verifies all required files exist and, if `sites/<slug>/app/package.json` exists, runs that app's build command later in Task 7.

**Step 4: Run tests**

Run:

```bash
pnpm test
```

Expected: PASS.

**Step 5: Commit**

```bash
git add factory/scripts
git commit -m "feat: validate site factory gates"
```

---

### Task 5: Add Screenshot And Motion Capture Commands

**Files:**
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/scripts/blueprint.ts`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/scripts/capture.ts`

**Step 1: Add capture helper**

Create `capture.ts`:

```ts
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
```

**Step 2: Wire commands**

Update `blueprint.ts`:

- `blueprint screenshots <slug> <url>` saves to `sites/<slug>/screenshots/`.
- `blueprint motion <slug> <url>` saves to `sites/<slug>/qa/motion/`.
- If the URL is missing, print usage and exit 1.

**Step 3: Verify**

Run against a local or public URL:

```bash
pnpm blueprint:screenshots example-site https://example.com
pnpm blueprint:motion example-site https://example.com
```

Expected:
- `sites/example-site/screenshots/desktop.png`
- `sites/example-site/screenshots/mobile.png`
- at least one video file under `sites/example-site/qa/motion/`

**Step 4: Commit**

```bash
git add factory/scripts
git commit -m "feat: capture site screenshots and motion"
```

---

### Task 6: Add Beauty And Deploy Command Stubs

**Files:**
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/scripts/blueprint.ts`

**Step 1: Implement Beauty command**

For `blueprint beauty <slug>`:

- Verify `art-direction.md` exists.
- Verify screenshots exist.
- Verify at least one file exists in `qa/motion/`.
- Append a dated checklist entry to `qa/visual-review.md`.
- Print `NOT_READY` if required evidence is missing.

**Step 2: Implement Deploy command as safe-by-default**

For `blueprint deploy <slug>`:

- Read `sites/<slug>/deploy.md`.
- Print the deploy profile.
- Refuse production deploy unless the user later passes an explicit implementation-time flag such as `--confirm-production`.
- For this first plan, do not deploy.

**Step 3: Verify**

Run:

```bash
pnpm blueprint:beauty example-site
pnpm blueprint:deploy example-site
```

Expected:
- beauty reports missing evidence until captures exist
- deploy prints profile and refuses production action

**Step 4: Commit**

```bash
git add factory/scripts
git commit -m "feat: add safe beauty and deploy commands"
```

---

### Task 7: Create The Next.js Site Template

**Files:**
- Create directory: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/next-site/`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/next-site/package.json`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/next-site/next.config.ts`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/next-site/src/app/page.tsx`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/next-site/src/app/layout.tsx`
- Create: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/templates/next-site/src/app/globals.css`
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/factory/scripts/blueprint.ts`

**Step 1: Create minimal Next package**

`package.json`:

```json
{
  "name": "{{siteSlug}}",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint"
  },
  "dependencies": {
    "@gsap/react": "latest",
    "gsap": "latest",
    "lenis": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest"
  }
}
```

**Step 2: Create app shell**

Create a simple high-craft starter page with:

- one hero
- one section below the fold
- a visible blueprint-line motif that can be replaced by site-specific art direction
- Lenis/GSAP not overbuilt yet; install dependencies for the first real site

**Step 3: Update `blueprint new`**

Copy `factory/templates/next-site/` into `sites/<slug>/app` and replace `{{siteSlug}}`.

**Step 4: Verify**

Run:

```bash
pnpm blueprint:new example-site
pnpm --filter example-site build
```

Expected:
- site folder created
- Next app builds

**Step 5: Commit**

```bash
git add factory/templates/next-site factory/scripts
git commit -m "feat: add next site template"
```

---

### Task 8: Prove The Workflow With One Example Site

**Files:**
- Create via command: `/Users/dev/Documents/BLUEPRINT FACTORY/sites/example-site/`
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/sites/example-site/brief.md`
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/sites/example-site/art-direction.md`
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/sites/example-site/asset-log.md`
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/sites/example-site/deploy.md`
- Modify: `/Users/dev/Documents/BLUEPRINT FACTORY/sites/example-site/app/src/app/page.tsx`

**Step 1: Generate example site**

Run:

```bash
pnpm blueprint:new example-site
```

Expected:
- `sites/example-site/` exists
- `sites/example-site/app/` exists

**Step 2: Fill the brief**

Use a fictional internal example, not a real client:

```markdown
# Brief: example-site

Status: draft

## What This Site Is

An internal demo site proving Blueprint Factory can produce a high-craft animated landing page.
```

**Step 3: Fill art direction**

Name a concrete signature moment:

```markdown
## 3. The signature moment (required)

On load, the hero title slides through layered blueprint lines while a glowing cursor trace draws the first fold grid.
```

**Step 4: Update the page**

Implement the visible demo signature moment with CSS first. Use GSAP only if the simple implementation is not enough.

**Step 5: Verify**

Run:

```bash
pnpm blueprint:art example-site
pnpm --filter example-site build
```

Expected:
- art command passes
- build passes

**Step 6: Commit**

```bash
git add sites/example-site
git commit -m "feat: add blueprint example site"
```

---

### Task 9: Run Final Verification

**Files:**
- Modify only if verification exposes real issues.

**Step 1: Run root tests**

```bash
pnpm test
```

Expected: PASS.

**Step 2: Run example site build**

```bash
pnpm --filter example-site build
```

Expected: PASS.

**Step 3: Run factory checks**

```bash
pnpm blueprint:art example-site
pnpm blueprint:check example-site
```

Expected: PASS or a clear `NOT_READY` only for evidence that requires a running browser capture.

**Step 4: Record remaining manual gates**

If screenshots, motion, or human taste review are not completed, record that in:

```text
sites/example-site/qa/run-log.md
sites/example-site/qa/visual-review.md
```

**Step 5: Commit verification fixes**

```bash
git add .
git commit -m "chore: verify blueprint factory scaffold"
```

Skip the commit if no files changed.

---

## Handoff Notes

Keep the first implementation small. Do not add CMS, Supabase, cron automation, production deploys, or a complex agent platform. The goal is a working factory skeleton that can create and check one self-contained high-craft Next.js site.
