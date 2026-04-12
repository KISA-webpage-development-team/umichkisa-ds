---
name: ds-phase-end-bump
description: Use when a client migration phase is complete and accumulated DS fixes need to be released — bumps version, tags, publishes, updates client
---

# DS Phase-End Bump

## Overview

Releases accumulated DS fixes at the end of a migration phase. Reads `ds-fixes-log.md`, bumps the version, tags for publish, and updates the client to the new pinned version.

## Steps

### 1. Read accumulator

Read `docs/plans/client-migration/ds-fixes-log.md`. Filter entries for the completing phase (e.g., `[Phase 1.*]`). If **no entries** for any package — nothing to bump, exit.

### 2. Decide version (per package)

- Bug fixes only (type fixes, styling fixes, missing exports) → **patch**
- Any API additions (new props, new components, new exports) → **minor**

Decide independently for each package that has entries.

### 3. Bump version

Edit `version` in the package's `package.json` (e.g., `packages/web/package.json`). Commit:

```
chore(<pkg>): bump to <version> for phase-<N> fixes
```

### 4. Tag + push

```bash
git tag <pkg>-v<version>
git push --tags
```

This triggers GitHub Actions publish to npm. Tag format: `web-vX.X.X` or `form-vX.X.X`.

### 5. Wait for publish

Check GitHub Actions or npm registry to confirm the new version is available. Do NOT proceed until publish is confirmed — a failed publish means the client would silently install the old version.

### 6. Update client

In the client repo (`../KISA-website/client/`):

1. Run `./scripts/unlink-ds.sh` — removes local symlinks
2. Update the package version in `package.json` — **strict pinned, no `^`**
3. Run `npm install` — resolves from registry
4. Verify: check `node_modules/@umichkisa-ds/<pkg>/package.json` shows the new version

### 7. Commit client

```
chore(deps): pin @umichkisa-ds/<pkg> to <version> (phase-<N> fixes)
```

## Packages With No Entries

If a package has zero entries for the completing phase, do **not** bump it. Only bump packages that actually changed.

## Common Mistakes

- Bumping a package with no entries for the current phase
- Using `^` in client `package.json` — must be strict pinned (e.g., `"1.0.1"` not `"^1.0.1"`)
- Forgetting to unlink before updating client `package.json` — symlink masks the registry version
- Not waiting for publish confirmation — `npm install` silently falls back to old version
- Tagging before committing the version bump in `package.json`
- Bumping both packages when only one has changes
