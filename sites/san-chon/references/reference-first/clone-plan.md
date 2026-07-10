# Clone Plan: San Chon

Status: complete
Primary donor: COTE Korean Steakhouse
Donor URL: `https://www.cotekoreansteakhouse.com/`

## 1. Page And Route Inventory

- `/`: clone every donor-critical homepage chapter listed in `topology.md`, translated to San Chon.
- `/menu`: supporting commercial route derived from COTE's menu family; use the same header, black/cream hero, editorial grid, reservation rail, visit close, and footer.
- `/visit`: supporting conversion route derived from COTE's locations/visit flow; address, online-listed hours, contact, Instagram, directions, and dining notes.
- Donor account/checkout: none observed and none needed.
- Donor-specific location, press, careers, events, gift card, delivery, education, and campaign routes are excluded because San Chon has one verified location and no evidence for those programs.

## 2. Flow Map

- Primary navigation: Home, Menu, Experience anchor, Visit; mobile menu exposes the same links.
- Primary conversion: any `Reserve / Call to reserve` CTA → `tel:+9779824147894`.
- Secondary conversion: directions → Google Maps query; Instagram → verified public profile.
- Forms: no newsletter or reservation form; donor newsletter rails become direct call/visit bands to avoid false data collection.
- Menu: filter-like category links are anchors, not a database filter.
- Homepage favorites: previous/next buttons and horizontal scroll-snap cards.
- Experience: three tabs with explicit `tablist`, selected state, and keyboard-operable buttons.
- Mobile menu: open/closed overlay, close button, Escape support, body-scroll lock.
- Empty/loading/error states: not applicable; all content is local and static.

## 3. Section And Responsive Rhythm

- Desktop: announcement → framed nav → 100svh hero → conversion rail → 420px intro → category rail → 680px favorites → 90vh experience → conversion rail → two 50/50 story bands → 1800px collage → proof cards → visit/map → footer.
- Tablet: retain split story bands, reduce type scale, make favorites horizontally scrollable, and keep the experience panel under 46vw.
- Mobile: stack all split bands, one visible favorite card, vertically crop hero/experience images, convert collage to controlled masonry, and keep minimum 44px controls.
- Typography: 150px maximum donor statement becomes `clamp(3.5rem, 9vw, 9.4rem)`; body remains 16–19px.

## 4. Interaction And Animation Audit

- Scroll-driven: one-shot IntersectionObserver reveals at threshold 0.16 / bottom root margin -8%; 34px lift over 0.9s.
- Click-driven: mobile menu, experience tabs, favorites previous/next.
- Hover/focus: 1.025 image zoom, brass outline shift, cream/brass color inversion; always paired with visible focus styles.
- Timed/autoplay: Ember Seal hero entrance on mount; no auto-advancing carousel and no production video.
- Sticky/fixed: desktop nav is sticky; mobile menu is fixed; favorites use CSS scroll-snap.
- Signature: CSS clip-path/aperture reveal, wordmark lift, and one ember-ring pulse. No canvas.
- Reduced motion: all animation durations collapse, scroll behavior becomes auto, images do not breathe/zoom, and content starts visible.

## 5. Asset, Font, And Media Strategy

- Reference-only: all 271 inventoried COTE assets, donor screenshots, and donor motion remain under `references/reference-first/`.
- Production: `hero-table.png`, `grill-fire.png`, `menu-spread.png`, `dining-room.png`, and `shared-feast.png`; all are original generated assets.
- Fonts: substitute proprietary SangBleu/Baxter with Cormorant Garamond and DM Sans from `next/font/google`; Korean text falls back to installed Korean serif/sans fonts.
- Icons: hand-authored inline SVG for menu, arrows, Instagram, phone, and map only.
- Video: not required; the hero uses a living-still scale animation and static end state for reduced motion.
- Rights: no donor images, Tripadvisor traveler photos, or third-party review photos ship.

## 6. Implementation Stack Decision

Decision: Build in TypeScript + Next.js App Router + React + global CSS, with CSS keyframes/transitions and a tiny IntersectionObserver/React state layer for scroll reveals, tabs, carousel controls, and the mobile menu. No Tailwind classes are required, and no GSAP, Swiper package, Three.js, Rive, Lottie, Supabase, CMS, auth, or database is needed.

## 7. Tooling Explicitly Not Needed

- GSAP / ScrollTrigger: not needed; donor motion is reproducible with CSS and IntersectionObserver.
- Three.js / WebGL / canvas: not needed.
- Lottie / Rive: not needed.
- Swiper package: not needed; one small scroll-snap rail covers the observed state.
- Supabase / database: not needed.
- CMS: not needed for three static pages.
- Auth: not needed.
- Paid booking/order service: not evidenced or authorized.

## 8. Builder Handoff

- Components: `SiteHeader`, `MobileMenu`, `EmberHero`, `ReservationRail`, `IntroStatement`, `FavoritesRail`, `ExperienceTabs`, `StoryBand`, `SensoryCollage`, `ProofGrid`, `VisitPanel`, `SiteFooter`, `PageHero`, `MenuSections`.
- Shared tokens: soot/cream/brass/ember/celadon/forest; Cormorant/DM Sans; 1px brass rules; 12-column max-width 1440px grid.
- Highest fidelity risks: mobile hero crop, nav density, experience overlay proportions, collage vertical rhythm, and dense visit/footer hierarchy.
- QA: desktop 1440, tablet 768, mobile 390; tab states; menu open/close/Escape; keyboard focus; all external links; reduced motion; console; axe; build; asset-leak scan.

## 9. Production Translation Contract

- Preserve donor structure, hierarchy, border language, section proportions, and interaction model.
- Replace every sentence and visual with San Chon content or qualified neutral language.
- Prices, awards, credentials, exact availability, and testimonials remain absent until supplied by the client.
- If online-listed hours differ from the restaurant's current social profile, the client must confirm before production.
