# Clone Plan: Avya Club From Republic BOS

Status: complete
Primary donor: Republic Fitness Boston
Donor URL: https://republicbos.com
Brand source: https://avya.club

## 1. Page And Route Inventory

### Planned Avya production routes (the only planned routes)

| Route | Source mapping | Purpose |
|---|---|---|
| `/` | Avya `/`; Republic homepage structure | Home and Pure Energy / First Light Sequence |
| `/about` | Avya `/about`; Republic editorial stories | Origin, meaning, scale, inclusive wellbeing story |
| `/services` | Avya `/service` + six service-detail records | Consolidated eight-facility/service index |
| `/gallery` | Avya `/gallery` | Cleared Avya media gallery |
| `/contact` | Avya `/contact` + visible contact facts | Call, email, directions, hours |
| `/membership` | Avya `/register` + homepage pricing labels | Membership group labels and registration CTA |

### Captured Avya routes deferred

| Source route | Status | Route-specific reason |
|---|---|---|
| `/register` | deferred | Keep as verified external registration destination; no custom registration/backend. |
| `/team` | deferred | Staff directory is outside approved six-route launch scope. |
| `/faq` | deferred | FAQ is not part of the approved route set; useful copy may be reassessed later. |
| `/blog` | deferred | No CMS/editorial publishing workflow is in scope. |
| `/service` | deferred as route | Content is translated into planned `/services` to use clear plural naming. |
| `/service-details/68773c703c8435ff6fa735d0` | deferred | Clubhouse/Well-being/Nutrition record is consolidated into `/services`; no database detail route. |
| `/service-details/68773b963c8435ff6fa73563` | deferred | Physiotherapy record is consolidated into `/services`. |
| `/service-details/68773b1f3c8435ff6fa734ee` | deferred | Tennis Court record is consolidated into `/services`. |
| `/service-details/687739d43c8435ff6fa7342a` | deferred | Functional/Group Fitness record is consolidated into `/services`. |
| `/service-details/687739583c8435ff6fa733bd` | deferred | GYM record is consolidated into `/services`. |
| `/service-details/6870f061d8eb8cd5d618a2bf` | deferred | Swimming Pool record is consolidated into `/services`. |

### All 30 captured Republic routes (reference-only/deferred)

| Donor route | Status | Route-specific reason |
|---|---|---|
| `/` | deferred as donor route | Structure is cloned into planned Avya `/`; Republic content/identity do not ship. |
| `/about-us` | deferred | About hierarchy informs Avya `/about`; donor history/content excluded. |
| `/app` | deferred | Republic member app has no Avya-equivalent launch requirement. |
| `/careers` | deferred | Careers content is absent from the approved Avya scope. |
| `/club-status` | deferred | Multi-club status tooling is not relevant to the single Avya public site. |
| `/corporate-partnerships` | deferred | No verified Avya corporate-partnership offer was captured. |
| `/davis-square` | deferred | Boston location detail is donor-specific. |
| `/davis-square/classes` | deferred | Boston class index is donor-specific; Avya services are consolidated. |
| `/davis-square/classes/fitness-floor` | deferred | Donor facility detail maps only structurally to Avya `/services`. |
| `/davis-square/classes/move-studio` | deferred | MOVE brand/content is Republic-owned. |
| `/davis-square/classes/restore-spa` | deferred | Donor spa detail is replaced by captured Avya wellness labels. |
| `/davis-square/classes/strength-studio` | deferred | STRENGTH brand/content is Republic-owned. |
| `/financial-district` | deferred | Boston location page is donor-specific. |
| `/financial-district/classes` | deferred | Boston class index is donor-specific. |
| `/financial-district/classes/fit-studio` | deferred | FIT brand/content is Republic-owned. |
| `/financial-district/classes/restore-spa` | deferred | Boston spa detail is donor-specific. |
| `/member-policies` | deferred | No captured Avya policy copy/approval for a policy route. |
| `/membership-promotion` | deferred | Layout informs Avya `/membership`; donor pricing/promotion excluded. |
| `/membership-promotion/davis-square` | deferred | Donor location checkout/promotion is not reusable. |
| `/membership-promotion/financial-district` | deferred | Donor location checkout/promotion is not reusable. |
| `/membership-requests` | deferred | Account-management backend is out of scope. |
| `/news` | deferred | Avya blog/news CMS is deferred. |
| `/nutrition` | deferred | Captured Avya nutrition label is included within `/services`; no detail route. |
| `/personal-training-suite` | deferred | Republic trainer awards/offer are donor-owned; structure only. |
| `/privacy-policy` | deferred | No approved Avya legal text was provided; footer can link legacy source if verified later. |
| `/recovery` | deferred | Recovery is represented within Avya `/services`; no separate route. |
| `/ref` | deferred | Republic member-referral flow has no verified Avya equivalent. |
| `/restore-spa-landing` | deferred | Republic Restore brand is donor-owned. |
| `/resubscribe` | deferred | Republic marketing subscription operation is irrelevant. |
| `/trial-pass` | deferred | No verified Avya trial-pass workflow was captured. |

## 2. Flow Map

- Primary navigation: six internal routes; desktop inline, tablet/mobile full-viewport menu. Header scrolls away.
- Primary conversion: Home/Services/Membership → `/membership` → external `https://avya.club/register`; fallback contact actions use captured phones/email.
- Contact: `/contact` → `mailto:info@avya.club`, `tel:061590648`, `tel:9802855271`, directions from Gharipatan/Pokhara.
- Forms/validation: none in production. Republic's ActiveCampaign form and Avya's legacy registration implementation are not cloned.
- Menu: toggle false→true; full viewport; body scroll lock; Escape/toggle closes; focus remains managed.
- Experience gallery: hover/focus/tap changes selected card/media; no timer.
- Footer: groups always open on desktop/tablet layout; 390px accordions expand/collapse.
- Success/error/empty/loading: static site needs no runtime data states. Broken registration falls back to call/email; missing cleared media uses a logged placeholder.
- External donor destinations (Trainerize, Formsite, HW Group, social, ActiveCampaign): all deferred and must not appear unless independently verified as Avya destinations.

## 3. Section And Responsive Rhythm

- Desktop: 84.25px static header; 815.3px hero; 322.8px dark band; three 900px alternating stories; 798.4px three-card strip; ~687px two-card strip; 798.3px split membership close; 708.8px footer.
- Tablet: 30.72px gutters; compact header; 665.4px hero; 368.3px band; centered story cards; 742.1px horizontal experience; stacked 1404.7px membership close; 1165.6px footer.
- Mobile: 16px gutters; compact header/overlay; 816px hero; 363px band; 358px inset story cards; 671.8px horizontal experience; 1512.1px membership close; 639.5px accordion footer.
- Typography: replace proprietary Geller/Indivisible while retaining 95/69/46/34/18px hierarchy.

## 4. Interaction And Animation Audit

- Sweep order: scrolled before clicking at 1440, 768, and 390 CSS pixels.
- Scroll triggers: no donor threshold changes header or layout; header is static and leaves viewport 1:1 with scrollY. `html` uses smooth scrolling; no sticky/pinned section.
- Header state: `84.25px`, transparent/static at top; unchanged classes/styles after scroll. Mobile/tablet toggle opens viewport overlay, `aria-expanded=true`, body `overflow:hidden auto`.
- Hover/focus: editorial link color transitions over `0.25s`; experience card selection changes active cream/ink state and crossfades media with `opacity 0.75s`. At 100ms old/new media were 0.868307/0.131693, reaching 0/1 after 1.3s; state persists on pointer leave.
- Timed media/carousel: none. No autoplay video, timed carousel, or automatic triptych advance.
- Sticky/scroll-snap: none (`scrollSnapType: none`); narrow triptychs use native `overflow:auto`.
- Form/modal/trial/pricing/account destinations: donor Trial `/trial-pass`; Pricing `/membership-promotion`; Member Login external Trainerize; homepage form posts to ActiveCampaign. All donor flows are excluded. Avya registration uses `https://avya.club/register`; numeric prices are absent.
- Motion libraries: no GSAP, Lenis, Swiper, Three.js, Lottie, or Rive scripts/globals detected.
- Normal/reduced donor: both present the same complete content/active state; no running Web Animations were detected. Avya's approved first-light sequence must stop timers/transforms and show state 1 fully under reduced motion; triptych selection swaps immediately.
- Cookie notice: fixed third-party utility; not cloned.

## 5. Asset, Font, And Media Strategy

- Reference-only: every Republic screenshot, image URL, logo, icon, SVG, and proprietary font.
- Production: only Avya client-owned assets logged in `asset-log.md`, downloaded locally in later tasks.
- Fonts: replace Geller Headline with an open editorial serif and Indivisible with an open sans; retain measured hierarchy.
- Icons: use logged Avya service icons or local accessible SVGs with clear licensing.
- Video: no production video required. First-light can use still-image crossfades.
- Rights: no donor asset enters `app/public/`; every final asset must keep source/use/license note.

## 6. Implementation Stack Decision

Decision: Build in TypeScript + Next.js App Router + React + global CSS, with CSS transitions and a small IntersectionObserver/React state layer for scroll reveals and the first-light experience sequence. No CMS, database, auth, checkout, Three.js, WebGL, Rive, Lottie, GSAP, or Lenis is needed unless the donor behavior audit records direct evidence that CSS and IntersectionObserver cannot reproduce it.

## 7. Tooling Explicitly Not Needed

- GSAP / ScrollTrigger: CSS/React state covers the observed fades/reveals.
- Three.js / WebGL / canvas: no 3D/canvas donor behavior.
- Lottie / Rive: no vector-animation donor behavior.
- Supabase / database: captured static content is sufficient.
- CMS: blog/news is deferred.
- Auth/account: donor member account is external and Avya auth was not requested.
- Checkout/payment: registration remains the verified Avya external destination.
- Swiper/carousel/Lenis: no timed carousel, forced snap, or smooth-scroll library evidenced.

## 8. Builder Handoff

- Exact contracts: `components/header.spec.md`, `hero.spec.md`, `intro-story.spec.md`, `club-overview.spec.md`, `experience-grid.spec.md`, `identity-gallery.spec.md`, `membership-cta.spec.md`, `footer.spec.md`, `inner-hero.spec.md`, `service-index.spec.md`, `gallery.spec.md`, `contact.spec.md`, `membership.spec.md`.
- Shared tokens: ink `#222621`, light `#fff8f0`, cream `#f2e7d8`, grey `#595d57`; translate accent/font identities to Avya.
- Fidelity risks: mobile layered story cards, 0.75s experience media selection, tall first screen, no donor asset leakage, and missing numeric Avya prices.
- QA: test 1440/768/390, keyboard mobile menu/accordions/cards, reduced motion, six-route coverage, verified contact/registration links, and donor-asset gate.
