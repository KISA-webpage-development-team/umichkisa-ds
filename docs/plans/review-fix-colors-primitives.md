# Colors Primitives Page Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 5 review findings on `/foundation/colors/primitives` — migrate shared docs components to DS primitives (Card, Grid), fix typography floor, remove redundant content, and replace blockquote with Alert.

**Architecture:** Phase 1 fixes shared components (`ColorSwatch` → Card, `ColorSwatchGrid` → Grid) which cascade to all color pages. Phase 2 fixes page-level content. Read `docs/DS_CONSTRAINTS.md` before starting.

**Tech Stack:** React, Tailwind CSS v4, Next.js 15, `@umichkisa-ds/web` (Card, Grid, Alert)

---

## Phase 1: Shared Component Migration

### Task 1: Migrate ColorSwatchGrid to DS Grid (Finding #2)

**Files:**
- Modify: `apps/docs/components/ColorSwatchGrid.tsx`

**Step 1: Read current implementation**

Current code:
```tsx
export function ColorSwatchGrid({ children }: ColorSwatchGridProps) {
  return (
    <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  )
}
```

**Step 2: Replace with DS Grid component**

```tsx
import { Grid } from '@umichkisa-ds/web'

type ColorSwatchGridProps = {
  children: React.ReactNode
}

export function ColorSwatchGrid({ children }: ColorSwatchGridProps) {
  return (
    <Grid
      columns={{ base: 2, md: 3, lg: 4 }}
      gap="element"
      className="my-6"
    >
      {children}
    </Grid>
  )
}
```

Notes:
- `gap="element"` (8px) is closest to the old `gap-3` (12px) from the DS tier system. `gap="component"` (16px) may be too wide for swatch cards — use judgment during visual check. If 8px feels too tight, use `gap="component"`.
- `my-6` vertical margin is kept as a layout concern on the wrapper.
- The prohibited `sm:` breakpoint is gone — Grid uses only `base`/`md:`/`lg:`.

**Step 3: Verify build**

Run: `pnpm build`
Expected: PASS

**Step 4: Commit**

```bash
git add apps/docs/components/ColorSwatchGrid.tsx
git commit -m "fix(docs): migrate ColorSwatchGrid to DS Grid component"
```

---

### Task 2: Migrate ColorSwatch to DS Card (Findings #1, #3, #5)

**Files:**
- Modify: `apps/docs/components/ColorSwatch.tsx`

**Step 1: Read current implementation**

Current file: `apps/docs/components/ColorSwatch.tsx` (84 lines). Key issues:
- Raw `<div>` with `rounded-xl` → should be `Card`
- `text-[11px]` and `text-[10px]` → should be `type-caption`
- `break-all` → should be `break-words`

**Step 2: Rewrite using Card component**

```tsx
import { Card } from '@umichkisa-ds/web'

type ColorSwatchProps = {
  token: string
  value?: string
  hex?: string
  label: string
}

export function ColorSwatch({ token, value, hex, label }: ColorSwatchProps) {
  const isLight =
    token.includes("maize-light") ||
    token.includes("gray-50") ||
    token.includes("gray-100") ||
    token.includes("gray-200") ||
    token.includes("gray-300") ||
    token.includes("white") ||
    token.includes("surface") ||
    token.includes("border") ||
    token.includes("-subtle") ||
    token.includes("muted") ||
    token.includes("overlay")

  return (
    <Card className="overflow-hidden !p-0 !bg-surface">
      {/* Color block */}
      <div
        className="relative h-20 w-full"
        style={{
          backgroundColor: `var(${token})`,
          backgroundImage: isLight
            ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='4' height='4' fill='%23e5e7eb'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23e5e7eb'/%3E%3C/svg%3E\")"
            : undefined,
          backgroundSize: isLight ? "8px 8px" : undefined,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `var(${token})` }}
          aria-hidden="true"
        />
      </div>

      {/* Meta */}
      <div className="space-y-1 p-3">
        <p className="break-words type-caption font-mono !font-semibold !leading-snug text-foreground">
          {token}
        </p>

        {value && (
          <p className="type-caption font-mono !leading-snug text-muted-foreground">
            {value}
          </p>
        )}

        {hex && (
          <p className="type-caption font-mono uppercase !leading-snug text-muted-foreground">
            {hex}
          </p>
        )}

        <p className="pt-0.5 type-caption !font-medium text-muted-foreground">
          {label}
        </p>
      </div>
    </Card>
  )
}
```

Key changes:
- Outer `<div>` → `<Card className="overflow-hidden !p-0 !bg-surface">` — Card gives us `rounded-md`, `border border-border`, hover states. Override padding to 0 (Card subcomponents add their own) and background to `bg-surface` (white, not the Card default `bg-surface-subtle`).
- `text-[11px]` → `type-caption` with `!font-semibold` and `!leading-snug` overrides (type-* classes set weight/leading, so `!` is needed).
- `text-[10px]` → `type-caption` with `!leading-snug`.
- `break-all` → `break-words` for natural hyphen breaks.
- Inline `style={{ color: ... }}` → Tailwind classes (`text-foreground`, `text-muted-foreground`).
- `rounded-xl` → gone (Card provides `rounded-md`).

**Step 3: Verify build**

Run: `pnpm build`
Expected: PASS

**Step 4: Visual check**

Navigate to `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/colors/primitives` and verify:
- Cards render with `rounded-md` borders
- Text is readable at 12px
- Token names break at hyphens, not mid-word
- Hover states work (border-strong + bg-muted from Card)
- Also spot-check `/foundation/colors/tokens` and `/foundation/colors/overview` for cascading changes

**Step 5: Commit**

```bash
git add apps/docs/components/ColorSwatch.tsx
git commit -m "fix(docs): migrate ColorSwatch to DS Card with type-caption typography"
```

---

## Phase 2: Page Content Fixes

### Task 3: Remove redundant blockquote + replace Utility blockquote with Alert (Finding #4)

**Files:**
- Modify: `apps/docs/app/foundation/colors/primitives/page.tsx`

**Step 1: Read current page**

The page has two blockquotes:
1. Lines 12-16: Top blockquote (redundant with paragraph below) — **remove entirely**
2. Lines 64-68: Utility blockquote about hex values — **replace with Alert**

**Step 2: Update imports and remove top blockquote**

Add Alert import, remove the top blockquote, and replace the Utility blockquote:

```tsx
import { Container } from '@umichkisa-ds/web'
import { Alert } from '@umichkisa-ds/web'
import { ColorSwatch } from '@/components/ColorSwatch'
import { ColorSwatchGrid } from '@/components/ColorSwatchGrid'

export default function ColorsPrimitivesPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Primitive Palette</h1>

      <p className="type-body mb-4 text-foreground max-w-prose">
        These are the raw colors the entire system is built from. They are defined in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">packages/web/src/tokens/primitives.css</code>.
        Do not use these in components — they exist only to feed into semantic tokens.
      </p>

      {/* ── Michigan Brand ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Michigan Brand</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The two official University of Michigan brand colors and their tints.
      </p>

      <ColorSwatchGrid>
        {/* ... swatches unchanged ... */}
      </ColorSwatchGrid>

      {/* ── Gray Scale ──────────────────────────────────────── */}
      {/* ... unchanged ... */}

      {/* ── Utility ─────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Utility</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Base colors for feedback states and neutral anchors.
      </p>

      <Alert variant="info" title="On hex values" className="mb-4">
        Michigan brand colors show exact hex values from the official UMich brand guidelines.
        Utility colors (red, green) have no canonical hex — OKLCH is the authoritative definition.
        Inspect the browser to get the rendered value.
      </Alert>

      <ColorSwatchGrid>
        {/* ... swatches unchanged ... */}
      </ColorSwatchGrid>

    </Container>
  )
}
```

Key changes:
- Top blockquote (lines 12-16): deleted entirely — paragraph below already covers it.
- Utility blockquote (lines 64-68): replaced with `<Alert variant="info" title="On hex values">`.
- `<strong>` inside old blockquote becomes the `title` prop on Alert.

**Step 3: Verify build**

Run: `pnpm build`
Expected: PASS

**Step 4: Commit**

```bash
git add apps/docs/app/foundation/colors/primitives/page.tsx
git commit -m "fix(docs): remove redundant blockquote, replace utility callout with Alert"
```

---

## Phase 3: Verify

### Task 4: Final verification

**Step 1: Run build and typecheck**

```bash
pnpm build && pnpm typecheck
```

Expected: Both PASS

**Step 2: Visual verification**

Navigate to `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/colors/primitives` and verify:
- No redundant blockquote at top
- Utility section has proper Alert component
- Swatch cards use Card styling (rounded-md, border, hover)
- Text is readable at 12px minimum
- Token names break at hyphens
- Grid uses 2-col → 3-col (md:) → 4-col (lg:)
- Also spot-check `/foundation/colors/overview` and `/foundation/colors/tokens` for cascading component changes

**Step 3: Update docs and TODO**

Update `docs/CODEBASE.md` if needed, then check off both items in `docs/TODO.md`:
```markdown
- [x] Review `/foundation/colors/primitives`
- [x] Fix `/foundation/colors/primitives`
```
