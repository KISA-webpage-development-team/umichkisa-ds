# Fix Plan: /foundation/colors/overview

Source: `docs/reviews/docs-app-review.md` § /foundation/colors/overview

## Phase 1 — Single pass (both viewports)

File: `apps/docs/app/foundation/colors/overview/page.tsx`

### Task 1: Add code comment on opacity deviation (Fix #1)

Add a comment above the 3-tier diagram `<div>` (line 44) explaining the intentional use of opacity utilities for visual hierarchy in this one-off illustration.

```
{/* Opacity utilities used intentionally here for visual hierarchy in this
    illustrative diagram. These are not reusable component patterns — the
    diagram is docs-only content where no semantic token exists for this role. */}
```

### Task 2: Replace blockquote with Alert component (Fix #2)

Replace the raw `<blockquote>` (lines 79–88) with `<Alert variant="info" title="Why OKLCH?">` from `@umichkisa-ds/web`.

- Add import: `import { Alert } from '@umichkisa-ds/web'` (or extend existing Container import)
- Replace the `<blockquote>` block with:
  ```tsx
  <Alert variant="info" title="Why OKLCH?">
    Hex values (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">#00274c</code>)
    are unreadable — you cannot tell anything about a color from the code alone.
    OKLCH is perceptually uniform, meaning a 10% increase in lightness actually looks
    10% lighter to the human eye, making the palette predictable. Reading an OKLCH value:{' '}
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(lightness% chroma hue)</code>.
  </Alert>
  ```
- Remove the `<strong>` wrapping "Why OKLCH?" (now handled by Alert's `title` prop)
- Remove the `<span className="italic ...">` wrapper (Alert provides its own text styling)

### Task 3: Remove redundant intro paragraph (Fix #3)

Delete lines 28–31 — the paragraph starting with "If you have never worked with a design system before...". The sidebar navigation is self-explanatory.
