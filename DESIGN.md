---
# @generated — produced by packages/web/scripts/compile-design.ts.
# Do NOT edit by hand. Edits are overwritten on the next prebuild.
# Source CSS: packages/web/src/{styles,tokens}/.
# Prose templates: packages/web/scripts/templates/.
# Spec: docs/refactor/A4-design-compile.md.
version: alpha
name: KISA Design System
description: University of Michigan KISA — navy + maize Michigan brand, Korean-first typography.
colors:
  brand-primary: "#00152c"
  brand-primary-mid: "#00365c"
  brand-primary-hover: "#003152"
  brand-primary-pressed: "#000c1e"
  brand-accent: "#f4c000"
  brand-accent-subtle: "#fff1c4"
  brand-accent-hover: "#ddaa00"
  brand-accent-pressed: "#c99600"
  brand-foreground: "#f4c000"
  focus-ring: "#f4c000"
  surface: "#ffffff"
  surface-muted: "#f8f8fa"
  surface-subtle: "#f1f2f4"
  border: "#e3e4e7"
  border-strong: "#d2d4d8"
  foreground: "#0c0f17"
  muted-foreground: "#7d8088"
  disabled-foreground: "#a4a8ae"
  link: "#00365c"
  error: "#df2225"
  error-hover: "#a90000"
  error-pressed: "#970000"
  error-subtle: "#fff0ee"
  error-foreground: "#ffffff"
  success: "#37a643"
  success-subtle: "#edf9ed"
  warning: "#e78b30"
  warning-subtle: "#fff2e8"
  info: "#00365c"
  info-subtle: "#e1edf7"
  overlay: "#000000"
typography:
  display: { fontFamily: "SejongHospital Bold", fontSize: 48px, fontWeight: 400, lineHeight: 1.25, letterSpacing: -0.025em }
  h1: { fontFamily: "SejongHospital Bold", fontSize: 36px, fontWeight: 400, lineHeight: 1.25, letterSpacing: -0.025em }
  h2: { fontFamily: "Pretendard Variable", fontSize: 24px, fontWeight: 600, lineHeight: 1.375 }
  h3: { fontFamily: "Pretendard Variable", fontSize: 20px, fontWeight: 600, lineHeight: 1.375 }
  h4: { fontFamily: "Pretendard Variable", fontSize: 16px, fontWeight: 600, lineHeight: 1.375 }
  body: { fontFamily: "Pretendard Variable", fontSize: 16px, fontWeight: 400, lineHeight: 1.625 }
  body-sm: { fontFamily: "Pretendard Variable", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
  label: { fontFamily: "Pretendard Variable", fontSize: 14px, fontWeight: 500, lineHeight: 1.5 }
  caption: { fontFamily: "Pretendard Variable", fontSize: 12px, fontWeight: 400, lineHeight: 1.5 }
  code: { fontFamily: "Geist Mono", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
spacing:
  element: 8px
  component: 16px
  section: 24px
  icon-xs: 12px
  icon-sm: 16px
  icon-md: 20px
  icon-lg: 24px
  icon-xl: 32px
rounded:
  md: 8px
  lg: 12px
  full: 9999px
---

## Overview

KISA is the University of Michigan Korean International Student Association.
This design system carries the Michigan brand (navy `brand-primary` + maize
`brand-accent`) and pairs it with Korean-first typography
(`SejongHospital Bold` for hero/H1, `Pretendard Variable` for everything
else). The visual language is flat, minimal, and high-contrast — borders
and tonal layers carry the depth, never shadows.

This file is the Layer 1 visual contract. Component composition rules
live in `COMPONENT.md` (Layer 2); consumer write-time rules live in
`USAGE.md` (Layer 3).

Generated from `@umichkisa-ds/web@1.0.21`.

## Colors

The palette is anchored by two Michigan brand colors: `brand-primary`
(Michigan navy `#00274c`) and `brand-accent` (Michigan maize `#ffcb05`).
All other values are neutrals (gray scale resolved via OKLCH) and a
small set of feedback states (error, success, warning, info), each
carrying matched `-subtle` and (where applicable) `-hover` / `-pressed`
siblings.

Usage rules:

- Reference semantic tokens (`brand-primary`, `surface`, `foreground`)
  — never primitive values or raw hex.
- `-subtle` means container/background; `-muted` means deprioritized
  text or surface.
- `info` and `link` resolve to the same blue but are not
  interchangeable: `info` is for state indicators / borders, `link` is
  for clickable text only.
- `overlay` is applied at 40% opacity in scrim contexts (Dialog,
  Drawer); the alpha channel is dropped from the YAML front matter and
  documented here in prose.

The full consumer rulebook lives in `USAGE.md`.

## Typography

Two-font system, Korean-first:

- **`SejongHospital Bold`** — Korean display face. Reserved for
  `type-display` (hero) and `type-h1` (page title). Sejong does not
  appear below H1 — Pretendard takes over.
- **`Pretendard Variable`** — body and supporting headings (H2–H4),
  labels, captions. Loaded via CDN.

A third family, **`Geist Mono`**, is available as `typography.code`
but is reserved for code-display contexts only (inline code, code
blocks). Never use it for body or UI text.

The `fontSize` value listed in each `typography.*` entry is the
**`lg:` breakpoint** value (largest variant). Smaller breakpoints
scale down per `theme.css` — see `.type-display`, `.type-h1`,
`.type-h2`, `.type-h3` for the responsive ramps. `type-body`,
`type-body-sm`, `type-label`, `type-caption`, `type-h4`, and
`typography.code` are single-value, non-responsive.

Always pair a `type-*` class with an explicit color token. Never use
`!font-*` to override the weight of a `type-*` class.

## Layout

Three-breakpoint, three-tier system.

**Breakpoints.** `default` (mobile), `md:` (≥768px), `lg:` (≥1024px).
No `sm:`, `xl:`, or `2xl:`.

**Spacing tiers** (`spacing.element` / `spacing.component` /
`spacing.section`):

- `element` (`8px`) — label↔input, icon↔text, caption-below,
  heading↔subtitle.
- `component` (`16px`) — stacked fields, list items, stacked cards,
  nav items.
- `section` (`24px`) — gaps between major page sections (1.5×
  component).

Vertical spacing does not scale across breakpoints — responsiveness
is column reflow, not vertical breathing.

**Icon sizes** (`spacing.icon-{xs,sm,md,lg,xl}`) map to text context:
`xs`/caption, `sm`/caption, `md`/body (default), `md`–`lg`/subhead,
`lg`/heading, `xl`/hero. Pick via the `size` prop on `<Icon>`; never
override with `font-size` or arbitrary CSS.

The page shell (`Container`) combines max-width, horizontal padding,
and centering: `mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8`.
Never compose this manually.

## Elevation & Depth

Flat by default. The system has no shadow tokens.

Depth is carried by **borders** (`border` / `border-strong`) and
**tonal layering** (`surface` / `surface-muted` / `surface-subtle`).
Cards sit on `surface` with a `border` ring; elevated regions shift to
`surface-subtle`; deprioritized regions shift to `surface-muted`.
Two-level depth is the maximum.

Overlays (Dialog scrim, Drawer scrim) use `overlay` at 40% opacity —
the only place a transparent value appears in the system.

## Shapes

Three rounded radii, picked by surface size and shape:

- `rounded.md` (`8px`) — default. Buttons, inputs, cards, most
  interactive surfaces.
- `rounded.lg` (`12px`) — modals, drawers, larger surfaces where
  `md` looks pinched.
- `rounded.full` (`9999px`) — pills, avatars, circular badges.

Off-tier radii (`rounded-xl`, `rounded-2xl`) require explicit
DS-surface justification. Geometry stays minimal — no decorative
clipping, no asymmetric corners.

## Components

The Google Labs DESIGN.md `components:` block is intentionally
omitted — component composition belongs to Layer 2, not the visual
contract.

For per-component identity, sibling discrimination
(`pick_when` / `reject_when`), variants, notable props, intrinsic
behavior, compound parts, and component-scoped anti-patterns, see
`COMPONENT.md` at the repo root.

For cross-component invariants (e.g. icon-only button + tooltip
aria-label match), see the `cross_component_invariants` block in the
same file.

## Do's and Don'ts

A short surfacing list. The comprehensive consumer rulebook is
`USAGE.md` (Layer 3).

**Do**

- Use semantic color tokens (`brand-primary`, `surface`,
  `foreground`) for every color decision.
- Use `type-*` classes for every typographic decision and pair them
  with an explicit color token.
- Pick spacing from the three named tiers (`element` / `component` /
  `section`); pick radius from the three named tiers (`md` / `lg` /
  `full`).
- Go through `<Icon>` for every icon; pick `size` from the 5-step
  scale (`xs` / `sm` / `md` / `lg` / `xl`).

**Don't**

- Reference `--primitive-*` tokens directly in component code.
- Compose `mx-auto max-w-screen-2xl px-4` manually — use `Container`.
- Override `type-*` weight with `!font-*`.
- Use Geist Mono for body or UI text; it is reserved for code-display.
- Implement dark mode (no `.dark`, no media queries, no dark layer).
