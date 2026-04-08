# Fix Plan — `/components/card`

Source: `apps/docs/app/components/card/page.tsx`
Findings: `docs/reviews/docs-app-review.md` § /components/card

## Phase 1 — Content + structure trims (small edits)

### Task 1.1 — Drop redundant intro paragraph (Fix #3)
- Remove the second `<p>` in the page header (`"Compose Card from its sub-components — CardHeader, CardTitle, CardDescription, CardContent, and CardFooter — to build flexible layouts for events, profiles, project teams, and more."`).
- Keep the first intro `<p>` and adjust its `mb-*` so it sits naturally above the Anatomy `<h2>`.

### Task 1.2 — Trim Anatomy section (Fix #5)
- In the `<CodeBlock lang="text">` under Anatomy, replace the contents with the structural tree only — no parenthetical styling notes:
  ```
  Card
    CardHeader
      CardTitle
      CardDescription
    CardContent
    CardFooter
  ```
- Do not change the heading or the surrounding markup.

### Task 1.3 — Fix custom composition icon row gap (Fix #2)
- In the Custom composition example, change the icon row's `gap-4` → `gap-3`.
- Apply to **both** the live JSX (`ComponentPreview` children) and the `compositionCode` template string so the rendered code matches the demo.

### Task 1.4 — Demote `CardTitle` heading level in demos (Fix #4)
- For every `<CardTitle>` inside `ComponentPreview` children **and** every `CardTitle` line in the `basicCode`, `withFooterCode`, `gridCode` template strings, add `as="h4"`.
  - Basic example: 1 occurrence (live + code)
  - With footer example: 1 occurrence (live + code)
  - Cards in a grid example: 3 occurrences (live + code)
- The Custom composition example has no `CardTitle`, so nothing to do there.
- Do **not** modify the API Reference section's `<h3>CardTitle</h3>` — that's the docs section heading, not a `CardTitle` component.

## Phase 2 — Table migration (Fix #1)

### Task 2.1 — Migrate all 6 API reference tables to DS `Table` + `TableMobileList`
- Tables to migrate (in order they appear): Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
- Each migration:
  1. Replace the `<div className="my-6 overflow-x-auto"><table>...</table></div>` block with a desktop `<Table>` (`hidden md:block`) and a mobile `<TableMobileList>` (`block md:hidden`).
  2. Use the same column set: Prop / Type / Default / Description.
  3. Preserve all current row content verbatim (prop names, type strings, defaults, description text including inline `<code>` snippets).
- Reference an existing migrated component docs page (e.g., `/components/dialog`, `/components/dropdown`) for the exact `Table` + `TableMobileList` API and column patterns.
- Remove the now-unused `overflow-x-auto` wrapper divs.
- After migration, verify imports at the top of `page.tsx` include `Table` and `TableMobileList` from `@umichkisa-ds/web`.

## Verification

- Run `pnpm build` and `pnpm typecheck` — both must pass.
- Manually verify in browser at desktop and mobile widths:
  - All 6 API tables render via DS `Table` on desktop, `TableMobileList` on mobile.
  - Anatomy block shows only the tree (no styling parentheticals).
  - Page intro has only one paragraph above Anatomy.
  - Custom composition icon row uses `gap-3`.
  - Example CardTitles render as `<h4>` (inspect DOM).
- DS constraint review pass (`ds-review` agent) on `apps/docs/app/components/card/page.tsx`.
