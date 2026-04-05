# Fix: `@theme inline` circular CSS variable references

**Date**: 2026-04-05
**Severity**: Critical — all DS tokens broken on first page load

## Symptom

On first visit to the docs site (both dev and production), CSS appeared unstyled — no DS colors, fonts, or spacing applied. The page rendered with browser defaults. A manual reload would sometimes restore styles.

## Root cause

The `@theme inline` block in `packages/web/src/styles/index.css` declared every semantic token as a self-reference:

```css
@import "../tokens/semantic.css";      /* :root { --color-brand-primary: var(--primitive-michigan-blue); } */

@theme inline {
  --color-brand-primary: var(--color-brand-primary);   /* circular! */
  --color-foreground:    var(--color-foreground);       /* circular! */
  /* ... every token ... */
}
```

Tailwind v4 compiled this into two `:root` blocks in the output CSS:

```css
/* Block 1 — real values (from semantic.css) */
:root {
  --color-brand-primary: var(--primitive-michigan-blue);
}

/* Block 2 — @theme inline output (self-referencing) */
:host, :root {
  --color-brand-primary: var(--color-brand-primary);
}
```

Both blocks target `:root` with identical specificity. Block 2 appears later in the cascade, so it wins. Per the CSS Custom Properties spec, `--color-brand-primary: var(--color-brand-primary)` is a dependency cycle — the property resolves to the **guaranteed-invalid value**.

Every utility class (`bg-brand-primary`, `text-foreground`, etc.) references these tokens via `var()`, so they all resolved to nothing.

## Why it sometimes worked on reload

Unclear — likely a browser implementation quirk where cached CSS was re-evaluated differently, or React hydration triggered a repaint that masked the issue. The underlying CSS was always broken per spec.

## Fix

Replaced `@theme inline` (self-references) with `@theme` (real primitive references), and removed the separate `@import "../tokens/semantic.css"` since `@theme` now owns the semantic token definitions:

```css
@import "../tokens/primitives.css";

@theme {
  --color-brand-primary: var(--primitive-michigan-blue);
  --color-foreground:    var(--primitive-gray-900);
  /* ... all tokens with real values ... */
}
```

This produces a single `:root, :host` block in the output with non-circular values. No more dependency cycles.

## Verification

After the fix, inspecting `--color-brand-primary` in DevTools Computed tab shows `oklch(19% 0.061 243)` instead of empty.

## Lesson

`@theme inline` in Tailwind v4 is designed for variables that already exist and should be used as-is in utilities. When you pass `var(--x): var(--x)`, Tailwind emits a `:host, :root` block that creates circular references. Use `@theme` (non-inline) with real values instead when the token definitions and Tailwind registration live in the same CSS entry point.
