# COMPONENT.md

_Layer 2 of the KISA DS contract. Per-component identity, sibling-discriminating
picking predicates, variants, notable props, intrinsic behavior, compound
parts, and component-scoped anti-patterns. Cross-component invariants — rules
spanning two or more components — live in the `cross_component_invariants:`
block at the bottom of this file._

_For visual-contract tokens (colors, typography, spacing, radii) see
`/DESIGN.md` (Layer 1). For consumer-side write-time rules and tier pickers
see `/USAGE.md` (Layer 3, in progress)._

_Schema reference: `docs/refactor/A2-component-schema.md`. This file is
hand-authored — there is no compiler. Append new components and
cross-component invariants as the catalog grows._

---

## Schema axes

Every entry uses A2's four schema axes:

1. **Identity** — `name`, `intent_group`, `intent`, `package`
2. **Picking** — `pick_when`, `reject_when` (one assertion per line; rejection
   names the alternative); per-variant picks if the component has a
   discriminator-axis prop
3. **Behavior** — `notable_props`, `intrinsic_behavior`,
   `requires_context`, `anti_patterns`
4. **Compound** — `compound_parts` (non-namespace children of a component
   family); `requires_context` carries namespace dependencies

Entries are grouped by `intent_group` and ordered alphabetically within
group.

---

```yaml
components:

  # ============================================================
  # intent_group: Layout
  # ============================================================

  - name: Container
    intent_group: Layout
    intent: Page-shell wrapper providing max-width centering and consistent horizontal padding
    package: "@umichkisa-ds/web"

    pick_when:
      - "the outermost wrapper for a page or top-level page region"
      - "every page in the app needs the same max-width and horizontal padding"
      - "rendering a section that should align with other page-level sections"
    reject_when:
      - "the surface is a card or list-item inside a page (use Card)"
      - "the surface is the inner content area of a Dialog or Drawer (the overlay component owns its own padding)"
      - "the goal is responsive column layout, not page-shell padding (use Grid)"

    notable_props:
      - name: as
        type: "enum: div | section | main | article | header | footer | nav"
        default: div
        pick_guidance: "use semantic landmarks where appropriate — `main` for the primary content region, `header` / `footer` / `nav` for the page chrome, `section` / `article` for content regions, `div` for layout-only wrappers"
      - name: size
        type: "enum: default | xl | lg | md | sm | prose"
        default: default
        pick_guidance: "default (max-w-screen-2xl) for the page shell; `prose` for long-form readable text columns; `sm`/`md`/`lg`/`xl` for narrower content surfaces (settings forms, focused tasks)"

    intrinsic_behavior:
      - "applies the page-shell pattern: `mx-auto w-full` + responsive all-sides padding (`p-4 md:p-6 lg:p-8`) + size-driven max-width"
      - "the only DS-supported way to apply page-shell padding — never compose `mx-auto w-full max-w-screen-2xl p-4 md:p-6 lg:p-8` manually"
      - "renders as the element specified by `as` (default `div`); otherwise a passthrough wrapper"
      - "singularity invariant: at most ONE Container per page region — the page shell is a single point of horizontal-rhythm authority"

    anti_patterns:
      - pattern: "nesting `<Container>` inside another `<Container>`"
        why: "Container owns the page shell; nesting double-applies horizontal padding and breaks the visual rhythm with adjacent sections that did not nest"
        redirect: "if the inner region needs its own narrower max-width, render plain markup (`<div className=\"mx-auto max-w-prose\">`) inside the outer Container — do NOT add a second Container"
      - pattern: "manually composing `mx-auto w-full max-w-screen-* px-* md:px-* lg:px-*` to mimic Container"
        why: "the Container contract IS the page-shell convention; hand-rolled equivalents drift from the canonical padding/max-width pair and break alignment with neighboring pages"
        redirect: "render `<Container>` (or `<Container as=\"main\">` for the main content region) instead of the hand-rolled equivalent"

    see_also:
      - ds-layout-no-utility-override

  - name: Grid
    intent_group: Layout
    intent: Equal-width responsive column grid for laying out card lists, dashboard tiles, and gallery surfaces
    package: "@umichkisa-ds/web"

    pick_when:
      - "rendering a list of cards or tiles that should reflow into multiple columns at wider breakpoints"
      - "the items are visually equal-weight (no master/detail emphasis)"
      - "the gap between items maps cleanly to one of the three DS spacing tiers"
    reject_when:
      - "the layout is a single column at every breakpoint (use a flex column with the appropriate gap utility)"
      - "the layout is a horizontal row of inline elements rather than a column grid (use `flex items-center gap-*` directly)"
      - "the layout needs more than 6 columns at any breakpoint (Grid caps at 6 — re-examine whether a grid is the right primitive)"

    notable_props:
      - name: columns
        type: "number | { base?: number; md?: number; lg?: number } (max 6 per breakpoint)"
        default: 1
        pick_guidance: "pass a number when the column count is constant across breakpoints; pass the object form when columns reflow (e.g. `{ base: 1, md: 2, lg: 3 }` for a card grid that stacks on mobile)"
      - name: gap
        type: "enum: element | component | section"
        default: component
        pick_guidance: "default `component` (16px) for stacked cards / list items; `element` (8px) for tight inline groupings; `section` (24px) only when the items are major page sections in their own right"

    intrinsic_behavior:
      - "renders a CSS grid with equal-width columns at each breakpoint"
      - "gap is fixed to the three DS spacing tiers — no off-tier gap escapes are possible through props"
      - "single-column responsive behavior (`columns={{ base: 1, md: 2 }}`) is the dominant use case — the responsive object form is the canonical spelling for card grids"

    anti_patterns:
      - pattern: "passing a `columns` value greater than 6 at any breakpoint"
        why: "Grid maps `columns` 1–6 only; out-of-range values silently fall through to the implicit single-column default, producing wrong layout without errors"
        redirect: "if more than 6 columns are needed, the grid is too dense for content readability — re-examine the layout"
      - pattern: "dropping Grid and writing raw `<div className=\"grid grid-cols-* gap-*\">` for a layout Grid doesn't model out of the box (e.g. asymmetric column widths)"
        why: "Grid is the canonical column-grid primitive in the DS; reaching for raw utilities re-implements its responsive + gap-tier contract by hand and drifts from the rest of the app"
        redirect: "render `<Grid>` and pass the extension via the `className` prop (e.g. `<Grid className=\"grid-cols-[240px_1fr]\">`) — className overrides are the supported escape hatch when `columns` doesn't fit"

  # ============================================================
  # intent_group: Utilities
  # ============================================================

  - name: Icon
    intent_group: Utilities
    intent: Render a Lucide-registry-backed icon by name with size from the 5-step DS scale
    package: "@umichkisa-ds/web"

    pick_when:
      - "rendering an icon glyph in any context — UI affordance, decorative accent, status indicator, navigation"
      - "the icon name maps to a registered Lucide entry (or a registered custom brand icon like `github`, `linkedin`)"
      - "the icon size needs to come from the DS 5-step scale (`xs`, `sm`, `md`, `lg`, `xl`)"
    reject_when:
      - "the glyph is a one-off complex illustration not registered in the Icon registry (use `<img>` or a dedicated illustration component; never inline SVG)"
      - "the glyph is the only visual on an interactive surface (use `<IconButton>` so the wrapping button + tooltip + 44×44 touch-target contract is satisfied)"
      - "importing a Lucide icon directly from `lucide-react` (always go through `<Icon>` so the registry tracks usage and color/size discipline applies)"

    notable_props:
      - name: name
        type: "IconName (kebab-case Lucide name, exact match from lucide.dev — or registered custom: `github` / `linkedin` / `instagram` / `instagram-brand`)"
        pick_guidance: "exhaust the Lucide search at lucide.dev before requesting a custom icon; missing icons route through ds-fix-during-migration to the registry"
      - name: size
        type: "enum: xs | sm | md | lg | xl"
        default: md
        pick_guidance: "match the icon size to its text context — `xs`/`sm` for caption (12–16px), `md` for body and the default UI affordance (20px), `md`–`lg` for subhead, `lg` for heading (24px), `xl` for hero (32px). Resolves to `spacing.icon-{size}` in DESIGN.md."
      - name: label
        type: "string"
        pick_guidance: "set ONLY when this icon is the sole indicator of meaning to a screen reader — i.e. there is no adjacent text label and no aria-label on a wrapping button. Sets `role=\"img\"` + `aria-label`. Decorative icons (icon-with-text, icon inside a labeled button) MUST omit `label` so the icon renders `aria-hidden`."
      - name: className
        type: "string"
        pick_guidance: "layout-only utilities (`block`, `flex-shrink-0`, positioning). Color is inherited from the parent's `text-*` token (`currentColor`); size is set by `size` prop, NEVER by font-size or width/height utilities."

    intrinsic_behavior:
      - "color inherits from the parent's text color via `currentColor` — control icon color by setting `text-foreground` / `text-muted-foreground` / `text-brand-primary` on the parent, never on `<Icon>` itself"
      - "size resolves to a numeric pixel value from the DS 5-step scale — bypassing this with `font-size` / `w-*` / `h-*` utilities is a contract break"
      - "renders `aria-hidden=\"true\"` when `label` is omitted (decorative); renders `role=\"img\" aria-label={label}` when `label` is provided (semantic)"
      - "the registry surface is closed — only icons added by the DS owner via `ds-fix-during-migration` are available; consumers cannot register new names at call site"

    anti_patterns:
      - pattern: "passing color or sizing utilities via `className` (e.g. `text-red-500`, `w-6`, `h-6`, `text-2xl`)"
        why: "Icon takes color from `currentColor` (parent text color) and size from the `size` prop; className overrides break that contract — the icon ends up colored or sized off-tier, and the consumer thinks they're using DS but aren't"
        redirect: "set color on the parent's `text-*` class; pick size from the 5-step `size` prop. className accepts layout-only utilities (`block`, `flex-shrink-0`)."
      - pattern: "passing `label` when the wrapping element already has an accessible name (e.g. `<button aria-label=\"Close\"><Icon name=\"x\" label=\"Close\" /></button>`)"
        why: "screen readers announce both the button's `aria-label` and the icon's `aria-label`, producing duplicate or stuttering announcements (\"Close, Close\")"
        redirect: "omit `label` whenever the icon is decorative — i.e. when adjacent text or a wrapping button's aria-label already names the action. The icon renders `aria-hidden` and the button speaks alone."
      - pattern: "importing icons directly from `lucide-react` or `react-icons` and using them inline"
        why: "bypasses the registry that the DS uses to track icon usage, enforce style consistency (24×24, stroke-width 2, currentColor), and gate brand-icon exceptions"
        redirect: "use `<Icon name=\"...\">`. If the needed icon is missing from the registry, request it via `ds-fix-during-migration`."
      - pattern: "attaching `onClick` directly to `<Icon>`"
        why: "Icon renders an SVG, not an interactive element — keyboard focus, ARIA role, and the 44×44 touch-target floor are missing"
        redirect: "wrap the icon in `<IconButton>` (icon-only action) or `<button>`/`<a>` (icon + text)"

    see_also:
      - icon-button-tooltip-aria-label-match

  - name: OnlyMobileView
    intent_group: Utilities
    intent: Mobile-only page gate that renders a "use your phone" overlay on `md:`+ viewports
    package: "@umichkisa-ds/web"

    pick_when:
      - "the entire page or route is intentionally mobile-only (e.g. event check-in, on-site QR scanner, mobile-first form flow)"
      - "rendering the desktop version of the page would mislead users — there is no usable desktop layout, only the mobile one"
    reject_when:
      - "the page should adapt to desktop with a different layout (use the standard responsive system — `md:` / `lg:` breakpoints — not OnlyMobileView)"
      - "only some sections of the page are mobile-only (use `md:hidden` / `block md:hidden` utilities scoped to those sections)"
      - "the goal is to hide a single component on desktop (use Tailwind's `md:hidden` directly; OnlyMobileView is a page-level gate)"

    notable_props:
      - name: message
        type: "string"
        default: "\"Only Mobile View is supported.\""
        pick_guidance: "override only when the default is wrong for the surface — typically leave at default for app-wide consistency"
      - name: className
        type: "string"
        pick_guidance: "applied to the outer wrapper, not the desktop overlay or mobile children — used for outer layout positioning only"

    intrinsic_behavior:
      - "renders a fixed full-viewport overlay on `md:` and above with the configured message + a `smartphone` icon"
      - "renders `children` only on viewports below the `md:` breakpoint (mobile)"
      - "the overlay uses `bg-surface` + `text-brand-primary` and applies `role=\"status\" aria-live=\"polite\"` so screen readers announce the gate when it appears"
      - "single-breakpoint contract — `md:` is the desktop/mobile boundary; OnlyMobileView does not honor `lg:`-only or `sm:`-only carve-outs"

    anti_patterns:
      - pattern: "using OnlyMobileView for a page that has a perfectly usable desktop layout"
        why: "the gate hides usable content behind a 'use your phone' overlay — frustrating for users who can complete the task on desktop"
        redirect: "build the desktop layout responsively with `md:` / `lg:` utilities. OnlyMobileView is reserved for genuinely mobile-only contexts (in-person scanning, mobile-only forms)."

  # ============================================================
  # intent_group: Date selection
  # ============================================================

  - name: Calendar
    intent_group: Date selection
    intent: Standalone always-visible month-grid calendar for picking a date or range without a popover trigger
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface needs a permanently-visible calendar grid (event scheduling page, date-driven dashboard, schedule overview)"
      - "the user benefits from seeing the month and surrounding days at all times, not on click"
      - "the date selection is the primary content of the surface, not a form field"
    reject_when:
      - "the date is being collected as part of a form (use `Form.DatePicker` / `Form.DateRangePicker` so wiring + validation come for free)"
      - "the date input is one of many form controls and a popover trigger is more space-efficient (use `DatePicker` or `DateRangePicker` — they wrap Calendar in a popover)"
      - "the surface needs a date display only, not selection (render a formatted date string with the appropriate `type-*` class)"

    notable_props:
      - name: mode
        type: "enum: single | multiple | range (passed through to react-day-picker)"
        pick_guidance: "`single` for picking one date; `range` for start–end (e.g. event date range); `multiple` for ad-hoc multi-day selection"
      - name: showOutsideDays
        type: "boolean"
        default: true
        pick_guidance: "leave at default — surrounding-month days at 50% opacity orient the user; turn off only when the surrounding context already provides the orientation"
      - name: selected
        type: "Date | Date[] | DateRange (matches `mode`)"
        pick_guidance: "controlled — pass alongside `onSelect` for state ownership outside Calendar"
      - name: classNames
        type: "Partial<DayPicker classNames map>"
        pick_guidance: "DS pre-styles every slot; pass entries here ONLY to override a specific slot when DS styling genuinely doesn't fit. Avoid blanket overrides — Calendar's interactive states (focus ring, hover, today, selected, range_*) are part of the contract."

    intrinsic_behavior:
      - "wraps `react-day-picker`'s `<DayPicker>` with KISA-branded slot styling — `today` is `bg-surface-subtle` + bold, `selected` uses `bg-brand-primary` + maize foreground, `range_*` uses `bg-brand-accent-subtle` for the in-range bg"
      - "every interactive cell (day, prev/next month) implements the dual-ring focus pattern (outline-2 focus-ring + 4px box-shadow brand-primary) AND the 44×44 touch-target floor via the `::after` pseudo-element technique"
      - "navigation chevrons render through the DS `<Icon>` registry (`chevron-left` / `chevron-right` at size `sm`) — never raw lucide-react"
      - "extends `DayPickerProps` from react-day-picker — every prop that library accepts is accepted here, including `disabled`, `fromDate` / `toDate`, locale, etc."
      - "spans full width on mobile and switches to side-by-side months at `md:` (`flex flex-col md:flex-row`) when multiple months are rendered"

    anti_patterns:
      - pattern: "passing a `classNames` map that wholesale-replaces the day / today / selected / range_* slots"
        why: "Calendar's slot styling carries the DS focus-ring, touch-target, and brand-color contracts; broad overrides drop those silently and produce a calendar that looks DS but isn't"
        redirect: "if a specific slot styling needs adjustment, override only that slot key in `classNames` — keep every other DS-styled slot at its default"
      - pattern: "rendering Calendar inside a Form to collect a date"
        why: "Form expects fields wired through `Form.DatePicker` / `Form.DateRangePicker` (validation, error display, onSubmit integration); raw Calendar is not field-wired and bypasses the Form contract"
        redirect: "use `Form.DatePicker` (single) or `Form.DateRangePicker` (range) inside `<Form>`; reach for raw Calendar only on standalone date-display surfaces"

# (additional component groups appended below as C2a.5..C2a.11 are authored)

cross_component_invariants:
  # (seeded incrementally per group; finalized in C2a.final)
  - id: ds-layout-no-utility-override
    components: [Container, Tabs, Form, Card, Dialog]
    invariant: "flex / overflow / height / max-height utilities passed via className to force a DS layout component's size are forbidden — the component owns its own layout shape"
    why: "DS layout components encapsulate flex direction, overflow behavior, and intrinsic height; consumer overrides via className compete with internal contracts and produce subtly broken layout (clipped overlays, double scrollbars, collapsed grid rows)"
    detection: static

  - id: icon-button-tooltip-aria-label-match
    components: [IconButton, Tooltip, Icon]
    invariant: "an icon-only interactive (`<IconButton>` or `<button>`/`<a>` wrapping `<Icon>`) MUST provide `aria-label` on the wrapper AND wrap in `<Tooltip>` whose content text equals that `aria-label` exactly. The inner `<Icon>` MUST NOT carry its own `label` prop."
    why: "screen readers announce the wrapper's `aria-label` once; if the icon also carries `label` the announcement duplicates. Tooltip text and aria-label must match so sighted-tooltip-readers and screen-reader users hear the same affordance name."
    detection: compositional
```
