# Phase 0: Globals — Audit

_Snapshot of the client repo's infrastructure state before migration begins._

---

## Current Stack

| Layer | Current | Target |
|---|---|---|
| Next.js | 14.2.35 (App Router) | Keep (no upgrade needed) |
| Tailwind | v3 (`tailwind.config.js` + PostCSS) | v4 (CSS-based config) |
| UI library | NextUI (`@nextui-org/react ^2.6.11`) | `@umichkisa-ds/web` + `@umichkisa-ds/form` |
| Testing | None (no vitest/jest, no testing-library) | vitest + @testing-library/react + jest-dom |
| Mocking | None | MSW (browser, write endpoints only) |
| TypeScript | `strict: false` | Keep for now (tightening is post-migration) |
| DS packages | `@umichkisa-ds/web@1.0.1` installed, `@umichkisa-ds/form` missing | Both installed, latest versions |

---

## Tailwind v3 → v4

### Current config (`tailwind.config.js`)

- **NextUI plugin**: `nextui()` with light theme color overrides (primary = michigan-blue, secondary = maize)
- **tailwindcss-animate**: accordion-down/up keyframes + `move` animation
- **Custom colors**: `michigan-blue`, `michigan-light-blue`, `michigan-maize`, `michigan-dark-maize`, `michigan-darker-maize` + shadcn-style HSL CSS variable colors (background, foreground, card, popover, muted, accent, destructive, border, input, ring, chart-1–5)
- **Custom plugin** (`addVariablesForColors`): flattens all Tailwind colors into `:root` CSS variables (e.g., `--gray-200`)
- **borderRadius**: `lg`/`md`/`sm` using `--radius` CSS variable
- **darkMode**: `["class", "class"]` (duplicate, likely from shadcn init)

### PostCSS (`postcss.config.js`)

Standard: `tailwindcss` + `autoprefixer`. Will be replaced by v4's built-in PostCSS plugin or `@tailwindcss/postcss`.

### CSS entry (`src/app/globals.css`)

Uses `@tailwind base/components/utilities` directives (v3 style). Custom utilities: `.text-overflow`, `.container`, `.full-width-container`.

### Migration scope

- Replace JS config with CSS-based `@theme` block in `globals.css`
- Migrate Michigan colors, HSL variables, animations, border-radius to `@theme inline`
- Replace `tailwindcss-animate` with v4 native animation support
- **NextUI plugin cannot be ported to v4** — NextUI is Tailwind v3-only. But NextUI components are being replaced by DS components in Phases 1–5, so the plugin is only needed during the transition. Strategy: keep a minimal v3 compat layer OR remove NextUI entirely in Phase 0 and replace its components early.

---

## NextUI Usage (14 imports across codebase)

| Component | Files | DS equivalent |
|---|---|---|
| `Button` | 3 (2 deprecated, 1 LoginButton) | `@umichkisa-ds/web` Button |
| `Radio`, `RadioGroup` | 2 (CommentEditor, PostEditor) | `@umichkisa-ds/web` RadioGroup |
| `Pagination` | 1 (PaginationSizeSelector) | `@umichkisa-ds/web` Pagination |
| `Select`, `SelectItem` | 3 (credits, members, TipModal) | `@umichkisa-ds/web` Select |
| `Card`, `CardBody` | 2 (MemberCard, QuickLinks) | `@umichkisa-ds/web` Card |
| `Spinner` | 2 (OrderItemCard, LoadingSpinner) | `@umichkisa-ds/web` Spinner |
| `Tabs`, `Tab` | 1 (OrderList) | `@umichkisa-ds/web` Tabs |

All NextUI components have DS equivalents. Removal is feasible in Phase 0 if we replace usages early, otherwise defer to per-feature phases.

---

## Font Loading

- **Current**: Geist Sans + Geist Mono via `next/font/google` in layout.tsx (likely)
- **Target** (per `DS_CLIENT_USAGE.md`):
  - SejongHospital Bold + Light via `next/font/local` (from DS package fonts)
  - Pretendard Variable via CDN
  - No Geist Mono in client apps

---

## MSW

Not installed. Phase 0 ships an empty skeleton:
- `src/mocks/browser.ts` — MSW worker setup
- `src/mocks/handlers.ts` — empty handler array
- Conditional init gated on `NEXT_PUBLIC_MOCK_API=1`
- Vercel `dev` branch env var: `NEXT_PUBLIC_MOCK_API=1`

---

## Test Framework

Nothing installed. Phase 0 sets up:
- `vitest` + `@testing-library/react` + `@testing-library/jest-dom`
- `vitest.config.ts` at repo root
- Co-located test convention: `src/features/<name>/__tests__/`
- One smoke test to verify setup works
