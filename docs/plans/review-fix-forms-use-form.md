# /forms/use-form Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 6 review findings on the `/forms/use-form` docs page.

**Architecture:** Single-file page edit (`apps/docs/app/forms/use-form/page.tsx`) plus demo alignment (`_demos.tsx`). Migrate raw HTML tables to DS Table + TableMobileList, add "Why / When" framing, trim redundant content, add cross-links, and align demo behavior.

**Tech Stack:** Next.js 15, @umichkisa-ds/web (Table, TableMobileList, Alert), @umichkisa-ds/form

**Reference pattern:** `apps/docs/app/components/label/page.tsx` lines 155–232 for Table + TableMobileList API table pattern.

**Constraints:** Read `docs/DS_CONSTRAINTS.md` before editing any `.tsx` file.

---

### Task 1: Add "Why / When" framing (Fix #6)

**Files:**
- Modify: `apps/docs/app/forms/use-form/page.tsx`

**Step 1: Add Alert import and "Why / When" content after the intro paragraph**

Add `Alert` to imports from `@umichkisa-ds/web`. After the existing intro `<p>` (lines 63–68), add an `<Alert variant="info">` that explains:
- **Why:** Pre-configures validation UX (`onTouched`) so every form in your app behaves consistently without manual setup. You get type-safe defaults and the same `UseFormReturn` — no new API to learn.
- **When:** Always. It's the entry point for any form using `@umichkisa-ds/form`. Pass the returned instance to `<Form>`.

```tsx
import { Container, Alert } from '@umichkisa-ds/web'
```

After the intro `<p>`, before the Basic Usage `<h2>`:

```tsx
<Alert variant="info" title="Why use this over raw react-hook-form?">
  This wrapper pre-configures <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">mode: &quot;onTouched&quot;</code> so
  every form validates consistently — errors appear after blur and clear as the user
  types. Use it whenever you build a form with{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@umichkisa-ds/form</code>.
  The returned object is the standard react-hook-form instance — no new API to learn.
</Alert>
```

**Step 2: Verify the page renders correctly**

Run: `pnpm --filter docs dev` and check the page.

---

### Task 2: Add cross-links (Fix #4)

**Files:**
- Modify: `apps/docs/app/forms/use-form/page.tsx`

**Step 1: Add cross-link in Basic Usage paragraph**

In the Basic Usage `<p>` (line 74–76), change "the `<Form>` component" to a link:

```tsx
the <a href="/forms/form-component" className="text-link hover:text-brand-primary hover:underline">
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Form>'}</code> component
</a>.
```

**Step 2: Add cross-link in resolver table row description**

When building the Table in Task 3, update the resolver description to include:

```
External validation resolver (e.g., Zod, Yup). See <a href="/forms/validation">Validation</a> for details.
```

---

### Task 3: Migrate API tables to DS Table + TableMobileList (Fix #1 + #2)

**Files:**
- Modify: `apps/docs/app/forms/use-form/page.tsx`

**Step 1: Add Table imports**

```tsx
import {
  Container,
  Alert,
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

**Step 2: Replace the Options `<table>` (lines 109–140) with DS Table + TableMobileList**

Follow the pattern from `apps/docs/app/components/label/page.tsx`:
- Outer `<div className="my-6">`
- Desktop: `<div className="hidden md:block"><Table size="sm">` with 4 columns: Prop, Type, Default, Description
- Mobile: `<div className="block md:hidden"><TableMobileList>` with one `<TableMobileItem>` per row
- Three rows: `mode`, `defaultValues`, `resolver`
- `resolver` description includes the cross-link to `/forms/validation` from Task 2
- No required props in this table, so no asterisk footnote needed

**Step 3: Replace the Return Value `<table>` (lines 148–179) with DS Table + TableMobileList**

Same pattern, 2 columns: Property, Description. Five rows: `handleSubmit`, `reset()`, `setError()`, `watch()`, `formState`.

---

### Task 4: Trim redundant `mode` description in API table (Fix #3)

**Files:**
- Modify: `apps/docs/app/forms/use-form/page.tsx`

**Step 1: Simplify the `mode` row description**

In the new DS Table from Task 3, set the `mode` row description to just:

```
When validation triggers.
```

Remove "Our default shows errors after blur and clears on change" — this is already covered in the Validation Mode section.

---

### Task 5: Align demo with code snippet (Fix #5)

**Files:**
- Modify: `apps/docs/app/forms/use-form/_demos.tsx`

**Step 1: Change `alert()` to `console.log()`**

Replace line 17:
```tsx
// Before
const onSubmit = (data: SignupValues) => {
  alert(`Welcome, ${data.name}!`)
}

// After
const onSubmit = (data: SignupValues) => {
  console.log(data)
}
```

This aligns the live demo behavior with the `basicCode` snippet shown in the code tab.

---

### Task 6: Final verification

**Step 1:** Run `pnpm build` — must pass.
**Step 2:** Run `pnpm typecheck` — must pass.
**Step 3:** Visually verify desktop (1280px) and mobile (375px) if browser available.
