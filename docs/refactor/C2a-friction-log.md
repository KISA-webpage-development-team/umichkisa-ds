# C2a — Schema-Friction Log

_Running log of awkward fits, schema gaps, and DS-side discrepancies surfaced
during COMPONENT.md authoring. Per Pitfall §4.4: friction goes here, NOT into
silent schema mutations. Finalized at C2a.final into recommendations for the
human to decide whether A2 needs amending before future authoring._

Entries are appended in the order they surface. Each entry: short and
self-contained — what was awkward, how it was handled, recommendation.

---

## C2a.2 — Layout group (Container, Grid)

### F1. Container's actual padding diverges from `/DESIGN.md` Layout prose

- **Awkward**: `/DESIGN.md` Layout section prose says "page shell combines `mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8`" and DS_CLIENT_USAGE rule `p2-ly-1` echoes the same. The live `Container.tsx` actually emits `mx-auto w-full p-6 lg:p-12` (vertical padding too, single breakpoint, larger horizontal values). The intrinsic-behavior bullet had to choose between describing what the source does vs. what the prose says.
- **Handled**: Authored `intrinsic_behavior` to describe what the source does (`p-6 lg:p-12`), AND kept the "never compose `mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8` manually" anti-pattern verbatim from the spec — because that hand-rolled equivalent IS what consumers would type from memory of the docs, and it's still wrong (drifts from the actual Container shape). Intrinsic-behavior ≠ what the docs say; what the docs say is the consumer's mental model that needs to map to the component.
- **Recommendation**: Surface the drift to the human as a DS-side discrepancy. Either Container's padding should be aligned with the documented page-shell pattern, or the DESIGN.md Layout prose + USAGE.md `p2-ly-1` need updating. Not a COMPONENT.md amendment.

### F2. `compound_parts` is omitted entirely on simple components

- **Awkward**: A2 §Schema lists `compound_parts` as `OPTIONAL — null/omitted when component has no parts`. For Container and Grid (no parts), the field is omitted. This is fine, but worth recording: roughly half the catalog will omit `compound_parts`, `variants`, and `requires_context`. The schema's "everything optional except identity + picks" shape is correct; just confirming it survives first contact.
- **Handled**: Omitted the fields. No schema mutation needed.
- **Recommendation**: None. Schema fits.

### F3. Anti-pattern targeting an alternative DS surface that does not exist

- **Awkward**: Grid's "passing className that overrides grid-cols-*" anti-pattern's `redirect:` says "compose plain CSS grid utilities directly." But the broader `cross_component_invariants` entry `ds-layout-no-utility-override` forbids forcing layout utilities on DS layout components — Grid IS a DS layout component. There is a tension between the local anti-pattern (Grid says "drop me and use raw utilities") and the cross-invariant ("don't fight DS layout components with raw utilities"). The two are consistent — drop Grid first, THEN use raw utilities — but the redirect prose has to be careful.
- **Handled**: Wrote the redirect as "drop Grid and compose `<div className=\"grid grid-cols-* gap-*\">` directly" — the keyword is "drop", which makes the consumer aware they are no longer in Grid's contract.
- **Recommendation**: Establish a convention in A2 authoring guidance: when an anti-pattern's redirect involves dropping the DS component entirely, the redirect prose must say "drop X and ..." (not just "use ..."). Avoids ambiguity with cross-invariants that govern the same surface area.

### F4. `cross_component_invariants` referencing yet-to-be-authored components

- **Awkward**: The C2a.2 group seeded `ds-layout-no-utility-override` because Container's `see_also` needed a target. The invariant's `components: [Container, Tabs, Form, Card, Dialog]` list references components authored in C2a.6 (Card, Display group), C2a.8 (Dialog, Overlays group), C2a.9 (Tabs, Navigation), and C2a.11 (Form). Per Pitfall §4.6 dangling refs are expected during incremental rollout, but it means a C2a.2-only checkpoint passes have unresolved cross-references in the file.
- **Handled**: Added an inline `# Note:` comment under the invariant explaining the dangling state until C2a.6 / .8 / .9 / .11 complete.
- **Recommendation**: A2 authoring guidance should explicitly bless mid-authoring dangling cross-refs (currently only implied by the incremental rollout language). Phrase it as: "A `cross_component_invariants` entry MAY reference components whose entries are not yet authored. The C2a.final dangling-reference sweep is the gate, not per-step lint."
