# FormItem Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign FormItem as a presentation-only layout wrapper that composes Label + any form control + description/error text.

**Architecture:** Props-based wrapper (label, children, description, error). No internal validation. Renders Label internally, accepts any form control as children. Uses `cn()` only (no CVA). Replaces the current opaque Input-only FormItem.

**Tech Stack:** React, Tailwind CSS, `cn()` utility, existing Label component.

---

## Phase 1: Component Implementation

### Task 1: Rewrite FormItem component

**Files:**
- Rewrite: `packages/web/src/components/form/FormItem.tsx`

**Step 1: Write the new FormItem component**

Replace entire file with:

```tsx
import { cn } from "@/utils/cn";
import { Label } from "./Label";

export type FormItemProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormItem({
  htmlFor,
  label,
  required = false,
  error,
  description,
  className,
  children,
}: FormItemProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {description && !error && (
        <p
          id={`${htmlFor}-description`}
          className="type-caption text-muted-foreground"
        >
          {description}
        </p>
      )}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="type-caption text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
```

**Step 2: Verify typecheck passes**

Run: `pnpm typecheck`
Expected: PASS

### Task 2: Update barrel export

**Files:**
- Modify: `packages/web/src/components/form/index.ts`

**Step 1: Verify the export line already exists**

The current `index.ts` already exports `FormItem` and `FormItemProps`. No change needed unless the type export changed shape. Since we kept the same export names (`FormItem`, `FormItemProps`), this should just work.

Run: `pnpm typecheck`
Expected: PASS

---

## Phase 2: Docs Page

### Task 3: Create FormItem docs page

**Files:**
- Create: `apps/docs/app/components/form-item/page.tsx`

**Step 1: Create the docs page**

Follow the same pattern as `apps/docs/app/components/input/page.tsx`. Sections:

1. **Header** — FormItem name, description as layout wrapper for form fields
2. **Examples:**
   - **Basic** — FormItem with Label + Input
   - **With description** — helper text below input
   - **With error** — validation error shown
   - **Required** — asterisk on label
   - **With Textarea** — composability demo
   - **With Select** — composability demo
3. **API Reference** — table with htmlFor, label, required, error, description, className, children

Use `'use client'` directive. Import `FormItem`, `Input`, `Textarea`, `Select`, `SelectTrigger`, `SelectContent`, `SelectItem` from `@umichkisa-ds/web`. Import `ComponentPreview` from `@/components/ComponentPreview`.

### Task 4: Update sidebar

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

**Step 1: Add FormItem to COMPONENT_ITEMS**

Add `{ label: 'FormItem', href: '/components/form-item' }` in alphabetical order. Also update the existing `'Form'` entry — rename it to `'FormItem'` and update href to `/components/form-item`.

Actually: the existing `{ label: 'Form', ... }` entry should be **replaced** with `{ label: 'FormItem', ... }` since there's no standalone Form page.

### Task 5: Validate

Run: `pnpm typecheck && pnpm build`
Expected: Both PASS
