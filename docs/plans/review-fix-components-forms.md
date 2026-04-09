# /components/forms Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Every `.tsx` change must be followed by a `ds-review` pass before the next task.

**Goal:** Apply review findings to `apps/docs/app/components/forms/page.tsx` — replace muted cross-ref paragraph with Alert, replace raw Event Registration card with DS `Card` composition, and regroup Composition Patterns into two semantic subsections.

**Target file:** `apps/docs/app/components/forms/page.tsx`

**Findings source:** `docs/reviews/docs-app-review.md` § `/components/forms`

**Reference:**
- DS constraints: `docs/DS_CONSTRAINTS.md`
- Alert API: `packages/web/src/components/feedback/Alert.tsx` — `variant="info"`, accepts `title?`, children
- Card API: `packages/web/src/components/display/Card.tsx` — `Card` (default `p-4 gap-4`, do not override), `CardHeader` (`gap-2`), `CardTitle` (`type-h4 !font-semibold` on `<h3>`), `CardDescription` (`type-body-sm text-muted-foreground`), `CardContent`

**Rules:**
- Never override Card/CardContent padding (per `feedback_card_no_override`)
- Do not touch the raw `<code className="...type-caption font-mono bg-surface-subtle...">` pattern — InlineCode migration is out of scope (per `feedback_review_table_inlinecode`)
- Use DS tokens only — no raw values

---

## Task 1: Replace muted intro sub-paragraph with Alert (Finding #1)

**Files:**
- Modify: `apps/docs/app/components/forms/page.tsx` (import list + L103–111)

**Step 1: Add `Alert` to the imports from `@umichkisa-ds/web`**

In the existing import block (L4–18), add `Alert` (alphabetically — between `Button` and `Container` is fine; order within the existing object-style import doesn't matter).

**Step 2: Replace lines 103–111 with an Alert**

Remove the entire `<p className="type-body-sm mb-8 text-muted-foreground max-w-prose"> … </p>` block.

Replace with:

```tsx
<div className="mb-8 max-w-prose">
  <Alert variant="info">
    For form state management, validation, and submission handling, see the{' '}
    <a href="/forms/overview" className="text-link underline hover:text-brand-primary">
      Forms
    </a>{' '}
    section — it provides a{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Form>'}</code>{' '}
    compound component that wires these primitives to react-hook-form automatically.
  </Alert>
</div>
```

Notes:
- Wrapper `div` exists only to hold `mb-8` + `max-w-prose` without modifying Alert's internals.
- No `title` prop — the message is a single flow of text.

**Step 3: Visual check**

Expected: Alert with info icon + navy-tinted background, contains the cross-ref sentence. Section spacing below unchanged.

**Step 4: ds-review pass**

Invoke the `ds-review` agent on `apps/docs/app/components/forms/page.tsx`. Fix any violations before proceeding.

**Step 5: Commit**

```bash
git add apps/docs/app/components/forms/page.tsx
git commit -m "fix(docs/components/forms): replace muted cross-ref paragraph with Alert"
```

---

## Task 2: Replace raw Event Registration card with DS Card composition (Finding #2)

**Files:**
- Modify: `apps/docs/app/components/forms/page.tsx` (import list + L280–350 region)

**Step 1: Add Card primitives to the imports from `@umichkisa-ds/web`**

Add: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`.

**Step 2: Replace the raw card block**

Current (L280–350):

```tsx
<div className="rounded-lg border border-border bg-surface p-8">
  <div className="mb-6">
    <h3 className="type-h2 text-foreground">Event Registration</h3>
    <p className="type-body-sm text-muted-foreground mt-1">
      Register for the upcoming KISA networking event. Fields marked with * are required.
    </p>
  </div>

  <div className="flex flex-col gap-4 max-w-md">
    {/* …all the FormItems unchanged… */}
    <div className="pt-2">
      <Button>Register</Button>
    </div>
  </div>
</div>
```

Replace with:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Event Registration</CardTitle>
    <CardDescription>
      Register for the upcoming KISA networking event. Fields marked with * are required.
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div className="flex flex-col gap-4 max-w-md">
      {/* …all the existing FormItems, unchanged, in the same order… */}
      <FormItem htmlFor="demo-name" label="Full name" required>
        <Input id="demo-name" placeholder="e.g. Kim Minjun" />
      </FormItem>

      {/* (keep every FormItem from the original block verbatim) */}

      <div className="pt-2">
        <Button>Register</Button>
      </div>
    </div>
  </CardContent>
</Card>
```

Notes:
- **Do NOT pass `className` with padding overrides on `Card` or `CardContent`.** `Card` default is `p-4 gap-4`; that is correct.
- `CardTitle` defaults to `<h3>` with `type-h4 !font-semibold` — this replaces the current `<h3 type-h2>`, fixing the heading-size finding.
- `CardDescription` defaults to `type-body-sm text-muted-foreground` — matches the current description styling; drop the old `mt-1` (the `CardHeader gap-2` handles vertical spacing).
- The inner `<div className="flex flex-col gap-4 max-w-md">` form wrapper is preserved as-is.
- Preserve every single `FormItem` in the existing order (name, email, year/Select, dietary, notes/Textarea, contact/RadioGroup, updates/Switch, terms/Checkbox) plus the `Button`.
- Do NOT add a `line-clamp` override — `CardTitle` / `CardDescription` default clamp is acceptable here since title and description are short.

**Step 3: Visual check (source only — open file and verify)**

- No `rounded-lg`, no `border border-border`, no `bg-surface`, no `p-8` remaining in the Event Registration block.
- `<h3 className="type-h2">` gone.
- `mt-1` on description gone.

**Step 4: ds-review pass**

Invoke the `ds-review` agent on `apps/docs/app/components/forms/page.tsx`. Fix any violations before proceeding.

**Step 5: Commit**

```bash
git add apps/docs/app/components/forms/page.tsx
git commit -m "fix(docs/components/forms): migrate Event Registration demo to Card primitives"
```

---

## Task 3: Regroup Composition Patterns into two subsections (Finding #3)

**Files:**
- Modify: `apps/docs/app/components/forms/page.tsx` (Section 1 body — L113–267)

**Context:** Today, Section 1 has 7 `<h3>` subsections, each a single `FormItem + Control` example with repetitive filler prose ("Works identically with X", "Same pattern for Y"). Regroup under two `<h3>` headings — "Text inputs" and "Toggle controls" — with one shared intro paragraph per group, then the existing `ComponentPreview` blocks stacked inside with no per-example prose.

**Step 1: Rewrite Section 1 body**

Replace everything between the `<h2>Composition Patterns</h2>` section intro (keep L114–121 intro `<h2>` + `<p>` as-is) and the `<h2>Complete Form Example</h2>` (L270) with the following structure:

```tsx
{/* Text inputs */}
<h3 className="type-h3 mt-6 mb-2 text-foreground">Text inputs</h3>
<p className="type-body mb-4 text-foreground max-w-prose">
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    FormItem
  </code>{' '}
  composes with{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    Input
  </code>,{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    Textarea
  </code>, and{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    Select
  </code>{' '}
  for single-line, multi-line, and dropdown text entry. Pass an{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    error
  </code>{' '}
  string to surface validation feedback, and mirror it on the control with the{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    invalid
  </code>{' '}
  prop.
</p>

<ComponentPreview code={basicCode}>
  <div className="w-full max-w-sm">
    <FormItem htmlFor="cp-name" label="Name">
      <Input id="cp-name" placeholder="Enter your name" />
    </FormItem>
  </div>
</ComponentPreview>

<ComponentPreview code={errorCode}>
  <div className="w-full max-w-sm">
    <FormItem
      htmlFor="cp-email-err"
      label="Email"
      error="Please enter a valid email address."
    >
      <Input id="cp-email-err" type="email" invalid placeholder="you@example.com" />
    </FormItem>
  </div>
</ComponentPreview>

<ComponentPreview code={textareaCode}>
  <div className="w-full max-w-sm">
    <FormItem htmlFor="cp-bio" label="Bio" description="Tell us about yourself.">
      <Textarea id="cp-bio" placeholder="Write something..." />
    </FormItem>
  </div>
</ComponentPreview>

<ComponentPreview code={selectCode}>
  <div className="w-full max-w-sm">
    <FormItem htmlFor="cp-role" label="Role" required>
      <Select value={selectRole} onValueChange={setSelectRole}>
        <SelectTrigger placeholder="Select a role" />
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  </div>
</ComponentPreview>

{/* Toggle controls */}
<h3 className="type-h3 mt-8 mb-2 text-foreground">Toggle controls</h3>
<p className="type-body mb-4 text-foreground max-w-prose">
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    Checkbox
  </code>,{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    Switch
  </code>, and{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    RadioGroup
  </code>{' '}
  compose inside{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    FormItem
  </code>{' '}
  with their inline description supplied via the{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    text
  </code>{' '}
  prop. The FormItem provides the field heading; the toggle's{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    text
  </code>{' '}
  provides the inline label.
</p>

<ComponentPreview code={checkboxCode}>
  <div className="w-full max-w-sm">
    <FormItem htmlFor="cp-terms" label="Agreement" required>
      <Checkbox id="cp-terms" text="I agree to the terms and conditions" />
    </FormItem>
  </div>
</ComponentPreview>

<ComponentPreview code={switchCode}>
  <div className="w-full max-w-sm">
    <FormItem htmlFor="cp-notif" label="Notifications">
      <Switch id="cp-notif" text="Enable email updates" />
    </FormItem>
  </div>
</ComponentPreview>

<ComponentPreview code={radioCode}>
  <div className="w-full max-w-sm">
    <FormItem htmlFor="cp-contact" label="Preferred contact method">
      <RadioGroup>
        <RadioItem value="email" text="Email" />
        <RadioItem value="phone" text="Phone" />
        <RadioItem value="mail" text="Mail" />
      </RadioGroup>
    </FormItem>
  </div>
</ComponentPreview>
```

Notes:
- First `<h3>` uses `mt-6`, second uses `mt-8` — matches established docs rhythm (per `feedback_h3_first_mt6`).
- All 7 existing `ComponentPreview` blocks are preserved; only the per-example `<h3>` + prose between them is removed.
- The 7 existing code snippet constants (`basicCode`, `errorCode`, `textareaCode`, `selectCode`, `checkboxCode`, `switchCode`, `radioCode`) are all still used — do not remove any.
- Spacing before the first preview uses `mb-4` on the group intro `<p>`; subsequent previews flow naturally via `ComponentPreview` margins.

**Step 2: Verify no orphaned code snippet constants**

Quick scan — all 7 snippet consts should still be referenced.

**Step 3: ds-review pass**

Invoke the `ds-review` agent on `apps/docs/app/components/forms/page.tsx`. Fix any violations.

**Step 4: Commit**

```bash
git add apps/docs/app/components/forms/page.tsx
git commit -m "fix(docs/components/forms): regroup composition patterns into text inputs + toggle controls"
```

---

## Task 4: Build + typecheck + TODO

**Step 1: Run build**

```bash
pnpm --filter docs-app build
# or from root: pnpm build
```

Expected: PASS.

**Step 2: Run typecheck**

```bash
pnpm typecheck
```

Expected: PASS.

**Step 3: Check off both Batch 16 forms items in `docs/TODO.md`**

```markdown
- [x] Review `/components/forms`
- [x] Fix `/components/forms` — plan: `docs/plans/review-fix-components-forms.md`
```

Also link the plan path on the Review line to match convention (optional — match surrounding style).

**Step 4: Commit TODO update**

```bash
git add docs/TODO.md
git commit -m "chore(todo): check off /components/forms review + fix"
```

---

## Verification checklist

- [ ] Alert component imported and used for cross-ref paragraph
- [ ] No raw `rounded-lg border border-border bg-surface p-8` in Event Registration block
- [ ] No `type-h2` applied to an `<h3>` anywhere in the file
- [ ] No `p-8` / `p-6` / other padding overrides on Card or CardContent
- [ ] Composition Patterns has exactly 2 `<h3>` subsections: "Text inputs", "Toggle controls"
- [ ] All 7 `ComponentPreview` blocks still present, in original order within their group
- [ ] `pnpm build` + `pnpm typecheck` pass
- [ ] ds-review pass clean
- [ ] Both TODO items checked off
