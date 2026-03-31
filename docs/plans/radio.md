# Radio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a compound `RadioGroup` + `RadioItem` component using Radix UI primitives, with a docs page.

**Architecture:** Thin wrappers over `@radix-ui/react-radio-group`. `RadioGroup` wraps Root (flex container with orientation). `RadioItem` wraps Item + Indicator, rendering a label with circle indicator + children text. Follows the same Radix compound pattern as Select.

**Tech Stack:** React, Radix UI (`@radix-ui/react-radio-group`), Tailwind CSS, `cn()` utility.

---

## Phase 1: Component Implementation

### Task 1: Install Radix dependency

**Files:**
- Modify: `packages/web/package.json`

**Steps:**
1. Run: `pnpm --filter @umichkisa-ds/web add @radix-ui/react-radio-group`
2. Verify it appears in `packages/web/package.json` dependencies.

---

### Task 2: Create RadioGroup + RadioItem component

**Files:**
- Create: `packages/web/src/components/form/Radio.tsx`

**Decisions from grill-me:**
- Compound: `RadioGroup` (Root) + `RadioItem` (Item + Indicator + label)
- `RadioGroup` props: Radix Root passthrough + `invalid?: boolean` + `className?: string`
- `RadioItem` props: `value: string`, `children: React.ReactNode`, `disabled?: boolean`, `className?: string`
- Label built into `RadioItem` via `children` (Chakra pattern) — renders `<label>` wrapping circle + children
- Visual: Mirror Checkbox tokens — `size-5 rounded-full`, `border-border-strong`, checked = `bg-foreground border-foreground` with white inner dot
- Orientation: vertical default (`flex flex-col gap-2`), horizontal (`flex flex-row gap-4`)
- `invalid` on RadioGroup: `border-error` on each RadioItem circle via Radix data attributes or context

**Implementation notes:**
- Use `cn()` only (no CVA — no variant matrix)
- `RadioItem` renders: `<label className="flex items-center gap-2">` → circle span → children
- Inner dot: small white circle (`size-2.5 rounded-full bg-surface`) inside indicator, visible when checked
- Focus ring on the Radix Item (the circle), not the label
- Disabled styling: `bg-surface-subtle border-border`, disabled+checked: `bg-disabled-foreground border-disabled-foreground`
- `invalid` prop on `RadioGroup` needs to propagate to items — use `data-invalid` attribute on Root and style items with group/data selector, or pass via React context. Simplest: set `data-invalid` on the Root wrapper and use Tailwind `group` / `group-data-[invalid]:` on items.

---

### Task 3: Export from barrel files

**Files:**
- Modify: `packages/web/src/components/form/index.ts`

**Steps:**
1. Add exports for `RadioGroup`, `RadioItem`, `RadioGroupProps`, `RadioItemProps`.

No changes needed to `packages/web/src/index.ts` — it already re-exports `form/`.

---

## Phase 2: Docs Page

### Task 4: Create Radio docs page

**Files:**
- Create: `apps/docs/app/components/radio/page.tsx`

**Sections:**
1. **Header** — "Radio" title, description: compound RadioGroup + RadioItem for single-selection from a set of options
2. **Examples:**
   - Basic (vertical group, 3 options)
   - Horizontal orientation
   - Default value (uncontrolled)
   - Disabled group
   - Disabled individual item
   - Invalid/error state with error message
3. **API Reference** — two tables: `RadioGroup` props, `RadioItem` props

**Pattern:** Follow `apps/docs/app/components/checkbox/page.tsx` structure exactly — same heading hierarchy, same `ComponentPreview` usage, same table styling.

---

### Task 5: Add Radio to sidebar

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

**Steps:**
1. Add `{ label: 'Radio', href: '/components/radio' }` to `COMPONENT_ITEMS` array (alphabetical order, between Label and Select).
