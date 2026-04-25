# Migrating the Client to the Design System

A retrospective on phases -1 → 2 of the ds-client-migration project, and on the
harness rebuild that landed immediately before Phase 3 (PR #12 on
`umichkisa-ds`). This is the third entry in the series. The first two —
[Building umichkisa-ds from Scratch](building-the-design-system.md) and
[Auditing the Docs App](auditing-the-docs.md) — covered the design system
itself. This one covers what happened when I pointed it at its first real
consumer.

## Context

KISA's main website (`KISA-website/client`) is a Next.js 15 App Router app
that predates the design system. It has five sub-apps under one repo, all
under `umichkisa.com`:

| # | App | Route | Viewport |
|---|---|---|---|
| 1 | kisa-web | `/` | Desktop-first, responsive |
| 2 | jobs-curator | `/jobs` | Responsive |
| 3 | pocha-userfacing | `/pocha` | Mobile-only |
| 4 | pocha-dashboard | `/pocha/dashboard` | Desktop + tablet |
| 5 | pocha-manage | `/pocha/manage` | Desktop + tablet |

The pre-migration state: hand-rolled UI components scattered across the
client, no shared tokens, no constraint enforcement, no docs. The design
system existed; the client didn't know it existed.

The same lived constraints from the previous phases held — Korean Army
service, off-duty hours, VSCode tunnel from the unit. By Phase 2 these
constraints were no longer noteworthy; they were just the operating
environment.

## Timeline

- **Start:** 2026-04-12 (Phase -1.0, harness bootstrap)
- **Pre-Phase-3 cut:** 2026-04-25 (PR #12 merged)
- **Duration so far:** ~13 active days
- **Phases shipped:** -1 (bootstrap), 0, 0.5, 1 (jobs-curator), 2 (pocha-manage)
- **Phases remaining:** 3 (pocha-dashboard), 4 (pocha-userfacing), 5 (kisa-web)
- **Client commits in window:** ~56
- **DS patch releases driven by migration evidence:** 19 (`@umichkisa-ds/web 1.0.1 → 1.0.20`, `@umichkisa-ds/form 1.0.0 → 1.0.1`)
- **DS new components introduced mid-migration:** 1 (`FileUpload`)

## The Shape of the Migration

**Hybrid slicing.** Phases 0 and 0.5 are horizontal singletons (Tailwind
v4 install, MSW, test framework, shared Header/Footer). Phases 1–5 are
vertical, one feature-app at a time, with subphases enumerated at each
phase's kickoff — never up front.

A subphase is a *lane* — a single feature, page, or refactor with its own
audit row, plan task, branch, and PR (or direct push, in interactive
mode). Lanes are the unit of parallelism, the unit of review, and the
unit of merge. Phase 2 alone ran 22 lanes.

**Vertical slicing of features over horizontal slicing of layers.** This
was an explicit early decision and it kept paying off. A vertical lane
has a working before-and-after, a deployable preview URL, and a clean
surface to grill against. A horizontal lane (e.g. "swap all Buttons
everywhere") would have meant 5 apps' worth of regression risk per merge.

## Phase -1 — Bootstrapping the Harness

Six subphases of pure setup before any client code was touched. Mirrors
the Phase 2 of the component build (workflow before code), and was the
single highest-leverage stretch of the migration.

The artifacts that landed in -1:

| Artifact | What | Role |
|---|---|---|
| `docs/DS_CLIENT_USAGE.md` | Constraint doc *for consumers of the DS* | Migration analogue of `DS_CONSTRAINTS.md` |
| `ds-client-review` agent | Reviews changed `.tsx` against `DS_CLIENT_USAGE.md` | Migration analogue of `ds-review` |
| `ds-client-constrained-execution` skill | Per-task gate: implementer → review → typecheck → commit | Migration analogue of `ds-constrained-execution` |
| `ds-fix-during-migration` skill | When a DS bug surfaces from a lane, this is the path | "DS is its own customer" |
| `ds-phase-end-bump` skill | Accumulator-bump-publish-relink at phase end | Release management |
| `client/scripts/link-ds.sh` + `unlink-ds.sh` | Local symlink swap so client consumes WIP DS without registry roundtrip | Tunnel-friendly dev loop |
| `HARNESS_DESIGN.md` + `AUTONOMOUS_PROTOCOL.md` | The rules of how a phase runs | Locked through grill on 2026-04-12 |

The grill that locked Phase -1 was where I committed to:

- Worktrees off `dev` per lane, mocks-on Vercel preview on `dev`
- MSW (write endpoints only), committed, env-gated
- DS pinned strictly (no `^`) in client `package.json`; DS fixes batched per phase, bump once at phase end (with a blocking-fix exception that I underestimated)
- DS form package resolver-agnostic; no zod
- Local workarounds for missing DS components, add to DS later (not blocking)

`DS_CLIENT_USAGE.md` started smaller than `DS_CONSTRAINTS.md` — only ~144
lines and only review-shaped. It said "here are the rules; the reviewer
checks them." It did not yet know that consumers were going to need a
*write-time* version of the same rules. That gap would not surface until
Phase 2.

## Phases 0 and 0.5 — First Contact With Reality

Phase 0 was Tailwind v4 install + DS install + MSW + test framework + tunnel
settings. Phase 0.5 was the shared Header/Footer/MobileMenu. Both are
horizontal singletons, no subphases, intentionally smaller surface area than
the vertical phases that follow.

Two things happened that shaped everything downstream.

**The radix-bundle catastrophe (Phase 1.1).** Client `next build` failed
with `Module not found` for `@radix-ui/number`, `react-presence`,
`react-use-previous`, etc. pnpm's symlinked transitives are not
npm-client-resolvable — the DS was published assuming the consumer
would also be on pnpm. Fix: tsup `noExternal` to bundle radix transitives
into `dist/index.js`. Released as `1.0.4` mid-phase.

This was the first **mid-phase bump**, and the first datapoint that the
"DS fixes batch at phase end" rule from -1 was wrong. Phase 0.5 had
already discovered the pattern (`instagram-brand` icon needed for
Footer's lane 0.5.5 → mid-phase patch `1.0.1`); Phase 1.1 made it
unignorable. By the end of Phase 2 the doctrine was inverted:
**mid-phase patch is the default; phase-end batching is the
exception that has not happened yet.**

**Vercel preview as the verification surface.** Locally on the tunnel,
everything was best-effort. Mocks-on Vercel preview on the `dev` branch
became the canonical "does this actually work" answer. Every PR's "test
plan" pointed at a preview URL. This shape held for the entire
migration so far.

## Phase 1 — jobs-curator (the autonomous lane proves itself)

11 lanes, all merged, no manual interventions beyond the standard
checkpoints. Closed with DS at `1.0.8` and zero phase-end DS fixes —
every fix had been mid-phase-shipped.

What worked:

- **Lane = MSW handlers as the first task.** Lane 1.1 was MSW handlers for the jobs API. Once that landed, every downstream UI lane consumed mocked data instead of waiting on backend. This pattern repeated in every vertical phase since.
- **Worktree per lane, autonomous PR per lane.** Each lane was its own branch off `dev`, its own PR, its own ds-client-review pass, its own typecheck. PRs reviewed in batches of 3–4.
- **Redesign-over-preserve was vindicated.** Lane 1.4 (TagList → inline segmented + DateRangePicker) and Lane 1.5 (JobPostingGrid + Card) both threw out the existing visual treatment entirely. Pre-migration concern was that this would balloon scope. It didn't, because the brand-identity envelope (navy + maize + Korean type, page structure, signature moves) is small and the rest is replaceable. Phase 2 would later codify this as a feedback memory.

What I learned:

- **Hooks/context drift across lanes is real.** Lane 1.8 was a dedicated hooks/context cleanup lane — work that had accumulated as small TODOs across lanes 1.1–1.7. From Phase 2 onward, this became a standing "audit-after redesign pass" lane at the end of every vertical phase.
- **`ds-client-review` was not catching everything.** It caught DS misuse — wrong components, wrong tokens, wrong tier. It didn't catch *code-quality* issues at the React layer: components with too many responsibilities, ad-hoc state machines that should have been declarative, duplicated logic across siblings. This was a known gap. Phase 1 deferred filling it.

## Phase 2 — pocha-manage (the stress test)

22 lanes, the largest and most heterogeneous phase so far. Where Phase 1
proved the autonomous flow, Phase 2 stress-tested every part of the
harness simultaneously. This is the phase that produced the evidence PR
#12 would later bake into write-time enforcement.

### Modes emerged

The harness had been written in Phase -1 with a single execution shape:
"work the lane in a worktree, open a PR." Phase 2 fragmented that
single shape into five distinct modes that needed five different
session affordances:

| Mode | Trigger | Shape |
|---|---|---|
| **A** | Phase folder lacks `audit.md` | Audit writing — read app state, classify lanes, output `audit.md` |
| **B** | `audit.md` present, `plan.md` missing | Plan writing + GH issue generation per lane |
| **C1** | Sitting PR, CI green, no `needs-decision` | PR review (skim-and-merge) |
| **C2** | Sitting PR with `needs-decision` / `needs-interactive` | PR review (live review against the running app) |
| **D** | Open `needs-interactive` issue with no PR | Interactive execution — me driving, agent assisting |
| **E** | All lanes merged | Phase close-out, end-bump if needed |

The hard separation between **C (PR review)** and **D (interactive
execution)** turned out to be load-bearing. C runs in the main client
clone (auto-checkout the PR branch); D runs in a nested worktree at
`client/.worktrees/<lane-id>/` off `origin/dev`. The split exists so
that a parallel terminal doing Mode C against PR #109 cannot collide
with another terminal doing Mode D on lane 2.19. Without the split, two
terminals fighting over the working tree was a real failure mode I hit
twice before it got codified.

### Interactive vs autonomous

The other axis the harness had to add: **autonomous lanes ship a PR;
interactive lanes ship a direct push to `dev`**. Interactive lanes are
ones I drive in real-time — usually because the work involves UX
judgement that can't be encoded into the implementer agent's prompt. PRs
exist as a review surface for autonomous work. Driving a lane live and
*then* opening a PR against my own keystrokes is theater.

The corollary: **issues exist for every lane, autonomous or not** —
they're created at plan-writing time, before the mode split. The "Mode
D = no PR" rule does NOT extend to "Mode D = no issue." That distinction
is small but it broke wrap-up flow twice before becoming a feedback
memory.

### The DS-as-its-own-customer feedback loop

19 patch releases of `@umichkisa-ds/web` were driven by Phase 2 evidence
(plus a couple from Phase 0.5/1). Each one followed the same pattern:

1. Lane is mid-execution
2. Implementer hits a DS gap — missing variant, missing prop, missing component, broken default
3. `ds-fix-during-migration` skill takes over: fix in DS repo, patch-bump, publish, re-link in client
4. Lane resumes against the new DS version
5. Entry appended to `ds-fixes-log.md`

The 19 entries trace out a real audit of the DS surface area against a
real consumer. A few were component additions (`FileUpload` —
`1.0.9`, full new form primitive with 27 tests, surfaced from lane
2.4); a few were one-line fixes (`Input min-w-0` for native time
inputs in flex containers, `1.0.18`); one was a four-release saga (the
Toaster z-index / outer-section / sonner-CSS interaction across
`1.0.10` through `1.0.12`).

The Toaster saga is the one I want to remember. The bug was: empty `<section>`
flowed in document order on every Toaster-mounted page, adding a tall blank
box. Fix attempt 1 (`1.0.10`): import sonner CSS. Wrong cause — sonner
self-injects. Fix attempt 2 (`1.0.11`): position the outer section. Created a
new stacking context but no `z-index`. Fix attempt 3 (`1.0.12`): add
`z-index`. Three releases for one bug, all caught between client production
and the docs app, all mid-phase. Without the mid-phase bump-default policy,
the migration would have stalled here for a day each time.

The lesson the log encodes: **the design system can only know its own gaps
when a real consumer drives it through a real surface area.** The client
migration *was* that drive. The DS came out of Phase 2 strictly better
than it went in — same outcome as the audit phase, but the rule flow ran
through a different artifact (`ds-fixes-log.md` instead of
`DS_CONSTRAINTS.md`).

### Rules mined from Phase 2

By the end of Phase 2 there were five recurring corrections that the
`ds-client-review` agent kept making across lanes. They were not in
`DS_CLIENT_USAGE.md`. They were trapped in the agent's running context
and in scattered feedback memories:

| ID | Rule | Origin |
|---|---|---|
| **G1** | No override on DS layout components (`flex`, `overflow`, `height`) | Lane 2.11b smoke fix (commit c4cea05) |
| **G2** | Status variant selection — semantic, not outline | Lane 2.11b |
| **G3** | Spacing tier write-time check — `gap-6` is not component-internal | Lane 2.11b |
| **G4** | Form hooks import path — never bypass `@umichkisa-ds/form` | Lane 2.19 |
| **G5** | `type-*` weight override prohibition (the `type-*` classes set their own weight) | MEMORY rule, lane 2.19 sweep |

These were Tier-2-shaped rules, in the audit-phase taxonomy: bulk
patterns the system kept catching but the rulebook didn't yet name. The
question PR #12 would ask: do they belong in the rulebook, and if so,
write-time or review-time?

## PR #12 — The Pre-Phase-3 Tighten

After Phase 2 closed and before Phase 3 (pocha-dashboard) audit kicked
off, I stopped the migration and spent a session grilling out exactly
what the harness had outgrown. The output was
`docs/plans/2026-04-25-harness-improvements.md` and the resulting PR is
21 commits across 21 files (additions: 3880, deletions: 725). It made
**zero client-side changes**. Everything was harness.

### Why now

The signal that pushed me to pause was uncomfortable: I had a list of
~5 recurring corrections the review agent kept making (G1–G5), and the
correct fix for "the review agent keeps catching X" is almost always
"the implementer should not be writing X in the first place." The
review agent is the safety net, not the loadbearer. If a class of
violation recurs, the rulebook has an incomplete *write-time* face.

`DS_CLIENT_USAGE.md` had been written entirely as a review document.
It said "here is what to flag." It did not say "here is what to write."
A write-time decision tree — Available DS Surface, Tier Picker, "What
to Use" rules — would let the implementer tier-justify every value
*before* writing code, instead of relying on a post-hoc reviewer to
flag mistier'd `gap-6`s.

### What changed

**`DS_CLIENT_USAGE.md` split into Part 1 / Part 2.** Part 1 is the
write-time decision tree (Available DS Surface, Tier Picker for
spacing/color/radius/type/icon-size, "What to Use" Must rules,
Visibility & Hierarchy rules absorbed from MEMORY). Part 2 is the
existing review rulebook, end-to-end, plus G1–G5 baked from Phase 2
evidence and the MEMORY-only rules promoted in (text-muted-foreground
visibility, intro foreground, no-left-border, no-card-padding-override).
144 lines → 287 lines.

**`ds-client-review` agent now reads `DS_CLIENT_USAGE.md` itself.**
Previously the orchestrating skill pasted the whole doc inline on every
agent invocation. Cuts ~3K tokens per review round in the parent
context. Agent runs in its own sub-context and reads the doc fresh
each invocation.

**New `toss-fe-review` agent.** This was the answer to Phase 1's "DS
review doesn't catch code-quality issues." Per-task review against the
four Toss Frontend Fundamentals axes (readability, predictability,
cohesion, coupling) with a conservative `BLOCK / SUGGEST / INFO`
severity gate. Wired between `ds-client-review` and typecheck. Conservative
defaults — `BLOCK` only on real correctness/structure problems,
`SUGGEST/INFO` collected for the PR body — so the gate doesn't
over-refactor in autonomous loops. Two-round hard stop if `BLOCK`
recurs.

**New `review-ui-on-browser` skill.** Standalone, *manually invoked*,
Playwright-CLI-based. Takes a running dev server URL + routes + viewports
and produces a UI/UX rubric review (hierarchy, spacing rhythm, primary
action visibility, state coverage, content readability). Originally
designed to run inside the autonomous routine; that didn't survive
contact with reality — Vercel free-tier preview auth + dev-only branch
made per-PR Playwright runs impractical. So it lives outside the
routine, invoked during PR review or before merging an interactive
lane. Initially built around the Playwright Node API; rewritten near
the end of the PR to use Microsoft's `@playwright/cli` skill instead.

**`AUTONOMOUS_PROTOCOL.md` restructured.** 739 → 362 lines. Mode C
split into C1 (ready-to-merge) and C2 (interactive review). Mode D
explicitly placed in a nested worktree off `dev` for parallel-terminal
safety. New §3.1 (feedback-during-review: default fix on branch, defer
to new lane on scope/DS/feature drift) and §3.2 (parallel-terminal
safety). Old preflight-style intro retired; doc is now consult-on-demand.

**`CLAUDE.md` preflight trimmed.** Old: TODO → HARNESS_DESIGN (full)
→ symlink check → DS_CODEBASE. New: TODO → symlink check. Mode-detection
table inlined at the top in tabular form so the cold session can route
into a mode without preloading the protocol doc. Each mode lazy-loads
only what it needs. Saves ~40K tokens of cold-session context.

### What it looks like, end-to-end

A Phase 3 NO-TDD lane will now run:

```
implementer (with Part 1 tier-justification pre-flight) →
  ds-client-review (reads its own ruleset) →
  toss-fe-review (4-axis quality gate) →
  typecheck →
  commit
```

A TDD lane:

```
test-writer (red) →
  implementer (green) →
  ds-client-review →
  toss-fe-review →
  tests-green-verify →
  refactor →
  typecheck →
  commit
```

End of feature: `vercel-react-best-practices` final pass. Manual
`review-ui-on-browser` before merge for any UI-touching lane.

## What Made It Work

### 1. Phase -1 was non-negotiable
Six subphases of pure harness setup before touching any client code. Same
shape as the design-system project's "process before code" stretch. The
mid-phase course corrections (mid-phase bump default, Mode C/D split,
G1–G5 baking) were all *adjustments* to a working harness. None of them
required scrapping the harness. That's only possible because the
foundation was right.

### 2. The DS feedback loop was structural, not improvised
`ds-fix-during-migration` was a Phase -1 skill, not an emergency response.
When the implementer hit a DS gap on Lane 1.1 the path was already there:
fix in DS, patch-bump, re-link, resume. No "should we fix the DS or work
around it" debate per occurrence. The 19 patch releases happened because
the path was so cheap that the *workaround* would have been more expensive.

### 3. Mode-based session routing
The five modes were not in the original Phase -1 design — they emerged
across Phases 0.5 → 2 as the work fragmented. Naming them and writing
their detection signals into `CLAUDE.md` turned cold-session pickup from
"read everything, figure out where I am" into "look at the table, route,
load the mode-specific docs." This was the highest single-PR throughput
improvement the harness has gotten.

### 4. PR #12 happened *before* Phase 3, not during it
The instinct on a deadline is to keep shipping. Phase 2 ended with five
recurring violations the rulebook didn't name and a code-quality gap the
review chain didn't cover. Continuing into Phase 3 with that state would
have meant Phase 3's lanes catching the same five issues in PR review
again. Stopping for one harness PR before the next phase's audit was the
right call. (It was also, not coincidentally, the same shape as the
design system's audit phase pausing to write `review-docs-app-ui` before
running it across 62 pages.)

### 5. Vertical slicing kept the blast radius bounded
Every lane shipped or didn't ship one feature. No lane ever broke a
feature it wasn't touching. When the Toaster z-index saga ran for three
releases, the only consumers affected were the lanes that mounted
`<Toaster />`. The other 18 lanes of Phase 2 kept moving in parallel.

## What Didn't Work

### 1. The "DS fixes batch at phase end" rule was wrong from day 1
Phase -1 locked it. Phase 0.5 broke it. By Phase 2 the doctrine was
inverted: mid-phase patch is the default. The phase-end accumulator
exists, but in 19 mid-phase bumps and zero phase-end bumps so far it has
never been used. The rule that survived was the *opposite* of the rule
that was locked. Lock decisions when the cost of being wrong is small,
not when the cost of being right is small.

### 2. `DS_CLIENT_USAGE.md` was review-only for too long
The doc was written as a reviewer's reference and stayed that way for
eight phases. If it had been split into Part 1 (write) / Part 2 (review)
in -1.2, several of the recurring G1–G5 violations would never have
shipped to `ds-client-review` at all. Lesson: **a constraint document
needs both a write-time and a review-time face from the start. They are
not the same document.** The review-time face is exhaustive; the
write-time face is a decision tree. Mixing them produces a doc that's
too dense to consult before writing and too light to enforce after.

### 3. `review-ui-on-browser` couldn't be wired into the routine
The plan was for visual UI review to be one of the autonomous gates.
Vercel preview auth + dev-only branch + free-tier rate limits killed
that idea. The skill exists, manual-only, and is exercised case by case.
This is the audit-phase Chrome-MCP-hard-gate problem in a different
costume: the spec assumed an ideal infrastructure that the operating
environment does not provide.

### 4. The first `review-ui-on-browser` build was wrong
Initially built against Playwright Node API + `npx playwright`. Wasn't
discovered to be wrong until late in the PR; rewritten in the final
commits to use the `@playwright/cli` sibling skill instead. Cost: a few
commits of churn. Lesson: the skill ecosystem has primitives for things
like this. Search before authoring.

## By the Numbers

| Metric | Value |
|--------|-------|
| Window | 2026-04-12 → 2026-04-25 (13 active days) |
| Phases shipped | -1 (bootstrap), 0, 0.5, 1, 2 |
| Phases remaining | 3, 4, 5 |
| Lanes (Phase 1 + 2) | 11 + 22 = 33 |
| Client commits in window | ~56 |
| DS patch releases driven by migration | 19 |
| New DS components introduced mid-migration | 1 (`FileUpload`) |
| New skills (migration-side) | 5 (`ds-client-constrained-execution`, `ds-fix-during-migration`, `ds-phase-end-bump`, `wrapping-up-pr`, `review-pr-queue`) + 1 manual (`review-ui-on-browser`) |
| New agents (migration-side) | 2 (`ds-client-review`, `toss-fe-review`) |
| Modes the harness routes between | 5 (A, B, C1/C2, D, E) |
| `DS_CLIENT_USAGE.md` size | 144 → 287 lines |
| `AUTONOMOUS_PROTOCOL.md` size | 739 → 362 lines |
| Cold-session preflight context savings (PR #12) | ~40K tokens |
| `ds-client-review`-per-round inline-paste savings (PR #12) | ~3K tokens |
| Model | Claude Opus 4.6 (1M context) → Opus 4.7 mid-Phase-2 |

---

The component phase built the system. The audit phase made the system
document itself. The migration phase made the system *document itself in
terms of how its consumers use it*. PR #12 was the moment that the
system's "how to consume me" face caught up with the system's "how to
build me" face — same shape, same disciplines, same write/review split,
finally articulated. Phase 3 starts with the rulebook tighter than the
client code that will be written against it. That's the right
asymmetry.
