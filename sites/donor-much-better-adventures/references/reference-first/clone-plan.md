# Clone Plan: donor-much-better-adventures

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: muchbetteradventures.com
Donor URL: https://www.muchbetteradventures.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T09:56:25.888Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 7 (see `references/reference-first/sections/`)
- Assets inventoried: 118 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: __Rubik_c2c3d1, __Rubik_Fallback_c2c3d1, __Domine_8c1962, __Domine_Fallback_8c1962, __Bitter_35a2f3, __Bitter_Fallback_35a2f3
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): rgba(0, 0, 0, 0.87) (797), #ffffff (786), #2a2d2c (295), #a0cc3d (42), #757575 (38), rgba(244, 244, 244, 0.28) (37), #ff5975 (20), #000000 (17), #1d1d1b (13), #418bca (12)
- Heading font: __Rubik_c2c3d1 · Body font: __Rubik_c2c3d1
- Type scale (px, desc): 48, 32, 30, 24, 20, 18, 16, 14, 13, 12, 11, 10

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — (no label) [header]
- `/about` — Our Story [nav]
- `/about/b-corp` — Learn More [footer]
- `/about/book-with-confidence` — Book With Confidence [body]
- `/about/by-departure-month` — By Departure Month [body]
- `/about/content-policy` — Content Policy [nav]
- `/about/much-better-adventures-reviews` — Reviews [body]
- `/about/our-community` — Our Community [body]
- `/about/our-hosts` — Meet Our Hosts [nav]
- `/about/our-team` — Meet the Team [nav]
- `/about/sustainability` — Our Impact [nav]
- `/about/trip-level` — Trip Levels [body]
- `/about/why-adventure-with-us` — Why Travel With Us [body]
- `/explore` — View All Adventures [header]
- `/explore/adventure-challenges-uk` — UK Adventure Challenges [body]
- `/explore/africa` — View All Africa [body]
- `/explore/albania` — Albania [body]
- `/explore/arctic-adventures` — Arctic Adventures [header]
- `/explore/argentina` — Argentina [body]
- `/explore/armenia` — Armenia [body]
- `/explore/asia` — View All Asia [body]
- `/explore/belize` — Belize [body]
- `/explore/best-sellers` — Best Sellers [header]
- `/explore/bhutan` — Bhutan [body]
- `/explore/big-adventures` — Big Adventures [body]
- `/explore/bosnia-and-herzegovina` — Bosnia and Herzegovina [body]
- `/explore/botswana` — Botswana [body]
- `/explore/brazil` — Brazil [body]
- `/explore/cambodia` — Cambodia [body]
- `/explore/canada` — Canada [body]
- `/explore/canyoning` — Canyoning [body]
- `/explore/central-america` — View All Central America [body]
- `/explore/centre-based-trips` — Centre Based Trips [header]
- `/explore/challenging` — Level 5ChallengingBuilt for those who want a big, rewarding physical challenge [body]
- `/explore/challenging-tough` — Level 6Challenging-ToughFor experienced adventurers ready for consistently hard days [body]
- `/explore/chile` — Chile [body]
- `/explore/china` — China [body]
- `/explore/christmas-and-new-year` — Christmas and New Year [header]
- `/explore/colombia` — Colombia [body]
- `/explore/cool-sleeps` — Cool Sleeps [header]
- `/explore/costa-rica` — Costa Rica [body]
- `/explore/croatia` — Croatia [body]
- `/explore/cuba` — Cuba [body]
- `/explore/cycling` — Cycling [body]
- `/explore/desert-and-dunes` — Desert and Dunes [header]
- `/explore/dog-sledding` — Dog Sledding [body]
- `/explore/e-biking` — E-Biking [body]
- `/explore/early-bird-discount` — Early Bird Discounts [body]
- `/explore/easy` — Easy Adventures [body]
- `/explore/easy-moderate` — Level 2Easy-ModeratePerfect for adventurers looking to gently step things up [body]
- `/explore/ecuador` — Ecuador [body]
- `/explore/egypt` — Egypt [body]
- `/explore/epic-weekends` — Epic Weekends [body]
- `/explore/estonia` — Estonia [body]
- `/explore/europe` — View All Europe [body]
- `/explore/everest-base-camp-tours` — Everest Base Camp [body]
- `/explore/expeditions` — Expeditions [header]
- `/explore/finland` — Finland [body]
- `/explore/foodie-adventures` — Foodie Adventures [header]
- `/explore/france` — France [body]
- `/explore/georgia` — Georgia [body]
- `/explore/get-there-by-train` — Get There By Train [header]
- `/explore/ghana` — Ghana [body]
- `/explore/greece` — Greece [body]
- `/explore/greenland` — Greenland [body]
- `/explore/guatemala` — Guatemala [body]
- `/explore/hiking` — Hiking [body]
- `/explore/homestays` — Homestays [header]
- `/explore/hot-springs-saunas` — Saunas and Hot Springs [body]
- `/explore/hut-to-hut-adventures` — Hut to Hut Adventures [header]
- `/explore/iceland` — Iceland [body]
- `/explore/iconic-adventures` — Iconic Adventures [header]
- `/explore/india` — India [body]
- `/explore/indonesia` — Indonesia [body]
- `/explore/island-adventures` — Island Adventures [header]
- `/explore/italy` — Italy [body]
- `/explore/japan` — Japan [body]
- `/explore/jordan` — Jordan [body]
- `/explore/jungle-adventures` — Jungle Adventures [header]
- `/explore/kayaking` — Kayaking [body]
- `/explore/kenya` — Kenya [body]
- `/explore/kilimanjaro` — Mount Kilimanjaro [body]
- `/explore/kosovo` — Kosovo [body]
- `/explore/kyrgyzstan` — Kyrgyzstan [body]
- `/explore/last-minute-departures` — Last Minute Deals [body]
- `/explore/madagascar` — Madagascar [body]
- `/explore/malaysia` — Malaysia [body]
- `/explore/maldives` — Maldives [body]
- `/explore/moderate` — Level 3ModerateFor active people who want to explore more wild and adventurous places [body]
- `/explore/moderate-challenging` — Level 4Moderate-ChallengingCreated for adventurers ready to take on a few longer, more demanding days [body]
- `/explore/mongolia` — Mongolia [body]
- `/explore/montenegro` — Montenegro [body]
- `/explore/morocco` — Morocco [body]
- `/explore/mountain-climbing` — Mountain Climbing [body]
- `/explore/multi-activity` — Multi Activity [body]
- `/explore/namibia` — Namibia [body]
- `/explore/nepal` — Nepal [body]
- `/explore/new-adventures` — New Adventures [header]
- `/explore/new-zealand` — New Zealand [body]
- `/explore/north-america` — View All North America [body]
- `/explore/north-macedonia` — North Macedonia [body]
- `/explore/northern-lights` — Northern Lights [body]
- `/explore/norway` — Norway [body]
- `/explore/oman` — Oman [body]
- `/explore/outdoor-skills` — Outdoor Skills [body]
- `/explore/pakistan` — Pakistan [body]
- `/explore/peaks-over-4000m` — Peaks Over 4000m [header]
- `/explore/peru` — Peru [body]
- `/explore/philippines` — Philippines [body]
- `/explore/poland` — Poland [body]
- `/explore/portugal` — Portugal [body]
- `/explore/premium` — Premium [header]
- `/explore/private-group-adventures` — Private Groups [body]
- `/explore/rafting` — Rafting [body]
- `/explore/reunion` — Réunion [body]
- `/explore/rewilding-adventures` — Rewilding Adventures [header]
- `/explore/rock-climbing` — Rock Climbing [body]
- `/explore/romania` — Romania [body]
- `/explore/rwanda` — Rwanda [body]
- `/explore/sailing` — Sailing [body]
- `/explore/sao-tome-and-principe` — São Tomé and Príncipe [body]
- `/explore/scotland` — Scotland [body]
- `/explore/slovakia` — Slovakia [body]
- `/explore/slovenia` — Slovenia [body]
- `/explore/snorkelling` — Snorkelling [body]
- `/explore/snowshoeing` — Snowshoeing [body]
- `/explore/south-africa` — South Africa [body]
- `/explore/south-america` — View All South America [body]
- `/explore/spain` — Spain [body]
- `/explore/sri-lanka` — Sri Lanka [body]
- `/explore/stand-up-paddleboarding` — Stand Up Paddle [body]
- `/explore/sub-zero` — Sub Zero [header]
- `/explore/surfing` — Surfing [body]
- `/explore/sweden` — Sweden [body]
- `/explore/switzerland` — Switzerland [body]
- `/explore/taiwan` — Taiwan [body]
- `/explore/tajikistan` — Tajikistan [body]
- `/explore/tanzania` — Tanzania [body]
- `/explore/thailand` — Thailand [body]
- `/explore/the-alps` — The Alps [body]
- `/explore/the-balkans` — Balkans [body]
- `/explore/tough` — Level 7ToughThe ultimate test for highly experienced adventurers seeking maximum challenge [body]
- `/explore/tunisia` — Tunisia [body]
- `/explore/turkey` — Turkey [body]
- `/explore/ultimate-adventures` — Ultimate Adventures [header]
- `/explore/united-kingdom` — United Kingdom [body]
- `/explore/united-states` — United States [body]
- `/explore/uzbekistan` — Uzbekistan [body]
- `/explore/vietnam` — Vietnam [body]
- `/explore/volcano-treks` — Volcano Treks [header]
- `/explore/wild-swimming` — Wild Swimming [body]
- `/explore/wild-swims-and-cool-dips` — Wild Swims and Cool Dips [header]
- `/explore/wildlife-watching` — Wildlife Watching [body]
- `/explore/winter-sun` — Winter Sun [header]
- `/explore/yoga` — Yoga [body]
- `/explore/zimbabwe` — Zimbabwe [body]
- `/explorer` — Take me there [body]
- `/giftcards` — Gift Cards [body]
- `/magazine` — Read All Articles... [body]
- `/magazine/features` — Features [body]
- `/magazine/guides` — Guides [body]
- `/magazine/tag/community` — Community Stories [body]
- `/magazine/tag/mountain-mindset` — Mountain Mindset [body]
- `/magazine/tag/packing-prep` — Packing & Prep [body]
- `/magazine/tag/the-tourism-leakage-series` — Tourism Leakage [body]
- `/magazine/tag/trail-setting-stories` — Trail Setting Stories [body]
- `/magazine/tag/travel-better` — Travel Better [body]
- `/magazine/tag/unlocking-adventure` — Unlocking Adventure [body]
- `/magazine/tag/what-i-wish-i-knew` — Travel Tips [body]
- `/products/10003-adventures-trek-the-matterhorn-circuit` — Trek the Matterhorn Circuit in a Weekend3 nights from£1,054£948Level 54.8 (40 reviews) [body]
- `/products/10037-adventures-guatemala-5-volcano-challenge` — Guatemala 5 Volcano Challenge9 nights from£1,718£1,460Level 64.9 (228 reviews) [body]
- `/products/10042-adventures-250km-self-powered-coast-to-coast-expedition-in-costa-rica` — 250km Coast to Coast Expedition through Costa Rica11 nights from£2,803Level 55.0 (221 reviews) [body]
- `/products/10423-adventures-the-3-peaks-challenge-in-morocco` — The 3 Peaks Challenge in Morocco 4 nights from£492£443Level 64.8 (168 reviews) [body]
- `/products/10484-adventures-trek-the-tour-du-mont-blanc-in-a-week` — Trek the Tour du Mont Blanc in a Week6 nights from£1,629£1,548Level 54.8 (71 reviews) [body]
- `/products/10540-adventures-coast-to-coast-traverse-madeira` — Coast to Coast Traverse of Madeira 6 nights from£1,377Level 44.8 (197 reviews) [body]
- `/products/10592-adventures-hike-sup-kayak-montenegro-coast` — SUP, Hike and Kayak Montenegro's Coast5 nights from£1,373£1,304Level 24.8 (68 reviews) [body]
- `/products/10727-adventures-hike-bike-prosecco-hills-italy` — Hike, E-Bike and Wine in Italy's Prosecco Hills5 nights from£1,301Level 24.9 (137 reviews) [body]
- `/products/10767-adventures-trek-choquequirao-to-machu-picchu` — Trek Choquequirao to Machu Picchu11 nights from£1,539£1,385Level 54.9 (17 reviews) [body]
- `/products/10775-adventures-hiking-durmitor-montenegro` — The 3 Peaks Challenge in Montenegro4 nights from£950£855Level 44.8 (38 reviews) [body]
- `/products/10808-adventures-salkantay-machu-picchu-amazon` — Trek to Machu Picchu and Go to the Amazon10 nights from£1,733Level 54.8 (18 reviews) [body]
- `/products/10967-adventures-cycling-tour-northern-vietnam` — Cycle the Highlands of Northern Vietnam9 nights from£1,638Level 54.9 (17 reviews) [body]
- `/products/10995-adventures-sri-lanka-safari-hiking-tour` — Premium: Hike, Safari and Explore in Sri Lanka10 nights from£2,803Level 15.0 (13 reviews) [body]
- `/products/11037-adventures-hike-explore-silk-road-uzbekistan` — Hike and Explore the Silk Road in Uzbekistan9 nights from£1,394Level 35.0 (34 reviews) [body]
- `/products/11098-adventures-greek-islands-sailing-cyclades` — Premium: Sail and Explore Greek Islands in a Week7 nights from£3,251£2,926Level 1 [body]
- `/products/11103-adventures-trekking-pakistan-karakoram-mountains` — Trek the Giants of Pakistan’s Karakoram Mountains14 nights from£2,280Level 5 [body]
- `/products/11139-adventures-cycling-silk-road-uzbekistan` — Cycle the Silk Road in Uzbekistan8 nights from£2,182£1,964Level 4 [body]
- `/products/11141-adventures-cycle-length-wild-taiwan` — Cycle the Length of Wild Taiwan10 nights from£3,679£3,311Level 4 [body]
- `/products/11146-adventures-wildlife-indian-himalaya-snow-leopards` — Track Snow Leopards in the Indian Himalayas10 nights from£2,945£2,651Level 3 [body]
- `/products/11148-adventures-gorilla-wildlife-rwanda` — Wildlife Adventure in Rwanda9 nights from£3,980£3,582Level 2 [body]
- `/products/11158-adventures-argentina-tour-buenos-aires-salta` — The Ultimate Adventure Through Argentina10 nights from£3,725£3,352Level 1 [body]
- `/products/11159-adventures-amalfi-coast-hiking-italy` — Hike and Explore the Amalfi Coast6 nights from£2,040£1,836Level 3 [body]
- `/products/11161-adventures-madeira-hiking-premium` — Premium: Hike the Trails of Madeira5 nights from£2,632£2,369Level 3 [body]
- `/products/11163-adventures-uzbekistan-silk-road-tour` — Premium: The Ultimate Adventure Through Uzbekistan10 nights from£2,894£2,605Level 1 [body]
- `/products/11165-adventures-rajasthan-golden-triangle-premium` — Premium: The Ultimate Adventure Through Rajasthan11 nights from£2,728£2,455Level 1 [body]
- `/products/8226-adventures-hike-kayak-and-wild-camp-the-norwegian-fjords` — Hike, Kayak and Wild Camp the Norwegian Fjords in a Weekend3 nights from£738Level 44.9 (1256 reviews) [body]
- `/products/8665-adventures-trek-the-tour-du-mont-blanc-in-a-long-weekend` — Trek the Tour du Mont Blanc in a Weekend: The Hut-to-Hut Edition3 nights from£915Level 54.9 (319 reviews) [body]
- `/products/8798-adventures-hiking-bear-watching-romania` — Hiking and Bear Watching in Romania3 nights from£758£683Level 14.8 (214 reviews) [body]
- `/products/8801-adventures-snowdon-challenge` — The Snowdon Challenge1 nights from£304£274Level 44.8 (216 reviews) [body]
- `/products/8914-adventures-sup-hike-and-paraglide-in-slovenia` — SUP, Hike and Paraglide in Slovenia3 nights from£915£824Level 24.8 (92 reviews) [body]
- `/wishlist` — (no label) [header]
