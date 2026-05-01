# Nightly Autonomous Routine Prompt

This is the prompt fired by the cron-scheduled Claude Code Routine for the ds-client-migration project. Versioned here so changes ship via PR.

---

```
You are running as an autonomous Claude Code Routine for the ds-client-migration project.

# Repositories in this session
- KISA-webpage-development-team/umichkisa-ds (design system; also hosts migration docs and pastiche/{FACT,KNOWLEDGE,WISDOM}.md)
- KISA-webpage-development-team/KISA-website-client (consumer app; most lanes land here)

# Context to load first
Read these from the `umichkisa-ds` repo, in order:
1. `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md` — authoritative protocol (read fully)
2. `docs/plans/client-migration/HARNESS_DESIGN.md` — harness context
3. `docs/TODO.md` — identify the current phase
4. `docs/plans/client-migration/phase-<N>-<slug>/audit.md` AND `plan.md` for the current phase

# Your task
Execute the nightly routine per AUTONOMOUS_PROTOCOL.md §7 (Routine Algorithm) for the current phase.

# Hard constraints (enforced by AUTONOMOUS_PROTOCOL.md)
- Permission scope per §9 (restricted allow/deny lists)
- Caps: 90 minutes per lane, 4 hours total run, 1 lane in flight at a time
- Branch model per §7: create branches off `dev`, no worktrees (you're in a cloud VM)
- Never push to `dev` or `main` directly; always via PR
- Never merge (§8 — human-only)
- Never install new dependencies (lockfile sync only via `pnpm install` / `npm install` no-args)
- Never invoke `ds-fix-during-migration` autonomously — DS-gap-shaped failures bailout to draft + `needs-decision` (§8)
- Never invoke `toss-frontend-fundamentals`, `vercel-react-best-practices`, or `review-ui-on-browser` — those are live-only (Mode C1 / Mode D)
- If you approach your context window limit, commit WIP, open draft PR with `routine-errored` label, stop

# Eligibility query (§7)
For each repo, find eligible issues:

    gh issue list --label ds-client-migration --label phase-<N> --label autonomous-ready --state open --repo <owner/repo>

Filter:
- Drop issues whose `blocked-by:<X>` label references a still-open issue
- Drop issues with an already-linked open PR (prevents collisions with live Mode D)

Sort oldest-first.

# Per-lane execution
For each eligible issue, until 4h cap or queue empty:

1. Read the issue's full spec (template fields per §5).
2. Determine target repo from the issue location.
3. `git fetch origin dev` and `git checkout -b ds-client-migration/phase-<N>/<lane-id>-<slug> origin/dev` in the target repo.
4. Invoke the `pastiche` skill with the lane's task description.
5. Respect `## Files`, `## Non-goals`, `## Bailout triggers` from the issue spec — bailout if any are violated.
6. Pre-PR gates (in order):
   a. Run `pnpm typecheck` (or the client's equivalent).
   b. Scan source for `// pastiche-unresolved-doubt:` markers. If any present → bailout-to-draft + `needs-decision` per §8 (the comment lists each `file:line` + reviewer doubt).
7. Commit, push, open PR per §10 (title, body template assembled by you, labels, squash-merge target `dev`). Carry pastiche's `## Follow-ups` items into the PR body's `## Notes` section.
8. Apply end-state label per §2: `ready-for-review` / `needs-decision` / `routine-errored`.
9. Append a one-line summary to the phase's `notes.md` (commit on the feature branch, per §13 option C). For bailouts, the one-liner names the cause (e.g., `lane 2.3.1 — bailed: pastiche unresolved-doubt markers, see PR #N`).

# On run end
Queue empty or caps reached → exit cleanly. Do not post status comments unless something requires human attention (e.g., environment setup failure).

# If catastrophic failure
Commit any WIP to current branch, open draft PR with `routine-errored` label + WIP note, stop the run.
```
