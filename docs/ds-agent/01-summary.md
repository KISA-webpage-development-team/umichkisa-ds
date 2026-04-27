# ds-agent — Project Summary

_Captured 2026-04-27. One-page summary. The full spec is in `02-spec.md`._

---

## What this is

**ds-agent** is a docs-and-agents architecture that lets an LLM ship
DS-conformant UI from a natural-language frontend task without doing
any original visual design — and without consuming an unreasonable
amount of context per dispatch.

KISA is the testbed. The architecture is meant to be portable to any
design system that wants agent-consumable docs.

## What ships

Two cooperating agents, five docs, and a small set of scripts.

### Two agents

- **Implementer** — picks DS components and tokens for the task, wires
  them together, writes code. Carries opinions, not facts.
- **Reviewer** — checks the implementer's output for hallucinated
  components/tokens, rule violations, scenario-pick mismatches, and
  brand fit. Carries facts and rules.

The two-agent split is the core insight: hallucination is a
verification concern, not a generation concern. Putting the fact lists
in front of the reviewer (not the implementer) keeps the implementer's
context small and gives the reviewer a clean gating role.

### Five docs

| Doc | Role | Authored | Loaded by |
|---|---|---|---|
| `CATALOG.md` | Always-on map. Brand voice + scenario→component + scenario→token + cross-component invariants. | Human | Both agents |
| `WISDOM.md` | Per-component non-obvious rules ("business logic of the DS"). Tagged. | Human | Implementer drills; reviewer always-on |
| `PATTERNS.md` | Multi-component orchestrations ("the dance"). Tagged. | Human | Implementer drills |
| `TOKEN.md` | Flat fact list of tokens by axis. | Auto-generated from theme.css | Reviewer always-on |
| `COMPONENTS.md` | Flat fact list of exported components. | Auto-generated from `index.d.ts` | Reviewer always-on |

TypeScript declaration files in `node_modules/@umichkisa-ds/*` are the
prop-API source of truth — never mirrored into docs.

### Tag-based linking

WISDOM and PATTERNS sections carry a `Tags:` line listing the
components and token families they touch. The implementer queries by
tag union after picking from CATALOG. CI lints every tag against the
auto-generated fact docs, so a component rename surfaces as a stale
tag rather than silent drift.

### Scripts (v1) → CLI tool (v2)

v1: hand-written scripts in `scripts/` generate TOKEN.md and
COMPONENTS.md and lint Tags. v2 (deferred): publishable CLI tool other
DSes can adopt.

## What's different from the prior 4-layer plan

- **Single source of truth split by question type.** Facts (TS types,
  theme.css) stay in code. Opinions (CATALOG, WISDOM, PATTERNS) live
  in docs. There is no Google-style monolithic DESIGN.md.
- **Lazy loading is built into the doc shape**, not retrofitted on
  the agent. CATALOG is the map; WISDOM and PATTERNS are addressable
  by tag.
- **Drift-resistance via auto-generation + tag linting.** The high-cost
  parts of the prior plan (per-component docs that mirror TS types,
  hand-maintained token tables) are replaced by generated artifacts
  and verified pointers.

## What this does NOT do

- It does not design UI. Visual decisions belong to the DS.
- It does not enforce style at runtime — TypeScript types and the
  reviewer agent are the gates.
- It does not replace human review on novel work. It removes the
  routine DS-conformance load so humans review what's actually new.

## Bonus: aesthetic-review skill

A separate, on-demand **skill** the developer invokes when they want a
UI-designer-perspective pass on a finished surface (pacing, hierarchy,
typographic rhythm, brand fit beyond mechanical rules). Reads CATALOG
and WISDOM; not part of the gating chain. See spec §2.3.

## Project status

Spec stage. v1 is validated directly against the live KISA client
migration — `ds-client-constrained-execution` and the agents it
dispatches are modified in place to use the new doc set. No parallel
shadow stack.
