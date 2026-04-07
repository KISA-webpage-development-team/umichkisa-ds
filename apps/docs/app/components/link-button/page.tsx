import { Container, LinkButton, Icon, Grid, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'

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
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">LinkButton</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        A navigation element styled as a button, for links that need
        button-level visual weight. Renders as an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;a&gt;
        </code>{' '}
        tag and shares the same variant and size options as{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Button
        </code>
        .
      </p>

      {/* ── When to use ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">When to use</h2>
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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage. Renders as{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          primary
        </code>{' '}
        variant at{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        size by default.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <LinkButton href="/home">Home</LinkButton>
      </ComponentPreview>

      {/* Variants */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Variants</h3>
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Three sizes aligned to the spacing grid. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With icon</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        LinkButton inherits{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          gap-2
        </code>{' '}
        from the button styles so icons and text align automatically. Always use
        the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;Icon&gt;
        </code>{' '}
        component — never import Lucide icons directly.
      </p>
      <ComponentPreview code={withIconCode} highlightedCode={withIconHighlighted}>
        <LinkButton href="#">
          <Icon name="external-link" />
          Visit site
        </LinkButton>
      </ComponentPreview>

      {/* External link */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">External link</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        For links that open in a new tab, pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          target=&quot;_blank&quot;
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          rel=&quot;noopener noreferrer&quot;
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          disabled
        </code>{' '}
        to visually dim the link and block interaction. When disabled,
        LinkButton renders as a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;span&gt;
        </code>{' '}
        instead of an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          &lt;a&gt;
        </code>{' '}
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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          LinkButton
        </code>{' '}
        extends{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          React.AnchorHTMLAttributes
        </code>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;primary&#39;</code></TableCell>
                <TableCell>Visual style of the link button.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></TableCell>
                <TableCell>Controls padding and font size. All values sit on the 4px spacing grid.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">href</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The URL to navigate to.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
                <TableCell>Renders as a non-interactive span when true.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">target</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Browsing context for the link (e.g. <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;_blank&quot;</code>).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">rel</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Link relationship (e.g. <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;noopener noreferrer&quot;</code>).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">React.ReactNode</code></TableCell>
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
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;primary&#39; | &#39;secondary&#39; | &#39;tertiary&#39; | &#39;destructive&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;primary&#39;</code></span>
              <span className="type-caption text-muted-foreground">Visual style of the link button.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&#39;md&#39;</code></span>
              <span className="type-caption text-muted-foreground">Controls padding and font size. All values sit on the 4px spacing grid.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>href</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">The URL to navigate to.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code> · default <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
              <span className="type-caption text-muted-foreground">Renders as a non-interactive span when true.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>target</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Browsing context for the link (e.g. <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;_blank&quot;</code>).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>rel</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Link relationship (e.g. <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;noopener noreferrer&quot;</code>).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">React.ReactNode</code></span>
              <span className="type-caption text-muted-foreground">Label text, icons, or any content inside the link button.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
