# Fix Plan — `/components/calendar`

Source findings: `docs/reviews/docs-app-review.md` § `/components/calendar`

Single phase — all findings live in `apps/docs/app/components/calendar/page.tsx` and `apps/docs/app/components/calendar/_demos.tsx`.

## Phase 1 — Apply all fixes

### Task 1 — Migrate API Reference table to DS Table + TableMobileList (Fix #1)

- File: `apps/docs/app/components/calendar/page.tsx`
- Replace the raw `<div className="my-6 overflow-x-auto"><table>…</table></div>` block with:
  - Desktop: `<Table>` wrapped in `hidden md:block`, using `TableHeader`, `TableRow`, `TableHead`, `TableBody`, `TableCell`. Four columns: Prop, Type, Default, Description. Preserve all 10 rows verbatim.
  - Mobile: `<TableMobileList>` wrapped in `block md:hidden`, one entry per prop with the same Type/Default/Description labeling used in prior migrations (see `/components/input`, `/components/select`, `/components/form-item` pages for the canonical pattern).
- Keep the inline `<code>` treatment inside cells (do NOT migrate to `<InlineCode>` — explicit standing rule).
- Import `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableMobileList` from `@umichkisa-ds/web` alongside existing `Container` import.

### Task 2 — Replace intro sub-paragraph with Alert (Fix #2)

- File: `apps/docs/app/components/calendar/page.tsx`
- Delete the `<p className="type-body-sm mb-8 text-muted-foreground max-w-prose">` block containing "Use Calendar as a standalone visible date picker. For a form input that reveals a calendar in a popover, use DatePicker."
- Replace with:
  ```tsx
  <Alert variant="info" className="mb-8 max-w-prose">
    Use Calendar as a standalone visible date picker. For a form input that
    reveals a calendar in a popover, use DatePicker.
  </Alert>
  ```
- Import `Alert` from `@umichkisa-ds/web`.
- Keep the primary intro `<p className="type-body mb-4 text-foreground max-w-prose">` unchanged.

### Task 3 — Remove arbitrary width from ControlledMonthDemo (Fix #3)

- File: `apps/docs/app/components/calendar/_demos.tsx`
- In `ControlledMonthDemo`, restructure the wrapper so the Prev/Next header auto-aligns to the Calendar's natural width:
  ```tsx
  <div className="w-full flex flex-col items-center">
    <div className="flex flex-col w-fit">
      <div className="flex items-center justify-between w-full mb-2">
        {/* Prev button, month label, Next button unchanged */}
      </div>
      <Calendar ... />
    </div>
  </div>
  ```
- Remove `w-[280px]`. No arbitrary values.

### Task 4 — Format inline expression in `disabled` prop description (Fix #4)

- File: `apps/docs/app/components/calendar/page.tsx`
- In the `disabled` row description cell, wrap `(date) =&gt; date.getDay() === 0` in a `<code>` element using the same classes the rest of the table uses for inline code: `rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle`.

## Verification

- Per "Skip build for small docs edits" rule, no `pnpm build`/`pnpm typecheck` needed for these surgical page edits.
- Visual check at 1280px and 375px via the docs app devtunnel URL after changes land:
  - API table renders as DS Table on desktop, TableMobileList on mobile.
  - Intro Alert renders with info variant styling, sits above the Examples H2.
  - ControlledMonthDemo: Prev/Next header row is flush with the Calendar's left/right edges, no arbitrary width in the source.
  - `disabled` row description shows `(date) => date.getDay() === 0` in monospace.

## TODO

- Check off `- [ ] Fix /components/calendar` in `docs/TODO.md` after merge.
