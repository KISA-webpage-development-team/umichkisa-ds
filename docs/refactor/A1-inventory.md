# A1 — Component / Rule / Token Inventory

_Subphase A1 of the `ds-client-constrained-execution` 4-layer refactor. Read-only enumeration. No recommendations or classifications — those live in A2 / A3 / A4._

Scope: components exported by `@umichkisa-ds/web` and `@umichkisa-ds/form`; rules in `docs/DS_CONSTRAINTS.md` and `docs/DS_CLIENT_USAGE.md`; CSS tokens in `packages/web/src/tokens/` and `packages/web/src/styles/index.css`. Skill files are out of scope (loaded in A5/A6).

---

## Summary

```yaml
counts:
  components_web: 35       # exported from @umichkisa-ds/web (compound parts nested under parent, not counted)
  components_form: 12      # exports from @umichkisa-ds/form (compounds + hooks)
  ds_constraints_rules: 106
  ds_client_usage_part1_rules: 13   # condensed (Must summary + Visibility & Hierarchy)
  ds_client_usage_part1_tier_pickers: 6
  ds_client_usage_part2_rules: 48
  semantic_color_tokens: 30
  primitive_color_tokens: 14
  type_classes: 8
  font_family_tokens: 4
  icon_size_tokens: 5
  ds_keyframes: 7
  ds_component_classes: 12   # .ds-spinner family + .type-* classes
```

---

## Components — `@umichkisa-ds/web`

Source root: `packages/web/src/components/`. Compound parts listed under the parent. `intent_group` mirrors DS_CODEBASE.md's grouping headings.

```yaml
components:
  - name: Alert
    intent_group: Showing feedback to the user
    source_path: feedback/Alert.tsx
    intent: Inline contextual message (validation summary, feature caveat, important note)
    compound_parts: null
    variants: [success, warning, error, info]
  - name: Toaster
    intent_group: Showing feedback to the user
    source_path: feedback/Toast.tsx
    intent: Mount-once root for transient post-action notifications
    compound_parts:
      - name: toast
        kind: imperative_function
        note: lowercase function from same module
  - name: StatusView
    intent_group: Showing feedback to the user
    source_path: feedback/StatusView.tsx
    intent: Full-page state when there is no content (empty / 404 / auth gate / error)
    compound_parts: null
    variants: [not-found, not-authorized, not-logged-in, error]
    notable_props: [fullScreen, code, icon, title, description, action]
  - name: LoadingSpinner
    intent_group: Showing feedback to the user
    source_path: feedback/LoadingSpinner.tsx
    intent: Wait state with no skeletonable layout (initial load, button submit, overlay content)
    compound_parts: null
  - name: Skeleton
    intent_group: Showing feedback to the user
    source_path: feedback/Skeleton.tsx
    intent: Loading placeholder that preserves known layout
    compound_parts: null

  - name: Input
    intent_group: Collecting user input
    source_path: form/Input.tsx
    intent: Single-line free text
    compound_parts: null
  - name: Textarea
    intent_group: Collecting user input
    source_path: form/Textarea.tsx
    intent: Multi-line free text
    compound_parts: null
  - name: Select
    intent_group: Collecting user input
    source_path: form/Select.tsx
    intent: Pick one from a long list (dropdown)
    compound_parts: null
  - name: Checkbox
    intent_group: Collecting user input
    source_path: form/Checkbox.tsx
    intent: Boolean toggle or multi-select from a short list
    compound_parts: null
  - name: RadioGroup
    intent_group: Collecting user input
    source_path: form/Radio.tsx
    intent: Pick exactly one from 2–5 visible options
    compound_parts:
      - name: RadioItem
        kind: required_child
  - name: Switch
    intent_group: Collecting user input
    source_path: form/Switch.tsx
    intent: Binary on/off toggle (lighter than Checkbox)
    compound_parts: null
  - name: Label
    intent_group: Collecting user input
    source_path: form/Label.tsx
    intent: Accessible text label for a form control
    compound_parts: null
  - name: FormItem
    intent_group: Collecting user input
    source_path: form/FormItem.tsx
    intent: Vertical label-above-control layout wrapper (label + control + description + error)
    compound_parts: null
  - name: FileUpload
    intent_group: Collecting user input
    source_path: form/FileUpload/FileUpload.tsx
    intent: Single-image upload with client-side validation, preview, consumer-owned callbacks
    compound_parts: null
  - name: DatePicker
    intent_group: Collecting user input
    source_path: date/DatePicker.tsx
    intent: Single-date picker with calendar popover
    compound_parts: null
  - name: DateRangePicker
    intent_group: Collecting user input
    source_path: date/DatePicker.tsx
    intent: Date-range picker with calendar popover
    compound_parts: null

  - name: Button
    intent_group: Triggering actions
    source_path: button/Button.tsx
    intent: Primary call-to-action (submit, confirm, start a flow)
    compound_parts: null
  - name: IconButton
    intent_group: Triggering actions
    source_path: button/IconButton.tsx
    intent: Action represented by an icon alone (toolbar, close, compact)
    compound_parts: null
  - name: LinkButton
    intent_group: Triggering actions
    source_path: button/LinkButton.tsx
    intent: Navigation styled as a button
    compound_parts: null

  - name: Card
    intent_group: Organizing & displaying content
    source_path: display/Card.tsx
    intent: Bordered container grouping related content
    compound_parts:
      - {name: CardHeader, kind: optional_child}
      - {name: CardTitle, kind: optional_child}
      - {name: CardDescription, kind: optional_child}
      - {name: CardContent, kind: optional_child}
      - {name: CardFooter, kind: optional_child}
  - name: Table
    intent_group: Organizing & displaying content
    source_path: display/Table.tsx
    intent: Structured tabular data
    compound_parts:
      - {name: TableHeader,  kind: required_child}
      - {name: TableBody,    kind: required_child}
      - {name: TableRow,     kind: required_child}
      - {name: TableHead,    kind: required_child}
      - {name: TableCell,    kind: required_child}
      - {name: TableFooter,  kind: optional_child}
      - {name: TableCaption, kind: optional_child}
      - name: TableMobileList
        kind: paired_responsive_sibling
        note: required for mobile when desktop ships <Table>
      - {name: TableMobileItem, kind: required_child, note: child of TableMobileList — one per data row}
  - name: Accordion
    intent_group: Organizing & displaying content
    source_path: display/Accordion.tsx
    intent: Progressive disclosure (FAQ, advanced settings)
    compound_parts:
      - {name: AccordionItem,    kind: required_child}
      - {name: AccordionTrigger, kind: required_child, note: child of AccordionItem — section heading}
      - {name: AccordionContent, kind: required_child, note: child of AccordionItem — section body}
  - name: Badge
    intent_group: Organizing & displaying content
    source_path: display/Badge.tsx
    intent: Short status label or count
    compound_parts: null
  - name: Avatar
    intent_group: Organizing & displaying content
    source_path: display/Avatar.tsx
    intent: User/entity representation with initials or icon fallback
    compound_parts: null
  - name: Divider
    intent_group: Organizing & displaying content
    source_path: divider/Divider.tsx
    intent: Visual separator (horizontal or vertical rule)
    compound_parts: null

  - name: Dialog
    intent_group: Overlays & dialogs
    source_path: overlay/Dialog.tsx
    intent: Modal that blocks the page (confirm, lightbox form, detail view)
    compound_parts: null
  - name: Dropdown
    intent_group: Overlays & dialogs
    source_path: overlay/Dropdown.tsx
    intent: Context menu / action list anchored to a trigger
    compound_parts: null
  - name: Popover
    intent_group: Overlays & dialogs
    source_path: overlay/Popover.tsx
    intent: Non-modal floating content (rich tooltip, mini-form, filter panel)
    compound_parts: null
  - name: Tooltip
    intent_group: Overlays & dialogs
    source_path: overlay/Tooltip.tsx
    intent: Brief helper text on hover/focus
    compound_parts: null

  - name: Tabs
    intent_group: Navigation & wayfinding
    source_path: navigation/Tabs.tsx
    intent: Switch between views within the same page context
    compound_parts:
      - {name: TabsList, kind: required_child}
      - {name: TabsTrigger, kind: required_child}
      - {name: TabsContent, kind: required_child}
  - name: Pagination
    intent_group: Navigation & wayfinding
    source_path: navigation/Pagination.tsx
    intent: Navigate paged data (results, tables, bulletins)
    compound_parts: null
  - name: ToggleGroup
    intent_group: Navigation & wayfinding
    source_path: navigation/ToggleGroup.tsx
    intent: Segmented control for mode/filter (grid/list, time range)
    compound_parts: null

  - name: Container
    intent_group: Layout
    source_path: layout/Container.tsx
    intent: Page-width wrapper with max-width and horizontal padding
    compound_parts: null
  - name: Grid
    intent_group: Layout
    source_path: layout/Grid.tsx
    intent: Equal-width responsive column grid
    compound_parts: null

  - name: Calendar
    intent_group: Date selection
    source_path: date/Calendar.tsx
    intent: Standalone always-visible calendar
    compound_parts: null

  - name: Icon
    intent_group: Utilities
    source_path: icon/Icon.tsx
    intent: Lucide-registry-backed icon with name prop
    compound_parts: null
  - name: OnlyMobileView
    intent_group: Utilities
    source_path: utilities/OnlyMobileView.tsx
    intent: Mobile-only gate; desktop sees a "use your phone" overlay
    compound_parts: null
  - name: cn
    intent_group: Utilities
    source_path: utils/cn.ts
    intent: Class-name merger with Tailwind conflict resolution
    compound_parts: null
    kind: utility_function
```

---

## Components — `@umichkisa-ds/form`

Source root: `packages/form/src/`. Surface listed in DS_CODEBASE.md "Form Wiring" + DS_CLIENT_USAGE.md Part 1.

```yaml
form_package_exports:
  compounds:
    - {name: Form,             kind: container,         intent: RHF context provider + submit handler}
    - {name: Form.Input,       kind: wired_field,       intent: Text input wired to form state}
    - {name: Form.Textarea,    kind: wired_field,       intent: Multi-line text wired to form state}
    - {name: Form.Select,      kind: wired_field,       intent: Select wired to form state}
    - {name: Form.Checkbox,    kind: wired_field,       intent: Checkbox wired to form state}
    - {name: Form.Radio,       kind: wired_field,       intent: Radio group wired to form state}
    - {name: Form.Switch,      kind: wired_field,       intent: Switch wired to form state}
    - {name: Form.Button,      kind: wired_action,      intent: Submit button auto-disables during submission}
    - {name: Form.DatePicker,  kind: wired_field,       intent: DatePicker wired to form state, source: DS_CLIENT_USAGE.md Part 1}
    - {name: Form.DateRangePicker, kind: wired_field,   intent: DateRangePicker wired to form state, source: DS_CLIENT_USAGE.md Part 1}
  hooks:
    - {name: useForm,         kind: hook, intent: Init form (RHF wrapper, mode: 'onTouched' default)}
    - {name: useFormField,    kind: hook, intent: Manual field wiring escape hatch}
    - {name: useFormStatus,   kind: hook, intent: Read-only form state}
    - {name: useFormContext,  kind: hook, intent: RHF context access (re-export); listed in Part 1, missing from DS_CODEBASE.md table}
```

**Inventory finding (form package):** `Form.DatePicker`, `Form.DateRangePicker`, and `useFormContext` appear in `DS_CLIENT_USAGE.md` Part 1 but not in `DS_CODEBASE.md` "Form Wiring" table. Flag for A2 — catalog drift between the two consumer docs.

---

## DS_CONSTRAINTS.md — Rules

Per-rule entries: `{id, severity, gloss, provenance}`. `severity` is the verbatim leading word from the rule line. `provenance` is the bracketed `[source:...]` annotation, verbatim. Heading anchor for each subsection is in the YAML key.

```yaml
ds_constraints:
  colors:
    token-usage:
      - {id: c-tu-1, severity: Must,  gloss: "Use semantic --color-* tokens; never raw hex/OKLCH/primitives", provenance: "foundation/colors/overview"}
      - {id: c-tu-2, severity: Never, gloss: "Reference --primitive-* tokens directly in component code",     provenance: "foundation/colors/overview"}
      - {id: c-tu-3, severity: Never, gloss: "Implement dark mode (no .dark, no media queries, no dark layer)", provenance: "foundation/colors/overview"}
    naming-subtle-muted:
      - {id: c-nm-1, severity: Must, gloss: "-subtle = container/background roles (tinted regions, fills)",   provenance: "foundation/colors/tokens"}
      - {id: c-nm-2, severity: Must, gloss: "-muted = deprioritized roles (low-contrast text, elevated inner)", provenance: "foundation/colors/tokens"}
    brand-colors:
      - {id: c-br-1, severity: Must,   gloss: "Use --color-brand-foreground (maize) for text on brand-primary bg", provenance: "foundation/colors/usage"}
      - {id: c-br-2, severity: Never,  gloss: "White text on brand-primary bg (white not a KISA brand color)",     provenance: "foundation/colors/usage"}
      - {id: c-br-3, severity: Never,  gloss: "Maize as link text color (low contrast on white)",                  provenance: "foundation/colors/usage"}
      - {id: c-br-4, severity: Avoid,  gloss: "Brand colors as mid-page card/content backgrounds",                 provenance: "foundation/colors/usage"}
      - {id: c-br-5, severity: Prefer, gloss: "Brand colors reserved for sparse placement (navbars, hero, CTAs)",  provenance: "foundation/colors/usage"}
    surface-depth:
      - {id: c-sd-1, severity: Must, gloss: "Two-level depth: page+cards=surface, elevated=subtle, deprioritized=muted; cards distinguished by border", provenance: "foundation/colors/usage"}
    text:
      - {id: c-tx-1, severity: Must,  gloss: "Use --color-link (not brand-accent) for hyperlinks",                  provenance: "foundation/colors/usage"}
      - {id: c-tx-2, severity: Never, gloss: "--color-disabled-foreground for content that needs to be read",       provenance: "foundation/colors/usage"}
      - {id: c-tx-3, severity: Never, gloss: "--color-brand-foreground outside of brand-primary backgrounds",       provenance: "foundation/colors/tokens"}
    info-vs-link:
      - {id: c-il-1, severity: Never, gloss: "Use --color-info and --color-link interchangeably (same value, distinct roles)", provenance: "foundation/colors/tokens"}
      - {id: c-il-2, severity: Must,  gloss: "info = state indicators/alert borders; link = clickable text only",   provenance: "foundation/colors/tokens"}
    feedback-states:
      - {id: c-fs-1, severity: Must,  gloss: "Pair solid + subtle tokens for feedback (solid for icons/borders/labels, subtle for bg)", provenance: "foundation/colors/usage"}
      - {id: c-fs-2, severity: Never, gloss: "--color-success as standalone text/icon color (2.2:1, fails AA)",     provenance: "foundation/colors/accessibility"}
      - {id: c-fs-3, severity: Must,  gloss: "Pair --color-success with --color-foreground label for readable content", provenance: "foundation/colors/accessibility"}
      - {id: c-fs-4, severity: Must,  gloss: "Pair --color-warning with --color-foreground label (3.0:1 floor)",    provenance: "foundation/colors/accessibility"}
      - {id: c-fs-5, severity: Avoid, gloss: "--color-error for small body text (passes large only, 3.9:1)",        provenance: "foundation/colors/accessibility"}
    interactive-states:
      - {id: c-is-1, severity: Must,      gloss: "Dual-ring focus on buttons + icon-only: 2px outline focus-ring + 4px box-shadow brand-primary", provenance: "foundation/colors/tokens"}
      - {id: c-is-2, severity: Exception, gloss: "Form controls use border-color brand-primary instead of dual-ring", provenance: "implementation/form-controls"}
      - {id: c-is-3, severity: Never,     gloss: "Remove the focus indicator entirely",                              provenance: "foundation/colors/usage"}
      - {id: c-is-4, severity: Prefer,    gloss: "surface-subtle hover bg + border-strong hover border for neutral interactives", provenance: "foundation/colors/tokens"}
      - {id: c-is-5, severity: Must,      gloss: "Use brand-primary (navy) for checked/selected bg on toggle controls", provenance: "form-ui-review/2026-03-31"}
      - {id: c-is-6, severity: Must,      gloss: "Stroke indicators on checked toggles use maize; fill indicators use white", provenance: "form-ui-review/2026-04-02"}
      - {id: c-is-7, severity: Must,      gloss: "brand-accent-subtle (light maize) as hover/focus bg for interactive list items", provenance: "form-ui-review/2026-03-31"}
      - {id: c-is-8, severity: Must,      gloss: "brand-primary for selected-item check icons in interactive lists", provenance: "form-ui-review/2026-03-31"}

  typography:
    fonts:
      - {id: t-fn-1, severity: Must,      gloss: "font-sejong-bold for all type-display and type-h1",            provenance: "foundation/typography/fonts"}
      - {id: t-fn-2, severity: Never,     gloss: "SejongHospital below H1; hand off to Pretendard at H2 and below", provenance: "foundation/typography/fonts"}
      - {id: t-fn-3, severity: Exception, gloss: "font-sejong-bold permitted in docs-app nav: header logo + sidebar category headings", provenance: "header-sidebar-redesign/2026-04-04"}
      - {id: t-fn-4, severity: Never,     gloss: "font-sejong-light as default heading weight (only marketing/landing)", provenance: "foundation/typography/fonts"}
      - {id: t-fn-5, severity: Never,     gloss: "Geist Mono in client app components (docs-site only)",         provenance: "foundation/typography/fonts"}
      - {id: t-fn-6, severity: Exception, gloss: "font-mono permitted alongside type-* in docs-site components when no mono variant exists", provenance: null}
      - {id: t-fn-7, severity: Must,      gloss: "Both product fonts use font-display: swap in @font-face",      provenance: "foundation/typography/fonts"}
      - {id: t-fn-8, severity: Must,      gloss: "Preload SejongHospital (used in Display + H1, above-the-fold)", provenance: "foundation/typography/fonts"}
    scale:
      - {id: t-sc-1, severity: Must,   gloss: "Use type-* utility classes for all typography; never raw text-base/font-normal/leading-* compositions", provenance: "foundation/typography/usage"}
      - {id: t-sc-2, severity: Must,   gloss: "tracking-tight on type-display + type-h1; tracking-normal elsewhere", provenance: "foundation/typography/scale"}
      - {id: t-sc-3, severity: Must,   gloss: "type-display for hero; type-h1 for app page titles",                provenance: "foundation/typography/scale"}
      - {id: t-sc-4, severity: Prefer, gloss: "type-h2 styling on a semantic <h1> when type-display already used", provenance: "foundation/typography/scale"}
      - {id: t-sc-5, severity: Must,   gloss: "Rely on type-* class definitions for responsive behavior; no breakpoint overrides on typography", provenance: "foundation/typography/scale"}
    usage:
      - {id: t-us-1, severity: Must,  gloss: "Always pair an explicit color token with every type-* class",       provenance: "foundation/typography/usage"}
      - {id: t-us-2, severity: Must,  gloss: "text-foreground for readable; text-muted-foreground for secondary", provenance: "foundation/typography/usage"}
      - {id: t-us-3, severity: Never, gloss: "Apply font-semibold/font-bold to entire containers for emphasis; use <strong> or higher type-*", provenance: "foundation/typography/usage"}
    state-typography:
      - {id: t-st-1, severity: Must, gloss: "Disabled text uses same type-* as active; only color changes (text-disabled-foreground)", provenance: "foundation/typography/usage"}
      - {id: t-st-2, severity: Must, gloss: "type-caption + text-error for form field error messages",            provenance: "foundation/typography/usage"}
      - {id: t-st-3, severity: Must, gloss: "type-caption + text-muted-foreground for helper text",               provenance: "foundation/typography/usage"}
    links:
      - {id: t-lk-1, severity: Must, gloss: "text-link for all link color; never text-foreground",                provenance: "foundation/typography/usage"}
      - {id: t-lk-2, severity: Must, gloss: "Underline links on hover; hover:text-brand-primary; no visited style", provenance: "foundation/typography/usage"}
    truncation:
      - {id: t-tr-1, severity: Must,   gloss: "truncate for single-line UI element truncation",                   provenance: "foundation/typography/usage"}
      - {id: t-tr-2, severity: Prefer, gloss: "line-clamp-2 for card titles; line-clamp-3 for descriptions",      provenance: "foundation/typography/usage"}

  layout:
    breakpoints:
      - {id: l-bp-1, severity: Must,  gloss: "Three breakpoints only: default / md: (>=768) / lg: (>=1024)",      provenance: "foundation/layout/breakpoints"}
      - {id: l-bp-2, severity: Never, gloss: "sm:, xl:, 2xl: breakpoints",                                        provenance: "foundation/layout/breakpoints"}
    spacing:
      - {id: l-sp-1, severity: Must, gloss: "All spacing from Tailwind built-in scale (4px base); no arbitrary values", provenance: "foundation/layout/spacing"}
      - {id: l-sp-2, severity: Must, gloss: "Default column gutter is gap-2 (8px) for inline + form layouts",     provenance: "foundation/layout/spacing"}
      - {id: l-sp-3, severity: Must, gloss: "Grid uses three-tier gap (element/component/section); default component", provenance: "foundation/layout/spacing"}
    vertical-spacing:
      - {id: l-vs-1, severity: Must,  gloss: "Three-tier vertical: Element gap-2 (8) / Component gap-4 (16) / Section gap-6 (24)", provenance: "foundation/layout/spacing"}
      - {id: l-vs-2, severity: Never, gloss: "Scale vertical spacing with breakpoints (responsiveness is column reflow)", provenance: "foundation/layout/spacing"}
      - {id: l-vs-3, severity: Must,  gloss: "Element tier (gap-2): label→input, icon→text, caption-below, heading→subtitle", provenance: "foundation/layout/spacing"}
      - {id: l-vs-4, severity: Must,  gloss: "Component tier (gap-4): stacked fields, list items, stacked cards, nav items", provenance: "foundation/layout/spacing"}
      - {id: l-vs-5, severity: Must,  gloss: "Section tier (gap-6): gaps between major page sections (1.5x component)", provenance: "foundation/layout/spacing"}
    page-shell:
      - {id: l-ps-1, severity: Must,  gloss: "Page shell combines all 4: mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8", provenance: "foundation/layout/spacing"}
      - {id: l-ps-2, severity: Must,  gloss: "Use Container component to apply page shell; never compose manually", provenance: "component/container"}
      - {id: l-ps-3, severity: Must,  gloss: "Full-bleed: bg on outer wrapper, Container nested for content alignment", provenance: "foundation/layout/spacing"}
      - {id: l-ps-4, severity: Never, gloss: "Nest Container components",                                          provenance: "component/container"}

  iconography:
    library:
      - {id: i-lb-1, severity: Must,   gloss: "Lucide as sole icon library; never react-icons / emoji / PNG",    provenance: "foundation/iconography/library"}
      - {id: i-lb-2, severity: Never,  gloss: "Import a Lucide icon directly into a component; always use <Icon>", provenance: "foundation/iconography/overview"}
      - {id: i-lb-3, severity: Prefer, gloss: "Exhaust Lucide search before adding custom SVG",                  provenance: "foundation/iconography/library"}
    custom-icons:
      - {id: i-ci-1, severity: Must,      gloss: "Custom icons added to <Icon> registry by DS owner; never inline SVG", provenance: "foundation/iconography/library"}
      - {id: i-ci-2, severity: Must,      gloss: "Stroke-based custom icons match Lucide style: 24x24, stroke-width 2, currentColor, fill none, round caps", provenance: "foundation/iconography/library"}
      - {id: i-ci-3, severity: Exception, gloss: "Brand icons (GitHub, LinkedIn) registered as fill-based with original viewBox", provenance: "implementation/icon"}
      - {id: i-ci-4, severity: Never,     gloss: "Complex illustrations through <Icon>; use <img> or inline SVG component", provenance: "foundation/iconography/library"}
    naming:
      - {id: i-nm-1, severity: Must, gloss: "Lucide names in exact kebab-case from lucide.dev",                  provenance: "foundation/iconography/library"}
    icon-props:
      - {id: i-pr-1, severity: Must,  gloss: "Use size prop from 5-step scale; never override with font-size or arbitrary CSS", provenance: "foundation/iconography/sizes"}
      - {id: i-pr-2, severity: Must,  gloss: "className for layout utilities only (block, flex-shrink-0); no color/sizing", provenance: "foundation/iconography/usage"}
      - {id: i-pr-3, severity: Must,  gloss: "Omit label for decorative icons; provide label only when icon is sole indicator", provenance: "foundation/iconography/accessibility"}
      - {id: i-pr-4, severity: Never, gloss: "Provide label on <Icon> when wrapper button has aria-label",       provenance: "foundation/iconography/accessibility"}
    sizing:
      - {id: i-sz-1, severity: Must,  gloss: "md (20px) default for buttons, nav items, general UI",             provenance: "foundation/iconography/sizes"}
      - {id: i-sz-2, severity: Must,  gloss: "Match icon size to text context (sm/caption, md/body, md-lg/subhead, lg/heading)", provenance: "foundation/iconography/sizes"}
      - {id: i-sz-3, severity: Never, gloss: "Apply breakpoint prefixes directly to icon size (encapsulate in component variant)", provenance: "foundation/iconography/sizes"}
    color:
      - {id: i-co-1, severity: Must, gloss: "Control icon color via parent text color; icons inherit currentColor", provenance: "foundation/iconography/usage"}
      - {id: i-co-2, severity: Must, gloss: "text-disabled-foreground for disabled icons; never reduce size/weight", provenance: "foundation/iconography/usage"}
    interactivity:
      - {id: i-it-1, severity: Never, gloss: "Attach onClick directly to <Icon>; wrap in <button> or <a>",        provenance: "foundation/iconography/usage"}
    icon-text-layout:
      - {id: i-il-1, severity: Must,   gloss: "flex items-center gap-2 default for icon+text",                    provenance: "foundation/iconography/usage"}
      - {id: i-il-2, severity: Prefer, gloss: "gap-1 (4) for compact tags/badges; gap-3 (12) for larger display", provenance: "foundation/iconography/usage"}
    icon-only-interactive:
      - {id: i-oi-1, severity: Must,   gloss: "Provide aria-label on button/link wrapping icon-only interactive", provenance: "foundation/iconography/usage"}
      - {id: i-oi-2, severity: Prefer, gloss: "Wrap icon-only buttons in <Tooltip>; tooltip text matches aria-label", provenance: "foundation/iconography/usage"}

  accessibility:
    contrast-thresholds:
      - {id: a-ct-1, severity: Must,  gloss: "Min 4.5:1 contrast for normal body text (WCAG AA)",                 provenance: "foundation/colors/accessibility"}
      - {id: a-ct-2, severity: Must,  gloss: "Min 3:1 contrast for large text (18px+ or 14px bold) and non-text UI", provenance: "foundation/colors/accessibility"}
      - {id: a-ct-3, severity: Avoid, gloss: "muted-foreground at small text on surface-subtle (4.2:1 large only)", provenance: "foundation/colors/accessibility"}
      - {id: a-ct-4, severity: Avoid, gloss: "muted-foreground at small text on surface-muted (3.8:1 large only)",  provenance: "foundation/colors/accessibility"}
    typography-floor:
      - {id: a-tf-1, severity: Must, gloss: "Error/helper text uses type-caption (12px) minimum",                 provenance: "foundation/typography/usage"}
    landmark-skip-nav:
      - {id: a-ls-1, severity: Must, gloss: "Use semantic landmarks: <header>, <nav> (with aria-label if multiple), <main>, <footer>", provenance: "foundation/layout/overview"}
      - {id: a-ls-2, severity: Must, gloss: "Every page includes a skip link to <main id='main-content'>",        provenance: "foundation/layout/overview"}
    touch-targets:
      - {id: a-tt-1, severity: Must,   gloss: "Interactive icon wrappers >= 44x44px",                             provenance: "foundation/iconography/accessibility"}
      - {id: a-tt-2, severity: Prefer, gloss: "::after pseudo-element technique for compact interactives (extends touch target)", provenance: "foundation/iconography/accessibility"}
    icon-contrast:
      - {id: a-ic-1, severity: Must, gloss: "Decorative icons (aria-hidden) no contrast req; only labeled semantic icons need 3:1", provenance: "foundation/iconography/accessibility"}

  form-controls:
    toggle-controls:
      - {id: f-tc-1, severity: Must, gloss: "Toggle controls use 'text' string prop for inline label; never children/external markup", provenance: "form-ui-review/2026-03-31"}
      - {id: f-tc-2, severity: Must, gloss: "Toggle inline label uses type-body-sm text-foreground (Switch sm uses type-caption)", provenance: "form-ui-review/2026-03-31"}
    formitem-composition:
      - {id: f-fi-1, severity: Must, gloss: "FormItem is vertical label-above-control only; toggles compose as children", provenance: "form-ui-review/2026-03-31"}
      - {id: f-fi-2, severity: Must, gloss: "Wire aria-describedby manually; IDs follow {htmlFor}-description and {htmlFor}-error", provenance: "form-ui-review/2026-03-31"}
      - {id: f-fi-3, severity: Must, gloss: "htmlFor for native inputs; aria-labelledby with Label id for non-native triggers", provenance: "label-id/2026-04-04"}

  documentation:
    api-reference-tables:
      - {id: d-rt-1, severity: Must, gloss: "Every API ref table ships desktop <Table> (hidden md:block) AND mobile <TableMobileList> (block md:hidden)", provenance: "docs-app-review"}
      - {id: d-rt-2, severity: Must, gloss: "Required props use asterisk on prop name; Default column shows '—'; never '(required)'", provenance: "required-prop-sweep/2026-04-11"}
      - {id: d-rt-3, severity: Must, gloss: "Tables with required props include '* Required prop.' caption (type-caption mt-2 muted)", provenance: "required-prop-sweep/2026-04-11"}
```

---

## DS_CLIENT_USAGE.md — Part 1 (Write-Time Decision Tree)

### Tier pickers (shape census)

```yaml
tier_pickers:
  - id: spacing
    decision_input: container_role  # implicit; not labeled in source
    shape_type: tiered
    tier_count: 3   # plus an off-tier carve-out
    tiers: [Element (8px), Component (16px), Section (24px)]
    off_tier_note: "gap-3/5/7 only inside a single component's internal layout"
    source_anchor: docs/DS_CLIENT_USAGE.md#tier-picker-write-time-check
  - id: color-text
    decision_input: content_priority
    shape_type: binary_with_test
    options: [text-foreground (primary), text-muted-foreground (genuinely secondary)]
    write_time_check: "if this text went to 40% opacity, would the screen still be usable?"
    source_anchor: docs/DS_CLIENT_USAGE.md#tier-picker-write-time-check
  - id: color-bg-border
    decision_input: surface_kind
    shape_type: categories
    categories: [Surfaces, Brand, Status, Borders]
    source_anchor: docs/DS_CLIENT_USAGE.md#tier-picker-write-time-check
  - id: radius
    decision_input: surface_size_or_shape
    shape_type: enum_with_carve_out
    options: [rounded-md (default), rounded-lg (modals/larger), rounded-full (avatars/pills)]
    carve_out: "rounded-xl/2xl only with explicit DS-surface justification"
    source_anchor: docs/DS_CLIENT_USAGE.md#tier-picker-write-time-check
  - id: typography
    decision_input: text_role
    shape_type: categories
    categories: [Display/hero, Headings (h1-h3), Body (body, body-sm), Labels, Captions]
    invariants: ["always pair with color token", "never !font-* override"]
    source_anchor: docs/DS_CLIENT_USAGE.md#tier-picker-write-time-check
  - id: icon-size
    decision_input: text_context
    shape_type: enum
    options: [xs, sm, md, lg, xl]
    invariants: ["never override with font-size utilities or arbitrary CSS"]
    source_anchor: docs/DS_CLIENT_USAGE.md#tier-picker-write-time-check
```

### Part 1 condensed rules (`What to Use` + `Visibility & Hierarchy`)

```yaml
ds_client_usage_part1_rules:
  what-to-use:
    - {id: p1-wu-1, severity: Must,  gloss: "Container for page shells; never compose mx-auto max-w-screen-2xl px-4 manually",    provenance: condensed_from_part2}
    - {id: p1-wu-2, severity: Must,  gloss: "Form.* compounds + useForm from @umichkisa-ds/form for all forms; never useState",   provenance: condensed_from_part2}
    - {id: p1-wu-3, severity: Must,  gloss: "<Icon name='...'> from web pkg for icons; never react-icons/lucide-react/inline SVG", provenance: condensed_from_part2}
    - {id: p1-wu-4, severity: Must,  gloss: "cn() from web pkg for className merging; never raw clsx or string concat",          provenance: condensed_from_part2}
    - {id: p1-wu-5, severity: Must,  gloss: "StatusView for full-page status; never <div h-screen flex items-center> wrappers",  provenance: condensed_from_part2}
    - {id: p1-wu-6, severity: Must,  gloss: "Semantic Badge/Alert variants (success/warning/error/info); never outline for status", provenance: condensed_from_part2}
    - {id: p1-wu-7, severity: Must,  gloss: "Breakpoints default/md:/lg: only; never sm:/xl:/2xl:",                              provenance: condensed_from_part2}
    - {id: p1-wu-8, severity: Must,  gloss: "type-* classes with color token; never !font-* override",                           provenance: condensed_from_part2}
    - {id: p1-wu-9, severity: Must,  gloss: "Cap inner content with max-h-[…] if DS layout doesn't fit; never flex/overflow-* on DS component", provenance: condensed_from_part2}
  visibility-hierarchy:
    - {id: p1-vh-1, severity: <unmarked-bold>, gloss: "text-muted-foreground is NOT default body color; reserve for genuinely secondary", provenance: "G3 (visibility/hierarchy)"}
    - {id: p1-vh-2, severity: <unmarked-bold>, gloss: "Intro paragraphs are primary content (text-foreground, not muted)",       provenance: "G3 (visibility/hierarchy)"}
    - {id: p1-vh-3, severity: <unmarked-bold>, gloss: "No left-border accent for selected state; use bg-brand-accent-subtle border-brand-primary (full ring)", provenance: "G3 (visibility/hierarchy)"}
    - {id: p1-vh-4, severity: <unmarked-bold>, gloss: "No padding override on Card/CardContent/CardFooter",                      provenance: "G3 (visibility/hierarchy)"}
```

**Inventory finding (Part 1):** "Visibility & Hierarchy Rules" use bullet headers in **bold** with the rule statement following — no leading `Must:` / `Never:` keyword. Recorded as `severity: <unmarked-bold>`. Suggests A3's severity enum needs a default or an unmarked tier.

---

## DS_CLIENT_USAGE.md — Part 2 (Review-Time Rulebook)

```yaml
ds_client_usage_part2:
  setup:
    css-entry-point:
      - {id: p2-cs-1, severity: Must,  gloss: "Tailwind v4 consumers import @umichkisa-ds/web/theme.css in CSS entry",          provenance: "phase-0-gap/2026-04-18"}
      - {id: p2-cs-2, severity: Never, gloss: "Import dist/styles.css in Tailwind v4 consumer (precompiled tree-shaken; silent breakage)", provenance: "phase-0-gap/2026-04-18"}
    font-loading-nextjs:
      - {id: p2-fn-1, severity: Must,  gloss: "Load SejongHospital Bold + Light via next/font/local with --font-sejong-bold/light, display swap, .variable on <html>", provenance: "docs-app/foundation/typography/fonts"}
      - {id: p2-fn-2, severity: Must,  gloss: "Load Pretendard Variable via CDN preconnect + stylesheet link to jsdelivr",     provenance: "docs-app/foundation/typography/fonts"}
      - {id: p2-fn-3, severity: Never, gloss: "Duplicate font files into client repo (point next/font/local at DS source)",     provenance: "docs-app/foundation/typography/fonts"}
      - {id: p2-fn-4, severity: Never, gloss: "Load Geist Mono in client apps (docs-site only)",                                provenance: "DS_CONSTRAINTS.md/typography"}
  component-usage:
    general:
      - {id: p2-cu-1, severity: Must,  gloss: "Check DS_CODEBASE.md before building any local UI component",                    provenance: "HARNESS_DESIGN.md/missing-ds-components"}
      - {id: p2-cu-2, severity: Must,  gloss: "Use DS components directly via @umichkisa-ds/web or /form imports",              provenance: "DS_CODEBASE.md/packages"}
      - {id: p2-cu-3, severity: Never, gloss: "Wrap or re-export a DS component to add defaults or rename (no shadow MyButton)", provenance: "grill-session/2026-04-12"}
    feedback-status:
      - {id: p2-fs-1, severity: Must,  gloss: "Replace legacy @/components/ui/feedback imports with DS equivalents on touch", provenance: "phase-2/lane-2.0 review, 2026-04-23"}
      - {id: p2-fs-2, severity: Never, gloss: "Leave a legacy feedback import in any in-lane file (swap in-lane unless issue says non-goal)", provenance: "phase-2/lane-2.0 review, 2026-04-23"}
    status-variant-selection:
      - {id: p2-sv-1, severity: Must,  gloss: "Status content uses semantic variant (success/warning/error/info), not outline/neutral", provenance: "phase-2/lane-2.11b smoke fix, commit 59462d4"}
  styling:
    tokens:
      - {id: p2-tk-1, severity: Must,      gloss: "DS semantic color tokens for all colors; never raw hex/OKLCH/Tailwind defaults", provenance: "DS_CONSTRAINTS.md/colors"}
      - {id: p2-tk-2, severity: Must,      gloss: "type-* utility classes for typography; never raw text-base/font-normal/leading-* compositions", provenance: "DS_CONSTRAINTS.md/typography"}
      - {id: p2-tk-3, severity: Never,     gloss: "Override type-* weight with !font-* (type-body !font-semibold etc.)",          provenance: "MEMORY/feedback_type_weight_override; phase-2/lane-2.19 commit 09d2cd0"}
      - {id: p2-tk-4, severity: Exception, gloss: "Migration-only short-lived !font-* allowed when type-* tier doesn't expose weight; collect as DS gap", provenance: null}
      - {id: p2-tk-5, severity: Must,      gloss: "Pair color token with every type-* class",                                     provenance: "DS_CONSTRAINTS.md/typography"}
      - {id: p2-tk-6, severity: Never,     gloss: "Import font loaders from client (sejongHospital*, heebo, montserrat); fonts owned by DS via type-*", provenance: "client#80 Phase 1.2 review, 2026-04-21"}
    class-utilities:
      - {id: p2-cl-1, severity: Must,  gloss: "cn() from @umichkisa-ds/web for class merging; never clsx/classnames/concat",     provenance: "DS_CODEBASE.md/utilities"}
      - {id: p2-cl-2, severity: Never, gloss: "Arbitrary Tailwind values (px-[24px], text-[#00274C], mt-[13px])",                provenance: "DS_CONSTRAINTS.md/layout"}
    css-files:
      - {id: p2-cf-1, severity: Never, gloss: "Create new CSS modules or .css files for migrated components",                    provenance: "grill-session/2026-04-12"}
  icons:
    - {id: p2-ic-1, severity: Must,  gloss: "<Icon name='...'> from @umichkisa-ds/web for all icons",                            provenance: "DS_CONSTRAINTS.md/iconography"}
    - {id: p2-ic-2, severity: Never, gloss: "Import from react-icons (replaced by DS icon system)",                              provenance: "DS_CONSTRAINTS.md/iconography"}
    - {id: p2-ic-3, severity: Never, gloss: "Import directly from lucide-react (always go through <Icon>)",                     provenance: "DS_CONSTRAINTS.md/iconography"}
    - {id: p2-ic-4, severity: Never, gloss: "Inline raw SVGs in client components (use registry; collect missing via ds-fix-during-migration)", provenance: "DS_CONSTRAINTS.md/iconography, HARNESS_DESIGN.md/missing-ds-components"}
    - {id: p2-ic-5, severity: Must,  gloss: "Use size prop from 5-step scale; never override with font-size or arbitrary CSS",  provenance: "DS_CONSTRAINTS.md/iconography"}
  forms:
    - {id: p2-fm-1, severity: Must,   gloss: "Form.* compound fields from @umichkisa-ds/form for all form controls",            provenance: "DS_CODEBASE.md/form-wiring"}
    - {id: p2-fm-2, severity: Must,   gloss: "useForm from @umichkisa-ds/form (not react-hook-form directly)",                  provenance: "DS_CODEBASE.md/form-wiring"}
    - {id: p2-fm-3, severity: Never,  gloss: "Native useState for form field values/validation in migrated forms",              provenance: "grill-session/2026-04-12"}
    - {id: p2-fm-4, severity: Prefer, gloss: "useFormField escape hatch for custom controls outside Form.*",                    provenance: "DS_CODEBASE.md/form-wiring"}
    - {id: p2-fm-5, severity: Never,  gloss: "Import any RHF symbol directly from react-hook-form; always use @umichkisa-ds/form re-exports", provenance: "phase-2/lane-2.19, form 1.0.1 re-export commit 086c148"}
  layout:
    - {id: p2-ly-1, severity: Must,  gloss: "Container for page shell; never compose mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8 manually", provenance: "DS_CONSTRAINTS.md/layout"}
    - {id: p2-ly-2, severity: Never, gloss: "Nest Container components (one Container per page region max)",                    provenance: "DS_CONSTRAINTS.md/layout"}
    - {id: p2-ly-3, severity: Must,  gloss: "Three-tier vertical spacing system (gap-2 / gap-4 / gap-6 = 8/16/24px)",            provenance: "DS_CONSTRAINTS.md/layout"}
    - {id: p2-ly-4, severity: Must,  gloss: "Three breakpoints only (default/md:/lg:)",                                          provenance: "DS_CONSTRAINTS.md/layout"}
    - {id: p2-ly-5, severity: Must,  gloss: "Tier-justify every spacing value before writing (component-internal is gap-2/3/4, not gap-6/8)", provenance: "phase-2/lane-2.11b smoke fix, commit 59462d4"}
  local-components:
    - {id: p2-lc-1, severity: Must, gloss: "Local components follow same DS rules (semantic colors, type-*, spacing tiers, cn())", provenance: "grill-session/2026-04-12"}
  classname-passthrough:
    - {id: p2-cp-1, severity: Prefer,    gloss: "Pass only layout/positioning classes via className on DS components",          provenance: "grill-session/2026-04-12"}
    - {id: p2-cp-2, severity: Avoid,     gloss: "Override DS internals via className (padding, font-size, color, border-radius); collect as DS gap", provenance: "grill-session/2026-04-12"}
    - {id: p2-cp-3, severity: Exception, gloss: "App-specific override permitted with comment explaining why",                  provenance: "grill-session/2026-04-12"}
  ds-component-layout-no-override:
    - {id: p2-do-1, severity: Never, gloss: "Add flex/overflow/height/max-height to DS layout component (Dialog/Tabs/Form/Card/Sheet/Drawer) to force size", provenance: "phase-2/lane-2.11b smoke fix, commit c4cea05"}
  third-party-libs:
    - {id: p2-tp-1, severity: Never,     gloss: "Import from @radix-ui/* directly for UI DS already provides",                   provenance: "grill-session/2026-04-12"}
    - {id: p2-tp-2, severity: Never,     gloss: "Import from NextUI or HeroUI (replaced by DS)",                                 provenance: "grill-session/2026-04-12"}
    - {id: p2-tp-3, severity: Prefer,    gloss: "DS components over any third-party UI library when DS equivalent exists",      provenance: "grill-session/2026-04-12"}
    - {id: p2-tp-4, severity: Exception, gloss: "Domain-specific libs (fullcalendar, react-quill, embla-carousel) fine as app deps", provenance: "HARNESS_DESIGN.md/missing-ds-components"}
  migration-specific:
    scope: migration
    expires_at: post-migration  # section header: "Remove this section post-migration."
    rules:
      - {id: p2-ms-1, severity: Must,  gloss: "Collect missing DS components/icons each phase; do not block (fix at phase end via ds-fix-during-migration)", provenance: "HARNESS_DESIGN.md/missing-ds-components"}
      - {id: p2-ms-2, severity: Must,  gloss: "Remove old local UI imports as replaced by DS equivalents",                       provenance: "grill-session/2026-04-12"}
      - {id: p2-ms-3, severity: Must,  gloss: "Remove old CSS module files when their component is fully migrated",              provenance: "grill-session/2026-04-12"}
      - {id: p2-ms-4, severity: Never, gloss: "Leave old + new implementations coexisting in the same component",                provenance: "grill-session/2026-04-12"}
```

---

## Tokens — `packages/web/src/tokens/` and `styles/index.css`

Token enumeration with raw value and group. **No DESIGN.md-expressibility classification (deferred to A4).**

### Tier 1 — Primitives (`packages/web/src/tokens/primitives.css`)

```yaml
primitives:
  michigan_brand:
    - {name: --primitive-michigan-blue,        value: "oklch(19% 0.061 243)", hex_comment: "#00274c"}
    - {name: --primitive-michigan-blue-mid,    value: "oklch(32% 0.09 243)",  hex_comment: "#00568a"}
    - {name: --primitive-michigan-blue-light,  value: "oklch(94% 0.018 243)", hex_comment: "#e8f0f7"}
    - {name: --primitive-michigan-maize,       value: "oklch(83% 0.185 91)",  hex_comment: "#ffcb05"}
    - {name: --primitive-michigan-maize-light, value: "oklch(96% 0.06 91)",   hex_comment: "lighter maize wash"}
  gray_scale:
    - {name: --primitive-gray-50,  value: "oklch(98% 0.002 264)"}
    - {name: --primitive-gray-100, value: "oklch(96% 0.003 264)"}
    - {name: --primitive-gray-200, value: "oklch(92% 0.004 264)"}
    - {name: --primitive-gray-300, value: "oklch(87% 0.006 264)"}
    - {name: --primitive-gray-400, value: "oklch(73% 0.01 264)"}
    - {name: --primitive-gray-500, value: "oklch(60% 0.012 264)"}
    - {name: --primitive-gray-600, value: "oklch(50% 0.013 264)"}
    - {name: --primitive-gray-700, value: "oklch(40% 0.014 264)"}
    - {name: --primitive-gray-800, value: "oklch(28% 0.015 264)"}
    - {name: --primitive-gray-900, value: "oklch(17% 0.016 264)"}
  semantic_base:
    - {name: --primitive-white,     value: "oklch(100% 0 0)"}
    - {name: --primitive-red-500,   value: "oklch(58% 0.22 27)"}
    - {name: --primitive-green-500, value: "oklch(64% 0.17 145)"}
```

### Tier 2 — Semantic tokens (`@theme` block in `styles/index.css`; mirrored in `tokens/semantic.css`)

```yaml
semantic_tokens:
  color_brand:
    - {name: --color-brand-primary,        value: "var(--primitive-michigan-blue)"}
    - {name: --color-brand-primary-mid,    value: "var(--primitive-michigan-blue-mid)"}
    - {name: --color-brand-accent,         value: "var(--primitive-michigan-maize)"}
    - {name: --color-brand-accent-subtle,  value: "var(--primitive-michigan-maize-light)"}
  color_interactive_states:
    - {name: --color-brand-primary-hover,   value: "oklch(30% 0.08 243)"}
    - {name: --color-brand-primary-pressed, value: "oklch(15% 0.05 243)"}
    - {name: --color-brand-accent-hover,    value: "oklch(76% 0.185 91)"}
    - {name: --color-brand-accent-pressed,  value: "oklch(70% 0.185 91)"}
    - {name: --color-focus-ring,            value: "var(--primitive-michigan-maize)"}
  color_surface:
    - {name: --color-surface,        value: "var(--primitive-white)"}
    - {name: --color-surface-muted,  value: "var(--primitive-gray-50)"}
    - {name: --color-surface-subtle, value: "var(--primitive-gray-100)"}
  color_border:
    - {name: --color-border,        value: "var(--primitive-gray-200)"}
    - {name: --color-border-strong, value: "var(--primitive-gray-300)"}
  color_text:
    - {name: --color-foreground,          value: "var(--primitive-gray-900)"}
    - {name: --color-muted-foreground,    value: "var(--primitive-gray-500)"}
    - {name: --color-disabled-foreground, value: "var(--primitive-gray-400)"}
    - {name: --color-brand-foreground,    value: "var(--primitive-michigan-maize)"}
    - {name: --color-link,                value: "var(--primitive-michigan-blue-mid)"}
  color_feedback:
    - {name: --color-error,            value: "var(--primitive-red-500)"}
    - {name: --color-error-hover,      value: "oklch(45% 0.2 27)"}
    - {name: --color-error-pressed,    value: "oklch(40% 0.2 27)"}
    - {name: --color-error-foreground, value: "var(--primitive-white)"}
    - {name: --color-error-subtle,     value: "oklch(97% 0.02 27)"}
    - {name: --color-success,          value: "var(--primitive-green-500)"}
    - {name: --color-success-subtle,   value: "oklch(97% 0.02 145)"}
    - {name: --color-warning,          value: "oklch(72% 0.15 60)"}
    - {name: --color-warning-subtle,   value: "oklch(97% 0.02 60)"}
    - {name: --color-info,             value: "var(--primitive-michigan-blue-mid)"}
    - {name: --color-info-subtle,      value: "var(--primitive-michigan-blue-light)"}
  color_overlay:
    - {name: --color-overlay, value: "oklch(0% 0 0 / 40%)"}
  icon_sizes:
    - {name: --icon-xs, value: "0.75rem"}
    - {name: --icon-sm, value: "1rem"}
    - {name: --icon-md, value: "1.25rem"}
    - {name: --icon-lg, value: "1.5rem"}
    - {name: --icon-xl, value: "2rem"}
  font_families:
    - {name: --font-sejong-bold,  value: "'SejongHospital Bold', system-ui, -apple-system, sans-serif"}
    - {name: --font-sejong-light, value: "'SejongHospital Light', system-ui, -apple-system, sans-serif"}
    - {name: --font-pretendard,   value: "'Pretendard Variable', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, -apple-system, sans-serif"}
    - {name: --font-geist-mono,   value: "'Geist Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace"}
```

### Component classes (`@layer ds-components`)

Defined in `styles/index.css`. Not CSS variables, but DS-owned named classes.

```yaml
ds_component_classes:
  type:
    - {name: .type-display,  font_family: sejong-bold, sizes: {mobile: 2rem, md: 2.5rem, lg: 3rem}, line_height: 1.25, tracking: -0.025em}
    - {name: .type-h1,       font_family: sejong-bold, sizes: {mobile: 1.75rem, md: 2rem, lg: 2.25rem}, line_height: 1.25, tracking: -0.025em}
    - {name: .type-h2,       font_family: pretendard,  sizes: {mobile: 1.25rem, md: 1.375rem, lg: 1.5rem}, weight: 600, line_height: 1.375}
    - {name: .type-h3,       font_family: pretendard,  sizes: {mobile: 1.125rem, md: 1.25rem}, weight: 600, line_height: 1.375}
    - {name: .type-body,     font_family: pretendard,  size: 1rem,     weight: 400, line_height: 1.625}
    - {name: .type-body-sm,  font_family: pretendard,  size: 0.875rem, weight: 400, line_height: 1.5}
    - {name: .type-label,    font_family: pretendard,  size: 0.875rem, weight: 500, line_height: 1.5}
    - {name: .type-caption,  font_family: pretendard,  size: 0.75rem,  weight: 400, line_height: 1.5}
  spinner:
    - {name: .ds-spinner,    note: "border + ds-spin animation, brand-accent top border"}
    - {name: .ds-spinner-sm, dimensions: "1.25rem x 1.25rem, 2px border"}
    - {name: .ds-spinner-md, dimensions: "2rem x 2rem, 3px border"}
    - {name: .ds-spinner-lg, dimensions: "3rem x 3rem, 4px border"}

ds_keyframes:
  - ds-spin
  - ds-pulse
  - tooltip-in
  - tooltip-out
  - dialog-overlay-in
  - dialog-overlay-out
  - dialog-content-in
  - dialog-content-out  # listed twice in style file (in/out) — counted as 2
  - accordion-down
  - accordion-up
```

---

## Severity term frequency

Verbatim severity terms across both rule docs.

```yaml
severity_frequency:
  ds_constraints_md:
    Must:      62
    Never:     27
    Avoid:      6
    Prefer:     8
    Exception:  3
    total:    106
  ds_client_usage_part1:
    Must:                    9   # in "What to Use"
    "<unmarked-bold>":       4   # in "Visibility & Hierarchy"
    total:                  13
  ds_client_usage_part2:
    Must:      27
    Never:     14
    Avoid:      1
    Prefer:     3
    Exception:  3
    total:     48
  combined:
    Must:                   98
    Never:                  41
    Avoid:                   7
    Prefer:                 11
    Exception:               6
    "<unmarked-bold>":       4
    total:                 167
```

**Inventory finding:** Two severity terms exist in source that are not in A3's proposed `must | never | avoid | prefer` enum:
- **`Exception:`** (6 occurrences across both docs) — narrow carve-out under a Must/Never. Functionally distinct from `prefer`/`avoid`.
- **`<unmarked-bold>`** (4 occurrences in Part 1's "Visibility & Hierarchy") — bold-prefixed bullets with no severity word. Either need a default mapping or an explicit `unspecified` value.

---

## Cross-doc findings flagged for A2/A3/A4

1. **Form package catalog drift** — `Form.DatePicker`, `Form.DateRangePicker`, and `useFormContext` listed in `DS_CLIENT_USAGE.md` Part 1 but not in `DS_CODEBASE.md` "Form Wiring" table. → A2.
2. **Severity enum gap** — `Exception:` and unmarked bold rules are not in A3's proposed `must|never|avoid|prefer` enum. → A3.
3. **Provenance is structured already** — every Part 2 rule has `[source:...]` annotation in one of three shapes: doc-path-style (`DS_CONSTRAINTS.md/colors`, `foundation/colors/usage`), incident/commit (`phase-2/lane-2.11b smoke fix, commit 59462d4`), or session (`grill-session/2026-04-12`). A3's `source` schema can model these as a tagged union. → A3.
4. **Tier picker shapes are not uniform** — 3 tier picker shape types observed (`tiered`, `binary_with_test`, `categories`, `enum`, `enum_with_carve_out`). A3's `tier_pickers` schema must allow ≥3 shape variants, not assume one. → A3.
5. **Spacing tier values reference Tailwind built-ins** (`gap-2/4/6`) — these classes resolve to Tailwind's default spacing scale, NOT to a token in `theme.css`. The DS does not own its own spacing scale; it picks from Tailwind's. → A4 (DESIGN.md compile decision: how to express spacing tier when there's no DS spacing token).
6. **Migration-specific section has explicit lifecycle marker** — header reads "Remove this section post-migration." This already encodes the `scope: migration` / `expires_at` lifecycle A3 proposes. → A3 (use the existing convention as schema confirmation).
7. **Some Part 2 rules cite `MEMORY/...` provenance** (e.g. `MEMORY/feedback_type_weight_override`) — provenance can reference user-memory entries, not just commits/sessions. → A3 (extend tagged union).
8. **Documentation rules in DS_CONSTRAINTS.md** — there is a "Documentation" section (3 rules) governing API reference table format in `apps/docs/`. These are author-side docs rules, not consumer rules — but they sit in the same constraints doc. → A2 (decide whether docs-app rules belong in COMPONENT.md or elsewhere).
9. **`Tooltip` text rule** — Iconography rule i-oi-2 says "tooltip content must match the aria-label exactly." This is a compositional invariant between two components (IconButton + Tooltip), not a single-component rule. → A2 (compound/dependency graph must include cross-component constraints, not just parent/child).
