# Fix Plan: `/components/table`

Source: `apps/docs/app/components/table/page.tsx`
Findings: `docs/reviews/docs-app-review.md` § /components/table

## Phase 1 — Fixes

### Task 1: Pair every real-data demo with TableMobileList (Fix #2)
For each of these demos, the rendered `ComponentPreview` and the highlighted code string must include BOTH a desktop `Table` (`hidden md:block`) AND a `TableMobileList` (`block md:hidden`):

- **Basic** — member directory. Mobile item: name (primary), `role · email · joined` (caption metadata).
- **Bulletin Board** — pinned + posts. Mobile item: title (primary), `date · author · views` (caption). Pinned row keeps `bg-surface-subtle` on both Table row and TableMobileItem.
- **Clickable rows** — extend `_demos.tsx` `ClickableRowsDemo` to render both layouts side-by-side under the responsive toggle (mobile items wrap a clickable element). Code string shows both with the same `onClick` pattern.
- **With Footer** — budget table. Mobile representation: list of items with `qty · price`, plus a final "Total" item visually distinguished (use `bg-surface-subtle` + `font-semibold`).

Code strings must be rewritten to include both layouts (mirror the existing `responsiveCode` template). Re-run `highlight()` for each.

**Size demo is excluded** — it compares `size="sm"` vs `size="md"` density and TableMobileList has no size variant.

### Task 2: Delete the standalone "Responsive" section (Fix #2)
Once Task 1 lands, every real-data demo is already responsive. Delete:
- The `Responsive` h3 (line ~584)
- Its prose paragraph
- `responsiveCode` constant
- `responsiveHighlighted` from the `Promise.all`
- The `<ComponentPreview>` block containing the dual `Desktop view` / `Mobile view` rendering

### Task 3: Add "required pair" Alert near the page top (Fix #2)
Directly under the page intro (after the second `<p>` at line ~315), insert a DS `<Alert>` (variant `info`) with concise copy:

> **Table and TableMobileList are a required pair.** Every Table must ship with a TableMobileList for mobile viewports. The examples below show the canonical pattern.

Import `Alert` from `@umichkisa-ds/web`.

### Task 4: Consolidate API Reference into two DS Tables (Fix #1)
Delete all 10 raw `<table>` blocks (lines 687–1022) and the per-sub-component h3s + prose paragraphs.

Replace with **two** DS `Table` + `TableMobileList` pairs under the `## API Reference` h2:

**4a. `Table` props table**
- h3: `Table`
- One short prose line: "Root component. Wraps a native `<table>` inside an overflow scroll container."
- Columns: Prop / Type / Default / Description
- Rows: `size` (`"sm" | "md"`, default `"md"`), `className` (`string`, `—`, "Merged via `cn()`."), `children` (`ReactNode`, `—`, "Sub-components.")
- Paired `TableMobileList` with the same data.

**4b. Sub-components index**
- h3: `Sub-components`
- One short prose line: "Each sub-component wraps a native HTML element. All accept `className` (merged via `cn()`) and `children`."
- Columns: Component / Wraps / Notes
- Rows (one per sub-component):
  - `TableHeader` / `<thead>` / Bottom border.
  - `TableBody` / `<tbody>` / Divided rows.
  - `TableRow` / `<tr>` / Hover highlight; supports `onClick` for clickable rows.
  - `TableHead` / `<th>` / Header cell label.
  - `TableCell` / `<td>` / Body cell content; supports `colSpan`.
  - `TableCaption` / `<caption>` / Accessible table description.
  - `TableFooter` / `<tfoot>` / Summary/totals row, subtle background.
  - `TableMobileList` / `<ol>` / Mobile-only list container — required pair.
  - `TableMobileItem` / `<li>` / Stacked flex item for mobile lists.
- Paired `TableMobileList` with each row collapsed to: primary = component name, caption = `wraps · notes`.

### Task 5: Soften API Reference intro (Fix #3)
Replace the intro `<p>` under `## API Reference` (lines 671–678). New copy:

> Table is composed from several sub-components you assemble together. All sub-components accept `className` (merged via `cn()`) and native HTML attributes for the element they wrap. Use `className` for layout context (margin, width) — not for restyling component internals.

## Verification

- Single-file docs edit — skip `pnpm build` / `pnpm typecheck` per standing rule **unless** the new `Alert` import or any new symbol introduces a typing issue.
- Visual check at 1280px and 375px on `/components/table` after fixes.
- Confirm: every real-data demo now renders Table on desktop and TableMobileList on mobile. The dedicated "Responsive" section no longer exists. API Reference shows exactly two DS `Table`s (each paired with `TableMobileList`).
