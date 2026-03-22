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
