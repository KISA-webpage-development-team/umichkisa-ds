# Spec: Step 1 — Icon Implementation

## Goal

Build the `<Icon>` component — the single, canonical way to render icons in the KISA design
system. Replace the existing 20 named icon components (which use `react-icons`) with a
static-registry-based wrapper over `lucide-react`.

---

## Scope

### In scope
- `packages/web/src/components/icon/` — full rewrite
- `packages/web/package.json` — add `lucide-react` as direct dependency, remove `react-icons`
- `packages/web/src/index.ts` — update icon exports

### Out of scope
- Client repo (`../KISA-website/client/`) — no changes
- Docs app — Step 2 handles the icon docs page
- Any other package

---

## Decisions

All decisions were finalized during the pre-spec grill session. Do not re-litigate.

| # | Decision |
|---|---|
| 1 | Delete all 20 existing named icon components — clean break, no shims |
| 2 | Static registry: explicit map of `kebab-case` → Lucide component |
| 3 | Sizing via Lucide's `size` prop — pixel map, no CSS font-size classes |
| 4 | `name` typed as strict literal union: `keyof typeof registry` |
| 5 | Registry seeded from client usage audit (23 Lucide + 2 custom SVG brand icons) |
| 6 | `LikeIcon` fill variant dropped — state communicated via parent color |
| 7 | Brand icons (github, linkedin) as custom SVGs — user provides SVG paths at session time |
| 8 | Registry keys are Lucide kebab-case only — no feature aliases (no `pocha-cart` etc.) |
| 9 | `lucide-react` as direct dependency |
| 10 | `label` prop → sets `aria-label`, suppresses `aria-hidden`; omit → `aria-hidden="true"` |
| 11 | `className` restriction (layout only) enforced by convention and docs, not runtime |
| 12 | 4-file structure: `Icon.tsx`, `registry.ts`, `types.ts`, `index.ts`; delete `icon.css` |

---

## Component API

```tsx
<Icon
  name="plus"              // required — must be a registered IconName
  size="md"               // optional — 'xs' | 'sm' | 'md' | 'lg' | 'xl', default 'md'
  label="Add item"        // optional — aria-label; omit for decorative icons
  className="flex-shrink-0" // optional — layout utilities only (never color or sizing)
/>
```

### Prop behavior

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `name` | `IconName` | required | Lucide kebab-case or registered custom SVG name |
| `size` | `IconSize` | `'md'` | Controls SVG `width`/`height` via Lucide's `size` prop |
| `label` | `string` | — | When provided: `aria-label={label}`, no `aria-hidden`. When omitted: `aria-hidden="true"` |
| `className` | `string` | — | Passed to the SVG element. Layout utilities only (`block`, `flex-shrink-0`, `scale-x-[-1]`, etc.) |

### Size map

| `size` prop | Pixels |
|-------------|--------|
| `xs` | 12 |
| `sm` | 16 |
| `md` | 20 |
| `lg` | 24 |
| `xl` | 32 |

### Color

Icons inherit color from the parent element via `currentColor`. Never pass color via `className`
or any other prop. Set color on the wrapper:

```tsx
// correct
<span className="text-brand-primary">
  <Icon name="thumbs-up" />
</span>

// wrong — never do this
<Icon name="thumbs-up" className="text-brand-primary" />
```

### Interactive icons

Never attach `onClick` to `<Icon>`. Wrap in `<button>` or `<a>`:

```tsx
<button aria-label="Delete" className="min-w-[44px] min-h-[44px] flex items-center justify-center">
  <Icon name="trash-2" />
  {/* Do NOT also pass label prop here — aria-label on the button is sufficient */}
</button>
```

---

## File Structure

```
packages/web/src/components/icon/
├── types.ts       — IconSize, IconName, IconProps
├── registry.ts    — static map of IconName → LucideIcon component or custom SVG
├── Icon.tsx       — <Icon> component implementation
└── index.ts       — exports: Icon, IconName, IconSize, IconProps
```

Files to delete:
- All 20 existing named component files (`PlusIcon.tsx`, `LikeIcon.tsx`, etc.)
- `icon.css` — `ds-icon-*` font-size classes are no longer used

---

## Implementation Steps

### Phase 1 — Dependency

In `packages/web/package.json`:
- Add `lucide-react` to `dependencies` (use latest stable: `^0.x.x` — check npm at session time)
- Remove `react-icons` from `dependencies`
- Run `pnpm install` from monorepo root

### Phase 2 — `types.ts`

```ts
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// IconName is derived from the registry — defined in registry.ts and re-exported here.
// This file declares the props interface only.
import type { registry } from './registry'
export type IconName = keyof typeof registry

export interface IconProps {
  name: IconName
  size?: IconSize
  label?: string
  className?: string
}
```

### Phase 3 — `registry.ts`

```ts
import { LucideIcon } from 'lucide-react'
import {
  ArrowLeft, ArrowRight,
  ChevronRight, ChevronDown,
  CircleMinus, CirclePlus,
  Clock9,
  ExternalLink,
  Eye,
  GraduationCap,
  List,
  Lock,
  Mail,
  MessageSquare,
  Minus,
  Pencil,
  Plus,
  Reply,
  ShoppingCart,
  ThumbsUp,
  Ticket,
  Trash2,
  X,
} from 'lucide-react'

// Brand icons: user-supplied SVGs adapted to Lucide's visual spec.
// Each is a React component matching LucideIcon's signature.
// SVG files will be provided by the user during the implementation session.
import { GithubIcon } from './custom/GithubIcon'
import { LinkedinIcon } from './custom/LinkedinIcon'

export const registry = {
  'arrow-left':     ArrowLeft,
  'arrow-right':    ArrowRight,
  'chevron-right':  ChevronRight,
  'chevron-down':   ChevronDown,
  'circle-minus':   CircleMinus,
  'circle-plus':    CirclePlus,
  'clock-9':        Clock9,
  'external-link':  ExternalLink,
  'eye':            Eye,
  'github':         GithubIcon,
  'graduation-cap': GraduationCap,
  'linkedin':       LinkedinIcon,
  'list':           List,
  'lock':           Lock,
  'mail':           Mail,
  'message-square': MessageSquare,
  'minus':          Minus,
  'pencil':         Pencil,
  'plus':           Plus,
  'reply':          Reply,
  'shopping-cart':  ShoppingCart,
  'thumbs-up':      ThumbsUp,
  'ticket':         Ticket,
  'trash-2':        Trash2,
  'x':              X,
} as const satisfies Record<string, LucideIcon | React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: string; 'aria-label'?: string }>>
```

> **Note on brand icons:** The `custom/` subfolder and its two files (`GithubIcon.tsx`,
> `LinkedinIcon.tsx`) cannot be written until the user provides the SVG paths. When the
> user provides a brand icon SVG, adapt it as follows:
> - Set `viewBox="0 0 24 24"`
> - Replace any hardcoded color with `fill="currentColor"` or `stroke="currentColor"` as appropriate
> - Wrap in a functional component that accepts `{ size, className, 'aria-hidden', 'aria-label' }`
>   and applies `width={size} height={size}` to the root `<svg>`
> - Export as a named component (`GithubIcon`, `LinkedinIcon`)

Updated file structure when brand SVGs are provided:
```
packages/web/src/components/icon/
├── custom/
│   ├── GithubIcon.tsx
│   └── LinkedinIcon.tsx
├── types.ts
├── registry.ts
├── Icon.tsx
└── index.ts
```

If brand SVGs are not available at session time, temporarily omit `github` and `linkedin`
from the registry and add a `// TODO: add github, linkedin once SVGs are provided` comment.
Do not block the rest of the implementation.

### Phase 4 — `Icon.tsx`

```tsx
import React from 'react'
import { registry } from './registry'
import type { IconProps } from './types'

const sizeMap: Record<NonNullable<IconProps['size']>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

export function Icon({ name, size = 'md', label, className }: IconProps) {
  const LucideComponent = registry[name]
  const px = sizeMap[size]

  if (label) {
    return (
      <LucideComponent
        size={px}
        className={className}
        aria-label={label}
      />
    )
  }

  return (
    <LucideComponent
      size={px}
      className={className}
      aria-hidden="true"
    />
  )
}
```

### Phase 5 — `index.ts`

```ts
export { Icon } from './Icon'
export type { IconName, IconSize, IconProps } from './types'
```

### Phase 6 — Delete old files

Delete every file in `packages/web/src/components/icon/` that is not one of the four new
files (`types.ts`, `registry.ts`, `Icon.tsx`, `index.ts`) or the `custom/` subfolder.

Specifically, delete:
- `icon.css`
- `BackIcon.tsx`
- `ClockIcon.tsx`
- `CommentIcon.tsx`
- `CrossIcon.tsx`
- `EmailIcon.tsx`
- `GitIcon.tsx`
- `GradIcon.tsx`
- `LikeIcon.tsx`
- `LinkedInIcon.tsx`
- `ListIcon.tsx`
- `MinusIcon.tsx`
- `NextIconTail.tsx`
- `PencilIcon.tsx`
- `PlusIcon.tsx`
- `PochaBackIcon.tsx`
- `PochaCartIcon.tsx`
- `PochaCloseIcon.tsx`
- `PochaMenuMinusIcon.tsx`
- `PochaMenuPlusIcon.tsx`
- `PochaMinusIcon.tsx`
- `PochaPlusIcon.tsx`
- `PochaTrashIcon.tsx`
- `ReplyIcon.tsx`
- `RightArrowIcon.tsx`
- `SecretIcon.tsx`
- `TicketIcon.tsx`
- `TrashcanIcon.tsx`
- `ViewIcon.tsx`
- Any `Icon.tsx` base file with the old `iconClass` helper (replaced by new `Icon.tsx`)

Also delete the old `Icon.tsx` helper (contained `iconClass`, `IconBaseProps`, `IconSize`).
These are replaced by `types.ts` and `Icon.tsx`.

### Phase 7 — Update `packages/web/src/index.ts`

The icon barrel export stays the same:
```ts
export * from './components/icon'
```

Verify it still points to the icon `index.ts` — no change needed unless the path changed.

### Phase 8 — Build verification

Run from monorepo root:

```bash
pnpm --filter @umichkisa-ds/web build
pnpm typecheck
```

Both must pass with zero errors before the step is considered complete.

---

## Registry Contents (Reference)

25 total entries. 23 from `lucide-react`, 2 custom SVG brand icons.

| Registry key | Lucide import | Origin in client |
|---|---|---|
| `arrow-left` | `ArrowLeft` | BackIcon, PochaBackIcon |
| `arrow-right` | `ArrowRight` | NextIconTail |
| `chevron-right` | `ChevronRight` | RightArrowIcon |
| `chevron-down` | `ChevronDown` | jobs-curator direct import |
| `circle-minus` | `CircleMinus` | PochaMenuMinusIcon |
| `circle-plus` | `CirclePlus` | PochaMenuPlusIcon |
| `clock-9` | `Clock9` | ClockIcon |
| `external-link` | `ExternalLink` | JobPostingCard, USAFallbackContent |
| `eye` | `Eye` | ViewIcon |
| `github` | custom SVG | GitIcon |
| `graduation-cap` | `GraduationCap` | GradIcon |
| `linkedin` | custom SVG | LinkedInIcon |
| `list` | `List` | ListIcon |
| `lock` | `Lock` | SecretIcon |
| `mail` | `Mail` | EmailIcon |
| `message-square` | `MessageSquare` | CommentIcon |
| `minus` | `Minus` | MinusIcon, PochaMinusIcon |
| `pencil` | `Pencil` | PencilIcon |
| `plus` | `Plus` | PlusIcon, PochaPlusIcon |
| `reply` | `Reply` | ReplyIcon |
| `shopping-cart` | `ShoppingCart` | PochaCartIcon |
| `thumbs-up` | `ThumbsUp` | LikeIcon (fill variant dropped) |
| `ticket` | `Ticket` | TicketIcon |
| `trash-2` | `Trash2` | TrashcanIcon, PochaTrashIcon |
| `x` | `X` | CrossIcon, PochaCloseIcon |

---

## Session End Checklist

Before marking Step 1 done in `docs/TODO.md`:

1. `pnpm build` passes from monorepo root
2. `pnpm typecheck` passes
3. All old named icon files are deleted
4. `react-icons` is removed from `packages/web/package.json`
5. `lucide-react` is present in `dependencies` in `packages/web/package.json`
6. `<Icon>` is exported from the package root (`import { Icon } from '@umichkisa-ds/web'` resolves)
7. `IconName`, `IconSize`, `IconProps` are exported as types
8. If brand SVGs were not available, `github` and `linkedin` are absent from registry with a TODO comment
9. Update `docs/CODEBASE.md` status tables
10. Check off Step 1 in `docs/TODO.md`
