# Avya Club Republic BOS Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build six production-ready Avya Club routes using Republic BOS's verified structure and interaction model, Avya's real content and cleared assets, and Blueprint Factory's clone/translation QA gates.

**Architecture:** A self-contained Next.js App Router site lives under `sites/avya-club/app`. Typed static content feeds reusable shell, editorial media, and motion primitives; route modules compose those primitives without a CMS or runtime API. Forensic donor and brand-source evidence supplies exact component specifications before code is assigned.

**Tech Stack:** TypeScript, Next.js App Router, React, global CSS, CSS transitions/keyframes, a small IntersectionObserver client component, Node test runner through `tsx`, Playwright/factory browser QA.

## Global Constraints

- Build exactly six public routes: `/`, `/about`, `/services`, `/gallery`, `/contact`, and `/membership`.
- Visual donor is `https://republicbos.com`; brand source is `https://avya.club`.
- Clone donor structure, rhythm, typography hierarchy, responsive behavior, and interaction model before translating to Avya.
- Shipped copy, facts, prices, links, and testimonials must be traceable to Avya's captured public site; never invent claims.
- Republic BOS copy, imagery, logos, icons, and proprietary fonts are reference-only and must not ship.
- Every shipped asset must have source and licensing status in `sites/avya-club/asset-log.md`.
- Every component specification must exist before its component is implemented.
- Every animation must preserve all content and actions under `prefers-reduced-motion`.
- Copy reference-library patterns into the site; never import factory runtime code.
- Do not add CMS, database, authentication, custom checkout, Three.js, Rive, Lottie, or canvas/WebGL.
- Do not use GSAP or Lenis unless the completed Republic audit proves them essential; default to CSS and IntersectionObserver.
- Work only on `job/avya-club`; do not merge to `main` or deploy production.
- Preview deployment is allowed only after checks pass and the donor-asset gate is clean.
- Record failures, surprises, and judgment calls in `sites/avya-club/qa/worker-notes.md` as they happen.

---

### Task 1: Capture donor and brand source; complete the forensic specification pack

**Files:**
- Create via factory: `sites/avya-club/`
- Create via factory: `sites/avya-club-brand-source/`
- Modify: `sites/avya-club/references/reference-first/topology.md`
- Modify: `sites/avya-club/references/reference-first/clone-plan.md`
- Modify: `sites/avya-club/pages.json`
- Modify: `sites/avya-club/brief.md`
- Modify: `sites/avya-club/art-direction.md`
- Modify: `sites/avya-club/asset-log.md`
- Create: `sites/avya-club/qa/worker-notes.md`
- Create: `sites/avya-club/references/reference-first/components/header.spec.md`
- Create: `sites/avya-club/references/reference-first/components/hero.spec.md`
- Create: `sites/avya-club/references/reference-first/components/intro-story.spec.md`
- Create: `sites/avya-club/references/reference-first/components/club-overview.spec.md`
- Create: `sites/avya-club/references/reference-first/components/experience-grid.spec.md`
- Create: `sites/avya-club/references/reference-first/components/identity-gallery.spec.md`
- Create: `sites/avya-club/references/reference-first/components/membership-cta.spec.md`
- Create: `sites/avya-club/references/reference-first/components/footer.spec.md`
- Create: `sites/avya-club/references/reference-first/components/inner-hero.spec.md`
- Create: `sites/avya-club/references/reference-first/components/service-index.spec.md`
- Create: `sites/avya-club/references/reference-first/components/gallery.spec.md`
- Create: `sites/avya-club/references/reference-first/components/contact.spec.md`
- Create: `sites/avya-club/references/reference-first/components/membership.spec.md`

**Interfaces:**
- Consumes: approved design at `docs/superpowers/specs/2026-07-10-avya-club-republic-clone-design.md`.
- Produces: complete donor/brand evidence and exact component contracts used verbatim by Tasks 2-7.

- [ ] **Step 1: Create the Avya scaffold and capture Republic BOS**

Run:

```bash
pnpm blueprint:new avya-club
pnpm blueprint:capture avya-club https://republicbos.com
```

Expected: `sites/avya-club/references/reference-first/` contains desktop/mobile screenshots, sections, motion, DOM, copy, tokens, assets, pages, `topology.md`, and `clone-plan.md`.

- [ ] **Step 2: Capture Avya as the brand source**

Run:

```bash
pnpm blueprint:capture avya-club-brand-source https://avya.club
```

Expected: a separate low-risk evidence pack contains Avya's real copy, route inventory, contact details, pricing, logos, and image URLs.

- [ ] **Step 3: Perform the mandatory interaction sweep**

Use browser automation at 1440, 768, and 390 CSS pixels. Scroll before clicking. Record:

```text
scroll triggers and thresholds
header before/after scroll state
menu open/closed state
hover transformations and easing
timed media or carousel changes
sticky sections and scroll-snap behavior
form, modal, trial, pricing, and account destinations
normal-motion and reduced-motion differences
```

Write the findings into `clone-plan.md` and the relevant component spec instead of leaving them only in chat.

- [ ] **Step 4: Replace generated drafts with concrete topology and clone plan**

The stack decision must read:

```text
Build in TypeScript + Next.js App Router + React + global CSS, with CSS transitions and a small IntersectionObserver/React state layer for scroll reveals and the first-light experience sequence. No CMS, database, auth, checkout, Three.js, WebGL, Rive, Lottie, GSAP, or Lenis is needed unless the donor behavior audit records direct evidence that CSS and IntersectionObserver cannot reproduce it.
```

Inventory every donor route and flow. Mark only the six Avya routes as planned; mark the rest deferred with route-specific reasons.

- [ ] **Step 5: Write the 13 component specifications**

Every specification must contain these exact headings:

```markdown
# Component Name Specification
## Overview
## DOM Structure
## Computed Styles
## States and Behaviors
## Assets
## Text Mapping
## Responsive Behavior
## Reduced Motion
## Acceptance Checks
```

Each spec cites the relevant donor screenshot/section file, exact computed values, all observed states, Avya content source, and the target file from Tasks 3-7.

- [ ] **Step 6: Complete factory docs and log baseline failures**

`brief.md` records Avya, Republic BOS, the six-route scope, and why the donor fits. `art-direction.md` records the named **Pure Energy / First Light Sequence**. `worker-notes.md` records the stale committed lockfile and the three prospect-thumbnail baseline failures with the exact command and counts.

- [ ] **Step 7: Verify the evidence gate**

Run:

```bash
pnpm blueprint:status avya-club
pnpm blueprint:run avya-club
test -f sites/avya-club/references/reference-first/topology.md
test -f sites/avya-club/references/reference-first/clone-plan.md
test "$(find sites/avya-club/references/reference-first/components -name '*.spec.md' | wc -l | tr -d ' ')" = "13"
```

Expected: the reference-first gate passes and the next action is art/tokens/build rather than missing evidence.

- [ ] **Step 8: Commit**

```bash
git add sites/avya-club sites/avya-club-brand-source
git commit -m "avya-club: step 1 — capture donor and brand evidence"
```

---

### Task 2: Establish tokens, typed content, route manifest, and tests

**Files:**
- Modify: `sites/avya-club/app/package.json`
- Modify: `sites/avya-club/app/tokens.json`
- Modify: `sites/avya-club/app/src/app/layout.tsx`
- Create: `sites/avya-club/app/src/content/site.ts`
- Create: `sites/avya-club/app/src/content/site.test.ts`
- Create: `sites/avya-club/app/src/lib/routes.ts`
- Create: `sites/avya-club/app/src/lib/routes.test.ts`
- Create: `sites/avya-club/app/src/components/icons.tsx`
- Modify: `sites/avya-club/pages.json`

**Interfaces:**
- Consumes: Avya copy/pricing/assets from Task 1 brand-source capture.
- Produces: `siteContent`, `primaryRoutes`, `isActiveRoute(pathname, href)`, metadata, token variables, and SVG icon components for every page task.

- [ ] **Step 1: Run donor token curation**

```bash
pnpm blueprint:tokens avya-club
```

Review `tokens.json`; preserve donor hierarchy but replace proprietary faces with logged open alternatives and shift color roles toward Avya's captured brand evidence.

- [ ] **Step 2: Add the site test command**

Add to `package.json`:

```json
"test": "tsx --test src/**/*.test.ts src/**/*.test.tsx"
```

Add `tsx` under `devDependencies` using the existing workspace version policy (`"latest"`).

- [ ] **Step 3: Write failing content invariants**

Create `site.test.ts` with assertions that:

```typescript
assert.equal(siteContent.contact.city, "Pokhara");
assert.equal(siteContent.contact.email, "info@avya.club");
assert.deepEqual(siteContent.contact.phones, ["061-590648", "9802855271"]);
assert.equal(siteContent.routes.length, 6);
assert.ok(siteContent.services.some((service) => service.slug === "physiotherapy"));
assert.ok(siteContent.services.some((service) => service.slug === "swimming-pool"));
assert.ok(siteContent.memberships.length > 0);
```

Run `pnpm --dir sites/avya-club/app test`. Expected: FAIL because `site.ts` does not exist.

- [ ] **Step 4: Implement typed Avya content**

Create exported interfaces `NavRoute`, `Service`, `MembershipGroup`, `Testimonial`, `MediaAsset`, and `SiteContent`, then export one immutable `siteContent` object populated only from the brand-source capture. Include `sourceUrl` on fact-bearing records so final auditing can trace them.

- [ ] **Step 5: Write failing route-state tests**

```typescript
assert.equal(isActiveRoute("/", "/"), true);
assert.equal(isActiveRoute("/services", "/services"), true);
assert.equal(isActiveRoute("/services/", "/services"), true);
assert.equal(isActiveRoute("/membership", "/services"), false);
```

Run the test and expect a missing-export failure.

- [ ] **Step 6: Implement route state and metadata**

Implement:

```typescript
export function normalizePath(path: string): string {
  return path === "/" ? path : path.replace(/\/+$/, "");
}

export function isActiveRoute(pathname: string, href: string): boolean {
  return normalizePath(pathname) === normalizePath(href);
}
```

Update layout metadata to “Avya Club | Fitness, Recovery & Wellbeing in Pokhara” and the captured source description.

- [ ] **Step 7: Verify**

```bash
pnpm --dir sites/avya-club/app test
pnpm --dir sites/avya-club/app exec tsc --noEmit
```

Expected: all site tests pass and typecheck exits 0.

- [ ] **Step 8: Commit**

```bash
git add sites/avya-club/app sites/avya-club/pages.json sites/avya-club/asset-log.md
git commit -m "avya-club: step 2 — add typed content and design tokens"
```

---

### Task 3: Build the shared shell, navigation, footer, and reveal primitives

**Files:**
- Create: `sites/avya-club/app/src/components/SiteHeader.tsx`
- Create: `sites/avya-club/app/src/components/MobileMenu.tsx`
- Create: `sites/avya-club/app/src/components/SiteFooter.tsx`
- Create: `sites/avya-club/app/src/components/Reveal.tsx`
- Create: `sites/avya-club/app/src/components/EditorialLink.tsx`
- Create: `sites/avya-club/app/src/components/MediaFrame.tsx`
- Create: `sites/avya-club/app/src/app/shell.test.tsx`
- Modify: `sites/avya-club/app/src/app/layout.tsx`
- Modify: `sites/avya-club/app/src/app/globals.css`

**Interfaces:**
- Consumes: `siteContent.routes`, contact data, icons, header/footer specs.
- Produces: shared shell components and `[data-reveal]` behavior used by every route.

- [ ] **Step 1: Write failing shell-render tests**

Render the layout shell to static markup and assert it contains the Avya logo label, all six nav destinations, both phone numbers, email address, and a “Membership” CTA. Expected: FAIL before components exist.

- [ ] **Step 2: Implement header and mobile menu from the exact specs**

Use semantic `<header>`, `<nav>`, buttons with `aria-expanded`, focus-visible styling, Escape-to-close, and body scroll locking only while the overlay is open. Do not add donor destinations.

- [ ] **Step 3: Implement footer and shared primitives**

Copy and adapt the reference-library `scroll-reveal` behavior into `Reveal.tsx` and Avya CSS. `MediaFrame` owns aspect ratio, object positioning, and scrim; `EditorialLink` owns the arrow/underline interaction.

- [ ] **Step 4: Verify red/green and browser behavior**

```bash
pnpm --dir sites/avya-club/app test
pnpm --dir sites/avya-club/app exec tsc --noEmit
```

With the dev server running, verify keyboard menu open/close, Escape, focus order, 1440/768/390 layouts, and reduced motion.

- [ ] **Step 5: Commit**

```bash
git add sites/avya-club/app/src
git commit -m "avya-club: step 3 — build shared editorial shell"
```

---

### Task 4: Build the homepage hero and Pure Energy / First Light signature sequence

**Files:**
- Create: `sites/avya-club/app/src/components/home/Hero.tsx`
- Create: `sites/avya-club/app/src/components/home/FirstLightSequence.tsx`
- Create: `sites/avya-club/app/src/lib/experience-sequence.ts`
- Create: `sites/avya-club/app/src/lib/experience-sequence.test.ts`
- Create: `sites/avya-club/app/src/app/home-hero.test.tsx`
- Modify: `sites/avya-club/app/src/app/page.tsx`
- Modify: `sites/avya-club/app/src/app/globals.css`

**Interfaces:**
- Consumes: hero and experience specs, cleared or explicitly reference-only stage assets, `MediaFrame`, `Reveal`, and Avya content.
- Produces: homepage first screen and signature moment.

- [ ] **Step 1: Write failing sequence-state tests**

```typescript
assert.equal(nextSequenceIndex(0, 1, 3), 1);
assert.equal(nextSequenceIndex(2, 1, 3), 0);
assert.equal(nextSequenceIndex(0, -1, 3), 2);
assert.equal(sequenceProgress(0, 3), "33.33%");
assert.equal(sequenceProgress(2, 3), "100.00%");
```

Run and confirm the missing module/export failure.

- [ ] **Step 2: Implement the minimal sequence helpers**

Use modulo wrapping and a two-decimal percentage. Keep scroll/timing DOM logic in the component, not the pure helper.

- [ ] **Step 3: Write failing hero-render tests**

Assert the rendered homepage contains “Pure energy,” “Deep recovery,” “First light,” “Explore membership,” and one real Avya image alt label. Expected: FAIL before the hero is wired.

- [ ] **Step 4: Implement Hero and FirstLightSequence from specs**

Copy/adapt `text-reveal` and the donor-evidenced media transition. The reduced-motion version renders the first complete state without timers, transforms, or hidden content.

- [ ] **Step 5: Verify**

```bash
pnpm --dir sites/avya-club/app test
pnpm --dir sites/avya-club/app exec tsc --noEmit
pnpm --dir sites/avya-club/app build
```

Capture focused 1440 and 390 screenshots of the hero and record any donor mismatch in `qa/run-log.md`.

- [ ] **Step 6: Commit**

```bash
git add sites/avya-club/app sites/avya-club/qa/run-log.md
git commit -m "avya-club: step 4 — build first-light hero sequence"
```

---

### Task 5: Complete the homepage editorial sections

**Files:**
- Create: `sites/avya-club/app/src/components/home/IntroStory.tsx`
- Create: `sites/avya-club/app/src/components/home/ClubOverview.tsx`
- Create: `sites/avya-club/app/src/components/home/ExperienceGrid.tsx`
- Create: `sites/avya-club/app/src/components/home/IdentityGallery.tsx`
- Create: `sites/avya-club/app/src/components/home/MembershipCta.tsx`
- Create: `sites/avya-club/app/src/app/home-sections.test.tsx`
- Modify: `sites/avya-club/app/src/app/page.tsx`
- Modify: `sites/avya-club/app/src/app/globals.css`

**Interfaces:**
- Consumes: five homepage component specs, `siteContent`, reference-library collage/gallery patterns, and shared primitives.
- Produces: complete donor-structured homepage.

- [ ] **Step 1: Write failing homepage-section tests**

Assert the static homepage output contains Avya's 2018 origin, 110,000-square-foot fact, all eight service labels, the published membership CTA destination, and only Avya testimonial names present in captured data. Expected: FAIL before sections are assembled.

- [ ] **Step 2: Build IntroStory and ClubOverview**

Match donor section order, spacing, type scale, and responsive media/text swap from their specs. Keep fact sources in `siteContent`, not duplicated literals.

- [ ] **Step 3: Build ExperienceGrid and IdentityGallery**

Copy/adapt the reference-library collage and media-gallery patterns where their behavior matches the donor. Preserve keyboard controls and mobile scroll-snap if evidenced.

- [ ] **Step 4: Build MembershipCta and assemble homepage**

Use Avya pricing or membership labels only when present in captured content. Link to `/membership`; registration action remains the verified Avya registration URL.

- [ ] **Step 5: Verify**

```bash
pnpm --dir sites/avya-club/app test
pnpm --dir sites/avya-club/app exec tsc --noEmit
pnpm --dir sites/avya-club/app build
```

Verify the homepage at 1440, 768, and 390 widths, all interactive states, and reduced motion.

- [ ] **Step 6: Commit**

```bash
git add sites/avya-club/app
git commit -m "avya-club: step 5 — complete donor-led homepage"
```

---

### Task 6: Build About, Services, Gallery, Contact, and Membership routes

**Files:**
- Create: `sites/avya-club/app/src/components/InnerHero.tsx`
- Create: `sites/avya-club/app/src/app/about/page.tsx`
- Create: `sites/avya-club/app/src/app/services/page.tsx`
- Create: `sites/avya-club/app/src/app/gallery/page.tsx`
- Create: `sites/avya-club/app/src/app/contact/page.tsx`
- Create: `sites/avya-club/app/src/app/membership/page.tsx`
- Create: `sites/avya-club/app/src/app/routes.test.tsx`
- Modify: `sites/avya-club/app/src/app/globals.css`
- Modify: `sites/avya-club/pages.json`

**Interfaces:**
- Consumes: inner-page specs, shared shell/primitives, typed Avya content.
- Produces: all six scoped routes marked `built` in `pages.json`.

- [ ] **Step 1: Write failing route-render tests**

Render each route component and assert its unique heading, primary CTA, and core content. Contact must include `mailto:info@avya.club` and both `tel:` actions. Membership must include the verified Avya registration URL. Expected: FAIL because route modules do not exist.

- [ ] **Step 2: Implement InnerHero, About, and Services**

Reuse the donor's inner-page hierarchy. Services includes every captured service and current published price grouping without invented currency or values.

- [ ] **Step 3: Implement Gallery, Contact, and Membership**

Gallery uses cleared Avya images only. Contact uses working call/email/directions actions and no fake form. Membership groups captured passes/offers and links to the verified registration destination.

- [ ] **Step 4: Update route coverage**

Mark the six routes `built`. Every other captured Avya or donor route is `deferred` with a specific commercial/scope reason.

- [ ] **Step 5: Verify**

```bash
pnpm --dir sites/avya-club/app test
pnpm --dir sites/avya-club/app exec tsc --noEmit
pnpm --dir sites/avya-club/app build
```

Manually verify every route at 1440 and 390 widths and all internal navigation paths.

- [ ] **Step 6: Commit**

```bash
git add sites/avya-club/app sites/avya-club/pages.json
git commit -m "avya-club: step 6 — build core public routes"
```

---

### Task 7: Complete translation, asset clearance, and clone/structure comparisons

**Files:**
- Modify: `sites/avya-club/copy-deck.md`
- Modify: `sites/avya-club/asset-log.md`
- Modify: `sites/avya-club/app/public/**`
- Modify: `sites/avya-club/app/src/content/site.ts`
- Modify: `sites/avya-club/app/src/app/**/*.tsx`
- Modify: `sites/avya-club/qa/run-log.md`
- Modify: `sites/avya-club/qa/worker-notes.md`

**Interfaces:**
- Consumes: complete clone-stage build and brand-source evidence.
- Produces: a translated Avya build with no shipping donor material and recorded compare scores.

- [ ] **Step 1: Measure the clone stage before final translation**

Start the site on an unused local port and run:

```bash
pnpm blueprint:check avya-club http://127.0.0.1:PORT
pnpm blueprint:compare avya-club http://127.0.0.1:PORT --stage clone
```

Record first scores. Iterate worst-section-first up to five focused passes, targeting at least 85% desktop and mobile pixel fidelity or an honest plateau.

- [ ] **Step 2: Generate and complete the copy deck**

```bash
pnpm blueprint:copydeck avya-club
```

Fill every planned-route brand cell with Avya copy. No donor sentence or placeholder may remain.

- [ ] **Step 3: Clear assets**

Download and optimize Avya-owned production images, replace every reference-only donor asset, and update `asset-log.md`. Search:

```bash
rg -n -i "republic|boston|healthworks|reference-only" sites/avya-club/app
```

Expected: no shipping donor references, except a non-rendered provenance comment if required by docs.

- [ ] **Step 4: Measure translation structure**

```bash
pnpm blueprint:compare avya-club http://127.0.0.1:PORT --stage translation
```

Target at least 85% structure. Record the score and worst section.

- [ ] **Step 5: Verify tests and asset gate**

```bash
pnpm --dir sites/avya-club/app test
pnpm --dir sites/avya-club/app exec tsc --noEmit
pnpm --dir sites/avya-club/app build
pnpm blueprint:check avya-club http://127.0.0.1:PORT
```

- [ ] **Step 6: Commit**

```bash
git add sites/avya-club
git commit -m "avya-club: step 7 — translate and clear production assets"
```

---

### Task 8: Run full verification, capture handoff evidence, and prepare preview

**Files:**
- Modify: `sites/avya-club/deploy.md`
- Modify: `sites/avya-club/qa/run-log.md`
- Modify: `sites/avya-club/qa/worker-notes.md`
- Create: `sites/avya-club/qa/final-report.md`
- Modify via commands: `sites/avya-club/qa/screenshots/**`
- Modify via commands: `sites/avya-club/qa/motion/**`
- Modify via commands: `sites/avya-club/qa/compare/**`

**Interfaces:**
- Consumes: translated build, cleared assets, completed pages and docs.
- Produces: fresh verification evidence, preview URL/shareability status, and human Beauty Pass handoff.

- [ ] **Step 1: Run the full QA chain**

```bash
pnpm blueprint:verify avya-club http://127.0.0.1:PORT
pnpm blueprint:status avya-club
pnpm blueprint:run avya-club
```

Expected: typecheck/build/console/links/accessibility/screenshots/motion/compare succeed, all pages have coverage, and the status stops at the human review gate.

- [ ] **Step 2: Inspect evidence manually**

Compare donor and Avya desktop/mobile composites section by section. Watch normal and reduced-motion captures. Verify the Pure Energy / First Light Sequence lands and that mobile navigation and CTAs work.

- [ ] **Step 3: Deploy preview only**

```bash
pnpm blueprint:deploy avya-club --preview
```

Expected: production remains untouched; `deploy.md` records URL and shareable/protected state. If the asset gate blocks, fix the source rather than bypassing it.

- [ ] **Step 4: Write the final report**

Include a five-sentence owner summary, donor and reason, first/final clone scores, translation structure score, check results, preview URL/shareability, signature moment location, needs-client-input list, and top five workflow difficulties.

- [ ] **Step 5: Run fresh final verification**

```bash
pnpm --dir sites/avya-club/app test
pnpm --dir sites/avya-club/app exec tsc --noEmit
pnpm --dir sites/avya-club/app build
pnpm blueprint:verify avya-club PREVIEW_OR_LOCAL_URL
git diff --check
git status --short --branch
```

Do not claim completion unless every reported result comes from this fresh run.

- [ ] **Step 6: Commit and push the job branch**

```bash
git add sites/avya-club
git commit -m "avya-club: step 8 — prepare preview and review handoff"
git push -u origin job/avya-club
```

Stop at the human Beauty Pass. Do not run production deploy or merge.
