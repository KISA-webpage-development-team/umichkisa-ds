# Follow-up Session: Layout Implementation

## Context

The layout documentation has been written across three sub-pages:

- `apps/docs/content/foundation/layout/overview.mdx`
- `apps/docs/content/foundation/layout/breakpoints.mdx`
- `apps/docs/content/foundation/layout/spacing.mdx`
- `apps/docs/content/foundation/layout/usage.mdx` ← placeholder, awaiting components

All prose and visual components in the MDX are complete. This follow-up
session is specifically about implementing the layout tokens and components
that make the documented rules enforceable in code.

---

## Decisions Made (Do Not Revisit)

- **KISA is web-first.** Primary design target is desktop. Mobile is supported, not prioritized.
- **Three breakpoints only:** default (< 768px), `md:` (≥ 768px), `lg:` (≥ 1024px). Avoid `sm:`, `xl:`, `2xl:`.
- **Spacing scale:** Tailwind's built-in scale only. No arbitrary values (`px-[24px]` etc.) anywhere.
- **Default inset:** `px-4` (mobile) / `px-10` (tablet) / `px-16` (desktop). Applies to page shell, cards, panels — anything needing standard horizontal breathing room.
- **Max-width:** `max-w-screen-2xl` (1536px), always centered with `mx-auto`.
- **Column gutter:** `gap-2` (8px) always, consistent across all breakpoints.

---

## What Needs to Be Implemented

### 1. `Container` component

**Location:** `packages/web/src/components/Container.tsx`

Encodes max-width + centering + default inset. Replaces manual class strings like
`mx-auto w-full max-w-screen-2xl px-4 md:px-10 lg:px-16`.

```tsx
// Expected API
<Container>
  {/* page content */}
</Container>

// Optional left-aligned variant (for future use — defer if not immediately needed)
<Container align="left">...</Container>
```

Tailwind classes to encode:
```
mx-auto w-full max-w-screen-2xl px-4 md:px-10 lg:px-16
```

---

### 2. `Grid` component

**Location:** `packages/web/src/components/Grid.tsx`

Encodes the column gutter (`gap-2`) and responsive column breakdown.
Column count is passed as a prop; gutter is always fixed.

```tsx
// Expected API
<Grid cols={3}>
  <Card />
  <Card />
  <Card />
</Grid>
```

The component should map `cols` to responsive Tailwind grid classes:
- `cols={1}` → `grid grid-cols-1 gap-2`
- `cols={2}` → `grid grid-cols-1 md:grid-cols-2 gap-2`
- `cols={3}` → `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2`
- `cols={4}` → `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`

Gutter (`gap-2`) must never be overridable by the consumer.

---

### 3. Update `usage.mdx` after components are done

**File:** `apps/docs/content/foundation/layout/usage.mdx`

Replace the "Coming soon" placeholder with real usage examples for
`Container` and `Grid`. Show import, basic usage, and any prop options.

---

## Files to Touch — Summary

| File | Change |
|---|---|
| `packages/web/src/components/Container.tsx` | New component — max-width + inset |
| `packages/web/src/components/Grid.tsx` | New component — responsive columns + fixed gutter |
| `packages/web/src/index.ts` | Export `Container` and `Grid` |
| `apps/docs/content/foundation/layout/usage.mdx` | Replace placeholder with real usage docs |

---

## After Implementation

Run the docs dev server and verify:
- `Container` correctly applies `max-w-screen-2xl` and the three-tier inset
- `Grid cols={3}` renders 1 column on mobile, 2 on tablet, 3 on desktop
- Gutter is visually 8px at all breakpoints
- Usage page on `/foundation/layout/usage` renders correctly with live examples

Then rebuild the design system package:
```bash
pnpm --filter @umichkisa-ds/web build
```
