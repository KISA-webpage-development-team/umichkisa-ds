# Icon Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the 20 named `react-icons`-based icon components with a single `<Icon name="plus" />` component backed by a static Lucide registry.

**Architecture:** A static registry maps Lucide kebab-case names to Lucide components. `<Icon>` looks up the name, forwards `size` as a pixel value, and handles `aria-hidden`/`aria-label` automatically. Brand icons (github, linkedin) use custom SVG components in a `custom/` subfolder — their SVG paths must be supplied by the user before those registry entries can be written.

**Tech Stack:** `lucide-react` (direct dep), React, TypeScript, Vitest + Testing Library (jsdom), tsup

---

## Pre-flight

Read the spec before starting:
- `docs/specs/icon-implementation.md` — decisions, API, registry contents, session end checklist

The existing icon folder is at:
`packages/web/src/components/icon/`

All commands run from the **monorepo root** (`/Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds`)
unless stated otherwise. The package filter flag is `--filter @umichkisa-ds/web`.

Test file lives at: `packages/web/tests/components/icon/Icon.test.tsx`
Run tests: `pnpm --filter @umichkisa-ds/web test`
Typecheck: `pnpm --filter @umichkisa-ds/web typecheck`
Build: `pnpm --filter @umichkisa-ds/web build`

---

## Task 1: Swap dependencies

**Files:**
- Modify: `packages/web/package.json`

**Step 1: Remove `react-icons`, add `lucide-react`**

In `packages/web/package.json`, under `"dependencies"`:
- Remove: `"react-icons": "^5.4.0"`
- Add: `"lucide-react": "^0.475.0"` (verify latest stable on npmjs.com at session time)

**Step 2: Install**

```bash
pnpm install
```

Expected: lockfile updated, `node_modules/lucide-react` present, `react-icons` absent.

**Step 3: Verify lucide-react is importable**

```bash
node -e "require('./packages/web/node_modules/lucide-react')" 2>&1 | head -5
```

Expected: no error, or a harmless ESM warning. If a hard error, check the version and re-install.

**Step 4: Commit**

```bash
git add packages/web/package.json pnpm-lock.yaml
git commit -m "chore(icon): swap react-icons for lucide-react"
```

---

## Task 2: Write the failing test

**Files:**
- Create: `packages/web/tests/components/icon/Icon.test.tsx`

**Step 1: Create the test file**

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Icon } from "@/components/icon/Icon";
import type { IconSize } from "@/components/icon/types";

describe("Icon", () => {
  it("renders an svg element", () => {
    const { container } = render(<Icon name="plus" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("defaults to md size (20px)", () => {
    const { container } = render(<Icon name="plus" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "20");
    expect(svg).toHaveAttribute("height", "20");
  });

  it("applies correct pixel size for each size step", () => {
    const cases: [IconSize, number][] = [
      ["xs", 12],
      ["sm", 16],
      ["md", 20],
      ["lg", 24],
      ["xl", 32],
    ];
    for (const [size, px] of cases) {
      const { container } = render(<Icon name="plus" size={size} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", String(px));
      expect(svg).toHaveAttribute("height", String(px));
      container.innerHTML = "";
    }
  });

  it("sets aria-hidden=true when no label is provided", () => {
    const { container } = render(<Icon name="plus" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("sets aria-label and omits aria-hidden when label is provided", () => {
    const { container } = render(<Icon name="plus" label="Add item" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-label", "Add item");
    expect(svg).not.toHaveAttribute("aria-hidden");
  });

  it("passes className through to the svg element", () => {
    const { container } = render(<Icon name="plus" className="flex-shrink-0" />);
    expect(container.querySelector("svg")).toHaveClass("flex-shrink-0");
  });
});
```

**Step 2: Run tests — verify they fail**

```bash
pnpm --filter @umichkisa-ds/web test
```

Expected: all 6 tests FAIL with `Cannot find module '@/components/icon/Icon'` or similar.
If they pass, something is wrong — do not proceed.

**Step 3: Commit the failing test**

```bash
git add packages/web/tests/components/icon/Icon.test.tsx
git commit -m "test(icon): write failing tests for <Icon> component"
```

---

## Task 3: Write `types.ts`

**Files:**
- Create: `packages/web/src/components/icon/types.ts`

**Step 1: Create the file**

```ts
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

// IconName is the union of all keys in the registry.
// It is defined here as a forward-reference type; the actual derivation
// happens in registry.ts which exports `registry`. Icon.tsx imports both.
// Consumers import IconName from this package's index.
export type IconName = string; // Temporary — narrowed to keyof typeof registry after registry exists.

export interface IconProps {
  name: IconName;
  size?: IconSize;
  label?: string;
  className?: string;
}
```

> **Note:** `IconName` starts as `string` so the types file compiles before the registry exists.
> It will be replaced with `keyof typeof registry` in Task 5 once the registry is written.

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/web typecheck
```

Expected: no errors related to `types.ts`. (Other errors may exist — ignore them for now.)

---

## Task 4: Write `registry.ts` (Lucide icons only — no brand icons yet)

**Files:**
- Create: `packages/web/src/components/icon/registry.ts`

**Step 1: Create the file**

```ts
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  CircleMinus,
  CirclePlus,
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
} from "lucide-react";

export const registry = {
  "arrow-left":     ArrowLeft,
  "arrow-right":    ArrowRight,
  "chevron-right":  ChevronRight,
  "chevron-down":   ChevronDown,
  "circle-minus":   CircleMinus,
  "circle-plus":    CirclePlus,
  "clock-9":        Clock9,
  "external-link":  ExternalLink,
  "eye":            Eye,
  "graduation-cap": GraduationCap,
  "list":           List,
  "lock":           Lock,
  "mail":           Mail,
  "message-square": MessageSquare,
  "minus":          Minus,
  "pencil":         Pencil,
  "plus":           Plus,
  "reply":          Reply,
  "shopping-cart":  ShoppingCart,
  "thumbs-up":      ThumbsUp,
  "ticket":         Ticket,
  "trash-2":        Trash2,
  "x":              X,
  // TODO: add "github" and "linkedin" once user provides SVG paths
} as const;

export type IconName = keyof typeof registry;
```

**Step 2: Typecheck**

```bash
pnpm --filter @umichkisa-ds/web typecheck
```

Expected: no errors in `registry.ts`. Ignore errors in other files for now.

**Step 3: If any Lucide import fails** (name doesn't exist in installed version)

Check the actual export name:
```bash
node -e "const l = require('./packages/web/node_modules/lucide-react'); console.log(Object.keys(l).filter(k => k.toLowerCase().includes('clock')))"
```

Adjust the import name to match. Lucide uses PascalCase exports (`Clock9`, not `Clock`).

---

## Task 5: Write `Icon.tsx` and fix `IconName` type

**Files:**
- Create: `packages/web/src/components/icon/Icon.tsx`
- Modify: `packages/web/src/components/icon/types.ts`

**Step 1: Update `IconName` in `types.ts` to use the registry**

Replace the `IconName` line:

```ts
import type { IconName as RegistryIconName } from "./registry";
export type { RegistryIconName as IconName };
```

Remove the old `export type IconName = string;` line.
Remove `IconName` from the `IconProps` import and use `RegistryIconName`:

Final `types.ts`:

```ts
import type { IconName } from "./registry";

export type { IconName };

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  label?: string;
  className?: string;
}
```

**Step 2: Create `Icon.tsx`**

```tsx
import React from "react";
import type { LucideProps } from "lucide-react";
import { registry } from "./registry";
import type { IconProps, IconSize } from "./types";

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export function Icon({ name, size = "md", label, className }: IconProps) {
  const LucideComponent = registry[name] as React.ComponentType<LucideProps>;
  const px = sizeMap[size];

  if (label) {
    return (
      <LucideComponent
        size={px}
        className={className}
        aria-label={label}
      />
    );
  }

  return (
    <LucideComponent
      size={px}
      className={className}
      aria-hidden="true"
    />
  );
}
```

> **Note on the cast:** `registry[name] as React.ComponentType<LucideProps>` is needed because
> TypeScript infers each registry value as a specific component type, and the union of all of them
> is not directly assignable to JSX element type without the cast. This is safe — every value in
> the registry is a valid Lucide component that accepts `LucideProps`.

**Step 3: Run tests — verify they pass**

```bash
pnpm --filter @umichkisa-ds/web test
```

Expected: all 6 tests PASS.

If any test fails with a size mismatch: Lucide may render `width`/`height` as strings or numbers
differently across versions. Check with:
```bash
node -e "
const React = require('react');
const { renderToString } = require('react-dom/server');
const { Plus } = require('./packages/web/node_modules/lucide-react');
console.log(renderToString(React.createElement(Plus, { size: 20 })));
"
```
Adjust the test assertions to match actual attribute format if needed.

**Step 4: Typecheck**

```bash
pnpm --filter @umichkisa-ds/web typecheck
```

Expected: zero errors. If errors remain, they likely come from old icon files still importing
`react-icons` — those will be cleaned up in Task 7.

**Step 5: Commit**

```bash
git add packages/web/src/components/icon/types.ts \
        packages/web/src/components/icon/registry.ts \
        packages/web/src/components/icon/Icon.tsx
git commit -m "feat(icon): implement <Icon> component with static Lucide registry"
```

---

## Task 6: Handle brand icons (github, linkedin)

**Files:**
- Create: `packages/web/src/components/icon/custom/GithubIcon.tsx`
- Create: `packages/web/src/components/icon/custom/LinkedinIcon.tsx`
- Modify: `packages/web/src/components/icon/registry.ts`

**Step 1: Ask the user for SVG paths**

Stop and ask: "Please provide the GitHub SVG and LinkedIn SVG. You can paste the raw `<svg>` markup."

**Step 2: For each SVG provided, create a custom icon component**

Template (replace `<path .../>` with the actual path data from the provided SVG):

```tsx
// packages/web/src/components/icon/custom/GithubIcon.tsx
import React from "react";
import type { LucideProps } from "lucide-react";

export function GithubIcon({ size = 24, className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      {/* paste path elements here */}
    </svg>
  );
}
```

Adaptation rules for the user-supplied SVG:
- Set `viewBox="0 0 24 24"` (rescale if original is different)
- Replace `fill="black"` / `fill="#000"` / any hardcoded color with `fill="currentColor"`
- If the icon is stroke-based: use `stroke="currentColor"`, `fill="none"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"` instead
- Strip `width` and `height` attributes from the `<svg>` tag (we set them via `size` prop)
- Strip any `class` or `style` attributes from the `<svg>` tag

**Step 3: Add brand icons to registry**

In `registry.ts`, add after the last entry and remove the TODO comment:

```ts
import { GithubIcon } from "./custom/GithubIcon";
import { LinkedinIcon } from "./custom/LinkedinIcon";

export const registry = {
  // ... existing entries ...
  "github":   GithubIcon,
  "linkedin": LinkedinIcon,
} as const;
```

**Step 4: Run tests and typecheck**

```bash
pnpm --filter @umichkisa-ds/web test
pnpm --filter @umichkisa-ds/web typecheck
```

Expected: all tests pass, no type errors.

**Step 5: Commit**

```bash
git add packages/web/src/components/icon/custom/ \
        packages/web/src/components/icon/registry.ts
git commit -m "feat(icon): add github and linkedin custom SVG icons to registry"
```

> **If brand SVGs are not available this session:** skip Task 6 entirely. The TODO comment in the
> registry documents the gap. Add a separate TODO item to `docs/TODO.md` to revisit.

---

## Task 7: Delete old icon files

**Files:**
- Delete: everything listed below

**Step 1: Delete all named icon components and the old base helper**

```bash
rm packages/web/src/components/icon/BackIcon.tsx
rm packages/web/src/components/icon/ClockIcon.tsx
rm packages/web/src/components/icon/CommentIcon.tsx
rm packages/web/src/components/icon/CrossIcon.tsx
rm packages/web/src/components/icon/EmailIcon.tsx
rm packages/web/src/components/icon/GitIcon.tsx
rm packages/web/src/components/icon/GradIcon.tsx
rm packages/web/src/components/icon/LikeIcon.tsx
rm packages/web/src/components/icon/LinkedInIcon.tsx
rm packages/web/src/components/icon/ListIcon.tsx
rm packages/web/src/components/icon/MinusIcon.tsx
rm packages/web/src/components/icon/PencilIcon.tsx
rm packages/web/src/components/icon/PlusIcon.tsx
rm packages/web/src/components/icon/ReplyIcon.tsx
rm packages/web/src/components/icon/RightArrowIcon.tsx
rm packages/web/src/components/icon/SecretIcon.tsx
rm packages/web/src/components/icon/TicketIcon.tsx
rm packages/web/src/components/icon/TrashcanIcon.tsx
rm packages/web/src/components/icon/ViewIcon.tsx
rm packages/web/src/components/icon/icon.css
```

Also delete the old `Icon.tsx` (the one with `iconClass` / `IconBaseProps` — now replaced by the new `Icon.tsx`):

> **Wait** — the new `Icon.tsx` was created in Task 5 and already occupies `Icon.tsx`. The old
> `Icon.tsx` was overwritten when we created the new one. Confirm the new file is in place before
> deleting anything:

```bash
head -5 packages/web/src/components/icon/Icon.tsx
```

Expected: first line is `import React from "react";` (the new implementation).
If you see `export function iconClass` instead, you wrote to the wrong file in Task 5 — fix that first.

**Step 2: Replace `index.ts`**

Overwrite `packages/web/src/components/icon/index.ts` with:

```ts
export { Icon } from "./Icon";
export type { IconName, IconSize, IconProps } from "./types";
```

**Step 3: Remove the `icon.css` import from the styles bundle**

Check if `icon.css` is imported anywhere in the styles:

```bash
grep -r "icon.css" packages/web/src/
```

If found, remove that import line from the file that imports it.

**Step 4: Run tests**

```bash
pnpm --filter @umichkisa-ds/web test
```

Expected: all 6 tests still pass.

**Step 5: Typecheck**

```bash
pnpm --filter @umichkisa-ds/web typecheck
```

Expected: zero errors. All old named component types are gone — no dangling references.
If errors appear, grep for any remaining `react-icons` references:

```bash
grep -r "react-icons" packages/web/src/
```

Fix any remaining imports.

**Step 6: Commit**

```bash
git add -A packages/web/src/components/icon/
git commit -m "chore(icon): delete named icon components and old icon.css"
```

---

## Task 8: Build verification

**Step 1: Full build**

```bash
pnpm --filter @umichkisa-ds/web build
```

Expected: exits 0. `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts` all regenerated.

**Step 2: Verify `Icon` is exported from the dist**

```bash
node -e "const d = require('./packages/web/dist/index.cjs'); console.log(typeof d.Icon)"
```

Expected: `function`

**Step 3: Verify `react-icons` is not in the bundle**

```bash
grep -l "react-icons" packages/web/dist/index.js packages/web/dist/index.cjs 2>/dev/null | wc -l
```

Expected: `0` (no matches)

**Step 4: Commit**

```bash
git add packages/web/dist/
git commit -m "build(icon): ship <Icon> component with lucide-react registry"
```

---

## Task 9: Session end checklist

Work through `docs/specs/icon-implementation.md` → **Session End Checklist** item by item.

Then:

**Step 1: Update `docs/CODEBASE.md`**

Update any status tables that reference the icon system to reflect the new implementation.

**Step 2: Check off TODO**

In `docs/TODO.md`, mark Step 1 done:

```markdown
- [x] Step 1 — Icon Implementation
```

**Step 3: Final commit**

```bash
git add docs/TODO.md docs/CODEBASE.md
git commit -m "chore: mark Step 1 (Icon Implementation) complete"
```
