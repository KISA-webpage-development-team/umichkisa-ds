import {
  Container,
  StatusView,
  LinkButton,
  Button,
  Alert,
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

const allVariantsCode = `import { StatusView } from '@umichkisa-ds/web'

<StatusView variant="not-found" />
<StatusView variant="not-authorized" />
<StatusView variant="not-logged-in" />
<StatusView variant="error" />`

const withCodeCode = `import { StatusView } from '@umichkisa-ds/web'

<StatusView variant="not-found" code="404" />`

const customIconCode = `import { StatusView } from '@umichkisa-ds/web'

<StatusView variant="not-found" icon="search-x" />`

const withActionCode = `import { StatusView, LinkButton, Button } from '@umichkisa-ds/web'

<StatusView
  variant="not-found"
  code="404"
  action={<LinkButton href="/">홈페이지로 돌아가기</LinkButton>}
/>

<StatusView
  variant="error"
  action={<Button variant="primary" onClick={() => window.location.reload()}>다시 시도</Button>}
/>`

const fullScreenCode = `import { StatusView, LinkButton } from '@umichkisa-ds/web'

{/* Wrap StatusView in a full-viewport container */}
<div className="h-screen flex items-center justify-center">
  <StatusView
    variant="not-found"
    code="404"
    action={<LinkButton href="/">홈페이지로 돌아가기</LinkButton>}
  />
</div>`

export default async function StatusViewPage() {
  const [allVariantsHighlighted, withCodeHighlighted, customIconHighlighted, withActionHighlighted, fullScreenHighlighted] = await Promise.all([
    highlight(allVariantsCode),
    highlight(withCodeCode),
    highlight(customIconCode),
    highlight(withActionCode),
    highlight(fullScreenCode),
  ]);

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">StatusView</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Centered status message for error pages, auth gates, and empty states.
        Renders an icon, title, description, and optional action area within
        its parent container. Each variant ships with Korean default text that
        can be overridden via props.
      </p>
      <Alert variant="info" className="mb-8">
        <p className="type-body-sm text-foreground">
          StatusView fills its parent — the consumer controls the container
          size. For full-page status screens, wrap it in a viewport-height
          container (e.g.{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            h-screen
          </code>
          ).
        </p>
      </Alert>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* All variants */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">All variants</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four variants cover common status scenarios. Each provides a default
        icon, title, and description in Korean.
      </p>
      <ComponentPreview code={allVariantsCode} highlightedCode={allVariantsHighlighted}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="h-64 border border-border rounded-md">
            <StatusView variant="not-found" />
          </div>
          <div className="h-64 border border-border rounded-md">
            <StatusView variant="not-authorized" />
          </div>
          <div className="h-64 border border-border rounded-md">
            <StatusView variant="not-logged-in" />
          </div>
          <div className="h-64 border border-border rounded-md">
            <StatusView variant="error" />
          </div>
        </div>
      </ComponentPreview>

      {/* With status code */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With status code</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">code</code>{' '}
        prop to display a large status code above the icon. Useful for HTTP
        error pages.
      </p>
      <ComponentPreview code={withCodeCode} highlightedCode={withCodeHighlighted}>
        <div className="h-72 border border-border rounded-md w-full">
          <StatusView variant="not-found" code="404" />
        </div>
      </ComponentPreview>

      {/* Custom icon */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom icon</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override the default variant icon by passing any icon name from the{' '}
        <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon registry</a>{' '}
        to the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">icon</code>{' '}
        prop. The variant still drives the default title and description — only
        the icon changes.
      </p>
      <ComponentPreview code={customIconCode} highlightedCode={customIconHighlighted}>
        <div className="h-64 border border-border rounded-md w-full">
          <StatusView variant="not-found" icon="search-x" />
        </div>
      </ComponentPreview>

      {/* With action */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With action</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">action</code>{' '}
        prop accepts any React node — typically a button or link that helps the
        user recover from the status.
      </p>
      <ComponentPreview code={withActionCode} highlightedCode={withActionHighlighted}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="h-80 border border-border rounded-md">
            <StatusView
              variant="not-found"
              code="404"
              action={<LinkButton href="/">홈페이지로 돌아가기</LinkButton>}
            />
          </div>
          <div className="h-80 border border-border rounded-md">
            <StatusView
              variant="error"
              action={<Button variant="primary">다시 시도</Button>}
            />
          </div>
        </div>
      </ComponentPreview>

      {/* Full-screen pattern */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Full-screen pattern</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        For a full-page status screen, wrap StatusView in a viewport-height
        container.
      </p>
      <p className="type-caption mb-2 text-muted-foreground">
        Preview shown at fixed height — in real usage, <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">h-screen</code> fills the viewport.
      </p>
      <ComponentPreview code={fullScreenCode} highlightedCode={fullScreenHighlighted}>
        <div className="h-80 border border-border rounded-md w-full">
          <StatusView
            variant="not-found"
            code="404"
            action={<LinkButton href="/">홈페이지로 돌아가기</LinkButton>}
          />
        </div>
      </ComponentPreview>

      {/* ── Variant Defaults ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Variant defaults</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Default icon for each variant. Pass any of these names to the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">icon</code>{' '}
        prop to override across variants.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Variant</TableHead>
                <TableHead>Icon name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">not-found</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">file-x</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">not-authorized</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">shield-x</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">not-logged-in</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">log-in</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">error</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">triangle-alert</code></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>not-found</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">file-x</code></span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>not-authorized</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">shield-x</code></span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>not-logged-in</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">log-in</code></span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>error</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">triangle-alert</code></span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── API Reference ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">variant</code>{' '}
        prop is required. All other props are optional and override the
        variant defaults.
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;not-found&quot; | &quot;not-authorized&quot; | &quot;not-logged-in&quot; | &quot;error&quot;</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Required. Determines the default icon, title, and description.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">code</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Large display text above the icon (e.g. &quot;404&quot;, &quot;500&quot;).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">icon</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">IconName</code></TableCell>
                <TableCell>(variant default)</TableCell>
                <TableCell>Override the variant&apos;s default icon. See <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a> for available names.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">title</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>(variant default)</TableCell>
                <TableCell>Override the variant&apos;s default title text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">description</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>(variant default)</TableCell>
                <TableCell>Override the variant&apos;s default description text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">action</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Optional action area below the description (button, link, etc.).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities (width, height, margin, padding).</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>variant</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;not-found&quot; | &quot;not-authorized&quot; | &quot;not-logged-in&quot; | &quot;error&quot;</code></span>
              <span className="type-caption text-muted-foreground">Required. Determines the default icon, title, and description.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>code</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Large display text above the icon (e.g. &quot;404&quot;, &quot;500&quot;).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>icon</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">IconName</code> · default <em>variant default</em></span>
              <span className="type-caption text-muted-foreground">Override the variant&apos;s default icon. See <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a> for available names.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>title</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code> · default <em>variant default</em></span>
              <span className="type-caption text-muted-foreground">Override the variant&apos;s default title text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>description</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code> · default <em>variant default</em></span>
              <span className="type-caption text-muted-foreground">Override the variant&apos;s default description text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>action</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">ReactNode</code></span>
              <span className="type-caption text-muted-foreground">Optional action area below the description (button, link, etc.).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities (width, height, margin, padding).</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
