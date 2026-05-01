# Autonomous Execution Protocol

_Authoritative reference for the ds-client-migration autonomous execution harness. Loaded alongside `HARNESS_DESIGN.md`. Read at the start of any client-migration session — particularly Modes C1/C2 (PR review) and Mode D (interactive execution) — per `CLAUDE.md` session protocol._

> **For Claude:** This is operational reference. CLAUDE.md inlines the cold-session
> mode-detection logic — you do NOT read this doc end-to-end on every session.
> Load only the slice for the confirmed mode (see CLAUDE.md lazy-load table).

**Grill session:** 2026-04-17. Subsequent amendments tracked in §15.

---

# Part 1 — Universal Reference

## 1. Philosophy & Roles

A **ralph loop** with guardrails: GitHub issues = task queue, a daily 02:00 KST cloud routine drains them serially, output is PRs, review is always human and live. Guardrails exist to prevent merging bad work, touching forbidden files, runaway compute, and silent design guesses. Everything else trusts the agent on a well-specified lane.

| Actor | Role |
|---|---|
| You (Jioh In) | Audit author, plan author, label-gater, PR reviewer, merger, phase close-out |
| Claude (interactive session) | Grill partner during audit/plan, lane executor in Mode D, PR reviewer in Modes C1/C2, debugger in Mode E |
| Claude (autonomous routine) | Lane executor overnight, PR opener, `notes.md` appender, self-gated bailout |
| GitHub | Issue queue, PR host, label-based state machine, CI runner, branch protector |

## 2. Label Taxonomy

Labels are the state machine — no bespoke YAML, no custom state files.

| Label | Purpose | Applied by |
|---|---|---|
| `ds-client-migration` | Master project label | You at issue creation |
| `phase-<N>` | Phase scope | You at issue creation |
| `lane:<id>` | Individual lane | You at issue creation |
| `autonomous-ready` | Eligible for nightly routine. Passed §6 gate. | You at issue creation OR after bailout resolution |
| `needs-interactive` | Must run live in Mode D. Mutex with `autonomous-ready`. | You at issue creation |
| `blocked-by:<issue-#>` | Dependency edge | You at issue creation |
| `needs-decision` | Bailout: routine hit ambiguity; draft PR has question block | Autonomous Claude |
| `routine-errored` | Routine itself errored (network, tool, timeout) | Autonomous Claude |
| `ready-for-review` | PR opened non-draft, CI green, self-gates passed | Autonomous Claude |
| `needs-revision` | You requested revisions on a `ready-for-review` PR | You during PR review |

**Mutex:** `autonomous-ready` ⊕ `needs-interactive`. `ready-for-review` ⊕ `needs-decision` ⊕ `routine-errored`.

**End-state labels** (`ready-for-review`, `needs-decision`, `routine-errored`, `needs-revision`) are stripped at merge — closed PR state replaces them.

## 3. Mode Definitions

Six modes, detected per the CLAUDE.md preflight table. Cold session: Claude proposes mode, you confirm, Claude proceeds. **Never execute without explicit go-ahead.**

| Mode | Trigger | Flow |
|---|---|---|
| **A. Audit** | `audit.md` missing | Grill-me → write `audit.md` → wait. Loads §5. |
| **B. Plan + issues** | `audit.md` exists, `plan.md` missing | Grill (light) → write `plan.md` → generate per-lane issues per §5 → apply labels per §6 → wait. Loads §5, §6. |
| **C1. PR review (ready)** | Sitting PR; no `needs-decision` / `needs-interactive` label, CI green | `review-pr-queue` → user picks → Claude `git fetch origin && git checkout <pr-branch>` in `../KISA-website/client/` (main clone) → "checked out, review when ready" → wait silently → on "good" → `wrapping-up-pr`. On feedback: see §3.1. |
| **C2. PR review (interactive)** | Sitting PR with `needs-decision` or `needs-interactive` label | Same checkout → live discussion (grill-me / ui-ux-pro-max / systematic-debugging) → resolve → fix on branch → `wrapping-up-pr`. |
| **D. Interactive execution** | `plan.md` exists; open `needs-interactive` issue without linked PR, OR user override | Wave lane menu (annotated per §11) → user picks → worktree at `../KISA-website/client/.worktrees/<lane-id>/` off `origin/dev` → `pastiche` skill. |
| **E. Phase close-out** | All lanes merged | Check `ds-fixes-log.md`; run `ds-phase-end-bump` if entries; tick phase in TODO.md. |

### 3.1 Feedback during review (C1/C2)

- **Default — fix on the same branch.** Bugfixes, copy/styling tweaks, prop renames, single-file scope, anything inside the lane's stated audit scope. Commit + push to the PR branch.
- **Defer to a new lane** (propose, wait for confirm) when the fix touches files outside the lane's audit scope, OR requires a DS change (`ds-fix-during-migration`), OR adds a new feature/component not in the lane.

  Phrasing: "This is out of scope for [lane-id] (reason: …). Defer to a new lane, or stretch this PR's scope?"

### 3.2 Parallel-terminal safety

User runs Mode C and Mode D in different terminals concurrently. Isolation:

- **Mode C** → main client clone (`../KISA-website/client/`). One PR at a time.
- **Mode D** → nested worktree (`../KISA-website/client/.worktrees/<lane-id>/`) off `origin/dev`.

The two never touch the same working directory.

### 3.3 Mode D post-pastiche workflow

`pastiche` is DS-scoped — it does not typecheck, run tests, run general code-quality review, or commit. After the skill returns, walk through the following with the user (Mode D is live).

**Triage pastiche output (with the user)**

1. **Inline `// pastiche-unresolved-doubt:` markers — block the commit.** Together with the user, read each marker. Decide: fix the code, or accept the implementation as-is. In either case the marker line is deleted before commit.
2. **`## Follow-ups` items — do not block the commit.** Each is a `KNOWLEDGE.md` or `WISDOM.md` candidate. With the user, decide: append to the relevant doc in the DS repo and re-run the tag-sanity lint, or skip as noise. May be deferred.

**Verify**

3. Run `pnpm typecheck` from the worktree. Fix anything.

**Code-quality reviews — suggest, do not auto-run (token-heavy)**

4. **If the lane touches UI**, always suggest invoking `vercel-react-best-practices` (final React/Next.js pass). User can say skip.
5. **Suggest one of:**
   - `toss-frontend-fundamentals` — when the lane is logic-heavy (state, effects, data flow, hooks, transformations).
   - `review-ui-on-browser` — when the lane is UI-heavy (visual layout, component composition, interactions).

   Pick which to suggest based on the lane's actual character; only suggest both if the lane is genuinely both. User can say skip.

**Ship**

6. Merge the worktree branch into `dev` and push (Mode D = direct push to `dev`, no PR — see `feedback_interactive_direct_push`). Confirm with the user before merging — see `feedback_no_auto_merge`.
7. Wrap up the lane (close linked issue, strip labels — see `feedback_merge_closes_issue`, `feedback_check_existing_issue`).

### 3.4 Mode C1 post-checkout suggestion

Mirrors §3.3's suggest-don't-auto-run pattern for the live-PR-review path. Code-quality reviews are token-heavy; the autonomous routine deliberately skips them, so C1 is the place to offer them on autonomous-shipped PRs.

After Claude checks out the PR branch and says "checked out, review when ready":

1. **If the PR touches UI**, suggest invoking `vercel-react-best-practices`. User can say skip.
2. **Suggest one of:**
   - `toss-frontend-fundamentals` — when the PR is logic-heavy (state, effects, data flow, hooks, transformations).
   - `review-ui-on-browser` — when the PR is UI-heavy (visual layout, component composition, interactions).

   Pick which to suggest based on the diff's character; only suggest both if the diff is genuinely both. User can say skip.

Then proceed with the silent-wait → "good" → `wrapping-up-pr` flow.

## 4. Skills Index

| Skill | Purpose |
|---|---|
| `grill-me` | Audit + plan grill (Modes A, B) |
| `pastiche` | Lane execution (autonomous + Mode D) |
| `ds-fix-during-migration` | Mid-lane DS fixes |
| `ds-phase-end-bump` | Mid-phase + phase-end DS version bump + publish |
| `using-git-worktrees` | Mode D worktree setup |
| `wrapping-up-pr` | Post-merge close-out (every merge path) |
| `review-pr-queue` | Mode C1/C2 PR queue dispatcher |
| `ui-ux-pro-max` | Visual/design critique in C2 |
| `systematic-debugging` | C2 / `routine-errored` diagnosis |
| `vercel-react-best-practices` | Optional final code-quality pass after pastiche |
| `toss-frontend-fundamentals` | Optional general code-quality review after pastiche (out of pastiche's DS-only scope) |
| `review-ui-on-browser` | Manual visual review via Playwright CLI on dev server (C/D only, never autonomous) |

---

# Part 2 — Planning Slice (Modes A/B)

## 5. Issue Template

Every lane = one issue, generated at plan-writing from `plan.md`. Issues are the sole input to autonomous execution.

```markdown
# [Lane <lane-id>] <short title>

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
One paragraph: link to `audit.md` section, note locked design decisions.

## Acceptance criteria
- [ ] <concrete criterion>
- [ ] `typecheck` passes
- [ ] No unresolved findings from the `pastiche` skill
- [ ] (if TDD) tests pass; `.skip` documented
- [ ] (if redesign) visual diff acceptable on Vercel `dev` preview

## Non-goals (do not touch)
- <out-of-scope file or concern>

## Bailout triggers
Stop with `needs-decision` if:
- DS token missing for required class swap
- Behavior cannot be replicated within scope
- Any file outside `## Files` is about to be edited
- Tests fail in unanticipated ways
- <lane-specific>

## Budget
<N> minutes (typical ~30 min; 90 min hard cap)

## Expected diff summary
~<N> files, ~<LoC> net. If actual diff deviates 3x, self-verify before PR.

## Links
- `docs/plans/client-migration/phase-<N>-<slug>/audit.md` — lane <id> section
- `docs/DS_CLIENT_USAGE.md`
- `packages/web/src/tokens/semantic.css`
```

You write all Phase N issues at plan-writing time (Mode B). Claude generates one-by-one from the plan; you review the issue list before any autonomous kickoff.

## 6. Autonomous-Readiness Gate (6 rules)

A lane gets `autonomous-ready` iff ALL six hold:

1. Scope tag is `[MECHANICAL]` or `[POLISH]` (not `[REDESIGN]`).
2. All files in `## Files` are concrete — no "TBD" / "investigate" / "approximately".
3. All design decisions touching the lane are locked in `## Context` or upstream audit.
4. If `[TDD]`, test cases pre-specified in acceptance criteria; `.skip`s enumerated.
5. No code touches: `src/app/api/**`, auth flow, routing middleware, `.env*`, credentials, package publish scripts.
6. Lane is self-contained — no `package.json` / lockfile overlap with other currently-eligible lanes.

Non-passing lanes get `needs-interactive` → Mode D.

**Re-labeling:** when a `needs-decision` PR's question is resolved, remove `needs-decision`, add `needs-revision`; the next routine revises and re-opens non-draft.

---

# Part 3 — Autonomous Routine Reference

## 7. Routine Algorithm

**Cadence:** once per day, 02:00 KST. Cloud-hosted Claude Code Routine (no local Mac required).

Per run:

1. `gh issue list --label ds-client-migration --label phase-<N> --label autonomous-ready --state open` in target repo.
2. Filter out issues with open `blocked-by:<X>` or already-linked open PR (prevents collisions with live Mode D).
3. Sort oldest-first.
4. For each, until 4h cap: read spec → `git fetch origin dev` → `git checkout -b ds-client-migration/phase-<N>/<lane-id>-<slug> origin/dev` → execute via `pastiche` → run `pnpm typecheck` → commit → push → `gh pr create` → apply labels → append one line to `notes.md`.
5. Per-lane 90 min hard cap → commit WIP, draft PR with `routine-errored`, next lane.

**Caps:** 90 min/lane, 4h/run, 1 lane in flight at a time (serial).

**Trigger:** `schedule` skill or `CronCreate`. Target repo: usually `KISA-website/client`; for DS-side lanes (e.g., 0.5.2), `umichkisa-ds`.

## 8. Bailout Protocol

Autonomous Claude does **not guess**. It commits WIP as a draft PR, documents the blocker, stops.

| Trigger | Action | PR label |
|---|---|---|
| Clean completion, CI green, no `// pastiche-unresolved-doubt:` markers | Non-draft PR | `ready-for-review` |
| `// pastiche-unresolved-doubt:` markers present after pastiche | Commit WIP, draft PR + comment listing each `file:line` + reviewer doubt, stop | `needs-decision` |
| DS gap suspected (missing/broken atom; pastiche or typecheck signals) | Commit WIP, draft PR + comment naming the suspected gap, stop. Never auto-invoke `ds-fix-during-migration`. | `needs-decision` |
| Spec ambiguity | Commit WIP, draft PR + question block, stop | `needs-decision` |
| File scope drift (touched outside `## Files`) | Commit WIP before drift, draft PR, stop | `needs-decision` |
| Tests fail unexpectedly | Commit WIP + test output, draft PR, stop | `needs-decision` |
| 90 min lane cap | Commit WIP + progress summary, draft PR, stop | `routine-errored` |
| Tool/network/token error | Attempt commit WIP; draft PR if any progress | `routine-errored` |

### `needs-decision` PR body

```markdown
Closes #<issue-number>

## 🤔 Needs decision

**Stuck on:** <one-line summary>

**What I attempted:** <factual description>

**What's unclear:** <specific question>

**Options:**
1. <option> — tradeoff: …
2. <option> — tradeoff: …

**My weak preference:** Option N, because …

## Current state
Branch: `<branch-name>` · Files: <list> · CI: <status>

Resolve by leaving a comment with the chosen option. Remove `needs-decision`, add `needs-revision` — next routine revises.
```

### Resolution flow

You read draft + question → leave decision comment → swap `needs-decision` → `needs-revision` → next 02:00 routine revises (per §13) → PR becomes `ready-for-review` → you merge.

## 9. Permission Scope (Autonomous)

### Allowed (full)
- `Edit`, `Write`, `Read`, `Grep`, `Glob`
- `Agent` (skills, review agents)
- `WebFetch`, `WebSearch` (read-only ref docs)

### `Bash` allowlist
- `pnpm`/`npm`: `build`, `test`, `typecheck`, `install` (no-arg lockfile sync only)
- `gh`: `pr create`, `pr view`, `pr edit`, `issue view`, `issue edit`, `issue list`, `issue comment`
- `git`: `fetch`, `checkout` (new branch), `add`, `commit`, `push` (feature branch), `status`, `diff`, `log`
- `tsc --noEmit`, `ls`, `cat`

### Hard-denied
- `rm -rf`, `git reset --hard`, `git push --force`, `git clean -fd`
- `npm publish`, `pnpm publish`
- Any command touching `.env*`, `~/.ssh/`, `~/.config/gh/`, credentials
- `killall`, sudo, system-level ops

### Soft (agent discipline + audit)
- Edit only files in `## Files`; bailout otherwise
- No new dependencies (only `[MECHANICAL]` lanes tagged `dependency-change`, which are `needs-interactive` anyway)
- No `package.json` version / tag / release edits

**Trust ramp:** Phase 0.5 runs under this scope. After 3 phases without an autonomous-caused incident, scope may be expanded — deliberate amendment, not implicit.

## 10. PR & Branch Conventions

**Branch:** `ds-client-migration/phase-<N>/<lane-id>-<short-slug>`, off `dev`, squash-merged, deleted on merge.

**PR title:** `[Phase <N> / <lane-id>] <scope>: <summary>`

**PR body:** assembled by the routine after `pastiche` returns. Always opens with `Closes #<issue>` and includes `## Summary` / `## Changes` / `## Verification` / `## Scope tag` / `## Notes` (carry pastiche's `## Follow-ups` items here for human triage).

**Labels on PR:** mirror issue labels at open + add end-state label.

**Merge:** human-only, no auto-merge regardless of scope tag or CI. Branch protection on `dev` requires status checks (typecheck, build, ds-client-review), 1 approval, no direct pushes, auto-delete head branches. Autonomous opens PRs, never merges. Every merge path (single, batch, revision auto-merge, superseding, Mode D direct push) closes with `wrapping-up-pr`.

---

# Part 4 — Operational Reference (Live Sessions)

## 11. Lane State (Single Source of Truth)

**GitHub issues + linked PRs are the authoritative lane state machine.** `plan.md` is the plan; `notes.md` is the breadcrumb trail; neither tracks execution state.

| GitHub state | Meaning |
|---|---|
| Open, no linked PR | **available** |
| Open, linked draft PR | **in-progress** (autonomous or live worktree) |
| Open, linked non-draft PR | **awaiting review** |
| Closed via PR merge | **done** |
| Closed manually | **skipped** — dependents need `blocked-by:<N>` removed |

### Lane menu annotation (Mode D)

Before presenting the wave menu, query:

```sh
gh issue list --repo <repo> --label ds-client-migration --label phase-<N> --state open \
  --json number,title,labels,linkedPullRequests
```

Annotate:

```
Wave 3 — pick one:
  ✗ 0.5.4b — PR #42 open (autonomous claimed last night)    ← DO NOT PICK
  ○ 0.5.4e — available                                       ← PICKABLE
  ✓ 0.5.5  — done                                            ← SKIP
```

User picks only `○`. Autonomous routine runs the same check before claiming a lane (skips if open PR exists).

## 12. PR Review Comments (Revision Flow)

| Comment type | Action | Resolution |
|---|---|---|
| Trivial (typo, one-liner) | Edit on GitHub or locally, commit, merge | Immediate |
| Clear larger change | `needs-revision` label + comment, walk away | Next 02:00 routine |
| Design discussion | Open Claude session, live back-and-forth | Same session |
| Out of scope | Comment "defer to separate lane", merge as-is | Immediate |

### Autonomous revision flow (`needs-revision` set)

Next 02:00 routine picks up `needs-revision` PRs alongside fresh issues. For each:

1. Read unresolved review comments.
2. Classify each: **Question** → reply, no code change, resolve. **Clear change** → new commit on same branch, push, reply "Applied in <commit>", resolve. **Ambiguous** → reply asking, keep open, ADD `needs-decision` (both labels = you decide). **Out of scope** → reply "belongs in lane X; suggest deferring. Confirm to merge-as-is or I bail."
3. When all threads resolved/awaiting, remove `needs-revision`.

**Push discipline:** new commits on feature branch, NOT force-push. Squash-merge consolidates at merge.

**Spec drift:** if a review comment contradicts the original issue spec, autonomous Claude says so: *"Issue spec says X. Your comment asks for Y. Update spec + do Y, or leave as-is per spec?"*

## 13. DS Fixes During Migration

Two skills handle this. AP just covers project-specific scheduling rules.

### Mid-lane fix (`ds-fix-during-migration`)

Triggered when a lane discovers a DS gap (missing token, component bug, registry omission). Skill handles: pause client lane → switch to DS repo → fix → `pnpm build` → npm-link picks up → log to `ds-fixes-log.md` → resume.

Autonomous Claude may invoke only for scope-safe fixes: pure SVG additions to icon registry, missing variants on existing components with clear spec, token additions approved in prior grill. Unsafe (component restructure, breaking API change) → `needs-decision`.

### Mid-phase pre-consume bump (`ds-phase-end-bump`, fired mid-phase)

When a client lane consumes a DS addition produced by an earlier lane in the same phase, the lockfile-pinned DS version predates the addition → consuming lane's CI typecheck fails. Insert a patch-bump lane between producer and consumer.

- **Mid-phase bumps are always patch** (per memory: ALL DS bumps are patch).
- Producer lane's PR must be merged to DS `main` first; verify the new symbol is in source (e.g., `packages/web/src/components/icon/registry.ts`).
- Consumer lane depends on the bump lane via `blocked-by:<issue-#>`.
- All bump lanes are `needs-interactive` (publish is hard-denied for autonomous per §9).
- **Omission recovery:** if plan-writing missed it and the routine hits the gap (lane 0.5.5, 2026-04-18 precedent), the consuming lane bails `needs-decision` per §8; you run the bump interactively; relabel `needs-revision`; next routine finishes it.

### Phase-end bump (`ds-phase-end-bump`, Mode E)

Same skill, fired in Mode E when `ds-fixes-log.md` has phase entries. Skill handles version bump + tag + publish + client repin.

---

# Part 5 — Amendment Log

## 14. Amendments

| Date | Change | Reason |
|---|---|---|
| 2026-04-17 | Initial draft | Phase 0.5 kickoff |
| 2026-04-17 | Strip end-state labels at merge (§2, §10) | Lane 0.5.2 PR #2 merged with stale `ready-for-review` label |
| 2026-04-18 | Add mid-phase pre-consume bump (§13) | Lane 0.5.5 (PR #59): client pin `1.0.0` predated `instagram-brand` icon merged in 0.5.2 |
| 2026-04-25 | Split Mode C → C1/C2; Mode D → worktree off `dev` (`client/.worktrees/`); add §3.1 feedback-during-review and §3.2 parallel-terminal safety; restructure into Parts 1–5 for mode-slice contiguity; drop stale Setup Checklist + Trial Lane + Simplification Levers + ASCII routine flow + duplicate Detection subsection | User workflow review: PRs reviewed locally not on GitHub; Mode C and Mode D run in parallel terminals → directory collision |
