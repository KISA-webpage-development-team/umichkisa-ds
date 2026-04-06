# Fix Plan — /foundation/iconography/overview

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` (or `ds-constrained-execution`) to implement this plan task-by-task.

**Goal:** Apply 3 minor fixes to the Iconography overview page based on review findings (`docs/reviews/docs-app-review.md` § /foundation/iconography/overview).

**Architecture:** All edits live in a single file: `apps/docs/app/foundation/iconography/overview/page.tsx`. No new files, no component changes, no API changes. One commit at the end after `pnpm build` + `pnpm typecheck` pass.

**Tech Stack:** Next.js 15, Tailwind v4, `@umichkisa-ds/web` Container component, `type-*` semantic typography utilities.

**DS Constraints referenced:**
- Typography → Usage: "Never apply weight utilities (`font-semibold`, `font-bold`) to entire text containers for emphasis — use `<strong>` for inline emphasis."
- Typography → Scale: `type-h1` already encodes `font-family: var(--font-sejong-bold)` and `letter-spacing: -0.025em` (verified `packages/web/src/styles/index.css:169-174`).

---

## Task 1: Fix #1 — Remove redundant utilities from 4× `<strong>` tags

**File:** `apps/docs/app/foundation/iconography/overview/page.tsx`

**Lines affected:** 17, 31, 35, 45

**Step 1: Edit line 17**

Replace:
```tsx
<strong className="font-semibold text-foreground">Lucide</strong>
```
With:
```tsx
<strong>Lucide</strong>
```

**Step 2: Edit line 31**

Replace:
```tsx
<strong className="font-semibold text-foreground">Lucide</strong>
```
With:
```tsx
<strong>Lucide</strong>
```

**Step 3: Edit lines 35–37**

Replace:
```tsx
<strong className="font-semibold text-foreground">
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>
</strong>
```
With:
```tsx
<strong>
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>
</strong>
```

**Step 4: Edit line 45**

Replace:
```tsx
<strong className="font-semibold text-foreground">Semantic usage</strong>
```
With:
```tsx
<strong>Semantic usage</strong>
```

**Step 5: Visual sanity check**

Open `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/iconography/overview` and confirm the four bolded terms (Lucide, Lucide, `<Icon>`, Semantic usage) still render as bold. Browser default for `<strong>` is `font-weight: bold` (700) — they will be slightly heavier than the previous 600 (`font-semibold`). This is intended.

---

## Task 2: Fix #2 — Remove redundant `font-sejong-bold tracking-tight` from `<h1>`

**File:** `apps/docs/app/foundation/iconography/overview/page.tsx:7`

**Step 1: Edit line 7**

Replace:
```tsx
<h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Iconography</h1>
```
With:
```tsx
<h1 className="type-h1 mb-4 text-foreground">Iconography</h1>
```

**Step 2: Visual sanity check**

Reload the page. The "Iconography" heading must still render in SejongHospital Bold with tight letter-spacing — both are now provided by `type-h1` itself. If the heading visually changes, stop and investigate the type-h1 definition.

---

## Task 3: Fix #3 — Condense the two intro paragraphs

**File:** `apps/docs/app/foundation/iconography/overview/page.tsx:8-21`

**Step 1: Replace the two intro paragraphs with one**

Replace lines 8–21 (both `<p>` tags):
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  Icons carry meaning silently. A trash can means delete. A magnifying glass means
  search. Done consistently, icons reduce reading load and make interfaces feel
  intuitive. Done carelessly — a mix of three different visual styles pulled from
  four different libraries — they create visual noise that undermines every other
  design decision on the page.
</p>
<p className="type-body mb-4 text-foreground max-w-prose">
  Every icon in the KISA design system comes from{' '}
  <strong>Lucide</strong>. One library, one
  stroke weight, one source of truth. The moment a second icon library enters the
  codebase, the visual language splits — users may not consciously notice, but
  they feel it. The interface stops feeling designed and starts feeling assembled.
</p>
```

With a single condensed paragraph:
```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  Icons carry meaning silently — a trash can means delete, a magnifying glass
  means search. Consistency is what makes that work: every icon in the KISA
  design system comes from <strong>Lucide</strong>, one library with one stroke
  weight as the single source of truth. The moment a second icon library enters
  the codebase, the visual language splits — users may not consciously notice,
  but they feel it.
</p>
```

> Note: this Task assumes Task 1 has already removed `className="font-semibold text-foreground"` from the `<strong>` tag. If executing out of order, preserve the cleaned-up `<strong>` form.

**Step 2: Read the new paragraph aloud**

Verify it flows and doesn't drop key information from the originals: (a) icons carry meaning, (b) consistency matters, (c) Lucide is the single source of truth, (d) mixing libraries fractures the visual language.

---

## Task 4: Verify build & typecheck

**Step 1: Run typecheck**

```bash
pnpm typecheck
```
Expected: PASS (no new errors).

**Step 2: Run build**

```bash
pnpm build
```
Expected: PASS.

**Step 3: Visual smoke test**

Reload `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/iconography/overview`. Confirm:
- H1 still bold + tight tracking
- Four `<strong>` terms still bold
- Single intro paragraph (not two)
- "How the System Works" section unchanged

---

## Task 5: Commit

```bash
git add apps/docs/app/foundation/iconography/overview/page.tsx
git commit -m "fix(docs): clean up /foundation/iconography/overview per review

- Remove redundant font-semibold/text-foreground from 4× <strong>
- Remove redundant font-sejong-bold/tracking-tight from <h1>
  (already encoded by type-h1)
- Condense two intro paragraphs into one"
```

---

## Task 6: Update TODO

In `docs/TODO.md`:
1. Check off `- [ ] Review /foundation/iconography/overview`
2. Check off `- [ ] Fix /foundation/iconography/overview`
3. Add new item under "Docs App Enhancements" next to the InlineCode item:
   - `- [ ] Migrate raw <hr> → Divider component across all docs pages (14 foundation pages currently use raw <hr>)`
