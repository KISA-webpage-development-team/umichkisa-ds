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
- [x] Review `/foundation/typography/scale`
- [x] Fix `/foundation/typography/scale`
- [x] Review `/foundation/typography/fonts`
- [x] Fix `/foundation/typography/fonts`
- [x] Review `/foundation/typography/usage`
- [x] Fix `/foundation/typography/usage`
- [x] Review `/foundation/layout/overview`
- [x] Fix `/foundation/layout/overview`

### Batch 4 — Layout
- [x] Review `/foundation/layout/spacing`
- [x] Fix `/foundation/layout/spacing`
- [x] Review `/foundation/layout/breakpoints`
- [x] Fix `/foundation/layout/breakpoints`
- [x] Review `/foundation/layout/usage`
- [x] Fix `/foundation/layout/usage`

### Batch 5 — Iconography
- [x] Review `/foundation/iconography/overview`
- [x] Fix `/foundation/iconography/overview`
- [x] Review `/foundation/iconography/sizes`
- [x] Fix `/foundation/iconography/sizes`
- [x] Review `/foundation/iconography/library`
- [x] Fix `/foundation/iconography/library`

### Batch 6 — Iconography + Components
- [x] Review `/foundation/iconography/usage`
- [x] Fix `/foundation/iconography/usage`
- [x] Review `/foundation/iconography/accessibility`
- [x] Fix `/foundation/iconography/accessibility`
- [x] Review `/components/badge`
- [x] Fix `/components/badge`

### Batch 7 — Components
- [x] Review `/components/button`
- [x] Fix `/components/button`
- [x] Review `/components/icon-button`
- [x] Fix `/components/icon-button`
- [x] Review `/components/link-button`
- [x] Fix `/components/link-button`

### Batch 8 — Components
- [x] Review `/components/icon`
- [x] Fix `/components/icon` — plan: `docs/plans/review-fix-components-icon.md`
- [x] Review `/components/avatar`
- [x] Fix `/components/avatar` — plan: `docs/plans/review-fix-components-avatar.md`
- [x] Review `/components/skeleton`
- [x] Fix `/components/skeleton` — plan: `docs/plans/review-fix-skeleton.md`
- [x] Review `/components/loading-spinner`
- [x] Fix `/components/loading-spinner` — plan: `docs/plans/review-fix-loading-spinner.md`

### Batch 9 — Components
- [x] Review `/components/alert`
- [x] Fix `/components/alert` — plan: `docs/plans/review-fix-components-alert.md`
- [x] Review `/components/status-view`
- [ ] Fix `/components/status-view` — plan: `docs/plans/review-fix-status-view.md`
- [x] Review `/components/divider`
- [x] Fix `/components/divider` — plan: `docs/plans/review-fix-divider.md`

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
- [ ] Migrate raw `<hr>` → `Divider` component across all docs pages (14 foundation pages currently use raw `<hr>`)
- [ ] Add prev/next page navigation to docs page footer
- [ ] Normalize section spacing across foundation pages — drop `mt-8` from H2s following `<hr my-8>` (currently produces ~64px doubled gap; affects 13–14 foundation pages)
- [x] Fix CodeBlock mobile UX — language label (tsx/js/css) alignment is off on mobile, and the copy button is hover-only so touch users can never copy code (make copy button always-visible, at least on touch)
- [x] Add Props table to `/components/icon` (already satisfied — API Reference covers all 4 `<Icon>` props; verified during /components/icon review)
