# Phase 0: Globals — Notes

_Append-only breadcrumb log._

---

## 2026-04-13: Task 1 — Tailwind v3 → v4 migration

### Token bridge strategy (decision from grill session)

Used strategy **(C)**: bridge mappings from old shadcn variable names to DS semantic tokens. Example: `--color-background: var(--color-surface)`, `--color-primary: var(--color-brand-primary)`. Old components keep working; bridge lines are deleted as features migrate.

Dropped: dark mode (`.dark` block), `addVariablesForColors` plugin, `gradient-radial`, `gradient-conic`, `responsive-xl`, `object-center-bottom` — all zero usages.

NextUI stays installed. All 14 component swaps deferred to feature phases (1–5). Full removal at Phase 5.

### Issues encountered during migration

**1. `@apply` in `@layer base` can't resolve theme-derived utilities**
- v4 error: `Cannot apply unknown utility class 'border-border'`
- Cause: `@apply border-border` inside `@layer base` — v4 processes `@layer base` before theme utilities are available
- Fix: replaced `@apply border-border` with `border-color: var(--color-border)`, same for `bg-background`/`text-foreground`

**2. Standalone CSS files need `@reference` directive**
- v4 error: `Cannot apply unknown utility class 'sm:text-xl'`
- Cause: 9 non-entry CSS files used `@apply` with Tailwind utilities. In v3 they had `@tailwind base/components/utilities` directives or no directive at all. v4 requires `@reference` to make utilities available for `@apply` in non-entry CSS.
- Fix: added `@reference "../globals.css"` (or appropriate relative path) to each file. This provides access to both standard Tailwind utilities and custom `@theme` tokens (michigan colors, etc.)
- Files fixed: `home.css`, `button/styles.css`, `icon/styles.css`, `toggle/styles.css`, `form/styles.css`, `boards/board.css`, `everykisa/board.css`, `posts/posts.css`, `info/info.css`

**3. `@apply` with custom class names not supported in v4**
- v4 error: `Cannot apply unknown utility class 'primary_button'`
- Cause: `button/styles.css` had `.primary_button_disabled { @apply primary_button ...; }` — v4's `@apply` only resolves Tailwind utility classes, not custom classes from the same file
- Fix: expanded the self-referencing `@apply` to inline the Tailwind utilities directly in the `_disabled` variants

### Files modified (beyond plan scope)

These files weren't in the original plan but needed `@reference` directives and/or `@apply` fixes for v4 compat:

- `src/app/home.css`
- `src/app/boards/board.css`
- `src/app/everykisa/board.css`
- `src/app/posts/posts.css`
- `src/app/info/info.css`
- `src/components/ui/button/styles.css`
- `src/components/ui/icon/styles.css`
- `src/components/ui/toggle/styles.css`
- `src/components/ui/form/styles.css`

---

## 2026-04-13: Tasks 2–6

**Task 2 (NextUI):** Deferred per grill session. NextUI stays installed; `@source` directive in globals.css handles v4 class scanning. Missing DS components: Pagination, Radio.

**Task 3 (DS packages):** Both `@umichkisa-ds/web` (1.0.1) and `@umichkisa-ds/form` (1.0.0) npm-linked. DS styles loaded via CSS-level `@import` in globals.css (not layout.tsx).

**Task 4 (Fonts):** Replaced Heebo with Pretendard Variable (CDN). SejongHospital fonts loaded via DS `styles.css` @font-face — no `next/font/local` needed since DS already handles it. `global.ts` stubbed out (empty className) for backward compat. Font CSS variables registered by DS @theme.

**Task 5 (MSW):** Created `MSWProvider` client component wrapping app content in layout.tsx. Conditional init via `NEXT_PUBLIC_MOCK_API=1`. Empty handler array — handlers added per phase.

**Task 6 (Test framework):** vitest 4.1.4 + testing-library + jest-dom. Smoke test passes. Peer dep warning: vite 8 wants @types/node >=20.19.0 but client has 20.8.2 — cosmetic, not blocking.

---

## 2026-04-13: Package manager fix

Client repo uses **npm**, not pnpm. Initial implementation incorrectly used `pnpm` commands, creating a `pnpm-lock.yaml` and restructuring `node_modules`. Fix: deleted `pnpm-lock.yaml`, cleaned `node_modules`, re-ran `npm install` (temporarily removing DS package entries since they're only available via npm link), then ran `scripts/link-ds.sh` to re-establish symlinks. Verified: `npm test` passes, `npm run dev` compiles CSS correctly with all DS tokens.
