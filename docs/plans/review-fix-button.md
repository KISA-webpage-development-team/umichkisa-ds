# /components/button — Review Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `ds-constrained-execution` to implement this plan task-by-task.

**Goal:** Apply the 4 findings from the `/components/button` review.

**Source:** `apps/docs/app/components/button/page.tsx`
**Review entry:** `docs/reviews/docs-app-review.md` § /components/button

---

### Task 1: Drop redundant `font-sejong-bold tracking-tight` from h1 (Fix #1)

**File:** `apps/docs/app/components/button/page.tsx:55`

**Change:**
```tsx
// before
<h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Button</h1>
// after
<h1 className="type-h1 mb-4 text-foreground">Button</h1>
```

**Why:** `type-h1` already encapsulates `font-sejong-bold` + `letter-spacing: -0.025em` (verified at `packages/web/src/styles/index.css:169`). Composing them again violates the "use `type-*` semantic class only" rule.

---

### Task 2: Add `text-foreground` to variant description ul (Fix #2)

**File:** `apps/docs/app/components/button/page.tsx:102`

**Change:**
```tsx
// before
<ul className="type-body-sm max-w-prose mt-4 mb-2 flex flex-col gap-2">
// after
<ul className="type-body-sm text-foreground max-w-prose mt-4 mb-2 flex flex-col gap-2">
```

**Why:** DS rule — every `type-*` class must be paired with an explicit color token.

---

### Task 3: Add `flex-wrap` to demo rows (Fix #3)

**File:** `apps/docs/app/components/button/page.tsx`

**Three changes:**

Line 95 (Variants demo):
```tsx
<div className="flex flex-wrap items-center gap-4">
```

Line 119 (Sizes demo):
```tsx
<div className="flex flex-wrap items-center gap-4">
```

Line 156 (Disabled demo):
```tsx
<div className="flex flex-wrap items-center gap-4">
```

**Why:** Variants and Disabled rows have 4 buttons; at 375px they overflow horizontally. `flex-wrap` lets them stack onto multiple lines on narrow viewports.

---

### Task 4: Drop redundant `gap-2` mention from intro paragraph (Fix #4)

**File:** `apps/docs/app/components/button/page.tsx:56-67`

**Change:** Remove the "built-in `gap-2` alignment for icon + text pairings" clause from the intro. The With-icon section already explains it.

```tsx
// after
<p className="type-body mb-8 text-foreground max-w-prose">
  The primary interactive element for triggering actions. Supports four
  semantic variants and three sizes. Extends all native{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    &lt;button&gt;
  </code>{' '}
  attributes.
</p>
```

**Why:** The With-icon section (line 127–144) already states "Button has built-in `gap-2` so icons and text align automatically." Mentioning it twice is redundant — keep it where it's actionable.

---

### Final verification

1. `pnpm --filter @umichkisa-ds/docs build` — must pass
2. `pnpm typecheck` — must pass
3. Visit `/components/button` at desktop and mobile widths — confirm no overflow on demo rows; h1 still bold + tight; variant list still readable
4. Single commit: `fix(docs): apply review fixes to /components/button`
