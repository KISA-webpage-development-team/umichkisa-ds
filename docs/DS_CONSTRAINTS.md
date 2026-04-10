# DS Constraints

_Populated during Step -1 (DS Documentation Review)._
_This file is referenced by `docs/specs/component.md` and read at the start of every component session._
_Each section is self-contained and designed to be injected as skill context in Step 4 (Component Skill)._

---

## Colors

### Token Usage

Must: Use semantic tokens (`--color-*`) in all component CSS and inline styles — never raw hex, raw OKLCH values, or primitive tokens. [source:foundation/colors/overview]
Never: Reference `--primitive-*` tokens directly in component code. [source:foundation/colors/overview]
Never: Implement dark mode — no `.dark` class, no `prefers-color-scheme` media queries, no dark-mode token layer. This design system is light mode only. [source:foundation/colors/overview]

### Naming (-subtle / -muted)

Must: Treat `-subtle` tokens as container/background roles — tinted regions, alert box fills, card backgrounds. [source:foundation/colors/tokens]
Must: Treat `-muted` tokens as deprioritized roles — lower-contrast text, elevated inner surfaces. [source:foundation/colors/tokens]

### Brand Colors

Must: Use `--color-brand-foreground` (maize) for all text placed on `--color-brand-primary` backgrounds. [source:foundation/colors/usage]
Never: Use white text on `--color-brand-primary` backgrounds — white is not a KISA brand color and breaks visual identity. [source:foundation/colors/usage]
Never: Use `--color-brand-accent` (maize) as link text color — low contrast on white and does not signal interactivity. [source:foundation/colors/usage]
Avoid: Using brand colors as mid-page card or content backgrounds — disrupts reading flow and feels heavy. [source:foundation/colors/usage]
Prefer: Reserving brand colors for intentional, sparse placement — navbars, hero sections, primary CTAs. [source:foundation/colors/usage]

### Surface Depth

Must: Follow the two-level surface depth model: page and cards → `--color-surface` (white), elevated inner surfaces (table headers, code blocks, inset sections) → `--color-surface-subtle`, deprioritized inner surfaces → `--color-surface-muted`. Cards are distinguished from the page by their border, not by background color. [source:foundation/colors/usage]

### Text

Must: Use `--color-link` (not `--color-brand-accent`) for all hyperlinks and inline clickable text. [source:foundation/colors/usage]
Never: Use `--color-disabled-foreground` for content that needs to be read — intentionally below contrast thresholds. [source:foundation/colors/usage]
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

Must: Implement the dual-ring focus pattern on **buttons and icon-only interactive elements**: `outline: 2px solid var(--color-focus-ring)` (maize, contrast on dark) + `box-shadow: 0 0 0 4px var(--color-brand-primary)` (navy, contrast on light). Both rings must be present. [source:foundation/colors/tokens]
Exception: **Form controls** (Input, Textarea, Select, Checkbox, Switch, Radio) use a simplified focus pattern: `outline: none` + `border-color: var(--color-brand-primary)`. The border color change is sufficient for elements that already have a visible border. [source:implementation/form-controls]
Never: Remove the focus indicator entirely — every interactive element must have a visible focus state. Buttons use the dual-ring; form controls use the border-color change. [source:foundation/colors/usage]
Prefer: `--color-surface-subtle` as hover background and `--color-border-strong` as hover border for neutral/gray interactive elements (interim until dedicated neutral interactive tokens are defined). [source:foundation/colors/tokens]
Must: Use `--color-brand-primary` (navy) as the checked/selected background for toggle controls (Checkbox, Radio, Switch). [source:form-ui-review/2026-03-31]
Must: Use `--color-brand-foreground` (maize) for **stroke-based** indicators on checked toggle controls — checkmarks. Use `--color-surface` (white) for **fill-based** indicators — radio dots, switch thumbs. Stroke accents use maize; solid fills use white. [source:form-ui-review/2026-04-02]
Must: Use `--color-brand-accent-subtle` (light maize) as hover/focus background for interactive list items (Select items, Dropdown items, Popover menu items). [source:form-ui-review/2026-03-31]
Must: Use `--color-brand-primary` for selected-item indicators (check icons) in interactive lists. [source:form-ui-review/2026-03-31]

---

## Typography

### Fonts

Must: Use `font-sejong-bold` for all `type-display` and `type-h1` — SejongHospital Bold is the only permitted weight for these roles. [source:foundation/typography/fonts]
Never: Use SejongHospital below H1 — hand off to Pretendard at H2 and every level below. [source:foundation/typography/fonts]
Exception: `font-sejong-bold` may be used in docs-app navigation for: Header logo text (`type-body`) and Sidebar category headings (`type-body-sm`). All other navigation text (Header section nav, Sidebar nav links) uses Pretendard. This exception applies only to `apps/docs/` navigation chrome, not to page content or `packages/web/` components. [source:header-sidebar-redesign/2026-04-04]
Never: Use `font-sejong-light` as a default heading weight — it is permitted only in marketing/landing page contexts for large decorative display text at `text-4xl` or larger, paired alongside a Bold display line. Never in app UI. [source:foundation/typography/fonts]
Never: Use Geist Mono (`font-mono`) in client application components — it is a documentation-site-only font. [source:foundation/typography/fonts]
Exception: `font-mono` may be composed alongside a `type-*` class in docs-site components (`apps/docs/`) when no monospace `type-*` variant exists in the DS yet (e.g. `type-caption font-mono` for code blocks). This exception does not apply to `packages/web/` components.
Must: Both product fonts (SejongHospital and Pretendard) must use `font-display: swap` in their `@font-face` declarations. [source:foundation/typography/fonts]
Must: Preload SejongHospital — it appears in Display and H1 (above-the-fold on most pages) and must be fetched before the browser discovers it in CSS. [source:foundation/typography/fonts]

### Scale

Must: Use `type-*` semantic utility classes for all typography — never compose raw Tailwind utilities (`text-base font-normal leading-relaxed`) in component code. [source:foundation/typography/usage]
Must: Apply `tracking-tight` to `type-display` and `type-h1`; use `tracking-normal` for all other type roles. [source:foundation/typography/scale]
Must: Use `type-display` for hero sections and landing pages; use `type-h1` for page titles within the app. [source:foundation/typography/scale]
Prefer: Applying `type-h2` styling to a semantic `<h1>` element when `type-display` is already used on the page — visual hierarchy takes precedence over the class name. [source:foundation/typography/scale]
Must: Rely on `type-*` class definitions for responsive behavior — do not add breakpoint overrides for typography in components. [source:foundation/typography/scale]

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
Must: Underline links on hover (`hover:underline`). Hover state: `hover:text-brand-primary`. No separate visited style. [source:foundation/typography/usage]
### Truncation

Must: Use `truncate` for single-line UI element truncation (nav items, table cells, tags, badges). [source:foundation/typography/usage]
Prefer: `line-clamp-2` for card titles; `line-clamp-3` for card descriptions when multi-line truncation is needed. [source:foundation/typography/usage]

---

## Layout

### Breakpoints

Must: Use only the three layout tiers — default (mobile), `md:` (≥ 768px), `lg:` (≥ 1024px) — for all responsive behavior. [source:foundation/layout/breakpoints]
Never: Use `sm:`, `xl:`, or `2xl:` breakpoints. If a layout cannot be solved with three tiers, the problem is in the component or design, not the breakpoint system. [source:foundation/layout/breakpoints]

### Spacing

Must: All spacing values must come from Tailwind's built-in scale (4px base unit). Never use arbitrary values (`px-[24px]`, `mt-[13px]`). [source:foundation/layout/spacing]
Must: Default column gutter is `gap-2` (8px) for inline and form layouts — consistent across all breakpoints. [source:foundation/layout/spacing]
Must: Grid component uses the three-tier gap system (`element` / `component` / `section`) for content grid layouts. Default is `component` (16px). [source:foundation/layout/spacing]

### Vertical Spacing

Must: Use the three-tier vertical spacing system — Element (`gap-2` / 8px), Component (`gap-4` / 16px), Section (`gap-6` / 24px). [source:foundation/layout/spacing]
Never: Scale vertical spacing values with breakpoints. Layout responsiveness is column reflow, not gap scaling. [source:foundation/layout/spacing]
Must: Element tier (`gap-2`) for label → input, icon → text, caption below field, heading → subtitle. [source:foundation/layout/spacing]
Must: Component tier (`gap-4`) for stacked form fields, list items, stacked cards, navigation items. [source:foundation/layout/spacing]
Must: Section tier (`gap-6`) for gaps between major page sections. Section tier is 1.5× the component tier — it provides a clear visual break without exceeding the mobile inset. [source:foundation/layout/spacing]

### Page Shell

Must: The page shell must combine all four concerns together: `mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8`. Never apply only part of this pattern. [source:foundation/layout/spacing]
Must: Use the `Container` component to apply the page shell pattern — never manually compose the utility classes. [source:component/container]
Must: For full-bleed elements (navbar, hero, footer), apply background to a full-width outer wrapper and nest the `Container` inside for content alignment. [source:foundation/layout/spacing]
Never: Nest `Container` components — each page region gets one Container at most. [source:component/container]

---

## Iconography

### Library

Must: Use Lucide as the sole icon library. Never import from `react-icons`, use emoji as icons, or use PNG/JPG icons. [source:foundation/iconography/library]
Never: Import a Lucide icon directly into a component — always use the `<Icon>` wrapper component. [source:foundation/iconography/overview]
Prefer: Exhausting the Lucide search (including synonyms) before adding a custom SVG. Custom SVGs are exceptions, not alternatives. [source:foundation/iconography/library]

### Custom Icons

Must: Custom icons that aren't in Lucide must be added to the `<Icon>` registry by the design system project owner — never inlined as raw SVGs in component code. Devs request additions; consumption is always `<Icon name="..." />`. [source:foundation/iconography/library]
Must: Stroke-based custom icons registered in the `<Icon>` system must match Lucide's visual language exactly: `viewBox="0 0 24 24"`, `stroke-width="2"`, `stroke="currentColor"`, `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`. [source:foundation/iconography/library]
Exception: Brand icons (e.g., GitHub, LinkedIn) are registered in the `<Icon>` system as fill-based SVGs with their original viewBox. They do not need to match Lucide's stroke style. [source:implementation/icon]
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
### Color

Must: Control icon color through the parent element's text color using semantic tokens — icons inherit `currentColor`. [source:foundation/iconography/usage]
Must: Use `text-disabled-foreground` for disabled icons — same token as disabled text. Never reduce size or weight to communicate disabled state. [source:foundation/iconography/usage]

### Interactivity

Never: Attach event handlers (e.g. `onClick`) directly to `<Icon>` — SVGs have no button role and are not keyboard-reachable by default. Wrap in `<button>` or `<a>`. [source:foundation/iconography/usage]

### Icon + Text Layout

Must: Use `flex items-center gap-2` as the default layout for icon + text pairings. [source:foundation/iconography/usage]
Prefer: `gap-1` (4px) for compact contexts (tags, badges); `gap-3` (12px) for larger display contexts. [source:foundation/iconography/usage]

### Icon-Only Interactive Elements

Must: Provide `aria-label` on the button/link wrapper for icon-only interactive elements. [source:foundation/iconography/usage]
Prefer: Wrapping icon-only buttons in a `<Tooltip>` for sighted users. The tooltip content must match the `aria-label` exactly. [source:foundation/iconography/usage]

---

## Accessibility

_Rules unique to this section — domain-specific a11y rules live in their respective sections (Colors, Typography, etc.)._

### Contrast Thresholds

Must: Maintain minimum 4.5:1 contrast ratio for normal body text (WCAG AA). [source:foundation/colors/accessibility]
Must: Maintain minimum 3:1 contrast ratio for large text (18px+ or 14px bold) and non-text UI components (borders, icons). [source:foundation/colors/accessibility]
Avoid: `--color-muted-foreground` at small text sizes on `--color-surface-subtle` — 4.2:1 passes large text only. Use `--color-foreground` if the content needs to be readable at small sizes. [source:foundation/colors/accessibility]
Avoid: `--color-muted-foreground` at small text sizes on `--color-surface-muted` — 3.8:1 passes large text only. Use `--color-foreground` inside card detail rows if content is small. [source:foundation/colors/accessibility]

### Typography Floor

Must: Error and helper text must use `type-caption` (0.75rem / 12px) as the minimum — never use custom smaller sizes below this floor. [source:foundation/typography/usage]

### Landmark Regions & Skip Navigation

Must: Use semantic landmark elements in the page shell: `<header>` (site header), `<nav>` (navigation, with `aria-label` if multiple), `<main>` (primary content), `<footer>` (site footer). [source:foundation/layout/overview]
Must: Every page must include a skip link — a visually hidden anchor targeting `<main id="main-content">` that becomes visible on focus-visible. [source:foundation/layout/overview]

### Touch Targets

Must: Interactive wrappers around icons must be at least 44×44px. [source:foundation/iconography/accessibility]
Prefer: The `::after` pseudo-element technique for compact interactive elements — positioned absolutely, centered, with `min-w-[44px] min-h-[44px]`, `position: relative` on the wrapper. Extends touch target without inflating the visible box. [source:foundation/iconography/accessibility]

### Icon Contrast

Must: Decorative icons (`aria-hidden="true"`) have no contrast requirement. Only semantic icons (with `label` prop) are subject to the 3:1 non-text contrast threshold. [source:foundation/iconography/accessibility]

---

## Form Controls

### Toggle Controls (Checkbox, Switch, Radio)

Must: Toggle controls (Checkbox, Switch, RadioItem) use the `text` string prop for inline label text — never pass label content as children or via external markup. [source:form-ui-review/2026-03-31]
Must: Toggle inline label text uses `type-body-sm text-foreground`. Exception: Switch `size="sm"` uses `type-caption`. [source:form-ui-review/2026-03-31]

### FormItem Composition

Must: FormItem is for vertical label-above-control layout only. Toggle controls compose with FormItem as children — FormItem provides the field heading, the toggle's `text` prop provides the inline description. [source:form-ui-review/2026-03-31]
Must: Wire `aria-describedby` manually on the form control to associate FormItem's description/error text. IDs follow the pattern `{htmlFor}-description` and `{htmlFor}-error`. [source:form-ui-review/2026-03-31]
Must: Use `htmlFor` for native form elements (input, textarea). Use `aria-labelledby` with the Label's `id` for non-native triggers (Select, RadioGroup). FormItem auto-generates `{htmlFor}-label` on its Label — reference it on the control when needed. [source:label-id/2026-04-04]

---

## Documentation

### API Reference Tables

Must: Required props (no `?` in TypeScript type, no default value) use an asterisk appended to the prop name — never `(required)` in the Default column. Pattern: `<InlineCode>propName<span aria-label="required">*</span></InlineCode>` (desktop) and `<strong>propName<span aria-label="required">*</span></strong>` (mobile). Default column shows `—` for required props. [source:required-prop-sweep/2026-04-11]
Must: Tables containing required props must have a `<p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>` caption after both the desktop Table and mobile TableMobileList. Omit when no props are required. [source:required-prop-sweep/2026-04-11]
