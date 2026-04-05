import { Alert, Container, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { ColorSwatch } from '@/components/ColorSwatch'
import { ColorSwatchGrid } from '@/components/ColorSwatchGrid'
import { CodeBlock } from '@/components/CodeBlock'

export default async function ColorsTokensPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Semantic Token Reference</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Semantic tokens are what you use in components. Each token is named by its
        purpose. Find them in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">packages/web/src/tokens/semantic.css</code>.
      </p>

      {/* ── Brand ───────────────────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Brand</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The Michigan brand colors. These define the visual identity of KISA across
        every surface.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue</code></TableCell>
                <TableCell>Anchor color. Navbars, hero sections, primary button backgrounds.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-mid</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue-mid</code></TableCell>
                <TableCell>Softer blue. Link text, secondary UI highlights. Use cases will grow over time.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-maize</code></TableCell>
                <TableCell>Action color. CTAs, focus rings, text on brand backgrounds.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-subtle</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-maize-light</code></TableCell>
                <TableCell>Light maize tint. Callout backgrounds, highlighted regions.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>
              <span className="type-caption text-muted-foreground">--primitive-michigan-blue · Anchor color. Navbars, hero sections, primary button backgrounds.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-mid</code>
              <span className="type-caption text-muted-foreground">--primitive-michigan-blue-mid · Softer blue. Link text, secondary UI highlights. Use cases will grow over time.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code>
              <span className="type-caption text-muted-foreground">--primitive-michigan-maize · Action color. CTAs, focus rings, text on brand backgrounds.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-subtle</code>
              <span className="type-caption text-muted-foreground">--primitive-michigan-maize-light · Light maize tint. Callout backgrounds, highlighted regions.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <ColorSwatchGrid>
        <ColorSwatch token="--color-brand-primary"       hex="#00274c" label="Brand Primary" />
        <ColorSwatch token="--color-brand-primary-mid"   hex="#00568a" label="Brand Primary Mid" />
        <ColorSwatch token="--color-brand-accent"        hex="#ffcb05" label="Brand Accent" />
        <ColorSwatch token="--color-brand-accent-subtle" hex="#ffe98a" label="Brand Accent Subtle" />
      </ColorSwatchGrid>

      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On brand-primary vs brand-accent:</strong>{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>{' '}
        is the anchor — it carries weight and authority. It does not draw the eye by itself.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code>{' '}
        is the signal — it is what users notice first. When you need to say {'"'}look here,{'"'} reach
        for accent. When you need to say {'"'}this is KISA,{'"'} reach for primary.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On brand-primary-mid:</strong> This is a softer,
        more readable blue designed for contexts where full navy would be too heavy. Its primary use
        today is link text. Additional use cases will be documented here as they are established.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Understanding -subtle and -muted ────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Understanding <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">-subtle</code> and <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">-muted</code></h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Two suffixes appear across multiple token groups —{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">-subtle</code> and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">-muted</code>.
        They do not mean the same thing and are not interchangeable.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">-subtle</code></strong>{' '}
        means one step softer in visual weight. It creates a tinted region without drawing attention.
        Used for card and panel backgrounds (
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code>),
        alert box fills (
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error-subtle</code>),
        and similar containers.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">-muted</code></strong>{' '}
        means reduced visual prominence — not necessarily darker.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-muted</code>{' '}
        is <em>lighter</em> than{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code>{' '}
        because it is designed to sit <em>inside</em> a subtle surface and appear elevated.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-muted-foreground</code>{' '}
        is lower contrast than{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code>{' '}
        because it carries supporting, not primary, information.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The key rule: a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">-muted</code>{' '}
        value always serves a deprioritized role. A{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">-subtle</code>{' '}
        value always serves a container or background role.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Surface ─────────────────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Surface</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Background colors that define the depth layers of the UI. Think of them as
        elevation — the higher you stack an element, the more tinted its background.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-white</code></TableCell>
                <TableCell>Page background. The base layer everything sits on.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-100</code></TableCell>
                <TableCell>Cards and panels. One step above the page.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-muted</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-50</code></TableCell>
                <TableCell>Items inside cards. Sits lighter inside a darker card.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code>
              <span className="type-caption text-muted-foreground">--primitive-white · Page background. The base layer everything sits on.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code>
              <span className="type-caption text-muted-foreground">--primitive-gray-100 · Cards and panels. One step above the page.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-muted</code>
              <span className="type-caption text-muted-foreground">--primitive-gray-50 · Items inside cards. Sits lighter inside a darker card.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <ColorSwatchGrid>
        <ColorSwatch token="--color-surface"        label="Surface" />
        <ColorSwatch token="--color-surface-subtle" label="Surface Subtle" />
        <ColorSwatch token="--color-surface-muted"  label="Surface Muted" />
      </ColorSwatchGrid>

      {/* ── Border ──────────────────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Border</h2>

      <div className="my-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-200</code></TableCell>
                <TableCell>Default dividers, input field outlines.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border-strong</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-300</code></TableCell>
                <TableCell>Emphasized borders, active input states.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border</code>
              <span className="type-caption text-muted-foreground">--primitive-gray-200 · Default dividers, input field outlines.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border-strong</code>
              <span className="type-caption text-muted-foreground">--primitive-gray-300 · Emphasized borders, active input states.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <ColorSwatchGrid>
        <ColorSwatch token="--color-border"        label="Border" />
        <ColorSwatch token="--color-border-strong" label="Border Strong" />
      </ColorSwatchGrid>

      {/* ── Text ────────────────────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Text</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Text tokens cover every role in the typographic hierarchy, plus two special
        cases for colored surfaces.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-900</code></TableCell>
                <TableCell>Body text, headings. Default for all readable content.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-muted-foreground</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-500</code></TableCell>
                <TableCell>Captions, secondary labels, timestamps.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-disabled-foreground</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-400</code></TableCell>
                <TableCell>Disabled state text. Intentionally low contrast — do not use for readable content.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-foreground</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-maize</code></TableCell>
                <TableCell>Text sitting on <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code> backgrounds (navbars, hero sections, primary buttons).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-link</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-mid</code></TableCell>
                <TableCell>Hyperlinks and inline clickable text.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code>
              <span className="type-caption text-muted-foreground">--primitive-gray-900 · Body text, headings. Default for all readable content.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-muted-foreground</code>
              <span className="type-caption text-muted-foreground">--primitive-gray-500 · Captions, secondary labels, timestamps.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-disabled-foreground</code>
              <span className="type-caption text-muted-foreground">--primitive-gray-400 · Disabled state text. Intentionally low contrast — do not use for readable content.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-foreground</code>
              <span className="type-caption text-muted-foreground">--primitive-michigan-maize · Text sitting on --color-brand-primary backgrounds (navbars, hero sections, primary buttons).</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-link</code>
              <span className="type-caption text-muted-foreground">--color-brand-primary-mid · Hyperlinks and inline clickable text.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <ColorSwatchGrid>
        <ColorSwatch token="--color-foreground"          label="Foreground" />
        <ColorSwatch token="--color-muted-foreground"    label="Muted Foreground" />
        <ColorSwatch token="--color-disabled-foreground" label="Disabled Foreground" />
        <ColorSwatch token="--color-brand-foreground"    label="Brand Foreground" />
        <ColorSwatch token="--color-link"                label="Link" />
      </ColorSwatchGrid>

      {/* ── Feedback ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Feedback</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Feedback colors communicate system states. Each state has two tokens: a solid
        color for icons, borders, and text labels, and a subtle tint for background
        surfaces like alert boxes.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-red-500</code></TableCell>
                <TableCell>Error state. Form validation failures, destructive action warnings.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error-subtle</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(97% 0.02 27)</code></TableCell>
                <TableCell>Background for error alert boxes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-green-500</code></TableCell>
                <TableCell>Success state. Confirmations, completed actions.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success-subtle</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(97% 0.02 145)</code></TableCell>
                <TableCell>Background for success alert boxes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(72% 0.15 60)</code></TableCell>
                <TableCell>Warning state. Non-blocking issues that need attention.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning-subtle</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(97% 0.02 60)</code></TableCell>
                <TableCell>Background for warning alert boxes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue-mid</code></TableCell>
                <TableCell>Informational state. Neutral tips, contextual help.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info-subtle</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue-light</code></TableCell>
                <TableCell>Background for info alert boxes.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error</code>
              <span className="type-caption text-muted-foreground">--primitive-red-500 · Error state. Form validation failures, destructive action warnings.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error-subtle</code>
              <span className="type-caption text-muted-foreground">oklch(97% 0.02 27) · Background for error alert boxes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success</code>
              <span className="type-caption text-muted-foreground">--primitive-green-500 · Success state. Confirmations, completed actions.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success-subtle</code>
              <span className="type-caption text-muted-foreground">oklch(97% 0.02 145) · Background for success alert boxes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning</code>
              <span className="type-caption text-muted-foreground">oklch(72% 0.15 60) · Warning state. Non-blocking issues that need attention.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning-subtle</code>
              <span className="type-caption text-muted-foreground">oklch(97% 0.02 60) · Background for warning alert boxes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info</code>
              <span className="type-caption text-muted-foreground">--primitive-michigan-blue-mid · Informational state. Neutral tips, contextual help.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info-subtle</code>
              <span className="type-caption text-muted-foreground">--primitive-michigan-blue-light · Background for info alert boxes.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <ColorSwatchGrid>
        <ColorSwatch token="--color-error"          label="Error" />
        <ColorSwatch token="--color-error-subtle"   label="Error Subtle" />
        <ColorSwatch token="--color-success"        label="Success" />
        <ColorSwatch token="--color-success-subtle" label="Success Subtle" />
        <ColorSwatch token="--color-warning"        label="Warning" />
        <ColorSwatch token="--color-warning-subtle" label="Warning Subtle" />
        <ColorSwatch token="--color-info"           label="Info" />
        <ColorSwatch token="--color-info-subtle"    label="Info Subtle" />
      </ColorSwatchGrid>

      <Alert variant="info" title="On --color-info and --color-link" className="my-4">
        <p>
          Both resolve to{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue-mid</code>{' '}
          — the same rendered color. This is intentional: blue reads as both informational and
          interactive in this system. Do not use them interchangeably. Use the token that matches
          the semantic role:{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info</code>{' '}
          for state indicators and alert borders,{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-link</code>{' '}
          for clickable inline text.
        </p>
      </Alert>

      {/* ── Interactive ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Interactive</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Tokens for the hover and pressed states of both brand colors, plus the focus
        ring shown when navigating with a keyboard.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        For{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>{' '}
        (dark navy), hover goes lighter. For{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code>{' '}
        (maize), hover goes darker — because maize is already very bright, darkening it is
        the only way to show a visible state change.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-hover</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(25% 0.075 243)</code></TableCell>
                <TableCell>Hover state on brand-primary elements. Slightly lighter than base.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-pressed</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(15% 0.05 243)</code></TableCell>
                <TableCell>Pressed state on brand-primary elements. Slightly darker than base.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-hover</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(76% 0.185 91)</code></TableCell>
                <TableCell>Hover state on brand-accent elements. Darker maize.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-pressed</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(70% 0.185 91)</code></TableCell>
                <TableCell>Pressed state on brand-accent elements. Even darker maize.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-focus-ring</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-maize</code></TableCell>
                <TableCell>Keyboard focus indicator. Use as a dual-ring: maize outer ring + 4px dark offset ring (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>). The maize ring provides contrast on dark surfaces; the offset ring provides contrast on white/light surfaces.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-hover</code>
              <span className="type-caption text-muted-foreground">oklch(25% 0.075 243) · Hover state on brand-primary elements. Slightly lighter than base.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-pressed</code>
              <span className="type-caption text-muted-foreground">oklch(15% 0.05 243) · Pressed state on brand-primary elements. Slightly darker than base.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-hover</code>
              <span className="type-caption text-muted-foreground">oklch(76% 0.185 91) · Hover state on brand-accent elements. Darker maize.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-pressed</code>
              <span className="type-caption text-muted-foreground">oklch(70% 0.185 91) · Pressed state on brand-accent elements. Even darker maize.</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-focus-ring</code>
              <span className="type-caption text-muted-foreground">--primitive-michigan-maize · Keyboard focus indicator. Use as a dual-ring: maize outer ring + 4px dark offset ring (--color-brand-primary). The maize ring provides contrast on dark surfaces; the offset ring provides contrast on white/light surfaces.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <ColorSwatchGrid>
        <ColorSwatch token="--color-brand-primary-hover"   label="Brand Primary Hover" />
        <ColorSwatch token="--color-brand-primary-pressed" label="Brand Primary Pressed" />
        <ColorSwatch token="--color-brand-accent-hover"    label="Brand Accent Hover" />
        <ColorSwatch token="--color-brand-accent-pressed"  label="Brand Accent Pressed" />
        <ColorSwatch token="--color-focus-ring"            label="Focus Ring" />
      </ColorSwatchGrid>

      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">Focus ring implementation pattern:</strong>
      </p>

      <CodeBlock code={`/* Applied to buttons and clickable elements */
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--color-brand-primary);
}`} lang="css" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">outline</code>{' '}
        (maize) provides contrast against dark backgrounds. The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">box-shadow</code>{' '}
        (navy) provides contrast against white/light backgrounds. Both must be present.
        Do not apply one without the other.
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="!font-semibold text-foreground">Exception — Form controls:</strong>{' '}
        Inputs, textareas, selects, and toggle controls use a simpler focus pattern:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">outline: none</code>{' '}
        +{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-color: var(--color-brand-primary)</code>.
        The border color change is sufficient for elements that already have a visible border.
      </p>

      <Alert variant="info" title="Interim — Neutral interactive states" className="my-4">
        <p>
          Interactive tokens currently cover brand-primary and brand-accent elements only.
          For neutral/gray elements (secondary buttons, ghost buttons, form inputs), use{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code>{' '}
          as hover background and{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border-strong</code>{' '}
          as hover border as an interim convention. This guidance will be superseded when
          dedicated neutral interactive tokens are defined.
        </p>
      </Alert>

      {/* ── Overlay ─────────────────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Overlay</h2>

      <div className="my-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-overlay</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(0% 0 0 / 40%)</code></TableCell>
                <TableCell>Scrim behind modals and drawers. Dims the page without fully obscuring it.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-overlay</code>
              <span className="type-caption text-muted-foreground">oklch(0% 0 0 / 40%) · Scrim behind modals and drawers. Dims the page without fully obscuring it.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <ColorSwatchGrid>
        <ColorSwatch token="--color-overlay" label="Overlay" />
      </ColorSwatchGrid>

    </Container>
  )
}
