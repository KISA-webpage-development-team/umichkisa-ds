# Component Skill Draft

The Component Skill (Step 4) automates the per-component workflow by combining Steps 1, 2, and 3 into a repeatable process. Each component goes through all three steps in sequence.

---

## Step 1 — Component Implementation

Observed during Icon Implementation session (2026-03-22).

### Workflow

1. `/grill-me` — resolve all design decisions before writing anything
   - Audit client repo for real usage patterns first
   - Walk each decision branch one at a time, Claude recommends, user picks
   - Produces a decision summary table
2. Write spec to `docs/specs/<component>.md`
   - Goal, scope, decisions table, component API, file structure, implementation steps, session end checklist
3. `/writing-plans` — create bite-sized TDD implementation plan at `docs/plans/YYYY-MM-DD-<component>.md`
4. Execute with subagent-driven development
   - Fresh subagent per task, controller provides full context
   - Two-stage review after implementation tasks: spec compliance → code quality
   - Skip reviews for trivial tasks (dep swaps, build verification, docs)
5. Session end: `pnpm build` + `pnpm typecheck` must pass, update `CODEBASE.md` + `TODO.md`

### Skills used

`/grill-me` → `/writing-plans` → `subagent-driven-development` → `superpowers:code-reviewer`

---

## Step 2 — Component Docs Page

_TODO: capture workflow after completing a Step 2 session._

---

## Step 3 — Iframe Preview Infrastructure

_TODO: capture workflow after completing a Step 3 session._

---

## Composition (Step 4)

Once all three step workflows are documented, the Component Skill combines them:
- Per component: Step 1 (implement) → Step 2 (docs page) → Step 3 (live preview)
- Each step may span one or more sessions depending on context limits
- The skill should encode the grill questions, spec template, plan template, and review gates
