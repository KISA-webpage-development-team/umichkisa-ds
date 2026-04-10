import {
  Avatar,
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
import { InlineCode } from '@/components/InlineCode'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'

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
      <h1 className="type-h1 mb-4 text-foreground">Avatar</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Displays a user profile image with automatic fallback to initials or a
        generic icon. Supports three sizes and handles image load errors
        gracefully.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Default */}
      <Heading as="h3" className="mt-6">Default</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Provide{' '}
        <InlineCode>
          src
        </InlineCode>{' '}
        and{' '}
        <InlineCode>
          name
        </InlineCode>{' '}
        for the standard image avatar.
      </p>
      <ComponentPreview code={defaultCode} highlightedCode={defaultHighlighted}>
        <Avatar src="/img/demo-avatar.png" name="Jioh In" />
      </ComponentPreview>

      {/* Sizes */}
      <Heading as="h3">Sizes</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Three sizes available. Use{' '}
        <InlineCode>
          sm
        </InlineCode>{' '}
        for compact lists, {' '}
        <InlineCode>
          md
        </InlineCode>{' '}
        (default) for cards and nav bars, and{' '}
        <InlineCode>
          lg
        </InlineCode>{' '}
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
      <Heading as="h3">Initials fallback</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        When no{' '}
        <InlineCode>
          src
        </InlineCode>{' '}
        is provided, the avatar displays initials from the first and last
        word of{' '}
        <InlineCode>
          name
        </InlineCode>
        . KISA stores both{' '}
        <InlineCode>
          nameKor
        </InlineCode>{' '}
        and{' '}
        <InlineCode>
          nameEng
        </InlineCode>{' '}
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
      <Heading as="h3">Icon fallback</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        When neither{' '}
        <InlineCode>
          src
        </InlineCode>{' '}
        nor{' '}
        <InlineCode>
          name
        </InlineCode>{' '}
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
      <Heading as="h3">Error fallback</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        If the image fails to load, the avatar automatically falls back to
        initials (when{' '}
        <InlineCode>
          name
        </InlineCode>{' '}
        is provided) or the icon fallback.
      </p>
      <ComponentPreview code={errorFallbackCode} highlightedCode={errorFallbackHighlighted}>
        <Avatar src="/broken-image.jpg" name="Jioh In" />
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All props are technically optional, but{' '}
        <InlineCode>
          name
        </InlineCode>{' '}
        is strongly recommended — it provides the image&apos;s alt text and
        powers the initials fallback when the image is missing or fails to
        load.
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
                <TableCell><InlineCode>src</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Image URL. Falls back to initials or icon on error.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>name</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>User name. Used for alt text and initials fallback. Strongly recommended.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>size</InlineCode></TableCell>
                <TableCell><InlineCode>&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</InlineCode></TableCell>
                <TableCell><InlineCode>&#39;md&#39;</InlineCode></TableCell>
                <TableCell>Avatar size. sm = 32px, md = 40px, lg = 56px.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>src</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Image URL. Falls back to initials or icon on error.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · strongly recommended</span>
              <span className="type-caption text-muted-foreground">User name. Used for alt text and initials fallback.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>size</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</InlineCode> · default <InlineCode>&#39;md&#39;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Avatar size. sm = 32px, md = 40px, lg = 56px.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
