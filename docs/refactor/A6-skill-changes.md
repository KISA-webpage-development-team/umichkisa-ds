# A6 — Skill Refactor Plan

_Subphase A6 of the `ds-client-constrained-execution` 4-layer refactor. **Draft diff only** — `.claude/skills/ds-client-constrained-execution/SKILL.md` is NOT edited in this phase. The diff represents the **target post-Phase-C state**; C3 applies it after Phase B validates the new `ds-client-implementer` subagent. Active client migration continues on the existing template path until then._

A6 generalizes the skill from migration-coupled execution to a **general DS-execution skill** for any `@umichkisa-ds` consumer. The single through-line for every diff hunk:

> **Skill = WHAT TO DO. Agents = HOW.**

Migration-orchestration mechanics (PRs, lanes, phases, `AUTONOMOUS_PROTOCOL.md`, `notes.md`, `needs-decision` labels) and reference-doc internals (which doc the implementer reads on demand) are explicitly out of scope for the skill. Both belong elsewhere — caller protocols and agent definitions, respectively.

---

## Section-by-section change inventory

Quick scan before the diff.

| Section (current) | Action | Result |
|---|---|---|
| Frontmatter `description:` | Generalize | Drop "phased client migration plan"; framing covers any consumer project |
| `## Overview` | Generalize | Drop "client migration"; default-to-`[NO-TDD]` rule added; pointer to new section |
| `## Execution context` | **DELETE** | Was: live/autonomous bifurcation + override pointers — pure caller-protocol leakage |
| `## Redesign over Preserve` | **DELETE** | Lives in `ds-client-implementer` system prompt (per A5 §Working principles); duplicating in skill drifts |
| `## [NO-TDD] Execution Loop` | Revise graph | Single front diamond `Any .tsx in scope?` drives both dispatch type AND review chain |
| `## [TDD] Execution Loop` | Revise graph | Same dispatch fork inserted between `Tests RED?` and the implementer node |
| `## Subagent Templates` | **RENAME + REWRITE + MOVE UP** | Becomes `## Dispatching Workers`, sits right after `## Overview`; covers worker-type fork + don't-paste rule + re-dispatch envelope |
| `## DS Client Review` | Revise | Drop autonomous override; drop reference-doc name; rephrase hard-stop (stop + report; no "ask the user / wait") |
| `## Toss FE Review` | Revise | Drop autonomous override; rephrase hard-stop; "PR body" → "task report"; "lane" → "task"; envelope reference points to new section |
| `## Final Review` | Revise | Drop autonomous override; drop "session-end checklist" caller leak; rephrase hard-stop |
| `## Common Mistakes` | Revise items | Update wording for caller-provided file list, mode declaration, paraphrased violations |

Net file delta: -2 sections, +1 section (renamed-and-moved), 4 section rewrites, 2 graph revisions, 1 frontmatter rewrite. Estimated post-diff file length: ~140 lines (down from 172).

---

## Unified diff

```diff
--- a/.claude/skills/ds-client-constrained-execution/SKILL.md
+++ b/.claude/skills/ds-client-constrained-execution/SKILL.md
@@ -1,4 +1,4 @@
 ---
 name: ds-client-constrained-execution
-description: Use when executing a phased client migration plan — each task that modifies client .tsx files requires a DS client constraint review pass before proceeding, with TDD and NO-TDD execution modes
+description: Use when executing a task in any @umichkisa-ds consumer project — tasks that modify .tsx/.jsx files trigger a DS-constraint review pass before proceeding, with TDD and NO-TDD execution modes
 ---

@@ -6,38 +6,55 @@
 # DS Client Constrained Execution

 ## Overview

-Drives task-by-task execution of client migration plans. Two modes based on each task's `[TDD]`/`[NO-TDD]` tag in `plan.md` (not agent discretion — follow the tag):
+Drives task-by-task execution for any consumer of `@umichkisa-ds`. Operates in `[TDD]` or `[NO-TDD]` mode per the task spec. Default to `[NO-TDD]` when unspecified.

 - **`[NO-TDD]`**: implementer → ds-client-review → toss-fe-review → typecheck → commit
 - **`[TDD]`**: test-writer (red) → verify fail → implementer (green) → ds-client-review → toss-fe-review → verify pass → refactor → typecheck → commit

-The main session only orchestrates, reviews, typechecks, and commits. Implementation and test-writing are dispatched to subagents.
-
-## Execution context
-
-This skill runs in two modes; the **invoker declares** which (no auto-detection):
-
-- **Live (default)** — interactive Mode D session at the keyboard. On unresolved BLOCKs after exhausted rounds, the orchestrator **stops and asks** the user how to proceed (the (a)/(b)/(c)/(d) prompts in each gate's "Hard stop" block).
-- **Autonomous** — nightly routine in a cloud VM (per `AUTONOMOUS_PROTOCOL.md` §6 Bailout). On unresolved BLOCKs, **never block the run.** Instead: convert the PR to draft, add `needs-decision` label, post a structured comment with the unresolved findings, append a one-liner to `notes.md`, and **move on to the next eligible lane.**
-
-The Toss FE Review and Final Review sections below each have an **Autonomous override** subsection. Honor it whenever the invoker has declared autonomous mode. DS-violation hard stop (in ds-client-review) follows the same override: bailout-to-draft instead of stop-and-ask.
-
-## Redesign over Preserve
-
-Client migration is **redesign + migration**, not mechanical retokenization. When the original UI conflicts with `DS_CLIENT_USAGE.md`, the executor **must pick the DS-canonical choice**, not preserve the original value.
-
-Examples: `md:space-x-8` nav strip → ship Component-tier `space-x-4`; `rounded-lg` button → ship `rounded-md`; `text-gray-600` helper caption → ship `text-muted-foreground`.
-
-**Visibility rule — `text-muted-foreground` is NOT a default body color.** Reserve it for genuinely secondary content (captions, helper text, metadata, timestamps). Anything the user needs to read stays `text-foreground`. Test: if this text went to 40% opacity, would the screen still be usable? If no → primary, keep `text-foreground`.
-
-Implementer must record every such choice in the PR body under a `## Deviations from original` bullet list, so the reviewer can verify the DS reasoning (not just the rename).
-
-Only brand identity is preserved unconditionally: navy + maize colors, Korean + English type pairing, page structure, signature moves. Everything else defers to DS.
-
-**This applies at write time, not review time.** The implementer shouldn't ship off-tier values expecting the reviewer to catch them — every spacing, color, radius, and typography value should be tier-justified before the file is written.
+The main session orchestrates, reviews, typechecks, and commits. Implementation and test-writing are dispatched to workers (see `## Dispatching Workers`).
+
+## Dispatching Workers
+
+Two worker types, selected by what's in the task's file list:
+
+- **`.tsx` or `.jsx` in scope** → dispatch the **`ds-client-implementer` subagent** (DS-aware; reads its own reference docs).
+- **Otherwise** → dispatch the built-in **`general-purpose` subagent** with the task text only.
+
+The fork is the same predicate that gates the review chain (see the loop graphs): if the task touches `.tsx`/`.jsx`, the DS-aware implementer runs and the review chain follows; if not, the general-purpose worker runs and the review chain is skipped entirely.
+
+Test-writing dispatches the `test-writer-template.md` worker (same directory) for `[TDD]` mode tasks, regardless of whether the implementer half is DS-aware or general-purpose.
+
+### Critical dispatch rules
+
+- Paste the **full task text** from the caller's task spec inline — do NOT make the worker read the spec file.
+- The implementer subagent reads its own reference docs — do NOT paste reference material into the dispatch payload.
+- Implementer does Step 1 only (write/modify the listed files); test-writer writes failing tests only (zero production code).
+
+### Re-dispatch envelope
+
+When a review gate fails and triggers a re-dispatch, append the following block to a fresh dispatch (keeping the original task text and files-in-scope verbatim):
+
+```
+## Re-dispatch — Round <N> of 2
+
+## Original task (verbatim)
+<task text>
+
+## Files in scope
+- <path>
+- <path>
+
+## Prior attempt — violations
+- <file>:<line> — <rule_id> (severity) — <gloss>
+- <file>:<line> — <rule_id> (severity) — <gloss>
+
+## Instruction
+Fix the violations without changing behavior outside the violation sites.
+```
+
+Same envelope shape applies to both DS-violation re-dispatches and Toss FE BLOCK re-dispatches.

 ## `[NO-TDD]` Execution Loop

-Detect `.tsx` changes from the task's `**Files:**` section in the plan (not `git status`) — any `Create:`/`Modify:` entry ending in `.tsx` triggers the review chain.
+Detect `.tsx`/`.jsx` changes from the caller-provided file list (not `git status`). The `.tsx`/`.jsx` predicate drives BOTH the dispatch type (per `## Dispatching Workers`) AND the review chain.

 ```dot
 digraph no_tdd {
   node [shape=box];
-  "BLOCKED?" [shape=diamond]; "Any .tsx?" [shape=diamond]; "DS violations?" [shape=diamond]; "DS r2?" [shape=diamond]; "BLOCK findings?" [shape=diamond]; "Toss r2?" [shape=diamond]; "All done?" [shape=diamond];
-
-  "Start" -> "Dispatch implementer" -> "BLOCKED?";
-  "BLOCKED?" -> "HARD STOP (escalate)" [label="yes"];
-  "BLOCKED?" -> "Any .tsx?" [label="no"];
-  "Any .tsx?" -> "ds-client-review" [label="yes"];
-  "Any .tsx?" -> "Typecheck + commit" [label="no"];
+  "Any .tsx in scope?" [shape=diamond]; "BLOCKED (DS)?" [shape=diamond]; "BLOCKED (gen)?" [shape=diamond]; "DS violations?" [shape=diamond]; "DS r2?" [shape=diamond]; "BLOCK findings?" [shape=diamond]; "Toss r2?" [shape=diamond]; "All done?" [shape=diamond];
+
+  "Start" -> "Any .tsx in scope?";
+  "Any .tsx in scope?" -> "Dispatch ds-client-implementer" [label="yes"];
+  "Any .tsx in scope?" -> "Dispatch general-purpose" [label="no"];
+  "Dispatch ds-client-implementer" -> "BLOCKED (DS)?";
+  "Dispatch general-purpose" -> "BLOCKED (gen)?";
+  "BLOCKED (DS)?" -> "HARD STOP (escalate)" [label="yes"];
+  "BLOCKED (DS)?" -> "ds-client-review" [label="no"];
+  "BLOCKED (gen)?" -> "HARD STOP (escalate)" [label="yes"];
+  "BLOCKED (gen)?" -> "Typecheck + commit" [label="no"];
   "ds-client-review" -> "DS violations?";
   "DS violations?" -> "toss-fe-review" [label="no (PASS)"];
   "DS violations?" -> "Re-dispatch (DS)" [label="yes"];
@@ -76,10 +93,12 @@

 ```dot
 digraph tdd {
   node [shape=box];
-  "TW BLOCKED?" [shape=diamond]; "Tests RED?" [shape=diamond]; "Impl BLOCKED?" [shape=diamond]; "Any .tsx?" [shape=diamond]; "DS violations?" [shape=diamond]; "DS r2?" [shape=diamond]; "BLOCK findings?" [shape=diamond]; "Toss r2?" [shape=diamond]; "Tests GREEN?" [shape=diamond]; "Still green?" [shape=diamond]; "All done?" [shape=diamond];
+  "TW BLOCKED?" [shape=diamond]; "Tests RED?" [shape=diamond]; "Any .tsx in scope?" [shape=diamond]; "Impl BLOCKED (DS)?" [shape=diamond]; "Impl BLOCKED (gen)?" [shape=diamond]; "DS violations?" [shape=diamond]; "DS r2?" [shape=diamond]; "BLOCK findings?" [shape=diamond]; "Toss r2?" [shape=diamond]; "Tests GREEN?" [shape=diamond]; "Still green?" [shape=diamond]; "All done?" [shape=diamond];

   "Start" -> "Dispatch test-writer" -> "TW BLOCKED?";
   "TW BLOCKED?" -> "HARD STOP (TW)" [label="yes"];
   "TW BLOCKED?" -> "Run tests (RED)" [label="no"];
   "Run tests (RED)" -> "Tests RED?";
-  "Tests RED?" -> "Dispatch implementer" [label="yes"];
+  "Tests RED?" -> "Any .tsx in scope?" [label="yes"];
   "Tests RED?" -> "Re-dispatch TW" [label="no (wrong tests)"];
   "Re-dispatch TW" -> "Run tests (RED)";
-  "Dispatch implementer" -> "Impl BLOCKED?";
-  "Impl BLOCKED?" -> "HARD STOP (impl)" [label="yes"];
-  "Impl BLOCKED?" -> "Any .tsx?" [label="no"];
-  "Any .tsx?" -> "ds-client-review" [label="yes"];
-  "Any .tsx?" -> "Run tests (GREEN)" [label="no"];
+  "Any .tsx in scope?" -> "Dispatch ds-client-implementer" [label="yes"];
+  "Any .tsx in scope?" -> "Dispatch general-purpose" [label="no"];
+  "Dispatch ds-client-implementer" -> "Impl BLOCKED (DS)?";
+  "Dispatch general-purpose" -> "Impl BLOCKED (gen)?";
+  "Impl BLOCKED (DS)?" -> "HARD STOP (impl)" [label="yes"];
+  "Impl BLOCKED (DS)?" -> "ds-client-review" [label="no"];
+  "Impl BLOCKED (gen)?" -> "HARD STOP (impl)" [label="yes"];
+  "Impl BLOCKED (gen)?" -> "Run tests (GREEN)" [label="no"];
   "ds-client-review" -> "DS violations?";
   "DS violations?" -> "toss-fe-review" [label="no (PASS)"];
   "DS violations?" -> "Re-dispatch (DS)" [label="yes"];
@@ -115,42 +134,48 @@
   "All done?" -> "Start" [label="no"];
 }
 ```

-## Subagent Templates
-
-Use `implementer-template.md` and `test-writer-template.md` (same directory). Critical rules:
-- Paste the **full task text** from the plan inline — do NOT make the subagent read the plan file
-- Implementer does Step 1 only (write files); test-writer writes failing tests only (zero production code)
-
 ## DS Client Review

-After Step 1 of any task that touches `.tsx`, invoke the `ds-client-review` agent. Pass: each changed `.tsx` file inline + instruction to return structured violations. The agent reads `docs/DS_CLIENT_USAGE.md` itself — do not paste it inline.
+After Step 1 of any task that touches `.tsx`/`.jsx`, invoke the `ds-client-review` agent. Pass: each changed file inline + instruction to return structured violations. The agent reads its own reference docs — do not paste them inline.

 Output: structured `VIOLATION N / File / Rule / Violation / Fix` blocks ending with `Result: N violation(s)...`, or `Result: PASS — no violations found` on clean.

-**Hard stop on violations after 2 rounds:** print `DS CLIENT REVIEW HARD STOP — unresolved violations after 2 rounds`, list every remaining violation (file:line + quoted rule + fix), stop, and ask:
-> (a) Clarify/relax the constraint in DS_CLIENT_USAGE.md (b) Adjust the spec/approach (c) One more round with new direction (d) DS bug — invoke `ds-fix-during-migration`, then resume
-
-Wait for explicit instruction.
+On re-dispatch, use the envelope in `## Dispatching Workers`.

-**Autonomous override:** open the PR as **draft**, add label `needs-decision`, post a comment headed `## DS Client Review — unresolved violations after 2 rounds` with each `file:line + quoted rule + fix`, append a one-liner to the phase's `notes.md`, then move on to the next eligible lane. Do not stop the run.
+**Hard stop on violations after 2 rounds.** Stop execution and report:
+- Header: `DS CLIENT REVIEW HARD STOP — unresolved violations after 2 rounds`
+- Every remaining violation: file:line + quoted rule + fix
+- Decision space (the caller acts on one of these):
+  (a) Clarify/relax the constraint  (b) Adjust the spec/approach
+  (c) One more round with new direction  (d) DS bug — invoke `ds-fix-during-migration`
+
+Do not proceed to typecheck, commit, or the next task.

 ## Toss FE Review

-After ds-client-review passes (no violations), and before typecheck (NO-TDD) or tests-green-verify (TDD), invoke the `toss-fe-review` agent. Pass: each changed `.tsx` file inline, optionally adjacent files for context (parents, hook callers, siblings) when referenced non-trivially, and instruction to return structured findings. The agent reads its own rubric — do not paste rules inline.
+After ds-client-review passes (no violations), and before typecheck (NO-TDD) or tests-green-verify (TDD), invoke the `toss-fe-review` agent. Pass: each changed `.tsx`/`.jsx` file inline, optionally adjacent files for context (parents, hook callers, siblings) when referenced non-trivially, and instruction to return structured findings. The agent reads its own rubric — do not paste rules inline.

 **Severity gate (orchestrator behavior):**
-- **BLOCK** finding(s) → re-dispatch implementer with the findings; same 2-round hard-stop rule as ds-client-review
-- **SUGGEST** / **INFO** → collect for the PR body's `## Toss FE notes` section; do NOT re-dispatch
+- **BLOCK** finding(s) → re-dispatch implementer with the findings (envelope per `## Dispatching Workers`); same 2-round hard-stop rule as ds-client-review
+- **SUGGEST** / **INFO** → collect for the task's report; do NOT re-dispatch

-**Hard stop on toss BLOCK after 2 rounds:** print `TOSS FE REVIEW HARD STOP — unresolved BLOCK findings after 2 rounds`, list remaining BLOCKs, stop, and ask:
-> (a) Downgrade BLOCK → SUGGEST and move on (b) Adjust task scope — break refactor into its own lane (c) One more round with new direction (d) Override — accept and ship
-
-Wait for explicit instruction.
+**Hard stop on toss BLOCK after 2 rounds.** Stop execution and report:
+- Header: `TOSS FE REVIEW HARD STOP — unresolved BLOCK findings after 2 rounds`
+- Every remaining BLOCK: file:line + finding + suggested fix
+- Decision space (the caller acts on one of these):
+  (a) Downgrade BLOCK → SUGGEST and move on  (b) Adjust task scope — split the refactor into its own task
+  (c) One more round with new direction  (d) Override — accept and ship

-**Autonomous override:** open the PR as **draft**, add label `needs-decision`, post a comment headed `## Toss FE — unresolved BLOCK after 2 rounds` with each remaining BLOCK (file:line + finding + suggested fix), append a one-liner to the phase's `notes.md`, then move on to the next eligible lane. Do not stop the run.
+Do not proceed to typecheck, commit, or the next task.

-**SUGGEST / INFO collection:** Append SUGGEST findings to a `## Toss FE notes` section in the PR body under each lane's commit. INFO findings are not surfaced. (Autonomous mode unchanged — these never block.)
+**SUGGEST / INFO collection:** Append SUGGEST findings to the task's report (caller decides the report format). INFO findings are not surfaced.

 ## Final Review

 After all tasks pass both review gates, invoke the `vercel-react-best-practices` skill for a final code quality pass.

 **Severity contract** (mirrors Toss):
-- BLOCK-equivalent findings → live: stop and ask the user; autonomous: see override below
-- SUGGEST/INFO → append to `## Final review notes` section in the PR body; do NOT re-dispatch
+- BLOCK-equivalent findings → hard stop (see below)
+- SUGGEST/INFO → append to the task's report; do NOT re-dispatch

-**Autonomous override:** if the final review surfaces BLOCK-equivalent findings, open the PR as **draft**, add label `needs-decision`, post a comment headed `## Final Review (vercel-react-best-practices) — flagged` with each finding (file:line + issue + suggested fix), append a one-liner to the phase's `notes.md`, then move on to the next eligible lane. Do not stop the run.
+**Hard stop on Final Review BLOCK-equivalent findings.** Stop execution and report:
+- Header: `FINAL REVIEW HARD STOP — flagged findings`
+- Every flagged finding: file:line + issue + suggested fix

-Then proceed to the plan's session-end checklist.
+Do not proceed.

 ## Common Mistakes

-- **Using git status to detect .tsx changes** — always use the task's `Files:` section
-- **Wrong mode** — follow the task's `[TDD]`/`[NO-TDD]` tag exactly; never switch based on judgment
-- **Skipping RED verification in TDD mode** — run tests yourself and see them fail before dispatching the implementer
-- **Summarizing violations** — quote the exact rule text from DS_CLIENT_USAGE.md, never paraphrase
+- **Detecting .tsx changes via git status** — use the caller-provided file list.
+- **Switching execution mode based on judgment** — follow the task spec's `[TDD]`/`[NO-TDD]` declaration; default to `[NO-TDD]` only when none is declared.
+- **Skipping RED verification in TDD mode** — run tests yourself and see them fail before dispatching the implementer.
+- **Paraphrasing violations** — quote rule text exactly as the reviewer reported it.
```

---

## Prose summary of changes

For human reviewers — scan this list to verify the diff matches intent before approving for C3.

1. **Generalized scope.** Frontmatter `description` and `## Overview` no longer presuppose a "phased client migration plan." The skill now describes itself as a general DS-execution skill for any `@umichkisa-ds` consumer; the current migration is just the first user.

2. **Two new worker types, selected by `.tsx`/`.jsx` predicate.** Tasks that touch `.tsx`/`.jsx` dispatch the new `ds-client-implementer` subagent (DS-aware, reads its own reference docs); other tasks dispatch the built-in `general-purpose` subagent with task text only. Same predicate also gates the review chain. Single front diamond in both graphs.

3. **`## Dispatching Workers` is the new home** for everything dispatch-related — the worker-type fork, the don't-paste-reference-docs rule, the "task text inline / Step 1 only" critical rules, and the structured re-dispatch envelope. Sits right after `## Overview` so loop graphs that reference dispatch decisions are read with the rules already in head.

4. **Re-dispatch envelope formalized.** Round counter / verbatim original task / files in scope / violations as `<file>:<line> — <rule_id> (severity) — <gloss>` / instruction. Same shape for both DS-violation and Toss BLOCK re-dispatches. Replaces the old vague "re-dispatch implementer with the findings."

5. **`## Execution context` deleted entirely.** Was 100% caller-protocol leakage: live/autonomous mode bifurcation + pointers to per-section autonomous-override blocks. The skill no longer knows what mode it's in.

6. **`## Redesign over Preserve` deleted entirely.** Lives in `ds-client-implementer`'s system prompt (per A5 §Working principles). Duplicating it in the skill creates drift — the agent owns this discipline now.

7. **All three autonomous-override blocks deleted.** PR mechanics, label names, `notes.md` paths, `next eligible lane` — pure migration-orchestration leakage. The skill stops + reports; what the caller does with the report is the caller's protocol.

8. **Hard-stop blocks rephrased.** "Stop and ask the user / wait for explicit instruction" → "Stop execution and report (header + findings + decision-space options); do not proceed." The `(a)/(b)/(c)/(d)` decision-space enumeration stays — those options are the legitimate decision contract regardless of whether a human or an autonomous protocol acts on them.

9. **Zero reference-doc names in the file.** No `DS_CLIENT_USAGE.md`, no `USAGE.md`, no `DESIGN.md`, no `COMPONENT.md`. Which docs the implementer or reviewer reads is the agent's identity, not the orchestrator's concern.

10. **Migration-coded language stripped throughout.** "PR body" → "task report"; "phase's notes.md" → deleted; "lane" → "task"; "plan's session-end checklist" → deleted; "task's `**Files:**` section" → "caller-provided file list"; "mode tag" → just `[TDD]`/`[NO-TDD]`. **NO-TDD becomes the explicit default** when no execution mode is declared.

---

## Open questions

Items that need a human call before C3 applies the diff. None block A7; all could be resolved at C3 review time.

1. **`implementer-template.md` removal at C3.** A5 says the template gets retired once the subagent path is canonical. Confirm at C3: delete the template file in the same commit that applies this diff, or keep as a transition-only artifact for one more cycle?

2. **`test-writer-template.md` location.** A5 keeps test-writer as a template; the skill still references it as `test-writer-template.md` in the same directory. Confirm the template stays at its current path post-C3 (no renaming to e.g. `test-writer-dispatch.md`).

3. **`ds-client-review` agent's own reference-doc rename.** This A6 diff drops every doc name from SKILL.md, but the `ds-client-review` agent itself reads `docs/DS_CLIENT_USAGE.md` today. When USAGE.md ships in C3, the agent's own internal reference must also rename. Out of A6 scope, but worth flagging on the C3 checklist so it doesn't fall through.

4. **`final-review` skill name (`vercel-react-best-practices`).** The `## Final Review` section invokes a skill that is itself project-specific in flavor (Vercel + React). For external KISA-DS consumers using a non-React stack (none today, but post-Phase-D possible), this hard-codes a stack assumption. Defer until a non-React consumer actually appears.

5. **Decision-space option (d) in `## DS Client Review` references `ds-fix-during-migration`.** That skill name has "migration" in it. If `ds-fix-during-migration` later renames (e.g., to `ds-gap-fix`), update the option text. Tracking item, not a blocker.

6. **Graph node naming.** `BLOCKED (DS)?` vs `BLOCKED (gen)?` carry the dispatch-path qualifier in the diamond label. Functional but a touch ugly. Alternative: rely on graph topology and use a single `BLOCKED?` node that branches based on which dispatch fed it. Punt to a graph-aesthetics review at C3.

---

## Migration path / when this lands

| Phase | What happens to SKILL.md |
|---|---|
| **A (now → A7 approval)** | Diff drafted in this doc only. SKILL.md untouched. Active client migration runs unchanged on the existing template. |
| **B (prototype)** | Phase B authors `.claude/agents/ds-client-implementer.md` and validates on the Icons rule cluster. SKILL.md still untouched — Phase B dispatches the new agent via a manual Task call to validate behavior in isolation. |
| **C3 (rollout)** | This diff is applied to SKILL.md. `implementer-template.md` is removed in the same commit (per Open Question 1, pending confirmation). Active migration switches to the new dispatch path on the next lane. |

If Phase B reveals the new agent isn't ready, C3 doesn't apply — the existing template path stays live and migration is unaffected.
