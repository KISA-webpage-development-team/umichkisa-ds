# Tailwind CSS Migration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the plain CSS shell (`globals.css` `.docs-*` classes) with Tailwind v4 utility classes inlined into JSX.

**Architecture:** Install Tailwind v4 + `@tailwindcss/postcss` in `apps/docs`. Slim `globals.css` down to: layout CSS variables + `@import "tailwindcss"` + `@theme inline {}` that maps DS semantic tokens to Tailwind utilities. All visual styling moves into JSX `className` strings. No new JS utility library needed — template literals handle the simple conditional cases.

**Tech Stack:** Tailwind CSS v4, `@tailwindcss/postcss`, Next.js 15 PostCSS pipeline.

---

## Pre-flight Facts

- Path alias `@/` maps to `apps/docs/` root (`tsconfig.json` `baseUrl: "."`)
- No test runner in `apps/docs` — verification is `pnpm typecheck` + `pnpm build` after the final task
- DS token CSS variables (`--color-brand-primary`, `--color-border`, etc.) are defined by `@umichkisa-ds/web/dist/styles.css`, imported in `app/layout.tsx` before `globals.css`
- `next/font/local` registers `--font-sejong-bold` and `--font-sejong-light` as CSS variables on `<html>` at runtime
- `@theme inline` in Tailwind v4: does NOT create new CSS variables in output — it only registers utility names that reference existing CSS variables. No circularity risk.
- All commands run from monorepo root: `/Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds`

---

## Task 1: Install Tailwind v4 and Create PostCSS Config

**Files:**
- Modify: `apps/docs/package.json` (pnpm add)
- Create: `apps/docs/postcss.config.mjs`

**Step 1: Install Tailwind v4 packages into the docs app**

```bash
pnpm --filter @umichkisa-ds/docs add -D tailwindcss @tailwindcss/postcss
```

**Step 2: Create PostCSS config**

```js
// apps/docs/postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

**Step 3: Verify packages installed**

```bash
grep -E "tailwindcss|@tailwindcss" apps/docs/package.json
```

Expected: both `tailwindcss` and `@tailwindcss/postcss` appear under devDependencies.

**Step 4: Commit**

```bash
git add apps/docs/package.json apps/docs/postcss.config.mjs pnpm-lock.yaml
git commit -m "chore(docs): install Tailwind v4 + postcss plugin"
```

---

## Task 2: Slim Down globals.css

Remove all `.docs-*` component classes. Keep only: layout CSS variables, base body reset, and the skip link (which needs `left: -9999px`, a non-standard value). Add `@import "tailwindcss"` and `@theme inline {}` to expose DS tokens as Tailwind utilities.

**Files:**
- Modify: `apps/docs/app/globals.css`

**Step 1: Replace the entire file with this content**

```css
@import "tailwindcss";

/* ── DS Token → Tailwind Utility Mapping ───────────────────────── */
/*
 * @theme inline: registers utilities WITHOUT emitting new CSS vars.
 * The variables below are already defined by @umichkisa-ds/web/dist/styles.css
 * (imported in layout.tsx before this file).
 *
 * Generated utilities:
 *   --color-brand-primary  → bg-brand-primary, text-brand-primary, border-brand-primary
 *   --color-surface        → bg-surface, text-surface
 *   --color-surface-muted  → bg-surface-muted
 *   --color-surface-subtle → bg-surface-subtle
 *   --color-border         → border-border
 *   --color-text-primary   → text-text-primary
 *   --color-text-muted     → text-text-muted
 *   --color-michigan-maize → bg-michigan-maize
 *   --color-michigan-blue  → text-michigan-blue
 *   --font-sejong-bold     → font-sejong-bold
 *   --font-sejong-light    → font-sejong-light
 */
@theme inline {
  --color-brand-primary:  var(--color-brand-primary);
  --color-surface:        var(--color-surface);
  --color-surface-muted:  var(--color-surface-muted);
  --color-surface-subtle: var(--color-surface-subtle);
  --color-border:         var(--color-border);
  --color-text-primary:   var(--color-text-primary);
  --color-text-muted:     var(--color-text-muted);
  --color-michigan-maize: var(--primitive-michigan-maize);
  --color-michigan-blue:  var(--primitive-michigan-blue);
  --font-sejong-bold:     var(--font-sejong-bold);
  --font-sejong-light:    var(--font-sejong-light);
}

/* ── Layout Variables ──────────────────────────────────────────── */
/*
 * Not in @theme because they are used in calc() inside arbitrary
 * Tailwind values, e.g. min-h-[calc(100vh-var(--docs-header-h))].
 */
:root {
  --docs-header-h:  60px;
  --docs-sidebar-w: 240px;

  /* z-index scale — never use values outside this set */
  --docs-z-sticky:   10;
  --docs-z-backdrop: 20;
  --docs-z-sidebar:  30;
  /* 40: reserved */
  --docs-z-header:   50;
  --docs-z-skip:    100;
}

/* ── Base ──────────────────────────────────────────────────────── */
@layer base {
  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0;
    background: var(--color-surface);
    color: var(--color-text-primary);
    -webkit-font-smoothing: antialiased;
  }

  a { text-decoration: none; color: inherit; }
}
```

> **Note:** The skip link moves into DocsShell.tsx (Task 5) as inline Tailwind. `left-[-9999px]` is a valid Tailwind arbitrary value.

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: passes (no TS files changed).

**Step 3: Commit**

```bash
git add apps/docs/app/globals.css
git commit -m "feat(docs): replace globals.css with Tailwind v4 import + @theme inline token map"
```

---

## Task 3: Migrate Header.tsx

**Files:**
- Modify: `apps/docs/components/Header.tsx`

**Step 1: Replace the entire file**

```tsx
'use client'

import { DS_VERSION } from '@umichkisa-ds/web'
import Link from 'next/link'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 h-[var(--docs-header-h)] bg-surface border-b border-border flex items-center justify-between px-5 pl-4 z-[var(--docs-z-header)]"
      role="banner"
    >
      <div className="flex items-center gap-2.5">
        {/* Hamburger: hidden on desktop (lg+), flex on mobile */}
        <button
          className="flex lg:hidden items-center justify-center min-w-11 min-h-11 bg-transparent border-none cursor-pointer rounded-md text-text-muted p-0 hover:bg-surface-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-controls="docs-sidebar"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 font-sejong-bold text-[15px] text-brand-primary tracking-[-0.01em]"
        >
          <div
            className="w-7 h-7 bg-brand-primary rounded-full flex items-center justify-center text-white font-sejong-bold text-[13px] shrink-0"
            aria-hidden="true"
          >
            K
          </div>
          KISA Design System
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <span className="bg-michigan-maize text-michigan-blue font-sejong-bold text-[11px] tracking-[0.02em] px-[9px] py-[3px] rounded-full whitespace-nowrap">
          {DS_VERSION}
        </span>
        <a
          href="https://github.com/umichkisa/umichkisa-ds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center min-w-9 min-h-9 rounded-md text-text-muted transition-colors duration-150 hover:text-brand-primary hover:bg-surface-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
          aria-label="View source on GitHub"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.021C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </header>
  )
}
```

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors.

**Step 3: Commit**

```bash
git add apps/docs/components/Header.tsx
git commit -m "feat(docs): migrate Header to Tailwind v4 utilities"
```

---

## Task 4: Migrate Sidebar.tsx

Conditional open/close state moves from CSS data attribute selectors to template literal class switching in JSX.

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`

**Step 1: Replace the entire file**

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const FOUNDATION_ITEMS = [
  { label: 'Colors',        href: '/foundation/colors' },
  { label: 'Typography',    href: '/foundation/typography' },
  { label: 'Iconography',   href: '/foundation/iconography' },
  { label: 'Layout Tokens', href: '/foundation/layout-tokens' },
]

// Component items are placeholders — will expand as MDX content is added
const COMPONENT_ITEMS = [
  { label: 'Button',   href: '/components/button' },
  { label: 'Icon',     href: '/components/icon' },
  { label: 'Form',     href: '/components/form' },
  { label: 'Feedback', href: '/components/feedback' },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Backdrop: mobile-only, shown when open */}
      <div
        className={`fixed inset-0 bg-black/35 z-[var(--docs-z-backdrop)] ${open ? 'block lg:hidden' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/*
       * Sidebar:
       *   Desktop (lg+): always visible — lg:translate-x-0 overrides the mobile default
       *   Mobile: slides in from left when open, hidden behind viewport otherwise
       */}
      <nav
        id="docs-sidebar"
        className={`fixed top-[var(--docs-header-h)] left-0 bottom-0 w-[var(--docs-sidebar-w)] bg-surface border-r border-border overflow-y-auto z-[var(--docs-z-sidebar)] py-6 pb-8 flex flex-col transition-transform duration-[250ms] ease-in-out lg:translate-x-0 ${
          open
            ? 'translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.08)]'
            : '-translate-x-full lg:shadow-none'
        }`}
        aria-label="Documentation navigation"
      >
        <div className="px-4">
          <span className="block font-sejong-light text-[10px] uppercase tracking-[0.1em] text-text-muted pb-2">
            Foundation
          </span>
          {FOUNDATION_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center min-h-11 lg:min-h-9 py-3 lg:py-[7px] px-2 rounded-md text-sm transition-[background,color] duration-[120ms] border-l-2 -ml-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-[-2px] ${
                  isActive
                    ? 'border-brand-primary text-brand-primary font-sejong-bold pl-1.5'
                    : 'border-transparent text-text-primary font-sejong-light hover:bg-surface-muted'
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="px-4 mt-7">
          <span className="block font-sejong-light text-[10px] uppercase tracking-[0.1em] text-text-muted pb-2">
            Components
          </span>
          {COMPONENT_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center min-h-11 lg:min-h-9 py-3 lg:py-[7px] px-2 rounded-md text-sm transition-[background,color] duration-[120ms] border-l-2 -ml-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-[-2px] ${
                  isActive
                    ? 'border-brand-primary text-brand-primary font-sejong-bold pl-1.5'
                    : 'border-transparent text-text-primary font-sejong-light hover:bg-surface-muted'
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
```

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors.

**Step 3: Commit**

```bash
git add apps/docs/components/Sidebar.tsx
git commit -m "feat(docs): migrate Sidebar to Tailwind v4 utilities"
```

---

## Task 5: Migrate DocsShell.tsx and DocsLayout.tsx

Both are small. Skip link uses `left-[-9999px]` (valid Tailwind arbitrary value).

**Files:**
- Modify: `apps/docs/components/DocsShell.tsx`
- Modify: `apps/docs/components/DocsLayout.tsx`

**Step 1: Replace DocsShell.tsx**

```tsx
'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Skip link: off-screen by default, jumps into view on focus */}
      <a
        href="#main-content"
        className="absolute left-[-9999px] top-4 bg-brand-primary text-white px-4 py-2 rounded-md text-sm font-bold z-[var(--docs-z-skip)] focus:left-4"
      >
        Skip to main content
      </a>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="pt-[var(--docs-header-h)]" id="main-content">
        {children}
      </div>
    </>
  )
}
```

**Step 2: Replace DocsLayout.tsx**

```tsx
export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-0 lg:ml-[var(--docs-sidebar-w)] p-6 lg:p-12 min-h-[calc(100vh-var(--docs-header-h))]">
      <div className="max-w-3xl">{children}</div>
    </div>
  )
}
```

**Step 3: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors.

**Step 4: Commit**

```bash
git add apps/docs/components/DocsShell.tsx apps/docs/components/DocsLayout.tsx
git commit -m "feat(docs): migrate DocsShell and DocsLayout to Tailwind v4 utilities"
```

---

## Task 6: Final Verification

**Step 1: Full typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: exit 0, zero errors.

**Step 2: Production build**

```bash
pnpm --filter @umichkisa-ds/docs build
```

Expected: clean static export, zero errors. 9 static pages generated.

If the build fails, check:
- Tailwind config not picked up → verify `postcss.config.mjs` exists and `@tailwindcss/postcss` is installed
- `@theme inline` token not resolving → confirm `@umichkisa-ds/web/dist/styles.css` is imported in `layout.tsx` (it should be — don't touch it)
- Arbitrary value syntax error → check for unescaped parens in class names, e.g. `min-h-[calc(100vh-var(--docs-header-h))]`

**Step 3: Dev server visual check**

```bash
pnpm --filter @umichkisa-ds/docs dev
```

Open tunnel URL (port 3000). Verify:

- [ ] Fixed header, 60px tall, Michigan Blue logo and text
- [ ] Maize version badge in header right
- [ ] Sidebar visible on desktop (≥1024px), 240px wide
- [ ] Foundation and Components nav groups present
- [ ] Active nav item: Michigan Blue left border + bold text
- [ ] Interior pages have 240px left margin (not full-width)
- [ ] Landing page (`/`) is full-width — no sidebar offset
- [ ] Resize to <1024px → hamburger appears, sidebar hidden
- [ ] Tap hamburger → sidebar slides in, backdrop appears
- [ ] Tap backdrop → sidebar closes
- [ ] Tab key → skip link appears at top-left

**Step 4: Commit**

```bash
git add -A
git commit -m "feat(docs): complete Tailwind v4 migration for docs shell"
```
