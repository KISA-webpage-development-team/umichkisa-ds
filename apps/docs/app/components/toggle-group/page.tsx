import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { ContentViewDemo, PageSizeDemo, FullWidthDemo } from './_demos'

const contentViewCode = `import { useState } from 'react'
import { ToggleGroup, Icon } from '@umichkisa-ds/web'

const [view, setView] = useState('posts')

<ToggleGroup
  value={view}
  onValueChange={setView}
  items={[
    { value: 'posts', label: 'Posts', icon: <Icon name="list" size="sm" /> },
    { value: 'comments', label: 'Comments', icon: <Icon name="message-square" size="sm" /> },
  ]}
/>`

const pageSizeCode = `import { useState } from 'react'
import { ToggleGroup } from '@umichkisa-ds/web'

const [pageSize, setPageSize] = useState('10')

<ToggleGroup
  value={pageSize}
  onValueChange={setPageSize}
  items={[
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
  ]}
/>`

const fullWidthCode = `import { useState } from 'react'
import { ToggleGroup, Icon } from '@umichkisa-ds/web'

const [view, setView] = useState('posts')

<ToggleGroup
  value={view}
  onValueChange={setView}
  fullWidth
  items={[
    { value: 'posts', label: 'Posts', icon: <Icon name="list" size="sm" /> },
    { value: 'comments', label: 'Comments', icon: <Icon name="message-square" size="sm" /> },
  ]}
/>`

export default async function ToggleGroupPage() {
  const [
    contentViewHighlighted,
    pageSizeHighlighted,
    fullWidthHighlighted,
  ] = await Promise.all([
    highlight(contentViewCode),
    highlight(pageSizeCode),
    highlight(fullWidthCode),
  ])

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">ToggleGroup</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A group of small buttons for switching between a small set of
        mutually exclusive options. Use ToggleGroup for view switches,
        page size selectors, or any single-choice toggle within a compact
        inline layout.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Keyboard accessible — use arrow keys to move between options.
        Use Tabs when each option reveals its own content panel, or Radio
        for form-level choices within a FormItem.
      </p>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Content view switch */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Content view switch</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A typical use case for switching between content sections, such as a
        user profile board with Posts and Comments views. Each item includes
        an icon for quick visual identification.
      </p>
      <ComponentPreview code={contentViewCode} highlightedCode={contentViewHighlighted}>
        <ContentViewDemo />
      </ComponentPreview>

      {/* Page size selector */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Page size selector</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Text-only items for a compact inline selector, such as rows-per-page
        in a data table.
      </p>
      <ComponentPreview code={pageSizeCode} highlightedCode={pageSizeHighlighted}>
        <PageSizeDemo />
      </ComponentPreview>

      {/* Full width */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Full width</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">fullWidth</code>{' '}
        to distribute items evenly across the container. Useful when the
        ToggleGroup spans the full width of a content section.
      </p>
      <ComponentPreview code={fullWidthCode} highlightedCode={fullWidthHighlighted}>
        <FullWidthDemo />
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>

      {/* ToggleGroup */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">ToggleGroup</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The currently selected item value.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onValueChange</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(value: string) =&gt; void</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Callback fired when the selected value changes.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">items</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ToggleGroupItem[]</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Array of options to display. See ToggleGroupItem below.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">fullWidth</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Stretch items to fill the container width evenly.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Use for layout utilities only.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ToggleGroupItem */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">ToggleGroupItem</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Shape of each option in the items array.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Property</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Required</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Yes</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Unique identifier for this option.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">label</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Yes</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Display text for the option.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">icon</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">No</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Icon displayed before the label.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
