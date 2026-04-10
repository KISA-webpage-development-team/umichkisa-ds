# Fix /forms/overview Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 7 review findings on the Forms overview docs page — DS constraint violations, content issues, and incorrect installation instructions.

**Architecture:** Single-file edit (`apps/docs/app/forms/overview/page.tsx`). Replace raw markup with DS components (Grid, Card, Alert), fix breakpoints, trim redundant content, and rewrite the Installation section with accurate git URL + tag instructions.

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (Grid, Card, Alert), `@umichkisa-ds/form`

---

## Phase 1: All Fixes (single file, single phase)

### Task 1: Replace intro sub-paragraph with Alert (Fix #5)

**Files:**
- Modify: `apps/docs/app/forms/overview/page.tsx`

**Step 1: Add Alert import and replace the muted intro paragraph**

At the top of the file, add `Alert` to the import from `@umichkisa-ds/web`:

```tsx
import { Container, Alert } from '@umichkisa-ds/web'
```

Replace lines 54–59 (the `<p className="type-body mb-8 text-muted-foreground max-w-prose">` paragraph) with:

```tsx
<Alert variant="info" className="mb-8">
  A thin integration layer between{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-hook-form</code>{' '}
  and the KISA Design System. It provides sensible defaults, automatic error
  wiring, and compound components that eliminate boilerplate.
</Alert>
```

### Task 2: Rewrite Installation section with git URL + tag pattern (Fix #7)

**Files:**
- Modify: `apps/docs/app/forms/overview/page.tsx`

**Step 1: Update the install code string**

Replace the `installCode` constant (line 8) with two separate code strings:

```tsx
const installFormCode = `// In your project's package.json, add under "dependencies":
"@umichkisa-ds/form": "github:KISA-webpage-development-team/umichkisa-ds#form-vX.X.X"

// Then run:
npm install`

const installRHFCode = `npm install react-hook-form`
```

**Step 2: Update the Installation section markup**

Replace the Installation section (h2 + CodeBlock + peer dep paragraph) with:

```tsx
<h2 className="type-h2 mt-8 mb-4 text-foreground">Installation</h2>
<p className="type-body mb-4 text-foreground max-w-prose">
  This package is distributed via GitHub git tags — not the npm registry.
  Add the git URL to your project{"'"}s <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">package.json</code> dependencies,
  pointing to the desired release tag:
</p>
<CodeBlock code={installFormCode} lang="bash" />
<p className="type-body mb-4 text-foreground max-w-prose">
  You also need <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-hook-form</code> as
  a peer dependency:
</p>
<CodeBlock code={installRHFCode} lang="bash" />
<Alert variant="info" className="mb-8">
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@umichkisa-ds/web</code> is
  also a peer dependency — it wraps DS form primitives (Input, Textarea,
  Select, etc.) with react-hook-form controllers. Install it the same way
  using a <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">vX.X.X</code> tag.
</Alert>
```

### Task 3: Trim Quick Start description (Fix #6)

**Files:**
- Modify: `apps/docs/app/forms/overview/page.tsx`

**Step 1: Replace the Quick Start paragraph**

Replace lines 73–79 (the `<p>` after the Quick Start h2) with:

```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  A complete login form in under 30 lines:
</p>
```

### Task 4: Replace "What's Inside" raw markup with Grid + Card (Fix #1, #2, #3)

**Files:**
- Modify: `apps/docs/app/forms/overview/page.tsx`

**Step 1: Add Grid, Card imports**

Update the import from `@umichkisa-ds/web`:

```tsx
import {
  Container,
  Alert,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@umichkisa-ds/web'
```

**Step 2: Replace the entire "What's Inside" section**

Replace the `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">` block (lines 86–136) with:

```tsx
<Grid columns={{ base: 1, md: 2 }} gap="component" className="my-6">
  <Link href="/forms/use-form" className="block hover:bg-surface-subtle transition-colors rounded-md">
    <Card>
      <CardHeader>
        <CardTitle>useForm</CardTitle>
        <CardDescription>
          Wrapper hook with <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code> validation mode by default. Drop-in replacement for react-hook-form.
        </CardDescription>
      </CardHeader>
    </Card>
  </Link>

  <Link href="/forms/form-component" className="block hover:bg-surface-subtle transition-colors rounded-md">
    <Card>
      <CardHeader>
        <CardTitle>Form Component</CardTitle>
        <CardDescription>
          Compound component with Form.Input, Form.Textarea, Form.Select, Form.Checkbox, Form.Radio, Form.Switch, and Form.Button.
        </CardDescription>
      </CardHeader>
    </Card>
  </Link>

  <Link href="/forms/validation" className="block hover:bg-surface-subtle transition-colors rounded-md">
    <Card>
      <CardHeader>
        <CardTitle>Validation</CardTitle>
        <CardDescription>
          Built-in rules, custom validators, and the onTouched lifecycle that shows errors at the right moment.
        </CardDescription>
      </CardHeader>
    </Card>
  </Link>

  <Link href="/forms/hooks" className="block hover:bg-surface-subtle transition-colors rounded-md">
    <Card>
      <CardHeader>
        <CardTitle>Hooks</CardTitle>
        <CardDescription>
          useFormField and useFormStatus for custom field layouts and status-aware UI.
        </CardDescription>
      </CardHeader>
    </Card>
  </Link>

  <Link href="/forms/examples" className="block md:col-span-2 hover:bg-surface-subtle transition-colors rounded-md">
    <Card>
      <CardHeader>
        <CardTitle>Examples</CardTitle>
        <CardDescription>
          Live interactive forms: login, profile edit, feedback, and a hooks-based variant.
        </CardDescription>
      </CardHeader>
    </Card>
  </Link>
</Grid>
```

This resolves:
- **#1** — `sm:` breakpoints replaced with `md:` (via Grid `columns={{ base: 1, md: 2 }}` and `md:col-span-2`)
- **#2** — `rounded-lg` gone (Card uses `rounded-md` by default)
- **#3** — Raw markup replaced with DS Grid + Card; CardTitle provides `type-h4 !font-semibold` heading

### Task 5: Verify build

**Step 1: Run typecheck**

```bash
pnpm typecheck
```

Expected: PASS — no type errors.

**Step 2: Run build**

```bash
pnpm build
```

Expected: PASS — docs app builds successfully.

### Task 6: Commit

```bash
git add apps/docs/app/forms/overview/page.tsx
git commit -m "fix(docs/forms/overview): DS constraint fixes — Alert, Grid+Card, git install, breakpoints"
```
