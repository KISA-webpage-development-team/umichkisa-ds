import { Container, Card, CardContent, CardFooter, Alert, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
export default async function TypographyFontsPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">The Two Fonts</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The KISA type system is built on two product fonts — SejongHospital for brand presence,
        Pretendard for everything else — plus Geist Mono for code in this documentation site.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── SejongHospital ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">SejongHospital — Brand &amp; Display</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        SejongHospital is KISA&#39;s brand font. It appears only at the top of the type
        hierarchy — Display and H1 — where identity matters more than information density.
        Below H1, it hands off to Pretendard.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        It ships with two weights only:
      </p>

      {/* Desktop */}
      <div className="hidden md:block my-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Weight</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Use</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Light 300</TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-light</code></TableCell>
              <TableCell>Decorative display, large pull quotes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bold 700</TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code></TableCell>
              <TableCell>Default for all Display and H1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Mobile */}
      <div className="block md:hidden my-6">
        <TableMobileList>
          <TableMobileItem>
            <span className="type-caption text-muted-foreground">Weight</span>
            <span className="type-body-sm text-foreground">Light 300</span>
            <span className="type-caption text-muted-foreground">Class</span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-light</code>
            <span className="type-caption text-muted-foreground">Use</span>
            <span className="type-body-sm text-foreground">Decorative display, large pull quotes</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-caption text-muted-foreground">Weight</span>
            <span className="type-body-sm text-foreground">Bold 700</span>
            <span className="type-caption text-muted-foreground">Class</span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code>
            <span className="type-caption text-muted-foreground">Use</span>
            <span className="type-body-sm text-foreground">Default for all Display and H1</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        In practice, always reach for Bold. Light is permitted only in marketing and landing
        page contexts for large decorative display text — for example, a hero subtitle set at{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-4xl</code>{' '}
        or larger, paired alongside a Bold display line. Never use Light in app UI. Never use
        it below{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-4xl</code>.
      </p>

      {/* ── Fallback stack ──────────────────────────────────── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Fallback stack</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If SejongHospital fails to load, the browser falls back to:
      </p>

      <CodeBlock code={`'SejongHospital', system-ui, -apple-system, sans-serif`} lang="css" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        There is no equivalent decorative fallback — the heading degrades gracefully to a
        system sans-serif. This is acceptable because SejongHospital appears only at the top
        of the hierarchy where brand presence matters, and the layout is designed to hold at
        any weight.
      </p>

      {/* ── SejongHospital specimen ─────────────────────────── */}
      {/* Raw utilities: specimen demonstrating font appearance, not type scale */}
      <Card className="my-8 overflow-hidden">
        <CardContent className="-mx-4 -mt-4 bg-brand-primary p-4">
          <p className="text-3xl md:text-5xl font-sejong-bold text-brand-foreground">University of Michigan</p>
          <p className="mt-3 text-xl md:text-2xl font-sejong-light text-brand-foreground opacity-50">Korean International Students Association</p>
        </CardContent>
        <CardFooter>
          <span className="type-caption text-muted-foreground font-mono">Bold 700 — font-sejong-bold</span>
          <span className="type-caption text-muted-foreground font-mono">Light 300 — font-sejong-light</span>
        </CardFooter>
      </Card>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Pretendard ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Pretendard — Body, UI &amp; Everything Else</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Pretendard was built for Korean design systems. It supports Korean and Latin with
        equal fidelity and ships with nine weights (100–900), giving the flexibility
        SejongHospital cannot. Everything from H2 down uses Pretendard.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The three weights used in the type scale:
      </p>

      {/* Desktop */}
      <div className="hidden md:block my-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Weight</TableHead>
              <TableHead>Tailwind class</TableHead>
              <TableHead>Use</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Regular 400</TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></TableCell>
              <TableCell>Body text, captions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Medium 500</TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-medium</code></TableCell>
              <TableCell>Labels, navigation items</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Semibold 600</TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-semibold</code></TableCell>
              <TableCell>H2, H3, emphasized text</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Mobile */}
      <div className="block md:hidden my-6">
        <TableMobileList>
          <TableMobileItem>
            <span className="type-caption text-muted-foreground">Weight</span>
            <span className="type-body-sm text-foreground">Regular 400</span>
            <span className="type-caption text-muted-foreground">Tailwind class</span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code>
            <span className="type-caption text-muted-foreground">Use</span>
            <span className="type-body-sm text-foreground">Body text, captions</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-caption text-muted-foreground">Weight</span>
            <span className="type-body-sm text-foreground">Medium 500</span>
            <span className="type-caption text-muted-foreground">Tailwind class</span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-medium</code>
            <span className="type-caption text-muted-foreground">Use</span>
            <span className="type-body-sm text-foreground">Labels, navigation items</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-caption text-muted-foreground">Weight</span>
            <span className="type-body-sm text-foreground">Semibold 600</span>
            <span className="type-caption text-muted-foreground">Tailwind class</span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-semibold</code>
            <span className="type-caption text-muted-foreground">Use</span>
            <span className="type-body-sm text-foreground">H2, H3, emphasized text</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

      {/* ── Pretendard fallback stack ──────────────────────── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Fallback stack</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If Pretendard fails to load, the browser falls back to:
      </p>

      <CodeBlock code={`'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, -apple-system, sans-serif`} lang="css" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The Korean-capable fallbacks ({' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Apple SD Gothic Neo</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Noto Sans KR</code>{' '}
        ) ensure Korean text remains readable on systems where Pretendard is unavailable.
      </p>

      {/* ── Pretendard specimen ─────────────────────────────── */}
      {/* Raw utilities: specimen demonstrating font appearance, not type scale */}
      <Card className="my-8 overflow-hidden">
        <CardContent className="-mx-4 -mt-4 p-4 space-y-4">
          <p className="text-3xl font-pretendard font-semibold text-foreground">Section Heading — Semibold 600</p>
          <p className="text-base font-pretendard font-normal text-foreground leading-relaxed">Body text — Regular 400. The quick brown fox jumps over the lazy dog. Pretendard reads cleanly at every size from caption to heading.</p>
          <p className="text-base font-pretendard font-normal text-foreground leading-relaxed">본문 텍스트 — 미시간 대학교 한인학생회. 한국어와 영어를 동일한 품질로 지원합니다.</p>
          <p className="text-sm font-pretendard font-medium text-muted-foreground">Label or navigation item — Medium 500</p>
          <p className="text-xs font-pretendard font-normal text-muted-foreground">Caption text — Regular 400</p>
        </CardContent>
        <CardFooter>
          <span className="type-caption text-muted-foreground font-mono">font-pretendard — weights 400 · 500 · 600</span>
        </CardFooter>
      </Card>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Geist Mono ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Geist Mono — Code &amp; Documentation</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Geist Mono is the third font in the system, but it sits outside the Rule of Two. It
        appears exclusively in this documentation site for code blocks and inline code. The
        client application does not use it.
      </p>

      {/* Desktop */}
      <div className="hidden md:block my-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Weight</TableHead>
              <TableHead>Tailwind class</TableHead>
              <TableHead>Use</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Regular 400</TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></TableCell>
              <TableCell>All code contexts</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Mobile */}
      <div className="block md:hidden my-6">
        <TableMobileList>
          <TableMobileItem>
            <span className="type-caption text-muted-foreground">Weight</span>
            <span className="type-body-sm text-foreground">Regular 400</span>
            <span className="type-caption text-muted-foreground">Tailwind class</span>
            <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code>
            <span className="type-caption text-muted-foreground">Use</span>
            <span className="type-body-sm text-foreground">All code contexts</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Font Loading ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Font Loading</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Both product fonts must use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-display: swap</code>.
        This ensures text remains visible during font load — the browser renders with the
        fallback stack immediately, then swaps to the product font once it arrives. Without
        it, text is invisible until the font loads (FOIT), which harms perceived performance.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        SejongHospital must be preloaded. It appears in Display and H1 — above-the-fold
        content on most pages — so it should be fetched at the highest priority before the
        browser discovers it in CSS.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Pretendard does not require explicit preloading. It is used throughout the page, and
        the browser will prioritize it naturally once the stylesheet is parsed.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        These are implementation requirements, not component-level concerns. They are
        configured once at the font loading layer and apply globally.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Next.js Setup ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Next.js Setup</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Next.js apps should use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">next/font/local</code>{' '}
        for SejongHospital. This automatically preloads the font files, converts them
        to an optimized format, and injects CSS variables on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;html&gt;</code>{' '}
        that override the DS{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@font-face</code>{' '}
        declarations. Without this, the 1.2 MB TTF files load late and cause a visible
        flash of unstyled text on first visit.
      </p>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">1. Load fonts in root layout</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        In your{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">app/layout.tsx</code>,
        import the font files from the DS package and create font instances with
        matching CSS variable names:
      </p>

      <CodeBlock code={`import localFont from 'next/font/local'

const sejongBold = localFont({
  src: '<path-to>/Sejonghospital-Bold.ttf',
  variable: '--font-sejong-bold',
  display: 'swap',
})

const sejongLight = localFont({
  src: '<path-to>/Sejonghospital-Light.ttf',
  variable: '--font-sejong-light',
  display: 'swap',
})`} lang="tsx" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        The font files live in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">packages/web/src/fonts/</code>.
        Adjust the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">src</code>{' '}
        path based on your app&#39;s location relative to the monorepo root.
      </p>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">2. Apply CSS variables on html</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Pass the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">.variable</code>{' '}
        classes to the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;html&gt;</code>{' '}
        element so the CSS variables are available to all descendants:
      </p>

      <CodeBlock code={`<html lang="en" className={\`\${sejongBold.variable} \${sejongLight.variable}\`}>
  <body>
    {children}
  </body>
</html>`} lang="tsx" />

      <h3 className="type-h3 mt-6 mb-2 text-foreground">3. Load Pretendard from CDN</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Pretendard is loaded via a CDN stylesheet link in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;head&gt;</code>.
        Add a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">preconnect</code>{' '}
        hint to speed up the connection:
      </p>

      <CodeBlock code={`<head>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
  />
</head>`} lang="tsx" />

      <h3 className="type-h3 mt-6 mb-2 text-foreground">How it works</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The DS package already declares{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@font-face</code>{' '}
        rules and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">:root</code>{' '}
        CSS variables for all fonts. When you use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">next/font/local</code>{' '}
        with the same{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">variable</code>{' '}
        name (e.g.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--font-sejong-bold</code>
        ), Next.js generates a scoped class on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;html&gt;</code>{' '}
        that overrides the DS variable with the preloaded font. The rest of the system
        — type utilities, component styles — picks it up automatically.
      </p>

      <Alert className="my-4">
        Non-Next.js consumers can skip this step entirely. The DS{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@font-face</code>{' '}
        declarations work on their own — fonts will load via the standard CSS path. The
        trade-off is a brief flash of system font on first visit while the TTF files download.
      </Alert>

    </Container>
  )
}
