---
name: review-pr-queue
description: Use when starting a daily PR review session for ds-client-migration work, or when cold-session Mode C detects sitting PRs. Fetches open autonomous PRs, groups them by required review effort (skim-and-merge, needs live review, CI failing, needs revision), and presents a compact menu with URLs and decision-block previews.
---

# review-pr-queue

## Overview

Daily entry point for reviewing autonomous migration PRs. Replaces ad-hoc `gh pr list` scans with a classified, actionable queue. Invoked from cold-session Mode C or manually via `/review-pr-queue`.

## When to Use

- Cold session detects sitting PRs labeled `ds-client-migration` (Mode C)
- You're starting your daily availability window and want to see what autonomous produced overnight
- A PR review session is about to start and you need triage

**Do NOT use for:**
- Non-migration PRs (use raw `gh pr list`)
- Individual PR deep-review (this skill is dispatcher only)

## Query

```sh
gh pr list \
  --label ds-client-migration \
  --state open \
  --json number,title,labels,statusCheckRollup,author,createdAt,headRefName,reviewDecision,body \
  --limit 50
```

If `--phase <N>` provided, add `--label phase-<N>`. Default: current phase from `docs/TODO.md`.

## Classification

Assign each PR to exactly one bucket by labels + CI status:

| Bucket | Conditions |
|---|---|
| ✅ **Skim-and-merge** | label `ready-for-review`, CI green (`statusCheckRollup` all success), no `needs-revision`/`needs-decision`/`routine-errored` |
| 🧐 **Needs live review** | tag `[REDESIGN]` OR label `needs-decision` OR any unresolved review comment. CI may be green. |
| ⚠️ **CI failing** | `statusCheckRollup` contains failure/error, regardless of labels |
| 📝 **Needs revision** | label `needs-revision` (you requested changes; autonomous re-runs next night) |
| 🛠 **Routine errored** | label `routine-errored` |

Scope tag (`[MECHANICAL]` / `[POLISH]` / `[REDESIGN]`) is extracted from the first bracket of the PR title.

For PRs labeled `needs-decision`, pull the decision block from the PR body by matching the section starting with `## 🤔 Needs decision` and taking the `**Stuck on:**` line (or the next non-empty line after the header).

## Presentation Format

```markdown
### Today's PR queue (phase-0.5) — 5 open

✅ **Skim-and-merge (3)** — CI green, no decisions pending
- [MECHANICAL] #43 [0.5.4a] Header cleanup — https://github.com/.../pull/43
- [POLISH]     #44 [0.5.4f] MobileMenuButton — https://github.com/.../pull/44
- [POLISH]     #45 [0.5.5]  Footer — https://github.com/.../pull/45

🧐 **Needs live review (2)** — redesign, decision, or your comments
- [REDESIGN]        #46 [0.5.4e] UserInfo (Avatar-only) — https://github.com/.../pull/46
- [needs-decision]  #47 [0.5.4b] NavMenu (draft)        — https://github.com/.../pull/47
    ↳ Stuck on: Should backdrop-blur stay at 90% opacity or drop to 80%?

⚠️ **CI failing (0):** none
📝 **Needs revision (0):** none
🛠 **Routine errored (0):** none

---
Pick a PR to start with, or say "skim and merge the ready ones" to batch-merge the green PRs.
```

Keep presentation compact — column-align PR numbers and lane tags where possible. Limit body preview to one line.

## Handoff Behavior on User Pick

User says `#46` or "let's do UserInfo" → match to PR → route:

| Bucket picked | Action |
|---|---|
| Skim-and-merge | Offer: "Review on GitHub? Or merge now via `gh pr merge <N> --squash --delete-branch`?" Hand off per user choice. |
| Needs live review | Enter Mode B flow: fetch PR diff, use `grill-me` (for decision PRs) or `ui-ux-pro-max` (for redesigns). Hand the PR number to the review flow. |
| CI failing | Invoke `superpowers:systematic-debugging`; fetch CI logs via `gh run view`. |
| Needs revision | Unusual to pick this (autonomous handles it). If user picks, offer to refine the revision request comment or flip back to live-edit. |
| Routine errored | Invoke `superpowers:systematic-debugging`; fetch routine error context from PR body WIP notes. |

For "skim and merge the ready ones" batch command:
1. List the skim-and-merge bucket
2. Confirm once ("Merge 3 PRs: #43, #44, #45?")
3. On yes, for each: `gh pr merge <N> --squash --delete-branch`
4. After all merges, unblock dependents: find each merged PR's linked issue, then `gh issue list --label blocked-by:<issue-#>` and remove the label from each dependent

## Common Patterns

**Phase filter missing:** if `docs/TODO.md` doesn't clearly have a current phase, prompt user ("Which phase? 0.5 is last active.") instead of querying all phases.

**Empty queue:** say so explicitly and suggest Mode D (interactive execution) or Mode E (phase close-out) based on whether open lanes remain.

**User has review comments on a `ready-for-review` PR:** re-classify to needs live review automatically (reviewDecision is `CHANGES_REQUESTED` or there are unresolved threads).

## Related

- Full review protocol: `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md` §11, §13
- Merge + dependent-unblock: `AUTONOMOUS_PROTOCOL.md` §8
- PR type → review mode matrix: `AUTONOMOUS_PROTOCOL.md` §13 (AP-Q3)
