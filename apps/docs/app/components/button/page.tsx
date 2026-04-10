import {
  Container, Button, Icon, Grid, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'
import { highlight } from '@/lib/highlight'

const defaultCode = `import { Button } from '@umichkisa-ds/web'

<Button>Label</Button>`

const variantsCode = `import { Button } from '@umichkisa-ds/web'

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="destructive">Destructive</Button>`

const sizesCode = `import { Button } from '@umichkisa-ds/web'

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`

const withIconCode = `import { Button, Icon } from '@umichkisa-ds/web'

<Button>
  <Icon name="plus" />
  Add item
</Button>`

const disabledCode = `import { Button } from '@umichkisa-ds/web'

<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="tertiary" disabled>Tertiary</Button>
<Button variant="destructive" disabled>Destructive</Button>`

export default async function ButtonPage() {
  const [
    defaultHighlighted,
    variantsHighlighted,
    sizesHighlighted,
    withIconHighlighted,
    disabledHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(variantsCode),
    highlight(sizesCode),
    highlight(withIconCode),
    highlight(disabledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Button</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        The primary interactive element for triggering actions. Supports four
        semantic variants and three sizes. Extends all native{' '}
        <InlineCode>
          &lt;button&gt;
        </InlineCode>{' '}
        attributes.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage. Renders as{' '}
        <InlineCode>
          primary
        </InlineCode>{' '}
        variant at{' '}
        <InlineCode>
          md
        </InlineCode>{' '}
        size by default.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Button>Label</Button>
      </ComponentPreview>

      {/* Variants */}
      <Heading as="h3">Variants</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four semantic variants for different levels of emphasis and intent.
      </p>
      <ComponentPreview code={variantsCode} highlightedCode={variantsHighlighted}>
        <Grid columns={{ base: 2, md: 4 }} gap="component" className="w-full md:px-16">
          <Button variant="primary" className="w-full">Primary</Button>
          <Button variant="secondary" className="w-full">Secondary</Button>
          <Button variant="tertiary" className="w-full">Tertiary</Button>
          <Button variant="destructive" className="w-full">Destructive</Button>
        </Grid>
      </ComponentPreview>
      <ul className="type-body text-foreground max-w-prose mt-4 mb-2 flex flex-col gap-2">
        <li><strong className="text-foreground">Primary</strong> — the main action on the page. Usually one per screen.</li>
        <li><strong className="text-foreground">Secondary</strong> — supporting actions alongside a primary button.</li>
        <li><strong className="text-foreground">Tertiary</strong> — low-emphasis actions like "Cancel" or inline text-level actions.</li>
        <li><strong className="text-foreground">Destructive</strong> — actions that delete data or cannot be undone.</li>
      </ul>

      {/* Sizes */}
      <Heading as="h3">Sizes</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Three sizes aligned to the spacing grid. Use{' '}
        <InlineCode>
          md
        </InlineCode>{' '}
        (default) for most UI.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <Grid columns={{ base: 3 }} gap="component" className="w-full items-center md:px-16">
          <Button size="sm" className="w-full">Small</Button>
          <Button size="md" className="w-full">Medium</Button>
          <Button size="lg" className="w-full">Large</Button>
        </Grid>
      </ComponentPreview>

      {/* With icon */}
      <Heading as="h3">With icon</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Button has built-in{' '}
        <InlineCode>
          gap-2
        </InlineCode>{' '}
        so icons and text align automatically. Always use the{' '}
        <InlineCode>
          &lt;Icon&gt;
        </InlineCode>{' '}
        component — never import Lucide icons directly.
      </p>
      <ComponentPreview code={withIconCode} highlightedCode={withIconHighlighted}>
        <Button>
          <Icon name="plus" />
          Add item
        </Button>
      </ComponentPreview>

      {/* Disabled */}
      <Heading as="h3">Disabled</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass{' '}
        <InlineCode>
          disabled
        </InlineCode>{' '}
        to visually dim the button and block interaction. Works with all variants.
      </p>
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <Grid columns={{ base: 2, md: 4 }} gap="component" className="w-full md:px-16">
          <Button variant="primary" disabled className="w-full">Primary</Button>
          <Button variant="secondary" disabled className="w-full">Secondary</Button>
          <Button variant="tertiary" disabled className="w-full">Tertiary</Button>
          <Button variant="destructive" disabled className="w-full">Destructive</Button>
        </Grid>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional.{' '}
        <InlineCode>
          Button
        </InlineCode>{' '}
        extends{' '}
        <InlineCode>
          React.ButtonHTMLAttributes
        </InlineCode>
        , so any native button attribute is also accepted.
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
              <TableCell><InlineCode>variant</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;primary&#39;</InlineCode></TableCell>
              <TableCell>Visual style indicating the level of emphasis or intent.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>size</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;md&#39;</InlineCode></TableCell>
              <TableCell>Controls padding and font size. All values sit on the 4px spacing grid.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>type</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;button&#39; | &#39;submit&#39; | &#39;reset&#39;</InlineCode></TableCell>
              <TableCell><InlineCode>&#39;button&#39;</InlineCode></TableCell>
              <TableCell>
                HTML button type. Defaults to{' '}
                <InlineCode>button</InlineCode>{' '}
                instead of the browser default{' '}
                <InlineCode>submit</InlineCode>{' '}
                to prevent accidental form submissions.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>disabled</InlineCode></TableCell>
              <TableCell><InlineCode>boolean</InlineCode></TableCell>
              <TableCell><InlineCode>false</InlineCode></TableCell>
              <TableCell>Disables the button, reducing opacity and blocking pointer events.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>className</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>children</InlineCode></TableCell>
              <TableCell><InlineCode>React.ReactNode</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Button content. Can include text, icons, or both.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>variant</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</InlineCode> · default <InlineCode>&#39;primary&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Visual style indicating the level of emphasis or intent.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</InlineCode> · default <InlineCode>&#39;md&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Controls padding and font size. All values sit on the 4px spacing grid.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>type</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;button&#39; | &#39;submit&#39; | &#39;reset&#39;</InlineCode> · default <InlineCode>&#39;button&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">HTML button type. Defaults to <InlineCode>button</InlineCode> instead of the browser default <InlineCode>submit</InlineCode> to prevent accidental form submissions.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Disables the button, reducing opacity and blocking pointer events.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>React.ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Button content. Can include text, icons, or both.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
