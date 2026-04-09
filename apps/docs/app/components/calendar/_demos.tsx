'use client'

import { useState } from 'react'
import { Calendar, Button, Icon } from '@umichkisa-ds/web'
import type { DateRange } from '@umichkisa-ds/web'
import { format, addMonths, subMonths } from 'date-fns'

export function SingleDateDemo() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
      />
      {date && (
        <p className="type-body-sm text-foreground">
          Meeting scheduled for {format(date, 'MMMM d, yyyy')}
        </p>
      )}
    </div>
  )
}

export function RangeDemo() {
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
      />
      {range?.from && (
        <p className="type-body-sm text-foreground">
          {range.to
            ? `${format(range.from, 'MMM d')} — ${format(range.to, 'MMM d, yyyy')}`
            : `Check-in: ${format(range.from, 'MMM d, yyyy')}`}
        </p>
      )}
    </div>
  )
}

export function DisabledDatesDemo() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="w-full flex flex-col items-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: new Date() }}
      />
    </div>
  )
}

export function MultiMonthDemo() {
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
      />
      {range?.from && range?.to && (
        <p className="type-body-sm text-foreground">
          {format(range.from, 'MMM d')} — {format(range.to, 'MMM d, yyyy')}
        </p>
      )}
    </div>
  )
}

export function ControlledMonthDemo() {
  const [month, setMonth] = useState(new Date())
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col w-fit">
        <div className="flex items-center justify-between w-full mb-2">
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
    </div>
  )
}
