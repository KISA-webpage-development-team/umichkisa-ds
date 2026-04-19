# DS Fixes Log

Accumulator for DS fixes made during client migration. Grouped by package, entries tagged with phase.

## @umichkisa-ds/web

<!-- Entry format:
- **[Phase N.M]** Brief description of fix (commit SHA) -->

- **[Phase 0.5.2]** Add `instagram` custom icon (monochrome, `fill="currentColor"`) to icon registry — 2026-04-17
- **[Phase 0.5.2]** Add `instagram-brand` custom icon (official gradient variant) to icon registry — 2026-04-17
- **[Phase 0.5.2.bump, mid-phase]** Bump `@umichkisa-ds/web` `1.0.0 → 1.0.1` (patch, pre-consume for lane 0.5.5 Footer's `instagram-brand` usage) — 2026-04-18 — per `AUTONOMOUS_PROTOCOL.md` §14c
- **[Phase 0.5.6]** Add `xl` size variant to `Container` (`max-w-screen-xl`, 1280px) — sits between `lg` (1024px) and `default` (1536px); surfaced during lane 0.5.6 visual review for the KISA shell width (commit d9c671b)

## @umichkisa-ds/form

<!-- Entry format:
- **[Phase N.M]** Brief description of fix (commit SHA) -->
