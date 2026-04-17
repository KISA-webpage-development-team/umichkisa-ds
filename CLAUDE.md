# umichkisa-ds — KISA Design System

**NEVER execute without explicit user permission.** "What's next?" is a question, not a go-ahead.

---

## Session Protocol

### Cold-Session Startup

**Preflight** (run every cold session):

1. Read `docs/TODO.md` → find first unchecked entry under "## Client Migration"
2. Read `docs/plans/client-migration/HARNESS_DESIGN.md` → full harness context
3. **DS symlink check** (Phases 0+ only, before any client code):
   Run `ls -la ../KISA-website/client/node_modules/@umichkisa-ds/web 2>/dev/null | head -1`.
   - Output contains `->` (symlink) → links active, proceed.
   - Output is a directory (no `->`) OR path missing → run `bash ../KISA-website/client/scripts/link-ds.sh` to relink. Requires DS `dist/` — run `pnpm build` in DS repo first if missing.
4. Read `docs/DS_CODEBASE.md` → know what DS components are available

**Branch on TODO entry type:**

#### Phase -1 entry (e.g., "Phase -1.1: Update DS_CODEBASE.md...")

Self-contained deliverables (one doc or one skill per subphase). No `audit.md`/`plan.md`/`notes.md` trio.

- Read `docs/DS_CODEBASE.md` for component context if relevant
- Present the deliverable scope to the user and wait for go-ahead

#### Phase kickoff entry (e.g., "Phase 1: jobs-curator (subphases added at kickoff)")

This phase needs its subphases enumerated first. Follow the phase kickoff flow in `HARNESS_DESIGN.md`:

- Audit the app at a high level
- Enumerate subphases
- Write `overview.md`
- Expand TODO.md
- Check off the kickoff entry

#### Phase 0+ singleton or subphase entry (e.g., "Phase 0.5: Shared layout" or "Phase 1.1: jobs list")

Derive the folder path (e.g., `docs/plans/client-migration/phase-0.5-layout/` or `docs/plans/client-migration/phase-1-jobs-curator/phase-1.1-jobs-list/`).

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

**Protocol:** Claude detects state, proposes the most likely mode, and says something like:

> "I see `audit.md` exists, 3 sitting PRs, 0 unresolved decision PRs. Likely **Mode C (PR review)**. Proceed, or switch to a different mode?"

User confirms or redirects. Claude proceeds per the confirmed mode.

**Cross-reference:** `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md` is the authoritative protocol for autonomous execution, labels, bailout, branch conventions, permission scope, and PR review revision flow. Read it at Mode detection time for Phase 0+ entries.

**Never execute without explicit user permission.** This applies to every mode.

### Natural Breakpoints
At every natural breakpoint (spec complete, phase complete, or context >= 70%), stop and present:
> Breakpoint reached. How would you like to proceed?
> (a) Continue in this session
> (b) Clear context — start a fresh session with clean slate
> (c) Save and stop — come back later

Wait for the user's choice. Do not proceed automatically.

### Phase End (Phases 0+ only)
If `docs/plans/client-migration/ds-fixes-log.md` has entries for the completing phase, invoke `ds-phase-end-bump` before marking the phase done.

### Session End
Before marking any task done in `docs/TODO.md`:
1. Run `pnpm build` and `pnpm typecheck` — both must pass
2. Check off the item in `docs/TODO.md`

---

## Reference

- Client repo: `../KISA-website/client/`
- Client UI components: `../KISA-website/client/src/components/ui/`

## Build

- `pnpm build` — build all packages
- `pnpm dev` — watch mode
- `pnpm test` — run tests
- `pnpm typecheck` — TypeScript check

Target a package: `pnpm --filter @umichkisa-ds/web build` or `pnpm --filter @umichkisa-ds/form build`

## Release

Both packages publish to npm via GitHub Actions on tag push: `git tag web-vX.X.X && git push --tags` (or `form-vX.X.X`). Bump `version` in the package's `package.json` first.
