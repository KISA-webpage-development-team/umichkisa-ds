# A4 — DESIGN.md Compile Strategy

_Subphase A4 of the `ds-client-constrained-execution` 4-layer refactor. Strategy doc for Layer 1: how `theme.css` compiles into a Google Labs DESIGN.md. The runtime artifact (`/DESIGN.md` at repo root) and the compiler script are authored in Phase B/C._

`theme.css` is the source of truth. DESIGN.md is a compile output. The compiler runs one direction only.

---

## Decisions (locked at A4 grill)

| # | Decision | Choice |
|---|---|---|
| 1 | Audience | Implementer subagent + humans browsing the GitHub repo. Spec-conformant; no external Google Labs tooling round-trip required. |
| 2 | Tier emission | Semantic tokens + decomposed `.type-*` classes only. Primitives, `.ds-spinner*`, and keyframes stay theme.css-internal. |
| 3 | OKLCH precision | Compiler computes hex from OKLCH; loss accepted silently (migration+redesign stage). No prose footnote. Existing `hex_comment` annotations in `primitives.css` are informal author notes only. |
| 4 | Spacing block | Three named tiers only: `element: 8px`, `component: 16px`, `section: 24px`. Off-tier (`gap-3/5/7`) and full Tailwind scale are out. |
| 5 / 12 | State colors + `components:` block | All state colors (`brand-primary-hover`, `brand-primary-pressed`, `brand-accent-hover`, etc.) live as top-level `colors:` entries. **YAML `components:` block skipped entirely** in v0. Component composition belongs to Layer 2 + .tsx source. |
| 6 | Commit policy | Commit `/DESIGN.md` at repo root. CI runs the compiler then `git diff --exit-code DESIGN.md` to enforce regen on theme.css edits. |
| 7 | Compiler input | Parse `theme.css` with PostCSS. Single source of truth preserved; no intermediate `tokens.json`. |
| 8 | Compiler scaffolding | TypeScript + `tsx`; `packages/web/scripts/compile-design.ts`; wired as `prebuild` in `packages/web/package.json` so DESIGN.md regenerates on every package build. |
| 9 | Versioning | YAML carries spec-version `version: alpha` only. KISA package version (`@umichkisa-ds/web@<X.Y.Z>`) stamped into the Overview prose section by the compiler. No custom YAML keys. |
| 10 | Round-trip test | Skipped. CI runs `npx @google/design.md lint DESIGN.md` and that's the contract. PR review of the committed DESIGN.md diff catches conversion errors. Round-trip becomes meaningful only if a third consumer (Figma, designer tooling) appears. |
| 11 | Geist Mono | Emit. Prose clarifies "reserved for code-display contexts (inline code, code blocks); not for body / UI." |

---

## Token mapping table

One row per source-side token group. Status column uses three values:

- **emit** — appears in DESIGN.md YAML front matter
- **prose** — referenced in DESIGN.md markdown body but not as a YAML token
- **internal** — stays in theme.css only; not surfaced in DESIGN.md at all

| Source group | Source location | DESIGN.md target | Status | Notes |
|---|---|---|---|---|
| Michigan brand primitives (`--primitive-michigan-blue`, `-maize`, etc.) | `tokens/primitives.css` | — | internal | Surfacing primitives invites consumer violations of `c-tu-2`. |
| Gray scale (`--primitive-gray-50…900`) | `tokens/primitives.css` | — | internal | Same — primitives are private. |
| Semantic base (`--primitive-white`, `-red-500`, `-green-500`) | `tokens/primitives.css` | — | internal | Resolved through to semantic colors. |
| Brand semantic (`--color-brand-primary`, `-mid`, `-accent`, `-accent-subtle`) | `styles/index.css` `@theme` | `colors.brand-primary` etc. | emit | OKLCH→hex by compiler. |
| Brand interactive states (`--color-brand-primary-hover`, `-pressed`, `--color-brand-accent-hover`, `-pressed`, `--color-focus-ring`) | `styles/index.css` `@theme` | `colors.brand-primary-hover` etc. | emit | Top-level `colors:` entries, not nested under `components:`. |
| Surface (`--color-surface`, `-muted`, `-subtle`) | `styles/index.css` `@theme` | `colors.surface` etc. | emit | |
| Border (`--color-border`, `-strong`) | `styles/index.css` `@theme` | `colors.border`, `colors.border-strong` | emit | |
| Text (`--color-foreground`, `-muted-foreground`, `-disabled-foreground`, `-brand-foreground`, `-link`) | `styles/index.css` `@theme` | `colors.foreground` etc. | emit | |
| Feedback (`--color-error`, `-success`, `-warning`, `-info` and `-subtle`/`-hover`/`-pressed`/`-foreground` siblings) | `styles/index.css` `@theme` | `colors.error` etc. | emit | All variants emitted as named top-level colors. |
| Overlay (`--color-overlay`) | `styles/index.css` `@theme` | `colors.overlay` | emit | RGBA alpha — see "Spec edge cases" below. |
| Icon sizes (`--icon-xs`/`-sm`/`-md`/`-lg`/`-xl`) | `styles/index.css` `@theme` | `spacing.icon-xs` etc. OR custom group | emit | Spec's `spacing:` is the closest fit; named keys allowed. Compiler emits as `spacing.icon-xs` — keys `icon-xs/sm/md/lg/xl` distinguish from layout tier keys. |
| Layout spacing tiers (Tailwind built-ins; no DS token) | A3 tier picker | `spacing.element/component/section` | emit | Three values from A3 tier picker, materialized as DESIGN.md spacing tokens. |
| Font families: SejongHospital Bold/Light, Pretendard, Geist Mono | `styles/index.css` `@theme` | Referenced via `typography.<class>.fontFamily` | prose+emit | Family strings appear inside each `typography.<token>.fontFamily`; documented in Typography prose. |
| `.type-display` / `.type-h1` / `.type-h2` / `.type-h3` / `.type-body` / `.type-body-sm` / `.type-label` / `.type-caption` | `styles/index.css` `@layer ds-components` | `typography.display`, `typography.h1`, etc. | emit | Decomposed into spec's `Typography` shape (fontFamily, fontSize, fontWeight, lineHeight, letterSpacing). Responsive breakpoint values: largest breakpoint wins (DESIGN.md is single-value per token). Compiler also emits a prose note: "fontSize listed is the `lg:` breakpoint value; smaller breakpoints scale down per `theme.css`." |
| `.type-h4` | `styles/index.css` `@layer ds-components` | `typography.h4` | emit | Shipped during A4 grill via `ds-fix-during-migration` (commit edac51e): pretendard / 1rem / 600 / line-height 1.375. Slots between `type-body` and `type-h3`. |
| Rounded radii (Tailwind built-ins: `rounded-md`, `-lg`, `-full`) | A3 tier picker (no DS token) | `rounded.md/lg/full` | emit | Same pattern as spacing — A3 tier picker enshrines three values. Off-tier (`xl`, `2xl`) requires DS-surface justification per A3 → out of DESIGN.md. |
| `.ds-spinner` / `-sm` / `-md` / `-lg` (border + animation classes) | `styles/index.css` `@layer ds-components` | — | internal | Implementation of LoadingSpinner. Layer 2 LoadingSpinner gets one-line `intrinsic_behavior` mention. |
| 7 keyframes (`ds-spin`, `ds-pulse`, `tooltip-in/out`, `dialog-overlay-in/out`, `dialog-content-in/out`, `accordion-down/up`) | `styles/index.css` | — | internal | DESIGN.md has no animation surface. Layer 2 `intrinsic_behavior` mentions per affected component (Dialog, Tooltip, Accordion, LoadingSpinner). |

### Spec edge cases handled by compiler

| Source value | DESIGN.md output | Strategy |
|---|---|---|
| `oklch(0% 0 0 / 40%)` (alpha channel) | `#000000` (6-digit, no alpha) | Compiler drops alpha. Opacity documented in prose only ("Applied at 40% opacity in Dialog/Drawer scrims."). |
| `var(--primitive-michigan-blue)` chain | resolved → OKLCH → hex | Compiler walks one level of indirection; if a chain is >1 deep, throws. |
| Responsive `.type-*` (mobile + md: + lg: variants) | Largest breakpoint value | Compiler picks the value at the `lg:` breakpoint. Prose section explains. |
| `--font-geist-mono` | `typography.code.fontFamily` | Surfaced in Typography prose as code-only carve-out. |

---

## DESIGN.md file shape (target)

```markdown
---
version: alpha
name: KISA Design System
description: University of Michigan KISA — navy + maize Michigan brand, Korean-first typography.
colors:
  brand-primary: "#00274c"
  brand-primary-mid: "#00568a"
  brand-primary-hover: "#..."
  brand-primary-pressed: "#..."
  brand-accent: "#ffcb05"
  brand-accent-subtle: "#..."
  brand-accent-hover: "#..."
  brand-accent-pressed: "#..."
  brand-foreground: "#ffcb05"
  focus-ring: "#ffcb05"
  surface: "#ffffff"
  surface-muted: "#..."
  surface-subtle: "#..."
  border: "#..."
  border-strong: "#..."
  foreground: "#..."
  muted-foreground: "#..."
  disabled-foreground: "#..."
  link: "#00568a"
  error: "#..."
  error-hover: "#..."
  error-pressed: "#..."
  error-subtle: "#..."
  error-foreground: "#ffffff"
  success: "#..."
  success-subtle: "#..."
  warning: "#..."
  warning-subtle: "#..."
  info: "#00568a"
  info-subtle: "#..."
  overlay: "#00000066"
typography:
  display: { fontFamily: "SejongHospital Bold", fontSize: 48px, fontWeight: 700, lineHeight: 1.25, letterSpacing: -0.025em }
  h1:      { fontFamily: "SejongHospital Bold", fontSize: 36px, fontWeight: 700, lineHeight: 1.25, letterSpacing: -0.025em }
  h2:      { fontFamily: "Pretendard Variable", fontSize: 24px, fontWeight: 600, lineHeight: 1.375 }
  h3:      { fontFamily: "Pretendard Variable", fontSize: 20px, fontWeight: 600, lineHeight: 1.375 }
  body:    { fontFamily: "Pretendard Variable", fontSize: 16px, fontWeight: 400, lineHeight: 1.625 }
  body-sm: { fontFamily: "Pretendard Variable", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
  label:   { fontFamily: "Pretendard Variable", fontSize: 14px, fontWeight: 500, lineHeight: 1.5 }
  caption: { fontFamily: "Pretendard Variable", fontSize: 12px, fontWeight: 400, lineHeight: 1.5 }
  code:    { fontFamily: "Geist Mono", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
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
<!-- Brand & style paragraph + KISA package version stamp -->
Generated from `@umichkisa-ds/web@1.4.2` (compiler-stamped).

## Colors
<!-- Palette intro, Michigan brand explanation -->

## Typography
<!-- Two-font system; Geist Mono code-only carve-out; `lg:` breakpoint disclosure -->

## Layout
<!-- Three-breakpoint, three-tier spacing -->

## Elevation & Depth
<!-- Flat philosophy: borders + tonal layers, no shadows -->

## Shapes
<!-- rounded-md/lg/full + minimal-geometry rationale -->

## Components
<!-- 2–3 sentences pointing to COMPONENT.md (Layer 2) -->

## Do's and Don'ts
<!-- Short list; pointer to USAGE.md for the comprehensive rulebook -->
```

All eight spec sections present. The Components body section is a pointer-only — it acknowledges where component contracts live (Layer 2) without duplicating them.

---

## Compiler specification

### Location and wiring

- File: `packages/web/scripts/compile-design.ts`
- Runtime: `tsx`
- Output: `/DESIGN.md` (repo root, committed)
- npm script: `compile-design` in `packages/web/package.json`
- Build chain: `prebuild` runs `compile-design` so the artifact regenerates on every `pnpm --filter @umichkisa-ds/web build`
- CI gate: `pnpm --filter @umichkisa-ds/web build && git diff --exit-code DESIGN.md` (fails if regen produces a diff)
- Lint gate: `npx @google/design.md lint DESIGN.md` runs after compile

### Compiler flow

1. Read `packages/web/styles/index.css` and `packages/web/src/tokens/*.css` via PostCSS.
2. Build a token map:
   - Walk `@theme` block(s) for `--color-*`, `--icon-*`, `--font-*` declarations.
   - For each value containing `var(--primitive-*)`, resolve through one level of indirection to the primitive.
   - Throw if indirection depth > 1.
3. For each color value, convert OKLCH → sRGB hex (6-digit, no alpha) using `culori`. RGBA-source values like `--color-overlay` emit as their base color (`#000000`); the alpha channel is documented in prose only ("Applied at 40% opacity in Dialog/Drawer scrims.").
4. Walk `@layer ds-components` for `.type-*` rules, including `@media` breakpoint variants. For each class:
   - Pick the largest-breakpoint variant for `fontSize`.
   - Map CSS properties to spec's `Typography` shape (font-family → fontFamily, font-size → fontSize, etc.).
5. Read `packages/web/package.json` for the KISA version string; stamp into Overview prose template.
6. Render the YAML front matter from the token map.
7. Render the markdown body from prose templates (in `packages/web/scripts/templates/` — one `.md.tpl` per spec section; templates carry `{{kisa_version}}` and similar placeholders).
8. Concatenate front matter + body. Write to `/DESIGN.md`.
9. Exit non-zero on any unresolved `var()`, missing class referenced by component source (e.g., `type-h4`), or template placeholder failure.

### Dependencies (new)

- `postcss` — already in transitive tree via Tailwind; promote to direct dev-dep in `packages/web/package.json`.
- `culori` — OKLCH → sRGB conversion. Same library Tailwind v4 uses; small + well-maintained.
- `@google/design.md` — devDep at repo root for the `lint` gate.

### Lint rules (extracted from spec)

The published spec does not enumerate a numbered list of lint rules; the rules are implicit in the schema and the "Consumer Behavior for Unknown Content" table. Best-read inferred rules:

| # | Rule | KISA expectation |
|---|---|---|
| 1 | YAML front matter delimited by `---` open/close | pass |
| 2 | `colors.*` values are `#hex` sRGB strings | pass — compiler emits 6-digit hex only; alpha channels (e.g. `--color-overlay`) drop to base color + prose note |
| 3 | `typography.*` fields conform to schema (fontFamily string, fontSize Dimension, fontWeight number, lineHeight Dimension\|number, letterSpacing Dimension) | pass |
| 4 | Dimension values use `px`/`em`/`rem` only | pass — compiler emits `px` |
| 5 | `{path.to.token}` token references resolve | N/A in v0 — compiler emits literal values, no references (since `components:` block is skipped, no cross-refs needed) |
| 6 | Section headings appear in spec order | pass — template renders in fixed order |
| 7 | No duplicate section headings | pass — single template per section |

If `npx @google/design.md lint` rejects 8-digit hex on `overlay`, fallback: emit `overlay: "#000000"` and add a prose note "Overlay applied at 40% opacity." The fallback is a known acceptable degradation.

---

## Open questions / deferred items

- **Geist Mono scope reconciliation:** Q11 user note expanded Geist Mono usage from "docs-site only" (per `t-fn-5`/`p2-tk-6`) to "code-display contexts in any consumer." Logged as A3 deferred item; the runtime USAGE.md authored in Phase B/C must reframe `t-fn-5` accordingly.
- **Compiler templates location:** `packages/web/scripts/templates/` — one `.md.tpl` per spec body section. Out of scope for A4 to spec individual template contents.

---

## Phase B implication

Phase B prototypes the Icons rule cluster (per A3). The compiler is **not** required for Phase B — Layer 1 DESIGN.md can be hand-authored as a one-shot artifact for the prototype iteration, and Phase C ships the actual compiler. This A4 spec stands as the contract Phase C implements.

If Phase B reveals that the implementer subagent struggles without a `components:` block (Q5/Q12 b-revised), revisit by promoting the compiler to emit minimal reference entries (b-with-components). The data is already in theme.css; the compiler change is contained.
