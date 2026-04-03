export default function TypographyOverviewPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 min-w-0 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">Typography</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Typography is the most read part of any interface. Users may not notice a well-chosen
        font — but they will notice when something feels off. Inconsistency in type is one of
        the fastest ways a product signals it was not built with intention.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The KISA type system follows the{' '}
        <strong className="font-semibold text-foreground">Rule of Two</strong>: one font for
        brand presence, one for readability. SejongHospital owns the top of the hierarchy —
        headings and display text where identity matters. Pretendard handles everything else.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use the sidebar to explore the fonts, the type scale, and the rules that keep the
        system consistent.
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Fonts at a Glance ──────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Fonts at a Glance</h2>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Font</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Where it appears</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">SejongHospital Bold</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Brand &amp; Display</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Display, H1 only</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Pretendard</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Body, UI &amp; Everything Else</td>
              <td className="px-4 py-3 type-body-sm text-foreground">H2 and below, all body text</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Geist Mono</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Code</td>
              <td className="px-4 py-3 type-body-sm text-foreground">This documentation site only</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        SejongHospital is the identity font — it appears only where KISA&#39;s brand presence
        matters most. Pretendard carries the rest of the interface. Geist Mono sits outside the
        Rule of Two entirely; it is a documentation tool, not a product font.
      </p>

    </article>
  )
}
