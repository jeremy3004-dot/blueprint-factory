# Clone Plan: donor-black-tomato

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: blacktomato.com
Donor URL: https://www.blacktomato.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T09:54:27.805Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 12 (see `references/reference-first/sections/`)
- Assets inventoried: 152 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Brandon Grotesque, Chronicle Display, AlternateGotNo1D, Aesthico, Cabin, Josefin Sans, League Gothic, siq-float, siq
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #000000 (861), #52575c (576), #ffffff (530), #444444 (467), #2f2f2f (413), #adadad (381), rgba(0, 0, 0, 0.2) (77), #e7247a (14), #379c8a (8), #cccccc (8)
- Heading font: AlternateGotNo1D · Body font: Brandon Grotesque
- Type scale (px, desc): 60, 45, 35, 34, 30, 26, 25, 23, 22, 20, 18, 17

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Visit our UK site [header]
- `/about-us` — About [header]
- `/about-us/5-reasons-to-book-with-us` — 5 reasons to book with us [header]
- `/about-us/awards` — Our Awards [header]
- `/about-us/client-testimonials` — Client testimonials [header]
- `/about-us/how-it-all-works` — How it all works [header]
- `/about-us/our-people` — Our team [header]
- `/about-us/press` — In the press [header]
- `/about-us/why-not-just-do-it-yourself` — Why not just do it yourself? [header]
- `/agatha-christie` — Agatha Christie [header]
- `/auberge-itineraries` — Take the Open Road [header]
- `/auberge-road-trips` — Remarkable Drives of Discovery [header]
- `/blink` — Blink [header]
- `/boredom` — (no label) [body]
- `/bring-it-back` — Bring it Back [header]
- `/careers` — Careers [footer]
- `/cookie-policy` — cookie policy page [header]
- `/destinations` — Destinations [header]
- `/destinations/africa` — Africa [header]
- `/destinations/anguilla` — Anguilla [header]
- `/destinations/antarctica` — Antarctica [header]
- `/destinations/antigua` — Antigua [header]
- `/destinations/arctic` — Arctic Circle [header]
- `/destinations/argentina` — Argentina [header]
- `/destinations/asia` — Asia [header]
- `/destinations/australasia` — Australasia & Oceania [header]
- `/destinations/australia` — Australia [header]
- `/destinations/austria` — Austria [header]
- `/destinations/barbados` — Barbados [header]
- `/destinations/belgium` — Belgium [header]
- `/destinations/belize` — Belize [header]
- `/destinations/bhutan` — Bhutan [header]
- `/destinations/bolivia` — Bolivia [header]
- `/destinations/borneo` — Borneo [header]
- `/destinations/botswana` — Botswana [header]
- `/destinations/brazil` — Brazil [header]
- `/destinations/brazil/the-rhythm-of-water` — The Rhythm of water [body]
- `/destinations/british-virgin-islands` — The British Virgin Islands [header]
- `/destinations/cambodia` — Cambodia [header]
- `/destinations/canada` — Canada [header]
- `/destinations/caribbean` — Caribbean [header]
- `/destinations/chile` — Chile [header]
- `/destinations/china-asia` — China [header]
- `/destinations/colombia` — Colombia [header]
- `/destinations/congo` — Congo [header]
- `/destinations/costarica` — Costa Rica [header]
- `/destinations/croatia` — Croatia [header]
- `/destinations/cuba` — Cuba [header]
- `/destinations/czech-republic` — Czech Republic [header]
- `/destinations/denmark` — Denmark [header]
- `/destinations/ecuador-the-galapagos` — Ecuador & the Galapagos [header]
- `/destinations/ecuador-the-galapagos/journey-into-nature` — Ecuador & Galápagos: a journey into nature [body]
- `/destinations/egypt` — Egypt [header]
- `/destinations/england` — England [header]
- `/destinations/ethiopia` — Ethiopia [header]
- `/destinations/europe` — Europe [header]
- `/destinations/fiji` — Fiji [header]
- `/destinations/finland` — Finland [header]
- `/destinations/france` — France [header]
- `/destinations/france/the-lost-generation` — The Lost Generation [body]
- `/destinations/french-polynesia` — French Polynesia [header]
- `/destinations/georgia` — Georgia [header]
- `/destinations/germany` — Germany [header]
- `/destinations/greece` — Greece [header]
- `/destinations/greece/family-getaway-to-greece` — Athens, Mykonos and Crete: A Luxury Family Discovery in Greece [body]
- `/destinations/greenland` — Greenland [header]
- `/destinations/grenada` — Grenada [header]
- `/destinations/guatemala` — Guatemala [header]
- `/destinations/hungary` — Hungary [header]
- `/destinations/iceland` — Iceland [header]
- `/destinations/iceland/a-reykjavik-weekend-iceland` — Iceland: A Luxury Trip Chasing the Northern Lights [body]
- `/destinations/india` — India [header]
- `/destinations/indian-ocean` — Indian Ocean [header]
- `/destinations/indian-subcontinent` — Indian Subcontinent [header]
- `/destinations/indonesia` — Indonesia [header]
- `/destinations/ireland` — Ireland & Northern Ireland [header]
- `/destinations/israel` — Israel [header]
- `/destinations/italy` — Italy [header]
- `/destinations/italy/rome-florence-and-venice` — Highlights of Italy: A luxury holiday in Rome, Florence & Venice [body]
- `/destinations/jamaica` — Jamaica [header]
- `/destinations/japan` — Japan [header]
- `/destinations/japan/tokyo-learn-the-way-of-the-ninja` — Tokyo & Kyoto: A Japan family holiday [body]
- `/destinations/jordan` — Jordan [header]
- `/destinations/kenya` — Kenya [header]
- `/destinations/kenya/ultimate-family-safari` — Kenya: The Ultimate Family Safari [body]
- `/destinations/laos` — Laos [header]
- `/destinations/latin-america` — Latin America [header]
- `/destinations/lithuania` — Lithuania [header]
- `/destinations/macau` — Macau [header]
- `/destinations/madagascar` — Madagascar [header]
- `/destinations/malawi` — Malawi [header]
- `/destinations/malaysia` — Malaysia [header]
- `/destinations/maldives` — The Maldives [header]
- `/destinations/mauritius` — Mauritius [header]
- `/destinations/mexico` — Mexico [header]
- `/destinations/middle-east` — Middle East [header]
- `/destinations/mongolia` — Mongolia [header]
- `/destinations/montenegro` — Montenegro [header]
- `/destinations/morocco` — Morocco [header]
- `/destinations/morocco/a-journey-into-morocco` — A Journey into Morocco [body]
- `/destinations/mozambique` — Mozambique [header]
- `/destinations/mustique` — Mustique [header]
- `/destinations/myanmar` — Myanmar [header]
- `/destinations/namibia` — Namibia [header]
- `/destinations/nepal` — Nepal [header]
- `/destinations/netherlands` — Netherlands [header]
- `/destinations/newzealand` — New Zealand [header]
- `/destinations/nicaragua` — Nicaragua [header]
- `/destinations/north-america` — North America [header]
- `/destinations/norway` — Norway [header]
- `/destinations/oman` — Oman [header]
- `/destinations/panama` — Panama [header]
- `/destinations/papua-new-guinea` — Papua New Guinea [header]
- `/destinations/peru` — Peru [header]
- `/destinations/philippines` — The Philippines [header]
- `/destinations/portugal` — Portugal [header]
- `/destinations/qatar` — Qatar [header]
- `/destinations/reunion-island` — Réunion Island [header]
- `/destinations/romania` — Romania [header]
- `/destinations/rwanda` — Rwanda [header]
- `/destinations/scotland` — Scotland [header]
- `/destinations/seychelles` — The Seychelles [header]
- `/destinations/singapore` — Singapore [header]
- `/destinations/slovenia` — Slovenia [header]
- `/destinations/south-east-asia` — South East Asia [header]
- `/destinations/south-korea` — South Korea [header]
- `/destinations/south-pacific` — South Pacific [header]
- `/destinations/southafrica` — South Africa [header]
- `/destinations/spain` — Spain [header]
- `/destinations/sri-lanka` — Sri Lanka [header]
- `/destinations/st-barths` — St Barths [header]
- `/destinations/st-lucia` — St Lucia [header]
- `/destinations/st-vincent-and-the-grenadines` — St Vincent and the Grenadines [header]
- `/destinations/sweden` — Sweden [header]
- `/destinations/switzerland` — Switzerland [header]
- `/destinations/taiwan` — Taiwan [header]
- `/destinations/tanzania` — Tanzania & Zanzibar [header]
- `/destinations/thailand` — Thailand [header]
- `/destinations/the-bahamas` — Bahamas [header]
- `/destinations/the-cook-islands` — The Cook Islands [header]
- `/destinations/turkey` — Turkey [header]
- `/destinations/turks-and-caicos` — Turks and Caicos [header]
- `/destinations/uae` — The United Arab Emirates [header]
- `/destinations/uganda` — Uganda [header]
- `/destinations/united-kingdom-ireland` — UK [header]
- `/destinations/uruguay` — Uruguay [header]
- `/destinations/usa` — The USA [header]
- `/destinations/vietnam` — Vietnam [header]
- `/destinations/zambia` — Zambia [header]
- `/destinations/zimbabwe` — Zimbabwe [header]
- `/drone-the-world` — Drone the World [header]
- `/experience-types` — Experiences [header]
- `/experience-types/adventure-holidays` — Adventure Holidays [header]
- `/experience-types/beach-holidays-2` — Beach Holidays [header]
- `/experience-types/couples-holidays` — Couples Holidays [header]
- `/experience-types/eclipse-travel` — Eclipse Holidays [header]
- `/experience-types/family-holidays` — Family Holidays [header]
- `/experience-types/family-holidays/teen-travel` — Travel With Teens [header]
- `/experience-types/family-holidays/travel-grown-up-family` — Grown Up Family Holidays [header]
- `/experience-types/family-holidays/travel-multi-generational-family` — Multi Generational Trips [header]
- `/experience-types/food-travel` — Food Travel [header]
- `/experience-types/luxury-anniversary-trips` — Anniversary Trips [header]
- `/experience-types/luxury-group-holidays` — Group Holidays [header]
- `/experience-types/luxury-honeymoons` — Honeymoons [header]
- `/experience-types/luxury-train-travel` — Train Travel [header]
- `/experience-types/remote-destinations` — Remote Destinations [header]
- `/experience-types/safari-holidays` — Safari Holidays [header]
- `/experience-types/slow-travel-holidays` — Slow Travel [header]
- `/experience-types/solo-holidays` — Solo Holidays [header]
- `/experience-types/unusual-holidays` — Unusual Holidays [header]
- `/faq` — Frequently Asked Questions [footer]
- `/feelings-engine` — The Feelings Engine [header]
- `/field-trip` — Field Trip [header]
- `/footsteps` — Footsteps [header]
- `/get-in-touch` — Contact [header]
- `/get-lost` — Get Lost [header]
- `/inspirations` — Inspirations [header]
- `/inspirations/category/guides` — Guides [header]
- `/inspirations/category/news` — News [header]
- `/inspirations/category/podcast` — Podcast [header]
- `/inspirations/category/stories` — Stories [header]
- `/inspirations/category/trends` — Trends [header]
- `/inspirations/category/videos` — Videos [header]
- `/inspirations/episode-10-ash-bhardwaj` — Episode 10 - Ash Bhardwaj [header]
- `/inspirations/episode-11-unlocking-the-emotional-journey-of-travel-with-philippe-zuber-ceo-of-kerzner` — Episode 11 - Philippe Zuber [header]
- `/inspirations/episode-12-jeremy-langmead-curiosity-luxury-and-the-joy-of-getting-lost` — Episode 12 - Jeremy Langmead [header]
- `/inspirations/episode-13-anant-sharma-gift-of-boredom` — Episode 13 - Anant Sharma [header]
- `/inspirations/our-values-and-what-they-mean-to-us` — Watch the film [body]
- `/inspirations/ultimate-guide-to-luxury-travel` — Continue Reading [body]
- `/james-bond` — Black Tomato x 007 [header]
- `/make-an-enquiry` — Enquire Now [header]
- `/moment` — See You in the Moment [header]
- `/most-popular` — Most Popular [header]
- `/our-booking-conditions` — Booking conditions [footer]
- `/our-privacy-policy` — Privacy Policy [footer]
- `/press-room` — Press Room [footer]
- `/proposal-service` — Proposal Service [header]
- `/pursuit-of-feeling` — Pursuit of Feeling [header]
- `/regenerative-travel` — Regenerative travel [header]
- `/set-jetting` — Set Jetting [header]
- `/sitemap` — Sitemap [footer]
- `/story` — Take me on a Story [header]
- `/tasting-notes` — Tasting Notes [header]
- `/the-great-american-view` — The Great American View [header]
- `/the-trip-finder` — Trip finder [header]
- `/the-trip-finder/results` — Trip Finder [header]
- `/travel-insurance` — Travel Insurance [footer]
- `/us` — Visit our US site [header]
- `/where-travel-now` — By Month [header]
- `/where-travel-now/april` — April [header]
- `/where-travel-now/august` — August [header]
- `/where-travel-now/december` — December [header]
- `/where-travel-now/february` — February [header]
- `/where-travel-now/january` — January [header]
- `/where-travel-now/july` — July [header]
- `/where-travel-now/june` — June [header]
- `/where-travel-now/march` — March [header]
- `/where-travel-now/may` — May [header]
- `/where-travel-now/november` — November [header]
- `/where-travel-now/october` — October [header]
- `/where-travel-now/september` — September [header]
