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
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

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
      <h1 className="type-h1 mb-4 text-foreground">StatusView</h1>
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
          <InlineCode>
            h-screen
          </InlineCode>
          ).
        </p>
      </Alert>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* All variants */}
      <Heading as="h3" className="mt-6">All variants</Heading>
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
      <Heading as="h3">With status code</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a{' '}
        <InlineCode>code</InlineCode>{' '}
        prop to display a large status code above the icon. Useful for HTTP
        error pages.
      </p>
      <ComponentPreview code={withCodeCode} highlightedCode={withCodeHighlighted}>
        <div className="h-72 border border-border rounded-md w-full">
          <StatusView variant="not-found" code="404" />
        </div>
      </ComponentPreview>

      {/* Custom icon */}
      <Heading as="h3">Custom icon</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override the default variant icon by passing any icon name from the{' '}
        <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon registry</a>{' '}
        to the{' '}
        <InlineCode>icon</InlineCode>{' '}
        prop. The variant still drives the default title and description — only
        the icon changes.
      </p>
      <ComponentPreview code={customIconCode} highlightedCode={customIconHighlighted}>
        <div className="h-64 border border-border rounded-md w-full">
          <StatusView variant="not-found" icon="search-x" />
        </div>
      </ComponentPreview>

      {/* With action */}
      <Heading as="h3">With action</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The{' '}
        <InlineCode>action</InlineCode>{' '}
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
      <Heading as="h2">Full-screen pattern</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        For a full-page status screen, wrap StatusView in a viewport-height
        container.
      </p>
      <p className="type-caption mb-2 text-muted-foreground">
        Preview shown at fixed height — in real usage, <InlineCode>h-screen</InlineCode> fills the viewport.
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
      <Heading as="h2">Variant defaults</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Default icon for each variant. Pass any of these names to the{' '}
        <InlineCode>icon</InlineCode>{' '}
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
                <TableCell><InlineCode>not-found</InlineCode></TableCell>
                <TableCell><InlineCode>file-x</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>not-authorized</InlineCode></TableCell>
                <TableCell><InlineCode>shield-x</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>not-logged-in</InlineCode></TableCell>
                <TableCell><InlineCode>log-in</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>error</InlineCode></TableCell>
                <TableCell><InlineCode>triangle-alert</InlineCode></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>not-found</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>file-x</InlineCode></span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>not-authorized</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>shield-x</InlineCode></span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>not-logged-in</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>log-in</InlineCode></span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>error</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>triangle-alert</InlineCode></span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── API Reference ───────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <InlineCode>variant</InlineCode>{' '}
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
                <TableCell><InlineCode>variant<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>&quot;not-found&quot; | &quot;not-authorized&quot; | &quot;not-logged-in&quot; | &quot;error&quot;</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Required. Determines the default icon, title, and description.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>code</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Large display text above the icon (e.g. &quot;404&quot;, &quot;500&quot;).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>icon</InlineCode></TableCell>
                <TableCell><InlineCode>IconName</InlineCode></TableCell>
                <TableCell>(variant default)</TableCell>
                <TableCell>Override the variant&apos;s default icon. See <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a> for available names.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>title</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>(variant default)</TableCell>
                <TableCell>Override the variant&apos;s default title text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>description</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>(variant default)</TableCell>
                <TableCell>Override the variant&apos;s default description text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>action</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Optional action area below the description (button, link, etc.).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities (width, height, margin, padding).</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>variant<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;not-found&quot; | &quot;not-authorized&quot; | &quot;not-logged-in&quot; | &quot;error&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">Required. Determines the default icon, title, and description.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>code</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Large display text above the icon (e.g. &quot;404&quot;, &quot;500&quot;).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>icon</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>IconName</InlineCode> · default <em>variant default</em></span>
              <span className="type-caption text-muted-foreground">Override the variant&apos;s default icon. See <a href="/components/icon" className="text-link underline hover:text-brand-primary">Icon</a> for available names.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>title</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · default <em>variant default</em></span>
              <span className="type-caption text-muted-foreground">Override the variant&apos;s default title text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>description</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode> · default <em>variant default</em></span>
              <span className="type-caption text-muted-foreground">Override the variant&apos;s default description text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>action</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">Optional action area below the description (button, link, etc.).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities (width, height, margin, padding).</span>
            </TableMobileItem>
          </TableMobileList>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
      </div>

    </Container>
  )
}
