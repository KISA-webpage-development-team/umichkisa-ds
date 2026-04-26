## Typography

Two-font system, Korean-first:

- **`SejongHospital Bold`** — Korean display face. Reserved for
  `type-display` (hero) and `type-h1` (page title). Sejong does not
  appear below H1 — Pretendard takes over.
- **`Pretendard Variable`** — body and supporting headings (H2–H4),
  labels, captions. Loaded via CDN.

A third family, **`Geist Mono`**, is available as `typography.code`
but is reserved for code-display contexts only (inline code, code
blocks). Never use it for body or UI text.

The `fontSize` value listed in each `typography.*` entry is the
**`lg:` breakpoint** value (largest variant). Smaller breakpoints
scale down per `theme.css` — see `.type-display`, `.type-h1`,
`.type-h2`, `.type-h3` for the responsive ramps. `type-body`,
`type-body-sm`, `type-label`, `type-caption`, `type-h4`, and
`typography.code` are single-value, non-responsive.

Always pair a `type-*` class with an explicit color token. Never use
`!font-*` to override the weight of a `type-*` class.
