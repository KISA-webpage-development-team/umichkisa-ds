# Avatar Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an Avatar component that displays a user's profile image with fallback to initials or a generic icon.

**Architecture:** CVA-based component with a `size` variant (sm/md/lg). Renders an `<img>` when `src` is provided, falls back to initials derived from `name`, and finally to an `<Icon name="user-round" />` when neither is available. Uses `useState` for image error handling.

**Tech Stack:** React, CVA, Tailwind CSS, DS Icon component

---

## Phase 1: Component Implementation

### Task 1: Add `user-round` to the icon registry

**Files:**
- Modify: `packages/web/src/components/icon/registry.ts`

**Step 1: Add the import and registry entry**

Add `UserRound` to the lucide-react import block (alphabetical) and add `"user-round": UserRound` to the registry object (alphabetical position after `trash-2`):

```ts
// In import block, add:
UserRound,

// In registry object, add:
"user-round": UserRound,
```

**Step 2: Verify**

Run: `pnpm typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add packages/web/src/components/icon/registry.ts
git commit -m "feat(icon): add user-round to registry"
```

---

### Task 2: Create Avatar component

**Files:**
- Create: `packages/web/src/components/avatar/Avatar.tsx`
- Create: `packages/web/src/components/avatar/index.ts`
- Modify: `packages/web/src/index.ts`

**Step 1: Create `packages/web/src/components/avatar/Avatar.tsx`**

```tsx
import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon";

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 bg-brand-primary text-brand-foreground",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-14 h-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type AvatarProps = VariantProps<typeof avatarVariants> & {
  src?: string;
  name?: string;
  className?: string;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const initialsTextClass: Record<string, string> = {
  sm: "type-caption",
  md: "type-body-sm",
  lg: "type-body",
};

const iconSize: Record<string, "xs" | "sm" | "md"> = {
  sm: "xs",
  md: "sm",
  lg: "md",
};

function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const resolvedSize = size ?? "md";

  const showImage = src && !imgError;
  const showInitials = !showImage && name;

  if (showImage) {
    return (
      <span
        className={cn(avatarVariants({ size }), className)}
        role="img"
        aria-label={name}
      >
        <img
          src={src}
          alt={name ?? ""}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </span>
    );
  }

  if (showInitials) {
    return (
      <span
        className={cn(avatarVariants({ size }), className)}
        role="img"
        aria-label={name}
      >
        <span className={initialsTextClass[resolvedSize]} aria-hidden="true">
          {getInitials(name)}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(avatarVariants({ size }), className)}
      role="img"
      aria-label="User avatar"
    >
      <Icon name="user-round" size={iconSize[resolvedSize]} />
    </span>
  );
}

export { Avatar, avatarVariants };
export type { AvatarProps };
```

**Step 2: Create `packages/web/src/components/avatar/index.ts`**

```ts
export { Avatar, avatarVariants } from "./Avatar";
export type { AvatarProps } from "./Avatar";
```

**Step 3: Add barrel export to `packages/web/src/index.ts`**

Add `export * from "./components/avatar";` (alphabetical — first entry):

```ts
export * from "./components/avatar";
```

**Step 4: Verify**

Run: `pnpm typecheck`
Expected: PASS

Run: `pnpm build`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/web/src/components/avatar/ packages/web/src/index.ts
git commit -m "feat(avatar): add Avatar component with image, initials, and icon fallbacks"
```

---

## Phase 2: Docs Page + Sidebar

### Task 3: Create Avatar docs page

**Files:**
- Create: `apps/docs/app/components/avatar/page.tsx`
- Modify: `apps/docs/components/Sidebar.tsx`

**Step 1: Create `apps/docs/app/components/avatar/page.tsx`**

Follow the Badge docs page pattern. Sections:

1. **Header** — component name, description, canonical purpose
2. **Examples:**
   - Default (image avatar at md size)
   - Sizes (sm/md/lg with image)
   - Initials fallback (sm/md/lg with name only)
   - Icon fallback (sm/md/lg with no props)
   - Error fallback (broken src + name → shows initials)
3. **API Reference** — props table (src, name, size, className)

Use `ComponentPreview` for all examples. Follow Badge's docs page code style exactly — same heading hierarchy, same table structure, same `<code>` styling pattern.

**Step 2: Add to Sidebar**

In `apps/docs/components/Sidebar.tsx`, add Avatar to `COMPONENT_ITEMS` in alphabetical position (first entry):

```ts
{ label: 'Avatar', href: '/components/avatar' },
```

**Step 3: Verify**

Run: `pnpm typecheck`
Expected: PASS

Run: `pnpm build`
Expected: PASS

**Step 4: Commit**

```bash
git add apps/docs/app/components/avatar/ apps/docs/components/Sidebar.tsx
git commit -m "docs(avatar): add docs page and sidebar entry"
```
