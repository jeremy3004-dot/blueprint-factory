# Service Index Specification
## Overview
- Target file: `app/src/app/services/page.tsx` (Task 6).
- Evidence: donor triptych in `../donor-1440.png` / `donor-390.png`, donor DOM `.wp-block-rf-triptych--3`, brand-source screenshots and six captured `service-details` links.
- Interaction model: static/hover service index; no database detail fetch.

## DOM Structure
`InnerHero + section.service-index > service article[]`; each article has icon/image, H2, short captured label/description, and optional contact action. Consolidate legacy Avya service details into this one route.

## Computed Styles
Use donor triptych system: desktop card H2 `34.456px/41.3472px`, body `18px/27.9px`; cream `rgb(255,248,240)`, ink `rgb(34,38,33)`, utility background `rgb(89,93,87)`. Desktop card reference `403.2×510.4px` with `72px 43.2px` padding; tablet `293.7px` wide; mobile use full-width/stacked cards rather than clipping 264.5px cards.

## States and Behaviors
Hover/focus may switch local media using `opacity 0.75s`, but every service remains readable without interaction. No modal/filter/account path or dynamic API.

## Assets
Use the eight logged Avya icons for Swimming Pool, GYM & Fitness, Functional Fitness, Tennis Court, Physiotherapy, Massage & Spa, Club House, Well-being & Nutrition.

## Text Mapping
Source: Avya homepage “What We Provide” and six live detail destinations: Clubhouse/Well-being/Nutrition `68773c...`, Physiotherapy `68773b96...`, Tennis `68773b1f...`, Functional/Group Fitness `687739d4...`, GYM `68773958...`, Swimming Pool `6870f061...`. Do not invent capabilities beyond captured labels/copy.

## Responsive Behavior
Three-column editorial rhythm at 1440, two at 768, one at 390. Keep 57.6/30.72/16px outer gutters.

## Reduced Motion
All cards/media visible; hover media change is immediate.

## Acceptance Checks
- All eight captured facility labels are present.
- No database call or generated detail route is required.
- Icons are logged Avya assets; keyboard focus equals hover.
