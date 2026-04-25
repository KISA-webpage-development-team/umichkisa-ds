---
name: review-ui-on-browser
description: Visual UI/UX review of a running localhost dev server using Playwright CLI. Use when the user wants Claude to look at the actual rendered UI on the browser (not just static code) and produce findings on hierarchy, spacing, primary action visibility, loading/empty/error states, and content readability. Manually invoked — not wired into autonomous routines.
---

# Review UI On Browser

## When to invoke

Manually, by the user, during:
- **Mode C (PR review)** — after checking out the branch and starting the dev server, before merge approval, to catch visual issues a human reviewer might miss
- **Mode D (interactive execution)** — after a UI-touching task completes, before `git commit`, to sanity-check the rendered result

NOT invoked from:
- `ds-client-constrained-execution` skill (intentional — Vercel preview auth + per-branch URL constraints make this impractical for autonomous use)
- Autonomous nightly routine (same)

## Prerequisites (one-time setup on the user's Mac)

```bash
# In ANY directory — Playwright manages its own browser binaries:
npx playwright install chromium
```

This downloads the Chromium browser binary (~150MB, ~2 min). Once installed, subsequent invocations skip this step.

## Prerequisites (per invocation)

The user must have:
1. Checked out the branch they want to review
2. Started the dev server (`cd ../KISA-website/client && npm run dev`)
3. Confirmed the dev server is reachable at the URL they pass to the skill (default `http://localhost:3000`)

The skill does NOT start the dev server. It assumes the running server.

## Inputs (the user tells the skill these)

- **Base URL** (default `http://localhost:3000`)
- **Routes** to visit (e.g., `["/pocha/manage", "/pocha/manage/?dialog=open"]`)
- **Key flows** (optional — descriptions like "open the create dialog, fill the info tab, switch to menu tab")
- **Viewports** (default `[{ width: 1280, height: 800, label: "desktop" }, { width: 375, height: 812, label: "mobile" }]`)
- **What changed** (a 1–2 sentence summary of what the user wants reviewed — e.g., "the PochaForm dialog redesign with sticky footer")

## Process

For each route × viewport combination:

1. Launch a headless browser via `npx playwright`
2. Navigate to `<baseURL><route>`
3. Set viewport size
4. Wait for `networkidle`
5. Screenshot — save to `/tmp/review-ui-on-browser/<timestamp>/<route-slug>-<viewport-label>.png`
6. Capture the accessibility tree (Playwright `page.accessibility.snapshot()`)
7. If a flow is described, walk through it (click selectors, fill inputs) — screenshot at each step

After captures, review every screenshot against the rubric below and return findings.

## Rubric

For each screenshot, evaluate:

### Hierarchy
- Is the primary action visually prominent (size, color, position)?
- Are headings clearly differentiated by size + weight from body text?
- Does the visual order match the intended reading order?

### Spacing rhythm
- Consistent gap tier within sections? (No `gap-2` jumping to `gap-6` arbitrarily)
- Page padding consistent with siblings on adjacent routes?
- Component-internal padding feels deliberate, not cramped or floating?

### Primary action visibility
- Can the user tell what to do next within 2 seconds of looking?
- Disabled / loading states distinct from the active state?
- Submit button position predictable (sticky footer for forms, end of card for actions)?

### State coverage
- Loading: a skeleton, spinner, or text placeholder is visible during data fetch
- Empty: empty state has helpful text + (if applicable) a primary action to fill it
- Error: error state has a clear message + recovery path
- All three states reachable in the routes/flows visited

### Content readability
- Body text uses primary foreground color (not muted-foreground for content the user must read)
- Status content uses semantic colors (success/warning/error/info), not muted neutrals
- No content overflow / text clipping at either viewport
- Korean + English text both render with their intended type tier

### Mobile (375px) specifics
- Tap targets ≥ 44×44 px
- No horizontal scroll on the body
- Modals / dialogs adapt to viewport (no offscreen content)
- Sticky footer stays in view during keyboard open (best-effort; flag if you can't tell)

## Output format

Per finding:

```
FINDING N [BLOCK|SUGGEST|INFO]
Screenshot: /tmp/review-ui-on-browser/<timestamp>/<route-slug>-<viewport-label>.png
Route: <route>
Viewport: <viewport label>
Smell: <one-line problem>
Suggested fix: <concrete change in code or design>
```

Severity:
- **BLOCK** — broken UX (overflow, content unreachable, primary action invisible, error state missing)
- **SUGGEST** — visible polish issue (spacing rhythm, hierarchy off, status badge wrong variant)
- **INFO** — minor polish or alternative

End with a summary:

```
---
Reviewed: <N> route(s) × <M> viewport(s)
Screenshots: /tmp/review-ui-on-browser/<timestamp>/
Result: B BLOCK, S SUGGEST, I INFO finding(s)
```

If clean:

```
Result: PASS — no findings
```

## Implementation notes

- Use `npx playwright codegen` patterns mentally; do not actually invoke codegen
- Run Playwright in headless mode (`--headed` is for the user to debug, not for the skill)
- Capture each screenshot as PNG
- The screenshots are the primary artifact — text findings reference them with absolute paths so the user can open them
- If `npx playwright install chromium` has not been run, fail early with the install instruction — do NOT silently install
- Do not modify any client files. Do not run dev server. Do not commit anything.

## Common pitfalls

- Forgetting to wait for `networkidle` before screenshot → captures loading skeleton instead of loaded UI
- Mixing up base URL with route — base URL is `http://localhost:3000`, route is `/pocha/manage`
- Reviewing only desktop — always include mobile (375px) at minimum
- Reporting findings without absolute screenshot paths — the user must be able to open the image to verify
