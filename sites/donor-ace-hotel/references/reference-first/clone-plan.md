# Clone Plan: donor-ace-hotel

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: acehotel.com
Donor URL: https://acehotel.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T16:23:17.298Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 7 (see `references/reference-first/sections/`)
- Assets inventoried: 78 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Bianco Sans, Interstate, Tiempos Headline, Toronto Gothic, Mabry Pro, Bianco Sans Fallback, Toronto Gothic Fallback, Tiempos Headline Fallback
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #231f20 (978), #ffffff (769), #000000 (470), #393939 (188), #212121 (91), rgba(57, 57, 57, 0.1) (76), rgba(57, 57, 57, 0.3) (64), #999999 (44), #3f403b (26), #24201f (21)
- Heading font: Toronto Gothic · Body font: Bianco Sans
- Type scale (px, desc): 140, 70, 64, 30, 28, 26, 24, 22, 20, 18, 16, 14

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Reload Homepage [header]
- `/a-list` — A-List [header]
- `/accessibility` — Accessibility [header]
- `/ace-radio` — Ace Radio [header]
- `/artist-in-residence` — Artist In Residence [header]
- `/athens` — Athens [header]
- `/blog` — View Ace Reader View Ace Reader [body]
- `/brooklyn` — Brooklyn [header]
- `/careers` — Careers [header]
- `/contact` — Contact [header]
- `/eat-drink` — Eat + Drink [header]
- `/editorial` — Ace Reader [header]
- `/editorial/5-things-with-elise-peterson` — 5 THINGS WITH ELISE PETERSON [body]
- `/editorial/5-things-with-saturdays-football` — 5 Things with Saturdays Football [body]
- `/editorial/a-swim-club-summer` — A Swim Club Summer [body]
- `/editorial/an-endless-art-practice` — An Endless Art Practice [body]
- `/editorial/archiving-australia-with-efficient-space` — Archiving Australia with Efficient Space [body]
- `/editorial/ballroom-5-things-with-function` — Ballroom: 5 Things with Function [body]
- `/editorial/corey-wash-walks-on-the-sunny-side` — Corey Wash Walks on the “Sunny Side” [body]
- `/editorial/fantasma-paraiso-phantom-paradise` — Fantasma Paraiso / Phantom Paradise [body]
- `/editorial/five-things-with-missy-mazzoli` — FIVE THINGS WITH MISSY MAZZOLI [body]
- `/editorial/flo-dills-guide-to-sydney` — Flo Dill’s Guide to Sydney [body]
- `/editorial/for-the-culture-klancy-miller` — For the Culture: Klancy Miller [body]
- `/editorial/fran-millers-toronto-guide` — Fran Miller’s Toronto Guide [body]
- `/editorial/greek-visions-finds-meaning-in-incoherence` — Greek Visions Finds Meaning in Incoherence [body]
- `/editorial/latasha-moves-differently-in-the-desert` — Latashá Moves Differently in the Desert [body]
- `/editorial/packing-list-madison-cunningham` — Packing List: Madison Cunningham [body]
- `/editorial/packing-list-mei-semones` — Packing List: Mei Semones [body]
- `/editorial/paris-quixotic-projects-arrives-in-athens` — Paris’ Quixotic Projects Arrives in Athens [body]
- `/editorial/perfectly-imperfect-x-ace-hotel-the-locals-guide-to-brooklyn` — Perfectly Imperfect x Ace Hotel: The Local’s Guide to Brooklyn [body]
- `/editorial/portraits-of-queer-living-5-things-with-quan-thai` — PORTRAITS OF QUEER LIVING: 5 THINGS WITH QUAN THAI [body]
- `/editorial/sister-act` — Sister Act [body]
- `/editorial/soy-sauce-is-like-a-fine-wine` — Soy Sauce, Like a Fine Wine [body]
- `/editorial/stones-throws-sonic-guide-to-kyoto` — Stones Throw’s Sonic Guide to Kyoto [body]
- `/editorial/the-mister-behind-mr-maurices-italian` — The Mister Behind Mr. Maurice’s Italian [body]
- `/editorial/tv-on-the-radio-talk-brooklyn` — TV on the Radio Talk Brooklyn [body]
- `/editorial/willem-verbeecks-perfect-new-york-day` — Willem Verbeeck’s Perfect New York Day [body]
- `/faqs` — FAQs [header]
- `/going-on/friday-nights-alright-djs-and-live-music-in-the-amigo-room-41` — Read More [body]
- `/going-on/late-check-out-11` — Read More [body]
- `/going-on/lets-bingo-again-30` — Read More [body]
- `/going-on/lets-bingo-again-tuesdays-7-10-pm-16` — Read More [body]
- `/going-on/levis-fc-watch-party-5` — Read More [body]
- `/going-on/live-in-the-lobby-fridays-2-5-pm-26` — Read More [body]
- `/going-on/live-soccer-watch-party-5` — Read More [body]
- `/going-on/lobby-radio-3` — Read More [body]
- `/going-on/may-the-force-be-with-you-major-force-productions-x-conners-sewing-factory%ef%b8%8f` — Read More [body]
- `/going-on/mic-drop-karaoke-with-kyle-43` — Read More [body]
- `/going-on/mintserf-installation-launch-event` — Read More [body]
- `/going-on/poolside-pitch-soccer-watch-parties-14` — Read More [body]
- `/going-on/poolside-with-caelina-3` — Read More [body]
- `/going-on/poolside-with-niclas-gillich-4` — Read More [body]
- `/going-on/que-rico-8` — Read More [body]
- `/going-on/record-shop-rare-groove-special-dj-showcase-ryu-2` — Read More [body]
- `/going-on/saturday-night-ace-hope-4` — Read More [body]
- `/going-on/saturday-soundcheck-in-the-amigo-room-8-11-pm-37` — Read More [body]
- `/going-on/sound-waves-summer-dj-series-7` — Read More [body]
- `/going-on/sounds-of-stms-10` — Read More [body]
- `/going-on/sunset-series-afterparty-2` — Read More [body]
- `/going-on/sunset-series-kaz-james` — Read More [body]
- `/going-on/taco-tuesday-212` — Read More [body]
- `/going-on/tarot-readings-at-the-amigo-room-68` — Read More [body]
- `/going-on/vintage-vinyl-thursdays-41` — Read More [body]
- `/going-on/vintage-vinyl-w-dj-dusty-2` — Read More [body]
- `/going-on/yoga-marina-triantou-from-hobnob-16` — Read More [body]
- `/goings-on` — Goings on [header]
- `/kyoto` — Kyoto [header]
- `/new-york` — New York [header]
- `/offer-redirect` — Book Now This link opens in a new browser tab [body]
- `/offers` — Offers [header]
- `/offers/book-direct` — Ace Member Rate [body]
- `/offers/get-extra-credit` — Get extra credit [body]
- `/offers/hat-trick` — HAT TRICK [body]
- `/offers/make-it-last` — Make it Last [body]
- `/offers/pay-now-and-save` — Pay Now and Save [body]
- `/offers/week-daze` — Week Daze [body]
- `/palm-springs` — Palm Springs [header]
- `/pet-friendly` — Pet Friendly Hotels [header]
- `/press-inquiries` — Press Inquiries [header]
- `/privacy-policy` — Privacy Policy [header]
- `/seattle` — Seattle [header]
- `/sydney` — Sydney [header]
- `/toronto` — Toronto [header]
- `/weddings-at-ace` — Weddings [header]
