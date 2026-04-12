---
name: new-component-workflow
description: Full lifecycle workflow for implementing a new DS component — from worktree setup through grill-me, planning, implementation, docs, review, merge, and tracking updates. Invoke manually with a component name argument.
---

# New Component Workflow

Orchestrates the full lifecycle of implementing one design system component. Each step has a checkpoint — summarize what was done, ask to proceed.

## Invocation

Accepts a component name as argument: `/new-component-workflow Button`
If no argument, ask the user which component to work on.

## Pre-flight Validation

Before starting any work:

1. Read `docs/TODO.md`
2. Find the component name in the `## Components` section
3. **If not found:** show the unchecked component list and ask the user to pick
4. **If already checked off:** stop — tell the user this component is already done
5. **Auto-detect mode:** grep `packages/web/src/components/` for the component name
   - Found → **audit + fix** mode (existing component, pre-DS-docs)
   - Not found → **new** mode (implement from scratch)

## Step 0: Worktree Setup

Invoke `superpowers:using-git-worktrees`.

- Branch name: `component/<name>` (e.g., `component/button`)
- Confirm worktree is created and you're working in it

**No checkpoint here — proceed directly to Step 1.**

## Step 1: Grill-me

Auto-gather context before invoking `grill-me`:

1. Read `docs/DS_CONSTRAINTS.md`
2. If **audit + fix**: read the existing component code from `packages/web/src/components/`
3. Check `../KISA-website/client/src/components/ui/` for a client-app reference implementation
4. Read `docs/specs/component.md` § Docs Pages for the minimum template

Invoke `grill-me` with all gathered context. The grill-me session must resolve:

- **API shape:** props, variants, defaults, types
- **Category:** which folder under `components/` (e.g., `button/`, `display/`, `navigation/`)
- **Audit findings** (if audit + fix): what needs to change in API and styling
- **Docs page:** what additional sections beyond the minimum (header, examples, API reference)
- **DS_CONSTRAINTS edge cases:** any constraints that need special attention for this component

> **Checkpoint:** Grill-me complete. [1-2 sentence summary of key decisions.]
> Ready to proceed to Step 2: Write plan. Go ahead?

## Step 2: Write Plan

Invoke `superpowers:writing-plans`.

- Output: `docs/plans/<name>.md`
- **One plan, two phases:**
  - **Phase 1:** Component implementation (or audit + fix)
  - **Phase 2:** Docs page (`apps/docs/app/components/<name>/page.tsx`) + sidebar update
- Concise — decisions and file lists, no implementation code
- Informed by grill-me output

> **Checkpoint:** Plan written at `docs/plans/<name>.md`. [1-2 sentence summary of phases.]
> Ready to proceed to Step 3: Implement component. Go ahead?

## Step 3: Implement Component

Invoke `ds-constrained-execution` to execute **Phase 1** of the plan.

- Implementer subagent handles the code
- ds-review agent runs automatically on all `.tsx` output
- Hard stop if violations persist after 2 rounds — escalate to user

Styling rules:
- **CVA** for components with 2+ variant dimensions (e.g., variant x size)
- **`cn()` only** for simple components with no variant matrix
- All output must pass `docs/DS_CONSTRAINTS.md`

> **Checkpoint:** Component [implemented | audited + fixed]. [1-2 sentence summary — files created/modified, key decisions.]
> Ready to proceed to Step 4: Implement docs page. Go ahead?

## Step 4: Implement Docs Page

Continue `ds-constrained-execution` with **Phase 2** of the plan.

- Create `apps/docs/app/components/<name>/page.tsx`
- **STRICT RULE:** Before writing the docs page, read `apps/docs/app/components/dialog/page.tsx` and match its layout pattern exactly (heading hierarchy, spacing classes, table structure, ComponentPreview placement). Do not invent a new pattern.
- Minimum sections:
  1. **Header** — component name, description, canonical purpose
  2. **Examples** — wrapped in `ComponentPreview`, showing key use cases
  3. **API Reference** — HTML table with props, types, defaults, descriptions
- Plus any additional sections decided in grill-me
- Add component to `COMPONENT_ITEMS` in `apps/docs/components/Sidebar.tsx`
- ds-review runs on the docs `.tsx` file

> **Checkpoint:** Docs page created at `apps/docs/app/components/<name>/page.tsx`. Sidebar updated. [1-2 sentence summary.]
> Ready to proceed to Step 5: Validate. Go ahead?

## Step 5: Validate

Run both commands (validation only — do NOT `git add dist/`):

```
pnpm typecheck
pnpm build
```

Both must pass. If either fails, fix the issue before proceeding.

> **Checkpoint:** typecheck and build both pass. No errors.
> Ready to proceed to Step 6: Junhee review. Go ahead?

## Step 6: Junhee Review

Invoke the `junhee` agent to review the docs page for documentation quality.

- **Advisory, not blocking.** Present Junhee's feedback to the user.
- User accepts or rejects suggestions interactively.
- Make agreed-upon fixes to the docs page.

> **Checkpoint:** Junhee review complete. [Summary of changes made, if any.]
> Ready to proceed to Step 7: Merge. Go ahead?

## Step 7: Merge

After user confirmation:

1. Commit all changes in the worktree
2. Switch to main
3. Merge `component/<name>` into main
4. Run `pnpm build`
5. Commit dist on main
6. Delete the `component/<name>` branch

> **Checkpoint:** Merged `component/<name>` into main. Dist built and committed. Branch deleted.
> Ready to proceed to Step 8: Update tracking. Go ahead?

## Step 8: Update Tracking

On main after merge:

1. **`docs/TODO.md`** — check off the component's line item
2. **`docs/DS_CODEBASE.md`** — add/update the component in the status table (name, category, token-connected: ✅)
3. **`docs/_client_migration_notes.md`** — append a section only if API changed from the existing implementation (identified during grill-me). Format:
   ```markdown
   ## <ComponentName>
   - `oldProp` renamed to `newProp`
   - Variant `x` removed, use `y` instead
   ```

> **Done.** Component `<name>` is complete. [Final summary.]

## Reference

- Spec: `docs/specs/component.md`
- Constraints: `docs/DS_CONSTRAINTS.md`
- Plans: `docs/plans/<name>.md`
- Client reference: `../KISA-website/client/src/components/ui/`
