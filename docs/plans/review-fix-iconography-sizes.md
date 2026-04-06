# /foundation/iconography/sizes Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Every `.tsx` change must pass through `ds-constrained-execution` / `ds-review` per project rules.

**Goal:** Apply 5 review findings (2 major + 3 minor) to `/foundation/iconography/sizes` so the page visually demonstrates the icon size scale and the icon-with-text pairings, and uses DS vocabulary throughout.

**Architecture:** Single-file edit. Migrate both hand-rolled `<table>` blocks to the DS `Table` compound component, add a leading "Preview" column to each that renders real `<Icon>` instances at the row's prescribed size, fix the Pairing column's vocabulary, rename one H2, tighten one paragraph. No new components, no new files.

**Tech Stack:** Next.js 15 App Router, React, TailwindCSS v4 with DS semantic tokens, `@umichkisa-ds/web` (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `Icon`, `Container`).

**Source review:** `docs/reviews/docs-app-review.md` § `/foundation/iconography/sizes`.
**Constraints:** `docs/DS_CONSTRAINTS.md` (Iconography, Typography, Layout sections).

---

## Phase 1 — All fixes (single file)

### Task 1: Update imports

**Files:**
- Modify: `apps/docs/app/foundation/iconography/sizes/page.tsx:1`

**Step 1: Replace the imports line**

Current (line 1):
```tsx
import { Container } from '@umichkisa-ds/web'
```

New:
```tsx
import {
  Container,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@umichkisa-ds/web'
```

Leave the `CodeBlock` import (line 2) untouched.

**Step 2: Verify the import resolves**

Run: `pnpm --filter @umichkisa-ds/docs typecheck`
Expected: PASS, zero errors.

If `Table*` exports are missing from the package barrel, stop and check `packages/web/src/index.ts` — they should be re-exported. Do not work around this; fix the export instead.

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/iconography/sizes/page.tsx
git commit -m "chore(docs): import DS Table + Icon for iconography/sizes fix"
```

---

### Task 2: Replace the Scale table (Fix #1)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/sizes/page.tsx:20-57`

**Step 1: Replace the entire Scale table block**

Find the existing block (lines 20–57):
```tsx
<div className="my-6 overflow-x-auto">
  <table className="w-full border-collapse border border-border">
    <thead className="bg-surface-subtle">
      ...xs/sm/md/lg/xl rows...
    </tbody>
  </table>
</div>
```

Replace with the DS `Table` version that adds a leading **Preview** column. Use `info` from the icon registry as the neutral reference icon — its silhouette reads clearly at all five sizes:

```tsx
<div className="my-6">
  <Table size="sm">
    <TableHeader>
      <TableRow>
        <TableHead>Preview</TableHead>
        <TableHead>Token</TableHead>
        <TableHead>px</TableHead>
        <TableHead>Use case</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell><Icon name="info" size="xs" /></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xs</code></TableCell>
        <TableCell>12px</TableCell>
        <TableCell>Inline with caption text, badge labels</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><Icon name="info" size="sm" /></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm</code></TableCell>
        <TableCell>16px</TableCell>
        <TableCell>Compact UI — tags, small inputs, secondary actions</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><Icon name="info" size="md" /></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code></TableCell>
        <TableCell>20px</TableCell>
        <TableCell><strong>Default</strong> — buttons, nav items, most UI</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><Icon name="info" size="lg" /></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code></TableCell>
        <TableCell>24px</TableCell>
        <TableCell>Prominent actions, section headers</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><Icon name="info" size="xl" /></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xl</code></TableCell>
        <TableCell>32px</TableCell>
        <TableCell>Display, empty states, decorative</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

**Notes:**
- The `<strong>` on the `md` row drops `font-semibold text-foreground` per DS rule — `<strong>` alone is the correct emphasis pattern (see `iconography/overview` review Finding #1).
- `Table` already wraps content in `w-full overflow-x-auto`, so the outer wrapper drops `overflow-x-auto`.
- The raw `<code>` chip styling stays — covered by the deferred global `<InlineCode>` migration TODO.

**Step 2: Visual smoke check**

Reload `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/iconography/sizes` and verify the Preview column shows five icons growing 12 → 32px down the column.

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/iconography/sizes/page.tsx
git commit -m "fix(docs): add Preview column to icon scale table

Migrates the Scale table to the DS Table component and renders an Icon
at each row's size so readers can compare visually. Closes review
finding #1 for /foundation/iconography/sizes."
```

---

### Task 3: Replace the Pairing table (Fixes #2 + #3)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/sizes/page.tsx:127-154`

**Step 1: Replace the entire Pairing table block**

Find the existing block (lines 127–154) and replace with:

```tsx
<div className="my-6">
  <Table size="sm">
    <TableHeader>
      <TableRow>
        <TableHead>Preview</TableHead>
        <TableHead>Text style</TableHead>
        <TableHead>Icon size</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          <span className="flex items-center gap-2 text-foreground">
            <Icon name="info" size="sm" />
            <span className="type-caption">Caption text</span>
          </span>
        </TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body-sm</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm</code> (16px)</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span className="flex items-center gap-2 text-foreground">
            <Icon name="info" size="md" />
            <span className="type-body">Body text</span>
          </span>
        </TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code> (20px)</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span className="flex items-center gap-2 text-foreground">
            <Icon name="info" size="md" />
            <span className="type-h3">Subheading</span>
          </span>
        </TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code> or <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code> (20–24px)</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span className="flex items-center gap-2 text-foreground">
            <Icon name="info" size="lg" />
            <span className="type-h2">Heading</span>
          </span>
        </TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg</code> (24px)</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

**Notes:**
- The Preview column uses `flex items-center gap-2` per DS Iconography rule for icon+text pairings.
- "Text style" column now references `type-*` classes — the wrong-vocabulary fix (Finding #3).
- Icons inherit `currentColor` from the parent `text-foreground` per DS color rule.
- `gap-2` is the default per DS Iconography rule.
- The Caption row pairs both `type-caption` and `type-body-sm` since the same `sm` icon size pairs with both.

**Step 2: Visual smoke check**

Reload the page. Each preview row should show an icon next to text rendered at the matching `type-*` class. The icon should sit slightly below the text's cap height — that's expected ("the icon should be slightly smaller than the text's cap height" per the page's own prose).

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/iconography/sizes/page.tsx
git commit -m "fix(docs): add Preview column + DS vocabulary to icon pairing table

Migrates the Pairing table to DS Table, renders real icon-with-text
pairings, and rewrites the Text style column from raw Tailwind text-*
utilities to DS type-* class names. Closes review findings #2 and #3
for /foundation/iconography/sizes."
```

---

### Task 4: Rename "Default is md" heading + drop chip (Fix #4)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/sizes/page.tsx:67`

**Step 1: Replace the heading**

Current (line 67):
```tsx
<h2 className="type-h2 mt-8 mb-4 text-foreground">Default is <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code></h2>
```

New:
```tsx
<h2 className="type-h2 mt-8 mb-4 text-foreground">The Default Size</h2>
```

Leave `mt-8` in place — the doubled-spacing pattern is deferred to a global TODO and must not be touched on this page only.

**Step 2: Commit**

```bash
git add apps/docs/app/foundation/iconography/sizes/page.tsx
git commit -m "fix(docs): rename 'Default is md' heading, drop inline code chip

Closes review finding #4 for /foundation/iconography/sizes."
```

---

### Task 5: Tighten "Default" paragraph 1 (Fix #5)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/sizes/page.tsx:68-74`

**Step 1: Replace paragraph 1**

Current paragraph 1 (lines 68–74):
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  When in doubt, use{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code>.
  {' '}The 20px default is sized to pair comfortably with
  body text, sit correctly in buttons, and read clearly in navigation. It is the
  right choice for the vast majority of UI contexts.
</p>
```

New paragraph 1:
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  When in doubt, use{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md</code>.
  {' '}The 20px default is calibrated to pair with body text and read clearly
  across the most common UI contexts.
</p>
```

**Notes:**
- Drops the restated examples ("buttons, nav items") — already in the Scale table's `md` row.
- Paragraph 2 (the rule, lines 75–80) stays unchanged.

**Step 2: Commit**

```bash
git add apps/docs/app/foundation/iconography/sizes/page.tsx
git commit -m "fix(docs): tighten Default paragraph to drop restated examples

Closes review finding #5 for /foundation/iconography/sizes."
```

---

### Task 6: Verification

**Step 1: Build + typecheck**

Run: `pnpm build && pnpm typecheck`
Expected: both pass with zero errors.

**Step 2: DS constraint review**

Invoke the `ds-review` agent against `apps/docs/app/foundation/iconography/sizes/page.tsx` to confirm no new DS violations were introduced. Hand it `docs/DS_CONSTRAINTS.md` § Iconography, Typography, and Color.

**Step 3: Visual review at 1280px**

Navigate to `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/iconography/sizes` and confirm:
- Scale table has 5 rows, leading column shows icons growing 12 → 32px.
- The `md` row visibly stands out (via the `<strong>` "Default" label).
- Pairing table has 4 rows, leading column shows real icon+text combos at each level.
- "The Default Size" heading reads cleanly with no inline chip.
- No regression elsewhere.

**Step 4: Mark TODO done**

Edit `docs/TODO.md` Batch 5:
- Check off `- [x] Review /foundation/iconography/sizes` (already done by review session)
- Check off `- [x] Fix /foundation/iconography/sizes`

**Step 5: Final commit (if any cleanup)**

```bash
git status
# if clean, no commit needed
```

---

## Out of Scope (deferred findings)

These are recorded in the review file and will not be touched by this plan:

- Raw `<code>` chip migration to `<InlineCode>` — global TODO.
- `<h2>` `id` attributes — global TODO.
- `<hr my-8>` + `<h2 mt-8>` doubled section spacing — new global TODO ("Normalize section spacing across foundation pages").

Touching any of these creates a one-page-only inconsistency until the global sweep runs.
