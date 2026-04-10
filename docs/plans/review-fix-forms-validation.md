# Fix /forms/validation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 3 review findings on the `/forms/validation` docs page — replace placeholder code tab, migrate intro sub-paragraph to Alert, and rewrite the onTouched Lifecycle section.

**Architecture:** All changes are in `apps/docs/app/forms/validation/page.tsx`. No new files, no component changes. Pure docs page content edits.

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (Alert component), TSX

---

### Task 1: Fix #1 — Replace `tryItCode` placeholder with actual demo source

**Files:**
- Modify: `apps/docs/app/forms/validation/page.tsx`

**Step 1: Replace `tryItCode` string**

Replace the current placeholder:

```tsx
const tryItCode = `// See the rules used in each field below`
```

With the full demo source:

```tsx
const tryItCode = `import { useForm, Form } from '@umichkisa-ds/form'

type ValidationDemoValues = {
  name: string
  email: string
  password: string
}

function ValidationDemo() {
  const form = useForm<ValidationDemoValues>({
    defaultValues: { name: '', email: '', password: '' },
  })

  return (
    <Form form={form} onSubmit={(data) => alert(\`Valid! \${data.name} / \${data.email}\`)} className="w-full max-w-sm">
      <Form.Input
        name="name"
        label="Full Name"
        rules={{ required: 'Full name is required' }}
      />
      <Form.Input
        name="email"
        label="UMich Email"
        type="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^@]+@umich\\\\.edu$/,
            message: 'Must be a @umich.edu email',
          },
        }}
      />
      <Form.Input
        name="password"
        label="Password"
        type="password"
        rules={{
          required: 'Password is required',
          minLength: { value: 8, message: 'At least 8 characters' },
          validate: (value: string) => {
            if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter'
            if (!/[0-9]/.test(value)) return 'Must include a number'
            return true
          },
        }}
      />
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}`
```

**Step 2: Verify build**

Run: `pnpm --filter docs build`
Expected: Build succeeds, no type errors.

**Step 3: Commit**

```bash
git add apps/docs/app/forms/validation/page.tsx
git commit -m "fix(docs/forms/validation): replace placeholder tryItCode with actual demo source"
```

---

### Task 2: Fix #2 — Migrate intro sub-paragraph to Alert

**Files:**
- Modify: `apps/docs/app/forms/validation/page.tsx`

**Step 1: Add Alert import**

Add `Alert` to the existing `@umichkisa-ds/web` import:

```tsx
import { Container, Alert } from '@umichkisa-ds/web'
```

**Step 2: Replace the intro sub-paragraph**

Replace this muted `<p>`:

```tsx
<p className="type-body mb-8 text-muted-foreground max-w-prose">
  How form validation works with the{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code> default, built-in rules,
  and custom validators.
</p>
```

With an Alert:

```tsx
<Alert variant="info" title="What this page covers" className="mb-8">
  How form validation works with the onTouched default, built-in rules, and custom validators.
</Alert>
```

**Step 3: Verify build**

Run: `pnpm --filter docs build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add apps/docs/app/forms/validation/page.tsx
git commit -m "fix(docs/forms/validation): migrate intro sub-paragraph to Alert"
```

---

### Task 3: Fix #3 — Rewrite onTouched Lifecycle section

**Files:**
- Modify: `apps/docs/app/forms/validation/page.tsx`

**Step 1: Remove `lifecycleCode` constant**

Delete the entire `lifecycleCode` string constant at the top of the file (lines 9–13):

```tsx
const lifecycleCode = `// 1. User focuses the email field and types "abc"
// 2. User clicks away (blur) → validation runs → "Invalid email" error appears
// 3. User clicks back and types "abc@umich.edu" → error clears immediately
// 4. Result: errors don't interrupt typing, but appear before submission`
```

**Step 2: Replace the onTouched Lifecycle section JSX**

Replace:

```tsx
{/* ── onTouched Lifecycle ────────────────────────────── */}
<h2 className="type-h2 mt-8 mb-4 text-foreground">
  The onTouched Lifecycle
</h2>
<p className="type-body mb-4 text-foreground max-w-prose">
  The default <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code> mode strikes
  the right balance: errors appear after the user leaves a field (blur),
  and clear immediately as they correct the input. This prevents errors
  from flashing while typing but still provides feedback before submission.
</p>
<CodeBlock code={lifecycleCode} lang="tsx" />
```

With:

```tsx
{/* ── onTouched Lifecycle ────────────────────────────── */}
<h2 className="type-h2 mt-8 mb-4 text-foreground">
  The onTouched Lifecycle
</h2>
<p className="type-body mb-4 text-foreground max-w-prose">
  React Hook Form supports three validation modes. Our{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useForm</code>{' '}
  wrapper defaults to{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code>{' '}
  — you get this behavior for free without any configuration.
</p>
<ul className="list-disc pl-6 mb-4 space-y-1 max-w-prose">
  <li className="type-body-sm text-foreground">
    <strong>onChange</strong>{' '}
    <span className="text-muted-foreground">— validates on every keystroke. Too aggressive for most forms — users see errors before they finish typing.</span>
  </li>
  <li className="type-body-sm text-foreground">
    <strong>onTouched</strong>{' '}
    <span className="text-muted-foreground">— validates when a field loses focus (blur), then re-validates on each change. The sweet spot: errors appear after the user is done with a field, and clear immediately as they correct it.</span>
  </li>
  <li className="type-body-sm text-foreground">
    <strong>onSubmit</strong>{' '}
    <span className="text-muted-foreground">— validates only on form submission. Users get no feedback until they hit submit, which can feel unresponsive.</span>
  </li>
</ul>
<p className="type-body-sm mb-4 text-muted-foreground max-w-prose">
  Here is what onTouched looks like in practice:
</p>
<ol className="list-decimal pl-6 mb-4 space-y-1 max-w-prose">
  <li className="type-body-sm text-foreground">User focuses the email field and types &quot;abc&quot;</li>
  <li className="type-body-sm text-foreground">User clicks away (blur) — validation runs, &quot;Invalid email&quot; error appears</li>
  <li className="type-body-sm text-foreground">User clicks back and types &quot;abc@umich.edu&quot; — error clears immediately</li>
  <li className="type-body-sm text-foreground">Result: errors never interrupt typing, but always appear before submission</li>
</ol>
```

**Step 3: Verify build**

Run: `pnpm --filter docs build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add apps/docs/app/forms/validation/page.tsx
git commit -m "fix(docs/forms/validation): rewrite onTouched Lifecycle as text with mode comparison"
```
