# Tabs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a compound Tabs component (Tabs, TabsList, TabsTrigger, TabsContent) from scratch with underline/pill variants, sm/md sizes, full keyboard accessibility, and a docs page.

**Architecture:** Compound components sharing state via React Context. No Radix dependency — built from scratch with manual ARIA roles. CVA on TabsTrigger (variant × size matrix). TabsList owns variant/size/fullWidth props and passes them down via context.

**Tech Stack:** React, CVA, Tailwind v4 tokens, cn() utility

---

## Phase 1: Component Implementation

### Task 1: Create Tabs context and root component

**Files:**
- Create: `packages/web/src/components/navigation/Tabs.tsx`

**What to build:**

`TabsContext` — React context holding:
- `value: string` (active tab)
- `onValueChange: (value: string) => void`
- `variant: "underline" | "pill"` (default: `"underline"`)
- `size: "sm" | "md"` (default: `"md"`)

`Tabs` component — root wrapper:
- Props: `value?: string`, `defaultValue?: string`, `onValueChange?: (value: string) => void`, `className?: string`, `children: React.ReactNode`
- Manages controlled/uncontrolled state pattern (internal `useState` when `value` is not provided)
- Auto-selects first registered tab if no `value`/`defaultValue`
- Renders `<div>` with `className`
- Provides context

Registration mechanism: `registerTab(value: string)` / `unregisterTab(value: string)` stored in a `useRef<Set<string>>` to track tab values for auto-selection and keyboard navigation order.

### Task 2: Create TabsList

**Files:**
- Modify: `packages/web/src/components/navigation/Tabs.tsx`

**What to build:**

`TabsList` component:
- Props: `variant?: "underline" | "pill"` (default: `"underline"`), `size?: "sm" | "md"` (default: `"md"`), `fullWidth?: boolean`, `className?: string`, `children: React.ReactNode`
- Renders `<div role="tablist">` with `aria-orientation="horizontal"`
- Passes `variant`, `size` into context so triggers can read them
- Styling: `flex items-center` base, `overflow-x-auto` with hidden scrollbar for overflow
- Underline variant: `border-b border-border` on the list
- Pill variant: `bg-surface-subtle rounded-lg p-1` container
- `fullWidth`: children get `flex-1`
- Hidden scrollbar: `scrollbar-width: none` + webkit scrollbar hide

### Task 3: Create TabsTrigger with CVA

**Files:**
- Modify: `packages/web/src/components/navigation/Tabs.tsx`

**What to build:**

`tabsTriggerVariants` — CVA definition:
- Base: `inline-flex items-center justify-center cursor-pointer whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]`
- Variant × size matrix:
  - underline/sm: `type-body-sm px-3 py-1.5 text-muted-foreground hover:text-foreground border-b-2 border-transparent -mb-px data-[state=active]:border-brand-primary data-[state=active]:text-foreground`
  - underline/md: `type-body-sm px-4 py-2 text-muted-foreground hover:text-foreground border-b-2 border-transparent -mb-px data-[state=active]:border-brand-primary data-[state=active]:text-foreground`
  - pill/sm: `type-body-sm px-3 py-1 rounded-md text-muted-foreground hover:text-foreground data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-sm`
  - pill/md: `type-body-sm px-4 py-1.5 rounded-md text-muted-foreground hover:text-foreground data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-sm`
- Defaults: `variant: "underline"`, `size: "md"`

`TabsTrigger` component:
- Props: `value: string`, `disabled?: boolean`, `className?: string`, `children: React.ReactNode`
- Renders `<button role="tab">` with:
  - `aria-selected={isActive}`, `aria-controls={panelId}`, `tabIndex={isActive ? 0 : -1}`
  - `data-state={isActive ? "active" : "inactive"}`
  - `id` derived from value for `aria-labelledby` on panel
  - `disabled` → `aria-disabled="true"`, `data-disabled`, `text-disabled-foreground pointer-events-none`
- Keyboard: `onKeyDown` handler for ArrowLeft/ArrowRight (wraps around, skips disabled, automatic activation)
- Registers itself on mount, unregisters on unmount
- ID convention: `tab-{value}` for trigger, `tabpanel-{value}` for panel

### Task 4: Create TabsContent

**Files:**
- Modify: `packages/web/src/components/navigation/Tabs.tsx`

**What to build:**

`TabsContent` component:
- Props: `value: string`, `className?: string`, `children: React.ReactNode`
- Only renders when `value` matches context's active value (unmount strategy)
- Renders `<div role="tabpanel">` with:
  - `aria-labelledby={triggerId}`, `id={panelId}`, `tabIndex={0}`
- Styling: `mt-4` default top margin (component tier spacing), merged with `className`

### Task 5: Barrel exports and package entry

**Files:**
- Create: `packages/web/src/components/navigation/index.ts`
- Modify: `packages/web/src/index.ts`

**What to build:**

`navigation/index.ts`:
```ts
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsTriggerVariants } from "./Tabs"
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "./Tabs"
```

`index.ts` — add line:
```ts
export * from "./components/navigation"
```

### Task 6: Commit Phase 1

```bash
git add packages/web/src/components/navigation/
git add packages/web/src/index.ts
git commit -m "feat(tabs): add Tabs compound component with underline/pill variants"
```

---

## Phase 2: Docs Page + Sidebar

### Task 7: Create docs page

**Files:**
- Create: `apps/docs/app/components/tabs/page.tsx`

**What to build:**

`'use client'` page with sections:

1. **Header** — "Tabs" title (`type-h1`), description explaining the component's purpose
2. **Basic example** — underline tabs with 3 panels
3. **Pill variant** — same content with `variant="pill"`
4. **Size comparison** — sm vs md side by side
5. **Full-width** — `fullWidth` prop demo
6. **Disabled tab** — one trigger disabled
7. **Controlled** — `value` + `onChange` with visible state
8. **Accessibility** — short note on keyboard nav and ARIA
9. **API Reference** — tables for Tabs, TabsList, TabsTrigger, TabsContent props

Each example wrapped in `<ComponentPreview code={...}>`. Import from `@umichkisa-ds/web`. Use `Container` wrapper.

### Task 8: Update sidebar

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

**What to build:**

Add "Navigation" category to `COMPONENT_ITEMS` (after "Overlays" per the sidebar order table):

```ts
{
  label: 'Navigation',
  href: '/components/tabs',
  children: [
    { label: 'Tabs', href: '/components/tabs' },
  ],
},
```

### Task 9: Commit Phase 2

```bash
git add apps/docs/app/components/tabs/
git add apps/docs/components/Sidebar.tsx
git commit -m "docs(tabs): add Tabs docs page and sidebar navigation entry"
```
