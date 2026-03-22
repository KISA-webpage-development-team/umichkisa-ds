# Component Skill Draft — Workflow Notes

Captured from the Step 1 (Icon Implementation) session on 2026-03-22.
This documents how Jioh works with Claude, to inform the design of the Step 4 Component Skill.

---

## Session Workflow (observed)

### Phase 1: Startup

1. Claude reads `docs/TODO.md` — finds the first unchecked task
2. If the task has a spec, read it. If no spec exists, the session is dedicated to writing the spec.
3. For component work, also read `docs/DS_CONSTRAINTS.md`

### Phase 2: Grill / Design Decisions (`/grill-me` skill)

Before any spec or code is written, Jioh invokes `/grill-me` to resolve all design decisions upfront.

How it works:
- Claude walks down each branch of the decision tree, one question at a time
- Each question includes a recommended answer with reasoning
- Where possible, Claude explores the codebase first to answer questions itself (e.g., auditing the client repo for real icon usage)
- Jioh picks an option or pushes back
- Decisions are final — recorded in the spec, not re-litigated later
- Session produces a **decision summary table** at the end

Key principle: **no ambiguity survives into the spec.** Every design question is resolved before writing begins.

### Phase 3: Spec Writing

Once all decisions are resolved, Claude writes the spec to `docs/specs/<feature>.md`.

Spec structure:
- Goal
- Scope (in/out)
- Decisions table (from grill phase)
- Component API (props, behavior, examples)
- File structure
- Implementation steps (phased)
- Registry/reference tables
- Session end checklist

The spec is the contract. The implementation plan references it; the spec reviewer validates against it.

### Phase 4: Implementation Plan (`/writing-plans` skill)

Claude writes a detailed implementation plan to `docs/plans/YYYY-MM-DD-<feature>.md`.

Plan structure:
- Header (goal, architecture, tech stack)
- Pre-flight (files to read, commands to know)
- Bite-sized tasks (each ~2-5 minutes)
- Each task has: files to touch, exact code, exact commands, expected output, commit message
- TDD: write failing test → implement → verify pass → commit

### Phase 5: Execution (subagent-driven development)

Jioh chooses execution approach. This session used **subagent-driven** (same session):

1. Create task tracking (TaskCreate for all tasks)
2. For each task:
   - Dispatch fresh implementation subagent with full task text + context (subagent does NOT read the plan file)
   - Subagent implements, runs tests, commits, self-reviews
   - Dispatch spec compliance reviewer (validates against spec)
   - Dispatch code quality reviewer (checks correctness, style, types)
   - If issues found → implementer fixes → re-review
   - Mark task complete
3. For trivial tasks (dep swaps, build verification, docs updates): controller can execute directly
4. For tasks needing user input: pause and ask

### Phase 6: Session End

1. `pnpm build` and `pnpm typecheck` must pass
2. Update `docs/CODEBASE.md` status tables
3. Check off item in `docs/TODO.md`
4. Final commit
5. Present breakpoint options to user

---

## Skills Used (in order)

| Skill | When | Purpose |
|-------|------|---------|
| `/grill-me` | Before spec | Resolve all design decisions via structured interview |
| `/writing-plans` | After spec | Create bite-sized TDD implementation plan |
| `subagent-driven-development` | Execution | Dispatch fresh subagent per task + two-stage review |
| `superpowers:code-reviewer` | After each task | Spec compliance + code quality review |

---

## Patterns to Encode in Component Skill

### Decision-first, code-second
Every component session should start with a grill phase. No code until all decisions are resolved.

### Codebase audit before design
Before asking the user about API design, audit the client repo for real usage patterns. This grounds decisions in reality, not hypotheticals.

### Spec is the contract
The spec reviewer validates against the spec, not against the plan or the code. The spec is the single source of truth for what the component should be.

### Subagent isolation
Each task gets a fresh subagent. The controller provides full context — the subagent never reads the plan file. This prevents context pollution and keeps each task focused.

### Two-stage review
1. **Spec compliance** — does the code match the spec? Nothing missing, nothing extra.
2. **Code quality** — is the code correct, well-typed, consistent with codebase style?

Spec compliance comes first. No point reviewing code quality if it doesn't match the spec.

### Skip reviews for trivial tasks
Dependency swaps, build verification, and docs updates don't need full two-stage review. The controller can verify these directly.

### Brand icon pattern (for future custom SVGs)
- Raw SVG source files go in `packages/web/src/components/icon/svg/`
- React component wrappers go in `packages/web/src/components/icon/custom/`
- Components adapt SVGs: `viewBox` preserved, `fill="currentColor"`, `width={size}` / `height={size}`
- Registered in `registry.ts` alongside Lucide entries

---

## User Preferences (observed)

- Prefers short, direct option labels — picks fast, doesn't need lengthy deliberation
- Trusts Claude's recommendations — overrides only when Claude is wrong (e.g., Lucide brand icons being deprecated)
- Wants clean breaks over migration shims
- Scope discipline: DS package only, client migration is out of scope
- Convention over enforcement: trusts documentation + TypeScript over runtime checks
