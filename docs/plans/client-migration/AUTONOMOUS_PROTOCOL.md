# Autonomous Execution Protocol

_Authoritative reference for the ds-client-migration autonomous execution harness. Loaded alongside `HARNESS_DESIGN.md`. Read at the start of any client-migration session — particularly Mode C (PR review) and Mode D (interactive execution) — per `CLAUDE.md` session protocol._

**Grill session:** 2026-04-17. All decisions locked in conversation; this doc is the artifact.

---

## 1. Philosophy

This is a **ralph loop** with guardrails — the simplest thing that works, plus the minimum safety to keep a cloud-hosted agent from causing avoidable damage.

- **Task queue:** GitHub issues in the `umichkisa-ds` repo labeled `ds-client-migration`.
- **Driver:** a Claude Code Routine running once per day at 02:00 KST (cloud-hosted, not on your local Mac).
- **Executor:** a Claude Code agent inside the routine, one instance per lane, serial within the run.
- **Output:** GitHub Pull Requests on the `KISA-website/client` and/or `umichkisa-ds` repos.
- **Review:** always human, always live (raw GitHub for mechanical PRs, Claude-assisted session for redesigns / decisions).

Guardrails exist to prevent: merging bad work, touching forbidden files, running away on compute, silently guessing at design decisions. Everything else trusts the agent to execute a well-specified lane.

**Roles:**

| Actor | Role |
|---|---|
| You (Jioh In) | Audit author, plan author, label-gater, PR reviewer, merger, phase close-out |
| Claude (interactive session) | Grill partner during audit/plan, lane executor in Mode D, PR reviewer in Mode B, debugger in Mode E |
| Claude (autonomous routine) | Lane executor overnight, PR opener, `notes.md` appender, self-gated bailout |
| GitHub | Issue queue, PR host, label-based state machine, CI runner, branch protector |

---

## 2. Label Taxonomy

All migration-related issues and PRs use this label set. Labels are the primary state machine — no bespoke YAML, no custom state files.

| Label | Purpose | Applied by |
|---|---|---|
| `ds-client-migration` | Master project label. Filters ALL migration work. | You at issue creation |
| `phase-<N>` | Phase scope (e.g., `phase-0.5`, `phase-1`) | You at issue creation |
| `lane:<id>` | Individual lane (e.g., `lane:0.5.4b`) | You at issue creation |
| `autonomous-ready` | Issue is eligible for nightly routine pickup. Passed the 6-rule gate. | You at issue creation OR after bailout resolution |
| `needs-interactive` | Issue must run in a live Claude session (not nightly). Mutually exclusive with `autonomous-ready`. | You at issue creation |
| `blocked-by:<issue-#>` | Dependency edge. Issue is blocked until referenced issue is closed. | You at issue creation |
| `needs-decision` | Bailout marker: autonomous Claude hit ambiguity, draft PR has a structured question block. | Autonomous Claude |
| `routine-errored` | Routine run itself errored (network, tool error, timeout). WIP draft PR may exist. | Autonomous Claude |
| `ready-for-review` | Autonomous Claude opened PR as non-draft, CI green, self-gates passed. | Autonomous Claude |
| `needs-revision` | You requested revisions on an otherwise-ready autonomous PR. Next nightly routine picks up. | You during PR review |

**Mutual exclusions:** `autonomous-ready` vs `needs-interactive` (one or the other, never both). `ready-for-review` vs `needs-decision` vs `routine-errored` (one of three on any open autonomous PR).

---

## 3. Issue Template

Every lane gets exactly one GitHub issue. Issues are generated at audit/plan time from `plan.md` — one-to-one mapping. Issues are the single input to autonomous execution.

### Template

```markdown
# [Lane <lane-id>] <short lane title>

## Scope tag
`[MECHANICAL|POLISH|REDESIGN]` `[TDD|NO-TDD]`

## Files
- `path/to/file1.tsx` (edit)
- `path/to/file2.tsx` (new)
- `path/to/dead.jsx` (delete)

## Depends on
- Lane <lane-id> (issue #<N>) — must be merged first
- (or: no dependencies)

## Context
One-paragraph why: link to relevant `audit.md` section, reference `DS_CLIENT_USAGE.md` if relevant, note design decisions locked in grill that bear on this lane.

## Acceptance criteria
- [ ] <concrete, verifiable criterion 1>
- [ ] <concrete, verifiable criterion 2>
- [ ] `typecheck` passes
- [ ] No DS client constraint violations per `ds-client-review`
- [ ] (if TDD) specified tests pass; `.skip` tests documented
- [ ] (if redesign) visual diff acceptable on Vercel `dev` preview

## Non-goals (do not touch)
- <explicit out-of-scope file or concern>
- <another>

## Execution skill
`ds-client-constrained-execution` — NO-TDD mode  *(or TDD mode)*

## Bailout triggers
Stop with a `needs-decision` comment if:
- A DS token is missing for a required class swap
- A behavior cannot be replicated within the scope constraints
- Any file outside the `## Files` list is about to be edited
- Tests fail in ways the spec does not anticipate
- <lane-specific trigger>

## Budget
<N> minutes (typical lane ~30 min; 90 min hard cap)

## Expected diff summary
~<N> files touched, ~<LoC> net change. If actual diff deviates significantly (e.g., 3x files), the agent should self-verify before opening PR.

## Links
- `docs/plans/client-migration/phase-<N>-<slug>/audit.md` — lane <id> section
- `docs/DS_CLIENT_USAGE.md`
- `packages/web/src/tokens/semantic.css`
```

### Who writes issues

**You (via Claude)** write all Phase N issues at plan-writing time (Mode B). Claude generates them one-by-one from the plan, you review the issue list as a whole before any autonomous kickoff.

---

## 4. Autonomous-Readiness Gate (6-rule check)

Only issues that pass ALL six rules get the `autonomous-ready` label. Rules applied at label-assignment time; the label itself is the gate for the nightly routine.

### Rules

A lane is autonomous-ready if and only if:

1. **Scope tag is `[MECHANICAL]` or `[POLISH]`** (not `[REDESIGN]`).
2. **All files listed in `## Files` are concrete** — no "TBD", no "needs investigation", no "approximately".
3. **All design decisions touching this lane are locked** in the issue's `## Context` or an upstream audit doc. No open grill threads.
4. **If `[TDD]`, the test cases are pre-specified** in acceptance criteria. `.skip` test cases are explicitly enumerated.
5. **No code in this lane touches:** `src/app/api/**`, auth flow logic, routing middleware, `.env*` files, credentials, or package publish scripts.
6. **Lane scope is self-contained** — doesn't require concurrent editing of files owned by another currently-eligible lane (no `package.json` / lockfile overlap with other `autonomous-ready` issues in the same window).

### Non-passing lanes

Get `needs-interactive` label. Execute via Mode D (live Claude session) using the regular `ds-client-constrained-execution` flow.

### Re-labeling

- A `needs-decision` draft PR's question, once you resolve it, may make the underlying lane autonomous-ready again → remove `needs-decision`, add `needs-revision`.
- A `routine-errored` lane, once the root cause is cleared, may be re-queued by removing the error label.

---

## 5. Routine

### Cadence

**Once per day, 02:00 KST.** Cloud-hosted Claude Code Routine (does not require local Mac).

### Algorithm

```
02:00 KST — Routine fires
  │
  ▼
Query eligible issues:
  gh issue list \
    --repo <target-repo> \
    --label ds-client-migration \
    --label phase-<currentPhase> \
    --label autonomous-ready \
    --state open
  │
  ▼
Filter out any issue with a still-open `blocked-by:<X>` label
  │
  ▼
Filter out any issue whose linked PR is already open
  (prevents double-claiming lanes picked up in live Mode D)
  │
  ▼
Sort: oldest issue creation time first
  │
  ▼
For each eligible issue (until 4h total cap):
  │
  ├─ Read issue spec (template sections)
  ├─ `git fetch origin dev`
  ├─ `git checkout -b ds-client-migration/phase-<N>/<lane-id>-<slug> origin/dev`
  ├─ Execute per `## Execution skill` (ds-client-constrained-execution)
  │   ├─ Respect `## Files` list; bailout if scope drift
  │   ├─ Respect `## Non-goals`; bailout if touched
  │   ├─ Apply `## Bailout triggers`; bailout per AP-Q2 if hit
  │   ├─ Run typecheck + build + ds-client-review
  │   └─ (if TDD) run tests; `.skip` counts as pass
  ├─ Check `## Expected diff summary`; self-sanity-check before PR
  ├─ `git push -u origin <branch>`
  ├─ `gh pr create` with title `[Phase <N> / <lane-id>] <scope>: <summary>`
  ├─ Auto-generated PR body (see §7)
  ├─ Apply PR labels: `ds-client-migration`, `phase-<N>`, `lane:<id>`, end-state label
  ├─ Append one-line entry to phase's `notes.md` (commit to same branch)
  └─ Tag originating issue with `done` label? (optional — PR merge closes issue)
  │
  └─ Hard cap: 90 min per lane. If exceeded:
       ├─ `git commit -m "wip: partial work, bailing to human"`
       ├─ `git push`
       ├─ `gh pr create --draft` with `routine-errored` label
       └─ Move to next lane
  │
  ▼
Total run cap: 4h. Remaining eligible lanes wait for tomorrow.
```

### Caps

| Cap | Value | Rationale |
|---|---|---|
| Per-lane time | 90 minutes | Prevents runaway compute on a pathological case |
| Per-run total time | 4 hours | Bounds nightly cost; leaves buffer before morning |
| Concurrency within a run | 1 (serial) | Simpler; no wall-clock pressure at 02:00 |

### Trigger mechanism

Set up via `schedule` skill or `CronCreate` tool. Target repo: the one where lanes execute (primarily `KISA-website/client`; for Phase 0.5.2 and similar DS-side lanes, target is `umichkisa-ds`).

---

## 6. Bailout Protocol

When autonomous Claude cannot complete a lane cleanly, it does **not guess**. It commits what it has as a draft PR, documents the blocker, and stops.

### States and transitions

| Trigger | Action | Label on PR |
|---|---|---|
| Clean completion, CI passes | Non-draft PR, issue unchanged | `ready-for-review` |
| DS gap discovered | Run `ds-fix-during-migration` mid-lane; continue if resolved | — (transparent fix) |
| Spec ambiguity | Commit WIP, open draft PR with structured question block, stop | `needs-decision` |
| File scope drift (attempted edit outside `## Files`) | Commit WIP before drift, open draft PR, stop | `needs-decision` |
| Tests fail unexpectedly | Commit WIP with test output, open draft PR, stop | `needs-decision` |
| Per-lane 90 min cap | Commit WIP, open draft PR with progress summary, stop | `routine-errored` |
| Tool error / network failure / out of tokens | Attempt commit WIP; open draft PR if any progress | `routine-errored` |

### `needs-decision` PR body structure

```markdown
Closes #<issue-number>

## 🤔 Needs decision

**Stuck on:** <one-line summary of the ambiguity>

**What I attempted:**
<factual description of work done so far>

**What's unclear:**
<specific question>

**Options:**
1. <concrete option>  — tradeoff: ...
2. <concrete option>  — tradeoff: ...
3. <concrete option>  — tradeoff: ...

**My weak preference:** Option N, because ...

## Current state
Branch: `<branch-name>`
Files changed: <list>
CI: <status>

Resolve by leaving a comment with the chosen option and (if needed) additional spec. Remove `needs-decision`, add `needs-revision` — next nightly routine will revise and re-open as non-draft.
```

### Resolution flow

1. You read the draft PR + question block
2. Leave a PR comment with the decision ("Go with option 2")
3. Apply `needs-revision` label, remove `needs-decision`
4. Next 02:00 routine revises (per AP-Q14 below)
5. PR becomes `ready-for-review`
6. You merge

---

## 7. PR & Branch Conventions

### Branch naming

```
ds-client-migration/phase-<N>/<lane-id>-<short-slug>
```

Example: `ds-client-migration/phase-0.5/0.5.4b-navmenu-retokenize`

Branches off `dev`. Merged via PR. Squash-merge deletes the branch.

### PR title

```
[Phase <N> / <lane-id>] <scope>: <one-line summary>
```

Example: `[Phase 0.5 / 0.5.4b] NavMenu: retokenize + drop framer-motion`

### PR body (auto-generated by autonomous Claude)

```markdown
Closes #<issue-number>

## Summary
<1-2 sentences>

## Changes
- `path/to/file1`: <what changed>
- `path/to/file2`: <what changed>

## Verification
- [x] typecheck passed
- [x] ds-client-review passed (no violations)
- [x] (if TDD) <M> tests pass, <K> tests `.skip`'d (documented)
- [x] build passed

## Scope tag
`[POLISH]` `[NO-TDD]` — matches issue spec

## Notes
<anything worth flagging for reviewer; empty if nothing>
```

### Merge strategy

**Squash-merge, one commit per PR.** Feature branch deleted on merge.

### Labels on PR

Mirror issue labels at PR open time. Add end-state label (`ready-for-review` / `needs-decision` / `routine-errored`).

---

## 8. Merge Authority

**Human-only merge.** No auto-merge, regardless of scope tag or CI status.

**Branch protection on `dev`:**
- Require status checks to pass before merge (typecheck, build, ds-client-review bot if configured)
- Require 1 approval (your self-approval)
- No direct pushes; all work via PR
- Auto-delete head branches on merge

Autonomous Claude opens PRs but never merges. You are the sole merge authority.

**Merge + dependent unblock** (in Claude session, natural language):

When you say:
> "merge PR #42 and unblock dependents"

Claude:
1. `gh pr merge 42 --squash --delete-branch`
2. Identifies the linked issue via PR body
3. `gh issue list --label blocked-by:<issue-#>` — finds dependents
4. For each dependent: `gh issue edit <N> --remove-label blocked-by:<issue-#>`
5. Reports which dependents are now eligible

---

## 9. Permission Scope (Autonomous Session)

Autonomous agents run under **restricted scope**. These are constraints passed to the routine's Claude session.

### Allowed tools (full access)

- `Edit`, `Write`, `Read`, `Grep`, `Glob` — all file operations within scope
- `Agent` — for invoking skills and review agents
- `WebFetch`, `WebSearch` — read-only; reference docs (React, Tailwind, shadcn, Radix, lucide)

### `Bash` — allowlisted commands only

- `pnpm` / `npm` subcommands: `build`, `test`, `typecheck`, `install` (no-arg, lockfile sync only)
- `gh` CLI: `pr create`, `pr view`, `pr edit`, `issue view`, `issue edit`, `issue list`, `issue comment`
- `git`: `fetch`, `checkout` (new branch), `add`, `commit`, `push` (feature branch only), `status`, `diff`, `log`
- `tsc --noEmit`
- `ls`, `cat` (read-only utilities, narrow use)

### Hard-denied

- `rm -rf`, `git reset --hard`, `git push --force`, `git clean -fd`
- `npm publish`, `pnpm publish`
- Any command touching `.env*`, `~/.ssh/`, `~/.config/gh/`, credentials
- `killall`, system-level ops, sudo

### Scope constraints (soft — enforced by agent discipline + audit)

- Only edit files listed in the issue's `## Files` section; bailout otherwise
- Do not install new dependencies (only `[MECHANICAL]` lanes tagged `dependency-change` may do so, and those are `needs-interactive`)
- Do not modify `package.json` version, tags, or releases

### Trust ramp

Phase 0.5 runs under this restricted scope. After 3 completed phases without an autonomous-caused incident, the scope may be expanded to allow a broader `Bash` allowlist. Escalation is a deliberate protocol amendment, not implicit.

---

## 10. Cold-Session Modes (CLAUDE.md Session Protocol)

When you start a Claude Code session and say "pick up the task," the cold-session protocol detects repo state and proposes one of five modes. You confirm; Claude proceeds.

### Detection

On startup (post-HARNESS check and DS symlink check):

1. Read `docs/TODO.md` → find current phase (first unchecked under "## Client Migration")
2. Locate phase folder: `docs/plans/client-migration/phase-<N>-<slug>/`
3. Query repo state:
   - Does `audit.md` exist?
   - Does `plan.md` exist?
   - `gh pr list --label ds-client-migration --label phase-<N> --state open` — any sitting PRs?
   - `gh issue list --label ds-client-migration --label phase-<N> --state open` — any open issues? (indicates work not yet done)

### Mode selection

| Mode | Trigger | Flow |
|---|---|---|
| **A. Audit writing** | `audit.md` missing | Grill-me session → write `audit.md` → wait for go-ahead |
| **B. Plan writing + issue generation** | `audit.md` exists, `plan.md` missing | Grill (minor, as needed) → write `plan.md` → generate per-lane GitHub issues per §3 → apply labels → wait for go-ahead to enable routine |
| **C. PR review** | Sitting PRs exist for phase | Invoke `review-pr-queue` skill (see §11) to group and present PRs; per-PR action per AP-Q3 matrix |
| **D. Interactive execution** | `plan.md` exists, open `needs-interactive` issues without linked PRs, OR user overrides to execute live | Present wave lane menu (annotated per §12); user picks; worktree + `ds-client-constrained-execution` |
| **E. Phase close-out** | All lanes merged, phase marked ready | Check `ds-fixes-log.md` for phase entries; run `ds-phase-end-bump` if any; tick phase in TODO.md |

### Protocol

1. Claude detects state and says:
   > "I see [state summary]. Likely mode: **X**. Proceed with Mode X, or do you want a different mode (list available)?"
2. You confirm or redirect.
3. Claude proceeds per the confirmed mode.
4. NEVER execute without explicit go-ahead (per CLAUDE.md rule).

---

## 11. Daily Review Workflow (`review-pr-queue` Skill)

_Status: spec'd below, implementation pending. To be created as a Claude Code skill in `docs/plans/client-migration/phase-0.5-layout/` or as a shared skill in `.claude/skills/review-pr-queue/`._

### Purpose

When you start your daily availability window, this skill fetches all open autonomous PRs for the current phase and presents them grouped by required review effort, with direct links.

### Input

`--phase <N>` (defaults to current phase from TODO.md)

### Output

```markdown
### Today's PR queue (phase-0.5) — 5 open

✅ **Skim-and-merge (3)** — CI green, no decisions pending
- [MECHANICAL] #43 [0.5.4a] Header cleanup — https://github.com/.../pull/43
- [POLISH]     #44 [0.5.4f] MobileMenuButton — https://github.com/.../pull/44
- [POLISH]     #45 [0.5.5]  Footer — https://github.com/.../pull/45

🧐 **Needs live review (2)** — redesign, decision, or your comments
- [REDESIGN]        #46 [0.5.4e] UserInfo (Avatar-only) — https://github.com/.../pull/46
- [needs-decision]  #47 [0.5.4b] NavMenu (draft) — https://github.com/.../pull/47
    ↳ Question: "Should backdrop-blur be kept at 90% opacity or 80%?"

⚠️ **CI failing (0):** none

📝 **Needs revision (0):** none

---
Pick a PR to start with, or say "skim and merge the ready ones" to batch-merge the green PRs.
```

### Skill responsibilities

1. Run `gh pr list` with phase + migration labels
2. Classify each PR by labels and review state
3. For `needs-decision` PRs, pull the question block from the PR body
4. Present compact menu with URLs
5. On user pick, hand off to appropriate flow:
   - Skim-and-merge: open URL in browser (or offer `gh pr merge` command)
   - Live review: enter Mode B flow (read diff, use grill-me / ui-ux-pro-max / systematic-debugging as needed)

### When invoked

- Automatically suggested by Mode C cold-session detection
- Manually via `/review-pr-queue` slash command

---

## 12. Single Source of Truth (Lane State)

**GitHub issues + their linked PRs are the authoritative lane state machine.** `plan.md` is the plan; `notes.md` is the breadcrumb trail; neither tracks execution state.

### Issue states

| GitHub state | Meaning |
|---|---|
| Open, no linked PR | Lane **available** |
| Open, linked draft PR | Lane **in-progress** (autonomous has it or user has it in worktree) |
| Open, linked non-draft PR | Lane **awaiting review** |
| Closed (via PR merge) | Lane **done** |
| Closed (manually) | Lane **skipped** — dependents need their `blocked-by:<N>` removed |

### Lane menu annotation (Mode D)

Before presenting the wave lane menu, Claude queries:

```sh
gh issue list --repo <repo> --label ds-client-migration --label phase-<N> --state open \
  --json number,title,labels,linkedPullRequests
```

And annotates each lane:

```
Wave 3 lanes — pick one:
  ✗ 0.5.4b — PR #42 open (autonomous claimed last night)    ← DO NOT PICK
  ✗ 0.5.4d — PR #43 open (autonomous claimed last night)    ← DO NOT PICK
  ○ 0.5.4e — available                                       ← PICKABLE
  ○ 0.5.4f — available                                       ← PICKABLE
  ✓ 0.5.5  — done (merged yesterday)                         ← SKIP
```

User picks only from `○` rows. Prevents collisions with overnight autonomous work.

### Autonomous routine's analogous check

Before executing a lane, the routine queries the same way. If the issue already has an open PR, skip — means interactive claimed it live.

---

## 13. PR Review Comments (Revision Flow)

When you review an autonomous PR and leave an actionable comment.

### Your options per comment

| Comment type | Action | Time to resolution |
|---|---|---|
| Trivial (typo, one-line fix) | Edit on GitHub or locally, commit, merge | Immediate |
| Clear change request (larger) | Add `needs-revision` label, leave comment, go about day | Next 02:00 routine |
| Design discussion | Open Claude session, live back-and-forth, resolve | Same session |
| Out of scope for this lane | Comment "defer to separate issue/lane", merge PR as-is | Immediate |

### Autonomous revision flow (when `needs-revision` label applied)

Next 02:00 routine picks up `needs-revision` PRs **alongside** fresh eligible issues.

For each `needs-revision` PR:

1. Read all unresolved review comments
2. Classify each:
   - **Question** → reply in thread, no code change, mark thread resolved
   - **Clear change request** → make change in a new commit on same branch, `git push`, reply "Applied in <commit>", mark thread resolved
   - **Ambiguous** → reply asking for clarification, keep thread open, ADD `needs-decision` label (both labels present = you decide)
   - **Out of scope** → reply "This belongs in lane X; suggest deferring. Confirm to merge-as-is or I'll bail."
3. When all threads resolved or awaiting reply, remove `needs-revision` label.

### Push discipline

New commits on the feature branch, NOT force-push. Squash-merge consolidates them when you merge.

### Spec drift protection

If your comment contradicts the original issue spec, autonomous Claude should say so:
> "Issue spec says X. Your comment asks for Y. Should I update the spec + do Y, or leave as-is per spec?"

---

## 14. DS Fixes During Migration

Two flows, both existing skills. No change from HARNESS design.

### Mid-lane (during execution)

Invoked when a lane discovers a DS gap (missing token, component bug, registry omission).

Skill: `ds-fix-during-migration`

Flow:
1. Pause client lane work
2. Switch to DS repo (same machine, different package dir)
3. Fix DS component or token
4. `pnpm build` in DS
5. Verify via `npm link` symlink (client picks up new DS build automatically)
6. Append to `docs/plans/client-migration/ds-fixes-log.md`
7. Return to client lane, continue

Autonomous Claude can invoke this skill only for fixes that are scope-safe:
- Pure SVG additions to icon registry
- Adding missing variants to existing components (with clear spec)
- Token additions already approved in prior grill

Scope-unsafe fixes (component restructure, breaking API change) → bailout to `needs-decision`.

### Phase-end bump

Invoked in Mode E (phase close-out).

Skill: `ds-phase-end-bump`

Flow:
1. Check `ds-fixes-log.md` for phase's fixes
2. Bump `@umichkisa-ds/web` version in `packages/web/package.json`
3. Commit + tag `web-vX.Y.Z`
4. Push tag → GitHub Actions publishes to npm
5. Update `KISA-website/client/package.json` to pinned new version
6. `npm install` in client
7. Commit client version bump

---

## 15. Skills Referenced

| Skill | Purpose |
|---|---|
| `grill-me` | Audit + plan grill sessions (Modes A, B) |
| `ds-client-constrained-execution` | Lane execution (autonomous + interactive) |
| `ds-fix-during-migration` | Mid-lane DS fixes |
| `ds-phase-end-bump` | Phase close-out version bump + publish |
| `using-git-worktrees` | Local worktree setup for interactive lanes (Mode D) |
| `finishing-a-development-branch` | Final PR + merge for interactive lanes |
| `review-pr-queue` | Mode C PR queue dispatcher (to be created) |
| `ui-ux-pro-max` | Visual/design critique during live PR review |
| `systematic-debugging` | Mode B `routine-errored` or complex CI-fail diagnosis |
| `vercel-react-best-practices` | Final lane pass (per HARNESS) |

---

## 16. Setup Checklist (One-Time)

Before the first autonomous run can happen:

- [ ] Enable branch protection on `dev` in both repos (umichkisa-ds, KISA-website):
  - Required status checks (typecheck, build, CI)
  - Require 1 review approval
  - No direct pushes
  - Auto-delete merged branches
- [ ] Create all label definitions in both GitHub repos (`ds-client-migration`, `phase-<N>`, `lane:*`, `autonomous-ready`, `needs-interactive`, `blocked-by:*`, `needs-decision`, `routine-errored`, `ready-for-review`, `needs-revision`)
- [ ] Set `NEXT_PUBLIC_MOCK_API=1` in Vercel `dev` branch env vars (for Phase 0.5 hybrid auth — already noted in Phase 0 plan)
- [ ] Configure Claude Code Routine via `schedule` skill:
  - Target repo: `KISA-website/client` (for most lanes) or `umichkisa-ds` (for DS-side lanes)
  - Cron: `0 17 * * *` UTC (= 02:00 KST, KST is UTC+9)
  - Prompt: "Execute the autonomous ds-client-migration routine per `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md` §5"
  - Permissions: restricted scope per §9
- [ ] Verify first issue (a low-risk `[MECHANICAL]` trial lane) is labeled `autonomous-ready` with no blockers
- [ ] Wait for first nightly run; review the morning output as the litmus test
- [ ] If trial succeeds: label remaining eligible lanes as `autonomous-ready`
- [ ] Create `review-pr-queue` skill (spec in §11)

---

## 17. Trial Lane Recommendation

First autonomous run should be the **lowest-risk, highest-observable lane** — a pure mechanical that produces a visible, reviewable diff but can't break much.

**Phase 0.5 trial candidate: Lane 0.5.4a (Header cleanup & renames)**

- `[MECHANICAL]` `[NO-TDD]`
- Files: delete 8 dead files, rename 1 file, update imports
- Self-contained, no behavioral change
- Easy to verify: site still renders identically
- If it fails, rollback is trivial (close PR, no merge)

Do NOT trial with:
- 0.5.1 (route groups — too many file moves for first test)
- 0.5.2 (DS icon SVGs — involves cross-repo work)
- 0.5.3 (auth infra — `needs-interactive` anyway)

---

## 18. Simplification Levers (Future)

Complexity to revisit if the protocol proves heavy in practice:

1. **Drop mid-lane DS fixes** — batch all DS fixes at phase end instead. Removes §14a flow.
2. **Fold `routine-errored` into `needs-decision`** — single bailout state.
3. **Drop the 6-rule readiness gate; use scope tag only** — `[MECHANICAL]` + `[POLISH]` = autonomous-ready by default.
4. **Skip revision flow (AP-Q14, §13)** — handle all revisions live in Mode B. Removes nightly revision cycle.
5. **Single lane per nightly run instead of serial-all-eligible** — simpler, slower.
6. **Skip `review-pr-queue` skill** — just use `gh pr list` manually in Mode B.

Each lever trades complexity for speed or quality. Pick when the complexity stops earning its keep.

---

## 19. Amendment Log

| Date | Change | Reason |
|---|---|---|
| 2026-04-17 | Initial draft (13 AP questions + 3 follow-ups) | Phase 0.5 kickoff |
