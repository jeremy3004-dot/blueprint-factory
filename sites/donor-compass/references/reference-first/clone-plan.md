# Clone Plan: donor-compass

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: compass.com
Donor URL: https://www.compass.com

This file is written before art direction or build work. It is the donor-forensics contract: if a builder would still need to guess pages, states, motion, assets, or stack, this plan is not complete.

## 1. Page And Route Inventory

- Homepage:
- Inner pages:
- Detail pages:
- Form, booking, checkout, account, or dashboard paths:
- Routes intentionally excluded, and why:

## 2. Flow Map

- Primary navigation:
- Conversion path:
- Forms and validation states:
- Menus, modals, tabs, accordions, filters, carousels, or media controls:
- Success, error, empty, and loading states:

## 3. Section And Responsive Rhythm

- Desktop structure:
- Tablet structure:
- Mobile structure:
- Section order and spacing rhythm:
- Typography hierarchy:

## 4. Interaction And Animation Audit

For each meaningful interaction, name the trigger, visual states, timing, and mechanism.

- Scroll-driven:
- Click-driven:
- Hover/focus:
- Timed or autoplay:
- Sticky, scroll-snap, parallax, or pinned sections:
- Video, Lottie, Rive, canvas, WebGL, or Three.js:
- Reduced-motion expectation:

## 5. Asset, Font, And Media Strategy

- Reference-only donor assets:
- Production replacement assets:
- Fonts:
- Icons and SVGs:
- Video or generated media:
- Licensing or rights notes:

## 6. Implementation Stack Decision

Write one plain sentence naming the smallest correct stack.

Example:

```text
Build in TypeScript + Next.js App Router + React + Tailwind/global CSS, with CSS transitions and a tiny IntersectionObserver/React state layer for scroll reveals. No GSAP, Three.js, CMS, auth, or database needed for this donor.
```

Decision:

> Suggested (VERIFY, then write a real Decision: line above): TypeScript + Next.js App Router + React + Tailwind with CSS transitions and a small IntersectionObserver layer. No GSAP/Three.js/CMS detected on the donor.
## 7. Tooling Explicitly Not Needed

- GSAP / ScrollTrigger:
- Three.js / WebGL / canvas:
- Lottie / Rive:
- Supabase / database:
- CMS:
- Auth:
- Other:

## 8. Builder Handoff

- Components to build:
- Shared tokens and global CSS:
- Highest fidelity risks:
- QA checks required before translation:


## Auto-Captured Evidence

Auto-drafted by `blueprint capture` on 2026-07-07T17:00:34.356Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 9 (see `references/reference-first/sections/`)
- Assets inventoried: 194 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Compass Sans, Open Sans, Compass Serif, Inter
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #171717 (737), #ffffff (332), #dadada (180), #000000 (154), #242424 (58), #0000ee (28), #6c6c6c (17), rgba(0, 0, 0, 0.8) (7), #333333 (6), rgba(0, 0, 0, 0.6) (6)
- Heading font: Compass Sans · Body font: Compass Sans
- Type scale (px, desc): 56, 32, 24, 20, 18, 16, 14, 12, 10

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Compass [header]
- `/about` — About Us [footer]
- `/about/offices` — Offices [footer]
- `/about/team` — Team [footer]
- `/agents` — Find an Agent [nav]
- `/agents-compass` — Join as an Agent [nav]
- `/agents-compass/sales-manager` — Sales Leadership [footer]
- `/calculators/mortgage-calculator` — Mortgage Calculator [footer]
- `/careers` — Careers [footer]
- `/coming-soon` — Compass Coming Soon [footer]
- `/coming-soon/listings` — Coming Soon [nav]
- `/commercial` — Commercial [footer]
- `/compass-cares` — Compass Cares [footer]
- `/compass-listings` — Compass Listings [nav]
- `/concierge` — Concierge [footer]
- `/contact` — Contact Us [footer]
- `/development` — Current Developments [nav]
- `/diversity-inclusion` — Diversity & Inclusion [footer]
- `/for-rent` — Rent [nav]
- `/homedetails/1271-Bushwick-Ave-Brooklyn-NY-11207/20QOOP_pid` — 1271 Bushwick AvenueBushwick [body]
- `/homedetails/143-Milton-St-Brooklyn-NY-11222/20T41H_pid` — 143 Milton StreetGreenpoint [body]
- `/homedetails/150-Joralemon-St-Unit-7A-Brooklyn-NY-11201/2051X0_pid` — 150 Joralemon Street, Unit 7ABrooklyn Heights [body]
- `/homedetails/33-Greenwich-Ave-Unit-3G-Manhattan-NY-10014/211379_pid` — 33 Greenwich Avenue, Unit 3GWest Village [body]
- `/homedetails/360-Clinton-Ave-Unit-3S-Brooklyn-NY-11238/20T5XJ_pid` — 360 Clinton Avenue, Unit 3SClinton Hill [body]
- `/homedetails/415-Leonard-St-Unit-6BC-Brooklyn-NY-11222/20FHUC_pid` — 415 Leonard Street, Unit 6BCWilliamsburg [body]
- `/homedetails/500-W-18th-St-Unit-W9D-Manhattan-NY-10011/20D6HE_pid` — 500 West 18th Street, Unit W9DChelsea [body]
- `/homes-for-sale` — Buy [nav]
- `/homes-for-sale/beverly-hills-ca` — Beverly Hills Real Estate [body]
- `/homes-for-sale/brooklyn-ny` — Brooklyn Real Estate [body]
- `/homes-for-sale/chicago-il` — Chicago Real Estate [body]
- `/homes-for-sale/los-angeles-ca` — Los Angeles Real Estate [body]
- `/homes-for-sale/manhattan-ny` — Manhattan Real Estate [body]
- `/homes-for-sale/miami-fl` — Miami Real Estate [body]
- `/homes-for-sale/naples-fl` — Naples Real Estate [body]
- `/homes-for-sale/oakland-ca` — Oakland Real Estate [body]
- `/homes-for-sale/pasadena-ca` — Pasadena Real Estate [body]
- `/homes-for-sale/philadelphia-pa` — Philadelphia Real Estate [body]
- `/homes-for-sale/port-st-lucie-fl` — Port St. Lucie Real Estate [body]
- `/homes-for-sale/queens-ny` — Queens Real Estate [body]
- `/homes-for-sale/sacramento-ca` — Sacramento Real Estate [body]
- `/homes-for-sale/san-antonio-tx` — San Antonio Real Estate [body]
- `/homes-for-sale/san-diego-ca` — San Diego Real Estate [body]
- `/homes-for-sale/san-francisco-ca` — San Francisco Real Estate [body]
- `/homes-for-sale/san-jose-ca` — San Jose Real Estate [body]
- `/homes-for-sale/santa-rosa-ca` — Santa Rosa Real Estate [body]
- `/homes-for-sale/seattle-wa` — Seattle Real Estate [body]
- `/homes-for-sale/washington-dc` — Washington DC Real Estate [body]
- `/legal/california-applicant-privacy-rights` — Notice for California Applicants [footer]
- `/legal/california-privacy-notice` — Your CA Privacy Rights [footer]
- `/legal/privacy-center` — Do Not Sell or Share My Personal Information [footer]
- `/legal/responsible-disclosure` — Responsible Disclosure [footer]
- `/legal/scam-avoidance` — Scam Avoidance [footer]
- `/legal/terms-of-service` — Terms of Service [footer]
- `/legal/trust-center` — Privacy Center [footer]
- `/neighborhood-guides` — Neighborhood Guides [footer]
- `/neighborhood-guides/nyc` — View More Neighborhoods [body]
- `/neighborhood-guides/nyc/carroll-gardens` — <style> .homepage-featuredGuideImage.lazyload { display: none; } </style> <img class="homepage-featuredGuideImage" src="//images.ctfassets.net/ypfe9l9zihcg/1cMyMygbXyKAIGcqE4oK22/9eaa0d98c134d7fedeb14694bdfe296c/Carroll-Gardens_Thumb-Large.jpg?fm=jpg&amp;fl=progressive&amp;q=85"/> Carroll Gardens [body]
- `/neighborhood-guides/nyc/murray-hill` — <style> .homepage-featuredGuideImage.lazyload { display: none; } </style> <img class="homepage-featuredGuideImage" src="//images.ctfassets.net/ypfe9l9zihcg/3OJTKIXSLeqS8W6EWMGiCy/e348e41114dcdcd2866c9424cada77e0/murray-hill-thumb-large.jpg?fm=jpg&amp;fl=progressive&amp;q=85"/> Murray Hill [body]
- `/neighborhood-guides/nyc/soho` — <style> .homepage-featuredGuideImage.lazyload { display: none; } </style> <img class="homepage-featuredGuideImage" src="//images.ctfassets.net/ypfe9l9zihcg/1w7AAoGZ32YUwWI6yEYoM8/33f3de66bb7100bfaa772b74b9a7200e/soho-thumb-large.jpg?fm=jpg&amp;fl=progressive&amp;q=85"/> SoHo [body]
- `/neighborhood-guides/nyc/upper-west-side` — <style> .homepage-featuredGuideImage.lazyload { display: none; } </style> <img class="homepage-featuredGuideImage" src="//images.ctfassets.net/ypfe9l9zihcg/2YxVs4EaKsaUSAcOGq22y0/d479dbadd3d42ace447d5c6ced779d0a/Upper-West_Thumb-Large.jpg?fm=jpg&amp;fl=progressive&amp;q=85"/> Upper West Side [body]
- `/neighborhood-guides/nyc/west-village` — <style> .homepage-featuredGuideImage.lazyload { display: none; } </style> <img class="homepage-featuredGuideImage" src="//images.ctfassets.net/ypfe9l9zihcg/5PJq50CKI0EoOaiiy0IS8M/37cc6b200078dd15c1ec68a08d86756d/West-Village_Thumb-Large_Thumb-Large.jpg?fm=jpg&amp;fl=progressive&amp;q=85"/> West Village [body]
- `/neighborhood-guides/nyc/williamsburg` — <style> .homepage-featuredGuideImage.lazyload { display: none; } </style> <img class="homepage-featuredGuideImage" src="//images.ctfassets.net/ypfe9l9zihcg/1UMva2y6ycuUgICEEoAouQ/a01495288d97a7cef06aefdff927f559/Williamsburg_Thumb_Large_Thumb-Large.jpg?fm=jpg&amp;fl=progressive&amp;q=85"/> Williamsburg [body]
- `/newsroom` — Newsroom [footer]
- `/private-exclusives` — Private Exclusives [nav]
- `/recently-sold` — Recently Sold Homes [footer]
- `/research/market-outlook` — Market Outlook [footer]
- `/se` — Sports & Entertainment [footer]
- `/sell` — Sell [nav]
- `/sitemap` — Sitemap [footer]
- `/sitemap/az` — Arizona Real Estate [body]
- `/sitemap/ca` — California Real Estate [body]
- `/sitemap/co` — Colorado Real Estate [body]
- `/sitemap/ct` — Connecticut Real Estate [body]
- `/sitemap/dc` — DC Real Estate [body]
- `/sitemap/fl` — Florida Real Estate [body]
- `/sitemap/ga` — Georgia Real Estate [body]
- `/sitemap/il` — Illinois Real Estate [body]
- `/sitemap/ma` — Massachusetts Real Estate [body]
- `/sitemap/md` — Maryland Real Estate [body]
- `/sitemap/nj` — New Jersey Real Estate [body]
- `/sitemap/ny` — New York Real Estate [body]
- `/sitemap/pa` — Pennsylvania Real Estate [body]
- `/sitemap/tn` — Tennessee Real Estate [body]
- `/sitemap/tx` — Texas Real Estate [body]
- `/sitemap/va` — Virginia Real Estate [body]
- `/sitemap/wa` — Washington Real Estate [body]
