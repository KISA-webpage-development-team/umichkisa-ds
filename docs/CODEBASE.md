# Codebase Notes (Claude Memory)

Quick-reference for AI-assisted sessions. Update when you discover something new.

---

## Monorepo Structure

```
umichkisa-ds/
├── packages/web/          # Component library (published)
│   └── src/
│       ├── components/    # All components
│       ├── tokens/        # primitives.css, semantic.css
│       ├── styles/        # index.css (entry, type-* utilities)
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
- Route exists at `/components/[slug]` (dynamic)
- **No MDX content files yet** — `apps/docs/content/components/` is empty

---

## Component Library Status (`packages/web`)

### Implemented but review required
| Component | Category | Token-Connected? | Notes |
|---|---|---|---|
| `Button` | button | ⚠ Partial | Hardcodes `bg-slate-100`/`border-slate-100` — should use semantic tokens |
| `IconButton` | button | ✅ | |
| `LinkButton` | button | ✅ | |
| `Input` | form | ✅ | |
| `Label` | form | ✅ | |
| `FormItem` | form | ✅ | |
| `HorizontalDivider` | layout | ⚠ Partial | Hardcodes `border-gray-200/60` — should use `--color-border` |
| `VerticalDivider` | layout | ✅ | |
| `ToggleBar` | layout | ✅ | |
| `LoadingSpinner` | feedback | ✅ | |
| `NotFound` | feedback | ✅ | |
| `NotAuthorized` | feedback | ✅ | |
| `NotLogin` | feedback | ✅ | |
| `UnexpectedError` | feedback | ✅ | |
| `Dialog` | overlay | ✅ | Uses `@radix-ui/react-dialog` |
| `Dropdown` | overlay | ✅ | Uses `@radix-ui/react-dropdown-menu` |
| `Popover` | overlay | ✅ | Uses `@radix-ui/react-popover` |
| Icons (19 SVGs) | icon | ✅ | |

### Not Yet Implemented (V1 target)
- `Container`, `Grid` — specs in `content/_layout-implementation.md`
- `Badge`, `Card`, `ImageButton`, `ErrorBoundary`
- `OnlyMobileView`, `UnderConstruction`
- `Accordion`
- `DatePicker`, `Calendar` (deferred to v1.1)

---

## Reference: Client App

The consuming app lives at `../KISA-website/client/src/components/ui/`.
Use as a **requirements reference only** — not as an implementation template.
The client currently uses: custom CSS components + shadcn primitives (accordion, badge, card, calendar, date-picker, dialog, dropdown-menu, popover).

---

## Docs UI Components (not part of the library)

Already built for the docs site itself:
`ColorSwatch`, `ColorSwatchGrid`, `ContrastTable`, `DoDont`, `Callout`, `Sidebar`, `Header`
Located in `apps/docs/components/`.
