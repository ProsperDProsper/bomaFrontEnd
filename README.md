# BomaPM — front-end revamp

A complete visual rebuild of bomapm.com as a standalone Next.js front end. **There is no backend.**
The sign-in form, the search field and the action buttons inside the product screens are visual only;
the only links that go anywhere real are WhatsApp and the phone number.

## Running it

```bash
pnpm install
pnpm dev                        # http://localhost:3000
pnpm build && pnpm start        # production build
pnpm start -H 0.0.0.0 -p 3210   # reachable from other machines on the LAN
```

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 (CSS-first `@theme`) ·
GSAP + `@gsap/react` (scroll reveals, hero timeline) · Lenis (smooth scroll) · react-three-fiber +
drei (hero scene) · Phosphor icons · Newsreader + Plus Jakarta Sans via `next/font`.

## Design decisions

- **Palette — "cool slate + muted indigo".** Paper `#f7f8f9`, ink `#141a22`, one accent
  (`indigo-600 #4a5b8c`), clay `#b4784e` for anything overdue and moss `#4f7a66` for anything settled.
  Deliberately calmer and less saturated than the blue on the current site. Tokens live in
  `src/app/globals.css`; no component hardcodes a colour.
- **Type.** Newsreader for display, Plus Jakarta Sans for everything else. Shilling amounts use
  tabular figures (`[data-figure]`) so they do not jitter while counting.
- **Motion.** GSAP for scroll reveals and the hero timeline, CSS for hovers, `blob-drift` for the
  colour fields. All of it stops under `prefers-reduced-motion`, including the 3D drift.
- **Copy.** Rewritten from the original site: concrete nouns, Tanzanian context, no software
  adjectives. It all lives in `src/content/copy.ts` — components never hold user-facing text.

## Structure

```
src/app/            layout (fonts, header, footer), page, tokens in globals.css
src/content/        site.ts (brand, nav, contact) · copy.ts (all page copy) · demo.ts (fake records)
src/components/
  sections/         Hero, Workspace, Audience, Product, Reports, Faq, Cta
  screens/          the three interactive product screens (rentals, stays, projects)
  three/            HeroScene — the procedural 3D compound
  motion/           Reveal (GSAP), Figure (count-up), SmoothScroll (Lenis)
  ui/               Button, Blob, Tag, Screen chrome
```

## The hero scene

Built from three.js primitives. The original site has no downloadable model — its scene is generated
in code — so this one is too: apartment block, lodge, half-built annex with a swinging crane,
compound wall and gate, trees and cars, all in `src/components/three/HeroScene.tsx`. It drifts
slowly, follows the pointer a little, and can be dragged.

The three labels are plain DOM badges positioned every frame by projecting their anchor points to
screen space (`LabelTracker`). drei's `<Html>` rendered one of three portals empty, and doing the
projection directly is lighter anyway.

## Interactive product screens

Each screen is a real component with state, not a picture:

- **Workspace** (`#overview`) — four tabs (Today, Rent, Lodge, Projects); every figure re-counts.
- **Rentals** — pick a unit, its tenancy, balance and payment history follow.
- **Short stays** — pick a room, the night strip and balances change with it.
- **Projects** — pick a building, its recovery bar and costs follow.
- **Reports** — click a row to hold its occupancy strip.

## Demo data

Everything in `src/content/demo.ts` is invented, and labelled "Illustrative records" or "Illustrative
figures" in the UI. No real tenant, guest, property or amount appears anywhere.
