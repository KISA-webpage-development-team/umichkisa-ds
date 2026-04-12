---
name: ds-client-constrained-execution
description: Use when executing a phased client migration plan — each task that modifies client .tsx files requires a DS client constraint review pass before proceeding, with TDD and NO-TDD execution modes
---

# DS Client Constrained Execution

## Overview

Drives task-by-task execution of client migration plans. Two modes based on each task's tag:

- **`[NO-TDD]`**: implementer → ds-client-review → typecheck → commit
- **`[TDD]`**: test-writer (red) → verify fail → implementer (green) → ds-client-review → verify pass → refactor → typecheck → commit

The main session only orchestrates, reviews, typechecks, and commits. Implementation and test-writing are dispatched to subagents.

## Mode Detection

Read the task's tag from `plan.md`. Every task is marked `[TDD]` or `[NO-TDD]` at audit time. This is not agent discretion — follow the tag.

## Detecting `.tsx` tasks

Look at each task's `**Files:**` section in the plan — not `git status`. A task has `.tsx` changes if any `Create:` or `Modify:` entry ends in `.tsx`.

## `[NO-TDD]` Execution Loop

```dot
digraph no_tdd {
  "Start next task" [shape=box];
  "Dispatch implementer" [shape=box];
  "BLOCKED?" [shape=diamond];
  "HARD STOP (escalate)" [shape=box];
  "Any .tsx?" [shape=diamond];
  "ds-client-review" [shape=box];
  "Violations?" [shape=diamond];
  "Re-dispatch with violations" [shape=box];
  "Round 2 exhausted?" [shape=diamond];
  "HARD STOP (violations)" [shape=box];
  "Typecheck + commit" [shape=box];
  "All tasks done?" [shape=diamond];
  "vercel-react-best-practices" [shape=box];

  "Start next task" -> "Dispatch implementer";
  "Dispatch implementer" -> "BLOCKED?";
  "BLOCKED?" -> "HARD STOP (escalate)" [label="yes"];
  "BLOCKED?" -> "Any .tsx?" [label="no (DONE)"];
  "Any .tsx?" -> "ds-client-review" [label="yes"];
  "Any .tsx?" -> "Typecheck + commit" [label="no"];
  "ds-client-review" -> "Violations?";
  "Violations?" -> "Typecheck + commit" [label="no (PASS)"];
  "Violations?" -> "Re-dispatch with violations" [label="yes"];
  "Re-dispatch with violations" -> "Round 2 exhausted?";
  "Round 2 exhausted?" -> "HARD STOP (violations)" [label="still failing"];
  "Round 2 exhausted?" -> "ds-client-review" [label="no, re-check"];
  "Typecheck + commit" -> "All tasks done?";
  "All tasks done?" -> "vercel-react-best-practices" [label="yes"];
  "All tasks done?" -> "Start next task" [label="no"];
}
```

## `[TDD]` Execution Loop

```dot
digraph tdd {
  "Start next task" [shape=box];
  "Dispatch test-writer" [shape=box];
  "Test-writer BLOCKED?" [shape=diamond];
  "HARD STOP (escalate)" [shape=box];
  "Run tests (expect RED)" [shape=box];
  "Tests fail?" [shape=diamond];
  "Re-dispatch test-writer" [shape=box];
  "Dispatch implementer" [shape=box];
  "Implementer BLOCKED?" [shape=diamond];
  "HARD STOP (impl escalate)" [shape=box];
  "Any .tsx?" [shape=diamond];
  "ds-client-review" [shape=box];
  "Violations?" [shape=diamond];
  "Re-dispatch impl with violations" [shape=box];
  "Round 2 exhausted?" [shape=diamond];
  "HARD STOP (violations)" [shape=box];
  "Run tests (expect GREEN)" [shape=box];
  "Tests pass?" [shape=diamond];
  "Re-dispatch implementer (fix)" [shape=box];
  "Refactor (optional)" [shape=box];
  "Tests still green?" [shape=diamond];
  "Typecheck + commit" [shape=box];
  "All tasks done?" [shape=diamond];
  "vercel-react-best-practices" [shape=box];

  "Start next task" -> "Dispatch test-writer";
  "Dispatch test-writer" -> "Test-writer BLOCKED?";
  "Test-writer BLOCKED?" -> "HARD STOP (escalate)" [label="yes"];
  "Test-writer BLOCKED?" -> "Run tests (expect RED)" [label="no (DONE)"];
  "Run tests (expect RED)" -> "Tests fail?";
  "Tests fail?" -> "Dispatch implementer" [label="yes (correct RED)"];
  "Tests fail?" -> "Re-dispatch test-writer" [label="no (tests pass = wrong tests)"];
  "Re-dispatch test-writer" -> "Run tests (expect RED)";
  "Dispatch implementer" -> "Implementer BLOCKED?";
  "Implementer BLOCKED?" -> "HARD STOP (impl escalate)" [label="yes"];
  "Implementer BLOCKED?" -> "Any .tsx?" [label="no (DONE)"];
  "Any .tsx?" -> "ds-client-review" [label="yes"];
  "Any .tsx?" -> "Run tests (expect GREEN)" [label="no"];
  "ds-client-review" -> "Violations?";
  "Violations?" -> "Run tests (expect GREEN)" [label="no (PASS)"];
  "Violations?" -> "Re-dispatch impl with violations" [label="yes"];
  "Re-dispatch impl with violations" -> "Round 2 exhausted?";
  "Round 2 exhausted?" -> "HARD STOP (violations)" [label="still failing"];
  "Round 2 exhausted?" -> "ds-client-review" [label="no, re-check"];
  "Run tests (expect GREEN)" -> "Tests pass?";
  "Tests pass?" -> "Refactor (optional)" [label="yes"];
  "Tests pass?" -> "Re-dispatch implementer (fix)" [label="no"];
  "Re-dispatch implementer (fix)" -> "Run tests (expect GREEN)";
  "Refactor (optional)" -> "Tests still green?";
  "Tests still green?" -> "Typecheck + commit" [label="yes"];
  "Tests still green?" -> "Refactor (optional)" [label="no (revert)"];
  "Typecheck + commit" -> "All tasks done?";
  "All tasks done?" -> "vercel-react-best-practices" [label="yes"];
  "All tasks done?" -> "Start next task" [label="no"];
}
```

## Implementer Subagent

Use the template in `implementer-template.md` (same directory as this skill). Key rules:
- Paste the **full task text** from the plan inline — do not make the subagent read the plan file
- Read `docs/DS_CLIENT_USAGE.md` and paste its full contents into the placeholder
- The implementer does **Step 1 only** (implement all files for the task) — never typecheck or commit
- In `[TDD]` mode: the implementer writes **minimal code to pass the tests** — nothing more
- For revisions: include the full ds-client-review violation report in the prompt
- If implementer returns BLOCKED or NEEDS_CONTEXT → hard stop, surface to user

## Test-Writer Subagent (`[TDD]` mode only)

Use the template in `test-writer-template.md` (same directory as this skill). Key rules:
- Paste the **full task text** from the plan inline
- The test-writer writes **failing tests only** — zero production code
- Tests must fail because the feature is missing, not because of typos or import errors
- After dispatch, run the tests yourself and verify they fail (RED phase)
- If tests pass immediately → the tests are wrong. Re-dispatch the test-writer.

## DS Client Review

After Step 1 of any task that touches `.tsx`, invoke the `ds-client-review` agent using the Agent tool.

**What to pass in the agent prompt:**
1. The full content of each changed `.tsx` file (paste inline)
2. The full content of `docs/DS_CLIENT_USAGE.md` (paste inline)
3. Instruction: return structured violations per the agent's output format

**Expected output — violations:**
```
VIOLATION 1
File: src/features/jobs/JobCard.tsx:12
Rule: "Never: Import from `react-icons` — fully replaced by the DS icon system."
Violation: `import { FiBriefcase } from 'react-icons/fi'` imports from react-icons.
Fix: Replace with `<Icon name="briefcase" />` from `@umichkisa-ds/web`.

---
Result: 1 violation(s), 0 warning(s) found
```

**Expected output — clean pass:**
```
---
Result: PASS — no violations found
```

## Hard Stop

When violations remain after 2 revision rounds:

1. Print: `DS CLIENT REVIEW HARD STOP — unresolved violations after 2 rounds`
2. List every remaining violation with file:line, exact quoted rule, and suggested fix
3. Stop. Do not move to the next task.
4. Ask:
   > How would you like to proceed?
   > (a) Clarify or relax the constraint in DS_CLIENT_USAGE.md
   > (b) Adjust the spec / approach for this task
   > (c) Attempt one more round with new direction from you

Wait for explicit instruction before continuing.

## Final Review

After all tasks pass DS client review, invoke the `vercel-react-best-practices` skill for a final code quality pass. Then proceed to the plan's session-end checklist.

## Common Mistakes

- **Using git status to detect .tsx changes** — always use the task's `Files:` section instead
- **Running typecheck before DS client review** — DS client review must pass first; typecheck comes after
- **Skipping review on mixed tasks** — if a task touches both `.md` and `.tsx`, the `.tsx` always triggers the review cycle
- **Batching tasks** — review each task independently; do not accumulate changes across tasks before reviewing
- **Treating round 2 as soft** — after round 2 with violations still present, hard stop is mandatory, not optional
- **Summarizing violations** — always quote the exact rule text from DS_CLIENT_USAGE.md, never paraphrase
- **Wrong mode** — follow the task's `[TDD]`/`[NO-TDD]` tag exactly. Do not switch modes based on task complexity or your judgment
- **Skipping RED verification in TDD mode** — you MUST run the tests yourself and see them fail before dispatching the implementer. No exceptions.
- **Implementer writing tests in TDD mode** — the implementer writes production code only. Tests come from the test-writer subagent.
