# Icon Docs Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `/components/icon` docs page and establish the `ComponentPreview` primitive used by all future component pages.

**Architecture:** Pure `.tsx` component page (no MDX). `ComponentPreview` renders a stacked preview pane above a plain code block. `SizesExample` is an extracted `'use client'` component with a size toggle. All interactive pieces live flat in `apps/docs/components/`.

**Tech Stack:** Next.js 15 App Router, React 18, Tailwind CSS v4, `@umichkisa-ds/web` (workspace dep)

---

## Task 1: Create `_components_to_switch.md`

**Files:**
- Create: `apps/docs/content/_components_to_switch.md`

**Step 1: Create the file**

```markdown
# Components to Switch

Tracks docs app implementations that should be replaced with the real DS component
once it ships in `@umichkisa-ds/web`.

---

## ComponentPreview — stacked layout → Tabs

**Location**: `apps/docs/components/ComponentPreview.tsx`
**Current**: Preview pane stacked above code block, always visible.
**Replace with**: DS `Tabs` component — "Preview" and "Code" tabs.
**When**: After `Tabs` is implemented (see TODO.md Components section).

---

## ComponentPreview — code block → Shiki highlighting

**Location**: `apps/docs/components/ComponentPreview.tsx`
**Current**: Plain `<pre><code>` with token-based styling, no syntax highlighting.
**Replace with**: Shiki server-side highlighting (already used in MDX via rehype-pretty-code).
**When**: When a shared Shiki utility is extracted for use in .tsx pages.

---

## ComponentPreview — copy button

**Location**: `apps/docs/components/ComponentPreview.tsx`
**Current**: No copy button. Developer selects and copies manually.
**Replace with**: A copy-to-clipboard button in the code block header.
**When**: When a DS `Button` or `IconButton` component is available.

---

## SizesExample — toggle buttons → SegmentedControl

**Location**: `apps/docs/components/SizesExample.tsx`
**Current**: Raw `<button>` elements with manual active styling.
**Replace with**: DS segmented toggle or equivalent component.
**When**: After a segmented toggle component is implemented in `@umichkisa-ds/web`.
```

**Step 2: Commit**

```bash
git add apps/docs/content/_components_to_switch.md
git commit -m "docs: add _components_to_switch tracking file"
```

---

## Task 2: Create `ComponentPreview`

**Files:**
- Create: `apps/docs/components/ComponentPreview.tsx`

**Step 1: Create the file**

```tsx
interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
}

export function ComponentPreview({ children, code }: ComponentPreviewProps) {
  return (
    <div className="my-6">
      <div className="border border-border rounded-t-lg bg-surface p-8 flex items-center justify-center">
        {children}
      </div>
      <div className="border border-t-0 border-border rounded-b-lg bg-surface-subtle overflow-x-auto">
        <pre className="text-sm font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
```

**Step 2: Run typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors.

**Step 3: Commit**

```bash
git add apps/docs/components/ComponentPreview.tsx
git commit -m "docs: add ComponentPreview stacked preview+code primitive"
```

---

## Task 3: Create `SizesExample`

**Files:**
- Create: `apps/docs/components/SizesExample.tsx`

**Step 1: Create the file**

```tsx
'use client'

import { useState } from 'react'
import { Icon } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl']

export function SizesExample() {
  const [size, setSize] = useState<Size>('md')

  const code = `import { Icon } from '@umichkisa-ds/web'

<Icon name="arrow-right" size="${size}" />`

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`px-3 py-1.5 rounded-md text-sm font-mono transition-colors ${
              size === s
                ? 'bg-brand-primary text-brand-foreground'
                : 'bg-surface-subtle text-muted-foreground hover:text-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        xs = 12px · sm = 16px · md = 20px · lg = 24px · xl = 32px
      </p>
      <ComponentPreview code={code}>
        <Icon name="arrow-right" size={size} />
      </ComponentPreview>
    </div>
  )
}
```

**Step 2: Run typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors. If `Icon` size prop type complains, verify `@umichkisa-ds/web` is built: run `pnpm --filter @umichkisa-ds/web build` first.

**Step 3: Commit**

```bash
git add apps/docs/components/SizesExample.tsx
git commit -m "docs: add SizesExample interactive size toggle component"
```

---

## Task 4: Create `page.tsx`

**Files:**
- Create: `apps/docs/app/components/icon/page.tsx`

Note: a dynamic route `apps/docs/app/components/[slug]/page.tsx` already exists. In Next.js App Router, static routes take precedence — no conflict.

Note on API Reference: the `label` prop sets `aria-label` only. The implementation does **not** set `role="img"`. Document the real behavior.

**Step 1: Create the file**

```tsx
import { Icon } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { SizesExample } from '@/components/SizesExample'

const defaultCode = `import { Icon } from '@umichkisa-ds/web'

<Icon name="arrow-right" />`

const colorCode = `import { Icon } from '@umichkisa-ds/web'

{/* Default — inherits foreground color */}
<Icon name="plus" />

{/* Brand color — set on the wrapper */}
<span className="text-brand-primary">
  <Icon name="plus" />
</span>

{/* Error state */}
<span className="text-error">
  <Icon name="plus" />
</span>`

const labelCode = `import { Icon } from '@umichkisa-ds/web'

{/* Decorative — aria-hidden="true" (default when label is omitted) */}
<Icon name="thumbs-up" />

{/* Semantic — aria-label set, screen readers will announce it */}
<Icon name="thumbs-up" label="Liked" />`

const buttonCode = `import { Icon } from '@umichkisa-ds/web'

<button
  aria-label="Delete"
  className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md hover:bg-surface-subtle"
>
  <Icon name="trash-2" />
</button>`

export default function IconPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">Icon</h1>
      <p className="mb-8 leading-7 text-foreground">
        The single canonical way to render icons in the KISA design system. Wraps
        Lucide icons with consistent sizing, color inheritance via{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          currentColor
        </code>
        , and built-in accessibility handling.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="text-base font-semibold mt-6 mb-2 text-foreground">Default</h3>
      <p className="text-sm mb-3 leading-7 text-muted-foreground">
        No props beyond{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          name
        </code>
        . Renders at{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (20px) by default. Decorative — screen readers ignore it.
      </p>
      <ComponentPreview code={defaultCode}>
        <Icon name="arrow-right" />
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="text-base font-semibold mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="text-sm mb-3 leading-7 text-muted-foreground">
        Five size tokens map to fixed pixel values on a 4px grid. Use{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (default) for most UI.
      </p>
      <SizesExample />

      {/* Color */}
      <h3 className="text-base font-semibold mt-8 mb-2 text-foreground">Color</h3>
      <p className="text-sm mb-3 leading-7 text-muted-foreground">
        Icons inherit{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          currentColor
        </code>
        . Set color on the wrapping element using semantic tokens — never pass a color
        prop directly to{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          &lt;Icon&gt;
        </code>
        .
      </p>
      <ComponentPreview code={colorCode}>
        <div className="flex items-center gap-8">
          <Icon name="plus" />
          <span className="text-brand-primary">
            <Icon name="plus" />
          </span>
          <span className="text-error">
            <Icon name="plus" />
          </span>
        </div>
      </ComponentPreview>

      {/* With a label */}
      <h3 className="text-base font-semibold mt-8 mb-2 text-foreground">With a label</h3>
      <p className="text-sm mb-3 leading-7 text-muted-foreground">
        Provide{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          label
        </code>{' '}
        when the icon carries meaning with no visible text nearby. The component sets{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          aria-label
        </code>{' '}
        on the SVG so screen readers announce it.
      </p>
      <ComponentPreview code={labelCode}>
        <Icon name="thumbs-up" label="Liked" />
      </ComponentPreview>

      {/* Inside a button */}
      <h3 className="text-base font-semibold mt-8 mb-2 text-foreground">Inside a button</h3>
      <p className="text-sm mb-3 leading-7 text-muted-foreground">
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          &lt;Icon&gt;
        </code>{' '}
        is never interactive. Wrap in a{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          &lt;button&gt;
        </code>{' '}
        or{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          &lt;a&gt;
        </code>
        . The wrapper provides the accessible label and the minimum 44×44px touch target.
      </p>
      <ComponentPreview code={buttonCode}>
        <button
          aria-label="Delete"
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md hover:bg-surface-subtle"
        >
          <Icon name="trash-2" />
        </button>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">API Reference</h2>
      <p className="text-sm mb-6 leading-7 text-muted-foreground">
        All props except{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          name
        </code>{' '}
        are optional.{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          name
        </code>{' '}
        must be a registered{' '}
        <code className="rounded px-1.5 py-0.5 text-[0.875em] font-mono bg-surface-subtle text-foreground">
          IconName
        </code>{' '}
        — TypeScript will catch invalid names at compile time.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 font-mono text-xs text-foreground">name</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">IconName</td>
              <td className="px-4 py-3 text-muted-foreground">—</td>
              <td className="px-4 py-3 text-foreground">Required. Lucide icon name in kebab-case. Must be a key in the DS registry.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">&#39;xs&#39; | &#39;sm&#39; | &#39;md&#39; | &#39;lg&#39; | &#39;xl&#39;</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">&#39;md&#39;</td>
              <td className="px-4 py-3 text-foreground">Maps to a fixed pixel size (12 / 16 / 20 / 24 / 32).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 font-mono text-xs text-foreground">label</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
              <td className="px-4 py-3 text-muted-foreground">—</td>
              <td className="px-4 py-3 text-foreground">
                When provided: sets{' '}
                <code className="rounded px-1 py-0.5 text-xs font-mono bg-surface-subtle">aria-label</code>{' '}
                on the SVG so screen readers announce it. When omitted:{' '}
                <code className="rounded px-1 py-0.5 text-xs font-mono bg-surface-subtle">aria-hidden=&quot;true&quot;</code>.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string</td>
              <td className="px-4 py-3 text-muted-foreground">—</td>
              <td className="px-4 py-3 text-foreground">
                Layout utilities only (
                <code className="rounded px-1 py-0.5 text-xs font-mono bg-surface-subtle">block</code>
                ,{' '}
                <code className="rounded px-1 py-0.5 text-xs font-mono bg-surface-subtle">flex-shrink-0</code>
                ). Never use for color or size.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </article>
  )
}
```

**Step 2: Run typecheck**

```bash
pnpm --filter @umichkisa-ds/docs typecheck
```

Expected: no errors. Common failure: `@umichkisa-ds/web` types not resolved — run `pnpm --filter @umichkisa-ds/web build` first, then retry.

**Step 3: Commit**

```bash
git add apps/docs/app/components/icon/page.tsx
git commit -m "docs(icon): add /components/icon docs page"
```

---

## Task 5: Build verification

**Step 1: Run full build from monorepo root**

```bash
pnpm build
```

Expected: exits 0. If the docs build fails with a module-not-found on `@umichkisa-ds/web`:
- Run `pnpm --filter @umichkisa-ds/web build` first, then retry `pnpm build`.

**Step 2: Run typecheck**

```bash
pnpm typecheck
```

Expected: exits 0, zero errors across all packages.

---

## Task 6: Update `CODEBASE.md` + check off `TODO.md`

**Files:**
- Modify: `docs/CODEBASE.md`
- Modify: `docs/TODO.md`

**Step 1: Update `docs/CODEBASE.md`**

Make two edits:

**(a)** Replace the Components section under "Docs Content Status":

```
### Components
- Route exists at `/components/[slug]` (dynamic)
- **No MDX content files yet** — `apps/docs/content/components/` is empty
```

→

```
### Components
| Page | Route | Status |
|---|---|---|
| Icon | `/components/icon` | ✅ Complete |

Note: `/components/[slug]` dynamic route also exists as a fallback for future MDX-based pages.
```

**(b)** In "Docs UI Components (not part of the library)", append `ComponentPreview` and `SizesExample` to the list:

```
Already built for the docs site itself:
`ColorSwatch`, `ColorSwatchGrid`, `ContrastTable`, `DoDont`, `Callout`, `Sidebar`, `Header`, `ComponentPreview`, `SizesExample`
```

And append to the Token Alignment Audit table:

```markdown
| `ComponentPreview` | ✅ Clean | Uses Tailwind token utilities only |
| `SizesExample`     | ✅ Clean | Uses Tailwind token utilities only |
```

**Step 2: Check off `TODO.md`**

In `docs/TODO.md`, mark the step complete:

```
- [x] Step 2+3 — Icon Docs Page + ComponentPreview Primitive
```

**Step 3: Commit**

```bash
git add docs/CODEBASE.md docs/TODO.md
git commit -m "chore: mark Step 2+3 complete, update CODEBASE.md"
```

---

## Visual Verification Checklist

After `pnpm build` passes, start the docs app (`pnpm --filter @umichkisa-ds/docs dev`) and visit `http://localhost:3000/components/icon`. Confirm:

- [ ] Page renders without console errors
- [ ] Header: "Icon" h1 + description paragraph visible
- [ ] Default example: `arrow-right` icon renders in preview pane, code block shows below
- [ ] Sizes example: toggle buttons render (xs/sm/md/lg/xl), clicking each updates the icon size and code snippet
- [ ] Color example: three `plus` icons visible — default, brand-primary, error colors
- [ ] With a label example: `thumbs-up` icon renders in preview, code shows both decorative and labeled variants
- [ ] Inside a button example: `trash-2` inside a button renders, hover state visible
- [ ] API Reference: table renders with all four props (name, size, label, className)
- [ ] Sidebar highlights "Icon" as active under Components section
