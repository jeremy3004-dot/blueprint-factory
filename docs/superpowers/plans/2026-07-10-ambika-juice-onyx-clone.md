# Ambika Juice Onyx Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reproduce Onyx Coffee Lab locally at measured desktop/mobile/motion fidelity, then translate the proven system into a full Ambika Juice catalogue and directions-led website.

**Architecture:** Adopt the existing Onyx evidence pack into a self-contained Next.js site, complete the forensic route and interaction contract, and implement shared data-driven page families. Preserve the donor structure through translation while replacing all protected content and assets before any preview deployment.

**Tech Stack:** TypeScript, Next.js App Router, React, global CSS/Tailwind, evidence-confirmed Swiper behavior, Playwright/axe via the factory, Node test runner for site-local content contracts.

## Global Constraints

- Work only in `sites/ambika-juice` and this plan/spec unless an existing factory command generates scoped evidence.
- Do not modify `factory/` scripts or tests.
- Keep donor assets and copy reference-only and local.
- Do not preview-deploy until every donor asset and sentence is replaced.
- Do not production-deploy.
- Do not invent Ambika prices, ingredients, claims, awards, testimonials, or services.
- Every animation must support `prefers-reduced-motion`.
- Primary final CTA: `Get Directions`.
- Clone target: at least 85% pixel match on desktop and mobile, or an honest documented five-iteration plateau.
- Translation target: at least 85% structure match.
- Commit each independently reviewable task on `job/ambika-juice`.

---

### Task 1: Complete and adopt the Onyx forensic pack

**Files:**
- Create: `sites/ambika-juice/**` via `pnpm blueprint:adopt`
- Modify: `sites/ambika-juice/references/reference-first/topology.md`
- Modify: `sites/ambika-juice/references/reference-first/clone-plan.md`
- Modify: `sites/ambika-juice/pages.json`
- Modify: `sites/ambika-juice/qa/worker-notes.md`
- Modify: `sites/ambika-juice/qa/run-log.md`

**Interfaces:**
- Consumes: `sites/donor-onyx-coffee/references/reference-first/` and the live donor URL.
- Produces: a complete route-family inventory and interaction contract used by every later task.

- [ ] **Step 1: Adopt the donor pack**

Run:

```bash
pnpm blueprint:adopt ambika-juice donor-onyx-coffee
```

Expected: `sites/ambika-juice` is created with copied evidence and no production deploy.

- [ ] **Step 2: Re-audit donor evidence and live behavior**

Review the four canonical screenshots, section captures, normal/reduced motion recordings, extraction JSON, and all 64 harvested routes. Check live desktop, tablet, and mobile states for header, mega-menu, search, account, cart, collection filters, product media, hover/focus, carousels, forms, and footer.

- [ ] **Step 3: Complete the topology and clone plan**

Replace every `> AGENT:` prompt, `draft`, and blank `Decision:` field with observed facts. The stack decision must explicitly state whether Swiper is used and that GSAP, Three.js, Rive, Lottie, CMS, auth, and database are not needed unless evidence proves otherwise.

- [ ] **Step 4: Curate route coverage**

Populate `pages.json` with every harvested public route, group template-equivalent product and collection routes, and mark each `planned` or `deferred` with a concrete reason. Clone all user-visible route families; policy/account routes may be represented by exact templates rather than copied business logic.

- [ ] **Step 5: Verify the forensic gate**

Run:

```bash
pnpm blueprint:status ambika-juice
```

Expected: no `NEEDS_REFERENCE_FIRST` result.

- [ ] **Step 6: Commit**

```bash
git add sites/ambika-juice docs/superpowers
git commit -m "ambika-juice: evidence — complete Onyx forensic plan"
```

### Task 2: Establish site-local content and route contracts with TDD

**Files:**
- Modify: `sites/ambika-juice/app/package.json`
- Create: `sites/ambika-juice/app/content/types.ts`
- Create: `sites/ambika-juice/app/content/onyx-reference.ts`
- Create: `sites/ambika-juice/app/tests/content-contract.test.ts`
- Create: `sites/ambika-juice/app/tests/route-contract.test.ts`

**Interfaces:**
- Produces: `CatalogueCategory`, `CatalogueProduct`, `NavGroup`, `RouteRecord`, `BusinessFacts`, and typed reference content used by route components.

- [ ] **Step 1: Write failing content-contract tests**

Tests must assert unique category/product slugs, non-empty display names, valid internal paths, optional price handling, and reference-only provenance for donor media.

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
pnpm --dir sites/ambika-juice/app test
```

Expected: FAIL because the content modules and types do not exist.

- [ ] **Step 3: Add the minimal typed content layer and test script**

Define discriminated provenance as `"reference-only" | "ambika-owned" | "licensed" | "generated"`, require it for every media item, and make price/ingredients/tasting notes optional.

- [ ] **Step 4: Run tests and verify GREEN**

Run the same command. Expected: all site-local contract tests pass.

- [ ] **Step 5: Commit**

```bash
git add sites/ambika-juice/app
git commit -m "ambika-juice: foundation — add typed route and content contracts"
```

### Task 3: Build the exact donor chrome and interaction shell

**Files:**
- Create: `sites/ambika-juice/app/components/chrome/Header.tsx`
- Create: `sites/ambika-juice/app/components/chrome/MegaMenu.tsx`
- Create: `sites/ambika-juice/app/components/chrome/MobileDrawer.tsx`
- Create: `sites/ambika-juice/app/components/chrome/CartDrawer.tsx`
- Create: `sites/ambika-juice/app/components/chrome/Footer.tsx`
- Create: `sites/ambika-juice/app/components/motion/useReducedMotion.ts`
- Create: `sites/ambika-juice/app/tests/chrome-contract.test.ts`
- Modify: `sites/ambika-juice/app/app/layout.tsx`
- Modify: `sites/ambika-juice/app/app/globals.css`

**Interfaces:**
- Consumes: typed navigation and route records from Task 2.
- Produces: responsive chrome shared by every route.

- [ ] **Step 1: Write failing chrome contract tests**

Assert skip-link presence, keyboard-operable menu controls, `aria-expanded`, drawer labels, focus-return hooks, and reduced-motion CSS markers.

- [ ] **Step 2: Verify RED**

Run the site test command and confirm failure is caused by missing chrome components.

- [ ] **Step 3: Copy the closest reference-library interaction patterns**

Copy, do not import, the reduced-motion and reveal primitives that match donor evidence. Record lineage in `asset-log.md`.

- [ ] **Step 4: Implement donor-exact desktop and mobile states**

Match measured header height, spacing, colors, type, mega-menu columns, drawer transitions, hover/focus states, scroll state, and footer rhythm from evidence.

- [ ] **Step 5: Verify GREEN and build**

```bash
pnpm --dir sites/ambika-juice/app test
pnpm --dir sites/ambika-juice/app build
```

Expected: tests and Next build pass.

- [ ] **Step 6: Commit**

```bash
git add sites/ambika-juice
git commit -m "ambika-juice: clone — reproduce Onyx navigation and chrome"
```

### Task 4: Build donor homepage and editorial section system

**Files:**
- Create: `sites/ambika-juice/app/components/sections/Hero.tsx`
- Create: `sites/ambika-juice/app/components/sections/EditorialSplit.tsx`
- Create: `sites/ambika-juice/app/components/sections/MediaFeature.tsx`
- Create: `sites/ambika-juice/app/components/sections/ProductRail.tsx`
- Create: `sites/ambika-juice/app/components/sections/PressRail.tsx`
- Create: `sites/ambika-juice/app/components/sections/VisitFeature.tsx`
- Create: `sites/ambika-juice/app/tests/home-contract.test.ts`
- Modify: `sites/ambika-juice/app/app/page.tsx`

**Interfaces:**
- Consumes: reference content and chrome.
- Produces: the 20-section donor homepage composition.

- [ ] **Step 1: Write a failing section-order test**

Assert the captured 20-section order, heading hierarchy, CTA paths, media provenance, and carousel labels.

- [ ] **Step 2: Verify RED**

Run site tests; expected failure is missing homepage sections.

- [ ] **Step 3: Implement the 20 sections from screenshots and extraction**

Use exact measured max-widths, paddings, type sizes, background alternation, image aspect ratios, and section heights. Reproduce evidence-confirmed motion and autoplay timing; use static final states under reduced motion.

- [ ] **Step 4: Verify GREEN and build**

Run tests and build; both must pass.

- [ ] **Step 5: Commit**

```bash
git add sites/ambika-juice
git commit -m "ambika-juice: clone — reproduce Onyx homepage system"
```

### Task 5: Build all donor page families

**Files:**
- Create: `sites/ambika-juice/app/app/collections/[slug]/page.tsx`
- Create: `sites/ambika-juice/app/app/products/[slug]/page.tsx`
- Create: `sites/ambika-juice/app/app/pages/[slug]/page.tsx`
- Create: `sites/ambika-juice/app/app/cart/page.tsx`
- Create: `sites/ambika-juice/app/app/account/login/page.tsx`
- Create: `sites/ambika-juice/app/app/policies/[slug]/page.tsx`
- Create: `sites/ambika-juice/app/components/catalogue/CategoryFilter.tsx`
- Create: `sites/ambika-juice/app/components/catalogue/ProductGrid.tsx`
- Create: `sites/ambika-juice/app/components/catalogue/ProductCard.tsx`
- Create: `sites/ambika-juice/app/components/catalogue/ProductDetail.tsx`
- Create: `sites/ambika-juice/app/tests/page-family-contract.test.ts`

**Interfaces:**
- Consumes: `RouteRecord[]` and typed reference catalogue.
- Produces: every planned donor route through shared static page families.

- [ ] **Step 1: Write failing route-generation tests**

Assert every planned route resolves to a page family, static params are unique, collection filters are keyboard-operable, product detail media is labelled, and cart/account reference states are non-transactional.

- [ ] **Step 2: Verify RED**

Run site tests and confirm missing page families cause the failure.

- [ ] **Step 3: Implement shared route families**

Match donor collection grids, filters, sorting presentation, product gallery, option controls, editorial pages, cart drawer/page states, login form presentation, and policy typography without connecting commerce or authentication.

- [ ] **Step 4: Verify GREEN and build**

Run site tests and build. Update `pages.json` routes to `built` only when implemented.

- [ ] **Step 5: Commit**

```bash
git add sites/ambika-juice
git commit -m "ambika-juice: clone — add Onyx public page families"
```

### Task 6: Measure and tune the clone

**Files:**
- Modify: `sites/ambika-juice/qa/run-log.md`
- Create/Modify: `sites/ambika-juice/qa/compare/**`
- Create/Modify: `sites/ambika-juice/screenshots/**`

**Interfaces:**
- Consumes: complete local donor clone.
- Produces: measured desktop/mobile fidelity evidence and documented remaining gaps.

- [ ] **Step 1: Start the local server**

```bash
pnpm --dir sites/ambika-juice/app dev
```

- [ ] **Step 2: Run the full clone check**

```bash
pnpm blueprint:check ambika-juice http://localhost:3000
pnpm blueprint:compare ambika-juice http://localhost:3000 --stage clone
```

- [ ] **Step 3: Tune worst sections first**

Complete up to five focused compare/fix iterations, logging first/final desktop and mobile pixel scores and every material change.

- [ ] **Step 4: Capture normal and reduced motion**

```bash
pnpm blueprint:motion ambika-juice http://localhost:3000
```

- [ ] **Step 5: Commit clone evidence**

```bash
git add sites/ambika-juice
git commit -m "ambika-juice: qa — measure and tune Onyx clone fidelity"
```

### Task 7: Translate content, routes, and media to Ambika

**Files:**
- Create: `sites/ambika-juice/app/content/ambika.ts`
- Create: `sites/ambika-juice/app/tests/ambika-content.test.ts`
- Modify: `sites/ambika-juice/copy-deck.md`
- Modify: `sites/ambika-juice/pages.json`
- Modify: `sites/ambika-juice/asset-log.md`
- Create: `sites/ambika-juice/qa/needs-client-input.md`
- Modify: `sites/ambika-juice/app/app/**`
- Modify: `sites/ambika-juice/app/public/**`

**Interfaces:**
- Consumes: verified public Ambika evidence and proven donor page system.
- Produces: production-safe Ambika site with no donor content.

- [ ] **Step 1: Generate the copy deck**

```bash
pnpm blueprint:copydeck ambika-juice --all
```

- [ ] **Step 2: Write failing Ambika content tests**

Assert no `Onyx`, Arkansas, coffee-roastery, donor URL, donor asset path, reference-only provenance, checkout, subscription, or wholesale copy remains in shipping data. Assert a verified directions URL and phone number exist.

- [ ] **Step 3: Verify RED**

Run site tests and confirm donor content triggers failures.

- [ ] **Step 4: Build the verified Ambika catalogue**

Transcribe only legible, corroborated menu items. Group products into typed categories, omit unknown prices, and record conflicting/missing facts in `qa/needs-client-input.md`.

- [ ] **Step 5: Replace all media and licensed fonts**

Use Ambika-owned media when rights are clear, otherwise licensed/generated replacements. Log source, rights, route usage, alt text, and any visual substitution. Delete donor assets from shipping paths.

- [ ] **Step 6: Translate page families**

Map the donor route families to Home, Menu, categories, drinks, Story, Gallery, Visit, FAQ, privacy, and terms. Keep measured structure and interaction timing. Replace commerce controls with menu exploration and directions actions.

- [ ] **Step 7: Verify GREEN and build**

Run site tests and build. Expected: no donor-content contract violations.

- [ ] **Step 8: Commit**

```bash
git add sites/ambika-juice
git commit -m "ambika-juice: translation — replace donor content with Ambika"
```

### Task 8: Verify, preview-deploy, and hand off

**Files:**
- Modify: `sites/ambika-juice/deploy.md`
- Modify: `sites/ambika-juice/qa/run-log.md`
- Modify: `sites/ambika-juice/qa/worker-notes.md`
- Modify: `sites/ambika-juice/qa/visual-review.md`
- Create: `sites/ambika-juice/qa/final-report.md`

**Interfaces:**
- Consumes: asset-safe Ambika translation.
- Produces: final QA evidence, preview URL, and human Beauty Pass packet.

- [ ] **Step 1: Run translation comparison**

```bash
pnpm blueprint:compare ambika-juice http://localhost:3000 --stage translation
```

Expected: structure score is at least 85%.

- [ ] **Step 2: Run full verification**

```bash
pnpm blueprint:verify ambika-juice http://localhost:3000
pnpm blueprint:run ambika-juice
```

Expected: build, console, links, accessibility, screenshots, motion, and page coverage pass; status stops at the human Beauty Pass gate.

- [ ] **Step 3: Prove the asset gate before deployment**

Search shipped code and public assets for Onyx names, URLs, copy, and reference-only paths. Do not bypass any factory block.

- [ ] **Step 4: Deploy preview only**

```bash
pnpm blueprint:deploy ambika-juice --preview
```

Expected: a preview URL is recorded in `deploy.md`; no production deployment occurs.

- [ ] **Step 5: Write the final report**

Include a five-sentence owner summary, donor line, first/final clone pixel scores, translation structure score, verification results, preview shareability, Living Menu Wall location, client-input list, and the five biggest time sinks.

- [ ] **Step 6: Commit and push the job branch**

```bash
git add sites/ambika-juice docs/superpowers
git commit -m "ambika-juice: handoff — verify preview and prepare Beauty Pass"
git push -u origin job/ambika-juice
```

