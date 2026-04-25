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

Migration work produces PRs in **both repos**:

- **Client repo** (`KISA-webpage-development-team/KISA-website-client`) — lane migration PRs (the main queue)
- **DS repo** (`KISA-webpage-development-team/umichkisa-ds`) — DS fixes discovered during migration (`ds-fix-during-migration`)

Query both. Run in parallel:

```sh
# Client repo (lane migrations)
gh pr list \
  --repo KISA-webpage-development-team/KISA-website-client \
  --label ds-client-migration \
  --state open \
  --json number,title,labels,statusCheckRollup,author,createdAt,headRefName,reviewDecision,body,url \
  --limit 50

# DS repo (migration-driven DS fixes)
gh pr list \
  --repo KISA-webpage-development-team/umichkisa-ds \
  --label ds-client-migration \
  --state open \
  --json number,title,labels,statusCheckRollup,author,createdAt,headRefName,reviewDecision,body,url \
  --limit 50
```

If `--phase <N>` provided, add `--label phase-<N>` to both queries. Default: current phase from `docs/TODO.md`.

When zero PRs exist in **either** repo, state both as empty (do not say "queue empty" from a single repo).

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

Group by **repo first**, then by bucket within each repo. Prefix PR numbers with `client#` or `ds#` to disambiguate (the two repos share numbers).

```markdown
### Today's PR queue (phase-0.5) — 5 client + 1 DS open

#### Client repo (5)

✅ **Skim-and-merge (3)** — CI green, no decisions pending
- [MECHANICAL] client#43 [0.5.4a] Header cleanup — https://github.com/.../pull/43
- [POLISH]     client#44 [0.5.4f] MobileMenuButton — https://github.com/.../pull/44
- [POLISH]     client#45 [0.5.5]  Footer — https://github.com/.../pull/45

🧐 **Needs live review (2)** — redesign, decision, or your comments
- [REDESIGN]        client#46 [0.5.4e] UserInfo (Avatar-only) — https://github.com/.../pull/46
- [needs-decision]  client#47 [0.5.4b] NavMenu (draft)        — https://github.com/.../pull/47
    ↳ Stuck on: Should backdrop-blur stay at 90% opacity or drop to 80%?

⚠️ **CI failing (0):** none
📝 **Needs revision (0):** none
🛠 **Routine errored (0):** none

#### DS repo (1)

✅ **Skim-and-merge (1)**
- [DS-FIX] ds#112 Add Instagram brand icon — https://github.com/.../pull/112

---
Pick a PR to start with (e.g. `client#46` or `ds#112`), or say "skim and merge the ready ones" to batch-merge the green PRs across both repos.
```

If a repo has zero open PRs, show the repo heading with `(0) — none` on one line; don't omit it.

Keep presentation compact — column-align PR numbers and lane tags where possible. Limit body preview to one line.

## Handoff Behavior on User Pick

User says `#46` or "let's do UserInfo" → match to PR → route:

| Bucket picked | Action |
|---|---|
| Skim-and-merge | Confirm intent → invoke `wrapping-up-pr` per PR |
| Needs live review | Fetch diff; `grill-me` (decision) or `ui-ux-pro-max` (redesign); on eventual merge → `wrapping-up-pr` |
| CI failing | `superpowers:systematic-debugging` + `gh run view` |
| Needs revision | Refine revision comment or flip to live-edit (rare for user to pick) |
| Routine errored | `superpowers:systematic-debugging` + PR body WIP notes |

Always pass `--repo <owner/name>` to all `gh` calls (cwd default hits the wrong repo for cross-repo PRs). Use `KISA-webpage-development-team/KISA-website-client` for `client#N`, `KISA-webpage-development-team/umichkisa-ds` for `ds#N`.

For batch skim-and-merge: confirm once ("Merge 4 PRs: ...?"), then invoke `wrapping-up-pr` per PR.

## Common Patterns

**Phase filter missing:** if `docs/TODO.md` doesn't clearly have a current phase, prompt user ("Which phase? 0.5 is last active.") instead of querying all phases.

**Empty queue:** say so explicitly and suggest Mode D (interactive execution) or Mode E (phase close-out) based on whether open lanes remain.

**User has review comments on a `ready-for-review` PR:** re-classify to needs live review automatically (reviewDecision is `CHANGES_REQUESTED` or there are unresolved threads).

## Related

- Full review protocol: `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md` §11, §13
- Merge close-out: `wrapping-up-pr` skill (delegated; AP §8 also delegates here)
- PR type → review mode matrix: `AUTONOMOUS_PROTOCOL.md` §13 (AP-Q3)
