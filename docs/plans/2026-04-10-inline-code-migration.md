# InlineCode Migration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all raw `<code className="...">` inline code tags across docs pages with the existing `<InlineCode>` component.

**Architecture:** The `InlineCode` component already exists at `apps/docs/components/InlineCode.tsx`. This is a pure migration — no component changes needed. Each page gets an import added and its raw `<code>` tags replaced. Three className patterns are targeted; block-level decorative `<code>` tags (3 instances in colors/overview) are excluded.

**Tech Stack:** React/Next.js, existing `InlineCode` docs component

---

## Context

### Component (DO NOT MODIFY)

`apps/docs/components/InlineCode.tsx`:
```tsx
import type { ReactNode } from "react"

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle text-foreground">
      {children}
    </code>
  )
}
```

### Three raw patterns to replace

| Pattern | Count | Files |
|---------|-------|-------|
| `<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">` | 938 | 56 |
| `<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">` | 594 | 32 |
| `<code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">` | 360 | 36 |

Total: **1,892 instances** across **56 unique files** (+ 1 `_demos.tsx`).

### Exclusions

- **Block-level decorative `<code>`** in `apps/docs/app/foundation/colors/overview/page.tsx` — 3 instances with `className="mt-3 block type-caption font-mono ..."`. These are visual labels inside colored tier cards, NOT inline code. Skip them.

### Pages already importing InlineCode (4)

These pages already use `InlineCode` but may have remaining raw `<code>` tags mixed in. Include them in the sweep — just don't duplicate the import.

- `apps/docs/app/foundation/layout/usage/page.tsx`
- `apps/docs/app/foundation/layout/spacing/page.tsx`
- `apps/docs/app/foundation/colors/usage/page.tsx`
- `apps/docs/app/foundation/typography/usage/page.tsx`

---

## Execution Strategy

This is a mechanical find-and-replace. Use **parallel subagents** — each agent handles a group of files. Every agent performs the same transformation:

1. Add `import { InlineCode } from '@/components/InlineCode'` (skip if already present)
2. Replace all three `<code className="...">` patterns → `<InlineCode>`
3. Replace corresponding `</code>` → `</InlineCode>`
4. Preserve all children content exactly (including `{' '}`, `{'<Form>'}`, `&quot;`, `&#39;`, JSX expressions)

### Important: closing tag matching

Raw `<code>` tags and `</code>` closings are 1:1. But some files also have `<code>` inside `CodeBlock` or other non-inline contexts. Only replace `</code>` tags that correspond to the three targeted `<code className="rounded ...">` patterns. Do NOT blindly replace all `</code>` in a file.

---

## Task 1: Foundation pages (14 files)

**Files:**
- `apps/docs/app/foundation/colors/overview/page.tsx` (8 inline + 3 block-level SKIP)
- `apps/docs/app/foundation/colors/tokens/page.tsx` (113)
- `apps/docs/app/foundation/colors/primitives/page.tsx` (1)
- `apps/docs/app/foundation/colors/accessibility/page.tsx` (16)
- `apps/docs/app/foundation/colors/usage/page.tsx` (already imports InlineCode — check for remaining raw tags)
- `apps/docs/app/foundation/typography/overview/page.tsx` (0 — already uses InlineCode only, verify)
- `apps/docs/app/foundation/typography/scale/page.tsx` (79)
- `apps/docs/app/foundation/typography/fonts/page.tsx` (34)
- `apps/docs/app/foundation/typography/usage/page.tsx` (already imports InlineCode — check for remaining raw tags)
- `apps/docs/app/foundation/layout/overview/page.tsx` (10)
- `apps/docs/app/foundation/layout/breakpoints/page.tsx` (7)
- `apps/docs/app/foundation/layout/spacing/page.tsx` (already imports InlineCode — check for remaining raw tags)
- `apps/docs/app/foundation/layout/usage/page.tsx` (already imports InlineCode — check for remaining raw tags)
- `apps/docs/app/foundation/iconography/overview/page.tsx` (2)
- `apps/docs/app/foundation/iconography/sizes/page.tsx` (29)
- `apps/docs/app/foundation/iconography/library/page.tsx` (13)
- `apps/docs/app/foundation/iconography/usage/page.tsx` (24)
- `apps/docs/app/foundation/iconography/accessibility/page.tsx` (29)

**Special case:** `colors/overview/page.tsx` — replace only the 8 inline `<code>` tags. Leave the 3 block-level `<code className="mt-3 block type-caption font-mono ...">` untouched.

**Step 1:** For each file, read it, add `InlineCode` import, replace all three patterns, save.

**Step 2:** Verify no raw inline `<code className="rounded` remain in foundation pages:
```bash
grep -r 'code className="rounded' apps/docs/app/foundation/
```

**Step 3:** Commit:
```bash
git add apps/docs/app/foundation/
git commit -m "refactor(docs/foundation): migrate raw <code> to InlineCode component"
```

---

## Task 2: Component pages A–D (14 files)

**Files:**
- `apps/docs/app/components/accordion/page.tsx` (57)
- `apps/docs/app/components/alert/page.tsx` (23)
- `apps/docs/app/components/avatar/page.tsx` (26)
- `apps/docs/app/components/badge/page.tsx` (22)
- `apps/docs/app/components/button/page.tsx` (34)
- `apps/docs/app/components/calendar/page.tsx` (37)
- `apps/docs/app/components/card/page.tsx` (51)
- `apps/docs/app/components/checkbox/page.tsx` (22)
- `apps/docs/app/components/container/page.tsx` (36)
- `apps/docs/app/components/datepicker/page.tsx` (84)
- `apps/docs/app/components/dialog/page.tsx` (62)
- `apps/docs/app/components/divider/page.tsx` (11)
- `apps/docs/app/components/dropdown/page.tsx` (70)

**Step 1:** For each file, read it, add `InlineCode` import, replace all three patterns, save.

**Step 2:** Verify:
```bash
grep -r 'code className="rounded' apps/docs/app/components/{accordion,alert,avatar,badge,button,calendar,card,checkbox,container,datepicker,dialog,divider,dropdown}/
```

**Step 3:** Commit:
```bash
git add apps/docs/app/components/accordion/ apps/docs/app/components/alert/ apps/docs/app/components/avatar/ apps/docs/app/components/badge/ apps/docs/app/components/button/ apps/docs/app/components/calendar/ apps/docs/app/components/card/ apps/docs/app/components/checkbox/ apps/docs/app/components/container/ apps/docs/app/components/datepicker/ apps/docs/app/components/dialog/ apps/docs/app/components/divider/ apps/docs/app/components/dropdown/
git commit -m "refactor(docs/components): migrate raw <code> to InlineCode (A-D)"
```

---

## Task 3: Component pages F–P (13 files)

**Files:**
- `apps/docs/app/components/form-item/page.tsx` (49)
- `apps/docs/app/components/forms/page.tsx` (24)
- `apps/docs/app/components/grid/page.tsx` (24)
- `apps/docs/app/components/icon/page.tsx` (32)
- `apps/docs/app/components/icon-button/page.tsx` (44)
- `apps/docs/app/components/input/page.tsx` (25)
- `apps/docs/app/components/label/page.tsx` (26)
- `apps/docs/app/components/link-button/page.tsx` (45)
- `apps/docs/app/components/loading-spinner/page.tsx` (23)
- `apps/docs/app/components/only-mobile-view/page.tsx` (14)
- `apps/docs/app/components/pagination/page.tsx` (21)
- `apps/docs/app/components/popover/page.tsx` (38)

**Step 1–3:** Same pattern as Task 2.

**Commit:**
```bash
git commit -m "refactor(docs/components): migrate raw <code> to InlineCode (F-P)"
```

---

## Task 4: Component pages R–T + toast demos (13 files)

**Files:**
- `apps/docs/app/components/radio/page.tsx` (63)
- `apps/docs/app/components/select/page.tsx` (84)
- `apps/docs/app/components/skeleton/page.tsx` (18)
- `apps/docs/app/components/status-view/page.tsx` (40)
- `apps/docs/app/components/switch/page.tsx` (35)
- `apps/docs/app/components/table/page.tsx` (41)
- `apps/docs/app/components/tabs/page.tsx` (57)
- `apps/docs/app/components/textarea/page.tsx` (21)
- `apps/docs/app/components/toast/page.tsx` (81)
- `apps/docs/app/components/toast/_demos.tsx` (1)
- `apps/docs/app/components/toggle-group/page.tsx` (26)
- `apps/docs/app/components/tooltip/page.tsx` (18)

**Step 1–3:** Same pattern as Task 2.

**Commit:**
```bash
git commit -m "refactor(docs/components): migrate raw <code> to InlineCode (R-T)"
```

---

## Task 5: Forms pages (6 files)

**Files:**
- `apps/docs/app/forms/overview/page.tsx` (7)
- `apps/docs/app/forms/form-component/page.tsx` (59)
- `apps/docs/app/forms/use-form/page.tsx` (31)
- `apps/docs/app/forms/hooks/page.tsx` (37)
- `apps/docs/app/forms/validation/page.tsx` (6)
- `apps/docs/app/forms/examples/page.tsx` (2)

**Step 1–3:** Same pattern as Task 2.

**Commit:**
```bash
git commit -m "refactor(docs/forms): migrate raw <code> to InlineCode"
```

---

## Task 6: Final verification

**Step 1:** Verify zero remaining raw inline `<code className="rounded` (except the 3 block-level exclusions):
```bash
grep -rn 'code className="rounded' apps/docs/app/
```
Expected: only 3 results from `foundation/colors/overview/page.tsx` (the block-level ones).

**Step 2:** Build and typecheck:
```bash
pnpm build && pnpm typecheck
```
Expected: both pass.

**Step 3:** Update `docs/CODEBASE.md` — add `InlineCode` to the "Docs UI Components" list.

**Step 4:** Check off the TODO item in `docs/TODO.md`.

**Step 5:** Final commit:
```bash
git commit -m "chore(docs): complete InlineCode migration, update CODEBASE.md and TODO.md"
```
