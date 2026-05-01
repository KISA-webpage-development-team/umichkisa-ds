---
name: wrapping-up-lane
description: Use when wrapping up a completed ds-client-migration lane — Mode D (direct-push, worktree cleanup) or Mode C (PR merge, branch cleanup). Same tail checklist for both: close issue, strip labels, unblock dependents, tick TODO, post-merge sync. Skipping any step leaves stale labels, open issues for merged work, or stale local state.
---

# wrapping-up-lane

## Overview

Closing out a migration lane is an **atomic checklist** that fires for every completion path. Whether the lane shipped via PR (Mode C) or via direct-push to `dev` (Mode D), the **tail steps are identical** — close the issue, strip eligibility labels, unblock dependents, tick TODO, sync. The only difference is the close-the-lane mechanic at the top.

PRs merge to `dev` (not `main`), so GitHub auto-close does **NOT** fire — every step is manual and mandatory.

**Core principle:** No step is optional. Skipping any of them poisons future-session queries (Mode D pickup menu, `blocked-by:` dependent searches, `gh issue list --state open`).

## Path fork (top of the checklist)

```
Lane complete
   │
   ├── Mode D (interactive, direct-push, worktree)  →  Path A
   └── Mode C (PR review)                            →  Path B
                          │
                          └── then both run the same Tail (Steps 3–7 + sync)
```

## When to Use

- **Mode D**: interactive lane finished in `client/.worktrees/<lane-id>`, user has confirmed the feature works on `dev` (per `feedback_merge_is_not_wrapup` — wrap-up is gated on user feature-confirmation, not on merge).
- **Mode C**: merging an autonomous PR, batch skim-and-merge from `review-pr-queue`, autonomous-routine revision auto-merge, or superseding-PR scenarios.

**Do NOT use for:**
- DS-internal PRs that merge to `main` (plain DS feature PRs, docs PRs not labeled `ds-client-migration`) — those use GitHub's auto-close-on-merge and have no migration TODO entry.
- PRs not labeled `ds-client-migration`.

---

## Path A — Mode D close (direct-push + worktree cleanup)

If you got here via Mode C, skip to Path B. Otherwise:

### Step 1A — Merge worktree branch into `dev` and push

```bash
# In the main client clone (not the worktree):
cd ../KISA-website/client
git checkout dev && git pull --ff-only
git merge --no-ff <lane-branch>     # or fast-forward if linear
git push origin dev
```

Per `feedback_no_auto_merge`: ask user before this merge. Per `feedback_merge_does_not_mean_push`: only push if user said merge+push (or is explicitly wrapping up). Per `feedback_merge_is_not_wrapup`: do NOT proceed past Step 1A until the user has confirmed the feature works on `dev`.

### Step 2A — Clean up worktree + branch

```bash
git worktree remove client/.worktrees/<lane-id>
git branch -d <lane-branch>
git push origin --delete <lane-branch>
```

If `git worktree remove` complains about uncommitted changes in the worktree, STOP and surface — don't `--force`. The user may have local debug state worth preserving.

Mode D has no PR, so there are no PR labels to strip. **Jump to the Tail.**

---

## Path B — Mode C close (PR merge)

### Step 1B — Merge the PR

```bash
gh pr merge <N> --repo <owner/name> --squash --delete-branch
# Add --admin if base policy blocks (pre-authorized for migration PRs)
```

### Step 2B — Strip PR end-state labels

Whichever are present (safe to call with absent ones):

- `ready-for-review`
- `needs-revision`
- `needs-decision`
- `routine-errored`

```bash
gh pr edit <N> --repo <owner/name> --remove-label <label>
```

---

## Tail (identical for both paths)

> **The #1 reason this skill exists is that label-strip in Mode D gets forgotten.** Path A skips Step 2B (no PR labels), but Steps 3–5b below are NOT optional in Mode D. The lane has a GitHub issue with eligibility labels regardless of how it shipped.

### Step 3 — Close the linked issue

PRs merge to `dev`, not the repo default branch, so GitHub auto-close does **NOT** fire. Direct-push doesn't fire it either. Close manually.

**Path B (PR)** — parse `Closes #M` / `Fixes #M` from PR body:
```bash
gh issue close <M> --repo <owner/name> --reason completed \
  --comment "Closed via #<N> (merged to dev)."
```

**Path A (Mode D)** — issue # is known from lane setup (`gh issue list --label lane:<id>` per `feedback_check_existing_issue`):
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

**This is the step most often skipped on Mode D wrap-up.** Run it.

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

The dependency edge is gone — the label has no more meaning, and stale `blocked-by:#` labels accumulate across phases.

```bash
gh label delete "blocked-by:<M>" --yes --repo <owner/name>
```

Safe to call even if the label doesn't exist; tolerate the error.

### Step 6 — Tick TODO.md

`docs/TODO.md` lives in the **DS repo** (`umichkisa-ds`), not the client repo. Perform the edit; never leave it as a verbal reminder.

1. Read `docs/TODO.md`
2. Find the entry for this lane / subphase under `## Client Migration`
3. Change `- [ ]` → `- [x]` for that single entry
4. **Do NOT auto-tick the parent phase entry** even if all subphases are now ticked — Mode E owns that decision.

### Step 7 — Per-lane report (one line)

**Path B (PR):**
```
✅ merged client#<N>, closed #<M>, dependents unblocked: [#X, #Y], TODO.md `Phase N.M` ticked
```

**Path A (Mode D):**
```
✅ pushed Lane <N.M> to dev, worktree cleaned, closed #<M>, dependents unblocked: [...], TODO.md `Phase N.M` ticked
```

---

## After all lanes in the session — Post-merge sync

**Non-optional.** Dev servers stay open and stale state causes confusing "unstaged changes" on next pull.

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

| # | Step | Path | Skip if... | Failure mode if skipped |
|---|------|------|-----------|-------------------------|
| 1A | Merge to dev + push | A | — | Lane never shipped |
| 2A | Worktree + branch cleanup | A | — | Stale worktree dir + local branch |
| 1B | `gh pr merge` | B | — | PR not merged |
| 2B | Strip PR end-state labels | B | — | Stale `ready-for-review` on merged PRs |
| 3 | Close linked issue | both | — | Open issue for shipped work |
| 4 | Strip issue eligibility labels | both | — | Mode D pickup menu shows closed issues as eligible |
| 5 | Unblock dependents | both | — | Downstream lanes invisible in Mode D |
| 5b | Delete `blocked-by:<M>` label | both | — | Stale labels accumulate across phases |
| 6 | Tick TODO.md | both | — | Phase progress lies; cold-session preflight picks the wrong entry |
| 7 | Per-lane report | both | — | User can't verify what fired |
| 8 | Post-merge sync | both | No repo had a merge this session | Next session: confusing "unstaged changes" surprise |

## Common mistakes

- **Mode D label-strip skip is the #1 omission this skill exists to prevent.** No PR ≠ no labels. The issue still has `autonomous-ready` / `needs-interactive` / `blocked-by:`. Run Steps 3–5b every time.
- **Mode D worktree not removed.** Step 2A's `git worktree remove` is mandatory; deleting the branch alone leaves the worktree dir behind.
- **Chaining all steps in one Bash call.** Run sequentially with separate Bash invocations so any failure is visible. Steps 2 + 3 + 4 can chain if confident, but step 5 (dependent query) MUST be separate so its output guides 5b.
- **Forgetting step 6 (TODO.md tick).** TODO lives in the DS repo, not the client repo where the merge happened — easy to miss.
- **Skipping step 5 because "probably no dependents."** Verify with the query.
- **Auto-ticking the parent phase entry** when the last subphase merges. That's Mode E's job.
- **Skipping post-merge sync** because the dev server is open. Leads to "unstaged changes" surprise next session.

## Red flags — STOP if you catch yourself thinking:

- "Mode D doesn't have a PR, so the close-issue/label-strip don't apply" ← **the lie this skill is built to catch**
- "The dependent unblock query probably returns empty, I'll skip"
- "TODO.md is small, I'll tick later"
- "It's just one lane, no need for the full ceremony"
- "I'll batch all the cleanup at the end of the session"
- "The issue body doesn't have `Closes #`, so there's no linked issue" (check `gh issue list --label lane:<id>` — the issue exists)

All of these mean: run the full sequence anyway.

## Related

- `AUTONOMOUS_PROTOCOL.md` §8 — delegates to this skill
- `review-pr-queue` skill — delegates to this skill on merge path
- `CLAUDE.md` "Wrapping up a merged PR / lane" — delegates to this skill
- `feedback_interactive_direct_push` (memory) — Mode D lanes push directly, no PR
- `feedback_merge_closes_issue` (memory) — every merge closes linked issue + strips labels; no step optional
- `feedback_merge_is_not_wrapup` (memory) — wait for user feature-confirmation before wrap-up
- `feedback_check_existing_issue` (memory) — issue # exists from plan-writing time; query `gh issue list --label lane:<id>`
