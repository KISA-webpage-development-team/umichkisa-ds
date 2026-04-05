import { Alert, Container } from '@umichkisa-ds/web'
import { ColorSwatch } from '@/components/ColorSwatch'
import { ColorSwatchGrid } from '@/components/ColorSwatchGrid'

export default function ColorsPrimitivesPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Primitive Palette</h1>

      <p className="type-body mb-4 text-foreground max-w-prose">
        These are the raw colors the entire system is built from. They are defined in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">packages/web/src/tokens/primitives.css</code>.
        Do not use these in components — they exist only to feed into semantic tokens.
      </p>

      {/* ── Michigan Brand ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Michigan Brand</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The two official University of Michigan brand colors and their tints.
      </p>

      <ColorSwatchGrid>
        <ColorSwatch token="--primitive-michigan-blue"        value="oklch(19% 0.061 243)" hex="#00274c" label="Michigan Blue" />
        <ColorSwatch token="--primitive-michigan-blue-mid"    value="oklch(32% 0.09 243)"  hex="#00568a" label="Michigan Blue Mid" />
        <ColorSwatch token="--primitive-michigan-blue-light"  value="oklch(94% 0.018 243)" hex="#e8f0f7" label="Michigan Blue Light" />
        <ColorSwatch token="--primitive-michigan-maize"       value="oklch(83% 0.185 91)"  hex="#ffcb05" label="Michigan Maize" />
        <ColorSwatch token="--primitive-michigan-maize-light" value="oklch(93% 0.1 91)"    hex="#ffe98a" label="Michigan Maize Light" />
      </ColorSwatchGrid>

      {/* ── Gray Scale ──────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Gray Scale</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A cool-toned neutral scale with a subtle blue-gray cast (hue 264) that keeps
        it visually harmonious with the Michigan Blue family.
      </p>

      <ColorSwatchGrid>
        <ColorSwatch token="--primitive-gray-50"  value="oklch(98% 0.002 264)" label="Gray 50" />
        <ColorSwatch token="--primitive-gray-100" value="oklch(96% 0.003 264)" label="Gray 100" />
        <ColorSwatch token="--primitive-gray-200" value="oklch(92% 0.004 264)" label="Gray 200" />
        <ColorSwatch token="--primitive-gray-300" value="oklch(87% 0.006 264)" label="Gray 300" />
        <ColorSwatch token="--primitive-gray-400" value="oklch(73% 0.01 264)"  label="Gray 400" />
        <ColorSwatch token="--primitive-gray-500" value="oklch(60% 0.012 264)" label="Gray 500" />
        <ColorSwatch token="--primitive-gray-600" value="oklch(50% 0.013 264)" label="Gray 600" />
        <ColorSwatch token="--primitive-gray-700" value="oklch(40% 0.014 264)" label="Gray 700" />
        <ColorSwatch token="--primitive-gray-800" value="oklch(28% 0.015 264)" label="Gray 800" />
        <ColorSwatch token="--primitive-gray-900" value="oklch(17% 0.016 264)" label="Gray 900" />
      </ColorSwatchGrid>

      {/* ── Utility ─────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Utility</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Base colors for feedback states and neutral anchors.
      </p>

      <Alert variant="info" title="On hex values" className="mb-4">
        Michigan brand colors show exact hex values from the official UMich brand guidelines.
        Utility colors (red, green) have no canonical hex — OKLCH is the authoritative definition.
        Inspect the browser to get the rendered value.
      </Alert>

      <ColorSwatchGrid>
        <ColorSwatch token="--primitive-white"     value="oklch(100% 0 0)"      hex="#ffffff"  label="White" />
        <ColorSwatch token="--primitive-red-500"   value="oklch(58% 0.22 27)"  label="Red 500" />
        <ColorSwatch token="--primitive-green-500" value="oklch(64% 0.17 145)" label="Green 500" />
      </ColorSwatchGrid>

    </Container>
  )
}
