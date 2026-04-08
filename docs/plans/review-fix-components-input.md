# Fix Plan — /components/input

Source: `docs/reviews/docs-app-review.md` § /components/input
Page: `apps/docs/app/components/input/page.tsx`

## Phase 1 — Fixes (single phase, both viewports)

### Task 1 — Migrate API Reference table to DS Table + TableMobileList (Fix #1)

- Remove the raw `<table>` block (lines ~206–243) and its `overflow-x-auto` wrapper.
- Add desktop block: DS `Table` with `Thead`/`Tr`/`Th`/`Tbody`/`Td` (whatever the DS API exposes — verify against `packages/web` exports and a recent migration like `/components/grid` or `/components/card` for the canonical pattern). Wrap in `<div className="hidden md:block my-6">`.
- Add mobile block: `TableMobileList` mirroring the same 4 rows. Wrap in `<div className="block md:block my-6">` per the standing rule (`hidden md:block` for Table, `block md:hidden` for TableMobileList).
- Columns: Prop / Type / Default / Description.
- Rows (preserve current content):
  1. `invalid` — `boolean` — `false` — Applies error border and sets aria-invalid.
  2. `type` — `string` — `'text'` — Native input type. Overrides default from "text".
  3. `className` — `string` — — — Merged via cn(). Use for layout utilities only.
  4. `...props` — `InputHTMLAttributes` — — — All native input attributes (value, onChange, placeholder, disabled, name, etc.).
- Inline `<code>` cells stay (per standing rule, do not migrate to InlineCode).

### Task 2 — Drop FormItem mention from intro (Fix #2)

- File: `apps/docs/app/components/input/page.tsx`, intro paragraph (~lines 75–92).
- Change: remove " and `FormItem`" from "Designed to compose with `Label` and `FormItem`."
- Result: "Designed to compose with `Label`."

### Task 3 — Drop gap-2 instruction from "With Label" body (Fix #3)

- File: same, "With Label" section body (~lines 144–154).
- Remove the sentence "Use `gap-2` between label and input."
- Final body: "Compose with `Label` for accessible form fields."

## Verification

- Page renders at 1280px and 375px without layout breakage.
- Desktop shows the DS `Table`; mobile shows `TableMobileList` (hidden/visible swap at `md`).
- Skip `pnpm build`/`pnpm typecheck` per standing rule for surgical single-file docs edits — unless Task 1 introduces new imports that warrant a typecheck.
