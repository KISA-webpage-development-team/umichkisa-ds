import { Container, Avatar } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'

const defaultCode = `import { Avatar } from '@umichkisa-ds/web'

<Avatar src="/img/demo-avatar.png" name="Jioh In" />`

const sizesCode = `import { Avatar } from '@umichkisa-ds/web'

<Avatar src="/img/demo-avatar.png" name="Jioh In" size="sm" />
<Avatar src="/img/demo-avatar.png" name="Jioh In" size="md" />
<Avatar src="/img/demo-avatar.png" name="Jioh In" size="lg" />`

const initialsCode = `import { Avatar } from '@umichkisa-ds/web'

<Avatar name="Jioh In" size="sm" />
<Avatar name="Jioh In" size="md" />
<Avatar name="Jioh In" size="lg" />`

const iconFallbackCode = `import { Avatar } from '@umichkisa-ds/web'

<Avatar size="sm" />
<Avatar size="md" />
<Avatar size="lg" />`

const errorFallbackCode = `import { Avatar } from '@umichkisa-ds/web'

{/* Broken src falls back to initials */}
<Avatar src="/broken-image.jpg" name="Jioh In" />`

export default async function AvatarPage() {
  const [
    defaultHighlighted,
    sizesHighlighted,
    initialsHighlighted,
    iconFallbackHighlighted,
    errorFallbackHighlighted,
  ] = await Promise.all([
    highlight(defaultCode),
    highlight(sizesCode),
    highlight(initialsCode),
    highlight(iconFallbackCode),
    highlight(errorFallbackCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Avatar</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Displays a user profile image with automatic fallback to initials or a
        generic icon. Supports three sizes and handles image load errors
        gracefully.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Default */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Default</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Provide{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          src
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>{' '}
        for the standard image avatar.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Avatar src="/img/demo-avatar.png" name="Jioh In" />
      </ComponentPreview>

      {/* Sizes */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Sizes</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Three sizes available. Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          sm
        </code>{' '}
        for compact lists, {' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          md
        </code>{' '}
        (default) for cards and nav bars, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          lg
        </code>{' '}
        for profile pages.
      </p>
      <ComponentPreview code={sizesCode} highlightedCode={sizesHighlighted}>
        <div className="flex items-center gap-4">
          <Avatar src="/img/demo-avatar.png" name="Jioh In" size="sm" />
          <Avatar src="/img/demo-avatar.png" name="Jioh In" size="md" />
          <Avatar src="/img/demo-avatar.png" name="Jioh In" size="lg" />
        </div>
      </ComponentPreview>

      {/* Initials fallback */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Initials fallback</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        When no{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          src
        </code>{' '}
        is provided, the avatar displays initials from the first and last
        word of{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>
        . KISA stores both{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          nameKor
        </code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          nameEng
        </code>{' '}
        in the database — pass whichever is appropriate for the context.
      </p>
      <ComponentPreview code={initialsCode} highlightedCode={initialsHighlighted}>
        <div className="flex items-center gap-4">
          <Avatar name="Jioh In" size="sm" />
          <Avatar name="Jioh In" size="md" />
          <Avatar name="Jioh In" size="lg" />
        </div>
      </ComponentPreview>

      {/* Icon fallback */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Icon fallback</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        When neither{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          src
        </code>{' '}
        nor{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>{' '}
        is provided, a generic user icon is shown.
      </p>
      <ComponentPreview code={iconFallbackCode} highlightedCode={iconFallbackHighlighted}>
        <div className="flex items-center gap-4">
          <Avatar size="sm" />
          <Avatar size="md" />
          <Avatar size="lg" />
        </div>
      </ComponentPreview>

      {/* Error fallback */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Error fallback</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        If the image fails to load, the avatar automatically falls back to
        initials (when{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          name
        </code>{' '}
        is provided) or the icon fallback.
      </p>
      <ComponentPreview code={errorFallbackCode} highlightedCode={errorFallbackHighlighted}>
        <Avatar src="/broken-image.jpg" name="Jioh In" />
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are optional.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">src</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Image URL. Falls back to initials or icon on error.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">name</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">User name. Used for alt text and initials fallback.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">size</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&#39;md&#39;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Avatar size. sm = 32px, md = 40px, lg = 56px.</td>
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

    </Container>
  )
}
