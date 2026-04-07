# Fix Plan — `/components/loading-spinner`

Source: `apps/docs/app/components/loading-spinner/page.tsx`
Review: `docs/reviews/docs-app-review.md` § `/components/loading-spinner`

Single phase — all findings live in one .tsx file. After edits, the file passes through DS constraint review per `ds-constrained-execution`.

## Phase 1 — Apply all fixes

### Task 1.1 — Migrate API Reference table to DS Table + TableMobileList (Fix #1)

Replace the raw `<table>` block (lines ~206–243) with:

- **Desktop:** `<Table>` from `@umichkisa-ds/web` wrapped in `<div className="hidden md:block my-6">`. Use `Table.Header`, `Table.Row`, `Table.Head`, `Table.Body`, `Table.Cell` per existing migrated pages (refer to `/components/icon-button` for the established pattern).
- **Mobile:** `<TableMobileList>` wrapped in `<div className="block md:hidden my-6">`. Each row becomes a list item with prop name as the header and Type / Default / Description as labeled rows.

Rows: `size`, `label`, `showLabel`, `className` — preserve existing values exactly. Wrap inline values (`'sm' | 'md' | 'lg'`, `'md'`, `string`, `boolean`, `false`, `'Loading'`) in the same `<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">` pattern used elsewhere on the page.

### Task 1.2 — Convert header sub-paragraphs to DS Alert (Fix #4)

Replace the two `<p className="type-body-sm mb-* text-muted-foreground max-w-prose">` paragraphs (lines ~51–71) with **two separate** `<Alert variant="info">` elements from `@umichkisa-ds/web`.

- **Alert 1** — `label` / `aria-label` / `showLabel` behavior. Preserve the inline `<code>` wrappers.
- **Alert 2** — When to use `LoadingSpinner` vs `Skeleton`. Preserve the `<strong>` emphasis on component names.

After conversion, this also resolves Fix #2 (the second Alert content is the LoadingSpinner-vs-Skeleton distinction). **Skip Fix #2 as a separate edit** — the Alert conversion replaces para 3, leaving Usage Guidelines as the only other home for that distinction. Verify the content reads naturally.

> **Reconciliation note:** Tasks 1.2 and the original Fix #2 collide. The chosen resolution: convert para 2 → Alert 1, convert para 3 → Alert 2. Usage Guidelines bullets 1+2 (LoadingSpinner-vs-Skeleton) remain and become the redundant copy. If after conversion the duplication is too obvious, drop Usage Guidelines bullets 1+2 instead of the Alert. Decide during execution by reading the rendered output.

### Task 1.3 — Fix overlay demo background (Fix #3)

In the "Full-screen overlay pattern" preview (lines ~161–170):

- Change the outer wrapper from `relative rounded-md border border-border w-full h-48 overflow-hidden` to use `bg-surface-subtle` so the white overlay visually covers a non-white surface:
  - Add `bg-surface-subtle` to the outer wrapper.
  - Keep the `absolute inset-0 ... bg-surface` overlay unchanged — the white overlay over `bg-surface-subtle` content now reads as "blocking page content".

### Task 1.4 — Drop Usage Guidelines bullet 3 (Fix #5)

Remove the third `<li>` ("Prefer `sm` for inline contexts, `md` for section loaders, ...") from the Usage Guidelines `<ul>` (lines ~184–198). The Sizes section paragraph already states this mapping.

## Verification

After all four tasks:

1. Read the file end-to-end — confirm no orphaned imports, no stray closing tags.
2. Add any new imports to the top-of-file import line (`Table`, `TableMobileList`, `Alert` from `@umichkisa-ds/web`).
3. Visual check at desktop (1280px) and mobile (375px) via the docs app.
4. Run `pnpm build` and `pnpm typecheck` — both must pass before checking off TODO.

## Out of scope

- Sizes example wrapper width (dropped finding — intentional grouped layout).
- Cross-page sweep of `text-muted-foreground` at small text sizes (project-wide concern, not a single-page fix).
