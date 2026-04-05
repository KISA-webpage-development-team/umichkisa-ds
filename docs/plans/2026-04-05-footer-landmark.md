# Footer Landmark Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `<footer>` landmark to the docs app for semantic HTML compliance.

**Architecture:** Create a `Footer` component in `apps/docs/components/`, render it as a sibling to `<main>` in `DocsShell`. Footer respects sidebar offset on desktop.

**Tech Stack:** React, Tailwind CSS, DS semantic tokens

---

### Task 1: Create Footer component

**Files:**
- Create: `apps/docs/components/Footer.tsx`

**Step 1: Create the Footer component**

```tsx
export function Footer() {
  return (
    <footer className="lg:ml-[var(--docs-sidebar-w)] py-8 px-6 lg:px-12">
      <p className="type-caption text-muted-foreground">
        KISA Design System · © {new Date().getFullYear()} KISA · Built from
        scratch by{' '}
        <a
          href="https://github.com/retz8"
          className="text-link underline hover:text-brand-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          @retz8
        </a>
      </p>
    </footer>
  )
}
```

**Step 2: Verify no type errors**

Run: `pnpm typecheck`
Expected: PASS

---

### Task 2: Add Footer to DocsShell

**Files:**
- Modify: `apps/docs/components/DocsShell.tsx`

**Step 1: Import and render Footer as sibling to `<main>`**

Add import:
```tsx
import { Footer } from '@/components/Footer'
```

Add `<Footer />` after `</main>`:
```tsx
      <main className="pt-[var(--docs-header-h)]" id="main-content">
        {children}
      </main>
      <Footer />
    </>
```

**Step 2: Build and typecheck**

Run: `pnpm build && pnpm typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/docs/components/Footer.tsx apps/docs/components/DocsShell.tsx
git commit -m "feat: add footer landmark to docs app"
```

---

### Task 3: Visual verification

**Step 1: Run dev server and verify**

Run: `pnpm dev`

Check:
- Footer visible at bottom of any docs page
- Left-aligned, muted caption text
- @retz8 links to GitHub profile in new tab
- On desktop: footer aligns with main content (offset by sidebar)
- On mobile: footer spans full width

**Step 2: Update CODEBASE.md and check off TODO**

- Update `docs/CODEBASE.md` to reflect footer in layout structure
- Check off `Add <footer> landmark to docs app layout` in `docs/TODO.md`
