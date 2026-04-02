# Form Docs Reorganization + Demo Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reorganize the docs sidebar from a flat alphabetical component list into collapsible categories (auto-expanding current category), and create a Forms overview/demo page at `/components/forms` that replaces `/test/form`.

**Architecture:** Sidebar data model changes from a flat `NavItem[]` to a categorized structure with category headers, collapsible sections, and auto-expand logic. A new Forms overview page combines compositional guidance with a realistic form demo. No route changes for existing component pages — only sidebar grouping and one new page.

**Tech Stack:** Next.js 15 App Router, React, Tailwind v4 with DS semantic tokens, `@umichkisa-ds/web` components

**Key decisions (from grill-me):**
- Sidebar categories are collapsible, auto-expand current category
- Foundation section stays always-expanded (unchanged)
- Category order: Icon → Buttons → Layout → Forms → Data Display → Navigation → Overlays → Feedback → Utilities → Date & Time
- Components alphabetical within each category (Forms Overview always first in Forms)
- Only show categories that have at least one shipped component
- Forms overview page at `/components/forms` — compositional guide + realistic form demo
- Delete `/test/form` after Forms overview page is complete
- `frontend-design` skill MUST be used when building the Forms overview page
- Note categorization in `docs/TODO.md` for future sessions

---

## Phase 1: Sidebar Categorization

### Task 1: Update sidebar data model

Replace the flat `COMPONENT_ITEMS` array with a categorized structure. Each category has a label and an array of component links. Only categories with shipped components are included.

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

**Step 1:** Replace the `NavItem` interface and data structures at the top of the file. Replace `COMPONENT_ITEMS` (lines 63–82) with:

```tsx
interface CategoryGroup {
  label: string
  items: NavItem[]
}

const COMPONENT_CATEGORIES: CategoryGroup[] = [
  {
    label: 'Icon',
    items: [
      { label: 'Icon', href: '/components/icon' },
    ],
  },
  {
    label: 'Buttons',
    items: [
      { label: 'Button',     href: '/components/button' },
      { label: 'IconButton',  href: '/components/icon-button' },
      { label: 'LinkButton',  href: '/components/link-button' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { label: 'Container', href: '/components/container' },
      { label: 'Divider',   href: '/components/divider' },
      { label: 'Grid',      href: '/components/grid' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { label: 'Forms Overview', href: '/components/forms' },
      { label: 'Checkbox',       href: '/components/checkbox' },
      { label: 'FormItem',       href: '/components/form-item' },
      { label: 'Input',          href: '/components/input' },
      { label: 'Label',          href: '/components/label' },
      { label: 'Radio',          href: '/components/radio' },
      { label: 'Select',         href: '/components/select' },
      { label: 'Switch',         href: '/components/switch' },
      { label: 'Textarea',       href: '/components/textarea' },
    ],
  },
  {
    label: 'Data Display',
    items: [
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Badge',  href: '/components/badge' },
    ],
  },
]
```

**Step 2:** Update `SECTIONS` to pass categories instead of flat items:

```tsx
const SECTIONS = {
  foundation: { label: 'Foundation', items: FOUNDATION_ITEMS, categories: null },
  components: { label: 'Components', items: null, categories: COMPONENT_CATEGORIES },
}
```

**Step 3:** Run `pnpm typecheck` — expect type errors (we haven't updated the render logic yet). That's fine — proceed to Task 2.

---

### Task 2: Implement collapsible category rendering

Update the Sidebar component's render logic to handle categorized components with collapsible sections that auto-expand based on current route.

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

**Step 1:** Add state for manually toggled categories. Import `useState`:

```tsx
import { useState, useCallback } from 'react'
```

**Step 2:** Inside the `Sidebar` component, add category toggle logic after the `section` const:

```tsx
// Determine which category the current route belongs to
const activeCategory = section.categories?.find((cat) =>
  cat.items.some((item) => pathname === item.href || pathname.startsWith(item.href + '/'))
)?.label ?? null

// Track manually toggled categories (overrides auto-expand)
const [toggledCategories, setToggledCategories] = useState<Set<string>>(new Set())

const isCategoryOpen = useCallback(
  (categoryLabel: string) => {
    if (toggledCategories.has(categoryLabel)) {
      // If manually toggled, check if it was toggled open or closed
      // We store the "desired state" — if active category is toggled, it means user closed it
      return categoryLabel !== activeCategory
    }
    // Default: open if it's the active category
    return categoryLabel === activeCategory
  },
  [toggledCategories, activeCategory]
)

const toggleCategory = useCallback((categoryLabel: string) => {
  setToggledCategories((prev) => {
    const next = new Set(prev)
    if (next.has(categoryLabel)) {
      next.delete(categoryLabel)
    } else {
      next.add(categoryLabel)
    }
    return next
  })
}, [])
```

**Step 3:** Reset toggled state when route changes. Add a `useEffect`:

```tsx
import { useState, useCallback, useEffect } from 'react'

// Inside Sidebar component, after toggleCategory:
useEffect(() => {
  setToggledCategories(new Set())
}, [pathname])
```

**Step 4:** Replace the component items rendering block inside the `<nav>` `<div className="px-8">`. The Foundation section renders as before (always expanded, with children). The Components section renders categorized groups. Replace the entire `{section.items.map(...)}` block with:

```tsx
{section.categories
  ? section.categories.map((category) => {
      const isOpen = isCategoryOpen(category.label)
      return (
        <div key={category.label} className="mb-1">
          <button
            type="button"
            onClick={() => toggleCategory(category.label)}
            className="flex w-full items-center justify-between py-2 px-3 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-[120ms]"
          >
            <span>{category.label}</span>
            <svg
              className={`size-3 transition-transform duration-[200ms] ${isOpen ? 'rotate-0' : '-rotate-90'}`}
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {isOpen && (
            <div className="mb-2">
              {category.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-2 px-3 ml-1 text-sm transition-colors rounded-md
                      duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px] ${
                      isActive
                        ? 'font-sejong-bold text-foreground'
                        : 'font-sejong-light text-muted-foreground hover:bg-surface-subtle'
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )
    })
  : section.items?.map((item) => {
      if (item.children) {
        const parentBase = item.href.substring(0, item.href.lastIndexOf('/'))
        const isParentActive = pathname.startsWith(parentBase)
        return (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`block py-3 px-3 text-sm transition-colors
                font-sejong-bold rounded-md
                duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px] ${
                isParentActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:bg-surface-subtle'
              }`}
              onClick={onClose}
            >
              {item.label}
            </Link>
            {isParentActive && (
              <div className="ml-3 border-l border-border pl-3 mb-1">
                {item.children.map((child) => {
                  const isChildActive = pathname === child.href
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block py-2 px-3 
                        text-sm transition-colors rounded-md
                        duration-[120ms] focus-visible:outline
                        focus-visible:outline-2 focus-visible:outline-brand-primary 
                        focus-visible:outline-offset-[-2px] ${
                        isChildActive
                          ? 'font-sejong-bold'
                          : 'font-sejong-light text-muted-foreground hover:bg-surface-subtle'
                      }`}
                      onClick={onClose}
                    >
                      {child.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      }

      const isActive = pathname === item.href
      return (
        <Link
          key={item.href}
          href={item.href}
          className={`block py-3 px-3 text-sm transition-colors
            font-sejong-bold rounded-md
            duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px] ${
            isActive
              ? 'text-foreground'
              : 'text-muted-foreground hover:bg-surface-subtle'
          }`}
          onClick={onClose}
        >
          {item.label}
        </Link>
      )
    })
}
```

**Step 5:** Run `pnpm build && pnpm typecheck` — both must pass.

**Step 6:** Visually verify at `http://localhost:3000/components/button`:
- "Components" heading shows at top
- Categories appear as collapsible headers
- "Buttons" category is auto-expanded (contains current page)
- Other categories are collapsed
- Clicking a collapsed category header expands it
- Clicking the expanded category header collapses it
- Navigating to a different component auto-expands that component's category

**Step 7:** Verify Foundation sidebar is unchanged — navigate to `/foundation/colors/overview` and confirm it renders identically to before.

**Step 8:** Commit.

```bash
git add apps/docs/components/Sidebar.tsx
git commit -m "feat(docs): reorganize sidebar with collapsible component categories"
```

---

### Task 3: Remove "Feedback" placeholder from sidebar

The current sidebar includes a "Feedback" link at `/components/feedback`. This is not a real component — it was a placeholder. It should not appear in any category since no Feedback components are shipped yet.

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx` (if "Feedback" was carried over into the new categories — verify and remove if present)

**Step 1:** Check if `/components/feedback` exists as an actual page.

```bash
ls apps/docs/app/components/feedback/
```

**Step 2:** If it exists and is a placeholder, leave the page file but ensure it's NOT listed in any `COMPONENT_CATEGORIES` entry. The Feedback category will appear when Batch 9 ships (Skeleton, LoadingSpinner, Alert).

**Step 3:** If the Feedback entry was included in the categories data, remove it. Run `pnpm typecheck`.

**Step 4:** Commit (if changes were made).

```bash
git add apps/docs/components/Sidebar.tsx
git commit -m "chore(docs): remove Feedback placeholder from sidebar categories"
```

---

## Phase 2: Forms Overview Page

> **REQUIRED:** Use the `frontend-design` skill when implementing this page.

### Task 4: Create the Forms overview page

Create a new page at `/components/forms` that serves as:
1. A compositional guide — how to use FormItem with different controls
2. A realistic form demo — a complete, polished form example

This page replaces `/test/form`. Use the `frontend-design` skill for design quality.

**Files:**
- Create: `apps/docs/app/components/forms/page.tsx`

**Step 1:** Use the `frontend-design` skill. The page should follow the existing docs page pattern (see `apps/docs/app/components/form-item/page.tsx` for reference). Structure:

```
Header:
  - Title: "Forms"
  - Description: How to compose form components in the KISA design system.

Section 1 — Composition Patterns:
  - Brief intro explaining FormItem as the composition wrapper
  - Show key patterns with ComponentPreview:
    - FormItem + Input (basic, with description, with error, required)
    - FormItem + Textarea
    - FormItem + Select
    - FormItem + Checkbox
    - FormItem + Switch
    - FormItem + RadioGroup
  - Each pattern: short description + live example with code

Section 2 — Complete Form Example:
  - A realistic, polished form (e.g. "Create Account" or "Profile Settings")
  - Composes multiple FormItem instances into a cohesive layout
  - Shows required fields, descriptions, error states, different control types
  - Uses the DS grid/spacing system for layout
  - Include a submit button (Button component) at the bottom

Section 3 — Guidelines:
  - Brief text-only section covering:
    - Always use FormItem to wrap controls for consistent spacing and label/error placement
    - Match htmlFor to the control's id for accessibility
    - Use error prop + invalid on the control together
    - Prefer vertical form layouts; use horizontal only for short inline fields
```

**Step 2:** The page must import from `@umichkisa-ds/web` and use `ComponentPreview` from `@/components/ComponentPreview`. Follow the exact patterns from existing docs pages (code snippet constants, 'use client', article wrapper with `max-w-3xl`).

**Step 3:** Run `pnpm build && pnpm typecheck` — both must pass.

**Step 4:** Visually verify at `http://localhost:3000/components/forms`:
- Page renders with all sections
- All ComponentPreview examples show working live demos
- Code snippets are correct and copy-pasteable
- Complete form example looks polished and realistic
- Sidebar shows "Forms Overview" as the first item under the Forms category, and it's highlighted as active

**Step 5:** Commit.

```bash
git add apps/docs/app/components/forms/page.tsx
git commit -m "feat(docs): add Forms overview page with composition guide and demo"
```

---

### Task 5: Delete `/test/form`

The Forms overview page replaces the test form page entirely.

**Files:**
- Delete: `apps/docs/app/test/form/page.tsx`
- Possibly delete: `apps/docs/app/test/` (if empty after removal)

**Step 1:** Delete the test form page:

```bash
rm apps/docs/app/test/form/page.tsx
```

**Step 2:** Check if `apps/docs/app/test/` has any other contents:

```bash
ls apps/docs/app/test/
```

If empty, remove the directory:

```bash
rm -r apps/docs/app/test/
```

**Step 3:** Run `pnpm build && pnpm typecheck` — both must pass. Ensure no broken imports reference the deleted page.

**Step 4:** Commit.

```bash
git add -u
git commit -m "chore(docs): delete /test/form page, replaced by /components/forms"
```

---

## Phase 3: Bookkeeping

### Task 6: Update TODO.md with categorization reference and check off batch

Record the sidebar categorization in TODO.md so future sessions know which category each component belongs to, and mark Batch 6.5 as complete.

**Files:**
- Modify: `docs/TODO.md`

**Step 1:** Add a categorization reference block below the `## Components` header (before the batch list). This tells future sessions where new components should be placed in the sidebar:

```markdown
### Sidebar Categories (defined in apps/docs/components/Sidebar.tsx)

| Order | Category     | Components (alphabetical within)                                                  |
|-------|-------------|-----------------------------------------------------------------------------------|
| 1     | Icon        | Icon                                                                              |
| 2     | Buttons     | Button, IconButton, LinkButton                                                    |
| 3     | Layout      | Container, Divider, Grid                                                          |
| 4     | Forms       | Forms Overview (always first), Checkbox, FormItem, Input, Label, Radio, Select, Switch, Textarea |
| 5     | Data Display | Accordion, Avatar, Badge, Card, Table                                             |
| 6     | Navigation  | Pagination, Tabs                                                                  |
| 7     | Overlays    | Dialog, Dropdown, Popover, Tooltip                                                |
| 8     | Feedback    | Alert, LoadingSpinner, Skeleton, Toast                                            |
| 9     | Utilities   | NotFound/NotAuthorized/NotLogin/UnexpectedError, OnlyMobileView, ToggleBar, UnderConstruction |
| 10    | Date & Time | Calendar, DatePicker                                                              |

Only show categories with ≥1 shipped component. When a batch ships a component that creates a new category, add the category to `COMPONENT_CATEGORIES` in Sidebar.tsx.
```

**Step 2:** Check off Batch 6.5 items:

```markdown
### Batch 6.5 — Form docs reorganization + demo page
- [x] Reorganize all form component docs pages in the design doc app
- [x] Add official form demo page to docs app (replace /test/form with a proper docs page)
```

**Step 3:** Commit.

```bash
git add docs/TODO.md
git commit -m "docs: update TODO with sidebar categories and mark batch 6.5 done"
```

---

### Task 7: Update CODEBASE.md

Update status tables to reflect the new sidebar structure and Forms overview page.

**Files:**
- Modify: `docs/CODEBASE.md`

**Step 1:** Read `docs/CODEBASE.md` and update relevant sections:
- Note that the sidebar now uses collapsible categories
- Add the Forms overview page to the docs pages list
- Note removal of `/test/form`

**Step 2:** Run `pnpm build && pnpm typecheck` — final verification.

**Step 3:** Commit.

```bash
git add docs/CODEBASE.md
git commit -m "docs: update CODEBASE.md after batch 6.5"
```
