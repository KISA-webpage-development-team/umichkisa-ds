import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { BasicDemo, ManyPagesDemo, SiblingCountDemo, FewPagesDemo } from './_demos'

const basicCode = `import { useState } from 'react'
import { Pagination } from '@umichkisa-ds/web'

function PostList() {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      totalPages={10}
      onPageChange={setPage}
    />
  )
}`

const manyPagesCode = `import { useState } from 'react'
import { Pagination } from '@umichkisa-ds/web'

function BulletinBoard() {
  const [page, setPage] = useState(25)
  const totalPages = Math.ceil(487 / 10) // 487 posts, 10 per page

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  )
}`

const siblingCountCode = `import { useState } from 'react'
import { Pagination } from '@umichkisa-ds/web'

function SearchResults() {
  const [page, setPage] = useState(15)

  return (
    <Pagination
      page={page}
      totalPages={30}
      onPageChange={setPage}
      siblingCount={2}
    />
  )
}`

const fewPagesCode = `import { useState } from 'react'
import { Pagination } from '@umichkisa-ds/web'

function Announcements() {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      totalPages={3}
      onPageChange={setPage}
    />
  )
}`

export default async function PaginationPage() {
  const [
    basicHighlighted,
    manyPagesHighlighted,
    siblingCountHighlighted,
    fewPagesHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(manyPagesCode),
    highlight(siblingCountCode),
    highlight(fewPagesCode),
  ])

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Pagination</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Navigation control for moving between pages of content. Displays page
        numbers with ellipsis for large ranges and previous/next arrows.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        Pagination is fully controlled — the consumer owns the page state and
        passes it via props. On mobile, sibling pages collapse automatically to
        keep the component compact.
      </p>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A simple paginated list with 10 pages. Click the page numbers or arrows
        to navigate.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <BasicDemo />
      </ComponentPreview>

      {/* Many pages */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Many pages</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        With many pages, ellipsis appears between the first/last page and the
        sibling pages (the page numbers immediately left and right of the current
        page). Navigate to see the window shift.
      </p>
      <ComponentPreview code={manyPagesCode} highlightedCode={manyPagesHighlighted}>
        <ManyPagesDemo />
      </ComponentPreview>

      {/* Custom sibling count */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom sibling count</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">siblingCount=&#123;2&#125;</code>
        {' '}to show more page numbers around the current page. Useful for search
        results or data tables where users jump between nearby pages frequently.
      </p>
      <ComponentPreview code={siblingCountCode} highlightedCode={siblingCountHighlighted}>
        <SiblingCountDemo />
      </ComponentPreview>

      {/* Few pages */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Few pages</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        When the total number of pages is small, all page numbers display without
        ellipsis. The previous button is disabled on the first page.
      </p>
      <ComponentPreview code={fewPagesCode} highlightedCode={fewPagesHighlighted}>
        <FewPagesDemo />
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>

      <h3 className="type-h3 mt-8 mb-2 text-foreground">Pagination</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Controlled pagination navigation component.
      </p>
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">page</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Current active page (1-indexed). Required.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">totalPages</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Total number of pages. Required.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onPageChange</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(page: number) =&gt; void</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Callback fired when the user selects a page. Required.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">siblingCount</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">1</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Number of sibling pages shown on each side of the current page. On mobile, this is overridden to 0 for compact display.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Additional class names for the nav wrapper. Use for layout utilities only.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* -- Accessibility -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Accessibility</h2>
      <ul className="list-disc pl-6 flex flex-col gap-2 max-w-prose">
        <li className="type-body text-foreground">
          Wraps all controls in a{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<nav aria-label="Pagination">'}</code>{' '}
          landmark for screen reader navigation.
        </li>
        <li className="type-body text-foreground">
          The active page button uses{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-current=&quot;page&quot;</code>{' '}
          so screen readers announce which page is selected.
        </li>
        <li className="type-body text-foreground">
          Previous and next arrow buttons have descriptive{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-label</code>{' '}
          attributes and are disabled (not hidden) at boundaries.
        </li>
        <li className="type-body text-foreground">
          Ellipsis elements are marked{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">aria-hidden=&quot;true&quot;</code>{' '}
          so they are skipped by assistive technology.
        </li>
      </ul>

    </Container>
  )
}
