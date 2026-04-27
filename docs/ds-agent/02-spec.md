# ds-agent — Full Specification

_Captured 2026-04-27. Resolves the open questions in `00-introduction.md` §9.
Authoritative for v1 architecture. Implementation-level details
(exact prompt phrasing, generation script internals) settle in
follow-up docs as work begins._

---

## 1. Goals & non-goals

### Goals

- An LLM agent ships DS-conformant UI for the KISA client app from a
  natural-language frontend task.
- The agent's per-dispatch context cost stays bounded — no full-DS
  load per task.
- The DS team maintains the system without per-task authoring (no
  hand-written recipe per scenario, no per-component contract that
  duplicates TypeScript types).
- The architecture is portable — another DS can adopt the same shape
  with their own CATALOG/WISDOM/PATTERNS and auto-generated facts.

### Non-goals

- The agent does not invent visual design. Component pick, token pick,
  and composition are routed by the DS's opinions, not the agent's.
- v1 does not ship a published CLI tool. Generation and linting run as
  local scripts (deferred to v2).

### Note on packaging

The project is named "ds-agent" but what it ships is a *workflow*: an
implementer agent, a reviewer agent, an optional aesthetic-review
agent (§2.3), and a skill that orchestrates them against the doc set.
Whether each piece is packaged as a Claude Code agent file, a skill,
or both is settled during Phase 3 (§12) once the prompts and loops
are real. The v1 testbed is the live KISA client migration —
`ds-client-constrained-execution` and the agents it dispatches are
modified directly to use the new doc set. There is no parallel
shadow stack.

---

## 2. The two-agent system

### 2.1 Implementer agent

**Identity.** Senior FE engineer for the KISA client app. Ships
working code that conforms to the DS. The DS is the source of
authority for visual decisions; the implementer's job is correct
execution within that authority, not redesign.

**Always-on context.** `CATALOG.md` only.

**Loop:**

1. Read CATALOG.md.
2. Decompose the task into UI intents.
3. For each intent, pick a component from CATALOG §1 and tokens from
   CATALOG §2 (using tier-pickers when no scenario row matches).
4. Collect picked components and token families as a tag set.
5. Grep WISDOM.md and PATTERNS.md for sections whose `Tags:` line
   shares ≥1 tag. Read those sections.
6. Read TypeScript declaration files in
   `node_modules/@umichkisa-ds/*/dist/index.d.ts` for prop-level
   detail on each picked component.
7. Write code.
8. Hand off to reviewer.

The implementer never reads TOKEN.md or COMPONENTS.md. It does not
need the flat universe — CATALOG enumerates what it should consider.

### 2.2 Reviewer agent

**Identity.** DS conformance gate. Checks for hallucinations, rule
violations, scenario mismatches, and brand fit. Does not author code;
returns structured feedback for re-dispatch.

**Always-on context.** `CATALOG.md` + `WISDOM.md` + `COMPONENTS.md` +
`TOKEN.md`.

**Loop:**

1. Read the always-on set.
2. **Hallucination scan.** Every `import { X } from '@umichkisa-ds/*'`
   must resolve to an entry in COMPONENTS.md. Every Tailwind class on
   DS-relevant axes (color / spacing / type / radius / shadow / icon
   size) must resolve to TOKEN.md.
3. **Rule scan.** For each `Tags:` section in WISDOM whose tags appear
   in the diff, verify the rule. Cross-component invariants from
   CATALOG §3 are also checked.
4. **Scenario-pick check.** For each UI intent visible in the diff,
   the implementer's component pick should match CATALOG §1.
   Mismatches → flag with the canonical pick.
5. **Pattern-compliance check.** When PATTERNS sections apply (by
   tag), the diff's orchestration shape should match.
6. **Brand review.** Mechanical brand rules (tagged `#brand` in
   WISDOM) are checked first. Then a gestalt pass against CATALOG §0
   ("does this surface feel like KISA, or generic SaaS?"). The gestalt
   pass is what an LLM-reviewer can do that a linter can't.
7. Output structured feedback per check (pass/fail + reason). On any
   fail, emit a re-dispatch envelope.

### 2.3 Aesthetic-review skill (bonus, on-demand)

Not part of the implementer ↔ reviewer orchestration. A separate
**skill** the developer invokes manually when they want a UI-designer
perspective on a finished surface — pacing, hierarchy, typographic
rhythm, brand fit beyond the mechanical rules.

**Identity.** A UI designer who has internalized the KISA brand and
the DS's business logic. Reads CATALOG (for brand voice + invariants)
and WISDOM (for the rule corpus the design choices live inside), then
looks at the rendered surface (via screenshot or live URL) and gives
qualitative feedback.

**When to use.** Manually, by the developer, on surfaces that warrant
a design eye — landing pages, hero moments, redesigns. Not on every
diff. Not part of the gating chain.

**Why a skill, not an agent.** It's a tool the developer reaches for,
not a step in an automated loop. Skill packaging matches that
ergonomics.

### 2.4 Why the implementer ↔ reviewer split

Hallucination is a verification concern. Putting fact lists in front
of the implementer adds context cost without adding capability — the
implementer is already routed by CATALOG. Putting fact lists in front
of the reviewer makes catching hallucinations a one-grep-per-import
operation.

The split also keeps each agent's role narrow: implementer carries
opinions, reviewer carries facts and rules. Neither agent does both
jobs.

---

## 3. Doc layout

Everything ds-agent-related lives under a single top-level
`ds-agent/` folder at the repo root. The folder is self-contained
and portable — porting the architecture to another DS is a folder
copy.

```
ds-agent/
  docs/
    00-introduction.md     # idea-level framing, durable shared context
    01-summary.md          # one-page project summary
    02-spec.md             # this document

  CATALOG.md               # always-on for both agents
  WISDOM.md                # drilled by implementer; always-on for reviewer
  PATTERNS.md              # drilled by implementer
  TOKEN.md                 # auto-generated; always-on for reviewer
  COMPONENTS.md            # auto-generated; always-on for reviewer

  scripts/
    gen-tokens.ts          # theme.css → TOKEN.md
    gen-components.ts      # index.d.ts → COMPONENTS.md
    lint-tags.ts           # verify Tags lines resolve
```

The prior 4-layer refactor process (`docs/refactor/`, the
maintainer-facing `DESIGN.md`, the C2a `COMPONENT.md`) is reference
only. ds-agent supersedes it; nothing in v1 work consumes those docs
as authority.

---

## 4. CATALOG.md

### 4.1 Role

Always-on map. The implementer's only required pre-read. The
reviewer's brand-context and scenario-truth source.

### 4.2 Structure

```markdown
# CATALOG.md

## §0 — Brand voice & mental model
Prose preamble. ~400 words. KISA identity (Korean students at UMich;
Michigan Blue + Maize); design philosophy (density, voice, layout
principles); the DS's opinions that should tip ambiguous calls.

## §1 — Scenario → Component
Sectioned by category (Feedback / Input / Overlay / Nav / Data
display / Form / Layout). One bullet per scenario row.

Format: `- <scenario phrase> → \`Component\` [(conditions)]`

## §2 — Scenario → Token & tier-pickers
Sectioned by axis (Color / Type / Spacing / Radius / Shadow / Icon
size). One bullet per scenario row. Each axis ends with a tier-picker
that defines the fallback path when no scenario row matches.

## §3 — Cross-component invariants
Short prose blocks for rules that span ≥2 components (Form
composition; IconButton + Tooltip; Modal vs Dialog vs AlertDialog).
~8–10 blocks. These live always-on because the agent might not drill
all involved components.

## §4 — Rule index
Flat list of pointers. Maps rule names to their WISDOM/PATTERNS
sections. Helps the agent scan for relevant rules when tag matching
is ambiguous.
```

### 4.3 Budget

Small enough that loading the whole file every dispatch is the
default — no anchor-grepping inside CATALOG itself. Token budget
settles after the first authored draft is measured. If the file
grows large enough that loading it dominates the implementer's
context, sharpen the prose rather than split the file — its value
is being one read.

### 4.4 Authoring discipline

- Scenarios are at "what is the user trying to do in this region of
  the page" granularity. Not page-level ("settings page"). Not
  event-level ("user clicks save"). ~30–60 component scenarios,
  ~30 token scenarios.
- §0 is opinions, not identification. "Korean students at UMich" is
  identification. "Korean and English live as equals — never demote
  Korean" is an opinion.

---

## 5. WISDOM.md

### 5.1 Role

The DS team's accumulated business logic. Per-component rules that
TypeScript can't express: parent requirements, sibling requirements,
controlled/uncontrolled traps, ordering, when-not-to-use, brand
constraints.

### 5.2 Structure

Single growing doc. Sectioned by component (or by topic for
brand-derived rules). Each section opens with a `Tags:` line.

```markdown
## form
Tags: #Form #Form.Input #Form.Select #Form.Switch

Form.* requires a `<Form>` ancestor that provides react-hook-form
context. Bare `<Input>` outside Form is allowed only for
non-validated fields (search, filter). Async submission errors
surface via `form.setError('root', { message })`.

## select
Tags: #Select

If you pass `value`, you must pass `onValueChange`. To use as
uncontrolled, use `defaultValue` and pass neither.

## brand-color-on-cta
Tags: #brand #bg-* #Button

Primary CTAs use `bg-primary`. Never use raw `bg-blue-*` or
`bg-kisa-blue-*` directly on a CTA — the semantic role token is the
contract.
```

### 5.3 Tag convention

- First non-blank line after the section heading is `Tags: #X #Y #Z`.
- Tags reference COMPONENTS.md entries (`#Form`, `#IconButton`),
  compound parts (`#Form.Input`), token families (`#bg-*`,
  `#text-*`, `#type-*`, `#spacing-*`, `#radius-*`, `#shadow-*`,
  `#icon-*`), or known meta-tags (`#brand`, `#tier-color-fallback`).
- Lint pass (see §9) verifies every tag resolves.

### 5.4 Audience

Jointly owned by devs and designers. Single doc so it's reviewed
holistically. Designers can read end-to-end without coding context;
devs append rules as they encounter them.

---

## 6. PATTERNS.md

### 6.1 Role

Multi-component orchestrations whose wiring is non-obvious from
individual contracts. The "dance" between ≥2 components.

### 6.2 Structure

Single growing doc. Sectioned by orchestration. Same `Tags:`
convention as WISDOM.

```markdown
## form-async-submit
Tags: #Form #Toast #Alert

When submitting a form asynchronously:

- Disable submit while pending (use `form.formState.isSubmitting`).
- On success: call `form.reset()` and emit a `Toast` confirming the
  action.
- On rejection: surface a server-derived message via
  `form.setError('root', { message })`. If the error is global
  (network / 500), render an `Alert` above the form rather than a
  field-level error.

Optional fenced code block illustrates the shape — not typechecked.
```

### 6.3 Authoring discipline

- ~5–8 orchestrations max. Hand-curated, mined from real client code,
  not authored speculatively.
- Patterns describe behavior in prose. They do NOT name prop literals
  beyond what's needed to disambiguate (e.g., naming
  `form.formState.isSubmitting` is fine; reciting the full RHF API
  is not). The discipline: if a pattern can't be written without
  reciting prop names, it's the wrong abstraction level.
- Patterns are illustrative only. The agent never *requires* a
  pattern to exist — when no pattern fits, it composes from CATALOG +
  WISDOM + TS types.

---

## 7. TOKEN.md

### 7.1 Role

Portable flat fact list of available tokens, organized by axis.
Audience: reviewer agent (always-on, for hallucination scan); DS
maintainers; designers.

### 7.2 Format

```markdown
# TOKEN.md

_Auto-generated from `packages/web/src/styles/theme.css`. Do not edit
by hand. Regenerate via `pnpm ds:gen-tokens`._

## Color
- `bg-surface`
- `bg-card`
- `bg-primary`, `text-on-primary`
- `bg-destructive`, `text-on-destructive`
- `border-border`
- `bg-kisa-blue-50` … `bg-kisa-blue-900`
- `bg-kisa-maize-50` … `bg-kisa-maize-900`
- `bg-gray-50` … `bg-gray-950`
- [...]

## Type
- `type-display-1`, `type-display-2`
- `type-heading-1` … `type-heading-4`
- `type-body-lg`, `type-body`, `type-body-sm`
- `type-caption`
- [...]

## Spacing
- `p-1` … `p-12`, `m-1` … `m-12`, `gap-1` … `gap-12`
- [...]

## Radius / Shadow / Icon size
- [...]
```

Format is intentionally adapter-friendly: another DS adopting the
architecture can hand-author the same shape if their stack isn't
Tailwind v4 `@theme`-based.

### 7.3 Generation

`scripts/gen-tokens.ts` parses theme.css and emits TOKEN.md.
Committed artifact. Regenerated whenever theme.css changes; CI fails
if HEAD's TOKEN.md doesn't match a fresh generation.

---

## 8. COMPONENTS.md

### 8.1 Role

Portable flat fact list of components exported from the DS packages.
Audience: reviewer agent (always-on, for hallucination scan); CI tag
linter.

### 8.2 Format

```markdown
# COMPONENTS.md

_Auto-generated from `node_modules/@umichkisa-ds/*/dist/index.d.ts`.
Do not edit by hand. Regenerate via `pnpm ds:gen-components`._

## @umichkisa-ds/web
- Alert
- AlertDialog
- Avatar, AvatarImage, AvatarFallback
- Badge
- Button
- IconButton
- Input
- Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
- Select, SelectTrigger, SelectContent, SelectItem
- Switch
- Table, TableHeader, TableBody, TableRow, TableCell
- TableMobileList
- Toast
- Tooltip
- [...]

## @umichkisa-ds/form
- Form
- Form.Input
- Form.Select
- Form.Switch
- Form.Submit
- [...]
```

### 8.3 Generation

`scripts/gen-components.ts` parses each package's `index.d.ts`,
extracts top-level exports and compound members, emits
COMPONENTS.md.

---

## 9. Tag system & linting

### 9.1 Tag vocabulary

| Kind | Form | Source of truth |
|---|---|---|
| Component | `#Form`, `#IconButton` | COMPONENTS.md entry |
| Compound part | `#Form.Input`, `#Modal.Footer` | COMPONENTS.md entry |
| Token family | `#bg-*`, `#text-*`, `#type-*`, `#spacing-*`, `#radius-*`, `#shadow-*`, `#icon-*` | TOKEN.md axis section |
| Meta | `#brand`, `#tier-color-fallback`, `#a11y` | Allowlist in lint script |

### 9.2 Lint rules

`scripts/lint-tags.ts`:

1. Walk WISDOM.md and PATTERNS.md, extract every `Tags:` line.
2. For each tag, resolve against COMPONENTS.md, TOKEN.md, or the
   meta-tag allowlist.
3. Fail CI on any unresolved tag (component renamed, token removed,
   typo).

### 9.3 Agent query model

The implementer's system prompt teaches the query:

> After picking components and tokens from CATALOG, collect them as a
> tag set. Grep WISDOM.md and PATTERNS.md for sections whose `Tags:`
> line shares at least one tag with your set. Read those sections in
> full. Do not read sections whose tags don't intersect your set.

---

## 10. Migration plan from existing docs

| Existing doc | Disposition |
|---|---|
| `docs/DS_CODEBASE.md` | Picking-layer content folds into `CATALOG.md` §1 + §2. Token Utility Classes section becomes the seed for TOKEN.md generation logic. Retire after CATALOG ships. |
| `docs/DS_CLIENT_USAGE.md` | Part 1 (implementer surface + tier picker) folds into CATALOG §2. Part 2 (rules) folds into WISDOM.md. Retire after WISDOM ships. |
| `DESIGN.md` (Google-style) | Retired. Token authoring source is theme.css. Brand voice fold into CATALOG §0. |
| `COMPONENT.md` (C2a YAML) | Picking-layer content (pick_when / reject_when) folds into CATALOG §1. Anti-patterns and cross-invariants fold into WISDOM.md (per-component) and CATALOG §3 (cross-component). YAML scaffolding and TS-redundant prose discarded. |
| `docs/refactor/A1–A5` | Reference only. Do not consume in execution; this spec supersedes. |
| `.claude/agents/ds-client-review.md` | Rewritten to be the reviewer agent of §2.2 — reads CATALOG + WISDOM + COMPONENTS + TOKEN always-on. |
| `.claude/skills/ds-client-constrained-execution/` | Modified directly to orchestrate the new implementer ↔ reviewer loop against the ds-agent doc set. No parallel shadow stack. |
| `implementer-template.md` | Rewritten in place to be the implementer agent of §2.1 — CATALOG always-on, drills WISDOM/PATTERNS by tag, reads TS types for prop API. |

---

## 11. Generation & lint scripts (v1 deliverable)

In `scripts/`:

- `gen-tokens.ts` — theme.css → TOKEN.md
- `gen-components.ts` — `index.d.ts` × 2 packages → COMPONENTS.md
- `lint-tags.ts` — walk WISDOM + PATTERNS, verify every tag resolves

Wire to package.json:

```json
{
  "scripts": {
    "ds:gen-tokens": "tsx scripts/gen-tokens.ts",
    "ds:gen-components": "tsx scripts/gen-components.ts",
    "ds:gen": "pnpm ds:gen-tokens && pnpm ds:gen-components",
    "ds:lint-tags": "tsx scripts/lint-tags.ts"
  }
}
```

CI pipeline:

1. `pnpm ds:gen` — regenerate facts.
2. `git diff --exit-code TOKEN.md COMPONENTS.md` — fail if facts are
   stale (hand edits or missed regeneration).
3. `pnpm ds:lint-tags` — fail on unresolved tags.

### v2 (deferred)

Roll up scripts into a published CLI (`@umichkisa-ds/cli` or
neutral-named package) so other DSes can adopt the architecture
without copying script source.

---

## 12. Build & rollout sequence

### Phase 1 — author the docs

1. Draft CATALOG.md (§0 brand voice, §3 cross-invariants are the
   highest-judgment work; §1 + §2 derive from existing
   DS_CODEBASE.md + DS_CLIENT_USAGE.md content).
2. Draft WISDOM.md by extracting per-component rules from existing
   docs + C2a COMPONENT.md.
3. Draft PATTERNS.md by mining ~5–8 orchestrations from real client
   code.

### Phase 2 — ship the scripts

4. Write `gen-tokens.ts`, `gen-components.ts`, `lint-tags.ts`.
5. Wire to CI.

### Phase 3 — wire the agents

6. Update `.claude/agents/ds-client-review.md` to consume the new
   always-on set.
7. Author the new implementer agent file consuming CATALOG only.
8. Update `ds-client-constrained-execution` skill to load CATALOG and
   expose the tag-grep step to the implementer prompt.

### Phase 4 — validate against live migration

9. Use the new workflow on the next available client-migration lane.
   Iterate the prompts and doc content based on what surfaces.
10. Retire the docs listed in §10 once their content has fully
    migrated and the new workflow has run cleanly across multiple
    lanes.

---

## 13. Open work / parking lot

- **Knowledge graph representation.** The tag system is a low-rent
  graph (sections × tags × shared neighborhoods). A real graph
  representation could enable richer queries ("show every rule that
  touches Form.* and a token") and visualization. Out of scope for
  v1.
- **Recipes-as-tests.** v1 patterns are prose. A future iteration
  could ship a parallel `recipes/` of typechecked .tsx snippets that
  PATTERNS.md prose references. Cost: maintenance + designer access.
  Reconsider after v1 stabilizes.
- **Reviewer brand-gestalt prompt tuning.** The non-mechanical brand
  pass (§2.2 step 6) needs prompt iteration to be reliable. Plan for
  a calibration pass once enough sample diffs exist.
- **Multi-DS adoption.** Architecture is portable in principle.
  Validate by porting to a second DS (real or stub) once KISA is
  stable. This drives the v1 scripts → v2 CLI promotion.
