import { Alert, Container, Divider, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { ColorSwatch } from '@/components/ColorSwatch'
import { ColorSwatchGrid } from '@/components/ColorSwatchGrid'
import { CodeBlock } from '@/components/CodeBlock'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

export default async function ColorsTokensPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Semantic Token Reference</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Semantic tokens are what you use in components. Each token is named by its
        purpose. Find them in{' '}
        <InlineCode>packages/web/src/tokens/semantic.css</InlineCode>.
      </p>

      {/* ── Brand ───────────────────────────────────────────── */}
      <Heading as="h2" className="mt-6 mb-2">Brand</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The Michigan brand colors. These define the visual identity of KISA across
        every surface.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-brand-primary</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-michigan-blue</InlineCode></TableCell>
                <TableCell>Anchor color. Navbars, hero sections, primary button backgrounds.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-primary-mid</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-michigan-blue-mid</InlineCode></TableCell>
                <TableCell>Softer blue. Link text, secondary UI highlights. Use cases will grow over time.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-accent</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-michigan-maize</InlineCode></TableCell>
                <TableCell>Action color. CTAs, focus rings, text on brand backgrounds.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-accent-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-michigan-maize-light</InlineCode></TableCell>
                <TableCell>Light maize tint. Callout backgrounds, highlighted regions.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-brand-primary</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-michigan-blue · Anchor color. Navbars, hero sections, primary button backgrounds.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-primary-mid</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-michigan-blue-mid · Softer blue. Link text, secondary UI highlights. Use cases will grow over time.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-accent</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-michigan-maize · Action color. CTAs, focus rings, text on brand backgrounds.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-accent-subtle</InlineCode>
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
        <InlineCode>--color-brand-primary</InlineCode>{' '}
        is the anchor — it carries weight and authority. It does not draw the eye by itself.{' '}
        <InlineCode>--color-brand-accent</InlineCode>{' '}
        is the signal — it is what users notice first. When you need to say {'"'}look here,{'"'} reach
        for accent. When you need to say {'"'}this is KISA,{'"'} reach for primary.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">On brand-primary-mid:</strong> This is a softer,
        more readable blue designed for contexts where full navy would be too heavy. Its primary use
        today is link text. Additional use cases will be documented here as they are established.
      </p>

      <Divider className="my-8" />

      {/* ── Understanding -subtle and -muted ────────────────── */}
      <Heading as="h2" className="mt-6 mb-2">Understanding <InlineCode>-subtle</InlineCode> and <InlineCode>-muted</InlineCode></Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Two suffixes appear across multiple token groups —{' '}
        <InlineCode>-subtle</InlineCode> and{' '}
        <InlineCode>-muted</InlineCode>.
        They do not mean the same thing and are not interchangeable.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground"><InlineCode>-subtle</InlineCode></strong>{' '}
        means one step softer in visual weight. It creates a tinted region without drawing attention.
        Used for elevated inner surfaces like table headers and code blocks (
        <InlineCode>--color-surface-subtle</InlineCode>),
        alert box fills (
        <InlineCode>--color-error-subtle</InlineCode>),
        and similar containers.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground"><InlineCode>-muted</InlineCode></strong>{' '}
        means reduced visual prominence — not necessarily darker.{' '}
        <InlineCode>--color-surface-muted</InlineCode>{' '}
        is <em>lighter</em> than{' '}
        <InlineCode>--color-surface-subtle</InlineCode>{' '}
        because it is designed to sit <em>inside</em> a subtle surface and appear elevated.{' '}
        <InlineCode>--color-muted-foreground</InlineCode>{' '}
        is lower contrast than{' '}
        <InlineCode>--color-foreground</InlineCode>{' '}
        because it carries supporting, not primary, information.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The key rule: a{' '}
        <InlineCode>-muted</InlineCode>{' '}
        value always serves a deprioritized role. A{' '}
        <InlineCode>-subtle</InlineCode>{' '}
        value always serves a container or background role.
      </p>

      <Divider className="my-8" />

      {/* ── Surface ─────────────────────────────────────────── */}
      <Heading as="h2" className="mt-6 mb-2">Surface</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Background colors that define the depth layers of the UI. Think of them as
        elevation — the higher you stack an element, the more tinted its background.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-surface</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-white</InlineCode></TableCell>
                <TableCell>Page background. The base layer everything sits on.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-surface-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-gray-100</InlineCode></TableCell>
                <TableCell>Elevated inner surfaces — table headers, code blocks, inset sections.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-surface-muted</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-gray-50</InlineCode></TableCell>
                <TableCell>Items inside cards. Sits lighter inside a darker card.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-surface</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-white · Page background. The base layer everything sits on.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-surface-subtle</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-gray-100 · Elevated inner surfaces — table headers, code blocks, inset sections.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-surface-muted</InlineCode>
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
      <Heading as="h2" className="mt-6 mb-2">Border</Heading>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-border</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-gray-200</InlineCode></TableCell>
                <TableCell>Default dividers, input field outlines.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-border-strong</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-gray-300</InlineCode></TableCell>
                <TableCell>Emphasized borders, active input states.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-border</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-gray-200 · Default dividers, input field outlines.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-border-strong</InlineCode>
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
      <Heading as="h2" className="mt-6 mb-2">Text</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Text tokens cover every role in the typographic hierarchy, plus two special
        cases for colored surfaces.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-foreground</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-gray-900</InlineCode></TableCell>
                <TableCell>Body text, headings. Default for all readable content.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-muted-foreground</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-gray-500</InlineCode></TableCell>
                <TableCell>Captions, secondary labels, timestamps.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-disabled-foreground</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-gray-400</InlineCode></TableCell>
                <TableCell>Disabled state text. Intentionally low contrast — do not use for readable content.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-foreground</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-michigan-maize</InlineCode></TableCell>
                <TableCell>Text sitting on <InlineCode>--color-brand-primary</InlineCode> backgrounds (navbars, hero sections, primary buttons).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-link</InlineCode></TableCell>
                <TableCell><InlineCode>--color-brand-primary-mid</InlineCode></TableCell>
                <TableCell>Hyperlinks and inline clickable text.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-foreground</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-gray-900 · Body text, headings. Default for all readable content.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-muted-foreground</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-gray-500 · Captions, secondary labels, timestamps.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-disabled-foreground</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-gray-400 · Disabled state text. Intentionally low contrast — do not use for readable content.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-foreground</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-michigan-maize · Text sitting on --color-brand-primary backgrounds (navbars, hero sections, primary buttons).</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-link</InlineCode>
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
      <Heading as="h2" className="mt-6 mb-2">Feedback</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Feedback colors communicate system states. Each state has two tokens: a solid
        color for icons, borders, and text labels, and a subtle tint for background
        surfaces like alert boxes.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Maps to</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-error</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-red-500</InlineCode></TableCell>
                <TableCell>Error state. Form validation failures, destructive action warnings.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-error-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>oklch(97% 0.02 27)</InlineCode></TableCell>
                <TableCell>Background for error alert boxes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-success</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-green-500</InlineCode></TableCell>
                <TableCell>Success state. Confirmations, completed actions.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-success-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>oklch(97% 0.02 145)</InlineCode></TableCell>
                <TableCell>Background for success alert boxes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-warning</InlineCode></TableCell>
                <TableCell><InlineCode>oklch(72% 0.15 60)</InlineCode></TableCell>
                <TableCell>Warning state. Non-blocking issues that need attention.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-warning-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>oklch(97% 0.02 60)</InlineCode></TableCell>
                <TableCell>Background for warning alert boxes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-info</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-michigan-blue-mid</InlineCode></TableCell>
                <TableCell>Informational state. Neutral tips, contextual help.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-info-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-michigan-blue-light</InlineCode></TableCell>
                <TableCell>Background for info alert boxes.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-error</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-red-500 · Error state. Form validation failures, destructive action warnings.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-error-subtle</InlineCode>
              <span className="type-caption text-muted-foreground">oklch(97% 0.02 27) · Background for error alert boxes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-success</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-green-500 · Success state. Confirmations, completed actions.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-success-subtle</InlineCode>
              <span className="type-caption text-muted-foreground">oklch(97% 0.02 145) · Background for success alert boxes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-warning</InlineCode>
              <span className="type-caption text-muted-foreground">oklch(72% 0.15 60) · Warning state. Non-blocking issues that need attention.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-warning-subtle</InlineCode>
              <span className="type-caption text-muted-foreground">oklch(97% 0.02 60) · Background for warning alert boxes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-info</InlineCode>
              <span className="type-caption text-muted-foreground">--primitive-michigan-blue-mid · Informational state. Neutral tips, contextual help.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-info-subtle</InlineCode>
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
          <InlineCode>--primitive-michigan-blue-mid</InlineCode>{' '}
          — the same rendered color. This is intentional: blue reads as both informational and
          interactive in this system. Do not use them interchangeably. Use the token that matches
          the semantic role:{' '}
          <InlineCode>--color-info</InlineCode>{' '}
          for state indicators and alert borders,{' '}
          <InlineCode>--color-link</InlineCode>{' '}
          for clickable inline text.
        </p>
      </Alert>

      {/* ── Interactive ─────────────────────────────────────── */}
      <Heading as="h2" className="mt-6 mb-2">Interactive</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Tokens for the hover and pressed states of both brand colors, plus the focus
        ring shown when navigating with a keyboard.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        For{' '}
        <InlineCode>--color-brand-primary</InlineCode>{' '}
        (dark navy), hover goes lighter. For{' '}
        <InlineCode>--color-brand-accent</InlineCode>{' '}
        (maize), hover goes darker — because maize is already very bright, darkening it is
        the only way to show a visible state change.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-brand-primary-hover</InlineCode></TableCell>
                <TableCell><InlineCode>oklch(25% 0.075 243)</InlineCode></TableCell>
                <TableCell>Hover state on brand-primary elements. Slightly lighter than base.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-primary-pressed</InlineCode></TableCell>
                <TableCell><InlineCode>oklch(15% 0.05 243)</InlineCode></TableCell>
                <TableCell>Pressed state on brand-primary elements. Slightly darker than base.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-accent-hover</InlineCode></TableCell>
                <TableCell><InlineCode>oklch(76% 0.185 91)</InlineCode></TableCell>
                <TableCell>Hover state on brand-accent elements. Darker maize.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-accent-pressed</InlineCode></TableCell>
                <TableCell><InlineCode>oklch(70% 0.185 91)</InlineCode></TableCell>
                <TableCell>Pressed state on brand-accent elements. Even darker maize.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-focus-ring</InlineCode></TableCell>
                <TableCell><InlineCode>--primitive-michigan-maize</InlineCode></TableCell>
                <TableCell>Keyboard focus indicator. Use as a dual-ring: maize outer ring + 4px dark offset ring (<InlineCode>--color-brand-primary</InlineCode>). The maize ring provides contrast on dark surfaces; the offset ring provides contrast on white/light surfaces.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-brand-primary-hover</InlineCode>
              <span className="type-caption text-muted-foreground">oklch(25% 0.075 243) · Hover state on brand-primary elements. Slightly lighter than base.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-primary-pressed</InlineCode>
              <span className="type-caption text-muted-foreground">oklch(15% 0.05 243) · Pressed state on brand-primary elements. Slightly darker than base.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-accent-hover</InlineCode>
              <span className="type-caption text-muted-foreground">oklch(76% 0.185 91) · Hover state on brand-accent elements. Darker maize.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-accent-pressed</InlineCode>
              <span className="type-caption text-muted-foreground">oklch(70% 0.185 91) · Pressed state on brand-accent elements. Even darker maize.</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-focus-ring</InlineCode>
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
        <InlineCode>outline</InlineCode>{' '}
        (maize) provides contrast against dark backgrounds. The{' '}
        <InlineCode>box-shadow</InlineCode>{' '}
        (navy) provides contrast against white/light backgrounds. Both must be present.
        Do not apply one without the other.
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="!font-semibold text-foreground">Exception — Form controls:</strong>{' '}
        Inputs, textareas, selects, and toggle controls use a simpler focus pattern:{' '}
        <InlineCode>outline: none</InlineCode>{' '}
        +{' '}
        <InlineCode>border-color: var(--color-brand-primary)</InlineCode>.
        The border color change is sufficient for elements that already have a visible border.
      </p>

      <Alert variant="info" title="Interim — Neutral interactive states" className="my-4">
        <p>
          Interactive tokens currently cover brand-primary and brand-accent elements only.
          For neutral/gray elements (secondary buttons, ghost buttons, form inputs), use{' '}
          <InlineCode>--color-surface-subtle</InlineCode>{' '}
          as hover background and{' '}
          <InlineCode>--color-border-strong</InlineCode>{' '}
          as hover border as an interim convention. This guidance will be superseded when
          dedicated neutral interactive tokens are defined.
        </p>
      </Alert>

      {/* ── Overlay ─────────────────────────────────────────── */}
      <Heading as="h2" className="mt-6 mb-2">Overlay</Heading>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-overlay</InlineCode></TableCell>
                <TableCell><InlineCode>oklch(0% 0 0 / 40%)</InlineCode></TableCell>
                <TableCell>Scrim behind modals and drawers. Dims the page without fully obscuring it.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-overlay</InlineCode>
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
