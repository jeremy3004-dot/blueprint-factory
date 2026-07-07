# Clone Plan: donor-aesop

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: allbirds.com
Donor URL: https://www.allbirds.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T16:47:35.040Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 4 (see `references/reference-first/sections/`)
- Assets inventoried: 46 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Geograph, Self Modern, Akkurat Mono, Inter, Instrument Serif, Maison Neue Extended
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #000000 (1229), oklch(0.373 0.034 259.733) (511), #ffffff (307), #575757 (106), #212121 (97), oklch(0.21 0.034 264.665) (51), #e0dacf (26), #ece9e2 (10), oklab(0.247757 0.0000112727 0.00000496209 / 0.5) (6), #e0e2dc (5)
- Heading font: Geograph · Body font: Geograph
- Type scale (px, desc): 40, 30, 24, 20, 18, 16, 15, 14, 12, 9

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Customer Favorites [header]
- `/blogs/news` — Press [footer]
- `/blogs/the-perch` — Our Blog [footer]
- `/collections/all` — Shop All [header]
- `/collections/best-for-traveling-mens` — Shop Men [body]
- `/collections/best-for-traveling-womens` — Shop Women [body]
- `/collections/mens` — Men's Shoes [header]
- `/collections/mens-active-shoes` — Active [header]
- `/collections/mens-apparel` — Men's Apparel [header]
- `/collections/mens-bestsellers` — Bestsellers [header]
- `/collections/mens-dasher-nz-cl` — DASHER NZ COLLECTION [header]
- `/collections/mens-loungers` — Slip Ons [header]
- `/collections/mens-mizzles` — All-Weather [header]
- `/collections/mens-new-arrivals` — New Arrivals [header]
- `/collections/mens-sandals` — Sandals [header]
- `/collections/mens-slippers` — Slippers [header]
- `/collections/mens-sneakers` — Sneakers [header]
- `/collections/mens-socks` — Socks [header]
- `/collections/mens-terralux-cl` — LEATHER ALTERNATIVES [header]
- `/collections/mens-varsity-collection` — VARSITY COLLECTION [header]
- `/collections/new-arrivals-26` — New Arrivals [header]
- `/collections/sale-mens` — Men [header]
- `/collections/sale-mens-apparel` — Sale Apparel [header]
- `/collections/sale-womens` — Women [header]
- `/collections/sale-womens-apparel` — Sale Apparel [header]
- `/collections/shop-all-26` — Shop All [header]
- `/collections/womens` — Women's Shoes [header]
- `/collections/womens-active-shoes` — Active [header]
- `/collections/womens-apparel` — Women's Apparel [header]
- `/collections/womens-bestsellers` — Bestsellers [header]
- `/collections/womens-dasher-nz-cl` — DASHER NZ COLLECTION [header]
- `/collections/womens-flats` — Flats [header]
- `/collections/womens-loungers` — Slip Ons [header]
- `/collections/womens-mizzles` — All-Weather [header]
- `/collections/womens-new-arrivals` — New Arrivals [header]
- `/collections/womens-sandals` — Sandals [header]
- `/collections/womens-sneakers` — Sneakers [header]
- `/collections/womens-socks` — Socks [header]
- `/collections/womens-spring-colors` — Shop Women [body]
- `/collections/womens-trainers` — Trainers [header]
- `/collections/womens-varsity-airy` — VARSITY Airy [header]
- `/pages/bulk-ordering` — site [footer]
- `/pages/community-offers` — Community Offers [footer]
- `/pages/help` — FAQ/Contact Us [footer]
- `/pages/materials` — Our Materials [footer]
- `/pages/menu-image-list/nav-tiles-sale-spend-and-save` — Shop All [header]
- `/pages/menu-image-list/new-arrivals-list` — Shoes [header]
- `/pages/our-story` — Our Story [footer]
- `/pages/patents` — Patents [footer]
- `/pages/refer-a-friend` — Refer-a-friend Program [footer]
- `/pages/returns-exchanges` — Returns/Exchanges [footer]
- `/pages/shoe-care` — Shoe Care [footer]
- `/pages/sustainability` — Sustainability [footer]
- `/products/anytime-ankle-sock-blizzard` — Anytime Ankle Sock$16+1013 colors [body]
- `/products/anytime-crew-sock-natural-black` — Anytime Crew Sock$18+1417 colors [body]
- `/products/anytime-no-show-heel-grip` — Anytime No Show Heel Grip Sock$14+36 colors [body]
- `/products/anytime-no-show-sock-blizzard` — Anytime No Show Sock$14+710 colors [body]
- `/products/mens-cruiser-medium-grey` — Cruiser [header]
- `/products/mens-dasher-nz-natural-black-blizzard` — SHOP MEN [body]
- `/products/mens-runner-nz-slip-on` — Men's Runner NZ Slip OnAnthracite$105 [body]
- `/products/mens-runner-nz-slip-on-dark-navy` — Men's Runner NZ Slip OnDark Navy$105 [body]
- `/products/mens-runner-nz-slip-on-mushroom` — Runner NZ [header]
- `/products/mens-tree-runner-nz-medium-grey` — Tree Runner NZ [header]
- `/products/mens-varsity-mushroom` — Varsity [header]
- `/products/womens-cruiser-canvas-port` — Canvas Cruiser [header]
- `/products/womens-cruiser-canvas-sea-spray` — Women's Canvas CruiserSea Spray$75 [body]
- `/products/womens-cruiser-slip-on-blizzard` — Women's Cruiser Slip OnBlizzard$100 [body]
- `/products/womens-cruiser-slip-on-canvas` — Women's Canvas Cruiser Slip OnWarm White$75 [body]
- `/products/womens-dasher-nz-blizzard` — SHOP WOMEN [body]
- `/products/womens-runner-nz-slip-on` — Women's Runner NZ Slip OnAnthracite$105 [body]
- `/products/womens-runner-nz-slip-on-dark-navy` — Women's Runner NZ Slip OnDark Navy$105 [body]
- `/products/womens-runner-nz-slip-on-mushroom` — Women's Runner NZ Slip OnMushroom$105 [body]
- `/products/womens-tree-runner-nz-medium-grey` — Tree Runner NZ [header]
- `/products/womens-varsity-cruiser-mushroom` — Varsity Cruiser [header]
- `/search` — Search Allbirds [header]
