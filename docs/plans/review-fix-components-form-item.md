# Fix Plan — /components/form-item

Source: `docs/reviews/docs-app-review.md` § /components/form-item
Page: `apps/docs/app/components/form-item/page.tsx`

## Phase 1 — Fixes (single phase, both viewports)

### Task 1 — Migrate API Reference table to DS Table + TableMobileList (Fix #1)

- File: `apps/docs/app/components/form-item/page.tsx`
- Add imports from `@umichkisa-ds/web`: `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableMobileItem`, `TableMobileList`, `TableRow`.
- Remove the existing `<div className="my-6 overflow-x-auto">` raw `<table>` block (lines ~405–460).
- Replace with the canonical pattern from `apps/docs/app/components/input/page.tsx` (lines ~210–275):
  - Outer wrapper: `<div className="my-6">`.
  - Desktop: `<div className="hidden md:block">` containing `<Table size="sm">` with `TableHeader` / `TableRow` / `TableHead` (Prop / Type / Default / Description) and `TableBody` with one `TableRow` per prop.
  - Mobile: `<div className="block md:hidden">` containing `<TableMobileList>` with one `TableMobileItem` per prop. Each item has:
    - `<span className="type-body-sm text-foreground"><strong>{propName}</strong></span>`
    - `<span className="type-caption text-muted-foreground"><code …>{type}</code></span>`
    - If a default exists: `<span className="type-caption text-muted-foreground">Default: <code …>{default}</code></span>`
    - `<span className="type-caption text-muted-foreground">{description}</span>`
- Preserve all 7 rows in this order (matches current source):
  1. `htmlFor` — `string` — — — Connects the label to the form control via matching id.
  2. `label` — `string` — — — Text rendered inside the Label component.
  3. `required` — `boolean` — `false` — Shows a required asterisk on the label.
  4. `error` — `string` — — — Validation error message. When set, replaces the description text.
  5. `description` — `string` — — — Helper text shown below the form control. Hidden when error is set.
  6. `className` — `string` — — — Additional CSS classes applied to the outer wrapper div.
  7. `children` — `ReactNode` — — — The form control (Input, Textarea, Select, etc.).
- Default-less cells render as plain `—` text (not wrapped in `<code>`), matching Input migration.
- Inline `<code>` cells stay as-is (per standing rule, do not migrate to InlineCode).
- Leave the pre-table `<p>` ("FormItem does not extend native HTML attributes. All props are listed below.") unchanged.

## Verification

- Page renders at 1280px (desktop Table visible, mobile list hidden) and 375px (mobile list visible, Table hidden).
- All 7 prop rows present in both desktop and mobile.
- Skip `pnpm build` / `pnpm typecheck` per standing rule for surgical single-file docs edits — unless new imports fail to resolve.
