---
name: review-docs-app-ui
description: Use when reviewing a docs app page for UI, styling, content, and DS constraint issues — audits desktop (1280px) and mobile (375px) viewports, records findings, and produces a per-page fix plan.
---

# Review Docs App UI

Reviews one docs page across both viewports. Produces a findings entry and a fix plan. No fixes during review.

## Invocation

Accepts a page path as argument: `/review-docs-app-ui /foundation/colors/overview`

If no argument (including when user says "pick up the task"):

0. **Check for Chrome extension.** Try to access `mcp__claude-in-chrome__tabs_context_mcp`. If the Chrome MCP tools are unavailable, **stop immediately** and warn:
   > Chrome extension is not connected. Please restart with `claude --chrome` and try again.
   Do NOT proceed to any later steps.
1. Read `docs/TODO.md` § Docs App UI Review
2. Find the first batch that has any unchecked items (review or fix)
3. List all unchecked tasks in that batch and present them:
   > **Batch N — [label]**
   > Available tasks:
   > 1. Review `/foundation/colors/overview`
   > 2. Review `/foundation/colors/primitives`
   > 3. Fix `/foundation/colors/tokens` (fix plan at `docs/plans/review-fix-colors-tokens.md`)
   >
   > Which page would you like to work on?
4. **Wait for user to pick.** Do not proceed until the user chooses.
5. If the user picks a **review** task → continue to Pre-flight below
6. If the user picks a **fix** task → invoke `ds-constrained-execution` with the fix plan instead

## Pre-flight

1. Read `docs/DS_CONSTRAINTS.md`
2. Read the page source file (e.g., `apps/docs/app/foundation/colors/overview/page.tsx`)
3. Ensure `docs/reviews/docs-app-review.md` exists — create with header if not
4. Ensure `docs/reviews/screenshots/` directory exists

## Step 1: Desktop Review (1280px)

1. Set browser to **1280px** width
2. Navigate to `https://vnw20xbg-3000.asse.devtunnels.ms<page-path>` (e.g., `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/colors/overview`)
3. Screenshot the full page — scroll top to bottom, capture each viewport
4. Run three review passes on each screenshot, **one by one** with the user:

### Pass A: DS Constraint Check (`ds-violation`)

Compare the page against `docs/DS_CONSTRAINTS.md` (already read in pre-flight). Check:
- Token usage (colors, spacing, typography) — no raw values
- Component patterns — correct CVA usage, proper Radix primitives
- Spacing grid compliance
- Border radius, shadow, and elevation rules
- Any rule in DS_CONSTRAINTS that applies to this page

Any violation is automatically **>= major**.

### Pass B: UI/UX Review (`layout`, `styling`, `ux`, `accessibility`)

Invoke `ui-ux-pro-max` in **review** mode with the screenshot. Focus on:
- Layout issues — alignment, overflow, grid problems, visual hierarchy
- Styling issues — inconsistent colors, fonts, spacing, borders
- UX issues — confusing interactions, poor navigation, missing affordances
- Accessibility — contrast, alt text, keyboard nav, focus indicators

### Pass C: Content Review (`content`)

Read the page source and rendered text. Check:
- Typos, grammatical errors
- Unclear or misleading explanations
- Missing information that a developer would need
- Incorrect code examples or prop descriptions

5. For each finding, capture:
   - Severity: `critical`, `major`, `minor`
   - Type: `layout`, `styling`, `ds-violation`, `content`, `ux`, `accessibility`, `responsive`
   - Viewport: `desktop`
   - Description
   - Screenshot saved to `docs/reviews/screenshots/<page-slug>-<n>.png`

_No checkpoint here — proceed directly to Step 2._

## Step 2: Mobile Review (375px)

1. Resize browser to **375px** width
2. Screenshot the full page at mobile
3. Run the same three passes (A, B, C) at mobile width
4. Tag findings as `mobile` (or update existing to `both` if same issue)
5. Pay special attention to `responsive` type — things that work at 1280px but break at 375px

_No checkpoint here — proceed directly to Step 3._

## Step 3: Record & Discuss Findings

1. Present a concise summary of all findings to the user (table format).
2. **Immediately invoke `grill-me`** to discuss findings one by one. The user may also add manual findings from their own review during this session.
3. After grill-me resolves all findings, record the **final** (post-discussion) findings to `docs/reviews/docs-app-review.md`:

```markdown
## <page-path>

| # | Severity | Type | Viewport | Finding | Screenshot |
|---|----------|------|----------|---------|------------|
| 1 | major | ds-violation | desktop | ... | [screenshot](screenshots/<slug>-1.png) |

**Notes:** (optional — include dropped findings and reasons)
```

If zero findings remain after discussion, skip to Step 5.

## Step 4: Write Fix Plan

Invoke `superpowers:writing-plans`.

- Output: `docs/plans/review-fix-<page-slug>.md`
- One phase per viewport if findings differ, otherwise single phase
- Each task maps to one finding from the review table
- Reference the finding number (e.g., "Fix #3 from review")

> **Checkpoint:** Fix plan saved at `docs/plans/review-fix-<page-slug>.md`.
> Ready to update TODO and hand off. Go ahead?

## Step 5: Update TODO

- Check off `- [ ] Review <page-path>` in `docs/TODO.md`
- If zero findings, also check off `- [ ] Fix <page-path>`

## Step 6: Handoff

Present:

> Review complete for `<page-path>`.
>
> **Findings:** N issues (X critical, Y major, Z minor)
> **Fix plan:** `docs/plans/review-fix-<page-slug>.md`
>
> How would you like to proceed?
> **(a)** Continue in this session — create a worktree, then implement fixes
> **(b)** Fresh session — copy-paste this prompt:
> ```
> Pick up fix task for <page-path>. Read docs/plans/review-fix-<page-slug>.md and docs/DS_CONSTRAINTS.md, then invoke superpowers:using-git-worktrees to create a worktree, then invoke ds-constrained-execution to implement the fix plan.
> ```

When the user picks **(a)**: invoke `superpowers:using-git-worktrees` first, then invoke `ds-constrained-execution` with the fix plan inside the worktree. After fixes are complete, **do NOT merge automatically** — present the diff and ask the user for confirmation before merging the worktree branch.

If zero findings:

> Review complete for `<page-path>`. No issues found. Both review and fix tasks checked off in TODO.

## Reference

- **Docs app URL:** `https://vnw20xbg-3000.asse.devtunnels.ms` (VSCode tunnel localhost)
- Spec: `docs/specs/review-docs-app-ui-skill-design.md`
- Constraints: `docs/DS_CONSTRAINTS.md`
- Findings: `docs/reviews/docs-app-review.md`
- Screenshots: `docs/reviews/screenshots/`
- Fix plans: `docs/plans/review-fix-<page-slug>.md`
