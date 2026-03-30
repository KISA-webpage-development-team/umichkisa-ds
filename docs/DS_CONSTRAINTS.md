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

Must: Use `--color-brand-foreground` (maize) for all text placed on `--color-brand-primary` backgrounds. [source:foundation/colors/usage]
Never: Use white text on `--color-brand-primary` backgrounds — white is not a KISA brand color and breaks visual identity. [source:foundation/colors/usage]
Never: Use `--color-brand-accent` (maize) as link text color — low contrast on white and does not signal interactivity. [source:foundation/colors/usage]
Avoid: Using brand colors as mid-page card or content backgrounds — disrupts reading flow and feels heavy. [source:foundation/colors/usage]
Prefer: Reserving brand colors for intentional, sparse placement — navbars, hero sections, primary CTAs. [source:foundation/colors/usage]

### Surface Depth

Must: Follow the three-level surface depth model: page → `--color-surface`, cards/panels → `--color-surface-subtle`, items inside cards → `--color-surface-muted`. [source:foundation/colors/usage]
Never: Skip surface levels (e.g. placing a card item directly on `--color-surface`). [source:foundation/colors/usage]
Never: Invent background colors outside the three surface tokens. [source:foundation/colors/usage]

### Text

Must: Use `--color-link` (not `--color-brand-accent`) for all hyperlinks and inline clickable text. [source:foundation/colors/usage]
Never: Use `--color-disabled-foreground` for content that needs to be read — intentionally below contrast thresholds. [source:foundation/colors/usage]
Never: Use `--color-link` for decorative or non-interactive text. [source:foundation/colors/usage]
Never: Use `--color-brand-foreground` outside of `--color-brand-primary` backgrounds. [source:foundation/colors/tokens]

### Info vs Link

Never: Use `--color-info` and `--color-link` interchangeably — they resolve to the same value (`--primitive-michigan-blue-mid`) but serve distinct semantic roles. [source:foundation/colors/tokens]
Must: Use `--color-info` for state indicators and alert borders; use `--color-link` for clickable inline text only. [source:foundation/colors/tokens]

### Feedback States

Must: Use the solid and subtle token pair together for feedback states — solid token (`--color-error`, etc.) for icons, borders, and text labels; subtle token (`--color-error-subtle`, etc.) for the background container. [source:foundation/colors/usage]
Never: Use `--color-success` as standalone text or icon color — fails both text (4.5:1) and non-text (3:1) contrast thresholds at 2.2:1. [source:foundation/colors/accessibility]
Must: Pair `--color-success` with a `--color-foreground` label for any readable content. [source:foundation/colors/accessibility]
Must: Pair `--color-warning` with a `--color-foreground` label — 3.0:1 is the exact threshold floor, not a comfortable pass. [source:foundation/colors/accessibility]
Avoid: Using `--color-error` for small body text — passes large text only (3.9:1). [source:foundation/colors/accessibility]

### Interactive States

Must: Cycle through default → hover → pressed → focus states for every interactive element using brand colors. [source:foundation/colors/usage]
Must: Implement the dual-ring focus pattern on every interactive element: `outline: 2px solid var(--color-focus-ring)` (maize, contrast on dark) + `box-shadow: 0 0 0 4px var(--color-brand-primary)` (navy, contrast on light). Both rings must be present. [source:foundation/colors/tokens]
Never: Remove the focus ring, reduce its opacity, or suppress it with `outline: none`. [source:foundation/colors/usage]
Prefer: `--color-surface-subtle` as hover background and `--color-border-strong` as hover border for neutral/gray interactive elements (interim until dedicated neutral interactive tokens are defined). [source:foundation/colors/tokens]

---

## Typography

### Fonts

Must: Use `font-sejong-bold` for all `type-display` and `type-h1` — SejongHospital Bold is the only permitted weight for these roles. [source:foundation/typography/fonts]
Never: Use SejongHospital below H1 — hand off to Pretendard at H2 and every level below. [source:foundation/typography/fonts]
Never: Use `font-sejong-light` as a default heading weight — it is permitted only in marketing/landing page contexts for large decorative display text at `text-4xl` or larger, paired alongside a Bold display line. Never in app UI. [source:foundation/typography/fonts]
Never: Use Geist Mono (`font-mono`) in client application components — it is a documentation-site-only font. [source:foundation/typography/fonts]
Exception: `font-mono` may be composed alongside a `type-*` class in docs-site components (`apps/docs/`) when no monospace `type-*` variant exists in the DS yet (e.g. `type-caption font-mono` for code blocks). This exception does not apply to `packages/web/` components.
Must: Both product fonts (SejongHospital and Pretendard) must use `font-display: swap` in their `@font-face` declarations. [source:foundation/typography/fonts]
Must: Preload SejongHospital — it appears in Display and H1 (above-the-fold on most pages) and must be fetched before the browser discovers it in CSS. [source:foundation/typography/fonts]

### Scale

Must: Use `type-*` semantic utility classes for all typography — never compose raw Tailwind utilities (`text-base font-normal leading-relaxed`) in component code. [source:foundation/typography/usage]
Must: Apply `tracking-tight` to `type-display` and `type-h1`; use `tracking-normal` for all other type roles. [source:foundation/typography/scale]
Must: Use `type-display` for hero sections and landing pages; use `type-h1` for page titles within the app. [source:foundation/typography/scale]
Never: Apply both `type-display` and `type-h1` styling on the same page. [source:foundation/typography/scale]
Prefer: Applying `type-h2` styling to a semantic `<h1>` element when `type-display` is already used on the page — visual hierarchy takes precedence over the class name. [source:foundation/typography/scale]
Must: Rely on `type-*` class definitions for responsive behavior — do not add breakpoint overrides for typography in components. [source:foundation/typography/scale]
Avoid: `sm:`, `xl:`, or `2xl:` breakpoint prefixes for typography overrides — the layout system uses three tiers only (default, `md:`, `lg:`). [source:foundation/typography/scale]

### Usage

Must: Always pair an explicit color token with every `type-*` class — `type-*` classes do not set color. [source:foundation/typography/usage]
Must: Use `text-foreground` for readable content; `text-muted-foreground` for supporting or secondary text. [source:foundation/typography/usage]
Never: Apply weight utilities (`font-semibold`, `font-bold`) to entire text containers for emphasis — use `<strong>` for inline emphasis within body text; use a higher `type-*` class for block-level weight changes. [source:foundation/typography/usage]
Must: Keep body text within `max-w-prose` (~65 characters) in article and long-form reading contexts. [source:foundation/typography/usage]

### State Typography

Must: Disabled text uses the same `type-*` class as its active state — only color changes to `text-disabled-foreground`. Never reduce weight or size to communicate disabled state. [source:foundation/typography/usage]
Must: Use `type-caption` + `text-error` for error messages below form fields. [source:foundation/typography/usage]
Must: Use `type-caption` + `text-muted-foreground` for helper text (instructions, character counts, format hints). [source:foundation/typography/usage]

### Links

Must: Use `text-link` for all link color — never `text-foreground`. [source:foundation/typography/usage]
Must: Underline links by default (`underline`). Hover state: `text-brand-primary`. No separate visited style. [source:foundation/typography/usage]
Never: Apply a separate `type-*` class to links — links inherit the type class of their container. [source:foundation/typography/usage]

### Truncation

Never: Truncate `type-body` in article or long-form content reading contexts. [source:foundation/typography/usage]
Must: Use `truncate` for single-line UI element truncation (nav items, table cells, tags, badges). [source:foundation/typography/usage]
Prefer: `line-clamp-2` for card titles; `line-clamp-3` for card descriptions when multi-line truncation is needed. [source:foundation/typography/usage]

---

## Layout

### Breakpoints

Must: Use only the three layout tiers — default (mobile), `md:` (≥ 768px), `lg:` (≥ 1024px) — for all responsive behavior. [source:foundation/layout/breakpoints]
Never: Use `sm:`, `xl:`, or `2xl:` breakpoints. If a layout cannot be solved with three tiers, the problem is in the component or design, not the breakpoint system. [source:foundation/layout/breakpoints]
Must: Design decisions are made for the desktop tier first. `md:` and `lg:` ensure the layout holds at smaller sizes — not the other way around. [source:foundation/layout/breakpoints]

### Spacing

Must: All spacing values must come from Tailwind's built-in scale (4px base unit). Never use arbitrary values (`px-[24px]`, `mt-[13px]`). [source:foundation/layout/spacing]
Must: Apply the default inset for horizontal breathing room: `px-4` (mobile), `px-10` (tablet), `px-16` (desktop). [source:foundation/layout/spacing]
Must: Constrain all page content to `max-w-screen-2xl` (1536px), centered with `mx-auto`. [source:foundation/layout/spacing]
Must: Column gutter is always `gap-2` (8px) — never adjust it per component or breakpoint. [source:foundation/layout/spacing]
Never: Adjust the column gutter per component or viewport. It is a structural constant. [source:foundation/layout/spacing]

### Vertical Spacing

Must: Use the three-tier vertical spacing system — Element (`gap-2` / 8px), Component (`gap-4` / 16px), Section (`gap-8` / 32px). [source:foundation/layout/spacing]
Never: Scale vertical spacing values with breakpoints. Layout responsiveness is column reflow, not gap scaling. [source:foundation/layout/spacing]
Must: Element tier (`gap-2`) for label → input, icon → text, caption below field, heading → subtitle. [source:foundation/layout/spacing]
Must: Component tier (`gap-4`) for stacked form fields, list items, stacked cards, navigation items. [source:foundation/layout/spacing]
Must: Section tier (`gap-8`) for gaps between major page sections. Section tier is double the component tier — it provides a clear visual break without exceeding the mobile inset. [source:foundation/layout/spacing]

### Page Shell

Must: The page shell must combine all four concerns together: `mx-auto w-full max-w-screen-2xl px-4 md:px-10 lg:px-16`. Never apply only part of this pattern. [source:foundation/layout/spacing]
Must: For full-bleed elements (navbar, hero, footer), apply background to a full-width outer wrapper and nest the page shell inside for content alignment. [source:foundation/layout/spacing]
Never: Apply a full-bleed background directly to the page shell element — this clips the background at 1536px. [source:foundation/layout/spacing]

---

## Iconography

### Library

Must: Use Lucide as the sole icon library. Never import from `react-icons`, use emoji as icons, or use PNG/JPG icons. [source:foundation/iconography/library]
Never: Import a Lucide icon directly into a component — always use the `<Icon>` wrapper component. [source:foundation/iconography/overview]
Prefer: Exhausting the Lucide search (including synonyms) before adding a custom SVG. Custom SVGs are exceptions, not alternatives. [source:foundation/iconography/library]

### Custom Icons

Must: Custom SVGs that replace missing Lucide icons must match Lucide's visual language exactly: `viewBox="0 0 24 24"`, `stroke-width="2"`, `stroke="currentColor"`, `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`. [source:foundation/iconography/library]
Exception: Brand icons (e.g., GitHub, LinkedIn) are registered in the `<Icon>` system as fill-based SVGs with their original viewBox. They do not need to match Lucide's stroke style. This keeps brand icon usage consistent with all other icons via `<Icon name="github" />`. [source:implementation/icon]
Never: Use a second icon library when a Lucide icon is unavailable — use an inline SVG with Lucide-matching attributes. [source:foundation/iconography/library]
Never: Put complex illustrations through the `<Icon>` system — use `<img>` or an inline SVG component instead. Simple brand logos are permitted. [source:foundation/iconography/library]

### Naming

Must: Pass Lucide icon names to `<Icon>` in exact kebab-case as shown on lucide.dev — never translate to camelCase or PascalCase. [source:foundation/iconography/library]

### The `<Icon>` Component — Props

Must: Use the `size` prop from the 5-step scale (`xs`/`sm`/`md`/`lg`/`xl`) — never override icon dimensions with font-size utilities or arbitrary CSS. [source:foundation/iconography/sizes]
Must: `className` prop is for layout utilities only (`block`, `flex-shrink-0`). Never pass color or sizing classes via `className`. [source:foundation/iconography/usage]
Must: Omit `label` prop for decorative icons (icon is hidden with `aria-hidden="true"`). Provide `label` prop only when the icon is the sole indicator of meaning with no surrounding text or button label. [source:foundation/iconography/accessibility]
Never: Provide `label` prop on `<Icon>` when the wrapper button already has `aria-label` — this creates duplicate screen reader announcements. [source:foundation/iconography/accessibility]

### Sizing

Must: Use `md` (20px) as the default icon size for buttons, nav items, and general UI. [source:foundation/iconography/sizes]
Must: Match icon size to text context — `sm` (16px) with caption/label text, `md` (20px) with body text, `md`/`lg` with subheadings, `lg` (24px) with headings. [source:foundation/iconography/sizes]
Never: Apply breakpoint prefixes (`md:`, `lg:`) directly to icon size. Icon size is determined by component context. If a component changes size across breakpoints, the icon size change is encapsulated inside that component's variant logic. [source:foundation/iconography/sizes]
Never: Set icon size via `text-*` font-size utilities — SVG size is controlled by `width`/`height` attributes via the `size` prop. [source:foundation/iconography/sizes]

### Color

Must: Control icon color through the parent element's text color using semantic tokens — icons inherit `currentColor`. [source:foundation/iconography/usage]
Must: Use `text-disabled-foreground` for disabled icons — same token as disabled text. Never reduce size or weight to communicate disabled state. [source:foundation/iconography/usage]
Never: Pass color or fill values directly to `<Icon>` — use semantic token classes on the parent wrapper. [source:foundation/iconography/usage]

### Interactivity

Never: Attach event handlers (e.g. `onClick`) directly to `<Icon>` — SVGs have no button role and are not keyboard-reachable by default. [source:foundation/iconography/usage]
Must: Wrap interactive icons in a `<button>` or `<a>`. The wrapper provides interaction semantics, keyboard target, and accessible label. [source:foundation/iconography/usage]

### Icon + Text Layout

Must: Use `flex items-center gap-2` as the default layout for icon + text pairings. [source:foundation/iconography/usage]
Prefer: `gap-1` (4px) for compact contexts (tags, badges); `gap-3` (12px) for larger display contexts. [source:foundation/iconography/usage]

### Icon-Only Interactive Elements

Must: Provide `aria-label` on the button/link wrapper for icon-only interactive elements. [source:foundation/iconography/usage]
Prefer: Wrapping icon-only buttons in a `<Tooltip>` for sighted users. The tooltip content must match the `aria-label` exactly. [source:foundation/iconography/usage]

---

## Accessibility

_Cross-cutting a11y rules consolidated from all foundation sections._

### Colors — Contrast Requirements (from foundation/colors/accessibility)

Must: Maintain minimum 4.5:1 contrast ratio for normal body text (WCAG AA). [source:foundation/colors/accessibility]
Must: Maintain minimum 3:1 contrast ratio for large text (18px+ or 14px bold) and non-text UI components (borders, icons). [source:foundation/colors/accessibility]
Avoid: `--color-muted-foreground` at small text sizes on `--color-surface-subtle` — 4.2:1 passes large text only. Use `--color-foreground` if the content needs to be readable at small sizes. [source:foundation/colors/accessibility]
Avoid: `--color-muted-foreground` at small text sizes on `--color-surface-muted` — 3.8:1 passes large text only. Use `--color-foreground` inside card detail rows if content is small. [source:foundation/colors/accessibility]
Never: Use `--color-success` (2.2:1) as standalone text or icon color — fails both text and non-text contrast thresholds. [source:foundation/colors/accessibility]
Must: Pair `--color-warning` (3.0:1) and `--color-success` with `--color-foreground` labels whenever they convey readable information. [source:foundation/colors/accessibility]

### Typography — Readability & State Communication

Must: Never communicate disabled state through reduced font size or weight — color (`text-disabled-foreground`) is the only permitted signal. Reducing size or weight harms readability for low-vision users. [source:foundation/typography/usage]
Must: Error and helper text must use `type-caption` (0.75rem / 12px) as the minimum — never use custom smaller sizes below this floor. [source:foundation/typography/usage]
Must: Links must be distinguishable from surrounding static text by both color (`text-link`) and decoration (`underline`) — color alone is not sufficient. [source:foundation/typography/usage]
Must: Keep body text within `max-w-prose` (~65 characters) — lines that stretch full container width impair readability for users with cognitive or visual processing differences. [source:foundation/typography/usage]

### Layout — Landmark Regions & Skip Navigation

Must: Use semantic landmark elements in the page shell: `<header>` (site header), `<nav>` (navigation, with `aria-label` if multiple), `<main>` (primary content), `<footer>` (site footer). [source:foundation/layout/overview]
Must: Every page must include a skip link — a visually hidden anchor targeting `<main id="main-content">` that becomes visible on focus-visible. [source:foundation/layout/overview]
Never: Omit `id="main-content"` on the `<main>` element when a skip link is present. [source:foundation/layout/overview]

### Focus

Must: Every interactive element must have a visible focus indicator when navigated by keyboard. [source:foundation/colors/usage]
Must: Use the dual-ring focus implementation — maize `outline` (visible on dark backgrounds, 8.2:1 on navy) + navy `box-shadow` offset (visible on light backgrounds). [source:foundation/colors/tokens]
Never: Use `outline: none` or `outline: 0` without an equivalent custom focus indicator. [source:foundation/colors/usage]

### Iconography — Touch Targets & Contrast

Must: Interactive wrappers around icons must be at least 44×44px. Use `min-w-[44px] min-h-[44px] flex items-center justify-center` on the button — this works for any icon size. [source:foundation/iconography/accessibility]
Never: Rely on padding calculated from icon pixel size for touch target — changing the `size` prop would break the math. [source:foundation/iconography/accessibility]
Never: Use `--color-success` (2.2:1) as a standalone icon color — fails non-text contrast (3:1 required). [source:foundation/iconography/accessibility]
Never: Use `--color-warning` (3.0:1) as a standalone icon color — at the exact floor, not a safe pass. [source:foundation/iconography/accessibility]
Must: When using `--color-success` or `--color-warning` for feedback icons, always pair with a `text-foreground` text label. The label carries the accessible meaning. [source:foundation/iconography/accessibility]
Must: Decorative icons (`aria-hidden="true"`) have no contrast requirement. Only semantic icons (with `label` prop) are subject to the 3:1 non-text contrast threshold. [source:foundation/iconography/accessibility]

---

## Components (General)

_Universal rules that apply to every component regardless of domain._
_To be populated from `docs/DECISIONS.md` and cross-cutting rules during Step -1._
