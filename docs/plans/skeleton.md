# Skeleton — Implementation Plan

## Grill-me Decisions

- Element: `<div>`, no polymorphism
- Variants: `rectangular` (default, `rounded-md`) / `circular` (`rounded-full`)
- Props: `variant`, `className`, plus `HTMLDivAttributes`
- Styling: `cn()` only (no CVA — single dimension)
- Animation: Tailwind `animate-pulse`
- Color: `bg-surface-muted`
- Default: `w-full` so it fills container without explicit width
- Category: `feedback/`
- Docs: header, examples (basic + realistic composition), API reference

---

## Phase 1: Component Implementation

### Task 1.1 — Create Skeleton component

**File:** `packages/web/src/components/feedback/Skeleton.tsx`

- `SkeletonProps` = `React.ComponentPropsWithoutRef<"div">` + `{ variant?: "rectangular" | "circular" }`
- Base classes: `animate-pulse bg-surface-muted`
- `rectangular` (default): `rounded-md w-full`
- `circular`: `rounded-full` (no `w-full` — circles need explicit dimensions)
- Merge consumer `className` via `cn()`
- Export `Skeleton` and `SkeletonProps`

### Task 1.2 — Update barrel export

**File:** `packages/web/src/components/feedback/index.ts`

- Add `export { Skeleton, type SkeletonProps } from "./Skeleton"`

### Task 1.3 — Verify root barrel

**File:** `packages/web/src/index.ts`

- Confirm `feedback` category is already exported (it should be — LoadingSpinner exists)

---

## Phase 2: Docs Page

### Task 2.1 — Create docs page

**File:** `apps/docs/app/components/skeleton/page.tsx`

Sections:
1. **Header** — Skeleton name, description, purpose (placeholder for loading content)
2. **Examples:**
   - Default (rectangular, full width)
   - Circular (avatar placeholder)
   - Text block (stacked lines of varying width)
   - Card composition (realistic: avatar + text lines, mimicking a card loading state)
3. **API Reference** — HTML table: variant, className

### Task 2.2 — Update Sidebar

**File:** `apps/docs/components/Sidebar.tsx`

- Add Skeleton to `COMPONENT_ITEMS` under the Feedback category
- If Feedback category doesn't exist in sidebar yet, add it
