# Pastiche Implementation Plan — KISA v1

_Phase breakdown only. Details are deferred to each phase._

KISA DS is the v1 testbed. The plan walks bottom-up: vertical slice → templates → docs → tooling → agents → skill → cutover → aesthetic.

---

## Phase 1 — Vertical slice [DONE]

- Pick one component (likely `Button`).
- Hand-write FACT, KNOWLEDGE, and WISDOM entries for that component end-to-end.
- Goal: validate the doc shapes against real content before abstracting templates.

## Phase 2 — Templates [DONE]

- Abstract FACT.md / KNOWLEDGE.md / WISDOM.md templates from the slice.
- Concise, well-structured, optimized per doc's purpose and lifecycle.

## Phase 3 — Doc generation (parallel sub-phases) [DONE]

- **3a. FACT script.** Mechanical extractor from KISA codebase (TS types, theme.css, barrel exports).
- **3b. KNOWLEDGE seeding.** Brand prose grilling with user; scenario→atom mappings seeded from `DS_CLIENT_USAGE.md`.
- **3c. WISDOM seeding.** Atom-intrinsic rules ported from `DS_CONSTRAINTS.md`. Scenario-conditional rules redirected to KNOWLEDGE per spec §3.3.

## Phase 4 — Cross-doc tag-sanity lint [DONE]

- Standalone CI script. Single source of truth: FACT.md.
- **WISDOM.md:** every `[atom]` tag must match a FACT entry verbatim — components by exported name, tokens in `--`-prefixed form. `[GENERAL]` is the lone allow-listed non-FACT tag (spec §4).
- **KNOWLEDGE.md:** every atom reference (component names in `→` recommendation lines, token references in prose) must resolve to a FACT entry. KNOWLEDGE is not tag-grepped, but its named atoms are still part of the §9 invariant — a renamed component must not silently rot a KNOWLEDGE recommendation.
- Fails closed on any unresolved tag/reference. Clear error message naming the offending document, line number, and atom.
- Tested in isolation.

## Phase 5 — `pastiche-implementer` agent

- Draft prompt. Persona, KNOWLEDGE consumption, tagged WISDOM grep, conservative fallback per spec §6.

## Phase 6 — `pastiche-reviewer` agent

- Draft prompt. DS-expert persona, FACT pass, WISDOM pass, speculative doubt calibrated via persona framing per spec §7.2.

## Phase 7 — `pastiche` skill

- Wire implementer + reviewer into the 2-round loop per spec §7.5.
- Calibration of agent prompts happens during real client-migration usage, not before.

## Phase 8 — Cutover

- `CLAUDE.md` Mode D switches from `ds-client-constrained-execution` → `pastiche`.
- Pastiche becomes the active execution skill for the ongoing KISA client migration.

## Phase 9 — Aesthetic review skill

- Separate, on-demand skill per spec §15. Outside the gating loop.
- Brand prose + UI/UX + frontend design knowledge.

---

## Validation

Validation against real client-migration lanes is handled separately, post-implementation. Not a phase in this plan.
