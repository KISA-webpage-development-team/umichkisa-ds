# DS Fixes Log

Accumulator for DS fixes made during client migration. Grouped by package, entries tagged with phase.

## @umichkisa-ds/web

<!-- Entry format:
- **[Phase N.M]** Brief description of fix (commit SHA) -->

- **[Phase 0.5.2]** Add `instagram` custom icon (monochrome, `fill="currentColor"`) to icon registry — 2026-04-17
- **[Phase 0.5.2]** Add `instagram-brand` custom icon (official gradient variant) to icon registry — 2026-04-17
- **[Phase 0.5.2.bump, mid-phase]** Bump `@umichkisa-ds/web` `1.0.0 → 1.0.1` (patch, pre-consume for lane 0.5.5 Footer's `instagram-brand` usage) — 2026-04-18 — per `AUTONOMOUS_PROTOCOL.md` §14c
- **[Phase 0.5.6]** Add `xl` size variant to `Container` (`max-w-screen-xl`, 1280px) — sits between `lg` (1024px) and `default` (1536px); surfaced during lane 0.5.6 visual review for the KISA shell width (commit d9c671b)
- **[Phase 1.1]** Bundle `@radix-ui/*` transitive deps into `dist/index.js` via tsup `noExternal` — resolves client `next build` `Module not found` for `@radix-ui/number`, `react-presence`, `react-use-previous`, etc. pnpm's symlinked transitives aren't npm-client-resolvable (commit 92e3a48)
- **[Phase 1.1.bump, mid-phase]** Bump `@umichkisa-ds/web` `1.0.3 → 1.0.4` (patch) — ships the radix-bundle fix so Lane 1.1 + all downstream Phase 1 lanes can deploy from registry — 2026-04-20 — per `AUTONOMOUS_PROTOCOL.md` §14c
- **[Phase 1.4]** ToggleGroup: added `'multiple'` variant via discriminated union on `type` prop (`value: string[]`, `onValueChange: (string[]) => void`, `role="group"` + `aria-pressed`, roving tabindex, arrow-key focus-only). Additive — default `'single'` mode byte-for-byte unchanged. Unblocks Lane 1.4 TagList internshipTypes (commit 102d7a5) — 2026-04-20
- **[Phase 1.4]** ToggleGroup: spread `HTMLAttributes<HTMLDivElement>` (minus `role`/`onChange`) onto outer `<div>` so consumers can pass `aria-label`/`aria-labelledby`/`id`. Needed for TagList to wire DS `Label` via `htmlFor` + `aria-labelledby`. Additive — no API break. — 2026-04-20
- **[Phase 1.4.bump, mid-phase]** Bump `@umichkisa-ds/web` `1.0.5 → 1.0.6` (patch) — ships the ToggleGroup HTMLAttributes passthrough so Lane 1.4 can deploy from registry — 2026-04-20 — per `AUTONOMOUS_PROTOCOL.md` §14c
- **[Phase 1.2]** Accordion: bump AccordionTrigger default typography from `type-body !font-semibold` (16px) to `type-h3` (18px mobile / 20px desktop, Pretendard 600). Restores trigger-as-heading hierarchy — triggers were reading smaller than Sejong Hospital Bold content sub-headings due to font-metric mismatch. Dropped the `!important` weight override. Surfaced during client#80 review (commit a3e547e) — 2026-04-21
- **[Phase 1.3]** Dropdown: add `overscroll-contain` to DropdownContent default className. Prevents scroll chaining from the dropdown to the page when consumers run `modal={false}` (no Radix scroll-lock). Surfaced during client#81 JobCategoryDropdown review — 2026-04-21
- **[Phase 1.3.bump, mid-phase]** Bump `@umichkisa-ds/web` `1.0.7 → 1.0.8` (patch) — ships the Dropdown overscroll-contain fix so Lane 1.3 can deploy from registry — 2026-04-21 — per `AUTONOMOUS_PROTOCOL.md` §14c
- **[Phase 2.4]** FileUpload: new form primitive (`packages/web/src/components/form/FileUpload/`) — hybrid-controlled, storage-agnostic, i18n-ready. Exports `FileUpload`, `FileUploadValue`, `FileUploadProps`, `FileUploadMessages`, `AcceptedMimeType`, `FILE_UPLOAD_MAX_BYTES_DEFAULT`. 27 tests passing. Unblocks Lane 2.16 (PochaMenuItemForm FileUpload integration) (commit 148782a) — 2026-04-24
- **[Phase 2.4]** Add `upload` icon (lucide `Upload`) to icon registry — needed by FileUpload empty-state trigger (commit 0c12cae) — 2026-04-24
- **[Phase 2.4.bump, mid-phase]** Bump `@umichkisa-ds/web` `1.0.8 → 1.1.0` (minor) — ships new FileUpload component + `upload` icon so Lane 2.16 can deploy from registry — 2026-04-24 — per `AUTONOMOUS_PROTOCOL.md` §14c

## @umichkisa-ds/form

<!-- Entry format:
- **[Phase N.M]** Brief description of fix (commit SHA) -->
