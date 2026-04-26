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
        required: true
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

  # ============================================================
  # intent_group: Triggering actions
  # ============================================================

  - name: Button
    intent_group: Triggering actions
    intent: Primary in-app action — submit a form, confirm a dialog, start a flow
    package: "@umichkisa-ds/web"

    pick_when:
      - "user action triggers behavior in the current page (submit, confirm, open dialog, run an operation)"
      - "the action carries a visible text label"
    reject_when:
      - "the action navigates to a different URL or page route (use `LinkButton`)"
      - "the action is icon-only with no text label (use `IconButton`)"
      - "submitting a form wired with `@umichkisa-ds/form` (use `Form.Button` — auto-disables on submit and integrates with form state)"

    variants:
      - name: primary
        pick_when:
          - "the main call-to-action in the visible context (form submit, primary flow, hero CTA)"
          - "only ONE primary visible at a time per surface"
        reject_when:
          - "an alternative or supporting action alongside another primary (use `variant: secondary`)"
          - "low-emphasis action inside dense UI like a toolbar or table-row action (use `variant: tertiary`)"
          - "destructive action like delete / remove / clear (use `variant: destructive`)"
      - name: secondary
        pick_when:
          - "alternative or supporting action presented alongside a primary (modal cancel, form cancel)"
          - "an action that needs visual weight but is not the page's primary intent"
        reject_when:
          - "the action IS the page's primary intent (use `variant: primary`)"
      - name: tertiary
        pick_when:
          - "low-emphasis action inside a dense surface — toolbars, table-row actions, inline 'Show more'"
          - "the visual weight of `secondary` would be too heavy for the surface"
        reject_when:
          - "the action is a major flow trigger (use `variant: primary` or `secondary`)"
      - name: destructive
        pick_when:
          - "irreversible or data-deleting action — delete, remove, clear, revoke"
        reject_when:
          - "any non-destructive action (use `variant: primary` or `secondary`)"

    notable_props:
      - name: variant
        type: "enum: primary | secondary | tertiary | destructive"
        default: primary
        pick_guidance: "see the variants block above — pick by the action's role on the surface, not by the visual weight"
      - name: size
        type: "enum: sm | md | lg"
        default: md
        pick_guidance: "`md` is default; `sm` for dense forms / toolbars; `lg` only for hero CTAs"
      - name: type
        type: "enum: button | submit | reset"
        default: button
        note: "Button defaults to `type=\"button\"` to avoid accidental form submit. Pass `type=\"submit\"` explicitly when needed; for forms wired with @umichkisa-ds/form, use `Form.Button` instead — it sets the right type AND auto-disables on submit."
      - name: disabled
        type: "boolean"
        note: "non-interactive state; pair with form validation or pending state. For form-submit pending, prefer `Form.Button` (auto-disables via useFormStatus)."

    intrinsic_behavior:
      - "renders a native `<button>` with `type=\"button\"` by default — no implicit form submit"
      - "implements the dual-ring focus pattern: `outline-2 focus-ring` + `box-shadow 4px brand-primary` on `:focus-visible`"
      - "disabled state lowers opacity to 60% and removes pointer events; foreground shifts to `disabled-foreground`"
      - "primary / secondary / destructive variants apply `!font-bold` to override the underlying `type-body[-sm]` class weight (intentional contract — Button text is heavier than body text by design)"

    anti_patterns:
      - pattern: "passing a `variant` value not in the four-enum (`primary` / `secondary` / `tertiary` / `destructive`) — e.g. `variant=\"outline\"` or `variant=\"ghost\"`"
        why: "Button enumerates four variants by design; non-enumerated values fall through cva's default and silently miss the consumer's intent"
        redirect: "if a needed variant is genuinely missing, request it via `ds-fix-during-migration`. Don't reach for a non-DS button library."
      - pattern: "wrapping `<Button>` in a custom `<a>` or `<Link>` for navigation"
        why: "Button renders a `<button>` element; nesting in `<a>` produces invalid HTML (`<a><button>`) and breaks keyboard semantics"
        redirect: "use `<LinkButton>` — it shares Button's variant styling but renders as `<a>` with the navigation contract"
      - pattern: "passing only an `<Icon>` as children with no text label"
        why: "Button is sized and padded for text-bearing actions; an icon-alone Button has no aria-label and no 44×44 touch-target floor"
        redirect: "use `<IconButton icon=\"...\" aria-label=\"...\">` — it ships the touch-target floor and requires aria-label by type"

  - name: IconButton
    intent_group: Triggering actions
    intent: Action represented by an icon alone — toolbars, close affordances, compact row actions
    package: "@umichkisa-ds/web"

    pick_when:
      - "the action is represented by an icon glyph alone, with no visible text label (close X, more dots, edit pencil)"
      - "screen real-estate is genuinely tight (toolbar, table-row action, compact card header)"
      - "an `aria-label` can describe the action in 1–3 words"
    reject_when:
      - "the action has (or could reasonably have) a visible text label (use `Button` — labeled actions are more discoverable)"
      - "the action navigates to a URL (use a `<a>` or `LinkButton` styled with the icon, OR wrap a navigation icon in `<a aria-label=\"...\">` — IconButton renders `<button>`, not `<a>`)"
      - "the icon needs no interactive affordance (use bare `<Icon>` instead — IconButton always renders a real button)"

    notable_props:
      - name: icon
        type: "IconName (kebab-case, must exist in the Icon registry)"
        required: true
        pick_guidance: "pick the same way as `<Icon name>` — exhaust the Lucide search, request additions via ds-fix-during-migration"
      - name: aria-label
        type: "string"
        required: true
        pick_guidance: "the accessible name for screen readers. Must equal the wrapping `<Tooltip>` content text exactly when wrapped."
      - name: size
        type: "enum: sm | md | lg"
        default: md
        pick_guidance: "`md` is default and matches Button `md` height; `sm` in dense toolbars; `lg` for hero/floating actions. Inner Icon scales with this."
      - name: variant
        type: "enum: primary | secondary | tertiary | destructive (inherited from Button)"
        default: secondary
        pick_guidance: "`secondary` (default) for neutral toolbar / row actions; `tertiary` for low-emphasis inline actions; `primary` only for icon-only CTAs (rare); `destructive` for delete / remove icon affordances"
      - name: disabled
        type: "boolean"

    intrinsic_behavior:
      - "renders a `<button>` whose only child is an `<Icon name={icon} size={size}>` — never composed manually"
      - "applies the 44×44 touch-target floor via the `::after` pseudo-element technique even when the visible button is smaller"
      - "inherits Button's dual-ring focus, disabled styling, and variant color contracts via composition (it IS a Button under the hood)"
      - "`aria-label` is required at the type level — TypeScript rejects an IconButton without it"

    anti_patterns:
      - pattern: "passing `label` on the wrapped `<Icon>` (i.e. through composition or registry) when IconButton already carries `aria-label`"
        why: "screen readers announce both the button's `aria-label` AND the icon's `aria-label`, producing duplicate or stuttering announcements"
        redirect: "let IconButton's `aria-label` be the single accessible name. The inner Icon renders `aria-hidden` automatically."
      - pattern: "shipping IconButton without a wrapping `<Tooltip>` whose text equals the `aria-label`"
        why: "sighted users have no way to discover what the icon means without hover help; the icon-only affordance is opaque without a tooltip"
        redirect: "wrap in `<Tooltip>{aria-label text}</Tooltip>` — see the `icon-button-tooltip-aria-label-match` cross-invariant"

    see_also:
      - icon-button-tooltip-aria-label-match

  - name: LinkButton
    intent_group: Triggering actions
    intent: Navigation styled as a button — visually equivalent to Button, but renders an anchor and follows link semantics
    package: "@umichkisa-ds/web"

    pick_when:
      - "the action navigates to a URL or page route (anywhere `<a href>` would be the right element)"
      - "the navigation should look like a button (CTA hero links, primary nav-to-flow, prominent 'Apply Now' / 'Open Docs' affordances)"
      - "the consumer wants Button's variant + size styling on a navigation surface"
    reject_when:
      - "the action triggers behavior in the current page rather than navigation (use `Button`)"
      - "the navigation should look like a regular text link (use a plain `<a className=\"text-link hover:underline\">`)"
      - "the navigation needs the framework router's `<Link>` semantics (compose: render `<LinkButton>` as the styling layer with the framework `<Link>` providing the click handler — see `notable_props.note` on `href`)"

    notable_props:
      - name: href
        type: "string (optional — typically required, see note)"
        note: "passes through to the underlying `<a>`. For Next.js / React Router routing, render the framework's `<Link>` as the consumer-side wrapper and pass `href` to it instead — LinkButton itself does not integrate with any router."
      - name: variant
        type: "enum: primary | secondary | tertiary | destructive"
        default: primary
        pick_guidance: "match Button's variant guidance — `primary` for hero CTAs, `secondary` for supporting nav actions, `tertiary` for low-emphasis nav inside dense surfaces"
      - name: size
        type: "enum: sm | md | lg (inherited via buttonVariants)"
        default: md
      - name: disabled
        type: "boolean"
        default: false
        note: "renders a non-clickable `<span role=\"link\" aria-disabled>` instead of `<a>`. Use sparingly — disabled links are an anti-pattern in many a11y heuristics; prefer hiding the affordance entirely when navigation is unavailable."

    intrinsic_behavior:
      - "renders `<a>` (enabled) or `<span role=\"link\" aria-disabled>` (disabled)"
      - "shares Button's `buttonVariants` cva — variant + size styling is identical to Button"
      - "adds `hover:underline` on the enabled `<a>` (not present on Button) — link affordance for keyboard users"
      - "disabled state applies `pointer-events-none text-disabled-foreground opacity-60` AND swaps the element to a span"

    anti_patterns:
      - pattern: "using LinkButton for an in-page action that doesn't navigate (e.g. `<LinkButton onClick={handler}>Save</LinkButton>`)"
        why: "LinkButton renders `<a>` with no `href`, which is an inert anchor — keyboard focus, screen-reader semantics, and link semantics all break"
        redirect: "use `<Button onClick={handler}>` for in-page actions; reserve LinkButton for navigation"
      - pattern: "rendering LinkButton without `href` or framework router integration"
        why: "an `<a>` without `href` is not focusable and is announced as plain text by screen readers"
        redirect: "always provide `href`, OR wrap LinkButton in the framework's `<Link>` so the link target is set by the router"

  # ============================================================
  # intent_group: Organizing & displaying content
  # ============================================================

  - name: Accordion
    intent_group: Organizing & displaying content
    intent: Progressive disclosure for FAQs, advanced settings, and grouped collapsible sections
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface has multiple short sections that benefit from collapsing for scannability (FAQ, advanced settings, grouped help text)"
      - "users will read 1–2 sections at a time, not all of them"
      - "the section headings make sense as standalone summaries (the user can decide whether to expand without seeing the body)"
    reject_when:
      - "the content is the primary reading flow — collapsing it would hide what the page exists to show (use plain headings + body text)"
      - "the user needs to compare information across sections (use a Table or tabbed layout)"
      - "the surface is a single togglable region, not a list (use a `<details>` element or a custom disclosure)"
      - "the surface is for switching views in the same page context (use `Tabs`)"

    notable_props:
      - name: type
        type: "enum: single | multiple"
        default: single
        pick_guidance: "`single` is default and `collapsible: true` is implied — only one section open at a time. Use `multiple` ONLY when users genuinely benefit from comparing two open sections side by side (rare in FAQ-style accordions)."
      - name: value / defaultValue
        type: "string (single) | string[] (multiple)"
        pick_guidance: "controlled (`value` + `onValueChange`) for state-driven open/close; uncontrolled (`defaultValue`) for typical FAQ behavior"

    intrinsic_behavior:
      - "wraps Radix UI Accordion primitive — keyboard navigation, ARIA, and focus management are inherited from Radix"
      - "items are separated by `divide-y divide-border` — no per-item border config; Accordion owns the separator contract"
      - "trigger styling: `type-h3` heading text, brand-accent underline-on-hover, brand-primary text when open, chevron icon rotates 180° on open"
      - "open/close animations use the DS-defined `accordion-down` / `accordion-up` keyframes (200ms)"

    compound_parts:
      - name: AccordionItem
        kind: required_child
        invariant: "every visible section requires an AccordionItem with a unique `value: string`"
      - name: AccordionTrigger
        kind: required_child
        owns: "summary heading + chevron + open/closed visual state"
        invariant: "renders inside an AccordionItem; carries the section heading. `showChevron={false}` opts out of the chevron when the trigger has its own affordance."
      - name: AccordionContent
        kind: required_child
        owns: "body content + open/close animation"
        invariant: "rendered only when the parent AccordionItem is open; body wrapper applies `pb-4 type-body text-foreground`"

    anti_patterns:
      - pattern: "wrapping non-collapsible content in Accordion to add visual borders or section separators"
        why: "Accordion's `divide-y divide-border` is incidental to the disclosure contract; using it for purely visual separation produces an interactive control consumers don't intend"
        redirect: "render plain `<div>`s with explicit `divide-y divide-border` (or `<Divider>`) when you want section separators without disclosure behavior"

  - name: Avatar
    intent_group: Organizing & displaying content
    intent: User or entity representation with an image, initials fallback, or icon fallback
    package: "@umichkisa-ds/web"

    pick_when:
      - "representing a user, member, author, or contact in the UI (header user menu, contributor lists, comment threads)"
      - "the surface needs a small circular image with a graceful fallback when the image is missing or fails to load"
    reject_when:
      - "the image is a content image, not an identity glyph (use plain `<img>`)"
      - "the surface is a brand mark or logo (use `<Icon>` with the registered brand entry, or an inline `<img>`)"

    notable_props:
      - name: src
        type: "string"
        pick_guidance: "image URL. If omitted or the image fails to load, falls back to initials (if `name` provided) or the user-round icon."
      - name: name
        type: "string"
        pick_guidance: "the entity's display name. Used for `aria-label` on every render path AND for computing initials when `src` is missing/failing."
      - name: size
        type: "enum: sm | md | lg"
        default: md
        pick_guidance: "`sm` (32px) for inline lists / comment authors; `md` (40px) default for nav and cards; `lg` (56px) for profile headers"

    intrinsic_behavior:
      - "render path resolves in order: image (if `src` and not errored) → initials (if `name`) → fallback `user-round` Icon"
      - "fixed `bg-brand-primary text-brand-foreground` for initials/icon fallback — Avatar's brand presence is part of the contract"
      - "image errors are tracked internally via `useState` — failed images automatically swap to the next fallback path without consumer intervention"
      - "always renders `role=\"img\" aria-label={name}` (or `\"User avatar\"` if `name` omitted) so screen readers announce the avatar regardless of which fallback is showing"

    anti_patterns:
      - pattern: "passing a `className` that overrides the avatarVariants `bg-*` / `text-*` / `rounded-full` classes"
        why: "Avatar's circular shape + brand-primary fallback color are part of its contract; overriding produces an Avatar that looks DS but isn't"
        redirect: "if a non-circular or non-brand-colored variant is needed, request via ds-fix-during-migration"

  - name: Badge
    intent_group: Organizing & displaying content
    intent: Short status label or count — semantic state, category tags, numeric counts
    package: "@umichkisa-ds/web"

    pick_when:
      - "rendering a short label that signals status, count, or category (success / warning / error / info / brand emphasis)"
      - "the label sits inline next to other content (table cell, list item, card header)"
      - "the text is 1–3 words or a number"
    reject_when:
      - "the surface is a full-width contextual message with prose (use `Alert`)"
      - "the surface is a transient post-action notification (use `Toaster` + `toast()`)"
      - "the surface is interactive — tag-with-remove or filter pill (compose with a button or use a custom chip; Badge is not interactive by contract)"

    variants:
      - name: default
        pick_when:
          - "neutral category tag with no semantic state (\"Beta\", \"Draft\", a tag chip)"
        reject_when:
          - "the label communicates a semantic state — use the matching `success` / `warning` / `error` / `info` variant instead"
      - name: brand
        pick_when:
          - "marking high-emphasis content for the user (\"New\", \"Featured\", \"Recommended\") where brand color is appropriate"
        reject_when:
          - "communicating a state — use the semantic variants. Brand is for emphasis, not status."
      - name: success
        pick_when:
          - "indicating a successful state — \"Active\", \"Approved\", \"Paid\""
      - name: warning
        pick_when:
          - "indicating a non-blocking issue or attention-needed state — \"Pending\", \"Action required\""
      - name: error
        pick_when:
          - "indicating a failure / blocking state — \"Failed\", \"Rejected\", \"Overdue\""
      - name: info
        pick_when:
          - "neutral informational state — \"Info\", \"Note\", non-warning system message"
      - name: outline
        pick_when:
          - "low-emphasis neutral chip where the surface needs minimal visual weight"
        reject_when:
          - "the chip carries a semantic status — use the matching semantic variant; outline is the wrong signal for state (see cross-invariant `feedback-status-variant`)"

    notable_props:
      - name: variant
        type: "enum: default | brand | success | warning | error | info | outline"
        default: default
        pick_guidance: "see the variants block above — semantic variants for status, brand for emphasis, default/outline for neutral"
      - name: size
        type: "enum: sm | md"
        default: md
        pick_guidance: "`md` is default; `sm` for badges inside table cells or other dense surfaces"
      - name: asChild
        type: "boolean"
        default: false
        pick_guidance: "renders the styling onto a child element via Radix Slot — use when the badge needs to BE a link or button (`<Badge asChild><a href=\"...\">…</a></Badge>`)"

    intrinsic_behavior:
      - "renders an inline `<span>` (or the child element when `asChild`) with `inline-flex items-center justify-center gap-1` and the variant's bg/border/text tokens"
      - "fixed `w-fit whitespace-nowrap shrink-0 truncate` — Badge does NOT wrap or expand; long content truncates"
      - "every variant pairs a colored border with a `-subtle` background and `text-foreground` for readable text-on-tinted-bg (per the foundational color contract)"

    anti_patterns:
      - pattern: "using `variant=\"outline\"` (or `default`) for status content like \"Active\" / \"Failed\" / \"Pending\""
        why: "outline / default are neutral chips; status content needs semantic color signaling. See cross-invariant `feedback-status-variant`."
        redirect: "use `success` / `warning` / `error` / `info` for status; reserve `outline` / `default` for neutral category chips"

    see_also:
      - feedback-status-variant

  - name: Card
    intent_group: Organizing & displaying content
    intent: Bordered container grouping related content (feature summary, list item, dashboard tile)
    package: "@umichkisa-ds/web"

    pick_when:
      - "grouping related content into a visually distinct, bordered region"
      - "list-item or dashboard-tile surfaces"
      - "compose with CardHeader / CardTitle / CardDescription / CardContent / CardFooter for typical structure"
    reject_when:
      - "the surface is the whole page shell (use `Container`)"
      - "the surface is a popover or modal anchored to a trigger (use `Popover` or `Dialog`)"
      - "the content has no internal structure and just needs a subtle background (use `bg-surface-subtle` directly on a div)"

    notable_props:
      - name: hoverable
        type: "boolean"
        default: false
        pick_guidance: "set true ONLY when the entire card is interactive (clickable / navigable); applies brand-accent-subtle hover bg + brand-primary border, and propagates a `group` hover so CardTitle text turns brand-primary"

    intrinsic_behavior:
      - "owns outer padding (`p-4`) and inter-child vertical gap (`gap-4`) via `flex flex-col`"
      - "renders `bg-surface border border-border rounded-md` by default — flat, depth-by-border (no shadow)"
      - "`min-w-0` so it shrinks correctly inside flex/grid parents"
      - "when `hoverable`, applies a `group` so CardTitle text picks up the brand-primary color on group hover"

    compound_parts:
      - name: CardHeader
        kind: optional_child
        owns: "Element-tier vertical gap (`gap-2`) between CardTitle and CardDescription"
      - name: CardTitle
        kind: optional_child
        owns: "title typography and group-hover text color"
        invariant: "renders `<h3>` by default; override semantic level via `as` prop, not by wrapping in another heading"
      - name: CardDescription
        kind: optional_child
        owns: "muted body-sm text with `line-clamp-3`"
      - name: CardContent
        kind: optional_child
        owns: "fill remaining vertical space (`flex-1 overflow-hidden break-words`); does NOT own padding"
        invariant: "Card owns padding via its own `p-4`; CardContent must NOT add padding"
      - name: CardFooter
        kind: optional_child
        owns: "Element-tier horizontal gap (`gap-2`) between footer items"

    anti_patterns:
      - pattern: "passing padding utilities (`p-*`, `px-*`, `py-*`) via className on Card or CardContent"
        why: "Card owns padding via its own `p-4`; overriding inflates the card and breaks content-width math, and adding padding on CardContent double-pads inside an already-padded parent"
        redirect: "if Card's default padding feels wrong, the surface is being misused — pick a different DS component or open a ds-fix-during-migration ticket for a Card variant"
      - pattern: "passing `bg-*` via className on Card to change background color"
        why: "Card surface is `bg-surface` by design; tinting changes the depth signal (subtle/muted are reserved for elevated/deprioritized roles per the foundational color contract)"
        redirect: "if a tinted card is needed, request a Card variant via ds-fix-during-migration; do not override"
      - pattern: "wrapping Card around a single inline element (text, icon)"
        why: "Card's `flex-col + p-4 + gap-4` contract is sized for multi-child structure; wrapping a single inline element wastes space and signals 'this is structured content' to readers"
        redirect: "use a Badge, a tag, or inline styling — Card is not a generic surface wrapper"

    see_also:
      - ds-layout-no-utility-override

  - name: Divider
    intent_group: Organizing & displaying content
    intent: Visual separator (horizontal rule or vertical rule between inline items)
    package: "@umichkisa-ds/web"

    pick_when:
      - "separating two adjacent content regions with a thin neutral line (between sections of a card, between toolbar groups)"
      - "the separation is genuinely visual — there's no semantic structure to encode (in which case use `<section>` boundaries instead)"
    reject_when:
      - "the separator is between rows of a list — list items already have layout via `gap-*` or `divide-y` on the parent"
      - "the surface is a Table — TableBody owns `divide-y divide-border` between rows automatically"
      - "the visual goal is whitespace separation, not a line (increase `gap-*` instead)"

    notable_props:
      - name: orientation
        type: "enum: horizontal | vertical"
        default: horizontal
        pick_guidance: "`horizontal` (default) renders `border-t w-full`; `vertical` renders `border-l self-stretch h-auto` and requires the parent to be a flex row with bounded height"

    intrinsic_behavior:
      - "renders a semantic `<hr>` with `role=\"separator\"` and `aria-orientation` mirroring the prop"
      - "color is fixed to `border-border` — the depth-carrying neutral line"
      - "vertical orientation depends on parent flex layout for height — Divider does not set its own intrinsic height"

    anti_patterns:
      - pattern: "passing color utilities (`border-*`, `text-*`) via className to recolor the divider"
        why: "the depth-carrying neutral border is part of the foundational color contract — recoloring breaks the consistent feel of separators across the app"
        redirect: "leave the color at `border-border`; if a stronger separator is needed, request `border-strong` variant via ds-fix-during-migration"

  - name: Table
    intent_group: Organizing & displaying content
    intent: Structured tabular data with sortable columns, optional caption, and required mobile-list pair
    package: "@umichkisa-ds/web"

    pick_when:
      - "displaying tabular data with multiple columns where row-by-column comparisons matter"
      - "API reference tables, admin dashboards, structured list data"
      - "the data has 2+ columns AND each row represents a distinct record"
    reject_when:
      - "the data is a single column — use a list (`<ul>` / `<ol>` with `divide-y`)"
      - "the surface is a card grid where rows are visual tiles, not data rows (use `Grid` with `Card` children)"
      - "the columns wouldn't fit on mobile and there's no `<TableMobileList>` companion (see cross-invariant `table-mobile-pair` — multi-column tables require BOTH desktop and mobile renderings)"

    notable_props:
      - name: size
        type: "enum: sm | md"
        default: md
        pick_guidance: "`md` (default) for typical content tables — `type-body` cells, generous padding. `sm` for dense reference tables (API references, admin lists). The size propagates to TableHead / TableCell / TableFooter via React Context."

    intrinsic_behavior:
      - "wraps `<table>` in a `<div className=\"w-full overflow-x-auto\">` — horizontal overflow scrolls instead of breaking layout"
      - "`size` is exposed via internal `TableSizeContext` so children (TableHead / TableCell / TableFooter) pick correct padding + typography without prop drilling"
      - "TableHeader applies `border-b border-brand-primary` (brand emphasis on the header row)"
      - "TableBody applies `divide-y divide-border` between rows — no per-row border config"
      - "TableRow inside `<tbody>` applies `hover:bg-brand-accent-subtle` (selector `[tbody_&]` excludes header rows from hover)"

    compound_parts:
      - name: TableHeader
        kind: required_child
        invariant: "wraps `<th>` rows; styled as the brand-bordered header section"
      - name: TableBody
        kind: required_child
        owns: "row dividers (`divide-y divide-border`)"
      - name: TableRow
        kind: required_child
      - name: TableHead
        kind: required_child
        owns: "header-cell typography (brand-primary, !font-medium, size-driven padding)"
      - name: TableCell
        kind: required_child
      - name: TableFooter
        kind: optional_child
        owns: "footer styling (border-t border-strong, surface-subtle bg, label/caption typography)"
      - name: TableCaption
        kind: optional_child
        invariant: "renders below the table (`mt-4 type-caption text-muted-foreground`); use for the \"* Required prop.\" caption on API ref tables, etc."
      - name: TableMobileList
        kind: paired_responsive_sibling
        invariant: "REQUIRED for any multi-column Table — render `<Table className=\"hidden md:block\">` AND `<TableMobileList className=\"block md:hidden\">` together. See `table-mobile-pair` cross-invariant."
      - name: TableMobileItem
        kind: required_child
        owns: "TableMobileList row — one per data row; renders as `<li className=\"flex flex-col gap-1 …\">` so the row's columns stack vertically"

    anti_patterns:
      - pattern: "shipping a multi-column Table without a paired `<TableMobileList>`"
        why: "multi-column tables either overflow horizontally on mobile (the wrapping `overflow-x-auto` becomes a horizontal scrollbar that hides data) or shrink columns below readability"
        redirect: "ship both: `<Table className=\"hidden md:block\">` for ≥md viewports AND `<TableMobileList className=\"block md:hidden\">` rendering one TableMobileItem per row for mobile. See cross-invariant `table-mobile-pair`."

    see_also:
      - table-mobile-pair
      - ds-layout-no-utility-override

  # ============================================================
  # intent_group: Showing feedback to the user
  # ============================================================

  - name: Alert
    intent_group: Showing feedback to the user
    intent: Inline contextual message — validation summary, feature caveat, important note that lives within the page flow
    package: "@umichkisa-ds/web"

    pick_when:
      - "delivering a contextual message that should remain visible (validation summary at the top of a form, important page-level note)"
      - "the message is tied to the surrounding content's context (an inline warning above a form section)"
      - "the user benefits from seeing the message until they act on or read past it (it does NOT auto-dismiss)"
    reject_when:
      - "the message is a transient post-action notification that should auto-dismiss (use `Toaster` + `toast()`)"
      - "the message is a short status label or count next to other content (use `Badge`)"
      - "the message is a full-page state when there's no content (use `StatusView`)"
      - "the message is a tooltip or popover anchored to a trigger (use `Tooltip` or `Popover`)"

    variants:
      - name: info
        pick_when:
          - "neutral informational message — \"This page uses cookies\", configuration tip, helpful context"
        reject_when:
          - "the message communicates success/warning/error — use the matching variant"
      - name: success
        pick_when:
          - "confirming an action completed — \"Settings saved\", \"Payment received\""
      - name: warning
        pick_when:
          - "non-blocking issue or attention-needed — \"Your session expires in 5 minutes\", \"This action will affect 12 users\""
      - name: error
        pick_when:
          - "blocking failure or validation summary — \"Could not save\", \"3 fields have errors\""

    notable_props:
      - name: variant
        type: "enum: info | success | warning | error"
        default: info
        pick_guidance: "see variants block above; semantic state must match content"
      - name: title
        type: "string"
        pick_guidance: "optional bold-prefix line above the body. Use for short summaries (\"Saved\", \"Validation errors\"). Omit when the body content is the whole message."
      - name: icon
        type: "IconName | null"
        pick_guidance: "by default Alert renders a variant-default icon (info → `info`, success → `circle-check`, warning → `triangle-alert`, error → `circle-x`). Pass an explicit `IconName` to override; pass `null` to suppress the icon entirely."

    intrinsic_behavior:
      - "renders an inline `flex items-start gap-2` row with a leading icon (color-matched to variant) + a content stack (title + body)"
      - "background and border use the variant's `-subtle` bg + solid border combo (per the foundational color contract for feedback states)"
      - "title renders as `<p><strong>{title}</strong></p>` at `type-body-sm`; body renders at `type-body-sm text-foreground` — semantic structure is intentionally simple, no `role=\"alert\"` (Alert is for visible inline content, not assertive announcements; for assertive use `toast.error`)"

    anti_patterns:
      - pattern: "using `variant=\"info\"` (or any variant) as a styled box wrapper for non-message content"
        why: "Alert is a feedback affordance — its variants encode semantic state. Using it as a generic colored box dilutes the variant signal and confuses screen-reader users who expect a message"
        redirect: "for tinted content boxes that aren't messages, use a `<div>` with explicit `bg-info-subtle` / `bg-success-subtle` etc. utilities, OR a Card variant"
      - pattern: "using a neutral `default` / `outline` styling on Alert for status content"
        why: "Alert variants ARE the semantic-state signal. There is no neutral Alert variant by design — neutral content doesn't belong in Alert."
        redirect: "render plain `<p className=\"type-body-sm text-foreground\">…</p>` for neutral text; reserve Alert for the four semantic states"

    see_also:
      - feedback-status-variant

  - name: Toaster
    intent_group: Showing feedback to the user
    intent: Mount-once root for transient post-action notifications fired imperatively via `toast(message, options)`
    package: "@umichkisa-ds/web"

    pick_when:
      - "the app needs transient post-action notifications (\"Settings saved\", \"Copied to clipboard\", \"Failed to save — retry\") that auto-dismiss"
      - "exactly ONE Toaster is mounted at the application root (typically in the root layout / `_app`)"
      - "messages are fired imperatively in response to user actions, not rendered conditionally based on state"
    reject_when:
      - "the message belongs in the page flow as visible context (use `Alert`)"
      - "the message is a full-page state with no content (use `StatusView`)"
      - "rendering a second Toaster anywhere else in the tree (Toaster is mount-once — duplicate roots produce duplicate toasts)"

    notable_props:
      - name: position
        type: "enum: top-center | top-left | top-right | bottom-center | bottom-left | bottom-right"
        default: top-center
        pick_guidance: "leave at default (`top-center`) for app-wide consistency unless a product-design decision overrides"
      - name: duration
        type: "number (ms)"
        default: 4000
        pick_guidance: "leave at default unless toasts are routinely too short / too long for the audience"
      - name: expand
        type: "boolean"
        pick_guidance: "expand stacks toasts on hover — useful for power users; omit unless requested"
      - name: visibleToasts
        type: "number"
        pick_guidance: "max stack size before older toasts roll off — leave at sonner default unless the surface frequently fires bursts"

    intrinsic_behavior:
      - "wraps `sonner`'s `<Toaster>` with KISA-branded styling — every variant pairs `border-{state} bg-{state}-subtle` per the foundational color contract"
      - "co-exported with the imperative `toast(message, options)` trigger function from the same module — `toast.success(...)`, `toast.error(...)`, `toast.warning(...)`, `toast.info(...)` map to the styled variants"
      - "icons for each variant are pre-wired to the DS Icon registry (`circle-check` / `info` / `triangle-alert` / `circle-x` at size `sm`) — never raw lucide-react"
      - "close button is hidden by default (`closeButton={false}`); toasts dismiss via duration timeout or imperative `toast.dismiss(id)`"
      - "always uses `theme=\"light\"` — Toaster does NOT honor a dark theme (consistent with the no-dark-mode contract)"

    anti_patterns:
      - pattern: "mounting `<Toaster>` more than once in the app tree"
        why: "each Toaster instance subscribes to the global `toast` queue; multiple mounts produce duplicate visible toasts on every fire"
        redirect: "mount exactly one `<Toaster>` at the app root (root layout in Next.js, top of the App tree elsewhere). Component code calls `toast(...)` directly — no Toaster mount needed at call sites."
      - pattern: "rendering `<Toaster>` and never calling `toast(...)` (or vice versa — calling `toast(...)` without Toaster mounted)"
        why: "Toaster is the renderer; toast is the trigger — without both, notifications silently no-op"
        redirect: "always pair them: Toaster at the root, `toast(...)` at the action site"

  - name: StatusView
    intent_group: Showing feedback to the user
    intent: Full-region (or full-viewport) status state for surfaces with no content — empty / 404 / auth gate / error
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface has no content to show because of an empty/missing/blocked state (`not-found`, `not-authorized`, `not-logged-in`, `error`)"
      - "the user benefits from a centered status display with an icon, title, and short description"
      - "this is a page-region or page-level state, not an inline message"
    reject_when:
      - "the message belongs inline in the page flow (use `Alert`)"
      - "the page IS rendering content but with a transient notification (use `Toaster` + `toast()`)"
      - "the page is loading — there's content coming, just not yet (use `LoadingSpinner` or `Skeleton`)"
      - "the surface is a single component with no content (use a smaller empty state inline; StatusView is a region/page-level affordance)"

    variants:
      - name: not-found
        pick_when:
          - "the requested resource doesn't exist — 404 routes, deleted records"
      - name: not-authorized
        pick_when:
          - "the user is logged in but lacks permission for the resource"
      - name: not-logged-in
        pick_when:
          - "the resource requires auth and the user is not signed in"
      - name: error
        pick_when:
          - "an unexpected failure occurred — error.tsx boundaries, runtime errors"

    notable_props:
      - name: variant
        type: "enum: not-found | not-authorized | not-logged-in | error"
        required: true
        pick_guidance: "see variants block; the variant pre-fills icon + title + description in Korean"
      - name: code
        type: "string"
        pick_guidance: "optional large status code rendered above the title (e.g. \"404\", \"500\"). When provided, the variant icon shrinks and renders inline next to the title instead of as the hero glyph."
      - name: icon
        type: "IconName"
        pick_guidance: "override the variant's default icon when the page-specific context calls for a different glyph. Must be in the Icon registry."
      - name: title
        type: "string"
        pick_guidance: "override the variant's default Korean title — pass an English / domain-specific title when needed"
      - name: description
        type: "string"
        pick_guidance: "override the variant's default Korean description"
      - name: action
        type: "ReactNode"
        pick_guidance: "optional action area below the description — typically `<Button>` or `<LinkButton>` (\"Go home\", \"Sign in\", \"Retry\")"
      - name: fullScreen
        type: "boolean"
        default: false
        pick_guidance: "set true ONLY for app-shell-level states (root error.tsx, full-page auth gate) — `fixed inset-0 z-50` occludes any surrounding header/footer. For page-region empty states (e.g. inside a Card or page section) leave at default `false`."

    intrinsic_behavior:
      - "centered column layout — icon (xl) OR `code` (display typography) on top, title (`type-h2 text-brand-primary`) + description (`type-body text-muted-foreground`), optional action below"
      - "renders `role=\"status\" aria-live=\"polite\"` so screen readers announce the state when it appears"
      - "Korean default copy on each variant — override via `title` / `description` for non-Korean surfaces"
      - "`fullScreen` toggles between `fixed inset-0 z-50` (full-viewport overlay) and `w-full h-full` (fills its containing region)"

    anti_patterns:
      - pattern: "passing `fullScreen` on a StatusView rendered inside a card / section / sub-region"
        why: "`fullScreen` applies `fixed inset-0 z-50` — the StatusView occludes the entire viewport, not just the containing card; consumers see a 'page-takeover' empty state where they expected a region-scoped one"
        redirect: "leave `fullScreen` at default `false` for region-level states; use `fullScreen` ONLY for app-shell error pages or full-page auth gates"

  - name: LoadingSpinner
    intent_group: Showing feedback to the user
    intent: Wait state with no skeletonable layout — initial fetch, button submit, overlay content load
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface is loading and there's no known layout to skeleton — initial page fetch, modal content load, button submit"
      - "the wait is short enough that a structural skeleton would feel like overkill"
      - "the spinner's purpose is to signal 'something is happening', not to preserve content shape"
    reject_when:
      - "the loading content has a known layout (use `Skeleton` — preserves perceived layout stability)"
      - "the action is a form submit on a `Form.Button` — Form.Button auto-disables and shows pending state internally; no extra spinner needed"
      - "the wait is permanent / there is no content (use `StatusView` with `variant=\"error\"` or similar)"

    notable_props:
      - name: size
        type: "enum: sm | md | lg"
        default: md
        pick_guidance: "`sm` (20px) for inline spinners (button-internal, list-item); `md` (32px) default for modal/region loading; `lg` (48px) for full-page wait states"
      - name: label
        type: "string"
        default: "\"Loading\""
        pick_guidance: "always applied as `aria-label` for screen readers. Override only when a more specific label fits (\"Loading messages\", \"Saving...\")"
      - name: showLabel
        type: "boolean"
        default: false
        pick_guidance: "set true to render the label as visible text below the spinner — use on full-page wait surfaces where a visible message helps; leave false for inline / button-internal spinners"

    intrinsic_behavior:
      - "renders a `.ds-spinner` element (DS-owned CSS class) sized via `.ds-spinner-{sm|md|lg}` — never raw `<svg>` or third-party spinner"
      - "spinner uses the brand-accent (maize) top border + neutral border for the rotating ring; animation is the `ds-spin` keyframe defined in `theme.css`"
      - "`role=\"status\"` + `aria-label` on the spinner ring so screen readers announce the wait state"
      - "visible label (when `showLabel`) renders at `type-body-sm !font-semibold text-brand-primary` — paired typography contract"

    anti_patterns:
      - pattern: "using LoadingSpinner where Skeleton would preserve layout"
        why: "spinner shows 'something is loading' without preserving the content shape; for known-layout surfaces (lists, cards, tables) Skeleton produces less perceived layout shift"
        redirect: "if the loading content has a predictable layout, use `Skeleton` — reach for LoadingSpinner only when there's no skeletonable structure"

  - name: Skeleton
    intent_group: Showing feedback to the user
    intent: Loading placeholder that preserves a known layout shape
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface has a predictable layout (text rows, list items, card headers) and benefits from preserved structure during load"
      - "the wait is long enough that perceived layout stability matters (>~300ms)"
      - "the consumer can size the skeleton to match the eventual content (`w-32 h-4`, `w-full h-12`)"
    reject_when:
      - "the loading state has no predictable layout (use `LoadingSpinner`)"
      - "the layout already exists and just needs a wait indicator (use `LoadingSpinner` inline)"

    notable_props:
      - name: variant
        type: "enum: rectangular | circular"
        default: rectangular
        pick_guidance: "`rectangular` (default) for text rows, card placeholders, image stand-ins — `rounded-md w-full`. `circular` for avatar / circular-image placeholders — `rounded-full`."

    intrinsic_behavior:
      - "renders a `bg-border` element with the `ds-pulse` animation (2s ease-in-out infinite) — the DS-owned pulse keyframe"
      - "consumer sizes via `className` (`w-32 h-4`, `h-12`, etc.); Skeleton itself does NOT default to a specific size"
      - "rectangular vs. circular only differ in border-radius (`rounded-md` vs. `rounded-full`); width/height come from consumer className"

    anti_patterns:
      - pattern: "using a custom `animate-pulse` on a plain `<div className=\"bg-gray-200\">` instead of Skeleton"
        why: "the consumer has to remember the right color (`bg-border`), the right animation (`ds-pulse`), and the right border-radius — Skeleton encapsulates all three"
        redirect: "use `<Skeleton className=\"w-32 h-4\">` — pass dimensions via className, leave the rest to Skeleton"

  # ============================================================
  # intent_group: Overlays & dialogs
  # ============================================================

  - name: Dialog
    intent_group: Overlays & dialogs
    intent: Modal that blocks the page — confirm prompts, lightbox forms, detail views
    package: "@umichkisa-ds/web"

    pick_when:
      - "the user must confirm or complete the action before continuing — block the page until they respond"
      - "the surface is a confirm prompt, a focused form, or a detail view that benefits from full attention"
      - "the modal returns to the page after dismissal — flow continues, not navigation"
    reject_when:
      - "the surface is non-modal floating content (filter panel, mini-form, popup info — use `Popover`)"
      - "the surface is a context menu / action list anchored to a trigger (use `Dropdown`)"
      - "the surface is a brief helper text on hover/focus (use `Tooltip`)"
      - "the surface is a transient post-action notification (use `Toaster` + `toast()`)"
      - "the action navigates to a separate page where the modal context wouldn't make sense (use route navigation)"

    notable_props:
      - name: open / defaultOpen / onOpenChange
        type: "boolean / boolean / (open: boolean) => void (passthrough to Radix Dialog.Root)"
        pick_guidance: "controlled (`open` + `onOpenChange`) when state is owned outside (parent triggers programmatically); uncontrolled (`defaultOpen` or no props) when DialogTrigger is the only opener"

    intrinsic_behavior:
      - "wraps Radix UI Dialog primitive — focus trap, escape-to-close, and aria-modal semantics are inherited from Radix"
      - "DialogContent owns the overlay scrim (`overlay` token at 40%) and centered modal box (`bg-surface rounded-lg p-6 max-w-md`); consumers do NOT compose the scrim or positioning themselves"
      - "DialogContent ships an X close button automatically in the top-right (no need to render DialogClose unless an additional dismiss affordance is needed in the body/footer)"
      - "every Dialog requires a DialogTitle for screen readers — Radix throws a dev-time warning if it's missing. DialogDescription is recommended but optional."

    compound_parts:
      - name: DialogTrigger
        kind: required_child
        invariant: "renders the element that opens the dialog. `asChild` passes the open handler onto a custom child (e.g. wrap a `<Button>` to make it the trigger)."
      - name: DialogContent
        kind: required_child
        owns: "scrim, centered modal positioning, sizing (`max-w-md` default), X close button, escape-key wiring"
        invariant: "Dialog owns its layout — do NOT add `flex` / `overflow` / `h-*` / `max-h-*` utilities via className to force size. See `ds-layout-no-utility-override`."
      - name: DialogTitle
        kind: required_child
        owns: "modal heading (`type-h3 text-foreground`)"
        invariant: "every Dialog needs a DialogTitle for accessibility — even if visually hidden via `sr-only` className"
      - name: DialogDescription
        kind: optional_child
        owns: "subtext below the title (`type-body-sm text-muted-foreground`)"
      - name: DialogFooter
        kind: optional_child
        owns: "action button row (`flex justify-end gap-2 mt-4`) — typically a Cancel + Confirm pair"
      - name: DialogClose
        kind: optional_child
        invariant: "use only when an additional dismiss affordance is needed beyond the auto-rendered X (e.g. a body 'Cancel' link). `asChild` passes close-handler onto a custom child."

    anti_patterns:
      - pattern: "rendering a `<Button>` outside DialogTrigger and managing `open` state to open the dialog imperatively when DialogTrigger could do it declaratively"
        why: "DialogTrigger handles focus restoration to the trigger element on close; manual open-state management often loses focus restoration, leaving keyboard focus on the body/document instead of returning to the opener"
        redirect: "wrap the opener in `<DialogTrigger asChild><Button>...</Button></DialogTrigger>` whenever the open is triggered by a single visible element"
      - pattern: "passing `flex` / `overflow-*` / `h-*` / `max-h-*` via className on DialogContent to force modal size"
        why: "DialogContent owns its layout shape — these utilities compete with internal positioning and produce clipped overlays, double scrollbars, or modal content that escapes the viewport"
        redirect: "if Dialog's default sizing doesn't fit, request a Dialog size variant via ds-fix-during-migration. See `ds-layout-no-utility-override`."

    see_also:
      - ds-layout-no-utility-override

  - name: Dropdown
    intent_group: Overlays & dialogs
    intent: Context menu / action list anchored to a trigger — toolbar overflow, table-row actions, user-menu
    package: "@umichkisa-ds/web"

    pick_when:
      - "presenting a short list of discrete actions anchored to a trigger element (more-options ⋯, user menu, table row actions)"
      - "the user clicks/taps to open and selects exactly one action that closes the menu"
      - "actions are commands or destinations, not data to compare"
    reject_when:
      - "the surface presents free-form content — form inputs, rich text, filter panel (use `Popover`)"
      - "the surface is a modal that requires a response before continuing (use `Dialog`)"
      - "the surface is one-of-many selection inside a form (use `Select` or `RadioGroup`)"
      - "the surface is brief helper text on hover (use `Tooltip`)"
      - "the surface is a paired-views switcher (use `Tabs`)"

    notable_props:
      - name: open / defaultOpen / onOpenChange
        type: "boolean / boolean / (open: boolean) => void (passthrough to Radix DropdownMenu.Root)"
        pick_guidance: "uncontrolled is the default — DropdownTrigger handles open/close; reach for controlled only when external state needs to drive the menu"

    intrinsic_behavior:
      - "wraps Radix UI DropdownMenu — keyboard navigation (arrow keys, escape, type-ahead), focus management, and aria semantics inherited from Radix"
      - "DropdownContent renders in a portal with the DS-branded chrome (`bg-surface border border-border rounded-md shadow-md`) and slides in from the trigger side"
      - "DropdownItem applies the brand-accent-subtle hover background; selected/active state turns brand-primary"
      - "DropdownSeparator renders a `border-t border-border` between item groups"

    compound_parts:
      - name: DropdownTrigger
        kind: required_child
        invariant: "renders the click-to-open element. `asChild` passes the open handler onto a custom child (e.g. wrap an `<IconButton>` for a more-options affordance)."
      - name: DropdownContent
        kind: required_child
        owns: "portal positioning, DS chrome, slide-in animation"
      - name: DropdownItem
        kind: required_child
        owns: "row layout (`flex items-center gap-2`), hover/focus styling, click handler"
        invariant: "each item represents one action; use `onSelect` (Radix) for the click handler so the menu closes automatically. Items destined for navigation can wrap an `<a>` via `asChild`."
      - name: DropdownGroup
        kind: optional_child
        owns: "labelled grouping of items (renders an `aria-label`'d group with optional visible label)"
        invariant: "use to cluster related actions (e.g. \"Account\" group with profile/settings/sign-out items); separate groups with DropdownSeparator"
      - name: DropdownSeparator
        kind: optional_child
        invariant: "horizontal divider between item groups; `border-t border-border`"

    anti_patterns:
      - pattern: "rendering a `<form>` or rich content inside DropdownContent"
        why: "Dropdown is for discrete actions — its keyboard model (arrow keys jump between items, type-ahead matches item text) actively fights free-form input. Forms inside Dropdown trap focus oddly and break type-ahead."
        redirect: "use `Popover` for free-form / form content; reserve Dropdown for action lists"
      - pattern: "using DropdownItem with raw `<a href>` instead of wrapping via `asChild`"
        why: "without `asChild`, the click handler closes the menu but the underlying `<a>` may not navigate (or vice versa); composition via `asChild` keeps both behaviors intact"
        redirect: "for navigation items, render `<DropdownItem asChild><a href=\"...\">…</a></DropdownItem>`"

  - name: Popover
    intent_group: Overlays & dialogs
    intent: Non-modal floating content anchored to a trigger — filter panel, mini-form, rich helper, color picker
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface is free-form content (form inputs, filters, rich text, charts) anchored to a trigger element"
      - "the user can dismiss by clicking outside without confirming an action — non-modal"
      - "the content is too rich for a Tooltip but doesn't need to block the page like a Dialog"
    reject_when:
      - "the surface is a list of discrete actions (use `Dropdown` — its keyboard model fits action lists)"
      - "the user must respond before continuing (use `Dialog` — Popover is dismissible by clicking outside)"
      - "the surface is brief on-hover helper text (use `Tooltip`)"
      - "the content is a Calendar specifically for date input (use `DatePicker` / `DateRangePicker` — they wrap a Popover around a Calendar)"

    notable_props:
      - name: open / defaultOpen / onOpenChange
        type: "boolean / boolean / (open: boolean) => void (passthrough to Radix Popover.Root)"
        pick_guidance: "uncontrolled by default — PopoverTrigger handles open/close. Controlled when external state drives visibility (e.g. open on field focus elsewhere)."
      - name: align (on PopoverContent)
        type: "enum: start | center | end"
        default: center
        pick_guidance: "controls horizontal alignment of the popover relative to the trigger"
      - name: sideOffset (on PopoverContent)
        type: "number"
        default: 4
        pick_guidance: "px gap between trigger and popover; leave at default unless the surface needs visual breathing room"

    intrinsic_behavior:
      - "wraps Radix UI Popover primitive — click-outside dismissal, escape-to-close, focus trap when `modal`, ARIA semantics inherited from Radix"
      - "PopoverContent renders in a portal with the DS-branded chrome (`bg-surface border border-border rounded-md p-4 shadow-md`)"
      - "fade + zoom animation on open/close, slide-in animation matching the popover's side relative to the trigger"
      - "non-modal by default (clicks outside DON'T require explicit dismissal) — reach for `modal` prop on Radix when the popover IS effectively a small dialog"

    compound_parts:
      - name: PopoverTrigger
        kind: required_child
        invariant: "click-to-open element; re-export of `RadixPopover.Trigger`. Use `asChild` to compose with a custom button."
      - name: PopoverContent
        kind: required_child
        owns: "portal positioning, DS chrome (`p-4` padding, surface bg, border, rounded), slide-in/zoom animations"

    anti_patterns:
      - pattern: "using Popover for a discrete-action list"
        why: "Popover lacks the keyboard model that Dropdown provides (arrow-key navigation, type-ahead, auto-close on item select); consumers reimplement these by hand and miss accessibility cases"
        redirect: "use `Dropdown` for action lists; reserve Popover for free-form content"
      - pattern: "passing `padding-*` via className on PopoverContent"
        why: "PopoverContent owns its `p-4` padding contract for visual consistency across all popovers in the app; overriding produces popovers that feel stylistically inconsistent"
        redirect: "if PopoverContent's default padding genuinely doesn't fit (e.g. a popover containing a Calendar that has its own padding), wrap children in a `<div className=\"-m-4\">` to negate, or request a Popover variant via ds-fix-during-migration"

  - name: Tooltip
    intent_group: Overlays & dialogs
    intent: Brief on-hover/focus helper text revealing the affordance name or short description
    package: "@umichkisa-ds/web"

    pick_when:
      - "wrapping an icon-only interactive (`IconButton`, icon-only `<a>` / `<button>`) so the affordance has a sighted-discoverable name"
      - "providing a short description for a control whose purpose isn't obvious from its label alone"
      - "the helper text is 1–6 words"
    reject_when:
      - "the helper text is a full sentence or paragraph (use `Popover` with text content, or render the description inline)"
      - "the helper text describes form field validation (use `FormItem` description / error slots)"
      - "the trigger has no associated affordance and tooltip is just decorative (drop it — tooltips are interaction hints, not decoration)"
      - "rendering the tooltip without a focusable trigger (Tooltip needs a focusable child for keyboard access — wrapping a non-interactive `<span>` makes the tooltip invisible to keyboard users)"

    notable_props:
      - name: content
        type: "string"
        required: true
        pick_guidance: "the tooltip body text (string only — no rich content). When wrapping `<IconButton>`, this MUST equal the IconButton's `aria-label` exactly. See `icon-button-tooltip-aria-label-match`."
      - name: children
        type: "ReactNode (the trigger element — must accept ref)"
        required: true
        pick_guidance: "the focusable trigger. Radix uses `asChild` internally — pass a single focusable element (Button, IconButton, `<a>`)."
      - name: side
        type: "enum: top | right | bottom | left"
        default: top
        pick_guidance: "preferred side — Radix flips automatically when the chosen side would clip; default `top` is right for most cases"
      - name: delayDuration
        type: "number (ms)"
        default: 200
        pick_guidance: "delay before show on hover; leave at default unless a faster/slower delay is product-justified"

    intrinsic_behavior:
      - "wraps Radix UI Tooltip — Provider, Root, Trigger, Portal, Content all internal; consumers see only the `content` + `children` API"
      - "tooltip bubble: `bg-brand-primary text-brand-foreground type-caption px-3 py-1.5 rounded-md` — navy bubble with maize text"
      - "open animation: `tooltip-in` keyframe (150ms ease-out); close: `tooltip-out` (100ms ease-in)"
      - "`Tooltip.Trigger` uses Radix `asChild` — the trigger element receives the hover/focus handlers without an extra wrapper"

    anti_patterns:
      - pattern: "wrapping a non-focusable element (e.g. plain `<span>`, `<div>`) as the Tooltip trigger"
        why: "the tooltip only opens on hover or keyboard focus; a non-focusable element receives no keyboard focus, so keyboard users never see the tooltip"
        redirect: "wrap a focusable interactive — IconButton, Button, `<a href>`, `<button>` — or add `tabIndex={0}` to the wrapper if it's genuinely a focusable region (rare)"
      - pattern: "passing rich content (`<div>`, multiple lines, formatted text) instead of a string into `content`"
        why: "Tooltip's `content` is typed as `string` and rendered as plain text in a small bubble; rich content breaks the contract and the visual contract of the bubble"
        redirect: "use `Popover` for rich content; reserve Tooltip for short string labels"
      - pattern: "tooltip content that does not equal the wrapped IconButton's `aria-label`"
        why: "screen-reader users hear the aria-label; sighted users read the tooltip — divergent text means the two audiences hear/see different affordance names"
        redirect: "make the tooltip content exactly equal the IconButton's `aria-label`. See `icon-button-tooltip-aria-label-match`."

    see_also:
      - icon-button-tooltip-aria-label-match

  # ============================================================
  # intent_group: Navigation & wayfinding
  # ============================================================

  - name: Tabs
    intent_group: Navigation & wayfinding
    intent: Switch between sibling views within the same page context — settings sections, dashboard panels, paired-content views
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface presents 2–6 sibling views that share a context (settings sections, profile tabs, dashboard panels)"
      - "switching between views is read-only — no commits, no data loss"
      - "all views fit naturally inside the same page boundary; no view requires its own URL"
    reject_when:
      - "the views are independent pages with their own URLs (use route navigation, not Tabs)"
      - "the views are progressive disclosure for the same content (use `Accordion`)"
      - "the views are a list of discrete actions (use `Dropdown`)"
      - "switching to another view would discard unsaved form state — Tabs do not warn on switch"
      - "more than ~6 views — Tabs become hard to scan; consider a sidebar nav or route navigation"

    notable_props:
      - name: value / defaultValue / onValueChange
        type: "string / string / (value: string) => void"
        pick_guidance: "controlled (`value` + `onValueChange`) when state is owned outside (URL sync, persisted preference); uncontrolled (`defaultValue`) for ephemeral in-page tabbing. With neither, Tabs auto-selects the first registered TabsTrigger."
      - name: variant
        type: "enum: underline | pill"
        default: underline
        pick_guidance: "`underline` (default) for top-of-page primary tabbing — selected tab gets a brand-primary underline. `pill` for compact in-card tabs or filter-pill UIs — selected tab gets a filled pill background."
      - name: size
        type: "enum: sm | md"
        default: md
        pick_guidance: "`md` is default for top-of-page tabs; `sm` for tabs inside cards / dense surfaces"

    intrinsic_behavior:
      - "manages selected-value state via internal Context (no Radix); auto-selects the first TabsTrigger that registers if neither `value` nor `defaultValue` is set"
      - "TabsTrigger registers/unregisters on mount/unmount — enables auto-selection without consumer wiring"
      - "TabsContent renders only when its `value` matches the active tab — content is unmounted when not active"
      - "underline variant: selected trigger gets `border-b-2 border-brand-primary text-brand-primary`; pill variant: selected trigger gets `bg-brand-primary text-brand-foreground rounded-md`"
      - "throws a runtime error if TabsList / TabsTrigger / TabsContent are rendered outside `<Tabs>` (the context guard surfaces missing root cleanly)"

    compound_parts:
      - name: TabsList
        kind: required_child
        owns: "horizontal trigger row, separator line under triggers (`border-b border-border` for underline variant)"
        invariant: "renders the row of TabsTriggers — exactly one per tab"
      - name: TabsTrigger
        kind: required_child
        owns: "individual tab button — registers `value` with Tabs context, selected-state styling per variant"
        invariant: "every trigger needs a unique `value: string`; the value pairs with TabsContent's `value` to determine visibility"
      - name: TabsContent
        kind: required_child
        owns: "the tab body — only mounts when its `value` matches the active tab"
        invariant: "every TabsTrigger needs a paired TabsContent with the same `value`"

    anti_patterns:
      - pattern: "managing tab state outside Tabs (e.g. parent `useState` + conditional render of children) instead of using `value`/`onValueChange`"
        why: "duplicates Tabs's internal state machine and fights the auto-select / register behavior; brittle on TabsTrigger / TabsContent re-renders"
        redirect: "use `<Tabs value={...} onValueChange={...}>` for controlled state, or `defaultValue` for uncontrolled"
      - pattern: "passing `flex` / `overflow-*` / `h-*` / `max-h-*` via className on Tabs or TabsContent to force layout"
        why: "Tabs owns its layout shape — column flex with TabsList on top and TabsContent below; forcing utilities competes with the contract and produces broken scrolling / clipped content"
        redirect: "if Tabs's default layout doesn't fit, wrap the outer Tabs in a sized container, or request a Tabs variant via ds-fix-during-migration. See `ds-layout-no-utility-override`."

    see_also:
      - ds-layout-no-utility-override

  - name: Pagination
    intent_group: Navigation & wayfinding
    intent: Navigate paged data — search results, table rows, bulletins, list views with server-paginated data
    package: "@umichkisa-ds/web"

    pick_when:
      - "rendering paged data where the user benefits from page numbers and explicit prev/next controls"
      - "the data set is large enough that one page doesn't cover it (~10+ pages)"
      - "the surface is a results list, table, or bulletin board — not infinite scrolling content"
    reject_when:
      - "infinite-scroll is the right pattern (feed, social timeline) — drop pagination, use intersection observer"
      - "the data fits on one screen (don't paginate; just render)"
      - "there are 2–3 pages only — show all pages without ellipsis or use a simpler prev/next pair"

    notable_props:
      - name: page
        type: "number (1-indexed)"
        required: true
        pick_guidance: "current page number; consumer manages this state and updates on `onPageChange`"
      - name: totalPages
        type: "number"
        required: true
        pick_guidance: "total page count from the server / data layer"
      - name: onPageChange
        type: "(page: number) => void"
        required: true
        pick_guidance: "fires when the user clicks a page number, prev, or next; consumer updates `page` and re-fetches"
      - name: siblingCount
        type: "number"
        default: 1
        pick_guidance: "number of sibling pages on each side of current. Default 1 produces `1 ... 4 [5] 6 ... 20`. Increase to 2 for more dense surfaces (`1 ... 3 4 [5] 6 7 ... 20`)."

    intrinsic_behavior:
      - "computes the visible page range internally — first + last + current + siblings + ellipsis as appropriate; consumer never assembles the page list"
      - "renders prev / next icon buttons (`chevron-left` / `chevron-right` via Icon registry) on either side of the page-number row"
      - "ellipsis (`...`) is rendered as a non-interactive span — clicks on it do nothing"
      - "current page button gets `bg-brand-primary text-brand-foreground` styling; siblings hover-tint with `bg-brand-accent-subtle`"
      - "every interactive element has the dual-ring focus pattern + 36×36 button size (`h-9 w-9`)"

    anti_patterns:
      - pattern: "computing the page range manually outside Pagination (e.g. `[1, 2, 3, 4, 5]` array) and rendering custom buttons"
        why: "Pagination already does the range math; reimplementing means the ellipsis logic, edge cases, and styling all drift"
        redirect: "pass `page` / `totalPages` / `onPageChange` to Pagination and let it own the range"
      - pattern: "rendering Pagination when `totalPages <= 1`"
        why: "single-page data doesn't need pagination — Pagination still renders prev/next buttons that go nowhere"
        redirect: "guard at the consumer: `{totalPages > 1 && <Pagination ... />}`"

  - name: ToggleGroup
    intent_group: Navigation & wayfinding
    intent: Segmented control for switching modes or filters — grid/list view, time-range pickers, multi-select filter chips
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface needs a compact mode-switcher — grid vs. list view, day/week/month time range, on/off-style mutually exclusive options"
      - "the options are 2–5 short labels (with optional icons) that fit in a row"
      - "selection is immediate — no submit step, no commit"
    reject_when:
      - "the options are 6+ — too dense for a segmented control (use `Tabs` or `Select`)"
      - "selection is part of a form that's submitted as a whole (use `RadioGroup` or `Form.Radio` for single-select; `Form.Checkbox` array for multi)"
      - "the options need long labels or descriptions (use `RadioGroup` with vertical layout)"
      - "the surface is a 'switch a single boolean' affordance (use `Switch`)"
      - "the options trigger discrete actions instead of selecting a state (use a row of `Button`s or `Dropdown`)"

    notable_props:
      - name: items
        type: "ToggleGroupItem[] — { value: string, label: string, icon?: ReactNode }"
        required: true
        pick_guidance: "the option list; `icon` slot accepts a rendered `<Icon>` element. Order matters — items render left-to-right in the order provided."
      - name: type
        type: "enum: single | multiple"
        default: single
        pick_guidance: "`single` (default) renders an ARIA radiogroup — one selected at a time, arrow keys cycle. `multiple` renders an ARIA group of toggle buttons — independent on/off per item."
      - name: value
        type: "string (single) | string[] (multiple)"
        required: true
        pick_guidance: "controlled — pair with `onValueChange`. ToggleGroup has no uncontrolled mode; consumers always own the state."
      - name: onValueChange
        type: "(value: string) => void (single) | (value: string[]) => void (multiple)"
        required: true
      - name: fullWidth
        type: "boolean"
        default: false
        pick_guidance: "set true to stretch the group + items to fill the parent's width (toolbar pattern); leave false for inline auto-sized usage"

    intrinsic_behavior:
      - "single mode: roving tabindex (selected item gets `tabIndex=0`, others `-1`); arrow keys cycle and select the next item; Home/End jumps to first/last"
      - "multiple mode: arrow keys move focus only — selection requires explicit click/space; first selected item (or first item if none) gets `tabIndex=0`"
      - "ARIA: single uses `role=\"radiogroup\"` with `role=\"radio\"` + `aria-checked` on items; multiple uses `role=\"group\"` with `role=\"button\"` + `aria-pressed` on items"
      - "selected item: `bg-brand-primary text-brand-foreground !font-semibold`; unselected: `text-muted-foreground hover:bg-brand-accent-subtle hover:text-brand-primary`"

    anti_patterns:
      - pattern: "using ToggleGroup for a long option list (6+ items)"
        why: "the segmented-control visual breaks down — labels get tiny, the row overflows; users can't scan options efficiently"
        redirect: "use `Tabs` for view-switching with longer labels, or `Select` for compact dropdown selection"
      - pattern: "wiring ToggleGroup as an uncontrolled component (no `value` / `onValueChange`)"
        why: "ToggleGroup has no internal selection state — without `value` / `onValueChange`, no item ever shows as selected"
        redirect: "always pass `value` + `onValueChange`; manage state in the consumer"

  # ============================================================
  # intent_group: Collecting user input
  # ============================================================

  - name: Input
    intent_group: Collecting user input
    intent: Single-line free-text input — names, emails, search terms, short identifiers
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface needs a one-line text field outside of a `<Form>` (search bar, filter input, ad-hoc query, controlled local state)"
      - "the value is short and free-form — name, email, URL, query, ID"
    reject_when:
      - "the input is a field inside a `<Form>` from `@umichkisa-ds/form` (use `Form.Input` — it wires `name`, validation, error display, and FormItem aria for free)"
      - "the value spans multiple lines (use `Textarea`)"
      - "the value is a constrained pick from a list (use `Select`, `RadioGroup`, or `ToggleGroup`)"
      - "the value is a date (use `DatePicker` / `DateRangePicker`, or `Form.DatePicker` inside a Form)"
      - "the value is boolean (use `Checkbox` or `Switch`)"

    notable_props:
      - name: invalid
        type: "boolean"
        default: false
        pick_guidance: "set when the value fails validation — sets `aria-invalid` and applies the `border-error` styling. Outside of `<Form>` the consumer drives this; inside `<Form>` use `Form.Input` and let it derive `invalid` from validation state."
      - name: type
        type: "string (HTML input type)"
        default: '"text"'
        pick_guidance: "leave at default for free text; set to `email` / `url` / `tel` / `search` / `password` / `number` when the browser's built-in input mode helps. Do NOT use `type=\"date\"` — use `DatePicker` instead so the visual matches DS."

    intrinsic_behavior:
      - "extends `React.InputHTMLAttributes<HTMLInputElement>` — every native input prop (`name`, `value`, `onChange`, `placeholder`, `disabled`, `required`, `autoComplete`, etc.) flows through"
      - "wires `aria-invalid={invalid}` and applies `border-error` + `focus-visible:border-error` when `invalid` is true"
      - "focus state replaces the default browser outline with `border-brand-primary` (no outline ring); disabled state is `bg-surface-subtle text-disabled-foreground` and pointer-events disabled"
      - "default text class is `type-body-sm` and `placeholder:text-muted-foreground`"

    anti_patterns:
      - pattern: "rendering bare `<Input>` inside a `<Form>` (from `@umichkisa-ds/form`) and wiring `name` / `value` / `onChange` manually"
        why: "Form's `Form.Input` wires the field through `react-hook-form` (registers the field, derives `invalid`, surfaces error text via FormItem); bare Input bypasses validation, error rendering, and the FormItem aria contract"
        redirect: "use `<Form.Input name=\"...\" />` inside `<Form>`; reach for raw `<Input>` only outside Forms"
      - pattern: "passing layout / sizing utilities (`w-32`, `flex-1`, `h-12`) via `className` to force a non-`w-full` shape"
        why: "Input is `w-full min-w-0` by design — sizing comes from the parent layout (FormItem, Grid cell, flex parent). Inline width overrides break responsive layouts and FormItem stacking."
        redirect: "let the parent layout (`FormItem`, `Grid`, flex container) own the width; if a narrower input is genuinely needed, wrap it in a sized parent: `<div className=\"w-32\"><Input /></div>`"

  - name: Textarea
    intent_group: Collecting user input
    intent: Multi-line free-text input — descriptions, comments, long-form messages
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface needs a multi-line text field outside of a `<Form>`"
      - "the value is long-form — comment, message, paragraph-length description, address block"
    reject_when:
      - "the field is inside a `<Form>` (use `Form.Textarea`)"
      - "the value fits on one line (use `Input`)"
      - "the surface needs a rich-text editor with formatting (out of DS scope — use a third-party editor)"

    notable_props:
      - name: invalid
        type: "boolean"
        default: false
        pick_guidance: "same contract as `Input.invalid` — drives `aria-invalid` and the error border. Inside `<Form>`, prefer `Form.Textarea` so this is derived."
      - name: rows
        type: "number"
        default: 3
        pick_guidance: "default 3 rows fits most short comment fields; bump to 5–8 for long-form descriptions. The user can still resize vertically (`resize-y`)."

    intrinsic_behavior:
      - "extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>` — every native textarea prop flows through"
      - "user can resize vertically (`resize-y`); horizontal resize is locked to keep layout stable"
      - "same focus / disabled / invalid styling as `Input` (border-brand-primary on focus, border-error on invalid, surface-subtle on disabled)"
      - "default text class is `type-body-sm`"

    anti_patterns:
      - pattern: "rendering bare `<Textarea>` inside a `<Form>` and wiring `name` / `value` / `onChange` manually"
        why: "same as Input — Form.Textarea wires through `react-hook-form`, derives `invalid`, surfaces FormItem error text"
        redirect: "use `<Form.Textarea name=\"...\" />` inside `<Form>`"
      - pattern: "disabling vertical resize via `className=\"resize-none\"` to lock height"
        why: "Textarea ships `resize-y` so users can expand for long input — locking it forces overflow scroll inside a small box, which hides content the user just typed"
        redirect: "if the surface really needs a fixed height, bump `rows` so the natural box is tall enough; do not disable resize"

  - name: Select
    intent_group: Collecting user input
    intent: Pick exactly one value from a structured option list (5+ options) — country, category, status filter
    package: "@umichkisa-ds/web"

    pick_when:
      - "the user picks one value from a list of 5+ options where a dropdown is more compact than visible options"
      - "the option list is long enough that surfacing every option (RadioGroup) would crowd the layout"
      - "outside of a `<Form>`, the consumer owns the value state directly"
    reject_when:
      - "the field is inside a `<Form>` (use `Form.Select`)"
      - "the option list is 2–5 short labels and ALL options should be visible (use `RadioGroup` or `ToggleGroup` for selection, `Form.Radio` inside a Form)"
      - "the value is binary on/off (use `Switch` or `Checkbox`)"
      - "the user picks multiple values (use a `Form.Checkbox` array, a multi-select pattern outside DS, or `ToggleGroup type=\"multiple\"`)"

    notable_props:
      - name: value
        type: "string"
        pick_guidance: "controlled — pair with `onValueChange`. Pass through to Radix `<Select.Root>`."
      - name: onValueChange
        type: "(value: string) => void"
        pick_guidance: "fires when the user picks an item; consumer updates `value` state"
      - name: defaultValue
        type: "string"
        pick_guidance: "uncontrolled-only initial value; do not combine with `value`"

    requires_context: null

    compound_parts:
      - name: SelectTrigger
        kind: required_child
        purpose: "the visible trigger button — shows current value or placeholder + chevron icon"
      - name: SelectContent
        kind: required_child
        purpose: "the floating popover that wraps the option list (rendered through Radix Portal)"
      - name: SelectItem
        kind: required_child
        purpose: "an option inside SelectContent — must carry a `value` prop matching one of the values used in `Select.value`"
      - name: SelectGroup
        kind: optional_child
        purpose: "groups items under a label inside SelectContent (e.g. categorized options)"
      - name: SelectSeparator
        kind: optional_child
        purpose: "visual divider between SelectGroups"

    intrinsic_behavior:
      - "wraps Radix `@radix-ui/react-select` — keyboard navigation (arrow keys, Home/End, type-ahead), ARIA roles, focus management come from Radix"
      - "`SelectTrigger` shows placeholder text in `text-muted-foreground` when no value is selected; chevron rotates / animates on open via Radix data attributes"
      - "`SelectContent` renders through `Radix.Portal` with `position=\"popper\"` (default) — animates in / out with `data-[state=open]` / `data-[state=closed]` classes; `min-w-32` and matches trigger width on `popper` mode"
      - "`SelectItem` shows a check icon (`<Icon name=\"check\" />`) in the left gutter when selected; hover / focus tints with `bg-brand-accent-subtle`"
      - "every interactive surface has the focus-visible border-brand-primary contract; disabled items are `text-disabled-foreground` and pointer-events disabled"

    anti_patterns:
      - pattern: "rendering bare `<Select>` inside a `<Form>` and wiring `value` / `onValueChange` to `register` manually"
        why: "Form.Select handles the controller pattern (Radix Select doesn't work with `register` directly because it's not a native input); manual wiring here is the most common form-bug source"
        redirect: "use `<Form.Select name=\"...\" />` inside `<Form>`"
      - pattern: "rendering raw `<select>` HTML element instead of the DS Select"
        why: "native select dropdowns vary visually per OS / browser, ignore DS focus / hover / typography contracts, and break the `border-error` invalid affordance"
        redirect: "always use the DS `<Select>` family — even for short option lists where a dropdown is appropriate"
      - pattern: "passing children to `<Select>` directly instead of routing them through `<SelectTrigger>` / `<SelectContent>` / `<SelectItem>`"
        why: "Radix Select.Root does not render its children inline — they must live inside `<Select.Trigger>` and `<Select.Content>`. Direct children are silently dropped."
        redirect: "always compose: `<Select><SelectTrigger placeholder=\"...\" /><SelectContent>{items}</SelectContent></Select>`"

  - name: Checkbox
    intent_group: Collecting user input
    intent: Boolean toggle or one item in a multi-select — accept terms, opt-in, multi-pick from a short list
    package: "@umichkisa-ds/web"

    pick_when:
      - "outside a `<Form>`, the surface needs a boolean toggle or a multi-select item with a single inline label"
      - "the affordance reads as 'check this' — opt-in, accept terms, include this filter, multi-select row"
      - "the visual needs to be a square check (settings, terms, granular permissions) — not a switch (background process toggle)"
    reject_when:
      - "the field is inside a `<Form>` (use `Form.Checkbox`)"
      - "the affordance is a binary on/off for a setting that takes effect immediately (use `Switch` — the visual reads as a toggle, not a confirmation)"
      - "the user picks exactly one from 2–5 options (use `RadioGroup`)"
      - "the label is more than a short single line, or needs a description (use `FormItem` + the bare control inside)"

    notable_props:
      - name: invalid
        type: "boolean"
        default: false
      - name: text
        type: "string"
        pick_guidance: "inline label text — when present, Checkbox wraps itself in a `<label>` so clicking the text toggles the box. Omit when the field is labeled by an external `<Label>` / `<FormItem>`."

    intrinsic_behavior:
      - "extends `React.InputHTMLAttributes<HTMLInputElement>` minus `type` — every native checkbox prop (`name`, `checked`, `defaultChecked`, `onChange`, `disabled`, `required`) flows through"
      - "renders a 20px square box with a custom check (`<svg>` polyline) that fades in via `peer-checked:opacity-100`; the underlying `<input type=\"checkbox\">` is visually hidden but hit-targetable across the whole control"
      - "when `text` is provided, the entire control + label is wrapped in a `<label>` so the label is part of the click target; when `text` is absent, the consumer provides labeling externally (Label / FormItem / aria-label)"
      - "checked state uses `bg-brand-primary border-brand-primary`; disabled+checked degrades to `disabled-foreground`; invalid sets `border-error`"

    anti_patterns:
      - pattern: "using `<Checkbox text=\"...\" />` AND wrapping it in a `<Label>` or `<FormItem>` so it has two label sources"
        why: "the inline `text` already gets wrapped in a `<label>` element — adding an external Label produces duplicated screen-reader announcements and an ambiguous click target"
        redirect: "either use the `text` prop OR an external Label / FormItem — never both. For Form-wired fields, always go through `Form.Checkbox` (which uses FormItem)."
      - pattern: "rendering bare `<Checkbox>` inside a `<Form>` and wiring `checked` / `onChange` manually"
        why: "Form.Checkbox wires through react-hook-form's controller pattern and integrates with FormItem's error display"
        redirect: "use `<Form.Checkbox name=\"...\" />` inside `<Form>`"

  - name: RadioGroup
    intent_group: Collecting user input
    intent: Pick exactly one from 2–5 visible options — small enumerated choice (priority, plan tier, yes/no/maybe)
    package: "@umichkisa-ds/web"

    pick_when:
      - "outside a `<Form>`, the user picks exactly one from a short visible option list (2–5)"
      - "all options should be visible at once for fast comparison — no benefit to hiding behind a dropdown"
      - "the labels are short enough to fit in the row (horizontal) or stack readably (vertical)"
    reject_when:
      - "the field is inside a `<Form>` (use `Form.Radio`)"
      - "the option list is 5+ and a dropdown is more compact (use `Select` or `Form.Select`)"
      - "the surface is a mode-switcher / segmented control (use `ToggleGroup type=\"single\"`)"
      - "the user picks multiple values (use `Checkbox` per option or `Form.Checkbox`)"

    notable_props:
      - name: value
        type: "string"
        pick_guidance: "controlled — pair with `onValueChange`"
      - name: onValueChange
        type: "(value: string) => void"
      - name: invalid
        type: "boolean"
        default: false
        pick_guidance: "applies `data-invalid` to the group root — RadioItems inside pick up the error border via `group-data-[invalid]:border-error`"
      - name: orientation
        type: "enum: vertical | horizontal"
        default: vertical
        pick_guidance: "vertical (default) is the safe choice — every label gets full readable width. Horizontal only when labels are very short (1–2 words) and there are 2–3 options."

    requires_context: null

    compound_parts:
      - name: RadioItem
        kind: required_child
        purpose: "an individual option — must carry `value` (matching one of the values used in `RadioGroup.value`) and `text` (inline label). Renders as a 20px circle with a 10px filled center on selection."

    intrinsic_behavior:
      - "wraps Radix `@radix-ui/react-radio-group` — arrow-key cycling, roving tabindex, ARIA roles come from Radix"
      - "renders a flex container — `flex-col gap-2` for vertical, `flex-row gap-4` for horizontal"
      - "selected state uses `bg-brand-primary border-brand-primary`; disabled+checked degrades to `disabled-foreground`; the invalid border is wired through the group's `data-[invalid]` attribute so individual RadioItems pick it up"
      - "`RadioItem.text` is part of the click target — the entire `<label>` toggles the radio"

    anti_patterns:
      - pattern: "rendering bare `<RadioGroup>` inside a `<Form>` and wiring `value` / `onValueChange` manually"
        why: "Form.Radio uses react-hook-form's controller pattern (Radix RadioGroup is not a native input); manual wiring here loses validation + FormItem error integration"
        redirect: "use `<Form.Radio name=\"...\" items={[{ value, text }, ...]} />` inside `<Form>`"
      - pattern: "rendering raw `<input type=\"radio\">` elements instead of `RadioGroup` + `RadioItem`"
        why: "native radios miss DS focus rings, brand colors, the data-invalid wiring, and the keyboard contract Radix provides"
        redirect: "always compose `<RadioGroup value={...}><RadioItem value=\"a\" text=\"A\" /></RadioGroup>`"
      - pattern: "horizontal orientation with 4+ items or long labels"
        why: "labels overflow / wrap unevenly, options become hard to scan, the row breaks on narrow viewports"
        redirect: "default to `orientation=\"vertical\"`; use horizontal only for 2–3 short labels"

  - name: Switch
    intent_group: Collecting user input
    intent: Binary on/off toggle for a setting that takes effect immediately — preference toggle, feature enable, notification on/off
    package: "@umichkisa-ds/web"

    pick_when:
      - "outside a `<Form>`, the surface needs a toggle whose state takes effect on flip (no submit step) — settings page, dashboard preference"
      - "the affordance reads as 'on/off' or 'enable/disable' for a continuous state, not a checkbox-style 'check this'"
    reject_when:
      - "the field is inside a `<Form>` (use `Form.Switch`)"
      - "the affordance reads as 'opt-in' / 'accept' / 'include' (use `Checkbox` — the visual matches the intent)"
      - "the user picks one of multiple options (use `RadioGroup` or `ToggleGroup`)"

    variants:
      - name: default
        pick_when:
          - "standard settings row — comfortable touch target, used in main content areas"
        reject_when:
          - "dense toolbars or list rows where the standard size feels heavy (use `size: sm`)"
      - name: sm
        pick_when:
          - "dense surfaces — table rows, compact toolbars, settings sub-rows where the standard size dominates the row"
        reject_when:
          - "primary settings page rows where comfort matters more than density (use `default`)"

    notable_props:
      - name: invalid
        type: "boolean"
        default: false
      - name: size
        type: "enum: default | sm"
        default: default
        pick_guidance: "default fits most settings rows; `sm` (16×28) for dense toolbars / table cells. The inline label class auto-shrinks (`type-body-sm` → `type-caption`) when `size=\"sm\"`."
      - name: text
        type: "string"
        pick_guidance: "inline label — when present, Switch wraps itself in a `<label>` so clicking the text toggles. Same Label-vs-text contract as Checkbox."

    intrinsic_behavior:
      - "extends `React.InputHTMLAttributes<HTMLInputElement>` minus `type`/`role`/`size` — native checkbox props flow through; the rendered input is `type=\"checkbox\" role=\"switch\"`"
      - "track + thumb both styled via `peer-checked:` selectors on the visually-hidden underlying input — the entire control area is hit-targetable"
      - "checked state: thumb shifts via `peer-checked:left-[calc(...)]` math + thumb color flips from `brand-primary` to `surface` while track flips to `brand-primary`"
      - "disabled+checked degrades to `disabled-foreground`; invalid sets `border-error` on the track"

    anti_patterns:
      - pattern: "rendering bare `<Switch>` inside a `<Form>` and wiring `checked` / `onChange` manually"
        why: "Form.Switch wires through react-hook-form and integrates with FormItem error display"
        redirect: "use `<Form.Switch name=\"...\" />` inside `<Form>`"
      - pattern: "using `<Switch text=\"...\" />` AND wrapping in `<Label>` / `<FormItem>` for the same labeling"
        why: "duplicated screen-reader labels (same as Checkbox)"
        redirect: "either use `text` OR an external Label / FormItem"
      - pattern: "using Switch for an opt-in / accept-terms field"
        why: "Switch reads as 'continuous on/off' — opt-in checkboxes are 'check this once to confirm'; users (and a11y guidance) expect different visuals for these intents"
        redirect: "use `Checkbox` for opt-in / consent / accept-terms; reserve `Switch` for state that takes effect on flip"

  - name: Label
    intent_group: Collecting user input
    intent: Accessible text label for a form control (`<input>`, Textarea, Select trigger, RadioGroup, etc.)
    package: "@umichkisa-ds/web"

    pick_when:
      - "outside a `<FormItem>`, the surface needs an accessible label associated with a control via `htmlFor` (custom layout where FormItem doesn't fit)"
      - "the label is the visible text identifier for a single control"
    reject_when:
      - "the surface is a standard label-above-control field (use `<FormItem label=\"...\" htmlFor=\"...\">` — it composes `<Label>` for you)"
      - "the labeling is non-form (page heading, section title, status text — use `type-h*` / `type-label` directly on a heading element)"
      - "the control already has its own labeling (e.g. `<Checkbox text=\"...\" />` with inline label, or `<IconButton aria-label=\"...\" />`)"

    notable_props:
      - name: htmlFor
        type: "string"
        required: true
        pick_guidance: "MUST match the `id` of the labeled control. For native inputs (Input, Textarea), use `htmlFor`. For non-native triggers (Select, DatePicker), pair `id` on this Label with `aria-labelledby` on the trigger — see the cross-component invariant."
      - name: id
        type: "string"
        pick_guidance: "set when a non-native trigger needs `aria-labelledby={id}` to associate. FormItem auto-generates `${htmlFor}-label` and uses this pattern."
      - name: required
        type: "boolean"
        default: false
        pick_guidance: "renders a red `*` after the label text (`aria-hidden`) — the visual signal of required-ness; the actual `required` attribute belongs on the underlying control"

    intrinsic_behavior:
      - "renders a native `<label>` element with `type-label text-foreground` — small, slightly-bold form-label typography"
      - "`required` appends a `<span aria-hidden=\"true\">*</span>` in `text-error` — assistive tech reads required-ness from the control's `required` / `aria-required`, the asterisk is a visual cue only"
      - "no padding / margin of its own — owned by the parent layout (FormItem stacks Label + control via `gap-2`)"

    anti_patterns:
      - pattern: "rendering `<Label>` without `htmlFor` (or with `htmlFor` that doesn't match a control's `id`)"
        why: "the label-control association is the entire point of `<Label>` — without it the label is just styled text and screen readers don't announce the labeling on focus"
        redirect: "always set `htmlFor` to the `id` of the control; for non-native triggers also pair `id` here with `aria-labelledby` on the trigger"
      - pattern: "using `<Label>` for non-form text (section heading, status label, table header)"
        why: "`<label>` HTML element implies an associated form control; using it for headings produces incorrect a11y semantics"
        redirect: "use `<h2 className=\"type-label\">…` or a span with the appropriate `type-*` class instead"

  - name: FormItem
    intent_group: Collecting user input
    intent: Vertical layout wrapper that stacks Label + control + (description | error) for a single form field — the canonical field-row primitive
    package: "@umichkisa-ds/web"

    pick_when:
      - "outside a `<Form>`, the surface needs a labeled field-row with Label-above-control + optional description + optional inline error"
      - "the field is one of many in a vertical form layout — FormItem stacks predictably with `gap-2`"
    reject_when:
      - "the field is inside a `<Form>` (Form.X members already render their own FormItem internally — wrapping again duplicates the Label / description / error)"
      - "the layout needs label inline (left of the control) — FormItem is vertical-only by contract"
      - "the field has a custom layout that doesn't fit Label-above-control (compose `<Label>` + control directly)"
      - "the affordance is a non-form labeled grouping like a settings card (use `<Card>` + `type-h*`)"

    notable_props:
      - name: htmlFor
        type: "string"
        required: true
        pick_guidance: "MUST match the `id` of the inner control. FormItem uses this for the inner `<Label htmlFor>` and to derive `${htmlFor}-description` / `${htmlFor}-error` ids you wire to the control's `aria-describedby` / `aria-errormessage`."
      - name: label
        type: "string"
        required: true
        pick_guidance: "visible label text — passed to the inner `<Label>`. For required fields, also set `required` so the asterisk renders."
      - name: required
        type: "boolean"
        default: false
        pick_guidance: "passes through to the inner `<Label required>`. Set the `required` HTML attribute on the inner control separately — FormItem doesn't reach into children."
      - name: error
        type: "string"
        pick_guidance: "when present, renders a `type-caption text-error` line and HIDES the description (mutually exclusive — error wins)"
      - name: description
        type: "string"
        pick_guidance: "rendered as `type-caption text-muted-foreground` below the control. Hidden when `error` is present."

    intrinsic_behavior:
      - "renders a `flex flex-col gap-2` column — Label, control (children), then either description or error"
      - "auto-generates the inner Label's `id={htmlFor + '-label'}`; the description / error get ids `${htmlFor}-description` / `${htmlFor}-error` for the consumer to wire into the control's `aria-describedby` / `aria-errormessage`"
      - "vertical-only by design — there is no `orientation` prop and no horizontal-label variant. Inline-label layouts are out of scope (compose Label + control yourself)"
      - "error and description are mutually exclusive at render time — when `error` is truthy, only error renders. This mirrors the validation-mode-takes-priority contract Form uses internally."

    anti_patterns:
      - pattern: "wrapping a `Form.X` field (Form.Input, Form.Select, Form.Switch, etc.) inside a `<FormItem>`"
        why: "Form.X members already render their own FormItem with label + error from validation state — the outer FormItem duplicates Label, error, and aria wiring"
        redirect: "inside `<Form>`, pass `label` / `description` / `required` directly to the `Form.X` field; outside `<Form>`, use `FormItem` + the bare web control (Input, Select, etc.)"
      - pattern: "using FormItem for an inline label-left-of-control layout via `className=\"flex-row\"` override"
        why: "FormItem is `flex-col gap-2` by contract — flipping to row breaks the label-above-control invariant the whole DS depends on; description / error positioning then sit awkwardly to the side"
        redirect: "compose your own row layout: `<div className=\"flex items-center gap-3\"><Label htmlFor=\"x\">...</Label><Input id=\"x\" /></div>`"
      - pattern: "passing both `error` and `description` and expecting both to render"
        why: "FormItem renders ONLY error when `error` is truthy — description is suppressed (validation error supersedes hint text)"
        redirect: "treat description as helper text shown in the resting state and error as the validation message; if you need both visible at once, render the helper outside FormItem"

  - name: FileUpload
    intent_group: Collecting user input
    intent: Single-image upload with client-side validation, preview, and consumer-owned upload / remove callbacks
    package: "@umichkisa-ds/web"

    pick_when:
      - "the surface needs a single-image picker (avatar, profile photo, post thumbnail, document attachment) with preview"
      - "the consumer can provide async `onUpload` (returns `{ url, publicId }`) and `onRemove` callbacks — DS does not ship a default upload implementation"
      - "client-side validation against MIME type + size threshold is needed before the file leaves the browser"
    reject_when:
      - "the surface needs multi-file batch upload (out of DS scope — consumer composes a custom multi-FileUpload list or uses a third-party uploader)"
      - "the file type is non-image (PDF, ZIP, arbitrary) — current contract is image-only (`accept` defaults to `image/png | image/jpeg | image/webp`)"
      - "no real upload backend exists — FileUpload requires `onUpload` + `onRemove`; mocking these for a UI-only stub leaks blob URLs"

    notable_props:
      - name: value
        type: "FileUploadValue | null — `{ url: string, publicId: string }`"
        required: true
        pick_guidance: "the persisted-file reference; `null` when no image. Consumer owns this state — FileUpload calls `onChange(next)` after a successful upload or remove."
      - name: onChange
        type: "(next: FileUploadValue | null) => void"
        required: true
        pick_guidance: "fires after a successful upload (with the `{ url, publicId }` returned by `onUpload`) or after a successful remove (with `null`)"
      - name: onUpload
        type: "(file: File) => Promise<FileUploadValue>"
        required: true
        pick_guidance: "the consumer-owned async uploader — must return `{ url, publicId }` on success or throw on failure. The thrown error's `message` is shown in the inline Alert."
      - name: onRemove
        type: "(publicId: string) => Promise<void>"
        required: true
        pick_guidance: "the consumer-owned async remover — called with the current `value.publicId`. Throw to surface an error message in the inline Alert."
      - name: accept
        type: "readonly AcceptedMimeType[] — subset of `'image/png' | 'image/jpeg' | 'image/webp'`"
        default: "['image/png', 'image/jpeg', 'image/webp']"
        pick_guidance: "narrow to a subset when only certain image types are valid (e.g. PNG-only logos). The helper text under the upload zone auto-derives from this list."
      - name: maxSize
        type: "number (bytes)"
        default: "FILE_UPLOAD_MAX_BYTES_DEFAULT (5 * 1024 * 1024 = 5MB)"
        pick_guidance: "client-side size cap; exceeding it shows an inline error and skips `onUpload` entirely"

    intrinsic_behavior:
      - "renders a 128×128 dashed-border drop / click zone when no image; flips to a 128×128 image preview with a top-right circular remove button when an image is selected or pending"
      - "during upload: shows the local blob preview immediately, overlays a `LoadingSpinner` over the image, sets `aria-busy=\"true\"` on the root, and disables the remove button"
      - "during remove: spinner replaces the X icon inside the remove button"
      - "client-side validates size + MIME BEFORE calling `onUpload` — failures render the inline `<Alert variant=\"error\">` and skip the upload network call"
      - "validation / upload / remove errors all route through one inline `<Alert variant=\"error\">` with the root's `aria-describedby` wired to the alert id"
      - "manages blob URL lifecycle — revokes on upload success/failure and on unmount to prevent memory leaks"
      - "default messages are English ('Click to upload', 'Upload image', 'Remove image', etc.) — all overridable via the `messages` prop for i18n"

    anti_patterns:
      - pattern: "passing `onUpload` / `onRemove` that resolve without actually persisting the file (UI stub)"
        why: "FileUpload swaps the local blob preview for the URL returned by `onUpload` and revokes the blob — a stub that returns a fake URL leaves the user staring at a broken preview after refresh"
        redirect: "wire `onUpload` to the real upload backend (Cloudinary, S3, etc.) and `onRemove` to the matching deletion endpoint before shipping"
      - pattern: "rendering FileUpload alongside a separate inline `<Alert>` for the same field's errors"
        why: "FileUpload already surfaces validation / upload / remove errors via its own internal Alert with proper `aria-describedby` wiring — a parallel external Alert duplicates the message and unties the aria relationship"
        redirect: "let FileUpload own its own error rendering; surface form-level cross-field errors elsewhere"
      - pattern: "wrapping FileUpload in a `<FormItem>` to add label + error"
        why: "FormItem's error rendering and FileUpload's internal Alert collide — two error sources, two aria targets, inconsistent UX"
        redirect: "render the field's label separately (Label or section heading) and let FileUpload own the error surface; if a form is involved, compose with `<Form>` and a manually-controlled FileUpload via Form.Controller / useFormField"

  - name: DatePicker
    intent_group: Collecting user input
    intent: Single-date picker — calendar opens in a popover from a button trigger
    package: "@umichkisa-ds/web"

    pick_when:
      - "outside a `<Form>`, the surface collects a single date (start date, deadline, scheduled-on)"
      - "an inline always-visible Calendar would dominate the layout — popover-from-trigger is more space-efficient"
    reject_when:
      - "the field is inside a `<Form>` (use `Form.DatePicker`)"
      - "the surface needs a permanently-visible calendar grid (use `Calendar`)"
      - "the surface collects a date range (use `DateRangePicker` or `Form.DateRangePicker`)"
      - "the value is a free-text date that doesn't need a calendar UI (use `Input type=\"text\"` with custom validation — but this is rare and usually wrong)"

    notable_props:
      - name: value
        type: "Date"
        pick_guidance: "controlled — pair with `onChange`. Pass `undefined` for unselected."
      - name: onChange
        type: "(date: Date | undefined) => void"
        pick_guidance: "fires on selection — popover auto-closes after a pick"
      - name: formatDate
        type: "(date: Date) => string"
        default: "`MM/DD/YYYY` (zero-padded)"
        pick_guidance: "override for locale-specific formatting (e.g. Korean `YYYY.MM.DD`); applied to the trigger's display only — Calendar internals stay locale-agnostic"
      - name: placeholder
        type: "string"
        default: '"Select a date"'
      - name: invalid
        type: "boolean"
        default: false
      - name: calendarProps
        type: "Omit<CalendarProps, \"mode\" | \"selected\" | \"onSelect\">"
        pick_guidance: "pass-through to the inner `<Calendar>` for `disabled`, `fromDate` / `toDate`, locale, etc. Cannot override `mode` / `selected` / `onSelect` — DatePicker owns those."

    requires_context: null

    intrinsic_behavior:
      - "internally composes `Popover + PopoverTrigger + PopoverContent + Calendar mode=\"single\"` — consumers don't compose these themselves; DatePicker is the single entry point"
      - "the trigger is a button styled identically to `Input` (border-border-strong, focus border-brand-primary, invalid border-error) with a chevron-free calendar icon on the right"
      - "popover auto-closes immediately after a date is picked"
      - "extends Calendar's contract — same focus rings, brand colors, react-day-picker pass-through via `calendarProps`"

    anti_patterns:
      - pattern: "rendering bare `<DatePicker>` inside a `<Form>` and wiring `value` / `onChange` manually"
        why: "Form.DatePicker uses react-hook-form's controller pattern; manual wiring loses validation + FormItem integration"
        redirect: "use `<Form.DatePicker name=\"...\" />` inside `<Form>`"
      - pattern: "composing your own `Popover + Calendar` to build a date picker"
        why: "DatePicker already does this — duplicating the composition means each instance drifts in trigger styling, popover alignment (`align=\"start\"`), and Calendar prop forwarding"
        redirect: "use `<DatePicker>` for single dates, `<DateRangePicker>` for ranges, `<Calendar>` only for permanently-visible grids"
      - pattern: "using `<input type=\"date\">` instead of DatePicker"
        why: "native date inputs vary per browser, miss DS focus / invalid styling, and produce inconsistent locale behavior"
        redirect: "always use `DatePicker` (or `Form.DatePicker` inside Forms)"

  - name: DateRangePicker
    intent_group: Collecting user input
    intent: Date-range picker — calendar opens in a popover and the user picks a start + end date
    package: "@umichkisa-ds/web"

    pick_when:
      - "outside a `<Form>`, the surface collects a start–end date pair (event range, report period, vacation block)"
    reject_when:
      - "the field is inside a `<Form>` (use `Form.DateRangePicker`)"
      - "the surface needs only a single date (use `DatePicker`)"
      - "the surface needs a permanently-visible calendar grid for range selection (use `Calendar mode=\"range\"`)"

    notable_props:
      - name: value
        type: "DateRange — `{ from?: Date, to?: Date }` (from react-day-picker)"
        pick_guidance: "controlled — pair with `onChange`"
      - name: onChange
        type: "(range: DateRange | undefined) => void"
        pick_guidance: "fires on every selection (first click sets `from`, second sets `to`); popover auto-closes only when both `from` and `to` are set"
      - name: formatDate
        type: "(date: Date) => string"
        default: "`MM/DD/YYYY`"
        pick_guidance: "applied to BOTH from and to for the trigger display (rendered as `from – to`)"
      - name: placeholder
        type: "string"
        default: '"Select a date range"'
      - name: invalid
        type: "boolean"
        default: false
      - name: calendarProps
        type: "Omit<CalendarProps, \"mode\" | \"selected\" | \"onSelect\">"

    requires_context: null

    intrinsic_behavior:
      - "internally composes `Popover + PopoverTrigger + PopoverContent + Calendar mode=\"range\"` — DateRangePicker is the single entry point for popover-style range selection"
      - "trigger styling matches `DatePicker` and `Input` — border-border-strong, focus border-brand-primary, invalid border-error, calendar icon on the right"
      - "trigger label format: `formatDate(from) – formatDate(to)` when both set; `formatDate(from)` alone after the first pick; `placeholder` when neither set"
      - "popover stays open after the first pick (so the user can pick the end) and auto-closes only after `from` AND `to` are both populated"
      - "extends Calendar's range-mode contract — `range_*` slot styling carries `bg-brand-accent-subtle` for in-range cells"

    anti_patterns:
      - pattern: "rendering bare `<DateRangePicker>` inside a `<Form>` and wiring manually"
        why: "same as DatePicker — Form.DateRangePicker handles the controller pattern + FormItem error integration"
        redirect: "use `<Form.DateRangePicker name=\"...\" />` inside `<Form>`"
      - pattern: "expecting the popover to close after the first pick (selecting `from` only)"
        why: "DateRangePicker keeps the popover open until BOTH `from` and `to` are picked — this is intentional so users can complete the range without reopening"
        redirect: "if the surface needs single-pick semantics, use `<DatePicker>`; do not try to hack `onChange` to force-close"
      - pattern: "passing two separate DatePickers (one for from, one for to) instead of DateRangePicker"
        why: "two-DatePicker compositions don't enforce `from <= to`, miss the in-range visual styling that helps users see span at a glance, and double the trigger visual"
        redirect: "use `<DateRangePicker>` whenever the field is conceptually one range"

# (additional component groups appended below as C2a.11 are authored)

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

  - id: feedback-status-variant
    components: [Alert, Badge]
    invariant: "status content (\"Active\", \"Failed\", \"Pending\", \"Approved\", etc.) MUST use the matching semantic variant — `success` / `warning` / `error` / `info` — on either Alert or Badge. Never use `default` / `outline` / neutral variants for status."
    why: "neutral chips and outline badges fail to communicate state at a glance; consumers scan for color to decode status. A neutral 'Failed' badge looks like a category tag, not a problem."
    detection: semantic

  - id: table-mobile-pair
    components: [Table, TableMobileList]
    invariant: "any multi-column Table MUST ship a paired `<TableMobileList>` — typically `<Table className=\"hidden md:block\">` AND `<TableMobileList className=\"block md:hidden\">` together — so mobile viewports render the same data as a stacked list rather than a horizontally-overflowing table."
    why: "multi-column tables on mobile either overflow horizontally (hiding columns behind a scrollbar) or shrink below readability; the paired mobile list preserves the data without breaking layout."
    detection: static

  - id: form-field-pair-discrimination
    components: [Input, Textarea, Select, Checkbox, RadioGroup, Switch, DatePicker, DateRangePicker]
    invariant: "inside a `<Form>` (from `@umichkisa-ds/form`), every field MUST use its `Form.X` counterpart — `Form.Input`, `Form.Textarea`, `Form.Select`, `Form.Checkbox`, `Form.Radio`, `Form.Switch`, `Form.DatePicker`, `Form.DateRangePicker` — NEVER the bare web component (`Input`, `Textarea`, `Select`, etc.). Outside of `<Form>`, use the bare web component."
    why: "Form.X members wire fields through react-hook-form (`register` for native inputs, `Controller` for non-native triggers like Select / DatePicker / RadioGroup), derive `invalid` from validation state, and integrate with the inner FormItem error display. Bare web fields inside Form lose validation, error rendering, and FormItem aria — and the bug is silent (the field renders, just doesn't participate in form submit / validation)."
    detection: compositional

  - id: formitem-vertical-only
    components: [FormItem, Form]
    invariant: "FormItem renders Label-above-control vertically (`flex flex-col gap-2`) by contract — there is no horizontal-label variant. Inline-label-left-of-control layouts MUST be composed manually with `<Label>` + the control inside a custom `flex-row` parent; they MUST NOT be built by overriding FormItem's class to `flex-row`."
    why: "every Form.X member depends on FormItem's vertical stack for description / error positioning below the control; flipping to row breaks the error / description placement and the visual rhythm consumers rely on across the entire DS forms surface"
    detection: static

  - id: formitem-htmlfor-aria-wiring
    components: [FormItem, Label, Input, Textarea, Select, RadioGroup, DatePicker, DateRangePicker]
    invariant: "FormItem's `htmlFor` MUST match the inner control's `id`. For native inputs (Input, Textarea), this is a standard `label[for] ↔ input[id]` association. For non-native triggers (Select, DatePicker, RadioGroup), the inner control must additionally carry `aria-labelledby={`${htmlFor}-label`}` (the id FormItem auto-assigns to its inner Label) AND `aria-describedby={`${htmlFor}-description`}` / `aria-errormessage={`${htmlFor}-error`}` to wire the description / error nodes."
    why: "FormItem generates the description / error elements with deterministic ids derived from `htmlFor`, but it cannot reach into children to attach `aria-describedby` / `aria-errormessage` — the consumer (or the Form.X wrapper) must wire those. Missing wiring means screen readers don't announce the field's helper text or validation message even though the visuals look correct."
    detection: static
```
