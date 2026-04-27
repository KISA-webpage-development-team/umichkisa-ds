# A2 — COMPONENT.md Schema Design

_Subphase A2 of the `ds-client-constrained-execution` 4-layer refactor. This is the design doc for the Layer 2 schema. The runtime artifact (`COMPONENT.md`) will mirror the structure here — markdown body + YAML blocks, no preamble — and be authored in Phase B/C._

Layer 2 carries the **non-visual contract** of every consumer-facing DS component:

- **Identity** — package only (`name` + `package` are sufficient; consumer agents resolve everything else from `node_modules/@umichkisa-ds/*` types)
- **Picking discriminators** — natural-language `pick_when` / `reject_when` predicates that resolve sibling ambiguity (Button vs LinkButton; Alert vs Toast vs StatusView)
- **Variants** — per-variant `pick_when` / `reject_when` for components whose primary picking decision is variant choice (Alert, StatusView, Badge, Button)
- **Notable props** — the small set of props that influence picking or carry contract behavior (`size`, `loading`, `fullScreen`); not a full prop API
- **Intrinsic behavior** — promises the component itself makes (Form.Button auto-disables on submit; Card owns padding)
- **Compound parts** — required/optional children, paired responsive siblings, ownership invariants
- **Anti-patterns** — what NOT to do with the component, scoped by the **contract-ownership test**: "if this component were used in a brand-new app with no other rules, would this anti-pattern still be wrong?" Yes → Layer 2; No → Layer 3.
- **Cross-component invariants** — top-level collection (separate from `components`) for contracts spanning two or more components

Layer 2 does **not** carry visual contract — Card.tsx + Layer 1 tokens cover that. (Earlier drafts proposed an optional `design_md_ref` pointer; **dropped in C2a.1** because A4 D5/D12 omitted the YAML `components:` block from `/DESIGN.md` and the pointer had no resolvable target. See A2 decision 1, updated.)

Audience: the consumer-side migration implementer (a subagent designed in A5). The skill / agent system prompt explains the file's role; the file itself opens straight at `## Schema`.

---

## Schema

```yaml
# COMPONENT.md schema — annotated reference

components:
  # Required: every consumer-facing export from @umichkisa-ds/web and @umichkisa-ds/form
  # Order: grouped by intent_group (mirrors DS_CODEBASE.md headings); alphabetical within group.

  - name: <PascalCase>                # e.g. Button, Form.Input — use exact import name including dot
    intent_group: <string>            # mirrors DS_CODEBASE.md section heading; e.g. "Triggering actions"
    intent: <one_line>                # one-sentence summary of what this component is for
    package: <package_id>             # enum: "@umichkisa-ds/web" | "@umichkisa-ds/form"

    # Sibling-discrimination predicates. Natural-language, ONE assertion per line.
    # reject_when MUST name the alternative in parentheses.
    pick_when:
      - "<assertion>"
    reject_when:
      - "<assertion> (use <AlternativeComponent>)"

    # Variant-discrimination. Present ONLY if the component has a discriminator-axis prop
    # (usually `variant`) whose enum values fundamentally change what the component is for.
    # Single discriminator per component, max. If absent, the field is omitted entirely.
    variants:                         # OPTIONAL
      - name: <variant_value>         # e.g. primary, secondary, success
        pick_when:
          - "<assertion>"
        reject_when:
          - "<assertion> (use variant: <other>)"

    # Picking-relevant or contract-relevant props. NOT a full prop API.
    # Skip type definitions and obvious passthroughs — agents read source for full types.
    notable_props:                    # OPTIONAL
      - name: <prop_name>
        type: "<short_signature>"     # e.g. "enum: sm | md | lg" or "boolean"
        required: true                # OPTIONAL — mirror the TypeScript type. Omit (or false) when prop is optional.
        default: <value>              # OPTIONAL — only meaningful when required is false/omitted
        pick_guidance: "<one_line>"   # OPTIONAL — when the agent should pick which value
        note: "<one_line>"            # OPTIONAL — non-obvious behavior

    # Promises the component itself makes. Behavior contracts agents can rely on.
    intrinsic_behavior:               # OPTIONAL
      - "<one_line_promise>"

    # Required if this component depends on a context provider being rendered above it.
    # Used for namespace members (Form.Input requires Form).
    requires_context: <ParentComponent>  # OPTIONAL

    # Parent-child compound shapes. Namespace members (Form.X) are NOT here — they are
    # their own top-level entries with `requires_context`.
    compound_parts:                   # OPTIONAL — null/omitted when component has no parts
      - name: <PartName>
        kind: <kind>                  # enum: required_child | optional_child | paired_responsive_sibling
        owns: <responsibility>        # OPTIONAL — what this part owns in the family contract
        invariant: "<one_line>"       # OPTIONAL — usage rule for this part

    # Anti-patterns scoped to THIS component's contract (contract-ownership test).
    # General client-app rules belong in Layer 3 USAGE.md, not here.
    anti_patterns:                    # OPTIONAL
      - pattern: "<short_description>"
        why: "<reason_grounded_in_component_contract>"
        redirect: "<what_to_do_instead>"   # OPTIONAL — what to do if the agent hits this case

    # (Removed in C2a.1: `design_md_ref`. A4 D5/D12 dropped the YAML `components:` block
    # from `/DESIGN.md`, so the pointer never resolved. Layer 2 → Layer 1 cross-referencing
    # happens through prose only — entries may mention DESIGN.md token names like
    # `spacing.icon-md` or `colors.brand-primary` inline in `intrinsic_behavior` /
    # `notable_props.note` when a token is genuinely the contract-bearing detail.)

    # Pointers to cross_component_invariants entries below. Lets agents reading one component
    # discover relationships without scanning the whole file.
    see_also:                         # OPTIONAL
      - <invariant_id>

# Top-level collection for contracts spanning two or more components.
cross_component_invariants:
  - id: <kebab-id>
    components: [<ComponentA>, <ComponentB>]
    invariant: "<one_line>"
    why: "<reason>"
    detection: <detection>                          # enum: static | semantic | compositional (foreshadows A3)
```

### Authoring disciplines

These are conventions, not validators. Reviewers enforce them.

1. **One assertion per `pick_when` / `reject_when` line.** No compound clauses ("X and Y unless Z"). Split into separate lines.
2. **`reject_when` always names the alternative in parentheses.** "icon alone with no label (use IconButton)" — the parenthetical is mandatory. Turns rejection into routing.
3. **`notable_props` is for picking-relevant or contract-relevant props only.** Skip `data-*`, ARIA passthroughs, and obvious-from-type props. The full prop API stays in the `.tsx` source. Mark `required: true` on every prop the TypeScript type marks as required (no `?`) — mirrors the type-level truth so agents see required props at a scan rather than buried in `pick_guidance` prose.
4. **`anti_patterns` passes the contract-ownership test.** "Would this still be wrong in a brand-new app?" If no, it belongs in Layer 3.
5. **`compound_parts` does NOT include namespace members.** `Form.Input` is a top-level entry with `requires_context: Form`, not a part of Form's compound.

6. **Live source is ground truth — A1 is a starting point.** Before authoring `compound_parts`, `variants`, or `notable_props`, read the component's `.tsx` source and enumerate against the live code:
   - **`compound_parts`** — every exported child the consumer is expected to render (e.g. A1 missed `TableMobileItem`, `AccordionItem`/`AccordionTrigger`/`AccordionContent`, all Radix-backed overlay parts on Dialog/Dropdown/Popover, `SelectTrigger`/`Content`/`Item`/`Group`/`Separator`).
   - **`variants`** — every member of the discriminator enum the component actually exposes (e.g. A1 listed a `loading` variant on StatusView that does not exist; live source has 4 variants only).
   - **`notable_props`** — every TypeScript-required prop (no `?`) gets `required: true`, plus every picking-relevant prop the type exposes (e.g. A1's StatusView entry listed only `[fullScreen]`; live source exposes the full `[fullScreen, code, icon, title, description, action]` set).

   When A1 disagrees with source, source wins — but also fix A1 in the same commit so the inventory stays trustworthy across future authoring passes.

---

## Worked Example: Button

Button is a single-component family with four variants and a size enum. No compound parts. No required context.

```yaml
components:
  - name: Button
    intent_group: Triggering actions
    intent: Primary in-app action — submit a form, confirm a dialog, start a flow
    package: "@umichkisa-ds/web"

    pick_when:
      - "user action triggers behavior in the current page (submit, confirm, open dialog)"
      - "the action has a visible text label"
    reject_when:
      - "navigates to a different URL or page route (use LinkButton)"
      - "icon alone with no text label (use IconButton)"
      - "submitting a form wired with @umichkisa-ds/form (use Form.Button — auto-disables on submit)"

    variants:
      - name: primary
        pick_when:
          - "the main call-to-action in the visible context (form submit, primary flow)"
          - "only one primary visible at a time"
        reject_when:
          - "alternative or supporting action alongside another primary (use variant: secondary)"
          - "low-emphasis action inside dense UI (use variant: tertiary)"
          - "destructive action like delete or remove (use variant: destructive)"
      - name: secondary
        pick_when:
          - "alternative or supporting action presented alongside a primary"
          - "modal cancel / form cancel action"
        reject_when:
          - "main call-to-action (use variant: primary)"
      - name: tertiary
        pick_when:
          - "low-emphasis action inside a dense surface (toolbars, table row actions)"
          - "the visual weight of secondary would be too heavy"
        reject_when:
          - "the action is the page's primary intent (use variant: primary)"
      - name: destructive
        pick_when:
          - "irreversible or data-deleting action (delete, remove, clear)"
        reject_when:
          - "any non-destructive action (use variant: primary or secondary)"

    notable_props:
      - name: size
        type: "enum: sm | md | lg"
        default: md
        pick_guidance: "md is default; sm in dense forms/toolbars; lg only for hero CTAs"
      - name: type
        type: "enum: button | submit | reset"
        default: button
        note: "Button defaults to type='button' to avoid accidental form submit; pass type='submit' explicitly when needed"
      - name: disabled
        type: boolean
        note: "non-interactive state; pair with form validation or pending state. For form submit pending, prefer Form.Button (auto-disables)."

    intrinsic_behavior:
      - "renders a native <button> with type='button' by default (no implicit form submit)"
      - "implements the dual-ring focus pattern: outline 2px focus-ring + box-shadow 4px brand-primary"
      - "disabled state lowers opacity and removes pointer events; color shifts to disabled-foreground"

    anti_patterns:
      - pattern: "passing a `variant` not in the enum (e.g. variant='outline')"
        why: "Button enumerates four variants by design; non-enumerated values fall back to default and silently miss intent"
        redirect: "if a needed variant is missing, request via ds-fix-during-migration"
      - pattern: "wrapping <Button> with custom <a> or <Link> for navigation"
        why: "Button renders a <button> element; nesting in <a> creates invalid HTML and breaks keyboard focus semantics"
        redirect: "use LinkButton for navigation styled as a button"

    # design_md_ref removed — see schema note above
```

---

## Worked Example: Card (compound family)

Card is a compound family with one parent and five optional children. The parent owns padding and outer gap; CardContent owns "fill remaining space, no padding."

```yaml
components:
  - name: Card
    intent_group: Organizing & displaying content
    intent: Bordered container grouping related content (feature summary, list item, dashboard tile)
    package: "@umichkisa-ds/web"

    pick_when:
      - "group related content into a visually distinct, bordered region"
      - "list-item or dashboard-tile surfaces"
      - "compose with CardHeader / CardTitle / CardDescription / CardContent / CardFooter for typical structure"
    reject_when:
      - "the surface is the whole page shell (use Container)"
      - "the surface is a popover or modal anchored to a trigger (use Popover or Dialog)"
      - "the content has no internal structure and just needs subtle background (use bg-surface-subtle directly on a div)"

    notable_props:
      - name: hoverable
        type: boolean
        default: false
        pick_guidance: "set true ONLY when the entire card is interactive (clickable / navigable); applies brand-accent-subtle hover bg + brand-primary border"

    intrinsic_behavior:
      - "owns outer padding (p-4) and inter-child vertical gap (gap-4) via flex column"
      - "renders bg-surface, border-border, rounded-md by default"
      - "min-w-0 so it shrinks correctly inside flex/grid parents"
      - "when hoverable, applies group hover state propagated to CardTitle (title text turns brand-primary)"

    compound_parts:
      - name: CardHeader
        kind: optional_child
        owns: "Element-tier vertical gap (gap-2) between CardTitle and CardDescription"
      - name: CardTitle
        kind: optional_child
        owns: "title typography and group-hover text color"
        invariant: "renders <h3> by default; override semantic level via `as` prop, not via wrapping"
      - name: CardDescription
        kind: optional_child
        owns: "muted body-sm text with line-clamp-3"
      - name: CardContent
        kind: optional_child
        owns: "fill remaining vertical space (flex-1 overflow-hidden break-words); does NOT own padding"
        invariant: "Card owns padding via its own p-4; CardContent must not add padding"
      - name: CardFooter
        kind: optional_child
        owns: "Element-tier horizontal gap (gap-2) between footer items"

    anti_patterns:
      - pattern: "className with padding utilities (p-*, px-*, py-*) on Card"
        why: "Card owns padding via p-4; overriding it breaks the card's spatial contract"
        redirect: "if Card's default padding feels wrong, the surface is being misused — pick a different DS component or open a ds-fix-during-migration ticket for a Card variant"
      - pattern: "className with bg-* on Card to change background color"
        why: "Card surface is bg-surface by design; tinting changes the depth signal (subtle/muted reserved for elevated/deprioritized roles)"
        redirect: "if a tinted card is needed, request a Card variant; do not override"
      - pattern: "rendering CardContent with className padding (p-*) added"
        why: "Card already paid the padding cost at the outer level; double padding inflates the card and breaks content-width math"
        redirect: "remove the padding override; if extra inset is needed inside CardContent, add a child <div> with the inset"
      - pattern: "wrapping Card around a single inline element (text, icon)"
        why: "Card's flex-column + p-4 + gap-4 contract is sized for multi-child structure; wrapping a single inline element wastes space and signals 'this is structured content' to readers"
        redirect: "use a Badge, a tag, or inline styling — Card is not a generic surface wrapper"

    # design_md_ref removed — see schema note above

  # CardHeader, CardTitle, CardDescription, CardContent, CardFooter would each get their own
  # full entries OR be referenced inline as compound_parts (above). Decision: full entries
  # are unnecessary — they are not independently importable use-cases; agents pick Card,
  # then compose its parts. The compound_parts inline is the canonical reference.
  # If a part starts being used outside Card, promote it to a full entry then.
```

**Compound-part-not-its-own-entry decision:** the five Card children are not picked independently of Card. An agent never asks "should I use CardContent?" — they ask "should I use Card?" and the parts follow. So the compound_parts list inline carries enough info; full entries per part would be redundant. Same rule applies to RadioItem/TabsList/etc.

**Contrast with namespace members:** `Form.Input` IS picked independently (vs `Input` from web; vs `Form.Textarea`), so it gets a full top-level entry. Compound parts and namespace members differ here, which is why Q7 split them.

---

## Cross-component invariants — worked examples

```yaml
cross_component_invariants:
  - id: icon-button-tooltip-aria-label-match
    components: [IconButton, Tooltip]
    invariant: "Tooltip content must equal the IconButton's aria-label exactly when wrapping an icon-only button"
    why: "duplicate or divergent screen-reader announcements when texts differ"
    detection: compositional

  - id: form-button-submit-state
    components: [Form, Form.Button]
    invariant: "Form.Button auto-disables while Form submission is pending; consumers must not pass disabled={isSubmitting} manually"
    why: "Form.Button reads useFormStatus internally; manual disabled flag double-counts and may flicker"
    detection: semantic

  - id: table-mobile-pair
    components: [Table, TableMobileList]
    invariant: "API reference and admin tables must ship both: <Table> in hidden md:block + <TableMobileList> in block md:hidden"
    why: "multi-column tables either overflow horizontally or shrink columns below readability on mobile"
    detection: static
    # Component contracts are universal — they apply wherever the components are used (DS itself,
    # docs app, client app). No scope discriminator is needed at the invariant level.
```

---

## A2 decisions (resolved during checkpoint review)

1. **`design_md_ref` REMOVED (updated in C2a.1).** Originally specced as the canonical Layer 2 → Layer 1 pointer assuming A4 would emit a `components:` block in `/DESIGN.md`. A4 D5/D12 dropped that block in v0, so the pointer never had a resolvable target. C2a.1 confirmed the omission against the live `/DESIGN.md` and removed the field from the schema. Layer 2 → Layer 1 cross-referencing happens through inline prose mentions (`spacing.icon-md`, `colors.brand-primary`) when a token is genuinely the contract-bearing detail.

2. **`type-h4` is a real DS gap.** `CardTitle.tsx` references `type-h4` which is not defined in `styles/index.css`. Resolution: ship `type-h4` via `ds-fix-during-migration`. Filed as a deferred action item — handled outside Phase A so the refactor doesn't stall on a DS-side fix. Card worked example uses `type-h4` as written in source, with this note.

3. **Layer 3 rule p2-tk-3 (forbid `!font-*` weight override on `type-*`) is to be relaxed.** Both DS-side code (Button, CardTitle) and consumer code may override `type-*` weight via `!font-*` when the `type-*` tier doesn't expose the desired weight. Not an A2 deliverable; flagged as input for **A3**: drop or soften the rule, drop the migration-only `Exception:` carve-out (p2-tk-4), and reconcile MEMORY entry `feedback_type_weight_override`.

4. **Compound parts stay inline (no full top-level entries for CardHeader/CardContent/etc.).** Promotion rule baked into the schema: "if a part starts being imported and used outside the parent's JSX context, promote it to a full entry." Recorded below in §Promotion rule.

5. **A third worked example is not necessary in A2.** StatusView is not a clean variant-only example (it has a `fullScreen` boolean prop too). If Phase B reveals strain when modeling a variant-only component, add an example for `Alert` (purely variant-discriminated: success/warning/error/info, no other discriminating props) at that point.

6. **No `scope` field on `cross_component_invariants`.** Component contracts are universal — they apply wherever the components are rendered (DS internal, docs app, client app). Lifecycle/scope marking is a Layer 3 (USAGE.md) concern for genuinely temporal rules like "remove old local UI imports post-migration"; A3 will handle it there. The `table-mobile-pair` invariant is general and unscoped.

7. **Runtime/setup-dependent picking belongs in Layer 3.** Predicates like "use Form.Button only if @umichkisa-ds/form is a dependency" describe a project-setup precondition, not a component contract. A2 picks_when stays component-contract-scoped; A3 USAGE.md will carry the setup precondition rules (CSS entry point, package install, font loading already live there).

## Promotion rule

A compound part stays inline under its parent's `compound_parts` until it begins being **imported or used outside the parent's JSX context**. At that point, promote it to a full top-level component entry with its own `pick_when` / `intrinsic_behavior`, and replace the inline entry with a pointer:

```yaml
compound_parts:
  - {name: <Part>, kind: <kind>, see: <Part>}   # promoted; full entry exists below
```

This rule is documented here and will be repeated in COMPONENT.md authoring guidance (when the runtime file is built in Phase B/C).

## Deferred action items (outside Phase A)

- File `ds-fix-during-migration` ticket: ship `type-h4` class in `packages/web/src/styles/index.css` (currently referenced by `CardTitle.tsx` but undefined). Decide weight, size scale, line-height during fix.
- A3 input: relax/drop rule p2-tk-3 (`!font-*` override forbidden) and remove the p2-tk-4 migration-only exception.
