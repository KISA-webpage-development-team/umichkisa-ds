# /components/divider Review Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.
> Each `.tsx` task must also pass through `ds-constrained-execution` (read `docs/DS_CONSTRAINTS.md`).

**Goal:** Apply the 1 finding from the `/components/divider` review (`docs/reviews/docs-app-review.md` § `/components/divider`) — migrate the API Reference table to the DS `Table` + `TableMobileList` pattern.

**Architecture:** Single-file edit — `apps/docs/app/components/divider/page.tsx`. No new components, no DS package changes. Reference: `apps/docs/app/components/skeleton/page.tsx` (post-fix) and `apps/docs/app/components/icon-button/page.tsx` for the canonical Table + TableMobileList pattern.

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (`Container`, `Divider`, `Table`/`TableMobileList` family), `ComponentPreview`, `highlight()`.

**File touched (all tasks):** `apps/docs/app/components/divider/page.tsx`

**Reference files:**
- `apps/docs/app/components/skeleton/page.tsx` — closest analog (Table + mobile list pattern, just merged)
- `apps/docs/app/components/icon-button/page.tsx` — original canonical pattern
- `packages/web/src/components/divider/Divider.tsx` — Divider source (only `orientation` + `className`, extends `<hr>`)
- `docs/DS_CONSTRAINTS.md` — Table usage rules
- `docs/reviews/docs-app-review.md` § `/components/divider` — finding source

**Verification command (run after every task):**
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```

---

## Task 1: Fix #1 — migrate API Reference to DS Table + TableMobileList

**Why:** Raw `<table>` violates DS component-usage rules. Recurring rule (locked across all recent component pages): every API table ships `Table` (`hidden md:block`) + `TableMobileList` (`block md:hidden`). Forwarded `<hr>` props are documented in the existing intro sentence — do NOT add a `...rest` row (decision locked during grill-me).

**Step 1: Update import**

In `apps/docs/app/components/divider/page.tsx`, change:

```tsx
import { Container, Divider } from '@umichkisa-ds/web'
```

to:

```tsx
import {
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from '@umichkisa-ds/web'
```

**Step 2: Replace the raw table block**

Replace this entire block (the `<div className="my-6 overflow-x-auto">…</div>` containing the raw `<table>`):

```tsx
<div className="my-6 overflow-x-auto">
  <table className="w-full border-collapse border border-border">
    <thead className="bg-surface-subtle">
      <tr>
        <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
        <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
        <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
        <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border">
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">orientation</code></td>
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;horizontal&quot; | &quot;vertical&quot;</code></td>
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;horizontal&quot;</code></td>
        <td className="px-4 py-3 type-body-sm text-foreground">The axis along which the divider is rendered.</td>
      </tr>
      <tr className="border-b border-border">
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
        <td className="px-4 py-3 type-body-sm text-foreground">—</td>
        <td className="px-4 py-3 type-body-sm text-foreground">Additional CSS classes to apply to the divider.</td>
      </tr>
    </tbody>
  </table>
</div>
```

with:

```tsx
<div className="my-6">
  <div className="hidden md:block">
    <Table size="sm">
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">orientation</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;horizontal&#39; | &#39;vertical&#39;</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;horizontal&#39;</code></TableCell>
          <TableCell>The axis along which the divider is rendered.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Additional CSS classes to apply to the divider.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div className="block md:hidden">
    <TableMobileList>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>orientation</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;horizontal&#39; | &#39;vertical&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;horizontal&#39;</code></span>
        <span className="type-caption text-muted-foreground">The axis along which the divider is rendered.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>className</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Additional CSS classes to apply to the divider.</span>
      </TableMobileItem>
    </TableMobileList>
  </div>
</div>
```

**Step 3: Verify build + typecheck**
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```
Expected: success.

**Step 4: DS constraint review pass**

Re-read `docs/DS_CONSTRAINTS.md` and confirm:
- No raw color/sizing utilities added
- No padding overrides on Table cells / TableMobileItem
- All `type-*` classes paired with explicit color tokens

**Step 5: Commit**
```bash
git add apps/docs/app/components/divider/page.tsx
git commit -m "docs(divider): migrate API Reference to DS Table + TableMobileList"
```

---

## Task 2: Visual spot-check + TODO

**Step 1: Visual spot-check via devtunnels**

Open `https://vnw20xbg-3000.asse.devtunnels.ms/components/divider` and confirm:
- API Reference at desktop renders DS Table; at narrow widths (<768px) it switches to the mobile list
- Two rows present: `orientation`, `className`
- Other examples (Default, Vertical, Content separator) unchanged

**Step 2: Mark TODO complete**

In `docs/TODO.md` § Batch 9, check off:
- [x] Fix `/components/divider`

(`Review /components/divider` is checked off at end of review session.)

**Step 3: Final commit**
```bash
git add docs/TODO.md
git commit -m "chore(todo): check off /components/divider fix"
```

---

## Wrap-up

After Task 2, the worktree branch is ready to merge back to `main`. Per session rules, **do NOT auto-merge** — present the diff and wait for explicit approval before merging.
