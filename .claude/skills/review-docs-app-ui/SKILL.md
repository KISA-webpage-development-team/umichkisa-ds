---
name: review-docs-app-ui
description: Use when reviewing a docs app page for UI, styling, content, and DS constraint issues — audits desktop (1280px) and mobile (375px) viewports, records findings, and produces a per-page fix plan.
---

# Review Docs App UI

Reviews one docs page across both viewports. Produces a findings entry and a fix plan. No fixes during review.

## Invocation

Accepts a page path as argument: `/review-docs-app-ui /foundation/colors/overview`

If no argument (including when user says "pick up the task"):

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
2. Navigate to the page via the tunnel URL
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

> **Checkpoint:** Desktop review complete. [N findings so far.]
> Ready to proceed to mobile review. Go ahead?

## Step 2: Mobile Review (375px)

1. Resize browser to **375px** width
2. Screenshot the full page at mobile
3. Run the same three passes (A, B, C) at mobile width
4. Tag findings as `mobile` (or update existing to `both` if same issue)
5. Pay special attention to `responsive` type — things that work at 1280px but break at 375px

> **Checkpoint:** Mobile review complete. [N total findings.]
> Ready to record findings. Go ahead?

## Step 3: Record Findings

Append a new section to `docs/reviews/docs-app-review.md`:

```markdown
## <page-path>

| # | Severity | Type | Viewport | Finding | Screenshot |
|---|----------|------|----------|---------|------------|
| 1 | major | ds-violation | desktop | ... | [screenshot](screenshots/<slug>-1.png) |

**Notes:** (optional)
```

If zero findings, skip to Step 5.

> **Checkpoint:** Findings recorded in docs/reviews/docs-app-review.md.
> Ready to write fix plan. Go ahead?

## Step 4: Write Fix Plan

Invoke `superpowers:writing-plans`.

- Output: `docs/plans/review-fix-<page-slug>.md`
- One phase per viewport if findings differ, otherwise single phase
- Each task maps to one finding from the review table
- Reference the finding number (e.g., "Fix #3 from review")

> **Checkpoint:** Fix plan saved at `docs/plans/review-fix-<page-slug>.md`.

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
> **(a)** Continue in this session — invoke `ds-constrained-execution` to implement fixes
> **(b)** Fresh session — copy-paste this prompt:
> ```
> Pick up fix task for <page-path>. Read docs/plans/review-fix-<page-slug>.md and docs/DS_CONSTRAINTS.md, then invoke ds-constrained-execution to implement the fix plan.
> ```

If zero findings:

> Review complete for `<page-path>`. No issues found. Both review and fix tasks checked off in TODO.

## Reference

- Spec: `docs/specs/review-docs-app-ui-skill-design.md`
- Constraints: `docs/DS_CONSTRAINTS.md`
- Findings: `docs/reviews/docs-app-review.md`
- Screenshots: `docs/reviews/screenshots/`
- Fix plans: `docs/plans/review-fix-<page-slug>.md`
