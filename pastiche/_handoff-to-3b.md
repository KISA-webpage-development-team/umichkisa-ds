# Phase 3c → 3b Handoff

Scenario-conditional rules dropped from `docs/DS_CONSTRAINTS.md` while seeding `WISDOM.md`. Phase 3b (KNOWLEDGE seeding) absorbs these as `scenario → atom` mappings.

The shape is intentional per spec §3.3: WISDOM holds atom-intrinsic properties (often the *negative* "do not use X for Y" form); KNOWLEDGE holds the *positive* scenario→atom maps. Many DS_CONSTRAINTS rules surfaced both forms — both halves were preserved (one in WISDOM, one here).

> The `[GENERAL]` tag introduced during this seeding is now codified in `spec.md` §4 and §14.2 — implementer and reviewer agent prompts (Phases 5–6) must always-load `[GENERAL]`-tagged WISDOM, and the Phase 4 lint must allow-list `[GENERAL]` as the lone non-FACT tag.

---

## Color — scenario mappings

- `text on brand-primary background → brand-foreground` (maize)
- `link / inline clickable text → color-link` (and `text-link` className)
- `brand colors → reserved for navbars, hero sections, primary CTAs only` (sparse intentional placement)
- `state indicators / alert borders → color-info`
- `feedback container → solid token + subtle token pair` (e.g. `error` for icon/border/label, `error-subtle` for background)
- `success state label → color-success + foreground label`
- `warning state label → color-warning + foreground label`
- `neutral interactive hover → bg surface-subtle + border border-strong` (interim until dedicated neutral interactive tokens exist)

## Surface depth

- Two-level surface model:
  - `page / cards → color-surface` (white)
  - `elevated inner surfaces (table headers, code blocks, inset sections) → color-surface-subtle`
  - `deprioritized inner surfaces → color-surface-muted`
- `card differentiation → border, not background color`

## Typography — scenario mappings

- `hero / landing display → type-display`
- `in-app page title → type-h1`
- `when type-display already on the page → apply type-h2 styling to the semantic <h1>` (visual hierarchy precedence)
- `readable body content → text-foreground`
- `supporting / secondary text → text-muted-foreground`
- `form-field error message → type-caption + text-error`
- `helper text (instructions, character counts, format hints) → type-caption + text-muted-foreground`
- `link styling → text-link` + `hover:underline` + `hover:text-brand-primary`, no visited style
- `single-line truncation (nav items, table cells, tags, badges) → truncate`
- `multi-line card titles → line-clamp-2`; `multi-line card descriptions → line-clamp-3`
- `apps/docs/ header logo → type-body + font-sejong-bold`
- `apps/docs/ sidebar category heading → type-body-sm + font-sejong-bold`
- `apps/docs/ code-block typography → type-caption + font-mono` (until a monospace `type-*` exists)
- `applying any type-* class → also apply an explicit color token` (type-* doesn't set color)

## Layout — scenario mappings

- `inline / form layouts default column gutter → gap-2` (across all breakpoints)
- `vertical spacing tiers`:
  - `Element (gap-2) → label→input, icon→text, caption-below-field, heading→subtitle`
  - `Component (gap-4) → stacked form fields, list items, stacked cards, navigation items`
  - `Section (gap-6) → gaps between major page sections`
- `full-bleed elements (navbar, hero, footer) → background on outer wrapper, Container nested inside for content alignment`
- `page-shell composition → use Container` (never re-compose `mx-auto w-full max-w-screen-2xl p-4 md:p-6 lg:p-8` by hand)

## Iconography — scenario mappings

- `default icon size for buttons / nav / general UI → size="md"` (20px)
- `icon size matched to text context → sm with caption/label, md with body, md/lg with subheadings, lg with headings`
- `disabled icon → text-disabled-foreground`
- `icon + text default layout → flex items-center gap-2`; `compact (tags, badges) → gap-1`; `larger display contexts → gap-3`
- `compact interactive icon → ::after pseudo-element technique` (positioned absolutely, centered, `min-w-[44px] min-h-[44px]`, `position: relative` on wrapper) for ≥44×44 touch target without inflating visible box
- `custom stroke icon registration → viewBox="0 0 24 24", stroke-width 2, stroke="currentColor", fill="none", stroke-linecap/linejoin round` (Lucide visual language)
- `brand icon registration (GitHub, LinkedIn, etc.) → fill-based with original viewBox` (exception to Lucide stroke style)

## Documentation patterns

- `API reference required prop → asterisk on prop name`:
  - desktop: `<InlineCode>propName<span aria-label="required">*</span></InlineCode>`
  - mobile: `<strong>propName<span aria-label="required">*</span></strong>`
  - Default column shows `—` for required props (never "(required)")
- `API reference table containing required props → caption "* Required prop." after both Table and TableMobileList`:
  `<p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>`

---

## Notes for the 3b author

- Brand prose (the descriptive aesthetic spirit per spec §3.2) is a separate input for KNOWLEDGE — not derived from DS_CONSTRAINTS. Grill the user for it.
- Several DS_CONSTRAINTS rules above duplicate from `DS_CLIENT_USAGE.md` — prefer that as the seed for the scenario→atom dictionary; this list is the residual that *must* survive into KNOWLEDGE if not already covered there.
- The `tracking-tight` rule lives only in WISDOM (atom-intrinsic). The "type-display for hero / type-h1 for in-app title" mapping is the KNOWLEDGE half — different question, paired output.

---

## Open issues surfaced during 3c — for Phase 3a (FACT) and Phase 4 (lint)

### Cross-doc alignment after 3c

- **Form package field names** — FACT was regenerated to list `[Form.Input]`, `[Form.Textarea]`, `[Form.Select]`, etc., matching the public-API JSX namespace. KNOWLEDGE references resolve cleanly.
- **Composition rules for `Popover`, `DropdownSeparator`, `SelectSeparator`** — these atoms are present in FACT; WISDOM composition rules now include them.
- **`type-*` semantic typography utilities** — added to FACT as `.type-display` … `.type-caption` (CSS-selector form). WISDOM `type-*` rules previously parked under `[GENERAL]` were re-tagged precisely (`[.type-display][.type-h1]`, `[.type-caption]`). The leading-dot form is now codified in spec §4 as the canonical tag spelling for DS-defined Tailwind utility classes.
- **Hooks and top-level utilities (`useForm`, `toast()`, `iconNames`, `cn`, `*Variants`, `DS_VERSION`)** — by policy, these are not atoms (Pastiche treats only components and tokens as atoms). KNOWLEDGE's `useForm` reference was removed; the cross-doc lint should ignore non-component / non-token symbols rather than flag them.

### Recommendation on Tailwind-default utility classes

Beyond `type-*`, KNOWLEDGE prose mentions raw Tailwind utilities like `gap-2`, `rounded-md`, `flex items-center` etc. that are **not** KISA-defined — they are framework defaults. We considered a `pastiche.config.yaml` flag (`useTailwindV4: true`) that would preload Tailwind's built-in utility list into FACT to make the cross-doc lint complete on KNOWLEDGE prose. **Recommend deferring this to v2.** Reasoning:

- Implementers do not grep `[gap-2]` to look up rules — there are none. Loading 1000+ default utilities adds context weight without tag-lookup payoff.
- Spec §11 ("philosophy of lightness") argues against optional layers that don't earn their context cost.
- The lint can stay deterministic on the small surface it controls — bracketed `[atom]` tags in WISDOM and capitalized component-name code-spans in KNOWLEDGE — and silently ignore arbitrary utility-class strings in KNOWLEDGE prose. Tailwind defaults are substrate, like HTML or React.
- The risk this addresses (a typo'd KISA token like `bg-surface-typo` slipping past the lint) is mitigated by extracting *KISA-defined* Tailwind utilities into FACT. Once `theme.css` `@theme inline` outputs are part of FACT, `bg-surface-subtle` resolves and `bg-surface-typo` doesn't — the lint flags the latter without needing a Tailwind-defaults preload.

If real Pastiche runs surface lint false-negatives where a typo'd Tailwind default ships unflagged, revisit the config flag in v2 as a paid-for-by-evidence feature, not a v1 commitment.

### Token tag form

WISDOM tags for tokens follow the FACT spelling exactly (`[--color-brand-primary]`, `[--font-sejong-bold]`). Authors writing new WISDOM entries must keep this discipline; spec §14.2's cross-doc lint is the safeguard.
