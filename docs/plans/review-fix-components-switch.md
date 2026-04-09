# /components/switch — Review Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Also required: ds-constrained-execution (every `.tsx` change passes DS constraint review).

**Goal:** Apply 2 findings from the `/components/switch` review — migrate the raw API `<table>` to the DS `Table` + `TableMobileList` pattern, and consolidate the intro by moving the "renders a native input" paragraph into the API Reference intro.

**Architecture:** Single-file edit to `apps/docs/app/components/switch/page.tsx`. Mirror the pattern already established by `/components/input` (see `docs/plans/review-fix-components-input.md` for precedent).

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (`Table`, `TableMobileList`), Tailwind v4, `type-*` tokens.

**Review findings:** `docs/reviews/docs-app-review.md` § `/components/switch`

---

## Phase 1 — Content & API Table Migration

### Task 1: Move "renders a native input" paragraph into API Reference intro (Fix #2)

**Files:**
- Modify: `apps/docs/app/components/switch/page.tsx`

**Step 1:** Delete the second intro paragraph (currently wrapping the `<input type="checkbox" role="switch">` code snippet). It sits between the lede paragraph and the `Examples` `<h2>`.

**Step 2:** In the API Reference intro paragraph ("Extends all native `<input>` attributes…"), prepend a sentence that captures the dropped information. Target copy:

> Switch renders a native `<input type="checkbox" role="switch">` internally for full form and accessibility support. Extends all native `<input>` attributes (except `type`, `role`, and `size`, which are set internally). Only custom props are listed below.

Keep the same inline `<code>` styling that the existing intro uses for `type`, `role`, `size`.

**Step 3:** Update the lede paragraph's trailing margin from `mb-4` to `mb-8` so spacing to the `Examples` h2 matches the established `mb-8 + mt-8` rhythm on other docs pages.

**Step 4:** Commit.

```
docs(switch): consolidate intro — move native input note into API Reference
```

---

### Task 2: Migrate API `<table>` to DS Table + TableMobileList (Fix #1)

**Files:**
- Modify: `apps/docs/app/components/switch/page.tsx`

**Step 1:** Add `Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem` (use whichever subcomponent names the DS exports — verify by checking `/components/input` source and `packages/web`) to the existing `@umichkisa-ds/web` import.

**Step 2:** Replace the raw `<div className="my-6 overflow-x-auto"><table>…</table></div>` block with two siblings, mirroring the Input page pattern exactly:

- Desktop: `<Table className="hidden md:table">` (or the `hidden md:block` wrapper form used by Input — match Input's exact pattern) containing the same 5 rows (`text`, `size`, `invalid`, `className`, `...props`).
- Mobile: `<TableMobileList className="block md:hidden">` with one `TableMobileItem` per row.

**Step 3:** Verify by reading `apps/docs/app/components/input/page.tsx` before writing — copy its structural shell, substitute Switch's prop rows. Do not invent API shape; match Input's usage 1:1.

**Step 4:** Preserve row content exactly:

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | Inline label text. Uses type-body-sm for default size, type-caption for sm. |
| `size` | `"default" \| "sm"` | `"default"` | Switch size. Use sm for dense layouts. |
| `invalid` | `boolean` | `false` | Applies error border and sets aria-invalid. |
| `className` | `string` | — | Merged via cn(). Use for layout utilities only. |
| `...props` | `InputHTMLAttributes` | — | All native input attributes except type and role. |

**Step 5:** Remove the now-unused `overflow-x-auto` wrapper.

**Step 6:** DS constraint pass — no raw `<table>`, semantic tokens only, no arbitrary spacing.

**Step 7:** Commit.

```
docs(switch): migrate API table to DS Table + TableMobileList
```

---

## Phase 2 — Verification

### Task 3: Visual + build check

**Step 1:** Open `https://vnw20xbg-3000.asse.devtunnels.ms/components/switch` at 1280px and 375px. Verify:
- Desktop: Table renders with 5 rows, no horizontal scroll, headers aligned.
- Mobile: TableMobileList renders stacked cards, no desktop table visible.
- Intro: single lede paragraph, no doubled gap before Examples h2.

**Step 2:** Per memory "skip build for small docs edits," build/typecheck are not required for this surgical docs edit unless Task 2 touches imports in a way typecheck would catch — in that case run `pnpm --filter @umichkisa-ds/docs typecheck`.

**Step 3:** If clean, done. Proceed to handoff (merge decision belongs to the user).
