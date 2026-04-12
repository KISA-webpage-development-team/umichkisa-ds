# Implementer Subagent Prompt Template

Use this template when dispatching an implementer subagent for each task.
Fill in the bracketed sections before dispatching.

---

## `[NO-TDD]` mode

```
Agent tool (general-purpose):
  description: "Implement Task [N]: [task name]"
  prompt: |
    You are implementing Task [N]: [task name] for the KISA client app migration.

    ## Task

    [PASTE FULL TASK TEXT FROM PLAN HERE — do not make the subagent read the file]

    ## Your Job

    Implement **Step 1 only** — create or modify the files as specified. Do NOT run typecheck
    or commit — those happen after DS client constraint review in the parent session.

    1. Create or modify exactly the files listed in the task's Files: section
    2. Follow the implementation exactly as specified in the plan
    3. Self-review your work (see below)
    4. Report back

    Work from: /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client

    ## DS Client Usage Constraints

    Follow every rule below as you write code. A constraint review agent will verify your
    output — aim for zero violations on the first pass.

    [PASTE FULL CONTENTS OF docs/DS_CLIENT_USAGE.md HERE]

    ## If This Is a Revision

    [INCLUDE IF REVISING — otherwise delete this section]

    The previous implementation had these DS client constraint violations:

    [PASTE VIOLATION REPORT FROM ds-client-review AGENT HERE]

    Fix every violation above. Do not change anything else.

    ## When to Stop and Escalate

    Stop and report BLOCKED or NEEDS_CONTEXT if:
    - The task requires architectural decisions not covered by the plan
    - You encounter unexpected existing code that conflicts with the plan
    - A DS component you need doesn't exist (collect it, don't build a workaround silently)
    - You are uncertain whether your approach is correct

    Never silently produce work you're unsure about.

    ## Self-Review Before Reporting

    Walk through each category against your output before reporting. Fix any issues found.

    - **Spec compliance**: Implemented everything in Step 1 exactly? Nothing added beyond the plan?
    - **Imports**: No `react-icons`? No direct `lucide-react`? No `@radix-ui` for DS-covered UI? No `NextUI`/`HeroUI`? No direct `react-hook-form`?
    - **Colors**: All backgrounds/borders/text use DS semantic tokens? No raw hex, no `bg-gray-*`, no `text-blue-*`?
    - **Typography**: Every text element uses a `type-*` class? Every `type-*` class paired with a color token? No raw `text-sm`, `font-bold`, `leading-7`?
    - **Layout**: No `sm:`, `xl:`, `2xl:` breakpoints? No arbitrary spacing values like `px-[24px]`? Using `Container` for page shell?
    - **Icons**: All icons use `<Icon name="...">` from `@umichkisa-ds/web`? `size` prop from 5-step scale?
    - **Forms**: Using `Form.*` compounds from `@umichkisa-ds/form`? `useForm` from `@umichkisa-ds/form`? No `useState` for form state?
    - **Class merging**: Using `cn()` from `@umichkisa-ds/web`? No raw `clsx` or string concatenation?
    - **CSS files**: No new CSS modules or `.css` files for migrated components?

    ## Report Format

    - **Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
    - Files created/modified (with paths)
    - Any concerns or unexpected findings
```

## `[TDD]` mode (GREEN phase)

Same template as above, with this addition after "## Your Job":

```
    ## Testing Context

    Tests have already been written by the test-writer subagent and are currently FAILING
    (RED phase complete). Your job is to write the **minimal production code** to make these
    tests pass. Do not add features, abstractions, or code beyond what the tests require.

    The failing tests are at:
    [PASTE TEST FILE PATH(S) HERE]

    Test contents:
    [PASTE FULL TEST FILE CONTENTS HERE]
```
