# Switch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a new Switch toggle component for the KISA design system with default and sm size variants.

**Architecture:** Native `<input type="checkbox" role="switch">` with peer-styled visual track + thumb overlay, following the same hidden-input pattern as Checkbox. Two sizes (default, sm) via `cn()` conditional — no CVA needed.

**Tech Stack:** React, Tailwind CSS v4, `cn()` utility

---

## Phase 1: Component Implementation

### Task 1: Create Switch component

**Files:**
- Create: `packages/web/src/components/form/Switch.tsx`

```tsx
import { cn } from "@/utils/cn";

type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "role"
> & {
  invalid?: boolean;
  size?: "default" | "sm";
};

function Switch({
  invalid = false,
  size = "default",
  className,
  ...props
}: SwitchProps) {
  const isSmall = size === "sm";

  return (
    <span
      className={cn(
        "relative inline-flex items-center",
        isSmall ? "h-4 w-7" : "h-6 w-10",
        className
      )}
    >
      <input
        type="checkbox"
        role="switch"
        aria-invalid={invalid}
        className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default"
        {...props}
      />
      {/* Track */}
      <span
        className={cn(
          "absolute inset-0 rounded-full border transition-colors",
          "border-border-strong bg-surface-subtle",
          "peer-checked:bg-foreground peer-checked:border-foreground",
          "peer-focus-visible:outline-none peer-focus-visible:border-brand-primary",
          "peer-disabled:pointer-events-none peer-disabled:bg-surface-subtle peer-disabled:border-border",
          "peer-disabled:peer-checked:bg-disabled-foreground peer-disabled:peer-checked:border-disabled-foreground",
          invalid && "border-error peer-focus-visible:border-error"
        )}
      />
      {/* Thumb */}
      <span
        className={cn(
          "pointer-events-none absolute rounded-full bg-foreground transition-all duration-200",
          "peer-checked:bg-surface",
          "peer-disabled:bg-disabled-foreground",
          "peer-disabled:peer-checked:bg-surface",
          isSmall
            ? "left-0.5 size-2.5 peer-checked:left-[calc(100%-0.125rem-0.625rem)] peer-checked:size-3"
            : "left-1 size-4 peer-checked:left-[calc(100%-0.25rem-1.25rem)] peer-checked:size-5"
        )}
      />
    </span>
  );
}

export { Switch };
export type { SwitchProps };
```

**Notes:**
- Track uses `rounded-full` for pill shape
- Thumb positioning: `left-*` for off state, `peer-checked:left-[calc(...)]` for on state
- Thumb grows on check: default 16→20px, sm 10→12px
- Touch target: the hidden input covers full track area via `absolute inset-0`; track is already 40px wide (default) which is close to 44px minimum. The `::after` technique can be added if needed post-review.

### Task 2: Export Switch from form barrel

**Files:**
- Modify: `packages/web/src/components/form/index.ts`

Add these two lines (alphabetical order, after Select exports):

```ts
export { Switch } from "./Switch";
export type { SwitchProps } from "./Switch";
```

---

## Phase 2: Docs Page + Sidebar

### Task 3: Create Switch docs page

**Files:**
- Create: `apps/docs/app/components/switch/page.tsx`

Follows the Checkbox docs page structure exactly:
1. **Header** — name, description, mention composing with `label` or `FormItem`
2. **Examples:**
   - Default (off)
   - Checked (on)
   - Sizes (default and sm side by side)
   - States (default, disabled off, disabled on, invalid)
   - With Label (native `<label>` wrapper)
   - With error message (`invalid` + `type-caption text-error`)
   - Controlled (live state feedback)
3. **API Reference** — table with `size`, `invalid`, `className`, `...props`

Use `ComponentPreview` for all examples. Page is `'use client'` (controlled example needs `useState`).

### Task 4: Add Switch to sidebar

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

Add to `COMPONENT_ITEMS` array (alphabetical, between Select and Textarea):

```ts
{ label: 'Switch', href: '/components/switch' },
```
