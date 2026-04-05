import { Container } from '@umichkisa-ds/web'
import { DoDont } from '@/components/DoDont'
import { Do, Dont } from '@/components/DoDont'
import { CodeBlock } from '@/components/CodeBlock'

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
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code> is the anchor.{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code> is the signal.
        </strong>
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Think of navy as the container and maize as the content inside it. Navy says
        {'"'}this is KISA.{'"'} Maize says {'"'}look at this.{'"'}
      </p>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>{' '}
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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code>{' '}
        for:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Text labels on top of <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code> backgrounds</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Focus ring on interactive elements</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Badges, tags, and highlights that need to draw attention</li>
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>The most important CTA on a page when you want maximum visibility</li>
      </ul>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-mid</code>{' '}
        for:
      </p>
      <ul className="type-body text-foreground max-w-prose flex flex-col gap-2 mb-4">
        <li className="flex gap-2"><span className="text-muted-foreground">&bull;</span>Hyperlinks within body text</li>
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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code>.
        An event card sits on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code>.
        Inside that card, individual detail rows use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-muted</code>{' '}
        — which is lighter than the card, lifting items visually above the card background.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Do not skip levels. A card item should not sit directly on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code>{' '}
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
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code>
        </strong>{' '}
        — everything users need to read. Headings, body paragraphs, button labels, form values.
        If it carries meaning, it gets primary.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-muted-foreground</code>
        </strong>{' '}
        — supporting information. Timestamps, captions, helper text below form fields,
        secondary metadata on cards. It is readable but visually recedes behind primary text.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-disabled-foreground</code>
        </strong>{' '}
        — text on disabled UI elements only. It is intentionally below WCAG contrast requirements
        because disabled elements are meant to signal {'"'}this is not available right now.{'"'} Never use
        this token for content you actually want someone to read.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-foreground</code>
        </strong>{' '}
        — the only text token to use when the background is{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>.
        On a dark navy surface, gray-900 text is nearly invisible. Maize text is what belongs there.
        Do not use white — it is not a KISA brand color and it disrupts the visual identity.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <strong className="font-semibold text-foreground">
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-link</code>
        </strong>{' '}
        — hyperlinks only. It is a distinct blue that signals clickability. Do not use it for
        decorative text. Do not use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code>{' '}
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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success</code>,
        etc.) goes on text, icons, and borders — small, precise uses where the color itself
        carries the message.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The <strong className="font-semibold text-foreground">subtle token</strong> (
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error-subtle</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success-subtle</code>,
        etc.) goes on the background of the entire alert or callout box. It creates a tinted
        region around the message without overwhelming the page.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A typical error alert uses both:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error-subtle</code>{' '}
        as the box background,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error</code>{' '}
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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>:
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">State</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Default</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Hover</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-hover</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Pressed</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-pressed</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Focus ring</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-focus-ring</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        For elements built on{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code>:
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">State</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Default</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Hover</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-hover</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Pressed</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-pressed</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Focus ring</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-focus-ring</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        The focus ring (
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-focus-ring</code>)
        is always maize regardless of which brand color the element uses. It appears when a user
        navigates with a keyboard instead of a mouse. It must always be visible — do not remove it,
        do not reduce its opacity, do not hide it with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">outline: none</code>.
      </p>

      {/* ── Toggle Controls ─────────────────────────────────── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Toggle Controls (Checked State)</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Toggle controls (Checkbox, Radio, Switch) use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>{' '}
        as the checked background — navy signals {'"'}selected{'"'} and carries the brand identity.
      </p>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Indicators follow the <strong className="font-semibold text-foreground">stroke vs fill</strong> rule:
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Control</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Indicator type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Checkbox checkmark</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Stroke (thin lines)</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-foreground</code> (maize)</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Narrow strokes read as accent</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Radio dot</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Fill (solid circle)</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code> (white)</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Solid fills in maize are too heavy at small scale</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground">Switch thumb</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Fill (solid circle)</td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code> (white)</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Same as Radio</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="type-body mb-4 text-foreground max-w-prose">
        Form controls use a simplified focus pattern:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-color: var(--color-brand-primary)</code>{' '}
        instead of the dual-ring. The border color change is sufficient for elements that
        already have a visible border.
      </p>

      {/* ── Interactive Lists ───────────────────────────────── */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Interactive Lists</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Select items, Dropdown items, and Popover menu items use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-subtle</code>{' '}
        (light maize) as the hover/focus background, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>{' '}
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

      <blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
        <span className="italic text-muted-foreground type-body">
          <strong className="font-semibold text-foreground">Exception — Small-scale fill indicators:</strong>{' '}
          Toggle controls (Radio dot, Switch thumb) use{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code>{' '}
          (white) on{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code>{' '}
          instead of maize. At 10–20px, maize fills a solid shape too heavily — white provides
          clean contrast while navy carries the brand. Stroke-based indicators (Checkbox checkmark)
          still use{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-foreground</code>{' '}
          (maize) because strokes are narrow enough for the accent to read correctly.
        </span>
      </blockquote>

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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-*</code>{' '}
        token registered in{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@theme inline</code>{' '}
        generates three Tailwind utilities automatically:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-*</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-*</code>, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-*</code>.
        The table below lists the most natural utility or utilities for each token, grouped by semantic role.
      </p>

      {/* Brand utilities */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Brand</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">CSS Variable</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind Utility</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-brand-primary</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-brand-primary</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-brand-primary</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Michigan navy — primary brand surface and emphasis</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-mid</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-brand-primary-mid</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-brand-primary-mid</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Mid-weight navy — hyperlinks, secondary highlights</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-brand-accent</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-brand-accent</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Michigan maize — attention signal, focus, CTAs</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-brand-accent-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Light maize tint — subtle accent backgrounds</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive States utilities */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Interactive States</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">CSS Variable</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind Utility</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-hover</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-brand-primary-hover</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Navy hover state background</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-primary-pressed</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-brand-primary-pressed</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Navy pressed/active state background</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-hover</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-brand-accent-hover</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Maize hover state background</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-accent-pressed</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-brand-accent-pressed</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Maize pressed/active state background</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-focus-ring</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">outline-focus-ring</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">ring-focus-ring</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Maize focus ring — keyboard navigation indicator</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Surface utilities */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Surface</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">CSS Variable</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind Utility</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-surface</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Page background (white)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-surface-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Cards, panels — first depth level (gray-100)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-surface-muted</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-surface-muted</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Items inside cards — second depth level (gray-50)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Border utilities */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Border</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">CSS Variable</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind Utility</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-border</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Default border — dividers, input outlines (gray-200)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-border-strong</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-border-strong</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Stronger border — hover states, emphasis (gray-300)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Text utilities */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Text</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">CSS Variable</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind Utility</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Primary text — all readable content (gray-900)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-muted-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-muted-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Secondary text — captions, metadata, helper text (gray-500)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-disabled-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-disabled-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Disabled state text and icons (gray-400)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-brand-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-brand-foreground</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Text on brand-primary backgrounds — maize on navy</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-link</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-link</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Hyperlink text color — signals clickability</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Feedback utilities */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Feedback</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">CSS Variable</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind Utility</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-error</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-error</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Error state — icons, borders, text labels</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-error-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-error-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Error state — alert and callout box background</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-success</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-success</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Success state — icons and borders (pair with <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-foreground</code> label)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-success-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-success-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Success state — alert and callout box background</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-warning</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-warning</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Warning state — icons and borders (pair with <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-foreground</code> label)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-warning-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-warning-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Warning state — alert and callout box background</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">text-info</code> / <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">border-info</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Info state — neutral notices, documentation callouts</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-info-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-info-subtle</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Info state — alert and callout box background</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Overlay utilities */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Overlay</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">CSS Variable</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Tailwind Utility</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">--color-overlay</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">bg-overlay</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Modal/dialog scrim — semi-transparent black (40% opacity)</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
