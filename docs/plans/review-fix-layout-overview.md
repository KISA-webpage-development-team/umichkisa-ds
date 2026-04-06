# Fix Plan: /foundation/layout/overview

_Source: docs/reviews/docs-app-review.md § /foundation/layout/overview_

## Phase 1 — Page fixes

### Task 1: Add hover:text-brand-primary to links (Fix #1)
**File:** `apps/docs/app/foundation/layout/overview/page.tsx`
Change all three links in the "In this section" list from:
```
className="text-link underline-offset-2 hover:underline"
```
to:
```
className="text-link underline-offset-2 hover:underline hover:text-brand-primary"
```

### Task 2: Update Usage link description (Fix #2)
**File:** `apps/docs/app/foundation/layout/overview/page.tsx`
Change the Usage list item text from:
```
— ready-made layout components (Container, Grid) — coming once components are built
```
to:
```
— ready-made layout components (Container, Grid) and when to use them
```

### Task 3: Remove redundant closing paragraph (Fix #3)
**File:** `apps/docs/app/foundation/layout/overview/page.tsx`
Delete the final `<p>` (lines 112–115):
```
These are implementation requirements for the page shell, not component-level concerns. They are configured once and apply globally.
```

## Phase 2 — DS rule change (Bonus B1)

### Task 4: Update DS_CONSTRAINTS.md link rule
**File:** `docs/DS_CONSTRAINTS.md`
Change the link rules from:
```
Must: Underline links by default (`underline`). Hover state: `text-brand-primary`. No separate visited style.
```
to:
```
Must: Underline links on hover (`hover:underline`). Hover state: `hover:text-brand-primary`. No separate visited style.
```

### Task 5: Update typography/usage page
**File:** `apps/docs/app/foundation/typography/usage/page.tsx`
Change the decoration bullet from:
```
Decoration: underline by default (underline)
```
to:
```
Decoration: underline on hover (hover:underline)
```
