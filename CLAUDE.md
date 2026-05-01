# umichkisa-ds — KISA Design System

## Session Protocol

### Cold-Session Startup

**Preflight** (run every cold session — minimal universal load):

1. Read `docs/TODO.md` → find first unchecked entry under "## Client Migration"
2. **DS symlink check** (Phase 0+): `ls -la ../KISA-website/client/node_modules/@umichkisa-ds/web` — if not `->` symlink, run `bash ../KISA-website/client/scripts/link-ds.sh` (requires DS `dist/`; run `pnpm build` first if missing)

**Mode detection** (inlined from `AUTONOMOUS_PROTOCOL.md` §10 — do this without loading AP):

Derive the phase folder: `docs/plans/client-migration/phase-<N>-<slug>/` (where `<N>-<slug>` matches the first unchecked phase in TODO).

Then check repo state:

| Signal | Mode |
|---|---|
| `audit.md` missing in phase folder | **Mode A** — Audit writing |
| `audit.md` exists, `plan.md` missing | **Mode B** — Plan writing + issue generation |
| Sitting PR(s) for `phase-<N>`; selected PR has neither `needs-decision` nor `needs-interactive` label, CI green | **Mode C1** — PR review (ready-to-merge) |
| Sitting PR(s) for `phase-<N>`; selected PR has `needs-decision` or `needs-interactive` label | **Mode C2** — PR review (interactive/decision) |
| `plan.md` exists, open `needs-interactive` issues without linked PRs (or user override to execute live) | **Mode D** — Interactive execution |
| `plan.md` exists, next-up lane is `autonomous-ready` and you're driving live (this terminal, not the cron routine) | **Mode D** — autonomous-ready label only routes to autonomous flow inside the cron routine; live execution is always Mode D (worktree off dev, direct-push to dev, no PR) |
| All lanes merged for the phase | **Mode E** — Phase close-out |

**Propose, don't execute.** Say:
> "I see [state summary]. Likely mode: **X**. Proceed with Mode X, or pick a different mode?"

Wait for user confirmation. NEVER execute without explicit go-ahead.

**Mode-specific lazy loads** (load only when mode is confirmed):

| Mode | Load |
|---|---|
| A | `docs/plans/client-migration/HARNESS_DESIGN.md` (Per-Phase Internal Flow); `AUTONOMOUS_PROTOCOL.md` Part 2 (§5 issue template) |
| B | `AUTONOMOUS_PROTOCOL.md` Part 2 (§5 issue template + §6 6-rule gate) |
| C1 / C2 | `review-pr-queue` skill (handles its own loads); `AUTONOMOUS_PROTOCOL.md` §3 only if mode flow needs disambiguation |
| D | `pastiche` skill (DS-repo only — pastiche docs live at `umichkisa-ds/pastiche/`; do NOT invoke from `KISA-website/client/`); `AUTONOMOUS_PROTOCOL.md` §3.3 (post-pastiche workflow) + §11 (lane-state annotation) |
| E | `ds-phase-end-bump` skill; HARNESS_DESIGN.md "Phase close-out" section |

`docs/DS_CODEBASE.md` is loaded only if the current task involves DS surface discovery (typically Mode A grill or Mode D when a new component is needed).

### Wrapping up a merged PR / lane

Invoke `wrapping-up-pr`.

### Closing a phase (Mode E)

1. All subphase entries already ticked (per-PR `wrapping-up-pr` handles those)
2. `pnpm build` + `pnpm typecheck` pass
3. If `ds-fixes-log.md` has phase entries, invoke `ds-phase-end-bump`
4. Tick the parent phase entry

---

## Reference

- Client repo: `../KISA-website/client/`
- Client UI components: `../KISA-website/client/src/components/ui/`

## Build & Release

- `pnpm build` / `pnpm typecheck` — both packages (filter: `pnpm --filter @umichkisa-ds/web <cmd>`)
- Publish: bump `version` in package's `package.json`, then `git tag web-vX.X.X && git push --tags` (or `form-vX.X.X`) — GitHub Actions publishes on tag.
