# Fix Plan: /foundation/colors/tokens

Source: `docs/reviews/docs-app-review.md` § `/foundation/colors/tokens`
Target: `apps/docs/app/foundation/colors/tokens/page.tsx`

---

## Phase 1 — Page-level fixes (single file)

All fixes target `apps/docs/app/foundation/colors/tokens/page.tsx`.

### Task 1: Change h3 → h2 (Fix #2 from review)

Change all 8 `<h3>` section headings to `<h2>`. Update className from `type-h3` to `type-h2`.

Headings to change:
- "Brand" (line 19)
- "Understanding -subtle and -muted" (line 83)
- "Surface" (line 122)
- "Border" (line 179)
- "Text" (line 211)
- "Feedback" (line 265)
- "Interactive" (line 353)
- "Overlay" (line 448)

### Task 2: Replace blockquotes with Alert (Fix #1 from review)

Replace all 3 `<blockquote>` elements with `<Alert>` from `@umichkisa-ds/web`.

Add import: `import { Alert } from '@umichkisa-ds/web'`

1. **Surface section "Note on naming"** (line ~157) — **Remove entirely** (Fix #3, redundant with "Understanding -subtle and -muted" section above).

2. **Feedback section "On info and link"** (line ~337) → `<Alert variant="info" title="On --color-info and --color-link">` with the existing content as children.

3. **Interactive section "Interim — Neutral interactive states"** (line ~434) → `<Alert variant="info" title="Interim — Neutral interactive states">` with the existing content as children.

### Task 3: Fix focus ring code comment (Fix #4 from review)

In the Interactive section's `<CodeBlock>` (line ~418):

1. Change the CSS comment from `/* Applied to every interactive element */` to `/* Applied to buttons and clickable elements */`
2. After the existing explanation paragraph (line ~431), add a new paragraph:

```tsx
<p className="type-body mb-4 text-foreground max-w-prose">
  <strong className="!font-semibold text-foreground">Exception — Form controls:</strong>{' '}
  Inputs, textareas, selects, and toggle controls use a simpler focus pattern:{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">outline: none</code>{' '}
  +{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-color: var(--color-brand-primary)</code>.
  The border color change is sufficient for elements that already have a visible border.
</p>
```

### Task 4: Replace remaining brand section blockquote with Alert

The "On brand-primary vs brand-accent" and "On brand-primary-mid" paragraphs (lines ~67-78) are `<p>` tags with `<strong>` labels, not blockquotes. These are fine as-is — no change needed.

**Wait** — re-check: are there only 3 blockquotes? Confirm before executing.

---

## Verification

After all tasks:
1. `pnpm build` — must pass
2. `pnpm typecheck` — must pass
3. Visual check: confirm Alert components render correctly on the page
