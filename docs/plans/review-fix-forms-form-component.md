# Review Fix: /forms/form-component

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 3 review findings on the `/forms/form-component` docs page — migrate raw table to DS Table, add component-specific props table, replace intro paragraph with Alert.

**Architecture:** All changes are in `apps/docs/app/forms/form-component/page.tsx`. Add DS Table/Alert imports, replace raw HTML table markup, add a second small table, and swap the intro paragraph for an Alert.

**Tech Stack:** Next.js 15 page, DS components (`Table`, `TableMobileList`, `Alert`), Tailwind

**Review findings:** `docs/reviews/docs-app-review.md` § `/forms/form-component`

---

### Task 1: Replace intro paragraph with DS Alert

**Files:**
- Modify: `apps/docs/app/forms/form-component/page.tsx:1-4` (imports), `:144-148` (intro paragraph)

**Step 1: Add `Alert` to imports**

Add `Alert` to the `@umichkisa-ds/web` import:

```tsx
import { Alert, Container } from '@umichkisa-ds/web'
```

**Step 2: Replace the intro `<p>` with an Alert**

Replace lines 144-148 (the `<p className="type-body mb-8 text-muted-foreground max-w-prose">` paragraph) with:

```tsx
<Alert variant="info" className="mb-8">
  The <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Form>'}</code> compound component provides context, submission handling, and field sub-components that automatically wire up labels, errors, and validation. For setup, see{' '}
  <a href="/forms/overview" className="text-link underline hover:text-brand-primary">Overview</a> and{' '}
  <a href="/forms/use-form" className="text-link underline hover:text-brand-primary">useForm</a>.
</Alert>
```

**Step 3: Verify in browser**

Navigate to `/forms/form-component`. Confirm the info Alert renders at the top with the cross-reference links.

---

### Task 2: Migrate Shared Field Props table to DS Table + TableMobileList

**Files:**
- Modify: `apps/docs/app/forms/form-component/page.tsx:1-4` (imports), `:299-342` (raw table)

**Step 1: Add Table imports**

Add to the `@umichkisa-ds/web` import:

```tsx
import {
  Alert,
  Container,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableMobileList,
  TableMobileItem,
} from '@umichkisa-ds/web'
```

**Step 2: Replace raw `<table>` with DS Table (desktop) + TableMobileList (mobile)**

Replace the entire `<div className="my-6 overflow-x-auto">...</div>` block (lines 299-342) with:

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
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">name*</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Field name matching a key in your form values type.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">label*</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Visible label text. Also used for accessibility.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">rules</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">RegisterOptions</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Validation rules (required, minLength, pattern, validate, etc.).</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">description</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Helper text shown below the field.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Applied to the FormItem wrapper for layout spacing.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
  </div>
  <div className="block md:hidden">
    <TableMobileList>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>name*</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Field name matching a key in your form values type.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>label*</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Visible label text. Also used for accessibility.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>rules</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">RegisterOptions</code></span>
        <span className="type-caption text-muted-foreground">Validation rules (required, minLength, pattern, validate, etc.).</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>description</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Helper text shown below the field.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>className</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Applied to the FormItem wrapper for layout spacing.</span>
      </TableMobileItem>
    </TableMobileList>
    <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
  </div>
</div>
```

**Step 3: Verify in browser**

Check desktop (1280px) — DS-styled table with brand header. Check mobile (375px) — stacked TableMobileList cards.

---

### Task 3: Add Component-Specific Props table

**Files:**
- Modify: `apps/docs/app/forms/form-component/page.tsx` (after the Shared Field Props section)

**Step 1: Add a new section after Shared Field Props**

Insert after the Shared Field Props `</div>` closing tag and before the closing `</Container>`:

```tsx
{/* ── Component-Specific Props ────────────────────────── */}
<h2 className="type-h2 mt-8 mb-4 text-foreground">Component-Specific Props</h2>
<p className="type-body mb-4 text-foreground max-w-prose">
  These props are unique to specific sub-components, in addition to the
  shared props above.
</p>
<div className="my-6">
  <div className="hidden md:block">
    <Table size="sm">
      <TableHeader>
        <TableRow>
          <TableHead>Component</TableHead>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Form.Button</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disableWhenInvalid</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
          <TableCell>Also disable the button when the form has validation errors.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Form.DatePicker</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">placeholder</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Placeholder text shown when no date is selected.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Form.DatePicker</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">formatDate</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(date: Date) =&gt; string</code></TableCell>
          <TableCell>MM/dd/yyyy</TableCell>
          <TableCell>Custom date formatting function for the trigger display.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Form.DateRangePicker</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">placeholder</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Placeholder text shown when no range is selected.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Form.DateRangePicker</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">formatDate</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(date: Date) =&gt; string</code></TableCell>
          <TableCell>MM/dd/yyyy</TableCell>
          <TableCell>Custom date formatting function for the trigger display.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div className="block md:hidden">
    <TableMobileList>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>Form.Button</strong> — disableWhenInvalid</span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
        <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
        <span className="type-caption text-muted-foreground">Also disable the button when the form has validation errors.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>Form.DatePicker</strong> — placeholder</span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Placeholder text shown when no date is selected.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>Form.DatePicker</strong> — formatDate</span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">(date: Date) =&gt; string</code></span>
        <span className="type-caption text-muted-foreground">Default: MM/dd/yyyy</span>
        <span className="type-caption text-muted-foreground">Custom date formatting function for the trigger display.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>Form.DateRangePicker</strong> — placeholder</span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Placeholder text shown when no range is selected.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>Form.DateRangePicker</strong> — formatDate</span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">(date: Date) =&gt; string</code></span>
        <span className="type-caption text-muted-foreground">Default: MM/dd/yyyy</span>
        <span className="type-caption text-muted-foreground">Custom date formatting function for the trigger display.</span>
      </TableMobileItem>
    </TableMobileList>
  </div>
</div>
```

**Step 2: Verify in browser**

Confirm both desktop table and mobile list render correctly below the Shared Field Props section.

---

### Task 4: Final verification & commit

**Step 1: Run build and typecheck**

```bash
pnpm build && pnpm typecheck
```

Both must pass.

**Step 2: Commit**

```bash
git add apps/docs/app/forms/form-component/page.tsx
git commit -m "fix(docs/forms/form-component): migrate raw table to DS Table, add Alert intro and component-specific props"
```
