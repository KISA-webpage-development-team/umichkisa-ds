# DS Client Usage Constraints

_Consumer-side rules for client app code that imports `@umichkisa-ds`. Referenced by the `ds-client-review` agent during migration._
_For the component lookup table (which component to use, import paths), see `DS_CODEBASE.md`._
_For author-side rules (building DS components), see `DS_CONSTRAINTS.md`._

---

## Setup

### CSS Entry Point

Must: Import `@umichkisa-ds/web/dist/styles.css` in the app root layout — this provides all component styles, semantic tokens, and baseline `@font-face` declarations. [source:DS_CODEBASE.md/packages]

### Font Loading (Next.js)

Must: Load SejongHospital Bold and Light via `next/font/local`, using the exact CSS variable names `--font-sejong-bold` and `--font-sejong-light`, with `display: 'swap'`. Apply both `.variable` classes to the `<html>` element. This overrides the baseline `@font-face` from `styles.css` with preloaded, optimized fonts. [source:docs-app/foundation/typography/fonts]
Must: Load Pretendard Variable via CDN — add `<link rel="preconnect" href="https://cdn.jsdelivr.net">` and the stylesheet link to `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css` in the document `<head>`. [source:docs-app/foundation/typography/fonts]
Never: Duplicate font files into the client repo — SejongHospital files live in the DS package at `packages/web/src/fonts/`. Point `next/font/local` at the DS source (adjust relative path based on app location). [source:docs-app/foundation/typography/fonts]
Never: Load Geist Mono (`font-geist-mono`) in client apps — it is a documentation-site-only font. [source:DS_CONSTRAINTS.md/typography]

---

## Component Usage

Must: Check `DS_CODEBASE.md` before building any local UI component — if a DS equivalent exists, use it. [source:HARNESS_DESIGN.md/missing-ds-components]
Must: Use DS components directly by importing from `@umichkisa-ds/web` or `@umichkisa-ds/form`. [source:DS_CODEBASE.md/packages]
Never: Wrap or re-export a DS component to add default props or rename it (e.g., no `MyButton` that re-exports `Button`). This creates a shadow component layer that drifts from the DS over time. [source:grill-session/2026-04-12]

---

## Styling

### Tokens

Must: Use DS semantic color tokens for all color values — `text-foreground`, `bg-surface`, `border-brand-primary`, etc. Never use raw hex values, raw OKLCH, or Tailwind's default color palette (`text-gray-500`). [source:DS_CONSTRAINTS.md/colors]
Must: Use `type-*` semantic utility classes for all typography — never compose raw Tailwind utilities (`text-base font-normal leading-relaxed`). [source:DS_CONSTRAINTS.md/typography]
Must: Pair an explicit color token with every `type-*` class — `type-*` classes do not set color. [source:DS_CONSTRAINTS.md/typography]

### Class Utilities

Must: Use `cn()` from `@umichkisa-ds/web` for all class merging — not raw `clsx`, `classnames`, or string concatenation. [source:DS_CODEBASE.md/utilities]
Never: Use arbitrary Tailwind values (`px-[24px]`, `text-[#00274C]`, `mt-[13px]`). All spacing must come from Tailwind's built-in scale; all colors must come from DS semantic tokens. [source:DS_CONSTRAINTS.md/layout]

### CSS Files

Never: Create new CSS modules or `.css` files for migrated components — use Tailwind utility classes with DS tokens. [source:grill-session/2026-04-12]

---

## Icons

Must: Use `<Icon name="...">` from `@umichkisa-ds/web` for all icons. [source:DS_CONSTRAINTS.md/iconography]
Never: Import from `react-icons` — fully replaced by the DS icon system. [source:DS_CONSTRAINTS.md/iconography]
Never: Import directly from `lucide-react` — always go through the `<Icon>` wrapper component. [source:DS_CONSTRAINTS.md/iconography]
Never: Inline raw SVGs in client components — all icons must go through the `<Icon>` registry. If a needed icon doesn't exist, collect it for DS registration via the `ds-fix-during-migration` flow. [source:DS_CONSTRAINTS.md/iconography, HARNESS_DESIGN.md/missing-ds-components]
Must: Use the `size` prop from the 5-step scale (`xs`/`sm`/`md`/`lg`/`xl`) — never override icon dimensions with font-size utilities or arbitrary CSS. [source:DS_CONSTRAINTS.md/iconography]

---

## Forms

Must: Use `Form.*` compound fields from `@umichkisa-ds/form` for all form controls (`Form.Input`, `Form.Textarea`, `Form.Select`, `Form.Checkbox`, `Form.Radio`, `Form.Switch`, `Form.Button`). [source:DS_CODEBASE.md/form-wiring]
Must: Use `useForm` from `@umichkisa-ds/form` to initialize form state — not `useForm` from `react-hook-form` directly. [source:DS_CODEBASE.md/form-wiring]
Never: Use native `useState` for form field values or validation state in migrated forms — all form state goes through `useForm`. [source:grill-session/2026-04-12]
Prefer: `useFormField` escape hatch only for custom controls not covered by `Form.*` compounds. [source:DS_CODEBASE.md/form-wiring]
Never: Import `react-hook-form` directly — always use `@umichkisa-ds/form` re-exports (`useForm`, `useFormField`, `useFormStatus`). [source:grill-session/2026-04-12]

_Note: Validation strategy (zod + RHF resolver vs. RHF-native rules) is deferred to Phase -1.7. Rules will be added here once resolved._

---

## Layout

Must: Use `Container` from `@umichkisa-ds/web` for the page shell pattern — never manually compose `mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8`. [source:DS_CONSTRAINTS.md/layout]
Never: Nest `Container` components — each page region gets one `Container` at most. [source:DS_CONSTRAINTS.md/layout]
Must: Follow the three-tier vertical spacing system — Element (`gap-2` / 8px), Component (`gap-4` / 16px), Section (`gap-6` / 24px). [source:DS_CONSTRAINTS.md/layout]
Must: Use only the three layout breakpoint tiers — default (mobile), `md:` (>= 768px), `lg:` (>= 1024px). Never use `sm:`, `xl:`, or `2xl:`. [source:DS_CONSTRAINTS.md/layout]

---

## Local Components

### Decision Tree

A component **stays local** in the client app if ANY of these are true:
- It contains business logic (API calls, app state, routing)
- It is a composition of DS primitives for a specific feature (e.g., `JobCard` composing `Card` + `Badge` + `Icon`)
- It is a one-off layout specific to a single page

A component **should be in DS** if ALL of these are true:
- It is a generic UI primitive (could be used in any app)
- It has no business logic
- It doesn't exist in DS yet

[source:grill-session/2026-04-12, HARNESS_DESIGN.md/missing-ds-components]

### Styling Rules for Local Components

Must: Local components follow the same DS token and styling rules as everything else — semantic colors, `type-*` classes, spacing tiers, `cn()` for class merging. Being local is not an excuse for raw utilities. [source:grill-session/2026-04-12]

---

## className Passthrough

Prefer: Only pass layout and positioning classes via `className` on DS components — `mt-4`, `w-full`, `flex-1`, `hidden md:block`, etc. [source:grill-session/2026-04-12]
Avoid: Overriding DS component internals via `className` (padding, font-size, color, border-radius). Frequent overrides signal that the DS component needs a new variant — collect these for DS fixes. [source:grill-session/2026-04-12]
Exception: When an app-specific override is genuinely necessary, add a comment explaining why. [source:grill-session/2026-04-12]

---

## Third-Party Libraries

Never: Import from `@radix-ui/*` directly for UI that DS already provides (Dialog, Dropdown, Popover, Accordion, etc.) — DS wraps Radix internally. [source:grill-session/2026-04-12]
Never: Import from NextUI or HeroUI — fully replaced by DS. [source:grill-session/2026-04-12]
Prefer: DS components over any third-party UI library when a DS equivalent exists. [source:grill-session/2026-04-12]
Exception: Domain-specific libraries with no DS equivalent (`@fullcalendar/react`, `react-quill`, `embla-carousel-react`) are fine as app-level dependencies. [source:HARNESS_DESIGN.md/missing-ds-components]

---

## Migration-Specific

_Temporary rules for the client migration (Phases 0–5). Remove this section post-migration._

Must: Collect missing DS components and icons encountered during each phase — do not block on them. They are addressed at phase end via the `ds-fix-during-migration` skill. [source:HARNESS_DESIGN.md/missing-ds-components]
Must: Remove old local UI component imports as they are replaced by DS equivalents. [source:grill-session/2026-04-12]
Must: Remove old CSS module files when the component they styled is fully migrated. [source:grill-session/2026-04-12]
Never: Leave both old and new implementations coexisting in the same component — complete the replacement before moving on. [source:grill-session/2026-04-12]
