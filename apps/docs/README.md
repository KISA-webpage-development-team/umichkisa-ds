# @umichkisa-ds/docs

Documentation site for the KISA Design System, deployed at `designsystem.umichkisa.com`.

## Stack

- Next.js 15 App Router (static export)
- `@next/mdx` for MDX pages
- Shiki (`rehype-pretty-code`) for syntax highlighting

## Folder Structure

```
apps/docs/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (sidebar + topbar shell)
│   ├── page.tsx                # Landing page
│   ├── foundation/
│   │   ├── colors/             # Color tokens + swatches
│   │   ├── iconography/        # Icon grid
│   │   ├── typography/         # Font scale + weights
│   │   └── layout-tokens/      # Spacing, radius
│   └── components/
│       └── [slug]/             # Dynamic route — one page per component
├── content/                    # MDX source files (main editing area)
│   ├── foundation/
│   └── components/
├── components/                 # Docs-specific UI (sidebar, topbar, etc.)
├── mdx-components.tsx          # Custom MDX element overrides
└── next.config.mjs             # Next.js config with MDX + Shiki
```

## Development

```bash
# From monorepo root
pnpm --filter @umichkisa-ds/docs dev

# Or with full watch mode (recommended)
pnpm dev
```

## Adding Content

Most day-to-day work is writing MDX files in `content/`:

- Foundation pages: `content/foundation/<topic>.mdx`
- Component pages: `content/components/<component-name>.mdx`
