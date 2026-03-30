# LinkButton Audit + Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Audit and fix the existing LinkButton component to align with DS constraints and Button's API, then create its docs page.

**Architecture:** LinkButton reuses `buttonVariants` from Button — it's a navigation element that looks like a button. Extends `AnchorHTMLAttributes` for full anchor prop support. Disabled state swaps to `<span>` with `aria-disabled` and `role="link"`.

**Tech Stack:** React, CVA (reused from Button), Tailwind v4 tokens, Next.js 15 docs app

---

## Phase 1: Component Audit + Fix

### Task 1: Rewrite LinkButton.tsx

**Files:**
- Modify: `packages/web/src/components/button/LinkButton.tsx`

**Step 1: Replace the entire file with the audited version**

```tsx
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { buttonVariants } from "./Button";

type LinkButtonProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    disabled?: boolean;
  };

function LinkButton({
  variant,
  size,
  disabled = false,
  className,
  children,
  ...props
}: LinkButtonProps) {
  if (disabled) {
    return (
      <span
        className={cn(
          buttonVariants({ variant, size }),
          "pointer-events-none text-disabled-foreground opacity-60",
          className
        )}
        role="link"
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}

export { LinkButton };
export type { LinkButtonProps };
```

Key changes from existing code:
- Reuses `buttonVariants` from Button (fixes all token/style violations)
- Extends `AnchorHTMLAttributes` (adds `target`, `rel`, `aria-*` support)
- `href` is optional (omitted in `Omit` then re-added as optional — needed for disabled state where no href is used, but `...props` passes it through when provided)
- Disabled state: `<span>` with `role="link"`, `aria-disabled`, matching Button disabled styling
- Focus ring comes free from `buttonVariants`
- `size` prop comes free from `buttonVariants`

**Step 2: Verify barrel export already exists**

Check `packages/web/src/components/button/index.ts` — LinkButton is already exported. No changes needed.

**Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

---

## Phase 2: Docs Page + Sidebar

### Task 2: Create LinkButton docs page

**Files:**
- Create: `apps/docs/app/components/link-button/page.tsx`

**Step 1: Create the docs page**

Follow the Button docs page structure (`apps/docs/app/components/button/page.tsx`) as template. Sections:

1. **Header** — "LinkButton", description: a navigation element styled as a button, for links that need button-level visual weight.
2. **When to use** — guidance section: use LinkButton for navigation (goes somewhere), use Button for actions (does something). If it submits a form or triggers a mutation, use Button. If it opens a URL or navigates to a route, use LinkButton.
3. **Examples:**
   - Default — simplest usage with href
   - Variants — primary, secondary, tertiary, destructive (same layout as Button docs)
   - Sizes — sm, md, lg
   - With icon — using `<Icon>` component
   - External link — with `target="_blank"` and `rel="noopener noreferrer"`
   - Disabled — all variants in disabled state
4. **API Reference** — HTML table: `variant`, `size`, `href`, `disabled`, `target`, `rel`, `className`, `children`

All `<ComponentPreview>` wrappers with code snippets, same pattern as Button docs page.

### Task 3: Add LinkButton to sidebar

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx:63-69` (COMPONENT_ITEMS array)

**Step 1: Add LinkButton entry**

Add `{ label: 'LinkButton', href: '/components/link-button' }` to `COMPONENT_ITEMS`, alphabetically after `Icon`.

### Task 4: Validate

Run: `pnpm typecheck && pnpm build`
Expected: Both PASS
