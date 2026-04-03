# Batch 6.6 — Docs Pages Consistency Refactor

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make every docs page structurally and visually consistent — replace raw article wrappers with `<Container>`, convert foundation MDX to TSX, standardize API Reference tables, and remove dead MDX infrastructure.

**Architecture:** Four-phase refactor. Phase 1 converts foundation MDX content into inline TSX (matching component page patterns). Phase 2 replaces the `<article>` wrapper on all 36 leaf pages with `<Container size="md" as="article">`. Phase 3 standardizes API Reference table styling across all component pages. Phase 4 removes MDX packages, config, and content files.

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (Container component), Tailwind v4 with DS tokens.

---

## Decisions (from grill-me session 2026-04-03)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Container size for docs pages | `size="md"` (768px) | Matches current `max-w-3xl` (768px) |
| Semantic element | `as="article"` | Each docs page is a self-contained document |
| Extra classes (`min-w-0 overflow-hidden`) | Drop them | `min-w-0` is no-op (parent isn't flex/grid); `overflow-hidden` is unnecessary defensive CSS |
| `py-12` on component pages | Drop it | `DocsLayout` already provides `p-6 lg:p-12`; double-padding was unintentional |
| Container responsive padding differs from fixed `px-6` | Acceptable | Better UX (tighter on mobile, more inset on desktop) |
| Foundation MDX files | Convert to inline TSX | Eliminates two styling systems; MDX provided minimal value since content was JSX-heavy |
| MDX infrastructure | Remove entirely | `@next/mdx`, `@mdx-js/*`, `rehype-pretty-code`, `remark-gfm`, `shiki`, `@types/mdx` |
| API table gold standard | Container page pattern | No `uppercase` in `th`; prop/type/default cells wrapped in `<code>` with `bg-surface-subtle` |
| Syntax highlighting loss | Accept for now | Component pages already have none; future `CodeBlock` component will address this |
| Scope | 36 leaf pages only | Skip homepage, category index pages, redirect pages |

---

## Reference: Styling Patterns

### Container wrapper (target for all 36 pages)

```tsx
import { Container } from '@umichkisa-ds/web'

<Container size="md" as="article">
  {/* page content */}
</Container>
```

### DS type tokens (target for foundation TSX conversion)

| Element | Classes |
|---------|---------|
| Page title (h1) | `type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground` |
| Section heading (h2) | `type-h2 mt-8 mb-4 text-foreground` |
| Subsection heading (h3) | `type-h3 mt-6 mb-2 text-foreground` |
| Body paragraph | `type-body mb-4 text-foreground max-w-prose` |
| Small body text | `type-body-sm text-foreground max-w-prose` |
| Inline code | `rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground` |
| Blockquote | `border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r` with `italic text-muted-foreground` inner span |
| Unordered list | `type-body text-foreground max-w-prose flex flex-col gap-2` |
| Ordered list | `type-body text-foreground max-w-prose flex flex-col gap-2` |
| List item | Wrap in `<li>` with `flex gap-2`, bullet as `<span className="text-muted-foreground">` |
| Horizontal rule | `my-8 border-0 border-t border-border` |
| Link | `text-link underline-offset-2 hover:underline` |

### API Reference table — gold standard (Container page pattern)

```tsx
<div className="my-6 overflow-x-auto">
  <table className="w-full border-collapse border border-border">
    <thead className="bg-surface-subtle">
      <tr>
        <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
        <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
        <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
        <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border">
        <td className="px-4 py-3 text-foreground">
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">propName</code>
        </td>
        <td className="px-4 py-3 text-foreground">
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">"a" | "b"</code>
        </td>
        <td className="px-4 py-3 text-foreground">
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">"a"</code>
        </td>
        <td className="px-4 py-3 type-body-sm text-foreground">Description text.</td>
      </tr>
    </tbody>
  </table>
</div>
```

Note: For cells where the default is "none" / empty, use: `<td className="px-4 py-3 type-body-sm text-foreground">—</td>`

---

## Phase 1: Foundation MDX → TSX Conversion

Convert all 18 foundation content files from MDX (in `apps/docs/content/`) to inline TSX in the corresponding `page.tsx` files. Each page should follow the same structure as component pages: DS type tokens for all text elements, explicit imports for any custom components.

### Task 1.1: Colors section (5 pages)

**Files to modify:**
- `apps/docs/app/foundation/colors/overview/page.tsx` (content from `apps/docs/content/foundation/colors/overview.mdx`)
- `apps/docs/app/foundation/colors/primitives/page.tsx` (content from `apps/docs/content/foundation/colors/primitives.mdx`)
- `apps/docs/app/foundation/colors/tokens/page.tsx` (content from `apps/docs/content/foundation/colors/tokens.mdx`)
- `apps/docs/app/foundation/colors/usage/page.tsx` (content from `apps/docs/content/foundation/colors/usage.mdx`)
- `apps/docs/app/foundation/colors/accessibility/page.tsx` (content from `apps/docs/content/foundation/colors/accessibility.mdx`)

**Steps:**
1. Read the MDX content file
2. Replace `import Content from '@/content/...'` + `<Content />` with inline TSX
3. Convert all markdown elements to JSX using the DS type token reference above
4. For custom components used in MDX (`ColorSwatch`, `ColorSwatchGrid`, `ContrastTable`, `Callout`, `DoDont`/`Do`/`Dont`), add explicit imports from `@/components/`
5. For embedded JSX blocks (e.g., the 3-tier color diagram in overview), preserve the JSX as-is but audit for hardcoded colors — replace raw hex/Tailwind colors with DS tokens where possible
6. For markdown tables, convert to the HTML table pattern from the reference section
7. For code blocks, use `<pre className="overflow-x-auto max-w-full"><code>...</code></pre>` (no syntax highlighting for now)
8. Verify: `pnpm typecheck`

### Task 1.2: Typography section (4 pages)

**Files to modify:**
- `apps/docs/app/foundation/typography/overview/page.tsx` (from `overview.mdx`)
- `apps/docs/app/foundation/typography/fonts/page.tsx` (from `fonts.mdx`)
- `apps/docs/app/foundation/typography/scale/page.tsx` (from `scale.mdx`)
- `apps/docs/app/foundation/typography/usage/page.tsx` (from `usage.mdx`)

**Steps:** Same as Task 1.1. Note: `scale.mdx` has a `.map()` block rendering typography samples — preserve inline.

### Task 1.3: Iconography section (5 pages)

**Files to modify:**
- `apps/docs/app/foundation/iconography/overview/page.tsx` (from `overview.mdx`)
- `apps/docs/app/foundation/iconography/library/page.tsx` (from `library.mdx`)
- `apps/docs/app/foundation/iconography/sizes/page.tsx` (from `sizes.mdx`)
- `apps/docs/app/foundation/iconography/usage/page.tsx` (from `usage.mdx`)
- `apps/docs/app/foundation/iconography/accessibility/page.tsx` (from `accessibility.mdx`)

**Steps:** Same as Task 1.1. Low-to-medium complexity — mostly text content.

### Task 1.4: Layout section (4 pages)

**Files to modify:**
- `apps/docs/app/foundation/layout/overview/page.tsx` (from `overview.mdx`)
- `apps/docs/app/foundation/layout/breakpoints/page.tsx` (from `breakpoints.mdx`)
- `apps/docs/app/foundation/layout/spacing/page.tsx` (from `spacing.mdx`)
- `apps/docs/app/foundation/layout/usage/page.tsx` (from `usage.mdx`)

**Steps:** Same as Task 1.1. Note: `spacing.mdx` has 3 interactive `.map()` blocks with data arrays — preserve inline. High complexity page.

### Task 1.5: Verify Phase 1

**Run:**
```bash
pnpm typecheck
pnpm build
```

Both must pass. Visually spot-check 2-3 foundation pages in dev mode to confirm content renders correctly.

**Commit:**
```bash
git add apps/docs/app/foundation/
git commit -m "refactor(docs): convert foundation MDX content to inline TSX with DS type tokens"
```

---

## Phase 2: Container Refactor

Replace `<article className="mx-auto max-w-3xl px-6 [py-12] min-w-0 overflow-hidden">` with `<Container size="md" as="article">` on all 36 leaf pages.

### Task 2.1: Foundation pages (18 pages)

**Files:** All `page.tsx` files under `apps/docs/app/foundation/` (colors/5, typography/4, iconography/5, layout/4).

**Steps:**
1. Add `import { Container } from '@umichkisa-ds/web'` (merge with existing import if present)
2. Replace `<article className="mx-auto max-w-3xl px-6 min-w-0 overflow-hidden">` with `<Container size="md" as="article">`
3. Replace closing `</article>` with `</Container>`
4. Remove the `Content` import line (already removed in Phase 1, but verify)

### Task 2.2: Component pages (18 pages)

**Files:** All `page.tsx` files under `apps/docs/app/components/` — avatar, badge, button, checkbox, container, divider, form-item, forms, grid, icon, icon-button, input, label, link-button, radio, select, switch, textarea.

**Steps:**
1. Add `Container` to the existing `import { ... } from '@umichkisa-ds/web'` line
2. Replace `<article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">` with `<Container size="md" as="article">`
3. Replace closing `</article>` with `</Container>`

### Task 2.3: Verify Phase 2

**Run:**
```bash
pnpm typecheck
pnpm build
```

**Commit:**
```bash
git add apps/docs/app/
git commit -m "refactor(docs): replace article wrappers with Container size=md as=article"
```

---

## Phase 3: API Reference Table Standardization

Update 15 component pages from Pattern A (old) to Pattern B (Container page gold standard).

### Pages to update (Pattern A → B):

| # | Component | File |
|---|-----------|------|
| 1 | Avatar | `apps/docs/app/components/avatar/page.tsx` |
| 2 | Badge | `apps/docs/app/components/badge/page.tsx` |
| 3 | Button | `apps/docs/app/components/button/page.tsx` |
| 4 | Checkbox | `apps/docs/app/components/checkbox/page.tsx` |
| 5 | Divider | `apps/docs/app/components/divider/page.tsx` |
| 6 | FormItem | `apps/docs/app/components/form-item/page.tsx` |
| 7 | Grid | `apps/docs/app/components/grid/page.tsx` |
| 8 | Icon | `apps/docs/app/components/icon/page.tsx` |
| 9 | IconButton | `apps/docs/app/components/icon-button/page.tsx` |
| 10 | Input | `apps/docs/app/components/input/page.tsx` |
| 11 | Label | `apps/docs/app/components/label/page.tsx` |
| 12 | Radio | `apps/docs/app/components/radio/page.tsx` |
| 13 | Select | `apps/docs/app/components/select/page.tsx` |
| 14 | Switch | `apps/docs/app/components/switch/page.tsx` |
| 15 | Textarea | `apps/docs/app/components/textarea/page.tsx` |

**Already correct (skip):** Container, LinkButton
**No API table (skip):** Forms

### Task 3.1: Update all 15 tables

For each page, apply these changes to the API Reference `<table>`:

**`<th>` changes:**
- Remove `uppercase` from className
- Keep: `px-4 py-3 text-left type-caption border-b border-border text-muted-foreground`

**`<td>` changes for Prop, Type, Default columns:**
- Old: `<td className="px-4 py-3 type-caption font-mono text-foreground">propName</td>`
- New: `<td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">propName</code></td>`

**`<td>` for Description column:** No change needed (already `type-body-sm text-foreground`).

**Empty default cells:** Use `<td className="px-4 py-3 type-body-sm text-foreground">—</td>` (no code wrapper).

### Task 3.2: Verify Phase 3

**Run:**
```bash
pnpm typecheck
pnpm build
```

**Commit:**
```bash
git add apps/docs/app/components/
git commit -m "refactor(docs): standardize API Reference tables to Container page pattern"
```

---

## Phase 4: MDX Infrastructure Removal

### Task 4.1: Delete content files

```bash
rm -rf apps/docs/content/
rm apps/docs/mdx-components.tsx
```

### Task 4.2: Remove MDX packages

```bash
cd apps/docs
pnpm remove @mdx-js/loader @mdx-js/react @next/mdx rehype-pretty-code remark-gfm shiki
```

Also remove `@types/mdx` from devDependencies:
```bash
pnpm remove @types/mdx
```

### Task 4.3: Simplify next.config.mjs

**Before:**
```js
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const prettyCodeOptions = { theme: "github-light" };

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});

const nextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
```

**After:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

Remove `pageExtensions` entirely (default `["js", "jsx", "ts", "tsx"]` is what we want).

### Task 4.4: Verify Phase 4

**Run:**
```bash
pnpm install
pnpm typecheck
pnpm build
```

All must pass. The build should be faster without MDX compilation.

**Commit:**
```bash
git add .
git commit -m "chore(docs): remove MDX infrastructure — packages, config, content files"
```

---

## Phase 5: Final Verification & Tracking

### Task 5.1: Full build check

```bash
pnpm build
pnpm typecheck
```

### Task 5.2: Update CODEBASE.md

Update the docs app section to reflect:
- Foundation pages are now inline TSX (no longer MDX)
- All pages use `<Container size="md" as="article">` wrapper
- MDX infrastructure removed

### Task 5.3: Update TODO.md

- Check off `Batch 6.6` item
- Add future task under `Post-v1.0`:
  ```
  - [ ] CodeBlock component — syntax-highlighted code blocks for docs (replace raw <pre><code>) 
  ```

### Task 5.4: Final commit

```bash
git add docs/ apps/docs/
git commit -m "docs: update CODEBASE.md and TODO.md after batch 6.6"
```

---

## File Impact Summary

| Action | Count | Files |
|--------|-------|-------|
| Modify (TSX conversion + Container) | 18 | `apps/docs/app/foundation/**/page.tsx` |
| Modify (Container + table fix) | 15 | `apps/docs/app/components/**/page.tsx` (Pattern A pages) |
| Modify (Container only) | 2 | Container, LinkButton pages (already Pattern B) |
| Modify (Container only) | 1 | Forms page (no API table) |
| Delete | 18 | `apps/docs/content/foundation/**/*.mdx` |
| Delete | 4 | `apps/docs/content/_*.md` (planning notes) |
| Delete | 1 | `apps/docs/mdx-components.tsx` |
| Modify | 1 | `apps/docs/next.config.mjs` |
| Modify | 1 | `apps/docs/package.json` (via pnpm remove) |
| Modify | 1 | `docs/CODEBASE.md` |
| Modify | 1 | `docs/TODO.md` |
