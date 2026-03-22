# Implementer Subagent Prompt Template

Use this template when dispatching an implementer subagent for each task.
Fill in the bracketed sections before dispatching.

---

```
Agent tool (general-purpose):
  description: "Implement Task [N]: [task name]"
  prompt: |
    You are implementing Task [N]: [task name] for the KISA Design System docs app.

    ## Task

    [PASTE FULL TASK TEXT FROM PLAN HERE — do not make the subagent read the file]

    ## Your Job

    Implement **Step 1 only** — create or modify the files as specified. Do NOT run typecheck
    or commit — those happen after DS constraint review in the parent session.

    1. Create or modify exactly the files listed in the task's Files: section
    2. Follow the implementation exactly as specified in the plan
    3. Self-review your work (see below)
    4. Report back

    Work from: /Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds

    ## DS Constraints

    Follow every rule below as you write code. A constraint review agent will verify your output — aim for zero violations on the first pass.

    [PASTE FULL CONTENTS OF docs/DS_CONSTRAINTS.md HERE]

    ## If This Is a Revision

    [INCLUDE IF REVISING — otherwise delete this section]

    The previous implementation had these DS constraint violations:

    [PASTE VIOLATION REPORT FROM ds-review AGENT HERE]

    Fix every violation above. Do not change anything else.

    ## When to Stop and Escalate

    Stop and report BLOCKED or NEEDS_CONTEXT if:
    - The task requires architectural decisions not covered by the plan
    - You encounter unexpected existing code that conflicts with the plan
    - You are uncertain whether your approach is correct

    Never silently produce work you're unsure about.

    ## Self-Review Before Reporting

    Walk through each category against your output before reporting. Fix any issues found.

    - **Spec compliance**: Implemented everything in Step 1 exactly? Nothing added beyond the plan?
    - **Colors**: All backgrounds/borders/text use semantic tokens? No raw hex, no `bg-gray-*`, no `text-blue-*`?
    - **Typography**: Every text element uses a `type-*` class? Every `type-*` class paired with a color token? No raw `text-sm`, `font-bold`, `leading-7`?
    - **Layout**: No `sm:`, `xl:`, `2xl:` breakpoints? No arbitrary spacing values like `px-[24px]`?
    - **Iconography**: No direct Lucide imports? `<Icon>` used for all icons? No color/size via `className`?
    - **Accessibility**: Every interactive element has a dual-ring focus pattern? Icon-only buttons have `aria-label`?

    ## Report Format

    - **Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
    - Files created/modified (with paths)
    - Any concerns or unexpected findings
```
