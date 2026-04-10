# Fix Plan: /forms/examples

**Source:** `docs/reviews/docs-app-review.md` § /forms/examples
**Files:** `apps/docs/app/forms/examples/page.tsx`, `apps/docs/app/forms/examples/_demos.tsx`

---

## Phase 1 — Single phase (both viewports)

### Task 1: Remove intro sub-paragraph (Fix #1)

**File:** `apps/docs/app/forms/examples/page.tsx`

Delete the `<p>` block (lines 229-232) below the H1. The H1 "Examples" is self-explanatory.

### Task 2: Replace `alert()` with `toast()` in demos (Fix #2)

**File:** `apps/docs/app/forms/examples/_demos.tsx`

1. Import `Toaster` and `toast` from `@umichkisa-ds/web`
2. Replace all four `alert(...)` calls with `toast(...)`:
   - `LoginDemo` (line 29): `alert(\`Logged in as ...\`)` → `toast(\`Logged in as ...\`)`
   - `ProfileDemo` (line 79): `alert(\`Saved profile for ...\`)` → `toast(\`Saved profile for ...\`)`
   - `FeedbackDemo` (line 136): `alert(\`Feedback sent about ...\`)` → `toast(\`Feedback sent about ...\`)`
   - `HooksLoginDemo` (line 219): `alert(\`Logged in as ...\`)` → `toast(\`Logged in as ...\`)`
3. Add `<Toaster />` inside each demo component (or wrap at page level — see Task 3)

### Task 3: Add `Toaster` provider to page (Fix #2)

**File:** `apps/docs/app/forms/examples/page.tsx`

Option A (preferred): Add a client wrapper component that renders `<Toaster />` once, imported into the page. This avoids duplicating `<Toaster />` in each demo.

Option B: Import and mount `<Toaster />` directly in `page.tsx` if the page can accommodate a client boundary at that level (it's an async server component, so a small client `ToasterMount` component is cleaner).

### Task 4: Update code strings to match demos (Fix #2)

**File:** `apps/docs/app/forms/examples/page.tsx`

Update all four code strings (`loginCode`, `profileCode`, `feedbackCode`, `hooksCode`) to use `toast()` instead of `alert()` / `console.log()`:
- Add `import { toast } from '@umichkisa-ds/web'` to each code string's import section
- Replace `alert(...)` → `toast(...)` and `console.log(data)` → `toast(...)` in each code string
