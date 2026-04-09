# review-fix-components-label Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Resolve the 4 findings from the `/components/label` UI review — migrate the API table to the DS `Table` + `TableMobileList` pattern, fix the "Default" column conflation of required-ness, trim redundant prose, and add a rationale clause to the aria-labelledby example.

**Architecture:** Single-file edit to `apps/docs/app/components/label/page.tsx`. Mirrors the pattern already established by the `/components/input` fix (see `docs/plans/review-fix-components-input.md` and commit `0d79dee` for reference).

**Tech Stack:** Next.js App Router, DS `Table` / `TableMobileList` from `@umichkisa-ds/web`, Tailwind v4 semantic tokens.

**Reference:** `apps/docs/app/components/input/page.tsx` — same pattern already landed there; copy the Table + TableMobileList structure exactly.

---

## Phase 1 — Content & DS fixes (single file)

### Task 1: Trim intro and example prose (Finding #3)

**Files:**
- Modify: `apps/docs/app/components/label/page.tsx`

**Step 1: Replace the intro `<p>` block** (lines 63–77) with:

```tsx
<p className="type-body mb-8 text-foreground max-w-prose">
  Form label with an optional required indicator. Renders a native{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    &lt;label&gt;
  </code>{' '}
  element.
</p>
```

**Step 2: Drop the "Default" example intro paragraph** (lines 84–86). The `<h3>Default</h3>` goes directly to the `<ComponentPreview>`.

**Step 3: Replace the "Required" example intro paragraph** (lines 93–99) with a single sentence:

```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  Set <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">required</code> to append a red asterisk.
</p>
```

**Step 4: Commit**

```bash
git add apps/docs/app/components/label/page.tsx
git commit -m "docs(label): trim redundant intro + example prose (review #3)"
```

---

### Task 2: Add rationale to "With aria-labelledby" intro (Finding #4)

**Files:**
- Modify: `apps/docs/app/components/label/page.tsx`

**Step 1: Replace the "With aria-labelledby" intro paragraph** (lines 123–136) with:

```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  Non-native form controls like Radix Select don't render a real{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    &lt;input&gt;
  </code>
  , so{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    htmlFor
  </code>{' '}
  has nothing to target. Use{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    id
  </code>{' '}
  on the Label and{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
    aria-labelledby
  </code>{' '}
  on the trigger instead.
</p>
```

**Step 2: Commit**

```bash
git add apps/docs/app/components/label/page.tsx
git commit -m "docs(label): add rationale to aria-labelledby example (review #4)"
```

---

### Task 3: Migrate API table → Table + TableMobileList (Findings #1, #2)

**Files:**
- Modify: `apps/docs/app/components/label/page.tsx`

**Reference:** Open `apps/docs/app/components/input/page.tsx` and copy its `Table` + `TableMobileList` structure exactly — same imports, same wrapper divs (`hidden md:block` / `block md:hidden`), same header classes, same footnote pattern.

**Step 1: Update imports** — add `Table`, `TableMobileList` (and any sub-components `input` page uses, e.g. `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`) from `@umichkisa-ds/web` alongside the existing `Container, Label` import.

**Step 2: Replace the entire API Reference block** (lines 141–193 — the `<h2>`, intro `<p>`, and the `<div className="my-6 overflow-x-auto">...raw <table>...</div>`) with the DS pattern. Use **these rows** (note the `*` on required props and `—` in Default):

| Prop | Type | Default | Description |
|---|---|---|---|
| `htmlFor*` | `string` | `—` | The id of the form control this label is associated with. |
| `id` | `string` | `—` | HTML id attribute. Use when other elements need to reference this label via `aria-labelledby`. |
| `required` | `boolean` | `false` | Appends a red asterisk to indicate the field is required. |
| `className` | `string` | `—` | Merged via `cn()`. Use for layout utilities only. |
| `children*` | `ReactNode` | `—` | Label text content. |

- Desktop `Table` (`hidden md:block`): 4 columns — Prop / Type / Default / Description.
- Mobile `TableMobileList` (`block md:hidden`): 3 fields per item — Prop / Type / Description (drop Default).
- Below the table, add: `<p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>`

Keep the `<h2>API Reference</h2>` heading and the intro paragraph above the table (the intro paragraph is fine — it just explains that Label accepts standard `<label>` attributes).

**Step 3: Typecheck and build**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
pnpm build
```

Expected: both pass.

**Step 4: Commit**

```bash
git add apps/docs/app/components/label/page.tsx
git commit -m "docs(label): migrate API table to Table + TableMobileList (review #1, #2)"
```

---

## Verification

1. `pnpm typecheck` — passes
2. `pnpm build` — passes
3. Visual check at `/components/label` at 1280px and 375px — API table renders as DS Table on desktop, as stacked TableMobileList on mobile; required props show `*` with the footnote visible.
4. Check off `Fix /components/label` in `docs/TODO.md`.
