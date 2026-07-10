# Avya Club Republic BOS Clone Design

**Date:** 2026-07-10
**Status:** Approved direction, awaiting written-spec review
**Client:** Avya Club
**Brand source:** https://avya.club
**Visual donor:** https://republicbos.com

## Objective

Build a premium, responsive Avya Club website that faithfully inherits Republic BOS's editorial structure, section rhythm, typography hierarchy, navigation behavior, image treatment, and motion model while using only Avya's real facts, copy, links, identity, and cleared imagery in the translated site.

The work will stop at a shareable preview and human Beauty Pass. It will not deploy to production or merge to `main`.

## Chosen Approach

Use a faithful donor translation rather than a loose inspiration or homepage-only treatment.

The implementation has two measurable stages:

1. Reproduce the Republic BOS structure and behavior closely enough to pass the factory's clone-stage desktop and mobile comparison.
2. Replace all donor identity, copy, images, and links with Avya material while preserving the donor's structure and interaction quality.

This approach was selected because a homepage-only clone would leave inner pages visually inconsistent, while a literal route-for-route Republic rebuild would add pages and flows that do not match Avya's business.

## Scope

Build these six public routes:

| Route | Purpose | Primary conversion |
| --- | --- | --- |
| `/` | Introduce Avya as a holistic fitness and wellness club | Explore membership |
| `/about` | Tell Avya's real 2018 origin, meaning, scale, setting, and philosophy | Visit or contact the club |
| `/services` | Present gym, functional fitness, physiotherapy, spa, swimming, tennis, clubhouse, yoga, Zumba, and nutrition; include current published pricing | Choose a service or membership |
| `/gallery` | Show Avya's real spaces and experiences using cleared client imagery | Explore membership |
| `/contact` | Present location, phone, email, opening information, and map/contact actions | Call, email, or get directions |
| `/membership` | Explain current passes and memberships and direct visitors into Avya's existing registration flow | Register with Avya |

Avya routes discovered during brand-source capture but outside this core scope will be recorded in `pages.json` as deferred with a concrete reason. No route will be silently omitted.

## Information Architecture

### Shared navigation

- Transparent or image-overlaid navigation at the top of immersive heroes.
- Compact Avya mark on the left.
- Desktop navigation for About, Services, Gallery, Contact, and Membership.
- Persistent high-emphasis membership CTA.
- Mobile menu matching the donor's overlay and transition model after browser inspection.
- Scroll state changes contrast and surface treatment only when the donor does.

### Homepage

1. Immersive Avya hero using the donor's scale, composition, and responsive crop behavior.
2. Signature first-light sequence: oversized editorial lines for “Pure energy,” “Deep recovery,” and “First light,” paired with Avya gym, spa, swimming, tennis, and clubhouse imagery.
3. Introductory story using Avya's published “holistic haven” positioning and 2018 origin.
4. Club overview translating the donor's location or club-exploration section into Avya's Pokhara campus.
5. Service experience grid translating the donor's fitness cards into Avya's real facilities.
6. Community or identity statement using Avya's published philosophy and cleared testimonials only.
7. Membership callout using published options and a direct registration CTA.
8. Full contact and navigation footer.

### About

- Image-led opening hero.
- Avya's published origin, meaning of “Avya,” 110,000-square-foot footprint, Himalayan setting, inclusive positioning, and holistic philosophy.
- Facility and community imagery.
- No invented founders, awards, credentials, or statistics.

### Services

- Editorial service index rather than a generic equal-card grid.
- Sections for gym and functional fitness, physiotherapy, spa and wellness, swimming, tennis, clubhouse, yoga or meditation or Zumba, and nutrition.
- Pricing copied only from Avya's live published content and grouped under the appropriate service.
- Deep links or CTA actions use Avya's live registration/contact destinations where no new backend exists.

### Gallery

- Donor-led asymmetric image rhythm with varied scale and intentional crops.
- Client-owned Avya media only in the shipped build.
- Images remain meaningful and labeled; decorative images use empty alt text.

### Contact

- Gharipatan, Pokhara, Nepal.
- `061-590648` and `9802855271`.
- `info@avya.club`.
- Published opening information, currently “Open 24/7,” retained only if confirmed by the captured source.
- Telephone, email, and directions actions work without a custom backend.
- A static contact presentation is preferred over a nonfunctional form. If the live source exposes a working endpoint, it may be reused after verification.

### Membership

- Published gym, functional fitness, spa, wellness, yoga, Zumba, swimming, and clubhouse membership options.
- Clear separation between passes, recurring memberships, therapy pricing, and limited offers.
- Primary CTA links to Avya's existing `/register` flow unless the brand-source audit proves a safer canonical destination.
- No checkout, authentication, database, or copied Republic membership system.

## Visual Direction

### Donor moves to preserve

- Warm, editorial, image-dominant presentation.
- Large serif display hierarchy paired with a restrained sans-serif utility face.
- Alternating light and dark or image-backed sections with strong vertical rhythm.
- Oversized headings that cross conventional grid boundaries without harming legibility.
- Purposeful asymmetry, layered media, and changing image scales.
- Premium navigation and CTA behavior.
- Motion that supports the editorial sequence rather than decorating every element.

### Avya translation

- Use Avya's logo and source-derived color feel.
- Favor warm mineral neutrals, deep evergreen or charcoal, and a restrained first-light accent derived from the brand-source evidence.
- Preserve Himalayan and wellness context without adding generic mountain clichés.
- Use Avya's real gym, recovery, pool, tennis, clubhouse, and community imagery.
- Keep the voice calm, grounded, and confident. Remove hype and exclamation marks.

### Signature moment

**Pure Energy / First Light Sequence**

The homepage opening moves from a full-bleed Avya environment into three oversized editorial statements—“Pure energy,” “Deep recovery,” and “First light”—as the supporting imagery changes across gym, spa, swimming, tennis, and clubhouse experiences. The sequence must be recognizable in motion capture, remain usable on mobile, and collapse to a calm static composition when reduced motion is requested.

## Interaction and Motion Model

The forensic donor sweep will determine exact mechanisms before component implementation. Expected implementation boundaries are:

- CSS transitions and keyframes for hover, menu, button, and image-state changes.
- A small React or IntersectionObserver layer for scroll-triggered reveals if the donor uses viewport-triggered state.
- Sticky positioning only where directly evidenced by the donor.
- Respect `prefers-reduced-motion` for every animated component.
- Preserve keyboard navigation, focus visibility, semantic link and button roles, and adequate contrast.

GSAP, Lenis, Three.js, canvas, WebGL, Rive, and Lottie are not part of the default stack. Add a heavier motion tool only if the Republic BOS audit proves it essential and the existing factory already supports it without unnecessary dependency growth.

## Content and Asset Rules

- Facts come from Avya's live site capture only.
- Do not invent prices, offers, testimonials, member counts, trainer counts, program counts, credentials, or awards.
- Client-owned images from Avya's public site may be downloaded and shipped after being logged in `asset-log.md`.
- Republic BOS images, text, logos, icons, and proprietary fonts are reference-only and must not ship.
- Proprietary donor fonts will be replaced with visually appropriate open alternatives while keeping the hierarchy and logged in `asset-log.md`.
- Every downloaded or generated asset receives a source, use, and licensing note.
- Missing or uncertain facts are listed under “needs client input” in the final report rather than guessed.

## Architecture

Build a self-contained Next.js App Router application under `sites/avya-club/app` using TypeScript, React, and the factory's existing CSS or Tailwind conventions.

Suggested boundaries:

- Shared route data and Avya facts in one typed content module.
- Reusable header, mobile menu, footer, CTA, editorial heading, media frame, and reveal primitives.
- Page-specific components grouped by route.
- Local production assets under the Avya app's `public/` directory.
- No imports from `factory/reference-library`; copy and adapt the closest proven patterns into the site.

No CMS, custom backend, database, authentication, or payment integration is needed. The site consumes no runtime Avya API unless an existing public endpoint is proven stable and essential; static captured content is preferred for reliability.

## Failure and Edge Handling

- Missing client images use a logged, cleared placeholder rather than donor imagery.
- Broken or uncertain registration destinations fall back to verified telephone and email contact actions.
- External links use safe target behavior where appropriate.
- Images include explicit dimensions or responsive sizing to avoid layout shift.
- The mobile menu remains usable without animation.
- Reduced-motion mode preserves all content and conversion paths.
- If donor fidelity plateaus below the factory threshold after five focused iterations, record the exact sections and reasons instead of falsifying the score.

## Verification Strategy

### Reference-first evidence

- Desktop and mobile donor screenshots.
- Donor scroll and reduced-motion captures.
- Page topology, route inventory, behaviors, assets, fonts, colors, and animation mechanisms.
- `topology.md` and a concrete `clone-plan.md` before art direction or implementation.
- Component specifications written before corresponding components are assigned or built.

### Automated checks

- Site typecheck.
- Production build.
- Factory check chain: console errors, internal links, and accessibility.
- Route coverage in `pages.json`.
- Asset gate proving no donor material ships.

### Visual checks

- Clone-stage desktop and mobile comparison against Republic BOS, targeting at least 85% pixel fidelity or an honestly documented plateau.
- Translation-stage structure comparison targeting at least 85%.
- Desktop, tablet, and mobile responsive review.
- Scroll, click, hover, menu, and reduced-motion sweeps.
- Motion capture proving the signature moment.
- Human Beauty Pass before any production action.

## Delivery and Git Boundaries

- Work on `job/avya-club` in an isolated worktree.
- Keep unrelated workspace changes untouched.
- Commit only Avya-specific files and the approved planning documents.
- Prepare a preview deployment if the factory's checks and asset gate pass.
- Never deploy production, merge to `main`, or bypass preview protection.
- Push only the job branch as part of the factory handoff.

## Acceptance Criteria

The implementation is ready for human review when:

1. All six scoped routes are built and responsive.
2. Donor reference evidence and component specifications are complete.
3. No Republic BOS copy or imagery ships.
4. All Avya facts and prices are traceable to the brand-source capture.
5. The signature first-light sequence appears in normal-motion capture and has a reduced-motion form.
6. The build, typecheck, links, console, and accessibility checks pass, apart from explicitly documented pre-existing factory-test failures unrelated to Avya.
7. Clone-stage and translation-stage comparisons meet their thresholds or have honest plateau documentation.
8. `asset-log.md`, `pages.json`, `qa/run-log.md`, `qa/worker-notes.md`, and `qa/final-report.md` are current.
9. A preview URL is recorded with its shareability status.
10. The job stops at the human Beauty Pass without production deployment or merge.
