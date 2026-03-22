# Spec: Step 2+3 — Icon Docs Page + ComponentPreview Primitive

## Goal

Build the `/components/icon` docs page — the canonical reference for how to use
the `<Icon>` component from `@umichkisa-ds/web`. As a side effect, establish the
`<ComponentPreview>` primitive that every future component docs page will use.

This spec merges what were Steps 2 and 3 in `docs/TODO.md`. The iframe preview
approach originally planned for Step 3 is replaced by a simpler stacked layout
(preview pane above a code block). The Tabs-based toggle comes later, once
`Tabs` is implemented in the DS — tracked in `apps/docs/content/_components_to_switch.md`.

---

## Scope

### In scope
- `apps/docs/app/components/icon/page.tsx` — new icon component docs page
- `apps/docs/components/SizesExample.tsx` — interactive size toggle (client component)
- `apps/docs/components/ComponentPreview.tsx` — stacked preview+code primitive
- `apps/docs/content/_components_to_switch.md` — new tracking doc for future DS component replacements
- `docs/TODO.md` — merge Step 2 + Step 3 entries

### Out of scope
- `apps/docs/content/foundation/iconography/` — library.mdx stays text-only; no icon grid
- `apps/docs/components/Sidebar.tsx` — already has `{ label: 'Icon', href: '/components/icon' }`
- `apps/docs/mdx-components.tsx` — ComponentPreview is used in .tsx pages only, not MDX
- `packages/web/` — no changes to the component package itself

---

## Decisions

| # | Decision |
|---|---|
| 1 | Step 2 (Icon Docs Page) and Step 3 (Iframe Preview) are merged into one step |
| 2 | No iframe isolation — docs app and web package share the same token layer, no style bleed risk |
| 3 | Component pages are pure `.tsx`, not `.mdx` — structured templates, not long-form prose |
| 4 | `ComponentPreview` uses a stacked layout: preview pane on top, code block below (always visible, no tabs) |
| 5 | Stacked layout is a placeholder — tracked in `_components_to_switch.md` for replacement with Tabs |
| 6 | No Installation/Import section — the code snippets in each example already show the import |
| 7 | Size toggle in the Sizes section is a raw client component (`SizesExample.tsx`) — tracked for future DS Toggle/Segmented replacement |
| 8 | Code blocks in `ComponentPreview` use simple styled `<pre><code>` — no Shiki highlighting for now; tracked for future upgrade |
| 9 | `page.tsx` is a server component; interactive parts are extracted into `apps/docs/components/` |
| 10 | All docs app components live flat in `apps/docs/components/` — no subfolders; refactor later |
| 11 | Page max-width follows the foundation page pattern: `max-w-3xl` inside `article` |
| 12 | Each example uses a different icon that most naturally illustrates its point |

---

## File Map

```
apps/docs/
├── app/
│   └── components/
│       └── icon/
│           └── page.tsx                      ← new: icon component docs page
├── components/
│   ├── ComponentPreview.tsx                  ← new: shared preview+code primitive
│   └── SizesExample.tsx                      ← new: interactive size toggle
└── content/
    └── _components_to_switch.md              ← new: future replacement tracking
```

---

## Page: `/components/icon`

**Route**: `apps/docs/app/components/icon/page.tsx`

**File type**: Server component (no `'use client'`). Interactive children are imported from `apps/docs/components/`.

**Layout wrapper**: `<article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">`

### Section order

```
# Icon
[description paragraph]

## Examples
### Default
### Sizes          ← interactive (SizesExample client component)
### Color
### With a label
### Inside a button

## API Reference
[props table]
```

---

### Page header

```tsx
<h1>Icon</h1>
<p>
  The single canonical way to render icons in the KISA design system.
  Wraps Lucide icons with consistent sizing, color inheritance via{' '}
  <code>currentColor</code>, and built-in accessibility handling.
</p>
```

---

### Example: Default

**Icon used**: `arrow-right`

**Description**: No props beyond `name`. Renders at the default size (`md` = 20px),
decorative (`aria-hidden="true"`).

**Preview**: `<Icon name="arrow-right" />` centered in the preview pane.

**Code snippet**:
```tsx
import { Icon } from '@umichkisa-ds/web'

<Icon name="arrow-right" />
```

---

### Example: Sizes

**Icon used**: `arrow-right` (same icon across all sizes — makes the size difference visually clear)

**Description**: Five size tokens map to fixed pixel values. Use `md` (default) for most UI.

**Interactive toggle**: Five buttons labeled `xs`, `sm`, `md`, `lg`, `xl`. Clicking a size
updates both the rendered preview and the code snippet.

**Preview**: Single icon rendered at the currently selected size, horizontally centered.

**Code snippet** (updates with selection, default shown):
```tsx
import { Icon } from '@umichkisa-ds/web'

<Icon name="arrow-right" size="md" />
```

**Implementation note**: This is `SizesExample.tsx` — a `'use client'` component imported
into `page.tsx`.

---

### Example: Color

**Icon used**: `plus`

**Description**: Icons inherit `currentColor`. Control color on the wrapping element
using semantic tokens — never pass color directly to `<Icon>`.

**Preview**: Three icons side by side, each in a different colored wrapper:
- Default (inherits `--color-foreground`)
- `text-brand-primary`
- `text-error`

**Code snippet**:
```tsx
import { Icon } from '@umichkisa-ds/web'

{/* Default — inherits foreground color */}
<Icon name="plus" />

{/* Brand color — set on the wrapper */}
<span className="text-brand-primary">
  <Icon name="plus" />
</span>

{/* Error state */}
<span className="text-error">
  <Icon name="plus" />
</span>
```

---

### Example: With a label

**Icon used**: `thumbs-up`

**Description**: When `label` is provided, the icon sets `aria-label` on the SVG so
screen readers announce it. Omit `label` when visible text nearby already describes
the context.

**Preview**: `<Icon name="thumbs-up" label="Liked" />` — visually identical to a
decorative icon, but semantically labeled.

**Code snippet**:
```tsx
import { Icon } from '@umichkisa-ds/web'

{/* Decorative — aria-hidden="true" (default when label is omitted) */}
<Icon name="thumbs-up" />

{/* Semantic — aria-label set, screen readers will announce it */}
<Icon name="thumbs-up" label="Liked" />
```

---

### Example: Inside a button

**Icon used**: `trash-2`

**Description**: `<Icon>` is never interactive. Wrap in a `<button>` or `<a>`. The wrapper
provides the accessible label and the minimum 44×44px touch target.

**Preview**: A rendered button containing the trash icon, with hover state visible.

**Code snippet**:
```tsx
import { Icon } from '@umichkisa-ds/web'

<button
  aria-label="Delete"
  className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md hover:bg-surface-subtle"
>
  <Icon name="trash-2" />
</button>
```

---

### Section: API Reference

Prose intro:
> All props except `name` are optional. `name` must be a registered `IconName` —
> TypeScript will catch invalid names at compile time.

**Props table**:

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `IconName` | required | Lucide icon name in kebab-case. Must be a key in the DS registry. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Maps to a fixed pixel size (12 / 16 / 20 / 24 / 32). |
| `label` | `string` | — | When provided: sets `aria-label` on the SVG — screen readers announce it. When omitted: `aria-hidden="true"`. |
| `className` | `string` | — | Layout utilities only (`block`, `flex-shrink-0`). Never use for color or size. |

---

## Component: `<ComponentPreview>`

**File**: `apps/docs/components/ComponentPreview.tsx`

**Purpose**: Shared primitive for all component docs pages. Renders a live preview
pane above a styled code block.

**Props**:
```tsx
interface ComponentPreviewProps {
  children: React.ReactNode  // the live rendered component
  code: string               // source code string to display below
}
```

**Layout**:
```
┌─────────────────────────────────────────────┐
│  preview pane (bordered, padded, bg-surface) │
│  children rendered here, centered            │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  code block (bg-surface-subtle, monospace)   │
│  code prop displayed as preformatted text    │
└─────────────────────────────────────────────┘
```

**Styling**:
- Preview pane: `border border-border rounded-t-lg bg-surface p-8 flex items-center justify-center`
- Code block: `border border-t-0 border-border rounded-b-lg bg-surface-subtle overflow-x-auto`
- Code text: `text-sm font-mono text-foreground px-4 py-4 whitespace-pre`
- No copy button for now — tracked for future upgrade in `_components_to_switch.md`

---

## Component: `SizesExample`

**File**: `apps/docs/components/SizesExample.tsx`

**Directive**: `'use client'`

**State**: `size` — `'xs' | 'sm' | 'md' | 'lg' | 'xl'`, default `'md'`

**Renders**:
1. A row of five toggle buttons (`xs` / `sm` / `md` / `lg` / `xl`). Active button:
   `bg-brand-primary text-brand-foreground`. Inactive: `bg-surface-subtle text-muted-foreground`.
2. A `<ComponentPreview>` below, showing `<Icon name="arrow-right" size={size} />`
   with a code snippet reflecting the selected size.

**Size reference note** (rendered as small text below the toggle):
```
xs = 12px  ·  sm = 16px  ·  md = 20px  ·  lg = 24px  ·  xl = 32px
```

---

## File: `_components_to_switch.md`

**Path**: `apps/docs/content/_components_to_switch.md`

**Purpose**: Tracks places in the docs app where raw HTML / one-off implementations
are used instead of DS components, so they can be upgraded when the real component ships.

**Initial content**:

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

---

## `TODO.md` Update

Replace:
```
- [ ] Step 2 — Icon Docs Page
- [ ] Step 3 — Iframe Preview Infrastructure
```
With:
```
- [ ] Step 2+3 — Icon Docs Page + ComponentPreview Primitive
```

---

## Implementation Steps

### Phase 1 — `_components_to_switch.md`
Create `apps/docs/content/_components_to_switch.md` with the four entries above.

### Phase 2 — `ComponentPreview`
Create `apps/docs/components/ComponentPreview.tsx`.
- Server component (no `'use client'`)
- Props: `{ children: React.ReactNode, code: string }`
- Stacked layout: preview pane (rounded-t) + code block (rounded-b, border-t-0)
- All colors via CSS token variables

### Phase 3 — `SizesExample`
Create `apps/docs/components/SizesExample.tsx`.
- `'use client'`
- Size state, toggle buttons with active styling using DS tokens
- Uses `<ComponentPreview>` — code string updates with selected size
- Imports `Icon` from `@umichkisa-ds/web`

### Phase 4 — `page.tsx`
Create `apps/docs/app/components/icon/page.tsx`.
Build all sections in order:
1. Page header (h1 + description paragraph)
2. `## Examples` heading
3. Default — `<ComponentPreview>` with `<Icon name="arrow-right" />`
4. Sizes — `<SizesExample />`
5. Color — `<ComponentPreview>` with three colored icons
6. With a label — `<ComponentPreview>` with two variants in the code snippet
7. Inside a button — `<ComponentPreview>` with the button pattern
8. `## API Reference` — prose intro + props table as TSX table elements

Use DS token CSS variables for all colors (`--color-foreground`, `--color-muted-foreground`,
`--color-border`, etc.) matching the style in `mdx-components.tsx`.

### Phase 5 — `TODO.md`
Update `docs/TODO.md` as described above.

### Phase 6 — Build verification
```bash
pnpm build
pnpm typecheck
```
Both must pass before the step is considered done.

---

## Session End Checklist

1. `pnpm build` passes
2. `pnpm typecheck` passes
3. `/components/icon` renders in the browser with all five example sections visible
4. Size toggle in the Sizes section is interactive — preview and code snippet both update
5. `apps/docs/content/_components_to_switch.md` exists with all four entries
6. `apps/docs/components/ComponentPreview.tsx` exists
7. `apps/docs/components/SizesExample.tsx` exists
8. `docs/TODO.md` reflects the merged Step 2+3
9. Update `docs/CODEBASE.md` status tables
10. Check off Step 2+3 in `docs/TODO.md`
