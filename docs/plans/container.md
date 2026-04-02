# Container Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Container layout component that encodes the page shell pattern with size variants and responsive padding.

**Architecture:** CVA-based component with a `size` variant controlling max-width. Responsive padding (`px-4 md:px-6 lg:px-8`) and centering (`mx-auto w-full`) are always applied. Polymorphic `as` prop for semantic HTML elements.

**Tech Stack:** React, CVA, Tailwind CSS, cn() utility

---

## Phase 1: Component Implementation

### Task 1: Create Container component

**Files:**
- Create: `packages/web/src/components/layout/Container.tsx`

**Implementation:**

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const containerVariants = cva(
  "mx-auto w-full px-4 md:px-6 lg:px-8",
  {
    variants: {
      size: {
        default: "max-w-screen-2xl",
        md: "max-w-screen-md",
        sm: "max-w-screen-sm",
        prose: "max-w-prose",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type AllowedElement = "div" | "section" | "main" | "article" | "header" | "footer" | "nav";

export type ContainerProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof containerVariants> & {
    /** HTML element to render. Default: "div". */
    as?: AllowedElement;
  };

export function Container({
  as: Component = "div",
  size,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
```

### Task 2: Export from layout barrel

**Files:**
- Modify: `packages/web/src/components/layout/index.ts`

Add to existing exports:

```ts
export { Container } from "./Container";
export type { ContainerProps } from "./Container";
```

No changes needed to `packages/web/src/index.ts` — it already re-exports `./components/layout`.

### Task 3: Update DS_CONSTRAINTS

**Files:**
- Modify: `docs/DS_CONSTRAINTS.md`

Update § Spacing to reflect the new padding values:

```
Must: Apply the default inset for horizontal breathing room: `px-4` (mobile), `px-6` (tablet), `px-8` (desktop). [source:foundation/layout/spacing]
```

Update § Page Shell:

```
Must: The page shell must combine all four concerns together: `mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8`. Never apply only part of this pattern. [source:foundation/layout/spacing]
Must: Use the Container component to apply the page shell pattern — never manually compose the utility classes. [source:component/container]
```

### Task 4: Validate Phase 1

Run `pnpm typecheck` and `pnpm build` in worktree — both must pass.

---

## Phase 2: Docs Page + Sidebar

### Task 5: Create Container docs page

**Files:**
- Create: `apps/docs/app/components/container/page.tsx`

**Sections:**
1. **Header** — component name, description, canonical purpose
2. **Examples:**
   - Default — basic page-width container
   - Sizes — all four size variants side by side
   - Polymorphic — using `as="main"` and `as="section"`
   - Full-bleed pattern — outer wrapper with background + nested Container
3. **Usage Guidelines** — when to use, when not to (don't nest containers), full-bleed pattern explanation
4. **API Reference** — props table

Follow the existing docs page pattern:
- `<article>` with `mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden`
- `ComponentPreview` for each example with code strings
- Inline code uses `rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground`
- API table with Prop / Type / Default / Description columns

### Task 6: Add to Sidebar

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

Add to `COMPONENT_ITEMS` in alphabetical position (after Checkbox):

```ts
{ label: 'Container', href: '/components/container' },
```

### Task 7: Validate Phase 2

Run `pnpm typecheck` and `pnpm build` — both must pass.
