# Migrating the Client to the Design System: Phases 4 ~ 6

A retrospective on phases 4–6 of the ds-client-migration project — the first
three phases implemented with the `pastiche` skill as the standing implementer
for client UI. This is the fourth entry in the series. The previous entry
— [Migrating the Client to the Design System: Phase -1 ~ 2](migrating-the-client-neg1-to-2.md)
— covered the harness bootstrap and the pre-pastiche autonomous chain through
pocha-manage. The intervening pastiche build itself is in
[Building Pastiche](building-pastiche.md). This entry covers what changed in
the migration once pastiche replaced the autonomous chain, mid-Phase-3.

## Context

The five sub-apps under `umichkisa.com` carry very different stakes:

| # | App | Route | Exposure |
|---|---|---|---|
| 1 | kisa-web | `/` | **Always-on public** — main site face |
| 2 | jobs-curator | `/jobs` | Always-on public |
| 3 | pocha-userfacing | `/pocha` | **Seasonal** — only live during pocha events |
| 4 | pocha-dashboard | `/pocha/dashboard` | Seasonal, internal |
| 5 | pocha-manage | `/pocha/manage` | Seasonal, internal |

The migration order was deliberate. Pocha (seasonal) went first — when it
breaks in production, exposure is bounded by the event window. Kisa-web
(always-on) went last, after the DS had been hammered into shape by the
seasonal apps. The lower-stakes surface paid for the higher-stakes
surface's tooling. By the time Phase 6 started, the DS knew everything
the always-on public site would ask of it, because the seasonal apps had
already asked first. This retro will return to that ordering at the end —
it ended up being the single most consequential decision from Phase -1
that nobody touched again.

The same lived constraints from the previous phases continued — Korean
Army service, off-duty hours, VSCode tunnel from the unit. They stopped
being noteworthy in Phase 2 of the previous retro; in this one they
re-enter the story, because Phase 4–6's workflow shape turns out to track
my calendar, not any methodology decision.

## Timeline

- **Pastiche cutover:** 2026-05-01 (mid-Phase-3)
- **Phase 4 kickoff:** 2026-05-02
- **Phase 6 dev → main PR open:** 2026-05-10
- **Duration:** ~9 active days
- **Phases shipped in window:** 3.5 (back half of P3) + 4 (pocha-userfacing) + 5 (admin-pocha — emerged mid-flight) + 6 (kisa-web)
- **Lanes:** Phase 4 = 15, Phase 5 = 6, Phase 6 = 17 main + 12 parallel fan-out sub-lanes = ~50 lanes total
- **DS patch releases driven by migration evidence:** 8 (`@umichkisa-ds/web 1.0.21 → 1.0.28`); only **3 of those during P4–P6 proper** (1.0.25 Sheet + Dialog parity, 1.0.27 Tabs lg, 1.0.28 LoadingSpinner fullScreen)
- **New DS components introduced mid-migration:** 1 (`Sheet`, vaul-based mobile bottom-sheet, P4.0)
- **DS bumps in Phase 6:** 0

## The Pastiche Cutover (Mid-Phase-3)

Pastiche shipped on 2026-05-01, while Phase 3 was still mid-flight. The
cutover was silent:

```
9be287d  feat(pastiche): phase 8 cutover — pastiche replaces ds-client-constrained-execution
91818c8  feat(pastiche): rewrite nightly routine prompt for pastiche cutover
```

Phase 3 lanes 1–4 ran on the previous autonomous chain (PR #12's
`ds-client-review → toss-fe-review → typecheck → commit`). Lanes 5–11 ran
on pastiche, autonomously, *without their lane plans being rewritten for
it*. Same TODO labels, same `(autonomous + Mode C)` mode tag, different
implementer underneath. Two same-day commits on 2026-05-01 quietly
patched what could no longer be ignored:

```
fd018e8  docs(phase-3): relax UI prescription in plan; clarify pastiche CWD
9b00daa  docs(phase-3): relax lane 3.8 atom prescriptions + lock grill decisions
```

So the back half of Phase 3 was pastiche's first stress test on real client
code, hidden under unchanged plan prose. The first phase whose *plan
shape* actually changed for pastiche was Phase 4: atom prescription
dropped, lanes split into UI / logic, pastiche named in lane titles, and
KNOWLEDGE/WISDOM follow-ups became a routine artifact of every UI lane.

The previous retro recorded that Phase -1's "DS-fixes-batch-at-phase-end"
rule was wrong from day 1 and got rewritten by the work without ever
being formally retired. This is the same shape: the autonomous-chain
implementer was retired in a single commit while a phase was mid-flight,
and the lane plans got post-hoc edits to stop fighting the new tool. The
back half of P3 is the silent precedent for the visible P4 reshaping.

## Phase 4 — pocha-userfacing (the first phase planned for pastiche)

Phase 4 was the seasonal user-facing app: mobile-only, /pocha home with a
menu tab and an orders tab, cart, Stripe payment, post-pay success page.
WS-driven order updates in production, polling fallback under MSW.

The visible difference from earlier phases was the **a/b/c lane split**:

```
4.2a — Home menu tab UI (pastiche)         4.2b — menu tab logic       4.2c — stock cap UX
4.3a — Home orders tab UI (pastiche)       4.3b — orders logic + WS-mock fallback
4.4a — Cart UI (pastiche)                  4.4b — Cart logic [TDD]
4.5a — Pay UI (pastiche)                   4.5b — Pay logic + age gate [TDD]
```

The split is not a pastiche rule. By Phase 5 it's gone — admin hub is one
"pastiche-driven" lane, full stack. By Phase 6 the only echo is the
template/fan-out split (which is structurally different — see below).
The a/b/c split was a Phase 4 phenomenon, driven by a complexity
threshold:

- Phase 4 has the most novel logic of any migration phase: cart-total math,
  stock cap arithmetic, age-gate resolution, Stripe Elements wiring,
  WS-or-poll fallback, and the mock-vs-prod payment branch.
- Pastiche makes UI lanes cheap. When UI is cheap, splitting off the
  logic is no longer a tax.
- Where the logic is **pure-function-shaped** (cart total, age gate, stock
  cap), TDD got readmitted on the b-lane. Where the logic is
  **effects-shaped** (WS fallback, Stripe wiring), the b-lane was Mode D
  interactive without TDD.

That's the rule: pastiche owns UI; logic that is testable as pure
functions gets a TDD b-lane; logic that is integration-shaped gets a
Mode-D b-lane. It's a complexity-threshold pattern, not a pastiche rule —
which is why Phase 6's content/CRUD lanes don't repeat it.

Phase 4 also produced the migration's only new DS primitive: **`Sheet`**
(vaul-based mobile bottom-sheet, v1.0.25). Unlike the foundational fixes
in the previous retro, Sheet was *foreseen at audit time*, not surfaced
mid-lane. Lane 4.0 was an explicit "build the missing primitive before
the lanes that need it" lane. The pastiche-era pattern: gaps surface in
the grill, ship as a deliberate release before the dependent lane,
not as a mid-lane scramble.

The phase ended with two scope corrections that, in retrospect, are
the planning failures worth naming:

- **The pay-success rebuild collapsed mid-flight.** Lane 4.6 was planned
  with a `MockPayButton` component as a separate primitive; reality
  collapsed the mock-mode branch into `useStripePayment`'s control flow.
  The plan was wrong about the abstraction boundary — and you can only
  see the right one after the UI exists.
- **Tip flow excised.** `TipModal.tsx` and the localStorage payment-method
  scaffolding were removed entirely from pay-success per Q6 of the
  audit grill. Reversible via git, but a real "we built this and it
  shouldn't have existed" call.

And one corner that's still in flight: real-Stripe smoke testing was
deferred to pre-`dev → main` ship. That ship is now the open PR. The
smoke remains gated on access I do not have at the unit; the migration
ships with that confirmation owed.

## Phase 5 — admin-pocha (the phase that wasn't planned)

Phase 5 did not exist when Phase -1 locked the original five-phase carve.
It surfaced during the **Phase 4 audit**:

> *"/pocha/history excluded from Phase 4 scope (admin-only; folded into new
> Phase 5). Phase renumber: original Phase 5 (kisa-web) shifts to Phase 6;
> new Phase 5 = admin-pocha consolidation."*

Once I started enumerating the userfacing pocha routes, the admin /
userfacing boundary became visible in a way it hadn't been when the
phase plan was written months earlier. Admin surfaces were scattered
across pocha-manage, pocha-userfacing, and kisa-web. The fix was *insert
a new phase mid-migration and renumber the rest.*

The retrospective lesson is small but worth naming: **Mode A (the audit
phase) is a replanning surface, not just an enumeration surface.** Its
job is not only "what are this phase's lanes" but "what does this phase
reveal about the *next* phase's scope." Phase 4's audit produced Phase 5
out of nothing and pushed the original Phase 5 → 6. The harness handles
this gracefully because direct-push-to-`dev` makes lane- and phase-shaped
successors cheap, but Mode A's docs don't currently name this second
job. They probably should.

Phase 5's six lanes — admin shell foundation, admin hub page, BackToHubFAB,
`/admin/pocha/history` polish, audit-after redesign, verify — produced
exactly one DS bump (LoadingSpinner `fullScreen`, mirroring StatusView's
existing pattern from the previous retro). Notably, the admin shell
introduced a **strict viewport-blocking gate**: never paint admin chrome
to a non-admin during `adminStatus === "loading"`. The grill on Lane 5.1
locked that requirement before code; the LoadingSpinner `fullScreen`
prop existed to enforce it. This is the same shape as Phase 2.17's
StatusView fullScreen — the same rule, different component, no new
ideas. Mature DS surface meeting mature client requirements.

## Phase 6 — kisa-web (the always-on public surface)

The largest phase by lane count and the one with the most visible
pastiche-era patterns. 17 main lanes plus 12 parallel fan-out sub-lanes:

| Cluster | Lane(s) | Shape |
|---|---|---|
| Home flagship redesign | 6.1 | Single Mode D, full rewrite |
| About | 6.2, 6.3, 6.4 | 3 lanes (kisa+events / members+credits / rule+sponsor) |
| MSW handlers | 6.5a–d | 4 parallel autonomous TDD lanes |
| Boards/everykisa template | 6.6 | Mode D — locks visual contract |
| Boards/everykisa fan-out | 6.7 | **8 parallel sub-lanes**, ≤15 LoC each |
| Posts | 6.8, 6.9 | Detail + delete; create/update form |
| Auth | 6.10, 6.11 | Signin redesign; signup |
| Users | 6.12 | View + edit |
| Info template | 6.14 | Mode D — locks template + 1 reference |
| Info fan-out | 6.15 | **4 parallel sub-lanes** |
| Sweep | 6.16, 6.17 | Metadata + dead-code purge |

The phase shipped **zero entries in `ds-fixes-log.md`**. Across 9 boards
routes, 23 info pages, signin, signup, post detail + edit, users, and a
flagship home redesign, the DS produced no new bumps.

### Template-first as pastiche's amortization

Lanes 6.6 / 6.7 (boards) and 6.14 / 6.15 (info) follow the same
structural pattern:

- **Reference lane** — Mode D interactive, pastiche-driven, locks both the
  template component (`BoardTemplate`, `InfoOverviewTemplate` /
  `InfoDetailTemplate`) and one reference route to prove it.
- **Fan-out lanes** — N parallel sub-lanes, each ≤15 LoC, **no pastiche**
  involved. They are config files passing props to the template.

It's tempting to call this a "pastiche multiplier." It isn't. Pastiche
runs *once* in the reference lane and *zero times* in the fan-out lanes
— the right description is **concentrate and replay**, not multiply.

What template-first actually buys, in pastiche terms:

- The visual contract is **locked in component code, not in plan prose**.
  Pre-pastiche, a template-first plan would have had to prescribe atoms
  across 9 lanes' worth of plan documents; with pastiche, the contract
  is the template itself.
- Pastiche's per-lane cost (grill, atom selection, KNOWLEDGE/WISDOM
  follow-ups) **amortizes over N consumers**.
- The fan-out is embarrassingly parallel because it's just config.

But the pattern itself was not invented for or by pastiche. The 9 boards
routes share the same UI shape with different data. The 23 info pages
share two shapes (overview + detail) with different data. **Template-first
is the obvious shape regardless of implementer.** Pastiche just fits it
well — concentrate the design work into one expensive lane, replay as
config — and didn't get in the way.

The robustness of the locked contract held under pressure once: lane
6.15 housing needed *two* `InfoOverviewTemplate` instances on one page
(on-campus / off-campus split). The template's API was sufficient — no
re-entry into the reference lane was required. The pattern's downside —
that the reference lane has to be right, because the followers can't
fix it without breaking the contract — never had to be paid down.

### Why Phase 6 produced zero DS bumps

The mechanical reason is convergence. Boards = Table + Pagination +
ToggleGroup + Skeleton + StatusView + Badge — all already in the DS by
end of Phase 2. Info = Card grid + image-fill tiles + type tokens — all
already there. Signin / signup = Button + Input + Form + Dialog. Users =
Table + Tabs + Form. The DS surface kisa-web needed had been hammered
into shape by pocha.

The non-mechanical reason is the migration order. The plan from Phase -1
put the seasonal app first and the always-on app last. The cost of being
wrong about a DS atom is bounded by who sees it in production; the
seasonal app's exposure window is bounded too. By the time the
always-on public site started consuming DS atoms, the atoms had been
production-tested by the seasonal app's recent event cycles. **The lower-
stakes surface paid for the higher-stakes surface's tooling.**

This is the single most consequential decision the original phase plan
got right and never had to revisit. It deserves explicit credit: a
seasonal app *first* is a better DS curriculum than a high-traffic
content site first, even though the high-traffic site is what most
teams would be tempted to migrate first ("if it's already broken, just
fix it"). The seasonal app surfaces real production behavior under
bounded exposure. The always-on app, ordered last, then consumes a DS
that has already met the work.

## DS Pressure, Quantified

| Window | Lanes | DS bumps | Bumps / lane |
|---|---|---|---|
| P-1 → P2 (pre-pastiche) | ~33 | 20 (`1.0.0 → 1.0.20`) | **0.61** |
| P3 → P6 (pastiche-era) | ~50 | 8 (`1.0.21 → 1.0.28`) | **0.16** |
| P4 → P6 only (post-cutover) | ~50 | 3 (`1.0.25, 1.0.27, 1.0.28`) | **0.06** |
| **P6 alone** | 17 + 12 sub-lanes | **0** | **0** |

Roughly 4× fewer bumps per lane in the pastiche era; ~10× fewer if you
count only post-cutover. Two forces drive this:

- **Convergence.** P0–P2 hammered the foundations: radix bundling, FileUpload,
  Toaster z-index saga, Dialog scrollable + gap regression, StatusView
  fullScreen, Input min-w-0 / appearance-none, Container default padding.
  Those are all *fixes* — wrong-shaped or missing primitives. By P3 the
  major holes are filled. P3–P6 bumps are mostly *additions* (Container
  size=full, Tabs size=lg, LoadingSpinner fullScreen) — variants that
  fit the existing shape, not shape rewrites.
- **Plan-time gap discovery.** Pastiche's pre-lane grill catches "we don't
  have an X" before code is written. When it does, the missing piece
  ships as a deliberate pre-lane release (Sheet for 4.0; Container
  size=full for 3.4) rather than a mid-lane scramble. The Sheet release
  is the cleanest example: its existence was foreseen at the Phase 4
  audit, shipped as v1.0.25 with full docs, and consumed by 4.2a /
  4.3a / 4.4a as a known atom.

Pastiche's reviewer also stays inside the documented FACT surface and
flags atoms-not-in-FACT, which biases the implementer toward
DS-faithful output rather than ad-hoc workarounds. That's a smaller but
real third force.

## Mode D Dominance — and What It Actually Means

Phase 6 ran 12 of 17 main lanes in Mode D direct-push, with autonomous
PRs reserved for the mechanical lanes (4 MSW handlers, 1 members/credits
redesign). The `feedback_live_session_is_mode_d` memory is doing a lot of
work in the data: when I'm at a terminal, lanes default to Mode D.

The straightforward read is "Mode D is the new default." That's not the
real story.

**Mode D dominance in P4–P6 is a calendar artifact.** The autonomous
flow exists for low-availability windows — the cron-driven nightly
routine processing whatever's `autonomous-ready`. When time at a terminal
is scarce, that's the only path that makes progress. When time is
available, Mode D is faster: grill + pastiche + merge in one session,
no PR-review tax, no round-trip on revisions. The shift from Phase 2
(mostly autonomous) to Phase 6 (mostly Mode D) tracks how much off-duty
time I had during each window. That's it. The previous retro buried
the constraints in the operating environment; this one re-promotes
them, because the constraints are the workflow.

There's a deeper observation underneath: **autonomous and Mode D both
funnel into the same single-human visual-review bottleneck.** Autonomous
lanes only feel parallel until they hit Mode C review, which serializes
at the human reviewer just like Mode D merges do. The choice between
autonomous and Mode D is not a choice between parallel and serial — it's
a choice about *where* to spend the serialization budget: at planning
(autonomous = decisions encoded into the issue body upfront) or at
execution (Mode D = decisions made live).

### Dev as a serialization queue

Phase 6 issue closures show a recurring dual-issue pattern: `6.3 closed
#165, #199`, `6.5a closed #167, #194`, `6.5b closed #168, #195`, etc.
The first number is the lane's autonomous PR or Mode D issue; the second
is a follow-up polish issue closed after the merge.

The mechanism: after a Mode D worktree merges to `dev`, polish
iterations happen *not in the worktree but on the main client clone's
`dev` branch directly*. The reasoning is structural, not lazy:

- I am the only human who can do visual review.
- The migration is UI-heavy. The actual things to look at on a page
  are page-specific and only nameable once the page renders.
- Brain bandwidth for this kind of review is finite — one feature at
  a time, not a tab grid.
- Multiple worktrees can run in parallel because they're isolated;
  visual review can't, because it's a single-viewpoint activity.

So `dev` becomes a **serialization queue**. Parallel worktrees solve the
implementation bottleneck. Sequential merge-to-`dev` solves the visual-
review bottleneck. Hot-reload on the main clone makes post-merge polish
fast enough that the worktree never needs to be reopened — its job ends
at "design-system-faithful code merged," and the rest is single-
viewpoint judgment that wouldn't have been parallelizable anyway.

This isn't a workflow I designed. It emerged from doing the work and
got named in a feedback memory after a few repetitions. But it's the
single most operationally useful pattern from P4–P6.

## What Made It Work

### 1. The pastiche cutover didn't require a phase redo
The implementer was swapped underneath an in-flight phase via two
commits and a routine-prompt rewrite. Lanes 5–11 of Phase 3 ran on the
new tool with unchanged plan prose. No phase rollback, no re-audit, no
re-issue. Tools that can be swapped without ceremony are tools that
will actually get swapped when better ones appear.

### 2. Migration order as a deliberate risk curriculum
Pocha (seasonal, bounded exposure) hammered the DS first; kisa-web
(always-on public) consumed the matured DS last. P6 = 17 main lanes,
zero DS bumps. The plan from Phase -1 got this right by reasoning
from blast radius, not from traffic volume — a non-obvious call that
aged extremely well.

### 3. Template-first as concentrate-and-replay
Boards (1 reference + 8 fan-out, each ≤15 LoC) and info (1 reference
+ 4 fan-out) shipped as 32 routes' worth of UI for 2 pastiche
invocations. The pattern wasn't invented for pastiche; pastiche just
fit it cleanly. The fan-out lanes were embarrassingly parallel
because the visual contract was locked in component code, not in
plan prose.

### 4. Dev as a serialization queue
Parallel implementation, serial review, hot-reload polish on the main
clone. Solved the parallel-AI / single-human-reviewer mismatch
without anyone needing to plan for it.

### 5. The a/b/c lane split was used exactly as long as it was needed
Phase 4 introduced it because the logic was novel and hard. Phase 5
dropped it because admin pages aren't logic-heavy. Phase 6 kept it
gone. A pattern that disappears when the work no longer needs it is
a healthy pattern.

## What Didn't Work

### 1. `review-ui-on-browser` stayed manual — and the previous retro misread the cause
The previous entry framed this as an infrastructure problem: Vercel
preview auth, dev-only branch, free-tier rate limits. That's real but
it's not the load-bearing reason. The structural problem is that
**visual-review rubrics are content-dependent**. The skill assumes
you can list "things to check on this page" in the prompt before the
page renders — hierarchy, spacing, primary action visibility, state
coverage, content readability. In practice, the actually-useful review
items emerge from the page itself: that this hero feels too tall, that
the secondary action is competing with the primary, that the empty
state needs a different verb. You cannot pre-list these. You need to
see the page first.

So the skill is not a routine gate; it's a manual reading aid that
assumes the human reviewer is already looking. P4–P6 didn't fix this
and I'm not sure it's fixable inside the skill's current shape — it's
a chicken-and-egg between implementation and reviewable rubric. The
honest version of "what to do here" is probably: stop trying to
auto-rubric the visual review, and instead make the skill very fast
to invoke once I've already seen the page and written down the
specific concerns by hand. That's a different tool.

### 2. The pastiche `## Follow-ups` loop is operator-discipline-shaped
Pastiche surfaces KNOWLEDGE / WISDOM follow-ups well. The deferral
side of the loop is the leak: "may defer" tends to mean "will defer
permanently." This is not a pastiche problem — pastiche did its job —
but the cumulative drift between what pastiche surfaced across P4–P6
and what actually got appended is real. The fix is mine, not the
tool's. Worth naming so it doesn't masquerade as a tooling gap.

### 3. Personal-environment debt ships with the migration
Two items P4 punted on are still owed at ship time: (a) real-Stripe
smoke testing, deferred to "pre-`dev → main` ship" — which is now;
(b) the `setup_future_usage` Stripe flag removal, gated on a
synced client + server change with real-mode Stripe smoke. Both
require infrastructure access I don't have at the unit. The dev →
main PR therefore ships with these confirmations owed and rolled
forward to post-service. This is not a workflow failure — it's a
constraint of the operating environment — but recording it here is
the difference between "we shipped" and "we shipped and we know what
we owe."

### 4. Phase 5 surfaced too late, but "pivot" is the right name for it
Admin consolidation should arguably have been visible at the Phase -1
audit. It wasn't. It surfaced during the Phase 4 audit and pushed the
original Phase 5 → 6. This is not really a failure — pivots are normal
in product work and the harness absorbed it cleanly. But the audit
phase's *replanning* responsibility is undocumented in the harness;
naming it would help future phase plans budget for the same kind of
mid-flight reshape.

## By the Numbers

| Metric | Value |
|--------|-------|
| Window | 2026-05-01 → 2026-05-10 (~9 active days) |
| Phases shipped | 3.5 (back half of P3, post-cutover) + 4 + 5 (renumber) + 6 |
| Lanes — Phase 4 | 15 (a/b/c splits across 4 features) |
| Lanes — Phase 5 | 6 |
| Lanes — Phase 6 | 17 main + 12 parallel fan-out sub-lanes = 29 |
| Lanes total (P4–P6) | ~50 |
| DS patch releases (P3–P6) | 8 (`1.0.21 → 1.0.28`) |
| DS patch releases (P4–P6 only) | 3 (`1.0.25, 1.0.27, 1.0.28`) |
| DS patch releases (Phase 6 alone) | **0** |
| New DS components introduced | 1 (`Sheet`, vaul-based, P4.0) |
| Routes shipped via template-first concentrate+replay | 32 (9 boards + 23 info) |
| Pastiche invocations for those 32 routes | 2 (one reference lane each) |
| Phase-renumbers mid-flight | 1 (P5 inserted, original P5 → P6) |
| Mode D direct-push share — Phase 6 main lanes | 12 / 17 |
| Mode | Mostly Opus 4.6 / 4.7 (1M context) |

---

The component build made the system. The audit phase made the system
document itself. The earlier migration phases made the system document
itself in terms of how its consumers use it. **Phase 4–6 was the first
window where the system was complete enough that the consumer could
just consume it.** Phase 6 shipped 17 main lanes against zero DS bumps
because the DS had already been forced to its real shape by the
seasonal apps that went first. PR #12 tightened the rulebook before the
client work caught up; this window was the first where the rulebook
was ahead of the work — and the work mostly didn't need to look at it
because pastiche held the line. The retro's quiet conclusion is that
the design system, the migration harness, and the implementer skill
finally arrived at the same level of finish at the same time, with one
phase still left to ship to production. That's the asymmetry the
project was built for.
