# Run Log — Everest Tours


### 2026-07-07T12:27:41.519Z

- Curated donor tokens into app/tokens.json. Fonts: heading Inter, body Inter. Recorded font decisions in asset-log.md.
- Manual brand adjustment after tool output: changed colors to deep slate `#132B3A`, snow `#F7F3EA`, marigold `#D99A2B`, glacial accent `#8FB6C2`; changed heading substitute to Oswald for a closer condensed donor role.

### 2026-07-07 18:43 +0545

- First app build failed before install: `next: command not found`.
- Ran `pnpm install` from the factory root; no dependency changes were needed.
- `pnpm --dir sites/everest-tours/app build` passed after implementation and CSS import-order cleanup. Static routes generated: `/`, `/signature-treks`, `/signature-treks/everest-base-camp`.
