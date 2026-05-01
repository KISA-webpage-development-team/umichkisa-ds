---
name: pastiche
description: Use when implementing a frontend task in a project that has Pastiche set up (FACT.md, KNOWLEDGE.md, WISDOM.md under `pastiche/`). The task should produce code that faithfully follows the project's design system.
---

# Pastiche

Executes a frontend task with design-system fidelity by orchestrating three subagents — `pastiche-implementer-round1`, `pastiche-reviewer`, `pastiche-implementer-round2` — in a bounded loop, then consolidates their work into a single task report.

## Preflight

Verify all three docs exist at the project root:

```bash
ls pastiche/FACT.md pastiche/KNOWLEDGE.md pastiche/WISDOM.md
```

If any are missing, stop and report:

> This project does not appear to have pastiche set up — expected `pastiche/{FACT,KNOWLEDGE,WISDOM}.md`.

## Workflow

You are dispatched with a free-form task description. Pass it through verbatim where the agents need it.

1. **Round 1.** Dispatch `pastiche-implementer-round1` with the task. Capture its report (Files changed, Implementation summary, optional KNOWLEDGE gaps encountered).
2. **Review.** Dispatch `pastiche-reviewer` with the task and the round-1 report. Capture its report; locate the `## Doubts` block and parse the YAML inside.
   - If the YAML is malformed (not a parseable list of `{file, line, comment}` maps, or the literal `[]`), stop and report the failure. Do not retry.
3. **Branch on doubts.**
   - **Empty (`[]`)** — skip to step 5.
   - **Non-empty** — continue to step 4.
4. **Round 2.** Dispatch `pastiche-implementer-round2` with the task and the doubts YAML block. Capture its report (Files changed, Implementation summary, Doubts — resolved, optional Doubts — unresolved).
5. **Failsafe.** For each doubt in the reviewer's list whose `file:line` is **not** present in round 2's "Doubts — resolved" section (silently dropped or listed under "unresolved"): Read the file, then Edit it to insert a comment above the targeted `line` using the file's appropriate comment syntax, matching the surrounding indentation:

   ```
   // pastiche-unresolved-doubt: <comment from reviewer>
   ```

6. **Emit the final response** in the shape below.

## Final response

```
## Summary
- **Files created:** <paths> (omit row if none)
- **Files modified:** <paths> (omit row if none)
- **Implementation:** <2–3 sentences describing what was done>

## Follow-ups
_Items that need human attention — typically a DS-docs gap (KNOWLEDGE.md or WISDOM.md candidate)._

- <file:line> — <one-line description>
- ... (omit section if none)
```

Combine round 1 and round 2's "Files changed" lists. The implementation sentences describe the end result, not the rounds. Follow-up items include any `defended (knowledge-gap)` from round 2 and any inline failsafe comments written in step 5.
