import { Container, LinkButton, Icon, Grid, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

const defaultCode = `import { LinkButton } from '@umichkisa-ds/web'

<LinkButton href="/home">Home</LinkButton>`

const variantsCode = `import { LinkButton } from '@umichkisa-ds/web'

<LinkButton variant="primary" href="#">Primary</LinkButton>
<LinkButton variant="secondary" href="#">Secondary</LinkButton>
<LinkButton variant="tertiary" href="#">Tertiary</LinkButton>
<LinkButton variant="destructive" href="#">Destructive</LinkButton>`

const sizesCode = `import { LinkButton } from '@umichkisa-ds/web'

<LinkButton size="sm" href="#">Small</LinkButton>
<LinkButton size="md" href="#">Medium</LinkButton>
<LinkButton size="lg" href="#">Large</LinkButton>`

const withIconCode = `import { LinkButton, Icon } from '@umichkisa-ds/web'

<LinkButton href="#">
  <Icon name="external-link" />
  Visit site
</LinkButton>`

const externalLinkCode = `import { LinkButton } from '@umichkisa-ds/web'

<LinkButton
  href="https://umichkisa.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Open in new tab
</LinkButton>`

const disabledCode = `import { LinkButton } from '@umichkisa-ds/web'

<LinkButton variant="primary" href="#" disabled>Primary</LinkButton>
<LinkButton variant="secondary" href="#" disabled>Secondary</LinkButton>
<LinkButton variant="tertiary" href="#" disabled>Tertiary</LinkButton>
<LinkButton variant="destructive" href="#" disabled>Destructive</LinkButton>`

export default async function LinkButtonPage() {
  const [
    defaultHighlighted,
    variantsHighlighted,
    sizesHighlighted,
    withIconHighlighted,
    externalLinkHighlighted,
    disabledHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(variantsCode),
    highlight(sizesCode),
    highlight(withIconCode),
    highlight(externalLinkCode),
    highlight(disabledCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">LinkButton</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        A navigation element styled as a button, for links that need
        button-level visual weight. Renders as an{' '}
        <InlineCode>
          &lt;a&gt;
        </InlineCode>{' '}
        tag and shares the same variant and size options as{' '}
        <InlineCode>
          Button
        </InlineCode>
        .
      </p>

      {/* ── When to use ─────────────────────────────────────── */}
      <Heading as="h2">When to use</Heading>
      <ul className="type-body max-w-prose mb-8 flex flex-col gap-2">
        <li>
          <strong className="text-foreground">LinkButton</strong> — for navigation.
          If it opens a URL or navigates to a route, use LinkButton.
        </li>
        <li>
          <strong className="text-foreground">Button</strong> — for actions.
          If it submits a form, triggers a mutation, or performs an in-page
          action, use Button.
        </li>
      </ul>

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
        <LinkButton href="/home">Home</LinkButton>
      </ComponentPreview>

      {/* Variants */}
      <Heading as="h3">Variants</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four variants for different levels of emphasis and intent.
      </p>
      <ComponentPreview code={variantsCode} highlightedCode={variantsHighlighted}>
        <Grid columns={{ base: 2, md: 4 }} gap="component" className="w-full md:px-16">
          <LinkButton variant="primary" href="#" className="w-full">Primary</LinkButton>
          <LinkButton variant="secondary" href="#" className="w-full">Secondary</LinkButton>
          <LinkButton variant="tertiary" href="#" className="w-full">Tertiary</LinkButton>
          <LinkButton variant="destructive" href="#" className="w-full">Destructive</LinkButton>
        </Grid>
      </ComponentPreview>

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
          <LinkButton size="sm" href="#" className="w-full">Small</LinkButton>
          <LinkButton size="md" href="#" className="w-full">Medium</LinkButton>
          <LinkButton size="lg" href="#" className="w-full">Large</LinkButton>
        </Grid>
      </ComponentPreview>

      {/* With icon */}
      <Heading as="h3">With icon</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        LinkButton inherits{' '}
        <InlineCode>
          gap-2
        </InlineCode>{' '}
        from the button styles so icons and text align automatically. Always use
        the{' '}
        <InlineCode>
          &lt;Icon&gt;
        </InlineCode>{' '}
        component — never import Lucide icons directly.
      </p>
      <ComponentPreview code={withIconCode} highlightedCode={withIconHighlighted}>
        <LinkButton href="#">
          <Icon name="external-link" />
          Visit site
        </LinkButton>
      </ComponentPreview>

      {/* External link */}
      <Heading as="h3">External link</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        For links that open in a new tab, pass{' '}
        <InlineCode>
          target=&quot;_blank&quot;
        </InlineCode>{' '}
        and{' '}
        <InlineCode>
          rel=&quot;noopener noreferrer&quot;
        </InlineCode>{' '}
        to prevent reverse tabnapping.
      </p>
      <ComponentPreview code={externalLinkCode} highlightedCode={externalLinkHighlighted}>
        <LinkButton
          href="https://umichkisa.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in new tab
        </LinkButton>
      </ComponentPreview>

      {/* Disabled */}
      <Heading as="h3">Disabled</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass{' '}
        <InlineCode>
          disabled
        </InlineCode>{' '}
        to visually dim the link and block interaction. When disabled,
        LinkButton renders as a{' '}
        <InlineCode>
          &lt;span&gt;
        </InlineCode>{' '}
        instead of an{' '}
        <InlineCode>
          &lt;a&gt;
        </InlineCode>{' '}
        to remove it from the tab order.
      </p>
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <Grid columns={{ base: 2, md: 4 }} gap="component" className="w-full md:px-16">
          <LinkButton variant="primary" href="#" disabled className="w-full">Primary</LinkButton>
          <LinkButton variant="secondary" href="#" disabled className="w-full">Secondary</LinkButton>
          <LinkButton variant="tertiary" href="#" disabled className="w-full">Tertiary</LinkButton>
          <LinkButton variant="destructive" href="#" disabled className="w-full">Destructive</LinkButton>
        </Grid>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional.{' '}
        <InlineCode>
          LinkButton
        </InlineCode>{' '}
        extends{' '}
        <InlineCode>
          React.AnchorHTMLAttributes
        </InlineCode>
        , so any native anchor attribute is also accepted.
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
                <TableCell>Visual style of the link button.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>size</InlineCode></TableCell>
                <TableCell><InlineCode>&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</InlineCode></TableCell>
                <TableCell><InlineCode>&#39;md&#39;</InlineCode></TableCell>
                <TableCell>Controls padding and font size. All values sit on the 4px spacing grid.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>href</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The URL to navigate to.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>disabled</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Renders as a non-interactive span when true.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>target</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Browsing context for the link (e.g. <InlineCode>&quot;_blank&quot;</InlineCode>).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>rel</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Link relationship (e.g. <InlineCode>&quot;noopener noreferrer&quot;</InlineCode>).</TableCell>
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
                <TableCell>Label text, icons, or any content inside the link button.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>variant</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</InlineCode> · default <InlineCode>&#39;primary&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Visual style of the link button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</InlineCode> · default <InlineCode>&#39;md&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Controls padding and font size. All values sit on the 4px spacing grid.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>href</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">The URL to navigate to.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode> · default <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Renders as a non-interactive span when true.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>target</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Browsing context for the link (e.g. <InlineCode>&quot;_blank&quot;</InlineCode>).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>rel</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Link relationship (e.g. <InlineCode>&quot;noopener noreferrer&quot;</InlineCode>).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>React.ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Label text, icons, or any content inside the link button.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
