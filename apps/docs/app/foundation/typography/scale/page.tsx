import { Alert, Container, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
export default function TypographyScalePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Type Scale</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Each role in the hierarchy is defined as a single semantic utility class. Rather than
        composing raw Tailwind utilities every time, you apply one class —{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code>{' '}
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
          <Table>
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
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-5xl</code></TableCell>
                <TableCell>3rem / 48px</TableCell>
                <TableCell>—</TableCell>
                <TableCell>1.25</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-tight</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-4xl</code></TableCell>
                <TableCell>2.25rem / 36px</TableCell>
                <TableCell>—</TableCell>
                <TableCell>1.25</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-tight</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-2xl</code></TableCell>
                <TableCell>1.5rem / 24px</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-semibold</code></TableCell>
                <TableCell>1.375</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-xl</code></TableCell>
                <TableCell>1.25rem / 20px</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-semibold</code></TableCell>
                <TableCell>1.375</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-base</code></TableCell>
                <TableCell>1rem / 16px</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></TableCell>
                <TableCell>1.625</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body-sm</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-sm</code></TableCell>
                <TableCell>0.875rem / 14px</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></TableCell>
                <TableCell>1.5</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-sm</code></TableCell>
                <TableCell>0.875rem / 14px</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-medium</code></TableCell>
                <TableCell>1.5</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-pretendard</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-xs</code></TableCell>
                <TableCell>0.75rem / 12px</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code></TableCell>
                <TableCell>1.5</TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">tracking-normal</code></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>
              <span className="type-caption text-muted-foreground">font-sejong-bold · 3rem / 48px · Line height 1.25 · tracking-tight</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code>
              <span className="type-caption text-muted-foreground">font-sejong-bold · 2.25rem / 36px · Line height 1.25 · tracking-tight</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code>
              <span className="type-caption text-muted-foreground">font-pretendard · 1.5rem / 24px · Line height 1.375 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code>
              <span className="type-caption text-muted-foreground">font-pretendard · 1.25rem / 20px · Line height 1.375 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code>
              <span className="type-caption text-muted-foreground">font-pretendard · 1rem / 16px · Line height 1.625 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body-sm</code>
              <span className="type-caption text-muted-foreground">font-pretendard · 0.875rem / 14px · Line height 1.5 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code>
              <span className="type-caption text-muted-foreground">font-pretendard · 0.875rem / 14px · Line height 1.5 · tracking-normal</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code>
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
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>{' '}
          and{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code>{' '}
          styling on the same page. If a page has a Display hero and requires a
          semantic{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;h1&gt;</code>{' '}
          element for accessibility, apply{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code>{' '}
          styling to the{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">&lt;h1&gt;</code>{' '}
          — the visual hierarchy takes precedence over the class name.
        </p>
      </Alert>

      <Alert variant="info" title="Body SM vs Label" className="my-4">
        <p>
          Same size, different weight. Body SM ({' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-normal</code>{' '}
          ) is for reading. Label ({' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-medium</code>{' '}
          ) is for interacting. The extra weight signals that something is actionable.
        </p>
      </Alert>

      <hr className="my-6 border-0 border-t border-border" />

      {/* ── Responsive Behavior ────────────────────────────── */}
      <h2 className="type-h2 mt-6 mb-4 text-foreground">Responsive Behavior</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-body-sm</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-label</code>,
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-caption</code>{' '}
        are fixed — they are already readable at all viewport sizes.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Display-level and heading classes scale across the three layout tiers defined in the
        layout system ({' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">default</code>{' '}
        →{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md:</code>{' '}
        →{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg:</code>):
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Mobile (default)</TableHead>
                <TableHead>Tablet <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">md:</code></TableHead>
                <TableHead>Desktop <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">lg:</code></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code></TableCell>
                <TableCell>2rem / 32px</TableCell>
                <TableCell>2.5rem / 40px</TableCell>
                <TableCell>3rem / 48px</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code></TableCell>
                <TableCell>1.75rem / 28px</TableCell>
                <TableCell>2rem / 32px</TableCell>
                <TableCell>2.25rem / 36px</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code></TableCell>
                <TableCell>1.25rem / 20px</TableCell>
                <TableCell>1.375rem / 22px</TableCell>
                <TableCell>1.5rem / 24px</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code></TableCell>
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
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>
              <span className="type-caption text-muted-foreground">Mobile: 2rem / 32px · Tablet: 2.5rem / 40px · Desktop: 3rem / 48px</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h1</code>
              <span className="type-caption text-muted-foreground">Mobile: 1.75rem / 28px · Tablet: 2rem / 32px · Desktop: 2.25rem / 36px</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h2</code>
              <span className="type-caption text-muted-foreground">Mobile: 1.25rem / 20px · Tablet: 1.375rem / 22px · Desktop: 1.5rem / 24px</span>
            </TableMobileItem>
            <TableMobileItem>
              <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-h3</code>
              <span className="type-caption text-muted-foreground">Mobile: 1.125rem / 18px · Tablet: 1.25rem / 20px · Desktop: 1.25rem / 20px</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Responsive scaling is baked into the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-*</code>{' '}
        class definitions. Components do not need to apply breakpoint overrides — reaching for{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">type-display</code>{' '}
        on any viewport automatically applies the correct size. The Tailwind column
        in the scale reference table above shows the equivalent font-size token for
        developer reference only — the actual values come from responsive{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@media</code>{' '}
        overrides inside each class definition.
      </p>

      <Alert variant="warning" className="my-4">
        <p>
          Avoid{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">sm:</code>,{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">xl:</code>,
          or{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">2xl:</code>{' '}
          for typography overrides. The layout system operates on three tiers only.
          See{' '}
          <a href="/foundation/layout/breakpoints" className="text-link underline underline-offset-2 hover:text-brand-primary">Breakpoints</a>{' '}
          for the full breakpoint policy.
        </p>
      </Alert>

    </Container>
  )
}
