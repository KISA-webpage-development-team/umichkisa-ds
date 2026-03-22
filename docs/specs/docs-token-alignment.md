# Spec: Step 0.5 — Docs App Token Alignment

## Goal

Fix the gap where Tailwind utility classes generated from DS tokens (`text-foreground`,
`bg-surface`, `font-sejong-bold`, etc.) do not work in the docs app.

Also audit all docs scaffolding components to ensure they use semantic token utilities
and contain no DS constraint violations.

---

## Root Cause

`dist/styles.css` is fully compiled Tailwind output — no `@theme` blocks survive the
build. At runtime, CSS variables are present on `:root`, so `var(--color-foreground)`
works everywhere. But the docs app's Tailwind build never sees a `@theme` block, so it
never generates utilities like `.text-foreground`. The partial `@theme inline` block in
`apps/docs/app/globals.css` was an incomplete workaround for this.

---

## Scope

### In scope
- `packages/web/package.json` — add `./theme.css` source export
- `apps/docs/app/globals.css` — replace partial `@theme inline` block with `@import`
- `apps/docs/app/layout.tsx` — remove redundant JS dist import
- `apps/docs/components/` — audit all components for token and constraint violations

### Out of scope
- `packages/web/src/tokens/` — token layer is sealed (Step 0)
- `packages/web/src/styles/index.css` — already correct, no changes
- Any MDX content pages
- DS component implementation (`packages/web/src/components/`) — comes in component steps

---

## Gaps to Fix

| ID | Gap | File | Fix |
|----|-----|------|-----|
| G1 | DS package has no CSS export for consumer Tailwind to process | `packages/web/package.json` | Add `./theme.css` export pointing to source |
| G2 | `globals.css` partial `@theme inline` — only 10/30+ tokens registered | `apps/docs/app/globals.css` | Replace with `@import '@umichkisa-ds/web/theme.css'` |
| G3 | `layout.tsx` JS import of `dist/styles.css` duplicates G2 CSS pipeline | `apps/docs/app/layout.tsx` | Remove the JS dist import |
| G4 | `DocsShell.tsx` uses `text-white` — violates DS constraints | `apps/docs/components/DocsShell.tsx` | Replace with `text-brand-foreground` |
| G5 | Other docs components — unaudited for token and constraint violations | `apps/docs/components/*.tsx` | Audit all; fix any violations found |

---

## G1 — New Package Export

Add a `./theme.css` export to `packages/web/package.json` that points to the source
styles entry. This is the entry consumers import into their Tailwind-processed CSS to
get utility generation.

```json
"./theme.css": "./src/styles/index.css"
```

`./dist/styles.css` remains exported as the compiled runtime CSS (component classes,
prebuilt utilities) for consumers who need it without a Tailwind build step.

**Consumer usage pattern (documented for future reference):**
```css
/* In your Tailwind-processed CSS entry (e.g. globals.css) */
@import '@umichkisa-ds/web/theme.css';
```

---

## G2 — globals.css Restructure

Replace the current partial `@theme inline` block and stale comments with a single
`@import` at the top of the file. Tailwind processes this import, finds the `@theme
inline` blocks in `packages/web/src/styles/index.css`, and generates all utilities
(colors, fonts, component classes) in one pass.

**Before (current state):**
```css
@import "tailwindcss";
/* ... stale comments ... */
@theme inline {
  /* only 10 color tokens — incomplete */
}
```

**After:**
```css
@import "tailwindcss";
@import "@umichkisa-ds/web/theme.css";

/* docs-app-specific overrides below, if any */
```

The import order matters: `tailwindcss` first, then `theme.css`.

---

## G3 — layout.tsx Import Removal

Remove line 4 from `apps/docs/app/layout.tsx`:

```tsx
import '@umichkisa-ds/web/dist/styles.css'  // ← remove this line
```

After G2, `globals.css` is the single CSS entry point and handles everything. The JS
import loaded the same CSS a second time via a different pipeline — redundant and
confusing.

The rest of `layout.tsx` is unchanged:
- `next/font/local` for SejongHospital (already handles preload automatically)
- `next/font/google` for Geist Mono
- Pretendard CDN `<link>` in `<head>`
- Font variables applied via `className` on `<html>`

---

## G4 + G5 — Docs Component Audit

Audit every file in `apps/docs/components/`. For each component, verify:

1. No hardcoded color values (hex, rgb, oklch literals)
2. No `text-white`, `bg-white`, `bg-black`, or other non-DS color utilities
3. No `text-text-*` utilities (old token names from before Step 0)
4. Font classes use DS tokens (`font-sejong-bold`, `font-pretendard`, `font-geist-mono`)
5. No inline `style` props with color or font values

**Known violation to fix:**
- `DocsShell.tsx` — `text-white` → `text-brand-foreground`

**Components to audit:**
- `DocsShell.tsx`
- `DocsLayout.tsx`
- `Header.tsx`
- `Sidebar.tsx` (if exists)
- `Callout.tsx` (if exists)
- `ColorSwatch.tsx` (if exists)
- Any other `.tsx` files in the directory

For each file, list violations found and fix inline. If a component is clean, note it
as audited.

---

## Execution Order

1. **G1** — add `./theme.css` export to `packages/web/package.json`
2. **G2** — restructure `apps/docs/app/globals.css`
3. **G3** — remove JS dist import from `layout.tsx`
4. **G4 + G5** — audit and fix docs components
5. **Verify** — `pnpm build` and `pnpm typecheck` both pass

Steps 1–3 are a single atomic change (CSS pipeline consolidation). Do not do G2
without G1 — `@import '@umichkisa-ds/web/theme.css'` will fail to resolve until G1
adds the export.

---

## Acceptance Criteria

- [ ] `packages/web/package.json` exports `./theme.css` pointing to source
- [ ] `apps/docs/app/globals.css` imports `@umichkisa-ds/web/theme.css` — no manual `@theme` block
- [ ] `apps/docs/app/layout.tsx` has no JS import of `dist/styles.css`
- [ ] All Tailwind color utilities from DS tokens generate in docs app (e.g. `text-foreground`, `bg-surface`, `text-error`)
- [ ] All font utilities generate in docs app (`font-sejong-bold`, `font-pretendard`, `font-geist-mono`)
- [ ] No `text-white` or other DS constraint violations in any `apps/docs/components/` file
- [ ] `pnpm build` passes
- [ ] `pnpm typecheck` passes

---

## Notes

- SejongHospital preload is already handled — `next/font/local` defaults to `preload: true` and injects the `<link rel="preload">` automatically. No manual preload needed.
- Pretendard is loaded via CDN `<link>` in layout.tsx and has its own font-family token in the DS source — no extra work needed.
- The `./theme.css` export pattern is also the correct setup guide for external consumers (e.g. `KISA-website/client`). Document this when writing a consumer setup guide in a later step.
- This step does not touch DS components (`packages/web/src/components/`). Docs scaffolding components (`apps/docs/components/`) remain bespoke — they will be migrated or replaced during the component build phase.
