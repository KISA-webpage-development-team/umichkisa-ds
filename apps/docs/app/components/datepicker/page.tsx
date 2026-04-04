'use client'

import { useState } from 'react'
import { Container, DatePicker, DateRangePicker, type DateRange } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

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

export default function DatePickerPage() {
  const [basicDate, setBasicDate] = useState<Date>()
  const [defaultDate, setDefaultDate] = useState<Date | undefined>(new Date(2000, 0, 15))
  const [boundsDate, setBoundsDate] = useState<Date>()
  const [invalidDate, setInvalidDate] = useState<Date>()
  const [customDate, setCustomDate] = useState<Date>()
  const [rangeBasic, setRangeBasic] = useState<DateRange>()
  const [rangeDefault, setRangeDefault] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 31),
  })
  const [rangeInvalid, setRangeInvalid] = useState<DateRange>()

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const formatKorean = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`

  return (
    <Container size="md" as="article">

      {/* -- Header -------------------------------------------------- */}
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">DatePicker</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A date input that opens a Calendar in a popover. Available as a single date
        picker and a date range picker for selecting start and end dates.
      </p>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        DatePicker composes Popover and Calendar internally. For inline calendar
        usage without a trigger, use Calendar directly.
      </p>

      {/* -- DatePicker Examples ------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">DatePicker</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A simple date picker for selecting an event date. Click the trigger to
        open the calendar, then click a date to select it.
      </p>
      <div className="w-full">
        <ComponentPreview code={basicCode}>
          <div className="w-72">
            <DatePicker value={basicDate} onChange={setBasicDate} placeholder="Pick an event date" />
          </div>
        </ComponentPreview>
      </div>

      {/* Default value */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With default value</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pre-populate the picker with an existing date, useful for edit forms
        like a profile birth date field.
      </p>
      <div className="w-full">
        <ComponentPreview code={defaultValueCode}>
          <div className="w-72">
            <DatePicker value={defaultDate} onChange={setDefaultDate} placeholder="Birth date" />
          </div>
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
        <ComponentPreview code={dateBoundsCode}>
          <div className="w-72">
            <DatePicker
              value={boundsDate}
              onChange={setBoundsDate}
              placeholder="Choose a check-in date"
              calendarProps={{ disabled: { before: tomorrow } }}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Disabled */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A disabled picker prevents interaction. Use when a prerequisite field
        hasn&apos;t been filled yet.
      </p>
      <div className="w-full">
        <ComponentPreview code={disabledCode}>
          <div className="w-72">
            <DatePicker disabled placeholder="Not available" />
          </div>
        </ComponentPreview>
      </div>

      {/* Invalid */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Invalid</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The invalid state signals a validation error. Pair with FormItem for
        error messages in forms.
      </p>
      <div className="w-full">
        <ComponentPreview code={invalidCode}>
          <div className="w-72">
            <DatePicker value={invalidDate} onChange={setInvalidDate} invalid placeholder="Required" />
          </div>
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
        <ComponentPreview code={customFormatCode}>
          <div className="w-72">
            <DatePicker
              value={customDate}
              onChange={setCustomDate}
              formatDate={formatKorean}
              placeholder="날짜 선택"
            />
          </div>
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
        <ComponentPreview code={rangeBasicCode}>
          <div className="w-80">
            <DateRangePicker value={rangeBasic} onChange={setRangeBasic} placeholder="Select trip dates" />
          </div>
        </ComponentPreview>
      </div>

      {/* Default range */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With default range</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pre-populate with an existing date range, useful for report period filters
        or editing existing bookings.
      </p>
      <div className="w-full">
        <ComponentPreview code={rangeDefaultCode}>
          <div className="w-80">
            <DateRangePicker value={rangeDefault} onChange={setRangeDefault} placeholder="Report period" />
          </div>
        </ComponentPreview>
      </div>

      {/* Disabled range */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Disabled</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        A disabled range picker.
      </p>
      <div className="w-full">
        <ComponentPreview code={rangeDisabledCode}>
          <div className="w-80">
            <DateRangePicker disabled placeholder="Not available" />
          </div>
        </ComponentPreview>
      </div>

      {/* Invalid range */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Invalid</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The invalid state for range pickers, signaling a validation error.
      </p>
      <div className="w-full">
        <ComponentPreview code={rangeInvalidCode}>
          <div className="w-80">
            <DateRangePicker value={rangeInvalid} onChange={setRangeInvalid} invalid placeholder="Required" />
          </div>
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
        <ComponentPreview code={formCode}>
          <p className="type-body-sm text-muted-foreground">See code example below for Form.DatePicker and Form.DateRangePicker usage.</p>
        </ComponentPreview>
      </div>

      {/* -- API Reference ------------------------------------------- */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>

      {/* DatePicker API */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DatePicker</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Single date picker with popover calendar.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">Date</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The selected date.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onChange</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(date: Date | undefined) =&gt; void</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Called when the selected date changes.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">formatDate</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(date: Date) =&gt; string</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">MM/dd/yyyy</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Custom formatter for the displayed date string.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">placeholder</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;Select a date&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Text shown when no date is selected.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Disables the trigger button.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Shows error styling on the trigger.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">calendarProps</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">CalendarProps</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">{"Passed to the underlying Calendar. Common patterns: "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: { before: date }"}</code>{", "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: { after: date }"}</code>{", "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: [date1, date2]"}</code>{" for specific dates. See Calendar docs for full options."}
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Applied to the trigger button via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DateRangePicker API */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">DateRangePicker</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Date range picker with popover calendar. Closes after both start and end dates are selected.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">value</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">DateRange</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">{"The selected date range — "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"{ from?: Date; to?: Date }"}</code>
                {". Import DateRange type from @umichkisa-ds/web."}
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">onChange</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(range: DateRange | undefined) =&gt; void</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Called when the selected range changes.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">formatDate</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">(date: Date) =&gt; string</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">MM/dd/yyyy</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Custom formatter applied to both start and end dates.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">placeholder</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">&quot;Select a date range&quot;</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Text shown when no range is selected.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">disabled</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Disables the trigger button.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">invalid</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Shows error styling on the trigger.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">calendarProps</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">CalendarProps</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">{"Passed to the underlying Calendar. Common patterns: "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: { before: date }"}</code>{", "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: { after: date }"}</code>{", "}
                <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">{"disabled: [date1, date2]"}</code>{" for specific dates. See Calendar docs for full options."}
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Applied to the trigger button via cn().</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
