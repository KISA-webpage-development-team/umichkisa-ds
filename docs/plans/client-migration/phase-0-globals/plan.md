# Phase 0: Globals — Plan

_Infrastructure setup for the client migration. All tasks execute in the client repo (`../KISA-website/client/`)._

---

## Tasks

### 1. Tailwind v3 → v4 migration `[MECHANICAL]` `[NO-TDD]`

- [x] Install `tailwindcss@4` and `@tailwindcss/postcss`
- [x] Replace `postcss.config.js` with v4 PostCSS config (swap `tailwindcss` plugin for `@tailwindcss/postcss`)
- [x] Rewrite `src/app/globals.css`: replace `@tailwind` directives with `@import "tailwindcss"` + `@theme inline { ... }`
- [x] Migrate Michigan custom colors to `@theme` (`--color-michigan-blue`, etc.)
- [x] Migrate HSL CSS variable colors (background, foreground, card, etc.) to `@theme` — bridge mappings to DS tokens
- [x] Migrate animations (accordion-down/up, move) to `@theme`
- [x] Migrate borderRadius (`--radius` variable, lg/md/sm) to `@theme`
- [x] Remove `tailwindcss-animate` dependency (v4 has native keyframe support)
- [x] Remove `addVariablesForColors` custom plugin (v4 exposes theme values as CSS variables natively)
- [x] Delete `tailwind.config.js` (fully replaced by CSS config)
- [x] Verify: `pnpm dev` starts without errors, CSS compiles, pages render

**Files:** `postcss.config.js`, `src/app/globals.css`, `tailwind.config.js` (delete), `package.json`

### 2. NextUI removal `[MECHANICAL]` `[NO-TDD]`

- [x] Assess: deferred — all 14 swaps happen in feature phases (1–5). Full removal at Phase 5.
- [x] NextUI content path handled via `@source` directive in globals.css (v4 equivalent)
- [x] Documented: 13/14 have DS equivalents. Missing: Pagination, Radio (need DS additions)

**Files:** all files listed in audit §NextUI Usage, `package.json`

### 3. DS package setup `[MECHANICAL]` `[NO-TDD]`

- [x] Verify `@umichkisa-ds/web` is at latest (1.0.1) — npm-linked to local build
- [x] Install `@umichkisa-ds/form` (1.0.0) — added to package.json, already npm-linked
- [x] DS styles imported via `@import "@umichkisa-ds/web/dist/styles.css"` in globals.css (CSS-level, not layout.tsx)
- [x] Verified: 146 DS token references present in compiled CSS output

**Files:** `package.json`, `src/app/layout.tsx`

### 4. Font setup `[MECHANICAL]` `[NO-TDD]`

- [x] SejongHospital Bold + Light loaded via DS `styles.css` @font-face (no `next/font/local` needed)
- [x] Font CSS variables (`--font-sejong-bold`, `--font-sejong-light`, `--font-pretendard`) registered via DS @theme
- [x] Pretendard Variable CDN link added to `<head>` in layout.tsx
- [x] Replaced Heebo global font with Pretendard (`font-family: var(--font-pretendard)` on `<html>`)
- [x] No Geist Mono present (docs-only font, not in client)
- [ ] Verify fonts render correctly on a page with Korean text (tunnel check)

**Files:** `src/app/layout.tsx`

### 5. MSW skeleton `[MECHANICAL]` `[NO-TDD]`

- [x] Install `msw` (2.13.2)
- [x] Create `src/mocks/handlers.ts` — empty handlers array
- [x] Create `src/mocks/browser.ts` — MSW worker setup
- [x] Create `src/mocks/MSWProvider.tsx` — client component, conditional init via `NEXT_PUBLIC_MOCK_API`
- [x] Wire MSWProvider in layout.tsx wrapping app content
- [ ] Note for Vercel: set `NEXT_PUBLIC_MOCK_API=1` in `dev` branch env vars (manual step)
- [ ] Verify: app starts cleanly with mock flag on and off

**Files:** `src/mocks/handlers.ts` (new), `src/mocks/browser.ts` (new), `src/app/layout.tsx` or provider file

### 6. Test framework setup `[MECHANICAL]` `[NO-TDD]`

- [x] Install vitest 4.1.4, @testing-library/react 16.3.2, @testing-library/jest-dom 6.9.1, jsdom 29.0.2
- [x] Create `vitest.config.ts` (jsdom, `@` path alias, setup file)
- [x] Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts
- [x] Create `src/test/setup.ts` — imports jest-dom/vitest matchers
- [x] Write smoke test (`src/test/smoke.test.ts`)
- [x] `pnpm test` — 1 passed (804ms)

**Files:** `vitest.config.ts` (new), `package.json`, `src/test/setup.ts` (new), `src/test/smoke.test.ts` (new)

### 7. Tunnel verification `[MECHANICAL]` `[NO-TDD]`

- [x] Dev server starts clean — no Tailwind errors
- [x] CSS compiles: layout.css 200, page.css 200, 146+ DS token references
- [x] `pnpm test` passes (1/1)
- [ ] Visual verification via tunnel URL (manual step — needs browser)

---

## Notes

- `notes.md` will be created when execution begins (append-only breadcrumb log)
- NextUI removal (task 2) is the main risk — need to assess if all 14 usages can be swapped in Phase 0 or if some should wait for their feature phase
- All tasks are `[NO-TDD]` — infrastructure setup, no business logic to test
