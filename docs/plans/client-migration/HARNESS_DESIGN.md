# Client Migration — Harness Design

Locked decisions from the grill session (2026-04-12). This is the authoritative reference for how the client migration runs. Read at the start of any migration session.

---

## Slicing & Phases

**Hybrid slicing**: horizontal for globals (Phase 0, 0.5), vertical for features (Phase 1–5).

| Phase | Name | Scope | Type |
|---|---|---|---|
| -1 | Harness bootstrap | Skills, docs, tooling, scaffolding | Singleton (subphased) |
| 0 | Globals | Tailwind v4 + DS install + MSW + test framework + tunnel settings | Singleton |
| 0.5 | Shared layout | Header/Footer/MobileMenu migration (simple iteration, not radical redesign) | Singleton |
| 1 | jobs-curator | Per-feature subphases (enumerated at kickoff) | Vertical |
| 2 | pocha-manage | Per-feature subphases | Vertical |
| 3 | pocha-dashboard | Per-feature subphases | Vertical |
| 4 | pocha-userfacing | Per-feature subphases | Vertical |
| 5 | kisa-web | Per-feature subphases (largest — ~10+ subphases) | Vertical |

**Phase/subphase rule**: Phases 0 and 0.5 are singletons (no subphases). Phases 1–5 decompose into subphases at kickoff; subphase = feature or page URL. Subphase entries are appended to TODO.md at each phase's kickoff, not pre-enumerated.

---

## Five Apps (One Repo)

All apps live under `umichkisa.com` in `../KISA-website/client/`.

| # | App | Route | Viewport |
|---|---|---|---|
| 1 | kisa-web | `/` | Desktop-first, responsive |
| 2 | jobs-curator | `/jobs` | Responsive |
| 3 | pocha-userfacing | `/pocha` | Mobile-only (`OnlyMobileView` gate) |
| 4 | pocha-dashboard | `/pocha/dashboard` | Desktop + tablet (no mobile gate needed) |
| 5 | pocha-manage | `/pocha/manage` | Desktop + tablet |

---

## Per-Phase Internal Flow

### Feature migration phases (0.5 and 1–5)

1. **Audit** — read app's current state, list every feature/file to touch, mark each:
   - `[MECHANICAL]` / `[POLISH]` / `[REDESIGN]` (UI scope)
   - `[TDD]` / `[NO-TDD]` (test scope)
   - Output: `audit.md`

2. **Redesign** (rare, opt-in) — small polish by default. Real redesigns are rare; when one happens, use figma mcp + chrome mcp for exploration. Not a full design pass.

3. **Plan** — `writing-plans` skill produces `plan.md` with checkboxed tasks, each with a `**Files:**` section.

4. **Execute** — `ds-client-constrained-execution` skill. One skill with two modes:
   - `[NO-TDD]` tasks: implementer → ds-client-review → typecheck → commit
   - `[TDD]` tasks: test-writer (red) → implementer (green) → ds-client-review → test verification → refactor → typecheck → commit
   - Final pass: `vercel-react-best-practices` after all tasks complete

5. **Verify** — manual via Vercel `dev`-branch preview URL (mocks on). Occasional chrome mcp on request.

6. **Merge** — worktree → `dev` via `finishing-a-development-branch` skill. Confirm with user before merge.

### Infrastructure phases (Phase 0 only)

Simplified: plan → execute → build smoke test → merge. No audit/redesign/visual-verify.

---

## Tooling Decisions

### Branch model
- `dev` is the long-lived integration branch with Vercel preview (mocks on via `NEXT_PUBLIC_MOCK_API=1` in Vercel dev env)
- Worktrees off `dev` per subphase, merge back to `dev`
- `main` = production (mocks off). `dev → main` merge cadence **deferred to Phase -1.6**

### Mock API
- **MSW** (Mock Service Worker), write endpoints only
- In client repo, committed (useful for future devs)
- `NEXT_PUBLIC_MOCK_API=1` gated
- **On** for Vercel `dev`-branch preview, **off** for `main`
- Phase 0 ships empty skeleton; handlers grow per phase

### DS consumption
- **Local dev**: `npm link` for fast iteration (symlink to local DS build)
- **Committed state**: strict pinned versions (no `^`) in `package.json`
- Client linking script at `client/scripts/link-ds.sh` + `unlink-ds.sh`
- DS fixes batched per phase, bump once at phase end (except blocking fixes)

### Missing DS components
- Local workaround in client, add to DS later (not blocking)
- No carousel, rich text editor, or event calendar in DS scope

### Testing
- **Stack**: `vitest` + `@testing-library/react` + `@testing-library/jest-dom`
- **Location**: co-located at feature root: `src/features/<name>/__tests__/`
- **TDD opt-in**: per-feature at audit step via `[TDD]` tag. Default `[NO-TDD]` unless feature has non-trivial logic (forms, validation, submit handlers, state machines)
- Framework setup in Phase 0

### Redesign scope
- Migration = opportunity for small polish, not whole-feature redesign
- Most features: `[MECHANICAL]` or `[POLISH]` (small bonus improvements)
- Rare `[REDESIGN]` candidates: use figma mcp + chrome mcp for design exploration

---

## Client Gate Tooling (created in Phase -1)

| Artifact | Purpose |
|---|---|
| `docs/DS_CLIENT_USAGE.md` | Consumer-side constraint doc (what client code must/must-not do when consuming DS) |
| `ds-client-review` agent | Reviews client `.tsx` against `DS_CLIENT_USAGE.md`, returns violations |
| `ds-client-constrained-execution` skill | One skill, two modes (`[TDD]`/`[NO-TDD]`). Dispatches implementer + test-writer subagents, gates with ds-client-review, typechecks, commits. TDD mode modeled after `superpowers/skills/test-driven-development`. |
| `ds-fix-during-migration` skill | Codifies the mid-phase DS bug-fix flow: pause client → fix DS → verify via symlink → accumulate for phase-end bump |
| `client/scripts/link-ds.sh` | Re-establishes `npm link` for `@umichkisa-ds/web` + `@umichkisa-ds/form` |

### Why separate from existing DS tooling

`DS_CONSTRAINTS.md` and `ds-review` are **author-side** (for building DS components). `DS_CLIENT_USAGE.md` and `ds-client-review` are **consumer-side** (for code that imports DS). Different rules, different agents, no context leakage.

---

## Session Continuity

### Per unit of work: 3 files

| File | Mutability | Purpose |
|---|---|---|
| `audit.md` | Read-only after creation | Snapshot of scope, `[MECHANICAL]`/`[POLISH]`/`[REDESIGN]` + `[TDD]`/`[NO-TDD]` marks |
| `plan.md` | Checkboxes ticked during execution | Task list, source of truth for "where are we" |
| `notes.md` | **Strict append-only** | Breadcrumbs: DS bugs, decision changes, blockers, user feedback |

Multi-subphase phases also get an `overview.md` at the phase root (subphase list + ordering rationale + phase-wide risks).

### Artifact layout

```
docs/plans/client-migration/
├── HARNESS_DESIGN.md                          ← this file
├── phase-0-globals/
│   ├── audit.md, plan.md, notes.md
├── phase-0.5-layout/
│   ├── audit.md, plan.md, notes.md
├── phase-1-jobs-curator/
│   ├── overview.md
│   ├── phase-1.1-<feature>/
│   │   ├── audit.md, plan.md, notes.md
│   └── ...
└── ...
```

### TODO.md

Flat list of leaves under "## Client Migration". Subphases appended at phase kickoff.

### MEMORY.md

One `project_client_migration.md` entry, rewritten on subphase transitions:
> "Phase 2 (pocha-manage), subphase 2.2 (pocha info) in progress, 4/7 tasks"

### Cold-session startup protocol (added to DS CLAUDE.md)

1. Read `docs/TODO.md` → find first unchecked Client Migration entry
2. Derive path → open `plan.md` → find first unchecked task
3. Read sibling `notes.md` → skim blockers/decisions
4. If confused → read `audit.md` and/or phase `overview.md`
5. Proceed

---

## Phase -1: Harness Bootstrap (Subphases)

| Subphase | Deliverable | Depends on |
|---|---|---|
| -1.0 | Add cold-session protocol to CLAUDE.md + rename CODEBASE.md → DS_CODEBASE.md | — |
| -1.1 | Update DS_CODEBASE.md with consumer quick-reference section (import paths, per-component usage patterns, token utility classes) | -1.0 |
| -1.2 | Write `docs/DS_CLIENT_USAGE.md` (consumer-side constraint doc) | -1.1 |
| -1.3 | Create `ds-client-review` agent + `ds-client-constrained-execution` skill (TDD mode modeled after `superpowers/skills/test-driven-development`) | -1.2 |
| -1.4 | Create `ds-fix-during-migration` skill | — |
| -1.5 | Create `client/scripts/link-ds.sh` + `unlink-ds.sh` | — |
| -1.6 | Scaffold `docs/plans/client-migration/` + TODO/MEMORY updates | — |
| -1.7 | Lock deferred decisions (dev→main cadence, VSCode tunnel settings) + draft Phase 0 audit/plan | all above |

---

## Deferred Decisions (resolve in Phase -1.7)

1. `dev → main` merge cadence
2. VSCode tunnel personal settings specifics
3. Exact `DS_CLIENT_USAGE.md` content (outline in -1.2, grows during migration)
4. Form validation strategy (zod + RHF resolver vs. RHF-native rules)
5. Carousel consolidation (pick one of two carousel libs)
6. Pocha icon audit (which upstream to DS, which stay local)
7. Long-term repo split (separate apps into repos with shared core)
