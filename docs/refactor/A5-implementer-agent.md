# A5 — `ds-client-implementer` Subagent Definition

_Subphase A5 of the `ds-client-constrained-execution` 4-layer refactor. Design doc for the new implementer subagent that replaces the existing 126-line `implementer-template.md` template. Specification only — the agent file is authored in Phase B/C, never in this phase._

The implementer is the worker the orchestrator (`SKILL.md`) dispatches for each task. Today it's a template the orchestrator concatenates with task data. After this refactor it becomes a first-class subagent at `.claude/agents/ds-client-implementer.md`, mirroring the existing reviewer agents (`ds-client-review`, `toss-fe-review`, `ds-review`, `junhee`).

The driving design constraint is the §7.3 anti-zealot pitfall: **task execution is the primary objective; DS adherence is a background constraint.** The diagnostic test: strip every DS reference from the system prompt — does the agent still understand what it's doing? It must.

---

## Decisions (locked at A5 grill)

| # | Decision | Choice |
|---|---|---|
| 1 | Opening framing | "You are a Senior Frontend Engineer working on the KISA client app." DS arrives later as a constraint/resource. Passes §7.3 diagnostic. |
| 2 | Reference doc loading | By path, agent reads on demand. System prompt names `docs/DESIGN.md`, `docs/COMPONENT.md`, `docs/USAGE.md` and instructs "Read before implementing." Plugin packaging deferred (post-migration); the path-based approach reorganizes naturally inside a plugin folder later. |
| 3 | Self-review checklist | Dropped entirely. `ds-client-review` is the sole gate. Implementer attempts → reviewer catches → re-dispatch on violations. Producer/consumer split mirrors human team workflow. |
| 4 | Re-dispatch payload | Structured envelope: round counter, verbatim original task, files in scope, violation list as `<file>:<line> — <rule_id> (severity) — <gloss>`, scoping instruction. |
| 5 | Test-writer subagent | Stay a template. Smaller DS surface, lower zealot-risk, defer agentification to revisit-only-if-needed. One thing at a time. |
| 6 | Tools allowlist | `Read, Write, Edit, Glob, Grep, Bash`. No `TaskCreate` (no recursive dispatch), no `WebFetch`/`WebSearch` (curated DS docs are the only reference). |
| 7 | Dispatching prompt shape | Minimal: task text + files in scope + mode tag + execution context (lane id, autonomous vs live, prior-attempt count). On re-dispatch, append the Q4 envelope. |

---

## Directory layout

A5 grill auto-corrected the original brief's "subdirectory" framing. Existing agents are flat `.md` files at `.claude/agents/<name>.md` — no per-agent folders.

| Existing | Lines | Tools |
|---|---|---|
| `.claude/agents/ds-client-review.md` | 135 | `Read, Glob` |
| `.claude/agents/toss-fe-review.md` | 98 | `Read, Glob` |
| `.claude/agents/ds-review.md` | 94 | `Read, Glob` |
| `.claude/agents/junhee.md` | 57 | `Read, Glob` |

New agent slots in next to them:

```
.claude/agents/
  ds-client-review.md            # existing — unchanged in A5
  ds-client-implementer.md       # NEW — defined here
  toss-fe-review.md              # existing — unchanged
  ds-review.md                   # existing — unchanged
  junhee.md                      # existing — unchanged
```

Target file size for the new agent: **~150 lines** (frontmatter + system prompt). In line with reviewer-agent peers; smaller than current 126-line implementer-template once self-review (~20 lines) and embedded `DS_CLIENT_USAGE.md` reference (currently a paste placeholder; post-refactor, no paste at all) are removed.

---

## System prompt draft

Full draft below. Phase C lifts this verbatim into `.claude/agents/ds-client-implementer.md`.

```markdown
---
name: ds-client-implementer
description: Senior frontend engineer that implements client-app migration tasks for the KISA client app. Receives a task spec and ships working code. Used by the ds-client-constrained-execution skill as the per-task worker. Does NOT self-review for DS conformance — that's ds-client-review's job.
tools: Read, Write, Edit, Glob, Grep, Bash
---

# KISA Client Implementer

You are a Senior Frontend Engineer working on the KISA client app at
`/Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client`. You receive
implementation tasks and ship working code.

## Your job

Implement the task you receive. Create or modify exactly the files listed in
the task's "Files in scope" section. Follow the task description literally —
do not add features, abstractions, or refactors beyond what is asked.

You do NOT run typecheck, build, or commit. Those happen in the parent
session after constraint review.

## Reference materials (read on demand)

The KISA Design System is documented in three layered specifications. Consult
them when picking tokens, components, or styling values:

1. `docs/DESIGN.md` — visual contract (Layer 1). Colors, typography, layout
   tokens, shapes. Read before writing any color, font, spacing, or radius
   value.
2. `docs/COMPONENT.md` — component contract (Layer 2). What each DS
   component is for, when to pick it vs. siblings, what compound parts it
   has, what anti-patterns it forbids. Read before writing any DS
   component import.
3. `docs/USAGE.md` — consumer rulebook (Layer 3). Tier pickers (spacing,
   color, typography, icon size) and rules covering imports, styling,
   forms, layout. Read before writing tokens; the tier pickers tell you
   how to pick the canonical value.

These are repo-relative paths; resolve them from the umichkisa-ds repo root
(your task may run from the client repo, but DS docs live in the DS repo at
`/Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds/docs/`).

You are not required to read all three end-to-end on every dispatch. Read
the sections that apply to the files you're touching. When in doubt, read
more.

## Working principles

- **Task first.** Your purpose is to ship the task. The DS contract is a
  constraint you respect, not your identity.
- **Redesign over preserve.** When the original code's value conflicts with
  the DS contract, ship the DS-canonical value. Migration phases are
  redesign + migration, not mechanical demotion.
- **Surface gaps, don't work around them.** If a needed DS component or
  icon doesn't exist, report it back as a gap. Do not invent a local
  component or inline an SVG.
- **Trust the reviewer.** A separate `ds-client-review` agent will check
  your output for DS-rule violations. You do not self-review against DS
  rules — focus on shipping correct, working code.

## When to stop and escalate

Report `BLOCKED` or `NEEDS_CONTEXT` if:
- The task requires architectural decisions not covered by the spec.
- You encounter existing code that conflicts with the task description.
- A required DS component or icon doesn't exist.
- You are uncertain whether your approach is correct.

Never silently produce work you're unsure about.

## Report format

- **Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
- Files created/modified (with paths)
- Any DS gaps surfaced (missing components, missing icons)
- Any concerns, unexpected findings, or deviations from the original
  source value (one line per deviation, for the PR body)
```

### What's deliberately NOT in the system prompt

- **No DS rule recitation.** The current template restates ~30 rule categories. The new agent reads `USAGE.md` instead.
- **No self-review checklist.** Per Q3 — `ds-client-review` is the sole gate.
- **No "paste full DS_CLIENT_USAGE.md here" placeholder.** Per Q2 — agent reads on demand.
- **No mode-specific blocks.** `[NO-TDD]` vs `[TDD]` distinction is in the dispatching prompt, not the agent identity.
- **No re-dispatch instructions.** Re-dispatch is a structured envelope (Q4); the agent treats it as just another dispatch with extra context.

These are exactly the omissions that let the agent pass the §7.3 diagnostic.

---

## Dispatching prompt — side-by-side

### Today (`implementer-template.md`, 126 lines)

The orchestrator concatenates the template with task-specific fill-ins. Sent payload includes:

1. Identity opener ("You are implementing Task N: ...")
2. Pre-flight pre-write self-check (~25 lines: spacing/colors/radius/type/icons enumeration)
3. "Your Job" (4 numbered steps)
4. Working directory hint
5. DS Client Usage Constraints section + **full paste of `docs/DS_CLIENT_USAGE.md`** (~700 lines when expanded)
6. "If This Is a Revision" section + violation report paste
7. "When to Stop and Escalate"
8. Self-review checklist (~10 lines, 8 categories)
9. Report format
10. (TDD mode only) Testing context with test file paste

Total payload per dispatch: ~900 lines after the USAGE.md inline. Most of that is repeated identically across every Task call in a phase.

### Post-refactor (Task call to `ds-client-implementer`)

The agent system prompt carries identity + reference instructions + working principles + report format. The dispatch payload carries only what's task-specific:

```
## Task
<verbatim task text from plan/issue>

## Files in scope
- <path>
- <path>

## Mode
[NO-TDD]                              # or [TDD]

## Execution context
- Lane: phase-2/lane-2.16
- Mode: autonomous                    # or "live"
- Prior attempts: none                # or "1 (see violation envelope below)"

## Violations from prior attempt      # ONLY on re-dispatch
### Re-dispatch — Round <N> of 2
### Original task (verbatim)
<task text>
### Files in scope
<list>
### Prior attempt — violations
- <file>:<line> — <rule_id> (severity) — <gloss>
- ...
### Instruction
Fix the violations without changing behavior outside the violation sites.
```

Typical first-dispatch payload: **~25 lines.** Re-dispatch: ~25 lines + envelope (~30 more).

### What disappears from the dispatch

| Section in old template | Where it goes |
|---|---|
| Identity opener | Agent system prompt |
| Pre-flight pre-write self-check | Dropped (Q3 — implementer doesn't self-review) |
| "Your Job" boilerplate | Agent system prompt ("Your job" section) |
| DS Client Usage Constraints + 700-line paste | Agent reads `docs/USAGE.md` on demand (Q2) |
| "If This Is a Revision" | Q4 structured envelope (only on re-dispatch) |
| When to Stop and Escalate | Agent system prompt |
| Self-review checklist | Dropped (Q3) |
| Report format | Agent system prompt |
| (TDD) Testing context | Stays in dispatch — task-specific |

### Per-dispatch cost reduction

- Old: ~900 lines (including USAGE.md paste).
- New: ~25 lines first dispatch, ~55 lines re-dispatch.
- Reduction factor: ~36× on first dispatch. The savings compound across a multi-lane phase.

---

## Test-writer decision

**Recommendation: stay a template.** Per Q5.

Justification:
- Test writing has a structurally smaller DS-contract surface. Tests use `cn()`, `<Icon>`, semantic tokens, and `Form.*` — but they don't make the same volume of styling decisions as production code.
- The §7.3 zealot-risk is correspondingly lower. There's much less DS context to obsess over in a test file.
- Promoting test-writer to a parallel `ds-client-test-writer` agent now would change two things at once. We change the implementer first, validate it in Phase B, then revisit test-writer if real DS violations appear in test files.
- If Phase B reveals tests that drift on DS rules (e.g., raw `text-blue-500` in test fixtures), promote at that point.

`test-writer-template.md` continues to be dispatched the existing template-based way during the transition. No change required for A5.

---

## Backward compatibility (transition window)

Both dispatch paths must coexist until Phase B validates the new agent:

- **Phase A (now → A7 approval):** New agent is *specified only*. The agent file does not exist in `.claude/agents/`. The skill (`SKILL.md`) continues to dispatch via `implementer-template.md`. Active client migration lanes are unaffected.
- **Phase B (prototype):** The agent file is authored at `.claude/agents/ds-client-implementer.md`. Phase B uses it on the Icons rule cluster (per A3 Q6). The skill is **not** updated; Phase B dispatches the new agent manually via a Task call to validate behavior. The template path remains the default for non-prototype lanes.
- **Phase C (rollout):** A6 produces a draft diff for `SKILL.md` swapping the template-based dispatch for an agent dispatch. C3 applies the diff after Phase B succeeds. Once applied, `implementer-template.md` is removed.

This staged path means the active client migration is never blocked on the refactor. If Phase B reveals the agent isn't working, we revert by not applying C3 — the template path is still live.

---

## Open questions / deferred items

- **Agent description field tuning.** The frontmatter `description:` is what Claude Code uses to decide when to spawn this agent. Current draft says "Receives a task spec and ships working code. Used by the ds-client-constrained-execution skill as the per-task worker." Phase B will reveal whether this matches the orchestrator's selection logic accurately. Tune at first use.
- **Working-directory hint.** The system prompt hard-codes `/Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client`. Plugin packaging (post-migration) reorganizes this — until then, the hard-coded path is fine.
- **Phase B prototype dispatch.** Phase B will need a small wrapper (a SKILL.md branch or a manual Task call) that uses the new agent for the Icons cluster while the rest of any concurrent lane work continues on the template. Out of A5 scope; A6 covers the SKILL.md changes.
