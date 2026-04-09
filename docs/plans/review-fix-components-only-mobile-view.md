# Fix `/components/only-mobile-view` Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply 4 review findings to the `/components/only-mobile-view` docs page — migrate the raw API `<table>` to DS `Table` + `TableMobileList`, replace the muted intro sub-paragraph with a DS `Alert`, tighten Basic example prose, and restructure both `ComponentPreview` bodies as side-by-side static Mobile/Desktop panels.

**Architecture:** Single file surgical edit to `apps/docs/app/components/only-mobile-view/page.tsx`. No new files, no demo helpers required (panels remain inline in the page). Import additions only from `@umichkisa-ds/web`.

**Tech Stack:** Next.js 15 App Router, TSX, `@umichkisa-ds/web` (Alert, Table, TableMobileList, etc.), Tailwind v4 semantic tokens.

**Reference:** `docs/reviews/docs-app-review.md` § `/components/only-mobile-view` for the 4 findings. `docs/DS_CONSTRAINTS.md` for token/pattern rules. Mirror Table migration style used in `apps/docs/app/components/pagination/page.tsx:1-12,150-232`.

**DS gate:** This task modifies `.tsx`. After each phase, run a DS constraint check before committing (ds-review agent or manual reread of `DS_CONSTRAINTS.md`).

---

## Phase 1: Imports + Intro Alert (Finding #2)

### Task 1.1 — Extend imports

**Files:**
- Modify: `apps/docs/app/components/only-mobile-view/page.tsx:1`

**Step 1:** Replace the single-line import with:

```tsx
import {
  Alert,
  Container,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from '@umichkisa-ds/web'
```

**Step 2:** Typecheck compiles (imports all exist — confirmed via `apps/docs/app/components/pagination/page.tsx`).

### Task 1.2 — Replace muted intro sub-paragraph with Alert

**Files:**
- Modify: `apps/docs/app/components/only-mobile-view/page.tsx:38-43`

**Step 1:** Delete the existing `<p className="type-body-sm mb-8 ...">` sub-paragraph entirely.

**Step 2:** In its place, insert:

```tsx
<Alert variant="info" className="mb-8 max-w-prose">
  Place <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">OnlyMobileView</code> as the outermost wrapper of your page. At <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">≥768px</code>, children are hidden and a fixed overlay covers the viewport, including navigation.
</Alert>
```

**Step 3:** Verify primary intro paragraph at lines 34–37 is unchanged.

---

## Phase 2: Preview Restructure (Findings #3, #4)

Both previews are restructured to always-visible side-by-side static panels labeled "Mobile (<768px)" and "Desktop (≥768px)". Layout: stack on mobile (`grid-cols-1`), side-by-side on `md:` (`md:grid-cols-2`). Each panel is a `div` with border + label header + static content representing that state.

### Task 2.1 — Rewrite Basic example body + prose

**Files:**
- Modify: `apps/docs/app/components/only-mobile-view/page.tsx:48-76`

**Step 1:** Replace the prose paragraph (lines 50–55) with the tightened version:

```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  Wrap page content in <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">OnlyMobileView</code>. Below 768px the children render; at or above 768px the overlay replaces them.
</p>
<p className="type-body-sm mb-4 text-muted-foreground max-w-prose">
  The panels below are illustrative — the real component covers the full viewport, so both states are shown side by side here.
</p>
```

**Step 2:** Replace the `ComponentPreview` body (the inner `<div className="w-full">…</div>`) with:

```tsx
<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Mobile (<768px) panel */}
  <div className="flex flex-col">
    <span className="type-caption text-muted-foreground mb-2">Mobile (&lt;768px)</span>
    <div className="relative h-48 border border-border rounded-md overflow-hidden bg-surface">
      <div className="p-4">
        <p className="type-h3 text-foreground">Mobile App</p>
        <p className="type-body text-foreground">This content is only visible on mobile screens.</p>
      </div>
    </div>
  </div>
  {/* Desktop (≥768px) panel */}
  <div className="flex flex-col">
    <span className="type-caption text-muted-foreground mb-2">Desktop (≥768px)</span>
    <div className="relative h-48 border border-border rounded-md overflow-hidden bg-surface flex flex-col items-center justify-center gap-4">
      <div className="text-brand-primary">
        <Icon name="smartphone" size="xl" />
      </div>
      <p className="type-h3 text-brand-primary text-center px-4">
        Only Mobile View is supported.
      </p>
    </div>
  </div>
</div>
```

**Step 3:** Confirm no `hidden md:flex` overlay tricks remain in this example.

### Task 2.2 — Rewrite Custom message example body

**Files:**
- Modify: `apps/docs/app/components/only-mobile-view/page.tsx:85-103`

**Step 1:** Replace the `ComponentPreview` body with the same two-panel structure, overriding only the overlay text:

```tsx
<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="flex flex-col">
    <span className="type-caption text-muted-foreground mb-2">Mobile (&lt;768px)</span>
    <div className="relative h-48 border border-border rounded-md overflow-hidden bg-surface">
      <div className="p-4">
        <p className="type-h3 text-foreground">Mobile App</p>
        <p className="type-body text-foreground">This content is only visible on mobile screens.</p>
      </div>
    </div>
  </div>
  <div className="flex flex-col">
    <span className="type-caption text-muted-foreground mb-2">Desktop (≥768px)</span>
    <div className="relative h-48 border border-border rounded-md overflow-hidden bg-surface flex flex-col items-center justify-center gap-4">
      <div className="text-brand-primary">
        <Icon name="smartphone" size="xl" />
      </div>
      <p className="type-h3 text-brand-primary text-center px-4">
        Please use a mobile device to access this page.
      </p>
    </div>
  </div>
</div>
```

**Step 2:** Leave the "Custom message" prose paragraph above it unchanged (already concise).

---

## Phase 3: API Table Migration (Finding #1)

### Task 3.1 — Replace raw `<table>` with `Table` + `TableMobileList`

**Files:**
- Modify: `apps/docs/app/components/only-mobile-view/page.tsx:106-138`

**Step 1:** Delete the entire `<div className="my-6 overflow-x-auto">…</div>` block containing the raw `<table>`.

**Step 2:** In its place, insert the DS dual-view pattern (modeled after `pagination/page.tsx:150-233`):

```tsx
<div className="my-6">
  <div className="hidden md:block">
    <Table>
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
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Content rendered on mobile screens (below 768px).</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">message</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;Only Mobile View is supported.&quot;</code></TableCell>
          <TableCell>Text displayed on the desktop overlay.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Additional Tailwind classes applied to the outer wrapper div.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div className="block md:hidden">
    <TableMobileList>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>children</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
        <span className="type-caption text-muted-foreground">Content rendered on mobile screens (below 768px).</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>message</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;Only Mobile View is supported.&quot;</code>. Text displayed on the desktop overlay.</span>
      </TableMobileItem>
      <TableMobileItem>
        <span className="type-body-sm text-foreground"><strong>className</strong></span>
        <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
        <span className="type-caption text-muted-foreground">Additional Tailwind classes applied to the outer wrapper div.</span>
      </TableMobileItem>
    </TableMobileList>
  </div>
</div>
```

---

## Phase 4: Verification

### Task 4.1 — Typecheck + build

**Step 1:** Run `pnpm typecheck` from repo root.
Expected: no errors.

**Step 2:** Run `pnpm build` from repo root.
Expected: success.

### Task 4.2 — Browser verification

**Step 1:** Open `https://vnw20xbg-3000.asse.devtunnels.ms/components/only-mobile-view` at 1280px.
Verify:
- Intro Alert renders with info variant.
- Both examples show side-by-side Mobile/Desktop panels with labels.
- API table renders as DS Table (header in `bg-surface-subtle`).

**Step 2:** Resize to 375px.
Verify:
- Mobile/Desktop panels stack vertically.
- API table renders as `TableMobileList` stacked items, not overflowing horizontally.

### Task 4.3 — Commit + TODO update

**Step 1:** Commit:

```bash
git add apps/docs/app/components/only-mobile-view/page.tsx
git commit -m "fix(docs/only-mobile-view): migrate API table, intro Alert, restructure previews"
```

**Step 2:** In `docs/TODO.md`, check off `- [ ] Fix /components/only-mobile-view` in Batch 16.

**Step 3:** Update `docs/CODEBASE.md` if a status table references this page.

---

## Mapping to review findings

| Finding | Phase / Task |
|---------|--------------|
| #1 Raw `<table>` → DS Table + TableMobileList | Phase 3 / Task 3.1 |
| #2 Intro sub-paragraph → Alert | Phase 1 / Task 1.2 |
| #3 Basic prose too wordy | Phase 2 / Task 2.1 (Step 1) |
| #4 Preview simulation misleading → side-by-side panels | Phase 2 / Tasks 2.1–2.2 |
