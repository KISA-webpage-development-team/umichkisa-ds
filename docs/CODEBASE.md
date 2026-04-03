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
    ├── app/               # Routes (all pages are inline TSX)
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
| Radio | `/components/radio` | ✅ Complete |
| Switch | `/components/switch` | ✅ Complete |
| FormItem | `/components/form-item` | ✅ Complete |
| Avatar | `/components/avatar` | ✅ Complete |
| Container | `/components/container` | ✅ Complete |
| Grid | `/components/grid` | ✅ Complete |
| Forms Overview | `/components/forms` | ✅ Complete — compositional guide + realistic form demo |
| Tooltip | `/components/tooltip` | ✅ Complete |
| Popover | `/components/popover` | ✅ Complete |
| Dialog | `/components/dialog` | ✅ Complete |
| Dropdown | `/components/dropdown` | ✅ Complete |
| Tabs | `/components/tabs` | ✅ Complete |

All docs pages (foundation and component) use `<Container size="md" as="article">` as their page wrapper. API Reference tables follow a standardized pattern (Container page is the gold standard). MDX infrastructure has been fully removed — all content is inline TSX with DS type tokens.

### Sidebar Organization

The sidebar uses collapsible categories that auto-expand based on the current route. Categories are defined in `apps/docs/components/Sidebar.tsx` as `COMPONENT_CATEGORIES`. Only categories with ≥1 shipped component are shown. See `docs/TODO.md` for the full category mapping.

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
| `Checkbox` | form | ✅ | Native hidden input + styled span indicator via peer selectors, `invalid` prop, `text` string prop for inline label. Brand colors: `bg-brand-primary` checked + `text-brand-foreground` checkmark. |
| `RadioGroup` / `RadioItem` | form | ✅ | Radix compound component (`@radix-ui/react-radio-group`). `text` string prop for inline label. `invalid` prop on group propagates via `data-invalid`. Brand colors: `bg-brand-primary` checked + `bg-surface` white dot (fill-based). Simplified border-color focus. |
| `Switch` | form | ✅ | Native `<input type="checkbox" role="switch">` with peer-styled track + thumb. Two sizes (default/sm), `text` string prop (size-mapped: default→`type-body-sm`, sm→`type-caption`). Brand colors: `bg-brand-primary` track + `bg-surface` white thumb (fill-based). |
| `Label` | form | ✅ | `type-label` + `text-foreground`, optional `required` asterisk with `text-error`. `cn()` only, no CVA. |
| `FormItem` | form | ✅ | Presentation-only layout wrapper (label, children, description, error). Renders Label internally, accepts any form control as children. `cn()` only, no validation logic. |
| `Divider` | divider | ✅ | Unified from HorizontalDivider + VerticalDivider. Semantic `<hr>`, `orientation` prop, `--color-border` token. |
| `Grid` | layout | ✅ | Responsive equal-width column grid. `columns` prop (number or `{ base, md, lg }` responsive object, max 6). `gap` prop using DS spacing tiers (element/component/section). `cn()` only, no CVA. |
| `ToggleBar` | layout | ✅ | |
| `LoadingSpinner` | feedback | ✅ | |
| `NotFound` | feedback | ✅ | |
| `NotAuthorized` | feedback | ✅ | |
| `NotLogin` | feedback | ✅ | |
| `UnexpectedError` | feedback | ✅ | |
| `Dialog` | overlay | ✅ | Radix compound component (Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription, DialogFooter). 4 sizes (sm/md/lg/full). Built-in close button with `showCloseButton` opt-out. Custom keyframe animations (overlay fade + content slide-up). `cn()` only. |
| `Dropdown` | overlay | ✅ | Radix compound component (Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownGroup, DropdownSeparator). `variant` prop on items (default/destructive). `side`/`align`/`sideOffset` on content. Fade+zoom animations. `cn()` only. |
| `Popover` | overlay | ✅ | Uses `@radix-ui/react-popover`. Three exports (Popover, PopoverTrigger, PopoverContent). Full Radix Content props passthrough with defaults (`align="center"`, `sideOffset=4`). Fade/zoom/slide animations. `cn()` only. |
| `Tooltip` | overlay | ✅ | Uses `@radix-ui/react-tooltip`. Single wrapper API (`<Tooltip content="..."><trigger /></Tooltip>`). Brand-styled bubble (navy bg + maize text). 4 props: content, children, side, delayDuration. Provider baked in per instance. |
| `Tabs` | navigation | ✅ | Compound component (Tabs, TabsList, TabsTrigger, TabsContent). Built from scratch (no Radix). CVA on triggers (variant × size). Underline/pill variants, sm/md sizes, fullWidth, disabled triggers. Controlled + uncontrolled. Auto-selects first tab. Full keyboard nav (arrow keys, Home/End). Horizontal scroll overflow. |
| `Avatar` | avatar | ✅ | Image with fallback chain: image → initials (from `name`) → icon (`user-round`). CVA `size` variant (sm 32px / md 40px / lg 56px). Brand background (`bg-brand-primary` + `text-brand-foreground`). |
| `Container` | layout | ✅ | Page shell wrapper. CVA `size` variant (default 1536px / md 768px / sm 640px / prose ~65ch). Polymorphic `as` prop for semantic HTML elements. Responsive padding `px-4 md:px-6 lg:px-8`. |
| `Icon` | icon | ✅ | Single `<Icon name="..." />` component with static Lucide registry (26 icons: 24 Lucide + 2 custom SVG brand icons). Replaced 19 named `react-icons` components. |

### Not Yet Implemented (V1 target)
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
