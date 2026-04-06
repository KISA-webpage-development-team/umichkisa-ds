# /components/icon-button Review Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.
> Each `.tsx` task must also pass through `ds-constrained-execution` (read `docs/DS_CONSTRAINTS.md`).

**Goal:** Apply the 6 findings from the `/components/icon-button` review (`docs/reviews/docs-app-review.md`).

**Architecture:** Single file edit — `apps/docs/app/components/icon-button/page.tsx`. No new components, no DS package changes. Reference: `apps/docs/app/components/badge/page.tsx` for the canonical component-page pattern.

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (`Container`, `IconButton`, `Tooltip`, `Alert`, `Table` family), `ComponentPreview`, `highlight()`.

**File touched (all tasks):** `apps/docs/app/components/icon-button/page.tsx`

**Reference files:**
- `apps/docs/app/components/badge/page.tsx` — canonical pattern (h1 styling, Table usage)
- `packages/web/src/components/button/IconButton.tsx` — implementation
- `docs/DS_CONSTRAINTS.md` — typography, iconography (icon-only), Table usage rules
- `docs/reviews/docs-app-review.md` § `/components/icon-button` — findings source

**Verification command (run after every task):**
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```

---

## Task 1: Fix #1 — strip raw font/tracking classes from H1

**Why:** `type-h1` already encapsulates `font-sejong-bold` and `tracking-tight` per DS_CONSTRAINTS. Other component pages (badge) use only `type-h1 mb-4 text-foreground`.

**Step 1: Edit**

In `apps/docs/app/components/icon-button/page.tsx`, change the H1 line:

```tsx
<h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">IconButton</h1>
```

to:

```tsx
<h1 className="type-h1 mb-4 text-foreground">IconButton</h1>
```

**Step 2: Verify build**
```bash
pnpm --filter @umichkisa-ds/docs build
```
Expected: success.

**Step 3: Commit**
```bash
git add apps/docs/app/components/icon-button/page.tsx
git commit -m "fix(docs/icon-button): strip raw font-sejong-bold tracking-tight from h1 (type-h1 is source of truth)"
```

---

## Task 2: Fix #4 — reword header description

**Why:** "Wraps `Button` internally" leaks implementation detail.

**Step 1: Edit**

In the header `<p>` block, change:

```tsx
A square, icon-only button for compact actions like toolbar controls,
close buttons, and menu triggers. Wraps{' '}
<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
  Button
</code>{' '}
internally, inheriting all variant styles and focus behavior. Requires{' '}
```

to:

```tsx
A square, icon-only button for compact actions like toolbar controls,
close buttons, and menu triggers. Shares{' '}
<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
  Button
</code>
&apos;s variants, sizes, and focus behavior. Requires{' '}
```

**Step 2: Verify build**
```bash
pnpm --filter @umichkisa-ds/docs build
```
Expected: success.

**Step 3: Commit**
```bash
git add apps/docs/app/components/icon-button/page.tsx
git commit -m "docs(icon-button): reword header to drop 'wraps Button internally' implementation leak"
```

---

## Task 3: Fix #5 — shorten Default body

**Why:** Default paragraph restates defaults already in the API table; replace with a sentence highlighting the required props.

**Step 1: Edit**

Replace the Default `<p>` block:

```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  The simplest usage. Renders as{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    secondary
  </code>{' '}
  variant at{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    md
  </code>{' '}
  size by default.
</p>
```

with:

```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  The simplest usage —{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    icon
  </code>{' '}
  and{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    aria-label
  </code>{' '}
  are the only required props.
</p>
```

**Step 2: Verify build**
```bash
pnpm --filter @umichkisa-ds/docs build
```
Expected: success.

**Step 3: Commit**
```bash
git add apps/docs/app/components/icon-button/page.tsx
git commit -m "docs(icon-button): shorten Default body to highlight required props"
```

---

## Task 4: Fix #3 — add "With Tooltip" example section

**Why:** DS_CONSTRAINTS mandates Tooltip as the preferred wrapper for icon-only buttons; the docs currently show zero coverage.

**Step 0: Confirm Tooltip API**

Read `packages/web/src/components/tooltip/Tooltip.tsx` to confirm the public API and import path. Use whichever pattern the existing tooltip docs page (`apps/docs/app/components/tooltip/page.tsx`) uses for examples.

**Step 1: Add code constant**

Near the other `*Code` constants (after `disabledCode`), add:

```tsx
const tooltipCode = `import { IconButton, Tooltip } from '@umichkisa-ds/web'

<Tooltip content="Edit profile">
  <IconButton icon="pencil" aria-label="Edit profile" />
</Tooltip>`
```

**Step 2: Add to highlight() Promise.all**

Update the destructuring + `Promise.all` to include `tooltipHighlighted`:

```tsx
const [
  defaultHighlighted,
  variantsHighlighted,
  sizesHighlighted,
  disabledHighlighted,
  tooltipHighlighted,
] = await Promise.all([
  highlight(defaultCode),
  highlight(variantsCode),
  highlight(sizesCode),
  highlight(disabledCode),
  highlight(tooltipCode),
])
```

**Step 3: Add the import**

Update the top import to include `Tooltip`:

```tsx
import { Container, IconButton, Tooltip } from '@umichkisa-ds/web'
```

(Verify export name from Step 0; adjust if Tooltip is structured as a compound component.)

**Step 4: Add the section JSX**

Insert after the Disabled `ComponentPreview` block and before the API Reference `<h2>`:

```tsx
{/* With Tooltip */}
<h3 className="type-h3 mt-8 mb-2 text-foreground">With Tooltip</h3>
<p className="type-body mb-2 text-foreground max-w-prose">
  Wrap an{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    IconButton
  </code>{' '}
  in a{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    Tooltip
  </code>{' '}
  to expose its label to sighted users. The tooltip content must match{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    aria-label
  </code>{' '}
  exactly.
</p>
<ComponentPreview code={tooltipCode} highlightedCode={tooltipHighlighted}>
  <Tooltip content="Edit profile">
    <IconButton icon="pencil" aria-label="Edit profile" />
  </Tooltip>
</ComponentPreview>
```

**Step 5: Verify build**
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```
Expected: success.

**Step 6: Commit**
```bash
git add apps/docs/app/components/icon-button/page.tsx
git commit -m "docs(icon-button): add 'With Tooltip' example section"
```

---

## Task 5: Fix #6 — add Accessibility section

**Why:** Consolidates aria-label guidance, tooltip-match rule, and the touch-target rationale into a single short section.

**Step 0: Confirm Alert API**

Read `packages/web/src/components/alert/Alert.tsx` and skim a docs page that already uses Alert (e.g., `apps/docs/app/foundation/iconography/accessibility/page.tsx`) to copy the exact prop pattern (`variant="info"` or similar).

**Step 1: Add Alert to imports**

```tsx
import { Alert, Container, IconButton, Tooltip } from '@umichkisa-ds/web'
```

(Adjust to match Alert's actual export; confirm in Step 0.)

**Step 2: Insert Accessibility section**

Insert after the new "With Tooltip" `ComponentPreview` and before `<h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>`:

```tsx
{/* ── Accessibility ───────────────────────────────────── */}
<h2 className="type-h2 mt-8 mb-4 text-foreground">Accessibility</h2>
<Alert variant="info" className="mb-4">
  <ul className="list-disc pl-5 space-y-1 type-body-sm text-foreground">
    <li>
      <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
      must describe the <strong>action</strong>, not the icon — use{' '}
      <em>&ldquo;Edit profile&rdquo;</em>, not <em>&ldquo;Edit&rdquo;</em> or{' '}
      <em>&ldquo;Pencil&rdquo;</em>.
    </li>
    <li>
      When wrapped in a{' '}
      <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Tooltip</code>,
      the tooltip text must match{' '}
      <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
      exactly to avoid duplicate or conflicting screen-reader announcements.
    </li>
  </ul>
</Alert>
<p className="type-body text-foreground max-w-prose">
  All three sizes meet the WCAG 44×44px touch target. Even when the visible
  button is 32px (
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size=&quot;sm&quot;</code>
  ), an invisible{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">::after</code>{' '}
  pseudo-element extends the hit area to 44×44 without changing the visible
  box.
</p>
```

**Step 3: Verify build + lint**
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```
Expected: success.

**Step 4: DS constraint review pass**

Re-read `docs/DS_CONSTRAINTS.md` § Iconography (Icon-Only Interactive Elements) and § Accessibility — confirm:
- No raw color/sizing utilities on the new markup
- `type-*` classes paired with explicit color tokens
- No left border accents, no padding overrides on Card/Alert defaults

**Step 5: Commit**
```bash
git add apps/docs/app/components/icon-button/page.tsx
git commit -m "docs(icon-button): add Accessibility section (aria-label, tooltip match, touch target)"
```

---

## Task 6: Fix #2 — migrate API Reference to DS Table components

**Why:** Raw `<table>` violates DS component-usage rules. Match the badge page exactly.

**Step 0: Re-read badge reference**

Open `apps/docs/app/components/badge/page.tsx` and copy the exact `<Table>` / `TableHeader` / `TableBody` / `TableRow` / `TableHead` / `TableCell` shape used in its API Reference table.

**Step 1: Update import**

```tsx
import {
  Alert,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
} from '@umichkisa-ds/web'
```

**Step 2: Replace the raw table**

Replace this entire block:

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
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">icon</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">IconName</code></TableCell>
        <TableCell>—</TableCell>
        <TableCell>
          Lucide icon name in kebab-case. Required. See the{' '}
          <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a>{' '}
          page for available names.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">aria-label</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
        <TableCell>—</TableCell>
        <TableCell>Accessible label. Required — there is no visible text.</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;primary&quot; | &quot;secondary&quot; | &quot;tertiary&quot; | &quot;destructive&quot;</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;secondary&#39;</code></TableCell>
        <TableCell>Visual style. Passed through to Button.</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></TableCell>
        <TableCell>Controls square dimensions (32 / 40 / 48px) and icon size.</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
        <TableCell>Disables the button, reducing opacity and blocking pointer events.</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
        <TableCell>—</TableCell>
        <TableCell>Merged via cn(). Use for layout utilities only — never override variant styles.</TableCell>
      </TableRow>
    </TableBody>
  </Table>
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
git add apps/docs/app/components/icon-button/page.tsx
git commit -m "docs(icon-button): migrate API Reference from raw <table> to DS Table components"
```

---

## Task 7: Final verification + visual spot-check

**Step 1: Full project verification**
```bash
pnpm build && pnpm typecheck
```
Expected: both pass.

**Step 2: Visual spot-check via devtunnels**

Open `https://vnw20xbg-3000.asse.devtunnels.ms/components/icon-button` and visually confirm:
- H1 renders identically (Sejong Bold, tight tracking — coming from `type-h1`)
- Header description reads cleanly with the new wording
- Default section has the shortened body
- "With Tooltip" example renders, tooltip appears on hover
- Accessibility section displays Alert + paragraph correctly
- API Reference matches the badge page's table styling

**Step 3: Mark TODO complete**

In `docs/TODO.md` § Batch 7, check off:
- [x] Review `/components/icon-button` _(already done at the end of the review session)_
- [x] Fix `/components/icon-button`

**Step 4: Final commit**
```bash
git add docs/TODO.md
git commit -m "chore(todo): check off /components/icon-button fix"
```

---

## Wrap-up

After Task 7, the worktree branch is ready to merge back to `main`. Per session rules, **do NOT auto-merge** — present the diff and wait for explicit approval before merging.
