## Colors

The palette is anchored by the two Michigan brand colors and supported
by a high-contrast neutral scale plus a small set of semantic feedback
states. Accent placement is sparse — brand colors mark navbars, hero
sections, and primary CTAs, never mid-page card or content
backgrounds.

- **Brand Primary (#00274c):** Michigan navy. The dominant interactive
  and surface accent — primary buttons, top-of-page chrome, focus
  borders on form controls.
- **Brand Accent (#ffcb05):** Michigan maize. Reserved for sparse
  accent placement: focus rings, selected-item indicators, the maize
  text on navy backgrounds via `brand-foreground`. Never used as a
  link color (low contrast on white).
- **Brand Accent Subtle:** A lighter maize wash for hover and focus
  backgrounds on interactive list items.
- **Surface / Surface Muted / Surface Subtle:** Page and card
  backgrounds. Two-level depth: page + cards on `surface`, elevated
  inner regions on `surface-subtle`, deprioritized regions on
  `surface-muted`. Cards distinguish via `border`, not shadows.
- **Border / Border Strong:** The depth-carrying lines.
  `border-strong` reserved for hover/focus emphasis on neutral
  interactives.
- **Foreground / Muted Foreground / Disabled Foreground:** Text
  hierarchy. `foreground` is the default body color;
  `muted-foreground` is for genuinely secondary content (not the
  default — if it went to 40% opacity, the screen would still be
  usable); `disabled-foreground` is never used for content that needs
  to be read.
- **Link:** Mid-tone Michigan blue. The only correct color for
  hyperlink text. Underline on hover; no visited style.
- **Error / Success / Warning / Info:** Each ships with a paired
  `-subtle` background. `info` and `link` resolve to the same blue
  but are not interchangeable — `info` is for state indicators and
  alert borders, `link` is for clickable text only.
- **Overlay (#000000 at 40% opacity):** Scrim for Dialog and Drawer.
  The alpha channel is dropped from the YAML token (the spec accepts
  6-digit hex only); 40% opacity is applied at render time.

Reference semantic tokens (`brand-primary`, `surface`, `foreground`)
in component code — never primitive values or raw hex. The full
consumer rulebook lives in `USAGE.md`.
