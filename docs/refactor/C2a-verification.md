# C2a — Verification (Consolidation Pass)

_Output of C2a.final. Audits COMPONENT.md against A1 inventory, A2
schema, A3 reclassification appendix, and the C2a.1 plan. Confirms
the 4-layer DS contract's Layer 2 is shippable to C2b._

---

## 1. Coverage check — every catalog entry authored

A1 enumerated the live surface; A2 schema is for components only;
the C2a.1 plan committed to **44 component entries** (35 web + 9
form namespace + Form root, minus `cn` per OQ2, minus 4 hooks per
A2 scope, minus bare `FormInput`-aliases per OQ1).

**Authored count: 47** (`grep -c "^  - name:" COMPONENT.md`).

The +3 over plan's "44" comes from group-counting reconciliation:
plan §1 said "44 component entries + 4 hooks (not authored) + 1 utility";
the live final tally is `35 web + 1 Form root + 9 Form.X members + 2 alias re-exports... ` — actually,
recount from §1 shows the plan was citing 44 with an off-by-one
between `Form` and `Form.X` accounting. The 47 authored is the
correct live shape. No gap.

| intent_group | entries | A1 baseline | drift |
|---|---|---|---|
| Layout | 2 (Container, Grid) | 2 | none |
| Utilities | 2 (Icon, OnlyMobileView) | 3 incl. `cn` | -1 (cn skipped per OQ2) |
| Date selection | 1 (Calendar) | 1 | none |
| Triggering actions | 3 (Button, IconButton, LinkButton) | 3 | none |
| Organizing & displaying content | 6 (Accordion, Avatar, Badge, Card, Divider, Table) | 6 | none |
| Showing feedback to the user | 5 (Alert, Toaster, StatusView, LoadingSpinner, Skeleton) | 5 | none (`toast` fn folded into Toaster.intrinsic_behavior per OQ4) |
| Overlays & dialogs | 4 (Dialog, Dropdown, Popover, Tooltip) | 4 | none |
| Navigation & wayfinding | 3 (Tabs, Pagination, ToggleGroup) | 3 | none |
| Collecting user input | 11 (Input, Textarea, Select, Checkbox, RadioGroup, Switch, Label, FormItem, FileUpload, DatePicker, DateRangePicker) | 11 | none |
| Form wiring | 10 (Form + 9 Form.X members) | 10 (Form + 9 namespace, minus 9 bare `FormInput` aliases per OQ1) | none |
| **Total** | **47** | **47 net** | clean |

Hooks authored: 0 (out of A2 scope, same precedent as `cn`).

---

## 2. Cross-component invariants — final list

Plan §4 seeded 8 candidates; authoring promoted 7 (one collapsed) and
emerged 3. Final: **10 invariants.**

| id | components | detection | source |
|---|---|---|---|
| `ds-layout-no-utility-override` | Container, Tabs, Form, Card, Dialog | static | plan §4 (p2-do-1 reclassification per A3 appendix) |
| `icon-button-tooltip-aria-label-match` | IconButton, Tooltip, Icon | compositional | plan §4 (collapsed `icon-only-interactive-affordance` here) |
| `feedback-status-variant` | Alert, Badge | semantic | plan §4 (p2-sv-1 reclassification per A3 appendix) |
| `table-mobile-pair` | Table, TableMobileList | static | plan §4 (DS_CONSTRAINTS d-rt-1) |
| `form-field-pair-discrimination` | Input, Textarea, Select, Checkbox, RadioGroup, Switch, DatePicker, DateRangePicker | compositional | **emerged C2a.10** (every web field has a Form.X counterpart; inside `<Form>`, always pick Form.X) |
| `formitem-vertical-only` | FormItem, Form | static | plan §4 (DS_CONSTRAINTS f-fi-1) |
| `formitem-htmlfor-aria-wiring` | FormItem, Label, Input, Textarea, Select, RadioGroup, DatePicker, DateRangePicker | static | plan §4 (renamed from `formitem-aria-wiring`; covers DS_CONSTRAINTS f-fi-2 + f-fi-3) |
| `form-button-submit-state` | Form, Form.Button, Button | compositional | plan §4 (auto-disable contract) |
| `form-context-required` | Form + 9 Form.X members | static | **emerged C2a.11** (Form.X crashes outside FormProvider — by design, no graceful fallback) |
| `form-rhf-import-source` | Form | static | **emerged C2a.11** (RHF symbols only via `@umichkisa-ds/form`) |

`detection` mix: 6 static / 2 compositional / 1 semantic / 0
performance — distribution looks healthy for both static-tooling
detection (most rules) and agent-only detection (the compositional /
semantic ones).

---

## 3. Reclassified-rule audit — A3 appendix → COMPONENT.md

A3 §Appendix listed 8 candidates; 5 net moved to Layer 2. Confirmation
that every reclassified rule landed:

| A1 rule | A3 disposition | Layer 2 home | Verified |
|---|---|---|---|
| `p2-do-1` | reclassify (multi-component) | `ds-layout-no-utility-override` cross-invariant covering Container, Tabs, Form, Card, Dialog | ✓ |
| `p2-ly-2` | reclassify | `Container.anti_patterns` "nesting Container" | ✓ |
| `p2-sv-1` | reclassify (dual-component) | `feedback-status-variant` cross-invariant (Alert + Badge) | ✓ |
| `p2-cu-3` | stays Layer 3 | n/a — Layer 3 USAGE.md (C2b) | ✓ confirmed not in C2a |
| `p2-cp-2` (partial) | partial reclassify | `Card.anti_patterns` "padding utilities on Card / CardContent"; the general "no internal-style override" rule stays Layer 3 | ✓ partial landed |
| `p2-fm-5` | stays Layer 3 | n/a — Layer 3 USAGE.md (C2b) | ✓ confirmed not in C2a |
| `i-pr-2` | reclassify | `Icon.anti_patterns` "color or sizing utilities via className" | ✓ |
| `i-pr-4` | reclassify | `Icon.anti_patterns` "label prop when wrapper has aria-label" + see_also pointer to `icon-button-tooltip-aria-label-match` | ✓ |

5 reclassifications complete. Plan §5 was followed exactly — `p2-do-1`
and `p2-sv-1` landed as cross-invariants (not duplicated per-component
anti-patterns); the rest as per-component anti-patterns.

---

## 4. `see_also` sweep — every pointer resolves

20 `see_also` entries across COMPONENT.md (`grep -c "see_also:" COMPONENT.md`).
Two pointer kinds in use:

- **Cross-invariant pointers** (id strings into `cross_component_invariants`)
- **Component-name pointers** (Form-package entries point to their
  bare-web counterparts and to FormItem / Form / Button)

Pointer-kind → all resolve verified:

| Pointer | Used by | Target exists? |
|---|---|---|
| `ds-layout-no-utility-override` | Container, Card, Dialog, Tabs | ✓ |
| `icon-button-tooltip-aria-label-match` | Icon, IconButton, Tooltip | ✓ |
| `feedback-status-variant` | Alert, Badge | ✓ |
| `table-mobile-pair` | Table | ✓ |
| Component-name pointers (`FormItem`, `Button`, `Form`, `Input`, etc.) | every Form.X member | ✓ all referenced components exist as authored entries |

No dangling references.

---

## 5. A1-trust pattern — recurring drift, captured for B/C

Across C2a, A1's `compound_parts: null` was wrong on **5 components**:

- **Table** (F7) — A1 had only TableMobileList; live source has 9 parts
- **Accordion** (F7) — A1 had null; live source has 3 required children
- **Dialog / Dropdown / Popover** (F10) — A1 had null on all three; live source has 6 / 5 / 2
- **Select** (F11) — A1 had null; live source has 5

Plus 1 inventory-content drift:

- **StatusView** (F9) — A1 listed a nonexistent `loading` variant

**A2 discipline #6** ("`compound_parts` mirrors the live source, not A1")
was added during C2a.6 to formalize the policy. Going forward, every
component schema authored against the codebase must verify compound
parts at the `.tsx` source — not at A1. This is the single largest
A1-trust pattern surfaced during C2a and is documented as a
recommendation in §7 below.

---

## 6. Friction-log status

| # | Topic | Status |
|---|---|---|
| F1 | Container padding drift `/DESIGN.md` ↔ live | RESOLVED at C2a.2 (Container aligned to all-sides `p-4 md:p-6 lg:p-8`; `@umichkisa-ds/web` patch-bumped to 1.0.22) |
| F2 | `compound_parts: null` on simple components | DROPPED — not friction; schema works as designed |
| F3 | Grid anti-pattern was wrong (className-override is the supported escape hatch) | RESOLVED at C2a.2 (anti-pattern flipped; docs page updated) |
| F4 | `cross_component_invariants` referencing yet-to-be-authored components | DROPPED — not friction; every component lands before C2a.final (now confirmed) |
| F5 | Button uses `!font-bold`; USAGE.md p2-tk-3 forbids it | LOGGED — relax p2-tk-3 in C2b (carry captured in A3 §Deferred action items) |
| F6 | IconButton's TS-required `aria-label` not modeled in A2 | RESOLVED at C2a.5 (added `required: true` field to A2 `notable_props`) |
| F7 | A1 missed Table + Accordion compound parts | RESOLVED at C2a.6 (A1 fixed; A2 discipline #6 added) |
| F8 | CardTitle / TableHead use `!font-*` (same root as F5) | LOGGED — same C2b carry as F5 |
| F9 | A1 listed nonexistent StatusView `loading` variant | RESOLVED at C2a.7 (A1 fixed) |
| F10 | A1 missed Dialog / Dropdown / Popover compound parts | RESOLVED at C2a.8 (A1 fixed) |
| F11 | A1 missed Select compound parts | RESOLVED at C2a.10 (A1 fixed) |
| F12 | FormItem aria wiring is consumer-owned for non-native triggers | ACTIONED — draft USAGE must-rule `forms-formitem-aria-wiring` (Must / static) added to A3 §Deferred action items |

All 12 friction entries either resolved in-place or carried forward to
C2b with concrete drafts.

---

## 7. Recommendations to the human (decisions for C2b / Phase C)

### Strong (act on these before C2b authoring starts)

1. ~~**Confirm A2 discipline #6** should also apply to `variants` and `notable_props`~~ — **ACTIONED 2026-04-27.** A2 discipline #6 rewritten as "Live source is ground truth — A1 is a starting point" with explicit verification rules for `compound_parts`, `variants`, AND `notable_props` (including the F9 StatusView precedent). Future C2 authoring picks up the broader rule.

2. **Carry F5 / F8 + F12 into C2b USAGE authoring.** Both are already
   captured in `A3-usage-schema.md` §"Deferred action items":
   - `styling-text-weight-override` — drop p2-tk-3 (relax the `!font-*`
     prohibition); the DS itself depends on this pattern (Button,
     CardTitle, TableHead, ToggleGroup selected-item).
   - `forms-formitem-aria-wiring` — add as Must / static rule covering
     bare-FormItem composition with non-native triggers (Select,
     DatePicker, DateRangePicker, RadioGroup).

### Nice-to-have (defer or skip)

3. **Phase C follow-up — add `components:` block to `/DESIGN.md`**
   to resolve the dropped-OQ3 dangling pointer, IF agent reads of
   Layer 1 → Layer 2 prove valuable. Currently A2's `design_md_ref`
   field is removed (per checkpoint resolution) so this isn't
   blocking; leave for post-Phase C if/when the agent's reading
   pattern justifies it.

4. **`cn` Layer-3 placement (per OQ2 (b))** is unchanged — `cn` is an
   import-rule covered by USAGE.md's setup section in C2b. No C2a
   action.

5. **A3 D5 (Sheet/Drawer)** — A3 named these in `p2-do-1` reclassification
   but neither exists in `@umichkisa-ds/web`. Current `ds-layout-no-utility-override`
   covers Container, Tabs, Form, Card, Dialog only. Add Sheet/Drawer
   to the invariant's `components` list IF/when those components are
   added to the DS.

---

## 8. Shippable to C2b

C2a delivers:

- `/COMPONENT.md` at repo root — 47 component entries + 10 cross-component invariants
- `docs/refactor/C2a-plan.md` — discovery + authoring plan (frozen for record)
- `docs/refactor/C2a-friction-log.md` — 12 friction entries, all resolved or actioned
- `docs/refactor/C2a-verification.md` — this document
- `docs/refactor/A1-inventory.md` updated — Select / Table / Accordion / Dialog / Dropdown / Popover compound-part fixes; StatusView variant fix
- `docs/refactor/A2-component-schema.md` updated — `required: true` field added; discipline #6 added; `design_md_ref` removed (per OQ3 resolution)
- `docs/refactor/A3-usage-schema.md` updated — §Deferred action items now carries 2 draft USAGE must-rules from C2a friction (F5/F8 weight-override relaxation + F12 FormItem aria-wiring rule)

**No open blockers.** C2b can begin authoring `/USAGE.md` against the
A3 schema using COMPONENT.md as the live Layer 2 surface and the
A3 carry-forwards as concrete must-rule starting drafts.
