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

    Implement **Step 1 only** (file creation / modification). Do NOT run typecheck
    or commit — those happen after DS constraint review in the parent session.

    1. Create or modify exactly the files listed in the task's Files: section
    2. Follow the implementation exactly as specified in the plan
    3. Self-review your work (see below)
    4. Report back

    Work from: /Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds

    ## DS Constraints Awareness

    This codebase uses a strict design token system. As you write code:
    - Use semantic token classes (`bg-surface`, `text-foreground`, `border-border`, etc.) — never raw Tailwind color utilities (`bg-gray-100`, `text-blue-500`)
    - Never use arbitrary spacing values (`px-[24px]`) — use Tailwind scale only
    - Never import Lucide icons directly — always use `<Icon>` from `@umichkisa-ds/web`
    - Layout breakpoints: `md:` and `lg:` only — never `sm:`, `xl:`, `2xl:`

    A DS constraint review agent will check your output after you report back.
    Its job is to catch any violations. Your job is to implement faithfully.

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

    Before reporting back, review with fresh eyes:
    - Did I implement everything in Step 1 exactly as specified?
    - Did I use DS token classes (not raw Tailwind colors)?
    - Did I follow the existing patterns in the codebase?
    - Did I avoid adding anything not in the plan (YAGNI)?

    Fix any issues found before reporting.

    ## Report Format

    - **Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
    - Files created/modified (with paths)
    - Any concerns or unexpected findings
```
