# /foundation/iconography/library Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `ds-constrained-execution` to implement this plan. Read `docs/DS_CONSTRAINTS.md` before touching `.tsx` and run a DS review pass after each task.

**Goal:** Apply all 6 findings from the `/foundation/iconography/library` review.

**Architecture:** Single-page edit. All changes live in `apps/docs/app/foundation/iconography/library/page.tsx`. One task per finding. Single commit per task. No DS_CONSTRAINTS edits in this fix — those are flagged as a follow-up note at the end.

**Tech Stack:** Next.js 15 App Router, TSX, Tailwind v4, `@umichkisa-ds/web` components.

**Source of findings:** `docs/reviews/docs-app-review.md` § `/foundation/iconography/library`.

**Page file:** `apps/docs/app/foundation/iconography/library/page.tsx` (160 lines).

---

## Task 1: Drop redundant `font-sejong-bold tracking-tight` from H1 (Fix #2)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/library/page.tsx:8`

**Step 1: Verify `type-h1` bakes in font + tracking**

Run: `grep -n "type-h1" packages/web/src/styles/typography.css 2>/dev/null || grep -rn "type-h1" packages/web/src/ | head`

Expected: `type-h1` resolves to a class that already applies `font-sejong-bold` (or equivalent `font-family`) and `tracking-tight`. If not, **stop and ask** — Finding #2 may need to be dropped.

**Step 2: Edit line 8**

Change:
```tsx
<h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Icon Library</h1>
```
To:
```tsx
<h1 className="type-h1 mb-4 text-foreground">Icon Library</h1>
```

**Step 3: Visual verify in browser**

Open `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/iconography/library`. H1 should render identically — same font (Sejong Bold), same tracking, same size.

**Step 4: Commit**

```bash
git add apps/docs/app/foundation/iconography/library/page.tsx
git commit -m "fix(docs): drop redundant H1 utilities on iconography/library"
```

---

## Task 2: Drop `font-semibold text-foreground` from `<strong>` elements (Fix #1)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/library/page.tsx` (8 instances on lines 19, 23, 27, 31, 35, 89, 103, 107)

**Step 1: Replace all 8 occurrences**

Change every:
```tsx
<strong className="font-semibold text-foreground">…</strong>
```
To:
```tsx
<strong>…</strong>
```

Use Edit tool with `replace_all: true` on the exact string `<strong className="font-semibold text-foreground">` → `<strong>`.

**Step 2: Visual verify in browser**

Reload the page. Each `<strong>` (e.g., "Single stroke weight.", "react-icons", "Emoji as icons") must still render bold. If any reverts to regular weight, the `type-body` parent is overriding `<strong>`'s default — in that case, restore them as `<strong className="!font-semibold">` (with the `!` important, per memory note about `type-*` weight overrides).

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/iconography/library/page.tsx
git commit -m "fix(docs): remove redundant weight utilities on <strong> in iconography/library"
```

---

## Task 3: Add `hover:text-brand-primary` to lucide.dev link (Fix #3)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/library/page.tsx:45`

**Step 1: Edit line 45**

Change:
```tsx
<a href="https://lucide.dev" className="text-link underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">lucide.dev</a>
```
To:
```tsx
<a href="https://lucide.dev" className="text-link underline-offset-2 hover:underline hover:text-brand-primary" target="_blank" rel="noopener noreferrer">lucide.dev</a>
```

**Step 2: Visual verify**

Hover the lucide.dev link. Color should shift to navy (brand-primary), underline appears.

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/iconography/library/page.tsx
git commit -m "fix(docs): add hover:text-brand-primary to lucide link"
```

---

## Task 4: Convert "What We Don't Use" to DoDont (Fix #4)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/library/page.tsx:86-109`

**Step 1: Locate `DoDont` import**

Run: `grep -rn "DoDont" apps/docs/components/ apps/docs/app/foundation/colors/usage/ apps/docs/app/foundation/typography/usage/ | head`

Confirm import path (likely `@/components/DoDont`) and component API. Read one existing usage to copy the prop shape.

**Step 2: Replace lines 86-109**

Replace the entire "What We Don't Use" block (the `<h2>` plus three `<p>` paragraphs) with a `DoDont` containing three "don't" items:

```tsx
{/* ── What We Don't Use ───────────────────────────────── */}
<h2 className="type-h2 mt-8 mb-4 text-foreground">What We Don{"'"}t Use</h2>
<DoDont
  donts={[
    {
      title: 'react-icons',
      description: 'The previous KISA client mixed react-icons/md, /fa, /ai, and /lu — each with its own stroke weight and visual language. Mixing them is the inconsistency this system replaces.',
    },
    {
      title: 'Emoji as icons',
      description: 'Emoji rendering varies across operating systems, browsers, and screen readers. They are not design elements.',
    },
    {
      title: 'PNG or JPG icons',
      description: 'Raster icons cannot scale cleanly and cannot inherit color from CSS. All icons in the system are SVG.',
    },
  ]}
/>
```

(Adjust prop names to match the actual `DoDont` API found in Step 1.)

Add `import { DoDont } from '@/components/DoDont'` (or correct path) at the top of the file if not present.

**Step 3: Visual verify**

Reload. Section should render as a DoDont visual block matching other foundation pages that use it.

**Step 4: Commit**

```bash
git add apps/docs/app/foundation/iconography/library/page.tsx
git commit -m "fix(docs): convert 'What We Don't Use' to DoDont in iconography/library"
```

---

## Task 5: Consolidate "Naming Convention" section (Fix #5)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/library/page.tsx:60-82`

**Step 1: Rewrite the section**

Replace lines 60-82 with:

```tsx
{/* ── Naming Convention ───────────────────────────────── */}
<h2 className="type-h2 mt-8 mb-4 text-foreground">Naming Convention</h2>
<p className="type-body mb-4 text-foreground max-w-prose">
  Lucide uses kebab-case names:{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">arrow-right</code>,{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">chevron-down</code>,{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">alert-triangle</code>.
  {' '}Pass the exact kebab-case name to the{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
  component as a string — never translate to camelCase or PascalCase. The component resolves the string at runtime against{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lucide.dev</code>.
</p>

<CodeBlock code={`<Icon name="arrow-right" />
<Icon name="chevron-down" />
<Icon name="alert-triangle" />`} lang="tsx" />
```

This drops the closing paragraph (old lines 76-82) and folds its only unique content ("never translate to camelCase/PascalCase" + the lucide.dev mention) into the opening paragraph.

**Step 2: Visual verify**

Reload. Naming Convention section should have one paragraph + one CodeBlock, no trailing duplicate paragraph.

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/iconography/library/page.tsx
git commit -m "fix(docs): consolidate Naming Convention section in iconography/library"
```

---

## Task 6: Rewrite "Custom Icons" section — contact DS owner (Fix #6)

**Files:**
- Modify: `apps/docs/app/foundation/iconography/library/page.tsx:113-156`

**Step 1: Rewrite the section**

Replace lines 113-156 with:

```tsx
{/* ── Custom Icons ────────────────────────────────────── */}
<h2 className="type-h2 mt-8 mb-4 text-foreground">Custom Icons</h2>
<p className="type-body mb-4 text-foreground max-w-prose">
  If you need an icon Lucide does not have, do not inline an SVG in your component. Contact the design system project owner. New custom icons are registered inside the{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
  system the same way as the existing{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">github</code>{' '}
  and{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">linkedin</code>{' '}
  brand icons, then consumed everywhere via{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon name="..." />'}</code>.
  This keeps every icon in the app — Lucide and custom — going through one consistent API.
</p>

<p className="type-body mb-4 text-foreground max-w-prose">
  Before reaching out, exhaust the Lucide search. Try several keywords and synonyms. Custom icons are exceptions, not alternatives.
</p>

<p className="type-body mb-4 text-foreground max-w-prose">
  When the DS owner registers a stroke-based custom icon, it must match Lucide{"'"}s visual language exactly:
</p>
<ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
  <li className="flex gap-2">
    <span className="text-muted-foreground">&bull;</span>
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">viewBox=&quot;0 0 24 24&quot;</code>
  </li>
  <li className="flex gap-2">
    <span className="text-muted-foreground">&bull;</span>
    <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">stroke-width=&quot;2&quot;</code>
  </li>
  <li className="flex gap-2">
    <span className="text-muted-foreground">&bull;</span>
    <span>
      <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">stroke=&quot;currentColor&quot;</code>,{' '}
      <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">fill=&quot;none&quot;</code>
    </span>
  </li>
  <li className="flex gap-2">
    <span className="text-muted-foreground">&bull;</span>
    <span>
      <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">stroke-linecap=&quot;round&quot;</code>,{' '}
      <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">stroke-linejoin=&quot;round&quot;</code>
    </span>
  </li>
</ul>
<p className="type-body mb-4 text-foreground max-w-prose">
  Brand icons (like{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">github</code>{' '}
  and{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">linkedin</code>) are an exception — they are registered as fill-based SVGs with their original viewBox. Complex illustrations are not icons at all and should not go through the{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Icon>'}</code>{' '}
  system.
</p>
```

**Step 2: Visual verify**

Reload. Custom Icons section now reads as: contact DS owner → exhaust Lucide first → spec list (criteria for the DS owner) → brand icon exception note.

**Step 3: Commit**

```bash
git add apps/docs/app/foundation/iconography/library/page.tsx
git commit -m "fix(docs): rewrite Custom Icons section to route through DS owner"
```

---

## Task 7: Verify build + check off TODO

**Step 1: Build + typecheck**

Run:
```bash
pnpm --filter @umichkisa-ds/docs build 2>&1 | tail -20
pnpm typecheck 2>&1 | tail -20
```

Both must pass with no errors.

**Step 2: Final visual sanity check**

Reload `https://vnw20xbg-3000.asse.devtunnels.ms/foundation/iconography/library` at 1280px. Walk top to bottom. Confirm:
- H1 renders Sejong Bold
- All `<strong>` text renders bold
- lucide.dev link hovers to navy
- "What We Don't Use" is now a DoDont
- "Naming Convention" has no trailing duplicate paragraph
- "Custom Icons" leads with "contact the design system project owner"

**Step 3: Update `docs/CODEBASE.md` if needed**

If `docs/CODEBASE.md` tracks docs page status, update the iconography/library row.

**Step 4: Check off TODO**

In `docs/TODO.md` § Batch 5 — Iconography:
- Check off `- [ ] Review /foundation/iconography/library`
- Check off `- [ ] Fix /foundation/iconography/library`

**Step 5: Final commit**

```bash
git add docs/TODO.md docs/CODEBASE.md 2>/dev/null
git commit -m "chore(todo): check off iconography/library review + fix"
```

---

## Task 8: Update DS_CONSTRAINTS.md to match new Custom Icons policy

**Files:**
- Modify: `docs/DS_CONSTRAINTS.md` § Iconography → Custom Icons

**Step 1: Locate the current rules**

In `docs/DS_CONSTRAINTS.md` under `### Custom Icons`, the current `Must:` rule says custom SVGs that "replace missing Lucide icons" must match Lucide's visual language. This implies devs inline them — which Fix #6 forbids.

**Step 2: Rewrite the section**

Replace the existing `### Custom Icons` block with:

```markdown
### Custom Icons

Must: Custom icons that aren't in Lucide must be added to the `<Icon>` registry by the design system project owner — never inlined as raw SVGs in component code. Devs request additions; consumption is always `<Icon name="..." />`. [source:foundation/iconography/library]
Must: Stroke-based custom icons registered in the `<Icon>` system must match Lucide's visual language exactly: `viewBox="0 0 24 24"`, `stroke-width="2"`, `stroke="currentColor"`, `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`. [source:foundation/iconography/library]
Exception: Brand icons (e.g., GitHub, LinkedIn) are registered in the `<Icon>` system as fill-based SVGs with their original viewBox. They do not need to match Lucide's stroke style. [source:implementation/icon]
Never: Put complex illustrations through the `<Icon>` system — use `<img>` or an inline SVG component instead. Simple brand logos are permitted. [source:foundation/iconography/library]
```

**Step 3: Commit**

```bash
git add docs/DS_CONSTRAINTS.md
git commit -m "docs(ds-constraints): route custom icons through DS owner registration"
```
