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
| D | See "Mode D workflow" below. |
| E | `ds-phase-end-bump` skill; HARNESS_DESIGN.md "Phase close-out" section |

`docs/DS_CODEBASE.md` is loaded only if the current task involves DS surface discovery (typically Mode A grill or Mode D when a new component is needed).

### Mode D workflow

Mode D = live interactive execution against a worktree off `dev`, direct-push to `dev`, no PR.

**Setup**

1. If lane is tagged `needs-interactive`: invoke `grill-me` first to align on approach **before** any implementation (interactive tag exists because the lane needs live discussion).
2. Create worktree: `client/.worktrees/<lane-id>` off `origin/dev`, branch `ds-client-migration/phase-<N>/<lane-id>`.
3. Invoke `pastiche` skill (DS-repo only — pastiche docs live at `umichkisa-ds/pastiche/`; never invoke from `KISA-website/client/`). Pass the locked decisions from grill as overlay.

**Post-pastiche**

`pastiche` is DS-scoped: it does not typecheck, run tests, run general code-quality review, or commit. After it returns, walk through these with the user:

4. **Triage `// pastiche-unresolved-doubt:` markers** (block commit) — read each with the user; fix or accept; delete the marker line in either case.
5. **Triage `## Follow-ups`** (do not block) — each is a `KNOWLEDGE.md` / `WISDOM.md` candidate. Append + re-run tag-sanity, or skip as noise. May defer.
6. **Run `pnpm typecheck`** from the worktree. Fix anything.
7. **Suggest code-quality reviews — do not auto-run (token-heavy):**
   - **If the lane touches UI**, always suggest `vercel-react-best-practices` (final React/Next.js pass).
   - **Suggest one of:**
     - `toss-frontend-fundamentals` — when lane is logic-heavy (state, effects, data flow, hooks, transformations).
     - `review-ui-on-browser` — when lane is UI-heavy (visual layout, component composition, interactions).
   - Pick based on the lane's actual character; only suggest both if it's genuinely both. User can say skip.

**Ship — confirm before merging**

8. Confirm with user before merging (see `feedback_no_auto_merge`). When user says "merge", merge worktree branch into `dev` and push directly (no PR — see `feedback_interactive_direct_push`).
9. **STOP after push if user said "let me test"** — do NOT auto-wrap (see `feedback_merge_is_not_wrapup`). Only proceed to wrap-up when user explicitly confirms the feature works.

### Wrapping up a merged PR / lane

Invoke `wrapping-up-lane` — only after user confirms feature works (or for autonomous PRs in Mode C1/C2).

### Closing a phase (Mode E)

1. All subphase entries already ticked (per-PR `wrapping-up-lane` handles those)
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
