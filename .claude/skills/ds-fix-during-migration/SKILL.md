---
name: ds-fix-during-migration
description: Use when a DS component bug, missing export, or token gap is discovered during client migration — not for new components
---

# DS Fix During Migration

## Overview

Pause client work, fix DS on `main`, verify via symlink, log for phase-end bump, resume. Keeps fixes minimal — bug fixes and gap fills only, no feature additions.

## Scope Check

```dot
digraph scope {
  "DS issue found" [shape=doublecircle];
  "New component needed?" [shape=diamond];
  "Log in TODO.md Post-Migration" [shape=box];
  "Done (out of scope)" [shape=doublecircle];
  "Fix on DS main" [shape=box];
  "Any .tsx changed?" [shape=diamond];
  "Run ds-review agent" [shape=box];
  "pnpm build + pnpm typecheck (DS)" [shape=plaintext];
  "link-ds.sh (client)" [shape=plaintext];
  "pnpm typecheck (client)" [shape=plaintext];
  "Client typecheck passes?" [shape=diamond];
  "Log in notes.md + ds-fixes-log.md" [shape=box];
  "Accumulate for phase-end bump" [shape=doublecircle];
  "BLOCKING: emergency bump (confirm first)" [shape=octagon, style=filled, fillcolor=red, fontcolor=white];

  "DS issue found" -> "New component needed?";
  "New component needed?" -> "Log in TODO.md Post-Migration" [label="yes"];
  "Log in TODO.md Post-Migration" -> "Done (out of scope)";
  "New component needed?" -> "Fix on DS main" [label="no"];
  "Fix on DS main" -> "Any .tsx changed?";
  "Any .tsx changed?" -> "Run ds-review agent" [label="yes"];
  "Any .tsx changed?" -> "pnpm build + pnpm typecheck (DS)" [label="no"];
  "Run ds-review agent" -> "pnpm build + pnpm typecheck (DS)";
  "pnpm build + pnpm typecheck (DS)" -> "link-ds.sh (client)";
  "link-ds.sh (client)" -> "pnpm typecheck (client)";
  "pnpm typecheck (client)" -> "Client typecheck passes?";
  "Client typecheck passes?" -> "Log in notes.md + ds-fixes-log.md" [label="yes"];
  "Client typecheck passes?" -> "BLOCKING: emergency bump (confirm first)" [label="no"];
  "Log in notes.md + ds-fixes-log.md" -> "Accumulate for phase-end bump";
}
```

## Fix Rules

- **Minimal fix only.** Fix the bug or fill the gap — do not add features, refactor neighbors, or improve unrelated code.
- **Direct on `main`.** No worktree. These are small, targeted patches.
- **ds-review gates `.tsx`.** If the fix touches any `.tsx` file, run the `ds-review` agent against it before building. Same rules as `ds-constrained-execution`.

## Verification Chain (all three, in order)

1. `pnpm build` in DS repo — produces new dist
2. `../KISA-website/client/scripts/link-ds.sh` — symlinks new dist into client
3. `pnpm typecheck` in client repo — confirms the fix resolves the original issue

Do NOT skip any step. Do NOT assume the symlink is already in place — always re-run `link-ds.sh`.

## Dual Logging

After verification passes, log in **both** places:

1. **Subphase `notes.md`** — append: `DS FIX: <description> (commit <SHA>)`
2. **`docs/plans/client-migration/ds-fixes-log.md`** — append under the correct package section: `- **[Phase N.M]** <description> (commit SHA)`

## Blocking Detection

If the client **cannot typecheck even with the symlink** (e.g., the fix requires a new dependency, or the type definitions are structurally incompatible), the fix is **blocking** — it cannot wait for phase-end.

For a blocking fix:
1. Ask the user for confirmation before proceeding
2. Follow `ds-phase-end-bump` steps 2–7 for the affected package only
3. Log with `(BLOCKING)` tag in both notes.md and ds-fixes-log.md

## Resume

After the fix is complete and logged:
1. Re-read the current subphase's `plan.md`
2. Find the task that was blocked
3. Report: "Resume at **Task N: <task title>** — re-dispatch implementer"

## Common Mistakes

- Fixing a new component instead of logging it in TODO.md Post-Migration
- Adding features beyond the minimal fix (scope creep)
- Skipping `link-ds.sh` — always re-run it, even if you think the symlink exists
- Logging in only one place — both `notes.md` AND `ds-fixes-log.md` are required
- Running emergency bump without user confirmation
- Not providing the exact resume task after the fix
