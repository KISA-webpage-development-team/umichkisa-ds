# Component Skill Draft

The Component Skill (Step 4) automates the per-component workflow by combining Steps 1 and 2+3 into a repeatable process. Each component goes through both steps in sequence.

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

## Step 2+3 — Component Docs Page + ComponentPreview Primitive

Steps 2 and 3 are merged. There is no iframe isolation — the docs app and web package share
the same token layer. The ComponentPreview primitive uses a stacked layout (preview pane above
code block). Tabs-based switching comes later, once the DS `Tabs` component ships.

Observed during Icon Docs Page session (2026-03-22).

### Workflow

1. `/grill-me` — resolve all page design decisions before writing anything
   - Confirm scope: component docs page (not foundation pages)
   - Confirm page file format: pure `.tsx` (not MDX) — component pages are structured templates, not prose
   - Walk examples: which use cases to show, which icon per example, what the preview + code shows
   - Confirm `ComponentPreview` layout: stacked (preview pane above code block, always visible)
   - Confirm interactivity: extract `'use client'` components to `apps/docs/components/` flat — no subfolders
   - Confirm no Installation/Import section — code snippets in examples already show the import
   - Confirm TDD: skip for presentational docs components; `pnpm typecheck` serves as the contract
   - Identify registry mismatches: verify every icon name used in examples is in the actual DS registry
   - Check actual component implementation for any spec/docs discrepancies (e.g. `role="img"` not set)
2. Write spec to `docs/specs/<component>-docs-page.md`
   - Goal, scope, decisions table, file map, per-section content, `ComponentPreview` design,
     interactive component designs, `_components_to_switch.md` entries, session end checklist
   - Update `docs/TODO.md` and `docs/_component_skill_draft.md` to reflect any step merges
3. `/writing-plans` — create implementation plan at `docs/plans/YYYY-MM-DD-<component>-docs-page.md`
   - One task per file created
   - Full exact code per task (no "add X here" placeholders)
   - Flag any spec deviations at top of plan (resolve or remove before execution)
   - Typecheck step inside each task, full `pnpm build` in final verification task
4. Execute in a fresh session using `superpowers:executing-plans`
   - No TDD for presentational components — `pnpm typecheck` is the verification gate
   - Session end: `pnpm build` + `pnpm typecheck` must pass, update `CODEBASE.md` + `TODO.md`

### `_components_to_switch.md`

Created at `apps/docs/content/_components_to_switch.md`. Tracks docs app one-off
implementations that should be replaced with real DS components once they ship:
- `ComponentPreview` stacked layout → `Tabs`
- `ComponentPreview` code block → Shiki highlighting
- `ComponentPreview` → copy button (needs `Button` or `IconButton`)
- `SizesExample` toggle buttons → DS segmented control

### Skills used

`/grill-me` → `/writing-plans` → `superpowers:executing-plans`

---

## Composition (Step 4)

Once both step workflows are documented, the Component Skill combines them:
- Per component: Step 1 (implement) → Step 2+3 (docs page + preview)
- Each step may span one or more sessions depending on context limits
- The skill should encode the grill questions, spec template, plan template, and review gates


ds-constrained-execution
ui improvement with frontend-design?