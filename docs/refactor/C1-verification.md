# C1 — Verification

_Output of C1.5. Pass/fail per A4 + C1 prompt verification criteria._

| # | Check | Status | Evidence |
|---|---|---|---|
| 1 | `pnpm build` runs end-to-end without errors. | ✅ pass | turbo: 3/3 successful (`@umichkisa-ds/web` build with prebuild → compile-design → lint pass; `@umichkisa-ds/form` build; `@umichkisa-ds/docs` Next.js static build). |
| 2 | `pnpm --filter @umichkisa-ds/web build` triggers prebuild → compile-design → write `/DESIGN.md` → lint, all green. | ✅ pass | Verified manually after each C1.x commit. |
| 3 | `npx @google/design.md lint DESIGN.md` reports `errors: 0`. | ✅ pass | Final summary `{errors: 0, warnings: 1, infos: 1}`. |
| 4 | The single `warning` is informational and expected. | ✅ pass | "No 'primary' color defined." — A4 D5 deliberately uses `brand-primary` to anchor the Michigan-brand identity; the spec's recommended-name `primary` is non-normative. The single `info` is a token-count summary. |
| 5 | Lint gate halts the build on a real error. | ✅ pass | Verified during C1.4: corrupted hex value in a copy → `errors: 1` → compiler `process.exit(1)` → build halts with `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL`. |
| 6 | Section ordering follows spec (Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts). | ✅ pass | Templates `01-…` through `08-…`; ordered glob in `renderBody()`. |
| 7 | Markdown body conventions match the google-labs spec example shape. | ✅ pass | Colors: per-token bullets with `**Name (#hex):** role`; Typography: per-level/role bullets; Do's-and-Don'ts: flat mixed list. Adjusted in the C1.4 polish commit after spec re-read. |
| 8 | Generated-file warning is preserved AND lint-compatible. | ✅ pass | Warning lives as YAML `#` comments inside the frontmatter (HTML comments before `---` would break frontmatter detection). |
| 9 | Every in-scope A1 token surfaces in the YAML front matter. | ✅ pass | Token counts in YAML — 31 colors (A1 inventoried 30; +1 = `brand-foreground` listed in A1 under `color_text` is also in the brand list, A1 undercount), 10 typography (8 in A1 + `type-h4` added in A4 + `code` synthesized from `--font-geist-mono`), 8 spacing (3 layout tiers + 5 icon sizes), 3 rounded. |
| 10 | No out-of-scope tokens leak into the YAML front matter. | ✅ pass | Grep of `/tmp/fm.yaml` for `primitive\|spinner\|keyframe\|--primitive-\|ds-spin` returns nothing. The body prose mentions `--primitive-*` only in anti-pattern guidance, which is intentional. |
| 11 | OKLCH→sRGB conversion runs through `culori` and emits 6-digit hex. | ✅ pass | `--color-overlay` (alpha-bearing) emits as `#000000`; alpha is documented in the Colors body prose. All other colors are 6-digit. |
| 12 | KISA package version is stamped into Overview prose. | ✅ pass | "Generated from `@umichkisa-ds/web@1.0.21`." (matches `packages/web/package.json`). |
| 13 | DESIGN.md reads coherently to a human end-to-end. | ✅ pass | Manual read post-polish-commit. Section transitions, prose clarity, tone, and per-token role explanations all read as a coherent contract — not a stub, not a subset. |
| 14 | Round-trip test: explicitly out of scope per A4 D10 (lint is the contract). | ⏭ skipped (per spec) | Resolved via OQ1 in `C1-plan.md`. Compiler tree → DESIGN.md is one-direction; "round-trip" becomes meaningful only if a third consumer (Figma, designer tooling) appears. |

## Known divergences (logged, not resolved by C1)

- **`brand-primary` hex drift:** The OKLCH primitive `oklch(19% 0.061 243)`
  converts to `#00152c`, while the canonical Michigan navy is `#00274c`
  (annotated in `primitives.css` as `hex_comment`). A4 D3 accepts this
  loss silently. The body prose displays the canonical brand hex
  (`#00274c`) for human-facing identity; the YAML token surfaces the
  faithful OKLCH conversion. Both the spec and A4 say the YAML token is
  the normative value; the prose is context.
- **`brand-accent` hex drift:** Same dynamic — `#f4c000` (computed) vs
  `#ffcb05` (canonical). Same handling.
- **No `colors.primary` slot:** A4 D5 designs around named-by-role
  tokens (`brand-primary`). The spec's recommended-name list is
  non-normative; the lint warning is informational and tolerated.
- **`tokens/semantic.css`:** Stale, unimported mirror of `index.css`'s
  `@theme` block. Compiler excludes it (per OQ2). Cleanup deferred to a
  follow-on lane outside C1.

## Phase status

C1.1 → C1.5 complete. Stop. Do not begin C2.
