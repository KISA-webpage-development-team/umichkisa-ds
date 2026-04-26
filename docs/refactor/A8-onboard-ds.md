# A8 — `onboard-ds` Skill Specification

_Subphase A8 of the `ds-client-constrained-execution` 4-layer refactor. Specification only — the actual `.claude/skills/onboard-ds/SKILL.md` is authored in Phase D (post-rollout), not in Phase A or Phase C._

A8 was added to Phase A mid-stream after a grill-time observation: setup-and-prerequisite rules (Tailwind v4 + theme.css imports, font-loader wiring) fire **once per project**, not per task. Keeping them in the per-task agent's reference doc (`USAGE.md`) means every per-task dispatch carries context that's already settled. Splitting them into a one-shot setup skill cleans up `USAGE.md`, sharpens the per-task agent's mental model, and gives KISA devs (and eventually external KISA-DS consumers) a discoverable "did I wire this up correctly?" entry point.

---

## Scope

`onboard-ds` is a **project-level skill**: it runs against an entire client repository, not against individual files. Two modes:

| Mode | Trigger | Behavior |
|---|---|---|
| `verify` | `/onboard-ds verify` (or just `/onboard-ds` with no arg) | Read the project's setup state. Report pass/fail per setup rule. Touch no files. |
| `bootstrap` | `/onboard-ds bootstrap` | Greenfield project. Add the imports, scaffold font loaders, wire `<html>` font variable classes, install missing deps. Idempotent — safe to re-run. |

Both modes write/update a marker file (see §Marker file) on success.

The per-task skill (`ds-client-constrained-execution`) reads the marker file as a precondition check. If the marker is missing or stale (DS package version drifted by more than a patch), the per-task skill refuses to dispatch and prints "run `/onboard-ds verify` first."

---

## Setup rules being absorbed

From A1's Part 2 inventory of `DS_CLIENT_USAGE.md` setup rules:

| Rule id (current) | Gloss | New home |
|---|---|---|
| `p2-cs-1` | Tailwind v4 consumers import `@umichkisa-ds/web/theme.css` in CSS entry | `onboard-ds` |
| `p2-cs-2` | Never import `dist/styles.css` in Tailwind v4 consumer (precompiled, tree-shaken, silent breakage) | `onboard-ds` |
| `p2-fn-1` | Load SejongHospital Bold + Light via `next/font/local` with `--font-sejong-bold/light`, display swap, `.variable` on `<html>` | `onboard-ds` |
| `p2-fn-2` | Load Pretendard Variable via CDN preconnect + stylesheet link to jsdelivr | `onboard-ds` |
| `p2-fn-3` | Never duplicate font files into client repo (point `next/font/local` at DS source) | `onboard-ds` |
| `p2-fn-4` | Never load Geist Mono in client apps (with Q11 reframing: code-display contexts only) | `onboard-ds` |

**6 rules absorbed.** All are project-setup invariants the per-task agent never touches.

What stays in `USAGE.md`: every other Part 2 rule (component-usage, styling, icons, forms, layout, local-components, classname-passthrough, third-party-libs). These all apply at write time and are the per-task agent's actual constraint surface.

---

## Marker file

Each onboarded project carries a small, committed marker the per-task skill checks. Two design choices below — open questions, not yet locked:

**Path (open):**
- `(a)` Repo root: `.ds-onboarded`
- `(b)` Inside `.claude/`: `.claude/ds-onboarded.json`
- `(c)` Inside the client app's config dir if conventional (Next.js `next.config.mjs` adjacent)

Recommendation: **(a) repo root**. Visible, one file, conventional placement (mirrors `.gitignore`, `.editorconfig`).

**Schema (open):**
```yaml
# .ds-onboarded — written by /onboard-ds; read by ds-client-constrained-execution
ds_package: "@umichkisa-ds/web"
ds_version_verified_against: "1.0.21"   # exact version at last verify/bootstrap
last_verified: "2026-04-26T07:30:00Z"
mode_last_run: "verify"                  # verify | bootstrap
checks_passed:
  - p2-cs-1
  - p2-cs-2
  - p2-fn-1
  - p2-fn-2
  - p2-fn-3
  - p2-fn-4
checks_skipped: []                       # rules waived with explicit justification
```

Recommendation: **YAML**, fields above. JSON is also fine; YAML matches existing `.claude/`-adjacent config style.

**Staleness rule (open):**
- The per-task skill checks `ds_version_verified_against` against the currently-installed DS package version.
- Same minor or patch (e.g. verified `1.0.20`, installed `1.0.21`) → fresh. Per-task work proceeds.
- Different minor (e.g. verified `1.0.x`, installed `1.1.0`) → stale. Skill refuses to dispatch; tells user to re-run `/onboard-ds verify`.
- Different major → stale (same handling).

This means a routine DS patch bump does NOT force re-onboarding (matches the memory `feedback_ds_bump_semver` that all bumps are patches today; staleness only triggers when DS makes a meaningful change).

---

## Skill location

`onboard-ds` lives at **`.claude/skills/onboard-ds/SKILL.md`** in the **DS repo** (`umichkisa-ds`), same parent as the existing `ds-client-constrained-execution`. Reasons:

- The skill encodes DS-specific knowledge (which files to import, which font tokens to wire, which package). Shipping it from the DS repo keeps it co-located with the source of truth.
- Plugin packaging (post-migration) collects all DS-related skills + agents into one plugin folder; co-location now makes that move trivial.
- The skill is invoked from the **client repo** as the working directory but **lives in** the DS repo's `.claude/`. Same model as `ds-client-constrained-execution` today.

---

## Mode flows (sketch)

### `verify` mode

```
1. Read .ds-onboarded marker if present.
2. For each setup rule (p2-cs-1 through p2-fn-4):
   - Run the rule-specific check against the project state.
   - Examples:
     * p2-cs-1: grep client's CSS entry for `@import "@umichkisa-ds/web/theme.css"`
     * p2-fn-1: grep `app/layout.tsx` (or pages/_app) for next/font/local + sejong-bold variable
     * p2-fn-3: check no .ttf files exist in client/public/fonts that are also in DS
3. Report pass/fail per rule with file:line references for failures.
4. If all pass: write/update .ds-onboarded with current DS version.
5. If any fail: print fix instructions referencing onboard-ds rule docs;
   do NOT touch files in verify mode.
```

### `bootstrap` mode

```
1. Confirm project is greenfield-ish (no existing .ds-onboarded; or user
   passes --force on a brownfield project).
2. For each setup rule, take the corresponding action:
   - p2-cs-1: append `@import "@umichkisa-ds/web/theme.css";` to the
     project's CSS entry (detect via next.config / vite.config / etc.)
   - p2-fn-1: write a next/font/local declaration block to app/layout.tsx
     pointing at DS-shipped font files
   - p2-fn-2: add CDN preconnect + stylesheet links to <head>
   - p2-fn-3: skip if no duplicates exist; warn if duplicates present
   - p2-fn-4: ensure no Geist Mono loader in client; only the DS-shipped
     font tokens reference it
3. Run npm install if any new deps added.
4. Run /onboard-ds verify to confirm the bootstrap landed correctly.
5. Write .ds-onboarded.
```

Bootstrap is **idempotent** — running on an already-bootstrapped project is a no-op (verify mode in disguise).

---

## Integration with `ds-client-constrained-execution`

The per-task skill gains a preflight step (Phase A6 will spec the SKILL.md diff; A8 just states the integration shape):

```
Cold-session preflight (per existing CLAUDE.md):
1. (existing) Read TODO.md, find next unchecked client migration entry.
2. (existing) DS symlink check.
3. (NEW) Read .ds-onboarded from client repo root.
   - Missing → STOP. Print: "run /onboard-ds bootstrap or verify in the client repo first."
   - Present + version match (per staleness rule) → proceed.
   - Present + stale → STOP. Print: "DS version drifted; run /onboard-ds verify."
4. (existing) Mode detection.
```

The preflight failure is a hard block; setup must be solid before any per-task work is dispatched.

---

## Ripple updates to other Phase A docs

| Doc | Change |
|---|---|
| **A3** | Remove "Setup" from the section list of USAGE.md. Add one-line pointer: "For project-level setup and prerequisite checks, see the `onboard-ds` skill." Setup rules `p2-cs-1`/`-cs-2`/`-fn-1`/`-fn-2`/`-fn-3`/`-fn-4` no longer count toward USAGE.md rule count. |
| **A4** | Unaffected. The compiler doesn't care who imports what. |
| **A5** | Unaffected. The implementer agent never reads setup rules. The §7.3 anti-zealot framing strengthens because USAGE.md is leaner. |
| **A6** | Add the preflight step (above) to the SKILL.md diff. The skill's prerequisite block changes from a passive "applies to projects on Tailwind v4 + @umichkisa-ds/web ≥ X" to an active "checks `.ds-onboarded` marker on every cold session." |
| **A7** | Unaffected. Escalations are rule-violation events, not setup events. |

A3 update is the only mandatory Phase A edit. A6 update lands when A6 is written.

---

## Phase timing

`onboard-ds` skill **is not built in Phase A or Phase C.** Phase A specifies it; Phase D (post-rollout, after the new architecture is validated end-to-end) builds it.

Two reasons for the deferral:

1. The current KISA client app is already onboarded (manually). The marker file can be hand-written for the existing client when needed; building the verification + bootstrap automation isn't blocking.
2. Bootstrap mode's real value emerges when a *second* DS consumer arrives (a new microsite, a non-KISA-website project, a separate spinoff). Until then, manual one-time setup is fine.

Phase D trigger: either (a) a second client repo needs onboarding, or (b) the existing client's setup needs to be re-checked after a major DS change.

---

## Open questions

- **Marker file path / schema** — recommendations above ((a) repo root, YAML); confirm at Phase D build time or earlier.
- **Staleness threshold** — minor-version-bump triggers re-verify is the recommendation; could be tightened to patch if real drift cases appear.
- **Bootstrap detection of project framework** — Phase D will need to detect Next.js vs Vite vs other to wire imports correctly. Sketch above assumes Next.js; the actual skill will branch on detection.
- **Marker file commit policy** — committed (visible in git history, drift surfaces in PRs) vs gitignored (per-developer state). Recommendation: **committed**. Same reasoning as `.gitignore` and other repo-level config.
