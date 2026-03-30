# Textarea Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a styled Textarea primitive to the DS, mirroring Input's pattern, plus a docs page.

**Architecture:** Thin wrapper around native `<textarea>` with `cn()` styling (no CVA — no variant matrix). Extends `TextareaHTMLAttributes`, adds `invalid` prop. Styling matches Input exactly.

**Tech Stack:** React, Tailwind v4, `cn()` utility.

---

## Phase 1: Component Implementation

### Task 1: Create Textarea component

**Files:**
- Create: `packages/web/src/components/form/Textarea.tsx`

**Step 1: Create the component file**

```tsx
import { cn } from "@/utils/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

function Textarea({ invalid = false, className, rows = 3, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid}
      className={cn(
        "w-full resize-y rounded-md border border-border-strong bg-surface px-3 py-2 type-body-sm text-foreground placeholder:text-muted-foreground transition-colors",
        "focus-visible:outline-none focus-visible:border-brand-primary",
        "disabled:pointer-events-none disabled:text-disabled-foreground disabled:bg-surface-subtle",
        invalid && "border-error focus-visible:border-error",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
export type { TextareaProps };
```

### Task 2: Add barrel export

**Files:**
- Modify: `packages/web/src/components/form/index.ts`

**Step 1: Add Textarea export lines**

Append after the FormItem exports:

```ts
export { Textarea } from "./Textarea";
export type { TextareaProps } from "./Textarea";
```

---

## Phase 2: Docs Page + Sidebar

### Task 3: Create docs page

**Files:**
- Create: `apps/docs/app/components/textarea/page.tsx`

**Step 1: Create the page**

Follow the Input docs page pattern exactly. Sections:

1. **Header** — "Textarea" title, description: multi-line text field, extends native `<textarea>`, `invalid` prop, composes with Label.
2. **Examples:**
   - Default — basic textarea with placeholder
   - States — default, disabled, invalid
   - With Label — composition with Label using `gap-2`
   - With error message — `invalid` + `type-caption text-error` message
   - Controlled — controlled with live character count
3. **API Reference** — table with: `invalid`, `rows`, `className`, `...props`

Code string patterns: match Input page format (code strings at top, rendered examples using `ComponentPreview`).

Import: `Textarea` and `Label` from `@umichkisa-ds/web`.

### Task 4: Add to sidebar

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx` (line ~63, `COMPONENT_ITEMS` array)

**Step 1: Add Textarea entry**

Add `{ label: 'Textarea', href: '/components/textarea' }` in alphabetical order within the array.

---

## Validation

After both phases: run `pnpm typecheck` and `pnpm build`. Both must pass. Do NOT `git add dist/`.
