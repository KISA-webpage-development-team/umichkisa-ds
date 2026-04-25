# DS Client Usage Constraints

_Consumer-side rules for client app code that imports `@umichkisa-ds`. Referenced by the `ds-client-review` agent during migration._
_For the component lookup table (which component to use, import paths), see `DS_CODEBASE.md`._
_For author-side rules (building DS components), see `DS_CONSTRAINTS.md`._

---

## Part 1 — Write-Time Decision Tree

_Read this BEFORE writing any line of client code that touches UI. Implementers: this is your write-time cheat sheet. Reviewers: skip to Part 2 — Review-Time Rulebook below._

---

## Part 2 — Review-Time Rulebook

_Full constraint taxonomy. The `ds-client-review` agent scans this end-to-end._

### Setup

#### CSS Entry Point

Must: For Tailwind v4 consumers (the standard case — all current KISA apps), import `@umichkisa-ds/web/theme.css` in the app's Tailwind-processed CSS entry (e.g. `globals.css`). This re-exports the DS source so the consumer's own Tailwind build emits DS tokens + utilities + component classes against actual client usage. [source:phase-0-gap/2026-04-18]
Never: Import `@umichkisa-ds/web/dist/styles.css` in a Tailwind v4 consumer. The precompiled bundle is tree-shaken against DS source only, so utilities like `bg-brand-primary`, `text-foreground`, `border-border-strong` used in the client's JSX resolve to nothing at runtime — silent visual breakage. Use `dist/styles.css` only from non-Tailwind consumers that can't compile the source. [source:phase-0-gap/2026-04-18]

#### Font Loading (Next.js)

Must: Load SejongHospital Bold and Light via `next/font/local`, using the exact CSS variable names `--font-sejong-bold` and `--font-sejong-light`, with `display: 'swap'`. Apply both `.variable` classes to the `<html>` element. This overrides the baseline `@font-face` from `styles.css` with preloaded, optimized fonts. [source:docs-app/foundation/typography/fonts]
Must: Load Pretendard Variable via CDN — add `<link rel="preconnect" href="https://cdn.jsdelivr.net">` and the stylesheet link to `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css` in the document `<head>`. [source:docs-app/foundation/typography/fonts]
Never: Duplicate font files into the client repo — SejongHospital files live in the DS package at `packages/web/src/fonts/`. Point `next/font/local` at the DS source (adjust relative path based on app location). [source:docs-app/foundation/typography/fonts]
Never: Load Geist Mono (`font-geist-mono`) in client apps — it is a documentation-site-only font. [source:DS_CONSTRAINTS.md/typography]

---

### Component Usage

Must: Check `DS_CODEBASE.md` before building any local UI component — if a DS equivalent exists, use it. [source:HARNESS_DESIGN.md/missing-ds-components]
Must: Use DS components directly by importing from `@umichkisa-ds/web` or `@umichkisa-ds/form`. [source:DS_CODEBASE.md/packages]
Never: Wrap or re-export a DS component to add default props or rename it (e.g., no `MyButton` that re-exports `Button`). This creates a shadow component layer that drifts from the DS over time. [source:grill-session/2026-04-12]

#### Feedback & Status Components

Must: Replace legacy `@/components/ui/feedback` imports with DS equivalents when touching a file during migration. The legacy module is a shadow of DS feedback primitives and must be emptied over the course of the migration. [source:phase-2/lane-2.0 review, 2026-04-23]

Mapping:
- `NotAuthorized` → `<StatusView variant="not-authorized" />` from `@umichkisa-ds/web`
- `NotFound` → `<StatusView variant="not-found" />` from `@umichkisa-ds/web`
- `NotLogin` → `<StatusView variant="not-logged-in" />` from `@umichkisa-ds/web`
- `UnexpectedError` → `<StatusView variant="error" />` from `@umichkisa-ds/web`
- `LoadingSpinner` → `LoadingSpinner` from `@umichkisa-ds/web` (re-import, don't re-implement)
- `UnderConstruction` / `OnlyMobileView` → no current DS equivalent; collect via `ds-fix-during-migration` if needed, otherwise keep local

Never: Leave a legacy `@/components/ui/feedback` import in any file being migrated in the current lane — swap it in-lane even if the lane's primary scope is different. The only exception is when the lane's issue explicitly lists the swap as a non-goal (e.g., a page-shell lane defers feedback migration to a later legacy-ui-swap lane). [source:phase-2/lane-2.0 review, 2026-04-23]

#### Status Variant Selection (G2)

Must: When a `Badge`, `Alert`, or other DS feedback component expresses status, use the **semantic** variant — `success`, `warning`, `error`, `info` — not the neutral/outline variant.

Status content includes: "available now" / "즉시 제공" → `success`; "age check required" / "연령 확인" → `warning`; error states → `error`; passive informational → `info`.

`outline` / default neutral is for non-status content (categorical tags, generic labels).

[source:phase-2/lane-2.11b smoke fix, commit 59462d4]

---

### Styling

#### Tokens

Must: Use DS semantic color tokens for all color values — `text-foreground`, `bg-surface`, `border-brand-primary`, etc. Never use raw hex values, raw OKLCH, or Tailwind's default color palette (`text-gray-500`). [source:DS_CONSTRAINTS.md/colors]
Must: Use `type-*` semantic utility classes for all typography — never compose raw Tailwind utilities (`text-base font-normal leading-relaxed`). [source:DS_CONSTRAINTS.md/typography]
Never: Override the weight of a `type-*` class with `!font-*` (e.g., `type-body !font-semibold`, `type-h2 !font-bold`). The `type-*` tier already bakes weight, font-family, and line-height. If a different weight is needed, pick a different `type-*` class — do not override. [source:MEMORY/feedback_type_weight_override; phase-2/lane-2.19 commit 09d2cd0 swept these out]

Exception during migration: short-lived `!font-*` overrides may exist when the type-* tier doesn't yet expose the desired weight. Collect these as a DS gap (request a new `type-*` tier or a weight variant via `ds-fix-during-migration`); do not let them ship long-term.
Must: Pair an explicit color token with every `type-*` class — `type-*` classes do not set color. [source:DS_CONSTRAINTS.md/typography]
Never: Import font loaders directly from the client (e.g. `@/utils/fonts/textFonts` — `sejongHospitalBold`, `sejongHospitalLight`, `arial`, `heebo`, `montserrat`) and apply `.className` to elements. Font families are owned by the DS: `@font-face` + `--font-sejong-*` / `--font-pretendard` CSS variables are declared in `dist/styles.css`'s `@theme` block and consumed exclusively via `type-*` tokens (`type-h1`/`type-display` → Sejong Bold; `type-h2`/`type-h3`/`type-body*`/`type-label`/`type-caption` → Pretendard). The only legitimate direct use of `next/font/local` is at the app root for preloading/optimization (see "Font Loading (Next.js)" above) — not inline on component elements. During migration, strip any `sejongHospital*.className` / `heebo.className` / `montserrat.className` imports from lane files as you touch them. [source:client#80 Phase 1.2 review, 2026-04-21]

#### Class Utilities

Must: Use `cn()` from `@umichkisa-ds/web` for all class merging — not raw `clsx`, `classnames`, or string concatenation. [source:DS_CODEBASE.md/utilities]
Never: Use arbitrary Tailwind values (`px-[24px]`, `text-[#00274C]`, `mt-[13px]`). All spacing must come from Tailwind's built-in scale; all colors must come from DS semantic tokens. [source:DS_CONSTRAINTS.md/layout]

#### CSS Files

Never: Create new CSS modules or `.css` files for migrated components — use Tailwind utility classes with DS tokens. [source:grill-session/2026-04-12]

---

### Icons

Must: Use `<Icon name="...">` from `@umichkisa-ds/web` for all icons. [source:DS_CONSTRAINTS.md/iconography]
Never: Import from `react-icons` — fully replaced by the DS icon system. [source:DS_CONSTRAINTS.md/iconography]
Never: Import directly from `lucide-react` — always go through the `<Icon>` wrapper component. [source:DS_CONSTRAINTS.md/iconography]
Never: Inline raw SVGs in client components — all icons must go through the `<Icon>` registry. If a needed icon doesn't exist, collect it for DS registration via the `ds-fix-during-migration` flow. [source:DS_CONSTRAINTS.md/iconography, HARNESS_DESIGN.md/missing-ds-components]
Must: Use the `size` prop from the 5-step scale (`xs`/`sm`/`md`/`lg`/`xl`) — never override icon dimensions with font-size utilities or arbitrary CSS. [source:DS_CONSTRAINTS.md/iconography]

---

### Forms

Must: Use `Form.*` compound fields from `@umichkisa-ds/form` for all form controls (`Form.Input`, `Form.Textarea`, `Form.Select`, `Form.Checkbox`, `Form.Radio`, `Form.Switch`, `Form.Button`). [source:DS_CODEBASE.md/form-wiring]
Must: Use `useForm` from `@umichkisa-ds/form` to initialize form state — not `useForm` from `react-hook-form` directly. [source:DS_CODEBASE.md/form-wiring]
Never: Use native `useState` for form field values or validation state in migrated forms — all form state goes through `useForm`. [source:grill-session/2026-04-12]
Prefer: `useFormField` escape hatch only for custom controls not covered by `Form.*` compounds. [source:DS_CODEBASE.md/form-wiring]
Never: Import any RHF symbol (`useForm`, `useFormField`, `useFormStatus`, `useFormContext`, `useFormState`, `useWatch`, `Controller`) directly from `react-hook-form`. Always use `@umichkisa-ds/form` re-exports. The DS form package wraps `useForm` with `mode: "onTouched"` and other defaults; bypassing the wrapper produces inconsistent validation timing and breaks the DS form contract.

If a hook you need is not yet re-exported by `@umichkisa-ds/form`, treat it as a DS gap and run `ds-fix-during-migration` to add the re-export — do not import from `react-hook-form` as a workaround. [source:phase-2/lane-2.19 — `useFormContext` was missing from `@umichkisa-ds/form`; required form 1.0.1 re-export commit 086c148]

_Note: Validation strategy (zod + RHF resolver vs. RHF-native rules) is deferred to Phase -1.7. Rules will be added here once resolved._

---

### Layout

Must: Use `Container` from `@umichkisa-ds/web` for the page shell pattern — never manually compose `mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8`. [source:DS_CONSTRAINTS.md/layout]
Never: Nest `Container` components — each page region gets one `Container` at most. [source:DS_CONSTRAINTS.md/layout]
Must: Follow the three-tier vertical spacing system — Element (`gap-2` / 8px), Component (`gap-4` / 16px), Section (`gap-6` / 24px). [source:DS_CONSTRAINTS.md/layout]

**Tier-justify every spacing value before writing.** Spacing inside a single component (image+text inside a row, label+input inside a field, icon+text inside a chip) is **Component or Element tier** (`gap-2` / `gap-3` / `gap-4`), not Section tier. `gap-6`/`gap-8` are reserved for boundaries between major page sections. [source:phase-2/lane-2.11b smoke fix, commit 59462d4 — `gap-6` → `gap-4` correction on row internals]

Write-time check (when picking a `gap-*` / `space-*` value):
1. What is the role of the container? (page section / component-internal / inline)
2. Is the chosen value the canonical tier value for that role? (8 / 16 / 24 px = `gap-2` / `gap-4` / `gap-6`)
3. If you cannot answer (1) and (2) cleanly, do not write the value — ask.

Must: Use only the three layout breakpoint tiers — default (mobile), `md:` (>= 768px), `lg:` (>= 1024px). Never use `sm:`, `xl:`, or `2xl:`. [source:DS_CONSTRAINTS.md/layout]

---

### Local Components

#### Decision Tree

A component **stays local** in the client app if ANY of these are true:
- It contains business logic (API calls, app state, routing)
- It is a composition of DS primitives for a specific feature (e.g., `JobCard` composing `Card` + `Badge` + `Icon`)
- It is a one-off layout specific to a single page

A component **should be in DS** if ALL of these are true:
- It is a generic UI primitive (could be used in any app)
- It has no business logic
- It doesn't exist in DS yet

[source:grill-session/2026-04-12, HARNESS_DESIGN.md/missing-ds-components]

#### Styling Rules for Local Components

Must: Local components follow the same DS token and styling rules as everything else — semantic colors, `type-*` classes, spacing tiers, `cn()` for class merging. Being local is not an excuse for raw utilities. [source:grill-session/2026-04-12]

---

### className Passthrough

Prefer: Only pass layout and positioning classes via `className` on DS components — `mt-4`, `w-full`, `flex-1`, `hidden md:block`, etc. [source:grill-session/2026-04-12]
Avoid: Overriding DS component internals via `className` (padding, font-size, color, border-radius). Frequent overrides signal that the DS component needs a new variant — collect these for DS fixes. [source:grill-session/2026-04-12]
Exception: When an app-specific override is genuinely necessary, add a comment explaining why. [source:grill-session/2026-04-12]

---

### DS Component Layout — Do Not Override (G1)

Never: Add flex / overflow / height / max-height utility classes to a DS layout component (`Dialog`, `DialogContent`, `Tabs`, `TabsList`, `TabsContent`, `Form`, `Card`, `CardContent`, `CardFooter`, `Sheet`, `Drawer`) to force size or layout. The DS owns the layout pattern of these components — flex containers, gap spacing, overflow behavior. Adding `flex flex-1 overflow-hidden` to `<Tabs>` or `<Form>` to make them fill height is fighting the DS. [source:phase-2/lane-2.11b smoke fix, commit c4cea05]

If a layout doesn't fit:
- Cap inner content with `max-h-[60vh]` (or similar) on the inner content child (e.g., `<TabsContent>`), not on the outer DS layout component
- If the cap doesn't solve it, the DS component is missing a variant — collect via `ds-fix-during-migration`

Allowed (positioning passthrough): `mt-4`, `w-full`, `mx-auto`, `hidden md:block` on DS components — these are layout/positioning, not internal layout overrides.

Disallowed examples (would have been caught here in Phase 2):
- `<Tabs className="flex flex-1 flex-col overflow-hidden">` — overrides DS Tabs layout
- `<Form className="flex flex-1 flex-col gap-4 overflow-hidden">` — overrides DS Form layout
- `<DialogContent className="max-h-[90dvh] flex flex-col">` — DS Dialog now owns this; override is redundant

Allowed:
- `<TabsContent className="max-h-[60vh] overflow-y-auto">` — height cap on inner content, not on DS layout

---

### Third-Party Libraries

Never: Import from `@radix-ui/*` directly for UI that DS already provides (Dialog, Dropdown, Popover, Accordion, etc.) — DS wraps Radix internally. [source:grill-session/2026-04-12]
Never: Import from NextUI or HeroUI — fully replaced by DS. [source:grill-session/2026-04-12]
Prefer: DS components over any third-party UI library when a DS equivalent exists. [source:grill-session/2026-04-12]
Exception: Domain-specific libraries with no DS equivalent (`@fullcalendar/react`, `react-quill`, `embla-carousel-react`) are fine as app-level dependencies. [source:HARNESS_DESIGN.md/missing-ds-components]

---

### Migration-Specific

_Temporary rules for the client migration (Phases 0–5). Remove this section post-migration._

Must: Collect missing DS components and icons encountered during each phase — do not block on them. They are addressed at phase end via the `ds-fix-during-migration` skill. [source:HARNESS_DESIGN.md/missing-ds-components]
Must: Remove old local UI component imports as they are replaced by DS equivalents. [source:grill-session/2026-04-12]
Must: Remove old CSS module files when the component they styled is fully migrated. [source:grill-session/2026-04-12]
Never: Leave both old and new implementations coexisting in the same component — complete the replacement before moving on. [source:grill-session/2026-04-12]
