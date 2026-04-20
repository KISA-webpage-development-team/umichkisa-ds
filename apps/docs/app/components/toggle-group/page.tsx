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
import { highlight } from '@/lib/highlight'
import { ContentViewDemo, PageSizeDemo, FullWidthDemo, MultipleDemo } from './_demos'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

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

const multipleCode = `import { useState } from 'react'
import { ToggleGroup } from '@umichkisa-ds/web'

const [tags, setTags] = useState<string[]>(['typescript'])

<ToggleGroup
  type="multiple"
  value={tags}
  onValueChange={setTags}
  items={[
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'tailwind', label: 'Tailwind' },
  ]}
/>`

export default async function ToggleGroupPage() {
  const [
    contentViewHighlighted,
    pageSizeHighlighted,
    fullWidthHighlighted,
    multipleHighlighted,
  ] = await Promise.all([
    highlight(contentViewCode),
    highlight(pageSizeCode),
    highlight(fullWidthCode),
    highlight(multipleCode),
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
      <Alert variant="info" className="mb-8">
        Keyboard accessible — use arrow keys to move between options.
        Use Tabs when each option reveals its own content panel, or Radio
        for form-level choices within a FormItem.
      </Alert>

      {/* -- Examples ------------------------------------------------- */}
      <Heading as="h2">Examples</Heading>

      {/* Content view switch */}
      <Heading as="h3" className="mt-6">Content view switch</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A typical use case for switching between content sections, such as a
        user profile board with Posts and Comments views. Each item includes
        an icon for quick visual identification.
      </p>
      <ComponentPreview code={contentViewCode} highlightedCode={contentViewHighlighted}>
        <ContentViewDemo />
      </ComponentPreview>

      {/* Page size selector */}
      <Heading as="h3">Page size selector</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Text-only items for a compact inline selector, such as rows-per-page
        in a data table.
      </p>
      <ComponentPreview code={pageSizeCode} highlightedCode={pageSizeHighlighted}>
        <PageSizeDemo />
      </ComponentPreview>

      {/* Full width */}
      <Heading as="h3">Full width</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <InlineCode>fullWidth</InlineCode>{' '}
        to distribute items evenly across the container. Useful when the
        ToggleGroup spans the full width of a content section.
      </p>
      <ComponentPreview code={fullWidthCode} highlightedCode={fullWidthHighlighted}>
        <FullWidthDemo />
      </ComponentPreview>

      {/* Multiple selection */}
      <Heading as="h3">Multiple selection</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <InlineCode>type=&quot;multiple&quot;</InlineCode>{' '}
        to allow more than one item to be selected at once. The{' '}
        <InlineCode>value</InlineCode>{' '}
        becomes a{' '}
        <InlineCode>string[]</InlineCode>{' '}
        and{' '}
        <InlineCode>onValueChange</InlineCode>{' '}
        receives the new array on every toggle. Use for tag-style filters or
        any multi-select within a compact inline layout. Arrow keys move
        focus; Space or Enter toggles the focused item.
      </p>
      <ComponentPreview code={multipleCode} highlightedCode={multipleHighlighted}>
        <MultipleDemo />
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <Heading as="h2">API Reference</Heading>

      {/* ToggleGroup */}
      <Heading as="h3" className="mt-6">ToggleGroup</Heading>
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
                <TableCell><InlineCode>type</InlineCode></TableCell>
                <TableCell><InlineCode>{"'single' | 'multiple'"}</InlineCode></TableCell>
                <TableCell><InlineCode>{"'single'"}</InlineCode></TableCell>
                <TableCell>Selection mode. <InlineCode>{"'single'"}</InlineCode> renders a radiogroup; <InlineCode>{"'multiple'"}</InlineCode> renders a toggle-button group where multiple items can be pressed.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>value<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>{"string | string[]"}</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Selected value(s). <InlineCode>string</InlineCode> when <InlineCode>type=&quot;single&quot;</InlineCode>; <InlineCode>string[]</InlineCode> when <InlineCode>type=&quot;multiple&quot;</InlineCode>.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onValueChange<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>{"(value: string) => void | (value: string[]) => void"}</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback fired when the selection changes. Signature depends on <InlineCode>type</InlineCode>.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>items<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>ToggleGroupItem[]</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Array of options to display. See ToggleGroupItem below.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>fullWidth</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Stretch items to fill the container width evenly.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>type</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{"'single' | 'multiple'"}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Selection mode. Default: <InlineCode>{"'single'"}</InlineCode>. <InlineCode>{"'multiple'"}</InlineCode> renders a toggle-button group where multiple items can be pressed.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{"string | string[]"}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Selected value(s). <InlineCode>string</InlineCode> when single; <InlineCode>string[]</InlineCode> when multiple.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onValueChange<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{"(value: string) => void | (value: string[]) => void"}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback fired when the selection changes. Signature depends on <InlineCode>type</InlineCode>.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>items<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ToggleGroupItem[]</InlineCode></span>
              <span className="type-caption text-muted-foreground">Array of options to display. See ToggleGroupItem below.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>fullWidth</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Stretch items to fill the container width evenly. Default: false.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
      </div>

      {/* ToggleGroupItem */}
      <Heading as="h3">ToggleGroupItem</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Shape of each option in the items array.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>value</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>Unique identifier for this option.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>label</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>Display text for the option.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>icon</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>No</TableCell>
                <TableCell>Icon displayed before the label.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · Required</span>
              <span className="type-caption text-muted-foreground">Unique identifier for this option.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>label</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · Required</span>
              <span className="type-caption text-muted-foreground">Display text for the option.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>icon</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode> · Optional</span>
              <span className="type-caption text-muted-foreground">Icon displayed before the label.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
