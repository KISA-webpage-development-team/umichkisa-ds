# Design: Docs Site Layout & Landing Page

**Date**: 2026-03-14
**Author**: Jioh In
**Status**: Approved (UX reviewed 2026-03-14)
**References**: [LINE LDSM](https://designsystem.line.me/LDSM/foundation/), [umichkisa.com](https://umichkisa.com)

---

## Goal

Build the visual shell and landing page for `designsystem.umichkisa.com`. Two deliverables:

1. **Layout shell** — fixed top header + fixed left sidebar + scrollable content area
2. **Landing page** — branded hero with CTAs to Foundation and Components

---

## Aesthetic Direction

**Tone**: Refined institutional — clean, professional, unmistakably KISA.

The Michigan Blue + Maize palette owns the page without shouting. `SejongHospital Bold`
at hero scale is the single memorable differentiator: it ties the design system to the
KISA brand identity and signals that this is a living part of the product, not a
generic docs template.

Light theme throughout. Interior pages are pure utility; the landing page has personality.

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

The landing page is **outside** the sidebar layout. It uses the full content width (no
sidebar offset) while still under the fixed header. This matches how LINE LDSM treats its
root page differently from interior docs pages.

### Structure

```
[Hero Section — white, top-padding: 120px, centered max-w: 640px]
  Logo placeholder (48px circle, Michigan Blue)
  Headline: "KISA Design System"  (SejongHospital Bold, 72px, --color-brand-primary)
  Subline: "Component and token library for umichkisa.com"  (Arial 18px, --color-text-muted)
  Version badge pill (maize bg)

[CTA Cards — 2-column grid, max-w: 640px, mt: 56px]
  Card: Foundation →
  Card: Components →

[Feature Strip — 3-column, max-w: 640px, mt: 48px, border-top]
  Tokens  |  Accessible  |  Composable
```

### Hero

- White background, vertically centered, generous top padding (120px on desktop, 80px mobile)
- Logo: 48px circle with Michigan Blue fill + white `K` letter (SVG placeholder, swap when real logo exists)
- Headline: `SejongHospital Bold` at 72px (desktop) / 48px (mobile), `color: var(--color-brand-primary)` (#00274c)
- Subtitle: `Arial 18px`, `color: var(--color-text-muted)`, max-w 480px, mt 12px
- Version badge: inline-flex pill, maize bg, Michigan Blue text, below subtitle, mt 16px
- Subtle entrance animation: headline and badge stagger in with `opacity: 0 → 1` + `translateY(8px → 0)` over 400ms
- **Respect `prefers-reduced-motion`**: wrap all animation in `@media (prefers-reduced-motion: no-preference)` — no animation by default, only enable for users who haven't opted out

### Semantic HTML on Landing

```
<h1>  KISA Design System          ← one per page
<p>   subtitle
<h2>  Foundation                  ← CTA card titles
<h2>  Components
<p>   feature strip titles         ← NOT headings, use <p> + bold
```

### CTA Cards

Two cards side-by-side (stack on mobile):

```
┌────────────────────────────┐  ┌────────────────────────────┐
│▌ Foundation                │  │▌ Components                │
│                            │  │                            │
│  Colors · Typography ·     │  │  Buttons · Forms ·         │
│  Iconography · Layout      │  │  Feedback · Layout         │
│                            │  │                            │
│  Explore →                 │  │  Explore →                 │
└────────────────────────────┘  └────────────────────────────┘
```

- `background: white`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius-lg)`
- **4px Michigan Blue top bar**: `border-top: 4px solid var(--color-brand-primary)`
- Title: `SejongHospital Bold 18px`, `color: var(--color-text-primary)`
- Description: `Arial 14px`, `color: var(--color-text-muted)`, `mt: 8px`
- "Explore →" link: `SejongHospital Bold 14px`, `color: var(--color-brand-primary)`, bottom of card
- Hover: `transform: translateY(-2px)`, `box-shadow: 0 4px 12px rgba(0,0,0,0.08)`, 200ms ease
- **Focus**: `outline: 2px solid var(--color-brand-primary); outline-offset: 2px`
- `cursor: pointer` on the card element
- Card hover transform only fires for `prefers-reduced-motion: no-preference`

### Feature Strip

Three equal columns separated by a top border (`var(--color-border)`), padding 32px top:

Icons must be SVG (Lucide), never emoji:

| Column | Lucide Icon | Title | Body |
|---|---|---|---|
| 1 | `Palette` (20px) | Design Tokens | Three-tier OKLCH token system — primitives, semantic, component |
| 2 | `ShieldCheck` (20px) | Accessible | WCAG 2.1 AA contrast, keyboard nav, Radix primitives |
| 3 | `Puzzle` (20px) | Composable | CVA variants, tree-shakeable ESM, typed props |

Icon color: `var(--color-brand-primary)` (Michigan Blue)

- Title: `SejongHospital Bold 14px`
- Body: `Arial 13px`, `color: var(--color-text-muted)`, `mt: 4px`

---

## Files to Create / Modify

| File | Action | Notes |
|---|---|---|
| `apps/docs/public/fonts/Sejonghospital-Bold.ttf` | Copy from KISA-website | |
| `apps/docs/public/fonts/Sejonghospital-Light.ttf` | Copy from KISA-website | |
| `apps/docs/app/globals.css` | Create | Font-face declarations, CSS layout vars |
| `apps/docs/app/layout.tsx` | Modify | Add font loading, `<Header>` + `<Sidebar>` shell |
| `apps/docs/app/page.tsx` | Modify | Full landing page implementation |
| `apps/docs/components/Header.tsx` | Create | Fixed top header component |
| `apps/docs/components/Sidebar.tsx` | Create | Fixed sidebar with nav + mobile state |
| `apps/docs/components/DocsLayout.tsx` | Create | Wrapper for interior pages (adds sidebar offset) |

> **Note**: `app/layout.tsx` renders the shell unconditionally (header always visible).
> `DocsLayout.tsx` is applied via `app/foundation/layout.tsx` and `app/components/layout.tsx`
> to add the sidebar left-offset to interior pages only. The landing page (`app/page.tsx`)
> does **not** use `DocsLayout` — it renders full-width under the header.

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
- [ ] Landing page hero renders with SejongHospital Bold headline
- [ ] CTA cards link correctly to `/foundation/colors` and `/components/`
- [ ] Interior foundation/component pages have sidebar-offset layout applied
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
