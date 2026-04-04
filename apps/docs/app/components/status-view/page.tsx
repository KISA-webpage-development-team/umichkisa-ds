import { Container, StatusView, LinkButton, Button } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const allVariantsCode = `import { StatusView } from '@umichkisa-ds/web'

<StatusView variant="not-found" />
<StatusView variant="not-authorized" />
<StatusView variant="not-logged-in" />
<StatusView variant="error" />`

const withCodeCode = `import { StatusView } from '@umichkisa-ds/web'

<StatusView variant="not-found" code="404" />`

const customIconCode = `import { StatusView } from '@umichkisa-ds/web'

<StatusView variant="error" icon="circle-x" title="서버 오류" description="잠시 후 다시 시도해 주세요." />`

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

export default function StatusViewPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">StatusView</h1>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Centered status message for error pages, auth gates, and empty states.
        Renders an icon, title, description, and optional action area within
        its parent container.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        StatusView fills its parent — the consumer controls the container size.
        For full-page status screens, wrap it in a viewport-height container.
        Each variant provides Korean default text that can be overridden via props.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* All variants */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">All variants</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Four variants cover common status scenarios. Each provides a default
        icon, title, and description in Korean.
      </p>
      <ComponentPreview code={allVariantsCode}>
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
      <ComponentPreview code={withCodeCode}>
        <div className="h-72 border border-border rounded-md w-full">
          <StatusView variant="not-found" code="404" />
        </div>
      </ComponentPreview>

      {/* Custom icon */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom icon</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override the default variant icon by passing a registered Lucide icon
        name to the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">icon</code>{' '}
        prop. Title and description can also be overridden.
      </p>
      <ComponentPreview code={customIconCode}>
        <div className="h-64 border border-border rounded-md w-full">
          <StatusView variant="error" icon="circle-x" title="서버 오류" description="잠시 후 다시 시도해 주세요." />
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
      <ComponentPreview code={withActionCode}>
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
        StatusView centers within its parent. For a full-page status screen,
        wrap it in a viewport-height container. The component handles centering
        automatically.
      </p>
      <ComponentPreview code={fullScreenCode}>
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
        Each variant ships with a default icon, title, and description. All
        can be overridden via props.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Variant</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Icon</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Title</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">not-found</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">file-x</td>
              <td className="px-4 py-3 type-body-sm text-foreground">404</td>
              <td className="px-4 py-3 type-body-sm text-foreground">존재하지 않는 페이지입니다</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">not-authorized</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">shield-x</td>
              <td className="px-4 py-3 type-body-sm text-foreground">접근 불가</td>
              <td className="px-4 py-3 type-body-sm text-foreground">권한이 없습니다</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">not-logged-in</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">log-in</td>
              <td className="px-4 py-3 type-body-sm text-foreground">로그인 필요</td>
              <td className="px-4 py-3 type-body-sm text-foreground">로그인 후 이용해 주세요</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">error</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">triangle-alert</td>
              <td className="px-4 py-3 type-body-sm text-foreground">오류 발생</td>
              <td className="px-4 py-3 type-body-sm text-foreground">예기치 못한 오류가 발생했습니다</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── API Reference ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">variant</code>{' '}
        prop is required. All other props are optional and override the
        variant defaults.
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
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">variant</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;not-found&quot; | &quot;not-authorized&quot; | &quot;not-logged-in&quot; | &quot;error&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Required. Determines the default icon, title, and description.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">code</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Large display text above the icon (e.g. &quot;404&quot;, &quot;500&quot;).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">icon</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">IconName</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">(variant default)</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Override the variant&apos;s default icon. Must be a registered icon name.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">title</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">(variant default)</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Override the variant&apos;s default title text.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">description</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">(variant default)</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Override the variant&apos;s default description text.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">action</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Optional action area below the description (button, link, etc.).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Merged via cn(). Applied to the outer wrapper for layout utilities.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
