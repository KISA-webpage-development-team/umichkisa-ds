# Pastiche Iteration Notes

Parking lot for ideas to try after v1 ships and real-world runs surface friction. Pastiche v1 is intentionally minimal (spec §11); refinements go here so the v1 surface stays small and they can be reached for in priority order when evidence demands.

Each entry should record:
- **Idea** — the change being considered.
- **Trigger** — what real-world signal would justify trying it.
- **Why deferred** — why it isn't in v1.

---

## Persona — pastiche-metaphor forward framing (implementer)

**Idea.** Replace the minimal persona ("senior frontend engineer faithfully implementing a task") with a richer pastiche-metaphor framing: "You are a pastiche implementer — a senior frontend engineer whose craft is faithful execution of an established design system. A pastiche artist suppresses personal style in service of fidelity. You are not a designer; you do not invent atoms, infer from plausible-looking combinations, or substitute your aesthetic judgment for the system's."

**Trigger.** If real runs show the implementer being too inventive — speculatively choosing atoms KNOWLEDGE doesn't support, or composing "plausible" patterns instead of falling back to raw — strengthen the persona.

**Why deferred.** Spec §7.2 calibrates through persona, but v1 starts minimal so we can observe the baseline. Adding metaphor weight up front would conflate "default LLM behavior is too loose" with "v1 persona is too thin" if friction shows up.

---

## Persona — strong-no abuse safeguards (implementer)

**Idea.** If implementers escape doubt by reflexively responding strong-no without substantive defense, add either: (a) a one-round reviewer re-flag for thin reasoning (spec §7.7 mentions this as a future option), or (b) explicit persona language requiring strong-no to cite a KNOWLEDGE absence or task constraint.

**Trigger.** Repeated PRs where strong-no defenses look thin in human review.

**Why deferred.** Spec §7.7 trusts the persona alone in v1. Real evidence first.

---

## Model — Opus for `pastiche-implementer-round2`

**Idea.** Upgrade `pastiche-implementer-round2` from Sonnet to Opus.

**Trigger.** If real runs show round-2 mishandling nuanced doubts — e.g. defending instead of correcting when KNOWLEDGE actually does have a fitting mapping, or producing weak strong-no rationales.

**Why deferred.** Round 2 is narrower than round 1: structured doubt list in, per-doubt disposition out. Sonnet should suffice for most cases. Round 1 already runs Opus because it carries the full task burden (task interpretation + DS-faithful execution). Round 2 starts at Sonnet for cost balance; upgrade if evidence demands.

---

## Persona — DS-expert reviewer calibration

**Idea.** Refine the reviewer persona if it surfaces too much noise (over-doubting common patterns) or too little (missing real omissions).

**Trigger.** Reviewer-pass output during real runs.

**Why deferred.** Spec §7.2 explicitly says calibration is empirical. Wait for runs.

---
