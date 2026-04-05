# Fix Plan: /foundation/typography/overview

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 2 review findings on the typography overview docs page — migrate raw table to DS Table component and remove redundant closing paragraph.

**Architecture:** Direct edits to one file (`apps/docs/app/foundation/typography/overview/page.tsx`). Import DS Table components, replace raw `<table>` markup, delete redundant paragraph.

**Tech Stack:** React, @umichkisa-ds/web (Table components), Tailwind CSS

**Reference:** Review findings at `docs/reviews/docs-app-review.md` § `/foundation/typography/overview`

**Constraints:** Read `docs/DS_CONSTRAINTS.md` before starting. Run `ds-review` agent after modifying `.tsx` files.

---

### Task 1: Migrate raw HTML table to DS Table component (Fix #1)

**Files:**
- Modify: `apps/docs/app/foundation/typography/overview/page.tsx`

**Context:** The colors/tokens page already uses the DS Table pattern. Reference: `apps/docs/app/foundation/colors/tokens/page.tsx` for import style.

**Step 1: Update imports**

Add DS Table components to the existing import:

```tsx
import { Container, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@umichkisa-ds/web'
```

**Step 2: Replace raw table markup**

Replace the entire `<div className="my-6 overflow-x-auto">...</div>` block (lines 29-56) with:

```tsx
<div className="my-6">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Font</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Where it appears</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>SejongHospital Bold</TableCell>
        <TableCell>Brand & Display</TableCell>
        <TableCell>Display, H1 only</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Pretendard</TableCell>
        <TableCell>Body, UI & Everything Else</TableCell>
        <TableCell>H2 and below, all body text</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Geist Mono</TableCell>
        <TableCell>Code</TableCell>
        <TableCell>This documentation site only</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

**Step 3: Verify build**

Run: `pnpm build`
Expected: PASS

### Task 2: Remove redundant closing paragraph (Fix #2)

**Files:**
- Modify: `apps/docs/app/foundation/typography/overview/page.tsx`

**Step 1: Delete the closing paragraph**

Remove the `<p>` block after the table (lines 58-62 in original):

```tsx
// DELETE THIS ENTIRE BLOCK:
<p className="type-body mb-4 text-foreground max-w-prose">
  SejongHospital is the identity font — it appears only where KISA&#39;s brand presence
  matters most. Pretendard carries the rest of the interface. Geist Mono sits outside the
  Rule of Two entirely; it is a documentation tool, not a product font.
</p>
```

**Step 2: Verify build**

Run: `pnpm build && pnpm typecheck`
Expected: Both PASS

### Task 3: Commit

```bash
git add apps/docs/app/foundation/typography/overview/page.tsx
git commit -m "fix(docs): migrate raw table to DS Table and remove redundant paragraph on typography/overview"
```
