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
├── packages/form/         # Form DX layer (published)
│   └── src/
│       ├── hooks/         # useForm, useFormField, useFormStatus
│       ├── components/    # Form compound component (Form.Input, .Textarea, etc.)
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
| Pagination | `/components/pagination` | ✅ Complete |
| Alert | `/components/alert` | ✅ Complete |
| Skeleton | `/components/skeleton` | ✅ Complete |
| LoadingSpinner | `/components/loading-spinner` | ✅ Complete |
| Toast | `/components/toast` | ✅ Complete |
| Card | `/components/card` | ✅ Complete |
| Table | `/components/table` | ✅ Complete |
| Accordion | `/components/accordion` | ✅ Complete |
| OnlyMobileView | `/components/only-mobile-view` | ✅ Complete |
| Calendar | `/components/calendar` | ✅ Complete |
| DatePicker | `/components/datepicker` | ✅ Complete |

All docs pages (foundation and component) use `<Container size="md" as="article">` as their page wrapper. API Reference tables follow a standardized pattern (Container page is the gold standard). MDX infrastructure has been fully removed — all content is inline TSX with DS type tokens.

### Forms (new top-level section)
| Page | Route | Status |
|---|---|---|
| Overview | `/forms/overview` | ✅ Complete — installation, quick start, what's inside |
| useForm | `/forms/use-form` | ✅ Complete — API, validation modes, form methods |
| Form Component | `/forms/form-component` | ✅ Complete — all 7 compound components with live demos |
| Validation | `/forms/validation` | ✅ Complete — rules API, custom validators, mode override |
| Hooks | `/forms/hooks` | ✅ Complete — useFormField, useFormStatus, decision guide |
| Examples | `/forms/examples` | ✅ Complete — 4 live interactive forms (login, profile, feedback, hooks) |

### Sidebar Organization

The sidebar uses collapsible categories that auto-expand based on the current route. Categories are defined in `apps/docs/components/Sidebar.tsx` as `COMPONENT_CATEGORIES`. Only categories with ≥1 shipped component are shown. See `docs/TODO.md` for the full category mapping.

---

## Component Library Status (`packages/web`)

### Implemented but review required
| Component | Category | Token-Connected? | Notes |
|---|---|---|---|
| `Badge` | display | ✅ | 7 variants (default/brand/success/warning/error/info/outline) × 2 sizes, asChild via Radix Slot, DS-compliant tokens |
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
| `ToggleGroup` | navigation | ✅ | Compact button-group segmented control with radiogroup semantics. `value`/`onValueChange` controlled API, `items` array with optional icons. `fullWidth` prop. Brand-colored selected state (navy bg + maize text). Roving tabindex keyboard nav. `cn()` only, no CVA. |
| `Alert` | feedback | ✅ | CVA component with 4 variants (info/success/warning/error) mapped to DS feedback token pairs. `title` + `children` content model, default icon per variant overridable via `icon` prop. Full `border` (all sides) + subtle bg + `rounded-md`. |
| `Skeleton` | feedback | ✅ | Loading placeholder with rectangular/circular variants. `cn()` only. `bg-border` + `ds-pulse` keyframe animation. Consumer controls dimensions via `className`. |
| `LoadingSpinner` | feedback | ✅ | Three sizes (sm/md/lg) with proportional border widths. `aria-label`-first labeling with optional `showLabel`. No `fullScreen` — documented as consumer pattern. `cn()` only, no CVA. |
| `Toaster` / `toast` | feedback | ✅ | Sonner wrapper with DS token styling via `classNames` API. `Toaster` provider (mount once, default `top-center`) + `toast()` imperative function. Five variants (default/info/success/warning/error) with auto-mapped icons matching Alert. |
| `StatusView` | feedback | ✅ | Centered status message for error pages, auth gates, and empty states. 4 variants (not-found/not-authorized/not-logged-in/error) with Korean default text. Optional `code` prop for HTTP status display. `action` ReactNode slot. `icon` override. `cn()` only, no CVA. Replaces NotFound, NotAuthorized, NotLogin, UnexpectedError. |
| `Dialog` | overlay | ✅ | Radix compound component (Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription, DialogFooter). 4 sizes (sm/md/lg/full). Built-in close button with `showCloseButton` opt-out. Custom keyframe animations (overlay fade + content slide-up). `cn()` only. |
| `Dropdown` | overlay | ✅ | Radix compound component (Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownGroup, DropdownSeparator). `variant` prop on items (default/destructive). `side`/`align`/`sideOffset` on content. Fade+zoom animations. `cn()` only. |
| `Popover` | overlay | ✅ | Uses `@radix-ui/react-popover`. Three exports (Popover, PopoverTrigger, PopoverContent). Full Radix Content props passthrough with defaults (`align="center"`, `sideOffset=4`). Fade/zoom/slide animations. `cn()` only. |
| `Tooltip` | overlay | ✅ | Uses `@radix-ui/react-tooltip`. Single wrapper API (`<Tooltip content="..."><trigger /></Tooltip>`). Brand-styled bubble (navy bg + maize text). 4 props: content, children, side, delayDuration. Provider baked in per instance. |
| `Tabs` | navigation | ✅ | Compound component (Tabs, TabsList, TabsTrigger, TabsContent). Built from scratch (no Radix). CVA on triggers (variant × size). Underline/pill variants, sm/md sizes, fullWidth, disabled triggers. Controlled + uncontrolled. Auto-selects first tab. Full keyboard nav (arrow keys, Home/End). Horizontal scroll overflow. |
| `Pagination` | navigation | ✅ | Controlled only (page, totalPages, onPageChange). siblingCount prop (default 1). Responsive: mobile forces siblingCount=0 via CSS show/hide. Static ellipsis. Prev/next arrows with ::after touch targets. Nav landmark + aria-current. `cn()` only. |
| `Avatar` | display | ✅ | Image with fallback chain: image → initials (from `name`) → icon (`user-round`). CVA `size` variant (sm 32px / md 40px / lg 56px). Brand background (`bg-brand-primary` + `text-brand-foreground`). |
| `Accordion` | display | ✅ | Radix compound component (Accordion, AccordionItem, AccordionTrigger, AccordionContent). `type` prop (single/multiple), single defaults to collapsible. CSS keyframe height animation. `showChevron` prop on trigger. `disabled` on items. `divide-y divide-border` between items. `cn()` only, no CVA. |
| `Card` | display | ✅ | Compound component (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter). `cn()` only, no CVA. `bg-surface-subtle` + `border-border` + `rounded-md`. CardTitle has polymorphic `as` prop (h1–h6, default h3). |
| `Table` | display | ✅ | Compound component (Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter, TableMobileList, TableMobileItem). `cn()` only, no CVA. `type-label` for header weight, `divide-y divide-border` row separators, `hover:bg-surface-subtle` row hover. Mobile primitives (TableMobileList + TableMobileItem) for responsive bulletin board pattern. |
| `OnlyMobileView` | utilities | ✅ | Gate component: renders children on mobile, shows fixed full-screen overlay with smartphone icon + message on `md:+`. Props: `message` (customizable text), `children`, `className`. `cn()` only, no CVA. |
| `Calendar` | date | ✅ | Wraps react-day-picker v9 with DS styling via `classNames`. Single + range modes. Brand colors (navy selected, maize text, light maize range band). `showOutsideDays` default true. Custom `<Icon>` chevrons. Multi-month responsive stacking. 44px touch targets via `::after`. Re-exports `DateRange` type. `cn()` only, no CVA. |
| `DatePicker` | date | ✅ | Composes Popover + Calendar + input-style `<button>` trigger. Exports `DatePicker` (single) and `DateRangePicker` (range) from one file. Props: `value`/`onChange`, `formatDate` (default MM/dd/yyyy), `placeholder`, `disabled`, `invalid`, `calendarProps` passthrough. Auto-closes on selection (single: immediate, range: after end date). `cn()` only, no CVA. Form wrappers: `FormDatePicker` + `FormDateRangePicker` in `@umichkisa-ds/form`. |
| `Container` | layout | ✅ | Page shell wrapper. CVA `size` variant (default 1536px / md 768px / sm 640px / prose ~65ch). Polymorphic `as` prop for semantic HTML elements. Responsive padding `px-4 md:px-6 lg:px-8`. |
| `Icon` | icon | ✅ | Single `<Icon name="..." />` component with static Lucide registry (31 icons: 29 Lucide + 2 custom SVG brand icons). Replaced 19 named `react-icons` components. |

### Form DX Package (`packages/form`)
| Export | Type | Notes |
|---|---|---|
| `useForm` | hook | Thin wrapper over RHF's useForm, defaults `mode: "onTouched"` |
| `useFormField` | hook | Wraps `useController`, returns `{ value, invalid, error, inputProps }` for manual DS component wiring |
| `useFormStatus` | hook | Returns `{ isSubmitting, isValid, isDirty }` from form context |
| `Form` | component | `<form>` + `FormProvider`, takes `form` instance + `onSubmit` |
| `Form.Input` | compound | Wraps DS `Input` + `FormItem` with `useController` |
| `Form.Textarea` | compound | Wraps DS `Textarea` + `FormItem` |
| `Form.Select` | compound | Wraps Radix `Select` root, wires `value`/`onValueChange` |
| `Form.Checkbox` | compound | Boolean field, wraps DS `Checkbox` |
| `Form.Radio` | compound | Wraps Radix `RadioGroup`, children are `RadioItem` from web |
| `Form.Switch` | compound | Boolean field, wraps DS `Switch` |
| `Form.Button` | compound | DS `Button` with auto-disable during submit, `disableWhenInvalid` prop |

Peer dependencies: `react`, `react-dom`, `react-hook-form`, `@umichkisa-ds/web`

### Not Yet Implemented (V1 target)
- `ImageButton`, `ErrorBoundary`
- `UnderConstruction`

- `DatePicker` (deferred to v1.1)

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
`ColorSwatch`, `ColorSwatchGrid`, `ContrastTable`, `DoDont`, `Callout`, `Sidebar`, `Header`, `ComponentPreview`, `SizesExample`, `CodeBlock`, `CodeBlockClient`
Located in `apps/docs/components/`.

### CodeBlock Infrastructure
- `apps/docs/lib/highlight.ts` — singleton Shiki highlighter (server-only), exports `highlight(code, lang)` returning HTML string. Languages: tsx, css, bash, json, text.
- `apps/docs/components/CodeBlock.tsx` — async server component for standalone code blocks. Calls `highlight()` + wraps in `CodeBlockClient`.
- `apps/docs/components/CodeBlockClient.tsx` — `"use client"` shell with copy-to-clipboard (icon swap: clipboard-copy → clipboard-check, 2s). Used by both CodeBlock and ComponentPreview.
- `ComponentPreview` accepts optional `highlightedCode` (pre-rendered HTML string) and `lang` props. Pages call `highlight()` at the server level and pass results down.

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
