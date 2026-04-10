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
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'
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
      <Heading as="h2" id="datepicker-examples">DatePicker</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6" id="datepicker-basic">Basic</Heading>
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
      <Heading as="h3">With default value</Heading>
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
      <Heading as="h3">With date bounds</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Restrict selectable dates using{' '}
        <InlineCode>calendarProps.disabled</InlineCode>.
        Here, past dates are disabled for a hotel check-in picker.
      </p>
      <div className="w-full">
        <ComponentPreview code={dateBoundsCode} highlightedCode={dateBoundsHighlighted}>
          <DateBoundsDemo />
        </ComponentPreview>
      </div>

      {/* Disabled */}
      <Heading as="h3" id="datepicker-disabled">Disabled</Heading>
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
      <Heading as="h3" id="datepicker-invalid">Invalid</Heading>
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
      <Heading as="h3">Custom format</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Override the default{' '}
        <InlineCode>MM/dd/yyyy</InlineCode>{' '}
        display format with a{' '}
        <InlineCode>formatDate</InlineCode>{' '}
        function. This example uses Korean date formatting.
      </p>
      <div className="w-full">
        <ComponentPreview code={customFormatCode} highlightedCode={customFormatHighlighted}>
          <CustomFormatDemo />
        </ComponentPreview>
      </div>

      {/* -- DateRangePicker Examples -------------------------------- */}
      <Heading as="h2" id="daterangepicker-examples">DateRangePicker</Heading>

      {/* Basic range */}
      <Heading as="h3" className="mt-6" id="daterangepicker-basic">Basic</Heading>
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
      <Heading as="h3">With default range</Heading>
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
      <Heading as="h3" id="daterangepicker-disabled">Disabled</Heading>
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
      <Heading as="h3" id="daterangepicker-invalid">Invalid</Heading>
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
      <Heading as="h2">Form Integration</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use{' '}
        <InlineCode>Form.DatePicker</InlineCode>{' '}
        and{' '}
        <InlineCode>Form.DateRangePicker</InlineCode>{' '}
        from{' '}
        <InlineCode>@umichkisa-ds/form</InlineCode>{' '}
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
      <Heading as="h2">API Reference</Heading>

      {/* DatePicker API */}
      <Heading as="h3" className="mt-6" id="datepicker-api">DatePicker</Heading>
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
              <TableCell><InlineCode>value</InlineCode></TableCell>
              <TableCell><InlineCode>Date</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>The selected date.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>onChange</InlineCode></TableCell>
              <TableCell><InlineCode>{"(date: Date | undefined) => void"}</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Called when the selected date changes.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>formatDate</InlineCode></TableCell>
              <TableCell><InlineCode>{"(date: Date) => string"}</InlineCode></TableCell>
              <TableCell><InlineCode>MM/dd/yyyy</InlineCode></TableCell>
              <TableCell>Custom formatter for the displayed date string.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>placeholder</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
              <TableCell><InlineCode>&quot;Select a date&quot;</InlineCode></TableCell>
              <TableCell>Text shown when no date is selected.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>disabled</InlineCode></TableCell>
              <TableCell><InlineCode>boolean</InlineCode></TableCell>
              <TableCell><InlineCode>false</InlineCode></TableCell>
              <TableCell>Disables the trigger button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>invalid</InlineCode></TableCell>
              <TableCell><InlineCode>boolean</InlineCode></TableCell>
              <TableCell><InlineCode>false</InlineCode></TableCell>
              <TableCell>Shows error styling on the trigger.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>calendarProps</InlineCode></TableCell>
              <TableCell><InlineCode>CalendarProps</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                {"Passed to the underlying Calendar. Common patterns: "}
                <InlineCode>{"disabled: { before: date }"}</InlineCode>{", "}
                <InlineCode>{"disabled: { after: date }"}</InlineCode>{", "}
                <InlineCode>{"disabled: [date1, date2]"}</InlineCode>{" for specific dates. See Calendar docs for full options."}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>className</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
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
            <span className="type-caption text-muted-foreground"><InlineCode>Date</InlineCode></span>
            <span className="type-caption text-muted-foreground">The selected date.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>onChange</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>{"(date: Date | undefined) => void"}</InlineCode></span>
            <span className="type-caption text-muted-foreground">Called when the selected date changes.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>formatDate</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>{"(date: Date) => string"}</InlineCode></span>
            <span className="type-caption text-muted-foreground">Default: <InlineCode>MM/dd/yyyy</InlineCode></span>
            <span className="type-caption text-muted-foreground">Custom formatter for the displayed date string.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>placeholder</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
            <span className="type-caption text-muted-foreground">Default: <InlineCode>&quot;Select a date&quot;</InlineCode></span>
            <span className="type-caption text-muted-foreground">Text shown when no date is selected.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
            <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
            <span className="type-caption text-muted-foreground">Disables the trigger button.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
            <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
            <span className="type-caption text-muted-foreground">Shows error styling on the trigger.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>calendarProps</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>CalendarProps</InlineCode></span>
            <span className="type-caption text-muted-foreground">
              {"Passed to the underlying Calendar. Common patterns: "}
              <InlineCode>{"disabled: { before: date }"}</InlineCode>{", "}
              <InlineCode>{"disabled: { after: date }"}</InlineCode>{", "}
              <InlineCode>{"disabled: [date1, date2]"}</InlineCode>{". See Calendar docs."}
            </span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>className</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
            <span className="type-caption text-muted-foreground">Applied to the trigger button via cn().</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

      {/* DateRangePicker API */}
      <Heading as="h3" id="daterangepicker-api">DateRangePicker</Heading>
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
              <TableCell><InlineCode>value</InlineCode></TableCell>
              <TableCell><InlineCode>DateRange</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                {"The selected date range — "}
                <InlineCode>{"{ from?: Date; to?: Date }"}</InlineCode>
                {". Import DateRange type from @umichkisa-ds/web."}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>onChange</InlineCode></TableCell>
              <TableCell><InlineCode>{"(range: DateRange | undefined) => void"}</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>Called when the selected range changes.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>formatDate</InlineCode></TableCell>
              <TableCell><InlineCode>{"(date: Date) => string"}</InlineCode></TableCell>
              <TableCell><InlineCode>MM/dd/yyyy</InlineCode></TableCell>
              <TableCell>Custom formatter applied to both start and end dates.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>placeholder</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
              <TableCell><InlineCode>&quot;Select a date range&quot;</InlineCode></TableCell>
              <TableCell>Text shown when no range is selected.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>disabled</InlineCode></TableCell>
              <TableCell><InlineCode>boolean</InlineCode></TableCell>
              <TableCell><InlineCode>false</InlineCode></TableCell>
              <TableCell>Disables the trigger button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>invalid</InlineCode></TableCell>
              <TableCell><InlineCode>boolean</InlineCode></TableCell>
              <TableCell><InlineCode>false</InlineCode></TableCell>
              <TableCell>Shows error styling on the trigger.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>calendarProps</InlineCode></TableCell>
              <TableCell><InlineCode>CalendarProps</InlineCode></TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                {"Passed to the underlying Calendar. Common patterns: "}
                <InlineCode>{"disabled: { before: date }"}</InlineCode>{", "}
                <InlineCode>{"disabled: { after: date }"}</InlineCode>{", "}
                <InlineCode>{"disabled: [date1, date2]"}</InlineCode>{" for specific dates. See Calendar docs for full options."}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><InlineCode>className</InlineCode></TableCell>
              <TableCell><InlineCode>string</InlineCode></TableCell>
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
            <span className="type-caption text-muted-foreground"><InlineCode>DateRange</InlineCode></span>
            <span className="type-caption text-muted-foreground">
              {"The selected date range — "}
              <InlineCode>{"{ from?: Date; to?: Date }"}</InlineCode>
              {". Import DateRange type from @umichkisa-ds/web."}
            </span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>onChange</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>{"(range: DateRange | undefined) => void"}</InlineCode></span>
            <span className="type-caption text-muted-foreground">Called when the selected range changes.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>formatDate</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>{"(date: Date) => string"}</InlineCode></span>
            <span className="type-caption text-muted-foreground">Default: <InlineCode>MM/dd/yyyy</InlineCode></span>
            <span className="type-caption text-muted-foreground">Custom formatter applied to both start and end dates.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>placeholder</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
            <span className="type-caption text-muted-foreground">Default: <InlineCode>&quot;Select a date range&quot;</InlineCode></span>
            <span className="type-caption text-muted-foreground">Text shown when no range is selected.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>disabled</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
            <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
            <span className="type-caption text-muted-foreground">Disables the trigger button.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
            <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
            <span className="type-caption text-muted-foreground">Shows error styling on the trigger.</span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>calendarProps</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>CalendarProps</InlineCode></span>
            <span className="type-caption text-muted-foreground">
              {"Passed to the underlying Calendar. Common patterns: "}
              <InlineCode>{"disabled: { before: date }"}</InlineCode>{", "}
              <InlineCode>{"disabled: { after: date }"}</InlineCode>{", "}
              <InlineCode>{"disabled: [date1, date2]"}</InlineCode>{". See Calendar docs."}
            </span>
          </TableMobileItem>
          <TableMobileItem>
            <span className="type-body-sm text-foreground"><strong>className</strong></span>
            <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
            <span className="type-caption text-muted-foreground">Applied to the trigger button via cn().</span>
          </TableMobileItem>
        </TableMobileList>
      </div>

    </Container>
  )
}
