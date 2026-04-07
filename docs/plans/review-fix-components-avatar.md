# /components/avatar Review Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.
> Each `.tsx` task must also pass through `ds-constrained-execution` (read `docs/DS_CONSTRAINTS.md`).

**Goal:** Apply the 2 findings from the `/components/avatar` review (`docs/reviews/docs-app-review.md`).

**Architecture:** Single file edit — `apps/docs/app/components/avatar/page.tsx`. No new components, no DS package changes. Reference: `apps/docs/app/components/icon-button/page.tsx` for the canonical Table + TableMobileList pattern.

**File touched (all tasks):** `apps/docs/app/components/avatar/page.tsx`

**Reference files:**
- `apps/docs/app/components/icon-button/page.tsx` — canonical Table + TableMobileList migration
- `docs/DS_CONSTRAINTS.md` — typography, table usage rules
- `docs/reviews/docs-app-review.md` § `/components/avatar` — findings source

**Verification command (run after every task):**
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```

---

## Task 1: Fix #2 — reword "All props are optional"

**Why:** `name` is functionally important — it provides accessible alt text and powers the initials fallback. Saying it's optional is technically true but misleading.

**Step 1: Edit**

In `apps/docs/app/components/avatar/page.tsx`, change the API Reference intro line:

```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  All props are optional.
</p>
```

to:

```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  All props are technically optional, but{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    name
  </code>{' '}
  is strongly recommended — it provides the image&apos;s alt text and powers
  the initials fallback when the image is missing or fails to load.
</p>
```

**Step 2: Verify build**
```bash
pnpm --filter @umichkisa-ds/docs build
```
Expected: success.

**Step 3: Commit**
```bash
git add apps/docs/app/components/avatar/page.tsx
git commit -m "docs(avatar): clarify that name prop is strongly recommended"
```

---

## Task 2: Fix #1 — migrate API Reference to DS Table + TableMobileList

**Why:** Raw `<table>` violates DS component-usage rules and lacks mobile fallback. Match the icon-button page 1:1.

**Step 0: Re-read icon-button reference**

Open `apps/docs/app/components/icon-button/page.tsx` lines 240–331 and confirm the exact `Table` / `TableHeader` / `TableBody` / `TableRow` / `TableHead` / `TableCell` + `TableMobileList` / `TableMobileItem` shape.

**Step 1: Update import**

Change:
```tsx
import { Container, Avatar } from '@umichkisa-ds/web'
```

to:
```tsx
import {
  Avatar,
  Container,
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

Replace this block (lines 173–210):

```tsx
<div className="my-6 overflow-x-auto">
  <table className="w-full border-collapse border border-border">
    <thead className="bg-surface-subtle">
      <tr>
        <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
        ...
      </tr>
    </thead>
    <tbody>
      ...
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
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">src</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Image URL. Falls back to initials or icon on error.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">name</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>User name. Used for alt text and initials fallback. Strongly recommended.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></TableCell>
          <TableCell>Avatar size. sm = 32px, md = 40px, lg = 56px.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div className="block md:hidden">
    <TableMobileList>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>src</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Image URL. Falls back to initials or icon on error.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>name</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code> · strongly recommended</span>
        <span className="type-caption text-muted-foreground">User name. Used for alt text and initials fallback.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>size</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;md&#39;</code></span>
        <span className="type-caption text-muted-foreground">Avatar size. sm = 32px, md = 40px, lg = 56px.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>className</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
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

Re-read `docs/DS_CONSTRAINTS.md` and confirm: no raw colors, no token violations, no padding overrides on Table cells.

**Step 5: Commit**
```bash
git add apps/docs/app/components/avatar/page.tsx
git commit -m "docs(avatar): migrate API Reference from raw <table> to DS Table + TableMobileList"
```

---

## Task 3: Final verification + spot-check

**Step 1: Full project verification**
```bash
pnpm build && pnpm typecheck
```
Expected: both pass.

**Step 2: Visual spot-check via devtunnels**

Open `https://vnw20xbg-3000.asse.devtunnels.ms/components/avatar` and confirm:
- Reworded API Reference intro reads cleanly
- Desktop API Reference renders the DS Table with the four rows
- Resize to ~375px width and confirm `TableMobileList` shows the same four props

**Step 3: Mark TODO complete**

In `docs/TODO.md` § Batch 8, check off:
- [x] Review `/components/avatar`
- [x] Fix `/components/avatar`

**Step 4: Final commit**
```bash
git add docs/TODO.md
git commit -m "chore(todo): check off /components/avatar review + fix"
```

---

## Wrap-up

After Task 3, the worktree branch is ready to merge back to `main`. Per session rules, **do NOT auto-merge** — present the diff and wait for explicit approval before merging.
