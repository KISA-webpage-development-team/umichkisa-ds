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

# (additional component groups appended below as C2a.8..C2a.11 are authored)

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
```
