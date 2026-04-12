# Phase 0: Globals — Plan

_Infrastructure setup for the client migration. All tasks execute in the client repo (`../KISA-website/client/`)._

---

## Tasks

### 1. Tailwind v3 → v4 migration `[MECHANICAL]` `[NO-TDD]`

- [ ] Install `tailwindcss@4` and `@tailwindcss/postcss`
- [ ] Replace `postcss.config.js` with v4 PostCSS config (swap `tailwindcss` plugin for `@tailwindcss/postcss`)
- [ ] Rewrite `src/app/globals.css`: replace `@tailwind` directives with `@import "tailwindcss"` + `@theme inline { ... }`
- [ ] Migrate Michigan custom colors to `@theme` (`--color-michigan-blue`, etc.)
- [ ] Migrate HSL CSS variable colors (background, foreground, card, etc.) to `@theme`
- [ ] Migrate animations (accordion-down/up, move) to `@theme`
- [ ] Migrate borderRadius (`--radius` variable, lg/md/sm) to `@theme`
- [ ] Remove `tailwindcss-animate` dependency (v4 has native keyframe support)
- [ ] Remove `addVariablesForColors` custom plugin (v4 exposes theme values as CSS variables natively)
- [ ] Delete `tailwind.config.js` (fully replaced by CSS config)
- [ ] Verify: `pnpm dev` starts without errors, existing pages render correctly

**Files:** `postcss.config.js`, `src/app/globals.css`, `tailwind.config.js` (delete), `package.json`

### 2. NextUI removal `[MECHANICAL]` `[NO-TDD]`

- [ ] Assess: can NextUI be fully removed in Phase 0, or do we need a shim? (depends on whether all 14 usages can be swapped to DS components now vs. in feature phases)
- [ ] If full removal: replace all 14 NextUI imports with DS equivalents, then `npm uninstall @nextui-org/react @nextui-org/card @nextui-org/pagination`
- [ ] If deferred: document which usages remain and plan removal per feature phase
- [ ] Remove NextUI content path from tailwind config (`node_modules/@nextui-org/theme/dist/**/*`)

**Files:** all files listed in audit §NextUI Usage, `package.json`

### 3. DS package setup `[MECHANICAL]` `[NO-TDD]`

- [ ] Verify `@umichkisa-ds/web` is at latest version; update if needed
- [ ] Install `@umichkisa-ds/form`
- [ ] Add `@umichkisa-ds/web/dist/styles.css` import to `src/app/layout.tsx`
- [ ] Verify DS component styles render (spot-check one component)

**Files:** `package.json`, `src/app/layout.tsx`

### 4. Font setup `[MECHANICAL]` `[NO-TDD]`

- [ ] Load SejongHospital Bold + Light via `next/font/local` pointing to DS package font files
- [ ] Apply `--font-sejong-bold` and `--font-sejong-light` CSS variable classes to `<html>`
- [ ] Add Pretendard Variable CDN link to document `<head>`
- [ ] Remove Geist Mono if present (docs-only font)
- [ ] Verify fonts render correctly on a page with Korean text

**Files:** `src/app/layout.tsx`

### 5. MSW skeleton `[MECHANICAL]` `[NO-TDD]`

- [ ] Install `msw`
- [ ] Create `src/mocks/handlers.ts` — export empty `handlers` array
- [ ] Create `src/mocks/browser.ts` — setup MSW worker with `handlers`
- [ ] Wire conditional initialization: only start MSW when `process.env.NEXT_PUBLIC_MOCK_API === "1"`
- [ ] Note for Vercel: set `NEXT_PUBLIC_MOCK_API=1` in `dev` branch environment variables (manual step)
- [ ] Verify: app starts cleanly with mock flag on and off

**Files:** `src/mocks/handlers.ts` (new), `src/mocks/browser.ts` (new), `src/app/layout.tsx` or provider file

### 6. Test framework setup `[MECHANICAL]` `[NO-TDD]`

- [ ] Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
- [ ] Create `vitest.config.ts` (jsdom environment, path alias support, setup file for jest-dom matchers)
- [ ] Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json` scripts
- [ ] Create `src/test/setup.ts` — import `@testing-library/jest-dom`
- [ ] Write one smoke test (`src/test/smoke.test.ts`) — trivial assertion to verify setup works
- [ ] Run `npm test` — passes

**Files:** `vitest.config.ts` (new), `package.json`, `src/test/setup.ts` (new), `src/test/smoke.test.ts` (new)

### 7. Tunnel verification `[MECHANICAL]` `[NO-TDD]`

- [ ] Start dev server (`npm run dev`)
- [ ] Access via tunnel URL (`https://vnw20xbg-3000.asse.devtunnels.ms`)
- [ ] Verify: pages load, DS styles applied, fonts correct, no console errors

---

## Notes

- `notes.md` will be created when execution begins (append-only breadcrumb log)
- NextUI removal (task 2) is the main risk — need to assess if all 14 usages can be swapped in Phase 0 or if some should wait for their feature phase
- All tasks are `[NO-TDD]` — infrastructure setup, no business logic to test
