# Spec: Step 0 — Token & Styles Audit

## Goal

Audit and fix the gap between token implementation (`packages/web/src/tokens/`) and the design system documentation (`DS_CONSTRAINTS.md` as source of truth).

This step resolves OQ-1 from Step -1 and produces a clean token layer that subsequent component steps build on.

**This step is token-layer only. No component implementation is touched.**

---

## Scope

### In scope
- `packages/web/src/tokens/semantic.css` — rename, remove, and fix tokens
- `packages/web/src/styles/index.css` — add `@theme` mapping block
- `docs/DS_CONSTRAINTS.md` — update all class name references after rename
- `apps/docs/content/foundation/colors/usage.mdx` — add token→utility mapping table

### Out of scope
- Component CSS (`button.css`, `icon.css`, etc.) — fixed in component steps
- `packages/web/src/tokens/primitives.css` — no changes needed
- Any other MDX pages outside `colors/usage.mdx`

---

## Gaps to Fix

| ID | Gap | File | Fix |
|----|-----|------|-----|
| G1 | `--color-text-*` naming collision — utilities generate `text-text-*` | `semantic.css` | Rename 5 text tokens to shadcn convention (see table below) |
| G2 | `@theme` mapping absent from `packages/web` — consumers can't use Tailwind utilities | `styles/index.css` | Add `@theme inline` block covering all semantic color tokens |
| G3 | `--space-*` tokens duplicate Tailwind's built-in spacing scale | `semantic.css` | Remove all `--space-*` declarations |
| G4 | `--radius-*` tokens duplicate Tailwind's built-in radius scale | `semantic.css` | Remove all `--radius-*` declarations |
| G5 | `--icon-xs: 0.875rem` (14px) — docs define `xs` as 12px | `semantic.css` | Fix to `0.75rem` |
| G6 | `DS_CONSTRAINTS.md` uses old `text-text-*` class names throughout | `DS_CONSTRAINTS.md` | Update all references to new utility names after G1 |
| G7 | `colors/usage.mdx` lacks a token→utility mapping table | `usage.mdx` | Add table showing CSS variable → Tailwind utility class |

---

## G1 — Token Rename Table

| Current CSS variable | New CSS variable | New Tailwind utility |
|---|---|---|
| `--color-text-primary` | `--color-foreground` | `text-foreground` |
| `--color-text-muted` | `--color-muted-foreground` | `text-muted-foreground` |
| `--color-text-disabled` | `--color-disabled-foreground` | `text-disabled-foreground` |
| `--color-text-on-brand` | `--color-brand-foreground` | `text-brand-foreground` |
| `--color-text-link` | `--color-link` | `text-link` |

Border tokens (`--color-border`, `--color-border-strong`) are **not renamed** — `border-border` double-prefix is accepted per shadcn precedent.

---

## G2 — @theme Block

Add an `@theme inline` block to `packages/web/src/styles/index.css` that maps all semantic color tokens to Tailwind utilities. The block must cover:

- All `--color-brand-*` tokens
- All `--color-surface-*` tokens
- All `--color-border-*` tokens
- All renamed text tokens (using new names from G1)
- All `--color-feedback-*` tokens (error, success, warning, info — solid and subtle)
- `--color-overlay`
- `--color-focus-ring`
- All `--color-brand-*-hover` and `--color-brand-*-pressed` interactive state tokens

Icon size tokens (`--icon-*`) are **not mapped** in `@theme` — they are internal to the `<Icon>` component and consumed via CSS, not Tailwind utilities.

---

## G7 — Mapping Table (colors/usage.mdx)

Add a section titled **"Token → Utility Reference"** to `colors/usage.mdx`. The table must show, for every semantic color token:

| CSS Variable | Tailwind Utility | Role |
|---|---|---|
| `--color-brand-primary` | `bg-brand-primary` / `text-brand-primary` / `border-brand-primary` | Michigan navy — primary brand |
| … | … | … |

The table is the authoritative reference devs use when writing component code. It must cover all semantic tokens in the same groupings as `semantic.css` (brand, interactive, surface, border, text, feedback, overlay).

---

## Execution Order

Execute gaps in this order — each step depends on the previous:

1. **G5** — fix `--icon-xs` value (isolated, no dependencies)
2. **G3** — remove `--space-*` tokens
3. **G4** — remove `--radius-*` tokens
4. **G1** — rename `--color-text-*` tokens
5. **G2** — add `@theme inline` block (depends on G1 naming being final)
6. **G6** — update `DS_CONSTRAINTS.md` references (depends on G1)
7. **G7** — add mapping table to `colors/usage.mdx` (depends on G1 + G2)

---

## Acceptance Criteria

- [ ] `semantic.css` has no `--space-*`, no `--radius-*` declarations
- [ ] `semantic.css` has no `--color-text-*` declarations — all replaced with new names
- [ ] `--icon-xs` is `0.75rem`
- [ ] `styles/index.css` contains an `@theme inline` block covering all semantic color tokens
- [ ] `DS_CONSTRAINTS.md` contains no `text-text-*`, `text-text-muted`, `text-text-disabled`, `text-text-on-brand`, `text-text-link` references
- [ ] `colors/usage.mdx` contains a token→utility mapping table
- [ ] `pnpm build` passes
- [ ] `pnpm typecheck` passes

---

## Notes

- OQ-1 from `docs/specs/ds-documentation-review.md` is resolved by this step.
- Step 1 onwards (Icon, Button, etc.) must use new token names from G1.
- `DS_CONSTRAINTS.md` remains the source of truth — this step brings implementation in line with it, not the other way around.
