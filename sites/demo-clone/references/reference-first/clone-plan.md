# Clone Plan: demo-clone

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: apple.com
Donor URL: https://www.apple.com/ipad-pro/

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

Auto-drafted by `blueprint capture` on 2026-07-06T05:21:41.671Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 20 (see `references/reference-first/sections/`)
- Assets inventoried: 173 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Apple Legacy Chevron, Apple Icons 100, Apple Icons 200, Apple Icons 300, Apple Icons 400, Apple Icons 500, Apple Icons 600, Apple Icons 700, Apple Icons 800, Apple Icons 900, SF Pro Display, SF Pro Display 100, SF Pro Display 200, SF Pro Display 300, SF Pro Display 500, SF Pro Display 600, SF Pro Display 700, SF Pro Display 800, SF Pro Display 900, SF Pro Text, SF Pro Text 100, SF Pro Text 200, SF Pro Text 300, SF Pro Text 500, SF Pro Text 600, SF Pro Text 700, SF Pro Text 800, SF Pro Text 900, SF Pro Icons, SF Pro Icons 100, SF Pro Icons 200, SF Pro Icons 300, SF Pro Icons 500, SF Pro Icons 600, SF Pro Icons 700, SF Pro Icons 800, SF Pro Icons 900
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #f5f5f7 (2697), rgba(255, 255, 255, 0.8) (341), #e8e8ed (247), #86868b (242), rgba(255, 255, 255, 0.56) (152), #2997ff (131), rgba(255, 255, 255, 0.92) (102), #000000 (59), rgba(0, 0, 0, 0.56) (33), #ffffff (23)
- Heading font: SF Pro Display · Body font: SF Pro Text
- Type scale (px, desc): 80, 64, 56, 48, 44, 28, 24, 21, 20, 19, 17, 14

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Apple [nav]
- `/105/media/us/ipad-pro/2025/adee90db-c01e-430d-b726-fe64c0063f08/ar/ipad-pro-space-black.usdz` — View in your space [header]
- `/accessibility` — Accessibility [nav]
- `/accessibility/assistive-technologies` — Assistive Technologies [nav]
- `/airplay` — AirPlay [nav]
- `/airpods` — AirPods [nav]
- `/airpods-4` — AirPods 4 [nav]
- `/airpods-max` — AirPods Max 2 [nav]
- `/airpods-pro` — AirPods Pro 3 [nav]
- `/airpods-pro/hearing-health` — Hearing Health [nav]
- `/airpods/compare` — Compare AirPods [nav]
- `/airtag` — AirTag [nav]
- `/app-store` — App Store [nav]
- `/apple-arcade` — Apple Arcade [nav]
- `/apple-books` — Apple Books [nav]
- `/apple-card` — Apple Card [nav]
- `/apple-card/monthly-installments` — Learn more about Apple Card Monthly Installments [body]
- `/apple-cash` — Apple Cash [nav]
- `/apple-creator-studio` — Apple Creator Studio [nav]
- `/apple-events` — Events [nav]
- `/apple-fitness-plus` — Apple Fitness+ [nav]
- `/apple-intelligence` — Apple Intelligence and Siri [nav]
- `/apple-music` — Apple Music [nav]
- `/apple-news` — Apple News+ [nav]
- `/apple-one` — Apple One [nav]
- `/apple-pay` — Apple Pay [nav]
- `/apple-pencil` — Apple Pencil [nav]
- `/apple-podcasts` — Apple Podcasts [nav]
- `/apple-tv` — Apple TV [nav]
- `/apple-tv-4k` — Apple TV 4K [nav]
- `/apple-tv-app` — Apple TV app [nav]
- `/apple-vision-pro` — Vision [nav]
- `/apple-vision-pro/specs` — Tech Specs [nav]
- `/apple-watch-for-your-kids` — Apple Watch For Your Kids [nav]
- `/apple-watch-hermes` — Apple Watch Hermès [nav]
- `/apple-watch-nike` — Apple Watch Nike [nav]
- `/apple-watch-se-3` — Apple Watch SE 3 [nav]
- `/apple-watch-series-11` — Apple Watch Series 11 [nav]
- `/apple-watch-ultra-3` — Apple Watch Ultra 3 [nav]
- `/applecare` — AppleCare [nav]
- `/apps` — Apps by Apple [nav]
- `/batteries` — apple.com/batteries [footer]
- `/business` — Apple and Business [nav]
- `/business/enterprise/apple-vision-pro` — Apple Vision Pro for Enterprise [nav]
- `/business/mac` — Mac for Business [nav]
- `/careers/us` — Career Opportunities [nav]
- `/choose-country-region` — United States [footer]
- `/compliance` — Ethics & Compliance [nav]
- `/contact` — Contact Apple [nav]
- `/displays` — Displays [nav]
- `/diversity` — Inclusion and Diversity [nav]
- `/education` — Education [nav]
- `/education-initiative` — Education [nav]
- `/education/k12/how-to-buy` — Shop for K-12 [nav]
- `/entertainment` — Entertainment [nav]
- `/environment` — Environment [nav]
- `/final-cut-pro-for-ipad` — Learn more about Final Cut Pro for iPad [body]
- `/government` — Apple and Government [nav]
- `/healthcare` — Apple and Healthcare [nav]
- `/home-app` — Home app [nav]
- `/homepod-2nd-generation` — HomePod [nav]
- `/homepod-mini` — HomePod mini [nav]
- `/icloud` — iCloud+ [nav]
- `/imac` — iMac [nav]
- `/ipad` — Explore all iPad [header]
- `/ipad-11` — iPad [nav]
- `/ipad-air` — iPad Air [nav]
- `/ipad-keyboards` — Keyboards [nav]
- `/ipad-mini` — iPad mini [nav]
- `/ipad-pro` — iPad Pro [nav]
- `/ipad-pro/specs` — Tech Specs [nav]
- `/ipad/cellular` — apple.com/ipad/cellular [footer]
- `/ipad/compare` — Compare iPad [nav]
- `/iphone` — iPhone [nav]
- `/iphone-17` — iPhone 17 [nav]
- `/iphone-17-pro` — iPhone 17 Pro [nav]
- `/iphone-17e` — iPhone 17e [nav]
- `/iphone-air` — iPhone Air [nav]
- `/iphone/compare` — Compare iPhone [nav]
- `/iphone/switch` — Switch from Android [nav]
- `/leadership` — Apple Leadership [nav]
- `/legal` — Legal [footer]
- `/legal/internet-services/terms/site.html` — Terms of Use [footer]
- `/legal/privacy` — Privacy Policy [footer]
- `/logic-pro-for-ipad` — Learn more about Logic Pro for iPad [body]
- `/mac` — Mac [nav]
- `/mac-mini` — Mac mini [nav]
- `/mac-studio` — Mac Studio [nav]
- `/mac/compare` — Compare Mac [nav]
- `/mac/mac-does-that` — Switch from PC to Mac [nav]
- `/macbook-air` — MacBook Air [nav]
- `/macbook-neo` — MacBook Neo [nav]
- `/macbook-pro` — MacBook Pro [nav]
- `/macos/continuity` — Better with iPhone [nav]
- `/newsroom` — Newsroom [nav]
- `/os/ios` — iOS 27 Preview [nav]
- `/os/ipados` — iPadOS 27 Preview [nav]
- `/os/macos` — macOS 27 Preview [nav]
- `/os/visionos` — visionOS 27 Preview [nav]
- `/os/watchos` — watchOS 27 Preview [nav]
- `/privacy` — iPhone Privacy [nav]
- `/r/store/government` — Government [nav]
- `/racial-equity-justice-initiative` — Racial Equity and Justice [nav]
- `/retail` — Find a Store [nav]
- `/retail/business` — Business [nav]
- `/retail/geniusbar` — Genius Bar [nav]
- `/retail/instore-shopping-session/session-selection` — Book a Demo [nav]
- `/services` — Explore Entertainment [nav]
- `/sitemap` — Site Map [footer]
- `/supply-chain` — Supply Chain Innovation [nav]
- `/support/products/ipad` — AppleCare+ for iPad [body]
- `/today` — Today at Apple [nav]
- `/today/camp` — Apple Camp [nav]
- `/today/groups` — Group Reservations [nav]
- `/tv-home` — TV & Home [nav]
- `/us_epp_55499/store` — Shop for Federal Employees [nav]
- `/us_epp_67909/store` — Shop for State and Local Employees [nav]
- `/us-edu/shop/goto/salespolicies/edu` — Terms [footer]
- `/us/search` — (no label) [nav]
- `/us/shop/goto/accessories/all_accessories/beats_featured` — Beats [nav]
- `/us/shop/goto/accessories/all_accessories/headphones_speakers` — Shop AirPods [nav]
- `/us/shop/goto/accessories/all_accessories/made_by_apple` — Made by Apple [nav]
- `/us/shop/goto/account` — Apple Store Account [nav]
- `/us/shop/goto/airpods/accessories` — AirPods [nav]
- `/us/shop/goto/bag` — 0+ [nav]
- `/us/shop/goto/buy_accessories` — Accessories [nav]
- `/us/shop/goto/buy_homepod/homepod` — Shop HomePod [nav]
- `/us/shop/goto/buy_homepod/homepod_mini` — Shop HomePod mini [nav]
- `/us/shop/goto/buy_ipad` — Shop iPad [header]
- `/us/shop/goto/buy_ipad/ipad_air` — Buy [body]
- `/us/shop/goto/buy_iphone` — iPhone [nav]
- `/us/shop/goto/buy_iphone/carrier_offers` — Carrier Deals at Apple [nav]
- `/us/shop/goto/buy_iphone/iphone_16` — iPhone 16 [nav]
- `/us/shop/goto/buy_mac` — Mac [nav]
- `/us/shop/goto/buy_tv/apple_tv_4k` — Shop Apple TV 4K [nav]
- `/us/shop/goto/buy_vision` — Apple Vision Pro [nav]
- `/us/shop/goto/buy_watch` — Apple Watch [nav]
- `/us/shop/goto/educationrouting` — Education [nav]
- `/us/shop/goto/engraving` — Learn more about engraving your iPad [body]
- `/us/shop/goto/eppstore/veteransandmilitary` — Veterans and Military [nav]
- `/us/shop/goto/giftcards` — Gift Cards [nav]
- `/us/shop/goto/help` — Shopping Help [nav]
- `/us/shop/goto/help/sales_refunds` — Sales and Refunds [footer]
- `/us/shop/goto/ipad_pro/select` — Buy iPad Pro [nav]
- `/us/shop/goto/ipad/accessories` — iPad Accessories [nav]
- `/us/shop/goto/iphone/accessories` — iPhone Accessories [nav]
- `/us/shop/goto/mac/accessories` — Mac Accessories [nav]
- `/us/shop/goto/order/list` — Order Status [nav]
- `/us/shop/goto/payment_plan` — Financing [nav]
- `/us/shop/goto/personal_setup` — Personal Setup [nav]
- `/us/shop/goto/product/MW5G3` — Shop Siri Remote [nav]
- `/us/shop/goto/shipping_pickup` — Learn more, delivery and pickup options [body]
- `/us/shop/goto/smart_home/accessories` — TV & Home Accessories [nav]
- `/us/shop/goto/special_deals` — Certified Refurbished [nav]
- `/us/shop/goto/store` — Store [nav]
- `/us/shop/goto/trade_in` — Apple Trade In [nav]
- `/us/shop/goto/vision/accessories` — Apple Vision Pro Accessories [nav]
- `/us/shop/goto/watch/accessories` — Apple Watch Accessories [nav]
- `/us/shop/goto/watch/bands` — Apple Watch Bands [nav]
- `/wallet` — Wallet, Pay, Card [nav]
- `/watch` — Watch [nav]
- `/watch/compare` — Compare Watch [nav]
- `/watch/why-apple-watch` — Why Apple Watch [nav]
