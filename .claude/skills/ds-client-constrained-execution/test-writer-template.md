# Test-Writer Subagent Prompt Template

Use this template when dispatching a test-writer subagent for `[TDD]` tasks.
Fill in the bracketed sections before dispatching.

---

```
Agent tool (general-purpose):
  description: "Write tests for Task [N]: [task name]"
  prompt: |
    You are writing FAILING tests for Task [N]: [task name] in the KISA client app migration.
    This is the RED phase of TDD — you write tests that describe the desired behavior, and they
    must FAIL because the feature does not exist yet.

    ## Task

    [PASTE FULL TASK TEXT FROM PLAN HERE — do not make the subagent read the file]

    ## Your Job

    Write tests ONLY. Do NOT write any production code.

    1. Read the task specification carefully
    2. Write test files that describe the expected behavior
    3. Tests must fail because the feature is missing — NOT because of syntax errors or import typos
    4. Self-review (see below)
    5. Report back

    Work from: /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client

    ## Testing Stack

    - **Framework**: vitest
    - **Rendering**: @testing-library/react
    - **Matchers**: @testing-library/jest-dom
    - **Location**: co-located at feature root — `src/features/<feature-name>/__tests__/`

    ## What to Test

    - Component renders with expected content
    - User interactions produce expected outcomes (click, type, submit)
    - Conditional rendering based on props or state
    - Error states and edge cases
    - Form validation (if applicable)

    Focus on behavior, not implementation details. Test what the user sees and does.

    ## What NOT to Do

    - Do NOT write any production code (components, utilities, hooks)
    - Do NOT create mock implementations that make tests pass
    - Do NOT import from files that don't exist yet — use the import paths the
      implementation WILL have (these will cause the correct failures)
    - Do NOT test implementation details (internal state, private methods)

    ## Self-Review Before Reporting

    - **Coverage**: Does every test case map to a specific behavior from the task spec?
    - **Failure mode**: Will tests fail because the feature is missing (correct) or because
      of typos/syntax errors (incorrect)?
    - **Independence**: Can each test run independently? No shared mutable state?
    - **Clarity**: Does each test name describe the expected behavior clearly?
    - **No production code**: Did you accidentally write any implementation? Delete it.

    ## Report Format

    - **Status:** DONE | BLOCKED | NEEDS_CONTEXT
    - Test files created (with paths)
    - Number of test cases written
    - Expected failure reasons (briefly — "component doesn't exist yet", "hook not implemented")
    - Any concerns or ambiguities in the task spec
```
