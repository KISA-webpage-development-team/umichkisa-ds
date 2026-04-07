# /components/skeleton Review Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.
> Each `.tsx` task must also pass through `ds-constrained-execution` (read `docs/DS_CONSTRAINTS.md`).

**Goal:** Apply the 3 findings from the `/components/skeleton` review (`docs/reviews/docs-app-review.md` § `/components/skeleton`).

**Architecture:** Single file edit — `apps/docs/app/components/skeleton/page.tsx`. No new components, no DS package changes. Reference: `apps/docs/app/components/icon-button/page.tsx` for the canonical Table + TableMobileList + Alert pattern.

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (`Container`, `Skeleton`, `Alert`, `Table`/`TableMobileList` family), `ComponentPreview`, `highlight()`.

**File touched (all tasks):** `apps/docs/app/components/skeleton/page.tsx`

**Reference files:**
- `apps/docs/app/components/icon-button/page.tsx` — canonical pattern for Alert + Table/TableMobileList migration
- `packages/web/src/components/skeleton/Skeleton.tsx` — implementation (verify default `variant`)
- `docs/DS_CONSTRAINTS.md` — typography, Table usage rules, h1 rules
- `docs/reviews/docs-app-review.md` § `/components/skeleton` — findings source

**Verification command (run after every task):**
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```

---

## Task 1: Fix #3 — strip redundant font/tracking classes from h1

**Why:** `type-h1` already encodes `font-family: var(--font-sejong-bold)` and `letter-spacing: -0.025em` (verified in `packages/web/src/styles/index.css:169-174`). Other recent component pages (badge, icon-button after fix) use only `type-h1 mb-4 text-foreground`.

**Step 1: Edit**

In `apps/docs/app/components/skeleton/page.tsx`, change:

```tsx
<h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Skeleton</h1>
```

to:

```tsx
<h1 className="type-h1 mb-4 text-foreground">Skeleton</h1>
```

**Step 2: Verify build**
```bash
pnpm --filter @umichkisa-ds/docs build
```
Expected: success.

**Step 3: Commit**
```bash
git add apps/docs/app/components/skeleton/page.tsx
git commit -m "fix(docs/skeleton): strip raw font-sejong-bold tracking-tight from h1 (type-h1 is source of truth)"
```

---

## Task 2: Fix #2 — convert aria-busy guidance paragraph to DS Alert

**Why:** The second intro paragraph explains the developer-facing `aria-busy="true"` pattern — exactly the kind of "you should know this" callout the recurring blockquote→Alert migration covers. Currently it's rendered as muted `type-body-sm` body copy, which deprioritizes important a11y guidance.

**Step 0: Confirm Alert API**

Open `apps/docs/app/components/icon-button/page.tsx` and locate the existing `<Alert variant="info" ...>` usage. Mirror the same prop shape and class composition.

**Step 1: Add Alert to imports**

Change:

```tsx
import { Container, Skeleton } from '@umichkisa-ds/web'
```

to:

```tsx
import { Alert, Container, Skeleton } from '@umichkisa-ds/web'
```

**Step 2: Replace the paragraph**

Replace this block:

```tsx
<p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
  When grouping multiple skeletons as a loading state, wrap them in a
  container with{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    aria-busy=&quot;true&quot;
  </code>{' '}
  to communicate the loading state to screen readers.
</p>
```

with:

```tsx
<Alert variant="info" className="mb-8">
  <p className="type-body-sm text-foreground">
    When grouping multiple skeletons as a loading state, wrap them in a
    container with{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
      aria-busy=&quot;true&quot;
    </code>{' '}
    to communicate the loading state to screen readers.
  </p>
</Alert>
```

**Step 3: Verify build + typecheck**
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```
Expected: success.

**Step 4: DS constraint review pass**

Re-read `docs/DS_CONSTRAINTS.md` § Colors (Feedback States) and § Typography (Usage). Confirm:
- No raw color classes added
- `type-*` paired with explicit color token (`text-foreground`)
- No padding override on Alert default

**Step 5: Commit**
```bash
git add apps/docs/app/components/skeleton/page.tsx
git commit -m "docs(skeleton): convert aria-busy guidance to DS Alert (info)"
```

---

## Task 3: Fix #1 — migrate API Reference to DS Table + TableMobileList

**Why:** Raw `<table>` violates DS component-usage rules. Recurring rule: every API table must ship `Table` (`hidden md:block`) + `TableMobileList` (`block md:hidden`). Also add the missing `…rest` row to honor the intro statement that the component "extends native `<div>` attributes."

**Step 0: Re-read icon-button reference**

Open `apps/docs/app/components/icon-button/page.tsx` lines 240–331 and copy the exact two-block (`hidden md:block` + `block md:hidden`) pattern. Match prop shapes, sizes, code/inline-code styling, and the `· required` / `· default` annotation pattern in mobile items.

**Step 1: Update import**

Change:

```tsx
import { Alert, Container, Skeleton } from '@umichkisa-ds/web'
```

to:

```tsx
import {
  Alert,
  Container,
  Skeleton,
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

**Step 2: Replace the raw table**

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
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></td>
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;rectangular&quot; | &quot;circular&quot;</code></td>
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;rectangular&#39;</code></td>
        <td className="px-4 py-3 type-body-sm text-foreground">Shape of the placeholder. Rectangular applies <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">rounded-md</code>; circular applies full rounding for avatars.</td>
      </tr>
      <tr className="border-b border-border">
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
        <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
        <td className="px-4 py-3 type-body-sm text-foreground">—</td>
        <td className="px-4 py-3 type-body-sm text-foreground">Controls dimensions and layout. Use height and width utilities to match the content being replaced.</td>
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
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;rectangular&#39; | &#39;circular&#39;</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;rectangular&#39;</code></TableCell>
          <TableCell>Shape of the placeholder. Rectangular applies <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">rounded-md</code>; circular applies full rounding for avatars.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Controls dimensions and layout. Use height and width utilities to match the content being replaced.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">…rest</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">HTMLDivAttributes</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Forwarded to the underlying <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&lt;div&gt;</code> (e.g. <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">aria-hidden</code>, <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">role</code>, <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">style</code>).</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div className="block md:hidden">
    <TableMobileList>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>variant</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;rectangular&#39; | &#39;circular&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;rectangular&#39;</code></span>
        <span className="type-caption text-muted-foreground">Shape of the placeholder. Rectangular applies <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">rounded-md</code>; circular applies full rounding for avatars.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>className</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Controls dimensions and layout. Use height and width utilities to match the content being replaced.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>…rest</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">HTMLDivAttributes</code></span>
        <span className="type-caption text-muted-foreground">Forwarded to the underlying <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&lt;div&gt;</code> (e.g. <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">aria-hidden</code>, <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">role</code>, <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">style</code>).</span>
      </TableMobileItem>
    </TableMobileList>
  </div>
</div>
```

**Step 3: Verify Skeleton actually forwards `…rest`**

Open `packages/web/src/components/skeleton/Skeleton.tsx`. Confirm the component spreads remaining props onto the `<div>`. If it does NOT, **stop and remove the `…rest` row** from both desktop and mobile blocks (don't document props that aren't supported).

**Step 4: Verify build + typecheck**
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```
Expected: success.

**Step 5: DS constraint review pass**

Re-read `docs/DS_CONSTRAINTS.md` and confirm:
- No raw color/sizing utilities added
- No padding overrides on Table cells / TableMobileItem
- All `type-*` classes paired with explicit color tokens

**Step 6: Commit**
```bash
git add apps/docs/app/components/skeleton/page.tsx
git commit -m "docs(skeleton): migrate API Reference to DS Table + TableMobileList; add ...rest row"
```

---

## Task 4: Final verification + visual spot-check

**Step 1: Full project verification**
```bash
pnpm build && pnpm typecheck
```
Expected: both pass.

**Step 2: Visual spot-check via devtunnels**

Open `https://vnw20xbg-3000.asse.devtunnels.ms/components/skeleton` and confirm:
- H1 still renders Sejong Bold + tight tracking (coming from `type-h1`)
- aria-busy guidance now appears as an info Alert
- API Reference at desktop renders DS Table; at narrow widths it switches to the mobile list
- Three rows present: `variant`, `className`, `…rest`

**Step 3: Mark TODO complete**

In `docs/TODO.md` § Batch 8, check off:
- [x] Review `/components/skeleton` _(done at end of review session)_
- [x] Fix `/components/skeleton`

**Step 4: Final commit**
```bash
git add docs/TODO.md
git commit -m "chore(todo): check off /components/skeleton review + fix"
```

---

## Wrap-up

After Task 4, the worktree branch is ready to merge back to `main`. Per session rules, **do NOT auto-merge** — present the diff and wait for explicit approval before merging.
