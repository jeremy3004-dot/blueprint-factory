# Clone Plan: one-and-only-resorts

Status: complete
Primary donor: One&Only Resorts homepage
Donor URL: `https://www.oneandonlyresorts.com/?utm_source=chatgpt.com`

This is the donor-forensics contract for the local clone pass.

## 1. Page And Route Inventory

- Homepage: clone the donor homepage only.
- Inner pages: excluded for this pass.
- Detail pages: excluded for this pass.
- Form, booking, checkout, account, or dashboard paths: booking is represented as a local overlay only; no real reservation path.
- Routes intentionally excluded, and why: destination detail, offer detail, legal, social, booking engine, and Kerzner brand pages are outside the homepage clone scope.

## 2. Flow Map

- Primary navigation: fixed white masthead with hamburger, global selector, centered logo text, search/menu utility, and booking control.
- Conversion path: hero arrival -> global destinations -> stays -> experiences -> offers -> booking overlay.
- Forms and validation states: local booking overlay includes destination, arrival, guest fields, and a check availability button; no external submission.
- Menus, modals, tabs, accordions, filters, carousels, or media controls: menu overlay, booking overlay, folding gallery, mobile footer accordions.
- Success, error, empty, and loading states: no backend state; buttons remain local and deterministic for clone review.

## 3. Section And Responsive Rhythm

- Desktop structure: 96px fixed masthead, full-screen video hero, inset destination media panel, split stays feature, centered experience intro, folding gallery, three editorial cards, private homes split, quiet story/offers, benefits row, pale footer.
- Tablet structure: same order with narrower gutters and stacked split modules.
- Mobile structure: compact masthead, image-led hero, stacked feature modules, horizontal gallery/card overflow, accordion footer.
- Section order and spacing rhythm: large white breathing room between editorial modules, with no repeated equal-card feature strip.
- Typography hierarchy: Cormorant Garamond serif headings, DM Sans labels/body, tiny uppercase overlines, restrained copy scale.

## 4. Interaction And Animation Audit

- Scroll-driven: content is visible by default; major sections rely on page rhythm rather than hidden scroll choreography.
- Click-driven: gallery active state, menu overlay, booking overlay, and footer accordions.
- Hover/focus: one-pixel lift or underline changes only.
- Timed or autoplay: hero video autoplay on desktop with image fallback.
- Sticky, scroll-snap, parallax, or pinned sections: fixed header; mobile horizontal overflow behaves like intentional gallery browsing.
- Video, Lottie, Rive, canvas, WebGL, or Three.js: video hero only; no Lottie/Rive/canvas/WebGL/Three.js.
- Reduced-motion expectation: all content remains visible and animations collapse through CSS media query.

## 5. Asset, Font, And Media Strategy

- Reference-only donor assets: donor screenshots, Kerzner DAM image/video URLs, extracted text, and DOM notes.
- Production replacement assets: required before public deployment; this local clone uses donor media only for reference fidelity.
- Fonts: Cormorant Garamond and DM Sans through `next/font/google`.
- Icons and SVGs: simple CSS-drawn menu/search/booking controls, no copied donor SVGs.
- Video or generated media: donor hero video URL for local clone preview; replace before production.
- Licensing or rights notes: One&Only/Kerzner media, logos, property names, social/legal links, and exact brand copy are not production-cleared.

## 6. Implementation Stack Decision

Decision: Build in TypeScript + Next.js App Router + React + Tailwind/global CSS, with CSS transitions/keyframes and a tiny IntersectionObserver/React state layer for overlays, accordions, gallery state, and reduced-motion-safe visibility; no GSAP, Three.js, CMS, auth, Supabase, or database is needed for this donor clone.

## 7. Tooling Explicitly Not Needed

- GSAP / ScrollTrigger: not needed; no pinned timeline or heavy scroll choreography.
- Three.js / WebGL / canvas: not needed; no 3D signature moment.
- Lottie / Rive: not needed; no external vector animation state machine.
- Supabase / database: not needed; clone has no persistent data.
- CMS: not needed; content is static for review.
- Auth: not needed.
- Other: Lenis not used because native scroll matches the donor's calm behavior well enough.

## 8. Builder Handoff

- Components to build: masthead, hero, destination panel, split feature, experience gallery, story cards, quiet story/offers, benefit row, footer, menu overlay, booking overlay.
- Shared tokens and global CSS: warm white base, charcoal ink, small uppercase labels, Cormorant display, DM Sans UI/body, restrained underlined CTAs.
- Highest fidelity risks: donor media rights, video frame variability, mobile hero crop, avoiding generic luxury/SaaS patterns.
- QA checks required before translation: desktop screenshot, mobile screenshot, motion video, console check, reduced-motion visibility, Beauty Pass against donor screenshots.
