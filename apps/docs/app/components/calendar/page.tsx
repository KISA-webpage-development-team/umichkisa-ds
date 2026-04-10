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
import { InlineCode } from '@/components/InlineCode'
import { Heading } from '@/components/Heading'
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
      <Heading as="h2">Examples</Heading>

      {/* Pick a date */}
      <Heading as="h3" className="mt-6">Pick a date</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Select a single date, such as scheduling a meeting. The selected date
        is highlighted with the brand primary color.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <SingleDateDemo />
      </ComponentPreview>

      {/* Range selection */}
      <Heading as="h3">Range selection</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Select a date range for scenarios like booking a stay. Click once to
        set the start date, then click again to set the end date.
      </p>
      <ComponentPreview code={rangeCode} highlightedCode={rangeHighlighted}>
        <RangeDemo />
      </ComponentPreview>

      {/* Disabled dates */}
      <Heading as="h3">Disabled dates</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Prevent selection of certain dates. Here, past dates are disabled to
        ensure only future dates can be selected — useful for event
        registration or appointment booking.
      </p>
      <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
        <DisabledDatesDemo />
      </ComponentPreview>

      {/* Multiple months */}
      <Heading as="h3">Multiple months</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Display two months side by side for easier range selection. On mobile,
        the months stack vertically automatically.
      </p>
      <ComponentPreview code={multiMonthCode} highlightedCode={multiMonthHighlighted}>
        <MultiMonthDemo />
      </ComponentPreview>

      {/* Controlled month */}
      <Heading as="h3">Controlled month navigation</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Control the visible month externally with buttons. Useful when you
        need to programmatically jump to a specific month, such as navigating
        to an event date.
      </p>
      <ComponentPreview code={controlledMonthCode} highlightedCode={controlledMonthHighlighted}>
        <ControlledMonthDemo />
      </ComponentPreview>

      {/* -- API Reference -------------------------------------------- */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Calendar wraps{' '}
        <InlineCode>react-day-picker</InlineCode>{' '}
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
                <TableCell><InlineCode>mode</InlineCode></TableCell>
                <TableCell><InlineCode>&quot;single&quot; | &quot;range&quot;</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The selection mode. Use &quot;single&quot; for one date, &quot;range&quot; for a start/end pair.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>selected</InlineCode></TableCell>
                <TableCell><InlineCode>Date | DateRange | undefined</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The currently selected date or range. Type depends on the mode.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onSelect</InlineCode></TableCell>
                <TableCell><InlineCode>(value) =&gt; void</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when a date or range is selected.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>defaultMonth</InlineCode></TableCell>
                <TableCell><InlineCode>Date</InlineCode></TableCell>
                <TableCell>Current month</TableCell>
                <TableCell>The initial month to display in uncontrolled mode.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>month</InlineCode></TableCell>
                <TableCell><InlineCode>Date</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Controlled visible month. Use with onMonthChange.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>onMonthChange</InlineCode></TableCell>
                <TableCell><InlineCode>(month: Date) =&gt; void</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Callback when the visible month changes.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>disabled</InlineCode></TableCell>
                <TableCell><InlineCode>Matcher | Matcher[]</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Dates to disable. Accepts dates, date ranges, objects like {'{'} before: date {'}'}, or filter functions like <InlineCode>(date) =&gt; date.getDay() === 0</InlineCode>.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>numberOfMonths</InlineCode></TableCell>
                <TableCell><InlineCode>number</InlineCode></TableCell>
                <TableCell><InlineCode>1</InlineCode></TableCell>
                <TableCell>Number of months to display. Months stack vertically on small screens.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>showOutsideDays</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>true</InlineCode></TableCell>
                <TableCell>Show days from previous/next month to fill the grid.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
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
              <span className="type-caption text-muted-foreground"><InlineCode>&quot;single&quot; | &quot;range&quot;</InlineCode></span>
              <span className="type-caption text-muted-foreground">The selection mode. Use &quot;single&quot; for one date, &quot;range&quot; for a start/end pair.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>selected</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>Date | DateRange | undefined</InlineCode></span>
              <span className="type-caption text-muted-foreground">The currently selected date or range. Type depends on the mode.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onSelect</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>(value) =&gt; void</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback when a date or range is selected.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultMonth</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>Date</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: Current month</span>
              <span className="type-caption text-muted-foreground">The initial month to display in uncontrolled mode.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>month</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>Date</InlineCode></span>
              <span className="type-caption text-muted-foreground">Controlled visible month. Use with onMonthChange.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>onMonthChange</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>(month: Date) =&gt; void</InlineCode></span>
              <span className="type-caption text-muted-foreground">Callback when the visible month changes.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>Matcher | Matcher[]</InlineCode></span>
              <span className="type-caption text-muted-foreground">Dates to disable. Accepts dates, date ranges, objects like {'{'} before: date {'}'}, or filter functions like <InlineCode>(date) =&gt; date.getDay() === 0</InlineCode>.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>numberOfMonths</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>number</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>1</InlineCode></span>
              <span className="type-caption text-muted-foreground">Number of months to display. Months stack vertically on small screens.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>showOutsideDays</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>true</InlineCode></span>
              <span className="type-caption text-muted-foreground">Show days from previous/next month to fill the grid.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Merged via cn(). Use for layout utilities only.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
