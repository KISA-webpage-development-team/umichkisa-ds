# Fix Plan: /foundation/colors/accessibility

Source: `docs/reviews/docs-app-review.md` § `/foundation/colors/accessibility`
Target: `apps/docs/app/foundation/colors/accessibility/page.tsx`
Shared: `apps/docs/components/ContrastTable.tsx`

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate ContrastTable and legend to DS components, fix content issues (redundancy, missing heading, WCAG link).

**Architecture:** Refactor `ContrastTable.tsx` to use DS `Table` compound components with `TableMobileList`/`TableMobileItem` for mobile. Replace legend `<div>` with DS `Card`. Fix content in `page.tsx`.

**Tech Stack:** `@umichkisa-ds/web` (Table, Card), React, Tailwind

---

## Phase 1 — Content fixes (page.tsx only)

### Task 1: Add WCAG AA link at first mention (Fix #4 from review)

**Files:**
- Modify: `apps/docs/app/foundation/colors/accessibility/page.tsx:17`

Change line 17 from:
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  WCAG AA is the industry standard accessibility level. It requires:
</p>
```

To:
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  <a href="https://www.w3.org/WAI/WCAG21/Understanding/conformance#levels" className="text-link underline hover:text-brand-primary">WCAG AA</a> is the industry standard accessibility level. It requires:
</p>
```

### Task 2: Remove redundant label explanations from pre-table paragraph (Fix #2 from review)

**Files:**
- Modify: `apps/docs/app/foundation/colors/accessibility/page.tsx:26-30`

Replace the paragraph at lines 26-30:
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  The table below shows the contrast ratios for the token pairs you will use most
  often. Pairs labeled <strong className="font-semibold text-foreground">AA</strong> pass WCAG AA for normal text.
  Pairs labeled <strong className="font-semibold text-foreground">Large only</strong> pass only for large text (18px+ or 14px bold).
  Pairs labeled <strong className="font-semibold text-foreground">By design</strong> intentionally fail — they are designed that way.
</p>
```

With:
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  The table below shows the contrast ratios for the token pairs you will use most
  often. See the legend below the table for how to read the badges.
</p>
```

### Task 3: Add section heading before rationale notes (Fix #3 from review)

**Files:**
- Modify: `apps/docs/app/foundation/colors/accessibility/page.tsx:61`

Insert an `<h2>` before the first "On X:" paragraph (line 61). Change:
```tsx
<p className="type-body mb-4 mt-6 text-foreground max-w-prose">
  <strong className="font-semibold text-foreground">On <code ...
```

To:
```tsx
<h2 className="type-h2 text-foreground mt-8 mb-4">Rationale</h2>

<p className="type-body mb-4 text-foreground max-w-prose">
  <strong className="font-semibold text-foreground">On <code ...
```

Also remove the `mt-6` from that first paragraph since the `h2` now provides the spacing.

### Task 4: Verify Phase 1

Run:
```bash
pnpm build && pnpm typecheck
```

Expected: both pass. Visual check: WCAG link works, pre-table paragraph is shorter, "Rationale" heading appears above notes.

---

## Phase 2 — ContrastTable migration to DS Table

### Task 5: Refactor ContrastTable to use DS Table components (Fix #1, table part)

**Files:**
- Modify: `apps/docs/components/ContrastTable.tsx`

Keep `PassBadge` and `ColorDot` helper components unchanged. Replace the `ContrastTable` export:

**Add imports at top:**
```tsx
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  TableMobileList, TableMobileItem,
} from '@umichkisa-ds/web'
```

**Replace the `ContrastTable` function with:**

```tsx
export function ContrastTable({ rows }: ContrastTableProps) {
  return (
    <div className="my-6">
      {/* Desktop table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foreground</TableHead>
              <TableHead>Background</TableHead>
              <TableHead>Ratio</TableHead>
              <TableHead>WCAG AA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <ColorDot token={row.foreground} />
                    <code className="type-caption font-mono text-foreground">
                      {row.foreground}
                    </code>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <ColorDot token={row.background} />
                    <code className="type-caption font-mono text-foreground">
                      {row.background}
                    </code>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="type-body-sm font-mono tabular-nums">
                    <strong>{row.ratio}</strong>
                  </span>
                </TableCell>
                <TableCell>
                  <PassBadge passes={row.passes} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile stacked list */}
      <div className="block md:hidden">
        <TableMobileList>
          {rows.map((row, i) => (
            <TableMobileItem key={i}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ColorDot token={row.foreground} />
                  <code className="type-caption font-mono text-foreground">
                    {row.foreground}
                  </code>
                </div>
                <PassBadge passes={row.passes} />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="type-caption">on</span>
                <ColorDot token={row.background} />
                <code className="type-caption font-mono">
                  {row.background}
                </code>
                <span className="ml-auto type-body-sm font-mono tabular-nums text-foreground">
                  <strong>{row.ratio}</strong>
                </span>
              </div>
            </TableMobileItem>
          ))}
        </TableMobileList>
      </div>
    </div>
  )
}
```

Remove the old `overflow-x-auto rounded-xl border border-border` wrapper div — DS Table handles its own overflow wrapper.

### Task 6: Verify Table migration

Run:
```bash
pnpm build && pnpm typecheck
```

Expected: both pass. Visual check: table renders with DS Table styling (navy header border, hover highlight on rows). Mobile list stacks foreground/background vertically with badge and ratio.

---

## Phase 3 — Legend migration to DS Card with PassBadge

### Task 7: Replace legend div with Card + PassBadge (Fix #1, legend part)

**Files:**
- Modify: `apps/docs/app/foundation/colors/accessibility/page.tsx:51-59`

Add imports:
```tsx
import { Card, CardContent } from '@umichkisa-ds/web'
```

(Note: `Container` import already exists.)

Replace the legend section (lines 51-59):
```tsx
{/* Legend */}
<div className="mt-4 rounded-lg px-4 py-3 type-body-sm bg-surface-subtle border border-border">
  <p className="font-semibold mb-1 text-foreground">Legend</p>
  <ul className="flex flex-col gap-1 text-muted-foreground">
    <li><strong style={{ color: "oklch(35% 0.12 145)" }}>AA</strong> — Passes WCAG AA for all text sizes (4.5:1+).</li>
    <li><strong style={{ color: "oklch(48% 0.14 55)" }}>Large only</strong> — Passes WCAG AA for large text only (18px+ or 14px bold, 3:1+). Do not use at small sizes.</li>
    <li><strong className="text-muted-foreground">By design</strong> — Intentionally below contrast thresholds. See notes below for rationale.</li>
  </ul>
</div>
```

With:
```tsx
{/* Legend */}
<Card className="mt-4 hover:border-border hover:bg-surface-subtle">
  <CardContent className="pt-4">
    <p className="type-body-sm !font-semibold mb-2 text-foreground">Legend</p>
    <ul className="flex flex-col gap-2 type-body-sm text-muted-foreground">
      <li className="flex items-center gap-2">
        <PassBadge passes="aa" />
        <span>Passes WCAG AA for all text sizes (4.5:1+).</span>
      </li>
      <li className="flex items-center gap-2">
        <PassBadge passes="large-only" />
        <span>Passes for large text only (18px+ or 14px bold, 3:1+). Do not use at small sizes.</span>
      </li>
      <li className="flex items-center gap-2">
        <PassBadge passes="intentional-fail" />
        <span>Intentionally below contrast thresholds. See rationale below.</span>
      </li>
    </ul>
  </CardContent>
</Card>
```

This requires `PassBadge` to be exported from `ContrastTable.tsx`. Add `export` to the `PassBadge` function:

**Files:**
- Modify: `apps/docs/components/ContrastTable.tsx:14`

Change:
```tsx
function PassBadge({ passes }: { passes: PassResult }) {
```
To:
```tsx
export function PassBadge({ passes }: { passes: PassResult }) {
```

Also export the `PassResult` type:
```tsx
export type PassResult = "aa" | "large-only" | "intentional-fail"
```

Then in `page.tsx`, add the import:
```tsx
import { PassBadge } from '@/components/ContrastTable'
```

### Task 8: Final verification

Run:
```bash
pnpm build && pnpm typecheck
```

Expected: both pass. Visual check: Legend renders as a Card with inline PassBadge components matching the table badges. No raw OKLCH values remain.

---

## Phase 4 — TODO updates

### Task 9: Add prev/next navigation to TODO

**Files:**
- Modify: `docs/TODO.md`

Under `## Docs App Enhancements`, add:
```
- [ ] Add prev/next page navigation to docs page footer
```

### Task 10: Check off review task in TODO

**Files:**
- Modify: `docs/TODO.md`

Check off:
```
- [x] Review `/foundation/colors/accessibility`
```

---

## Verification Checklist

- [ ] `pnpm build` passes
- [ ] `pnpm typecheck` passes
- [ ] No raw OKLCH values in page source
- [ ] No raw `<table>` in ContrastTable — uses DS Table components
- [ ] Legend uses Card + PassBadge, not raw div with inline styles
- [ ] WCAG AA link present at first mention only
- [ ] Pre-table paragraph no longer duplicates legend
- [ ] "Rationale" h2 heading before "On X:" notes
- [ ] Mobile: TableMobileList renders stacked cards at `< md` breakpoint
