# /components/datepicker — Review Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` (or `ds-constrained-execution` per project workflow) to implement this plan task-by-task.

**Goal:** Resolve the 5 findings from the `/components/datepicker` review.

**Scope:** Single file — `apps/docs/app/components/datepicker/page.tsx`.

**Source of findings:** `docs/reviews/docs-app-review.md` → `## /components/datepicker`

---

## Phase 1 — All Fixes (single file, single commit-worthy unit)

### Task 1: Replace intro subparagraph with Alert (Finding #2)

**File:** `apps/docs/app/components/datepicker/page.tsx`

**Current (lines 170–173):**
```tsx
<p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
  DatePicker composes Popover and Calendar internally. For inline calendar
  usage without a trigger, use Calendar directly.
</p>
```

**Change:**
1. Add `Alert` to the import from `@umichkisa-ds/web` (line 1): `import { Alert, Container } from '@umichkisa-ds/web'`.
2. Replace the `<p>` with:
```tsx
<Alert variant="info" className="mb-8">
  DatePicker composes Popover and Calendar internally. For inline calendar
  usage without a trigger, use Calendar directly.
</Alert>
```
3. Ensure the preceding `<p>` (main intro, line 166) retains `mb-4` (not `mb-8`) so spacing stacks correctly before the Alert, matching the checkbox page pattern.

Reference: `apps/docs/app/components/checkbox/page.tsx` lines 83–86 for the exact pattern.

---

### Task 2: Fix h3 rhythm under "API Reference" (Finding #3)

**File:** `apps/docs/app/components/datepicker/page.tsx`

**Line 329:** Change `mt-8` → `mt-6` on the first h3 ("DatePicker") under the API Reference h2.

```tsx
<h3 className="type-h3 mt-6 mb-2 text-foreground">DatePicker</h3>
```

Leave line 401 ("DateRangePicker" h3) as `mt-8` — correct.

---

### Task 3: Rewrite DateRangePicker "Disabled" copy (Finding #4)

**File:** `apps/docs/app/components/datepicker/page.tsx`

**Line 284:** Replace the thin description.

**Before:**
```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  A disabled range picker.
</p>
```

**After:**
```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  A disabled range picker prevents interaction. Use when availability
  dates aren&apos;t yet known or a prerequisite field hasn&apos;t been filled.
</p>
```

---

### Task 4: Rewrite DateRangePicker "Invalid" copy (Finding #5)

**File:** `apps/docs/app/components/datepicker/page.tsx`

**Line 294–295:** Replace the thin description.

**Before:**
```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  The invalid state for range pickers, signaling a validation error.
</p>
```

**After:**
```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  The invalid state signals a validation error on the range. Pair with
  FormItem for error messages in forms.
</p>
```

---

### Task 5: Migrate DatePicker API table to DS Table + TableMobileList (Finding #1, part 1)

**File:** `apps/docs/app/components/datepicker/page.tsx`

**Target:** Lines 333–398 — the raw `<table>` for DatePicker props.

**Step 1 — Imports.** Expand the import from `@umichkisa-ds/web` to include all Table primitives:

```tsx
import {
  Alert,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from '@umichkisa-ds/web'
```

**Step 2 — Replace the raw table block.** Preserve all 8 rows: `value`, `onChange`, `formatDate`, `placeholder`, `disabled`, `invalid`, `calendarProps`, `className`.

Reference implementation: `apps/docs/app/components/radio/page.tsx` (Table + TableMobileList pattern). Follow that structure exactly.

**Pattern shell:**
```tsx
{/* Desktop table */}
<div className="hidden md:block">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Prop</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Default</TableHead>
        <TableHead>Description</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">value</code>
        </TableCell>
        <TableCell>
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Date</code>
        </TableCell>
        <TableCell>—</TableCell>
        <TableCell>The selected date.</TableCell>
      </TableRow>
      {/* ...remaining 7 rows */}
    </TableBody>
  </Table>
</div>

{/* Mobile list */}
<div className="block md:hidden">
  <TableMobileList>
    <TableMobileItem
      label={<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">value</code>}
      rows={[
        { label: 'Type', value: <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Date</code> },
        { label: 'Default', value: '—' },
        { label: 'Description', value: 'The selected date.' },
      ]}
    />
    {/* ...remaining 7 items */}
  </TableMobileList>
</div>
```

**Important:** Check the exact `TableMobileItem` API against `apps/docs/app/components/radio/page.tsx` — mirror its prop shape exactly. Do not invent props.

**Preserve:** all `<code>` cells, the `calendarProps` multi-code description fragment, and the `className` "Applied to the trigger button via cn()." row.

---

### Task 6: Migrate DateRangePicker API table (Finding #1, part 2)

**File:** `apps/docs/app/components/datepicker/page.tsx`

**Target:** Lines 405–473 — the raw `<table>` for DateRangePicker props.

Apply the same Table + TableMobileList migration as Task 5. Preserve all 8 rows (`value`, `onChange`, `formatDate`, `placeholder`, `disabled`, `invalid`, `calendarProps`, `className`), including the `DateRange` shape code fragment in the `value` description.

---

### Task 7: Verify + commit

**Skip `pnpm build`/`pnpm typecheck`** per standing rule: surgical single-file docs edits do not require full build. However, because this change adds new imports (`Alert`, Table primitives) and migrates tables, **do run `pnpm --filter @umichkisa-ds/docs typecheck`** to catch import/prop errors.

**Manual check (via devtunnel, not localhost):**
- `https://vnw20xbg-3000.asse.devtunnels.ms/components/datepicker` at 1280px — Alert renders, h3 rhythm correct, tables visible.
- Same URL at 375px — mobile list renders, no horizontal overflow.

**Commit:**
```
fix(docs/datepicker): resolve review findings

- Replace subparagraph with Alert (info variant) for compositional note
- Migrate DatePicker + DateRangePicker API tables to Table + TableMobileList
- Fix first-h3-mt-6 rhythm under API Reference
- Flesh out DateRangePicker Disabled + Invalid copy
```

---

## Notes

- Single file touched throughout: `apps/docs/app/components/datepicker/page.tsx`.
- No `.tsx` changes outside `apps/docs/` → no DS constraint review gate needed beyond what's already baked into the findings.
- Inline `<code>` cells remain as raw `<code>` (InlineCode migration excluded per standing rule).
