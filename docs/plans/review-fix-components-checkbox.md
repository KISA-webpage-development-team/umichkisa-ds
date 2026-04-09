# Fix Plan — /components/checkbox

Source: `docs/reviews/docs-app-review.md` § /components/checkbox
Page: `apps/docs/app/components/checkbox/page.tsx`

## Phase 1 — Fixes (single phase, both viewports)

### Task 1 — Migrate API Reference table to DS Table + TableMobileList (Fix #1)

- Remove the raw `<table>` block (lines ~179–216) including its `overflow-x-auto` wrapper.
- Add desktop block: DS `Table size="sm"` with `TableHeader`/`TableRow`/`TableHead`/`TableBody`/`TableCell`. Wrap in `<div className="hidden md:block">`. Follow `/components/input`'s migration (`apps/docs/app/components/input/page.tsx` ~lines 211–248) as the canonical pattern — copy exact imports, wrappers, and class names.
- Add mobile block: `TableMobileList` with one `TableMobileItem` per row. Wrap in `<div className="block md:hidden">`. Match Input's mobile-list structure verbatim (prop name `<strong>`, type as `<code>`, `Default:` line, description line).
- Outer wrapper: `<div className="my-6">` around both blocks.
- Columns (desktop): Prop / Type / Default / Description.
- Rows (preserve current content — 4 rows):
  1. `text` — `string` — — — Inline label text rendered beside the checkbox.
  2. `invalid` — `boolean` — `false` — Applies error border and sets aria-invalid.
  3. `className` — `string` — — — Merged via cn(). Use for layout utilities only.
  4. `...props` — `InputHTMLAttributes` — — — All native checkbox attributes except type.
- Imports to add to the page: `Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem` from `@umichkisa-ds/web` (verify exact export names against Input's page).
- Inline `<code>` cells stay (per standing rule, do not migrate to InlineCode).

### Task 2 — Convert intro paragraph to info Alert (Fix #2)

- File: `apps/docs/app/components/checkbox/page.tsx`, intro paragraph (~lines 71–81).
- Remove the entire `<p class="type-body mb-8 ...">...</p>` block.
- Add `<Alert>` import from `@umichkisa-ds/web` (combine with existing import line).
- Replace with:
  ```tsx
  <Alert variant="info" className="mb-8">
    Standalone checkbox for boolean selections.
  </Alert>
  ```
- Match exact pattern used on `/components/accordion` and `/components/table` intro Alerts — check one of them for the correct prop name (`variant` vs `tone`) and whether a title/icon slot is passed.

### Task 3 — Stack States example vertically (Fix #3)

- File: same, "States" `ComponentPreview` body (~lines 113–120).
- Change: `<div className="flex items-center gap-4">` → `<div className="flex flex-col gap-2">`.
- Do NOT change the `statesCode` string constant — the code snippet shown to users doesn't include the wrapper div, so the displayed code is unchanged.

### Task 4 — Drop "Default" paragraph (Fix #4)

- File: same, "Default" section (~lines 87–93).
- Remove the `<p className="type-body mb-2 text-foreground max-w-prose">A single unchecked checkbox with inline label text.</p>` line entirely.
- Adjust the `<h3>` `mb-2` → `mb-4` so the h3 → preview spacing matches the "follow body paragraph" rhythm used elsewhere. (Verify against another page where an h3 has no body paragraph, if one exists; otherwise keep `mb-2` — safer default.)

### Task 5 — Trim "Controlled" paragraph (Fix #5)

- File: same, "Controlled" section (~lines 157–161).
- Replace the two-sentence body with a single sentence:
  ```tsx
  <p className="type-body mb-2 text-foreground max-w-prose">
    Pass <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">checked</code> and <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onChange</code> for controlled usage.
  </p>
  ```

## Verification

- Page renders at 1280px and 375px without layout breakage.
- Desktop shows the DS `Table`; mobile shows `TableMobileList` (hidden/visible swap at `md`).
- States example: 4 checkboxes stack vertically with 8px gaps at all viewports — no horizontal overflow at 375px.
- Intro is a single-line info Alert; no duplicate "Default" body copy.
- Skip `pnpm build`/`pnpm typecheck` per standing rule for surgical docs edits — UNLESS Task 1 or Task 2 adds new imports, in which case run `pnpm --filter @umichkisa-ds/docs typecheck` once at the end.
