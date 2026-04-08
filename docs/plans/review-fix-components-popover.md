# Fix Plan — `/components/popover`

Source: `docs/reviews/docs-app-review.md` § /components/popover
Target file: `apps/docs/app/components/popover/page.tsx`
Constraints: `docs/DS_CONSTRAINTS.md`

## Phase 1 — Apply fixes

### Task 1 — Migrate 3 API tables to DS Table + TableMobileList _(Fix #1, #2)_

For each of the three API tables (Popover, PopoverTrigger, PopoverContent):

1. Replace the raw `<div className="my-6 overflow-x-auto"><table>...</table></div>` with a desktop DS `Table` (`hidden md:block`) — columns: Prop, Type, Default, Description.
2. Add a sibling `TableMobileList` (`block md:hidden`) mirroring the same rows in the established stacked-list pattern used by other migrated component pages (see `/components/tabs`, `/components/accordion`, `/components/alert` for reference).
3. Wrap each desktop+mobile pair in a single section so the heading rhythm and `mt-*` spacing remain unchanged.
4. Use the existing `<code>` inline-code spans inside cells unchanged (deferred to global `<InlineCode>` sweep).

Reference imports already present from DS: add `Table`, `TableMobileList` (and any required subcomponents) from `@umichkisa-ds/web`.

### Task 2 — Convert secondary deck paragraph to Alert _(Fix #3)_

Replace the second `<p>` in the header block:

```tsx
<p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
  Use Popover for non-modal, anchored content like settings panels or detail
  previews. For modal forms or confirmations, use Dialog. For action menus, use Dropdown.
</p>
```

with an `Alert` (info variant), matching the pattern used in `/components/alert`, `/components/tabs`, and `/components/accordion`. Preserve the same copy verbatim. Adjust margins so the alert occupies the same vertical space as the removed `mb-8` paragraph.

Add `Alert` to the import from `@umichkisa-ds/web`.

## Phase 2 — Verify

- Skip `pnpm build` / `pnpm typecheck` (surgical single-file docs edit per project memory).
- Visually verify desktop (1280px) and mobile (375px) at `https://vnw20xbg-3000.asse.devtunnels.ms/components/popover`.
- Confirm: 3 desktop tables render, 3 mobile lists render, alert renders below the first deck paragraph, all spacing/heading rhythm preserved.
