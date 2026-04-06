# Typography Usage Page Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 4 findings + 1 bonus from the `/foundation/typography/usage` review.

**Architecture:** Source-only edits to `page.tsx` (content + markup fixes) plus one line change in `Alert.tsx` (pre overflow). No new components — uses existing `InlineCode` and `DoDont`/`Do`/`Dont`.

**Tech Stack:** React, Tailwind CSS, `@umichkisa-ds/web` (Alert component)

---

### Task 1: Fix Alert `<pre>` overflow (Bonus B1)

**Files:**
- Modify: `packages/web/src/components/feedback/Alert.tsx:60`

**Step 1: Add overflow handling to Alert children div**

In `Alert.tsx`, line 60, change:

```tsx
<div className="flex flex-col gap-1 min-w-0">
```

to:

```tsx
<div className="flex flex-col gap-1 min-w-0 [&_pre]:overflow-x-auto">
```

This ensures any `<pre>` element inside an Alert (including DoDont examples) scrolls horizontally instead of overflowing the container.

**Step 2: Build to verify no type errors**

Run: `pnpm --filter @umichkisa-ds/web build`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add packages/web/src/components/feedback/Alert.tsx
git commit -m "fix(alert): add overflow-x-auto to pre elements inside Alert"
```

---

### Task 2: Update DoDont examples to use semantic classes (Finding #1)

**Files:**
- Modify: `apps/docs/app/foundation/typography/usage/page.tsx:72-105`

**Step 1: Update Font boundary DoDont**

Replace lines 72-85:

```tsx
<DoDont>
  <Do>
    <div className="space-y-3 py-2">
      <p className="type-display tracking-tight text-foreground">Annual Gala Night</p>
      <p className="type-h2 text-foreground">Event Schedule</p>
    </div>
  </Do>
  <Dont>
    <div className="space-y-3 py-2">
      <p className="type-display tracking-tight text-foreground">Annual Gala Night</p>
      <p className="type-h2 !font-sejong-bold text-foreground">Event Schedule</p>
    </div>
  </Dont>
</DoDont>
```

The Do uses correct semantic classes. The Don't shows the mistake of overriding H2's font to SejongHospital.

**Step 2: Update Line length DoDont**

Replace lines 96-105:

```tsx
<DoDont>
  <Do>
    <article className="max-w-prose">
      <p className="type-body text-foreground">KISA brings together Korean international students across all schools and programs at the University of Michigan.</p>
    </article>
  </Do>
  <Dont>
    <p className="type-body text-foreground w-full">KISA brings together Korean international students across all schools and programs at the University of Michigan, fostering community through events, mentorship, and shared experience.</p>
  </Dont>
</DoDont>
```

**Step 3: Verify page renders**

Run: `pnpm --filter @umichkisa-ds/docs dev` (already running)
Navigate to `/foundation/typography/usage` and verify DoDont examples render correctly.

**Step 4: Commit**

```bash
git add apps/docs/app/foundation/typography/usage/page.tsx
git commit -m "fix(docs): use semantic type-* classes in typography usage DoDont examples"
```

---

### Task 3: Standardize Links bullet list (Finding #2)

**Files:**
- Modify: `apps/docs/app/foundation/typography/usage/page.tsx:160-181`

**Step 1: Replace manual bullet list with standard list**

Replace lines 160-181:

```tsx
<ul className="type-body text-foreground max-w-prose list-disc pl-5 space-y-2">
  <li>
    Color: always{' '}
    <InlineCode>text-link</InlineCode>
  </li>
  <li>
    Decoration: underline by default ({' '}
    <InlineCode>underline</InlineCode>)
  </li>
  <li>
    Hover:{' '}
    <InlineCode>text-brand-primary</InlineCode>{' '}
    (Michigan Blue)
  </li>
  <li>
    Visited: no separate visited style — leave at default link color
  </li>
</ul>
```

Note: This also migrates inline `<code>` to `<InlineCode>` — make sure the import is added in Task 5.

**Step 2: Commit**

```bash
git add apps/docs/app/foundation/typography/usage/page.tsx
git commit -m "fix(docs): standardize links bullet list to use list-disc"
```

---

### Task 4: Add visual examples for State typography and Links (Finding #3)

**Files:**
- Modify: `apps/docs/app/foundation/typography/usage/page.tsx`

**Step 1: Add visual example after Error messages prose (after line 130)**

Insert after the error messages paragraph:

```tsx
<div className="mt-2 mb-4 rounded-md border border-border bg-surface-subtle px-4 py-3">
  <p className="type-body text-foreground">Email address</p>
  <p className="type-caption text-error mt-1">Please enter a valid email address</p>
</div>
```

**Step 2: Add visual example after Helper text prose (after line 143)**

Insert after the helper text paragraph:

```tsx
<div className="mt-2 mb-4 rounded-md border border-border bg-surface-subtle px-4 py-3">
  <p className="type-body text-foreground">Bio</p>
  <p className="type-caption text-muted-foreground mt-1">Maximum 160 characters</p>
</div>
```

**Step 3: Add visual example after Links prose (after line 188, before the hr)**

Insert after the "Never use text-foreground for links" paragraph:

```tsx
<div className="mt-2 mb-4 rounded-md border border-border bg-surface-subtle px-4 py-3">
  <p className="type-body text-foreground">
    Read the{' '}
    <a href="#" className="text-link underline hover:text-brand-primary">contribution guidelines</a>{' '}
    before submitting.
  </p>
</div>
```

**Step 4: Verify all three examples render correctly**

Navigate to `/foundation/typography/usage` and scroll to each section. Verify:
- Error example shows red caption text below body text
- Helper example shows muted caption text below body text
- Link example shows blue underlined link in body context

**Step 5: Commit**

```bash
git add apps/docs/app/foundation/typography/usage/page.tsx
git commit -m "feat(docs): add visual examples for error, helper, and link typography"
```

---

### Task 5: Remove "gray-400" reference + migrate to InlineCode (Finding #4 + cleanup)

**Files:**
- Modify: `apps/docs/app/foundation/typography/usage/page.tsx:2,118`

**Step 1: Add InlineCode import**

Add to imports at line 2:

```tsx
import { InlineCode } from '@/components/InlineCode'
```

**Step 2: Remove "(gray-400)" from disabled text section**

On line 118, change:

```
(gray-400). Do not reduce weight or size.
```

to:

```
. Do not reduce weight or size.
```

**Step 3: Migrate all raw `<code className="...">` to `<InlineCode>`**

Replace every instance of:

```tsx
<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">...</code>
```

with:

```tsx
<InlineCode>...</InlineCode>
```

There are ~30 instances across the file. `InlineCode` inherits parent font size (no `type-caption` override), uses `font-mono bg-surface-subtle rounded px-1 py-0.5 text-foreground`.

**Step 4: Build and verify**

Run: `pnpm build`
Run: `pnpm typecheck`
Expected: both pass

**Step 5: Commit**

```bash
git add apps/docs/app/foundation/typography/usage/page.tsx
git commit -m "fix(docs): remove gray-400 reference, migrate to InlineCode component"
```

---

### Task 6: Final verification

**Step 1: Full build**

Run: `pnpm build && pnpm typecheck`
Expected: both pass

**Step 2: Visual verification**

Navigate to `/foundation/typography/usage` and verify:
- DoDont examples use correct typography (semantic classes)
- Error/helper/link visual examples render correctly
- Links list uses standard bullet styling
- InlineCode renders at parent font size (not forced caption)
- No overflow on DoDont `<pre>` blocks (test at 2-column width if possible)
