# DS Constraints

_Populated during Step -1 (DS Documentation Review)._
_This file is referenced by `docs/specs/component.md` and read at the start of every component session._
_Each section is self-contained and designed to be injected as skill context in Step 4 (Component Skill)._

---

## Colors

### Token Usage

Must: Use semantic tokens (`--color-*`) in all component CSS and inline styles — never raw hex, raw OKLCH values, or primitive tokens. [source:foundation/colors/overview]
Never: Reference `--primitive-*` tokens directly in component code. [source:foundation/colors/overview]
Never: Hardcode hex values in components — they cannot be updated globally and drift from the system. [source:foundation/colors/usage]
Never: Implement dark mode — no `.dark` class, no `prefers-color-scheme` media queries, no dark-mode token layer. This design system is light mode only. [source:foundation/colors/overview]

### Naming (-subtle / -muted)

Must: Treat `-subtle` tokens as container/background roles — tinted regions, alert box fills, card backgrounds. [source:foundation/colors/tokens]
Must: Treat `-muted` tokens as deprioritized roles — lower-contrast text, elevated inner surfaces. [source:foundation/colors/tokens]
Never: Use `-subtle` and `-muted` interchangeably — they serve different purposes and are not synonyms. [source:foundation/colors/tokens]

### Brand Colors

Must: Use `--color-text-on-brand` (maize) for all text placed on `--color-brand-primary` backgrounds. [source:foundation/colors/usage]
Never: Use white text on `--color-brand-primary` backgrounds — white is not a KISA brand color and breaks visual identity. [source:foundation/colors/usage]
Never: Use `--color-brand-accent` (maize) as link text color — low contrast on white and does not signal interactivity. [source:foundation/colors/usage]
Avoid: Using brand colors as mid-page card or content backgrounds — disrupts reading flow and feels heavy. [source:foundation/colors/usage]
Prefer: Reserving brand colors for intentional, sparse placement — navbars, hero sections, primary CTAs. [source:foundation/colors/usage]

### Surface Depth

Must: Follow the three-level surface depth model: page → `--color-surface`, cards/panels → `--color-surface-subtle`, items inside cards → `--color-surface-muted`. [source:foundation/colors/usage]
Never: Skip surface levels (e.g. placing a card item directly on `--color-surface`). [source:foundation/colors/usage]
Never: Invent background colors outside the three surface tokens. [source:foundation/colors/usage]

### Text

Must: Use `--color-text-link` (not `--color-brand-accent`) for all hyperlinks and inline clickable text. [source:foundation/colors/usage]
Never: Use `--color-text-disabled` for content that needs to be read — intentionally below contrast thresholds. [source:foundation/colors/usage]
Never: Use `--color-text-link` for decorative or non-interactive text. [source:foundation/colors/usage]
Never: Use `--color-text-on-brand` outside of `--color-brand-primary` backgrounds. [source:foundation/colors/tokens]

### Info vs Link

Never: Use `--color-info` and `--color-text-link` interchangeably — they resolve to the same value (`--primitive-michigan-blue-mid`) but serve distinct semantic roles. [source:foundation/colors/tokens]
Must: Use `--color-info` for state indicators and alert borders; use `--color-text-link` for clickable inline text only. [source:foundation/colors/tokens]

### Feedback States

Must: Use the solid and subtle token pair together for feedback states — solid token (`--color-error`, etc.) for icons, borders, and text labels; subtle token (`--color-error-subtle`, etc.) for the background container. [source:foundation/colors/usage]
Never: Use `--color-success` as standalone text or icon color — fails both text (4.5:1) and non-text (3:1) contrast thresholds at 2.2:1. [source:foundation/colors/accessibility]
Must: Pair `--color-success` with a `--color-text-primary` label for any readable content. [source:foundation/colors/accessibility]
Must: Pair `--color-warning` with a `--color-text-primary` label — 3.0:1 is the exact threshold floor, not a comfortable pass. [source:foundation/colors/accessibility]
Avoid: Using `--color-error` for small body text — passes large text only (3.9:1). [source:foundation/colors/accessibility]

### Interactive States

Must: Cycle through default → hover → pressed → focus states for every interactive element using brand colors. [source:foundation/colors/usage]
Must: Implement the dual-ring focus pattern on every interactive element: `outline: 2px solid var(--color-focus-ring)` (maize, contrast on dark) + `box-shadow: 0 0 0 4px var(--color-brand-primary)` (navy, contrast on light). Both rings must be present. [source:foundation/colors/tokens]
Never: Remove the focus ring, reduce its opacity, or suppress it with `outline: none`. [source:foundation/colors/usage]
Prefer: `--color-surface-subtle` as hover background and `--color-border-strong` as hover border for neutral/gray interactive elements (interim until dedicated neutral interactive tokens are defined). [source:foundation/colors/tokens]

---

## Typography

_To be populated during the Typography section of Step -1._

---

## Layout

_To be populated during the Layout section of Step -1._

---

## Iconography

_To be populated during the Iconography section of Step -1._

---

## Accessibility

_Cross-cutting a11y rules consolidated from all foundation sections._

### Colors — Contrast Requirements (from foundation/colors/accessibility)

Must: Maintain minimum 4.5:1 contrast ratio for normal body text (WCAG AA). [source:foundation/colors/accessibility]
Must: Maintain minimum 3:1 contrast ratio for large text (18px+ or 14px bold) and non-text UI components (borders, icons). [source:foundation/colors/accessibility]
Avoid: `--color-text-muted` at small text sizes on `--color-surface-subtle` — 4.2:1 passes large text only. Use `--color-text-primary` if the content needs to be readable at small sizes. [source:foundation/colors/accessibility]
Avoid: `--color-text-muted` at small text sizes on `--color-surface-muted` — 3.8:1 passes large text only. Use `--color-text-primary` inside card detail rows if content is small. [source:foundation/colors/accessibility]
Never: Use `--color-success` (2.2:1) as standalone text or icon color — fails both text and non-text contrast thresholds. [source:foundation/colors/accessibility]
Must: Pair `--color-warning` (3.0:1) and `--color-success` with `--color-text-primary` labels whenever they convey readable information. [source:foundation/colors/accessibility]

### Focus

Must: Every interactive element must have a visible focus indicator when navigated by keyboard. [source:foundation/colors/usage]
Must: Use the dual-ring focus implementation — maize `outline` (visible on dark backgrounds, 8.2:1 on navy) + navy `box-shadow` offset (visible on light backgrounds). [source:foundation/colors/tokens]
Never: Use `outline: none` or `outline: 0` without an equivalent custom focus indicator. [source:foundation/colors/usage]

---

## Components (General)

_Universal rules that apply to every component regardless of domain._
_To be populated from `docs/DECISIONS.md` and cross-cutting rules during Step -1._
