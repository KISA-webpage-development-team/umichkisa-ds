'use client'

import { useState } from 'react'
import { DatePicker, DateRangePicker, type DateRange } from '@umichkisa-ds/web'

export function BasicDemo() {
  const [date, setDate] = useState<Date>()
  return (
    <div className="w-72">
      <DatePicker value={date} onChange={setDate} placeholder="Pick an event date" />
    </div>
  )
}

export function DefaultValueDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2000, 0, 15))
  return (
    <div className="w-72">
      <DatePicker value={date} onChange={setDate} placeholder="Birth date" />
    </div>
  )
}

export function DateBoundsDemo() {
  const [date, setDate] = useState<Date>()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <div className="w-72">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Choose a check-in date"
        calendarProps={{ disabled: { before: tomorrow } }}
      />
    </div>
  )
}

export function DisabledDemo() {
  return (
    <div className="w-72">
      <DatePicker disabled placeholder="Not available" />
    </div>
  )
}

export function InvalidDemo() {
  const [date, setDate] = useState<Date>()
  return (
    <div className="w-72">
      <DatePicker value={date} onChange={setDate} invalid placeholder="Required" />
    </div>
  )
}

export function CustomFormatDemo() {
  const [date, setDate] = useState<Date>()
  const formatKorean = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`

  return (
    <div className="w-72">
      <DatePicker
        value={date}
        onChange={setDate}
        formatDate={formatKorean}
        placeholder="날짜 선택"
      />
    </div>
  )
}

export function RangeBasicDemo() {
  const [range, setRange] = useState<DateRange>()
  return (
    <div className="w-80">
      <DateRangePicker value={range} onChange={setRange} placeholder="Select trip dates" />
    </div>
  )
}

export function RangeDefaultDemo() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 31),
  })
  return (
    <div className="w-80">
      <DateRangePicker value={range} onChange={setRange} placeholder="Report period" />
    </div>
  )
}

export function RangeDisabledDemo() {
  return (
    <div className="w-80">
      <DateRangePicker disabled placeholder="Not available" />
    </div>
  )
}

export function RangeInvalidDemo() {
  const [range, setRange] = useState<DateRange>()
  return (
    <div className="w-80">
      <DateRangePicker value={range} onChange={setRange} invalid placeholder="Required" />
    </div>
  )
}
