# Fix Plan: /foundation/layout/breakpoints

_Source: review findings in `docs/reviews/docs-app-review.md` § /foundation/layout/breakpoints_

---

## Phase 1 — Content fix (single task)

### Task 1: Rewrite misleading paragraph (Fix #1)

**File:** `apps/docs/app/foundation/layout/breakpoints/page.tsx` (lines 57-62)

**Current text:**
> The desktop tier is where layout decisions are made first. `md:` and `lg:` are then used to ensure the layout holds at smaller sizes — not the other way around.

**Problem:** In Tailwind's mobile-first system, `md:` and `lg:` apply at *larger* viewports, not smaller. The paragraph conflates design priority (desktop-first) with CSS application direction (mobile-first).

**Fix:** Rewrite to clearly separate the two concepts. Suggested replacement:
> Design decisions start at the desktop tier. In code, default styles target mobile, and `md:` / `lg:` prefixes layer adjustments as the viewport grows.

**Verify:** `pnpm build && pnpm typecheck` must pass.
