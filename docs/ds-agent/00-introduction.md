# DS Implementer Agent — Project Introduction

_Captured 2026-04-27. Idea-level introduction only — not a spec. This
is a clean-slate restart: treat the design system + agent integration
as a brand new project, not an iteration on the existing 4-layer
(DESIGN / COMPONENT / USAGE) plan. The 4-layer work informs us — it
does not constrain us. Specifics (formats, budgets, file shapes) settle
in subsequent docs._

---

## 1. What this project is

We are building an **implementer agent that generates DS-respecting UI
for the KISA client app from natural-language FE tasks** — without
doing any original visual design.

The agent is the worker. The supporting docs are its tools. The whole
system is judged by one criterion: **can this agent ship a working,
DS-conformant UI without consuming an unreasonable amount of context
and without making "design" decisions that should be the DS's call?**

Everything else — doc shape, doc count, agent prompt, review chain — is
a means to that end.

---

## 2. The agent's job

For an FE task ("implement a settings page that toggles notification
preferences and lets users edit their profile"), the agent must:

1. Identify which DS components are needed for the scenarios in the task
2. Identify which DS tokens are allowed for the scenarios in the task
3. Wire components + tokens together using common DS patterns
4. Avoid known anti-patterns; respect non-obvious component behavior

Critically, the agent is NOT designing the UI. Visual decisions
(colors, typography, spacing, component selection where the DS gives a
canonical answer) are made by the DS, not the agent. The agent's
creativity ends at "given this scenario, the DS says use X — wire X
correctly."

---

## 3. What the agent must know

The agent's knowledge needs split into two categories:

- **Understanding** — narrative, prose, "the spirit of the system." Read once, internalized for the whole task. Tells the agent who KISA is, what the DS's voice and principles are, and when ambiguity calls for judgment.
- **Lookup** — tabular, indexed, "the letter of the system." Drilled into per decision. Tells the agent which specific token, component, or wiring is canonical for a given scenario.

| Pillar | Category | What it answers |
|---|---|---|
| **DS mental model / brand identity** | Understanding | Who is KISA. What the design system stands for — the brand (Michigan Blue + Maize, Korean-American student community), the voice and tone, the layout-density and content-density principles, the design philosophy. When the lookup tables present multiple plausible picks, this is the tie-breaker. Prose, not tables — Google's DESIGN.md has this section for a reason. |
| **Components catalog** | Lookup | What components exist in `@umichkisa-ds/web` and `@umichkisa-ds/form`. Indexed by **scenario → component pick**, not by alphabetic component name. |
| **Tokens catalog** | Lookup | What design tokens exist (colors, typography, spacing, icon sizes, font families) and which Tailwind utility classes expose them. Indexed by **scenario → token class**. |
| **Wiring patterns** | Lookup | When ≥2 DS components must compose together correctly (Form + Form.X, IconButton + Tooltip, Table + TableMobileList). Cross-component invariants live here. |
| **Anti-patterns + non-obvious behavior** | Lookup | Per-component contracts the agent will violate if left to its own instincts: type-checked-but-wrong patterns, non-obvious internal contracts. |

**Why the mental-model pillar matters.** Without it, an agent given two
valid picks ("inline Alert" vs "transient toast" for "tell the user
the action succeeded") flips a coin — and the result is generic SaaS
UI, not KISA UI. With it, the agent has the DS's opinions to route by.
The mental-model layer is where the DS's judgment lives; without it
we're shipping a styling library, not a design system.

What the agent does NOT need from us:

- **Prop API for each component.** TypeScript types in
  `node_modules/@umichkisa-ds/web` already document every prop, type,
  default, and required-ness. Duplicating this in DS docs is a tax
  with no payoff. The agent reads types directly when it needs
  prop-level detail.

---

## 4. The lazy-loading constraint

The agent must NOT load "all of the DS knowledge" on every dispatch.
Implementing an Avatar feature should not pull Form's entire contract
into context.

This forces a **tiered doc architecture** — three rough tiers:

- **Always-on**: a small catalog file the agent reads at the start of every dispatch. Contains the mental-model preamble, scenario-keyed component picks, scenario-keyed token classes, cross-component invariants, and a tier-picker for token decisions.
- **On-demand by section**: deep per-component contracts, deep per-rule explanations. Sectioned with markdown anchors so the agent can grep to one section and read just that.
- **Raw, read directly**: TypeScript declaration files in `node_modules/@umichkisa-ds/web` for prop-level detail.

Concrete sizes, anchor conventions, and budgets settle in the next doc.

---

## 5. What this changes vs. the existing 4-layer plan

The 4-layer plan (DESIGN / COMPONENT / USAGE / SKILL) was directionally
right but wrong on three points:

### 5.1 DESIGN.md alone is not enough for the implementer agent

The Google-style structure is the right format for DS maintainers
authoring tokens. It is NOT enough for the implementer agent — it
omits the scenario→token mapping the agent needs. We expand that
agent-facing surface into the always-on catalog; DESIGN.md stays as
the canonical authoring spec for token authors.

### 5.2 COMPONENT.md was authored as "contract per component," not "scenario→pick + how-to-use"

The C2a authoring shipped a long YAML doc heavy on prop-level content
that TypeScript types already cover. The genuinely unique contribution
is the picking layer and the contract layer (anti-patterns, compound
parts, cross-component invariants, non-obvious behavior). The picking
layer collapses up into the catalog. The contract layer stays as
sectioned per-component docs.

### 5.3 The implementer agent (A5) had the right framing but no loading strategy

A5 says "read sections that apply on demand" without telling the agent
HOW to know which sections apply. The agent has no map. The fix:
the agent's system prompt articulates the always-on → on-demand → raw
loading hierarchy explicitly, and the always-on catalog is the agent's
map.

---

## 6. The new doc layout (working names)

```
docs/
  ds-impl-agent/                # this project
    00-introduction.md          # this file
    01-...                      # specs to follow

  CATALOG.md                    # always-on
                                #   - Mental model / brand: prose preamble
                                #   - Scenario → component
                                #   - Scenario → token class
                                #   - Cross-component invariants
                                #   - Tier-pickers (spacing / color / type / icon)
                                #   - Rule index

  COMPONENT.md                  # on-demand per component
                                #   Compound parts, variants discrimination,
                                #   anti-patterns, non-obvious behavior.

  USAGE.md                      # on-demand per rule

  DESIGN.md                     # token authoring reference
                                #   Audience: DS maintainers, not the agent.
```

DS_CODEBASE.md is the existing precursor to CATALOG.md and partially
already plays this role.

---

## 7. The implementer agent shape (sharpened from A5)

Core identity stays from A5: "Senior FE engineer for the KISA client
app. Ships working code. DS is a constraint, not the identity."

What changes: the reference-loading strategy. The agent's system
prompt instructs it to read the always-on catalog first (including the
mental-model preamble), drill into per-component / per-rule sections
on demand, and read TS types directly for prop-level detail. The
catalog is the agent's map; everything else is reached through the
map.

A5's other decisions (no self-review; structured re-dispatch envelope;
tools allowlist) carry forward unchanged.

---

## 8. What we are NOT doing

- We are NOT throwing out the work in C2a. The picking-layer content,
  anti-patterns, and cross-invariants authored during C2a are
  re-homed (catalog rows, per-component sections), not discarded.
  Only the YAML scaffolding and the type-redundant prose gets dropped.
- We are NOT abandoning the 4-layer mental model. We are sharpening
  it: each layer is rehoused into the tiered doc architecture.
- We are NOT swapping in a new agent file in this project's first
  phase. The current `implementer-template.md` keeps dispatching
  existing client-migration lanes until the new docs stabilize.
  Migration risk stays bounded.

---

## 9. Open questions for the next doc

The next spec in `docs/ds-impl-agent/` resolves:

1. **CATALOG.md exact shape** — columns, scenario-row granularity,
   cross-invariant block format, mental-model preamble structure.
2. **COMPONENT.md migration plan** — what stays from C2a, what gets
   rewritten, anchor convention.
3. **USAGE.md authoring under the new model** — what survives from
   the A3 schema, what gets replaced, how tier-pickers move to
   CATALOG.md.
4. **DS_CODEBASE.md disposition** — retire, fold into CATALOG, or
   keep both (different audiences).
5. **DESIGN.md scope tightening** — confirm narrowed audience.
6. **Implementer agent system prompt revision** — concrete phrasing
   for the loading hierarchy; anti-zealot validation.
7. **Lazy-load enforcement** — does SKILL.md / the orchestrator need
   tooling to ensure the agent reads CATALOG before COMPONENT?

---

## 10. Idea parking lot

Loose ideas worth revisiting later, not scoped into v1:

- **Knowledge graph representation of the DS.** The DS surface has a
  natural graph shape: components ↔ cross-invariants, scenarios →
  components, scenarios → tokens, components → compound parts,
  components → anti-patterns. A graph might be useful for agent-side
  reasoning, RAG-style retrieval ("show me everything that touches
  Form.Button"), or visualization (a clickable map of the DS). Out of
  scope for the docs-first v1; flag for exploration once the doc
  layout stabilizes.

---

## 11. Convention for this folder

Subsequent docs in `docs/ds-impl-agent/` are numbered (`01-...`,
`02-...`) in author-order. Each doc is self-contained — readers should
not need to read the previous doc to understand the current one.
This file is the durable shared context.
