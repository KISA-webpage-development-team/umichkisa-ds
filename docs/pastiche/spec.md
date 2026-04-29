# Pastiche: A Claude Skill for Faithful Design System Execution

_Spec v1. Reflects design decisions resolved through grilling on 2026-04-29._

---

## 1. Motivation

### 1.1 The DESIGN.md Lineage

Google's [DESIGN.md](https://github.com/google-labs-code/design.md) (used in Stitch) demonstrated that a single curated document can encode a design system's **tokens** and **component patterns** well enough for an LLM to generate visually consistent UI. It is a powerful primitive for *visual* coherence.

### 1.2 Where DESIGN.md Stops Short

Real-world frontend work is not purely visual. A production frontend task is:

```
UI + Business Logic + FE Logic + BE Connection
```

And in practice, mature engineering organizations do not work with raw tokens and patterns. They wire those primitives into **high-level component libraries** — either by adopting (`shadcn`, `MUI`, `Chakra`) or by wrapping them into a proprietary design system. By the time an FE engineer touches code, the building blocks are not "a button styled with our tokens" but `<Button variant="primary" size="md">`.

DESIGN.md does not model this layer. It can describe *how a button should look*, but not *which Button component exists in our library, what props it accepts, or what conventions govern its use*.

### 1.3 Pastiche's Position

Pastiche is the missing layer. It is a Claude Code skill that lets an LLM execute frontend tasks faithfully within a real design system + component library, by giving it a minimal, well-structured representation of that system to read and reason about.

---

## 2. Naming and Metaphor

The project is named **Pastiche** — a term from art and literature for a work that *deliberately and openly* imitates the style of a master, without intent to deceive. A pastiche is not a forgery. The pastiche artist's discipline is to suppress personal style in service of fidelity to an established hand.

This is exactly what a frontend implementer must do when working inside a design system: not invent, not deviate, but execute faithfully within an established vocabulary. Creativity is, in this domain, often the failure mode.

---

## 3. The Three Documents

Pastiche replaces DESIGN.md with **three documents** that form an *epistemological hierarchy*. Each document differs not only in content, but in how it is generated, who maintains it, and what role it serves.

### 3.1 FACT.md — *What the machine extracts*

- A flat, mechanical catalog of every token, component, and prop that exists in the codebase.
- **Auto-extracted** from the source. Not hand-written.
- No prose. No explanation. No taxonomy.
- Lifecycle: regenerated on every codebase change.

**Purpose:** Ground truth for hallucination detection. If the reviewer sees a component or prop in generated code that is not in FACT.md, it is invented.

### 3.2 KNOWLEDGE.md — *What humans curate as mappings*

- A scenario-to-atom mapping: *"In this UI/UX situation, use these tokens and components."*
- Hand-curated by designers and frontend engineers together.
- Plays the role of an absent designer for a team that has only the component library.
- Includes a dedicated prose section on **brand identity** — the descriptive aesthetic spirit that cannot be reduced to a lookup table.
- Lifecycle: grows as new scenarios are encountered and codified.

**Purpose:** The implementer's primary reference. Given a task, the implementer reads KNOWLEDGE first to determine which atoms compose the answer.

### 3.3 WISDOM.md — *What must be said in words*

- Discrete rules, conventions, and policies that hold for an atom **regardless of scenario**.
- Each entry is short — typically a single sentence.
- Each entry is **tagged** with the atom names (component names, token names) it pertains to.
- Co-authored by designers and engineers. The single source of truth for *atom-intrinsic business logic on UI*.
- Lifecycle: grows organically over the lifetime of the project as edge cases and conventions are discovered.

**Examples (atom-intrinsic):**
- `[Icon]` If a desired icon is not available in the Icon component, do not inline raw SVG; file a request with the design system team.
- `[Modal]` Every Modal must have an accessible label via `aria-labelledby` or `aria-label`.
- `[Button]` `size='xs'` is incompatible with the loading state; use `size='sm'` or larger.

**Counter-examples (these belong in KNOWLEDGE, not WISDOM):**
- *"Destructive actions must use ConfirmDialog rather than a generic Modal."* — scenario-conditional ("destructive actions"); express as a KNOWLEDGE mapping `destructive confirmation → ConfirmDialog`.
- *"Do not use Toast for errors in payment flows; use InlineError instead."* — scenario-conditional ("payment flow"); express as a KNOWLEDGE mapping `payment flow error → InlineError`.

**The discipline is hard:** scenario-conditional rules *never* leak into WISDOM. Every WISDOM entry must be a property of its tagged atom that is true everywhere the atom appears. Scenario rules are KNOWLEDGE. This separation is what keeps the tag system pure and grep-deterministic (§4).

### 3.4 Why three, not one

Each document has a **different lifecycle and a different author**. Conflating them produces a document that is too volatile in one part, too fragile in another, and too verbose to load fully into context. Separating them allows each to be generated, maintained, and consumed differently.

---

## 4. The Core Mechanism: Tag-Based Lazy Loading

WISDOM.md grows over time. Loading it in full on every task wastes context and exposes the agent to unrelated rules that may bias its judgment.

**Solution:** Each WISDOM entry carries tags naming the atoms (components, tokens) it concerns. Agents retrieve only the WISDOM entries relevant to the atoms involved in the current task, by grepping for those tags.

**Why grep, not RAG:**
- Deterministic. No retrieval surprises.
- Forces WISDOM authors to think clearly about *which atoms* a rule binds to.
- Cheap. No embedding pipeline. Works in any environment.

**The tag is the joint** between the three documents. KNOWLEDGE references atoms by name; FACT defines those names canonically; WISDOM indexes itself against them. The atom name is the system's unit of meaning.

**Tags are atom-only.** Domain tags (`#payment`, `#onboarding`) are intentionally not part of the system. Domain context lives in KNOWLEDGE as scenario mappings; WISDOM stays atom-pure. This is enforced by §3.3 discipline and verified by the tag lint (§14.2).

---

## 5. The Implementer / Reviewer Asymmetry

Pastiche is a feedback-loop skill with two subagents. Their asymmetry is the source of the system's elegance.

### 5.1 Implementer — *Constructive, heavy*

**Context:** KNOWLEDGE.md (full) + WISDOM.md (lazy, by tag)
**Persona:** Senior frontend engineer working inside the design system. Faithful executor; not a designer.

**Workflow:**
1. Read the task.
2. Consult KNOWLEDGE.md to identify which atoms (components, tokens) apply to the task's scenario. Semantic matching is fine — the implementer reads the map and finds fitting scenarios; no lexical-match ceremony.
3. With the candidate atoms in hand, grep WISDOM.md by atom name to surface relevant rules.
4. Implement, applying both KNOWLEDGE mappings and WISDOM rules.
5. Where KNOWLEDGE provides no clear mapping, fall back per §6.

### 5.2 Reviewer — *Verificational, light*

**Context:** FACT.md (full) + WISDOM.md (lazy, by tag) + the task description
**Persona:** A senior frontend engineer with deep design system expertise — strict, but heuristic. Raises doubts, not verdicts. The persona itself is the calibration mechanism (§7.2).

**Workflow:**
1. **FACT pass:** Every component, token, and prop appearing in the generated code must exist in FACT.md. If not — hallucination. Flag.
2. **WISDOM pass:** For each atom present in the code, look up wisdom by tag. Check for violations.
3. **Speculative doubt pass:** Compare the code against FACT and the task description, using the reviewer's DS-expert persona. Raise doubts about omitted components, omitted tokens, and chosen atoms that do not cohere with the task. (See §7 for the full mechanism.)

The reviewer **does not consult KNOWLEDGE.md.** This is intentional and important — see §7.

### 5.3 The asymmetry is epistemological, not just functional

Generation and verification are not the same activity. The implementer travels *from scenario to atoms*; the reviewer travels *from atoms to rules*. They meet WISDOM from opposite directions, against the same content. KNOWLEDGE belongs only to the constructive direction.

---

## 6. Three Failure Modes and How They Are Caught

Real-world frontend code is a legitimate mix of raw HTML elements and design system components. A snippet like `<div><Card><CardHeader><span>...</span></CardHeader></Card></div>` is entirely valid — raw `<div>` and `<span>` coexist with library components without violating anything. This means the system cannot treat *all* raw elements as suspicious, but it must still detect cases where the design system was misused.

There are three distinct ways an implementer can fail to honor the design system:

| Failure mode | Description |
|---|---|
| **A. Component omission** | A component should have been used, but a raw tag was used instead (e.g., raw `<button>` where `Button` exists in FACT). |
| **B. Token omission** | A token should have been used, but a raw value was used instead (e.g., `color: #3b82f6` where `color.primary` exists). |
| **C. Wrong choice** | A real component was used, but the wrong one for the situation (e.g., `List + Tile` where `Grid + Card` was the established pattern). |

These three modes have different signatures and require different mechanisms to detect. The system's design responds to each.

### 6.1 The implementer's posture: conservative by default

The implementer is prompted to be **maximally conservative with respect to the design system**. When KNOWLEDGE.md does not provide a fitting mapping for the task at hand, the implementer falls back to raw HTML / Tailwind / CSS rather than speculating. Cobbling together "plausible-looking" atoms by inference when KNOWLEDGE does not directly support the choice is forbidden.

This is the system's most important invariant on the constructive side. Plausible inference is a silent failure: if the implementer guesses `Stack + gap` when the right answer was `VStack`, the reviewer's FACT pass succeeds (Stack is real), and tagged WISDOM lookup proceeds against the wrong atom. The system has no signal that anything went wrong.

The implementer's decision therefore collapses to a binary: *fitting KNOWLEDGE mapping → use the atom; no fitting mapping → raw.*

The judgment of "fitting" is left to the implementer's persona-driven reading of KNOWLEDGE — not to a citation requirement or a lexical-match rule. Trust in LLM judgment here is empirically validated: the existing `ds-client-constrained-execution` skill operates this way against `DS_CODEBASE.md` and works.

### 6.2 Optional intent comment

If — and only if — the implementer is confident that raw is the correct answer from the first round (for example, a layout so task-specific that no DS atom would apply), it may leave an inline comment stating the intent. This is **optional, not required**. Its purpose is to short-circuit reviewer doubt in obvious cases.

A round-one implementation without comments is fully acceptable. The reviewer's *speculative doubt* mechanism (§7) is what handles uncertainty, not a self-declaration burden on the implementer.

### 6.3 What this buys

- The implementer is freed from the cognitive burden of self-flagging every uncertainty.
- Conservative behavior is enforced positively (use atoms only when KNOWLEDGE supports it) rather than through self-reporting.
- The detection of failure modes A, B, and C is moved to the reviewer, where it belongs structurally — generation should focus on faithful execution; verification should focus on doubt.

---

## 7. Speculative Doubt: How the Reviewer Catches All Three Failure Modes

The reviewer's defining mechanism is **speculative doubt** — a deliberately heuristic, non-authoritative flagging of suspicious patterns, met by an implementer response that either corrects or defends.

### 7.1 The reviewer's grounds for doubt

The reviewer does not read KNOWLEDGE.md. It works only from:

- **FACT.md** — what components and tokens exist in this DS.
- **WISDOM.md** (by tag) — explicit rules about atoms in the code.
- **The task description** — what the user asked for.
- **DS-expert persona** — the LLM reasoning under the framing of a senior designer / DS expert reviewing this change against the task.

From these, the reviewer raises *doubts*, not verdicts. A doubt is a question, not a judgment: *"This is raw `<button>` and FACT contains `Button` — is this intentional, or should it be the component?"*

### 7.2 Calibration is via persona, not rules

A natural temptation is to enumerate doubt-raising rules ("flag every raw `<button>` when Button exists; flag every hex when a token exists; ..."). Pastiche does not do this. Calibration of when to doubt is achieved through **how the reviewer is framed in its prompt** — as a DS-expert designer, with the task in hand, judging whether the code coheres with both the DS and the task.

This persona naturally produces **threshold doubt** (only flag when DS sense strongly suggests a substitution) plus **task-anchored doubt** (don't second-guess plausible choices unless the task makes a different choice obviously preferable). Both behaviors fall out of the framing; neither needs to be encoded as a rule list.

The trade-off: calibration is empirical. If real runs show the reviewer too noisy or too quiet, the response is to refine the persona prompt — not to introduce rules. Rule lists are an anti-pattern for prompt-driven agents.

### 7.3 Why doubt instead of judgment

The reviewer's signals are heuristic. FACT contains a Button component, but maybe the task genuinely requires a raw `<button>`. The general convention is Grid + Card for image-and-title lists, but maybe this specific task has a reason to use List + Tile. The reviewer cannot know with certainty — only the implementer (who reads KNOWLEDGE) can.

So the reviewer asks. The implementer answers in the next round.

### 7.4 How the three failure modes are caught

| Failure mode | Reviewer's grounds for doubt |
|---|---|
| **A. Component omission** | FACT contains a component whose name and shape match the raw tag. *"Why not the component?"* |
| **B. Token omission** | FACT contains a token whose semantic role matches the raw value. *"Why not the token?"* |
| **C. Wrong choice** | The chosen atoms do not cohere with the task description, given the reviewer's DS-expert reading. *"This is List + Tile for an image-and-title list — is that intentional?"* |

Modes A and B come from comparing raw patterns in the code against FACT. Mode C comes from comparing the chosen atoms against the task description through the reviewer's persona.

### 7.5 The dialogue: doubt → defense or correction

Pastiche v1 runs a **two-round loop**: two implementer rounds with one reviewer pass between them.

**Round 1 (implementer):** Produces code based on KNOWLEDGE + tagged WISDOM.

**Reviewer pass:** Runs FACT, WISDOM, and speculative-doubt passes. Raises doubts on the diff.

**Round 2 (implementer):** For each doubt, responds:
- *"You're right, I missed that"* — revisits KNOWLEDGE, switches to the proper atom.
- *"This is intentional"* — leaves a **strong-no** sub-comment defending the choice.

Output ships at the end of Round 2.

The strong-no is a contract: the implementer takes ownership of a deliberate choice, and the reviewer respects it. This prevents infinite loops where doubt and counter-doubt circle forever.

The two-round shape matches the empirically-validated cadence of the existing `ds-client-constrained-execution` skill, which has not yet hit a hard stop in real use. If real Pastiche workloads show two rounds insufficient, the bump path is to three rounds with a final-round exit ritual (§19).

### 7.6 Why this is asymmetrically safe

False positives in speculative doubt are cheap: the implementer simply responds with strong-no, costing one extra round. False negatives (a real DS violation missed) are expensive: it ships.

The mechanism deliberately tilts toward over-doubting. The reviewer is encouraged to flag anything plausibly suspicious; the implementer's strong-no is the release valve.

### 7.7 Strong-no abuse: trusted to persona

A natural concern: what stops the implementer from defaulting to strong-no on every doubt to escape work? Pastiche v1's answer is **the persona**. The implementer is framed as a faithful pastiche artist who suppresses personal style in service of fidelity. That framing cuts against lazy strong-nos. Surfaced strong-nos also reach human PR reviewers (§10), providing a post-hoc check on systemic over-defense.

If real runs show strong-no abuse, a future iteration may add a one-round reviewer re-flag for thin strong-no reasoning. v1 does not include this.

### 7.8 Anti-patterns are derived, not declared

A natural temptation is to maintain an `ANTIPATTERN.md` listing things like "raw `<button>` is forbidden, use Button." Pastiche does not do this, for two reasons.

First, **anti-patterns are DS-relative**. "Raw `<button>` is bad" is true only in design systems with a Button component. "Raw `<svg>` is bad" only where Icon exists. "Raw grid div is bad" only where Grid exists. There is no universal list.

Second, **the anti-pattern boundary is already encoded by FACT and KNOWLEDGE**. If FACT contains a component matching a raw pattern, it is potentially an anti-pattern; speculative doubt catches it. If KNOWLEDGE maps a scenario to atoms that are not what the implementer chose, it is potentially mode C; speculative doubt catches that too. No fourth document is needed.

---

## 8. The Loop Does the Work

Many implementer/reviewer systems make the reviewer heavy in an attempt to catch every issue in one round. Pastiche does the opposite: **the reviewer is intentionally minimal and heuristic, and the loop carries the depth.**

The depth comes from three places:

- **Doubt → correction:** when the reviewer's heuristic doubt hits a real failure, the implementer revisits KNOWLEDGE and corrects in Round 2.
- **Doubt → defense:** when the doubt is a false positive, the implementer defends with strong-no, and the reviewer accepts.
- **Compounded validation:** when correction introduces a new atom, that atom triggers its own tagged WISDOM lookup automatically — deeper compositional validation happens for free in Round 2, without the reviewer having to plan for it.

The reviewer is **not the source of truth**. It is a filter that throws suspicion back. The thinking happens on the implementer's side, where KNOWLEDGE is available. This division is what lets the reviewer stay so light: every check it performs is either mechanical (FACT, WISDOM tags) or heuristic (speculative doubt), and the loop converts both into authoritative validation through iteration.

The loop is **bounded at two implementer rounds** (§7.5). Compounded validation is a feature, not a license to iterate indefinitely.

---

## 9. The System's Invariant

One sentence governs everything else:

> **What KNOWLEDGE and WISDOM say must be followed.**

Every other rule is a mechanism to preserve this invariant:

- The implementer's conservative posture (no speculative atom selection when KNOWLEDGE lacks a fitting mapping) prevents silent invariant violations through guesswork.
- The reviewer's FACT pass prevents invariant violations through hallucination.
- The reviewer's speculative doubt pass surfaces all three failure modes (component omission, token omission, wrong choice) for re-examination.
- The reviewer's WISDOM pass catches direct violations of explicit rules.
- Tag-based lazy loading scales WISDOM enforcement with project size.
- The strong-no contract resolves false-positive doubts without infinite loops.
- The atom-only WISDOM tag discipline (§3.3, §4) keeps the tag system grep-deterministic.

Pastiche's coherence comes from the fact that all of its mechanisms collapse onto this single invariant.

---

## 10. KNOWLEDGE.md as a Living Document

The doubt-defense dialogue produces a self-fueling improvement loop for KNOWLEDGE.md.

1. Implementer encounters a scenario without a fitting mapping and falls back to raw.
2. Reviewer raises a speculative doubt: *"FACT contains X — should this have been X?"*
3. Implementer responds with strong-no (genuinely no fitting mapping in KNOWLEDGE).
4. The strong-no comment, surfacing in PR review, signals to a human (designer or senior FE) that KNOWLEDGE is missing coverage for this scenario.
5. The team adds the missing mapping to KNOWLEDGE.md.
6. The next time the scenario appears, the mapping exists and the implementer uses it.

KNOWLEDGE's gaps become contribution prompts, surfaced as concrete, in-context strong-no comments rather than discovered through retrospectives. The system tells the design system team where to invest, in the language they already work in.

---

## 11. The Philosophy of Lightness

> *The lighter the skill, the better.*

This conviction shaped many decisions:

- **No fourth document** (anti-patterns are derived through speculative doubt, not declared).
- **Reviewer does not read KNOWLEDGE** (responsibility minimization).
- **Tag-based lazy loading** (context economy).
- **Optional intent comments on the implementer side** (no self-declaration burden — doubt is reviewer-driven).
- **Loop carries the depth, bounded at two rounds** (don't try to catch everything in one round; don't iterate forever either).
- **Calibration via persona, not rules** (no rule lists; framing does the work).
- **No domain tags on WISDOM** (atom-only; scenario context lives in KNOWLEDGE).

Lightness here is not measured by abstraction elegance but by **actual LLM call burden**. A skill that abstracts beautifully but spends 10 calls per task is not light. A skill that does three documents, two subagents, and a two-round loop is.

---

## 12. Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                     pastiche skill                      │
│                                                         │
│   ┌──────────────────┐         ┌──────────────────┐     │
│   │   IMPLEMENTER    │ ──────► │     REVIEWER     │     │
│   │ (Senior FE)      │  code   │ (DS-expert       │     │
│   │                  │ ◄────── │  persona, light) │     │
│   │ Reads:           │  doubt  │                  │     │
│   │  KNOWLEDGE.md    │         │ Reads:           │     │
│   │  WISDOM.md (tag) │         │  FACT.md         │     │
│   │                  │         │  WISDOM.md (tag) │     │
│   │                  │         │  task description│     │
│   └──────────────────┘         └──────────────────┘     │
│            │                            │               │
│            └──── doubt ↔ defense ───────┘               │
│                  (2 implementer rounds)                 │
└─────────────────────────────────────────────────────────┘

         ┌────────────────────────────────────────┐
         │ FACT.md      auto-extracted catalog    │
         │ KNOWLEDGE.md curated scenario→atom map │
         │ WISDOM.md    tagged atom-intrinsic     │
         │              rules, organic            │
         └────────────────────────────────────────┘
```

**Implementer reads:** KNOWLEDGE.md (constructive) + WISDOM.md by tag (atom-intrinsic rules)
**Reviewer reads:** FACT.md (truth) + WISDOM.md by tag (rule violations) + task description (for doubt)
**The loop converts a light reviewer into a deep verification process through doubt-defense dialogue, bounded at two implementer rounds.**

---

## 13. Reviewer Scope: Design System Only

A natural question is whether the reviewer should also check code quality (naming, structure, formatting) or task fulfillment (does this code do what the task asked?). Pastiche says **no** — the reviewer's scope is strictly the design system.

### 13.1 Why scope-narrow

**Identity.** Pastiche is a skill for *DS faithful execution*, not a general-purpose code reviewer. A skill must declare what it is responsible for so it can be composed with other tools. Code quality is what ESLint, Prettier, and the type system handle. Functional correctness is what tests and human PR review handle. Pastiche fills the gap those tools cannot fill.

**Loop economics.** The more concerns the reviewer carries, the more feedback per round, and the longer the loop takes to converge. Real DS violations get diluted among style nits. Concentrating the reviewer on DS keeps the signal-to-noise ratio high.

**Philosophy preservation.** The asymmetry of "implementer constructive and heavy, reviewer verificational and light" depends on the reviewer's job staying small. Once the reviewer also checks code quality and task correctness, it becomes another senior engineer, and the asymmetry collapses.

**Tool fit.** Lints catch deterministic style issues with zero LLM cost. The LLM should be spent on what only an LLM can do — judging whether a `Stack + gap` choice coheres with the task description in the spirit of the design system. Lints cannot do that. Tests cannot do that. Pastiche can.

### 13.2 What about task fulfillment?

Task fulfillment splits into two parts:

- **Functional correctness** — does the code actually behave as the task requires? This is outside the reviewer's scope. Tests and human review handle it.
- **DS-aligned task fit** — does the chosen UI shape match what the task asked for, judged through the design system? This is *already inside speculative doubt*. When the reviewer asks "you used List + Tile but the task is an image-and-title list — is this intentional?", that is task fit verification. It is not a separate pass; it is a natural consequence of giving the reviewer the task description.

So task fit is checked, but only through the DS lens. The reviewer never asks "does this button actually submit the form?" — that is not its job.

### 13.3 What the reviewer explicitly does *not* do

- Code style, formatting, naming conventions.
- Type correctness (TypeScript already does this).
- Test coverage or test quality.
- Functional behavior verification.
- Performance optimization.
- Accessibility audits *outside of* DS-mandated patterns. (If WISDOM says "every Modal must have an accessible label," that is enforced. General a11y review beyond what WISDOM encodes is not.)
- **Aesthetic / UI-designer review.** Pacing, hierarchy, typographic rhythm, brand fit beyond mechanical rules — handled by a separate, on-demand skill (§15), not by the gating loop.

This is the line that keeps Pastiche composable with the rest of a team's toolchain.

---

## 14. Tooling

Pastiche v1 ships two small scripts. Both are mechanical, not LLM-driven, and both are necessary for the system's invariant to hold over time.

### 14.1 FACT extraction

A script reads the project's component library source (TypeScript declarations, theme tokens, package barrel exports) and produces FACT.md. Regenerated on every codebase change as part of the DS build pipeline.

The extraction strategy is project-specific (TypeScript types, Storybook story metadata, design-token CSS, etc.). v1 ships a TypeScript-types extractor for the KISA validation case. Other projects can swap in their own extractor; the contract is just "produce FACT.md in the documented shape."

### 14.2 WISDOM tag lint

A CI script greps every `[atom]` tag from WISDOM.md and verifies the atom name appears in FACT.md. Stale tags fail CI with a clear message:

> `WISDOM.md line 47 tags [Modal] but FACT.md has no Modal — was it renamed or removed?`

This is the only mechanism standing between WISDOM and silent rule loss when the underlying DS evolves. Without it, a component rename leaves orphan WISDOM entries that no atom-name grep will ever surface, and the §9 invariant erodes silently.

The lint is small (~30 lines), runs in seconds, and fails closed. It is not optional.

Future workflow scripts (release tooling, KNOWLEDGE diff reports, etc.) may join the toolchain over time; v1 ships only these two.

---

## 15. Aesthetic Review: A Separate Future Skill

Pastiche's reviewer is mechanical and DS-scoped (§13). UI-designer judgment — pacing, hierarchy, typographic rhythm, brand fit beyond mechanical rules — is not what the gating loop does, and trying to make it do so would collapse the §5 asymmetry.

A separate, on-demand skill (planned, not part of v1) will provide aesthetic review. It loads the brand prose section of KNOWLEDGE.md plus general UI/UX and frontend design knowledge, and offers a designer-perspective pass on a finished surface. The developer invokes it when they want one; it does not gate.

Keeping aesthetic review out of Pastiche's loop preserves the two-doc-load asymmetry and the loop's economic shape. It also lets the aesthetic skill evolve independently — different cadence, different audience, different inputs.

---

## 16. Deferred: Reverse KNOWLEDGE

A mechanism considered and intentionally postponed: **auto-generated reverse-knowledge entries injected into WISDOM.md**.

The idea: every KNOWLEDGE entry (`scenario → [atoms]`) has a natural inverse (`[atoms] → recommended for scenario`). The inverse could be auto-generated and merged into WISDOM as additional tagged entries. The reviewer's WISDOM grep would then surface, for each atom in the code, what scenario that atom is the recommended choice for — letting the reviewer compare against the task description and detect failure mode C (wrong choice) more rigorously, even without reading KNOWLEDGE.

Why deferred:

- **Speculative doubt likely covers mode C already.** The DS-expert persona ("List + Tile for an image-and-title list is unusual; Grid + Card is conventional") catches the typical version of this failure without any new mechanism.
- **Real complexity cost.** Reverse KNOWLEDGE introduces an auto-generation pipeline, splits WISDOM into human-authored vs. machine-generated sections with distinct lifecycles, and creates sync hazards when humans edit machine-generated entries. This also violates the atom-only / scenario-pure separation the system relies on.
- **Premature optimization risk.** Until speculative doubt is tested in practice, it is not clear the additional rigor is needed.

If speculative doubt proves insufficient on real workloads — particularly for organizations where DS conventions are highly specific and not aligned with mainstream LLM priors — reverse KNOWLEDGE returns as a v2 candidate.

---

## 17. What Pastiche Is Not

- **Not a design system itself.** Pastiche is consumed by an existing design system + component library.
- **Not a code generator from scratch.** It executes scoped frontend tasks within an existing codebase.
- **Not a general code reviewer.** Code quality, type checking, and functional correctness belong to other tools (see §13).
- **Not an aesthetic reviewer.** Brand fit beyond mechanical rules is a separate future skill (§15).
- **Not a replacement for DESIGN.md** in domains where DESIGN.md is sufficient (pure visual prototyping with primitive tokens). Pastiche addresses the DS + component library case.
- **Not opinionated about which design system you use.** FACT is extracted from your code; KNOWLEDGE and WISDOM are written by your team.
- **Not a runtime UI generation protocol.** Pastiche operates at build time, producing source code.

---

## 18. v1 Validation: KISA

Pastiche v1 is validated directly against the KISA design system and the live KISA client migration. The existing `ds-client-constrained-execution` skill is the empirical baseline: its two-round cadence, its trust-the-LLM posture against a single facts doc, and its track record of not hitting a hard stop are the precedents Pastiche v1 generalizes from. KISA's `web` and `form` packages provide the multi-package case for FACT extraction (§14.1) to handle.

There is no parallel shadow stack. Pastiche replaces the current docs-and-agents arrangement in place.

---

## 19. Open Questions and Future Work

These are not blockers — they are areas where the system will be refined as it meets reality.

- **KNOWLEDGE.md curation cost.** How much effort does a mature DS team need to invest to keep KNOWLEDGE useful? The hypothesis is that the strong-no feedback loop (§10) makes this incremental rather than upfront.
- **FACT extraction tooling for non-TypeScript-types projects.** v1 ships a TS-types extractor. What is the right strategy for projects where types are loose, missing, or where the truth lives in Storybook / design-token CSS / sidecar metadata?
- **Speculative doubt calibration.** How does the reviewer persona prompt evolve as real runs surface noisy or missed doubts? Calibration is empirical and prompt-driven (§7.2), not rule-based.
- **Two-round vs. three-round loop.** v1 caps at two implementer rounds (§7.5). If real workloads show two rounds insufficient — particularly for tasks where compounded validation surfaces important issues late — bump to three rounds with a final-round exit ritual where the implementer must correct or strong-no every remaining doubt before shipping.
- **Strong-no abuse mitigation.** v1 trusts the persona (§7.7). If empirical signal shows systemic over-defense, add a single reviewer re-flag round for thin strong-no reasoning.
- **Reverse KNOWLEDGE re-evaluation.** If speculative doubt proves insufficient for failure mode C in DS-specific contexts that diverge from mainstream LLM priors, revisit the deferred mechanism (§16).
- **Aesthetic review skill design.** The separate skill (§15) is sketched, not specced. Its inputs, invocation pattern, and relationship to Pastiche's gating loop are future work.

These will be answered by use, not by speculation.
