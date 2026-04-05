# Typography Scale — Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 5 review findings on `/foundation/typography/scale` — migrate raw tables/blockquotes to DS components, fix raw typography utilities, normalize spacing, and remove redundant content.

**Architecture:** Single-file edit (`apps/docs/app/foundation/typography/scale/page.tsx`). Import DS components (`Alert`, `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableMobileList`, `TableMobileItem`) from `@umichkisa-ds/web`. Follow established patterns from `colors/tokens/page.tsx`.

**Tech Stack:** React, Tailwind v4, `@umichkisa-ds/web` components

---

### Task 1: Fix specimen labels — `text-xs` → `type-caption` (Finding #3)

**Files:**
- Modify: `apps/docs/app/foundation/typography/scale/page.tsx`

**What to change:**

Replace all 8 specimen label `<p>` elements that use `text-xs text-muted-foreground font-mono` with `type-caption text-muted-foreground font-mono`.

Lines affected: 23, 26, 29, 32, 38, 41, 44, 49 — each has this pattern:
```tsx
<p className="mt-1 text-xs text-muted-foreground font-mono">type-display</p>
```

Replace with:
```tsx
<p className="mt-1 type-caption text-muted-foreground font-mono">type-display</p>
```

Do this for all 8 occurrences (type-display, type-h1, type-h2, type-h3, type-body, type-body-sm, type-label, type-caption).

**Verify:** `pnpm typecheck` passes.

---

### Task 2: Normalize spacing to three-tier system (Finding #4)

**Files:**
- Modify: `apps/docs/app/foundation/typography/scale/page.tsx`

**What to change:**

1. **Specimen container** (line 18-19): Change `my-8 rounded-xl` to `my-6 rounded-xl` (section-tier gap between intro and specimen box).

2. **Specimen container inner padding** (line 19): Change `px-8 py-10 space-y-8` to `px-6 py-6 space-y-6` (consistent on-grid padding, section-tier internal spacing between specimen items).

3. **Scale reference table wrapper** (line 56): Change `my-6` to `my-6` (already section-tier — keep as-is).

4. **Blockquotes** (lines 147, 159, 177): Change `my-4` to `my-4` (component-tier between notes — keep as-is, these are component-level items within the notes section).

5. **`<hr>` separator** (line 188): Change `my-8` to `my-6` (section-tier).

6. **Responsive Behavior heading** (line 191): Change `mt-8 mb-4` to `mt-6 mb-4` (section-tier top margin, component-tier bottom margin — keep `mb-4`).

7. **Responsive table wrapper** (line 210): Change `my-6` to `my-6` (already section-tier — keep).

Summary of actual changes:
- Line 18: `my-8` → `my-6`
- Line 19: `px-8 py-10 space-y-8` → `px-6 py-6 space-y-6`
- Line 188: `my-8` → `my-6`
- Line 191: `mt-8` → `mt-6`

**Verify:** Visual check that spacing looks correct. `pnpm typecheck` passes.

---

### Task 3: Migrate raw `<blockquote>` → DS `Alert` (Finding #2)

**Files:**
- Modify: `apps/docs/app/foundation/typography/scale/page.tsx`

**What to change:**

Add `Alert` to the import statement:
```tsx
import { Alert, Container } from '@umichkisa-ds/web'
```

Replace 4 blockquotes:

**Blockquote 1 — "Note"** (lines 147-157):
```tsx
<Alert variant="info" title="Note" className="my-4">
  <p>
    The Tailwind column shows the equivalent Tailwind v4 font-size token for
    developer reference. The actual values are implemented as responsive{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@media</code>{' '}
    overrides inside the{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-*</code>{' '}
    class definitions — these are not Tailwind utilities.
  </p>
</Alert>
```

**Blockquote 2 — "Display vs H1"** (lines 159-175):
```tsx
<Alert variant="info" title="Display vs H1" className="my-4">
  <p>
    Both use SejongHospital Bold. The distinction is context, not style —
    Display is for hero sections and landing pages, H1 is for page titles
    within the app. Never apply both{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>{' '}
    and{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code>{' '}
    styling on the same page. If a page has a Display hero and requires a
    semantic{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;h1&gt;</code>{' '}
    element for accessibility, apply{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code>{' '}
    styling to the{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;h1&gt;</code>{' '}
    — the visual hierarchy takes precedence over the class name.
  </p>
</Alert>
```

**Blockquote 3 — "Body SM vs Label"** (lines 177-186):
```tsx
<Alert variant="info" title="Body SM vs Label" className="my-4">
  <p>
    Same size, different weight. Body SM ({' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code>{' '}
    ) is for reading. Label ({' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-medium</code>{' '}
    ) is for interacting. The extra weight signals that something is actionable.
  </p>
</Alert>
```

**Blockquote 4 — "Avoid breakpoints"** (lines 257-268):
```tsx
<Alert variant="warning" className="my-4">
  <p>
    Avoid{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm:</code>,{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xl:</code>,
    or{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">2xl:</code>{' '}
    for typography overrides. The layout system operates on three tiers only.
    See{' '}
    <a href="/foundation/layout/breakpoints" className="text-link underline-offset-2 hover:underline">Breakpoints</a>{' '}
    for the full breakpoint policy.
  </p>
</Alert>
```

**Verify:** `pnpm typecheck` passes.

---

### Task 4: Consolidate redundant content (Finding #5)

**Files:**
- Modify: `apps/docs/app/foundation/typography/scale/page.tsx`

**What to change:**

The "Note" Alert (from Task 3) and the closing paragraph after the responsive table say the same thing — responsive scaling is built into the `type-*` classes.

**Remove the "Note" Alert entirely** (the one about `@media` overrides). Its only unique information is that the Tailwind column shows equivalents. Fold that into the responsive table closing paragraph by appending a sentence:

Replace the existing closing paragraph (lines 249-255):
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  Responsive scaling is baked into the{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-*</code>{' '}
  class definitions. Components do not need to apply breakpoint overrides — reaching for{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>{' '}
  on any viewport automatically applies the correct size. The Tailwind column
  in the scale reference table above shows the equivalent font-size token for
  developer reference only — the actual values come from responsive{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@media</code>{' '}
  overrides inside each class definition.
</p>
```

**Verify:** Read the page to confirm the information about the Tailwind column is preserved and the redundancy is gone.

---

### Task 5: Migrate raw `<table>` → DS `Table` component (Finding #1)

**Files:**
- Modify: `apps/docs/app/foundation/typography/scale/page.tsx`

**What to change:**

Add Table components to the import:
```tsx
import { Alert, Container, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
```

**Table 1: Scale Reference (lines 57-144)**

Desktop (wrap in `hidden md:block`):
```tsx
<div className="my-6">
  <div className="hidden md:block">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class</TableHead>
          <TableHead>Font</TableHead>
          <TableHead>Tailwind</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Line height</TableHead>
          <TableHead>Tracking</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-5xl</code></TableCell>
          <TableCell>3rem / 48px</TableCell>
          <TableCell>—</TableCell>
          <TableCell>1.25</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-tight</code></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-4xl</code></TableCell>
          <TableCell>2.25rem / 36px</TableCell>
          <TableCell>—</TableCell>
          <TableCell>1.25</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-tight</code></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-2xl</code></TableCell>
          <TableCell>1.5rem / 24px</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-semibold</code></TableCell>
          <TableCell>1.375</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-xl</code></TableCell>
          <TableCell>1.25rem / 20px</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-semibold</code></TableCell>
          <TableCell>1.375</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-base</code></TableCell>
          <TableCell>1rem / 16px</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></TableCell>
          <TableCell>1.625</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body-sm</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-sm</code></TableCell>
          <TableCell>0.875rem / 14px</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></TableCell>
          <TableCell>1.5</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-sm</code></TableCell>
          <TableCell>0.875rem / 14px</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-medium</code></TableCell>
          <TableCell>1.5</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-xs</code></TableCell>
          <TableCell>0.75rem / 12px</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></TableCell>
          <TableCell>1.5</TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div className="block md:hidden">
    <TableMobileList>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>
        <span className="type-caption text-muted-foreground">font-sejong-bold · 3rem / 48px · Line height 1.25 · tracking-tight</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code>
        <span className="type-caption text-muted-foreground">font-sejong-bold · 2.25rem / 36px · Line height 1.25 · tracking-tight</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code>
        <span className="type-caption text-muted-foreground">font-pretendard · 1.5rem / 24px · Line height 1.375 · tracking-normal</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code>
        <span className="type-caption text-muted-foreground">font-pretendard · 1.25rem / 20px · Line height 1.375 · tracking-normal</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code>
        <span className="type-caption text-muted-foreground">font-pretendard · 1rem / 16px · Line height 1.625 · tracking-normal</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body-sm</code>
        <span className="type-caption text-muted-foreground">font-pretendard · 0.875rem / 14px · Line height 1.5 · tracking-normal</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code>
        <span className="type-caption text-muted-foreground">font-pretendard · 0.875rem / 14px · Line height 1.5 · tracking-normal</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code>
        <span className="type-caption text-muted-foreground">font-pretendard · 0.75rem / 12px · Line height 1.5 · tracking-normal</span>
      </TableMobileItem>
    </TableMobileList>
  </div>
</div>
```

**Table 2: Responsive Behavior (lines 211-247)**

Desktop (wrap in `hidden md:block`):
```tsx
<div className="my-6">
  <div className="hidden md:block">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class</TableHead>
          <TableHead>Mobile (default)</TableHead>
          <TableHead>Tablet <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md:</code></TableHead>
          <TableHead>Desktop <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg:</code></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code></TableCell>
          <TableCell>2rem / 32px</TableCell>
          <TableCell>2.5rem / 40px</TableCell>
          <TableCell>3rem / 48px</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code></TableCell>
          <TableCell>1.75rem / 28px</TableCell>
          <TableCell>2rem / 32px</TableCell>
          <TableCell>2.25rem / 36px</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code></TableCell>
          <TableCell>1.25rem / 20px</TableCell>
          <TableCell>1.375rem / 22px</TableCell>
          <TableCell>1.5rem / 24px</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code></TableCell>
          <TableCell>1.125rem / 18px</TableCell>
          <TableCell>1.25rem / 20px</TableCell>
          <TableCell>1.25rem / 20px</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div className="block md:hidden">
    <TableMobileList>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>
        <span className="type-caption text-muted-foreground">Mobile: 2rem / 32px · Tablet: 2.5rem / 40px · Desktop: 3rem / 48px</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code>
        <span className="type-caption text-muted-foreground">Mobile: 1.75rem / 28px · Tablet: 2rem / 32px · Desktop: 2.25rem / 36px</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code>
        <span className="type-caption text-muted-foreground">Mobile: 1.25rem / 20px · Tablet: 1.375rem / 22px · Desktop: 1.5rem / 24px</span>
      </TableMobileItem>
      <TableMobileItem>
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code>
        <span className="type-caption text-muted-foreground">Mobile: 1.125rem / 18px · Tablet: 1.25rem / 20px · Desktop: 1.25rem / 20px</span>
      </TableMobileItem>
    </TableMobileList>
  </div>
</div>
```

**Verify:** `pnpm typecheck` passes. Both tables render correctly at desktop and show mobile list view at < 768px.

---

### Task 6: Final verification

**Run:**
```bash
pnpm build && pnpm typecheck
```

Both must pass. Visually verify the page at 1280px and 375px if possible.
