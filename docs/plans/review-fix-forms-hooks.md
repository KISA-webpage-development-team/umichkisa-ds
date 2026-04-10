# Fix /forms/hooks Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 6 review findings on the `/forms/hooks` docs page — migrate raw tables to DS Table, add escape-hatch philosophy Alert, fix spacing, fix code examples.

**Architecture:** All changes are in `apps/docs/app/forms/hooks/page.tsx` and `apps/docs/app/forms/hooks/_demos.tsx`. No package changes. DS components (Table, TableMobileList, Alert) are already available from `@umichkisa-ds/web`.

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web`, `@umichkisa-ds/form`

---

## Phase 1 — Content & code string fixes (page.tsx only)

### Task 1: Fix intro — replace muted sub-paragraph with Alert (Finding #2)

**Files:**
- Modify: `apps/docs/app/forms/hooks/page.tsx:1` (add Alert import)
- Modify: `apps/docs/app/forms/hooks/page.tsx:80-85` (replace `<p>` with `<Alert>`)

**Step 1: Add Alert to imports**

Change line 1:
```tsx
import { Container } from '@umichkisa-ds/web'
```
to:
```tsx
import { Container, Alert } from '@umichkisa-ds/web'
```

**Step 2: Replace the muted intro paragraph**

Replace lines 80-85:
```tsx
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        For cases where the compound{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Form>'}</code> components don&apos;t fit
        your layout, use these hooks to build custom field layouts and
        status-aware UI.
      </p>
```

with:
```tsx
      <Alert variant="info" title="When to use hooks" className="mb-8">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Form.*</code>{' '}
        compound components handle most forms but enforce a label-above-field layout.
        When you need a different layout (e.g., inline labels, grouped fields) or
        custom form chrome (submit footers, dirty indicators), use these hooks —
        they give you the same react-hook-form wiring without the layout opinion.
      </Alert>
```

### Task 2: Fix useFormFieldCode code string (Findings #5 and #6)

**Files:**
- Modify: `apps/docs/app/forms/hooks/page.tsx:8-36` (useFormFieldCode string)

**Step 1: Rewrite the code string to demonstrate an inline (horizontal) label layout**

The current example recreates label-above-field (same as `Form.Input`). Replace it with an inline label-input layout that justifies using the hook. Also replace raw `<button>` with DS `Button`.

Replace the entire `useFormFieldCode` const (lines 8-36) with:
```tsx
const useFormFieldCode = `import { useForm, Form, useFormField } from '@umichkisa-ds/form'
import { Input, Label, Button } from '@umichkisa-ds/web'

type ProfileValues = { name: string; email: string }

function InlineField({ name, label, rules }: {
  name: keyof ProfileValues
  label: string
  rules?: Record<string, string>
}) {
  const { inputProps, error } = useFormField<ProfileValues>(name, rules)

  return (
    <div>
      <div className="flex items-center gap-4">
        <Label htmlFor={name} className="w-20 shrink-0">{label}</Label>
        <Input id={name} {...inputProps} />
      </div>
      {error && <p className="type-caption text-error mt-1 ml-24">{error}</p>}
    </div>
  )
}

function ProfileForm() {
  const form = useForm<ProfileValues>({
    defaultValues: { name: '', email: '' },
  })

  return (
    <Form form={form} onSubmit={console.log}>
      <InlineField name="name" label="Name" rules={{ required: 'Name is required' }} />
      <InlineField name="email" label="Email" rules={{ required: 'Email is required' }} />
      <Button type="submit" className="ml-24">Save</Button>
    </Form>
  )
}`
```

### Task 3: Update useFormField demo to match new inline layout (Finding #6)

**Files:**
- Modify: `apps/docs/app/forms/hooks/_demos.tsx:1-48` (UseFormFieldDemo)

**Step 1: Rewrite the demo to use inline label layout**

Replace lines 1-48 with:
```tsx
'use client'

import { Input, Button, Label } from '@umichkisa-ds/web'
import { useForm, Form, useFormField, useFormStatus } from '@umichkisa-ds/form'

/* ── Demo: useFormField ───────────────────────────────────── */

type ProfileValues = { name: string; email: string }

function InlineField({ name, label, rules }: {
  name: keyof ProfileValues
  label: string
  rules?: Record<string, string>
}) {
  const { inputProps, error } = useFormField<ProfileValues>(name, rules)
  const { value, ...rest } = inputProps

  return (
    <div>
      <div className="flex items-center gap-4">
        <Label htmlFor={name} className="w-20 shrink-0">{label}</Label>
        <Input id={name} value={value as string} {...rest} />
      </div>
      {error && <p className="type-caption text-error mt-1 ml-24">{error}</p>}
    </div>
  )
}

export function UseFormFieldDemo() {
  const form = useForm<ProfileValues>({
    defaultValues: { name: '', email: '' },
  })

  return (
    <Form form={form} onSubmit={(data) => alert(`${data.name} / ${data.email}`)} className="w-full max-w-sm">
      <InlineField name="name" label="Name" rules={{ required: 'Name is required' }} />
      <InlineField name="email" label="Email" rules={{ required: 'Email is required' }} />
      <Button type="submit" className="ml-24">Save</Button>
    </Form>
  )
}
```

Note: Keep the `FormItem` import removed since we no longer use it. Keep the rest of the file (UseFormStatusDemo) unchanged.

### Task 4: Fix useFormStatusCode code string (Finding #4)

**Files:**
- Modify: `apps/docs/app/forms/hooks/page.tsx:46` (inside useFormStatusCode string)

**Step 1: Replace `text-sm` with `type-body-sm`**

In the `useFormStatusCode` string, change:
```
        <span className="text-sm text-muted-foreground">
```
to:
```
        <span className="type-body-sm text-muted-foreground">
```

### Task 5: Fix h3 spacing (Finding #3)

**Files:**
- Modify: `apps/docs/app/forms/hooks/page.tsx:124`

**Step 1: Change second h3 "Return Value" mt-6 → mt-8**

Change:
```tsx
      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">Return Value</h3>
```
to (the one under useFormField section, after the API table):
```tsx
      <h3 className="type-body !font-semibold mt-8 mb-2 text-foreground">Return Value</h3>
```

Only the **second** h3 under useFormField — the first h3 "API" and the h3 under useFormStatus stay `mt-6`.

### Task 6: Commit phase 1

```bash
git add apps/docs/app/forms/hooks/page.tsx apps/docs/app/forms/hooks/_demos.tsx
git commit -m "fix(docs/forms/hooks): rewrite intro Alert + inline-layout code example + fix code strings"
```

---

## Phase 2 — Table migration (Finding #1)

### Task 7: Add Table imports to page.tsx

**Files:**
- Modify: `apps/docs/app/forms/hooks/page.tsx:1`

**Step 1: Update imports**

```tsx
import { Container, Alert, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
```

### Task 8: Migrate useFormField API table (lines ~100-122)

**Files:**
- Modify: `apps/docs/app/forms/hooks/page.tsx`

**Step 1: Replace the raw `<table>` for useFormField API parameters**

Replace the `<div className="my-6 overflow-x-auto">` block containing the API table with:

```tsx
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">name</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>Field name matching a key in your form values type.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">rules</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">RegisterOptions</code></TableCell>
                <TableCell>Optional validation rules (same as compound components).</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Field name matching a key in your form values type.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>rules</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">RegisterOptions</code></span>
              <span className="type-caption text-muted-foreground">Optional validation rules (same as compound components).</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>
```

### Task 9: Migrate useFormField Return Value table (lines ~126-157)

**Files:**
- Modify: `apps/docs/app/forms/hooks/page.tsx`

**Step 1: Replace the raw `<table>` for useFormField Return Value**

Same pattern — DS Table (hidden md:block) + TableMobileList (block md:hidden). 4 rows: value, invalid, error, inputProps.

```tsx
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">unknown</code></TableCell>
                <TableCell>Current field value.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell>Whether the field has a validation error.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">error</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string | undefined</code></TableCell>
                <TableCell>Error message string, if any.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">inputProps</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">object</code></TableCell>
                <TableCell>Spread onto your input: name, value, onChange, onBlur, invalid, ref.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">unknown</code></span>
              <span className="type-caption text-muted-foreground">Current field value.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Whether the field has a validation error.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>error</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string | undefined</code></span>
              <span className="type-caption text-muted-foreground">Error message string, if any.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>inputProps</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">object</code></span>
              <span className="type-caption text-muted-foreground">Spread onto your input: name, value, onChange, onBlur, invalid, ref.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>
```

### Task 10: Migrate useFormStatus Return Value table (lines ~172-199)

**Files:**
- Modify: `apps/docs/app/forms/hooks/page.tsx`

**Step 1: Replace the raw `<table>` for useFormStatus Return Value**

Same pattern. 3 rows: isSubmitting, isValid, isDirty.

```tsx
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">isSubmitting</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell>True while the onSubmit handler is running (including async).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">isValid</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell>True when all fields pass validation.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">isDirty</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell>True when any field value differs from defaultValues.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>isSubmitting</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">True while the onSubmit handler is running (including async).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>isValid</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">True when all fields pass validation.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>isDirty</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">True when any field value differs from defaultValues.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>
```

### Task 11: Migrate "When to Use What" decision guide table (lines ~203-226)

**Files:**
- Modify: `apps/docs/app/forms/hooks/page.tsx`

**Step 1: Replace the raw `<table>` for the decision guide**

Same pattern. 3 rows: Form.* compounds, useFormField, useFormStatus.

```tsx
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Approach</TableHead>
                <TableHead>Use when</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Form.*</code> compounds</TableCell>
                <TableCell>Standard forms with label-above-field layout. Handles 90% of cases with zero boilerplate.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">useFormField</code></TableCell>
                <TableCell>Custom field layouts (e.g., inline labels, grouped fields) or wrapping non-DS inputs.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">useFormStatus</code></TableCell>
                <TableCell>Custom submit footers, dirty indicators, or any UI that reacts to form state.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">Form.*</code> compounds</strong></span>
              <span className="type-caption text-muted-foreground">Standard forms with label-above-field layout. Handles 90% of cases with zero boilerplate.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">useFormField</code></strong></span>
              <span className="type-caption text-muted-foreground">Custom field layouts (e.g., inline labels, grouped fields) or wrapping non-DS inputs.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">useFormStatus</code></strong></span>
              <span className="type-caption text-muted-foreground">Custom submit footers, dirty indicators, or any UI that reacts to form state.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>
```

### Task 12: Commit phase 2

```bash
git add apps/docs/app/forms/hooks/page.tsx
git commit -m "fix(docs/forms/hooks): migrate 4 raw tables to DS Table + TableMobileList"
```

---

## Phase 3 — Verify

### Task 13: Build and typecheck

```bash
pnpm build && pnpm typecheck
```

Both must pass.

### Task 14: Visual verification

Open `https://vnw20xbg-3000.asse.devtunnels.ms/forms/hooks` in browser at 1280px and 375px. Confirm:
- Alert renders correctly with escape-hatch philosophy text
- Inline label-input demo renders correctly and matches code example
- All 4 tables render properly at desktop (DS Table) and mobile (TableMobileList)
- h3 spacing is correct (first h3 mt-6, second h3 mt-8)
- useFormStatus code example shows `type-body-sm`
