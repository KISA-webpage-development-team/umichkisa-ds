# Component Workflow Spec

_The repeatable workflow for implementing each component in the design system._
_Referenced by `docs/TODO.md` § Components._

---

## Deliverable

The final output of Step 4 (Component Skill) is a **Claude Skill** under `.claude/skills/` that Claude sessions invoke to run this workflow. This spec captures the decisions; the skill encodes them as executable instructions.

## Scope

- **One component per worktree session**, matching one line item in `docs/TODO.md`.
- TODO list ordering implies dependency order — do not skip ahead.
- If a new component is discovered mid-session, add it to TODO.md — do not scope-creep the current branch.

## Existing vs New Components

Some components already exist in `packages/web/src/components/` (pre-DS-docs era). These follow **audit + fix**, not rewrite:

- Review both **API (props interface)** and **styling/token usage** against `docs/DS_CONSTRAINTS.md`.
- API changes (renamed props, changed variants) get a migration note in `docs/_client_migration_notes.md`.
- The ds-review agent catches styling violations.
- Only rewrite from scratch if the component's architecture is fundamentally incompatible.

Components with no existing code are implemented fresh.

## Styling Rules

- **CVA** for components with 2+ variant dimensions (e.g., Button: variant × size).
- **`cn()` only** for simple components with no variant matrix (e.g., Divider, Skeleton).
- All components follow `docs/DS_CONSTRAINTS.md` — the ds-review agent enforces this.

## Docs Pages

- **TSX**, not MDX. Route: `apps/docs/app/components/<name>/page.tsx`.
- Minimum sections:
  1. **Header** — component name, description, canonical purpose.
  2. **Examples** — wrapped in `ComponentPreview`, showing key use cases.
  3. **API Reference** — HTML table with props, types, defaults, descriptions.
- Additional sections (e.g., variant matrix, icon grid) are decided during the component's grill-me session.
- **Sidebar** (`apps/docs/components/Sidebar.tsx`) — add the component to `COMPONENT_ITEMS` as part of the docs phase.

## Package Structure

- Component code lives in `packages/web/src/components/<category>/<ComponentName>.tsx`.
- Categories are flexible — decided per component during grill-me (e.g., `button/`, `form/`, `display/`, `navigation/`).
- Each category has an `index.ts` barrel export.
- New categories get a new `export * from "./components/<category>"` line in `packages/web/src/index.ts`.

## Worktree Setup

- Branch naming: `component/<name>` (e.g., `component/button`).
- Use `superpowers:using-git-worktrees` to create the worktree.
- Direct merge to main — no PRs.

## Build Artifacts

- Run `pnpm build` and `pnpm typecheck` in the worktree as **validation only**.
- **Never `git add` the `dist/` folder from a worktree.**
- After merge to main, run `pnpm build` and commit dist on main.

## Session Flow

Each component session follows these steps in order.

**Between every step**, stop and present a checkpoint:
> **Step N complete.** [1-2 sentence summary of what was done.]
> Ready to proceed to Step N+1: [step name]. Go ahead?

Wait for explicit confirmation before proceeding.

### Step 1: Grill-me

Invoke `grill-me`. Resolve:
- API shape (props, variants, defaults)
- Category placement
- Audit findings (if existing component)
- Docs page — what additional sections beyond the minimum
- Any DS_CONSTRAINTS edge cases

### Step 2: Write plan

Invoke `superpowers:writing-plans`. Output: `docs/plans/<name>.md`.

- **One plan, two phases:**
  - Phase 1: Component implementation (or audit + fix)
  - Phase 2: Docs page + sidebar update
- Concise — decisions and file lists, no implementation code.
- Informed by grill-me output.

### Step 3: Implement component

Invoke `ds-constrained-execution`.

- Executes Phase 1 of the plan.
- ds-review agent runs automatically on all `.tsx` output.
- Hard stop if violations persist after 2 rounds.

### Step 4: Implement docs page

Continue execution with Phase 2 of the plan.

- Same `ds-constrained-execution` flow.
- ds-review agent runs on the docs page `.tsx`.

### Step 5: Validate

- `pnpm typecheck` — must pass.
- `pnpm build` — must pass (validation only, don't commit dist).

### Step 6: Junhee review

Invoke `junhee` agent for documentation quality review.

- **Advisory, not blocking.** Accept or reject suggestions interactively.
- Make small fixes to the docs page as agreed.

### Step 7: Merge

- Merge worktree branch to main.
- On main: `pnpm build`, commit dist.

### Step 8: Update tracking

On main after merge:
- Check off the item in `docs/TODO.md`.
- Update `docs/CODEBASE.md` status tables.
- Append to `docs/_client_migration_notes.md` if API changed.

## Client Migration Notes

File: `docs/_client_migration_notes.md` (append-only).

When a component's API changes from its existing implementation, add a section:

```markdown
## <ComponentName>

- `oldProp` renamed to `newProp`
- Variant `x` removed, use `y` instead
- etc.
```

No changes are made to the client repo (`../KISA-website/client/`).

## Skills Referenced

| Step | Skill |
|---|---|
| Grill-me | `grill-me` |
| Write plan | `superpowers:writing-plans` |
| Implement | `superpowers:executing-plans` + `ds-constrained-execution` |
| DS review | `ds-review` (invoked by ds-constrained-execution) |
| Junhee review | `junhee` |
| Worktree | `superpowers:using-git-worktrees` |
