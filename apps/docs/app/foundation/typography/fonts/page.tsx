import { Container } from '@umichkisa-ds/web'
export default function TypographyFontsPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">The Two Fonts</h1>
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

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Weight</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Class</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Use</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Light 300</td>
              <td className="px-4 py-3 type-body-sm text-foreground">
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-light</code>
              </td>
              <td className="px-4 py-3 type-body-sm text-foreground">Decorative display, large pull quotes</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Bold 700</td>
              <td className="px-4 py-3 type-body-sm text-foreground">
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code>
              </td>
              <td className="px-4 py-3 type-body-sm text-foreground">Default for all Display and H1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        In practice, always reach for Bold. Light is permitted only in marketing and landing
        page contexts for large decorative display text — for example, a hero subtitle set at{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-4xl</code>{' '}
        or larger, paired alongside a Bold display line. Never use Light in app UI. Never use
        it below{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-4xl</code>.
        If you are unsure, use Bold.
      </p>

      {/* ── Fallback stack ──────────────────────────────────── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Fallback stack</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If SejongHospital fails to load, the browser falls back to:
      </p>

      <pre className="overflow-x-auto max-w-full rounded-lg bg-surface-muted p-4 my-4">
        <code className="type-caption font-mono text-foreground">{`'SejongHospital', system-ui, -apple-system, sans-serif`}</code>
      </pre>

      <p className="type-body mb-4 text-foreground max-w-prose">
        There is no equivalent decorative fallback — the heading degrades gracefully to a
        system sans-serif. This is acceptable because SejongHospital appears only at the top
        of the hierarchy where brand presence matters, and the layout is designed to hold at
        any weight.
      </p>

      {/* ── SejongHospital specimen ─────────────────────────── */}
      <div className="my-8 rounded-xl border border-border overflow-hidden">
        <div className="bg-[#00274c] px-8 py-10">
          <p className="text-5xl font-sejong-bold text-[#ffcb05]">University of Michigan</p>
          <p className="mt-3 text-2xl font-sejong-light text-[#e8f0f7] opacity-70">Korean International Students Association</p>
        </div>
        <div className="bg-surface-subtle px-8 py-4 flex gap-8">
          <span className="text-xs text-muted-foreground font-mono">Bold 700 — font-sejong-bold</span>
          <span className="text-xs text-muted-foreground font-mono">Light 300 — font-sejong-light</span>
        </div>
      </div>

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

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Weight</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind class</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Use</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Regular 400</td>
              <td className="px-4 py-3 type-body-sm text-foreground">
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code>
              </td>
              <td className="px-4 py-3 type-body-sm text-foreground">Body text, captions</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Medium 500</td>
              <td className="px-4 py-3 type-body-sm text-foreground">
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-medium</code>
              </td>
              <td className="px-4 py-3 type-body-sm text-foreground">Labels, navigation items</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Semibold 600</td>
              <td className="px-4 py-3 type-body-sm text-foreground">
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-semibold</code>
              </td>
              <td className="px-4 py-3 type-body-sm text-foreground">H2, H3, emphasized text</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Pretendard fallback stack ──────────────────────── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Fallback stack</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        If Pretendard fails to load, the browser falls back to:
      </p>

      <pre className="overflow-x-auto max-w-full rounded-lg bg-surface-muted p-4 my-4">
        <code className="type-caption font-mono text-foreground">{`'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, -apple-system, sans-serif`}</code>
      </pre>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The Korean-capable fallbacks ({' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Apple SD Gothic Neo</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Noto Sans KR</code>{' '}
        ) ensure Korean text remains readable on systems where Pretendard is unavailable.
      </p>

      {/* ── Pretendard specimen ─────────────────────────────── */}
      <div className="my-8 rounded-xl border border-border overflow-hidden">
        <div className="bg-surface px-8 py-8 space-y-4">
          <p className="text-3xl font-pretendard font-semibold text-foreground">Section Heading — Semibold 600</p>
          <p className="text-base font-pretendard font-normal text-foreground leading-relaxed">Body text — Regular 400. The quick brown fox jumps over the lazy dog. Pretendard reads cleanly at every size from caption to heading.</p>
          <p className="text-sm font-pretendard font-medium text-muted-foreground">Label or navigation item — Medium 500</p>
          <p className="text-xs font-pretendard font-normal text-muted-foreground">Caption text — Regular 400</p>
        </div>
        <div className="bg-surface-subtle px-8 py-4">
          <span className="text-xs text-muted-foreground font-mono">font-pretendard — weights 400 · 500 · 600</span>
        </div>
      </div>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Geist Mono ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Geist Mono — Code &amp; Documentation</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Geist Mono is the third font in the system, but it sits outside the Rule of Two. It
        appears exclusively in this documentation site for code blocks and inline code. The
        client application does not use it.
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Weight</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind class</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Use</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Regular 400</td>
              <td className="px-4 py-3 type-body-sm text-foreground">
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code>
              </td>
              <td className="px-4 py-3 type-body-sm text-foreground">All code contexts</td>
            </tr>
          </tbody>
        </table>
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

    </Container>
  )
}
