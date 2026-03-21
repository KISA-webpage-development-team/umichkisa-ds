# Spec: Step -1 — DS Documentation Review

## Goal

Review and finalize all foundation documentation pages against design system best practices.
Extract a complete, AI-consumable set of design constraints into `docs/DS_CONSTRAINTS.md`.

**This step is documentation-only. No implementation code is touched.**

---

## Flow

```
docs review → docs fixed → DS_CONSTRAINTS.md populated → (later) implementation fix
```

**Skill:** Invoke `ui-design-system` and `grill-me` at session start before Phase 1.

---

## Scope

### In scope
- All MDX pages under `apps/docs/content/foundation/`
- `docs/DECISIONS.md` — existing architectural decisions fold into Components (General)
- User clarification inputs during the session

### Out of scope
- Token/CSS implementation files
- Component code
- Gap between docs and implementation (that is Step 0)

---

## Output

1. **Updated MDX pages** — only where review found content gaps, vague rules, or missing DS best practices
2. **`docs/DS_CONSTRAINTS.md`** — fully populated
3. **`## Open Questions`** in this spec — unresolved gaps that need future attention

---

## Section Order

Work through foundation sections in this order:

1. Colors
2. Typography
3. Layout
4. Iconography

---

## Process Per Section

### Phase 1 — Review

Read every MDX page in the section. For each page, evaluate against DS best practices:

- [ ] Are all stated rules unambiguous? Can a dev implement from this alone?
- [ ] Are edge cases covered — disabled state, error state, dark mode, empty state?
- [ ] Does the content align with DS best practices? Any missing patterns?
- [ ] Is anything a component developer would need left unstated?

### Phase 2 — Fix

Update MDX where:
- A rule is vague → sharpen it
- A DS best practice is missing → add it
- An edge case is unaddressed → document the expected behavior

Do not restructure pages or move content between pages. Fix in place.

### Phase 3 — Extract Constraints

After MDX is finalized for the section, extract all rules into the appropriate section of `docs/DS_CONSTRAINTS.md`.

**Constraint format:**

```
Must: [rule] [source:foundation/colors/tokens]
Never: [rule] [source:foundation/colors/usage]
Prefer: [rule] [source:foundation/typography/scale]
Avoid: [rule] [source:foundation/layout/spacing]
```

- `Must` / `Never` — hard rules, no exceptions
- `Prefer` / `Avoid` — soft patterns, context-dependent

Every constraint gets a `[source:path]` tag referencing the MDX page it came from.

---

## DS_CONSTRAINTS.md Structure

```
# DS Constraints

_Populated during Step -1 (DS Documentation Review)._
_Each section is designed to be injected as skill context in Step 4 (Component Skill)._

## Colors
...

## Typography
...

## Layout
...

## Iconography
...

## Accessibility
_Cross-cutting a11y rules consolidated from all sections._
...

## Components (General)
_Universal rules that apply to every component regardless of domain._
_Includes rules from docs/DECISIONS.md._
...
```

---

## Section Completion Criteria

A section is done when all of the following are true:

- [ ] All pages read and evaluated against DS best practices
- [ ] MDX updated where improvements were needed
- [ ] All constraints extracted to DS_CONSTRAINTS.md with source tags
- [ ] Accessibility rules extracted to `## Accessibility` (not left in domain section)
- [ ] Any unresolved gaps added to `## Open Questions` below

---

## Acceptance Criteria (Whole Task)

- [ ] `docs/DS_CONSTRAINTS.md` fully populated — all 6 sections present
- [ ] Every constraint has a source tag
- [ ] All open questions documented in this spec
- [ ] `pnpm build` and `pnpm typecheck` pass (MDX changes must not break build)
- [ ] `docs/CODEBASE.md` not modified (no code changed)

---

## Note on Future Use

`DS_CONSTRAINTS.md` sections are designed to become the basis for component review skills in Step 4 (Component Skill). Each section should be dense, scannable, and self-contained — readable in isolation without needing to load the full file.

---

## Open Questions

### OQ-1 — Color token naming: double-prefix collision (Step 0)

Semantic text tokens are named `--color-text-*` (e.g. `--color-text-muted`, `--color-text-disabled`). When used as Tailwind utility classes, the `text-` utility prefix doubles up with the `text-` semantic namespace, producing awkward class names like `text-text-muted` and `text-text-disabled`.

This naming issue cascades across the entire color token system. Possible resolutions:
- Follow shadcn/ui convention: `--color-muted-foreground` → `text-muted-foreground`
- Drop the namespace prefix: `--color-muted` → `text-muted`
- Use a non-colliding namespace: `--color-content-muted` → `text-content-muted`

**Resolution:** Defer to Step 0 (Token & Styles Audit). Must be decided holistically across all semantic tokens.

---

## Last Session [2026-03-21]
Task: Step -1 — DS Documentation Review — Layout section (all 3 phases)
Done: Reviewed 4 Layout MDX pages via /grill-me (8 gaps found, 8 decisions made). Applied 6 MDX fixes across breakpoints.mdx, overview.mdx, spacing.mdx: hardened sm:/xl:/2xl: rule to Never, added section nav block and a11y section (landmarks + skip link with focus-visible + bg-surface token) to overview.mdx, added 3-tier vertical spacing system + page shell pattern + full-bleed pattern to spacing.mdx. Extracted Layout + Accessibility/Layout constraints into DS_CONSTRAINTS.md. Build and typecheck pass.
Last file: docs/DS_CONSTRAINTS.md
Next action: Start Iconography section — Phase 1: read all Iconography MDX pages under apps/docs/content/foundation/iconography/ and evaluate against DS best practices.
Blockers: none
