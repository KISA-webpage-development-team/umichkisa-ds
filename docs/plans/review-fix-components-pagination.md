# Fix Plan — /components/pagination

Source: `docs/reviews/docs-app-review.md` § /components/pagination
Page: `apps/docs/app/components/pagination/page.tsx`

## Phase 1 — Fixes (single phase, both viewports)

### Task 1 — Replace intro subparagraph with DS `<Alert>` (Fixes #2 and #3)

Current (~lines 90–94):

```tsx
<p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
  Pagination is fully controlled — the consumer owns the page state and
  passes it via props. On mobile, sibling pages collapse automatically to
  keep the component compact.
</p>
```

Replace with a DS `<Alert>` (info variant). Drop the "On mobile, sibling pages collapse automatically…" sentence — that behavior is documented on the `siblingCount` API row (Finding #3).

```tsx
<Alert variant="info" className="mb-8 max-w-prose">
  Pagination is fully controlled — the consumer owns the page state and
  passes it via props.
</Alert>
```

Add `Alert` to the existing `@umichkisa-ds/web` import alongside `Container`.

Match the Alert pattern used in prior review fixes (e.g., `/foundation/colors/overview`, other Batch 12–14 fix pages). Do not pass a `title` prop unless the existing convention on sibling pages uses one — match whichever is dominant in recent fix PRs. If unsure, omit `title`.

### Task 2 — Migrate API Reference table to DS `Table` + `TableMobileList` (Fixes #1)

Raw `<table>` block at ~lines 149–192. Migrate atomically in one pass.

Canonical pattern: mirror the Batch 13/14 migrations (`/components/input`, `/components/radio`, `/components/checkbox`, `/components/form-item`). Reference `packages/web/src/components/display/Table.tsx` and its re-exports from `@umichkisa-ds/web`.

1. Remove the raw `<div className="my-6 overflow-x-auto">` wrapper and its `<table>` block entirely.
2. Add desktop view — DS `Table` wrapped in `<div className="hidden md:block my-6">`. Columns: Prop / Type / Default / Description.
3. Add mobile view — `TableMobileList` wrapped in `<div className="block md:hidden my-6">` mirroring the same rows.
4. Inline `<code>` cells stay as-is (per standing rule — skip InlineCode migration).

**Pagination rows (5, preserve current content):**

1. `page` — `number` — — — Current active page (1-indexed). Required.
2. `totalPages` — `number` — — — Total number of pages. Required.
3. `onPageChange` — `(page: number) => void` — — — Callback fired when the user selects a page. Required.
4. `siblingCount` — `number` — `1` — Number of sibling pages shown on each side of the current page. On mobile, this is overridden to 0 for compact display.
5. `className` — `string` — — — Additional class names for the nav wrapper. Use for layout utilities only.

Add `Table`, `TableMobileList` to the `@umichkisa-ds/web` import.

## Verification

- Page renders at 1280px and 375px without layout breakage.
- Intro Alert displays info style; no trailing subparagraph on mobile.
- Desktop shows DS `Table` for API Reference; mobile shows `TableMobileList` (hidden/visible swap at `md`).
- Skip `pnpm build` / `pnpm typecheck` per standing rule for surgical single-file docs edits.
