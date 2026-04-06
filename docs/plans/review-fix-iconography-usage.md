# Fix Plan — /foundation/iconography/usage

> **For Claude:** REQUIRED SUB-SKILL: Use `ds-constrained-execution` to implement this plan task-by-task.

**Goal:** Apply 4 active fixes (findings #1, #2, #3, #5; #4/#6/#7 resolved transitively) to the Iconography Usage page based on review findings (`docs/reviews/docs-app-review.md` § /foundation/iconography/usage).

**Architecture:** All edits live in a single file: `apps/docs/app/foundation/iconography/usage/page.tsx`. No new files, no component changes. One commit at the end after `pnpm build` + `pnpm typecheck` pass.

**Tech Stack:** Next.js 15, Tailwind v4, `@umichkisa-ds/web` Container, CodeBlock + DoDont docs components, `type-*` semantic typography utilities.

**DS Constraints referenced:**
- Iconography → Usage rules already documented in `docs/DS_CONSTRAINTS.md` (no changes needed).
- Typography → Usage: avoid weight utilities on entire containers; use `<strong>` for inline emphasis.

**Out of scope (handled by global TODO items):**
- Raw `<code className="… type-caption font-mono …">` → `<InlineCode>` migration.
- Raw `<hr>` → `Divider` migration.
- H2 `mt-8` after `hr my-8` doubled gap.
- CodeBlock mobile UX (separate TODO item).

---

## Task 1: Fix #5 — Drop the redundant intro paragraph

**File:** `apps/docs/app/foundation/iconography/usage/page.tsx`

The first `<p>` (lines 15–20) duplicates content already covered on `/foundation/iconography/overview` ("`<Icon>` is the only way…", "never import a Lucide icon directly"). Drop it; the page should jump straight from H2 to the code example.

**Step 1: Remove lines 15–20**

Delete the entire paragraph block:
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  The{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
  component is the only way to render an icon in the KISA design
  system. Never import a Lucide icon directly into a component.
</p>
```

The H2 ("The `<Icon>` Component") should now be immediately followed by the `<CodeBlock>`.

**Step 2: Visual sanity check**

Reload `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/iconography/usage` and confirm the H2 is followed directly by the code example with no orphaned paragraph.

---

## Task 2: Fix #1 (+#6, #7) — Remove the Props table and "Props:" label

**File:** `apps/docs/app/foundation/iconography/usage/page.tsx`

The Props table belongs on `/components/icon`, not on a foundation/usage page. Already TODO'd as a follow-up. Remove the entire table block and the `<strong>Props:</strong>` label that introduces it.

**Step 1: Remove lines 31–33 (the "Props:" label paragraph)**

Delete:
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  <strong className="font-semibold text-foreground">Props:</strong>
</p>
```

**Step 2: Remove lines 35–72 (the entire `<div className="my-6 overflow-x-auto">` containing the props table)**

Delete the wrapper `<div>` and everything inside it (the `<table>`, `<thead>`, `<tbody>`, all four `<tr>` rows). After deletion, the `<hr>` that follows should sit immediately after the closing of the previous `<CodeBlock>` (with no orphan elements between).

**Step 3: Visual sanity check**

Reload the page. The "The `<Icon>` Component" section should now be: H2 → code example → `<hr>` → next section. No "Props:" label, no table.

---

## Task 3: Fix #2 (+#4) — Merge "Icons Are Never Interactive" + "Icon-Only Interactive Elements" into one section

**File:** `apps/docs/app/foundation/iconography/usage/page.tsx`

The current page has two adjacent prose sections that both say "wrap interactive icons in a button":
- §"Icons Are Never Interactive" (lines 76–106): explains SVGs aren't interactive, must wrap, touch target.
- §"Icon-Only Interactive Elements" (lines 136–164): aria-label + Tooltip, don't double-up `label` prop.

Merge them into one section titled **"Wrapping for Interaction"** that flows: (a) why icons need a wrapper, (b) wrapper provides interaction + accessible label, (c) wrapper provides 44×44 touch target, (d) icon-only buttons need `aria-label` + Tooltip, (e) don't double-up `label` prop on `<Icon>` when the wrapper has `aria-label`.

**Step 1: Replace the two sections (lines 76–164, including the `<hr>` between them) with one merged section**

Find the block from line 76 (`{/* ── Icons Are Never Interactive ──── */}`) through line 165 (the closing `<hr>` after the second section, just before the `{/* ── Icon + Text ── */}` comment).

Replace with:

```tsx
      {/* ── Wrapping for Interaction ─────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Wrapping for Interaction</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        component renders an SVG. SVGs have no keyboard focus, no click semantics, and no role
        that signals interactivity to assistive technology. Always wrap an interactive icon in a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<button>'}</code>{' '}
        or{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<a>'}</code>.
        {' '}The wrapper provides the interaction model, the keyboard target, and the accessible label.
      </p>

      <CodeBlock code={`// ✅ correct — button provides interaction semantics
<button aria-label="Close">
  <Icon name="x" />
</button>

// ❌ wrong — icon has no interaction semantics
<Icon name="x" onClick={close} />`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The wrapper also provides the touch target. Interactive elements must have a minimum tap
        area of 44×44px — the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        itself is never 44px; the button or link around it is.
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        When an icon is the only content inside a button or link, provide an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
        on the wrapper so screen reader users know what the control does, and wrap the button in a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Tooltip>'}</code>{' '}
        for sighted users who may not recognize the icon.
      </p>

      <CodeBlock code={`<Tooltip content="Close dialog">
  <button aria-label="Close dialog">
    <Icon name="x" />
  </button>
</Tooltip>`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
        on the button and the tooltip content should be identical. Do not also pass a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code>{' '}
        prop on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
        — that creates redundant screen-reader announcements.
      </p>

      <hr className="my-8 border-0 border-t border-border" />
```

**Step 2: Visual sanity check**

Reload the page. Confirm:
- One section titled "Wrapping for Interaction" (no "Icons Are Never Interactive" heading, no "Icon-Only Interactive Elements" heading).
- Two code blocks inside the section (button-with-icon, then Tooltip-wrapped button).
- Section flows: explanation → button code → touch target paragraph → aria-label paragraph → Tooltip code → don't-double-up paragraph → `<hr>`.
- Next section is "Icon + Text".

---

## Task 4: Fix #3 — Drop the "Icon color" Do/Don't

**File:** `apps/docs/app/foundation/iconography/usage/page.tsx`

The "Color" prose section (with two examples and a "never pass color prop" warning) already covers the rule. The Do/Don't is a redundant restatement using the same `text-error` + `alert-triangle` example.

**Step 1: Remove the "Icon color" Do/Don't block**

Find the block starting at the `{/* Icon color */}` comment (around line 268 in the original; line numbers will have shifted by now). Delete from that comment through the closing `</DoDont>` of the "Icon color" group:

```tsx
      {/* Icon color */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Icon color</h3>
      <DoDont>
        <Do>
          <p className="type-body text-foreground">Control icon color through the parent{"'"}s text color using semantic tokens. The icon inherits <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">currentColor</code>.</p>
          <CodeBlock code={`<span className="text-error">
  <Icon name="alert-triangle" />
</span>`} lang="tsx" />
        </Do>
        <Dont>
          <p className="type-body text-foreground">Pass raw color values inline to an icon. This bypasses the semantic token system and cannot be updated globally.</p>
          <CodeBlock code={`<Icon name="alert-triangle" color="#ef4444" />`} lang="tsx" />
        </Dont>
      </DoDont>
```

After deletion the "Do's and Don'ts" section should contain only two H3 groups: "Wrapping interactive icons" and "Sizing icons".

**Step 2: Visual sanity check**

Reload the page. Confirm the bottom Do's and Don'ts section has exactly **two** Do/Don't groups (Wrapping, Sizing) — no third "Icon color" group.

---

## Task 5: Verify build & typecheck

**Step 1: Run typecheck**
```bash
pnpm typecheck
```
Expected: PASS.

**Step 2: Run build**
```bash
pnpm build
```
Expected: PASS.

**Step 3: Full visual smoke test**

Reload `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/iconography/usage` and walk top to bottom. Confirm sections in order:
1. H1 "Usage"
2. "The `<Icon>` Component" → code example (no intro paragraph, no Props table)
3. "Wrapping for Interaction" → 2 code examples
4. "Icon + Text" → code example
5. "Color" → 2 code examples
6. "Disabled Icons" → code example
7. "Responsive Sizing" → code example
8. "Do's and Don'ts" → 2 groups (Wrapping, Sizing)

Also test mobile (375px): no horizontal overflow, sections stack cleanly.

---

## Task 6: Commit

```bash
git add apps/docs/app/foundation/iconography/usage/page.tsx
git commit -m "fix(docs): clean up /foundation/iconography/usage per review

- Drop intro paragraph that duplicates Overview page (#5)
- Remove Props table — belongs on /components/icon (#1, #6, #7)
- Merge 'Icons Are Never Interactive' + 'Icon-Only Interactive
  Elements' into one 'Wrapping for Interaction' section (#2, #4)
- Drop redundant 'Icon color' Do/Don't — covered by Color prose (#3)"
```

---

## Task 7: Update TODO

In `docs/TODO.md`, check off:
- `- [x] Review /foundation/iconography/usage`
- `- [x] Fix /foundation/iconography/usage`

(The "Add Props table to /components/icon" follow-up was already added under § Docs App Enhancements during the review session — no further TODO changes.)
