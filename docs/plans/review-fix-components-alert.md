# Fix Plan — `/components/alert`

Source: `apps/docs/app/components/alert/page.tsx`
Review: `docs/reviews/docs-app-review.md` § `/components/alert`

Single phase — all findings live in one .tsx file. After edits, the file passes through DS constraint review per `ds-constrained-execution`.

## Phase 1 — Apply all fixes

### Task 1.1 — Migrate API Reference table to DS Table + TableMobileList (Fix #1)

Replace the raw `<table>` block (lines ~289–332) with:

- **Desktop:** `<Table>` from `@umichkisa-ds/web` wrapped in `<div className="hidden md:block my-6">`. Use `Table.Header`, `Table.Row`, `Table.Head`, `Table.Body`, `Table.Cell` per the established pattern (refer to `/components/icon-button` or `/components/skeleton` for reference).
- **Mobile:** `<TableMobileList>` wrapped in `<div className="block md:hidden my-6">`. Each row becomes a list item with the prop name as the header and Type / Default / Description as labeled rows.

Rows to preserve exactly: `variant`, `title`, `icon`, `children`, `className`. Wrap inline values in the existing `<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">` pattern.

Add `Table`, `TableMobileList` to the top-of-file `@umichkisa-ds/web` import.

### Task 1.2 — Wrap shrinking ComponentPreview children with `w-full` (Fix #2)

Wrap the immediate children of these `ComponentPreview`s in `<div className="w-full">`:

- **Variants** (lines ~136–151) — wrap the existing `<div className="flex flex-col gap-4">`. Simplest: add `w-full` to the existing className → `<div className="flex flex-col gap-4 w-full">`.
- **Description only** (lines ~160–164) — wrap the single `<Alert>` in `<div className="w-full">`.
- **Custom icon** (lines ~175–179) — wrap the single `<Alert>` in `<div className="w-full">`.
- **Without icon** (lines ~190–194) — wrap the single `<Alert>` in `<div className="w-full">`.

The form examples (Form validation, Success confirmation, Info callout) already use `w-full` — leave unchanged.

### Task 1.3 — Add Accessibility section (Fix #3)

After the API Reference section, add a new `h2`:

```tsx
<h2 className="type-h2 mt-8 mb-4 text-foreground">Accessibility</h2>
<p className="type-body mb-4 text-foreground max-w-prose">
  Static alerts that are present on initial render do not need an explicit
  ARIA role — the visible icon and color convey meaning. For alerts that
  appear dynamically in response to user action (e.g., after form
  submission), pass <code>role="alert"</code> so screen readers announce
  the message immediately.
</p>
<p className="type-body mb-4 text-foreground max-w-prose">
  Use <code>role="status"</code> instead for non-critical updates that
  should not interrupt the user.
</p>
```

(Inline `<code>` reuses the existing pattern from elsewhere on the page.)

### Task 1.4 — Tighten "Success confirmation" example description (Fix #4)

Replace the current description (lines ~227–230):

> A success alert shown after a form submission, displayed above the form content to confirm the action was completed.

With a tighter version focused on the **pattern**, not the definition:

> A confirmation banner placed directly above the form the user just edited.

## Verification

After all four tasks:

1. Read the file end-to-end — confirm no orphaned imports, no stray closing tags, all `ComponentPreview`s render width-correct.
2. Confirm `Table`, `TableMobileList` are added to the top-of-file import.
3. Visual check at desktop (1280px) and mobile (375px) via the docs app — confirm the four fixed previews now fill the preview frame and the API table renders as a Table on desktop / list on mobile.
4. Run `pnpm build` and `pnpm typecheck` — both must pass before checking off TODO.

## Out of scope

- Raw `<code>` → `InlineCode` migration (handled by global Docs App Enhancements TODO).
- Form validation demo simplification (kept — the surrounding form context is the example's purpose).
