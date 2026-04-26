## Colors

The palette is anchored by two Michigan brand colors: `brand-primary`
(Michigan navy `#00274c`) and `brand-accent` (Michigan maize `#ffcb05`).
All other values are neutrals (gray scale resolved via OKLCH) and a
small set of feedback states (error, success, warning, info), each
carrying matched `-subtle` and (where applicable) `-hover` / `-pressed`
siblings.

Usage rules:

- Reference semantic tokens (`brand-primary`, `surface`, `foreground`)
  — never primitive values or raw hex.
- `-subtle` means container/background; `-muted` means deprioritized
  text or surface.
- `info` and `link` resolve to the same blue but are not
  interchangeable: `info` is for state indicators / borders, `link` is
  for clickable text only.
- `overlay` is applied at 40% opacity in scrim contexts (Dialog,
  Drawer); the alpha channel is dropped from the YAML front matter and
  documented here in prose.

The full consumer rulebook lives in `USAGE.md`.
