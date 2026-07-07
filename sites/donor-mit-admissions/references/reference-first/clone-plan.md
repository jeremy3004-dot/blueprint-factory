# Clone Plan: donor-mit-admissions

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: mitadmissions.org
Donor URL: https://mitadmissions.org

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

Auto-drafted by `blueprint capture` on 2026-07-07T16:43:38.492Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 6 (see `references/reference-first/sections/`)
- Assets inventoried: 54 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: MessinaSans, Cooper
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #1b2a3d (681), #ffffff (156), #717485 (89), #000000 (21), #757575 (15), #9a4ac7 (2)
- Heading font: MessinaSans · Body font: MessinaSans
- Type scale (px, desc): 44, 40, 28, 26, 22, 20, 18, 17, 16, 15, 14, 13

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Skip to content ↓ [header]
- `/about` — About [footer]
- `/afford` — Afford [header]
- `/afford/cost-aid-basics/access-affordability` — Cost & affordability [header]
- `/afford/cost-aid-basics/financial-aid-calculators` — Estimate your cost [header]
- `/afford/cost-aid-basics/how-to-apply-for-aid` — How to apply for aid [header]
- `/apply` — Apply [header]
- `/apply/firstyear` — First-year applicants [header]
- `/apply/parents-educators` — Parents & educators [header]
- `/apply/prepare` — Preparing for MIT [header]
- `/apply/process` — Understanding the process [header]
- `/apply/transfer` — Transfer applicants [header]
- `/blogs` — Latest blogs [header]
- `/blogs/author/aiden` — Aiden H. '28 [body]
- `/blogs/author/allisone` — Allison E. '27 [body]
- `/blogs/author/anika` — Anika H. '26, MEng '27 [body]
- `/blogs/author/boheng` — Boheng C. '28 [body]
- `/blogs/author/kayode` — Kayode D. '27 [body]
- `/blogs/author/petey` — Chris Peterson SM '13 [body]
- `/blogs/author/richard` — Richard O. '28 [body]
- `/blogs/author/sara` — Sara N. '28 [body]
- `/blogs/author/uzay` — Uzay G. '26 [body]
- `/blogs/author/victor` — Victor D. '27 [body]
- `/blogs/bloggers/student-bloggers` — Meet the bloggers [header]
- `/blogs/category/best-of-the-blogs` — Best of the blogs [header]
- `/blogs/entry/a-moveable-feast` — A moveable feast [body]
- `/blogs/entry/a-wedding-of-all-time` — A Wedding of All Time I walked Tim the beaver down the aisle [body]
- `/blogs/entry/be-a-blogger-2026` — learn more [body]
- `/blogs/entry/crossovers-in-socal` — crossovers in socal MIT Students Visit Caltech and UCLA [body]
- `/blogs/entry/guest-post-designing-the-2025-east-campus-rollercoaster` — [Guest Post] Designing the 2025 East Campus Rollercoaster by Zack I. ‘27 [body]
- `/blogs/entry/how-the-world-cup-will-conclude` — How the World Cup Will Conclude Backed by Science [body]
- `/blogs/entry/i-went-to-a-world-cup-game` — I went to a World Cup Game!!!! and why I think it's just like Pokemon [body]
- `/blogs/entry/letterboxd-for-movies-i-watched-on-the-plane` — Letterboxd for movies i watched on the plane Do I... lack media literacy? [body]
- `/blogs/entry/school-break-thoughts` — school break thoughts [body]
- `/blogs/entry/short-story-from-last-summer` — Short Story from Last Summer [body]
- `/blogs/entry/the-misadventures-of-carl` — The Misadventures of Carl I may have acquired a shopping cart... [body]
- `/blogs/entry/there-are-too-many-hass-classes-i-want-to-take` — There Are Too Many HASS Classes I Want To Take What’s a Boy to Do [body]
- `/blogs/entry/what-does-the-end-of-high-school-mean-for-you` — what does the end of high school mean, for you? the days pass so slow; the months pass so fast [body]
- `/blogs/landing` — Blogs [header]
- `/blogs/tag/among-us-skibidi-toilet` — #among us skibidi toilet [body]
- `/blogs/tag/anxiety` — #anxiety [body]
- `/blogs/tag/california` — #california [body]
- `/blogs/tag/can-you-tell-that-i-have-anxiety` — #can you tell that i have ANXIETY [body]
- `/blogs/tag/east-campus` — #East Campus [body]
- `/blogs/tag/endings` — #endings [body]
- `/blogs/tag/high-school` — #High School [body]
- `/blogs/tag/i-was-given-the-ability-to-post-on-the-mit-admissions-blogs-and-i-choose-to-write-about-pokemon` — #I was given the ability to post on the MIT Admissions blogs and I choose to write about pokemon. [body]
- `/blogs/tag/pokemon` — #pokemon [body]
- `/blogs/tag/shenanigans` — #shenanigans [body]
- `/blogs/tag/takingabreak` — #takingabreak [body]
- `/blogs/tag/what-a-time-to-be-alive` — #What a time to be alive [body]
- `/blogs/tag/world-cup` — #World Cup [body]
- `/blogs/tag/you-can-do-this-too-apply-to-be-a-blogger-right-neow` — #YOU CAN DO THIS TOO APPLY TO BE A BLOGGER RIGHT NEOW [body]
- `/discover` — Discover [header]
- `/discover/about-mit` — About MIT [header]
- `/discover/learn-more` — Learn more [header]
- `/discover/learn-more/email-newsletters` — newsletter [body]
- `/discover/life-culture` — Life & culture [header]
- `/discover/the-mit-education` — The MIT education [header]
- `/en-espanol` — En Español [footer]
- `/explore-on-your-own` — Explore MIT on your own [header]
- `/feed` — RSS [body]
- `/group-tours` — Request a group tour [header]
- `/help` — Help [header]
- `/help/contact` — Contact us [header]
- `/help/faq` — FAQs [header]
- `/jobs` — Jobs [footer]
- `/maps-directions-parking` — Maps, directions, parking [header]
- `/mit-visits-you` — MIT visits you [header]
- `/online-info-sessions` — Online info sessions [header]
- `/policies` — Policies [footer]
- `/schedule-your-visit` — Schedule your campus visit [header]
- `/visit` — Visit [header]
