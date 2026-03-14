# Docs Site Infrastructure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the current single-package repo into a pnpm monorepo with turborepo, move the existing DS to `packages/web/`, and scaffold a Next.js 15 docs app at `apps/docs/` with `@next/mdx`, Shiki, and placeholder pages for all routes.

**Architecture:** pnpm workspaces + turborepo manages two workspaces: `packages/web` (the existing component library) and `apps/docs` (a Next.js 15 App Router static site). The docs app imports `@umichkisa-ds/web` as a workspace dependency so components render live in MDX pages. All content lives in `apps/docs/content/` as MDX files.

**Tech Stack:** pnpm 9+, turborepo, Next.js 15 App Router, `@next/mdx`, `rehype-pretty-code` + Shiki for syntax highlighting, Tailwind v4, TypeScript 5.

---

## Task 1: Install pnpm and turborepo globally

**Context:** We're switching from npm to pnpm for workspace support. Turborepo orchestrates builds across packages.

**Step 1: Check if pnpm is already installed**

```bash
pnpm --version
```

Expected: version number, or "command not found"

**Step 2: Install pnpm if missing**

```bash
npm install -g pnpm
```

**Step 3: Install turborepo globally**

```bash
pnpm add -g turbo
```

**Step 4: Verify**

```bash
turbo --version
```

Expected: version number (2.x+)

---

## Task 2: Create monorepo root structure

**Context:** The current repo root will become the monorepo root. We add config files at the root level without touching existing source files yet.

**Files:**
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Modify: `package.json` (root — replace entirely)

**Step 1: Create `pnpm-workspace.yaml` at repo root**

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

**Step 2: Create `turbo.json` at repo root**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```

**Step 3: Replace root `package.json`**

The current `package.json` belongs to `@umichkisa-ds/web` and will move to `packages/web/`. The root gets a minimal workspace-only package.json:

```json
{
  "name": "umichkisa-ds-monorepo",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "typecheck": "turbo typecheck",
    "test": "turbo test"
  },
  "devDependencies": {
    "turbo": "latest"
  },
  "packageManager": "pnpm@9.0.0"
}
```

**Step 4: Commit**

```bash
git add pnpm-workspace.yaml turbo.json package.json
git commit -m "chore: add monorepo root config (pnpm workspaces + turborepo)"
```

---

## Task 3: Move existing DS package to `packages/web/`

**Context:** All current source files (`src/`, `tests/`, `dist/`, config files) move into `packages/web/`. Use `git mv` to preserve history.

**Files:**
- Create: `packages/web/` directory
- Move: `src/` → `packages/web/src/`
- Move: `tests/` → `packages/web/tests/`
- Move: `dist/` → `packages/web/dist/`
- Move: `tsup.config.ts` → `packages/web/tsup.config.ts`
- Move: `tsconfig.json` → `packages/web/tsconfig.json`
- Move: `vitest.config.ts` → `packages/web/vitest.config.ts`
- Create: `packages/web/package.json` (copy from old root package.json, restore original content)

**Step 1: Create directory structure**

```bash
mkdir -p packages/web apps/docs
```

**Step 2: Move source files using git mv**

```bash
git mv src packages/web/src
git mv tests packages/web/tests
git mv tsup.config.ts packages/web/tsup.config.ts
git mv tsconfig.json packages/web/tsconfig.json
git mv vitest.config.ts packages/web/vitest.config.ts
```

**Step 3: Move dist (not tracked by git, just move)**

```bash
mv dist packages/web/dist
```

**Step 4: Create `packages/web/package.json`**

Restore the original DS package.json content at the new location. Copy the exact content from the old root `package.json` before it was replaced in Task 2. The content should be:

```json
{
  "name": "@umichkisa-ds/web",
  "version": "0.1.0",
  "description": "KISA Design System — tokens and components for umichkisa.com",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./dist/styles.css": "./dist/styles.css"
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "npm run build:js && npm run build:css",
    "build:js": "tsup",
    "build:css": "npx @tailwindcss/cli -i src/styles/index.css -o dist/styles.css --minify",
    "dev": "concurrently \"tsup --watch\" \"npx @tailwindcss/cli -i src/styles/index.css -o dist/styles.css --watch\"",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-popover": "^1.1.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "react-icons": "^5.4.0",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@tailwindcss/cli": "4.2.1",
    "@testing-library/jest-dom": "6.9.1",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "concurrently": "9.2.1",
    "jsdom": "^25.0.1",
    "tailwindcss": "^4.0.0",
    "tsup": "^8.3.5",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

**Step 5: Update `packages/web/tsconfig.json` paths**

The `baseUrl` and path alias still point to `./src` which is correct after the move (paths are relative to the tsconfig file location). No changes needed.

**Step 6: Verify the web package builds**

```bash
cd packages/web && pnpm install && pnpm build
```

Expected: `dist/` regenerated successfully inside `packages/web/`

**Step 7: Commit**

```bash
cd ../..
git add packages/web/ apps/
git commit -m "chore: move DS package to packages/web/ for monorepo structure"
```

---

## Task 4: Install monorepo dependencies

**Context:** Delete the old `node_modules` and `package-lock.json` at root, then run `pnpm install` to create a single pnpm lockfile with all workspace dependencies hoisted properly.

**Step 1: Remove old npm artifacts from root**

```bash
rm -rf node_modules package-lock.json
```

**Step 2: Run pnpm install from monorepo root**

```bash
pnpm install
```

Expected: `pnpm-lock.yaml` created at root, `node_modules` created with workspace symlinks.

**Step 3: Verify web package still builds**

```bash
pnpm --filter @umichkisa-ds/web build
```

Expected: build succeeds, `packages/web/dist/` updated.

**Step 4: Commit**

```bash
git add pnpm-lock.yaml
git rm package-lock.json 2>/dev/null || true
git commit -m "chore: switch from npm to pnpm, add lockfile"
```

---

## Task 5: Scaffold `apps/docs` Next.js app

**Context:** Create a Next.js 15 App Router project manually inside `apps/docs/`. We do NOT use `create-next-app` because it adds unnecessary boilerplate. We build it from scratch for full control.

**Files:**
- Create: `apps/docs/package.json`
- Create: `apps/docs/tsconfig.json`
- Create: `apps/docs/next.config.mjs`
- Create: `apps/docs/.gitignore`

**Step 1: Create `apps/docs/package.json`**

```json
{
  "name": "@umichkisa-ds/docs",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@umichkisa-ds/web": "workspace:*",
    "next": "^15.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "typescript": "^5.7.2"
  }
}
```

**Step 2: Create `apps/docs/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }],
    "skipLibCheck": true
  },
  "include": ["**/*.ts", "**/*.tsx", ".next/types/**/*.d.ts"],
  "exclude": ["node_modules"]
}
```

**Step 3: Create `apps/docs/next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

export default nextConfig;
```

> Note: We'll add `@next/mdx` config in Task 6. Keep this minimal for now.

**Step 4: Create `apps/docs/.gitignore`**

```
.next/
out/
node_modules/
```

**Step 5: Install docs dependencies**

```bash
pnpm install
```

Expected: `apps/docs/node_modules` gets Next.js and the `@umichkisa-ds/web` workspace symlink.

**Step 6: Commit**

```bash
git add apps/docs/
git commit -m "feat(docs): scaffold Next.js 15 app skeleton"
```

---

## Task 6: Create minimal app shell to verify Next.js works

**Context:** Before adding MDX complexity, verify the bare Next.js app runs. Create a root layout and a hello-world home page.

**Files:**
- Create: `apps/docs/app/layout.tsx`
- Create: `apps/docs/app/page.tsx`

**Step 1: Create `apps/docs/app/layout.tsx`**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KISA Design System",
  description: "Component and token library for umichkisa.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* TODO: Add sidebar + topbar layout shell */}
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Create `apps/docs/app/page.tsx`**

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>KISA Design System</h1>
      {/* TODO: Design landing page */}
    </main>
  );
}
```

**Step 3: Start the dev server**

```bash
pnpm --filter @umichkisa-ds/docs dev
```

Expected: Next.js starts on `http://localhost:3000`, page renders with "KISA Design System" heading.

**Step 4: Commit**

```bash
git add apps/docs/app/
git commit -m "feat(docs): add minimal app shell and home page"
```

---

## Task 7: Add `@next/mdx` pipeline

**Context:** `@next/mdx` processes `.mdx` files as React pages. We also add `rehype-pretty-code` + Shiki for syntax-highlighted code blocks in MDX.

**Files:**
- Modify: `apps/docs/package.json` (add MDX dependencies)
- Modify: `apps/docs/next.config.mjs` (wrap with MDX)
- Create: `apps/docs/mdx-components.tsx`
- Create: `apps/docs/app/mdx-types.d.ts`

**Step 1: Add MDX dependencies to `apps/docs/package.json`**

Add to `dependencies`:

```json
"@next/mdx": "^15.0.0",
"@mdx-js/loader": "^3.0.0",
"@mdx-js/react": "^3.0.0",
"rehype-pretty-code": "^0.14.0",
"shiki": "^1.0.0"
```

Add to `devDependencies`:

```json
"@types/mdx": "^2.0.13"
```

**Step 2: Run install**

```bash
pnpm install
```

**Step 3: Update `apps/docs/next.config.mjs`**

```js
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: "github-dark",
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
```

**Step 4: Create `apps/docs/mdx-components.tsx`**

This file is required by `@next/mdx` — it defines custom React components that replace default HTML elements in MDX files.

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // TODO: Replace with @umichkisa-ds/web components when design is ready
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    p: ({ children }) => <p>{children}</p>,
    code: ({ children, ...props }) => <code {...props}>{children}</code>,
    pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
    ...components,
  };
}
```

**Step 5: Create `apps/docs/app/mdx-types.d.ts`**

Tells TypeScript that `.mdx` files are valid modules:

```ts
declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  export default function MDXContent(props: MDXProps): JSX.Element;
}
```

**Step 6: Commit**

```bash
git add apps/docs/
git commit -m "feat(docs): add @next/mdx pipeline with Shiki syntax highlighting"
```

---

## Task 8: Create placeholder pages for all routes

**Context:** Create the full route structure with minimal placeholder content. No design yet — just enough that the app builds and all routes resolve.

**Files to create:**
- `apps/docs/app/foundation/layout.tsx`
- `apps/docs/app/foundation/colors/page.tsx`
- `apps/docs/app/foundation/iconography/page.tsx`
- `apps/docs/app/foundation/typography/page.tsx`
- `apps/docs/app/foundation/layout-tokens/page.tsx`
- `apps/docs/app/components/layout.tsx`
- `apps/docs/app/components/[slug]/page.tsx`

**Step 1: Create `apps/docs/app/foundation/layout.tsx`**

```tsx
export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* TODO: Add foundation section nav */}
      {children}
    </div>
  );
}
```

**Step 2: Create each foundation page**

`apps/docs/app/foundation/colors/page.tsx`:
```tsx
export default function ColorsPage() {
  return (
    <div>
      <h1>Colors</h1>
      {/* TODO: Token swatches — primitives + semantic */}
    </div>
  );
}
```

`apps/docs/app/foundation/iconography/page.tsx`:
```tsx
export default function IconographyPage() {
  return (
    <div>
      <h1>Iconography</h1>
      {/* TODO: Full icon grid from @umichkisa-ds/web */}
    </div>
  );
}
```

`apps/docs/app/foundation/typography/page.tsx`:
```tsx
export default function TypographyPage() {
  return (
    <div>
      <h1>Typography</h1>
      {/* TODO: Font scale, weights, usage */}
    </div>
  );
}
```

`apps/docs/app/foundation/layout-tokens/page.tsx`:

> Note: We name the folder `layout-tokens` (not `layout`) to avoid conflict with Next.js's reserved `layout.tsx` filename.

```tsx
export default function LayoutTokensPage() {
  return (
    <div>
      <h1>Layout</h1>
      {/* TODO: Spacing scale, radius, grid */}
    </div>
  );
}
```

**Step 3: Create `apps/docs/app/components/layout.tsx`**

```tsx
export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* TODO: Add components section nav */}
      {children}
    </div>
  );
}
```

**Step 4: Create `apps/docs/app/components/[slug]/page.tsx`**

This dynamic route will eventually render an MDX file per component. For now, just a placeholder:

```tsx
interface Props {
  params: { slug: string };
}

export default function ComponentPage({ params }: Props) {
  return (
    <div>
      <h1>{params.slug}</h1>
      {/* TODO: Render component MDX from content/components/{slug}.mdx */}
    </div>
  );
}

// Static params will be added when MDX content files exist
export async function generateStaticParams() {
  return [];
}
```

**Step 5: Verify all routes compile**

```bash
pnpm --filter @umichkisa-ds/docs build
```

Expected: build succeeds, all routes listed in output.

**Step 6: Commit**

```bash
git add apps/docs/app/
git commit -m "feat(docs): add placeholder pages for all foundation and component routes"
```

---

## Task 9: Verify component import from workspace

**Context:** The docs site should be able to import and render a component from `@umichkisa-ds/web`. We verify this works end-to-end before declaring the infra complete.

**Files:**
- Modify: `apps/docs/app/page.tsx`

**Step 1: Import a component on the home page**

Edit `apps/docs/app/page.tsx`:

```tsx
import { DS_VERSION } from "@umichkisa-ds/web";
import "@umichkisa-ds/web/dist/styles.css";

export default function HomePage() {
  return (
    <main>
      <h1>KISA Design System</h1>
      <p>Version: {DS_VERSION}</p>
      {/* TODO: Design landing page */}
    </main>
  );
}
```

**Step 2: Build the web package first (docs depends on its dist)**

```bash
pnpm --filter @umichkisa-ds/web build
```

**Step 3: Start docs dev server**

```bash
pnpm --filter @umichkisa-ds/docs dev
```

Expected: page renders "Version: 0.1.0" — confirms workspace import works.

**Step 4: Commit**

```bash
git add apps/docs/app/page.tsx
git commit -m "feat(docs): verify @umichkisa-ds/web workspace import works"
```

---

## Task 10: Verify `turbo dev` spins up everything

**Context:** The top-level `turbo dev` command should start both the web package watcher and the docs dev server in parallel.

**Step 1: Run turbo dev from monorepo root**

```bash
pnpm dev
```

This runs `turbo dev` which runs `dev` in all packages concurrently.

Expected:
- `packages/web` starts in watch mode (tsup + tailwind watch)
- `apps/docs` starts Next.js dev server on `http://localhost:3000`

**Step 2: Confirm both are running**

Check terminal output shows both processes active. Visit `http://localhost:3000` — page should load.

**Step 3: Stop and commit if no issues**

No new files to commit in this task — it's a verification step.

---

## Task 11: Add Vercel deployment config

**Context:** Vercel needs to know this is a monorepo and which app to deploy for `designsystem.umichkisa.com`.

**Files:**
- Create: `vercel.json` at monorepo root

**Step 1: Create `vercel.json`**

```json
{
  "buildCommand": "turbo build --filter=@umichkisa-ds/docs",
  "outputDirectory": "apps/docs/out",
  "installCommand": "pnpm install",
  "framework": null
}
```

> Note: `output: "export"` in `next.config.mjs` outputs to `apps/docs/out/`. Vercel needs to point at that directory.

**Step 2: Update `.gitignore` at repo root to ignore Next.js output**

Add to root `.gitignore` (create if it doesn't exist):

```
apps/docs/.next/
apps/docs/out/
```

**Step 3: Commit**

```bash
git add vercel.json .gitignore
git commit -m "chore: add Vercel deployment config for docs app"
```

---

## Task 12: Final verification and cleanup

**Step 1: Run full monorepo build**

```bash
pnpm build
```

Expected: turborepo builds `packages/web` first, then `apps/docs`. Both succeed.

**Step 2: Run typecheck across all packages**

```bash
pnpm typecheck
```

Expected: no TypeScript errors in either package.

**Step 3: Run web package tests**

```bash
pnpm --filter @umichkisa-ds/web test
```

Expected: all existing tests pass.

**Step 4: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "chore: final cleanup after monorepo migration"
```

---

## Success Criteria Checklist

- [ ] `pnpm-workspace.yaml` and `turbo.json` at monorepo root
- [ ] `packages/web` builds: `pnpm --filter @umichkisa-ds/web build` ✓
- [ ] `packages/web` tests pass: `pnpm --filter @umichkisa-ds/web test` ✓
- [ ] `apps/docs` Next.js dev server runs: `pnpm --filter @umichkisa-ds/docs dev` ✓
- [ ] `@next/mdx` pipeline configured with Shiki
- [ ] All foundation routes resolve: `/foundation/colors`, `/foundation/iconography`, `/foundation/typography`, `/foundation/layout-tokens`
- [ ] Component dynamic route resolves: `/components/[slug]`
- [ ] `@umichkisa-ds/web` imports and renders in docs app ✓
- [ ] `pnpm dev` (turbo) spins up both packages ✓
- [ ] `vercel.json` configured for monorepo ✓
- [ ] Full `pnpm build` succeeds end-to-end ✓
