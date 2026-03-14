# Design: Docs Site Layout & Landing Page

**Date**: 2026-03-14
**Author**: Jioh In
**Status**: Approved (UX reviewed 2026-03-14)
**References**: [LINE LDSM](https://designsystem.line.me/LDSM/foundation/), [umichkisa.com](https://umichkisa.com)

---

## Goal

Build the visual shell for `designsystem.umichkisa.com`. One deliverable:

1. **Layout shell** — fixed top header + fixed left sidebar + scrollable content area

The landing page (`app/page.tsx`) is **out of scope** — it will remain a placeholder
(`<main>` with "Coming soon" or the existing DS_VERSION stub) until a future session.

---

## Aesthetic Direction

**Tone**: Refined institutional — clean, professional, unmistakably KISA.

Light theme throughout. The shell (header + sidebar) carries the brand identity via
Michigan Blue and Maize. Landing page content is deferred.

---

## Font Strategy

SejongHospital TTFs exist in the KISA-website repo and must be copied:

| Source | Destination |
|---|---|
| `../KISA-website/KISA-frontend/apps/web/home/src/assets/fonts/Sejonghospital-Bold.ttf` | `apps/docs/public/fonts/Sejonghospital-Bold.ttf` |
| `../KISA-website/KISA-frontend/apps/web/home/src/assets/fonts/Sejonghospital-Light.ttf` | `apps/docs/public/fonts/Sejonghospital-Light.ttf` |

Load both via `next/font/local` in `apps/docs/app/layout.tsx`. Expose as CSS variables:

```css
--font-brand-bold:  'SejongHospitalBold', Arial, sans-serif;
--font-brand-light: 'SejongHospitalLight', Arial, sans-serif;
--font-ui:          Arial, sans-serif;
```

| Role | Font |
|---|---|
| Hero headline, page titles, card headings | `SejongHospital Bold` |
| Sidebar nav items, UI chrome, labels | `SejongHospital Light` |
| Body prose, descriptions, metadata | `Arial` |

---

## Layout Shell

### Structure

```
┌─────────────────────────────────────────────────────┐
│  [header — 60px, fixed, full width, z-50]           │
├──────────────────┬──────────────────────────────────┤
│ [sidebar 240px]  │  [content area — scrollable]     │
│  fixed, top:60px │  margin-left: 240px              │
│                  │  padding: 48px                   │
│                  │  max-width of inner: 768px        │
└──────────────────┴──────────────────────────────────┘
```

### Z-Index Scale

Defined globally to prevent stacking context conflicts:

| Layer | Value | Element |
|---|---|---|
| `z-10` | 10 | Sticky table headers, floating labels |
| `z-20` | 20 | Sidebar backdrop overlay |
| `z-30` | 30 | Sidebar drawer (mobile) |
| `z-40` | 40 | (reserved) |
| `z-50` | 50 | Fixed top header |

### Top Header (60px)

- `background: white`, `border-bottom: 1px solid var(--color-border)`
- **Left**: hamburger button (mobile only, hidden ≥1024px) + logo placeholder area
  - Hamburger must be **min 44×44px** touch target (`min-h-[44px] min-w-[44px]`)
  - Use a Lucide `Menu` SVG icon, not text or emoji
- **Right**: version badge pill + GitHub icon link (Lucide `Github` icon, 20px)
- Version badge: `background: var(--primitive-michigan-maize)`, `color: var(--primitive-michigan-blue)`, `font: SejongHospital Bold 11px`, `border-radius: 999px`, `padding: 2px 8px`
- `position: fixed; top: 0; left: 0; right: 0; z-index: 50`
- **Skip link**: first focusable element in `<body>` — visually hidden until focused:
  ```html
  <a href="#main-content" class="skip-link">Skip to main content</a>
  ```
  Styled: `position: absolute; left: -9999px` → on `:focus`: `left: 16px; top: 16px; z-index: 100`

### Sidebar (240px)

- `background: white`, `border-right: 1px solid var(--color-border)`
- `position: fixed; top: 60px; left: 0; bottom: 0; width: 240px; overflow-y: auto`
- **Top area** (40px): logo placeholder — a circle with `K` in Michigan Blue, plus "KISA DS" text in SejongHospital Bold 14px
- **Nav sections**: two groups — `Foundation` and `Components`
  - Section label: `11px uppercase letter-spacing: 0.08em color: var(--color-text-muted) font: SejongHospital Light`, 24px top padding
  - Nav items: `14px SejongHospital Light`, `color: var(--color-text-primary)`, `padding: 6px 16px`
  - **Touch target**: `min-height: 44px` on mobile (≤1024px) — increase to `padding: 12px 16px`
  - Hover: `background: var(--color-surface-muted)`
  - **Active**: `border-left: 2px solid var(--color-brand-primary)`, `padding-left: 14px`, `font: SejongHospital Bold`, `color: var(--color-brand-primary)`
  - **Focus**: `outline: 2px solid var(--color-brand-primary); outline-offset: -2px` on all nav links
- **Mobile**: hidden by default (`transform: translateX(-100%)`). Triggered by hamburger → slides in as overlay (`z-index: 30`), semi-transparent backdrop at `z-index: 20` behind it

### Foundation Nav Items

```
Foundation
  Colors
  Typography
  Iconography
  Layout Tokens

Components
  (populated dynamically from MDX slugs)
```

### Mobile Behavior

- `< 1024px`: sidebar hidden, hamburger visible in header
- Hamburger click → sidebar slides in from left (CSS transition 250ms ease)
- Clicking backdrop or nav item → closes sidebar
- No JavaScript framework needed — managed with a `useState` in a client component wrapper

---

## Landing Page

**Deferred — out of scope for this session.**

`app/page.tsx` keeps its current DS_VERSION stub. No hero, no CTA cards, no feature
strip. Content will be designed in a future session.

---

## Files to Create / Modify

| File | Action | Notes |
|---|---|---|
| `apps/docs/public/fonts/Sejonghospital-Bold.ttf` | Copy from KISA-website | |
| `apps/docs/public/fonts/Sejonghospital-Light.ttf` | Copy from KISA-website | |
| `apps/docs/app/globals.css` | Create | Font-face declarations, CSS layout vars |
| `apps/docs/app/layout.tsx` | Modify | Add font loading, `<Header>` + `<Sidebar>` shell |
| `apps/docs/app/page.tsx` | No change | Keep existing DS_VERSION placeholder |
| `apps/docs/components/Header.tsx` | Create | Fixed top header component |
| `apps/docs/components/Sidebar.tsx` | Create | Fixed sidebar with nav + mobile state |
| `apps/docs/components/DocsLayout.tsx` | Create | Wrapper for interior pages (adds sidebar offset) |

> **Note**: `app/layout.tsx` renders the shell unconditionally (header always visible).
> `DocsLayout.tsx` is applied via `app/foundation/layout.tsx` and `app/components/layout.tsx`
> to add the sidebar left-offset to interior pages. The landing page (`app/page.tsx`)
> is full-width under the header — no sidebar offset.

---

## Implementation Notes

### Font Loading

```tsx
// apps/docs/app/layout.tsx
import localFont from 'next/font/local'

const sejongBold = localFont({
  src: '../public/fonts/Sejonghospital-Bold.ttf',
  variable: '--font-sejong-bold',
})
const sejongLight = localFont({
  src: '../public/fonts/Sejonghospital-Light.ttf',
  variable: '--font-sejong-light',
})
```

Apply both `variable` classnames to `<html>`.

### Mobile Sidebar

`Sidebar.tsx` is a client component. State lives here:

```tsx
const [open, setOpen] = useState(false)
// Header receives onMenuClick prop → calls setOpen(true)
// Or: lift state to layout, pass down
```

Simpler: use a CSS-only approach with a hidden checkbox + label for the hamburger.
Avoid if it adds complexity — a simple `useState` in a shared client wrapper is fine.

### No Dark Mode

Light theme only for this session. No dark mode tokens or `prefers-color-scheme` handling.

---

## Success Criteria

### Functional
- [ ] Font files copied, fonts load with zero FOUT (next/font handles this)
- [ ] Header renders fixed at 60px, full width
- [ ] Sidebar renders fixed at 240px, below header, with correct nav groups
- [ ] Active route highlighted in sidebar (Michigan Blue left border)
- [ ] Mobile hamburger toggles sidebar drawer correctly
- [ ] Interior foundation/component pages have sidebar-offset layout applied
- [ ] `app/page.tsx` unchanged (DS_VERSION placeholder still renders)
- [ ] `pnpm build` passes with no TypeScript errors

### Accessibility (from UX review)
- [ ] Skip link present and functional for keyboard users
- [ ] All interactive elements have visible focus rings (Michigan Blue outline)
- [ ] Hamburger button is min 44×44px
- [ ] Mobile sidebar nav items are min 44px tall
- [ ] Feature strip uses Lucide SVG icons (no emojis)
- [ ] Landing page has exactly one `<h1>`, CTA titles are `<h2>`
- [ ] Hero animation is wrapped in `prefers-reduced-motion: no-preference`
- [ ] CTA card hover transform also gated on `prefers-reduced-motion`
- [ ] All icon-only buttons have `aria-label`
- [ ] No arbitrary z-index values — use defined scale (10/20/30/50)
