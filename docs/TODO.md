# TODO

## Pre-v1.0 (Batch, in parallel)

- [x] Docs components token gap — fix Callout, DoDont, ContrastTable to use DS semantic tokens
- [x] Table component — KISA-specific design treatment (minor design task)
- [x] Add `<footer>` landmark to docs app layout

## Docs App UI Review (Batch, in parallel)

_Spec: `docs/specs/review-docs-app-ui-skill-design.md` | Skill: `review-docs-app-ui`_
_Each page has a review pass then a fix pass. Use `review-docs-app-ui` for review, `ds-constrained-execution` for fixes._

### Batch 1 — Colors
- [x] Review `/foundation/colors/overview`
- [x] Fix `/foundation/colors/overview`
- [x] Review `/foundation/colors/primitives`
- [x] Fix `/foundation/colors/primitives`
- [x] Review `/foundation/colors/tokens`
- [x] Fix `/foundation/colors/tokens`

### Batch 2 — Colors + Typography
- [x] Review `/foundation/colors/usage`
- [x] Fix `/foundation/colors/usage`
- [x] Review `/foundation/colors/accessibility`
- [x] Fix `/foundation/colors/accessibility`
- [x] Review `/foundation/typography/overview`
- [x] Fix `/foundation/typography/overview`

### Batch 3 — Typography + Layout
- [ ] Review `/foundation/typography/scale`
- [ ] Fix `/foundation/typography/scale`
- [ ] Review `/foundation/typography/fonts`
- [ ] Fix `/foundation/typography/fonts`
- [ ] Review `/foundation/typography/usage`
- [ ] Fix `/foundation/typography/usage`
- [ ] Review `/foundation/layout/overview`
- [ ] Fix `/foundation/layout/overview`

### Batch 4 — Layout
- [ ] Review `/foundation/layout/spacing`
- [ ] Fix `/foundation/layout/spacing`
- [ ] Review `/foundation/layout/breakpoints`
- [ ] Fix `/foundation/layout/breakpoints`
- [ ] Review `/foundation/layout/usage`
- [ ] Fix `/foundation/layout/usage`

### Batch 5 — Iconography
- [ ] Review `/foundation/iconography/overview`
- [ ] Fix `/foundation/iconography/overview`
- [ ] Review `/foundation/iconography/sizes`
- [ ] Fix `/foundation/iconography/sizes`
- [ ] Review `/foundation/iconography/library`
- [ ] Fix `/foundation/iconography/library`

### Batch 6 — Iconography + Components
- [ ] Review `/foundation/iconography/usage`
- [ ] Fix `/foundation/iconography/usage`
- [ ] Review `/foundation/iconography/accessibility`
- [ ] Fix `/foundation/iconography/accessibility`
- [ ] Review `/components/badge`
- [ ] Fix `/components/badge`

### Batch 7 — Components
- [ ] Review `/components/button`
- [ ] Fix `/components/button`
- [ ] Review `/components/icon-button`
- [ ] Fix `/components/icon-button`
- [ ] Review `/components/link-button`
- [ ] Fix `/components/link-button`

### Batch 8 — Components
- [ ] Review `/components/icon`
- [ ] Fix `/components/icon`
- [ ] Review `/components/avatar`
- [ ] Fix `/components/avatar`
- [ ] Review `/components/skeleton`
- [ ] Fix `/components/skeleton`
- [ ] Review `/components/loading-spinner`
- [ ] Fix `/components/loading-spinner`

### Batch 9 — Components
- [ ] Review `/components/alert`
- [ ] Fix `/components/alert`
- [ ] Review `/components/status-view`
- [ ] Fix `/components/status-view`
- [ ] Review `/components/divider`
- [ ] Fix `/components/divider`

### Batch 10 — Components
- [ ] Review `/components/accordion`
- [ ] Fix `/components/accordion`
- [ ] Review `/components/tabs`
- [ ] Fix `/components/tabs`
- [ ] Review `/components/tooltip`
- [ ] Fix `/components/tooltip`
- [ ] Review `/components/popover`
- [ ] Fix `/components/popover`

### Batch 11 — Components
- [ ] Review `/components/dropdown`
- [ ] Fix `/components/dropdown`
- [ ] Review `/components/dialog`
- [ ] Fix `/components/dialog`
- [ ] Review `/components/toast`
- [ ] Fix `/components/toast`

### Batch 12 — Components
- [ ] Review `/components/container`
- [ ] Fix `/components/container`
- [ ] Review `/components/grid`
- [ ] Fix `/components/grid`
- [ ] Review `/components/card`
- [ ] Fix `/components/card`
- [ ] Review `/components/table`
- [ ] Fix `/components/table`

### Batch 13 — Components (Form Controls)
- [ ] Review `/components/input`
- [ ] Fix `/components/input`
- [ ] Review `/components/textarea`
- [ ] Fix `/components/textarea`
- [ ] Review `/components/select`
- [ ] Fix `/components/select`
- [ ] Review `/components/label`
- [ ] Fix `/components/label`

### Batch 14 — Components (Form Controls)
- [ ] Review `/components/checkbox`
- [ ] Fix `/components/checkbox`
- [ ] Review `/components/radio`
- [ ] Fix `/components/radio`
- [ ] Review `/components/switch`
- [ ] Fix `/components/switch`
- [ ] Review `/components/form-item`
- [ ] Fix `/components/form-item`

### Batch 15 — Components
- [ ] Review `/components/toggle-group`
- [ ] Fix `/components/toggle-group`
- [ ] Review `/components/pagination`
- [ ] Fix `/components/pagination`
- [ ] Review `/components/calendar`
- [ ] Fix `/components/calendar`
- [ ] Review `/components/datepicker`
- [ ] Fix `/components/datepicker`

### Batch 16 — Components
- [ ] Review `/components/only-mobile-view`
- [ ] Fix `/components/only-mobile-view`
- [ ] Review `/components/forms`
- [ ] Fix `/components/forms`

### Batch 17 — Forms
- [ ] Review `/forms/overview`
- [ ] Fix `/forms/overview`
- [ ] Review `/forms/form-component`
- [ ] Fix `/forms/form-component`
- [ ] Review `/forms/use-form`
- [ ] Fix `/forms/use-form`

### Batch 18 — Forms
- [ ] Review `/forms/hooks`
- [ ] Fix `/forms/hooks`
- [ ] Review `/forms/validation`
- [ ] Fix `/forms/validation`
- [ ] Review `/forms/examples`
- [ ] Fix `/forms/examples`

## Index Pages (after all reviews complete)

- [ ] Home page content (`/`)
- [ ] Components index page content (`/components`)
- [ ] Foundation index page content (`/foundation`)

## Docs App Enhancements

- [ ] Add `id` attributes to all heading elements (`h2`, `h3`) across docs pages for anchor linking and TOC support
- [ ] Create `<InlineCode>` docs component (inherits parent font size, adds `font-mono bg-surface-subtle rounded px-1 py-0.5`) and migrate all raw `<code className="...type-caption font-mono...">` across all docs pages
- [ ] Add prev/next page navigation to docs page footer
