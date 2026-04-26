## Typography

A two-font strategy pairs **SejongHospital Bold** (Korean display
face) for hero/title hierarchy with **Pretendard Variable** for
everything below H1. A third family, **Geist Mono**, is reserved
strictly for code-display contexts.

- **Display (`type-display`):** SejongHospital Bold at the largest
  scale. Hero copy only — one per page maximum.
- **Headline 1 (`type-h1`):** SejongHospital Bold. App page titles.
  SejongHospital does not appear below H1; if `type-display` is
  already in use, prefer `type-h2` styling on a semantic `<h1>`.
- **Headline 2 / 3 / 4 (`type-h2` / `type-h3` / `type-h4`):**
  Pretendard at semibold (600). Section, subsection, and inline
  heading hierarchy.
- **Body / Body Small (`type-body` / `type-body-sm`):** Pretendard
  at regular (400). `type-body` for primary content;
  `type-body-sm` for dense or supporting content.
- **Label (`type-label`):** Pretendard at medium (500). Form labels
  and call-out captions where slightly heavier weight is appropriate.
- **Caption (`type-caption`):** Pretendard at regular (400), 12px
  floor. Helper text, error messages, image captions, and similar
  metadata.
- **Code (`typography.code`):** Geist Mono at body-small size.
  Inline code and code blocks only — never body or UI text.

The `fontSize` value listed in each `typography.*` entry is the
**`lg:` breakpoint** (largest variant). `type-display`, `type-h1`,
`type-h2`, `type-h3` scale down responsively at `default` and `md:`
breakpoints; `type-h4`, `type-body`, `type-body-sm`, `type-label`,
`type-caption`, and `typography.code` are single-value.

Always pair a `type-*` class with an explicit color token.
SejongHospital ships as a single-weight font face — its visual
boldness is baked into the file, so `fontWeight` on `type-display`
and `type-h1` is normalized to the CSS default (400). Never use
`!font-*` to override the weight of a `type-*` class.
