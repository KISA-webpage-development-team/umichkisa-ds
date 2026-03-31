# Codebase Notes (Claude Memory)

Quick-reference for AI-assisted sessions. Update when you discover something new.

---

## Monorepo Structure

```
umichkisa-ds/
├── packages/web/          # Component library (published)
│   └── src/
│       ├── components/    # All components
│       ├── fonts/         # SejongHospital-Bold.ttf, SejongHospital-Light.ttf
│       ├── tokens/        # primitives.css, semantic.css
│       ├── styles/        # index.css (entry, @font-face, type-* utilities)
│       └── index.ts       # Public exports
└── apps/docs/             # Documentation site (Next.js 15, App Router)
    ├── app/               # Routes
    ├── content/           # MDX source files
    └── components/        # Docs UI components (not exported)
```

---

## Token Architecture

Three-tier model:
1. **Primitives** → `packages/web/src/tokens/primitives.css` — raw OKLCH values
2. **Semantic** → `packages/web/src/tokens/semantic.css` — named roles (e.g. `--color-foreground`)
3. **Component** → inline in component files via CVA

Typography utility classes (`.type-display`, `.type-h1`…`.type-caption`) already defined in `packages/web/src/styles/index.css`.

All semantic color tokens are exposed as Tailwind utilities via `@theme inline` in `styles/index.css`. Use `bg-brand-primary`, `text-foreground`, `text-muted-foreground`, etc. — no raw `var()` needed in component code.

### Font Loading Architecture

SejongHospital font files (`Sejonghospital-Bold.ttf`, `Sejonghospital-Light.ttf`) live in `packages/web/src/fonts/`. Two distinct `@font-face` families are registered in `src/styles/index.css`:
- `'SejongHospital Bold'` → Bold file, `font-weight: 400` (treated as normal under its own name)
- `'SejongHospital Light'` → Light file, `font-weight: 400`

This means `--font-sejong-bold` / `--font-sejong-light` tokens work via `font-family` alone — no `font-weight` override needed at call sites.

`build:css` copies fonts to `dist/fonts/` and rewrites the URL in `dist/styles.css` from `url('../fonts/...)` to `url('./fonts/...)` for the pre-built CSS path.

The `apps/docs/app/layout.tsx` also uses `next/font/local` with `variable` to load these same fonts, which overrides the DS `:root` token via class specificity on `<html>`. This is intentional — next/font handles preloading in the docs app. External consumers (no next/font/local) rely on the DS `@font-face` directly.

---

## Docs Content Status

### Foundation (complete)
| Section | Pages | Status |
|---|---|---|
| Colors | overview, primitives, tokens, usage, accessibility | ✅ Complete |
| Typography | overview, fonts, scale, usage | ✅ Complete |
| Layout | overview, breakpoints, spacing, usage | ✅ Complete (usage is placeholder) |
| Iconography | overview, library, sizes, usage, accessibility | ✅ Complete |

### Components
| Page | Route | Status |
|---|---|---|
| Icon | `/components/icon` | ✅ Complete |
| Button | `/components/button` | ✅ Complete |
| Divider | `/components/divider` | ✅ Complete |
| LinkButton | `/components/link-button` | ✅ Complete |
| Badge | `/components/badge` | ✅ Complete |
| IconButton | `/components/icon-button` | ✅ Complete |
| Label | `/components/label` | ✅ Complete |
| Input | `/components/input` | ✅ Complete |
| Textarea | `/components/textarea` | ✅ Complete |
| Select | `/components/select` | ✅ Complete |
| Checkbox | `/components/checkbox` | ✅ Complete |
| Switch | `/components/switch` | ✅ Complete |

Note: `/components/[slug]` dynamic route also exists as a fallback for future MDX-based pages.

---

## Component Library Status (`packages/web`)

### Implemented but review required
| Component | Category | Token-Connected? | Notes |
|---|---|---|---|
| `Badge` | badge | ✅ | 7 variants (default/brand/success/warning/error/info/outline) × 2 sizes, asChild via Radix Slot, DS-compliant tokens |
| `Button` | button | ✅ | 4 variants (primary/secondary/tertiary/destructive) × 3 sizes, DS-compliant tokens, dual-ring focus |
| `IconButton` | button | ✅ | Icon-only square `<Button>` wrapper. String `icon` prop (IconName), 3 sizes (32/40/48px), `::after` touch targets, required `aria-label`. |
| `LinkButton` | button | ✅ | Reuses `buttonVariants` from Button. Extends `AnchorHTMLAttributes`. Disabled swaps to `<span>` with `role="link"`. |
| `Input` | form | ✅ | Extends `InputHTMLAttributes`, `invalid` prop for error border + `aria-invalid`, `cn()` only (no CVA), dual-ring focus, DS-compliant tokens |
| `Textarea` | form | ✅ | Extends `TextareaHTMLAttributes`, `invalid` prop, `rows=3` default, `resize-y`, `cn()` only, mirrors Input styling |
| `Select` | form | ✅ | Radix compound component (Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectSeparator). Fully styleable dropdown overlay. `cn()` only, trigger mirrors Input styling. |
| `Checkbox` | form | ✅ | Native hidden input + styled span indicator via peer selectors, `invalid` prop, `cn()` only, mirrors Input styling. `text-surface` checkmark on `bg-foreground`. |
| `Switch` | form | ✅ | Native `<input type="checkbox" role="switch">` with peer-styled track + thumb. Two sizes (default/sm), `invalid` prop, `cn()` only. Thumb grows on check (16→20px default, 10→12px sm). |
| `Label` | form | ✅ | `type-label` + `text-foreground`, optional `required` asterisk with `text-error`. `cn()` only, no CVA. |
| `FormItem` | form | ✅ | |
| `Divider` | divider | ✅ | Unified from HorizontalDivider + VerticalDivider. Semantic `<hr>`, `orientation` prop, `--color-border` token. |
| `ToggleBar` | layout | ✅ | |
| `LoadingSpinner` | feedback | ✅ | |
| `NotFound` | feedback | ✅ | |
| `NotAuthorized` | feedback | ✅ | |
| `NotLogin` | feedback | ✅ | |
| `UnexpectedError` | feedback | ✅ | |
| `Dialog` | overlay | ✅ | Uses `@radix-ui/react-dialog` |
| `Dropdown` | overlay | ✅ | Uses `@radix-ui/react-dropdown-menu` |
| `Popover` | overlay | ✅ | Uses `@radix-ui/react-popover` |
| `Icon` | icon | ✅ | Single `<Icon name="..." />` component with static Lucide registry (25 icons: 23 Lucide + 2 custom SVG brand icons). Replaced 19 named `react-icons` components. |

### Not Yet Implemented (V1 target)
- `Container`, `Grid` — specs in `content/_layout-implementation.md`
- `Card`, `ImageButton`, `ErrorBoundary`
- `OnlyMobileView`, `UnderConstruction`
- `Accordion`
- `DatePicker`, `Calendar` (deferred to v1.1)

---

## Reference: Client App

The consuming app lives at `../KISA-website/client/src/components/ui/`.
Use as a **requirements reference only** — not as an implementation template.
The client currently uses: custom CSS components + shadcn primitives (accordion, badge, card, calendar, date-picker, dialog, dropdown-menu, popover).

---

## Docs App Infrastructure

### `apps/docs/app/globals.css`
Imports the DS theme via `@import "@umichkisa-ds/web/theme.css"`. No manual `@theme` block — all design tokens come from the library's token layer.

### `apps/docs/app/layout.tsx`
No `dist/styles.css` import. Font injection handled separately (unchanged). Token layer supplied via `globals.css`.

---

## Docs UI Components (not part of the library)

Already built for the docs site itself:
`ColorSwatch`, `ColorSwatchGrid`, `ContrastTable`, `DoDont`, `Callout`, `Sidebar`, `Header`, `ComponentPreview`, `SizesExample`
Located in `apps/docs/components/`.

### Token Alignment Audit (Step 0.5)
| Component | Status | Notes |
|---|---|---|
| `DocsShell` | ✅ Clean | No raw color violations |
| `Header` | ✅ Clean | No raw color violations |
| `Sidebar` | ✅ Clean | No raw color violations |
| `Callout` | ⚠ DS gap | Uses Tailwind color utilities not yet mapped to DS semantic tokens |
| `DoDont` | ⚠ DS gap | Uses Tailwind color utilities not yet mapped to DS semantic tokens |
| `ContrastTable` | ⚠ DS gap | Uses Tailwind color utilities not yet mapped to DS semantic tokens |
| `ComponentPreview` | ✅ Clean | Uses Tailwind token utilities only |
| `SizesExample`     | ✅ Clean | Uses Tailwind token utilities only |
