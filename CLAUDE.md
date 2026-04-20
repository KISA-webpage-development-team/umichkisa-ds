# umichkisa-ds — KISA Design System

**NEVER execute without explicit user permission.** "What's next?" is a question, not a go-ahead.

---

## Session Protocol

### Cold-Session Startup

**Preflight** (run every cold session):

1. Read `docs/TODO.md` → find first unchecked entry under "## Client Migration"
2. Read `docs/plans/client-migration/HARNESS_DESIGN.md` → full harness context
3. **DS symlink check** (Phase 0+): `ls -la ../KISA-website/client/node_modules/@umichkisa-ds/web` — if not `->` symlink, run `bash ../KISA-website/client/scripts/link-ds.sh` (requires DS `dist/`; run `pnpm build` first if missing).
4. Read `docs/DS_CODEBASE.md` → know what DS components are available

**Branch on TODO entry type:**

#### Phase kickoff entry (e.g., "Phase 1: jobs-curator (subphases added at kickoff)")

A phase kickoff is just Mode A (audit) applied at the phase level — no separate kickoff artifact. Per `HARNESS_DESIGN.md`:

- Derive folder path: `docs/plans/client-migration/phase-<N>-<slug>/`
- Audit the target app/feature; identify subphases (one per feature/page/lane)
- Write phase-level `audit.md` with subphase list + scope/TDD marks + phase-wide risks
- Expand TODO.md — replace the kickoff entry with one `Phase N.M: <title>` entry per subphase
- Tick the kickoff entry

Next session picks up in Mode B (write `plan.md` with one `## Lane N.M` section per subphase, generate issues).

#### Phase entry or subphase entry (e.g., "Phase 0.5: Shared layout" or "Phase 1.1: jobs list")

Derive the phase folder path (e.g., `docs/plans/client-migration/phase-0.5-layout/` or `docs/plans/client-migration/phase-1-jobs-curator/`). All subphases of a phase share the same `audit.md`/`plan.md`/`notes.md` at the phase root — no per-subphase subfolders.

**Detect mode by repo state:**

- Does `audit.md` exist?
- Does `plan.md` exist?
- Any open PRs: `gh pr list --label ds-client-migration --label phase-<N> --state open`
- Any open issues: `gh issue list --label ds-client-migration --label phase-<N> --state open`

**Propose one of five modes, confirm with user:**

| Mode | Trigger | Flow |
|---|---|---|
| **A. Audit writing** | `audit.md` missing | Invoke `grill-me`; walk the decision tree; write `audit.md`; wait for go-ahead |
| **B. Plan writing + issue generation** | `audit.md` exists, `plan.md` missing | Grill lightly if needed; write `plan.md`; generate per-lane GitHub issues per `AUTONOMOUS_PROTOCOL.md` §3; apply labels per §2; wait for go-ahead |
| **C. PR review** | Sitting PRs exist for the phase | Invoke `review-pr-queue` skill (see `AUTONOMOUS_PROTOCOL.md` §11); group PRs by review effort; per-PR action per §13 and AP-Q3 matrix |
| **D. Interactive execution** | `plan.md` exists, open `needs-interactive` issues without linked PRs (or user overrides to execute live) | Present wave lane menu annotated with issue state per `AUTONOMOUS_PROTOCOL.md` §12; user picks; worktree + `ds-client-constrained-execution` |
| **E. Phase close-out** | All lanes merged, phase ready to close | Check `ds-fixes-log.md`; run `ds-phase-end-bump` if DS fixes accumulated; tick phase in TODO.md |

Claude detects state, proposes the most likely mode, and waits for user confirmation or redirect.

### Natural Breakpoints
At every natural breakpoint (spec complete, phase complete, or context >= 70%), stop and present:
> Breakpoint reached. How would you like to proceed?
> (a) Continue in this session
> (b) Clear context — start a fresh session with clean slate
> (c) Save and stop — come back later

Wait for the user's choice. Do not proceed automatically.

### Post-Merge Sync (after every PR merge)

Non-optional — dev servers stay open and stale state causes confusing "unstaged changes" on next pull. For every repo with a merged PR in the session:

1. `cd` into the repo (client = `../KISA-website/client/`, DS = this repo); `git checkout <base>` if not already (`dev` for client, `main` for DS).
2. `git pull --ff-only`. On divergence, stop and show `git status` + `git log --oneline origin/<branch>..HEAD`; ask how to reconcile. Do NOT auto-merge or reset.
3. Report one line per repo: "✅ `<repo>` `<branch>` up-to-date".

### Closing a task or phase

Before ticking any entry in `docs/TODO.md`:
1. `pnpm build` + `pnpm typecheck` — both must pass
2. If closing a Phase 0+ entry with `ds-fixes-log.md` entries, invoke `ds-phase-end-bump` first
3. Check off the item

---

## Reference

- Client repo: `../KISA-website/client/`
- Client UI components: `../KISA-website/client/src/components/ui/`

## Build & Release

- `pnpm build` / `pnpm typecheck` — both packages (filter: `pnpm --filter @umichkisa-ds/web <cmd>`)
- Publish: bump `version` in package's `package.json`, then `git tag web-vX.X.X && git push --tags` (or `form-vX.X.X`) — GitHub Actions publishes on tag.
