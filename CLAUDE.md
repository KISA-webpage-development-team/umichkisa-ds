# umichkisa-ds — KISA Design System

## Session Protocol

### Cold-Session Startup

**Preflight** (run every cold session):

1. Read `docs/TODO.md` → find first unchecked entry under "## Client Migration"
2. Read `docs/plans/client-migration/HARNESS_DESIGN.md` → full harness context
3. **DS symlink check** (Phase 0+): `ls -la ../KISA-website/client/node_modules/@umichkisa-ds/web` — if not `->` symlink, run `bash ../KISA-website/client/scripts/link-ds.sh` (requires DS `dist/`; run `pnpm build` first if missing).
4. Read `docs/DS_CODEBASE.md` → know what DS components are available

Derive phase folder: `docs/plans/client-migration/phase-<N>-<slug>/`. Subphases share the phase-root `audit.md` / `plan.md` / `notes.md` — no per-subphase subfolders.

Detect repo state (`audit.md`/`plan.md` presence, open PRs/issues for `phase-<N>`), then propose one of five modes per `AUTONOMOUS_PROTOCOL.md` §10 (A audit / B plan + issues / C PR review / D interactive execute / E close-out). Confirm with user before proceeding.

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
