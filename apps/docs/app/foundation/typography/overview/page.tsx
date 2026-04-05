import { Container, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@umichkisa-ds/web'
export default function TypographyOverviewPage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Typography</h1>
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

      <div className="my-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Font</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Where it appears</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>SejongHospital Bold</TableCell>
              <TableCell>Brand & Display</TableCell>
              <TableCell>Display, H1 only</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pretendard</TableCell>
              <TableCell>Body, UI & Everything Else</TableCell>
              <TableCell>H2 and below, all body text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Geist Mono</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>This documentation site only</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </Container>
  )
}
