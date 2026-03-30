# Select Component Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a native `<select>` form component with custom arrow styling, matching Input's patterns exactly.

**Architecture:** Native `<select>` with `appearance-none` + CSS background-image chevron. `cn()` only (no CVA — no variant dimensions). Mirrors Input's focus/disabled/invalid patterns.

**Tech Stack:** React, Tailwind CSS v4, cn() utility

---

## Phase 1: Component Implementation

### Task 1: Create Select component

**Files:**
- Create: `packages/web/src/components/form/Select.tsx`

**Step 1: Create the component file**

```tsx
import { cn } from "@/utils/cn";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

const chevronDown = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

function Select({ invalid = false, className, children, ...props }: SelectProps) {
  return (
    <select
      aria-invalid={invalid}
      className={cn(
        "w-full appearance-none rounded-md border border-border-strong bg-surface px-3 py-2 pr-8 type-body-sm text-foreground transition-colors",
        `bg-no-repeat bg-[length:16px_16px] bg-[position:right_0.5rem_center]`,
        "focus-visible:outline-none focus-visible:border-brand-primary",
        "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
        invalid && "border-error focus-visible:border-error",
        className
      )}
      style={{ backgroundImage: chevronDown }}
      {...props}
    >
      {children}
    </select>
  );
}

export { Select };
export type { SelectProps };
```

**Step 2: Export from form barrel**

Modify `packages/web/src/components/form/index.ts` — add:

```ts
export { Select } from "./Select";
export type { SelectProps } from "./Select";
```

**Step 3: Verify build**

Run: `pnpm typecheck`
Expected: PASS

---

## Phase 2: Docs Page

### Task 2: Create Select docs page

**Files:**
- Create: `apps/docs/app/components/select/page.tsx`

**Step 1: Create the docs page**

Follow Input's docs page pattern exactly. Page structure:

1. **Header** — "Select" title, description mentioning native `<select>`, `invalid` prop, composition with Label/FormItem
2. **Examples:**
   - **Default** — basic select with 3 options
   - **With placeholder** — disabled first option as placeholder
   - **With optgroup** — grouped options
   - **Invalid** — error border styling
   - **Disabled** — disabled state
3. **API Reference** — table with `invalid`, `className`, `children`, `...props`

Code string variables at top, then component rendering below — same pattern as Input page.

Imports: `Select`, `Label` from `@umichkisa-ds/web`, `ComponentPreview` from `@/components/ComponentPreview`.

### Task 3: Add Select to sidebar

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

**Step 1: Add to COMPONENT_ITEMS array**

Add `{ label: 'Select', href: '/components/select' }` in alphabetical order (after `Label`, before existing entries that come after S).

**Step 2: Verify build**

Run: `pnpm typecheck && pnpm build`
Expected: Both PASS
