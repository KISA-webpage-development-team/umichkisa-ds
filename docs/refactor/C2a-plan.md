# C2a — Plan (Discovery + Authoring Roadmap for COMPONENT.md)

_Output of C2a.1. Read-only discovery against `packages/web/src/components/`
and `packages/form/src/`, reconciled against A1's inventory and A2's
schema. The plan IS the understanding summary._

A2 (`docs/refactor/A2-component-schema.md`) is authoritative for the
schema. A1 is authoritative for the inventory baseline. C1's compiled
`/DESIGN.md` is the authoritative Layer 1 surface that `design_md_ref`
points at. Where any of these contradict the C2a prompt, they win.

---

## 1. Component inventory diff (A1 → live)

A1 enumerated the surface at the start of Phase A. The codebase has not
materially changed since. Below is the live count + every delta.

### `@umichkisa-ds/web` — live exports

35 component entries (matching A1) + 1 imperative function (`toast`) +
1 utility (`cn`). Compound parts are nested under their parent.

| Group (`intent_group`) | Live components | A1 delta |
|---|---|---|
| Showing feedback to the user | Alert, Toaster (+ `toast` fn), StatusView, LoadingSpinner, Skeleton | none |
| Collecting user input | Input, Textarea, Select, Checkbox, RadioGroup (+ RadioItem), Switch, Label, FormItem, FileUpload, DatePicker, DateRangePicker | none |
| Triggering actions | Button, IconButton, LinkButton | none |
| Organizing & displaying content | Card (+ CardHeader/Title/Description/Content/Footer), Table (+ TableMobileList sibling), Accordion, Badge, Avatar, Divider | none |
| Overlays & dialogs | Dialog, Dropdown, Popover, Tooltip | none |
| Navigation & wayfinding | Tabs (+ TabsList/Trigger/Content), Pagination, ToggleGroup | none |
| Layout | Container, Grid | none |
| Date selection | Calendar | none |
| Utilities | Icon, OnlyMobileView, cn | none |

### `@umichkisa-ds/form` — live exports

12 entries (matching A1 + Phase A finding §Cross-doc-1).

| Kind | Names |
|---|---|
| container | `Form` (also surfaces `.Input`, `.Textarea`, `.Select`, `.Checkbox`, `.Radio`, `.Switch`, `.Button`, `.DatePicker`, `.DateRangePicker` via `Object.assign(FormRoot, { ... })`) |
| field components | also re-exported as bare `FormInput`, `FormTextarea`, `FormSelect`, `FormCheckbox`, `FormRadio`, `FormSwitch`, `FormButton`, `FormDatePicker`, `FormDateRangePicker` (alongside `Form.X`) |
| hooks | `useForm`, `useFormField`, `useFormStatus`, `useFormContext` (re-export from `react-hook-form`) |

**Inventory finding (carried from A1, still true):** the form package's
field components are exposed under TWO names — `Form.Input` (namespace
member) AND `FormInput` (bare). A2 §Schema models namespace members as
top-level entries with `requires_context: Form`. Decision: **canonical
entry is `Form.Input`** (matches DS_CODEBASE.md and DS_CLIENT_USAGE.md
guidance); the bare `FormInput` is mentioned in `notable_props`-adjacent
prose (`note:` on the Form entry) but does not get its own component
entry. Surfaced as **OQ1** below.

### Total entries to author

44 component entries + 4 hooks (referenced inline; **not** authored as
component entries — A2 schema is for components, not hooks) + 1
utility (`cn` — see OQ2). **Plan: 44 component entries.**

A1's headline count was "47". The delta is the four hooks (which A1
listed under the form package surface but A2's schema does not model)
plus `cn`/`toast` accounting choices.

---

## 2. A2 decision register (A2 vs. live codebase)

| # | A2 decision / schema field | Status | Note |
|---|---|---|---|
| Identity (`name`, `package`, `intent_group`, `intent`) | universal | confirmed | `intent_group` mirrors A1 / DS_CODEBASE.md headings exactly. |
| `pick_when` / `reject_when` (one assertion per line; `reject_when` names alternative) | universal | confirmed | Exercised cleanly on Button family per A2 worked example. Will surface friction on near-duplicate variants (Popover vs Tooltip vs Dropdown) — log per-group. |
| `variants` (only when component has a discriminator-axis prop) | optional | confirmed | Applies cleanly to Button, Alert, Badge, StatusView. Caveat: StatusView has both `variant` AND `fullScreen` boolean — A2 D5 already flagged this. Plan: keep `variant` discrimination, surface `fullScreen` as `notable_props`. |
| `notable_props` (picking-relevant only, NOT full prop API) | optional | confirmed | Discipline: skip ARIA/data passthroughs, skip props with obvious-from-type semantics. |
| `intrinsic_behavior` (one-line promises) | optional | confirmed | |
| `requires_context` (for namespace members) | optional | confirmed | Will be used on every `Form.X` entry. |
| `compound_parts` (non-namespace children) | optional | confirmed | Applies to Card (5 parts), Table (TableMobileList), RadioGroup (RadioItem), Tabs (TabsList/Trigger/Content). |
| `anti_patterns` (passes contract-ownership test) | optional | confirmed | The friction here is judgement, not schema. Test strictly per Pitfall §4.3. |
| `design_md_ref: "{components.<kebab>}"` | universal | **adjusted (see OQ3)** | A4 D5 / D12 explicitly skipped the YAML `components:` block in DESIGN.md v0; C1 confirmed the omission. So `{components.icon}` resolves to nothing today. A2 acknowledges this is the canonical pointer regardless. **Plan: author the field as `{components.<kebab>}` per A2; document dangling-target in friction log.** Alternative: point at the most relevant token group (e.g. `{spacing.icon-md}` for Icon). Surfaced as OQ3. |
| `see_also` (pointers into `cross_component_invariants`) | optional | confirmed | |
| `cross_component_invariants` (top-level) | universal | confirmed | Seed list in §4 below. |

No A2 schema field is `blocked` outright. OQ3 is the only adjusted item;
recommended resolution preserves A2's contract.

---

## 3. Group-by-group authoring order

A1's natural grouping is the spine. Order goes **least cross-component
entanglement → most**, per Pitfall §4.8.

| Step | Group | Entries | Cross-component invariant load | Why this slot |
|---|---|---|---|---|
| C2a.2 | **Layout** | Container, Grid | low (Container ↔ "page-shell singularity") | Smallest, simplest group; Container carries `p2-ly-2` reclassification → exercises the contract-ownership test early. |
| C2a.3 | **Utilities** | Icon, OnlyMobileView, cn | low (Icon ↔ IconButton/Tooltip invariant referenced via `see_also`, target authored later) | Icon carries TWO reclassified rules (`i-pr-2`, `i-pr-4`); reclassification mechanics get a workout. `cn` per OQ2 may or may not become an entry. |
| C2a.4 | **Date selection** | Calendar | none | Single component, near-trivial. |
| C2a.5 | **Triggering actions** | Button, IconButton, LinkButton | medium (sibling cluster + `icon-button-tooltip-aria-label-match` referenced, `Form.Button` invariant referenced) | A2's worked example covers Button — leverage it. IconButton is the loaded sibling discriminator. |
| C2a.6 | **Display** | Card, Table, Accordion, Badge, Avatar, Divider | medium (Card padding reclassification; Badge variant reclassification with Alert; Table compound + responsive sibling pair) | Card has A2's worked example. Table introduces the `paired_responsive_sibling` kind + `table-mobile-pair` invariant. |
| C2a.7 | **Feedback** | Alert, Toaster (+ `toast` fn), StatusView, LoadingSpinner, Skeleton | medium (Alert variant reclassification with Badge; StatusView variant+`fullScreen` per A2 D5) | Toaster + `toast` is a non-component-non-hook surface — log per OQ4. |
| C2a.8 | **Overlays** | Dialog, Dropdown, Popover, Tooltip | high (Tooltip ↔ IconButton invariant; Dialog ↔ p2-do-1 layout-utility reclassification) | Popover/Tooltip/Dropdown are near-duplicates by appearance — sibling discrimination is hard here. |
| C2a.9 | **Navigation** | Tabs, Pagination, ToggleGroup | medium (Tabs compound + p2-do-1 reclassification) | Tabs has the most compound parts of any non-Card non-Form component. |
| C2a.10 | **Web Form components** | Input, Textarea, Select, Checkbox, RadioGroup, Switch, Label, FormItem, FileUpload, DatePicker, DateRangePicker | medium (each pair-discriminates against its `Form.X` counterpart per A2 D7 / A2 picks rule) | Heaviest single group by entry count (11). Sibling discrimination is uniformly "use Form.X if inside `<Form>`". |
| C2a.11 | **Form package (`@umichkisa-ds/form`)** | Form + 9 namespace members | highest (Form ↔ Form.Button submit-state invariant; FormItem ↔ Form.X aria-describedby invariant) | Densest invariants in the whole catalog. Authored last so referenced components already exist. |

10 group-authoring steps. Each commits separately and ends in a
checkpoint.

---

## 4. `cross_component_invariants` candidates (seed)

These are the contracts that already span ≥2 components per A1 +
DS_CONSTRAINTS.md + A2 worked examples. The list will grow during
authoring; this is the pre-author seed.

| id (proposed) | components | one-line invariant | source |
|---|---|---|---|
| `icon-button-tooltip-aria-label-match` | IconButton, Tooltip | Tooltip content equals IconButton's `aria-label` exactly when wrapping an icon-only button | A2 worked example; DS_CONSTRAINTS i-oi-2 |
| `form-button-submit-state` | Form, Form.Button | Form.Button auto-disables while submission pending; consumers must not pass `disabled={isSubmitting}` manually | A2 worked example; reads `useFormStatus` |
| `table-mobile-pair` | Table, TableMobileList | API-reference and admin tables ship `<Table className="hidden md:block">` AND `<TableMobileList className="block md:hidden">` together | A2 worked example; DS_CONSTRAINTS d-rt-1 |
| `formitem-aria-wiring` | FormItem, Form.Input/Textarea/Select/Checkbox/Radio/Switch/DatePicker/DateRangePicker | aria-describedby IDs follow `{htmlFor}-description` and `{htmlFor}-error`; `htmlFor` for native inputs, `aria-labelledby` for non-native triggers | DS_CONSTRAINTS f-fi-2, f-fi-3 |
| `formitem-vertical-only` | FormItem, Switch (+ Checkbox, RadioGroup) | FormItem is vertical label-above-control only; toggle controls compose as children, not as the labelled control axis | DS_CONSTRAINTS f-fi-1 |
| `feedback-status-variant` | Alert, Badge | status content uses semantic variant (success/warning/error/info) on either Alert or Badge — never outline/neutral with a colored stripe | DS_CONSTRAINTS p2-sv-1 reclassification (per A3 appendix: applies to BOTH Alert AND Badge → cross-invariant, not duplicated anti-pattern) |
| `ds-layout-no-utility-override` | Dialog, Tabs, Form, Card | flex / overflow / height / max-height utilities passed via `className` to force a DS layout component's size are forbidden — the component owns its layout shape | DS_CONSTRAINTS p2-do-1 reclassification (multi-component → cross-invariant per A2 schema rule) |
| `icon-only-interactive-affordance` | IconButton, Tooltip | every icon-only interactive provides `aria-label` AND wraps in `<Tooltip>` whose content equals that label (combines i-oi-1 + i-oi-2) | DS_CONSTRAINTS i-oi-1 + i-oi-2 — possibly merge into `icon-button-tooltip-aria-label-match` instead of a separate entry; decided during C2a.8 / C2a.5 authoring |

8 seed candidates. The last (`icon-only-interactive-affordance`) may
collapse into the first — defer the decision to authoring time.

---

## 5. Reclassified-rule assignments (per A3 appendix)

A3 §Appendix lists 8 candidate reclassifications; 5 net move to Layer 2
(rule fragments / dual-component cases counted carefully). Mapping:

| A1 rule id | A3 disposition | Layer 2 home in COMPONENT.md |
|---|---|---|
| `p2-do-1` | reclassify (multi-component) | `cross_component_invariants` entry `ds-layout-no-utility-override` (Dialog, Tabs, Form, Card). Sheet/Drawer named in A3 — neither exists in the DS today, surfaced as **OQ5**. |
| `p2-ly-2` | reclassify | `Container.anti_patterns`: "nesting `<Container>` inside another `<Container>`" |
| `p2-sv-1` | reclassify (dual-component) | `cross_component_invariants` entry `feedback-status-variant` (Alert + Badge), per §4 above |
| `p2-cu-3` | **stays Layer 3** | not in C2a |
| `p2-cp-2` | partial reclassify | `Card.anti_patterns`: "padding utility classes (p-*, px-*, py-*) on Card or CardContent" (per A2 worked Card example, already authored). Remaining "no internal-style override" rule stays Layer 3. |
| `p2-fm-5` | **stays Layer 3** | not in C2a |
| `i-pr-2` | reclassify | `Icon.anti_patterns`: "className with color or sizing utilities (text-*, w-*, h-*) — className accepts layout utilities only (block, flex-shrink-0)" |
| `i-pr-4` | reclassify | `Icon.anti_patterns`: "passing `label` prop when wrapping `<button aria-label='...'>`" + `see_also: [icon-button-tooltip-aria-label-match]` |

5 reclassified rules → Layer 2 anti-patterns. `p2-do-1` and `p2-sv-1`
land as cross-component invariants (not per-component anti-pattern
duplication). `p2-cu-3` and `p2-fm-5` confirmed staying in Layer 3.

---

## 6. `design_md_ref` targets per group

Per OQ3 below, the canonical pointer syntax is `{components.<kebab>}`
even though `/DESIGN.md` does not currently expose a `components:` block.
Listed here so the friction-log capture is complete:

| Component(s) | Pointer | Resolves today? |
|---|---|---|
| every entry | `{components.<kebab-of-name>}` | NO — `/DESIGN.md` skips `components:` per A4 D5/D12 |
| Icon | additionally surfaces `spacing.icon-{xs,sm,md,lg,xl}` (resolves) and `colors.foreground` / `disabled-foreground` (resolves) in prose-adjacent fields | YES (token-level only) |
| Container | `spacing.section` + page-shell prose — `/DESIGN.md` Layout section is prose-only | YES (prose only) |
| every typography-bearing entry (CardTitle/CardDescription nested-prose, Badge, Alert, etc.) | `typography.{display,h1,..,caption,code}` | YES |

Plan: author `design_md_ref: "{components.<kebab>}"` literally per A2.
The dangling-resolution behavior is a known v0 condition; Phase C
follow-ups can add the `components:` block to `/DESIGN.md` if/when the
agent's read-pattern justifies it.

---

## 7. Open questions

| # | Question | Severity | Why it needs human input |
|---|---|---|---|
| OQ1 | Form package fields surface under two names (`Form.Input` AND `FormInput`). Plan: author one entry per field at `name: Form.Input` with `requires_context: Form`; mention bare alias in `intrinsic_behavior` (e.g. "exported as `Form.Input` namespace member; bare `FormInput` is the same component re-exported"). Confirm? | blocked | Affects whether 9 fields become 9 entries or 18. Strong recommendation: 9 entries (alias mention only) — bare names are not separately picked. |
| OQ2 | A1 lists `cn` as a component-of-kind-`utility_function`. A2 schema is for components — `pick_when` / `reject_when` shape doesn't fit a tagged-template helper cleanly. Options: (a) author a stripped entry (name, intent, intent_group, anti_patterns only) — schema-fit is awkward; (b) skip — `cn` is an import-rule already covered by Layer 3 USAGE.md. Recommend (b) — drop `cn` from C2a authoring; document in friction log. | blocked | Affects entry count (44 vs 45) and sets precedent for whether utilities can sit in Layer 2 at all. |
| OQ3 | `design_md_ref: "{components.<kebab>}"` does not resolve in `/DESIGN.md` v0 (A4 D5/D12 skipped the block). Plan: author per A2 anyway, document dangling state in friction log, surface as a Phase-C follow-up to add `components:` to `/DESIGN.md`. Confirm? | nice-to-have | Alternative is to point at the closest resolving token group (e.g. `{spacing.icon-md}` for Icon), which loses the canonical Layer-2-→-Layer-1 semantics A2 specified. |
| OQ4 | `Toaster` is a component but `toast` is an imperative function (lowercase `toast(message, options)`). Plan: author `Toaster` as a normal component entry; mention `toast` in `Toaster.intrinsic_behavior` ("co-exported with the imperative `toast(message, options)` trigger function from the same module") — do NOT author `toast` as its own entry. Confirm? | nice-to-have | Same shape question as `cn` (OQ2) but resolved more naturally because `Toaster` carries the contract. |
| OQ5 | A3 §Appendix names "Tabs, Form, Card, Sheet, Drawer" as the components covered by `p2-do-1` reclassification. **Sheet and Drawer do not exist in `@umichkisa-ds/web` today.** Plan: ship the cross-invariant `ds-layout-no-utility-override` against {Dialog, Tabs, Form, Card} only; if Sheet/Drawer are added later, the invariant gets new members at that time. Confirm? | nice-to-have | Mismatch surfaced from A1 / live codebase against A3 wording. A3 was written assuming a slightly different DS surface. |

OQ1, OQ2 are checkpoint-blocking. OQ3, OQ4, OQ5 can be resolved at the
checkpoint or rolled forward into per-group authoring with the
recommended default in this plan.

---

## 8. Out of scope (logged for later)

- Authoring `/USAGE.md` (Layer 3) — **C2b**, next session
- Applying A6 `SKILL.md` diff — C3
- Promoting `ds-client-implementer` agent — C3
- Retiring `DS_CLIENT_USAGE.md`, `DS_CONSTRAINTS.md`, `implementer-template.md` — C3
- Any DESIGN.md edits (e.g. adding a `components:` block to resolve OQ3) — Phase C follow-up if justified
- Building `onboard-ds` skill — Phase D
- Building `ds-migration-workflow` skill — post-C3

---

`=== CHECKPOINT C2a.1 — STOPPED, AWAITING APPROVAL ===`
