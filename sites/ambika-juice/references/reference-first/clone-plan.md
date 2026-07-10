# Clone Plan: ambika-juice

Status: complete
Primary donor: Onyx Coffee Lab
Donor URL: https://onyxcoffeelab.com

## 1. Page And Route Inventory

- Homepage: all 20 captured sections, global header/mega-menu, newsletter state, press strip, and footer.
- Collection pages: coffee, tea, chocolate, merchandise, equipment, collaboration, origin, and subscription collections share a filterable product-grid family.
- Product detail pages: campaign/product media gallery, title, descriptors, price/options presentation, purchase reference controls, and related items.
- Editorial pages: story, locations/location detail, brew/help tools, FAQ/support, jobs, events/private events, wholesale, and campaign landing pages.
- Utility paths: quick order, cart, login, privacy, terms, and policy templates.
- Conversion paths to clone locally: navigation -> collection -> product -> cart; campaign -> product; locations -> location detail; support -> FAQ/contact; account/login visual states.
- Production Ambika translation: Home, Menu, category collections, drink details, Story, Gallery, Visit, FAQ, privacy, and terms. Account, checkout, subscription, wholesale, training, equipment, and coffee-specific paths are translated where useful or deferred with reasons.

## 2. Flow Map

- Primary navigation: fixed header -> mega-menu category groups -> collection/editorial destinations; compact mobile header -> full-height drawer.
- Donor conversion: campaign/collection -> product detail -> cart drawer/page. Final Ambika conversion: any primary CTA -> verified Google Maps directions; menu browsing is secondary.
- Forms and states: newsletter empty/invalid/submitted presentation; login empty/error presentation; search open/results/empty presentation; product options default/selected/unavailable presentation; cart empty/filled presentation. No real account, payment, or order backend is built.
- Interactive surfaces: mega-menu, mobile drawer, search panel, cart drawer, collection filters/sort presentation, product gallery/options, Swiper rails, newsletter, footer groups, and media controls.
- Loading/empty/error: stable skeleton-free static rendering; missing optional Ambika content is omitted; missing production media uses a logged safe fallback.

## 3. Section And Responsive Rhythm

- Desktop: fixed overlay header, cinematic hero, 18 alternating editorial/media/campaign bands, press strip, dense footer.
- Tablet: two-column sections retain their order with reduced gaps; card grids remain two-up where width permits; navigation uses compact treatment.
- Mobile: all splits stack, portrait crops replace landscape crops, two-up campaigns become single-column, Swiper rails remain touch-scrollable, and footer groups compress vertically.
- Spacing: match captured section heights and use 96-160px desktop / 56-96px mobile vertical breathing room where extraction does not provide an exact value.
- Typography: preserve the 115-to-11px hierarchy, extended uppercase tracking, small editorial labels, and high contrast between campaign and body copy.

## 4. Interaction And Animation Audit

- Scroll-driven: fixed header contrast/state, media reveals, one-shot section lifts, and full-bleed media progression. Use CSS/IntersectionObserver unless live evidence shows another mechanism.
- Click-driven: mega-menu/drawer, search, cart, product options, filters, footer groups, and newsletter/login forms.
- Hover/focus: restrained media scale, link arrow/underline motion, card overlays, and visible keyboard focus.
- Timed/autoplay: muted looping hero/campaign video; Swiper autoplay only where observed.
- Sticky/snap/parallax: fixed header and carousel touch snapping; no pinned storytelling or heavy parallax is evident in the captured homepage.
- Detected library: Swiper. Reproduce its touch/drag/pagination behavior with Swiper or the smallest equivalent.
- Video: native HTML video with muted, loop, playsInline, poster, and lazy loading below the fold.
- Reduced motion: render final states immediately, disable autoplay and smooth/parallax motion, retain manual carousel controls.

## 5. Asset, Font, And Media Strategy

- Reference-only donor assets: all 44 captured Onyx images/videos/SVGs and extracted donor copy.
- Clone stage: donor media may appear only locally with explicit `reference-only` provenance.
- Production replacements: Ambika-owned media where reuse rights are clear; otherwise licensed or generated fruit/drink/shop/preparation imagery.
- Fonts: substitute proprietary Bajern/Kapra/Room-205/Gotham/Juniper/Maison-style faces with open alternatives chosen by cap height and width; log every substitution.
- Icons/SVGs: rebuild generic controls; never ship Onyx logos or campaign marks.
- Licensing: Tripadvisor/customer photos are evidence only unless ownership/permission is confirmed; all shipping assets require a source and rights note in `asset-log.md`.

## 6. Implementation Stack Decision

Decision: Build in TypeScript + Next.js App Router + React + global CSS/Tailwind, using Swiper only for evidence-confirmed rails plus small React state and IntersectionObserver/CSS transitions for navigation and reveals. No GSAP, Three.js/WebGL/canvas, Rive, Lottie, Supabase/database, CMS, or authentication is needed.

## 7. Tooling Explicitly Not Needed

- GSAP / ScrollTrigger: not needed; captured motion is achievable with CSS and IntersectionObserver.
- Three.js / WebGL / canvas: not present in evidence.
- Lottie / Rive: not present in evidence.
- Supabase / database: static catalogue and business site.
- CMS: not needed for the first production site.
- Auth: donor login is a local visual reference only and does not ship as functionality.
- Checkout/payment: donor cart is cloned locally as a stateful shell, then replaced by menu/directions conversion.

## 8. Builder Handoff

- Chrome: fixed header, mega-menu, search/cart panels, mobile drawer, press strip, and footer.
- Homepage: data-driven sequence of 20 section records rendered through reusable hero, editorial split, full-bleed media, two-up campaign, origin rail, recognition, and visit components.
- Page families: collections, products, editorial/location/support, cart/account reference, and policy typography.
- Shared tokens: black/paper/white palette, 115-to-11px type scale, square media, small tracked UI labels, generous vertical rhythm.
- Highest risks: proprietary font metrics, full-page media crop parity, 20-section mobile rhythm, live header/mega-menu states, and incomplete donor asset URLs in extraction.
- Required QA before translation: typecheck/build, console/link/axe checks, screenshots at 1440 and 390, normal/reduced motion, clone compare, and five worst-section iterations if needed.

