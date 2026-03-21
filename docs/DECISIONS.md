# Architectural Decisions

## Client app is reference only, not implementation template
**Decision:** When building or migrating components, use `../KISA-website/client/src/components/ui/` as a requirements reference only. Do not copy implementation patterns.
**Why:** The DS must be built from DS documentation, not from ad-hoc client code. Client code has tech debt and non-standard patterns.
**Alternatives rejected:** Direct migration — would import client-side inconsistencies into the design system.

## Definition of done per component
**Decision:** A component is done when: implemented → MDX docs page written → live iframe preview rendering.
**Why:** Shipping code without docs or preview is incomplete — consumers can't use it confidently.
**Alternatives rejected:** Code-only DoD — leaves docs perpetually deferred.

## Lucide as single icon source
**Decision:** All icons use Lucide via a single `Icon` wrapper component. The 19 hand-crafted SVGs are replaced.
**Why:** DS iconography docs define Lucide as the standard. Custom SVGs create maintenance burden.
**Alternatives rejected:** react-icons — larger bundle, less consistent with DS spec.

## Spec-first session pattern
**Decision:** When a task has no spec, the entire session is dedicated to writing the spec. Task execution happens in a separate fresh-context session.
**Why:** Mixing spec design and execution in one context leads to drift, wasted tokens re-reading decisions, and poor handoff state.
**Alternatives rejected:** Inline spec writing + immediate execution — context gets polluted before first line of code.

## Session state appended to spec file
**Decision:** When context hits 70%, session state (task, done, last file, next action, blockers) is appended to the relevant spec under `## Last Session`.
**Why:** The spec already encodes task instructions. Handoff state co-located with instructions means next session reads one file to resume.
**Alternatives rejected:** Separate SESSION.md — extra file, extra read, state divorced from instructions.
