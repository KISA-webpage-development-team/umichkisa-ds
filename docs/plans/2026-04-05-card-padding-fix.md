# Card Padding Architecture Fix

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move Card's padding from child components (CardHeader, CardContent, CardFooter) to the Card wrapper itself, so padding is consistent regardless of which children are present.

**Architecture:** Change Card to `p-4 gap-4`, strip all padding from children, update all 5 consumer files in docs app to remove padding workarounds. Rebuild `packages/web`.

**Tech Stack:** React, Tailwind v4, `@umichkisa-ds/web`

---

### Task 1: Update Card component — move padding to wrapper

**Files:**
- Modify: `packages/web/src/components/display/Card.tsx`

**Step 1: Update the component**

Change Card wrapper from no padding to `p-4 gap-4`:
```tsx
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 bg-surface-subtle border border-border rounded-md transition-colors duration-200 hover:border-border-strong hover:bg-surface-muted",
        className
      )}
      {...props}
    />
  );
}
```

Change CardHeader from `p-4` to `flex flex-col gap-2`:
```tsx
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}
```

Change CardContent from `flex-1 px-4 pb-4` to `flex-1`:
```tsx
export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("flex-1", className)} {...props} />;
}
```

Change CardFooter from `flex items-center gap-2 px-4 pb-4` to `flex items-center gap-2`:
```tsx
export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}
```

CardTitle and CardDescription remain unchanged.

**Step 2: Verify**

Run: `pnpm typecheck`

---

### Task 2: Update ColorSwatch — remove !p-0 workaround

**Files:**
- Modify: `apps/docs/components/ColorSwatch.tsx:25`

**Step 1: Update the component**

The `!p-0` was a workaround for child padding. Now Card has `p-4` by default and ColorSwatch needs edge-to-edge bleed for the color block. Keep `!p-0` — it's the correct opt-out for bleed cases.

Actually, `!p-0` is still correct here because the color block needs to touch the edges. Also remove `!bg-surface` — Card's default `bg-surface-subtle` should be overridden to `bg-surface` if needed, but looking at the component, the meta section has its own padding (`p-3`), which is fine when Card has `!p-0`.

Line 25: No change needed — `!p-0` is the correct pattern for bleed cards. However, `!bg-surface` should stay as-is since it overrides Card's surface-subtle to surface.

**Result: No changes to this file.** The existing `!p-0 !bg-surface` is already correct for the new model.

---

### Task 3: Update accessibility/page.tsx — remove pt-4 workaround

**Files:**
- Modify: `apps/docs/app/foundation/colors/accessibility/page.tsx:51`

**Step 1: Update the component**

Line 51 currently has:
```tsx
<CardContent className="pt-4">
```

The `pt-4` was compensating for missing top padding when no CardHeader is present. Now Card provides `p-4`, so this workaround is unnecessary. Remove it:
```tsx
<CardContent>
```

**Step 2: Verify**

Run: `pnpm typecheck`

---

### Task 4: Update typography/fonts/page.tsx — add !p-0 for bleed specimens

**Files:**
- Modify: `apps/docs/app/foundation/typography/fonts/page.tsx:99,199`

**Step 1: Update both specimen cards**

Both specimen cards need edge-to-edge bleed (SejongHospital has navy bg, Pretendard has content touching edges). Add `!p-0` to opt out of Card's default padding.

Line 99 — SejongHospital specimen:
```tsx
<Card className="my-8 overflow-hidden !p-0">
```

Line 199 — Pretendard specimen:
```tsx
<Card className="my-8 overflow-hidden !p-0">
```

**Step 2: Verify**

Run: `pnpm typecheck`

---

### Task 5: Update card/page.tsx — remove pt-4 workarounds and update docs

**Files:**
- Modify: `apps/docs/app/components/card/page.tsx`

**Step 1: Update code examples and rendered previews**

There are 4 code string constants and 4 rendered previews. Changes needed:

1. **Anatomy code block** (line 140-145): Update to reflect new padding model:
```tsx
<CodeBlock code={`Card              ← p-4 gap-4, border + background
  CardHeader      ← flex-col gap-2 (groups title + description)
  CardContent     ← flex-1 (stretches to fill)
  CardFooter      ← flex row, gap-2`} lang="text" />
```

2. **compositionCode string** (line 97-113): Remove `pt-4` from CardContent since Card now provides padding:
```tsx
const compositionCode = `import { Card, CardContent, CardFooter, Avatar, Button, Icon } from '@umichkisa-ds/web'

<Card className="max-w-sm">
  <CardContent className="flex flex-col items-center gap-4">
    <Avatar src="/avatars/member.jpg" name="Jioh In" size="lg" />
    <div className="text-center">
      <p className="type-body text-foreground"><strong>Jioh In</strong></p>
      <p className="type-body-sm text-muted-foreground">Dev Team Lead</p>
    </div>
    <div className="flex items-center gap-4 text-muted-foreground">
      <Icon name="github" size="sm" />
      <Icon name="linkedin" size="sm" />
      <Icon name="mail" size="sm" />
    </div>
  </CardContent>
  <CardFooter className="justify-center">
    <Button variant="primary" size="sm">View profile</Button>
  </CardFooter>
</Card>`
```

3. **Rendered composition preview** (line 266): Remove `pt-4`:
```tsx
<CardContent className="flex flex-col items-center gap-4">
```

4. **Custom composition description** (lines 259-262): Remove the "add top padding" guidance:
```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  Sub-components are fully composable. Skip CardHeader entirely and
  arrange content freely. Here, a member profile card with centered layout.
</p>
```

5. **CardContent description** (lines 427-429): Update to reflect no-padding model:
```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  Main body area. Grows to fill available vertical space (flex-1) so
  footers pin to the bottom in equal-height grid layouts.
</p>
```

6. **CardContent className row** (line 452): Remove the "Add pt-4" guidance:
```tsx
<td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities like <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">flex flex-col gap-4</code>.</td>
```

7. **Card description** (lines 293-295): Update to reflect padding on wrapper:
```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  Outer container with p-4 padding, gap-4 between children, surface-subtle background, border, and rounded corners. Use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">!p-0</code> for edge-to-edge bleed layouts.
</p>
```

8. **CardHeader description** (lines 325-327): Update:
```tsx
<p className="type-body mb-2 text-foreground max-w-prose">
  Groups CardTitle and CardDescription with element-tier spacing (gap-2).
</p>
```

**Step 2: Verify**

Run: `pnpm typecheck`

---

### Task 6: Rebuild packages/web

**Step 1: Build**

Run: `pnpm --filter @umichkisa-ds/web build`

**Step 2: Stage dist**

Run: `git add packages/web/dist/`

---

### Task 7: Final verification

**Step 1: Run full checks**

Run: `pnpm build && pnpm typecheck`

Both must pass.

---

### Task 8: Commit

```bash
git add packages/web/src/components/display/Card.tsx packages/web/dist/ apps/docs/components/ColorSwatch.tsx apps/docs/app/foundation/colors/accessibility/page.tsx apps/docs/app/foundation/typography/fonts/page.tsx apps/docs/app/components/card/page.tsx
git commit -m "fix(Card): move padding from children to wrapper

Card now uses p-4 gap-4 on the wrapper instead of distributing
padding across CardHeader (p-4), CardContent (px-4 pb-4), and
CardFooter (px-4 pb-4). Children are now padding-free containers:
- CardHeader: flex flex-col gap-2
- CardContent: flex-1
- CardFooter: flex items-center gap-2

This ensures consistent padding regardless of which children are
present. Use !p-0 on Card for edge-to-edge bleed layouts.

Updates all docs app consumers to remove padding workarounds."
```
