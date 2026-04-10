import {
  Alert,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'
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
      <Alert variant="info" className="mb-8">
        Pagination is fully controlled — the consumer owns the page state and
        passes it via props.
      </Alert>

      {/* -- Examples ------------------------------------------------- */}
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A simple paginated list with 10 pages. Click the page numbers or arrows
        to navigate.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <BasicDemo />
      </ComponentPreview>

      {/* Many pages */}
      <Heading as="h3">Many pages</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        With many pages, ellipsis appears between the first/last page and the
        sibling pages (the page numbers immediately left and right of the current
        page). Navigate to see the window shift.
      </p>
      <ComponentPreview code={manyPagesCode} highlightedCode={manyPagesHighlighted}>
        <ManyPagesDemo />
      </ComponentPreview>

      {/* Custom sibling count */}
      <Heading as="h3">Custom sibling count</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <InlineCode>siblingCount=&#123;2&#125;</InlineCode>
        {' '}to show more page numbers around the current page. Useful for search
        results or data tables where users jump between nearby pages frequently.
      </p>
      <ComponentPreview code={siblingCountCode} highlightedCode={siblingCountHighlighted}>
        <SiblingCountDemo />
      </ComponentPreview>

      {/* Few pages */}
      <Heading as="h3">Few pages</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        When the total number of pages is small, all page numbers display without
        ellipsis. The previous button is disabled on the first page.
      </p>
      <ComponentPreview code={fewPagesCode} highlightedCode={fewPagesHighlighted}>
        <FewPagesDemo />
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <Heading as="h2">API Reference</Heading>

      <Heading as="h3">Pagination</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Controlled pagination navigation component.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>page</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Current active page (1-indexed). Required.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>totalPages</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Total number of pages. Required.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onPageChange</InlineCode></TableCell>
                <TableCell><InlineCode>{"(page: number) => void"}</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback fired when the user selects a page. Required.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>siblingCount</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>1</InlineCode></TableCell>
                <TableCell>Number of sibling pages shown on each side of the current page. On mobile, this is overridden to 0 for compact display.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Additional class names for the nav wrapper. Use for layout utilities only.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>page</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode></span>
              <span className="type-caption text-muted-foreground">Current active page (1-indexed). Required.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>totalPages</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode></span>
              <span className="type-caption text-muted-foreground">Total number of pages. Required.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onPageChange</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{"(page: number) => void"}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback fired when the user selects a page. Required.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>siblingCount</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode></span>
              <span className="type-caption text-muted-foreground">Number of sibling pages shown on each side of the current page. On mobile, this is overridden to 0 for compact display.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Additional class names for the nav wrapper. Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* -- Accessibility -------------------------------------------- */}
      <Heading as="h2">Accessibility</Heading>
      <ul className="list-disc pl-6 flex flex-col gap-2 max-w-prose">
        <li className="type-body text-foreground">
          Wraps all controls in a{' '}
          <InlineCode>{'<nav aria-label="Pagination">'}</InlineCode>{' '}
          landmark for screen reader navigation.
        </li>
        <li className="type-body text-foreground">
          The active page button uses{' '}
          <InlineCode>aria-current=&quot;page&quot;</InlineCode>{' '}
          so screen readers announce which page is selected.
        </li>
        <li className="type-body text-foreground">
          Previous and next arrow buttons have descriptive{' '}
          <InlineCode>aria-label</InlineCode>{' '}
          attributes and are disabled (not hidden) at boundaries.
        </li>
        <li className="type-body text-foreground">
          Ellipsis elements are marked{' '}
          <InlineCode>aria-hidden=&quot;true&quot;</InlineCode>{' '}
          so they are skipped by assistive technology.
        </li>
      </ul>

    </Container>
  )
}
