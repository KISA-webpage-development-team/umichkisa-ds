# A9 — `ds-migration-workflow` Skill Specification

_Subphase A9 of the `ds-client-constrained-execution` 4-layer refactor. Specification only — the actual `.claude/skills/ds-migration-workflow/SKILL.md` is authored in Phase D (post-C3), not in Phase A or Phase C._

A9 was added to Phase A after A6 cleaned migration-orchestration concerns out of the execution skill (PRs, lanes, `notes.md`, `needs-decision` labels, autonomous override). Those concerns didn't disappear — they fire daily, they just stopped belonging to a *general* DS-execution skill. A9 specs their new home: a **per-project harness skill**, finite by design, retires when the migration ends.

The shape mirrors A8's setup-vs-execution split. A6 saw the harness-execution split; A9 absorbs the orphaned mechanics. Two parallel patterns:

| Concern | Per-task | Per-session | Per-project setup |
|---|---|---|---|
| Skill | `ds-client-constrained-execution` (general) | **`ds-migration-workflow`** (this) | `onboard-ds` (general, A8) |
| Lifecycle | permanent | finite (per-project) | permanent |

---

## Scope

`ds-migration-workflow` is a **per-session entry-point skill**: it reads repo state at session start, detects which migration mode applies (A audit / B plan / C1 ready-PR review / C2 interactive PR review / D interactive execution / E phase close-out), proposes the mode + state summary to the human, and **stops**. The human (or autonomous orchestrator) decides whether to proceed.

Two scope-defining properties:

1. **Pure router.** The skill never executes downstream work. It detects, proposes, and exits. Per-mode behavior lives in the narrow skills the proposal points at (`review-pr-queue` for C1/C2, `ds-client-constrained-execution` for D, `ds-phase-end-bump` for E) or in `AUTONOMOUS_PROTOCOL.md` for autonomous-specific protocol.
2. **Migration-coded by design.** The six-mode state machine (A/B/C1/C2/D/E) is migration-shaped — none of those modes exist outside a phased migration project. The skill name carries `migration-` deliberately. Future KISA projects (a redesign initiative, a v2 component sweep) get their own per-project harness skills of the same router shape, not extensions of this one.

What the skill does NOT do:
- Execute downstream work (per-mode behavior is in narrow skills; protocol body is in AP)
- Branch on autonomous vs. live caller (output is identical; AP §7/§8 owns autonomous behavior)
- Carry mode *definitions* / mode-flow disambiguation (those stay in AP §3)
- Carry phase lifecycle (when to start a phase, when to write `audit.md`) — those decisions are in `HARNESS_DESIGN.md`

---

## Content being absorbed

From `CLAUDE.md` (project root) — current "Cold-Session Startup" preflight section:

| Item | Disposition |
|---|---|
| TODO.md read + first-unchecked-entry detection | → skill body (Step 1 of state-signal read) |
| DS symlink check | **stays in CLAUDE.md** — not migration-specific; future post-migration work also needs it |
| Mode detection table (A / B / C1 / C2 / D / E with signals) | → skill body |
| "Propose, don't execute" rule | → skill body |
| Mode-specific lazy-load table | → skill body |

From `AUTONOMOUS_PROTOCOL.md`:

| Item | Disposition |
|---|---|
| §3 Mode Definitions (semantics of each mode) | **stays in AP** — mode definitions are reference material the skill points at, not detection logic |
| §3.1 / §3.2 (Feedback during review; parallel-terminal safety) | stays in AP |
| §10 PR & Branch Conventions | stays in AP — unrelated to mode detection |
| §6 / §7 / §8 (Autonomous-Readiness Gate, Routine Algorithm, Bailout Protocol) | stays in AP — autonomous-specific protocol the skill never runs |

**No content in AP is deleted by A9** beyond a stale section-number reference fix in `CLAUDE.md` (see Ripple updates below). AP §3 and the workflow skill are complementary, not duplicate: §3 = mode semantics; skill = mode detection.

---

## Skill body structure

Faithful port of today's CLAUDE.md preflight, in skill form. Six sections.

### `## When to use`

Echoes the frontmatter `description:`. Triggers:
- Auto-fire via CLAUDE.md on cold session
- Explicit user invocation: "migration project, pick up the task" / "what's next on migration" / "what mode are we in"
- Mid-session re-detection after major state change (PR merge, phase complete, lane handed off)

### `## State signals to read`

The minimum set the skill reads before proposing:

1. `docs/TODO.md` → first unchecked entry under `## Client Migration` (gives the active phase)
2. Phase folder under `docs/plans/client-migration/phase-<N>-<slug>/`:
   - Presence of `audit.md`
   - Presence of `plan.md`
3. Open PRs targeting `phase-<N>-*` branches (autonomous lanes' PRs):
   - Their labels (`needs-decision`, `needs-interactive`, `needs-revision`)
   - Their CI status (green / failing)
4. Open `lane:<id>` issues without linked PRs (live-execution candidates)
5. Whether all phase lanes have merged (E-trigger signal)

### `## Mode detection table`

Direct port of CLAUDE.md preflight. Signals → mode mapping:

| Signal | Mode |
|---|---|
| `audit.md` missing in phase folder | **A** — Audit writing |
| `audit.md` exists, `plan.md` missing | **B** — Plan writing + issue generation |
| Sitting PR(s) for phase; selected PR has neither `needs-decision` nor `needs-interactive` label, CI green | **C1** — PR review (ready-to-merge) |
| Sitting PR(s) for phase; selected PR has `needs-decision` or `needs-interactive` label | **C2** — PR review (interactive/decision) |
| `plan.md` exists, open `needs-interactive` issues without linked PRs (or user override to execute live) | **D** — Interactive execution |
| All lanes merged for the phase | **E** — Phase close-out |

When multiple signals match (e.g. both ready-to-merge PRs and unstarted lanes), the skill surfaces all candidates and lets the human pick — per `feedback_parallel_wave_pickup`.

### `## Proposal template`

The skill's only output. Format:

```
I see [state summary — phase, signal hits, candidate work].
Likely mode: <X>.
On confirm, will load: [lazy-load targets per the table below].
Proceed with Mode <X>, or pick a different mode?
```

Then stop. Do not execute. Wait for explicit confirmation.

### `## Lazy-load reference table`

Per-mode load targets the skill names in its proposal (per Q3-locked: skill names targets, doesn't load them itself; on user confirmation Claude loads what was named).

Post-C3 state of the table:

| Mode | Load on confirm |
|---|---|
| A | `docs/plans/client-migration/HARNESS_DESIGN.md` (Per-Phase Internal Flow); `AUTONOMOUS_PROTOCOL.md` §5 (issue template) |
| B | `AUTONOMOUS_PROTOCOL.md` §5 (issue template) + §6 (Autonomous-Readiness Gate) |
| C1 / C2 | `review-pr-queue` skill (handles its own loads); `AUTONOMOUS_PROTOCOL.md` §3 only if mode flow needs disambiguation |
| D | `ds-client-constrained-execution` skill (handles its own loads); `AUTONOMOUS_PROTOCOL.md` §11 (lane-state annotation) |
| E | `ds-phase-end-bump` skill; `HARNESS_DESIGN.md` "Phase close-out" section |

### `## Don't execute — wait for confirmation`

Single-paragraph reminder. Mirrors `feedback_workflow.md` MEMORY entry: "never execute without explicit go-ahead." The skill ends after proposal; downstream work is the human's call.

---

## Skill location

`.claude/skills/ds-migration-workflow/SKILL.md` — DS repo, alongside existing skills (`ds-client-constrained-execution`, `ds-fix-during-migration` / `ds-gap-fix` post-rename, `review-pr-queue`, `wrapping-up-lane`, `ds-phase-end-bump`). No special structure needed; SKILL.md is the only file.

---

## Mode flows (sketch)

The skill's flow is essentially: read signals → match mode → emit proposal. One pseudocode sketch:

```
1. Read TODO.md → identify active phase
2. cd into phase folder; check for audit.md, plan.md
3. Query GitHub: open PRs for phase-<N>-*, their labels and CI status
4. Query GitHub: open lane:<id> issues without linked PRs
5. Apply mode detection table; collect all matching modes
6. If exactly one mode matches: emit proposal for that mode
   If multiple modes match: emit menu (per parallel-wave pickup pattern)
   If zero modes match: emit "ambiguous state" proposal listing what was seen
7. Stop. Wait for human confirmation.
```

No worked example included in the spec (matches A8's "sketch level"). When the skill is built post-C3, the build session can add a worked example if real-state ambiguity surfaces.

---

## Integration with CLAUDE.md (post-C3)

When the skill ships, `CLAUDE.md`'s "Cold-Session Startup" section collapses from its current ~30-line preflight to:

```markdown
### Cold-Session Startup

**Preflight** (run every cold session):

1. **DS symlink check** (Phase 0+): `ls -la ../KISA-website/client/node_modules/@umichkisa-ds/web` —
   if not `->` symlink, run `bash ../KISA-website/client/scripts/link-ds.sh`
   (requires DS `dist/`; run `pnpm build` first if missing)
2. Invoke `ds-migration-workflow` skill — it handles state read, mode detection,
   and proposal. Wait for human confirmation before proceeding.
```

The mode detection table, the lazy-load table, and the propose-don't-execute rule all leave CLAUDE.md and live in the skill from this point on.

---

## Phase timing

Same pattern as A8 (`onboard-ds`):

- **Phase A (now):** spec only (this doc). No skill file authored.
- **Phase B (Icons-cluster prototype):** unaffected. B5's manual Task-call validation doesn't go through this skill.
- **Phase C (rollout):** unaffected. C3 applies the A6 SKILL.md diff for the *execution* skill; this skill is a separate concern.
- **Phase D (post-C3):** build trigger. Author `.claude/skills/ds-migration-workflow/SKILL.md`; collapse `CLAUDE.md` preflight; verify mode detection still proposes correctly.

The post-C3 trigger is concrete: once the execution skill's final shape is locked, the workflow skill's lazy-load targets are stable. Building before C3 means re-editing target references at C3, which is wasted work.

---

## Retirement

The skill is **finite by design**. Retirement happens when the client migration ends:

- All phases under `## Client Migration` in `docs/TODO.md` are checked off
- No more migration lanes will be opened

At that point:
1. Delete `.claude/skills/ds-migration-workflow/`
2. Remove the skill-invoke line from `CLAUDE.md`'s preflight (DS symlink check stays)
3. (No other cleanup — AP, narrow skills, execution skill all stay in place; they were never migration-only)

No marker file or formal trigger — the human notices migration is done and removes the skill. Mirrors how `ds-fix-during-migration`'s scope was always finite (it survives the migration too, just renamed to `ds-gap-fix` per A6 OQ5; A9's skill doesn't generalize the same way and just deletes).

If a future project (redesign initiative, v2 component sweep) wants the same router shape, it forks from this skill's git history into a new per-project harness skill (e.g. `ds-redesign-workflow`).

---

## Ripple updates to other Phase A docs

| Doc | Change | When |
|---|---|---|
| `PHASE-A-SUMMARY.md` | Add A9 to "What changed in concept" (skill split — three tiers, not two) and to artifact tables. Add D-build trigger to deferred actions. | Now (this commit) |
| `CLAUDE.md` | At C3 build time: stale "AP §10" reference → "AP §3". At skill-build time (D): collapse preflight per "Integration with CLAUDE.md" above. | C3 (typo) and D (collapse) |
| `AUTONOMOUS_PROTOCOL.md` | Unaffected. §3 stays as mode-semantics reference; the skill points at it. | — |
| A1 / A2 / A3 / A4 / A5 / A6 / A8 | Unaffected. A9 is harness-layer, orthogonal to the 4-layer contract refactor. | — |

---

## Open questions

- **Skill description wording.** The frontmatter `description:` field needs to match natural utterances ("migration project, pick up", "what's next on migration", "what mode are we in", "continue migration"). Tune at D-build time when the skill is exercised against real session opens.
- **Multi-mode menu format.** When multiple modes match (parallel-wave pickup), the proposal becomes a menu rather than a single recommendation. Today this is handled in CLAUDE.md prose; the D-build session formalizes the menu shape.
- **State signal completeness.** The state signals listed above are derived from current CLAUDE.md preflight + observed session behavior. If D-build reveals a missing signal (e.g. dependent-lane unblocking after merge), add then.
- **Idempotency under autonomous re-invocation.** If the autonomous orchestrator invokes the skill multiple times in one routine run, does the skill produce the same proposal? Yes by design (output is a function of repo state), but worth verifying at D-build with the autonomous orchestrator's invocation pattern.
