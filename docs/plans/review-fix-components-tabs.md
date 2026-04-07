# Review Fix: /components/tabs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Every `.tsx` change requires a `ds-review` agent pass before commit per `docs/CLAUDE.md`.

**Goal:** Resolve all 5 review findings for `/components/tabs`, plus two bonus sweeps: (a) deck→Alert pattern on `/components/alert`, and (b) remove the redundant `font-sejong-bold tracking-tight` `<h1>` utilities across all 31 component pages.

**Architecture:** Pure docs-page edits to `apps/docs/app/components/**/page.tsx`. No `packages/web` changes. The DS `Table` + `TableMobileList` migration follows the established `/components/divider` pattern. The deck→Alert change introduces `<Alert variant="info">` from `@umichkisa-ds/web` as the lead "tip" surface.

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (Table, TableMobileList, Alert), Tailwind v4 semantic tokens.

**Source review:** `docs/reviews/docs-app-review.md` § `/components/tabs`

---

## Phase 1 — Tabs page fixes

### Task 1: Migrate the 4 API tables to DS Table + TableMobileList (Finding #1)

**Files:**
- Modify: `apps/docs/app/components/tabs/page.tsx` (4 raw `<table>` blocks: Tabs root ~L422, TabsList ~L466, TabsTrigger ~L510, TabsContent ~L554)

**Step 1: Reference the divider migration pattern**

Read `apps/docs/app/components/divider/page.tsx` to see the canonical `Table` (hidden md:block) + `TableMobileList` (block md:hidden) pair shape and how rows/columns are passed.

**Step 2: Add imports**

In `apps/docs/app/components/tabs/page.tsx` line 1, add `Table` and `TableMobileList` to the `@umichkisa-ds/web` import.

**Step 3: Replace each of the 4 raw tables**

For each sub-component (Tabs, TabsList, TabsTrigger, TabsContent), replace its `<div className="my-6 overflow-x-auto"><table>...</table></div>` block with the desktop+mobile pair (matching divider's pattern). Preserve every existing prop name, type, default, and description string verbatim — this is a presentation migration, not a content rewrite.

**Step 4: Visual check**

Open `https://vnw20xbg-3000.asse.devtunnels.ms/components/tabs` at desktop (1280) and mobile (375). Verify each of the 4 API sections renders the desktop Table at md+ and the TableMobileList at sub-md, with no raw `<table>` left.

**Step 5: DS review**

Invoke the `ds-review` agent on `apps/docs/app/components/tabs/page.tsx`. Resolve any flags before continuing.

**Step 6: Commit**

```bash
git add apps/docs/app/components/tabs/page.tsx
git commit -m "docs(tabs): migrate API Reference to DS Table + TableMobileList"
```

---

### Task 2: Remove duplicate keyboard-nav sentence (Finding #2)

**Files:**
- Modify: `apps/docs/app/components/tabs/page.tsx` (Disabled example deck, ~L350)

**Step 1: Edit**

In the Disabled example description paragraph, remove the trailing sentence "Disabled triggers are skipped during keyboard navigation." Leave the rest of the paragraph intact (the API row keeps the canonical statement).

**Step 2: Commit**

```bash
git add apps/docs/app/components/tabs/page.tsx
git commit -m "docs(tabs): drop duplicated keyboard-nav sentence from disabled deck"
```

---

### Task 3: Promote Accessibility heading to top-level h2 (Finding #3)

**Files:**
- Modify: `apps/docs/app/components/tabs/page.tsx` (Accessibility section ~L398, currently inside Examples)

**Step 1: Move + retag**

Cut the entire Accessibility block (heading + paragraph) out of the Examples section. Re-insert it **after** the API Reference section (after the closing of the TabsContent table block, before `</Container>`). Change the heading from `h3 type-h3 mt-8 mb-2` to `h2 type-h2 mt-8 mb-4`. Match the structure used in `apps/docs/app/components/alert/page.tsx`'s Accessibility section.

**Step 2: Visual check**

Reload the page; verify Accessibility appears as a top-level section between API Reference and the page bottom, with h2 styling.

**Step 3: DS review**

Invoke `ds-review` on the file.

**Step 4: Commit**

```bash
git add apps/docs/app/components/tabs/page.tsx
git commit -m "docs(tabs): promote Accessibility to top-level h2 section"
```

---

### Task 4: Convert deck paragraph to Alert + drop duplicated children sentence (Finding #4)

**Files:**
- Modify: `apps/docs/app/components/tabs/page.tsx` (lead deck ~L190)

**Step 1: Add Alert import**

Add `Alert` to the `@umichkisa-ds/web` import line.

**Step 2: Replace the deck paragraph**

Delete the entire `<p className="type-body-sm mb-8 text-muted-foreground max-w-prose">...</p>` block. Replace it with:

```tsx
<Alert variant="info" className="mb-8">
  Use underline tabs for page-level navigation and pill tabs for in-context switching. Tabs are horizontal only.
</Alert>
```

(The "TabsTrigger accepts any children..." sentence is intentionally dropped — it duplicates the TabsTrigger `children` API row.)

**Step 3: Verify Alert API**

If `Alert` does not accept `variant="info"`, check `packages/web/src/components/alert.tsx` for the actual variant names and use the closest "info / tip / neutral" variant. Do NOT invent props.

**Step 4: Visual check**

Reload; verify the Alert renders correctly under the lead paragraph with `mb-8` spacing.

**Step 5: DS review**

Invoke `ds-review`.

**Step 6: Commit**

```bash
git add apps/docs/app/components/tabs/page.tsx
git commit -m "docs(tabs): convert deck paragraph to Alert; drop duplicated children sentence"
```

---

### Task 5: Remove redundant h1 utilities (Finding #5)

**Files:**
- Modify: `apps/docs/app/components/tabs/page.tsx` (h1 ~L185)

**Step 1: Edit**

Change:
```tsx
<h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Tabs</h1>
```
to:
```tsx
<h1 className="type-h1 mb-4 text-foreground">Tabs</h1>
```

(`type-h1` already encodes `font-sejong-bold` and `tracking-tight` — verified in `packages/web/src/styles/index.css:169`.)

**Step 2: Visual check**

Reload; verify the h1 still renders as Sejong Bold with tight tracking and the same size.

**Step 3: Commit**

```bash
git add apps/docs/app/components/tabs/page.tsx
git commit -m "docs(tabs): drop redundant font-sejong-bold tracking-tight from h1"
```

---

## Phase 2 — Bonus: alert page deck→Alert (matches Tabs Finding #4)

### Task 6: Convert /components/alert deck paragraph to Alert

**Files:**
- Modify: `apps/docs/app/components/alert/page.tsx` (deck ~L132)

**Step 1: Read the deck**

Open the file and read the current `type-body-sm mb-8 text-muted-foreground max-w-prose` paragraph. Decide which sentences are "tip-like guidance" vs "lead context". Only the tip-like guidance moves into the Alert. Pure restatement of the lead description should be deleted.

**Step 2: Replace**

Replace the deck `<p>` with `<Alert variant="info" className="mb-8">...</Alert>`. Add the import if missing. Skip if the deck content is purely descriptive and an Alert would feel forced — if so, leave it and document the skip in the commit message.

**Step 3: Visual check + DS review**

Reload `/components/alert`. Invoke `ds-review`.

**Step 4: Commit**

```bash
git add apps/docs/app/components/alert/page.tsx
git commit -m "docs(alert): convert deck paragraph to Alert (matches tabs pattern)"
```

---

## Phase 3 — Bonus sweep: redundant h1 utilities across all component pages

### Task 7: Remove `font-sejong-bold tracking-tight` from every component page h1

**Files:** All 31 files matched by:
```
apps/docs/app/components/**/page.tsx
```

**Step 1: Verify the canonical pattern**

Confirm that every match looks like:
```tsx
<h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">...
```
Run a Grep for `type-h1 font-sejong-bold tracking-tight` to confirm uniformity. If any file diverges, list it and stop for human input — DO NOT mass-replace divergent forms.

**Step 2: Mechanical replace_all**

For each of the 31 files, perform an Edit with:
- old: `type-h1 font-sejong-bold tracking-tight mb-4 text-foreground`
- new: `type-h1 mb-4 text-foreground`

(Skip `apps/docs/app/components/tabs/page.tsx` — already done in Task 5. Skip `apps/docs/app/components/alert/page.tsx` if Task 6 already touched it.)

**Step 3: Build + typecheck**

```bash
pnpm build && pnpm typecheck
```
Both must pass.

**Step 4: Visual spot-check**

Open 3 random component pages in the browser at desktop width. Confirm each h1 still renders Sejong Bold with tight tracking.

**Step 5: Commit**

```bash
git add apps/docs/app/components/
git commit -m "docs(components): drop redundant font-sejong-bold tracking-tight from all h1s

type-h1 already encodes both. Sweep across all 31 component pages."
```

---

## Phase 4 — Wrap-up

### Task 8: Update CODEBASE.md and TODO.md

**Files:**
- Modify: `docs/CODEBASE.md` (if it tracks per-page review status)
- Modify: `docs/TODO.md` (check off `Fix /components/tabs`)

**Step 1: Final build/typecheck gate**

```bash
pnpm build && pnpm typecheck
```

**Step 2: Check off TODO**

In `docs/TODO.md`, change `- [ ] Fix /components/tabs` → `- [x] Fix /components/tabs — plan: docs/plans/review-fix-components-tabs.md`.

**Step 3: Commit**

```bash
git add docs/TODO.md docs/CODEBASE.md
git commit -m "docs(todo): check off /components/tabs review-fix"
```

**Step 4: Present diff for merge confirmation**

Per `docs/CLAUDE.md`, do NOT auto-merge the worktree branch. Show the user the cumulative diff/log and ask for go-ahead.

---

## Notes

- **Memory rule (`feedback_api_table_mobile_list`):** every API table migration ships BOTH `Table` (hidden md:block) AND `TableMobileList` (block md:hidden). Do not skip the mobile list.
- **Memory rule (`feedback_review_table_inlinecode`):** Table migration is in scope; raw inline `<code>` → `<InlineCode>` migration is NOT in scope (deferred to global sweep TODO).
- **Memory rule (`feedback_no_auto_merge`):** worktree branches do not auto-merge; always confirm with user.
- **Memory rule (`feedback_skip_build_for_small_docs`):** Tasks 2 and 5 are surgical single-line edits — `pnpm build` is not required between them, only at the Phase 4 gate. Phase 1 Task 1 (table migration) is structural enough that a build at the end of Phase 1 is recommended.
