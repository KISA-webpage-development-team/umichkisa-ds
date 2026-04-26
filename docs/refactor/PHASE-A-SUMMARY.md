# Phase A — Summary

_Phase A of the `ds-client-constrained-execution` 4-layer refactor. Phase A produces specs only; Phase B prototypes; Phase C rolls out. This summary's primary job is to bootstrap Phase B — the prompt block in §5 below is the deliverable. Everything else is supporting context._

Phase A subphases shipped: **A1, A2, A3, A4, A5, A6, A8.** A7 (self-improvement / escalation logging) was consciously deferred — see §4 cluster F.

---

## 1. What changed in concept

The DS contract used to be one big `DS_CLIENT_USAGE.md` carrying mixed visual tokens, component-contract rules, consumer rules, and setup rules. Phase A splits that into a layered architecture, each layer with a clean home and a clean audience.

**Layer 1 — Visual contract.** `theme.css` is the single source of truth for tokens. A Google-Labs-spec `DESIGN.md` is **compiled** from `theme.css` (TypeScript + PostCSS + culori, run as `prebuild`). Primitives stay private; semantic colors, decomposed `.type-*` classes, three named spacing tiers, and three rounded radii surface in DESIGN.md. The compiler is built in Phase C; Phase B hand-authors a subset.

**Layer 2 — Component contract.** A new `COMPONENT.md` carries per-component identity, sibling-discriminating `pick_when` / `reject_when`, variants, notable props, intrinsic behavior, compound parts, and component-scoped anti-patterns (anti-patterns pass the contract-ownership test: "would this still be wrong in a brand-new app with no other rules?"). A top-level `cross_component_invariants` collection holds contracts spanning two or more components. Layer 2 carries no token values — it points at Layer 1 via `design_md_ref`.

**Layer 3 — Consumer rulebook.** A new `USAGE.md` replaces `DS_CLIENT_USAGE.md`. Two top-level collections: `tier_pickers` (write-time decision trees for spacing / color / radius / typography / icon-size, with optional `is_carve_out` flag and discriminating `write_time_check`) and `rules` (closed severity enum `must | never | avoid | prefer`; closed detection enum `static | semantic | compositional`; nested `exceptions:`; tagged-union `sources` provenance). Five rules reclassify out of Layer 3 into Layer 2. Migration-specific rules drop out entirely.

**Layer 4 — Execution skills.** The orchestration skill (`ds-client-constrained-execution`) and a new project-level skill (`onboard-ds`) sit at this layer. The execution skill becomes a **general DS-execution skill** — it dispatches a worker on a `.tsx`/`.jsx` predicate (DS-aware `ds-client-implementer` subagent if the file list touches `.tsx`/`.jsx`; built-in `general-purpose` otherwise) and runs the same predicate as the gate for the review chain. Migration-orchestration mechanics (PRs, lanes, `notes.md`, `needs-decision` labels) leave the skill entirely; they belong to caller protocols. The implementer is a first-class subagent that reads the three reference docs on demand and does NOT self-review for DS conformance — `ds-client-review` is the sole gate.

**Skill split — setup vs. execution.** Project-level setup rules (CSS entry import, font loading, prerequisite checks) fire **once per project**, not per task. They move into a separate `onboard-ds` skill (verify mode + bootstrap mode) that writes a `.ds-onboarded` marker the per-task skill checks at preflight. Six setup rules absorb out of `USAGE.md`. The `onboard-ds` skill ships in Phase D — when a second consumer arrives or the existing client needs re-checking after a meaningful DS change. Until then, manual one-time setup is fine.

---

## 2. What changed in artifacts

### Created in Phase A as draft / spec

| Path | What | From | Status |
|---|---|---|---|
| `docs/refactor/A1-inventory.md` | Component / rule / token inventory | A1 | committed; reference for B/C |
| `docs/refactor/A2-component-schema.md` | Layer 2 schema design (COMPONENT.md) | A2 | committed; reference for B/C |
| `docs/refactor/A3-usage-schema.md` | Layer 3 schema design (USAGE.md) | A3 | committed; reference for B/C |
| `docs/refactor/A4-design-compile.md` | Layer 1 compile strategy (DESIGN.md) | A4 | committed; reference for C |
| `docs/refactor/A5-implementer-agent.md` | `ds-client-implementer` subagent design | A5 | committed; reference for B (agent author) and C (rollout) |
| `docs/refactor/A6-skill-changes.md` | Draft diff for `SKILL.md` | A6 | committed; reference for C3 (apply diff) |
| `docs/refactor/A8-onboard-ds.md` | `onboard-ds` skill specification | A8 | committed; reference for D (build skill) |
| `docs/refactor/PHASE-A-SUMMARY.md` | This file | now | committed; reference for B (start prompt) |

### To be created in Phase B as prototype

| Path | What | From | Notes |
|---|---|---|---|
| `/DESIGN.md` | Hand-authored subset (icon-size tokens + relevant typography + colors used by Icon-cluster components) | A4 | A4 explicitly recommends hand-write for B; compiler is C work |
| `docs/COMPONENT.md` (or `/COMPONENT.md`) | Subset: `Icon`, `IconButton`, `Tooltip` + `cross_component_invariants` entry `icon-button-tooltip-aria-label-match` | A2 | Three components + one cross-invariant covers the Icon-cluster picking surface |
| `docs/USAGE.md` (or `/USAGE.md`) | Subset: Icons section (5 rules + 1 nested exception per A3 §Worked example "rule with nested exceptions") + icon-size `tier_pickers` entry | A3 Q6 | Icons cluster is the canonical Phase B prototype target |
| `.claude/agents/ds-client-implementer.md` | New subagent file (system prompt per A5 §System prompt draft) | A5 | Authored in Phase B; SKILL.md still dispatches the template until C3 |

### To be created in Phase C as rollout

| Path | What | From |
|---|---|---|
| `packages/web/scripts/compile-design.ts` + templates | DESIGN.md compiler (prebuild step) | A4 |
| `/DESIGN.md` (full, compiled) | Replaces hand-authored B subset | A4 |
| `docs/COMPONENT.md` (full) | All ~47 components + cross-component invariants | A2 |
| `docs/USAGE.md` (full) | All sections per A3 (minus setup rules absorbed by A8) | A3 |
| `.claude/skills/ds-client-constrained-execution/SKILL.md` (post-diff) | A6 diff applied | A6 |
| `.claude/skills/ds-fix-during-migration/` → `.claude/skills/ds-gap-fix/` | Skill folder rename + reference updates | A6 OQ5 |
| `docs/refactor/A7-self-improvement.md` (deferred — see §4 F) | Not in Phase C; revisit post-migration if needed | — |

### To be created in Phase D (post-rollout)

| Path | What | Trigger |
|---|---|---|
| `.claude/skills/onboard-ds/SKILL.md` | Verify + bootstrap modes | Second consumer arrives or current client needs re-check |
| `.ds-onboarded` (in client repo root) | Marker file | First `onboard-ds` run on the existing client |

### Will be retired in Phase C

| Path | Retired why | Retired when |
|---|---|---|
| `docs/DS_CLIENT_USAGE.md` | Replaced by `USAGE.md` (A3 decision 7) | Phase C, when full USAGE.md ships |
| `.claude/skills/ds-client-constrained-execution/implementer-template.md` | Replaced by `ds-client-implementer` subagent | Same commit that applies A6 diff (A6 OQ1) |
| `docs/DS_CONSTRAINTS.md` (DS-side rule doc) | Tokens move to DESIGN.md, component-scoped anti-patterns to COMPONENT.md, consumer rules to USAGE.md | Phase C end; verify nothing references it before deleting |

`docs/DS_CODEBASE.md` is **NOT** retired — it remains the human-readable component catalog used in DS-side cold-session preflight (see project CLAUDE.md). Layer 2 / 3 / 4 don't replace it.

`test-writer-template.md` stays as-is (A5 Q5 — defer agentification until evidence emerges).

---

## 3. What's ready to prototype in Phase B

| Decision | Phase B input |
|---|---|
| Component cluster | **Icons** — `Icon`, `IconButton`, `Tooltip`, plus the `icon-button-tooltip-aria-label-match` cross-component invariant. Per A3 Q6. Mostly-static rule cluster, includes a nested exception (brand icons), exercises the cross-component invariant feature. |
| Rule cluster | **Icons section + icon-size tier picker.** 5 rules + 1 nested exception. |
| DESIGN.md path | **Hand-author a subset.** Per A4 explicit recommendation. The compiler is C work; gating B on the compiler stalls validation. |
| Implementer agent | **Author `.claude/agents/ds-client-implementer.md`** during Phase B. SKILL.md still dispatches the template path; B uses the new agent via a manual Task call (per A5 §Backward compatibility). |
| Test lane | **Caller picks** — flag for the human running B. Should be an upcoming client-migration lane that touches icons. Most phases have one. |

Phase B's success criteria:
- The new agent can ship a real lane through the schemas without hitting a structural blocker that requires schema redesign.
- Schema friction surfaced during B is documented and feeds into the C author. (Pure-spec schemas usually need ≥1 adjustment after first real use — see §6.)
- The Icons-cluster `USAGE.md` + `COMPONENT.md` content is reusable as the seed for the full Phase C authoring.

---

## 4. Open questions remaining across A1–A8

Cluster letters are for §5 cross-references.

### Cluster A — Schema (likely B-blockers if they break the prototype; otherwise C-blockers)

| Q | From | Severity |
|---|---|---|
| A1: Will `pick_when` / `reject_when` predicates be expressive enough for sibling discrimination on Icon vs IconButton vs decorative-only `<svg>`? | A2 | B |
| A2: Will the `tier_pickers.options[].value` scalar-or-list shape hold for icon-size, or is icon-size structurally different from spacing? | A3 | B |
| A3: Does the nested-`exceptions:` shape (brand icons under Lucide-only) work cleanly when the implementer subagent reads it? | A3 | B |
| A4: Will the `cross_component_invariants` block's name-based resolution (`components: [IconButton, Tooltip]`) work when COMPONENT.md is incomplete? | A2 | B |

### Cluster B — Agent (B-blockers for the new agent itself)

| Q | From | Severity |
|---|---|---|
| B1: Frontmatter `description:` field tuning — does Claude Code's selection logic correctly route `.tsx` tasks to `ds-client-implementer` and skip non-`.tsx` tasks? Tune at first use. | A5 OQ | B |
| B2: Hardcoded client-repo path in the system prompt — fine for B; revisit if a second consumer appears. | A5 OQ | nice-to-have |
| B3: Test-writer agentification — keep template; revisit only if Phase B reveals tests drifting on DS rules. | A5 Q5 | nice-to-have |

### Cluster C — Skill diff (C-blockers — apply at C3)

| Q | From | Severity |
|---|---|---|
| C1: Graph node naming `BLOCKED (DS)?` vs `BLOCKED (gen)?` — ugly, deferred to C3 graph-aesthetics pass. | A6 OQ6 | C |
| C2: `final-review` skill name (`vercel-react-best-practices`) — project-specific; revisit when a non-React consumer appears. | A6 OQ4 | nice-to-have |
| C3: `ds-fix-during-migration` → `ds-gap-fix` rename — happens after PHASE-A-SUMMARY lands. Touches skill folder name, A6 diff option (d) text, any other references. | A6 OQ5 | C (pre-rollout) |

### Cluster D — DESIGN.md compiler (C-blockers)

| Q | From | Severity |
|---|---|---|
| D1: Compiler template contents (`packages/web/scripts/templates/*.md.tpl`). Out of A4 scope; designed during C build. | A4 OQ | C |
| D2: Lint fallback if `npx @google/design.md` rejects 8-digit hex on `overlay` — fall back to `#000000` + prose note. Acceptable degradation. | A4 §Lint rules | C |
| D3: Geist Mono reframe in USAGE.md — current `t-fn-5` says "docs-site only"; reframe to "code-display contexts only." | A4 §Open questions | C (USAGE.md authoring) |

### Cluster E — `onboard-ds` skill (D-blockers — none of these block B or C)

| Q | From | Severity |
|---|---|---|
| E1: Marker file path (`a) repo root .ds-onboarded` recommended) | A8 OQ | D |
| E2: Marker schema (YAML recommended) | A8 OQ | D |
| E3: Staleness threshold (minor-bump triggers re-verify recommended) | A8 OQ | D |
| E4: Bootstrap framework detection (Next.js / Vite / other) | A8 OQ | D |
| E5: Marker commit policy (committed recommended) | A8 OQ | D |

### Cluster F — Self-improvement / escalation logging (deliberately deferred)

A7 was specced in the original brief as escalation YAML schemas + `.ds/escalations/` directory + phase-end retrospective ritual. **Consciously dropped** at A7 grill: current escalation rate is low (DS is mostly stable, new components route to `ds-gap-fix`, rule clarifications route to memory + git commit). Building structured logging now is overhead for a frequency that doesn't match reality.

**Phase D revisit trigger:** if escalation frequency exceeds ~3 per phase consistently, or if the human running phase-end ritual finds memory + git log insufficient for tracking rule deltas, build A7 then. Until then, hard-stop events route through the existing channels: human acts on the gate's decision-space `(a)/(b)/(c)/(d)` options at the keyboard; resolution is captured in commit messages and (where appropriate) MEMORY entries.

---

## 5. Exact prompt to start Phase B

Paste the block below into a fresh Claude Code session in the `umichkisa-ds` repo. It is self-contained.

````markdown
# Phase B — Prototype the 4-Layer DS Contract on the Icons Cluster

You are Claude Code working in the `umichkisa-ds` monorepo. Phase A is
complete (specs only; no runtime artifacts written yet). Phase B prototypes
the new architecture end-to-end on the **Icons rule cluster** to validate
the schemas, the new implementer subagent, and the gate flow before the
full Phase C rollout.

## 0. What's already done (do not redo)

The following are committed under `docs/refactor/`. **Treat them as given.**
If a concrete contradiction surfaces while prototyping, surface it — the
prior outputs win unless the contradiction is a real schema bug exposed by
first real use (Pitfall §6.1 below).

### Prior outputs to read in full before doing anything else

1. `docs/refactor/PHASE-A-SUMMARY.md` — start here; orients you to A1–A8
2. `docs/refactor/A1-inventory.md` — component / rule / token inventory
3. `docs/refactor/A2-component-schema.md` — COMPONENT.md schema (Layer 2)
4. `docs/refactor/A3-usage-schema.md` — USAGE.md schema (Layer 3)
5. `docs/refactor/A4-design-compile.md` — DESIGN.md strategy (Layer 1) —
   note the explicit "Phase B hand-authors a subset" recommendation
6. `docs/refactor/A5-implementer-agent.md` — `ds-client-implementer`
   subagent system prompt draft + Backward Compatibility section
7. `docs/refactor/A6-skill-changes.md` — draft SKILL.md diff (NOT
   applied in B)
8. `docs/refactor/A8-onboard-ds.md` — setup-skill spec (NOT built in B)

After reading all eight, print a 4–6 sentence understanding summary
covering: the 4-layer split, the dispatch fork in A6, the `.tsx`/`.jsx`
predicate, what stays a template vs becomes an agent, and what Phase B
ships vs defers. Stop after the summary; wait for human confirmation
before starting B1.

### Background still in force

- `theme.css` is the source of truth (Layer 1). DESIGN.md is compiled
  output (in Phase C; hand-authored subset in Phase B).
- `tier_pickers` and `rules` are separate top-level collections in
  USAGE.md (A3).
- Severity enum is closed: `must | never | avoid | prefer`. Detection
  enum is closed: `static | semantic | compositional`. Exceptions are
  nested under their parent rule, never peer-severity (A3).
- Implementer is a subagent (A5). Skill diff is drafted but NOT applied
  during B (A6 §Migration path). B uses the new agent via a **manual
  Task call** alongside the still-live template path.
- Setup is a separate skill, NOT built in B (A8).
- A7 (escalation logging) was deferred indefinitely — ignore for B.
  Hard-stops during B route through existing channels (memory + commit
  message).

## 1. Phase B deliverables

Five steps, each with a checkpoint. Commit each separately. After B5,
stop. Do not start Phase C.

When you stop at a checkpoint, print:
`=== CHECKPOINT Bx — STOPPED, AWAITING APPROVAL ===`

### B1 — Hand-author DESIGN.md subset

Author `/DESIGN.md` at the repo root with **only** the tokens needed by
the Icons cluster + their dependencies:

- All `colors.*` entries the Icon / IconButton / Tooltip components
  reference (foreground, muted-foreground, brand-primary, focus-ring,
  the brand-accent family) — sufficient to round-trip the cluster
- The full `typography.*` block (cheap to include, exercises the
  Typography schema)
- The `spacing.icon-xs/sm/md/lg/xl` group (this is the cluster's
  primary picker)
- `spacing.element/component/section` (referenced by icon-text-layout
  rules)
- `rounded.md/lg/full`

Run `npx @google/design.md lint /DESIGN.md` to validate. Resolve any lint
failures (the A4 prose flagged a likely 8-digit-hex issue on `overlay` —
follow the documented fallback if it fires; we don't ship `overlay` in
B's subset, so it likely won't).

Do **not** build the compiler. That's Phase C work explicitly.

**Checkpoint B1.**

### B2 — Author COMPONENT.md subset

Author `docs/COMPONENT.md` with three components and one cross-component
invariant:

- `Icon` (full entry per A2 §Schema, including anti-patterns and
  `design_md_ref`)
- `IconButton` (sibling-discriminating `pick_when` / `reject_when`
  must reject in favor of Button when there's a text label)
- `Tooltip` (full entry; needed by the cross-component invariant)
- `cross_component_invariants:` block with one entry:
  `icon-button-tooltip-aria-label-match` (per A2 worked example)

The `Icon` entry MUST exercise:
- `notable_props` (size enum, name, label)
- `anti_patterns` carrying the rules reclassified out of Layer 3 per
  A3's appendix (`i-pr-2`, `i-pr-4`)
- `see_also` pointing at `icon-button-tooltip-aria-label-match`

Watch for friction with the schema as you author. If `pick_when` lines
won't fit one assertion per line, or the `compound_parts` shape is
awkward for Icon (it has none, but check), or the
`design_md_ref: "{components.icon}"` syntax doesn't actually resolve to
anything (DESIGN.md v0 skips the `components:` block per A4 D5), write
the friction to `docs/refactor/B-friction-log.md` — that file is the
input to schema adjustments before C.

**Checkpoint B2.**

### B3 — Author USAGE.md subset (icon-size tier picker + Icons rules)

Author `docs/USAGE.md` with:

- `tier_pickers:` block with one entry: `icon-size` (5 enum values, the
  "match icon size to text context" `write_time_check`, the "never
  override with font-size or arbitrary CSS" invariant)
- `rules:` block with the Icons cluster (A3 §Worked example "rule with
  nested exceptions" defines this — Lucide-as-sole-icon rule with
  brand-icons nested exception, no react-icons import, no lucide-react
  import, no inline SVG, size-prop-only)

Five rules + one nested exception. Provenance is `doc_anchor` style
pointing at `DS_CONSTRAINTS.md/iconography` (acceptable until C retires
that file).

Friction goes to the same `B-friction-log.md`.

**Checkpoint B3.**

### B4 — Author the implementer subagent

Author `.claude/agents/ds-client-implementer.md` using the verbatim
system prompt draft in `A5-implementer-agent.md` §System prompt draft.

Adopt the sharpened `description:` from A5's A6 backfill section
(makes the `.tsx`/`.jsx` scope explicit for Claude Code's selection
logic).

The agent file goes in the **DS repo's** `.claude/agents/`, not the
client repo's. Same model as the existing reviewer agents.

**Checkpoint B4.**

### B5 — Real-lane validation

Pick an upcoming client-migration lane that touches icons (the human
will surface a candidate; do not pick blindly). For that lane:

1. Dispatch the new `ds-client-implementer` agent **manually via a
   Task call**, NOT via the existing `ds-client-constrained-execution`
   skill (the skill still uses the template path until C3).
2. Pass: task text + files in scope + mode tag + execution context,
   per A5 §Dispatching prompt.
3. Run the agent's output through the existing `ds-client-review` and
   `toss-fe-review` agents (they're unchanged in B).
4. Compare results to what the template path would have produced —
   does the new agent ship clean code? Does it correctly read
   COMPONENT.md / USAGE.md / DESIGN.md when picking icon size or
   rejecting react-icons imports? Does the review chain still work?

Document findings — friction, surprises, schema gaps, agent prompt
weaknesses — in `B-friction-log.md` for input to Phase C authoring.

**Checkpoint B5.** Stop. Do not begin Phase C.

## 2. What Phase B does NOT do

- Build the DESIGN.md compiler (`compile-design.ts`) — that's C
- Author the full COMPONENT.md or USAGE.md — that's C
- Apply the A6 SKILL.md diff — that's C3
- Retire `DS_CLIENT_USAGE.md`, `DS_CONSTRAINTS.md`, or
  `implementer-template.md` — those are C
- Build the `onboard-ds` skill — that's D
- Build escalation logging / `.ds/escalations/` directory — deferred
  indefinitely (PHASE-A-SUMMARY §4 cluster F)
- Rename `ds-fix-during-migration` to `ds-gap-fix` — that's C, and
  PHASE-A-SUMMARY §4 cluster C tracks it

## 3. Pitfalls specific to B

### 6.1. Schemas designed in pure spec mode often need adjustment

A2 / A3 were authored without a real prototype. Expect at least one
schema field to feel wrong when you actually fill it in for the Icons
cluster. **The B-friction-log.md is the deliverable that captures
this.** Don't silently adapt the schema and ship — log it, surface it,
and let Phase C decide whether to amend the schema.

### 6.2. The `design_md_ref` field may not resolve in B

A4 D5 skipped the YAML `components:` block entirely in DESIGN.md v0.
That means `design_md_ref: "{components.icon}"` references nothing
yet. Author the field anyway — it's the canonical Layer 2 → Layer 1
pointer, and the field's presence is part of what we're prototyping.
Document the dangling-reference behavior in the friction log.

### 6.3. Don't dispatch the new agent through SKILL.md

SKILL.md still runs the template path until C3. If you invoke
`ds-client-constrained-execution` during B, it will use the template,
not the new agent. Dispatch the new agent **directly via a Task call**
in B5.

### 6.4. The new agent file is in the DS repo

`.claude/agents/ds-client-implementer.md` lives in `umichkisa-ds`,
not in `KISA-website/client`. The client repo has its own `.claude/`
but agents live with the skill that calls them.

### 6.5. Don't write COMPONENT.md or USAGE.md in the client repo

These are DS-side reference docs (Layer 2 + 3). They live in the DS
repo's `docs/`. The implementer agent reads them from there even when
running against client-repo files.

### 6.6. Don't write A7-shaped escalation infrastructure

Cluster F in PHASE-A-SUMMARY explicitly defers it. If a hard-stop
fires during B5, capture the resolution in a commit message and (if
worth remembering across sessions) a memory entry. Don't create
`.ds/escalations/` or YAML schemas for it.

## 4. Working style

- Read all eight prior outputs in full before B1.
- After reading, print the understanding summary and stop.
- Commit after each B step (B1 through B5). Do not bundle.
- At each checkpoint, print the marker line and wait.
- If a checkpoint response is ambiguous, ask one clarifying question.
- If A1–A8 contradict anything in this prompt, the prior outputs win
  — except where the friction log captures a real schema bug.
- The `B-friction-log.md` is your most important deliverable beyond
  the artifacts themselves. Phase C reads it before authoring the
  full files.

Begin by reading the eight prior outputs. After the summary, wait for
go-ahead before starting B1.
````

---

## 6. Deferred actions list (Phase A close-out)

Tracked here so they don't get lost between A and B/C/D.

| # | Action | When |
|---|---|---|
| 1 | Rename `ds-fix-during-migration` skill → `ds-gap-fix` | After PHASE-A-SUMMARY lands; before Phase C rollout (A6 OQ5) |
| 2 | Reframe `t-fn-5` Geist Mono rule from "docs-site only" → "code-display contexts only" | Phase C, when full USAGE.md authored (A4 OQ) |
| 3 | Drop A1's `p2-tk-3` (`!font-*` weight override forbidden) and the `p2-tk-4` migration carve-out | Phase C USAGE.md authoring (A2 §3) |
| 4 | Decide whether `docs/DS_CONSTRAINTS.md` retires fully or partially in C | Phase C |
| 5 | A7 revisit: build escalation logging if frequency justifies | Post-migration (deferral trigger documented in §4 F) |

---

## 7. Sanity check

Phase A's job was to produce specs, not artifacts. Read against that bar:

- Layer 1 has a compile strategy (A4)
- Layer 2 has a schema (A2)
- Layer 3 has a schema (A3)
- Layer 4 has an updated skill diff (A6) and a new subagent design (A5)
- Setup-execution split has its own skill spec (A8)
- Phase B has a self-contained start prompt (§5)

The artifacts that drive Phase B exist. The artifacts that drive Phase C exist. The artifacts that drive Phase D exist. Phase A is done.
