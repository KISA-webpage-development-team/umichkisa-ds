# Foundation Index Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `ds-constrained-execution` to implement this plan task-by-task.

**Goal:** Build the Foundation index page as a navigation hub with branded hoverable cards, add the `hoverable` prop to the Card component, and retrofit all existing navigational card usages.

**Architecture:** Add a `hoverable` prop to Card that applies `hover:bg-brand-accent-subtle`, `hover:border-brand-primary`, and `group` class. CardTitle always includes `group-hover:text-brand-primary` (no-op unless a parent has `group`). Then build the Foundation index page with 4 icon+description cards linking to section Overviews. Retrofit Components index and Forms overview to use `hoverable`.

**Tech Stack:** React, Tailwind CSS, `@umichkisa-ds/web` (Card, Grid, Icon), Next.js App Router, Lucide icons

---

### Task 1: Add 4 Lucide icons to the Icon registry

**Files:**
- Modify: `packages/web/src/components/Icon/registry.ts`

**Step 1: Add imports and registry entries**

In `packages/web/src/components/Icon/registry.ts`, add 4 new Lucide imports and registry entries:

```ts
// Add to imports (alphabetical order):
import {
  // ... existing imports ...
  Image,
  LayoutGrid,
  Palette,
  Type,
  // ... existing imports ...
} from "lucide-react";

// Add to registry object (alphabetical order):
  "image": Image,
  "layout-grid": LayoutGrid,
  "palette": Palette,
  "type": Type,
```

**Step 2: Verify build**

Run: `pnpm --filter @umichkisa-ds/web build`
Expected: Build succeeds, no type errors.

**Step 3: Commit**

```bash
git add packages/web/src/components/Icon/registry.ts
git commit -m "feat(icon): add palette, type, layout-grid, image to registry"
```

---

### Task 2: Update Icon docs page with new icons

**Files:**
- Modify: `apps/docs/app/components/icon/page.tsx`

**Step 1: Update the Available Icons grid and count**

In `apps/docs/app/components/icon/page.tsx`:

1. Update the count text from `41 icons` to `45 icons` and from `39 Lucide` to `43 Lucide`.

2. Add the 4 new icon names to the grid array in alphabetical position:
   - `'image'` — after `'graduation-cap'`
   - `'layout-grid'` — after `'info'` → wait, alphabetically after `'list'` → actually: `i-m-a-g-e` goes after `'graduation-cap'` and before `'info'`. `'layout-grid'` goes after `'layout-grid'`... Let's sort properly:

   Current order around the insertion points:
   ```
   'graduation-cap', 'info', 'list', 'lock', ...
   ```
   Insert `'image'` between `'graduation-cap'` and `'info'`.

   ```
   'list', 'lock', 'log-in', 'mail', 'menu', 'message-square', 'minus', ...
   ```
   Insert `'layout-grid'` between `'list'` and `'lock'`... wait: `la` < `li`, so `'layout-grid'` goes between `'info'` and `'list'`.

   Actually let's be precise alphabetically:
   - `graduation-cap` → `image` → `info` → `layout-grid` → `list` → `lock` → ...
   - `palette` → goes between `'minus'` and `'pencil'`... `m` < `p`, so after `'plus'`: `'plus'` → `'palette'`? No: `mi` < `pa` < `pe` < `pl`, so: `'minus'`, `'palette'`, `'pencil'`, `'plus'`
   - `type` → goes between `'trash-2'` and `'triangle-alert'`... `tr` < `ty` < `u`, so: `'triangle-alert'`, `'type'`, `'user-round'`

   Final insertion points in the array:
   - After `'graduation-cap'`: add `'image'`
   - After `'info'`: add `'layout-grid'`
   - After `'minus'`: add `'palette'`
   - After `'triangle-alert'`: add `'type'`

**Step 2: Verify the page renders**

Run: `pnpm dev` and check `/components/icon` — all 45 icons should render in the grid.

**Step 3: Commit**

```bash
git add apps/docs/app/components/icon/page.tsx
git commit -m "docs(icon): add palette, type, layout-grid, image to Available Icons grid"
```

---

### Task 3: Add `hoverable` prop to Card component

**Files:**
- Modify: `packages/web/src/components/display/Card.tsx`

**Step 1: Add `hoverable` prop to Card**

Update the `Card` component to accept a `hoverable` boolean prop. When true, add `group`, `hover:bg-brand-accent-subtle`, `hover:border-brand-primary`, and `transition-colors`:

```tsx
export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Enable branded hover effect for navigational/interactive cards. */
  hoverable?: boolean;
};

export function Card({ className, hoverable, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 bg-surface border border-border rounded-md min-w-0",
        hoverable &&
          "group hover:bg-brand-accent-subtle hover:border-brand-primary transition-colors",
        className
      )}
      {...props}
    />
  );
}
```

**Step 2: Add `group-hover` to CardTitle**

Update `CardTitle` to always include `group-hover:text-brand-primary`. This is a no-op unless a parent has the `group` class (i.e., when Card has `hoverable`):

```tsx
export function CardTitle({
  as: Component = "h3",
  className,
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        "type-h4 !font-semibold text-foreground line-clamp-2 group-hover:text-brand-primary transition-colors",
        className
      )}
      {...props}
    />
  );
}
```

**Step 3: Verify build**

Run: `pnpm --filter @umichkisa-ds/web build`
Expected: Build succeeds, no type errors.

**Step 4: Commit**

```bash
git add packages/web/src/components/display/Card.tsx
git commit -m "feat(card): add hoverable prop with branded hover effect"
```

---

### Task 4: Build Foundation index page

**Files:**
- Modify: `apps/docs/app/foundation/page.tsx`

**Step 1: Replace stub with full page**

Replace the entire content of `apps/docs/app/foundation/page.tsx` with:

```tsx
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Icon,
} from '@umichkisa-ds/web'
import type { IconName } from '@umichkisa-ds/web'
import Link from 'next/link'

const sections: { title: string; href: string; icon: IconName; description: string }[] = [
  {
    title: 'Colors',
    href: '/foundation/colors/overview',
    icon: 'palette',
    description: 'Color primitives, semantic tokens, and accessibility guidelines.',
  },
  {
    title: 'Typography',
    href: '/foundation/typography/overview',
    icon: 'type',
    description: 'Type scale, font families, and text usage patterns.',
  },
  {
    title: 'Layout',
    href: '/foundation/layout/overview',
    icon: 'layout-grid',
    description: 'Spacing system, breakpoints, and responsive layout guidance.',
  },
  {
    title: 'Iconography',
    href: '/foundation/iconography/overview',
    icon: 'image',
    description: 'Icon library, sizing conventions, and usage standards.',
  },
]

export default function FoundationPage() {
  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">
        Foundation
      </h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Design tokens and visual language that underpin every component in the
        KISA Design System.
      </p>

      <Grid columns={{ base: 1, md: 2 }} gap="component">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="block h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
          >
            <Card hoverable className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name={section.icon} size="md" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  )
}
```

**Step 2: Verify the page renders**

Run: `pnpm dev` and check `/foundation` — 4 cards in a 2×2 grid, branded hover effect, icons visible.

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/page.tsx
git commit -m "feat(docs): build Foundation index page with navigational cards"
```

---

### Task 5: Retrofit Components index page to use `hoverable`

**Files:**
- Modify: `apps/docs/app/components/page.tsx`

**Step 1: Replace manual hover with `hoverable` prop**

In `apps/docs/app/components/page.tsx`, change line 106:

```tsx
// Before:
<Card className="h-full hover:bg-surface-subtle transition-colors">

// After:
<Card hoverable className="h-full">
```

**Step 2: Verify the page renders**

Run: `pnpm dev` and check `/components` — all cards should show branded hover (maize bg + navy border + navy title).

**Step 3: Commit**

```bash
git add apps/docs/app/components/page.tsx
git commit -m "refactor(docs): use Card hoverable prop on Components index"
```

---

### Task 6: Retrofit Forms overview page to use `hoverable`

**Files:**
- Modify: `apps/docs/app/forms/overview/page.tsx`

**Step 1: Replace all manual hover with `hoverable` prop**

In `apps/docs/app/forms/overview/page.tsx`, replace every occurrence of:

```tsx
<Card className="h-full hover:bg-surface-subtle transition-colors">
```

with:

```tsx
<Card hoverable className="h-full">
```

There are 5 Card instances to update (lines 113, 124, 135, 146, 157).

**Step 2: Verify the page renders**

Run: `pnpm dev` and check `/forms/overview` — all 5 cards should show branded hover.

**Step 3: Commit**

```bash
git add apps/docs/app/forms/overview/page.tsx
git commit -m "refactor(docs): use Card hoverable prop on Forms overview"
```

---

### Task 7: Update Card docs page with `hoverable` prop

**Files:**
- Modify: `apps/docs/app/components/card/page.tsx`

**Step 1: Add hoverable example and update API table**

Add a "Hoverable" example section after the existing examples showing:

```tsx
<Card hoverable>
  <CardHeader>
    <CardTitle as="h4">Hoverable Card</CardTitle>
    <CardDescription>
      Cards used as navigation links should use the hoverable prop for branded hover feedback.
    </CardDescription>
  </CardHeader>
</Card>
```

Add `hoverable` to the Card API Reference table:
- **Prop:** `hoverable`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enables branded hover effect (maize background, navy border, navy title) for navigational cards.

Also add the row to the TableMobileList.

**Step 2: Verify the page renders**

Run: `pnpm dev` and check `/components/card` — new example and API row visible.

**Step 3: Commit**

```bash
git add apps/docs/app/components/card/page.tsx
git commit -m "docs(card): add hoverable prop example and API entry"
```

---

### Task 8: Final verification

**Step 1: Run build and typecheck**

```bash
pnpm build && pnpm typecheck
```

Expected: Both pass with zero errors.

**Step 2: Update CODEBASE.md**

In `docs/CODEBASE.md`, update the Card component description to mention the `hoverable` prop:

```
| `Card` | display | ✅ | Compound component (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter). `cn()` only, no CVA. `bg-surface` + `border-border` + `rounded-md`. CardTitle has polymorphic `as` prop (h1–h6, default h3). `hoverable` prop for branded hover effect on navigational cards. |
```

Update the icon count if mentioned anywhere (41 → 45).

**Step 3: Commit**

```bash
git add docs/CODEBASE.md
git commit -m "docs: update CODEBASE.md with hoverable Card and new icon count"
```
