# Fix Plan — `/components/icon`

Source review: `docs/reviews/docs-app-review.md` § `/components/icon`
Page source: `apps/docs/app/components/icon/page.tsx`
Constraints: `docs/DS_CONSTRAINTS.md`

**Context:** Source-only review (Pass A + Pass C). Pass B (visual 1280 / 375) was skipped due to a frozen Chrome session. After fixes land, do a manual visual spot-check at both viewports.

---

## Phase 1 — DS Component Migrations

All three findings touch the same file: `apps/docs/app/components/icon/page.tsx`. They are independent edits within that file and can be done in any order; group them in one phase.

### Task 1.1 — Migrate API Reference table to `Table` + `TableMobileList` (Fix #1)

- Replace the raw `<div className="my-6 overflow-x-auto"><table>...</table></div>` block (lines ~201–249) with two siblings:
  - DS `Table` wrapped in `hidden md:block` for desktop
  - `TableMobileList` wrapped in `block md:hidden` for mobile
- Mirror the column structure used on `/components/button` and `/components/icon-button` API Reference sections — read those page sources first to copy the exact prop/type/default/description column layout and the mobile list field shape.
- Rows (4): `name`, `size`, `label`, `className` — content unchanged from the current table.
- Imports: add `Table` (and subcomponents) + `TableMobileList` from `@umichkisa-ds/web`.

### Task 1.2 — Replace inline button example with `IconButton` (Fix #2)

- In the "Inside a button" section (lines ~138–162):
  - Update the prose so the section still teaches *"`<Icon>` is non-interactive — for interactive icons use `IconButton`"*. Keep the lead sentence but reframe the recommendation.
  - Replace the inline `<button aria-label="Delete" className="... min-w-[44px] min-h-[44px] ... focus-visible:outline-[var(...)] ...">` with `<IconButton aria-label="Delete" icon="trash-2" />` (verify exact `IconButton` API in `packages/web/src/components/.../IconButton.tsx` before writing — match the prop names exactly).
  - Update the `buttonCode` source string to match the new example one-to-one so the highlighted code block stays in sync.
- Imports: add `IconButton` from `@umichkisa-ds/web`.

### Task 1.3 — Migrate Available Icons grid to `Grid` + `Card` (Fix #3)

- Replace the raw grid block (lines ~169–182):
  ```tsx
  <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-4 my-6">
    {([...] as const).map((name) => (
      <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-surface-subtle border border-border">
        <Icon name={name} size="md" />
        <span className="...">{name}</span>
      </div>
    ))}
  </div>
  ```
  with the DS `Grid` + `Card` pattern, modeled on `apps/docs/components/ColorSwatch.tsx`:
  ```tsx
  <Grid cols={...} gap="component" className="my-6">
    {iconNames.map((name) => (
      <Card key={name} className="items-center">
        <Icon name={name} size="md" />
        <p className="type-caption font-mono text-muted-foreground text-center break-all">
          {name}
        </p>
      </Card>
    ))}
  </Grid>
  ```
- **Verify the `Grid` component API** (`packages/web/src/components/layout/Grid.tsx` or similar) before writing — confirm exact prop names for column counts and gap tier. Pick a column setup that yields ~3 cols on mobile, ~4–5 on md, ~6 on lg given 25 tiles.
- Default `Card` styling (`bg-surface`, `border`, `rounded-md`, `p-4`, `gap-4`) is intentional. **Only override is `items-center`** (layout utility, allowed). No `bg-*` override, no padding override.
- Imports: add `Grid`, `Card` from `@umichkisa-ds/web`.

### Task 1.4 — TODO bookkeeping

- In `docs/TODO.md`, check off **line 184** *"Add Props table to `/components/icon`"* — already satisfied by the existing API Reference (4 rows cover all `<Icon>` props). Note in the commit message.

---

## Phase 2 — Verification

1. `pnpm build` — must pass.
2. `pnpm typecheck` — must pass.
3. **Manual visual spot-check** (deferred from review): open `/components/icon` at 1280px and 375px, scroll top to bottom, confirm:
   - API table (desktop) and mobile list both render and are aligned with `/components/button` and `/components/icon-button`.
   - "Inside a button" example renders an `IconButton` and the highlighted code matches.
   - Icon Card grid reflows cleanly at all three breakpoints; no overflow, no chunky gaps, label text wraps within Card.
4. If any visual regression appears that wasn't caught in source review, file a follow-up finding rather than expanding this fix.

---

## TODO updates (after Phase 2 passes)

- Check off `- [ ] Review /components/icon` in `docs/TODO.md` Batch 8.
- Check off `- [ ] Fix /components/icon` in `docs/TODO.md` Batch 8.
- Check off line 184 (Props table follow-up).
