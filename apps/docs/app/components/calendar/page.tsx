import {
  Alert,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { SingleDateDemo, RangeDemo, DisabledDatesDemo, MultiMonthDemo, ControlledMonthDemo } from './_demos'

const basicCode = `import { useState } from 'react'
import { Calendar } from '@umichkisa-ds/web'

function MeetingDatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
      />
      {date && (
        <p className="type-body-sm text-foreground mt-2">
          Meeting scheduled for {format(date, 'MMMM d, yyyy')}
        </p>
      )}
    </div>
  )
}`

const rangeCode = `import { useState } from 'react'
import { Calendar } from '@umichkisa-ds/web'
import type { DateRange } from '@umichkisa-ds/web'

function StayDatePicker() {
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <div>
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
      />
      {range?.from && (
        <p className="type-body-sm text-foreground mt-2">
          {range.to
            ? \`\${format(range.from, 'MMM d')} — \${format(range.to, 'MMM d, yyyy')}\`
            : \`Check-in: \${format(range.from, 'MMM d, yyyy')}\`}
        </p>
      )}
    </div>
  )
}`

const disabledCode = `import { useState } from 'react'
import { Calendar } from '@umichkisa-ds/web'

function FutureDatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={{ before: new Date() }}
    />
  )
}`

const multiMonthCode = `import { useState } from 'react'
import { Calendar } from '@umichkisa-ds/web'
import type { DateRange } from '@umichkisa-ds/web'

function TravelDatePicker() {
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
    />
  )
}`

const controlledMonthCode = `import { useState } from 'react'
import { Calendar, Button, Icon } from '@umichkisa-ds/web'
import { addMonths, subMonths, format } from 'date-fns'

function NavigableCalendar() {
  const [month, setMonth] = useState(new Date())
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Button variant="secondary" size="sm" onClick={() => setMonth(subMonths(month, 1))}>
          <Icon name="chevron-left" size="sm" /> Prev
        </Button>
        <span className="type-body-sm !font-semibold text-foreground">
          {format(month, 'MMMM yyyy')}
        </span>
        <Button variant="secondary" size="sm" onClick={() => setMonth(addMonths(month, 1))}>
          Next <Icon name="chevron-right" size="sm" />
        </Button>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={month}
        onMonthChange={setMonth}
      />
    </div>
  )
}`

export default async function CalendarPage() {
  const [
    basicHighlighted,
    rangeHighlighted,
    disabledHighlighted,
    multiMonthHighlighted,
    controlledMonthHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(rangeCode),
    highlight(disabledCode),
    highlight(multiMonthCode),
    highlight(controlledMonthCode),
  ])

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">Calendar</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A date calendar for selecting single dates or date ranges.
      </p>
      <Alert variant="info" className="mb-8 max-w-prose">
        Use Calendar as a standalone visible date picker. For a form input
        that reveals a calendar in a popover, use DatePicker.
      </Alert>

      {/* -- Examples ------------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Pick a date */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Pick a date</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Select a single date, such as scheduling a meeting. The selected date
        is highlighted with the brand primary color.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <SingleDateDemo />
      </ComponentPreview>

      {/* Range selection */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Range selection</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Select a date range for scenarios like booking a stay. Click once to
        set the start date, then click again to set the end date.
      </p>
      <ComponentPreview code={rangeCode} highlightedCode={rangeHighlighted}>
        <RangeDemo />
      </ComponentPreview>

      {/* Disabled dates */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled dates</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Prevent selection of certain dates. Here, past dates are disabled to
        ensure only future dates can be selected — useful for event
        registration or appointment booking.
      </p>
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <DisabledDatesDemo />
      </ComponentPreview>

      {/* Multiple months */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Multiple months</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Display two months side by side for easier range selection. On mobile,
        the months stack vertically automatically.
      </p>
      <ComponentPreview code={multiMonthCode} highlightedCode={multiMonthHighlighted}>
        <MultiMonthDemo />
      </ComponentPreview>

      {/* Controlled month */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Controlled month navigation</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Control the visible month externally with buttons. Useful when you
        need to programmatically jump to a specific month, such as navigating
        to an event date.
      </p>
      <ComponentPreview code={controlledMonthCode} highlightedCode={controlledMonthHighlighted}>
        <ControlledMonthDemo />
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Calendar wraps{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">react-day-picker</code>{' '}
        and accepts all of its props. The most commonly used props are listed below.
      </p>

      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">mode</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;single&quot; | &quot;range&quot;</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The selection mode. Use &quot;single&quot; for one date, &quot;range&quot; for a start/end pair.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">selected</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Date | DateRange | undefined</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The currently selected date or range. Type depends on the mode.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onSelect</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(value) =&gt; void</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when a date or range is selected.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">defaultMonth</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Date</code></TableCell>
                <TableCell>Current month</TableCell>
                <TableCell>The initial month to display in uncontrolled mode.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">month</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Date</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled visible month. Use with onMonthChange.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onMonthChange</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(month: Date) =&gt; void</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the visible month changes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Matcher | Matcher[]</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Dates to disable. Accepts dates, date ranges, objects like {'{'} before: date {'}'}, or filter functions like <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(date) =&gt; date.getDay() === 0</code>.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">numberOfMonths</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">number</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">1</code></TableCell>
                <TableCell>Number of months to display. Months stack vertically on small screens.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">showOutsideDays</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">true</code></TableCell>
                <TableCell>Show days from previous/next month to fill the grid.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
                <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Merged via cn(). Use for layout utilities only.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>mode</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;single&quot; | &quot;range&quot;</code></span>
              <span className="type-caption text-muted-foreground">The selection mode. Use &quot;single&quot; for one date, &quot;range&quot; for a start/end pair.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>selected</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">Date | DateRange | undefined</code></span>
              <span className="type-caption text-muted-foreground">The currently selected date or range. Type depends on the mode.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onSelect</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">(value) =&gt; void</code></span>
              <span className="type-caption text-muted-foreground">Callback when a date or range is selected.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultMonth</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">Date</code></span>
              <span className="type-caption text-muted-foreground">Default: Current month</span>
              <span className="type-caption text-muted-foreground">The initial month to display in uncontrolled mode.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>month</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">Date</code></span>
              <span className="type-caption text-muted-foreground">Controlled visible month. Use with onMonthChange.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onMonthChange</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">(month: Date) =&gt; void</code></span>
              <span className="type-caption text-muted-foreground">Callback when the visible month changes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">Matcher | Matcher[]</code></span>
              <span className="type-caption text-muted-foreground">Dates to disable. Accepts dates, date ranges, objects like {'{'} before: date {'}'}, or filter functions like <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">(date) =&gt; date.getDay() === 0</code>.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>numberOfMonths</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">number</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">1</code></span>
              <span className="type-caption text-muted-foreground">Number of months to display. Months stack vertically on small screens.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>showOutsideDays</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
              <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">true</code></span>
              <span className="type-caption text-muted-foreground">Show days from previous/next month to fill the grid.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
