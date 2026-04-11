# npm Release Pipeline Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish `@umichkisa-ds/web` and `@umichkisa-ds/form` to the npm public registry on tag push, with CI build validation.

**Architecture:** Two independent GitHub Actions workflows triggered by tag patterns (`web-v*` and `form-v*`). Each workflow installs deps, builds, typechecks, and publishes only the matched package. Dist files removed from git — CI is the sole build/publish path.

**Tech Stack:** GitHub Actions, npm public registry, pnpm, tsup

---

### Task 1: Remove dist from git and update .gitignore

**Files:**
- Modify: `.gitignore`
- Remove from git tracking: `packages/web/dist/`, `packages/form/dist/`

**Step 1: Add dist to .gitignore**

Add to `.gitignore`:

```
# Package build output — built in CI, not committed
packages/web/dist/
packages/form/dist/
```

**Step 2: Remove tracked dist files from git index**

Run:
```bash
git rm -r --cached packages/web/dist packages/form/dist
```

Expected: files listed as deleted from index, still exist on disk.

**Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: remove dist from git, build only in CI"
```

---

### Task 2: Bump versions to 1.0.0

**Files:**
- Modify: `packages/web/package.json` — change `"version": "0.1.0"` → `"version": "1.0.0"`
- Modify: `packages/form/package.json` — change `"version": "0.1.0"` → `"version": "1.0.0"`

**Step 1: Update web version**

In `packages/web/package.json`, change:
```json
"version": "0.1.0"
```
to:
```json
"version": "1.0.0"
```

**Step 2: Update form version**

In `packages/form/package.json`, change:
```json
"version": "0.1.0"
```
to:
```json
"version": "1.0.0"
```

**Step 3: Commit**

```bash
git add packages/web/package.json packages/form/package.json
git commit -m "chore: bump web and form to v1.0.0"
```

---

### Task 3: Change form's web dependency to static peer dep

**Files:**
- Modify: `packages/form/package.json`

**Step 1: Update peerDependencies**

In `packages/form/package.json`, change:
```json
"@umichkisa-ds/web": "workspace:*"
```
to (in `peerDependencies`):
```json
"@umichkisa-ds/web": ">=1.0.0"
```

**Step 2: Update devDependencies**

In `packages/form/package.json` `devDependencies`, change:
```json
"@umichkisa-ds/web": "workspace:*"
```
to:
```json
"@umichkisa-ds/web": "workspace:*"
```

No change needed — `devDependencies` keeps `workspace:*` so pnpm resolves locally in the monorepo. Only the `peerDependencies` entry changes.

**Step 3: Verify monorepo still resolves**

Run:
```bash
pnpm install
```

Expected: lockfile updates, no errors.

**Step 4: Verify build still works**

Run:
```bash
pnpm build && pnpm typecheck
```

Expected: all packages build and typecheck successfully.

**Step 5: Commit**

```bash
git add packages/form/package.json pnpm-lock.yaml
git commit -m "chore(form): change web peer dep from workspace:* to >=1.0.0"
```

---

### Task 4: Create publish-web workflow

**Files:**
- Create: `.github/workflows/publish-web.yml`

**Step 1: Create the workflow file**

```yaml
name: Publish @umichkisa-ds/web

on:
  push:
    tags:
      - "web-v*"

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm --filter @umichkisa-ds/web build

      - name: Typecheck
        run: pnpm --filter @umichkisa-ds/web typecheck

      - name: Publish
        run: npm publish --access public
        working-directory: packages/web
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Step 2: Commit**

```bash
mkdir -p .github/workflows
git add .github/workflows/publish-web.yml
git commit -m "ci: add publish workflow for @umichkisa-ds/web"
```

---

### Task 5: Create publish-form workflow

**Files:**
- Create: `.github/workflows/publish-form.yml`

**Step 1: Create the workflow file**

```yaml
name: Publish @umichkisa-ds/form

on:
  push:
    tags:
      - "form-v*"

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build all (form depends on web)
        run: pnpm build

      - name: Typecheck
        run: pnpm --filter @umichkisa-ds/form typecheck

      - name: Publish
        run: npm publish --access public
        working-directory: packages/form
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Note: form workflow runs `pnpm build` (all packages) because form depends on web being built first. Turbo handles the dependency order.

**Step 2: Commit**

```bash
git add .github/workflows/publish-form.yml
git commit -m "ci: add publish workflow for @umichkisa-ds/form"
```

---

### Task 6: Update CLAUDE.md release instructions

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Replace the Release section**

Replace the existing `## Release` section in `CLAUDE.md` with:

```markdown
## Release

Both packages publish to npm public registry via GitHub Actions on tag push.

### `packages/web`
1. Bump `version` in `packages/web/package.json`
2. `git add packages/web/package.json`
3. `git commit -m "chore(web): bump to vX.X.X"`
4. `git tag web-vX.X.X`
5. `git push && git push --tags`
6. CI builds, typechecks, and publishes to npm

### `packages/form`
1. Bump `version` in `packages/form/package.json`
2. `git add packages/form/package.json`
3. `git commit -m "chore(form): bump to vX.X.X"`
4. `git tag form-vX.X.X`
5. `git push && git push --tags`
6. CI builds, typechecks, and publishes to npm

### In consuming repos
```bash
npm install @umichkisa-ds/web@latest
npm install @umichkisa-ds/form@latest
```
```

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update release instructions for npm publishing"
```

---

### Task 7: Test the pipeline — push tags and verify

**Step 1: Push all commits to main**

```bash
git push origin main
```

**Step 2: Tag and push web v1.0.0**

```bash
git tag web-v1.0.0
git push origin web-v1.0.0
```

**Step 3: Verify the web workflow**

Go to `https://github.com/KISA-webpage-development-team/umichkisa-ds/actions` and confirm the "Publish @umichkisa-ds/web" workflow completes successfully.

**Step 4: Tag and push form v1.0.0**

```bash
git tag form-v1.0.0
git push origin form-v1.0.0
```

**Step 5: Verify the form workflow**

Confirm the "Publish @umichkisa-ds/form" workflow completes successfully in the Actions tab.

**Step 6: Verify packages are live**

```bash
npm view @umichkisa-ds/web
npm view @umichkisa-ds/form
```

Expected: both show version 1.0.0 with correct metadata.

---

### Task 8: Update TODO.md

**Files:**
- Modify: `docs/TODO.md`

**Step 1: Check off the infrastructure item**

Change:
```markdown
- [ ] Set up GitHub Packages for `@umichkisa-ds/web` and `@umichkisa-ds/form` — publish to GitHub npm registry on tag push, add `.npmrc` scope config to client repo
```
to:
```markdown
- [x] Set up npm publishing for `@umichkisa-ds/web` and `@umichkisa-ds/form` — publish to npm public registry on tag push via GitHub Actions
```

**Step 2: Commit**

```bash
git add docs/TODO.md
git commit -m "docs: mark npm release setup as done"
git push origin main
```
