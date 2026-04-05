# Fix Plan: /foundation/colors/usage

Source: `docs/reviews/docs-app-review.md` § `/foundation/colors/usage`
Target: `apps/docs/app/foundation/colors/usage/page.tsx`

---

## Phase 1 — Shared component creation

### Task 1: Create `InlineCode` docs component (Fix #6 from review)

**Files:**
- Create: `apps/docs/components/InlineCode.tsx`

Create a simple docs component that inherits parent font size:

```tsx
import type { ReactNode } from "react"

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle text-foreground">
      {children}
    </code>
  )
}
```

No `type-*` class — inherits font size from parent context. Replaces the repeated `<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">` pattern.

### Task 2: Refactor `DoDont.tsx` to use Alert (Fix #5 from review)

**Files:**
- Modify: `apps/docs/components/DoDont.tsx`

Replace the `Do` and `Dont` components with `Alert`:

- `Do` → `<Alert variant="success" title={label}>` wrapping children
- `Dont` → `<Alert variant="error" title={label}>` wrapping children
- `DoDont` wrapper stays as the grid layout: `<div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">`
- Add import: `import { Alert } from '@umichkisa-ds/web'`
- Remove raw div markup, `rounded-xl`, `border-l-4`, hand-rolled ✓/✕ characters

**Cascading impact:** All pages importing `DoDont` will pick up the new styling automatically.

---

## Phase 2 — Page content fixes

All fixes target `apps/docs/app/foundation/colors/usage/page.tsx`.

### Task 3: Fix missing space (Fix #3 from review)

Line 27: Change `Navy says{'"'}this is KISA.{'"'}` to `Navy says {'"'}this is KISA.{'"'}` (add space before opening quote).

### Task 4: Remove conflicting hyperlink bullet (Fix #4 from review)

Lines 59-60: Remove the `<li>` for "Hyperlinks within body text" from the `--color-brand-primary-mid` usage list. This conflicts with DS_CONSTRAINTS which mandates `--color-link` for all hyperlinks.

### Task 5: Replace blockquote with Alert (Fix #2 from review)

Line 356: Replace the raw `<blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">` with:

```tsx
<Alert variant="info" title="Exception — Small-scale fill indicators">
  Toggle controls (Radio dot, Switch thumb) use{' '}
  <InlineCode>--color-surface</InlineCode>{' '}
  (white) on{' '}
  <InlineCode>--color-brand-primary</InlineCode>{' '}
  instead of maize. At 10–20px, maize fills a solid shape too heavily — white provides
  clean contrast while navy carries the brand. Stroke-based indicators (Checkbox checkmark)
  still use{' '}
  <InlineCode>--color-brand-foreground</InlineCode>{' '}
  (maize) because strokes are narrow enough for the accent to read correctly.
</Alert>
```

Add import: `import { Alert } from '@umichkisa-ds/web'`

### Task 6: Replace 108 inline `<code>` with `<InlineCode>` (Fix #6 from review)

Replace all instances of:
```
<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">...</code>
```
with:
```
<InlineCode>...</InlineCode>
```

Add import: `import { InlineCode } from '@/components/InlineCode'`

This is a mechanical find-and-replace — content inside the tags stays the same.

---

## Phase 3 — Table migration

### Task 7: Migrate 10 raw tables to DS Table (Fix #1 from review)

**Files:**
- Modify: `apps/docs/app/foundation/colors/usage/page.tsx`

Add imports:
```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
```

For each of the 10 raw `<table>` elements:

1. Replace `<table className="w-full border-collapse border border-border">` → `<Table>`
2. Replace `<thead className="bg-surface-subtle">` → `<TableHeader>`
3. Replace `<th className="...">` → `<TableHead>`
4. Replace `<tbody>` → `<TableBody>`
5. Replace `<tr className="border-b border-border">` → `<TableRow>`
6. Replace `<td className="...">` → `<TableCell>`
7. Add `hidden md:block` to the `<Table>` wrapper div
8. Add `block md:hidden` `<TableMobileList>` with `<TableMobileItem>` stacked cards below each table

Tables to migrate (by section heading above each):
1. Interactive States — brand-primary states (2 cols: State, Token)
2. Interactive States — brand-accent states (2 cols: State, Token)
3. Toggle Controls — stroke vs fill (4 cols: Control, Indicator type, Token, Rationale)
4. Token → Utility: Brand (3 cols: CSS Variable, Tailwind Utility, Role)
5. Token → Utility: Interactive States (3 cols)
6. Token → Utility: Surface (3 cols)
7. Token → Utility: Border (3 cols)
8. Token → Utility: Text (3 cols)
9. Token → Utility: Feedback (3 cols)
10. Token → Utility: Overlay (3 cols)

Follow the same pattern as `apps/docs/app/foundation/colors/tokens/page.tsx` for the mobile list format.
