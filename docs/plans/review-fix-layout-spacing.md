# Layout Spacing Page Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 8 findings from the `/foundation/layout/spacing` review — correct stale content, migrate to DS components, replace raw colors with semantic tokens.

**Architecture:** Source edits to `page.tsx` only. Imports added for `Alert`, `Table*`, `InlineCode`. No new components created. The critical fix is updating incorrect inset values (`px-10/px-16` → `px-6/px-8`) to match the actual `Container` implementation.

**Tech Stack:** React, Tailwind CSS, `@umichkisa-ds/web` (Alert, Table), `InlineCode` docs component

---

### Task 1: Fix incorrect inset values + stale Container reference (Findings #1, #2, #8)

**Files:**
- Modify: `apps/docs/app/foundation/layout/spacing/page.tsx`

**Step 1: Fix Default Inset diagram values**

Replace lines 40-42 (the data array):

```tsx
{[
  { label: "Mobile", px: "px-4", value: "16px", width: "w-2" },
  { label: "Tablet", px: "px-6", value: "24px", width: "w-3" },
  { label: "Desktop", px: "px-8", value: "32px", width: "w-4" },
].map(({ label, px, value, width }) => (
```

Note: `width` values adjusted proportionally (`w-2`/`w-3`/`w-4`) to reflect the tighter inset scale.

**Step 2: Fix Page Shell code example**

Replace lines 187-189:

```tsx
<CodeBlock code={`<Container>
  {/* page content */}
</Container>`} lang="tsx" />
```

**Step 3: Update Page Shell bullet list to describe Container**

Replace lines 191-220 with a standard list describing what Container does internally:

```tsx
<ul className="type-body text-foreground max-w-prose list-disc pl-5 space-y-2">
  <li>
    Centers content with <InlineCode>mx-auto</InlineCode>
  </li>
  <li>
    Fills viewport width before hitting max-width (<InlineCode>w-full</InlineCode>)
  </li>
  <li>
    Caps width at 1536px (<InlineCode>max-w-screen-2xl</InlineCode>)
  </li>
  <li>
    Applies the default inset per tier (<InlineCode>px-4 md:px-6 lg:px-8</InlineCode>)
  </li>
</ul>
```

**Step 4: Fix stale Container reference paragraph**

Replace lines 222-226:

```tsx
<p className="type-body mb-4 text-foreground max-w-prose mt-4">
  The{' '}
  <InlineCode>Container</InlineCode>
  {' '}component encodes this pattern. Use it instead of composing the utility classes manually.
</p>
```

**Step 5: Remove redundant Max-width closing paragraph (Finding #8)**

Remove lines 84-87:

```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  The full page shell combines max-width, centering, and the default inset
  into one element. Everything inside it is within the layout system.
</p>
```

**Step 6: Fix Full-Bleed code example**

Replace lines 242-247:

```tsx
<CodeBlock code={`<div className="w-full bg-brand-primary">
  {/* full-bleed background */}
  <Container>
    {/* constrained content — aligns with the rest of the page */}
  </Container>
</div>`} lang="tsx" />
```

**Step 7: Verify page renders**

Run: `pnpm --filter @umichkisa-ds/docs build`
Expected: SUCCESS

**Step 8: Commit**

```bash
git add apps/docs/app/foundation/layout/spacing/page.tsx
git commit -m "fix(docs): correct inset values and Container references on layout/spacing page"
```

---

### Task 2: Replace raw colors with semantic tokens in diagrams (Finding #3)

**Files:**
- Modify: `apps/docs/app/foundation/layout/spacing/page.tsx`

**Step 1: Fix Default Inset diagram colors**

Replace the diagram div (around lines 38-53). For each item in the `.map()`:

```tsx
<div key={label}>
  <p className="mb-1 type-caption font-mono text-muted-foreground">{label} — <span className="text-foreground">{px}</span> ({value})</p>
  <div className="flex h-10 w-full items-stretch overflow-hidden rounded-lg border border-border">
    {/* Illustration-only: opacity on brand-accent to visualize inset padding */}
    <div className={`${width} shrink-0 bg-brand-accent/40`} />
    <div className="flex flex-1 items-center justify-center bg-surface-subtle text-muted-foreground type-caption">content</div>
    <div className={`${width} shrink-0 bg-brand-accent/40`} />
  </div>
</div>
```

**Step 2: Fix Max-width diagram colors**

Replace lines 71-81:

```tsx
<div className="my-8">
  <div className="relative h-16 w-full overflow-hidden rounded-lg border border-border bg-surface-subtle">
    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
      <div className="h-full w-full max-w-[80%] bg-brand-accent/20 flex items-center justify-center type-caption text-muted-foreground font-mono">
        max-w-screen-2xl
      </div>
    </div>
    <div className="absolute inset-y-0 left-0 w-[10%] bg-surface-muted border-r border-dashed border-border" />
    <div className="absolute inset-y-0 right-0 w-[10%] bg-surface-muted border-l border-dashed border-border" />
  </div>
  <p className="mt-2 text-center type-caption text-muted-foreground">viewport &rarr; constrained content area &rarr; viewport</p>
</div>
```

**Step 3: Fix Column Gutter diagram colors**

Replace the column gutter diagram items:

```tsx
<div key={label}>
  <p className="mb-1 type-caption font-mono text-muted-foreground">{label}</p>
  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
    {Array.from({ length: cols }).map((_, i) => (
      <div key={i} className="h-10 rounded-md bg-surface-subtle border border-border" />
    ))}
  </div>
</div>
```

**Step 4: Verify page renders**

Run: `pnpm --filter @umichkisa-ds/docs build`
Expected: SUCCESS

**Step 5: Commit**

```bash
git add apps/docs/app/foundation/layout/spacing/page.tsx
git commit -m "fix(docs): replace raw colors with semantic tokens in layout/spacing diagrams"
```

---

### Task 3: Replace blockquotes with Alert component (Finding #4)

**Files:**
- Modify: `apps/docs/app/foundation/layout/spacing/page.tsx`

**Step 1: Add Alert import**

Add `Alert` to the import from `@umichkisa-ds/web` on line 1:

```tsx
import { Container, Alert } from '@umichkisa-ds/web'
```

**Step 2: Replace all 4 blockquotes**

Replace each `<blockquote>` block with an `<Alert>`:

Blockquote 1 (lines 24-28):
```tsx
<Alert variant="info" title="Rule">
  If a spacing value is not in Tailwind&#39;s scale, it does not belong in the codebase.
</Alert>
```

Blockquote 2 (lines 173-177):
```tsx
<Alert variant="info" title="Rule">
  Do not scale vertical spacing with breakpoints. If a layout feels too dense at a smaller viewport, the fix is fewer columns — not larger gaps.
</Alert>
```

Blockquote 3 (lines 228-232):
```tsx
<Alert variant="info" title="Rule">
  Never apply only part of the page shell. All four concerns (centering, full-width, max-width, inset) must be present together.
</Alert>
```

Blockquote 4 (lines 253-257):
```tsx
<Alert variant="info" title="Rule">
  Never apply a full-bleed background directly to the page shell element — this clips the background at 1536px. Always use a separate outer wrapper.
</Alert>
```

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/layout/spacing/page.tsx
git commit -m "fix(docs): replace raw blockquotes with Alert component on layout/spacing"
```

---

### Task 4: Fix text-xs typography floor violations (Finding #5)

**Files:**
- Modify: `apps/docs/app/foundation/layout/spacing/page.tsx`

**Step 1: Replace all `text-xs` with `type-caption`**

This was partially done in Task 2 (diagram labels already updated). Verify no remaining `text-xs` instances exist. If any remain, replace `text-xs` → `type-caption` across the file.

**Step 2: Verify no `text-xs` remains**

Search the file for `text-xs`. Expected: 0 matches.

**Step 3: Commit (if changes needed)**

```bash
git add apps/docs/app/foundation/layout/spacing/page.tsx
git commit -m "fix(docs): replace text-xs with type-caption on layout/spacing"
```

---

### Task 5: Migrate raw table to DS Table component (Finding #6)

**Files:**
- Modify: `apps/docs/app/foundation/layout/spacing/page.tsx`

**Step 1: Add Table imports**

Update line 1:

```tsx
import { Container, Alert, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
```

**Step 2: Replace raw `<table>` with DS Table + mobile fallback**

Replace lines 133-164 with:

```tsx
<div className="my-6">
  <div className="hidden md:block">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tier</TableHead>
          <TableHead>Tailwind</TableHead>
          <TableHead>Pixels</TableHead>
          <TableHead>Use cases</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Element</TableCell>
          <TableCell><InlineCode>gap-2</InlineCode></TableCell>
          <TableCell>8px</TableCell>
          <TableCell>Label &rarr; input, icon &rarr; text, caption below a field, heading &rarr; subtitle</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Component</TableCell>
          <TableCell><InlineCode>gap-4</InlineCode></TableCell>
          <TableCell>16px</TableCell>
          <TableCell>Stacked form fields, list items, stacked cards, navigation items</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Section</TableCell>
          <TableCell><InlineCode>gap-6</InlineCode></TableCell>
          <TableCell>24px</TableCell>
          <TableCell>Between major page sections (e.g. filter bar + data table, page heading + form block)</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div className="block md:hidden">
    <TableMobileList>
      <TableMobileItem>
        <span className="type-body-sm text-foreground font-semibold">Element</span>
        <span className="type-caption text-muted-foreground"><InlineCode>gap-2</InlineCode> · 8px · Label &rarr; input, icon &rarr; text, caption below a field</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground font-semibold">Component</span>
        <span className="type-caption text-muted-foreground"><InlineCode>gap-4</InlineCode> · 16px · Stacked form fields, list items, stacked cards</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground font-semibold">Section</span>
        <span className="type-caption text-muted-foreground"><InlineCode>gap-6</InlineCode> · 24px · Between major page sections</span>
      </TableMobileItem>
    </TableMobileList>
  </div>
</div>
```

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/layout/spacing/page.tsx
git commit -m "fix(docs): migrate vertical spacing table to DS Table component with mobile fallback"
```

---

### Task 6: Migrate inline code elements to InlineCode + add import (Finding #7 partial + cleanup)

**Files:**
- Modify: `apps/docs/app/foundation/layout/spacing/page.tsx`

**Step 1: Add InlineCode import**

```tsx
import { InlineCode } from '@/components/InlineCode'
```

**Step 2: Replace all raw `<code className="...">` with `<InlineCode>`**

Replace every instance of:

```tsx
<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">...</code>
```

with:

```tsx
<InlineCode>...</InlineCode>
```

There are ~10 instances across the file (intro paragraph, Column Gutter section, Page Shell bullet list, Container reference paragraph).

**Step 3: Verify build**

Run: `pnpm --filter @umichkisa-ds/docs build`
Expected: SUCCESS

**Step 4: Commit**

```bash
git add apps/docs/app/foundation/layout/spacing/page.tsx
git commit -m "fix(docs): migrate inline code to InlineCode component on layout/spacing"
```

---

### Task 7: Final verification

**Step 1: Full build + typecheck**

Run: `pnpm build && pnpm typecheck`
Expected: both pass

**Step 2: Visual verification**

Navigate to `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/layout/spacing` and verify:
- Default Inset diagram shows corrected values (16px/24px/32px)
- All diagrams use semantic token colors (no gray-* visible)
- Blockquotes replaced with blue Alert boxes
- Vertical Spacing table renders with DS Table styling
- Page Shell section shows `<Container>` code example
- Full-Bleed section shows `<Container>` nested inside outer wrapper
- No `text-xs` sized text anywhere on the page
- Standard bullet list (disc markers) in Page Shell section
- InlineCode elements render at parent font size

**Step 3: Also verify DS_CONSTRAINTS.md consistency**

The DS_CONSTRAINTS.md line 134 already has the correct values (`px-4 md:px-6 lg:px-8`). No update needed there.
