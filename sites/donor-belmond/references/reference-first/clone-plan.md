# Clone Plan: donor-belmond

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: belmond.com
Donor URL: https://www.belmond.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T09:59:28.753Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 5 (see `references/reference-first/sections/`)
- Assets inventoried: 62 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Montserrat, Theano Didot, Beyond Infinity
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #000000 (1656), #ffffff (115), #757575 (46), #696969 (34), #2e2e2e (14), #555555 (11), #464646 (8), #a9a9a9 (8), #d0011b (7), #f4f4f4 (5)
- Heading font: Montserrat · Body font: Montserrat
- Type scale (px, desc): 60, 50, 40, 32, 26, 22, 16, 15, 14, 13, 12, 11

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Belmond [header]
- `/about` — About Belmond [footer]
- `/boats/europe/france/les-bateaux-belmond` — France - Les Bateaux Belmond [header]
- `/boats/europe/france/les-bateaux-belmond/marguerite` — Discover Marguerite [body]
- `/contact-us` — Contact Us [header]
- `/corporate-social-responsibility` — Environmental, social and governance [footer]
- `/destinations` — Destinations [header]
- `/development` — Development [footer]
- `/digital-accessibility-statement` — Digital accessibility statement and plan [footer]
- `/discover-a-new-pace-of-travel` — Learn more [body]
- `/experiences` — Experiences [header]
- `/gift-cards` — Gift cards [header]
- `/hotels/africa/south-africa/cape-town/belmond-mount-nelson-hotel` — South Africa, Cape Town - Mount Nelson [header]
- `/hotels/asia/bali/belmond-jimbaran-puri` — Indonesia, Bali - Jimbaran Puri [header]
- `/hotels/europe/italy/amalfi-coast/belmond-hotel-caruso` — Italy, Amalfi Coast - Caruso [header]
- `/hotels/europe/italy/amalfi-coast/belmond-hotel-caruso/offers` — Take me there [body]
- `/hotels/europe/italy/amalfi-coast/belmond-villa-margherita` — Italy, Amalfi Coast - Villa Margherita [header]
- `/hotels/europe/italy/costa-smeralda/belmond-romazzino` — Italy, Costa Smeralda - Romazzino [header]
- `/hotels/europe/italy/florence/belmond-villa-san-michele` — Italy, Florence - Villa San Michele [header]
- `/hotels/europe/italy/portofino/belmond-hotel-splendido` — Italy, Portofino - Splendido [header]
- `/hotels/europe/italy/portofino/belmond-splendido-mare` — Italy, Portofino - Splendido Mare [header]
- `/hotels/europe/italy/taormina/belmond-grand-hotel-timeo` — Italy, Taormina - Grand Hotel Timeo [header]
- `/hotels/europe/italy/taormina/belmond-villa-sant-andrea` — Italy, Taormina Mare - Villa Sant'Andrea [header]
- `/hotels/europe/italy/tuscany/belmond-castello-di-casole` — Italy, Tuscany - Castello di Casole [header]
- `/hotels/europe/italy/tuscany/belmond-castello-di-casole/offers` — Take me there [body]
- `/hotels/europe/italy/venice/belmond-hotel-cipriani` — Italy, Venice - Hotel Cipriani [header]
- `/hotels/europe/mallorca/deia/belmond-la-residencia` — Spain, Mallorca - La Residencia [header]
- `/hotels/europe/portugal/madeira/belmond-reids-palace` — Portugal, Madeira - Reid's Palace [header]
- `/hotels/europe/uk/london/belmond-cadogan-hotel` — UK, London - The Cadogan [header]
- `/hotels/europe/uk/oxfordshire/belmond-le-manoir-aux-quat-saisons` — UK, Oxfordshire - Le Manoir aux Quat’Saisons [header]
- `/hotels/north-america/caribbean/anguilla/belmond-cap-juluca` — Caribbean, Anguilla - Cap Juluca [header]
- `/hotels/north-america/caribbean/st-martin/belmond-la-samanna` — Caribbean, St Martin - La Samanna [header]
- `/hotels/north-america/mexico/riviera-maya/belmond-maroma-resort-and-spa` — Mexico, Riviera Maya - Maroma [header]
- `/hotels/north-america/mexico/riviera-maya/belmond-maroma-resort-and-spa/offers` — Take me there [body]
- `/hotels/north-america/mexico/san-miguel-de-allende/belmond-casa-de-sierra-nevada` — Mexico, San Miguel de Allende - Casa de Sierra Nevada [header]
- `/hotels/south-america/brazil/iguassu-falls/belmond-hotel-das-cataratas` — Brazil, Iguassu Falls - Hotel das Cataratas [header]
- `/hotels/south-america/brazil/rio-de-janeiro/belmond-copacabana-palace` — Brazil, Rio de Janeiro - Copacabana Palace [header]
- `/hotels/south-america/peru/colca-canyon/belmond-las-casitas` — Peru, Colca Canyon - Las Casitas [header]
- `/hotels/south-america/peru/cusco/belmond-hotel-monasterio` — Peru, Cusco - Monasterio [header]
- `/hotels/south-america/peru/cusco/belmond-palacio-nazarenas` — Peru, Cusco - Palacio Nazarenas [header]
- `/hotels/south-america/peru/lima/belmond-miraflores-park` — Peru, Lima - Miraflores Park [header]
- `/hotels/south-america/peru/machu-picchu/belmond-sanctuary-lodge` — Peru, Machu Picchu - Sanctuary Lodge [header]
- `/hotels/south-america/peru/sacred-valley/belmond-hotel-rio-sagrado` — Peru, Sacred Valley - Rio Sagrado [header]
- `/legal/cookies-policy` — Cookie policy [footer]
- `/legal/terms-and-conditions` — T&Cs [header]
- `/occasions` — Occasions [header]
- `/offers` — Offers [header]
- `/packages-and-tours` — Packages & Tours [header]
- `/privacy-policy` — Privacy Policy [header]
- `/restaurants/europe/italy/florence/ristorante-la-loggia` — Italy, Florence - Ristorante La Loggia [header]
- `/restaurants/europe/uk/london/the-lalee` — UK, London - The Lalee [header]
- `/rvb-books` — View the collection [body]
- `/safaris` — Botswana, Belmond Safaris [header]
- `/safaris/africa/botswana/belmond-eagle-island-lodge` — Botswana, Okavango Delta - Eagle Island Lodge [header]
- `/safaris/africa/botswana/belmond-savute-elephant-lodge` — Botswana, Chobe National Park - Savute Elephant Lodge [header]
- `/signature-suites-and-villas` — Signature Suites & Villas [header]
- `/stories` — Stories [header]
- `/stories/celia-baz-luhrmann-catherine-martin` — READ THE STORY [body]
- `/trains/asia/eastern-and-oriental-express` — Southeast Asia - Eastern & Oriental Express [header]
- `/trains/europe/scotland/belmond-royal-scotsman` — UK, Scotland - Royal Scotsman [header]
- `/trains/europe/uk/belmond-british-pullman` — UK, England - British Pullman [header]
- `/trains/europe/uk/belmond-british-pullman/celia` — Discover and Book Celia [body]
- `/trains/europe/uk/britannic-explorer` — UK, England - Britannic Explorer [header]
- `/trains/europe/venice-simplon-orient-express` — Europe - Venice Simplon-Orient-Express [header]
- `/trains/south-america/peru/belmond-andean-explorer` — Peru - Andean Explorer [header]
- `/trains/south-america/peru/belmond-hiram-bingham` — Peru - Hiram Bingham [header]
