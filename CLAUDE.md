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
| D | `pastiche` skill (handles its own loads); `AUTONOMOUS_PROTOCOL.md` §11 lane-state annotation |
| E | `ds-phase-end-bump` skill; HARNESS_DESIGN.md "Phase close-out" section |

`docs/DS_CODEBASE.md` is loaded only if the current task involves DS surface discovery (typically Mode A grill or Mode D when a new component is needed).

### Mode D post-pastiche steps

`pastiche` is DS-scoped — it does not typecheck, run tests, run general code-quality review, or commit. After the skill returns, walk through the following with the user (Mode D is live).

**Triage pastiche output (with the user)**

1. **Inline `// pastiche-unresolved-doubt:` markers — block the commit.** Together with the user, read each marker. Decide: fix the code, or accept the implementation as-is. In either case the marker line is deleted before commit.
2. **`## Follow-ups` items — do not block the commit.** Each is a `KNOWLEDGE.md` or `WISDOM.md` candidate. With the user, decide: append to the relevant doc in the DS repo and re-run the tag-sanity lint, or skip as noise. May be deferred.

**Verify**

3. Run `pnpm typecheck` from the worktree. Fix anything.

**Code-quality reviews — suggest, do not auto-run (token-heavy)**

4. **If the lane touches UI**, always suggest invoking `vercel-react-best-practices` (final React/Next.js pass). User can say skip.
5. **Suggest one of:**
   - `toss-frontend-fundamentals` — when the lane is logic-heavy (state, effects, data flow, hooks, transformations).
   - `review-ui-on-browser` — when the lane is UI-heavy (visual layout, component composition, interactions).

   Pick which to suggest based on the lane's actual character; only suggest both if the lane is genuinely both. User can say skip.

**Ship**

6. Merge the worktree branch into `dev` and push (Mode D = direct push to `dev`, no PR — see `feedback_interactive_direct_push`). Confirm with the user before merging — see `feedback_no_auto_merge`.
7. Wrap up the lane (close linked issue, strip labels — see `feedback_merge_closes_issue`, `feedback_check_existing_issue`).

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
