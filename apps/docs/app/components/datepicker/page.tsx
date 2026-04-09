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
import {
  BasicDemo,
  DefaultValueDemo,
  DateBoundsDemo,
  DisabledDemo,
  InvalidDemo,
  CustomFormatDemo,
  RangeBasicDemo,
  RangeDefaultDemo,
  RangeDisabledDemo,
  RangeInvalidDemo,
} from './_demos'

// ── DatePicker Examples ──────────────────────────────────────

const basicCode = `import { useState } from 'react'
import { DatePicker } from '@umichkisa-ds/web'

function EventDatePicker() {
  const [date, setDate] = useState<Date>()
  return <DatePicker value={date} onChange={setDate} placeholder="Pick an event date" />
}`

const defaultValueCode = `import { useState } from 'react'
import { DatePicker } from '@umichkisa-ds/web'

function BirthDateField() {
  const [date, setDate] = useState<Date>(new Date(2000, 0, 15))
  return <DatePicker value={date} onChange={setDate} placeholder="Birth date" />
}`

const dateBoundsCode = `import { useState } from 'react'
import { DatePicker } from '@umichkisa-ds/web'

function BookingDatePicker() {
  const [date, setDate] = useState<Date>()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Choose a check-in date"
      calendarProps={{ disabled: { before: tomorrow } }}
    />
  )
}`

const disabledCode = `import { DatePicker } from '@umichkisa-ds/web'

<DatePicker disabled placeholder="Not available" />`

const invalidCode = `import { useState } from 'react'
import { DatePicker } from '@umichkisa-ds/web'

function RequiredDateField() {
  const [date, setDate] = useState<Date>()
  return <DatePicker value={date} onChange={setDate} invalid placeholder="Required" />
}`

const customFormatCode = `import { useState } from 'react'
import { DatePicker } from '@umichkisa-ds/web'

function KoreanDatePicker() {
  const [date, setDate] = useState<Date>()
  const formatKorean = (d: Date) =>
    \`\${d.getFullYear()}년 \${d.getMonth() + 1}월 \${d.getDate()}일\`

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      formatDate={formatKorean}
      placeholder="날짜 선택"
    />
  )
}`

// ── DateRangePicker Examples ─────────────────────────────────

const rangeBasicCode = `import { useState } from 'react'
import { DateRangePicker, type DateRange } from '@umichkisa-ds/web'

function TripDatesPicker() {
  const [range, setRange] = useState<DateRange>()
  return <DateRangePicker value={range} onChange={setRange} placeholder="Select trip dates" />
}`

const rangeDefaultCode = `import { useState } from 'react'
import { DateRangePicker, type DateRange } from '@umichkisa-ds/web'

function ReportPeriodPicker() {
  const [range, setRange] = useState<DateRange>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 31),
  })
  return <DateRangePicker value={range} onChange={setRange} placeholder="Report period" />
}`

const rangeDisabledCode = `import { DateRangePicker } from '@umichkisa-ds/web'

<DateRangePicker disabled placeholder="Not available" />`

const rangeInvalidCode = `import { useState } from 'react'
import { DateRangePicker, type DateRange } from '@umichkisa-ds/web'

function RequiredRangeField() {
  const [range, setRange] = useState<DateRange>()
  return <DateRangePicker value={range} onChange={setRange} invalid placeholder="Required" />
}`

// ── Form Integration ─────────────────────────────────────────

const formCode = `import { useForm, Form } from '@umichkisa-ds/form'

function EventForm() {
  const form = useForm({ defaultValues: { eventDate: undefined, availability: undefined } })

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <Form.DatePicker name="eventDate" label="Event date" rules={{ required: 'Date is required' }} />
      <Form.DateRangePicker name="availability" label="Availability window" description="When are you free?" />
      <Form.Button type="submit">Submit</Form.Button>
    </Form>
  )
}`

// ── Page ─────────────────────────────────────────────────────

export default async function DatePickerPage() {
  const [
    basicHighlighted,
    defaultValueHighlighted,
    dateBoundsHighlighted,
    disabledHighlighted,
    invalidHighlighted,
    customFormatHighlighted,
    rangeBasicHighlighted,
    rangeDefaultHighlighted,
    rangeDisabledHighlighted,
    rangeInvalidHighlighted,
    formHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(defaultValueCode),
    highlight(dateBoundsCode),
    highlight(disabledCode),
    highlight(invalidCode),
    highlight(customFormatCode),
    highlight(rangeBasicCode),
    highlight(rangeDefaultCode),
    highlight(rangeDisabledCode),
    highlight(rangeInvalidCode),
    highlight(formCode),
  ])

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 mb-4 text-foreground">DatePicker</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A date input that opens a Calendar in a popover. Available as a single date
        picker and a date range picker for selecting start and end dates.
      </p>
      <Alert variant="info" className="mb-8">
        DatePicker composes Popover and Calendar internally. For inline calendar
        usage without a trigger, use Calendar directly.
      </Alert>

      {/* -- DatePicker Examples ------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">DatePicker</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A simple date picker for selecting an event date. Click the trigger to
        open the calendar, then click a date to select it.
      </p>
      <div className="w-full">
        <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
          <BasicDemo />
        </ComponentPreview>
      </div>

      {/* Default value */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With default value</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pre-populate the picker with an existing date, useful for edit forms
        like a profile birth date field.
      </p>
      <div className="w-full">
        <ComponentPreview code={defaultValueCode} highlightedCode={defaultValueHighlighted}>
          <DefaultValueDemo />
        </ComponentPreview>
      </div>

      {/* Date bounds */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With date bounds</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Restrict selectable dates using{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">calendarProps.disabled</code>.
        Here, past dates are disabled for a hotel check-in picker.
      </p>
      <div className="w-full">
        <ComponentPreview code={dateBoundsCode} highlightedCode={dateBoundsHighlighted}>
          <DateBoundsDemo />
        </ComponentPreview>
      </div>

      {/* Disabled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A disabled picker prevents interaction. Use when a prerequisite field
        hasn&apos;t been filled yet.
      </p>
      <div className="w-full">
        <ComponentPreview code={disabledCode} highlightedCode={disabledHighlighted}>
          <DisabledDemo />
        </ComponentPreview>
      </div>

      {/* Invalid */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Invalid</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The invalid state signals a validation error. Pair with FormItem for
        error messages in forms.
      </p>
      <div className="w-full">
        <ComponentPreview code={invalidCode} highlightedCode={invalidHighlighted}>
          <InvalidDemo />
        </ComponentPreview>
      </div>

      {/* Custom format */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Custom format</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override the default{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">MM/dd/yyyy</code>{' '}
        display format with a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">formatDate</code>{' '}
        function. This example uses Korean date formatting.
      </p>
      <div className="w-full">
        <ComponentPreview code={customFormatCode} highlightedCode={customFormatHighlighted}>
          <CustomFormatDemo />
        </ComponentPreview>
      </div>

      {/* -- DateRangePicker Examples -------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">DateRangePicker</h2>

      {/* Basic range */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Select a start and end date for a trip. The popover stays open until
        both dates are picked.
      </p>
      <div className="w-full">
        <ComponentPreview code={rangeBasicCode} highlightedCode={rangeBasicHighlighted}>
          <RangeBasicDemo />
        </ComponentPreview>
      </div>

      {/* Default range */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With default range</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pre-populate with an existing date range, useful for report period filters
        or editing existing bookings.
      </p>
      <div className="w-full">
        <ComponentPreview code={rangeDefaultCode} highlightedCode={rangeDefaultHighlighted}>
          <RangeDefaultDemo />
        </ComponentPreview>
      </div>

      {/* Disabled range */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A disabled range picker prevents interaction. Use when availability
        dates aren&apos;t yet known or a prerequisite field hasn&apos;t been filled.
      </p>
      <div className="w-full">
        <ComponentPreview code={rangeDisabledCode} highlightedCode={rangeDisabledHighlighted}>
          <RangeDisabledDemo />
        </ComponentPreview>
      </div>

      {/* Invalid range */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Invalid</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The invalid state signals a validation error on the range. Pair with
        FormItem for error messages in forms.
      </p>
      <div className="w-full">
        <ComponentPreview code={rangeInvalidCode} highlightedCode={rangeInvalidHighlighted}>
          <RangeInvalidDemo />
        </ComponentPreview>
      </div>

      {/* -- Form Integration ---------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form Integration</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Form.DatePicker</code>{' '}
        and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Form.DateRangePicker</code>{' '}
        from{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@umichkisa-ds/form</code>{' '}
        for react-hook-form integration. They wrap DatePicker and DateRangePicker with
        FormItem, validation, and error display.
      </p>
      <div className="w-full">
        <ComponentPreview code={formCode} highlightedCode={formHighlighted}>
          <p className="type-body-sm text-muted-foreground">
            Live demo available on the{' '}
            <a href="/forms/form-component" className="text-link underline hover:text-brand-primary">Form Component</a>{' '}
            page.
          </p>
        </ComponentPreview>
      </div>

      {/* -- API Reference ------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>

      {/* DatePicker API */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">DatePicker</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Single date picker with popover calendar.
      </p>
      <div className="hidden md:block">
        <Table>
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
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Date</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>The selected date.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onChange</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"(date: Date | undefined) => void"}</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Called when the selected date changes.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">formatDate</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"(date: Date) => string"}</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">MM/dd/yyyy</code></TableCell>
              <TableCell>Custom formatter for the displayed date string.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">placeholder</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;Select a date&quot;</code></TableCell>
              <TableCell>Text shown when no date is selected.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
              <TableCell>Disables the trigger button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
              <TableCell>Shows error styling on the trigger.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">calendarProps</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">CalendarProps</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                {"Passed to the underlying Calendar. Common patterns: "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: { before: date }"}</code>{", "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: { after: date }"}</code>{", "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: [date1, date2]"}</code>{" for specific dates. See Calendar docs for full options."}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Applied to the trigger button via cn().</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="block md:hidden">
        <TableMobileList>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>value</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">Date</code></span>
            <span className="type-caption text-muted-foreground">The selected date.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>onChange</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"(date: Date | undefined) => void"}</code></span>
            <span className="type-caption text-muted-foreground">Called when the selected date changes.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>formatDate</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"(date: Date) => string"}</code></span>
            <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">MM/dd/yyyy</code></span>
            <span className="type-caption text-muted-foreground">Custom formatter for the displayed date string.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>placeholder</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
            <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;Select a date&quot;</code></span>
            <span className="type-caption text-muted-foreground">Text shown when no date is selected.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
            <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
            <span className="type-caption text-muted-foreground">Disables the trigger button.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
            <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
            <span className="type-caption text-muted-foreground">Shows error styling on the trigger.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>calendarProps</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">CalendarProps</code></span>
            <span className="type-caption text-muted-foreground">
              {"Passed to the underlying Calendar. Common patterns: "}
              <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"disabled: { before: date }"}</code>{", "}
              <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"disabled: { after: date }"}</code>{", "}
              <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"disabled: [date1, date2]"}</code>{". See Calendar docs."}
            </span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>className</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
            <span className="type-caption text-muted-foreground">Applied to the trigger button via cn().</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

      {/* DateRangePicker API */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DateRangePicker</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Date range picker with popover calendar. Closes after both start and end dates are selected.
      </p>
      <div className="hidden md:block">
        <Table>
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
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">DateRange</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                {"The selected date range — "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"{ from?: Date; to?: Date }"}</code>
                {". Import DateRange type from @umichkisa-ds/web."}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onChange</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"(range: DateRange | undefined) => void"}</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Called when the selected range changes.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">formatDate</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"(date: Date) => string"}</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">MM/dd/yyyy</code></TableCell>
              <TableCell>Custom formatter applied to both start and end dates.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">placeholder</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;Select a date range&quot;</code></TableCell>
              <TableCell>Text shown when no range is selected.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
              <TableCell>Disables the trigger button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></TableCell>
              <TableCell>Shows error styling on the trigger.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">calendarProps</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">CalendarProps</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                {"Passed to the underlying Calendar. Common patterns: "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: { before: date }"}</code>{", "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: { after: date }"}</code>{", "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: [date1, date2]"}</code>{" for specific dates. See Calendar docs for full options."}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></TableCell>
              <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Applied to the trigger button via cn().</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="block md:hidden">
        <TableMobileList>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>value</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">DateRange</code></span>
            <span className="type-caption text-muted-foreground">
              {"The selected date range — "}
              <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"{ from?: Date; to?: Date }"}</code>
              {". Import DateRange type from @umichkisa-ds/web."}
            </span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>onChange</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"(range: DateRange | undefined) => void"}</code></span>
            <span className="type-caption text-muted-foreground">Called when the selected range changes.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>formatDate</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"(date: Date) => string"}</code></span>
            <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">MM/dd/yyyy</code></span>
            <span className="type-caption text-muted-foreground">Custom formatter applied to both start and end dates.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>placeholder</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
            <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">&quot;Select a date range&quot;</code></span>
            <span className="type-caption text-muted-foreground">Text shown when no range is selected.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
            <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
            <span className="type-caption text-muted-foreground">Disables the trigger button.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">boolean</code></span>
            <span className="type-caption text-muted-foreground">Default: <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">false</code></span>
            <span className="type-caption text-muted-foreground">Shows error styling on the trigger.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>calendarProps</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">CalendarProps</code></span>
            <span className="type-caption text-muted-foreground">
              {"Passed to the underlying Calendar. Common patterns: "}
              <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"disabled: { before: date }"}</code>{", "}
              <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"disabled: { after: date }"}</code>{", "}
              <code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">{"disabled: [date1, date2]"}</code>{". See Calendar docs."}
            </span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>className</strong></span>
            <span className="type-caption text-muted-foreground"><code className="rounded px-1 py-0.5 font-mono bg-surface-subtle">string</code></span>
            <span className="type-caption text-muted-foreground">Applied to the trigger button via cn().</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

    </Container>
  )
}
