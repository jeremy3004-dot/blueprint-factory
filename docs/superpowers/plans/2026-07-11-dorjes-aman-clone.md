# Dorje's Aman Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a three-page Dorje's Resort & Spa website using Aman's captured homepage as the structural donor.

**Architecture:** A self-contained Next.js App Router app uses one shared site shell and typed content data. Native video, CSS transitions and a tiny IntersectionObserver helper provide the motion layer without runtime-heavy dependencies.

**Tech Stack:** TypeScript, Next.js App Router, React, global CSS, native HTML video, Next fonts.

## Global Constraints

- Ship no Aman copy or media.
- Use only facts and media from Dorje's current website.
- Keep booking external at `https://dorjes.com/booking/`.
- Respect `prefers-reduced-motion` and visible keyboard focus.
- Build `/`, `/accommodation-in-pokhara`, and `/tastes`; defer other routes explicitly.

---

### Task 1: Production foundation and media

**Files:**
- Create: `sites/dorjes/scripts/download-assets.mjs`
- Create: `sites/dorjes/app/src/lib/content.ts`
- Create: `sites/dorjes/app/src/components/Reveal.tsx`
- Modify: `sites/dorjes/app/src/app/layout.tsx`
- Modify: `sites/dorjes/app/src/app/globals.css`

**Interfaces:**
- Produces `site`, `rooms`, `experiences`, and `dining` typed exports for all pages.
- Produces `<Reveal>` for one-shot viewport entrances.

- [ ] Download and verify the selected Dorje's-owned logo, film and photographs into `app/public/media`.
- [ ] Add typed client content with no invented facts.
- [ ] Configure open display/body fonts, metadata, global tokens, reset, focus states and reduced-motion behavior.
- [ ] Run `pnpm --dir sites/dorjes/app exec tsc --noEmit`; expect exit 0.
- [ ] Commit only the foundation and media changes.

### Task 2: Shared shell and homepage

**Files:**
- Create: `sites/dorjes/app/src/components/SiteHeader.tsx`
- Create: `sites/dorjes/app/src/components/SiteFooter.tsx`
- Create: `sites/dorjes/app/src/components/BookingClose.tsx`
- Create: `sites/dorjes/app/src/components/HomePage.tsx`
- Modify: `sites/dorjes/app/src/app/page.tsx`

**Interfaces:**
- Consumes the content exports and `<Reveal>` from Task 1.
- Produces a keyboard-operable shell shared by Tasks 3 and 4.

- [ ] Implement menu open/close, Escape handling, body scroll lock and visible focus return.
- [ ] Implement the Lake Aperture hero with video poster fallback.
- [ ] Implement Aman's asymmetric feature pair, clipped experience rail, centered interlude, three-card world section and quiet conversion close.
- [ ] Verify mobile stacking and reduced motion in the browser.
- [ ] Run typecheck and build; expect exit 0.

### Task 3: Accommodation page

**Files:**
- Create: `sites/dorjes/app/src/app/accommodation-in-pokhara/page.tsx`

**Interfaces:**
- Consumes `rooms`, `SiteHeader`, `SiteFooter`, `BookingClose`, and `Reveal`.
- Produces the `/accommodation-in-pokhara` route.

- [ ] Build the contained room hero and four alternating editorial room stories.
- [ ] Show the sourced description for every room category and route current rate/availability to the live booking system.
- [ ] Link detailed-room actions to the existing Dorje's routes and booking action to the external booking flow.
- [ ] Run typecheck; expect exit 0.

### Task 4: Dining page

**Files:**
- Create: `sites/dorjes/app/src/app/tastes/page.tsx`

**Interfaces:**
- Consumes `dining`, `SiteHeader`, `SiteFooter`, `BookingClose`, and `Reveal`.
- Produces the `/tastes` route.

- [ ] Build the contained culinary hero, local-produce story, lake-bar composition and restaurant/private-dining sequence.
- [ ] Keep every dining venue and capacity statement tied to current client copy.
- [ ] Run typecheck; expect exit 0.

### Task 5: Factory verification and visual iteration

**Files:**
- Modify: `sites/dorjes/pages.json`
- Modify: `sites/dorjes/asset-log.md`
- Modify: `sites/dorjes/qa/run-log.md`
- Modify: `sites/dorjes/qa/visual-review.md`
- Create: `sites/dorjes/qa/final-report.md`

**Interfaces:**
- Produces the completed factory evidence and handoff.

- [ ] Start the local site and run `pnpm blueprint:check dorjes <url>`.
- [ ] Capture 1440px and 390px screenshots plus normal/reduced-motion evidence.
- [ ] Run clone/translation comparison and record honest scores or tooling limitations.
- [ ] Dispatch an antagonistic reviewer with the donor screenshots, requirements and current build.
- [ ] Fix every critical/important review issue, recapture and rerun the full verification gate.
- [ ] Commit the final verified site without merging to main or deploying production.
