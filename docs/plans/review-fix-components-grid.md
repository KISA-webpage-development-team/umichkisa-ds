# Fix Plan — `/components/grid`

Source: `apps/docs/app/components/grid/page.tsx`
Findings: `docs/reviews/docs-app-review.md` § /components/grid

## Phase 1 — DS Component Migration & Structural Fixes

### Task 1.1 — Migrate API Reference table to DS `Table` + `TableMobileList`
**Fixes #1 from review.**
- Import `Table` (and subcomponents) and `TableMobileList` from `@umichkisa-ds/web` (verify exports first; check `docs/CODEBASE.md` for the canonical Table API).
- Replace the existing `<div className="my-6 overflow-x-auto"><table>...</table></div>` block with:
  - Desktop: `<Table className="hidden md:block">` (or DS-specified responsive prop) covering the same 4 columns: Prop / Type / Default / Description.
  - Mobile: `<TableMobileList className="block md:hidden">` rendering the same 4 rows as label/value pairs.
- Reuse the existing inline `<code className="...type-caption font-mono bg-surface-subtle...">` snippets inside cells (InlineCode migration is out of scope).
- Remove the now-unnecessary `overflow-x-auto` wrapper.
- **Reference an existing recently-migrated docs page (e.g., `/components/popover` or `/components/tooltip`) for the exact Table + TableMobileList pattern in use** before writing.

### Task 1.2 — Wrap every `ComponentPreview` Grid demo with `w-full`
**Fixes #2 from review.**
- For each of the 8 `<ComponentPreview>` blocks (Basic, Responsive, Element gap, Component gap, Section gap, Real-world Element, Real-world Component, Real-world Section):
  - Wrap the `<Grid>` element with `<div className="w-full">...</div>`.
- Do NOT modify the code string that's displayed — only the live rendered child. The displayed `code` should still show idiomatic `<Grid>` usage without the wrapper.

## Phase 2 — DS Token & Spacing Fixes (Helpers)

### Task 2.1 — Fix `FeatureBlock` `gap-3` violation
**Fixes #3 from review.**
- Change `gap-3` → `gap-2` in the `FeatureBlock` helper (`flex flex-col gap-3 p-6 ...`).
- Eyeball after the run; if visually too tight given `p-6`, escalate to `gap-4` (component tier). Default to `gap-2`.

### Task 2.2 — Add color token to `FeatureBlock` icon span
**Fixes #4 from review.**
- `<span className="type-h2">{icon}</span>` → `<span className="type-h2 text-foreground">{icon}</span>`.

### Task 2.3 — `rounded-lg` → `rounded-md` in demo helpers
**Fixes #5 from review.**
- Update three helpers:
  - `Placeholder`: `rounded-lg` → `rounded-md`
  - `Card`: `rounded-lg` → `rounded-md` (will be removed in Task 3.2 — apply this only if Card is still local at execution time)
  - `FeatureBlock`: `rounded-lg` → `rounded-md`
- `Tag` keeps `rounded-full` (exempt).

## Phase 3 — Content & Composition Fixes

### Task 3.1 — Promote secondary intro paragraph to DS `Alert`
**Fixes #6 from review.**
- Import `Alert` from `@umichkisa-ds/web` if not already present.
- Replace the second `<p>` ("Use Grid when you have a list of same-type items...") with an `<Alert>` callout (variant: `info` or whichever DS variant matches the established blockquote→Alert pattern on other pages — copy from a recently-migrated page).
- Place after the lead paragraph, before the `Examples` h2.

### Task 3.2 — Replace local `Card` helper with DS `Card`
**Fixes #7 from review. STRICT.**
- Import `Card` (and any required subcomponents like `CardHeader`, `CardTitle`, `CardContent`) from `@umichkisa-ds/web`.
- In the "Component gap" real-world example:
  - Replace each `<Card title="..." description="..." />` with the DS `Card` composition.
  - Update the `realWorldComponentCode` string so the displayed code matches the rendered output exactly.
- Delete the local `Card` helper definition.

### Task 3.3 — Drop redundant per-h3 captions in Real-world Examples
**Fixes #8 from review.**
- Keep the section intro under the `Real-world Examples` h2 ("Card grids at each gap tier...").
- Delete the three sub-paragraphs immediately under `Element gap` / `Component gap` / `Section gap` h3s within the Real-world section. The h3 label + the live example is sufficient.

## Phase 4 — Verification

### Task 4.1 — Build & typecheck
- `pnpm --filter @umichkisa-ds/docs build` (or repo-root `pnpm build`)
- `pnpm typecheck`
- Both must pass.

### Task 4.2 — Visual spot-check
- Open `/components/grid` at desktop (1280px) and mobile (375px).
- Verify:
  - API table renders as DS Table on desktop, TableMobileList on mobile.
  - All Grid demos now span the full preview width.
  - `FeatureBlock` cards no longer feel cramped.
  - Alert callout appears under the lead paragraph.
  - "Component gap" example renders DS Cards.
  - Real-world h3 captions are gone.

### Task 4.3 — DS constraint pass
- Re-read changed file against `docs/DS_CONSTRAINTS.md`. No new violations introduced.
