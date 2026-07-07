# Clone Plan: donor-aman

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: aman.com
Donor URL: https://www.aman.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T09:58:00.848Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 8 (see `references/reference-first/sections/`)
- Assets inventoried: 15 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Calligraph810, NotoSerifJP, NotoSerifSC, WhitneyBook, SuisseBP, Beausite, Lyon, Lyon Display Web, Lyon Text Web, WhitneySSm, Source Code Pro, Spectral
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #313131 (1053), #585858 (155), #000000 (70), #ffffff (49), #404040 (40), #555555 (15), #fdf9f5 (10), #696969 (9), #f3eee7 (5), #468254 (3)
- Heading font: Lyon Text Web · Body font: WhitneySSm
- Type scale (px, desc): 31, 24, 20, 19, 16, 15, 14, 13, 12, 11, 10

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Aman resorts [header]
- `/about-us` — - Aman [nav]
- `/active-adventure` — Active Adventure [header]
- `/aman-beverly-hills` — Aman Beverly HillsBeverly Hills – Opening 2027 [header]
- `/aman-group` — Aman Group [nav]
- `/aman-interiors` — - Aman Interiors [nav]
- `/aman-maldives` — Aman MaldivesRepublic of Maldives [header]
- `/aman-spa-connaught` — Aman Spa at The ConnaughtLondon [header]
- `/aman-yachts` — Yachts [header]
- `/amancaya` — AmancayaExuma, The Bahamas, Coming soon [header]
- `/amandira` — Amandira, Indonesia [nav]
- `/book/aman` — Reserve [header]
- `/celebrations-events` — Celebrations & Events [header]
- `/contact-us` — Contact us [header]
- `/cookie-policy` — Cookie Policy [nav]
- `/culture` — Culture [header]
- `/destinations` — Destinations [header]
- `/destinations/country/asia` — View all [header]
- `/destinations/country/china` — View all [header]
- `/destinations/country/europe-middle-east-north-africa` — View All [header]
- `/destinations/country/india` — View All [header]
- `/destinations/country/indonesia` — View All [header]
- `/destinations/country/italy` — View All [header]
- `/destinations/country/japan` — View all [header]
- `/destinations/country/sri-lanka` — View All [header]
- `/destinations/country/thailand` — View All [header]
- `/destinations/country/usa-caribbean` — View All [header]
- `/digital-accessibility` — Digital Accessibility [nav]
- `/dining` — Dining [header]
- `/dining/arva` — Arva [header]
- `/dining/culinary-experiences` — Culinary Experiences [header]
- `/dining/nama` — Nama [header]
- `/dining/nura` — Nura [header]
- `/exclusive-offers` — Exclusive Offers [header]
- `/hotels/aman-miami-beach` — Aman Miami BeachMiami Beach - Opening 2027 [header]
- `/hotels/aman-nai-lert-bangkok` — Aman Nai Lert BangkokBangkok, Thailand [header]
- `/hotels/aman-new-york` — Aman New YorkNew York, USA [header]
- `/hotels/aman-tokyo` — Aman TokyoTokyo, Japan [header]
- `/hotels/aman-tokyo/residences` — Aman Residences, Tokyo, Japan [nav]
- `/hotels/aman-venice` — Aman VeniceVenice, Italy [header]
- `/interiors` — Aman Interiors [header]
- `/into-the-wilderness` — <picture decoding="async" class="aman-responsive-image--square" loading="lazy" width="366" height="366"><source srcset="/sites/default/files/styles/listing_teaser_extra_large/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=ZM0UlVDQ 1x, /sites/default/files/styles/listing_teaser_extra_large_2x/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=KztBtuUD 2x" media="all and (min-width: 1240px)" type="image/webp" width="697" height="697"><source srcset="/sites/default/files/styles/listing_teaser_large/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=holpbA7e 1x, /sites/default/files/styles/listing_teaser_large_2x/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=6erR5N-_ 2x" media="all and (min-width: 1024px)" type="image/webp" width="600" height="600"><source srcset="/sites/default/files/styles/listing_teaser_medium/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=JrU0UToZ 1x, /sites/default/files/styles/listing_teaser_medium_2x/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=rtaBL1lb 2x" media="all and (min-width: 767px) and (max-width: 1023px)" type="image/webp" width="463" height="463"><source srcset="/sites/default/files/styles/listing_teaser_plus/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=v4-JI4r9 1x, /sites/default/files/styles/listing_teaser_plus_2x/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=VcaHL4NT 2x" media="all and (min-width: 413px) and (max-width: 766px)" type="image/webp" width="431" height="431"><source srcset="/sites/default/files/styles/listing_teaser_small/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=xtTFUCU0 1x, /sites/default/files/styles/listing_teaser_small_2x/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=Xb_ijZKG 2x" type="image/webp" width="366" height="366"><img decoding="async" class="media__element" loading="lazy" width="366" height="366" src="/sites/default/files/styles/listing_teaser_small/public/2024-06/aman-i-khas_india_-_spa_exterior.webp?itok=xtTFUCU0" alt="Spa exterior at Aman-i-Khas at dusk, with illuminated canvas pavilion beneath a large tree."></picture> Nature To the Wilds [body]
- `/journeys` — Experiences [header]
- `/journeys/jet-expeditions` — Jet Expeditions [header]
- `/leadership` — Leadership [nav]
- `/legal-notice` — Legal Notice [nav]
- `/new-developments` — Forthcoming Developments [nav]
- `/privacy-notice` — Privacy Notice [nav]
- `/residences` — Residences [header]
- `/resorts/aman-dubai` — Aman DubaiDubai, United Arab Emirates, Coming Soon [header]
- `/resorts/aman-dubai/uae` — View All [header]
- `/resorts/aman-i-khas` — Aman-i-KhasRanthambore, India [header]
- `/resorts/aman-karingani` — Aman KaringaniMozambique, Coming Soon [header]
- `/resorts/aman-kyoto` — Aman KyotoKyoto, Japan [header]
- `/resorts/aman-le-melezin` — Aman Le MélézinCourchevel 1850 [header]
- `/resorts/aman-niseko` — Aman NisekoHokkaido – Opening 2030 [header]
- `/resorts/aman-rosa-alpina` — Aman Rosa AlpinaDolomites, Italy [header]
- `/resorts/aman-singapore` — Aman Singapore [header]
- `/resorts/aman-sveti-stefan` — Aman Sveti StefanSveti Stefan [header]
- `/resorts/amanbagh` — AmanbaghRajasthan, India [header]
- `/resorts/amandari` — AmandariUbud, Bali [header]
- `/resorts/amandayan` — AmandayanLijiang, China [header]
- `/resorts/amanemu` — AmanemuIse-Shima, Japan [header]
- `/resorts/amanera` — AmaneraPlaya Grande, Dominican Republic [header]
- `/resorts/amanfayun` — AmanfayunHangzhou, China [header]
- `/resorts/amangalla` — AmangallaGalle, Sri Lanka [header]
- `/resorts/amangani` — AmanganiJackson Hole, USA, Reopening soon [header]
- `/resorts/amangiri` — AmangiriCanyon Point, Utah, USA [header]
- `/resorts/amanjena` — AmanjenaMarrakech [header]
- `/resorts/amanjiwo` — AmanjiwoJava, Indonesia [header]
- `/resorts/amankila` — AmankilaManggis, Bali [header]
- `/resorts/amankora` — AmankoraParo [header]
- `/resorts/amanoi` — AmanoiKhanh Hoa, Vietnam [header]
- `/resorts/amanpulo` — AmanpuloPalawan, The Philippines [header]
- `/resorts/amanpuri` — AmanpuriPhuket, Thailand [header]
- `/resorts/amanruya` — AmanruyaBodrum, Turkey [header]
- `/resorts/amansamar` — AmansamarKingdom of Saudi Arabia, Coming Soon [header]
- `/resorts/amansamar/kingdom-of-saudi-arabia` — View All [header]
- `/resorts/amansanu` — AmansanuTEXAS HILL COUNTRY, USA, COMING SOON [header]
- `/resorts/amansara` — AmansaraSiem Reap [header]
- `/resorts/amantaka` — AmantakaLuang Prabang [header]
- `/resorts/amanvari` — AmanvariEast Cape, Mexico [header]
- `/resorts/amanwana` — AmanwanaMoyo Island, Indonesia [header]
- `/resorts/amanwella` — AmanwellaTangalle, Sri Lanka [header]
- `/resorts/amanyangyun` — AmanyangyunShanghai, China [header]
- `/resorts/amanyara` — AmanyaraProvidenciales, Turks and Caicos [header]
- `/resorts/amanzoe` — AmanzoePorto Heli, Greece [header]
- `/stories/an-amanzoe-exhibition` — <picture decoding="async" class="aman-responsive-image--square" loading="lazy" width="366" height="366"><source srcset="/sites/default/files/styles/listing_teaser_extra_large/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=h2Bb5K_y 1x, /sites/default/files/styles/listing_teaser_extra_large_2x/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=uLg9IfeW 2x" media="all and (min-width: 1240px)" type="image/webp" width="697" height="697"><source srcset="/sites/default/files/styles/listing_teaser_large/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=2wsfOuqJ 1x, /sites/default/files/styles/listing_teaser_large_2x/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=xXjL9-Zq 2x" media="all and (min-width: 1024px)" type="image/webp" width="600" height="600"><source srcset="/sites/default/files/styles/listing_teaser_medium/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=DWLAfV-E 1x, /sites/default/files/styles/listing_teaser_medium_2x/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=lVeiewil 2x" media="all and (min-width: 767px) and (max-width: 1023px)" type="image/webp" width="463" height="463"><source srcset="/sites/default/files/styles/listing_teaser_plus/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=asUKKrfr 1x, /sites/default/files/styles/listing_teaser_plus_2x/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=a0rgDBT5 2x" media="all and (min-width: 413px) and (max-width: 766px)" type="image/webp" width="431" height="431"><source srcset="/sites/default/files/styles/listing_teaser_small/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=xr2OaaS0 1x, /sites/default/files/styles/listing_teaser_small_2x/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=MCc9FFXs 2x" type="image/webp" width="366" height="366"><img decoding="async" class="media__element" loading="lazy" width="366" height="366" src="/sites/default/files/styles/listing_teaser_small/public/2026-06/Amanzoe--Greece---Art-Exhibit--Alexandra-Athanassiades---7-.webp?itok=xr2OaaS0" alt="Ancient olive tree and manicured gardens at Amanzoe, Greece, at golden hour."></picture> amanzoe, greece An Amanzoe Exhibition [body]
- `/stories/global-ambassador-novak-djokovic` — <picture decoding="async" class="aman-responsive-image--square" loading="lazy" width="366" height="366"><source srcset="/sites/default/files/styles/listing_teaser_extra_large/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=an1yz-ox 1x, /sites/default/files/styles/listing_teaser_extra_large_2x/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=BLM2k4h4 2x" media="all and (min-width: 1240px)" type="image/webp" width="697" height="697"><source srcset="/sites/default/files/styles/listing_teaser_large/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=qBgWUSEC 1x, /sites/default/files/styles/listing_teaser_large_2x/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=kDXKHqn0 2x" media="all and (min-width: 1024px)" type="image/webp" width="600" height="600"><source srcset="/sites/default/files/styles/listing_teaser_medium/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=9BtbIdTR 1x, /sites/default/files/styles/listing_teaser_medium_2x/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=hL_zKmqe 2x" media="all and (min-width: 767px) and (max-width: 1023px)" type="image/webp" width="463" height="463"><source srcset="/sites/default/files/styles/listing_teaser_plus/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=a8ClsdMT 1x, /sites/default/files/styles/listing_teaser_plus_2x/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=DaS9_Q1F 2x" media="all and (min-width: 413px) and (max-width: 766px)" type="image/webp" width="431" height="431"><source srcset="/sites/default/files/styles/listing_teaser_small/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=R1Sl6q3P 1x, /sites/default/files/styles/listing_teaser_small_2x/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=gVeYfE9_ 2x" type="image/webp" width="366" height="366"><img decoding="async" class="media__element" loading="lazy" width="366" height="366" src="/sites/default/files/styles/listing_teaser_small/public/2026-05/Brand-Ambassador_-Novak-Djokovic---Aman-New-York--United-States--1-.webp?itok=R1Sl6q3P" alt="Novak Djokovic, brand ambassador for Aman New York, portrait photograph."></picture> wellness retreats A Novak Djokovic Programme [body]
- `/stories/the-wonders-of-aman` — The wonders of Aman Moments of Transformation [header]
- `/stories/urban-escapes` — <picture decoding="async" class="aman-responsive-image--square" loading="lazy" width="366" height="366"><source srcset="/sites/default/files/styles/listing_teaser_extra_large/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=cBbon2vg 1x, /sites/default/files/styles/listing_teaser_extra_large_2x/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=rKOwMd9x 2x" media="all and (min-width: 1240px)" type="image/webp" width="697" height="697"><source srcset="/sites/default/files/styles/listing_teaser_large/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=WjhjmjuM 1x, /sites/default/files/styles/listing_teaser_large_2x/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=ITktc9as 2x" media="all and (min-width: 1024px)" type="image/webp" width="600" height="600"><source srcset="/sites/default/files/styles/listing_teaser_medium/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=AzN8Ri_Y 1x, /sites/default/files/styles/listing_teaser_medium_2x/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=C3MCnhar 2x" media="all and (min-width: 767px) and (max-width: 1023px)" type="image/webp" width="463" height="463"><source srcset="/sites/default/files/styles/listing_teaser_plus/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=iwiRTzHp 1x, /sites/default/files/styles/listing_teaser_plus_2x/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=rOzWcObM 2x" media="all and (min-width: 413px) and (max-width: 766px)" type="image/webp" width="431" height="431"><source srcset="/sites/default/files/styles/listing_teaser_small/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=1cxo71Sd 1x, /sites/default/files/styles/listing_teaser_small_2x/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=u7o0BcQb 2x" type="image/webp" width="366" height="366"><img decoding="async" class="media__element" loading="lazy" width="366" height="366" src="/sites/default/files/styles/listing_teaser_small/public/2022-08/Aman%20New%20York%2C%20Exterior%20Facade%2C%20Website%20-%20Square.webp?itok=1cxo71Sd" alt="Aman New York's curved exterior facade with classical arched windows and ornamental balustrade."></picture> CITY ESCAPES In the City [body]
- `/sustainability` — Sustainability [nav]
- `/villas` — <picture decoding="async" class="aman-responsive-image--square" loading="lazy" width="366" height="366"><source srcset="/sites/default/files/styles/listing_teaser_extra_large/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=YQe8fhGa 1x, /sites/default/files/styles/listing_teaser_extra_large_2x/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=ZOTJQQ3M 2x" media="all and (min-width: 1240px)" type="image/webp" width="697" height="697"><source srcset="/sites/default/files/styles/listing_teaser_large/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=LomEbQfQ 1x, /sites/default/files/styles/listing_teaser_large_2x/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=Zd7Kx0wA 2x" media="all and (min-width: 1024px)" type="image/webp" width="600" height="600"><source srcset="/sites/default/files/styles/listing_teaser_medium/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=f5DAt02v 1x, /sites/default/files/styles/listing_teaser_medium_2x/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=KcqWxDU5 2x" media="all and (min-width: 767px) and (max-width: 1023px)" type="image/webp" width="463" height="463"><source srcset="/sites/default/files/styles/listing_teaser_plus/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=cD1Irn8j 1x, /sites/default/files/styles/listing_teaser_plus_2x/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=uWhZa1gk 2x" media="all and (min-width: 413px) and (max-width: 766px)" type="image/webp" width="431" height="431"><source srcset="/sites/default/files/styles/listing_teaser_small/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=GxQZs7ge 1x, /sites/default/files/styles/listing_teaser_small_2x/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=res2SMmu 2x" type="image/webp" width="366" height="366"><img decoding="async" class="media__element" loading="lazy" width="366" height="366" src="/sites/default/files/styles/listing_teaser_small/public/2024-10/amanzoe-accommodation-villa-21-4299_2.webp?itok=GxQZs7ge" alt="Amanzoe, Greece"></picture> Exclusive Hideaways Aman Villas [body]
- `/villas/aman-villas-at-nusa-dua` — Aman Villas at Nusa DuaNusa Dua, Bali [header]
- `/wellness` — Wellness [header]
