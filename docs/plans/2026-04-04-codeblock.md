# CodeBlock Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add syntax-highlighted code blocks to the docs app, replacing all raw `<pre><code>` patterns with a CodeBlock component powered by Shiki.

**Architecture:** Server-side Shiki highlighting via a `highlight()` utility function that returns an HTML string. A `CodeBlock` server component renders standalone blocks. A thin `CodeBlockClient` client component adds copy-to-clipboard with icon swap feedback. ComponentPreview is updated to accept pre-highlighted HTML. No code ships to the client besides the small copy-button logic.

**Tech Stack:** Shiki (server-side), Next.js 15 App Router (RSC), IconButton + Icon from `@umichkisa-ds/web`

---

## Phase 1: Core Infrastructure

### Task 1: Add `clipboard-copy` and `clipboard-check` icons to the registry

We need two new icons for the copy button feedback. Lucide provides `ClipboardCopy` and `ClipboardCheck`.

**Files:**
- Modify: `packages/web/src/components/icon/registry.ts`

**Step 1: Add icons to registry**

Add `ClipboardCopy` and `ClipboardCheck` to the import and registry:

```ts
// Add to imports (alphabetical):
import {
  // ... existing imports ...
  ClipboardCheck,
  ClipboardCopy,
  // ...
} from "lucide-react";

// Add to registry (alphabetical):
export const registry = {
  // ... existing entries ...
  "clipboard-check": ClipboardCheck,
  "clipboard-copy": ClipboardCopy,
  // ...
} as const;
```

**Step 2: Verify build**

Run: `pnpm --filter @umichkisa-ds/web build`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add packages/web/src/components/icon/registry.ts
git commit -m "feat(icon): add clipboard-copy and clipboard-check icons"
```

---

### Task 2: Install Shiki in docs app

**Files:**
- Modify: `apps/docs/package.json`

**Step 1: Install shiki**

Run: `pnpm --filter @umichkisa-ds/docs add shiki`

**Step 2: Verify install**

Run: `pnpm --filter @umichkisa-ds/docs build`
Expected: SUCCESS (no usage yet, just verifying dependency resolution)

**Step 3: Commit**

```bash
git add apps/docs/package.json pnpm-lock.yaml
git commit -m "chore(docs): add shiki dependency"
```

---

### Task 3: Create the `highlight()` utility

A server-only module that lazily initializes a singleton Shiki highlighter and exports an async `highlight()` function.

**Files:**
- Create: `apps/docs/lib/highlight.ts`

**Step 1: Write the highlight utility**

```ts
import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light"],
      langs: ["tsx", "css", "bash", "json"],
    });
  }
  return highlighterPromise;
}

export type CodeLanguage = "tsx" | "css" | "bash" | "json" | "text";

export async function highlight(
  code: string,
  lang: CodeLanguage = "tsx"
): Promise<string> {
  if (lang === "text") {
    return code;
  }
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    theme: "github-light",
  });
}
```

**Step 2: Verify typecheck**

Run: `pnpm --filter @umichkisa-ds/docs typecheck`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add apps/docs/lib/highlight.ts
git commit -m "feat(docs): add server-side Shiki highlight utility"
```

---

### Task 4: Create `CodeBlockClient` (copy button shell)

The thin `"use client"` wrapper that handles copy-to-clipboard with icon swap.

**Files:**
- Create: `apps/docs/components/CodeBlockClient.tsx`

**Step 1: Write the client component**

```tsx
"use client";

import { useState, useCallback } from "react";
import { IconButton } from "@umichkisa-ds/web";

interface CodeBlockClientProps {
  code: string;
  lang?: string;
  highlightedHtml?: string;
  children?: React.ReactNode;
}

export function CodeBlockClient({
  code,
  lang,
  highlightedHtml,
  children,
}: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="group relative">
      {/* Language label + copy button */}
      <div className="sticky top-0 right-0 float-right flex items-center gap-2 pr-3 pt-3 z-10">
        {lang && lang !== "text" && (
          <span className="type-caption font-mono text-muted-foreground select-none">
            {lang}
          </span>
        )}
        <IconButton
          icon={copied ? "clipboard-check" : "clipboard-copy"}
          size="sm"
          variant="ghost"
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Code content */}
      {highlightedHtml ? (
        <div
          className="overflow-x-auto [&_pre]:type-caption [&_pre]:font-mono [&_pre]:px-4 [&_pre]:py-4 [&_pre]:!bg-transparent [&_pre]:m-0 [&_code]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <div className="overflow-x-auto">
          {children}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Verify typecheck**

Run: `pnpm --filter @umichkisa-ds/docs typecheck`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add apps/docs/components/CodeBlockClient.tsx
git commit -m "feat(docs): add CodeBlockClient with copy-to-clipboard"
```

---

### Task 5: Create `CodeBlock` server component

The async server component that calls `highlight()` and wraps the result in `CodeBlockClient`.

**Files:**
- Create: `apps/docs/components/CodeBlock.tsx`

**Step 1: Write the server component**

```tsx
import { highlight, type CodeLanguage } from "@/lib/highlight";
import { CodeBlockClient } from "./CodeBlockClient";

interface CodeBlockProps {
  code: string;
  lang?: CodeLanguage;
}

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const highlightedHtml = lang === "text" ? "" : await highlight(code, lang);

  return (
    <div className="my-6 border border-border rounded-md bg-surface-subtle overflow-hidden">
      <CodeBlockClient
        code={code}
        lang={lang}
        highlightedHtml={highlightedHtml || undefined}
      >
        {/* Fallback for lang="text" */}
        {lang === "text" && (
          <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
            <code>{code}</code>
          </pre>
        )}
      </CodeBlockClient>
    </div>
  );
}
```

**Step 2: Verify typecheck**

Run: `pnpm --filter @umichkisa-ds/docs typecheck`
Expected: SUCCESS

**Step 3: Verify build**

Run: `pnpm --filter @umichkisa-ds/docs build`
Expected: SUCCESS

**Step 4: Commit**

```bash
git add apps/docs/components/CodeBlock.tsx
git commit -m "feat(docs): add CodeBlock server component with Shiki highlighting"
```

---

## Phase 2: ComponentPreview Integration

### Task 6: Update ComponentPreview to use highlighted code

Replace the inline `<pre><code>` in ComponentPreview with CodeBlockClient. Pages will call `highlight()` and pass the HTML string as a new `highlightedCode` prop.

**Files:**
- Modify: `apps/docs/components/ComponentPreview.tsx`

**Step 1: Update ComponentPreview**

```tsx
import { CodeBlockClient } from "./CodeBlockClient";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  highlightedCode?: string;
  lang?: string;
}

export function ComponentPreview({
  children,
  code,
  highlightedCode,
  lang = "tsx",
}: ComponentPreviewProps) {
  return (
    <div className="my-6">
      <div className="border border-border rounded-t-lg bg-surface p-8 flex items-center justify-center">
        {children}
      </div>
      <div className="border border-t-0 border-border rounded-b-lg bg-surface-subtle overflow-hidden">
        <CodeBlockClient
          code={code}
          lang={lang}
          highlightedHtml={highlightedCode || undefined}
        >
          {/* Fallback when no highlighted HTML provided */}
          {!highlightedCode && (
            <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
              <code>{code}</code>
            </pre>
          )}
        </CodeBlockClient>
      </div>
    </div>
  );
}
```

Key changes:
- Import `CodeBlockClient` for copy button + highlighting
- Add `highlightedCode` optional prop (HTML string from `highlight()`)
- Add `lang` optional prop (for label display)
- Backwards-compatible: works without `highlightedCode` (falls back to plain text)

**Step 2: Verify typecheck**

Run: `pnpm --filter @umichkisa-ds/docs typecheck`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add apps/docs/components/ComponentPreview.tsx
git commit -m "feat(docs): integrate CodeBlockClient into ComponentPreview"
```

---

### Task 7: Migrate one component page to verify the pattern

Pick a simple component page (Badge) and add `highlight()` calls to verify the full flow works end-to-end.

**Files:**
- Modify: `apps/docs/app/components/badge/page.tsx`

**Step 1: Add highlight calls to Badge page**

The Badge page defines code strings at the top and passes them to `<ComponentPreview code={...}>`. Update to:

1. Make the default export an `async` function (it's a server component)
2. Call `highlight()` for each code string
3. Pass results as `highlightedCode` prop

```tsx
// Add import at top:
import { highlight } from "@/lib/highlight";

// Make page async:
export default async function BadgePage() {
  // Highlight all code strings
  const [
    defaultHighlighted,
    variantsHighlighted,
    // ... other code strings on the page
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(variantsCode),
    // ... etc
  ]);

  return (
    // ... existing JSX, but ComponentPreview calls now include highlightedCode:
    // <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
    // ...
  );
}
```

**Step 2: Run dev server and visually verify**

Run: `pnpm --filter @umichkisa-ds/docs dev`
Navigate to the Badge page. Verify:
- Syntax highlighting appears in code panels (colored keywords, strings, etc.)
- Copy button appears on hover (top-right of code panel)
- Copy works and icon swaps to checkmark for 2s
- Language label shows "tsx"
- No layout shift or styling regression

**Step 3: Verify build**

Run: `pnpm --filter @umichkisa-ds/docs build`
Expected: SUCCESS

**Step 4: Commit**

```bash
git add apps/docs/app/components/badge/page.tsx
git commit -m "feat(docs): add syntax highlighting to Badge page (migration pilot)"
```

---

## Phase 3: Migration

### Task 8: Migrate all component pages

Apply the same pattern from Task 7 to every remaining component page that uses `ComponentPreview`. Each page needs:
1. `import { highlight } from "@/lib/highlight"`
2. `async` default export
3. `await Promise.all([highlight(code1), highlight(code2), ...])` at the top
4. Pass `highlightedCode={...}` to each `<ComponentPreview>`

**Files to modify** (all under `apps/docs/app/components/`):
- `button/page.tsx`
- `icon-button/page.tsx`
- `link-button/page.tsx`
- `divider/page.tsx`
- `label/page.tsx`
- `input/page.tsx`
- `textarea/page.tsx`
- `checkbox/page.tsx`
- `select/page.tsx`
- `radio/page.tsx`
- `switch/page.tsx`
- `form-item/page.tsx`
- `container/page.tsx`
- `grid/page.tsx`
- `avatar/page.tsx`
- `tooltip/page.tsx`
- `popover/page.tsx`
- `dropdown/page.tsx`
- `dialog/page.tsx`
- `tabs/page.tsx`
- `skeleton/page.tsx`
- `loading-spinner/page.tsx`
- `alert/page.tsx`
- `toast/page.tsx`
- `status-view/page.tsx`
- `card/page.tsx`
- `accordion/page.tsx`
- `pagination/page.tsx`
- `table/page.tsx`
- `toggle-group/page.tsx`
- `only-mobile-view/page.tsx`
- `calendar/page.tsx`

**Pattern:** Identical to Task 7. This is mechanical — same three changes per file.

**Step 1: Migrate all pages**

Apply the pattern to each file. Use `Promise.all` to batch highlight calls per page.

**Step 2: Verify build**

Run: `pnpm build`
Expected: SUCCESS

**Step 3: Spot-check 3-4 pages in dev**

Run: `pnpm --filter @umichkisa-ds/docs dev`
Check Button, Dialog, Table, and Alert pages for correct highlighting + copy button.

**Step 4: Commit**

```bash
git add apps/docs/app/components/
git commit -m "feat(docs): add syntax highlighting to all component pages"
```

---

### Task 9: Migrate standalone code blocks in forms pages

Replace raw `<pre><code>` blocks in forms pages with the `<CodeBlock>` server component.

**Files to modify:**
- `apps/docs/app/forms/overview/page.tsx` (line 95-98 — install code block)
- `apps/docs/app/forms/validation/page.tsx` (lines 162, 187, 197, 207, 218, 231, 244, 257 — multiple code blocks)
- `apps/docs/app/forms/use-form/page.tsx` (lines 111, 125 — code blocks)

**Step 1: Replace raw `<pre><code>` with `<CodeBlock>`**

For each file:
1. Add `import { CodeBlock } from "@/components/CodeBlock"`
2. Replace each standalone `<div><pre><code>{code}</code></pre></div>` with `<CodeBlock code={code} lang="tsx" />`
3. Remove the wrapper `<div>` with manual border/bg classes — CodeBlock handles that
4. Make the page `async` if it isn't already

Example (forms/overview/page.tsx, install block):
```tsx
// Before:
<div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
  <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
    <code>{installCode}</code>
  </pre>
</div>

// After:
<CodeBlock code={installCode} lang="bash" />
```

**Step 2: Verify build**

Run: `pnpm build`
Expected: SUCCESS

**Step 3: Commit**

```bash
git add apps/docs/app/forms/
git commit -m "feat(docs): migrate forms pages to CodeBlock component"
```

---

### Task 10: Migrate standalone code blocks in foundation pages

Replace raw `<pre>` blocks in foundation pages with `<CodeBlock>`.

**Files to modify** (all under `apps/docs/app/foundation/`):
- `typography/fonts/page.tsx` (5 code blocks)
- `colors/overview/page.tsx` (2 code blocks)
- `colors/tokens/page.tsx` (1 code block)
- `colors/usage/page.tsx` (1 code block)
- `layout/overview/page.tsx` (1 code block)
- `layout/spacing/page.tsx` (2 code blocks)
- `iconography/accessibility/page.tsx` (4 code blocks)
- `iconography/usage/page.tsx` (13+ code blocks)
- `iconography/library/page.tsx` (1 code block)
- `iconography/sizes/page.tsx` (1 code block)

**Pattern:** Same as Task 9.

Foundation pages use a different raw style (`overflow-x-auto max-w-full rounded-lg bg-surface-muted p-4 my-4`). Replace with `<CodeBlock code={...} lang="..." />`. Determine `lang` per block — most are `tsx`, some are `css` or `bash`.

**Step 1: Migrate all foundation pages**

Add `import { CodeBlock } from "@/components/CodeBlock"`, make page `async`, replace each `<pre>` block.

**Step 2: Verify build**

Run: `pnpm build`
Expected: SUCCESS

**Step 3: Spot-check 2-3 pages in dev**

Check typography/fonts, colors/usage, and iconography/usage.

**Step 4: Commit**

```bash
git add apps/docs/app/foundation/
git commit -m "feat(docs): migrate foundation pages to CodeBlock component"
```

---

### Task 11: Migrate remaining standalone code blocks

Check for any remaining `<pre>` tags in component pages that aren't inside ComponentPreview.

**Files to check:**
- `apps/docs/app/components/card/page.tsx` (line 133 — standalone pre)
- `apps/docs/app/components/table/page.tsx` (line 260 — standalone pre)

**Step 1: Replace with CodeBlock**

Same pattern as Tasks 9-10.

**Step 2: Verify no remaining raw `<pre>` tags**

Run: `grep -r "<pre " apps/docs/app/ apps/docs/components/`
Expected: Zero results (all replaced).

Note: `ComponentPreview` still has a `<pre>` fallback for when `highlightedCode` is not provided — this is intentional for backwards compatibility during incremental migration. Once all pages are migrated, consider removing the fallback in a cleanup pass.

**Step 3: Verify build**

Run: `pnpm build && pnpm typecheck`
Expected: SUCCESS

**Step 4: Commit**

```bash
git add apps/docs/app/components/card/page.tsx apps/docs/app/components/table/page.tsx
git commit -m "feat(docs): migrate remaining standalone code blocks to CodeBlock"
```

---

## Phase 4: Final Verification

### Task 12: Full build + typecheck + visual review

**Step 1: Full build**

Run: `pnpm build && pnpm typecheck`
Expected: Both pass with zero errors.

**Step 2: Visual smoke test**

Run: `pnpm --filter @umichkisa-ds/docs dev`
Spot-check:
- Component page (Button) — highlighting + copy in ComponentPreview
- Foundation page (colors/usage) — standalone CodeBlock with highlighting
- Forms page (overview) — bash install CodeBlock
- Long code example (Table) — horizontal scroll, sticky copy button visible

**Step 3: Commit any fixes**

If any issues found, fix and commit individually.

**Step 4: Update CODEBASE.md**

Add CodeBlock to the docs components section.

**Step 5: Check off in TODO.md**

Mark the CodeBlock item as complete in `docs/TODO.md`.

**Step 6: Final commit**

```bash
git add docs/TODO.md docs/CODEBASE.md
git commit -m "docs: mark CodeBlock complete, update CODEBASE.md"
```
