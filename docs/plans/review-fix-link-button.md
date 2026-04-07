# /components/link-button — Review Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `ds-constrained-execution` to implement this plan task-by-task.

**Goal:** Apply the 3 findings from the `/components/link-button` review.

**Source:** `apps/docs/app/components/link-button/page.tsx`
**Review entry:** `docs/reviews/docs-app-review.md` § /components/link-button
**Reference (canonical pattern):** `apps/docs/app/components/button/page.tsx` (Grid demos + Table/TableMobileList API ref)

---

### Task 1: Migrate API Reference to DS Table + TableMobileList (Fix #1)

**File:** `apps/docs/app/components/link-button/page.tsx`

**Step 1 — Update imports** (line 1):
```tsx
import { Container, LinkButton, Icon, Grid, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
```
(`Grid` is added here so Task 2 can reuse the same import line.)

**Step 2 — Replace the API Reference table block** (lines 230–291).

Replace the existing `<div className="my-6 overflow-x-auto"> ... </div>` wrapper and its raw `<table>` with the dual desktop/mobile structure mirroring `apps/docs/app/components/button/page.tsx:173–264`:

```tsx
<div className="my-6">
  <div className="hidden md:block">
    <Table size="sm">
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;primary&#39;</code></TableCell>
          <TableCell>Visual style of the link button.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></TableCell>
          <TableCell>Controls padding and font size. All values sit on the 4px spacing grid.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">href</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>The URL to navigate to.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
          <TableCell>Renders as a non-interactive span when true.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">target</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Browsing context for the link (e.g. <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;_blank&quot;</code>).</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">rel</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Link relationship (e.g. <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;noopener noreferrer&quot;</code>).</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
          <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">React.ReactNode</code></TableCell>
          <TableCell>—</TableCell>
          <TableCell>Label text, icons, or any content inside the link button.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
    <div className="block md:hidden">
      <TableMobileList>
        <TableMobileItem>
          <span className="type-body-sm text-foreground"><strong>variant</strong></span>
          <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;primary&#39;</code></span>
          <span className="type-caption text-muted-foreground">Visual style of the link button.</span>
        </TableMobileItem>
        <TableMobileItem>
          <span className="type-body-sm text-foreground"><strong>size</strong></span>
          <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;md&#39;</code></span>
          <span className="type-caption text-muted-foreground">Controls padding and font size. All values sit on the 4px spacing grid.</span>
        </TableMobileItem>
        <TableMobileItem>
          <span className="type-body-sm text-foreground"><strong>href</strong></span>
          <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
          <span className="type-caption text-muted-foreground">The URL to navigate to.</span>
        </TableMobileItem>
        <TableMobileItem>
          <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
          <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
          <span className="type-caption text-muted-foreground">Renders as a non-interactive span when true.</span>
        </TableMobileItem>
        <TableMobileItem>
          <span className="type-body-sm text-foreground"><strong>target</strong></span>
          <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
          <span className="type-caption text-muted-foreground">Browsing context for the link (e.g. <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;_blank&quot;</code>).</span>
        </TableMobileItem>
        <TableMobileItem>
          <span className="type-body-sm text-foreground"><strong>rel</strong></span>
          <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
          <span className="type-caption text-muted-foreground">Link relationship (e.g. <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;noopener noreferrer&quot;</code>).</span>
        </TableMobileItem>
        <TableMobileItem>
          <span className="type-body-sm text-foreground"><strong>className</strong></span>
          <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
          <span className="type-caption text-muted-foreground">Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</span>
        </TableMobileItem>
        <TableMobileItem>
          <span className="type-body-sm text-foreground"><strong>children</strong></span>
          <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">React.ReactNode</code></span>
          <span className="type-caption text-muted-foreground">Label text, icons, or any content inside the link button.</span>
        </TableMobileItem>
      </TableMobileList>
    </div>
  </div>
```

**Why:** Memory rule "API tables need desktop + mobile list" — every API Reference must ship both. The current raw `<table>` with `overflow-x-auto` gives mobile users a horizontally-scrolling table with no card-style fallback, and uses hand-rolled utility classes instead of DS components.

---

### Task 2: Wrap demos in `Grid` for consistent widths (Fix #2)

**File:** `apps/docs/app/components/link-button/page.tsx`

(Imports already include `Grid` from Task 1.)

**Variants demo** (lines 120–127) — replace:
```tsx
<ComponentPreview code={variantsCode} highlightedCode={variantsHighlighted}>
  <Grid columns={{ base: 2, md: 4 }} gap="component" className="w-full md:px-16">
    <LinkButton variant="primary" href="#" className="w-full">Primary</LinkButton>
    <LinkButton variant="secondary" href="#" className="w-full">Secondary</LinkButton>
    <LinkButton variant="tertiary" href="#" className="w-full">Tertiary</LinkButton>
    <LinkButton variant="destructive" href="#" className="w-full">Destructive</LinkButton>
  </Grid>
</ComponentPreview>
```

**Sizes demo** (lines 138–144) — replace:
```tsx
<ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
  <Grid columns={{ base: 3 }} gap="component" className="w-full items-center md:px-16">
    <LinkButton size="sm" href="#" className="w-full">Small</LinkButton>
    <LinkButton size="md" href="#" className="w-full">Medium</LinkButton>
    <LinkButton size="lg" href="#" className="w-full">Large</LinkButton>
  </Grid>
</ComponentPreview>
```

**Disabled demo** (lines 208–215) — replace (also fixes #3 by adding `href="#"`):
```tsx
<ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
  <Grid columns={{ base: 2, md: 4 }} gap="component" className="w-full md:px-16">
    <LinkButton variant="primary" href="#" disabled className="w-full">Primary</LinkButton>
    <LinkButton variant="secondary" href="#" disabled className="w-full">Secondary</LinkButton>
    <LinkButton variant="tertiary" href="#" disabled className="w-full">Tertiary</LinkButton>
    <LinkButton variant="destructive" href="#" disabled className="w-full">Destructive</LinkButton>
  </Grid>
</ComponentPreview>
```

**Why:** Mirrors `apps/docs/app/components/button/page.tsx` (commit `c9d1dc9`) so LinkButton demos render with the same column rhythm and consistent button widths as Button demos. Same Grid configs 1:1.

---

### Task 3: Already covered by Task 2 (Fix #3)

The `href="#"` mismatch on the Disabled preview is fixed in Task 2's Disabled demo replacement above. No separate edit needed.

---

### Final verification

1. `pnpm --filter @umichkisa-ds/docs build` — must pass
2. `pnpm typecheck` — must pass
3. Visit `/components/link-button` at desktop (≥ md) and mobile (< md):
   - Variants/Sizes/Disabled demos: buttons share equal widths via Grid
   - API Reference: Table renders at desktop, TableMobileList renders at mobile (no horizontal scroll)
   - Disabled preview matches the displayed code (`href="#"` present in both)
4. Single commit: `fix(docs): apply review fixes to /components/link-button`
