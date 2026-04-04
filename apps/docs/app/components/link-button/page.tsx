import { Container, LinkButton, Icon } from '@umichkisa-ds/web'
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
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">LinkButton</h1>
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
        <div className="flex items-center gap-4">
          <LinkButton variant="primary" href="#">Primary</LinkButton>
          <LinkButton variant="secondary" href="#">Secondary</LinkButton>
          <LinkButton variant="tertiary" href="#">Tertiary</LinkButton>
          <LinkButton variant="destructive" href="#">Destructive</LinkButton>
        </div>
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
        <div className="flex items-center gap-4">
          <LinkButton size="sm" href="#">Small</LinkButton>
          <LinkButton size="md" href="#">Medium</LinkButton>
          <LinkButton size="lg" href="#">Large</LinkButton>
        </div>
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
        <div className="flex items-center gap-4">
          <LinkButton variant="primary" disabled>Primary</LinkButton>
          <LinkButton variant="secondary" disabled>Secondary</LinkButton>
          <LinkButton variant="tertiary" disabled>Tertiary</LinkButton>
          <LinkButton variant="destructive" disabled>Destructive</LinkButton>
        </div>
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
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption uppercase border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">variant</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&quot;primary&quot; | &quot;secondary&quot; | &quot;tertiary&quot; | &quot;destructive&quot;</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&quot;primary&quot;</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">Visual style of the link button.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">size</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&quot;md&quot;</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">Controls padding and font size. All values sit on the 4px spacing grid.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">href</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">The URL to navigate to.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">disabled</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">false</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">Renders as a non-interactive span when true.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">target</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">Browsing context for the link (e.g. &quot;_blank&quot;).</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">rel</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">Link relationship (e.g. &quot;noopener noreferrer&quot;).</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">Merged via cn() (class merge utility). Use for layout utilities only — never override variant styles.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">children</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ReactNode</code></td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 border-b border-border type-body-sm text-foreground">Label text, icons, or any content inside the link button.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
