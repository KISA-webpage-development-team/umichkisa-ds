import { Alert, Container, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { DoDont } from '@/components/DoDont'
import { Do, Dont } from '@/components/DoDont'
import { CodeBlock } from '@/components/CodeBlock'
import { InlineCode } from '@/components/InlineCode'

export default async function ColorsUsagePage() {
  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">Usage Guidelines</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        This section explains when to reach for each token. The token reference tells
        you what each token is. This section tells you how to use it.
      </p>

      {/* ── Brand Colors ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Brand Colors</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <InlineCode>--color-brand-primary</InlineCode> is the anchor.{' '}
          <InlineCode>--color-brand-accent</InlineCode> is the signal.
        </strong>
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Think of navy as the container and maize as the content inside it. Navy says
        {' "'}this is KISA.{'"'} Maize says {'"'}look at this.{'"'}
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>--color-brand-primary</InlineCode>{' '}
        for:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Navigation bar background</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Hero section backgrounds</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Primary button backgrounds</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Any large surface that needs to feel institutional and grounded</li>
      </ul>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>--color-brand-accent</InlineCode>{' '}
        for:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Text labels on top of <InlineCode>--color-brand-primary</InlineCode> backgrounds</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Focus ring on interactive elements</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Badges, tags, and highlights that need to draw attention</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>The most important CTA on a page when you want maximum visibility</li>
      </ul>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>--color-brand-primary-mid</InlineCode>{' '}
        for:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Secondary navigation highlights</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Any context where full navy would feel too heavy but you still need blue</li>
      </ul>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Do not scatter brand colors across every element. A page that is half navy and
        half maize is not more branded — it is just loud. Brand colors work because they
        are used deliberately and sparingly.
      </p>

      {/* ── Surface Depth ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Surface Depth</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Surfaces create the sense of depth and layering in the UI. The rule is simple:
        as elements stack on top of each other, their background steps through the
        surface scale.
      </p>

      <CodeBlock code={`--color-surface               (white)      Page background
  └── --color-surface-subtle  (gray-100)   Cards, panels
        └── --color-surface-muted  (gray-50)    Items inside cards`} lang="text" />

      <p className="type-body mb-4 text-foreground max-w-prose">
        A practical example: the page sits on{' '}
        <InlineCode>--color-surface</InlineCode>.
        An event card sits on{' '}
        <InlineCode>--color-surface-subtle</InlineCode>.
        Inside that card, individual detail rows use{' '}
        <InlineCode>--color-surface-muted</InlineCode>{' '}
        — which is lighter than the card, lifting items visually above the card background.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Do not skip levels. A card item should not sit directly on{' '}
        <InlineCode>--color-surface</InlineCode>{' '}
        (the page background) — it would look uncontained. Do not invent new background
        colors outside of these three tokens.
      </p>

      {/* ── Text Hierarchy ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Text Hierarchy</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use the text tokens to communicate information priority.
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <InlineCode>--color-foreground</InlineCode>
        </strong>{' '}
        — everything users need to read. Headings, body paragraphs, button labels, form values.
        If it carries meaning, it gets primary.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <InlineCode>--color-muted-foreground</InlineCode>
        </strong>{' '}
        — supporting information. Timestamps, captions, helper text below form fields,
        secondary metadata on cards. It is readable but visually recedes behind primary text.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <InlineCode>--color-disabled-foreground</InlineCode>
        </strong>{' '}
        — text on disabled UI elements only. It is intentionally below WCAG contrast requirements
        because disabled elements are meant to signal {'"'}this is not available right now.{'"'} Never use
        this token for content you actually want someone to read.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <InlineCode>--color-brand-foreground</InlineCode>
        </strong>{' '}
        — the only text token to use when the background is{' '}
        <InlineCode>--color-brand-primary</InlineCode>.
        On a dark navy surface, gray-900 text is nearly invisible. Maize text is what belongs there.
        Do not use white — it is not a KISA brand color and it disrupts the visual identity.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <InlineCode>--color-link</InlineCode>
        </strong>{' '}
        — hyperlinks only. It is a distinct blue that signals clickability. Do not use it for
        decorative text. Do not use{' '}
        <InlineCode>--color-brand-accent</InlineCode>{' '}
        (maize) for links — yellow text on a white background is nearly unreadable and gives
        no visual signal that the text is interactive.
      </p>

      {/* ── Feedback Colors ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Feedback Colors</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Each feedback state has a solid token and a subtle token. Use them as a pair.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The <strong className="font-semibold text-foreground">solid token</strong> (
        <InlineCode>--color-error</InlineCode>,{' '}
        <InlineCode>--color-success</InlineCode>,
        etc.) goes on text, icons, and borders — small, precise uses where the color itself
        carries the message.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The <strong className="font-semibold text-foreground">subtle token</strong> (
        <InlineCode>--color-error-subtle</InlineCode>,{' '}
        <InlineCode>--color-success-subtle</InlineCode>,
        etc.) goes on the background of the entire alert or callout box. It creates a tinted
        region around the message without overwhelming the page.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A typical error alert uses both:{' '}
        <InlineCode>--color-error-subtle</InlineCode>{' '}
        as the box background,{' '}
        <InlineCode>--color-error</InlineCode>{' '}
        as the icon color and border.
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">When to use each state:</p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">Error</strong> — something went wrong and the user must act. Form validation failures, failed submissions, destructive warnings.</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">Success</strong> — an action completed as expected. A form saved, a file uploaded, a password changed.</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">Warning</strong> — something needs attention but has not failed yet. A session about to expire, a form field with a recommendation, a soft limit approaching.</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span><strong className="font-semibold text-foreground">Info</strong> — neutral context. Tips, documentation callouts, informational notices that require no action.</li>
      </ul>

      {/* ── Interactive States ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Interactive States</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Every interactive element that uses brand colors should cycle through these
        states: default → hover → pressed → (focus).
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        For elements built on{' '}
        <InlineCode>--color-brand-primary</InlineCode>:
      </p>

      {/* ── Table 1: Brand-primary interactive states (2-col) ── */}
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>Token</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Default</TableCell>
                <TableCell><InlineCode>--color-brand-primary</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hover</TableCell>
                <TableCell><InlineCode>--color-brand-primary-hover</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pressed</TableCell>
                <TableCell><InlineCode>--color-brand-primary-pressed</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Focus ring</TableCell>
                <TableCell><InlineCode>--color-focus-ring</InlineCode></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span>Default</span>
              <InlineCode>--color-brand-primary</InlineCode>
            </TableMobileItem>
            <TableMobileItem>
              <span>Hover</span>
              <InlineCode>--color-brand-primary-hover</InlineCode>
            </TableMobileItem>
            <TableMobileItem>
              <span>Pressed</span>
              <InlineCode>--color-brand-primary-pressed</InlineCode>
            </TableMobileItem>
            <TableMobileItem>
              <span>Focus ring</span>
              <InlineCode>--color-focus-ring</InlineCode>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        For elements built on{' '}
        <InlineCode>--color-brand-accent</InlineCode>:
      </p>

      {/* ── Table 2: Brand-accent interactive states (2-col) ── */}
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>Token</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Default</TableCell>
                <TableCell><InlineCode>--color-brand-accent</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hover</TableCell>
                <TableCell><InlineCode>--color-brand-accent-hover</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pressed</TableCell>
                <TableCell><InlineCode>--color-brand-accent-pressed</InlineCode></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Focus ring</TableCell>
                <TableCell><InlineCode>--color-focus-ring</InlineCode></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span>Default</span>
              <InlineCode>--color-brand-accent</InlineCode>
            </TableMobileItem>
            <TableMobileItem>
              <span>Hover</span>
              <InlineCode>--color-brand-accent-hover</InlineCode>
            </TableMobileItem>
            <TableMobileItem>
              <span>Pressed</span>
              <InlineCode>--color-brand-accent-pressed</InlineCode>
            </TableMobileItem>
            <TableMobileItem>
              <span>Focus ring</span>
              <InlineCode>--color-focus-ring</InlineCode>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The focus ring (
        <InlineCode>--color-focus-ring</InlineCode>)
        is always maize regardless of which brand color the element uses. It appears when a user
        navigates with a keyboard instead of a mouse. It must always be visible — do not remove it,
        do not reduce its opacity, do not hide it with{' '}
        <InlineCode>outline: none</InlineCode>.
      </p>

      {/* ── Toggle Controls ─────────────────────────────────── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Toggle Controls (Checked State)</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Toggle controls (Checkbox, Radio, Switch) use{' '}
        <InlineCode>--color-brand-primary</InlineCode>{' '}
        as the checked background — navy signals {'"'}selected{'"'} and carries the brand identity.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Indicators follow the <strong className="font-semibold text-foreground">stroke vs fill</strong> rule:
      </p>

      {/* ── Table 3: Toggle controls (4-col) ── */}
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Control</TableHead>
                <TableHead>Indicator type</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Rationale</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Checkbox checkmark</TableCell>
                <TableCell>Stroke (thin lines)</TableCell>
                <TableCell><InlineCode>--color-brand-foreground</InlineCode> (maize)</TableCell>
                <TableCell>Narrow strokes read as accent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Radio dot</TableCell>
                <TableCell>Fill (solid circle)</TableCell>
                <TableCell><InlineCode>--color-surface</InlineCode> (white)</TableCell>
                <TableCell>Solid fills in maize are too heavy at small scale</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Switch thumb</TableCell>
                <TableCell>Fill (solid circle)</TableCell>
                <TableCell><InlineCode>--color-surface</InlineCode> (white)</TableCell>
                <TableCell>Same as Radio</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span>Checkbox checkmark</span>
              <span className="type-caption text-muted-foreground">Stroke (thin lines) · <InlineCode>--color-brand-foreground</InlineCode> (maize) · Narrow strokes read as accent</span>
            </TableMobileItem>
            <TableMobileItem>
              <span>Radio dot</span>
              <span className="type-caption text-muted-foreground">Fill (solid circle) · <InlineCode>--color-surface</InlineCode> (white) · Solid fills in maize are too heavy at small scale</span>
            </TableMobileItem>
            <TableMobileItem>
              <span>Switch thumb</span>
              <span className="type-caption text-muted-foreground">Fill (solid circle) · <InlineCode>--color-surface</InlineCode> (white) · Same as Radio</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Form controls use a simplified focus pattern:{' '}
        <InlineCode>border-color: var(--color-brand-primary)</InlineCode>{' '}
        instead of the dual-ring. The border color change is sufficient for elements that
        already have a visible border.
      </p>

      {/* ── Interactive Lists ───────────────────────────────── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Interactive Lists</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Select items, Dropdown items, and Popover menu items use{' '}
        <InlineCode>--color-brand-accent-subtle</InlineCode>{' '}
        (light maize) as the hover/focus background, and{' '}
        <InlineCode>--color-brand-primary</InlineCode>{' '}
        (navy) for selected-item indicators (check icons).
      </p>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Do's and Don'ts ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">{"Do's and Don'ts"}</h2>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Link color</h3>
      <DoDont>
        <Do>
          <p>Use <code>--color-link</code> for hyperlinks. It is a readable blue that signals clickability.</p>
          <pre><code>color: var(--color-link)</code></pre>
        </Do>
        <Dont>
          <p>Use <code>--color-brand-accent</code> for links. Maize on a white background is nearly unreadable and does not communicate interactivity.</p>
          <pre><code>color: var(--color-brand-accent)</code></pre>
        </Dont>
      </DoDont>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Text on brand backgrounds</h3>
      <DoDont>
        <Do>
          <p>Use <code>--color-brand-foreground</code> when the background is <code>--color-brand-primary</code>. Maize on navy gives 8.2:1 contrast and is the KISA identity pair.</p>
          <pre><code>color: var(--color-brand-foreground)</code></pre>
        </Do>
        <Dont>
          <p>Use white text on a navy background. White is not a KISA brand color and breaks the visual identity of the system.</p>
          <pre><code>color: white</code></pre>
        </Dont>
      </DoDont>

      <Alert variant="info" title="Exception — Small-scale fill indicators">
          Toggle controls (Radio dot, Switch thumb) use{' '}
          <InlineCode>--color-surface</InlineCode>{' '}
          (white) on{' '}
          <InlineCode>--color-brand-primary</InlineCode>{' '}
          instead of maize. At 10–20px, maize fills a solid shape too heavily — white provides
          clean contrast while navy carries the brand. Stroke-based indicators (Checkbox checkmark)
          still use{' '}
          <InlineCode>--color-brand-foreground</InlineCode>{' '}
          (maize) because strokes are narrow enough for the accent to read correctly.
      </Alert>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Background colors</h3>
      <DoDont>
        <Do>
          <p>Use surface tokens for card and section backgrounds. They are designed for layering and maintain the depth model.</p>
          <pre><code>background: var(--color-surface-subtle)</code></pre>
        </Do>
        <Dont>
          <p>Use brand colors as mid-page backgrounds. A navy card mid-page does not feel branded — it feels heavy and breaks reading flow.</p>
          <pre><code>background: var(--color-brand-primary)</code></pre>
        </Dont>
      </DoDont>

      <h3 className="type-h3 mt-6 mb-2 text-foreground">Token usage in components</h3>
      <DoDont>
        <Do>
          <p>Reference semantic tokens in all component CSS and inline styles. One token change updates the entire system.</p>
          <pre><code>background-color: var(--color-brand-primary)</code></pre>
        </Do>
        <Dont>
          <p>Hardcode hex values in components. A hardcoded value cannot be updated globally and drifts out of sync with the design system over time.</p>
          <pre><code>background-color: #00274c</code></pre>
        </Dont>
      </DoDont>

      <hr className="my-8 border-0 border-t border-border" />

      {/* ── Token → Utility Reference ───────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">{"Token → Utility Reference"}</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Every{' '}
        <InlineCode>--color-*</InlineCode>{' '}
        token registered in{' '}
        <InlineCode>@theme inline</InlineCode>{' '}
        generates three Tailwind utilities automatically:{' '}
        <InlineCode>bg-*</InlineCode>,{' '}
        <InlineCode>text-*</InlineCode>, and{' '}
        <InlineCode>border-*</InlineCode>.
        The table below lists the most natural utility or utilities for each token, grouped by semantic role.
      </p>

      {/* ── Table 4: Brand utilities (3-col) ── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Brand</h3>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>CSS Variable</TableHead>
                <TableHead>Tailwind Utility</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-brand-primary</InlineCode></TableCell>
                <TableCell><InlineCode>bg-brand-primary</InlineCode> / <InlineCode>text-brand-primary</InlineCode> / <InlineCode>border-brand-primary</InlineCode></TableCell>
                <TableCell>Michigan navy — primary brand surface and emphasis</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-primary-mid</InlineCode></TableCell>
                <TableCell><InlineCode>text-brand-primary-mid</InlineCode> / <InlineCode>border-brand-primary-mid</InlineCode></TableCell>
                <TableCell>Mid-weight navy — hyperlinks, secondary highlights</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-accent</InlineCode></TableCell>
                <TableCell><InlineCode>bg-brand-accent</InlineCode> / <InlineCode>text-brand-accent</InlineCode></TableCell>
                <TableCell>Michigan maize — attention signal, focus, CTAs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-accent-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>bg-brand-accent-subtle</InlineCode></TableCell>
                <TableCell>Light maize tint — subtle accent backgrounds</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-brand-primary</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-brand-primary</InlineCode> / <InlineCode>text-brand-primary</InlineCode> / <InlineCode>border-brand-primary</InlineCode> — Michigan navy — primary brand surface and emphasis</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-primary-mid</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-brand-primary-mid</InlineCode> / <InlineCode>border-brand-primary-mid</InlineCode> — Mid-weight navy — hyperlinks, secondary highlights</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-accent</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-brand-accent</InlineCode> / <InlineCode>text-brand-accent</InlineCode> — Michigan maize — attention signal, focus, CTAs</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-accent-subtle</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-brand-accent-subtle</InlineCode> — Light maize tint — subtle accent backgrounds</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── Table 5: Interactive States utilities (3-col) ── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Interactive States</h3>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>CSS Variable</TableHead>
                <TableHead>Tailwind Utility</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-brand-primary-hover</InlineCode></TableCell>
                <TableCell><InlineCode>bg-brand-primary-hover</InlineCode></TableCell>
                <TableCell>Navy hover state background</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-primary-pressed</InlineCode></TableCell>
                <TableCell><InlineCode>bg-brand-primary-pressed</InlineCode></TableCell>
                <TableCell>Navy pressed/active state background</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-accent-hover</InlineCode></TableCell>
                <TableCell><InlineCode>bg-brand-accent-hover</InlineCode></TableCell>
                <TableCell>Maize hover state background</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-accent-pressed</InlineCode></TableCell>
                <TableCell><InlineCode>bg-brand-accent-pressed</InlineCode></TableCell>
                <TableCell>Maize pressed/active state background</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-focus-ring</InlineCode></TableCell>
                <TableCell><InlineCode>outline-focus-ring</InlineCode> / <InlineCode>ring-focus-ring</InlineCode></TableCell>
                <TableCell>Maize focus ring — keyboard navigation indicator</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-brand-primary-hover</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-brand-primary-hover</InlineCode> — Navy hover state background</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-primary-pressed</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-brand-primary-pressed</InlineCode> — Navy pressed/active state background</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-accent-hover</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-brand-accent-hover</InlineCode> — Maize hover state background</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-accent-pressed</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-brand-accent-pressed</InlineCode> — Maize pressed/active state background</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-focus-ring</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>outline-focus-ring</InlineCode> / <InlineCode>ring-focus-ring</InlineCode> — Maize focus ring — keyboard navigation indicator</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── Table 6: Surface utilities (3-col) ── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Surface</h3>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>CSS Variable</TableHead>
                <TableHead>Tailwind Utility</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-surface</InlineCode></TableCell>
                <TableCell><InlineCode>bg-surface</InlineCode></TableCell>
                <TableCell>Page background (white)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-surface-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>bg-surface-subtle</InlineCode></TableCell>
                <TableCell>Cards, panels — first depth level (gray-100)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-surface-muted</InlineCode></TableCell>
                <TableCell><InlineCode>bg-surface-muted</InlineCode></TableCell>
                <TableCell>Items inside cards — second depth level (gray-50)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-surface</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-surface</InlineCode> — Page background (white)</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-surface-subtle</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-surface-subtle</InlineCode> — Cards, panels — first depth level (gray-100)</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-surface-muted</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-surface-muted</InlineCode> — Items inside cards — second depth level (gray-50)</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── Table 7: Border utilities (3-col) ── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Border</h3>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>CSS Variable</TableHead>
                <TableHead>Tailwind Utility</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-border</InlineCode></TableCell>
                <TableCell><InlineCode>border-border</InlineCode></TableCell>
                <TableCell>Default border — dividers, input outlines (gray-200)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-border-strong</InlineCode></TableCell>
                <TableCell><InlineCode>border-border-strong</InlineCode></TableCell>
                <TableCell>Stronger border — hover states, emphasis (gray-300)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-border</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>border-border</InlineCode> — Default border — dividers, input outlines (gray-200)</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-border-strong</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>border-border-strong</InlineCode> — Stronger border — hover states, emphasis (gray-300)</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── Table 8: Text utilities (3-col) ── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Text</h3>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>CSS Variable</TableHead>
                <TableHead>Tailwind Utility</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-foreground</InlineCode></TableCell>
                <TableCell><InlineCode>text-foreground</InlineCode></TableCell>
                <TableCell>Primary text — all readable content (gray-900)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-muted-foreground</InlineCode></TableCell>
                <TableCell><InlineCode>text-muted-foreground</InlineCode></TableCell>
                <TableCell>Secondary text — captions, metadata, helper text (gray-500)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-disabled-foreground</InlineCode></TableCell>
                <TableCell><InlineCode>text-disabled-foreground</InlineCode></TableCell>
                <TableCell>Disabled state text and icons (gray-400)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-brand-foreground</InlineCode></TableCell>
                <TableCell><InlineCode>text-brand-foreground</InlineCode></TableCell>
                <TableCell>Text on brand-primary backgrounds — maize on navy</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-link</InlineCode></TableCell>
                <TableCell><InlineCode>text-link</InlineCode></TableCell>
                <TableCell>Hyperlink text color — signals clickability</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-foreground</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-foreground</InlineCode> — Primary text — all readable content (gray-900)</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-muted-foreground</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-muted-foreground</InlineCode> — Secondary text — captions, metadata, helper text (gray-500)</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-disabled-foreground</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-disabled-foreground</InlineCode> — Disabled state text and icons (gray-400)</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-brand-foreground</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-brand-foreground</InlineCode> — Text on brand-primary backgrounds — maize on navy</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-link</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-link</InlineCode> — Hyperlink text color — signals clickability</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── Table 9: Feedback utilities (3-col) ── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Feedback</h3>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>CSS Variable</TableHead>
                <TableHead>Tailwind Utility</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-error</InlineCode></TableCell>
                <TableCell><InlineCode>text-error</InlineCode> / <InlineCode>border-error</InlineCode></TableCell>
                <TableCell>Error state — icons, borders, text labels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-error-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>bg-error-subtle</InlineCode></TableCell>
                <TableCell>Error state — alert and callout box background</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-success</InlineCode></TableCell>
                <TableCell><InlineCode>text-success</InlineCode> / <InlineCode>border-success</InlineCode></TableCell>
                <TableCell>Success state — icons and borders (pair with <InlineCode>text-foreground</InlineCode> label)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-success-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>bg-success-subtle</InlineCode></TableCell>
                <TableCell>Success state — alert and callout box background</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-warning</InlineCode></TableCell>
                <TableCell><InlineCode>text-warning</InlineCode> / <InlineCode>border-warning</InlineCode></TableCell>
                <TableCell>Warning state — icons and borders (pair with <InlineCode>text-foreground</InlineCode> label)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-warning-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>bg-warning-subtle</InlineCode></TableCell>
                <TableCell>Warning state — alert and callout box background</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-info</InlineCode></TableCell>
                <TableCell><InlineCode>text-info</InlineCode> / <InlineCode>border-info</InlineCode></TableCell>
                <TableCell>Info state — neutral notices, documentation callouts</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>--color-info-subtle</InlineCode></TableCell>
                <TableCell><InlineCode>bg-info-subtle</InlineCode></TableCell>
                <TableCell>Info state — alert and callout box background</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-error</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-error</InlineCode> / <InlineCode>border-error</InlineCode> — Error state — icons, borders, text labels</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-error-subtle</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-error-subtle</InlineCode> — Error state — alert and callout box background</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-success</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-success</InlineCode> / <InlineCode>border-success</InlineCode> — Success state — icons and borders (pair with <InlineCode>text-foreground</InlineCode> label)</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-success-subtle</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-success-subtle</InlineCode> — Success state — alert and callout box background</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-warning</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-warning</InlineCode> / <InlineCode>border-warning</InlineCode> — Warning state — icons and borders (pair with <InlineCode>text-foreground</InlineCode> label)</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-warning-subtle</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-warning-subtle</InlineCode> — Warning state — alert and callout box background</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-info</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>text-info</InlineCode> / <InlineCode>border-info</InlineCode> — Info state — neutral notices, documentation callouts</span>
            </TableMobileItem>
            <TableMobileItem>
              <InlineCode>--color-info-subtle</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-info-subtle</InlineCode> — Info state — alert and callout box background</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── Table 10: Overlay utilities (3-col) ── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Overlay</h3>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>CSS Variable</TableHead>
                <TableHead>Tailwind Utility</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>--color-overlay</InlineCode></TableCell>
                <TableCell><InlineCode>bg-overlay</InlineCode></TableCell>
                <TableCell>Modal/dialog scrim — semi-transparent black (40% opacity)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <InlineCode>--color-overlay</InlineCode>
              <span className="type-caption text-muted-foreground"><InlineCode>bg-overlay</InlineCode> — Modal/dialog scrim — semi-transparent black (40% opacity)</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
