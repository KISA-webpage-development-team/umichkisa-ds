---
name: wrapping-up-pr
description: Use when wrapping up a merged ds-client-migration PR (single, batch, or Mode D direct push) — covers merge → label strip → close linked issue → unblock dependents → tick TODO.md → post-merge sync. Skipping any step leaves stale labels, open issues for merged work, unticked TODO entries, or stale local branches that surface as confusing state next session.
---

# wrapping-up-pr

## Overview

Closing out merged migration work is a **7-step atomic sequence** that fires for every merge path: single PR merge in Mode C, batch skim-and-merge, the autonomous-routine's revision flow, AND Mode D direct-push lanes (no PR). PRs merge to `dev` (not `main`), so GitHub auto-close does **NOT** fire — every step is manual and mandatory.

**Core principle:** No step is optional. Skipping any one of them poisons future-session queries (Mode D pickup menu, `blocked-by:` dependent searches, `gh issue list --state open`).

## When to Use

- Merging a single PR ("merge #113")
- Batch merging the skim-and-merge bucket from `review-pr-queue` ("skim and merge the ready ones")
- Autonomous routine's revision-PR auto-merge after `needs-revision` re-opens as `ready-for-review` (§13)
- Superseding-PR scenarios (stacked-branch base deleted; close the ORIGINAL issue against the superseding PR number)
- **Mode D interactive lanes** — direct push to `dev`, no PR (per `feedback_interactive_direct_push`)

**Do NOT use for:**
- DS-internal PRs that merge to `main` (e.g. plain DS feature PRs, docs PRs not labeled `ds-client-migration`) — those use GitHub's auto-close-on-merge and have no migration TODO entry
- PRs not labeled `ds-client-migration`

## The Sequence (per PR or per direct-push lane)

Run sequentially. **Do not chain all steps in one Bash call** — failures must be visible per step.

### Step 1 — Merge / push

**PR-based path** (Mode C, autonomous, supersedes):
```bash
gh pr merge <N> --repo <owner/name> --squash --delete-branch
# Add --admin if base policy blocks (pre-authorized for migration PRs)
```

**Mode D direct-push path** (interactive lane, no PR):
```bash
# Already on the lane branch in the main client clone
git checkout dev && git pull --ff-only
git merge --no-ff <lane-branch>     # or fast-forward if linear
git push origin dev
git branch -d <lane-branch>
git push origin --delete <lane-branch>
```

### Step 2 — Strip PR end-state labels (PR-based path only)

Whichever are present — safe to call with absent ones:
- `ready-for-review`
- `needs-revision`
- `needs-decision`
- `routine-errored`

```bash
gh pr edit <N> --repo <owner/name> --remove-label <label>
```

Skip this step entirely for Mode D direct-push (no PR exists).

### Step 3 — Close the linked issue

PRs merge to `dev`, not the repo default branch, so GitHub auto-close does **NOT** fire. Close manually.

**PR-based path** — parse `Closes #M` / `Fixes #M` from PR body:
```bash
gh issue close <M> --repo <owner/name> --reason completed \
  --comment "Closed via #<N> (merged to dev)."
```

**Mode D direct-push path** — issue # is known from the lane setup:
```bash
gh issue close <M> --repo <owner/name> --reason completed \
  --comment "Closed via direct push to dev (Lane <N.M>, commits <abc>..<def>)."
```

### Step 4 — Strip issue eligibility labels (now-closed issue)

These describe pickup eligibility for OPEN work; on a closed issue they poison Mode D pickup queries.

- `autonomous-ready`
- `needs-interactive`

```bash
gh issue edit <M> --repo <owner/name> \
  --remove-label autonomous-ready --remove-label needs-interactive
```

### Step 5 — Unblock dependents

```bash
gh issue list --repo <owner/name> --label "blocked-by:<M>" --state open --json number
```

For each result:
```bash
gh issue edit <dep#> --repo <owner/name> --remove-label "blocked-by:<M>"
```

**Verify, don't assume.** Even when "no dependents likely" — query and confirm.

### Step 5b — Delete the `blocked-by:<M>` label itself

The dependency edge is gone — the label has no more meaning, and stale `blocked-by:#` labels accumulate across phases (38+ stale labels was the trigger for adding this step). Delete it once dependents are unblocked.

```bash
gh label delete "blocked-by:<M>" --yes --repo <owner/name>
```

Safe to call even if the label doesn't exist (e.g., issue had no dependents → label was never created); `gh` returns non-zero but no harm done. Tolerate the error.

### Step 6 — Tick TODO.md

`docs/TODO.md` lives in the **DS repo** (`umichkisa-ds`), not the client repo. The skill itself performs the edit; never leave it as a verbal reminder.

1. Read `docs/TODO.md`
2. Find the entry for this lane / subphase under `## Client Migration`
3. Change `- [ ]` → `- [x]` for that single entry
4. **Do NOT auto-tick the parent phase entry** even if all subphases are now ticked — parent phase ticking is gated by **Mode E** (phase close-out + `ds-phase-end-bump` if applicable). Mode E owns that decision.

### Step 7 — Per-PR / per-lane report (one line)

```
✅ merged client#<N>, closed #<M>, dependents unblocked: [#X, #Y], TODO.md `Phase N.M` ticked
```

For Mode D direct-push:
```
✅ pushed Lane <N.M> to dev, closed #<M>, dependents unblocked: [...], TODO.md `Phase N.M` ticked
```

## After all PRs / lanes in the session — Post-merge sync

**Non-optional** (per CLAUDE.md). Dev servers stay open and stale state causes confusing "unstaged changes" on next pull.

For each repo with a merged PR or direct-push in the session:

```bash
cd <repo>
git checkout <base>     # client = dev, DS = main
git pull --ff-only
```

- Client repo (`KISA-website/client`) base = `dev`
- DS repo (`umichkisa-ds`) base = `main`

**On divergence:** STOP. Show `git status` + `git log --oneline origin/<base>..HEAD`. Ask the user how to reconcile. Do NOT auto-merge or reset.

Report one line per repo:
```
✅ KISA-website/client dev up-to-date
✅ umichkisa-ds main up-to-date
```

## Quick reference

| # | Step | Skip if... | Failure mode if skipped |
|---|------|-----------|-------------------------|
| 1 | Merge PR / push to dev | — | Nothing to wrap up |
| 2 | Strip PR end-state labels | Mode D (no PR) | Stale `ready-for-review` on merged PRs |
| 3 | Close linked issue | — | Open issue for merged work; breaks `gh issue list --state open` queries |
| 4 | Strip issue eligibility labels | — | Mode D pickup menu shows closed issues as eligible |
| 5 | Unblock dependents | — | Downstream lanes invisible in Mode D |
| 5b | Delete `blocked-by:<M>` label | — | Stale labels accumulate across phases |
| 6 | Tick TODO.md | — | Phase progress lies; cold-session preflight picks the wrong entry |
| 7 | Per-PR report | — | User can't verify what fired |
| 8 | Post-merge sync | No repo had a merge this session | Next session: confusing "unstaged changes" surprise |

## Common mistakes

- **Chaining all 7 steps in one Bash call.** Run them sequentially with separate Bash invocations so any failure is visible. The exception: steps 2 + 3 + 4 can chain if you're confident, but step 5 (dependent query) MUST be separate so its output guides step 5b (per-dependent edit).
- **Forgetting step 6 (TODO.md tick).** Most common omission. The TODO entry lives in the DS repo, not the client repo where the merge happened — easy to miss.
- **Skipping step 5 because "probably no dependents."** Verify with the query, don't assume.
- **Skipping step 4 because "the issue is closed already."** Eligibility labels still poison Mode D queries.
- **Auto-ticking the parent phase entry** when the last subphase merges. That's Mode E's job; respect the boundary.
- **Skipping post-merge sync** because the dev server is open. Leads to "unstaged changes" surprise next session — you'll think you have local work when really you're just behind origin.
- **Mode D path forgetting steps 3–6.** The absence of a PR makes it tempting to think the lane is "done" once pushed. It isn't — issue close, label strip, dependent unblock, and TODO tick all still apply.

## Red flags — STOP if you catch yourself thinking:

- "The dependent unblock query probably returns empty, I'll skip"
- "TODO.md is small, I'll tick later"
- "It's just one PR, no need for the full ceremony"
- "I'll batch all the cleanup at the end of the session"
- "Mode D doesn't have a PR, so the close-issue/label-strip don't apply"
- "The issue body doesn't have `Closes #`, so there's no linked issue" (check the lane plan / phase folder — the issue # is recorded there)

All of these mean: run the full sequence anyway.

## Related

- `AUTONOMOUS_PROTOCOL.md` §8 — delegates to this skill
- `review-pr-queue` skill, "Handoff Behavior on User Pick" — delegates to this skill on merge path
- `CLAUDE.md` "Post-Merge Sync" — delegates to this skill (step 8 covers sync)
- `feedback_interactive_direct_push` (memory) — Mode D lanes push directly, no PR
- `feedback_merge_closes_issue` (memory) — every merge closes linked issue + strips labels; no step optional
