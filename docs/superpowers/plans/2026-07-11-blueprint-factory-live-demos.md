# Blueprint Factory Live Demos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a growing Blueprint Factory showcase whose carousel opens six independent full-page live demos.

**Architecture:** Add a self-contained Next.js app under `sites/blueprint-live-demos/app`. A typed project registry is the single source for the carousel and static index; a small client component owns scroll position and controls, while the page and project cards remain server-renderable. Demo deployments remain independent and are linked with public HTTPS URLs.

**Tech Stack:** Next.js, React, TypeScript, CSS, Node test runner through `tsx`, Vercel.

## Global Constraints

- Public name: **Blueprint Factory — Live Demos**.
- Every project must display a **Live Demo** label and open in a new browser tab.
- Initial projects: Ambika Juice, Americana Grill, San Chon, Dorje's Resort & Spa, The Juicery Cafe, and Avya Club.
- The carousel never auto-advances and must support native touch scrolling, keyboard navigation, and `prefers-reduced-motion`.
- No database, authentication, CMS, analytics, contact form, iframe embedding, client domain, or lead capture.
- Project metadata must live in one typed registry.
- Public links must use stable Blueprint-owned Vercel aliases and must not require authentication.
- Ask for the repo-required final production deployment approval immediately before publishing.

---

### Task 1: Scaffold The Showcase And Project Registry

**Files:**
- Create: `sites/blueprint-live-demos/brief.md`
- Create: `sites/blueprint-live-demos/art-direction.md`
- Create: `sites/blueprint-live-demos/asset-log.md`
- Create: `sites/blueprint-live-demos/deploy.md`
- Create: `sites/blueprint-live-demos/references/reference-first/topology.md`
- Create: `sites/blueprint-live-demos/references/reference-first/clone-plan.md`
- Create: `sites/blueprint-live-demos/app/package.json`
- Create: `sites/blueprint-live-demos/app/tsconfig.json`
- Create: `sites/blueprint-live-demos/app/next.config.ts`
- Create: `sites/blueprint-live-demos/app/next-env.d.ts`
- Create: `sites/blueprint-live-demos/app/src/data/projects.ts`
- Test: `sites/blueprint-live-demos/app/src/data/projects.test.ts`

**Interfaces:**
- Produces: `Project` with `slug`, `name`, `category`, `summary`, `href`, `image`, and `imageAlt`.
- Produces: `projects: readonly Project[]` used by every public project view.
- Produces: `validateProjectHref(href: string): boolean` for build-time and test verification.

- [ ] **Step 1: Write the failing registry test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { projects, validateProjectHref } from "./projects";

test("publishes the six approved live demos in one registry", () => {
  assert.deepEqual(projects.map(({ name }) => name), [
    "Ambika Juice",
    "Americana Grill",
    "San Chon",
    "Dorje's Resort & Spa",
    "The Juicery Cafe",
    "Avya Club",
  ]);
  assert.equal(new Set(projects.map(({ slug }) => slug)).size, 6);
});

test("accepts only public HTTPS project links", () => {
  assert.equal(validateProjectHref("https://example.vercel.app"), true);
  assert.equal(validateProjectHref("http://localhost:3000"), false);
  assert.equal(validateProjectHref("javascript:alert(1)"), false);
  assert.equal(projects.every(({ href }) => validateProjectHref(href)), true);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm --dir sites/blueprint-live-demos/app test`

Expected: FAIL because the app package and `projects` module do not exist.

- [ ] **Step 3: Add the minimal app scaffold and registry**

Use the current Factory template configuration, add scripts `dev`, `build`, `typecheck`, and `test: tsx --test src/**/*.test.ts src/**/*.test.tsx`, and add `tsx` as a dev dependency. Implement:

```ts
import type { StaticImageData } from "next/image";
import ambika from "@/assets/ambika-juice.jpg";
import americana from "@/assets/americana-grill.jpg";
import sanChon from "@/assets/san-chon.jpg";
import dorjes from "@/assets/dorjes.jpg";
import juicery from "@/assets/the-juicery-cafe.jpg";
import avya from "@/assets/avya-club.jpg";

export type Project = Readonly<{
  slug: string;
  name: string;
  category: string;
  summary: string;
  href: string;
  image: StaticImageData;
  imageAlt: string;
}>;

export function validateProjectHref(href: string): boolean {
  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
}
```

Add six records using the latest public preview URLs from each site's `deploy.md`; they will be replaced with stable aliases during Task 4. Create the required Factory markdown artifacts with this spec as the source, named signature moment **The Moving Contact Sheet**, and explicit preview-only deployment status.

- [ ] **Step 4: Add temporary source images so static imports resolve**

Create `src/assets/` and crop the top 1440×960 region from each latest homepage desktop screenshot into the six filenames imported above. Use `sips` with top-aligned crop offsets and JPEG quality 85; do not modify source screenshots.

- [ ] **Step 5: Run the registry tests and verify GREEN**

Run: `pnpm --dir sites/blueprint-live-demos/app test`

Expected: 2 tests pass, 0 fail.

- [ ] **Step 6: Commit the scaffold and registry**

```bash
git add sites/blueprint-live-demos
git commit -m "feat(showcase): add live demo registry"
```

---

### Task 2: Build The Accessible Project Rail

**Files:**
- Create: `sites/blueprint-live-demos/app/src/components/project-card.tsx`
- Create: `sites/blueprint-live-demos/app/src/components/project-carousel.tsx`
- Create: `sites/blueprint-live-demos/app/src/components/carousel-state.ts`
- Create: `sites/blueprint-live-demos/app/src/app/page.tsx`
- Create: `sites/blueprint-live-demos/app/src/app/layout.tsx`
- Test: `sites/blueprint-live-demos/app/src/components/carousel-state.test.ts`
- Test: `sites/blueprint-live-demos/app/src/app/page.test.tsx`

**Interfaces:**
- Consumes: `projects: readonly Project[]`.
- Produces: `clampIndex(index: number, count: number): number` and `nextIndex(current: number, direction: -1 | 1, count: number): number`.
- Produces: `ProjectCard({ project, compact? })` and `ProjectCarousel({ projects })`.

- [ ] **Step 1: Write failing carousel-state tests**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { clampIndex, nextIndex } from "./carousel-state";

test("clamps observed scroll positions to available projects", () => {
  assert.equal(clampIndex(-1, 6), 0);
  assert.equal(clampIndex(8, 6), 5);
});

test("moves one card without wrapping", () => {
  assert.equal(nextIndex(2, 1, 6), 3);
  assert.equal(nextIndex(0, -1, 6), 0);
  assert.equal(nextIndex(5, 1, 6), 5);
});
```

- [ ] **Step 2: Write the failing server-rendered page test**

```tsx
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

test("renders every live demo with safe external-link behavior", () => {
  const html = renderToStaticMarkup(<Home />);
  assert.match(html, /Blueprint Factory/);
  assert.equal((html.match(/View Live Demo/g) ?? []).length, 6);
  assert.equal((html.match(/target="_blank"/g) ?? []).length, 6);
  assert.equal((html.match(/rel="noreferrer"/g) ?? []).length, 6);
});
```

- [ ] **Step 3: Run both files and verify RED**

Run: `pnpm --dir sites/blueprint-live-demos/app test`

Expected: FAIL because carousel state, page, and components do not exist.

- [ ] **Step 4: Implement the minimal page and carousel**

Implement `clampIndex` and `nextIndex` as pure functions. `ProjectCarousel` uses a labelled horizontal `ul`, native scroll snapping, `scrollIntoView`, previous/next buttons, an `aria-live="polite"` position label, and left/right arrow handling. `ProjectCard` renders `next/image`, the **Live Demo** badge, metadata, and:

```tsx
<a href={project.href} target="_blank" rel="noreferrer">
  View Live Demo <span aria-hidden="true">↗</span>
</a>
```

Render the same registry again as a compact static project index below the rail. Do not add autoplay or iframe code.

- [ ] **Step 5: Run tests and verify GREEN**

Run: `pnpm --dir sites/blueprint-live-demos/app test`

Expected: 5 tests pass, 0 fail.

- [ ] **Step 6: Commit the functional showcase**

```bash
git add sites/blueprint-live-demos/app/src
git commit -m "feat(showcase): add accessible live demo carousel"
```

---

### Task 3: Apply The Contact-Sheet Art Direction

**Files:**
- Create: `sites/blueprint-live-demos/app/src/app/globals.css`
- Create: `sites/blueprint-live-demos/app/src/app/icon.svg`
- Modify: `sites/blueprint-live-demos/app/src/app/layout.tsx`
- Modify: `sites/blueprint-live-demos/app/src/app/page.tsx`
- Modify: `sites/blueprint-live-demos/app/src/components/project-card.tsx`
- Modify: `sites/blueprint-live-demos/app/src/components/project-carousel.tsx`
- Create: `sites/blueprint-live-demos/qa/visual-review.md`

**Interfaces:**
- Consumes the Task 2 markup and ARIA contract without changing link count or registry ownership.
- Produces responsive styles for `.project-rail`, `.project-card`, `.project-index`, focus states, and reduced motion.

- [ ] **Step 1: Extend the page test with visual contract assertions**

Add assertions for one `h1`, the six-project count, carousel label, static index label, and visible concept disclaimer. Run the test and verify it fails because those labels are absent.

- [ ] **Step 2: Implement the visual system**

Use an editorial charcoal-and-warm-paper palette with an electric vermilion status accent, a characterful local serif/display pairing through `next/font`, hairline rules, oversized project numbering, and shallow perspective on the active rail. Keep the site assets as the dominant color field. At desktop widths show approximately 1.25 cards; at mobile widths show one 86vw card with the next card edge visible.

Add a restrained staggered entrance and hover image lift. Under `@media (prefers-reduced-motion: reduce)`, set smooth scrolling off and transitions/animations to none. Preserve obvious `:focus-visible` outlines and 44px minimum controls.

- [ ] **Step 3: Run tests, typecheck, and build**

Run:

```bash
pnpm --dir sites/blueprint-live-demos/app test
pnpm --dir sites/blueprint-live-demos/app typecheck
pnpm --dir sites/blueprint-live-demos/app build
```

Expected: all commands exit 0 with six projects rendered.

- [ ] **Step 4: Capture desktop and mobile screenshots**

Run the app on port 3048, capture 1440×1100 and 390×844 views into `sites/blueprint-live-demos/screenshots/desktop.png` and `mobile.png`, inspect both, and record the eight-dimension Beauty Pass plus keyboard/reduced-motion findings in `qa/visual-review.md`.

- [ ] **Step 5: Commit the art direction and visual evidence**

```bash
git add sites/blueprint-live-demos
git commit -m "feat(showcase): polish live demo contact sheet"
```

---

### Task 4: Establish Public Demo Links And Publish

**Files:**
- Modify: `sites/blueprint-live-demos/app/src/data/projects.ts`
- Modify: `sites/blueprint-live-demos/app/src/data/projects.test.ts`
- Modify: `sites/blueprint-live-demos/deploy.md`
- Modify where required: each source site's `deploy.md` on its own job branch.

**Interfaces:**
- Consumes: six buildable independent Next.js apps and their current preview URLs.
- Produces: six unauthenticated stable HTTPS demo URLs plus one unauthenticated showcase URL.

- [ ] **Step 1: Verify Vercel authentication and current URLs**

Run `vercel whoami`, then unauthenticated `curl -L -o /dev/null -sS -w '%{http_code} %{url_effective}\n' <url>` for every recorded demo URL. Record any 401, 403, Vercel login page, or failed build as blocked.

- [ ] **Step 2: Publish stable Blueprint-owned aliases for ready demos**

For each ready app, deploy from its app directory to a uniquely named Blueprint demo project such as `blueprint-demo-ambika-juice`. Do not attach client domains. Confirm the resulting `*.vercel.app` URL returns 200 without cookies or authentication.

- [ ] **Step 3: Update the registry and verify links**

Replace preview URLs with the six stable aliases. Extend the registry test to require `.vercel.app` hosts and reject URLs containing Jeremy's protected preview deployment identifiers. Run the app test, typecheck, and build; all must pass.

- [ ] **Step 4: Request final production publish approval**

Present the verified six demo URLs, the local showcase screenshots, and the exact planned showcase Vercel project name. Do not run the final production deployment until Jeremy approves this gate.

- [ ] **Step 5: Deploy and verify the showcase**

Deploy `sites/blueprint-live-demos/app` to the `blueprint-factory-live-demos` Vercel project. Verify the final URL returns 200, contains `Blueprint Factory`, and exposes six `View Live Demo` links. Open each link from the deployed page and verify the full site loads.

- [ ] **Step 6: Record deployment evidence and run the full gate**

Update `deploy.md` with the exact production URL and timestamp. Run:

```bash
pnpm test
pnpm --dir sites/blueprint-live-demos/app test
pnpm --dir sites/blueprint-live-demos/app typecheck
pnpm --dir sites/blueprint-live-demos/app build
git diff --check
```

Expected: 0 failures and 0 whitespace errors.

- [ ] **Step 7: Commit the verified public release metadata**

```bash
git add sites/blueprint-live-demos
git commit -m "docs(showcase): record public live demo release"
```
