import { Alert, Container, Divider, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'
export default function TypographyScalePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Type Scale</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Each role in the hierarchy is defined as a single semantic utility class. Rather than
        composing raw Tailwind utilities every time, you apply one class —{' '}
        <InlineCode>type-body</InlineCode>,{' '}
        <InlineCode>type-label</InlineCode>,{' '}
        <InlineCode>type-h2</InlineCode>{' '}
        — and the size, weight, line height, and font family all come with it.
      </p>

      {/* ── Scale specimen ─────────────────────────────────── */}
      <div className="my-6 rounded-xl border border-border overflow-hidden">
        <div className="bg-surface px-6 py-6 space-y-6">
          <div>
            <p className="type-display text-foreground">Display</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-display</p>
          </div>
          <div>
            <p className="type-h1 text-foreground">Heading 1</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-h1</p>
          </div>
          <div>
            <p className="type-h2 text-foreground">Heading 2</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-h2</p>
          </div>
          <div>
            <p className="type-h3 text-foreground">Heading 3</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-h3</p>
          </div>
          <div>
            <p className="type-body text-foreground">Body — the default for all paragraph text and long-form content.</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-body</p>
          </div>
          <div>
            <p className="type-body-sm text-foreground">Body SM — secondary text, dense layouts, supporting information.</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-body-sm</p>
          </div>
          <div>
            <p className="type-label text-foreground">Label — buttons, navigation, form labels.</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-label</p>
          </div>
          <div>
            <p className="type-caption text-muted-foreground">Caption — timestamps, metadata, helper text.</p>
            <p className="mt-1 type-caption text-muted-foreground font-mono">type-caption</p>
          </div>
        </div>
      </div>

      {/* ── Scale reference table ──────────────────────────── */}
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Font</TableHead>
                <TableHead>Tailwind</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Line height</TableHead>
                <TableHead>Tracking</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>type-display</InlineCode></TableCell>
                <TableCell><InlineCode>font-sejong-bold</InlineCode></TableCell>
                <TableCell><InlineCode>text-5xl</InlineCode></TableCell>
                <TableCell>3rem / 48px</TableCell>
                <TableCell>—</TableCell>
                <TableCell>1.25</TableCell>
                <TableCell><InlineCode>tracking-tight</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-h1</InlineCode></TableCell>
                <TableCell><InlineCode>font-sejong-bold</InlineCode></TableCell>
                <TableCell><InlineCode>text-4xl</InlineCode></TableCell>
                <TableCell>2.25rem / 36px</TableCell>
                <TableCell>—</TableCell>
                <TableCell>1.25</TableCell>
                <TableCell><InlineCode>tracking-tight</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-h2</InlineCode></TableCell>
                <TableCell><InlineCode>font-pretendard</InlineCode></TableCell>
                <TableCell><InlineCode>text-2xl</InlineCode></TableCell>
                <TableCell>1.5rem / 24px</TableCell>
                <TableCell><InlineCode>font-semibold</InlineCode></TableCell>
                <TableCell>1.375</TableCell>
                <TableCell><InlineCode>tracking-normal</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-h3</InlineCode></TableCell>
                <TableCell><InlineCode>font-pretendard</InlineCode></TableCell>
                <TableCell><InlineCode>text-xl</InlineCode></TableCell>
                <TableCell>1.25rem / 20px</TableCell>
                <TableCell><InlineCode>font-semibold</InlineCode></TableCell>
                <TableCell>1.375</TableCell>
                <TableCell><InlineCode>tracking-normal</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-body</InlineCode></TableCell>
                <TableCell><InlineCode>font-pretendard</InlineCode></TableCell>
                <TableCell><InlineCode>text-base</InlineCode></TableCell>
                <TableCell>1rem / 16px</TableCell>
                <TableCell><InlineCode>font-normal</InlineCode></TableCell>
                <TableCell>1.625</TableCell>
                <TableCell><InlineCode>tracking-normal</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-body-sm</InlineCode></TableCell>
                <TableCell><InlineCode>font-pretendard</InlineCode></TableCell>
                <TableCell><InlineCode>text-sm</InlineCode></TableCell>
                <TableCell>0.875rem / 14px</TableCell>
                <TableCell><InlineCode>font-normal</InlineCode></TableCell>
                <TableCell>1.5</TableCell>
                <TableCell><InlineCode>tracking-normal</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-label</InlineCode></TableCell>
                <TableCell><InlineCode>font-pretendard</InlineCode></TableCell>
                <TableCell><InlineCode>text-sm</InlineCode></TableCell>
                <TableCell>0.875rem / 14px</TableCell>
                <TableCell><InlineCode>font-medium</InlineCode></TableCell>
                <TableCell>1.5</TableCell>
                <TableCell><InlineCode>tracking-normal</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-caption</InlineCode></TableCell>
                <TableCell><InlineCode>font-pretendard</InlineCode></TableCell>
                <TableCell><InlineCode>text-xs</InlineCode></TableCell>
                <TableCell>0.75rem / 12px</TableCell>
                <TableCell><InlineCode>font-normal</InlineCode></TableCell>
                <TableCell>1.5</TableCell>
                <TableCell><InlineCode>tracking-normal</InlineCode></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>type-display</InlineCode>
              <span className="type-caption text-muted-foreground">font-sejong-bold · 3rem / 48px · Line height 1.25 · tracking-tight</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-h1</InlineCode>
              <span className="type-caption text-muted-foreground">font-sejong-bold · 2.25rem / 36px · Line height 1.25 · tracking-tight</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-h2</InlineCode>
              <span className="type-caption text-muted-foreground">font-pretendard · 1.5rem / 24px · Line height 1.375 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-h3</InlineCode>
              <span className="type-caption text-muted-foreground">font-pretendard · 1.25rem / 20px · Line height 1.375 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-body</InlineCode>
              <span className="type-caption text-muted-foreground">font-pretendard · 1rem / 16px · Line height 1.625 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-body-sm</InlineCode>
              <span className="type-caption text-muted-foreground">font-pretendard · 0.875rem / 14px · Line height 1.5 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-label</InlineCode>
              <span className="type-caption text-muted-foreground">font-pretendard · 0.875rem / 14px · Line height 1.5 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-caption</InlineCode>
              <span className="type-caption text-muted-foreground">font-pretendard · 0.75rem / 12px · Line height 1.5 · tracking-normal</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── Notes ──────────────────────────────────────────── */}
      <Alert variant="info" title="Display vs H1" className="my-4">
        <p>
          Both use SejongHospital Bold. The distinction is context, not style —
          Display is for hero sections and landing pages, H1 is for page titles
          within the app. Never apply both{' '}
          <InlineCode>type-display</InlineCode>{' '}
          and{' '}
          <InlineCode>type-h1</InlineCode>{' '}
          styling on the same page. If a page has a Display hero and requires a
          semantic{' '}
          <InlineCode>&lt;h1&gt;</InlineCode>{' '}
          element for accessibility, apply{' '}
          <InlineCode>type-h2</InlineCode>{' '}
          styling to the{' '}
          <InlineCode>&lt;h1&gt;</InlineCode>{' '}
          — the visual hierarchy takes precedence over the class name.
        </p>
      </Alert>

      <Alert variant="info" title="Body SM vs Label" className="my-4">
        <p>
          Same size, different weight. Body SM ({' '}
          <InlineCode>font-normal</InlineCode>{' '}
          ) is for reading. Label ({' '}
          <InlineCode>font-medium</InlineCode>{' '}
          ) is for interacting. The extra weight signals that something is actionable.
        </p>
      </Alert>

      <Divider className="my-8" />

      {/* ── Responsive Behavior ────────────────────────────── */}
      <Heading as="h2" className="mt-6">Responsive Behavior</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <InlineCode>type-body</InlineCode>,{' '}
        <InlineCode>type-body-sm</InlineCode>,{' '}
        <InlineCode>type-label</InlineCode>,
        and{' '}
        <InlineCode>type-caption</InlineCode>{' '}
        are fixed — they are already readable at all viewport sizes.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Display-level and heading classes scale across the three layout tiers defined in the
        layout system ({' '}
        <InlineCode>default</InlineCode>{' '}
        →{' '}
        <InlineCode>md:</InlineCode>{' '}
        →{' '}
        <InlineCode>lg:</InlineCode>):
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Mobile (default)</TableHead>
                <TableHead>Tablet <InlineCode>md:</InlineCode></TableHead>
                <TableHead>Desktop <InlineCode>lg:</InlineCode></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>type-display</InlineCode></TableCell>
                <TableCell>2rem / 32px</TableCell>
                <TableCell>2.5rem / 40px</TableCell>
                <TableCell>3rem / 48px</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-h1</InlineCode></TableCell>
                <TableCell>1.75rem / 28px</TableCell>
                <TableCell>2rem / 32px</TableCell>
                <TableCell>2.25rem / 36px</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-h2</InlineCode></TableCell>
                <TableCell>1.25rem / 20px</TableCell>
                <TableCell>1.375rem / 22px</TableCell>
                <TableCell>1.5rem / 24px</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>type-h3</InlineCode></TableCell>
                <TableCell>1.125rem / 18px</TableCell>
                <TableCell>1.25rem / 20px</TableCell>
                <TableCell>1.25rem / 20px</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>type-display</InlineCode>
              <span className="type-caption text-muted-foreground">Mobile: 2rem / 32px · Tablet: 2.5rem / 40px · Desktop: 3rem / 48px</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-h1</InlineCode>
              <span className="type-caption text-muted-foreground">Mobile: 1.75rem / 28px · Tablet: 2rem / 32px · Desktop: 2.25rem / 36px</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-h2</InlineCode>
              <span className="type-caption text-muted-foreground">Mobile: 1.25rem / 20px · Tablet: 1.375rem / 22px · Desktop: 1.5rem / 24px</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>type-h3</InlineCode>
              <span className="type-caption text-muted-foreground">Mobile: 1.125rem / 18px · Tablet: 1.25rem / 20px · Desktop: 1.25rem / 20px</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Responsive scaling is baked into the{' '}
        <InlineCode>type-*</InlineCode>{' '}
        class definitions. Components do not need to apply breakpoint overrides — reaching for{' '}
        <InlineCode>type-display</InlineCode>{' '}
        on any viewport automatically applies the correct size. The Tailwind column
        in the scale reference table above shows the equivalent font-size token for
        developer reference only — the actual values come from responsive{' '}
        <InlineCode>@media</InlineCode>{' '}
        overrides inside each class definition.
      </p>

      <Alert variant="warning" className="my-4">
        <p>
          Avoid{' '}
          <InlineCode>sm:</InlineCode>,{' '}
          <InlineCode>xl:</InlineCode>,
          or{' '}
          <InlineCode>2xl:</InlineCode>{' '}
          for typography overrides. The layout system operates on three tiers only.
          See{' '}
          <a href="/foundation/layout/breakpoints" className="text-link underline underline-offset-2 hover:text-brand-primary">Breakpoints</a>{' '}
          for the full breakpoint policy.
        </p>
      </Alert>

    </Container>
  )
}
