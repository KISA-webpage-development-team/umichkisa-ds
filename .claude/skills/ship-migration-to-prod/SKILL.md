---
name: ship-migration-to-prod
description: Use when promoting a completed migration phase from `dev` to `main` (prod) in the client repo — typically after the phase's final Verify + end-bump lane lands on dev. Runs prod-safety verification (MSW + mock gates), Toss FE review, dev → main PR, merge, and local rebase. Skip and shipped phases drift, or worse, mock handlers leak into prod.
---

# ship-migration-to-prod

## Overview

A completed phase on `dev` does not automatically reach prod. This skill handles the **dev → main promotion** with explicit safety gates so MSW handlers and mock toggles never ship to users.

**Core principle:** prod-shipping is gated on (a) mock isolation verified, (b) Toss FE findings triaged, (c) user confirmation at the merge. No step is optional.

## When to Use

- All lanes for a phase are ticked in `docs/TODO.md` (typically after Lane N.12 Verify + end-bump merges to dev)
- User invokes `/ship-migration-to-prod` (or names a phase explicitly)
- You're holding `dev` ahead of `main` with a coherent phase delta to ship

**Do NOT use for:**
- Mid-phase work (lanes still open) — that's `wrapping-up-lane` per lane
- Hotfixes off `main` — that's a separate cherry-pick path
- DS repo releases — that's `ds-phase-end-bump`

## Inputs

Resolve before starting:

| Input | How |
|---|---|
| Phase number | From user args, else first contiguous block of ticked `Phase N.*` in `docs/TODO.md` whose phase has not been shipped |
| Phase app dir | `phase 1` = `src/app/(jobs)/jobs`, `phase 2` = `src/app/(pocha)/pocha/manage`, `phase 3` = `src/app/(pocha)/pocha/dashboard`, `phase 4` = `src/app/(pocha)/pocha`, `phase 5` = `src/app/...` (kisa-web) |
| Phase changed surface | `git diff --name-only origin/main..origin/dev -- <phase app dir>/ src/features/<scope>/ src/mocks/` |

Client repo: `KISA-webpage-development-team/KISA-website-client`. Client local: `/Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client`. Client uses **npm** (not pnpm).

## Steps

### Step 1 — Pre-ship safety verification (mock isolation)

Block the prod ship if any mock-mode surface is reachable in production. Run these checks against the **changed surface** and any global mock entrypoints.

**1a. MSW handler isolation.** MSW must only register in dev/mock builds.

```bash
# Find MSW worker registration points
grep -rn "setupWorker\|worker.start\|setupServer" src/mocks/ src/app/ src/lib/ 2>/dev/null

# Verify each registration is gated. Look for one of:
#   process.env.NEXT_PUBLIC_MOCK === "true"
#   process.env.NODE_ENV === "development"
#   a feature flag from src/lib/mock-mode/* (or wherever the project gates mocks)
# An ungated worker.start() is a SHIP-BLOCKER.
```

Read each match. Confirm the call is inside an `if` (or early-return) tied to an env/flag check. If a registration is unconditional, **STOP and report** — fix before continuing.

**1b. Mock auth + mock toggles.** UI surfaces that simulate auth/state in dev must be hidden in prod.

```bash
grep -rn "MockAuthToggle\|MockAuth\|mockMode\|mock-mode\|useMockMode" \
  src/features/ "src/app/(pocha)/" "src/app/(jobs)/" 2>/dev/null
```

For each match:
- Toggle UI components (`MockAuthToggle`, simulate buttons) must render only when mock mode is active.
- Hooks/utilities that branch on mock mode are fine — but verify the **default branch** is the prod path.

**1c. Dev-only features in changed surface.** Anything tagged "Simulate", "Spawn", "/__mock", debug overlays.

```bash
git diff origin/main..origin/dev -- src/ | grep -E "Simulate|__mock|/__|debug|console\.(log|warn)" | head -40
```

`console.log` left in production code is a soft-block (ask user). The others are hard-blocks unless gated.

**1d. WebSocket/long-poll disablement.** If the phase touched real-time hooks (e.g., `useDashboardOrderSocket`), confirm the WS bypass is keyed on mock mode and the prod default still connects.

**1e. Build smoke.**

```bash
cd /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client
git checkout dev && git pull --ff-only
npm run build
```

Any build failure is a ship-blocker. If `NEXT_PUBLIC_MOCK` (or equivalent) leaks into the prod build's env, surface it.

**Output of Step 1:** a one-paragraph safety report listing each gate point + status. If any block is found, STOP — do not proceed to Step 2.

### Step 2 — Toss FE review on the phase delta

Dispatch the `toss-fe-review` agent over the phase's changed surface only (not the full repo).

```
Agent({
  subagent_type: "toss-fe-review",
  description: "Toss FE review — phase <N> delta",
  prompt: "Review the changed frontend surface introduced in phase <N> of the client migration on the `dev` branch (vs origin/main). Files in scope: <output of git diff --name-only origin/main..origin/dev -- <phase app dir>/ src/features/<scope>/>. Apply the four Toss criteria: readability, predictability, cohesion, coupling. Return structured findings with severity. Do not include pre-existing surface outside the phase delta."
})
```

Report findings to the user grouped by severity. For each ≥medium finding ask: **fix now, defer, or accept?**

**If user wants fixes:**

```bash
cd /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client
git worktree add .worktrees/ship-phase-<N>-toss-fixes -b ship/phase-<N>/toss-fixes origin/dev
# Apply fixes in the worktree. Re-run npm run build.
git checkout dev
git merge --no-ff ship/phase-<N>/toss-fixes
git push origin dev
git worktree remove .worktrees/ship-phase-<N>-toss-fixes
git branch -d ship/phase-<N>/toss-fixes
```

Mode D conventions apply (`feedback_no_auto_merge`: confirm before merging; `feedback_interactive_direct_push`: no PR for the fixes themselves — they ride along to dev).

If no findings, skip the worktree and continue.

### Step 3 — Open dev → main PR

```bash
cd /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client
git checkout dev && git pull --ff-only

gh pr create \
  --repo KISA-webpage-development-team/KISA-website-client \
  --base main \
  --head dev \
  --title "Ship phase <N> (<phase-name>) to prod" \
  --body "$(cat <<'EOF'
## Summary
- Phase <N>: <phase-name> — promotes the completed migration phase from dev to main.
- All lanes ticked in DS docs/TODO.md.

## Pre-ship safety checks (Step 1)
- [x] MSW handlers gated on env / mock flag
- [x] Mock auth + simulate toggles hidden in prod build
- [x] No ungated dev-only features in the phase delta
- [x] `npm run build` clean on dev

## Toss FE review (Step 2)
<paste the agent's summary here, or "no findings">

## Test plan
- [ ] Verify <phase app route> loads against prod env after merge
- [ ] Smoke <core flow for the phase, e.g. orders kanban for phase 3>
EOF
)"
```

Surface the PR URL.

### Step 4 — Merge PR + local sync

**Confirm with user before merging.** Per `feedback_no_auto_merge`, never auto-merge to main.

```bash
gh pr merge <PR#> --repo KISA-webpage-development-team/KISA-website-client --merge
# Use --merge (not --squash) for dev→main: preserves the lane-by-lane merge history.
```

Then sync local:

```bash
cd /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client
git fetch origin
git checkout main && git pull --ff-only
git checkout dev
git rebase origin/main
git push origin dev --force-with-lease
```

The rebase keeps `dev` clean and aligned with the new `main` for the next phase. `--force-with-lease` is required because the rebase rewrites dev's history to start from the new main tip; safe because dev is the migration team's branch and you've just verified it's in sync.

**On rebase conflict:** STOP. Show `git status` and ask the user how to reconcile. Do NOT auto-resolve.

### Step 5 — Per-ship report

```
✅ Phase <N> shipped: PR #<PR#> merged to main, dev rebased onto origin/main, local up-to-date.
   Toss findings: <count or none>. Safety gates: all green.
```

## Quick reference

| # | Step | Skip if... | Failure mode if skipped |
|---|------|-----------|-------------------------|
| 1 | Mock-isolation safety check | — | MSW or mock toggles ship to users |
| 2 | Toss FE review on delta | User explicitly opts out | Quality drift accumulates phase-over-phase |
| 3 | Open dev → main PR | — | No reviewable artifact for the ship |
| 4 | Merge + local rebase | — | dev drifts from main; next phase starts on stale base |

## Common mistakes

- **Running build but not the mock-isolation grep.** A clean build does not prove MSW is gated — Next.js will happily bundle `worker.start()` if the file is reachable. Grep first.
- **Squash-merging the dev → main PR.** Use `--merge`. Squash collapses the per-lane history that future phases will want to bisect against.
- **Skipping the rebase.** "Dev is fine" — until next phase's first lane branches off and the merge history forks. Always rebase dev onto the new main.
- **Pushing dev without `--force-with-lease`.** A bare `--force` overrides any concurrent push. `--force-with-lease` fails safely if someone else pushed.
- **Toss findings deferred without writing them down.** If user defers, capture the findings in `docs/TODO.md` under a phase follow-up bullet — not in chat memory.
- **Running Step 1 against `main` instead of `dev`.** The diff is `origin/main..origin/dev`; the verification target is `dev`.

## Red flags — STOP

- "Build is green so mocks are gated" — build green ≠ runtime gated; grep step 1 anyway
- "I'll skip Toss for this phase, it was small" — small phase = small review, not no review
- "I'll rebase dev later" — drift is the whole point of this step; do it now
- "Merge first, run safety check after" — entire skill exists to prevent this