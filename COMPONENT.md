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
      - "the layout has unequal column weights or fixed column widths (use plain CSS grid utilities or a custom layout — Grid is equal-width only)"
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
        redirect: "if more than 6 columns are needed, the grid is too dense for content readability — re-examine the layout, or compose plain CSS grid utilities directly"
      - pattern: "passing a `className` that overrides `grid-cols-*` or `gap-*` on Grid"
        why: "Grid encapsulates the column-count and gap contracts via the `columns` and `gap` props; className overrides break the encapsulation and leave a half-Grid that picks props for one axis and utility classes for another"
        redirect: "if the column or gap shape Grid exposes does not fit the layout, drop Grid and compose `<div className=\"grid grid-cols-* gap-*\">` directly — do not partially override Grid"

# (additional component groups appended below as C2a.3..C2a.11 are authored)

cross_component_invariants:
  # (seeded incrementally per group; finalized in C2a.final)
  - id: ds-layout-no-utility-override
    components: [Container, Tabs, Form, Card, Dialog]
    invariant: "flex / overflow / height / max-height utilities passed via className to force a DS layout component's size are forbidden — the component owns its own layout shape"
    why: "DS layout components encapsulate flex direction, overflow behavior, and intrinsic height; consumer overrides via className compete with internal contracts and produce subtly broken layout (clipped overlays, double scrollbars, collapsed grid rows)"
    detection: static
    # Note: this entry currently references components (Tabs, Form, Card, Dialog) whose
    # full COMPONENT.md entries are authored in later C2a steps. References will resolve
    # once those groups are complete; this is expected during incremental rollout.
```
