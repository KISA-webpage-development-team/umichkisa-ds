# Header & Sidebar Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `ds-constrained-execution` to implement this plan task-by-task. Every task that modifies `.tsx` files requires a DS constraint review pass before proceeding.

**Goal:** Redesign the docs app Header and Sidebar to align with KISA brand identity, fix mobile UX gaps, and dogfood the DS component library — establishing migration patterns for the client app.

**Architecture:** Two-phase refactor. Phase 1 rewrites the Header (64px, DS components, responsive breakpoints, always-visible hamburger). Phase 2 rewrites the Sidebar (flat list, section controlled by header nav, hidden scrollbar, polished mobile drawer). Each phase is independently shippable.

**Tech Stack:** `@umichkisa-ds/web` (IconButton, Icon, Badge, Divider), Tailwind v4 with DS tokens (`type-*`, semantic colors), Next.js App Router (`usePathname`).

---

## Pre-requisite: Add `menu` icon to registry

The icon registry (`packages/web/src/components/icon/registry.ts`) has no hamburger/menu icon. Import `Menu` from `lucide-react` and register it as `"menu"`.

**Files:**
- Modify: `packages/web/src/components/icon/registry.ts`

**Step 1: Add the icon**

In `registry.ts`, add `Menu` to the lucide import list (alphabetical) and add `"menu": Menu` to the registry object.

```ts
// Add to imports (alphabetical, between Mail and MessageSquare):
Menu,

// Add to registry (alphabetical, between "mail" and "message-square"):
"menu": Menu,
```

**Step 2: Verify build**

Run: `pnpm --filter @umichkisa-ds/web build`
Expected: Clean build, no errors.

**Step 3: Commit**

```bash
git add packages/web/src/components/icon/registry.ts
git commit -m "feat(icon): add menu icon to registry"
```

---

## Phase 1 — Header Redesign

### Design Decisions

| Property | Old | New |
|---|---|---|
| Height | 80px (`h-20`) | 64px (`h-16`) |
| Logo text | `font-sejong-bold text-lg` | `type-body font-sejong-bold` |
| Section nav typography | `text-md font-sejong-bold` | `type-body font-sejong-bold` |
| Active section nav | `text-foreground` | `text-foreground` (unchanged) |
| Inactive section nav | `text-muted-foreground` | `text-muted-foreground` (unchanged) |
| Hover section nav | `hover:text-foreground` | `hover:bg-brand-accent-subtle` + `text-foreground` |
| Hamburger | Raw `<button>` + inline SVG, hidden on non-sidebar pages | `IconButton` with `icon="menu"`, always visible on mobile |
| GitHub link | Raw `<a>` + inline SVG | `IconButton` with `icon="github"` wrapped in `<a>` |
| Version badge | Manual `<span>` styling | DS `Badge` component |
| Badge visibility | Always visible | Hidden below `lg` (1024px) |
| Logo text visibility | Always visible (shrinks) | Hidden below `sm` (640px) |

### Task 1.1: Update CSS variable for header height

**Files:**
- Modify: `apps/docs/app/globals.css:21`

**Step 1: Change the variable**

```css
/* Old */
--docs-header-h:  80px;

/* New */
--docs-header-h:  64px;
```

**Step 2: Verify build**

Run: `pnpm build`
Expected: Clean build. All pages now use 64px header height via the CSS variable — no other files need updating for the height change itself.

**Step 3: Commit**

```bash
git add apps/docs/app/globals.css
git commit -m "refactor(docs): reduce header height from 80px to 64px"
```

---

### Task 1.2: Rewrite Header component with DS components

**Files:**
- Modify: `apps/docs/components/Header.tsx` (full rewrite)

**Step 1: Rewrite Header.tsx**

Key changes:
1. Replace `h-20` with `h-16` (matches new 64px variable)
2. Replace hamburger `<button>` + inline SVG with `<IconButton icon="menu" variant="tertiary" size="sm" />`
3. Remove `showSidebar` conditional — hamburger is always visible on mobile
4. Replace GitHub `<a>` + inline SVG with `<IconButton icon="github" variant="tertiary" size="sm" />` wrapped in `<a>`
5. Replace version `<span>` with `<Badge size="sm">` with custom brand styling
6. Update logo text to `type-body font-sejong-bold text-brand-primary`
7. Update section nav links to `type-body font-sejong-bold` with `hover:bg-brand-accent-subtle` + `rounded-md`
8. Add responsive: hide badge below `lg`, hide logo text below `sm`
9. Use `z-[var(--docs-z-header)]` instead of hardcoded `z-50`

```tsx
'use client'

import { DS_VERSION, IconButton, Badge } from '@umichkisa-ds/web'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SECTIONS = [
  { label: 'Foundation', href: '/foundation', prefix: '/foundation' },
  { label: 'Components', href: '/components', prefix: '/components' },
  { label: 'Forms', href: '/forms/overview', prefix: '/forms' },
]

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  return (
    <header
      className="fixed top-0 left-0 right-0 h-16
        bg-surface border-b border-border
        flex items-center justify-between
        px-4 sm:px-8
        z-[var(--docs-z-header)]"
      role="banner"
    >
      <div className="flex items-center gap-6 lg:gap-10">
        {/* Hamburger: mobile only, always visible */}
        <div className="flex lg:hidden">
          <IconButton
            icon="menu"
            variant="tertiary"
            size="sm"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
          />
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 type-body font-sejong-bold text-brand-primary"
        >
          <Image
            src="/kisa_logo.png"
            alt="KISA logo"
            width={28}
            height={28}
            className="rounded-full shrink-0"
            priority
          />
          <span className="hidden sm:inline">KISA Design System</span>
        </Link>

        {/* Section nav — desktop only */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Sections">
          {SECTIONS.map((s) => {
            const isActive = pathname.startsWith(s.prefix)
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`px-3 py-1.5 rounded-md type-body font-sejong-bold transition-colors duration-150 ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-brand-accent-subtle'
                }`}
              >
                {s.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:block">
          <Badge size="sm" className="bg-brand-accent text-brand-primary border-brand-accent !font-sejong-bold">
            {DS_VERSION}
          </Badge>
        </div>
        <a
          href="https://github.com/umichkisa/umichkisa-ds"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source on GitHub"
        >
          <IconButton
            icon="github"
            variant="tertiary"
            size="sm"
            aria-label="View source on GitHub"
            tabIndex={-1}
          />
        </a>
      </div>
    </header>
  )
}
```

**Step 2: Update DocsShell to remove `showSidebar` from Header**

In `apps/docs/components/DocsShell.tsx`, the `<Header>` call currently passes `showSidebar`. Remove that prop since hamburger is now always visible on mobile.

```tsx
// Old
<Header showSidebar={showSidebar} onMenuClick={() => setSidebarOpen(true)} />

// New
<Header onMenuClick={() => setSidebarOpen(true)} />
```

**Step 3: Update DocsShell sidebar rendering for mobile**

The sidebar must always be rendered (so mobile hamburger always works), but on desktop it should only be visible on section pages. Update `DocsShell.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const hasSidebar = pathname.startsWith('/foundation') || pathname.startsWith('/components') || pathname.startsWith('/forms')

  return (
    <>
      <a
        href="#main-content"
        className="absolute left-[-9999px] top-4 bg-brand-primary text-brand-foreground px-4 py-2 rounded-md type-body-sm font-bold z-[var(--docs-z-skip)] focus:left-4"
      >
        Skip to main content
      </a>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        section={hasSidebar ? undefined : 'all'}
      />
      <div className="pt-[var(--docs-header-h)]" id="main-content">
        {children}
      </div>
    </>
  )
}
```

Note: The `section` prop is introduced here for Phase 2 — during Phase 1, just always render the Sidebar (remove the `{showSidebar && ...}` conditional). The Sidebar will auto-detect its section from the URL as it already does. On non-section pages (homepage), the mobile drawer will show all sections. The `section="all"` prop will be implemented in Phase 2 — for now, simply remove the conditional rendering.

Simplified Phase 1 DocsShell:

```tsx
'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <a
        href="#main-content"
        className="absolute left-[-9999px] top-4 bg-brand-primary text-brand-foreground px-4 py-2 rounded-md type-body-sm font-bold z-[var(--docs-z-skip)] focus:left-4"
      >
        Skip to main content
      </a>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="pt-[var(--docs-header-h)]" id="main-content">
        {children}
      </div>
    </>
  )
}
```

**Step 4: Update DocsLayout for conditional sidebar margin**

`DocsLayout.tsx` currently always applies `lg:ml-[var(--docs-sidebar-w)]`. Now that the sidebar is always rendered but only visible on desktop for section pages, we need the margin only on section pages. Convert `DocsLayout` to a client component that checks the route:

```tsx
'use client'

import { usePathname } from 'next/navigation'

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hasSidebar =
    pathname.startsWith('/foundation') ||
    pathname.startsWith('/components') ||
    pathname.startsWith('/forms')

  return (
    <div
      className={`p-6 lg:p-12 min-h-[calc(100vh-var(--docs-header-h))] ${
        hasSidebar ? 'lg:ml-[var(--docs-sidebar-w)]' : ''
      }`}
    >
      {children}
    </div>
  )
}
```

**Step 5: Verify build and visual check**

Run: `pnpm build && pnpm typecheck`
Expected: Clean build.

Manual check:
- Header is 64px tall
- Hamburger visible on mobile on ALL pages (including homepage)
- Logo text hidden below 640px, logo image always visible
- Section nav visible on desktop with hover showing light maize background
- Badge hidden on mobile, visible on desktop
- GitHub icon uses DS IconButton

**Step 6: Commit**

```bash
git add apps/docs/components/Header.tsx apps/docs/components/DocsShell.tsx apps/docs/components/DocsLayout.tsx
git commit -m "feat(docs): redesign header with DS components, always-visible mobile hamburger"
```

---

## Phase 2 — Sidebar Redesign

### Design Decisions

| Property | Old | New |
|---|---|---|
| Structure | Collapsible parent → children (expand on active) | Flat list: category headings (non-interactive) + indented links |
| Section label | `font-sejong-bold text-md` at top of sidebar | Removed — header controls section |
| Category headings | Parent links (clickable, bold) | Non-interactive `type-body font-sejong-bold text-foreground` |
| Nav links (inactive) | `font-sejong-light text-sm text-muted-foreground` | `type-body font-sejong-bold text-muted-foreground` + left padding |
| Nav links (active) | `font-sejong-bold text-sm text-foreground` | `type-body font-sejong-bold text-foreground bg-surface-subtle` + left padding |
| Nav links (hover) | `hover:bg-surface-subtle` | `hover:bg-brand-accent-subtle` (light maize) |
| Scrollbar | Visible | Hidden (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`) |
| Mobile drawer animation | `duration-[250ms] ease-in-out` | `duration-200 ease-in-out` |
| Link transitions | `duration-[120ms]` | `duration-150` |
| Mobile behavior on non-section pages | Not rendered | Shows all three sections for full navigation |
| Desktop on non-section pages | Not rendered | Not visible (no sidebar margin applied) |

### Task 2.1: Add hidden scrollbar utility to globals.css

**Files:**
- Modify: `apps/docs/app/globals.css`

**Step 1: Add utility class**

Add after the `@layer base` block:

```css
/* ── Utilities ────────────────────────────────────────────────────── */
@layer utilities {
  .scrollbar-hidden {
    scrollbar-width: none;          /* Firefox */
    -ms-overflow-style: none;       /* IE/Edge */
    &::-webkit-scrollbar { display: none; } /* Chrome/Safari */
  }
}
```

**Step 2: Verify build**

Run: `pnpm build`
Expected: Clean build.

**Step 3: Commit**

```bash
git add apps/docs/app/globals.css
git commit -m "feat(docs): add scrollbar-hidden utility class"
```

---

### Task 2.2: Restructure sidebar data model

The sidebar currently uses a `NavItem` type with `children` for collapsible groups. The new flat list model needs a different structure: categories with items, all always visible.

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx` (data section, lines 1-171)

**Step 1: Redefine the data model**

Replace the `NavItem` interface and all item arrays with a flat category-based model:

```ts
interface SidebarCategory {
  label: string          // Non-interactive heading text
  items: SidebarLink[]
}

interface SidebarLink {
  label: string
  href: string
}

type SectionKey = 'foundation' | 'components' | 'forms'
```

Foundation categories (flatten the old parent→children structure):

```ts
const FOUNDATION_CATEGORIES: SidebarCategory[] = [
  {
    label: 'Colors',
    items: [
      { label: 'Overview',      href: '/foundation/colors/overview' },
      { label: 'Tokens',        href: '/foundation/colors/tokens' },
      { label: 'Usage',         href: '/foundation/colors/usage' },
      { label: 'Primitives',    href: '/foundation/colors/primitives' },
      { label: 'Accessibility', href: '/foundation/colors/accessibility' },
    ],
  },
  {
    label: 'Typography',
    items: [
      { label: 'Overview',   href: '/foundation/typography/overview' },
      { label: 'Fonts',      href: '/foundation/typography/fonts' },
      { label: 'Type Scale', href: '/foundation/typography/scale' },
      { label: 'Usage',      href: '/foundation/typography/usage' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { label: 'Overview',     href: '/foundation/layout/overview' },
      { label: 'Breakpoints',  href: '/foundation/layout/breakpoints' },
      { label: 'Spacing',      href: '/foundation/layout/spacing' },
      { label: 'Usage',        href: '/foundation/layout/usage' },
    ],
  },
  {
    label: 'Iconography',
    items: [
      { label: 'Overview',      href: '/foundation/iconography/overview' },
      { label: 'Library',       href: '/foundation/iconography/library' },
      { label: 'Sizes',         href: '/foundation/iconography/sizes' },
      { label: 'Usage',         href: '/foundation/iconography/usage' },
      { label: 'Accessibility', href: '/foundation/iconography/accessibility' },
    ],
  },
]
```

Component categories (the old `children` arrays become `items`; single-item groups like "Icon" get their own category):

```ts
const COMPONENT_CATEGORIES: SidebarCategory[] = [
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
      { label: 'IconButton', href: '/components/icon-button' },
      { label: 'LinkButton', href: '/components/link-button' },
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
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'Avatar',    href: '/components/avatar' },
      { label: 'Badge',     href: '/components/badge' },
      { label: 'Card',      href: '/components/card' },
      { label: 'Table',     href: '/components/table' },
    ],
  },
  {
    label: 'Overlays',
    items: [
      { label: 'Dialog',   href: '/components/dialog' },
      { label: 'Dropdown', href: '/components/dropdown' },
      { label: 'Popover',  href: '/components/popover' },
      { label: 'Tooltip',  href: '/components/tooltip' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { label: 'Pagination',   href: '/components/pagination' },
      { label: 'Tabs',         href: '/components/tabs' },
      { label: 'ToggleGroup',  href: '/components/toggle-group' },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { label: 'Alert',          href: '/components/alert' },
      { label: 'LoadingSpinner', href: '/components/loading-spinner' },
      { label: 'Skeleton',       href: '/components/skeleton' },
      { label: 'StatusView',     href: '/components/status-view' },
      { label: 'Toast',          href: '/components/toast' },
    ],
  },
  {
    label: 'Utilities',
    items: [
      { label: 'OnlyMobileView', href: '/components/only-mobile-view' },
    ],
  },
  {
    label: 'Date & Time',
    items: [
      { label: 'Calendar',   href: '/components/calendar' },
      { label: 'DatePicker', href: '/components/datepicker' },
    ],
  },
]
```

Forms categories (flat, single category):

```ts
const FORMS_CATEGORIES: SidebarCategory[] = [
  {
    label: 'Forms',
    items: [
      { label: 'Overview',       href: '/forms/overview' },
      { label: 'useForm',        href: '/forms/use-form' },
      { label: 'Form Component', href: '/forms/form-component' },
      { label: 'Validation',     href: '/forms/validation' },
      { label: 'Hooks',          href: '/forms/hooks' },
      { label: 'Examples',       href: '/forms/examples' },
    ],
  },
]
```

Section map:

```ts
const SECTIONS: Record<SectionKey, SidebarCategory[]> = {
  foundation: FOUNDATION_CATEGORIES,
  components: COMPONENT_CATEGORIES,
  forms: FORMS_CATEGORIES,
}
```

---

### Task 2.3: Rewrite Sidebar component rendering

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx` (render section, lines 173-283)

**Step 1: Rewrite the Sidebar component**

Replace the entire `Sidebar` function with the new flat list rendering:

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconButton } from '@umichkisa-ds/web'

// ... (data types and arrays from Task 2.2 above) ...

interface SidebarProps {
  open: boolean
  onClose: () => void
}

function getSectionKey(pathname: string): SectionKey | null {
  if (pathname.startsWith('/foundation')) return 'foundation'
  if (pathname.startsWith('/components')) return 'components'
  if (pathname.startsWith('/forms')) return 'forms'
  return null
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const sectionKey = getSectionKey(pathname)

  // On section pages: show that section's categories
  // On other pages (homepage, etc.): show all sections (for mobile nav)
  const categories = sectionKey
    ? SECTIONS[sectionKey]
    : [
        ...SECTIONS.foundation,
        ...SECTIONS.components,
        ...SECTIONS.forms,
      ]

  // Desktop: only visible on section pages
  const desktopVisibility = sectionKey ? 'lg:translate-x-0' : 'lg:-translate-x-full'

  return (
    <>
      {/* Backdrop: mobile-only */}
      <div
        className={`fixed inset-0 bg-overlay z-[var(--docs-z-backdrop)] transition-opacity duration-200 ${
          open ? 'opacity-100 lg:hidden' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        id="docs-sidebar"
        className={`fixed top-[var(--docs-header-h)] left-0 bottom-0
          w-[var(--docs-sidebar-w)] bg-surface border-r border-border
          overflow-y-auto scrollbar-hidden
          z-[var(--docs-z-sidebar)]
          flex flex-col
          transition-transform duration-200 ease-in-out
          ${desktopVisibility}
          ${open ? 'translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.08)]' : '-translate-x-full lg:shadow-none'}`}
        aria-label="Documentation navigation"
      >
        {/* Close button: mobile-only, top-right of sidebar */}
        <div className="flex lg:hidden justify-end px-4 pt-3">
          <IconButton
            icon="x"
            variant="tertiary"
            size="sm"
            aria-label="Close navigation menu"
            onClick={onClose}
          />
        </div>

        <div className="px-6 py-4 flex flex-col gap-6">
          {categories.map((category) => (
            <div key={category.label}>
              {/* Category heading — non-interactive */}
              <span className="block type-body font-sejong-bold text-foreground mb-1 px-3">
                {category.label}
              </span>

              {/* Nav links — indented under heading */}
              <div className="flex flex-col">
                {category.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block py-2 px-3 ml-3 rounded-md
                        type-body font-sejong-bold
                        transition-colors duration-150
                        focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px]
                        ${isActive
                          ? 'text-foreground bg-surface-subtle'
                          : 'text-muted-foreground hover:text-foreground hover:bg-brand-accent-subtle'
                        }`}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
```

**Step 2: Verify build and visual check**

Run: `pnpm build && pnpm typecheck`
Expected: Clean build.

Manual check:
- Desktop section pages: sidebar shows flat list with category headings + indented links
- Desktop homepage: no sidebar visible
- Mobile homepage: hamburger opens drawer with all sections' navigation
- Mobile section pages: hamburger opens drawer with that section's navigation
- Active link has `bg-surface-subtle` background
- Hover shows light maize (`bg-brand-accent-subtle`) background
- Scrollbar is hidden but sidebar is scrollable
- Close button (X) visible on mobile drawer
- Transitions are smooth (200ms slide, 150ms colors)

**Step 3: Commit**

```bash
git add apps/docs/components/Sidebar.tsx
git commit -m "feat(docs): redesign sidebar with flat list, DS components, hidden scrollbar"
```

---

### Task 2.4: Final cleanup and verification

**Files:**
- Possibly modify: `apps/docs/app/globals.css` (if any unused CSS vars remain)

**Step 1: Full build + typecheck**

Run: `pnpm build && pnpm typecheck`
Expected: Both pass cleanly.

**Step 2: Manual responsive testing checklist**

Test at these widths:
- **< 640px**: Logo image only (no text), hamburger visible, no badge, drawer works
- **640px–1024px**: Logo + "KISA Design System", hamburger visible, no badge, drawer works
- **≥ 1024px on section page**: Full header nav, persistent sidebar, no hamburger
- **≥ 1024px on homepage**: Full header nav, no sidebar, no hamburger

**Step 3: Commit any cleanup**

```bash
git add -A
git commit -m "chore(docs): header & sidebar redesign cleanup"
```

---

## Summary

| Phase | Tasks | Key Changes |
|---|---|---|
| Pre-req | Add `menu` icon | 1 file |
| Phase 1 | 1.1–1.2 | Header: 64px, DS components (IconButton, Badge), responsive breakpoints, always-visible hamburger |
| Phase 2 | 2.1–2.4 | Sidebar: flat list, category headings, `type-body` typography, `bg-brand-accent-subtle` hover, hidden scrollbar, mobile close button, all-sections fallback for non-section pages |

Total files modified: ~5 (`registry.ts`, `globals.css`, `Header.tsx`, `DocsShell.tsx`, `DocsLayout.tsx`, `Sidebar.tsx`)
