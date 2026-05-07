# Phase 6 — kisa-web — Notes

Append-only breadcrumb log: DS bugs found, decision changes, blockers, user feedback.

---

## 2026-05-07 — Autonomous routine (run 1)

- Lane 6.2 (#164) — PR [#198](https://github.com/KISA-webpage-development-team/KISA-website-client/pull/198) `ready-for-review` (about kisa+events). 10 reviewer doubts, all corrected. KNOWLEDGE/FACT follow-ups: eyebrow→Badge mapping, block-quote primitive, numbered card index, key-value list (`<dl>` fallback).
- Lane 6.3 (#165) — PR [#199](https://github.com/KISA-webpage-development-team/KISA-website-client/pull/199) `ready-for-review` (about members+credits). Credits restructured to single deduped flat array (12 contributors). 9 reviewer doubts: 8 corrected, 1 defended (President-tier `Card` w/ `bg-brand-primary` is a design-locked deviation). KNOWLEDGE/FACT follow-ups: structural brand-emphasis Badge variant ("Lead" maize-fill), `SelectValue` text-rendering atom not documented, "President-tier elevated brand-strong card surface" scenario.
- Lane 6.10 (#171) — PR [#200](https://github.com/KISA-webpage-development-team/KISA-website-client/pull/200) `ready-for-review` (signin redesign). Inlined auth handler (mock toggle vs `signIn("google", { callbackUrl })`); `LoadingSpinner fullScreen` covers loading/redirecting states. 8 reviewer doubts: 4 corrected (Container/Grid/LoadingSpinner adopted, redundant gap collapsed), 4 defended (bilingual structure satisfied, fixed logo size acceptable, helper links are body-content hyperlinks not CTAs).
- All 3 lanes: pastiche flow ran round 1 → reviewer → round 2 with 0 unresolved-doubt markers; `npx tsc --noEmit` passes on each branch; `npm install` ran once for lockfile sync (no new deps). No DS gaps escalated to `ds-fix-during-migration`.
- Pending blockers (downstream lanes): 6.7 fan-out (8 issues) blocked by 6.6 (#176, still open `needs-interactive`); 6.15 fan-out (4 issues) blocked by 6.14 (#175, still open `needs-interactive`).
