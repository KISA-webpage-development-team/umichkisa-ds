# Fix Plan — `/components/badge`

Source: `apps/docs/app/components/badge/page.tsx`
Findings: `docs/reviews/docs-app-review.md` § /components/badge

All five findings touch the same file. Single phase.

## Phase 1 — Apply review fixes

### Task 1.1 — Delete "Variant Gallery" section (Fix #1)

Delete the entire block from line 160 through line 170 inclusive:

```
{/* ── Variant Gallery ──────────────────────────────────── */}
<h2 className="type-h2 mt-8 mb-4 text-foreground">Variant Gallery</h2>
<div className="grid grid-cols-2 gap-4">
  <Badge variant="default">Default</Badge>
  ...
  <Badge variant="outline">Outline</Badge>
</div>
```

This also resolves the raw `grid grid-cols-2` DS violation (was a separate finding, dropped during grill-me as moot).

### Task 1.2 — Migrate API Reference table to DS Table (Fix #2)

Replace the raw `<table>` block (lines 177–220) with the DS `Table` component.

**Imports** — add to the top-of-file import: `Table, TableHeader, TableBody, TableRow, TableHead, TableCell` from `@umichkisa-ds/web`.

**Markup** — use `<Table size="sm">` (badge API table is dense and matches sm cadence). Map:

- `<thead>` → `<TableHeader>`
- header `<tr>` → `<TableRow>`
- header `<th>` → `<TableHead>` (drop manual `px-4 py-3 text-left type-caption border-b border-border text-muted-foreground` — Table component handles this)
- `<tbody>` → `<TableBody>`
- body `<tr>` → `<TableRow>` (drop manual `border-b border-border` — TableBody applies divide-y)
- body `<td>` → `<TableCell>` (drop manual `px-4 py-3 type-body-sm text-foreground`)

Keep the inner `<code>` elements as-is for now (they'll be migrated by the global InlineCode TODO).

Drop the wrapping `<div className="my-6 overflow-x-auto">` — Table component already wraps in an overflow-x-auto div. Keep an outer `<div className="my-6">` if vertical spacing is needed (verify visually).

### Task 1.3 — Rewrite "Sizes" description (Fix #3)

Line 118–120, replace:

> Two sizes aligned to the spacing grid.

with something like:

> Use `md` (default) for general UI — page metadata, status labels, inline tags. Use `sm` for compact contexts like table cells, dense lists, and sidebars where the badge sits alongside `type-caption` text.

Wrap `md` and `sm` in inline `<code>` spans matching the existing pattern on the page.

### Task 1.4 — Remove redundant H1 utilities (Fix #4)

Line 56, change:

```tsx
<h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Badge</h1>
```

to:

```tsx
<h1 className="type-h1 mb-4 text-foreground">Badge</h1>
```

`type-h1` already sets `font-family: var(--font-sejong-bold)` and `letter-spacing: -0.025em` (verified in `packages/web/src/styles/index.css:169-174`).

### Task 1.5 — Fix icon size in "With icon" example (Fix #5)

Two locations:

- Line 27 (inside the `withIconCode` template literal): change `size="xs"` → `size="sm"`
- Line 135 (rendered preview JSX): change `size="xs"` → `size="sm"`

Both must be updated together so the displayed code matches the rendered preview.

## Verification

After all tasks:

1. `pnpm typecheck` passes
2. `pnpm build` passes
3. Visual check at desktop (1264px) — confirm:
   - Variant Gallery is gone
   - API table renders with the DS Table styling (brand-primary header underline, divide-y rows)
   - "Sizes" section reads naturally
   - H1 still renders in SejongHospital Bold with tight tracking
   - Icon in "With icon" preview is visibly larger than before and aligned with badge text
4. Mobile spot-check at 375px — confirm API table scrolls horizontally (Table component wraps in overflow-x-auto)
