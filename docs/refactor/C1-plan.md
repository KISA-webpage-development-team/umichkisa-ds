# C1 — Plan (Discovery + Implementation Roadmap)

_Output of C1.1. Read-only discovery against `packages/web/` plus reconciliation
of A4's spec with the live codebase. The plan IS the understanding summary._

A4 (`docs/refactor/A4-design-compile.md`) is authoritative. This document
records what the codebase actually looks like today, where A4's wording
diverges mechanically (path typos, restructure since A1), and which items
need human input before C1.2 begins.

---

## 1. Token surface map

The DS token graph spans four files. Three feed the compiler; one is a
stale mirror that does not.

| # | File | Role | What it contributes | Notes |
|---|---|---|---|---|
| 1 | `packages/web/src/tokens/primitives.css` | **Tier 1 — primitives (private)** | `:root { --primitive-* }` for Michigan brand (5), gray scale (10), semantic base (3) — total 18 primitives | Imported by `src/styles/index.css` (`@import "../tokens/primitives.css"`). Per A4 D2, primitives stay internal — compiler resolves through them but never emits them. |
| 2 | `packages/web/src/styles/index.css` | **Tier 2 — semantic + components** | (a) `@font-face` for SejongHospital Bold/Light; (b) `@theme { --color-*, --icon-*, --font-* }` block (all semantic colors + 5 icon sizes + 4 font families); (c) 7 `@keyframes`; (d) `@layer ds-components` with `.ds-spinner*` (4 classes) + `.type-*` (9 classes including `.type-h4`); (e) `@layer ds-base` reset; (f) sonner toaster positioning override at top of file | This is **the** compiler input. The `@theme` block is what Tailwind v4 reads; everything semantic-side lives here. |
| 3 | `packages/web/src/tokens/semantic.css` | **Stale mirror — not in build graph** | Duplicates the `@theme` block as a plain `:root {}` declaration | Grep confirms: only reference is the doc-comment in `primitives.css`. Not imported by `index.css`, not imported by `theme.css`, not imported by anything. A1 flagged it as "mirrored in tokens/semantic.css"; A4's mapping table treats `index.css` as the source. **Treatment in compiler: skip.** Cleanup (delete or wire it back) is out of scope for C1 per Pitfall §4.2. |
| 4 | `packages/web/theme.css` | **Public re-export entry** | `@import "tailwindcss";` chain into `src/styles/index.css` + `@source` glob | Not a token source. The npm `exports` field surfaces it as `@umichkisa-ds/web/theme.css`. Compiler ignores. |

**Import chain at runtime:**
`packages/web/theme.css` → `src/styles/index.css` → `src/tokens/primitives.css`.
Single source of truth: `src/styles/index.css`. Compiler must read both
that file and `primitives.css` so `var(--primitive-*)` indirection
resolves.

**Token group inventory** (verbatim from the live `index.css` `@theme`
block plus the primitives chain):

- 14 brand/state colors (`brand-primary{,-mid,-hover,-pressed}`, `brand-accent{,-subtle,-hover,-pressed}`, `brand-foreground`, `focus-ring`)
- 3 surface (`surface{,-muted,-subtle}`)
- 2 border (`border{,-strong}`)
- 5 text (`foreground`, `muted-foreground`, `disabled-foreground`, `brand-foreground` — already counted under brand — and `link`) → effectively 4 text-only
- 11 feedback (`error{,-hover,-pressed,-foreground,-subtle}`, `success{,-subtle}`, `warning{,-subtle}`, `info{,-subtle}`)
- 1 overlay (`overlay`, alpha-bearing)
- 5 icon sizes (`icon-{xs,sm,md,lg,xl}`)
- 4 font families (`sejong-bold`, `sejong-light`, `pretendard`, `geist-mono`)
- 9 typography classes (`type-{display,h1,h2,h3,h4,body,body-sm,label,caption}`) — 4 of those are responsive across `default`/`md:`/`lg:`

A1 listed 8 type classes; live count is 9. Delta = `type-h4` (added during
A4 grill via `ds-fix-during-migration`, commit `edac51e`). A4's mapping
table already accounts for `type-h4`.

---

## 2. A4 decision register

Flat list of A4's locked decisions and how they reconcile with the live
codebase.

| # | A4 decision | Status | Note |
|---|---|---|---|
| D1 (audience) | Implementer subagent + GitHub readers; spec-conformant; no external round-trip | confirmed | No code dependency. |
| D2 (tier emission) | Semantic + decomposed `.type-*` only; primitives, `.ds-spinner*`, keyframes stay internal | confirmed | Codebase matches: 18 primitives + 7 keyframes + 4 spinner classes are skip-list. |
| D3 (OKLCH precision) | OKLCH→hex via `culori`, silent loss accepted; existing `hex_comment` lines are author notes only | confirmed | Codebase has `hex_comment` notes on Michigan brand primitives — informational; compiler ignores them and recomputes. |
| D4 (spacing) | Three named tiers `element/component/section` materialized as DESIGN.md `spacing.*` (no DS source token; values from A3 tier picker) | confirmed | No DS spacing tokens in `index.css`. Compiler hard-codes `element: 8px / component: 16px / section: 24px` from the A4 mapping table. |
| D5 / D12 (state colors + components block) | All state colors (`*-hover`, `*-pressed`) as top-level `colors:`; YAML `components:` block skipped in v0 | confirmed | All 4 brand-state values + 2 error-state values present in `@theme`. |
| D6 (commit policy) | Commit `/DESIGN.md`; CI runs compiler then `git diff --exit-code DESIGN.md` | confirmed | No CI wiring exists yet — that's a follow-on if/when CI lands. C1 just commits the artifact and the prebuild hook. |
| D7 (compiler input) | Parse with PostCSS; no intermediate `tokens.json` | confirmed | |
| D8 (scaffolding) | TypeScript + `tsx`; `packages/web/scripts/compile-design.ts`; wired as `prebuild` in `packages/web/package.json` | adjusted | `packages/web/scripts/` does not exist yet — C1.2 creates it. `tsx` not yet in devDependencies. `package.json` `build` script today is `npm run build:js && npm run build:css` — adding `prebuild` runs before that, fine. |
| D9 (versioning) | YAML `version: alpha`; KISA package version stamped into Overview prose by compiler | confirmed | Compiler reads `packages/web/package.json` `"version"` field (currently `1.0.21`). |
| D10 (round-trip) | "Skipped. CI runs `npx @google/design.md lint DESIGN.md` and that's the contract." | **adjusted, conflicts with C1 prompt** | C1 prompt §C1.4 explicitly asks for "A4's round-trip test as a separate runnable script." A4 D10 says round-trip is skipped. **The C1 prompt itself says "If anything in this prompt contradicts A4, A4 wins."** → Lint gate is in scope (per A4 D10 + C1 prompt §C1.4 sentence 1). Round-trip script is **out of scope** per A4 D10. C1.4 reduces to: wire the lint gate into the build, accept any documented degradation. Surface this to the human — see Open Question OQ1 below. |
| D11 (Geist Mono) | Emit; prose carve-out "code-display contexts" | confirmed | Reframe of `t-fn-5` USAGE.md prose is a C2/C3 task, not C1. |
| Lint fallback (overlay) | If lint rejects 8-digit hex on `overlay`, fall back to `#000000` + prose note | confirmed | Compiler will start with `#000000` (alpha dropped, alpha mentioned in prose) per the §"Spec edge cases" table. No 8-digit hex emitted in v0. |

### A4 § Compiler flow — adjustments

A4 §Compiler flow step 1 reads:
> Read `packages/web/styles/index.css` and `packages/web/src/tokens/*.css`

Live paths: `packages/web/src/styles/index.css` (note `src/`) and
`packages/web/src/tokens/{primitives,semantic}.css`. Mechanical typo;
adjust without escalating.

`tokens/*.css` glob would pick up `semantic.css`. Since `semantic.css` is
a stale mirror of `index.css`'s `@theme` (§1 row 3), reading both would
double-declare semantic tokens. **Compiler reads only `index.css` +
`primitives.css`** — the live build graph. `semantic.css` is excluded
explicitly. Surfaced as Open Question OQ2 in case the human prefers the
opposite (delete `semantic.css` first, then loosen the compiler to
`tokens/*.css`).

---

## 3. A1 cross-check

| Inventory item | A1 state | Live state | Delta |
|---|---|---|---|
| primitives | 18 entries | 18 entries | match |
| semantic colors (top-level) | 30 | 30 | match |
| icon sizes | 5 | 5 | match |
| font families | 4 | 4 | match |
| type classes | 8 | 9 (`+type-h4`) | A4 already records this; compiler must emit `typography.h4`. |
| keyframes | 7 | 7 (count of distinct names) | match. A1's prose listed `dialog-content-out` twice as a counting note — there are 8 `@keyframes` rules but 7 distinct keyframes (`ds-spin`, `ds-pulse`, `tooltip-in`, `tooltip-out`, `dialog-overlay-in`, `dialog-overlay-out`, `dialog-content-in`, `dialog-content-out`) — actually 8. Re-reading A1: it counts 7. Live count is **8 distinct keyframes**. Not compiler-relevant (all internal per D2), but flag for A1 housekeeping. |
| ds-spinner family | 4 classes | 4 classes | match (internal) |

No tokens have been added or removed since A1 except `type-h4` (already
in A4) and the keyframe count has a +1 vs A1 (cosmetic — internal).

---

## 4. Compiler I/O contract

### Inputs (read by compiler)

- `packages/web/src/styles/index.css` — primary
- `packages/web/src/tokens/primitives.css` — resolved through `var()` chains (one level only, per A4 step 2 throw rule)
- `packages/web/package.json` — `version` field, stamped into Overview prose

### Inputs explicitly NOT read

- `packages/web/src/tokens/semantic.css` (stale mirror; OQ2)
- `packages/web/theme.css` (re-export entry, no tokens)
- `apps/docs/**` (consumer-side, not DS source)

### Output (written by compiler)

- `/DESIGN.md` at repo root — committed artifact, includes top-of-file generated-file warning header (e.g. `<!-- @generated — produced by packages/web/scripts/compile-design.ts; edits will be overwritten on next prebuild. -->` per Pitfall §4.7; A4 doesn't prescribe wording so we invent it).

### Exit behavior

- Exit non-zero on: unresolved `var()` (>1 level deep), missing class referenced by a documented `.type-*` slot, template placeholder failure, or any throw from the OKLCH→hex conversion.

### Resolved-token-tree shape (intermediate)

Compiler-internal shape (not persisted):

```
{
  colors: { 'brand-primary': '#00274c', ... },           // 30 entries, 6-digit hex
  typography: { display: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }, ... }, // 9 entries
  spacing: { element: '8px', component: '16px', section: '24px',
             'icon-xs': '12px', 'icon-sm': '16px', 'icon-md': '20px',
             'icon-lg': '24px', 'icon-xl': '32px' },     // 8 entries
  rounded: { md: '8px', lg: '12px', full: '9999px' },    // 3 entries
  meta: { kisaVersion: '1.0.21', specVersion: 'alpha' }
}
```

### DESIGN.md output structure (target)

YAML front matter exactly per A4 §"DESIGN.md file shape (target)" — same
key ordering, same nesting depth, single-value-per-token.
Markdown body — eight sections in spec order:
`Overview / Colors / Typography / Layout / Elevation & Depth /
Shapes / Components / Do's and Don'ts`.
Components section is a pointer-only stub per A4.

---

## 5. Open questions

| # | Question | Severity | Why it needs human input |
|---|---|---|---|
| OQ1 | A4 D10 says round-trip is **skipped** ("CI lint is the contract"); C1 prompt §C1.4 asks for "A4's round-trip test as a separate runnable script." Per the C1 prompt's own rule "if A4 contradicts this prompt, A4 wins" → I plan to treat C1.4 as **lint-gate only, no round-trip script**, and document the absence in `C1-verification.md`. Confirm? | blocked | Affects scope of C1.4. Materially smaller deliverable if A4 wins (≈30 LOC vs ≈200). |
| OQ2 | `packages/web/src/tokens/semantic.css` is a stale, unimported mirror of `index.css`'s `@theme` block. Plan: compiler **excludes** it; cleanup (delete the file) deferred to a separate ds-gap-fix lane. Alternative: delete `semantic.css` in C1.2 and broaden the compiler to read `tokens/*.css`. Which? | blocked | Both work; the question is whether C1 is allowed to delete a source-side file. The "do not touch token sources" pitfall (§4.2) says no, but `semantic.css` is dead code, not a token source. |
| OQ3 | A4 OQ "Compiler templates location: `packages/web/scripts/templates/`" defers individual template contents. Plan for C1.3: hand-author one `.md.tpl` per body section (8 templates) with `{{kisa_version}}` placeholder support, prose copy lifted/condensed from `apps/docs/.../foundation/*` pages where overlap exists. OK to author template prose autonomously? | nice-to-have | If the human wants to review/edit prose copy first, route through a B-style review checkpoint. Otherwise I author and the C1.3 commit captures the diff. |
| OQ4 | `@google/design.md` package — A4 names it but I have not verified npm publication. Plan: try `npx @google/design.md lint --help` during C1.2 scaffolding. If it 404s, fall back to: (a) use `js-yaml` to parse front matter and write a hand-rolled lint of the rules in A4 §Lint rules table; OR (b) skip lint gate entirely and document the gap. Which fallback? | C1.4 | Affects C1.4's wiring story. Not blocking C1.1–C1.3. |

OQ1, OQ2 are checkpoint-blocking. OQ3 is a permission ask. OQ4 surfaces
during C1.2 scaffolding and can route through the C1.2 checkpoint.

---

## 6. Step plan for C1.2 onward

The skeleton from the C1 prompt §2 stands. Below are the concrete
breakdowns I propose.

### C1.2 — Compiler scaffolding

1. `mkdir -p packages/web/scripts/templates`
2. `pnpm --filter @umichkisa-ds/web add -D tsx postcss culori @types/culori`
3. (Pending OQ4) `pnpm add -Dw @google/design.md` at root if the package exists.
4. Create `packages/web/scripts/compile-design.ts` as a stub that does `console.log('compile-design: not implemented'); process.exit(1);`.
5. Add to `packages/web/package.json`:
   - `"scripts.compile-design": "tsx scripts/compile-design.ts"`
   - `"scripts.prebuild": "npm run compile-design"`
6. Run `pnpm --filter @umichkisa-ds/web build` → expect failure with the not-implemented message → proves wiring fires.
7. Commit: `feat(refactor): C1.2 compile-design scaffold + prebuild wiring`.

**Checkpoint C1.2.**

### C1.3 — Compiler implementation

1. PostCSS-parse `index.css` + `primitives.css`. Build a `Map<string, string>` of all CSS custom properties from `@theme` and from primitives' `:root`.
2. Resolve `var(--primitive-*)` chains; throw if depth > 1.
3. OKLCH → sRGB hex via `culori`. 6-digit only. `--color-overlay`'s alpha drops (becomes `#000000`); alpha is recorded for prose.
4. Walk `@layer ds-components` for `.type-*` rules: collect base + `@media` overrides; pick `lg:` (or largest) breakpoint for `fontSize`; map `font-family`/`font-size`/`font-weight`/`line-height`/`letter-spacing` to spec's Typography shape.
5. Read `packages/web/package.json` `version`.
6. Hard-code the three spacing tier values + three rounded values (D4) into the resolved tree.
7. Render YAML front matter from the resolved tree (single-pass string template; no library needed for the YAML shape A4 specifies — flat keys + single-line typography objects).
8. Render eight markdown body sections from `scripts/templates/*.md.tpl` with `{{kisa_version}}` placeholder substitution.
9. Concatenate and write to `/DESIGN.md` with the generated-file header at the top.
10. Run `pnpm --filter @umichkisa-ds/web build` → DESIGN.md regenerates.
11. Commit: `feat(refactor): C1.3 compile-design implementation + initial DESIGN.md`.

**Checkpoint C1.3.**

### C1.4 — Lint integration (round-trip skipped per A4 D10 — confirm OQ1)

1. After write step in C1.3, invoke `npx @google/design.md lint /DESIGN.md` (or fallback per OQ4).
2. Compiler exits non-zero if lint fails.
3. `pnpm --filter @umichkisa-ds/web build` re-runs to confirm green.
4. Commit: `feat(refactor): C1.4 wire @google/design.md lint into compile-design`.

**Checkpoint C1.4.**

### C1.5 — Verification

1. Run `pnpm build` end-to-end (root) → both packages build, DESIGN.md regenerates clean.
2. Manually read `/DESIGN.md` end-to-end → coherent, complete contract.
3. Cross-check every A1 in-scope token appears: 30 colors, 9 typography slots, 8 spacing keys, 3 rounded keys.
4. Cross-check no out-of-scope token leaks: no `--primitive-*`, no `.ds-spinner*`, no `@keyframes`.
5. Author `docs/refactor/C1-verification.md` with one bullet per check, pass/fail.
6. Commit: `docs(refactor): C1.5 verification`.

**Checkpoint C1.5.** Stop. Do not begin C2.

---

## 7. Out-of-scope reminders (logged for later phases, not done in C1)

- Delete `tokens/semantic.css` — defer to OQ2 resolution; if "delete it," it can ride a follow-on commit, not C1.
- Author `/COMPONENT.md`, `/USAGE.md` — C2.
- Apply A6 SKILL.md diff — C3.
- Retire `DS_CLIENT_USAGE.md`, `DS_CONSTRAINTS.md`, `implementer-template.md` — C3.
- Rename `ds-fix-during-migration` → `ds-gap-fix` — C4.
- Reframe `t-fn-5` Geist Mono prose — C2/C3 USAGE.md authoring.
- A1 keyframe count nit (7 vs 8 distinct) — A1 housekeeping, not C1.

---

`=== CHECKPOINT C1.1 — STOPPED, AWAITING APPROVAL ===`
