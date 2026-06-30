# Reference-First Build

Blueprint Factory sites start from proven excellence, not from blank-page invention.

## Steps

1. Run `pnpm blueprint:run <slug>` to create or inspect the site.
2. If status is `NEEDS_REFERENCE_FIRST`, research at least three sector references.
3. Choose one primary 10/10 donor structure.
4. Capture donor desktop and mobile screenshots under `sites/<slug>/references/reference-first/`.
5. Write `sites/<slug>/references/reference-first/topology.md`: hero, conversion path, content sections, motion and interaction model.
6. Write `sites/<slug>/references/reference-first/clone-plan.md`: all pages/routes, user flows, states, animation mechanisms, asset needs, and the smallest correct implementation stack.
7. Extract the moves to borrow: layout rhythm, type hierarchy, asset strategy, scroll behavior, CTA placement, and section contrast.
8. Write those moves into `art-direction.md`.
9. Build the client site by translating the donor structure into the client brand, assets, and goals.
10. During Beauty Pass, compare the build to the donor screenshots before assigning scores.

## Rules

- Clone structure and craft, not protected brand identity.
- Prefer sector donors first. If the sector has weak sites, use an adjacent luxury/app/commerce donor and document why.
- If no donor screenshots exist, visual review stays `NOT_READY`.
- `blueprint run` must not proceed to art/build while reference-first evidence or the clone plan is missing.

## Clone Plan Checklist

`clone-plan.md` must be concrete enough that a builder can reconstruct the donor without guessing.

Include:

- Page inventory: homepage, inner pages, detail pages, form/booking/checkout/account paths, and any route intentionally excluded.
- Flow map: navigation menus, conversion path, forms, modals, tabs, accordions, filters, carousels, media controls, and success/error states.
- Animation audit: CSS transitions/keyframes, IntersectionObserver reveals, sticky/scroll-snap sections, GSAP/ScrollTrigger, video/Lottie/Rive, canvas/WebGL/Three.js, and hover/click/timed motion.
- Responsive audit: what changes at desktop, tablet, and mobile widths.
- Asset strategy: reference-only assets, production replacements, fonts, icons, video, generated media, and licensing notes.
- Stack decision: the smallest correct build stack in one plain sentence.

Example stack decision:

```text
Build in TypeScript + Next.js App Router + React + Tailwind/global CSS, with CSS transitions and a tiny IntersectionObserver/React state layer for scroll reveals. No GSAP, Three.js, CMS, auth, or database needed for this donor.
```
