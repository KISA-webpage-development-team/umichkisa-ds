# Docs Shell Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the fixed header + fixed sidebar shell for the KISA Design System docs site.

**Architecture:** A client component `DocsShell` owns sidebar open/close state and composes `Header` + `Sidebar`. `DocsLayout` wraps interior pages only (foundation/components) to apply the 240px left offset. The landing page remains full-width.

**Tech Stack:** Next.js 15 App Router, `next/font/local`, plain CSS (`globals.css`), static export (`output: "export"`).

---

## Pre-flight Facts

- Path alias `@/` maps to `apps/docs/` root (`tsconfig.json` `baseUrl: "."`)
- No test runner in `apps/docs` — verification is `pnpm typecheck` after every task
- DS token CSS variables (`--color-brand-primary`, `--color-border`, etc.) come from `@umichkisa-ds/web/dist/styles.css`
- Primitive tokens (`--primitive-michigan-maize`, `--primitive-michigan-blue`) are also available in that bundle
- Font files go in `apps/docs/app/fonts/` so `next/font/local` can reference them as `./fonts/...` from `app/layout.tsx`
- All commands run from monorepo root: `/Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds`

---

## Task 1: Copy Font Files

**Files:**
- Create dir: `apps/docs/app/fonts/`
- Create: `apps/docs/app/fonts/Sejonghospital-Bold.ttf`
- Create: `apps/docs/app/fonts/Sejonghospital-Light.ttf`

**Step 1: Create directory and copy both files**

```bash
mkdir -p apps/docs/app/fonts && \
cp ../KISA-website/KISA-frontend/apps/web/home/src/assets/fonts/Sejonghospital-Bold.ttf apps/docs/app/fonts/ && \
cp ../KISA-website/KISA-frontend/apps/web/home/src/assets/fonts/Sejonghospital-Light.ttf apps/docs/app/fonts/
```

**Step 2: Verify both files are present**

```bash
ls -lh apps/docs/app/fonts/
```

Expected:
```
Sejonghospital-Bold.ttf
Sejonghospital-Light.ttf
```

**Step 3: Commit**

```bash
git add apps/docs/app/fonts/
git commit -m "chore(docs): copy SejongHospital font files"
```

---

## Task 2: Create globals.css

**Files:**
- Create: `apps/docs/app/globals.css`

**Step 1: Create the file with this exact content**

```css
/* ── Layout Variables ──────────────────────────────────────────── */
:root {
  --docs-header-h:  60px;
  --docs-sidebar-w: 240px;

  /* z-index scale — never use values outside this set */
  --docs-z-sticky:    10;
  --docs-z-backdrop:  20;
  --docs-z-sidebar:   30;
  /* 40: reserved */
  --docs-z-header:    50;
  --docs-z-skip:     100;
}

/* ── Base ──────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: var(--color-surface);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
}

a { text-decoration: none; color: inherit; }

/* ── Skip Link ─────────────────────────────────────────────────── */
.docs-skip-link {
  position: absolute;
  left: -9999px;
  top: 16px;
  background: var(--color-brand-primary);
  color: #fff;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 700;
  z-index: var(--docs-z-skip);
}
.docs-skip-link:focus { left: 16px; }

/* ── Header ────────────────────────────────────────────────────── */
.docs-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--docs-header-h);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 16px;
  z-index: var(--docs-z-header);
}

.docs-header-left  { display: flex; align-items: center; gap: 10px; }
.docs-header-right { display: flex; align-items: center; gap: 12px; }

/* Hamburger — desktop hidden, mobile flex */
.docs-hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  padding: 0;
}
.docs-hamburger:hover         { background: var(--color-surface-subtle); }
.docs-hamburger:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}

/* Header logo */
.docs-header-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sejong-bold), Arial, sans-serif;
  font-size: 15px;
  color: var(--color-brand-primary);
  letter-spacing: -0.01em;
}

.docs-logo-circle {
  width: 28px;
  height: 28px;
  background: var(--color-brand-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: var(--font-sejong-bold), Arial, sans-serif;
  font-size: 13px;
  flex-shrink: 0;
}

/* Version badge */
.docs-version-badge {
  background: var(--primitive-michigan-maize);
  color: var(--primitive-michigan-blue);
  font-family: var(--font-sejong-bold), Arial, sans-serif;
  font-size: 11px;
  letter-spacing: 0.02em;
  padding: 3px 9px;
  border-radius: 999px;
  white-space: nowrap;
}

/* GitHub icon link */
.docs-github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  transition: color 0.15s, background 0.15s;
}
.docs-github-link:hover {
  color: var(--color-brand-primary);
  background: var(--color-surface-subtle);
}
.docs-github-link:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}

/* ── Sidebar Backdrop ──────────────────────────────────────────── */
.docs-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: var(--docs-z-backdrop);
}
.docs-backdrop[data-visible='true'] { display: block; }

/* ── Sidebar ───────────────────────────────────────────────────── */
.docs-sidebar {
  position: fixed;
  top: var(--docs-header-h);
  left: 0;
  bottom: 0;
  width: var(--docs-sidebar-w);
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
  z-index: var(--docs-z-sidebar);
  padding: 24px 0 32px;
  display: flex;
  flex-direction: column;
}

/* Nav sections */
.docs-nav-section { padding: 0 16px; }
.docs-nav-section + .docs-nav-section { margin-top: 28px; }

.docs-nav-section-label {
  display: block;
  font-family: var(--font-sejong-light), Arial, sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  padding-bottom: 8px;
}

.docs-nav-item {
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 7px 8px;
  border-radius: var(--radius-md);
  font-family: var(--font-sejong-light), Arial, sans-serif;
  font-size: 14px;
  color: var(--color-text-primary);
  transition: background 0.12s, color 0.12s;
  border-left: 2px solid transparent;
  margin-left: -2px;
}
.docs-nav-item:hover { background: var(--color-surface-muted); }
.docs-nav-item:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: -2px;
}
.docs-nav-item[data-active='true'] {
  border-left-color: var(--color-brand-primary);
  color: var(--color-brand-primary);
  font-family: var(--font-sejong-bold), Arial, sans-serif;
  padding-left: 6px;
}

/* ── Page Shell ────────────────────────────────────────────────── */
.docs-page-shell { padding-top: var(--docs-header-h); }

/* ── DocsLayout: interior page sidebar offset ──────────────────── */
.docs-content {
  margin-left: var(--docs-sidebar-w);
  padding: 48px;
  min-height: calc(100vh - var(--docs-header-h));
}
.docs-content-inner { max-width: 768px; }

/* ── Mobile (< 1024px) ─────────────────────────────────────────── */
@media (max-width: 1023px) {
  .docs-hamburger { display: flex; }

  .docs-sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.08);
  }
  .docs-sidebar[data-open='true'] { transform: translateX(0); }

  /* min 44px touch targets on mobile nav items */
  .docs-nav-item                    { min-height: 44px; padding: 12px 8px; }
  .docs-nav-item[data-active='true'] { padding-left: 6px; }

  .docs-content { margin-left: 0; padding: 24px; }
}
```

**Step 2: Verify no obvious issues by running typecheck (CSS is not typechecked, but triggers a build graph validation)**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: passes (no TS files changed yet, but confirms no pre-existing errors)

**Step 3: Commit**

```bash
git add apps/docs/app/globals.css
git commit -m "feat(docs): add globals.css with shell layout, z-index scale, responsive styles"
```

---

## Task 3: Create Header.tsx

**Files:**
- Create: `apps/docs/components/Header.tsx`

**Step 1: Create the directory if it doesn't exist**

```bash
mkdir -p apps/docs/components
```

**Step 2: Create the file**

```tsx
'use client'

import { DS_VERSION } from '@umichkisa-ds/web'
import Link from 'next/link'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="docs-header" role="banner">
      <div className="docs-header-left">
        <button
          className="docs-hamburger"
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

        <Link href="/" className="docs-header-logo">
          <div className="docs-logo-circle" aria-hidden="true">
            K
          </div>
          KISA DS
        </Link>
      </div>

      <div className="docs-header-right">
        <span className="docs-version-badge">{DS_VERSION}</span>
        <a
          href="https://github.com/umichkisa/umichkisa-ds"
          target="_blank"
          rel="noopener noreferrer"
          className="docs-github-link"
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

**Step 3: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors

**Step 4: Commit**

```bash
git add apps/docs/components/Header.tsx
git commit -m "feat(docs): add Header component"
```

---

## Task 4: Create Sidebar.tsx

**Files:**
- Create: `apps/docs/components/Sidebar.tsx`

**Step 1: Create the file**

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
      {/* Backdrop — mobile only, appears behind the open sidebar */}
      <div
        className="docs-backdrop"
        data-visible={String(open)}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        id="docs-sidebar"
        className="docs-sidebar"
        data-open={String(open)}
        aria-label="Documentation navigation"
      >
        <div className="docs-nav-section">
          <span className="docs-nav-section-label">Foundation</span>
          {FOUNDATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="docs-nav-item"
              data-active={String(pathname === item.href)}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="docs-nav-section">
          <span className="docs-nav-section-label">Components</span>
          {COMPONENT_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="docs-nav-item"
              data-active={String(pathname === item.href)}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
```

> **Why `String(open)` not `open` directly?**
> CSS attribute selector `[data-active='true']` requires a string value `"true"`, not
> a boolean attribute. Passing `data-active={open}` would render `data-active` with no
> value when false. `String(boolean)` gives `"true"` / `"false"` reliably.

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors

**Step 3: Commit**

```bash
git add apps/docs/components/Sidebar.tsx
git commit -m "feat(docs): add Sidebar component with Foundation + Components nav"
```

---

## Task 5: Create DocsShell.tsx

Owns sidebar open state. Composes Header + Sidebar. Provides skip link and `#main-content` target. Must be `'use client'` because it uses `useState`.

**Files:**
- Create: `apps/docs/components/DocsShell.tsx`

**Step 1: Create the file**

```tsx
'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <a href="#main-content" className="docs-skip-link">
        Skip to main content
      </a>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="docs-page-shell" id="main-content">
        {children}
      </div>
    </>
  )
}
```

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors

**Step 3: Commit**

```bash
git add apps/docs/components/DocsShell.tsx
git commit -m "feat(docs): add DocsShell client wrapper with sidebar open state"
```

---

## Task 6: Modify app/layout.tsx

Wire everything together: load fonts, import CSS, render DocsShell.

**Files:**
- Modify: `apps/docs/app/layout.tsx`

**Step 1: Replace the entire file**

```tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@umichkisa-ds/web/dist/styles.css'
import './globals.css'
import { DocsShell } from '@/components/DocsShell'

const sejongBold = localFont({
  src: './fonts/Sejonghospital-Bold.ttf',
  variable: '--font-sejong-bold',
  weight: '700',
  display: 'swap',
})

const sejongLight = localFont({
  src: './fonts/Sejonghospital-Light.ttf',
  variable: '--font-sejong-light',
  weight: '300',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KISA Design System',
  description: 'Component and token library for umichkisa.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${sejongBold.variable} ${sejongLight.variable}`}
    >
      <body>
        <DocsShell>{children}</DocsShell>
      </body>
    </html>
  )
}
```

> **Note on font paths:** `src: './fonts/...'` is relative to `app/layout.tsx` itself,
> which resolves to `apps/docs/app/fonts/`. This is the recommended `next/font/local` pattern.

> **Note on DS styles:** `app/page.tsx` also imports `@umichkisa-ds/web/dist/styles.css`.
> Having it in both places is harmless — Next.js deduplicates CSS in the bundle. Do NOT
> remove the import from `page.tsx` in this session.

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors

**Step 3: Commit**

```bash
git add apps/docs/app/layout.tsx
git commit -m "feat(docs): wire DocsShell and fonts into root layout"
```

---

## Task 7: Create DocsLayout.tsx

Adds the 240px sidebar offset for all interior (foundation + components) pages.

**Files:**
- Create: `apps/docs/components/DocsLayout.tsx`

**Step 1: Create the file**

```tsx
export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-content">
      <div className="docs-content-inner">{children}</div>
    </div>
  )
}
```

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors

**Step 3: Commit**

```bash
git add apps/docs/components/DocsLayout.tsx
git commit -m "feat(docs): add DocsLayout for sidebar-offset interior pages"
```

---

## Task 8: Update app/foundation/layout.tsx

Apply sidebar offset to all foundation pages.

**Files:**
- Modify: `apps/docs/app/foundation/layout.tsx`

**Step 1: Replace the entire file**

```tsx
import { DocsLayout } from '@/components/DocsLayout'

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsLayout>{children}</DocsLayout>
}
```

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/layout.tsx
git commit -m "feat(docs): apply DocsLayout to foundation section"
```

---

## Task 9: Update app/components/layout.tsx

Apply sidebar offset to all component pages.

**Files:**
- Modify: `apps/docs/app/components/layout.tsx`

**Step 1: Replace the entire file**

```tsx
import { DocsLayout } from '@/components/DocsLayout'

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsLayout>{children}</DocsLayout>
}
```

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors

**Step 3: Commit**

```bash
git add apps/docs/app/components/layout.tsx
git commit -m "feat(docs): apply DocsLayout to components section"
```

---

## Task 10: Final Verification

**Step 1: Full typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: exit 0, zero errors

**Step 2: Production build**

```bash
pnpm --filter @umichkisa-ds/docs build
```

Expected: successful static export, output in `apps/docs/out/`. Zero errors.

If the build fails, check:
- `next/font/local` path errors → verify `apps/docs/app/fonts/` exists with both TTFs
- Missing imports → check `@/components/*` paths resolve correctly

**Step 3: Dev server visual check**

```bash
pnpm --filter @umichkisa-ds/docs dev
```

Open your tunnel URL (port 3000). Check each item:

- [ ] Fixed header visible, 60px tall, full width
- [ ] Logo circle `K` + "KISA DS" text in Michigan Blue
- [ ] Maize version badge in header right
- [ ] GitHub icon in header right
- [ ] Sidebar visible on desktop (≥1024px), 240px wide
- [ ] Foundation nav group: Colors, Typography, Iconography, Layout Tokens
- [ ] Components nav group: Button, Icon, Form, Feedback
- [ ] Navigate to `/foundation/colors` → Colors nav item has Michigan Blue left border
- [ ] Foundation page content has 240px left margin (not full width)
- [ ] Landing page (`/`) is full width — no sidebar offset
- [ ] Resize browser to <1024px → hamburger appears, sidebar hidden
- [ ] Tap hamburger → sidebar slides in from left, backdrop visible
- [ ] Tap backdrop → sidebar closes
- [ ] Skip link appears on Tab keypress

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat(docs): complete layout shell — header, sidebar, DocsLayout"
```
