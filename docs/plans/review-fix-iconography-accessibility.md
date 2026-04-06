# /foundation/iconography/accessibility — Review Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Every `.tsx` change requires a `ds-review` agent pass before commit (per `superpowers:ds-constrained-execution`).

**Goal:** Apply 4 review findings from `docs/reviews/docs-app-review.md` (entry: `/foundation/iconography/accessibility`) to `apps/docs/app/foundation/iconography/accessibility/page.tsx`.

**Architecture:** Single phase. All findings touch one file. No new components. One DS migration (raw `<table>` → DS `Table`).

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (Container, Table family), local `CodeBlock` docs component.

---

## Source of Truth

- Review entry: `docs/reviews/docs-app-review.md` § `/foundation/iconography/accessibility`
- Target file: `apps/docs/app/foundation/iconography/accessibility/page.tsx`
- DS Table reference usage: `apps/docs/app/foundation/iconography/sizes/page.tsx:1-55`
- DS constraints: `docs/DS_CONSTRAINTS.md`

## Out of Scope (deferred to global TODOs)

- Raw `<code className="...type-caption font-mono...">` → `<InlineCode>` (TODO line 179)
- Raw `<hr>` → `<Divider>` (TODO line 180)

---

## Phase 1: Apply Findings

### Task 1 — Fix #2: Typo in opening paragraph

**File:** `apps/docs/app/foundation/iconography/accessibility/page.tsx:15`

**Step 1:** Edit line 15. Change:

```tsx
{'"'}delete{'"'} to anyone looking at the screen.
```

to:

```tsx
{' "'}delete{'"'} to anyone looking at the screen.
```

(Adds a leading space inside the JSX expression so the rendered output is `conveys "delete"` with a space before the opening quote.)

**Step 2:** `pnpm --filter @umichkisa-ds/docs typecheck`. Expect: pass.

**Step 3:** Commit.

```bash
git add apps/docs/app/foundation/iconography/accessibility/page.tsx
git commit -m "fix(docs/iconography/accessibility): add missing space before \"delete\" quote (#2)"
```

---

### Task 2 — Fix #4: Trim Touch Targets opening sentence

**File:** `apps/docs/app/foundation/iconography/accessibility/page.tsx:130-136`

**Step 1:** Replace the first paragraph of the Touch Targets section. Current:

```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  The{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
  component renders an SVG at the specified size — 12px to 32px depending on the{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code>{' '}
  prop. None of these are large enough to serve as a touch target.
</p>
```

New:

```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  The{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
  component renders an SVG sized via the{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code>{' '}
  prop. None of these are large enough to serve as a touch target.
</p>
```

**Step 2:** `pnpm --filter @umichkisa-ds/docs typecheck`. Expect: pass.

**Step 3:** Commit.

```bash
git add apps/docs/app/foundation/iconography/accessibility/page.tsx
git commit -m "docs(iconography/accessibility): trim Touch Targets opening sentence (#4)"
```

---

### Task 3 — Fix #1 + #3: Consolidate tables and migrate to DS Table

This task combines findings #1 and #3 because the consolidation produces a single new table — building it directly with the DS `Table` component is simpler than consolidating first then migrating.

**File:** `apps/docs/app/foundation/iconography/accessibility/page.tsx`

**Step 1: Update imports.** Change line 1 from:

```tsx
import { Container } from '@umichkisa-ds/web'
```

to:

```tsx
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@umichkisa-ds/web'
```

**Step 2: Delete the entire "Quick Reference" section** (lines 207–235 — the `<hr>` divider, the `<h2>Quick Reference</h2>`, and the `<div className="my-6 overflow-x-auto">…</div>` containing the table).

**Step 3: Replace the Decision Rule section's existing raw `<table>` block** (current lines 96–119: the `<div className="my-6 overflow-x-auto"><table>…</table></div>`) with the consolidated DS Table:

```tsx
<div className="my-6">
  <Table size="sm">
    <TableHeader>
      <TableRow>
        <TableHead>Scenario</TableHead>
        <TableHead>Approach</TableHead>
        <TableHead>Markup</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Icon next to a visible text label</TableCell>
        <TableCell>
          Decorative — omit{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code>{' '}
          prop
        </TableCell>
        <TableCell>
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{`<button><Icon name="save" />Save</button>`}</code>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Icon alone inside a{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">button</code>{' '}
          or{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">a</code>
        </TableCell>
        <TableCell>
          Decorative —{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
          on the wrapper, not the icon
        </TableCell>
        <TableCell>
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{`<button aria-label="Close"><Icon name="x" /></button>`}</code>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Standalone meaning indicator (no button, no nearby text)</TableCell>
        <TableCell>
          Semantic — provide{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code>{' '}
          prop
        </TableCell>
        <TableCell>
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{`<Icon name="check-circle" label="Verified" />`}</code>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

**Step 4: Move the "When in doubt…" closing line above the new table** so it frames the table as the answer to its question. Current (lines 121–124):

```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  When in doubt, ask: <em>is there text nearby that already describes this?</em> If yes,
  decorative. If no, semantic.
</p>
```

Move this `<p>` so it sits between the existing intro paragraph (`Three scenarios cover the vast majority of icon usage:`) and the new `<div className="my-6"><Table…`. Actually — re-read the intro on line 92–94. It already says "Three scenarios cover the vast majority of icon usage:" Keep that line, then place the "When in doubt" paragraph immediately after it (still above the table), and remove the original "When in doubt" paragraph from its old position below the old table.

**Final order in the Decision Rule section:**
1. `<h2>Decision Rule</h2>`
2. `<p>Three scenarios cover the vast majority of icon usage:</p>`
3. `<p>When in doubt, ask: <em>is there text nearby that already describes this?</em> If yes, decorative. If no, semantic.</p>`
4. New consolidated DS Table
5. `<hr>` divider (the existing one between Decision Rule and Touch Targets — keep)

**Step 5: Verify no orphaned `<hr>` left behind from deleted Quick Reference section.** The deletion in Step 2 should remove both the `<hr>` and `<h2>Quick Reference</h2>` plus the table. The article should now end with the closing `</Container>` immediately after the Icon Color and Contrast section's last `</p>` (line 205) and the `<hr>` that originally separated Icon Color from Quick Reference. **Delete that `<hr>` too** — it's a trailing divider with nothing after it.

**Step 6:** `pnpm --filter @umichkisa-ds/docs typecheck`. Expect: pass.

**Step 7:** `pnpm --filter @umichkisa-ds/docs build`. Expect: pass.

**Step 8: DS review pass.** Invoke `ds-review` agent on the modified file. Address any violations before committing.

**Step 9: Visual smoke check.** Open `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/iconography/accessibility` in the browser and confirm:
- Decision Rule table renders with three columns (Scenario / Approach / Markup) and three rows.
- Quick Reference section is gone.
- Touch Targets section follows immediately after the consolidated table.
- No double dividers or orphan `<hr>` lines.

**Step 10:** Commit.

```bash
git add apps/docs/app/foundation/iconography/accessibility/page.tsx
git commit -m "refactor(docs/iconography/accessibility): consolidate tables, migrate to DS Table (#1, #3)"
```

---

## Phase 2: Verification & TODO

### Task 4 — Final verification

**Step 1:** From repo root, run:

```bash
pnpm typecheck && pnpm build
```

Expect: both pass.

**Step 2:** Confirm git status is clean.

```bash
git status
```

Expect: nothing to commit, working tree clean.

### Task 5 — Update TODO

**File:** `docs/TODO.md`

**Step 1:** Mark the Batch 6 row checked:

```diff
- - [ ] Fix `/foundation/iconography/accessibility`
+ - [x] Fix `/foundation/iconography/accessibility`
```

**Step 2:** Commit.

```bash
git add docs/TODO.md
git commit -m "chore(todo): check off /foundation/iconography/accessibility fix"
```

---

## Done Criteria

- [ ] All 4 findings applied
- [ ] `pnpm typecheck` and `pnpm build` pass
- [ ] `ds-review` agent reports no new violations
- [ ] Visual smoke check passes (single 3-column table, no orphan dividers)
- [ ] `docs/TODO.md` updated
- [ ] Working tree clean
