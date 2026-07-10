# Clone Plan: Dorje's Resort & Spa

Status: complete
Primary donor: Aman
Donor URL: https://www.aman.com

## 1. Page and route inventory

- Build `/` as the Aman-homepage structural translation.
- Build `/accommodation-in-pokhara` as the primary commercial list page with Dorje Suite, Jen/Junior Suite, Deluxe Room and Standard Room. Drive price/availability to the booking system because rates conflict across current routes.
- Build `/tastes` as the second commercial page: local produce, lake-bar dining, Moondance, Dorje's Bar & Grill and The Hearth.
- Keep booking external at `https://dorjes.com/booking/`; its third-party availability, loading, error, payment and confirmation states are explicitly outside this static build.
- Defer dining, resort, founder, sustainability, media, contact, blogs, FAQs and individual-room routes because the default paid-client scope is homepage plus the two most commercially important supporting pages.

## 2. Flow map

- Primary navigation: Home logo, Stay, Wellness, Resort (existing site), About Dorje (existing site), Contact (existing site), Book.
- Primary conversion: hero -> Stay -> room list -> existing Book flow.
- Secondary conversion: hero -> Dining -> existing Book flow; footer email/phone links.
- Menu: click-driven full-screen overlay; escape key and close button return focus.
- Seasonal/experience rail: pointer, touch and keyboard scroll-snap; no autoplay.
- No forms are built. External booking and contact destinations retain their existing validation states.

## 3. section and responsive rhythm

- Desktop home: quiet header; framed video hero; intro; asymmetric rooms/wellness pair; experience rail; rule/title interlude; three story cards; founder/sustainability story band; booking close; dense footer.
- Tablet: two-column feature sections compress while the experience rail remains horizontal.
- Mobile: all feature pairs stack, hero fills width beneath compact header, rail shows one card plus a clipped next card, and footer becomes a two-column information grid.
- Supporting pages use the same header/footer, a contained hero, alternating landscape media/text stories and an editorial booking close.
- Spacing uses a 24/48/80/128px cadence, compressed to 20/36/64px on mobile.

## 4. Interaction and animation audit

- Scroll-driven: one-shot section reveals via IntersectionObserver; no continuous scroll listeners.
- Click-driven: accessible menu open/close; experience rail controls; all links and buttons have visible focus states.
- Hover/focus: 700ms image scale from 1 to 1.025 on hover-capable devices; underline/rule expansion on text links.
- Timed/autoplay: Dorje's own muted looping hero video autoplays when the browser permits; poster image remains a complete fallback. No carousel autoplay.
- Sticky/scroll-snap: header is sticky; experience rail uses CSS scroll-snap. No pinned scrollytelling.
- Video/canvas: native HTML video only. No Lottie, Rive, canvas, WebGL or Three.js.
- Reduced motion: disable video autoplay, image scaling, smooth scrolling and reveals; render all content visible.

## 5. Asset, font and media strategy

- Aman screenshots, DOM, copy, logo and media remain under `references/reference-first` and never ship.
- Production media comes only from Dorje's current website: logo, resort film, room, pool, spa, dining, lake, resort and sustainability photography downloaded into `app/public/media`.
- Cormorant Garamond and Manrope are open Google fonts loaded through Next's font system; they replace Lyon/Whitney/Avenir roles.
- Icons are minimal inline SVGs written for the shell; client-owned logo SVG is reused.
- All client asset origins and rights basis are recorded in `asset-log.md`.

## 6. implementation stack decision

Decision: Build in TypeScript + Next.js App Router + React + global CSS, with native HTML video, CSS transitions/scroll-snap and a tiny IntersectionObserver layer for one-shot reveals. No GSAP, Three.js, Lottie, Rive, Supabase, CMS, auth or database is needed.

## 7. Tooling explicitly not needed

- GSAP / ScrollTrigger: not needed; motion is simple and CSS/IO driven.
- Three.js / WebGL / canvas: not needed; donor has no 3D interaction.
- Lottie / Rive: not needed; no vector animation system observed.
- Supabase / database: not needed; site is static and booking remains external.
- CMS: not needed for this scoped prototype.
- Auth: not needed.

## 8. Builder handoff

- Shared shell: sticky header, accessible full-screen menu, footer, booking close, reveal utility.
- Home: Lake Aperture hero, intro, asymmetric stay/wellness pair, horizontal experience rail, world-of-Dorje cards and sustainability story band.
- Stay: page hero and four room stories using real current copy; rates remain on the live booking system pending confirmation.
- Dining: page hero, local-produce story, lake bar, Moondance, Dorje's Bar & Grill and The Hearth private dining.
- Highest-fidelity risks: hero aspect ratio, restrained typography, negative-space cadence, horizontal rail crop and mobile footer density.
- QA: typecheck, build, local console/link/a11y scan, 1440/390 screenshots, reduced-motion check, motion capture and donor structure comparison.
