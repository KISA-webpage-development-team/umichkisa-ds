# Fix Plan — /components/dialog

Source: `apps/docs/app/components/dialog/page.tsx`
Review: `docs/reviews/docs-app-review.md` § /components/dialog

Single phase — all findings apply to one file.

## Phase 1 — Apply fixes

### Task 1 — Migrate API tables to DS `Table` + `TableMobileList` (Fix #1)

- Replace all 7 raw `<table>` blocks (Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose) with the established docs API-table pattern:
  - Desktop: `<Table>` from `@umichkisa-ds/web` wrapped with `hidden md:block`
  - Mobile: `<TableMobileList>` wrapped with `block md:hidden`
- Mirror column structure used on prior migrated pages (Prop / Type / Default / Description).
- Reference an already-migrated page (e.g., `/components/tabs` or `/components/accordion`) for the exact wrapper markup if any.

### Task 2 — Fix "Basic" example description (Fix #2)

- In the Basic section paragraph, drop the trailing sentence "Triggered via a secondary button." (the example uses `variant="primary"`).
- Resulting copy: "A dialog with a title, description, and the default close button."

### Task 3 — Swap action hierarchy in "With footer" example (Fix #3)

- In both the live example **and** the `footerCode` template string:
  - `Cancel` button → remove `variant="primary"` (use default)
  - `Confirm` button → add `variant="primary"`
- Re-run `highlight()` flow remains unchanged (it picks up the new `footerCode`).

### Task 4 — Swap action hierarchy in "Custom close" example (Fix #4)

- In both the live example **and** the `customCloseCode` template string:
  - `Discard` button → remove `variant="primary"` (use default)
  - `Save changes` button → add `variant="primary"`

### Task 5 — Convert secondary intro paragraph to Alert (Fix #5)

- Replace the second `<p className="type-body-sm mb-8 text-muted-foreground max-w-prose">…</p>` with an `<Alert>` component containing the same comparison text ("Use Dialog for confirmations and forms that block interaction with the page. For non-modal anchored content, use Popover. For action menus, use Dropdown.")
- Match the variant + props used on `/components/accordion`, `/components/alert`, `/components/tabs`, `/components/popover` for consistency.
- Add `Alert` to the import from `@umichkisa-ds/web`.

## Verification

- Page renders correctly at desktop (1280px) and mobile (375px).
- API tables show the desktop Table on ≥md and the TableMobileList on <md.
- All 4 demo dialogs still open and dismiss correctly.
- No DS_CONSTRAINTS violations introduced.
- Skip `pnpm build` / `pnpm typecheck` per docs-edit policy unless imports/types change (Task 5 adds an import — run `pnpm typecheck` after Task 5).
