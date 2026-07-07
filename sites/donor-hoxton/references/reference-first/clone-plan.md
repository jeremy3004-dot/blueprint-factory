# Clone Plan: donor-hoxton

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: thehoxton.com
Donor URL: https://thehoxton.com

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

> Suggested (VERIFY, then write a real Decision: line above): TypeScript + Next.js App Router + React + Tailwind, plus the donor's detected motion stack (Swiper) or the smallest equivalent.
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

Auto-drafted by `blueprint capture` on 2026-07-07T16:21:27.544Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 7 (see `references/reference-first/sections/`)
- Assets inventoried: 57 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: GT America Thin, GT America Light, GT America Regular, GT America Medium, GT America Extended, GT America Extended Regular, Tiempos Fine Light, Tiempos Fine Regular, Tiempos Fine Bold, Tiempos Fine Italic, Tiempos Fine Light Italic
- Animation libraries: Swiper
- Dominant colors (by frequency): #3e3a37 (2224), #000000 (1569), #fef2e3 (110), #ffffff (86), #9e9e9e (72), rgba(16, 16, 16, 0.3) (33), rgba(239, 239, 239, 0.3) (33), #fef9f3 (19), #7f2006 (10), #0000ee (8)
- Heading font: GT America Extended Regular · Body font: GT America Light
- Type scale (px, desc): 80, 24, 18, 17, 16, 14, 13, 12, 10, 9

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — The Hoxton Logo [header]
- `/about-us` — Our Story [footer]
- `/accessibility` — Accessibility [footer]
- `/amsterdam` — View all Amsterdam properties [header]
- `/amsterdam-lloyd/get-hitched` — Weddings [header]
- `/amsterdam/herengracht` — Amsterdam, Herengracht (Central) [header]
- `/amsterdam/herengracht/lottis-restaurant` — Restaurants & Bars [header]
- `/amsterdam/herengracht/meeting-spaces` — Meeting Spaces [header]
- `/amsterdam/herengracht/parties-and-celebrations` — Parties & Celebrations [header]
- `/amsterdam/herengracht/private-dining` — Private Dining [header]
- `/amsterdam/herengracht/rooms` — Bedrooms [header]
- `/amsterdam/lloyd` — Amsterdam, Lloyd (Eastern Docklands) [header]
- `/amsterdam/lloyd/barbue-restaurant` — Barbue [header]
- `/amsterdam/lloyd/meeting-spaces` — Meeting Spaces [header]
- `/amsterdam/lloyd/parties-and-celebrations` — Parties & Celebrations [header]
- `/amsterdam/lloyd/rooms` — Bedrooms [header]
- `/bengaluru-city` — India [header]
- `/brussels` — Brussels [header]
- `/brussels/cantina-valentina` — Cantina Valentina [header]
- `/brussels/meeting-spaces` — The Apartment [header]
- `/brussels/parties-and-celebrations` — Parties & Celebrations [header]
- `/brussels/private-dining` — The Loft [header]
- `/brussels/rooms` — Bedrooms [header]
- `/brussels/tope-restaurant` — Tope [header]
- `/charlottenburg` — Berlin, Charlottenburg [header]
- `/charlottenburg/meeting-spaces` — Meeting Spaces [header]
- `/charlottenburg/parties-and-celebrations` — Parties & Celebrations [header]
- `/charlottenburg/private-dining` — Private Dining [header]
- `/charlottenburg/rooms` — Bedrooms [header]
- `/charlottenburg/the-wintergarden` — Restaurants & Bars [header]
- `/chicago` — Chicago, Fulton Market [header]
- `/chicago/cabra-restaurant` — Cabra [header]
- `/chicago/cira-restaurant` — Cira [header]
- `/chicago/lazy-bird-bar` — Lazy Bird [header]
- `/chicago/meeting-spaces` — Meeting Spaces [header]
- `/chicago/parties-and-celebrations` — Parties & Celebrations [header]
- `/chicago/pool` — Pool [header]
- `/chicago/private-dining` — Private Dining [header]
- `/chicago/rooms` — Bedrooms [header]
- `/contact` — Contact [footer]
- `/de` — Deutsch [header]
- `/downtown-la` — Los Angeles, Downtown [header]
- `/downtown-la/inanna` — Inanna Bar [header]
- `/downtown-la/meeting-spaces` — Meeting Spaces [header]
- `/downtown-la/moonlarks-dinette` — Moonlark's Dinette [header]
- `/downtown-la/parties-and-celebrations` — Parties & Celebrations [header]
- `/downtown-la/pool` — Pool [header]
- `/downtown-la/private-dining` — Private Dining [header]
- `/downtown-la/rooms` — Bedrooms [header]
- `/dublin` — Dublin [header]
- `/dublin/cantina-valentina` — Cantina Valentina [header]
- `/dublin/dollars` — Dollars [header]
- `/dublin/get-hitched` — Weddings [header]
- `/dublin/library-bar` — The Library Bar [header]
- `/dublin/meeting-spaces` — Meeting Spaces [header]
- `/dublin/private-dining` — Private Dining [header]
- `/dublin/rooms` — Bedrooms [header]
- `/dublin/the-lobby-bar` — The Lobby Bar [header]
- `/edinburgh` — Edinburgh [header]
- `/edinburgh-get-hitched` — Weddings [header]
- `/edinburgh/house` — House [header]
- `/edinburgh/meeting-spaces` — Meetings & Celebrations [header]
- `/edinburgh/patatino` — Patatino [header]
- `/edinburgh/rooms` — Bedrooms [header]
- `/edinburgh/the-get-together` — The Get Together [header]
- `/enquiry-form/meetings-and-celebrations` — Meetings & Celebrations [footer]
- `/enquiry-form/patatino-group-booking` — Group Bookings [header]
- `/es` — Español [header]
- `/eu` — Europe [header]
- `/faqs` — FAQs [header]
- `/flexible-travel` — Travel uncertain? We’ve got you with flexible cancellation [header]
- `/florence/meeting-spaces` — Meeting Spaces [header]
- `/fr` — Français [header]
- `/hox-hounds` — Read more [body]
- `/hox-kids` — Learn more [body]
- `/it` — Italiano [header]
- `/italy` — View all Italy properties [header]
- `/italy/florence` — Florence [header]
- `/italy/florence/alassio-restaurant` — Alassio [header]
- `/italy/florence/enoteca-violetta-bar` — Enoteca Violetta [header]
- `/italy/florence/get-hitched` — Weddings [header]
- `/italy/florence/house` — House [header]
- `/italy/florence/rooms` — Bedrooms [header]
- `/italy/rome` — Rome [header]
- `/italy/rome/cugino-restaurant` — Cugino [header]
- `/italy/rome/elio-restaurant` — Elio [header]
- `/italy/rome/get-hitched` — Weddings [header]
- `/italy/rome/meeting-spaces` — Meeting Spaces [header]
- `/italy/rome/parties-and-celebrations` — Parties & Celebrations [header]
- `/italy/rome/private-dining` — Private Dining [header]
- `/italy/rome/rooms` — Bedrooms [header]
- `/london` — View all London properties [header]
- `/london/holborn` — London, Holborn [header]
- `/london/holborn/get-hitched` — Weddings [header]
- `/london/holborn/meeting-spaces` — Meeting Spaces [header]
- `/london/holborn/parties-and-celebrations` — Parties & Celebrations [header]
- `/london/holborn/private-dining` — Private Dining [header]
- `/london/holborn/rondo-restaurant` — Rondo [header]
- `/london/holborn/rooms` — Bedrooms [header]
- `/london/shepherds-bush` — London, Shepherd's Bush [header]
- `/london/shepherds-bush/chets-restaurant` — Restaurants & Bars [header]
- `/london/shepherds-bush/get-hitched` — Weddings [header]
- `/london/shepherds-bush/meeting-spaces` — Meetings Spaces [header]
- `/london/shepherds-bush/parties-and-celebrations` — Parties & Celebrations [header]
- `/london/shepherds-bush/private-dining` — Private Dining [header]
- `/london/shepherds-bush/rooms` — Bedrooms [header]
- `/london/shoreditch` — London, Shoreditch [header]
- `/london/shoreditch/get-hitched` — Weddings [header]
- `/london/shoreditch/il-bambini-club` — Il Bambini Club [header]
- `/london/shoreditch/llama-inn-restaurant` — Llama Inn [header]
- `/london/shoreditch/meeting-spaces` — Meeting Spaces [header]
- `/london/shoreditch/parties-and-celebrations` — Parties & Celebrations [header]
- `/london/shoreditch/private-dining` — Private Dining [header]
- `/london/shoreditch/rooms` — Bedrooms [header]
- `/london/southwark` — London, Southwark [header]
- `/london/southwark/albie-restaurant` — Albie [header]
- `/london/southwark/get-hitched` — Weddings [header]
- `/london/southwark/meeting-spaces` — Meeting Spaces [header]
- `/london/southwark/parties-and-celebrations` — Parties & Celebrations [header]
- `/london/southwark/private-dining` — Private Dining [header]
- `/london/southwark/rooms` — Bedrooms [header]
- `/london/southwark/seabird-restaurant` — Seabird [header]
- `/meetings-and-events` — Meetings & Events [header]
- `/mention-me` — Give your pals a great feeling with 15% off their first Hox stay. INVITE NOW [header]
- `/nl` — Nederlands [header]
- `/offers` — Global Offers [header]
- `/offers/beat-boring-with-dis-loyalty` — Join Dis-loyalty [header]
- `/offers/book-via-thehoxton-com` — View Offer [body]
- `/paris` — Paris [header]
- `/paris/jacques-bar` — Jacques' Bar [header]
- `/paris/meeting-spaces` — Meeting Spaces [header]
- `/paris/parties-and-celebrations` — Parties & Celebrations [header]
- `/paris/planche-wine-bar` — Planche [header]
- `/paris/pool` — Pool [header]
- `/paris/private-dining` — Private Dining [header]
- `/paris/rivie-restaurant` — Rivié [header]
- `/paris/rooms` — Bedrooms [header]
- `/poblenou` — Barcelona, Poblenou [header]
- `/poblenou/four-corners-restaurant` — Four Corners [header]
- `/poblenou/meeting-spaces` — Meeting Spaces [header]
- `/poblenou/parties-and-celebrations` — Parties & Celebrations [header]
- `/poblenou/pool` — Pool [header]
- `/poblenou/private-dining` — Private Dining [header]
- `/poblenou/rooms` — Bedrooms [header]
- `/poblenou/tope-restaurant` — Tope [header]
- `/portland` — Portland, Oregon [header]
- `/portland/2nw5-basement-bar` — 2NW5 [header]
- `/portland/lovely-rita-restaurant` — Deadstock Coffee [header]
- `/portland/meeting-spaces` — Meeting Spaces [header]
- `/portland/pamana` — Pamana [header]
- `/portland/parties-and-celebrations` — Parties & Celebrations [header]
- `/portland/private-dining` — Private Dining [header]
- `/portland/rooms` — Bedrooms [header]
- `/portland/tope-restaurant` — Tope [header]
- `/privacy-policy` — Terms & Policies [footer]
- `/see-all-hotels` — See all Hotels [header]
- `/summer-city-break-itinerary` — Summer City Breaks [header]
- `/the-good-stuff` — The Good Stuff [footer]
- `/the-localist` — Blog [header]
- `/tv-and-film-production` — TV & Film Production [header]
- `/uk` — UK & Ireland [header]
- `/us` — USA [header]
- `/vienna` — Vienna [header]
- `/vienna/bouvier-restaurant` — Bouvier [header]
- `/vienna/cayo-coco-rooftop-bar` — Cayo Coco [header]
- `/vienna/meeting-spaces` — Meetings & Celebrations [header]
- `/vienna/pool` — Pool [header]
- `/vienna/rooms` — Bedrooms [header]
- `/vienna/salon-paradise-cocktail-bar` — Salon Paradise [header]
- `/vienna/the-apartment` — The Apartment [header]
- `/vienna/the-auditorium` — The Auditorium [header]
- `/whats-on` — What’s On [header]
- `/why-stay-at-the-hoxton-hotels` — Why Book With Us? [header]
- `/williamsburg` — New York, Williamsburg [header]
- `/williamsburg/jaffa-bar` — Jaffa Cocktail and Raw Bar [header]
- `/williamsburg/kfar-restaurant` — K'Far [header]
- `/williamsburg/laser-wolf-restaurant` — Laser Wolf [header]
- `/williamsburg/meeting-spaces` — Meeting Spaces [header]
- `/williamsburg/parties-and-celebrations` — Parties & Celebrations [header]
- `/williamsburg/private-dining` — Private Dining [header]
- `/williamsburg/rooms` — Bedrooms [header]
