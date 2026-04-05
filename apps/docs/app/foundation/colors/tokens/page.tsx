import { Container } from '@umichkisa-ds/web'
import { ColorSwatch } from '@/components/ColorSwatch'
import { ColorSwatchGrid } from '@/components/ColorSwatchGrid'
import { CodeBlock } from '@/components/CodeBlock'

export default async function ColorsTokensPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Semantic Token Reference</h1>
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

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Maps to</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Anchor color. Navbars, hero sections, primary button backgrounds.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-mid</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue-mid</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Softer blue. Link text, secondary UI highlights. Use cases will grow over time.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-maize</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Action color. CTAs, focus rings, text on brand backgrounds.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-maize-light</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Light maize tint. Callout backgrounds, highlighted regions.</td>
            </tr>
          </tbody>
        </table>
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

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Maps to</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-white</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Page background. The base layer everything sits on.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-100</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Cards and panels. One step above the page.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-muted</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-50</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Items inside cards. Sits lighter inside a darker card.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Note on naming:</strong>{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-muted</code>{' '}
          maps to{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gray-50</code>,
          which is <em>lighter</em> than{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code>{' '}
          (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">gray-100</code>).
          The name {'"'}muted{'"'} refers to reduced visual weight — not a darker value.
          A lighter background inside a darker card reads as elevated, not subdued.
          Do not invert this assumption.
        </span>
      </blockquote>

      <ColorSwatchGrid>
        <ColorSwatch token="--color-surface"        label="Surface" />
        <ColorSwatch token="--color-surface-subtle" label="Surface Subtle" />
        <ColorSwatch token="--color-surface-muted"  label="Surface Muted" />
      </ColorSwatchGrid>

      {/* ── Border ──────────────────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Border</h2>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Maps to</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-200</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Default dividers, input field outlines.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border-strong</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-300</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Emphasized borders, active input states.</td>
            </tr>
          </tbody>
        </table>
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

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Maps to</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-900</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Body text, headings. Default for all readable content.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-muted-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-500</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Captions, secondary labels, timestamps.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-disabled-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-gray-400</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Disabled state text. Intentionally low contrast — do not use for readable content.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-maize</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Text sitting on <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code> backgrounds (navbars, hero sections, primary buttons).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-link</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-mid</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Hyperlinks and inline clickable text.</td>
            </tr>
          </tbody>
        </table>
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

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Maps to</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-red-500</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Error state. Form validation failures, destructive action warnings.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(97% 0.02 27)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Background for error alert boxes.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-green-500</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Success state. Confirmations, completed actions.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(97% 0.02 145)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Background for success alert boxes.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(72% 0.15 60)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Warning state. Non-blocking issues that need attention.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(97% 0.02 60)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Background for warning alert boxes.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue-mid</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Informational state. Neutral tips, contextual help.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue-light</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Background for info alert boxes.</td>
            </tr>
          </tbody>
        </table>
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

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">On <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info</code> and <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-link</code>:</strong>{' '}
          Both resolve to{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-blue-mid</code>{' '}
          — the same rendered color. This is intentional: blue reads as both informational and
          interactive in this system. Do not use them interchangeably. Use the token that matches
          the semantic role:{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info</code>{' '}
          for state indicators and alert borders,{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-link</code>{' '}
          for clickable inline text.
        </span>
      </blockquote>

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

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Value</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-hover</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(25% 0.075 243)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Hover state on brand-primary elements. Slightly lighter than base.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-pressed</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(15% 0.05 243)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Pressed state on brand-primary elements. Slightly darker than base.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-hover</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(76% 0.185 91)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Hover state on brand-accent elements. Darker maize.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-pressed</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(70% 0.185 91)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Pressed state on brand-accent elements. Even darker maize.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-focus-ring</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--primitive-michigan-maize</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Keyboard focus indicator. Use as a dual-ring: maize outer ring + 4px dark offset ring (<code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>). The maize ring provides contrast on dark surfaces; the offset ring provides contrast on white/light surfaces.</td>
            </tr>
          </tbody>
        </table>
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

      <CodeBlock code={`/* Applied to every interactive element */
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

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Interim — Neutral interactive states:</strong>{' '}
          Interactive tokens currently cover brand-primary and brand-accent elements only.
          For neutral/gray elements (secondary buttons, ghost buttons, form inputs), use{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code>{' '}
          as hover background and{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border-strong</code>{' '}
          as hover border as an interim convention. This guidance will be superseded when
          dedicated neutral interactive tokens are defined.
        </span>
      </blockquote>

      {/* ── Overlay ─────────────────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-2 text-foreground">Overlay</h2>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Value</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-overlay</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">oklch(0% 0 0 / 40%)</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Scrim behind modals and drawers. Dims the page without fully obscuring it.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ColorSwatchGrid>
        <ColorSwatch token="--color-overlay" label="Overlay" />
      </ColorSwatchGrid>

    </Container>
  )
}
