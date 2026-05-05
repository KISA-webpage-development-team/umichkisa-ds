# Building Pastiche

The fifth entry in this series. The first four —
[Building umichkisa-ds from Scratch](building-the-design-system.md),
[Auditing the Docs App](auditing-the-docs.md),
[Theme-Inline & Circular Tokens](theme-inline-circular-tokens.md), and
[Migrating the Client to the Design System: Phase -1 ~ 2](migrating-the-client-neg1-to-2.md)
— were all about the design system as a thing-in-itself: building it,
documenting it, and then pointing it at its first consumer. This one is
different. **Pastiche is not a KISA artifact.** It is a project-agnostic
skill that happened to be built and validated against KISA, and that has
since replaced the KISA-specific execution layer the migration was running
on.

This is the story of why I stopped extending the KISA-specific harness and
started writing a general primitive instead — and what changed when the
general primitive landed back in the migration.

## Context

By the end of Phase 2 I had eight phases of evidence on what worked and
what didn't in the per-task execution layer. The shape was:

- A single skill, `ds-client-constrained-execution`, drove every
  `.tsx`-touching task in the migration. Two modes (`[TDD]`, `[NO-TDD]`),
  a four-step gate chain (implementer → DS review → Toss FE review →
  typecheck → commit), and an autonomous-mode toggle that turned every
  unresolved BLOCK into a `needs-decision` PR comment.
- A reviewer agent, `ds-client-review`, read its own ruleset
  (`docs/DS_CLIENT_USAGE.md`) and returned structured violations.
- A second reviewer agent, `toss-fe-review`, did general code-quality
  review with its own severity gate (BLOCK / SUGGEST / INFO).

The whole arrangement worked. Phase 1 and Phase 2 shipped 33 lanes
through it, and the cadence was empirically stable — two implementer
rounds rarely failed to converge in real use.

But everything in that paragraph names KISA. `DS_CLIENT_USAGE.md` is a
KISA doc. `ds-client-review` is wired to it. The skill's "Redesign over
Preserve" framing references `text-foreground` / `text-muted-foreground`
by name. Every artifact assumed there was one design system, one client
app, and one team — KISA's. That had been fine while KISA was the only
project. It was no longer fine.

The other thing nagging at me: the *shape* of the system — implementer
that reads docs and writes code, reviewer that reads docs and raises
flags, two-round bounded loop, trust the LLM persona instead of
encoding rules — was clearly the *right* shape. It was just buried inside
KISA-specific text. There was a general primitive in there waiting to be
extracted.

## Why I Built It

Three impulses lined up:

1. **DESIGN.md stops short.** Google's [DESIGN.md](https://github.com/google-labs-code/design.md)
   (used in Stitch) showed that a single curated doc can encode a design
   system's tokens and patterns well enough for an LLM to generate
   visually consistent UI. It's a real primitive. But mature engineering
   teams don't work with raw tokens — they work with `<Button
   variant="primary" />`. DESIGN.md doesn't model the component-library
   layer. The whole premise of `ds-client-constrained-execution` was to
   bridge that gap, but only for KISA. A general bridge wanted to exist.

2. **The asymmetry was implicit, not designed.** In the old skill, the
   implementer "knew everything" because both implementer and reviewer
   had access to the same docs. They differed only in workflow, not in
   epistemological role. That muddied the kinds of checks each was doing
   and made calibration harder than it needed to be. I wanted the
   asymmetry to be *the design*, not an accident of which file each
   subagent read.

3. **The migration still had three phases left.** Phases 3, 4, 5 weren't
   shipped. Whatever I built next would be tested in production by Phase
   3 within days. Bad timing for a green-field rewrite, perfect timing
   for one — the validation loop was as tight as it would ever get.

## The Three Documents

The core insight came out of grilling with myself on 2026-04-29. The old
skill had one consumer-side doc (`DS_CLIENT_USAGE.md`) doing three jobs
that didn't actually go together:

1. Listing every component, prop, and token that exists.
2. Telling implementers *which* components fit *which* scenarios.
3. Encoding atom-intrinsic rules (e.g. "every Modal must have an
   accessible label").

These have different lifecycles. The catalog (#1) is regenerable from
source — it's mechanical. The scenario map (#2) is judgment-heavy and
hand-curated. The rules (#3) grow organically as edge cases surface.
Putting them in one doc meant the doc was always wrong in *some* dimension
— too volatile, too fragile, or too verbose to load fully into context.

So pastiche has three docs at the project root under `pastiche/`:

| Doc | Role | Lifecycle | Author |
|---|---|---|---|
| `FACT.md` | Atom catalog | Auto-extracted on every codebase change | Mechanical script |
| `KNOWLEDGE.md` | Scenario→atom mappings + brand prose | Grows as scenarios appear | Designers + engineers |
| `WISDOM.md` | Atom-intrinsic rules, tagged by atom | Grows organically | Designers + engineers |

Tags on WISDOM entries match FACT atoms verbatim. Agents grep WISDOM by
atom name; they never load it whole. This is the lazy-loading mechanism
that lets WISDOM grow without bloating context. The cross-doc tag-sanity
lint (Phase 4) verifies every WISDOM tag and every KNOWLEDGE atom
reference resolves to a FACT entry. The lint is ~50 lines and fails
closed.

This separation is the one architectural decision the rest of pastiche is
downstream of. Most of what looks elegant about the system is a direct
consequence of the three-doc split.

## The Implementer/Reviewer Asymmetry

Once the docs were split, the asymmetry I wanted *fell out* of the
design instead of having to be enforced.

- **Implementer** reads `KNOWLEDGE.md` (full) + greps `WISDOM.md` by
  atom tag. It travels *from scenario to atoms*: "given this task, what
  atoms compose the answer?" Persona: senior frontend engineer.
- **Reviewer** reads `FACT.md` (full) + greps `WISDOM.md` by atom tag,
  plus the task description. It travels *from atoms to rules*: "given
  what's in the code, do the atoms exist, do the rules hold, do the
  choices cohere with the task?" Persona: senior FE engineer with deep
  DS expertise. **The reviewer never reads KNOWLEDGE.**

The "never reads KNOWLEDGE" rule is the load-bearing one. If the
reviewer reads the same doc the implementer read, it's just doing
implementation in reverse — the system has no signal when the
implementer guessed wrong from KNOWLEDGE itself. By blinding the
reviewer to KNOWLEDGE, the reviewer's doubts are forced to come from
*independent* grounds (FACT + WISDOM + DS-expert prior), and the
implementer's defended-with-knowledge-gap dispositions become a real
signal that KNOWLEDGE has a coverage hole.

The full mechanism is a two-round loop:

1. **Round 1 implementer** writes the code.
2. **Reviewer** raises doubts as a strict-YAML list (`file`, `line`,
   `comment` per item).
3. **Round 2 implementer** dispositions each doubt: `corrected`,
   `defended`, `defended (knowledge-gap)`, `defended (wisdom-gap)`.
4. The **skill** scans for any doubt round 2 silently dropped or marked
   unresolved, and writes a `// pastiche-unresolved-doubt:` comment
   inline at the offending `file:line` as a failsafe. This is the only
   inline comment the protocol introduces. Convergent runs leave none.

Spec §13 explicitly carves out what the reviewer does *not* do: code
style, types, tests, functional behavior, performance, general
aesthetics, ad-hoc accessibility (only WISDOM-encoded a11y counts).
Keeping the reviewer scope narrow is what lets the asymmetry survive.
Once the reviewer also reviews code quality, it becomes another senior
engineer and the asymmetry collapses.

## How the Build Went

10 phases planned in `pastiche/high-level-plan.md`:

| Phase | What | Status |
|---|---|---|
| 1 | Vertical slice (Button family, hand-written FACT/KNOWLEDGE/WISDOM) | done |
| 2 | Doc templates abstracted from the slice | done |
| 3 | FACT extractor script + KNOWLEDGE seeding + WISDOM seeding | done |
| 4 | Cross-doc tag-sanity lint | done |
| 5 | `pastiche-implementer-round1` + `pastiche-implementer-round2` agents | done |
| 6 | `pastiche-reviewer` agent | done |
| 7 | `pastiche` orchestration skill | done |
| 8 | Cutover (CLAUDE.md / AP / HARNESS Mode D → pastiche) | done |
| 9 | Aesthetic review skill (separate, on-demand) | not started |
| 10 | KNOWLEDGE / WISDOM curation skills (closes §10 living-document loop) | not started |

Phases 1–8 shipped in **two active days** (2026-04-29 → 2026-05-01,
~37 commits) — KISA was paused; this was the only thing in flight. The
phases were small on purpose: each one had a single deliverable and a
clear gate to the next.

A few decisions that were grilled hard and are worth recording:

- **Per-agent isolation discipline.** Each agent prompt knows about its
  inputs and produces its outputs — nothing else. No agent prompt
  references "round 1," "round 2," "the loop," "the other agent," or
  "the parent skill." This kept slipping in during early drafts (e.g.
  the reviewer prompt said "the implementer can defend a deliberate
  choice in the next round"). Each leak got hunted out and committed
  separately. The discipline matters because the next time a project
  reuses pastiche, none of those orchestration assumptions will hold.

- **Reviewer model choice.** Opus, not Sonnet. The asymmetry says false
  negatives ship and false positives cost a round; spending Opus on the
  doubt-raiser maximizes catch rate. Round 2 stays on Sonnet because
  its work is narrower (per-doubt disposition).

- **Doubt list as strict YAML.** Earlier drafts had loose 3-bullet
  markdown that the spec rendered as broken YAML (three top-level list
  items per doubt, not one map). The contract is now one map per doubt,
  parseable by `yaml.safeLoad`. This is agent-to-agent transport — no
  human reads it — so machine-parseability wins.

- **`wisdom-gap` was added late.** Round 2 originally only had
  `knowledge-gap` as a tagged disposition. A real run on the second
  test prompt (a multi-field RSVP form) made the asymmetry visible: the
  reviewer surfaces atom-intrinsic concerns (a11y on a Modal, char
  counter conventions on a textarea) that don't have a KNOWLEDGE
  scenario but plausibly want a WISDOM rule. Adding `wisdom-gap` parallel
  to `knowledge-gap` made both KNOWLEDGE and WISDOM gaps surface
  symmetrically through the same disposition machinery.

- **No symlink, no client-repo commit.** Earlier I planned to symlink
  `pastiche/` from the DS repo into the client repo so worktrees would
  inherit the docs. Then the question came up: do we even need that?
  Pastiche runs from the DS-repo cwd; the implementer agents edit files
  in the worktree via the paths they're given. The skill's preflight
  finds `pastiche/{FACT,KNOWLEDGE,WISDOM}.md` locally. No symlink, no
  ceremony.

## What Changed in the Migration

Phase 8 was the cutover. Concretely:

- **`CLAUDE.md` Mode D** routes to `pastiche` instead of
  `ds-client-constrained-execution`. CLAUDE.md got *smaller* — the post-
  pastiche walkthrough lives in AP §3.3 (lazy-loaded only when Mode D is
  confirmed), per the universal-load minimization principle.
- **AP §3.4 added** to mirror §3.3 for Mode C1 (live PR review of
  autonomous-shipped PRs). Same suggest-don't-auto-run pattern for
  `vercel-react-best-practices`, `toss-frontend-fundamentals`, and
  `review-ui-on-browser`.
- **AP §5 issue template** dropped its `## Execution skill` field — there
  is one execution skill now and the routine hardcodes it.
- **AP §8 bailout table** was reshaped: dropped the "DS gap discovered →
  ds-fix-during-migration" row (no auto-fix anymore — DS gaps bailout to
  draft + `needs-decision`); added an "unresolved-doubt markers present"
  row.
- **The autonomous routine prompt** (now versioned at
  `ROUTINE_PROMPT.md`) lost the BLOCK-escalation paragraph, the
  live/autonomous toggle, and the per-lane skill parameter. It's
  noticeably shorter.

The functional change for a Mode D session: you used to invoke the old
skill and get a per-task gate chain that did everything end-to-end (gate
→ commit). Now you invoke pastiche and get a focused DS-execution loop;
typecheck, optional code-quality reviews, and commit are explicit caller
steps. The split is faithful to spec §13's narrowing of scope, and the
walk-through in AP §3.3 makes the new caller contract concrete.

The functional change for the autonomous routine: bailout is simpler.
There's one failure surface (inline `// pastiche-unresolved-doubt:`
markers), one no-marker-scan check before opening PR, and the rest of
the gate chain is gone. False negatives on DS issues drop to whatever
pastiche's reviewer misses; false positives drop to whatever the human
reviewer flags during Mode C1.

## What Worked

### 1. Empirical validation came early and was honest
Two test prompts during build-out — a newsletter signup and a
multi-field RSVP form. Token usage:

| Run | R1 (Opus) | Reviewer (Opus) | R2 (Sonnet) | Total | Wall |
|---|---|---|---|---|---|
| Newsletter | 38.1k / 21 / 1m49s | 25.4k / 5 / 28s | 18.0k / 10 / 56s | 81.5k | 3m13s |
| RSVP form | 41.7k / 21 / 2m48s | 29.5k / 5 / 37s | 26.9k / 16 / 1m41s | 98.1k | 5m6s |

The reviewer was identical (5 tool uses both runs) — bounded by number
of changed files, not their complexity. R1 cost barely scaled with
complexity (+9% tokens for a much harder task) because the base cost is
codebase exploration, which is fixed-ish. R2 was the variable cost. The
asymmetry held in practice, not just on paper.

The output quality of both runs was honestly higher than I expected —
the RSVP form had inline validation, a live char counter, conditional
success rendering, and a check icon, all in DS-faithful shape, in five
minutes. That's the strongest signal the system is delivering on its
promise.

### 2. Asymmetry by design > asymmetry by accident
Naming the asymmetry (spec §5.3) as the central invariant changed every
downstream decision: which doc each agent reads, what tools each has,
which model each uses, what each prompt says (and doesn't say). The old
skill *also* had asymmetry, but it wasn't the design — it was a
side-effect of two subagents happening to do different things. Once you
make the asymmetry the design, the calibration knobs are obvious.

### 3. Strict isolation discipline on agent prompts
Every agent prompt edit that mentioned "rounds" or "the other agent" or
"the loop" got reverted in a follow-up commit. That discipline was
annoying to enforce in real-time, but it's what makes the agents
actually project-agnostic. A KISA-shaped reviewer prompt would not work
for a project with a different review cadence; a generic one does.

### 4. The cutover was small
The Phase 8 PR touched four files — CLAUDE.md, AP, HARNESS_DESIGN, and
the high-level plan. Plus a tracked routine prompt. All the migration
process docs converged on one execution skill name; nothing else needed
to know how it worked internally. That smallness is the signal that the
encapsulation worked.

## What Didn't / Open Questions

### 1. The old skill is still on disk
`.claude/skills/ds-client-constrained-execution/SKILL.md` was left in
place as part of the cutover. Cleanup is a separate concern from the
switch. Removing it cleanly will require checking that no in-flight
phase plan or open PR references it. Deferred.

### 2. Project-agnostic in design, KISA-validated in practice
Pastiche v1 has been tested against exactly one design system. The spec
makes claims about extraction strategies for non-TypeScript-types
projects (§14.1), about persona calibration empirics (§7.2 / §19), and
about KNOWLEDGE curation cost in mature DS teams (§19) — all of which
are honest open questions until a second project adopts the skill. KISA
is the testbed, not the audience.

### 3. Phases 9 and 10 are the actual closure
Phase 9 (aesthetic review skill) and Phase 10 (KNOWLEDGE/WISDOM
curation skills) are the missing pieces. Without Phase 10, the
`Follow-ups` items pastiche surfaces accumulate without absorption —
the §10 living-document loop is a half-loop. Phase 10 is the doc-
curation half. Until it lands, the curation step is "manually edit the
file." Workable, but not the design.

### 4. Calibration is empirical and untested at volume
The reviewer's persona is "lean toward doubt; missing a violation is
worse than flagging one." That's the right tilt for v1, but only real
volume of runs will tell whether the calibration is right. The spec
parks every calibration knob in `_iteration-notes.md` for now; PR-by-PR
data from Phase 3+ will be the empirical input that moves them.

### 5. The two-round bound has not been stress-tested
Spec §7.5 caps the loop at two implementer rounds because that matches
the empirical cadence of the old skill. If three rounds turn out to be
necessary on harder tasks (e.g. compounded validation surfacing late),
the bump path is documented (§19) but not implemented. v1 ships at two.

## By the Numbers

| Metric | Value |
|--------|-------|
| Window | 2026-04-29 → 2026-05-01 (2 active days) |
| Phases shipped | 1–8 (of 10 planned) |
| Phases remaining | 9 (aesthetic), 10 (doc curation) |
| Total commits | 37 |
| Spec size | 530 lines |
| Three-doc total (KISA seed) | FACT 729 + KNOWLEDGE 274 + WISDOM 98 = 1,101 lines |
| Skill size | `pastiche/SKILL.md` 62 lines |
| Agent sizes | round-1 48 + reviewer 89 + round-2 79 = 216 lines |
| Round 1 model | Opus |
| Reviewer model | Opus |
| Round 2 model | Sonnet |
| Test runs | 2 (newsletter, RSVP form) |
| Lowest test-run token total | 81.5k |
| Highest test-run token total | 98.1k |
| Reviewer tool uses (both runs) | 5 |
| Old skills/agents superseded | 1 skill (`ds-client-constrained-execution`) + 2 agents (`ds-client-review`, `toss-fe-review` as in-loop gate) |
| New skills | 1 (`pastiche`) + 1 future (Phase 10 KNOWLEDGE/WISDOM curation) |
| New agents | 3 (`pastiche-implementer-round1`, `pastiche-reviewer`, `pastiche-implementer-round2`) |

## v1.1 — Tightening Pass (2026-05-05)

A few days into using pastiche as the live execution layer, three pain
points showed up across real runs:

1. **Round 1 was reading the DS package source.** Despite the spec's
   "FACT.md is the only source of truth" framing, R1 was occasionally
   greeping `node_modules/@umichkisa-ds/web/**/index.d.ts` to verify
   prop shapes. Positive guidance ("FACT is your catalog") wasn't
   enough — the negative case had to be stated explicitly.
2. **WISDOM grep duplication.** R1 would run two overlapping multi-tag
   greps as it discovered atoms incrementally — same WISDOM rules read
   twice within one round. Cause was a workflow gap: no instruction to
   sweep KNOWLEDGE first, collect the full atom set, then grep WISDOM
   once.
3. **Reports were too descriptive.** R1 emitted an `## Implementation
   summary` field the orchestrator never used. R2 emitted a per-doubt
   enumeration where corrected dispositions could be inferred from
   `## Files changed`. The reviewer emitted four prose sections on top
   of its YAML doubt list. All three carried structure no consumer
   actually parsed.

The fixes were small and stayed inside the agent prompts and SKILL.md
— no spec rewrite, no architectural change.

| Change | Where |
|---|---|
| Added `## Hard constraint` section banning `node_modules/<ds-pkg>/**` and `packages/<ds-pkg>/**` reads | all three agents |
| Reframed reviewer persona from "senior FE engineer with deep DS expertise" to "senior UI/UX designer with deep fluency in this project's design system — fluent enough to read code" | reviewer |
| Reordered R1 workflow to a single multi-tag WISDOM grep after the full KNOWLEDGE sweep; R2 only re-greps for atoms not already in R1's `## Atoms used` | R1, R2 |
| Reviewer output stripped to YAML-only (no headings, no prose) | reviewer |
| R1 report dropped `## Implementation summary`; `## Files changed` is paths only; `## Atoms used` is a list, no descriptors | R1 |
| R2 report restructured: corrected dispositions implicit in `## Files changed`; only `## Defended` (with optional gap-tag) and `## Unresolved` remain | R2 |
| SKILL.md workflow rewritten with named-token data flow (`{task}`, `{r1_report}`, `{doubts}`, `{r2_report}`) and step-numbered failsafe pointing at `r2_report`'s `## Unresolved` | skill |
| Added "Prefer DS atoms over raw HTML" line to R1 step 7 to address Sonnet's conservative-fallback behavior on compound atoms (Form.\*, etc.) | R1 |
| Added canonical 12-section taxonomy enforcement to KNOWLEDGE.md via `lint-tags.ts` | lint script |

The reviewer-as-designer reframe was the most opinionated change. The
old persona made reviewer and implementer feel like two senior
engineers reading the same problem — easy for the asymmetry to
collapse into "implementation in reverse." Naming the reviewer as a
designer who reads code cleanly enforces the verification angle: the
reviewer judges whether the *result* honors DS intent, not whether the
*construction* would have used the same atoms.

Token budget after the pass, on the same RSVP-form prompt the v1
build-out used:

| Run | R1 (Opus) | Reviewer (Sonnet) | R2 (Sonnet) | Total |
|---|---|---|---|---|
| RSVP form, v1 | 41.7k / 21t / 2m48s | 29.5k / 5t / 37s | 26.9k / 16t / 1m41s | 98.1k |
| RSVP form, v1.1 | 59.4k / 38t / 4m38s | 30.1k / 7t / 1m | 18.3k / 11t / 1m19s | 107.8k |

R1 went *up* — adding the hard constraint and the multi-tag-grep
discipline traded model-side speculation for a few more deterministic
tool calls. R2 came down because corrected dispositions stopped being
re-narrated. The reviewer was unchanged in cost; persona shift didn't
affect tool-use shape, which was the prediction. Net total moved
~10k upward, which the quality tradeoff (no node_modules reads, no
duplicate WISDOM greps, sharper reports) justifies for now. Next
calibration round will look at whether R1's Opus is still the right
choice or if the deterministic workflow makes it Sonnet-eligible.

The output shape on the RSVP form was visibly tighter than v1 — fewer
hallucinated props, no DS-package source reads, and R2 cleanly closed
all reviewer doubts in one round. The two-round bound is still
holding.

The discipline lesson from this pass: positive instructions describe
the happy path, but agents need explicit negative constraints for the
cases where the happy path has a tempting shortcut (reading the DS
package being the canonical example). Spec §13 already carved out
*what the reviewer doesn't review*; agent prompts now carve out *what
each agent doesn't read*.

---

The migration's first execution layer was KISA-shaped and worked
because KISA was the only consumer. Pastiche is the same shape, made
general, and validated by being plugged back into KISA as if KISA were
just another adopter. That round-trip — from the specific to the
general and back — is the point. The old layer was a working artifact;
the new one is a reusable primitive that happened to also be a working
artifact for the project that built it. Phase 3 of the migration starts
on the general primitive. If it survives the rest of the migration as
empirically as the old skill did, that's the validation.
