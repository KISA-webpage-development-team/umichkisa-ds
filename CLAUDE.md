# umichkisa-ds — KISA Design System

**NEVER execute without explicit user permission.** "What's next?" is a question, not a go-ahead.

---

## Session Protocol

### Startup

1. Read `docs/TODO.md` → find first unchecked entry under "## Client Migration"
2. Read `docs/plans/client-migration/HARNESS_DESIGN.md` → full harness context
3. Branch based on entry type:

**Phase -1 entry** (e.g., "Phase -1.1: Update DS_CODEBASE.md..."):
- These are self-contained deliverables (one doc or one skill per subphase). No `audit.md`/`plan.md`/`notes.md` trio.
- Read `docs/DS_CODEBASE.md` for component context if relevant.
- Present the deliverable scope to the user and wait for go-ahead.

**Phase kickoff entry** (e.g., "Phase 1: jobs-curator (subphases added at kickoff)"):
- This phase needs its subphases enumerated first. Follow the phase kickoff flow in HARNESS_DESIGN.md: audit the app → enumerate subphases → write `overview.md` → expand TODO.md → check off the kickoff entry.

**Subphase entry** (e.g., "Phase 1.1: jobs-curator / jobs list"):
- Derive the folder path (e.g., `docs/plans/client-migration/phase-1-jobs-curator/phase-1.1-jobs-list/`).
- **If `plan.md` exists** → subphase is in progress. Open it → find first unchecked task. Read sibling `notes.md` for context.
- **If `plan.md` does not exist** → subphase is starting fresh. Begin with audit, then plan. Present scope and wait for go-ahead.

**Singleton phase entry** (Phase 0 or Phase 0.5):
- Same as subphase logic above but the folder is at the phase root (e.g., `phase-0-globals/`).

4. Read `docs/DS_CODEBASE.md` → know what DS components are available
5. Proceed — but do NOT execute without explicit user permission

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
