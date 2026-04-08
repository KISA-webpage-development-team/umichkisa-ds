# Fix Plan: `/components/container`

Source: `apps/docs/app/components/container/page.tsx`
Findings: `docs/reviews/docs-app-review.md` § /components/container

## Phase 1 — Fixes

### Task 1: Migrate "When to use each size" table to DS Table + TableMobileList (Fix #1)
- Replace the raw `<table>` block under the h3 "When to use each size" with DS `Table` (`hidden md:block`) and `TableMobileList` (`block md:hidden`).
- Columns: Size / Max Width / Use Case. 4 rows: default, md, sm, prose.
- Match the pattern used by recently-migrated docs pages (e.g. `/components/popover`, `/components/tabs`).

### Task 2: Migrate "API Reference" table to DS Table + TableMobileList (Fix #2)
- Replace the raw `<table>` block under "API Reference" with DS `Table` + `TableMobileList`.
- Columns: Prop / Type / Default / Description. 4 rows: `size`, `as`, `className`, `children`.
- Long union strings in the `Type` column will reflow naturally inside `TableMobileList`.

### Task 3: Replace arbitrary width values in size demo bars (Fix #3)
- In the Size Variants `ComponentPreview`, change `w-[42%]` → `w-2/5` (sm bar) and `w-[34%]` → `w-1/3` (prose bar).
- Leave `w-1/2` (md bar) and `w-full` (default bar) as-is.

### Task 4: Normalize size demo bar styling (Fix #4)
- All four bars use solid `bg-brand-primary` and `text-brand-foreground` on the inner `<span>`s.
- Drop the `/80`, `/60`, `/40` opacity modifiers.
- Drop the `text-foreground` override on the prose bar.

### Task 5: Fix h3 spacing for "Page-level structure (recommended)" (Fix #5)
- Change `mt-6` → `mt-8` on the second h3 ("Page-level structure (recommended)").
- First h3 ("When to use each size") stays `mt-6`. Third h3 ("CSS breakout") stays `mt-8`.

### Task 6: Delete redundant API Reference intro paragraph (Fix #6)
- Remove the `<p>` directly under `<h2>API Reference</h2>` ("All props are optional. Container extends...").
- Table follows directly after the heading.

## Verification
- After all tasks: visual check at 1280px and 375px on `/components/container`.
- Skip `pnpm build`/`pnpm typecheck` per standing rule for surgical single-file docs edits — unless table migration introduces a typing issue.
