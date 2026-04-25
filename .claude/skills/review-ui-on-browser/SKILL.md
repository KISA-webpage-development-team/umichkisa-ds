---
name: review-ui-on-browser
description: Visual UI/UX review of a running dev server using the playwright-cli skill. Use when the user wants Claude to look at the actual rendered UI on the browser (not just static code) and produce findings on hierarchy, spacing, primary action visibility, loading/empty/error states, and content readability. Manually invoked — not wired into autonomous routines.
allowed-tools: Bash(playwright-cli:*) Bash(npx:*) Bash(npm:*)
---

# Review UI On Browser

> This skill drives the browser through the sibling **`playwright-cli`** skill (Microsoft's `@playwright/cli`, https://github.com/microsoft/playwright-cli). See `.claude/skills/playwright-cli/SKILL.md` for the full command reference. This file describes only the review workflow on top of those commands.

## When to invoke

Manually, by the user, during:
- **Mode C (PR review)** — after checking out the branch and starting the dev server, before merge approval, to catch visual issues a human reviewer might miss
- **Mode D (interactive execution)** — after a UI-touching task completes, before `git commit`, to sanity-check the rendered result

## Prerequisites (one-time setup)

`playwright-cli` must be installed. Defer to the `playwright-cli` skill's own install section. Quick check:

```bash
npx --no-install playwright-cli --version              # check CLI
npm install -g @playwright/cli@latest                  # install CLI if missing
npx playwright-cli install-browser chrome-for-testing  # install browser binary (~92 MB, one-time)
```

The CLI install does NOT bring the browser binary. The first `open --browser=chromium` will fail with `Browser "chrome-for-testing" is not installed` until `install-browser` is run.

If either step is missing, fail early with the install instruction — do NOT silently install.

## Prerequisites (per invocation)

The user must have:
1. Checked out the branch they want to review
2. Started the dev server (`cd ../KISA-website/client && npm run dev`)
3. Confirmed the dev server is reachable at the URL they pass to the skill (use the devtunnels URL the user provides — never `localhost`)

The skill does NOT start the dev server. It assumes the running server.

## Inputs (the user tells the skill these or the lane explains itself)

- **Base URL** (devtunnels URL the user provides, if not, default to `https://vnw20xbg-3000.asse.devtunnels.ms`)
- **Routes** to visit (e.g., `["/pocha/manage", "/pocha/manage/?dialog=open"]`)
- **Key flows** (optional — descriptions like "open the create dialog, fill the info tab, switch to menu tab")
- **Viewports** (default `[{ width: 1280, height: 800, label: "desktop" }, { width: 375, height: 812, label: "mobile" }]`)
- **What changed** (a 1–2 sentence summary of what the user wants reviewed — e.g., "the PochaForm dialog redesign with sticky footer")

## Process

Use a single named session (`-s=review`) so all commands target the same browser instance. Open once, drive through all routes/viewports, close at the end.

```bash
# 1. Open the session (headless by default)
playwright-cli -s=review open --browser=chromium

# 2. For each route × viewport:
playwright-cli -s=review goto <baseURL><route>
playwright-cli -s=review resize 1280 800
playwright-cli -s=review snapshot --filename=/tmp/review-ui-on-browser/<ts>/<slug>-desktop.yml
playwright-cli -s=review screenshot --filename=/tmp/review-ui-on-browser/<ts>/<slug>-desktop.png
playwright-cli -s=review resize 375 812
playwright-cli -s=review snapshot --filename=/tmp/review-ui-on-browser/<ts>/<slug>-mobile.yml
playwright-cli -s=review screenshot --filename=/tmp/review-ui-on-browser/<ts>/<slug>-mobile.png

# 3. For each described flow: snapshot to get refs, then drive
playwright-cli -s=review snapshot                         # read refs (e3, e15, …)
playwright-cli -s=review click e15
playwright-cli -s=review fill e7 "사장님"
playwright-cli -s=review screenshot --filename=...-step-N.png

# 4. Close
playwright-cli -s=review close
```

The `playwright-cli snapshot` YAML is the accessibility tree with refs — that's both the a11y capture and the source of element refs for interaction.

`playwright-cli` auto-stabilizes after each command, so explicit `networkidle` waits aren't needed. If a route does need an extra wait (e.g., post-mount async fetch), use `playwright-cli -s=review eval "..."` as the escape hatch.

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

- Always use a single named session (`-s=review`) so `resize`, `snapshot`, `screenshot`, `click`, `fill` all hit the same browser instance. Close it at the end with `playwright-cli -s=review close`.
- For element interaction, **always `snapshot` first** to get refs (`e3`, `e15`, …), then `click eN` / `fill eN "..."`. Don't guess refs — they're only valid relative to the most recent snapshot.
- `playwright-cli` is headless by default — don't pass `--headed` (that's for the user to debug interactively, not for the skill).
- Capture each screenshot as PNG via `--filename=...png`.
- The screenshots are the primary artifact — text findings reference them with absolute paths so the user can open them.
- Do not modify any client files. Do not start the dev server. Do not commit anything.

## Common pitfalls

- Forgetting `-s=review` on a follow-up command → opens a fresh browser, loses session state.
- Calling `click eN` without a fresh `snapshot` first → stale or wrong ref → wrong element clicked.
- Using `localhost` URLs → use the devtunnels URL the user provides (per environment constraints).
- Mixing up base URL with route — base URL is the devtunnels host, route is `/pocha/manage`.
- Reviewing only desktop — always include mobile (375px) at minimum.
- Reporting findings without absolute screenshot paths — the user must be able to open the image to verify.
