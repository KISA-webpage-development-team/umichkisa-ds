# Prev/Next Page Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `ds-constrained-execution` to implement this plan task-by-task. Run `ds-review` agent after every task that modifies `.tsx` files.

**Goal:** Add a prev/next page navigation row at the bottom of every docs section page, driven by a single flat sequence across Foundation → Components → Forms.

**Architecture:** Extract the ordered sidebar nav data from `Sidebar.tsx` into a new shared module `apps/docs/lib/nav.ts` (single source of truth). Add a `flattenNav()` helper that produces a flat ordered list including the `/foundation` and `/components` index pages, and a `getPrevNext(pathname)` helper. Create a new `PrevNext` client component that reads the current pathname and renders two `text-link`-styled page labels side-by-side in a `<nav aria-label="Pagination navigation">` landmark. Inject it once in `DocsLayout.tsx` — every section page under `/foundation/*`, `/components/*`, `/forms/*` gets it automatically, homepage unaffected. Refactor `Sidebar.tsx` in the same PR to consume `lib/nav.ts` so the two components can never drift.

**Tech Stack:** Next.js 15 App Router, `next/link`, `usePathname`, Tailwind v4, DS semantic tokens (`text-link`, `text-brand-primary`, `type-body`).

**Reference files:**
- `apps/docs/components/Sidebar.tsx` — source of nav data to extract (lines 23–165)
- `apps/docs/components/DocsLayout.tsx` — injection point
- `apps/docs/components/Footer.tsx` — link style reference (`text-link hover:text-brand-primary`)
- `apps/docs/app/foundation/layout.tsx`, `apps/docs/app/components/layout.tsx`, `apps/docs/app/forms/layout.tsx` — all three wrap children in `<DocsLayout>`, confirming single injection point
- `apps/docs/tsconfig.json` — path alias `@/*` maps to `apps/docs/` root, so `@/lib/nav` is the import path
- `apps/docs/lib/` — already exists (`cn.ts`, `highlight.ts`, `slug.ts`); add `nav.ts` alongside

**Design rationale (for context, not for code):**
- Matches the shadcn/Radix/Tailwind-docs pattern but stripped down: no border-top, no arrows, no eyebrow "Previous"/"Next" labels, no card chrome. Just two text-link-styled page labels.
- `mt-16` separation chosen because it's larger than any intra-page heading rhythm (`mt-8` max for h3), clearly punctuating "page content ends here."
- Side-by-side at all viewports is safe: the longest label pair (`LoadingSpinner` + `OnlyMobileView`, both 14 chars) at `type-body` (16px Pretendard) uses ~262px of 327px available at 375px mobile — comfortable margin, no wrap.
- `<nav aria-label="Pagination navigation">` landmark is required because `Sidebar.tsx` already uses `<nav aria-label="Documentation navigation">` — unlabeled duplicate nav landmarks confuse assistive tech.

---

## Task 1: Create `apps/docs/lib/nav.ts`

**Files:**
- Create: `apps/docs/lib/nav.ts`

This task is a plain `.ts` file — **no `.tsx`, no DS review needed**. It is pure data + helper functions.

**Step 1: Create the file with types, categories, index pages, and helpers**

Move the three `*_CATEGORIES` arrays and the `SidebarCategory` / `SidebarLink` types verbatim from `Sidebar.tsx` lines 9–17 and 23–165 into this new file. Add `INDEX_PAGES`, `flattenNav()`, and `getPrevNext()`.

```ts
/* ── Data types ──────────────────────────────────────────────────── */

export interface SidebarLink {
  label: string
  href: string
}

export interface SidebarCategory {
  label: string
  items: SidebarLink[]
}

/* ── Navigation data ─────────────────────────────────────────────── */

export const FOUNDATION_CATEGORIES: SidebarCategory[] = [
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

export const COMPONENT_CATEGORIES: SidebarCategory[] = [
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

export const FORMS_CATEGORIES: SidebarCategory[] = [
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

/* ── Section index pages (not listed in Sidebar as items, but part of the linear flow) ── */

const FOUNDATION_INDEX: SidebarLink = { label: 'Foundation', href: '/foundation' }
const COMPONENTS_INDEX: SidebarLink = { label: 'Components', href: '/components' }

/* ── Flat linear sequence across all three sections ──────────────── */

function flattenCategories(categories: SidebarCategory[]): SidebarLink[] {
  return categories.flatMap((c) => c.items)
}

export function flattenNav(): SidebarLink[] {
  return [
    FOUNDATION_INDEX,
    ...flattenCategories(FOUNDATION_CATEGORIES),
    COMPONENTS_INDEX,
    ...flattenCategories(COMPONENT_CATEGORIES),
    ...flattenCategories(FORMS_CATEGORIES),
  ]
}

/* ── Prev/next lookup ─────────────────────────────────────────────── */

export interface PrevNextResult {
  prev: SidebarLink | null
  next: SidebarLink | null
}

export function getPrevNext(pathname: string): PrevNextResult {
  const flat = flattenNav()
  const idx = flat.findIndex((link) => link.href === pathname)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  }
}
```

**Step 2: Verify the file compiles**

Run: `pnpm --filter @umichkisa-ds/docs typecheck` (or `pnpm typecheck` from repo root)
Expected: PASS — no type errors.

**Step 3: Commit**

```bash
git add apps/docs/lib/nav.ts
git commit -m "feat(docs): add nav data module with flat sequence and getPrevNext helper"
```

---

## Task 2: Refactor `Sidebar.tsx` to consume `lib/nav.ts`

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

**Step 1: Delete the in-file data and types, replace with an import**

Remove lines 9–17 (the `SidebarCategory` and `SidebarLink` interfaces) and lines 23–165 (the three `*_CATEGORIES` constants). Replace them with an import at the top of the file:

```tsx
import {
  FOUNDATION_CATEGORIES,
  COMPONENT_CATEGORIES,
  FORMS_CATEGORIES,
  type SidebarCategory,
} from '@/lib/nav'
```

Leave everything else in `Sidebar.tsx` unchanged:
- `SectionKey` type (line 19)
- `SECTIONS` record (lines 167–171)
- `ALL_CATEGORIES` (lines 173–177)
- `getSectionKey` helper (lines 181–186)
- The `Sidebar` component itself (lines 188–343)

`SidebarLink` is not referenced by name anywhere else in `Sidebar.tsx` (only `SidebarCategory` is), so it does not need to be re-imported — but exporting it from `lib/nav.ts` (Task 1) still makes sense for future consumers.

**Step 2: Verify the sidebar still renders correctly**

Run: `pnpm typecheck`
Expected: PASS — no type errors.

Run: `pnpm build`
Expected: PASS — build succeeds.

**Step 3: DS review gate**

Run `ds-review` agent on `apps/docs/components/Sidebar.tsx`. This is a refactor with zero visual or behavioral change, so the review should be clean. Expected: PASS with no findings.

**Step 4: Browser smoke test**

Open the devtunnels URL. Verify the sidebar still works:
- Navigate to `/foundation/colors/overview` — Colors section expanded, "Overview" highlighted with `brand-accent-subtle` background.
- Navigate to `/components/button` — Components section expanded, "Button" highlighted.
- Click another sidebar link — active state updates.
- Mobile (375px): open the hamburger menu, verify all three sections are listed and the current section is expanded.

**Step 5: Commit**

```bash
git add apps/docs/components/Sidebar.tsx
git commit -m "refactor(docs): consume nav data from lib/nav.ts in Sidebar"
```

---

## Task 3: Create `PrevNext.tsx` component

**Files:**
- Create: `apps/docs/components/PrevNext.tsx`

**Step 1: Write the component**

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getPrevNext } from '@/lib/nav'

export function PrevNext() {
  const pathname = usePathname()
  const { prev, next } = getPrevNext(pathname)

  if (!prev && !next) return null

  const justify =
    prev && next ? 'justify-between' : next ? 'justify-end' : 'justify-start'

  const linkClass =
    'type-body text-link hover:text-brand-primary hover:underline ' +
    'focus-visible:outline focus-visible:outline-2 ' +
    'focus-visible:outline-brand-primary focus-visible:outline-offset-2 ' +
    'rounded-sm'

  return (
    <nav
      aria-label="Pagination navigation"
      className={`mt-16 flex ${justify} gap-4`}
    >
      {prev && (
        <Link href={prev.href} className={linkClass}>
          {prev.label}
        </Link>
      )}
      {next && (
        <Link href={next.href} className={linkClass}>
          {next.label}
        </Link>
      )}
    </nav>
  )
}
```

Notes on the implementation:
- `'use client'` is required because we call `usePathname()`.
- `rounded-sm` is added so the `focus-visible` outline sits cleanly around the link text (matches the Sidebar pattern).
- `gap-4` (16px) keeps the two links from touching when labels are long on narrow viewports.
- No arrows, no eyebrow labels, no border — intentional per design decision (see header rationale).
- Returns `null` when both `prev` and `next` are null (orphan pathnames, or a future page not yet in `lib/nav.ts`).

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: PASS.

**Step 3: DS review gate**

Run `ds-review` agent on `apps/docs/components/PrevNext.tsx`. Verify:
- Uses `text-link` for link color (DS_CONSTRAINTS: "Must: Use `--color-link` for all hyperlinks").
- Uses `text-brand-primary` for hover state (not brand-accent).
- Uses `type-body` (a DS type token), not a raw `text-[…]` utility.
- Focus-visible uses `outline-brand-primary` — acceptable for text links (the dual-ring rule applies to buttons and icon-only interactive elements, not body-prose links).
- Uses `mt-16`, `flex`, `justify-*`, `gap-4` — plain layout utilities, no constraint implications.
- Uses semantic `<nav>` landmark with `aria-label`.

Expected: PASS with no findings.

**Step 4: Commit**

```bash
git add apps/docs/components/PrevNext.tsx
git commit -m "feat(docs): add PrevNext page navigation component"
```

---

## Task 4: Inject `<PrevNext />` into `DocsLayout.tsx`

**Files:**
- Modify: `apps/docs/components/DocsLayout.tsx`

**Step 1: Import and render after children**

Current file (7 lines):

```tsx
export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:ml-[var(--docs-sidebar-w)] p-6 lg:p-12">
      {children}
    </div>
  )
}
```

After:

```tsx
import { PrevNext } from '@/components/PrevNext'

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:ml-[var(--docs-sidebar-w)] p-6 lg:p-12">
      {children}
      <PrevNext />
    </div>
  )
}
```

Note: `DocsLayout` stays a **server component**. It renders the `PrevNext` client component as a child — this is a valid Next.js App Router pattern (server components can render client components; the reverse is restricted).

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: PASS.

**Step 3: DS review gate**

Run `ds-review` agent on `apps/docs/components/DocsLayout.tsx`. This is a two-line addition (import + JSX element). Expected: PASS with no findings.

**Step 4: Commit**

```bash
git add apps/docs/components/DocsLayout.tsx
git commit -m "feat(docs): inject PrevNext into DocsLayout for all section pages"
```

---

## Task 5: Build, typecheck, and browser smoke test

**Step 1: Full build and typecheck**

Run: `pnpm build && pnpm typecheck`
Expected: BOTH PASS.

**Step 2: Browser smoke test via devtunnels URL**

Open the devtunnels URL (NEVER localhost per project memory). Visit each of these pages and verify the prev/next row:

| Page | Expected Prev | Expected Next |
|---|---|---|
| `/foundation` | (none — `justify-end`) | `Overview` (→ `/foundation/colors/overview`) |
| `/foundation/colors/overview` | `Foundation` (← `/foundation`) | `Tokens` |
| `/foundation/iconography/accessibility` (last Foundation page) | `Usage` | `Components` (→ `/components`) |
| `/components` | `Accessibility` (← `/foundation/iconography/accessibility`) | `Icon` |
| `/components/icon` | `Components` | `Button` |
| `/components/datepicker` (last Components sidebar item) | `Calendar` | `Overview` (→ `/forms/overview`) |
| `/forms/overview` | `DatePicker` | `useForm` |
| `/forms/examples` (last page overall) | `Hooks` | (none — `justify-start`) |

For each page verify:
- `mt-16` vertical separation between page content and prev/next.
- Link text is `text-link` blue at rest.
- Hover: text turns `brand-primary` and underlines.
- Keyboard focus: outline ring appears around the link.
- `/foundation` shows only the Next link right-aligned.
- `/forms/examples` shows only the Prev link left-aligned.

**Step 3: Mobile layout smoke test**

At 375px viewport (Chrome DevTools device toolbar):
- Visit `/components/loading-spinner` — verify prev (`Alert`) and next (`Skeleton`) sit side-by-side without wrapping.
- Visit `/components/only-mobile-view` — verify prev (`Toast`) and next (`Calendar`) fit cleanly.
- Visit `/forms/form-component` — verify "useForm" and "Validation" fit cleanly.
- No horizontal scroll on any of the above.

**Step 4: Homepage check**

Visit `/` — verify prev/next does NOT appear (homepage uses its own layout, not `DocsLayout`).

**Step 5: Screen reader landmark check (optional but recommended)**

In Chrome DevTools Accessibility pane or with a screen reader: verify two `<nav>` landmarks appear on a section page — "Documentation navigation" (sidebar) and "Pagination navigation" (prev/next).

---

## Task 6: Update CODEBASE.md and check off the TODO

**Files:**
- Modify: `docs/CODEBASE.md`
- Modify: `docs/TODO.md`

**Step 1: Update `docs/CODEBASE.md`**

Add a brief note to whatever section documents the docs app structure. Mention:
- New `apps/docs/lib/nav.ts` as the single source of truth for docs nav ordering.
- New `apps/docs/components/PrevNext.tsx` client component.
- `DocsLayout.tsx` now automatically renders `<PrevNext />` below every section page.

**Step 2: Check off the TODO**

In `docs/TODO.md`, change line 193 from:
```
- [ ] Add prev/next page navigation to docs page footer
```
to:
```
- [x] Add prev/next page navigation to docs page footer
```

**Step 3: Commit**

```bash
git add docs/CODEBASE.md docs/TODO.md
git commit -m "docs: mark prev/next page navigation done"
```

---

## Acceptance criteria

- [ ] `apps/docs/lib/nav.ts` exists and exports `FOUNDATION_CATEGORIES`, `COMPONENT_CATEGORIES`, `FORMS_CATEGORIES`, `SidebarCategory`, `SidebarLink`, `flattenNav()`, `getPrevNext()`.
- [ ] `Sidebar.tsx` imports its category data from `@/lib/nav` (no hardcoded category arrays remain in `Sidebar.tsx`).
- [ ] `apps/docs/components/PrevNext.tsx` exists as a `'use client'` component.
- [ ] `DocsLayout.tsx` renders `<PrevNext />` after `{children}`.
- [ ] `pnpm build` and `pnpm typecheck` both pass.
- [ ] Every `.tsx` modification passed a `ds-review` gate.
- [ ] Prev/next renders correctly on all pages in the Task 5 smoke-test table.
- [ ] `/foundation` has only a Next link (right-aligned).
- [ ] `/forms/examples` has only a Prev link (left-aligned).
- [ ] Homepage `/` does not render prev/next.
- [ ] Mobile (375px): prev/next stays side-by-side without wrap or horizontal scroll.
- [ ] Two `<nav>` landmarks on section pages: "Documentation navigation" (sidebar) and "Pagination navigation" (prev/next).
- [ ] `docs/CODEBASE.md` updated.
- [ ] `docs/TODO.md` line 193 checked off.

---

## Out of scope

- Homepage `/` — uses its own layout, intentionally excluded.
- Global `Footer.tsx` copyright bar — untouched; prev/next sits above it.
- Any border or separator between prev/next and the Footer — intentionally omitted per design decision.
- `/components` index page content polish — tracked separately at `docs/TODO.md` line 174.
- Arrows, chevrons, "Previous"/"Next" eyebrow labels — intentionally omitted per design decision.
- Client-app `packages/web/` — this is docs-app chrome only.
