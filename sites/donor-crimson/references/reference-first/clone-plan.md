# Clone Plan: donor-crimson

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: crimsoneducation.org
Donor URL: https://www.crimsoneducation.org

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

Auto-drafted by `blueprint capture` on 2026-07-07T16:40:47.101Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 8 (see `references/reference-first/sections/`)
- Assets inventoried: 93 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Bricolage Grotesque, Bricolage Grotesque Fallback, Lato, Lato Fallback, Golos Text, Golos Text Fallback, Noto Sans JP, Noto Sans JP Fallback, Noto Sans KR, Noto Sans KR Fallback, EB Garamond, EB Garamond Fallback, itcGaramond, itcGaramond Fallback, sourceHanSerifCN, sourceHanSerifCN Fallback, sourceHanSerifJP, sourceHanSerifJP Fallback, sourceHanSerifKR, sourceHanSerifKR Fallback, Covered By Your Grace, Covered By Your Grace Fallback, KaTeX_AMS, KaTeX_Caligraphic, KaTeX_Fraktur, KaTeX_Main, KaTeX_Math, KaTeX_SansSerif, KaTeX_Script, KaTeX_Size1, KaTeX_Size2, KaTeX_Size3, KaTeX_Size4, KaTeX_Typewriter
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #000000 (1360), #1d150e (360), #ffffff (194), #f5170d (134), #74070e (111), #3a0407 (104), #56412e (85), #606060 (29), #9aa0a6 (26), #555555 (15)
- Heading font: Bricolage Grotesque · Body font: Bricolage Grotesque
- Type scale (px, desc): 130, 70, 55, 50, 42, 36, 32, 28, 26, 24, 20, 18

### Harvested page inventory (verify + set per-page status in section 1)

- `/in` — (no label) [nav]
- `/in/about-us` — Our StoryStarted by successful applicants. Trusted by families worldwide. [nav]
- `/in/about-us/case-studies` — Student StoriesReal stories from students who worked 1:1 with our expert admissions team. [nav]
- `/in/about-us/consultants` — Our ConsultantsExperienced mentors guiding your academic journey [nav]
- `/in/about-us/our-mentors` — Meet All Our Mentors [body]
- `/in/about-us/student-results` — Our ResultsProven success in helping students reach top universities [nav]
- `/in/admissions/fao-application-review` — Former Admission Officers ReviewApplying now? Get the world's most trusted admissions "final check" [nav]
- `/in/admissions/ivy-league-college-consultant` — US Admissions ConsultingExpert guidance to help you get into your dream university with confidence [nav]
- `/in/admissions/middle-school-university-prep` — University Prep for 11–14 Year OldsEarly preparation to set students up for success in future university admissions [nav]
- `/in/admissions/oxbridge-applications-consultant` — UK Admissions ConsultingStep-by-step support for applying to top UK [nav]
- `/in/admissions/postgrad` — Post Grad Admissions ConsultingStrategic help for graduates aiming at competitive master’s or PhD programs [nav]
- `/in/blog` — ArticlesExpert insights and tips on university admissions [nav]
- `/in/blog/extracurricular-activities-list` — September 26150 Extracurricular Activity Examples From Accepted Students [body]
- `/in/blog/good-sat-score` — September 15What Is a Good SAT Score for Top Universities in 2025? [body]
- `/in/blog/how-to-get-into-an-ivy-league-school` — November 08How To Get Into An Ivy League School? The Essential Guide [body]
- `/in/blog/wsj-reflections-jamie` — The Guru Who Says He Can Get Your 11-Year-Old Into Harvard [body]
- `/in/campaigns/class-of-2030-crimson-results` — View Now [body]
- `/in/careers` — All Careers [nav]
- `/in/careers/admissions` — Join Our Admissions TeamEmpower ambitious students to reach their dream universities [nav]
- `/in/contact` — Get Started [nav]
- `/in/events` — Events [nav]
- `/in/events/aug-6-jamie-beaton-ggn` — Thursday, August 6 · 6:15 PM NPTIn-Person EventWall Street Journal’s “Guru of Ivy League Admissions” Is Coming to GurugramSign Up → [body]
- `/in/events/aug-7-jamie-beaton-chn` — Friday, August 7 · 5:45 PM NPTIn-Person EventWall Street Journal’s “Guru of Ivy League Admissions” Is Coming to ChennaiSign Up → [body]
- `/in/events/aug-8-jamie-beaton-blr` — Saturday, August 8 · 6:15 PM NPTIn-Person EventWall Street Journal’s “Guru of Ivy League Admissions” Is Coming to BengaluruSign Up → [body]
- `/in/events/aug-8-jamie-beaton-hyd` — Saturday, August 8 · 10:45 AM NPTIn-Person EventWall Street Journal’s “Guru of Ivy League Admissions” Is Coming to HyderabadSign Up → [body]
- `/in/events/aug-9-jamie-beaton-mum` — Sunday, August 9 · 11:45 AM NPTIn-Person EventWall Street Journal’s “Guru of Ivy League Admissions” Is Coming to MumbaiSign Up → [body]
- `/in/how-to-get-into` — University Profiles Admissions guides, requirements, acceptance rates, and tips for top universities [nav]
- `/in/policies/privacy-policy` — Privacy Policy [footer]
- `/in/policies/terms-and-conditions` — Terms Of Use [footer]
- `/in/practice-tests/act` — ACT Practice TestsExpert insights and tips on university admissions [nav]
- `/in/practice-tests/sat` — SAT Practice Tests [nav]
- `/in/services/athletics` — Athletics Recruitment Consulting [nav]
- `/in/services/essay-review` — Essay Review [nav]
- `/in/services/eu-universities` — EU Admissions Consulting [nav]
- `/in/services/online-tutoring/sat` — SAT Tutoring [nav]
