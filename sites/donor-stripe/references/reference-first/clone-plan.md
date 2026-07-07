# Clone Plan: donor-stripe

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: stripe.com
Donor URL: https://stripe.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T10:03:00.242Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 13 (see `references/reference-first/sections/`)
- Assets inventoried: 52 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: sohne-var, SourceCodePro
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #000000 (1667), #533afd (477), #061b31 (463), #50617a (262), #ffffff (177), #64748d (118), #0000ee (46), #7f7dfc (34), #f2f7fe (29), #e5edf5 (26)
- Heading font: sohne-var · Body font: sohne-var
- Type scale (px, desc): 56, 48, 32, 26, 24, 22, 21, 20, 18, 16, 15, 14

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — (no label) [header]
- `/annual-updates/2025` — Read the letter [body]
- `/atlas` — Atlas [footer]
- `/authorization-boost` — Authorization Boost [footer]
- `/billing` — Billing [footer]
- `/billing/subscriptions` — Subscriptions [footer]
- `/billing/usage-based-billing` — Usage-based billing [footer]
- `/blog` — Blog [footer]
- `/blog/introducing-our-agentic-commerce-solutions` — Read more [body]
- `/capital` — Capital [footer]
- `/capital/platforms` — Capital for platforms [footer]
- `/climate` — Climate [footer]
- `/connect` — Connect [footer]
- `/contact/sales` — Contact sales [header]
- `/cookie-settings` — Cookie settings [footer]
- `/crypto-onramp` — Crypto Onramp [footer]
- `/customers` — Customer stories [footer]
- `/customers/amazon` — (no label) [body]
- `/customers/anthropic` — (no label) [body]
- `/customers/browserbase` — Browserbase offers usage-based billing for an AI agent browser with Stripe.Read Browserbase’s story [body]
- `/customers/crypto-com-spotlight` — View announcement [body]
- `/customers/cursor` — (no label) [body]
- `/customers/decagon` — Decagon decreases support costs by 65% with Stripe-integrated agents.Read Decagon’s story [body]
- `/customers/elevenlabs` — ElevenLabs grows into a $3B AI audio leader with Stripe.Watch the video [body]
- `/customers/figma` — (no label) [body]
- `/customers/gamma` — Gamma expands to $100M ARR and 70 million users with Stripe.Read Gamma’s story [body]
- `/customers/hertz` — Read the story [body]
- `/customers/instacart` — Read the story [body]
- `/customers/jobber` — Read the story [body]
- `/customers/le-monde` — Read the story [body]
- `/customers/lightspeed-terminal` — Read the story [body]
- `/customers/linear` — Linear partners with Stripe to handle billing and payments.Read Linear’s story [body]
- `/customers/lovable` — Lovable grows into a vibe-coding juggernaut with Stripe.Read Lovable’s story [body]
- `/customers/mindbody` — Read the story [body]
- `/customers/ramp` — (no label) [body]
- `/customers/runway` — Runway protects developer time with no-code solutions from Stripe.Read Runway’s story [body]
- `/customers/shopify` — (no label) [body]
- `/customers/substack` — Read the story [body]
- `/customers/supabase` — Supabase delivers its backend-as-a-service to 150 countries with Stripe.Read Supabase’s story [body]
- `/customers/urbn` — Read the story [body]
- `/customers/woo` — (no label) [body]
- `/data-pipeline` — Data Pipeline [footer]
- `/enterprise` — Stripe for enterprises [header]
- `/financial-connections` — Financial Connections [footer]
- `/guides` — Guides [footer]
- `/guides/best-practices-for-launching-and-scaling-platform-payments` — Read the guide [body]
- `/guides/introduction-to-monetizing-payments` — Read the guide [body]
- `/guides/introduction-to-risk-management` — Read the guide [body]
- `/identity` — Identity [footer]
- `/industries/insurance` — Insurance [footer]
- `/industries/media-entertainment` — Media and entertainment [footer]
- `/industries/nonprofits` — Nonprofits [footer]
- `/industries/public-sector` — Public sector [footer]
- `/industries/retail` — Retail [footer]
- `/industries/travel` — Hospitality, travel, and leisure [footer]
- `/invoicing` — Invoicing [footer]
- `/issuing` — Issuing [footer]
- `/jobs` — Jobs [footer]
- `/legal/restricted-businesses` — Prohibited and restricted businesses [footer]
- `/lp/how-retailers-drive-growth` — Get the report [body]
- `/lp/vertical-saas-benchmark-2025` — Get the data [body]
- `/managed-payments` — Managed Payments [footer]
- `/newsroom` — Newsroom [footer]
- `/newsroom/news/bfcm2025` — See the numbers [body]
- `/newsroom/news/google-and-stripe` — (no label) [body]
- `/newsroom/news/nvidia-collaboration-with-stripe` — (no label) [body]
- `/newsroom/news/stripe-and-uber` — (no label) [body]
- `/newsroom/news/stripe-ford-agreement` — (no label) [body]
- `/newsroom/news/stripe-openai-instant-checkout` — (no label) [body]
- `/partners` — Stripe Partner ecosystem [footer]
- `/payments` — Payments [footer]
- `/payments/checkout` — Checkout [footer]
- `/payments/elements` — Elements [footer]
- `/payments/link` — Link [footer]
- `/payments/payment-links` — Payment links [footer]
- `/payments/payment-methods` — Payment methods [footer]
- `/payouts` — Global Payouts [footer]
- `/pricing` — Pricing [header]
- `/privacy` — Privacy and terms [footer]
- `/professional-services` — Professional services [footer]
- `/radar` — Radar [footer]
- `/resources/more` — More resources [footer]
- `/revenue-recognition` — Revenue Recognition [footer]
- `/roadmap` — Product roadmap [footer]
- `/sessions` — Sessions annual conference [footer]
- `/sessions/2026` — Watch now [body]
- `/sigma` — Stripe Sigma [footer]
- `/sitemap` — Sitemap [footer]
- `/spc/licenses` — Licenses [footer]
- `/startups` — Stripe for startups [header]
- `/support-plans` — Managed support plans [footer]
- `/tax` — Tax [footer]
- `/terminal` — Terminal [footer]
- `/treasury` — Treasury [footer]
- `/treasury/platforms` — Treasury for platforms [footer]
- `/use-cases/agentic-commerce` — Agentic commerce [footer]
- `/use-cases/ai` — AI companies [footer]
- `/use-cases/creator-economy` — Creator economy [footer]
- `/use-cases/crypto` — Crypto [footer]
- `/use-cases/ecommerce` — Ecommerce [footer]
- `/use-cases/embedded-finance` — Embedded finance [footer]
- `/use-cases/finance-automation` — Finance automation [footer]
- `/use-cases/global-businesses` — Global businesses [footer]
- `/use-cases/in-app-payments` — In-app payments [footer]
- `/use-cases/marketplaces` — Marketplaces [footer]
- `/use-cases/platforms` — Stripe for platforms [header]
- `/use-cases/saas` — SaaS [footer]
