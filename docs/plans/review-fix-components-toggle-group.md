# Fix Plan — `/components/toggle-group`

Review findings: `docs/reviews/docs-app-review.md` → `/components/toggle-group`

File: `apps/docs/app/components/toggle-group/page.tsx`

## Phase 1 — Fixes (single phase; all findings affect the same file)

### Task 1 — Migrate API Reference tables to DS Table + TableMobileList (Fix #1)

Replace the two raw `<table>` blocks in the API Reference section:
- **ToggleGroup props table** (5 rows: `value`, `onValueChange`, `items`, `fullWidth`, `className`)
- **ToggleGroupItem table** (3 rows: `value`, `label`, `icon`)

For each:
1. Add `hidden md:block` wrapper with DS `Table`, `TableHeader`, `TableRow`, `TableHead`, `TableBody`, `TableCell`.
2. Add `block md:hidden` wrapper with `TableMobileList` + `TableMobileRow` items, matching the established pattern used by sibling component docs pages (see `/components/pagination`, `/components/calendar` for reference).
3. Preserve existing inline `<code>` treatment in cells (`type-caption font-mono bg-surface-subtle rounded px-1 py-0.5`) — InlineCode migration is explicitly excluded.
4. Note the `ToggleGroupItem` table uses a **Required** column (Yes/No) instead of **Default** — preserve that column in both Table and TableMobileList forms.

Verify imports include `Table`, `TableHeader`, `TableRow`, `TableHead`, `TableBody`, `TableCell`, `TableMobileList`, `TableMobileRow` from `@umichkisa-ds/web`.

### Task 2 — Replace intro subparagraph with Alert (Fix #2)

Current (page.tsx lines 72–76):
```tsx
<p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
  Keyboard accessible — use arrow keys to move between options.
  Use Tabs when each option reveals its own content panel, or Radio
  for form-level choices within a FormItem.
</p>
```

Replace with DS `<Alert>`:
- Variant: `info`
- Keep both pieces of content (keyboard note + cross-refs to Tabs/Radio). Consider concise rewording but preserve the "Tabs vs Radio" decision guidance.
- Remove the muted-paragraph treatment entirely.
- Maintain bottom spacing to the next `<h2>` (the existing `mb-8` translated to appropriate wrapper spacing, matching sibling pages).

Ensure `Alert` is imported from `@umichkisa-ds/web`.

### Task 3 — Fix h3 rhythm under API Reference (Fix #3)

Change the "ToggleGroup" h3 className (line 118) from `mt-8 mb-2` to `mt-6 mb-2` so the first h3 after the API Reference h2 matches the established first-h3-mt-6 rhythm. Leave the "ToggleGroupItem" h3 at `mt-8 mb-2`.

## Verification

Per skip-build-for-small-docs-edits rule: this is a single-file surgical docs edit — no `pnpm build` / `pnpm typecheck` required. Manually verify:
- Desktop (1280px): both tables render via `Table`, h3 rhythm correct, Alert replaces muted paragraph.
- Mobile (375px): both tables render via `TableMobileList`, Alert wraps properly.
