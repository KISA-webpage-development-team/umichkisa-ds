# A3 — USAGE.md Schema Design

_Subphase A3 of the `ds-client-constrained-execution` 4-layer refactor. Design doc for the Layer 3 schema. The runtime artifact (`USAGE.md`) will mirror this — markdown body + YAML blocks per domain section, no preamble — and be authored in Phase B/C._

Layer 3 carries the **general consumer-side rulebook** for any project consuming `@umichkisa-ds`. Two collections:

- **`tier_pickers`** — write-time decision trees for picking a canonical token (spacing, color, radius, typography, icon size). Structured as parameterizable option lists with optional grouping, carve-outs, and discriminating tests.
- **`rules`** — normative statements (must / never / avoid / prefer) covering setup, component usage, styling, icons, forms, layout, local components, className passthrough, and third-party libraries.

Layer 3 does **not** carry:
- Migration-specific scaffolding (lives in `docs/plans/client-migration/` and lane issues, not in the general rulebook)
- Layer 2 component contracts (component-internal anti-patterns moved to `COMPONENT.md` per the contract-ownership test)
- Layer 1 token definitions (live in DESIGN.md / theme.css)
- Lifecycle markers (no `scope` / `expires_at` — temporal rules are deleted manually when no longer applicable)

File shape mirrors DESIGN.md and COMPONENT.md: markdown body organized by domain sections (Tier Pickers, Component Usage, Styling, Icons, Forms, Layout, Local Components, className Passthrough, Third-Party Libraries), each section opens with a one-paragraph prose intro followed by a YAML block. No top-level preamble — the consumer skill / agent system prompt explains the file's role.

**Note (added in A8):** Project-level setup rules (CSS entry point imports, font loading, prerequisite checks) are NOT in USAGE.md. They live in the `onboard-ds` skill (specified in A8), which runs once per project rather than once per task. See `A8-onboard-ds.md` for the absorbed rule list (`p2-cs-1`, `p2-cs-2`, `p2-fn-1` through `p2-fn-4`). USAGE.md's domain sections are write-time constraints only.

---

## Schema

```yaml
# USAGE.md schema — annotated reference
# Two top-level collections. Each rule and tier picker entry must self-document via id, gloss, and sources.

tier_pickers:
  # Write-time decision trees. The agent reads these BEFORE writing any spacing/color/radius/typography/icon-size value.
  - id: <kebab>                         # e.g. spacing, color-text, color-bg-border, radius, typography, icon-size
    decision_input: "<one_line>"        # what question is the agent answering when they pick from this picker?
    write_time_check: "<test>"          # OPTIONAL — discriminating test (e.g. "if this text went to 40% opacity, would the screen still be usable?")
    invariants:                          # OPTIONAL — rules that apply across all options
      - "<one_line>"
    options:
      - value: "<token>"                 # string OR list of strings — the canonical thing(s) to pick.
                                          #   string for single-token options (e.g. gap-2)
                                          #   list for option entries that cover a value family (e.g. [gap-3, gap-5, gap-7])
        label: "<human_name>"            # OPTIONAL — e.g. "Element tier (8px)"
        category: "<group_name>"         # OPTIONAL — for pickers with grouped options (Surfaces / Brand / Status / Borders)
        is_carve_out: true               # OPTIONAL — flag for "only with explicit justification"
        pick_when:
          - "<predicate>"                # natural-language; ONE assertion per line
    sources:                             # provenance — see below
      - type: <type>
        ref: "<identifier>"

rules:
  # Normative statements. Each rule is one assertion the consumer agent must / never / avoid / prefer.
  - id: <kebab>                          # convention: <section_short>-<short_id>, e.g. setup-css-1, icons-1, forms-2
    severity: <severity>                 # enum: must | never | avoid | prefer
    detection: <detection>               # enum: static | semantic | compositional
    gloss: "<one_line_normative>"        # the rule itself, restated as a single assertion
    sources:                             # tagged-union list, often single-element; see "Provenance" below
      - type: <type>                     # enum: doc_anchor | incident | session | memory | gap | inferred
        ref: "<identifier>"              # human-readable handle (e.g. "phase-2/lane-2.11b smoke fix")
        commit: <git_sha>                # OPTIONAL — for incidents / gaps
        date: <iso_date>                 # OPTIONAL — for sessions / incidents / gaps
    exceptions:                           # OPTIONAL list — narrow carve-outs under THIS rule
      - gloss: "<carve_out_one_line>"
        detection: <detection>
        sources: [...]
```

### Severity values (closed enum)

| Value | Meaning | Reviewer action on violation |
|---|---|---|
| `must` | required positive action | block |
| `never` | required forbidden | block |
| `avoid` | soft forbidden, override acceptable when justified | warn; escalate if repeated |
| `prefer` | soft positive suggestion | suggest; don't block |

`Exception:` is **not** a peer severity — exceptions are nested under their parent rule via the `exceptions:` field. Unmarked / bold-prefixed rules from current source are normalized to `must` or `never` at schema time; new rules must carry an explicit severity.

### Detection rubric (apply tests in order; first match wins)

1. **Is the violation visible by searching the source code for one specific token (string literal, import path, class name, tag name) without understanding what it means?** → `static`
   - Examples: `import 'react-icons'`, `text-[#00274C]`, `<Tabs className="flex">`
2. **Does the rule require knowing what *role* a value plays in the UI (intent, context) — not what the value literally is?** → `semantic`
   - Examples: "is this body or secondary text?", "is this status content?", "is this container component-internal or page-section?"
3. **Does the rule require seeing two or more sites together (cross-file, cross-component, parent-child)?** → `compositional`
   - Examples: font loading setup (multiple coordinated declarations), pairing a color token with every `type-*` class (two tokens in proximity)
4. **Default if none match:** the rule is unclear; sharpen or split before committing.

A rule with both static and semantic angles takes the higher classification (`semantic`).

### Provenance (tagged union)

`sources:` is always a list. Each entry has a `type` discriminator and a `ref` identifier. Optional `commit` and `date` carry richer metadata where available.

| `type` | When to use | Example `ref` |
|---|---|---|
| `doc_anchor` | rule citation points to another doc / section | `foundation/colors/usage`, `DS_CONSTRAINTS.md/iconography` |
| `incident` | rule originated from a specific lane / review / smoke fix | `phase-2/lane-2.11b smoke fix` (with `commit: 59462d4`) |
| `session` | rule originated from a brainstorming or grill session | `grill-session/2026-04-12` (with `date`) |
| `memory` | rule references a user-memory entry | `feedback_type_weight_override` |
| `gap` | rule originated from a phase-discovery moment surfacing a gap | `phase-0-gap` (with `date: 2026-04-18`) |
| `inferred` | rule was added during the refactor without an inherited citation | `A2 reclassification — contract-ownership test` |

Multi-source rules cite multiple entries in the list. The `inferred` type is for rules added now (or in the future) that don't have a single concrete origin event.

### Authoring disciplines

1. **One assertion per `gloss`.** No "X and Y unless Z" compounds — split into separate rules with shared sources if needed.
2. **`pick_when` predicates: one assertion per line.** Same rule as A2 picking predicates.
3. **Conditions live in `gloss` prose.** No precondition / applies_when / tags field — if a rule applies only in certain setups (Tailwind v4, /form installed), the gloss says so explicitly.
4. **No cross-layer reference fields.** Component / invariant names appear in `gloss` and resolve by name. The reader looks them up in COMPONENT.md.
5. **Migration-specific rules do NOT live here.** They belong in plan docs, lane issues, or the execution skill itself.

---

## Worked example — Spacing tier picker

This is the canonical write-time decision tree consumers run before writing any `gap-*` / `space-*` / `p-*` / `m-*` value.

```yaml
tier_pickers:
  - id: spacing
    decision_input: "what role does this container play (page section / component-internal / inline)?"
    invariants:
      - "all spacing values come from Tailwind's built-in scale (4px base); never arbitrary values like p-[24px]"
      - "do not scale vertical spacing across breakpoints; layout responsiveness is column reflow, not gap scaling"
    options:
      - value: gap-2
        label: "Element tier (8px)"
        pick_when:
          - "label → input"
          - "icon → text"
          - "caption below field"
          - "heading → subtitle"
          - "tag clusters and inline groups"
      - value: gap-4
        label: "Component tier (16px)"
        pick_when:
          - "stacked form fields"
          - "list items"
          - "stacked cards"
          - "navigation items"
          - "between sibling components inside a feature"
      - value: gap-6
        label: "Section tier (24px)"
        pick_when:
          - "between major page sections"
          - "page-level container padding"
      - value: [gap-3, gap-5, gap-7]
        label: "Off-tier"
        is_carve_out: true
        pick_when:
          - "only inside a single component's internal layout (e.g. p-3 on a chip)"
    sources:
      - {type: doc_anchor, ref: "foundation/layout/spacing"}
      - {type: incident,   ref: "phase-2/lane-2.11b smoke fix", commit: 59462d4, date: 2026-04-23}
```

The agent's flow:
1. Read `decision_input` — frame the question.
2. For each option, evaluate `pick_when` predicates against the task context.
3. Apply `invariants` — they hold regardless of which option was picked.
4. If the task seems to require an off-tier value, check the `is_carve_out` constraint before writing.

---

## Worked examples — three rules of varied detection types

### Rule 1 — `static` (one specific token check)

```yaml
rules:
  - id: icons-1
    severity: never
    detection: static
    gloss: "Import from react-icons in client app code"
    sources:
      - {type: doc_anchor, ref: "DS_CONSTRAINTS.md/iconography"}
```

A regex (`from\s+['\"]react-icons['\"]`) catches every violation. No surrounding-code understanding needed.

### Rule 2 — `semantic` (role / intent inspection)

```yaml
rules:
  - id: styling-text-1
    severity: must
    detection: semantic
    gloss: "Use text-foreground for primary content; reserve text-muted-foreground for genuinely secondary content (captions, helper text, metadata, timestamps)"
    sources:
      - {type: memory,   ref: "feedback_review_table_inlinecode"}
      - {type: inferred, ref: "G3 visibility/hierarchy rule normalized from Part 1 unmarked-bold"}
```

A regex finds every `text-muted-foreground`, but it cannot tell which usages are wrong. The reviewer must understand whether the text is body/labels (primary) or genuinely secondary content. The "if this text went to 40% opacity, would the screen still be usable?" check from the color-text tier picker is the semantic anchor.

### Rule 3 — `compositional` (two or more sites together)

```yaml
rules:
  - id: styling-typography-2
    severity: must
    detection: compositional
    gloss: "Pair an explicit color token with every type-* class (type-* classes do not set color)"
    sources:
      - {type: doc_anchor, ref: "DS_CONSTRAINTS.md/typography"}
      - {type: doc_anchor, ref: "foundation/typography/usage"}
```

Detection requires seeing two tokens in proximity on the same element: a `type-*` class AND a `text-*` color class (or another applicable color token). A regex on `type-*` alone overshoots; the violation is the *absence* of a color sibling. Reviewer must scan element-by-element.

---

## Worked example — rule with nested exceptions

The dual-ring focus rule (current `c-is-1`) carves out form controls (current `c-is-2`). Modeled with nested `exceptions:`:

```yaml
rules:
  - id: styling-focus-1
    severity: must
    detection: compositional
    gloss: "Implement the dual-ring focus pattern on buttons and icon-only interactive elements: outline 2px focus-ring + box-shadow 4px brand-primary"
    sources:
      - {type: doc_anchor, ref: "foundation/colors/tokens"}
    exceptions:
      - gloss: "Form controls (Input, Textarea, Select, Checkbox, Switch, Radio) use the simplified pattern: outline none + border-color brand-primary on focus"
        detection: compositional
        sources:
          - {type: doc_anchor, ref: "implementation/form-controls"}
```

Two of the three kept exceptions from A1 (per Q1) follow this shape:
- `i-lb-1` (Lucide as sole icon library) carries `i-ci-3` as a nested exception (brand icons registered as fill-based SVGs in the `<Icon>` registry — still consumed via `<Icon>`, never imported as raw SVG)
- `p2-tp-1` / `p2-tp-2` (no @radix-ui / NextUI / HeroUI imports) carry `p2-tp-4` as a nested exception (domain-specific libs like fullcalendar, react-quill, embla-carousel are fine as app-level deps)

---

## Appendix — rules slated for Layer 2 reclassification

Applying A2's contract-ownership test ("would this still be wrong in a brand-new app with no other rules?") to the Part 2 inventory, these rules belong as Layer 2 component anti-patterns instead of Layer 3 USAGE.md rules. Phase B/C migrates them. They will NOT appear in USAGE.md.

| A1 rule id | Gloss (condensed) | Target Layer 2 location |
|---|---|---|
| `p2-do-1` | no flex / overflow / height utilities on DS layout components | `anti_patterns` on Tabs, Form, Card, Sheet, Drawer (multiple components) |
| `p2-ly-2` | Container cannot nest | `anti_patterns` on Container |
| `p2-sv-1` | status content uses semantic variant (success/warning/error/info), not outline/neutral | `anti_patterns` on Badge AND Alert |
| `p2-cu-3` | no shadow re-export of DS components (no `MyButton` wrapping `Button`) | this is a general consumer rule, NOT contract-of-one-component → STAYS in Layer 3 |
| `p2-cp-2` | no className override of DS internals (padding, font-size, color, border-radius) | partial — Card padding overrides → Card `anti_patterns`; general "no internal override" rule STAYS in Layer 3 |
| `p2-fm-5` | no direct RHF imports — always via @umichkisa-ds/form re-exports | this is a setup/import rule, not a Form-component contract → STAYS in Layer 3 |
| `i-pr-2` | `<Icon>` className for layout utilities only — no color/sizing classes | `anti_patterns` on Icon |
| `i-pr-4` | no `label` prop on `<Icon>` when wrapper button has aria-label | `anti_patterns` on Icon (with see_also pointer to icon-button-tooltip-aria-label-match invariant) |

**Reclassifications net:** 5 rules (or rule fragments) move out of Layer 3 to Layer 2. The remaining ~40 Part 2 rules stay in Layer 3 (after dropping migration-specific rules per Q5/Q6 update).

**Edge cases (resolved):**

- `p2-cu-3` (no shadow re-export) was a candidate. Decision: stays Layer 3. The contract-ownership test fails — there is no single component whose contract is violated; the rule is about the consumer's component-design conventions across the app.
- `p2-fm-5` (no direct RHF) was a candidate. Decision: stays Layer 3. The rule constrains imports, not Form's contract; Form.* doesn't promise to fail when bypassed — the consumer just gets a different timing/validation behavior. That's a project-setup consistency rule.
- The Container nesting rule (`p2-ly-2`) is borderline — the agent could read it as "Container's contract" (singularity invariant) or as "page shell convention." Decision: Layer 2, because Container's intrinsic behavior already includes "applies the page shell pattern (mx-auto + max-width + responsive padding)" — nesting violates that singularity contract directly.

---

## A3 decisions (resolved during checkpoint review)

1. **Rule id convention: `<section>-<short_id>`.** Self-documenting (`setup-css-1`, `icons-1`, `styling-text-2`). A1's `p2-*` ids remain as cross-reference annotations during Phase B/C migration only.

2. **Tier picker `value` is string OR list of strings.** Schema updated. Off-tier carve-out for spacing now uses `value: [gap-3, gap-5, gap-7]` instead of a slash-separated string.

3. **Tailwind-v4-conditional setup rules: prerequisite at the skill/agent prompt level, not in the schema.** The execution skill states up-front "this skill applies to projects on Tailwind v4 + @umichkisa-ds/web ≥ X." Rules in USAGE.md don't carry per-rule conditions; the skill's prerequisite block covers it. (Reinforces Q8: no precondition field.)

4. **`cn()` rule stays in Layer 3 USAGE.md.** No change.

5. **`type-h4` is assumed shipped.** Token-related rules (`use --color-* tokens`, `pair color token with type-*`, etc.) live in **Layer 3 USAGE.md** as consumer-side guidance. Token *definitions* live in **Layer 1 DESIGN.md** (`--color-foreground: var(--primitive-gray-900)`). Layer 2 COMPONENT.md doesn't carry token usage rules — components point to Layer 1 via `design_md_ref` pointer. Each concern has a clean home.

6. **Phase B prototype: Icons rule cluster.** Confirmed. 5 rules, mostly static, includes the brand-icon nested exception (good schema-feature coverage). Phase B will implement this cluster end-to-end through the new schema + new implementer subagent + a real client lane.

7. **`DS_CLIENT_USAGE.md` is replaced by the new `USAGE.md`.** Single source of truth, no stale-doc drift. Phase C handles the swap when the new file ships.

## Deferred action items (outside Phase A)

- ~~(carried over from A2) File `ds-fix-during-migration` ticket: ship `type-h4` class.~~ **Done during A4 grill** (commit edac51e, 2026-04-26).
- ~~(Phase B) Add prerequisite block to the execution skill's system prompt: "Applies to projects on Tailwind v4 + @umichkisa-ds/web ≥ X.X."~~ **Superseded by A8.** Prerequisite enforcement moves from a passive prompt block to an active `.ds-onboarded` marker check, owned by the `onboard-ds` skill. A6 will spec the preflight diff for `SKILL.md`.
- (Phase B/C, surfaced in A4) **Geist Mono scope reconciliation.** Current Layer 3 input rules are `t-fn-5: Never Geist Mono in client app components (docs-site only)` and `p2-tk-6: Never Import font loaders from client`. A4 grill (Q11) reframes Geist Mono as "available in any consumer for code-display contexts (inline code, code blocks); never for body / UI." When the runtime USAGE.md is authored:
  - Reframe `t-fn-5` from "docs-site only" → "code-display contexts only" (still `never` severity, but on UI/body usage rather than the consumer scope).
  - Leave `p2-tk-6` unchanged — it's about font-loader hygiene, not Geist Mono specifically.
