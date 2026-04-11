# Auditing the Docs App

A retrospective on how I drove 60+ documentation pages through a review → fix
pipeline in one week, using a single custom skill, the rule-discovery flywheel
it created, and what it ended up doing to the design system's constraint file.

## Context

This is the second retrospective in this series. The first —
[Building umichkisa-ds from Scratch](building-the-design-system.md) — covered
the three weeks where I shipped 38 components and v1.0.0. This one covers what
happened immediately after, when the docs app was complete on paper but had
never been audited as a unified surface.

The same lived constraints from the first retrospective still applied: Korean
Army service, off-duty hours only, development through a VSCode tunnel from a
computer room, no local dev environment. Those constraints mattered more in
this phase than they had in the first, because the audit harness had to survive
a flaky tunnel and a weak network under real load. Part of what this
retrospective is about is how the harness adapted to those constraints
mid-phase.

## Timeline

- **Start:** 2026-04-05 (first audit commit, `/foundation/colors/overview`)
- **End:** 2026-04-11 (wrap-up, this retrospective)
- **Duration:** ~7 active days
- **Commits:** ~318 in the audit window
- **Pages reviewed:** 62 (18 batches + index pages)
- **Fix plans written:** 60
- **New feedback memories born:** ~12 (audit-phase discoveries that became permanent rules)

## Scope

The audit covered every Foundation page (Colors, Typography, Layout,
Iconography — sub-pages included), every Components page, every Forms page,
and the three index pages (`/`, `/foundation`, `/components`). The only pages
left unclaimed at wrap-up are the home-page consumer example (blocked on the
client app migrating to `@umichkisa-ds/web`) and whatever I decide to backfill
in future. Everything else is checked.

## The Harness

At the start of the audit phase I spent one session building a single project-
scoped skill: `.claude/skills/review-docs-app-ui/SKILL.md`. This was the only
new piece of tooling the whole phase would introduce. Everything else was
existing — the `ds-constrained-execution` skill, the `ds-review` agent, the
`superpowers:writing-plans` skill, the `superpowers:using-git-worktrees` skill,
all reused from the component-build phase.

The skill orchestrated a 6-step per-page pipeline:

| Step | What |
|------|------|
| 0 | Pre-flight — load `DS_CONSTRAINTS.md`, read the page source |
| 1 | Desktop review at 1280px — three passes: DS violations, UX/styling, content |
| 2 | Mobile review at 375px — same three passes |
| 3 | Record findings; **invoke `grill-me`** to negotiate the final finding list with me |
| 4 | Human checkpoint; then `superpowers:writing-plans` → fix plan at `docs/plans/review-fix-<page>.md` |
| 5 | Update `docs/TODO.md` paired checkboxes |
| 6 | Handoff — either fix in the same session (optionally in a worktree) or write a fresh-session prompt |

The three review passes were a deliberate separation of concerns:

- **Pass A** — `ds-violation`. Manual cross-check against every rule in `DS_CONSTRAINTS.md`. Anything hit here was auto-tagged ≥ major.
- **Pass B** — layout, styling, UX, accessibility. Used the `ui-ux-pro-max` skill in review mode against the rendered page. This was the visual-taste layer — the part I couldn't encode as a constraint rule.
- **Pass C** — content. Read the source and rendered text for typos, unclear phrasing, and — mandatory — explicit redundancy checking across every section of the page.

Pass C's mandatory redundancy check was the single most productive part of the
review. "Does this section repeat what another section on the same page
already said?" is a question no component-phase harness had ever asked, and
once I started asking it, every page had at least one offender.

### Artifact shape

The harness wrote to three artifact shapes:

| Artifact | Path | Cardinality |
|---|---|---|
| Findings ledger | `docs/reviews/docs-app-review.md` | Single 835-line file, one section per page |
| Fix plan | `docs/plans/review-fix-<page>.md` | One per page, 60 total |
| Paired checkboxes | `docs/TODO.md` § Docs App UI Review | Two per page: `- [ ] Review` and `- [ ] Fix` |

The single findings file was a deliberate choice — one long ledger, append-only,
cheap to grep. At ~13 lines per page it never got unwieldy.

## Two Modes, Two Tempos

The audit phase had two distinct operating modes that the skill file never
distinguished. The transition between them is the single most interesting
thing about this phase.

|  | **Mode A — Browser-driven** | **Mode B — Source-driven** |
|---|---|---|
| When | First ~half | Second ~half |
| Input | Rendered page via Chrome MCP, 1280px + 375px | `page.tsx` source, read directly |
| Pass B input | Live screenshots | Source patterns matched against rulebook |
| Hard gate | Chrome extension required | No browser required |
| Per-page cost | High (slow browser, heavy token usage) | Low (tokens linear in source size) |
| Parallelism headroom | Bounded by browser stability | Trivially parallel |

I started the audit assuming Mode A was the only viable way to review UI. The
skill file's Step 0 has a hard gate that aborts if Chrome MCP isn't connected.
But Mode A turned out to be expensive in ways the spec hadn't anticipated:

- Each browser action was **slow** on the tunnel
- Screenshots and DOM snapshots **consumed a lot of tokens** per page
- The tunnel + weak unit hardware + multi-tab localhost would periodically return **500 errors** under load

At some point — I don't remember exactly when, but it was gradual, not a clean
cutover — I started reading the page source directly and mentally rendering
against the rulebook. I expected this would lose quality. It didn't. By the
second half of the audit, the rulebook (`DS_CONSTRAINTS.md` + accumulated
`feedback_*` memories) was precise enough that **source-reading was
isomorphic to visual review**. Almost every violation I would have caught on
screen, I could also catch in source, because the rules had hardened enough.

The clean framing: **the infrastructure forced Mode B; the matured rulebook
made Mode B survivable.** Rule maturity was a permission, not a cause. Without
the network friction I might have stayed on Mode A for another few batches
out of caution. And without the rulebook maturity, Mode B would have missed
things. It took both.

The skill file never got updated. Even at wrap-up, Step 0 of
`review-docs-app-ui/SKILL.md` still asserts the Chrome MCP hard gate. The
harness outgrew the spec and I never went back to rewrite it — by the time
Mode B was normal, I was running multiple parallel sessions and the higher-
leverage work was always "review the next page," never "update the doc about
reviewing the next page." That's a real retrospective lesson on its own.

## Batch-Gated Parallelism

The component phase parallelized at the **worktree-per-component** level —
each agent building one thing in isolation. The audit phase parallelized
differently, and it took me Q5 of this retrospective's grilling session to
name what I was actually doing.

**Intra-batch parallel, inter-batch serial.** A batch was 3–4 pages. Within a
batch I ran 3–4 sessions concurrently — one per page, each reviewing and
fixing in its own context. Between batches I let the dust settle before
starting the next fan-out.

The spec says batches exist "for human cognitive load." That's not wrong, but
it's incomplete. Batches were also **rule-stabilization checkpoints**. Between
batches, rule discoveries from the current fan-out settled into memory, got
absorbed into post-review sweeps, or (occasionally) got promoted into
`DS_CONSTRAINTS.md`. Only then would the next batch's 3–4 parallel sessions
start, each with the updated rulebook in context.

This confines rule-discovery fragmentation — the inherent risk of parallel
sessions missing each other's live discoveries — to the intra-batch window.
A batch is ~3–4 pages wide, so any rule discovered partway through a batch
could at worst be missed on 2–3 peer pages. Small enough to absorb, bounded
by the batch cadence. Fragmentation happened, but it was cheap.

It also explains why the first half of the audit phase was more conservative:
one batch at a time, Mode A, and only 3-ish parallel sessions. As Mode B took
over and per-session cost dropped, the parallelism stayed at the same shape
but each session got much cheaper, so throughput climbed without requiring a
structural change. The harness didn't become more parallel — it became
**cheaper per session**, which is the same thing in practice.

## The Three-Tier Rule Lifecycle

The audit phase's most surprising output wasn't the 60 fix plans or the 62
checked boxes. It was ~12 new design-system rules that graduated from "recurring
correction in a grill-me session" to "permanent structural behavior of the
design system."

Each rule moved through three tiers:

> **Tier 1 — Memory (discovery).** A rule is first observed as a recurring
> correction during a review or a grill-me pass. It lands in
> `~/.claude/projects/.../memory/feedback_*.md` so the next session starts
> with it already in context. Memory is the **staging ground.**
>
> **Tier 2 — Absorb or Sweep (application).** As more audits happen, the rule
> either gets absorbed into the natural per-page fix flow (invisibly applied
> going forward — Table migration, intro-paragraph colors, Alert conversions
> all went this route) or gets promoted to a `docs/TODO.md § Post-review
> sweeps` item when it's clearly bulk-shaped (required-prop asterisk,
> InlineCode migration, `<hr>` → `Divider`, heading `id` attributes, prev/next
> navigation).
>
> **Tier 3 — Constraint (permanence).** The rule graduates into
> `DS_CONSTRAINTS.md` where `ds-review` will auto-enforce it on all future
> work. A rule at Tier 3 is a rule the system can never forget.

I did not plan this three-tier lifecycle. It emerged, and I only noticed it as
a lifecycle during this retrospective's grill-me session. In practice I was
just reacting to what scale of pattern I'd spotted: small → remember and move
on; medium → queue a sweep; foundational → update the constraint file.

The examples of each tier trace out the evolution:

- **Tier 1 only** (stayed in memory): `feedback_h3_first_mt6`, `feedback_preview_width`, `feedback_type_weight_override`
- **Tier 2 sweep** (queued as explicit TODO sweep tasks): required-prop asterisk, InlineCode migration, `<hr>` → `Divider`, heading `id` attributes, prev/next nav
- **Tier 2 absorb** (folded into per-page fixes going forward): Table → `Table + TableMobileList` migration, intro-paragraph `text-foreground`, blockquote → `Alert`
- **Tier 3** (promoted to `DS_CONSTRAINTS.md`): the required-prop asterisk convention, and a correction to an existing link-underline rule that turned out to be wrong

## `DS_CONSTRAINTS.md` as an Audit Artifact

The constraint file was supposed to be the audit's *reference*. It turned out
to also be an *artifact*. Running it against 62 real pages stress-tested it
in three directions at once:

**It grew.** Commit `28251fd docs: add required-prop asterisk convention to
DS_CONSTRAINTS` added a brand-new top-level section: `## Documentation`. Before
the audit, every top-level category in the file was about components —
Colors, Typography, Layout, Iconography, Accessibility, Form Controls. The
audit phase pushed the top-level category count from **6 to 7** by adding
the first docs-specific category the constraint file had ever had.

**It was corrected in place.** Commit `e9d21af fix(docs): review + fix
/foundation/layout/overview` atomically modified both a page and a constraint
rule in a single commit:

```diff
- Must: Underline links by default (`underline`). Hover state: `text-brand-primary`. No separate visited style.
+ Must: Underline links on hover (`hover:underline`). Hover state: `hover:text-brand-primary`. No separate visited style.
```

The audit discovered a constraint was wrong — written from component-phase
assumptions about interactive links, not docs-content links — and fixed both
the rule and the pages that followed it, in the same commit.

**It shrunk.** Commits `21885d7`, `248306e`, `2aa8e78`, `a79dd61` — all trim
or deduplicate passes on `DS_CONSTRAINTS.md`. Running the constraint file
against 62 pages revealed its own redundancies. Reading it once a session for
a week straight turned up rules that were duplicates, rules that had migrated
to a better home, and rules that nobody's actual work ever touched.

So the constraint file wasn't just a reference — it was in the loop. The act
of running it across a wide surface area grew it where it was incomplete,
corrected it where it was wrong, and compacted it where it was redundant. It
came out of the phase **larger in coverage and smaller in total rule count
than it went in** — a strictly better document than its starting state.

## The Safety Valves That Didn't Bind

A recurring theme of this phase was **the harness being designed for
assumptions that didn't hold in either direction** — some tighter than
reality, some looser.

| Safety valve | Designed for | Reality | Result |
|---|---|---|---|
| Chrome MCP hard gate | Fast stable browser | Slow, token-heavy, flaky tunnel | Gate became an obstacle; I routed around it with Mode B |
| Review/Fix paired checkbox | Context budget might run out mid-page | Opus 4.6 + 1M context; never ran out | Split used opportunistically; nearly every page ran review + fix in one long session |
| Fresh-session handoff in Step 6 | Same as above | Same as above | Almost never used; I always picked "continue this session" |
| Optional worktree in Step 6 | Fixes might need isolation | `review-fix/<page>` branches became the default in the second half | Worktree-per-page re-emerged naturally, inheriting the component phase's primitive |

Two separate failure modes of spec design are visible here:

1. **Over-tight constraints.** Chrome MCP was a hard gate because the spec
   assumed visual review was necessary. The reality of Mode B made that
   assumption wrong. The spec became brittle.
2. **Under-tight constraints.** The review/fix split and the fresh-session
   handoff were designed for a smaller context budget than I actually had.
   They became vestigial — safety valves for a constraint that never bound.

The clean lesson: **harness design has to assume the operational environment
and the model capability, not the ideal of either.** The audit-phase harness
was written assuming an ideal browser and a budget-constrained model. Both
assumptions were wrong in opposite directions. The spec ended up lagging
reality twice, simultaneously, in opposite ways.

## What Made It Different From the Component Phase

The component phase **built the system**. The audit phase **stress-tested the
system against its own documentation** — and in doing so, closed the feedback
loop that made the design system self-correcting.

| | Component phase | Audit phase |
|---|---|---|
| Goal | Creation | Standardization + discovery |
| Signature novelty | `new-component-workflow` skill + 8-step lifecycle | `review-docs-app-ui` skill + three-tier rule lifecycle |
| Parallelism shape | Worktree per component, fully isolated | Intra-batch parallel (3–4 sessions), inter-batch serial |
| Per-unit isolation | Hard (one worktree each) | Soft (worktree optional, shared docs app) |
| Rule interaction | Rules mostly flowed *into* code | Rules mostly flowed *out of* code, back into the rulebook |
| Bottleneck | Grill-me design decisions | Mandatory redundancy check + flywheel pacing |
| Primary artifact | 38 components | 62 audited pages + 12 new memories + a compacted constraint file |

The phases are **mirror images**. The component phase put rules into a growing
system. The audit phase extracted rules from a completed system and fed them
back into the rulebook. The component phase's output was components; the audit
phase's output was *the rulebook's next version*.

## What Made It Work

### 1. One skill, aggressively reused
The audit phase introduced exactly one new piece of tooling:
`review-docs-app-ui/SKILL.md`. Everything else — `ds-constrained-execution`,
`ds-review`, `superpowers:writing-plans`, `superpowers:using-git-worktrees`,
`grill-me` — was inherited from the component phase and re-invoked without
modification. The component phase's harness primitives were robust enough to
carry a different phase unchanged. That's the strongest possible evidence
they were well-designed.

### 2. The mandatory redundancy check
Pass C's explicit, non-skippable redundancy check was the single most
productive part of each review. Every page had at least one offender. It was
the kind of rule that would have been easy to de-prioritize under time
pressure — which is exactly why the skill made it mandatory.

### 3. Batch-gated parallelism
Parallelizing within a batch, serializing between batches. The throughput
from intra-batch fan-out, combined with the rule-stabilization window of the
inter-batch gap, made the phase both fast and coherent. This wasn't a
conscious design — batches were originally labeled "for cognitive load" —
but the structure happened to pace the rule flywheel correctly.

### 4. Memory as the staging ground
The `feedback_*.md` memory system turned out to be the exactly-right staging
layer for Tier 1 rule discovery. A new rule could live in memory until it
either proved bulk-shaped enough to sweep, foundational enough to promote to
`DS_CONSTRAINTS.md`, or incidental enough to quietly stay at Tier 1 forever.
I didn't design memory for this — the auto-memory system was built for a
completely different purpose — but it fit the staging role perfectly.

### 5. 1M context turned split sessions into single sessions
Every page got reviewed → discussed → planned → fixed → committed in one
continuous session. No handoffs, no context transfer friction, no "where was
I" cost. The paired-checkbox structure in `docs/TODO.md` was bookkeeping
theater in practice — but it was also free, and having the optionality
available if it had ever been needed was worth the trivial overhead.

## What Didn't Work

### 1. The SKILL.md never caught up with reality
By wrap-up, the skill file was describing a workflow I hadn't actually run
for several batches. Chrome MCP was still a hard gate in the spec; visual
review was still the presumed default. If a new team member tried to pick up
the audit flow from the spec alone, they'd be doing Mode A for a rulebook
that no longer needs it. The spec is an artifact of a moment that passed.

### 2. Screenshots were speced but never saved
`docs/reviews/screenshots/` was in the spec; the directory is empty. In
Mode A, screenshots lived in the model's context for Pass B analysis and were
never persisted. In Mode B, they didn't exist at all. The spec's persistence
plan never made contact with reality.

### 3. Rule-discovery fragmentation was real, even if small
Parallel sessions within a batch did occasionally miss each other's live
discoveries. I caught the drift in the next batch's sync but some rules
got applied to only 3 of 4 peer pages until a later sweep picked them up.
The cost was bounded by the batch cadence, but it wasn't zero.

### 4. The "fresh session fix handoff" was never exercised
Step 6 of the skill offers a carefully-crafted fresh-session prompt for
handing off a fix to a separate session. I used it essentially zero times.
The option is still in the spec. Nobody is going to delete it. It will sit
there forever as a reminder that safety valves have to be exercised at least
once to know whether they work.

## By the Numbers

| Metric | Value |
|--------|-------|
| Duration | 7 active days (2026-04-05 → 2026-04-11) |
| Commits | ~318 |
| Pages audited | 62 |
| Batches | 18 + index pages |
| Parallel sessions per batch (peak) | 3–4 |
| Fix plans written | 60 |
| Post-review sweeps queued | 6 (asterisk, InlineCode, `<hr>`→Divider, heading `id`, prev/next nav, CodeBlock mobile UX) |
| New feedback memories born in-phase | ~12 |
| New `DS_CONSTRAINTS.md` top-level sections added | 1 (`## Documentation`) |
| `DS_CONSTRAINTS.md` in-place corrections | 1 (link-hover rule) |
| `DS_CONSTRAINTS.md` deduplication/trim passes | 4 |
| New skills created | 1 (`review-docs-app-ui`) |
| New agents created | 0 (reused `ds-review`, `ui-ux-pro-max`) |
| Model | Claude Opus 4.6 (1M context) |

---

The component phase built the system. The audit phase made the system learn
to document itself. The component phase's output was components. The audit
phase's output was the design system's rulebook, rewritten by the act of
using it.
