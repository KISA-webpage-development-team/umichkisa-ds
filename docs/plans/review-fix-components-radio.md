# Fix Plan — /components/radio

Source: `docs/reviews/docs-app-review.md` § /components/radio
Page: `apps/docs/app/components/radio/page.tsx`

## Phase 1 — Fixes (single phase, both viewports)

### Task 1 — Migrate both API Reference tables to DS Table + TableMobileList (Fixes #1 and #2)

Two raw `<table>` blocks on the page (RadioGroup ~lines 231–298, RadioItem ~lines 308–345). Both migrate atomically in one pass.

Canonical pattern: mirror `/components/input`, `/components/card`, `/components/grid`, and the already-landed Batch 12 migrations. Reference the DS `Table` API via `packages/web/src/components/display/Table.tsx` and its re-exports from `@umichkisa-ds/web`.

For **each** table (RadioGroup and RadioItem):

1. Remove the raw `<div className="my-6 overflow-x-auto">` wrapper and its `<table>` block entirely.
2. Add the desktop view — DS `Table` wrapped in `<div className="hidden md:block my-6">`. Columns: Prop / Type / Default / Description.
3. Add the mobile view — `TableMobileList` wrapped in `<div className="block md:hidden my-6">` mirroring the same rows.
4. Inline `<code>` cells stay as-is (per standing rule — skip InlineCode migration).

**RadioGroup rows (9, preserve current content):**

1. `value` — `string` — — — Controlled selected value.
2. `defaultValue` — `string` — — — Uncontrolled default selected value.
3. `onValueChange` — `(value: string) => void` — — — Called when the selected value changes.
4. `disabled` — `boolean` — `false` — Disables the entire group.
5. `orientation` — `"horizontal" | "vertical"` — `"vertical"` — Layout direction of the radio items.
6. `name` — `string` — — — Form field name for the group.
7. `required` — `boolean` — `false` — Marks the group as required for form validation.
8. `invalid` — `boolean` — `false` — Applies error border styling to all items.
9. `className` — `string` — — — Additional CSS classes. Use for layout utilities only.

**RadioItem rows (4, preserve current content):**

1. `value` — `string` — `required` — Unique value identifying this option.
2. `text` — `string` — `required` — Label text rendered beside the radio indicator.
3. `disabled` — `boolean` — `false` — Disables this individual item.
4. `className` — `string` — — — Additional CSS classes. Use for layout utilities only.

Import `Table` and `TableMobileList` from `@umichkisa-ds/web` alongside the existing `Container, RadioGroup, RadioItem` import.

## Verification

- Page renders at 1280px and 375px without layout breakage.
- Desktop shows the DS `Table` for both API tables; mobile shows `TableMobileList` (hidden/visible swap at `md`).
- Skip `pnpm build` / `pnpm typecheck` per standing rule for surgical single-file docs edits — unless the new Table import triggers a typecheck concern.
