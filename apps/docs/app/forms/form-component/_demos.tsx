'use client'

import { SelectTrigger, SelectContent, SelectItem, RadioItem } from '@umichkisa-ds/web'
import { useForm, Form } from '@umichkisa-ds/form'

/* ── FormRootDemo ─────────────────────────────────────────── */

type ContactValues = { name: string; message: string }

export function FormRootDemo() {
  const form = useForm<ContactValues>({
    defaultValues: { name: '', message: '' },
  })

  return (
    <Form form={form} onSubmit={(data) => alert(`From ${data.name}: ${data.message}`)} className="w-full max-w-sm">
      <Form.Input name="name" label="Name" rules={{ required: 'Name is required' }} />
      <Form.Textarea name="message" label="Message" rules={{ required: 'Message is required' }} />
      <Form.Button>Send</Form.Button>
    </Form>
  )
}

/* ── InputDemo ────────────────────────────────────────────── */

type InputDemoValues = { email: string }

export function InputDemo() {
  const form = useForm<InputDemoValues>({ defaultValues: { email: '' } })

  return (
    <Form form={form} onSubmit={() => {}} className="w-full max-w-sm">
      <Form.Input
        name="email"
        label="Email"
        type="email"
        placeholder="you@umich.edu"
        description="We'll use your UMich email for verification."
        rules={{ required: 'Email is required' }}
      />
    </Form>
  )
}

/* ── TextareaDemo ─────────────────────────────────────────── */

type TextareaDemoValues = { bio: string }

export function TextareaDemo() {
  const form = useForm<TextareaDemoValues>({ defaultValues: { bio: '' } })

  return (
    <Form form={form} onSubmit={() => {}} className="w-full max-w-sm">
      <Form.Textarea
        name="bio"
        label="Bio"
        placeholder="Tell us about yourself..."
        description="Minimum 10 characters."
        rules={{
          required: 'Bio is required',
          minLength: { value: 10, message: 'At least 10 characters' },
        }}
      />
    </Form>
  )
}

/* ── SelectDemo ───────────────────────────────────────────── */

type SelectDemoValues = { role: string }

export function SelectDemo() {
  const form = useForm<SelectDemoValues>({ defaultValues: { role: '' } })

  return (
    <Form form={form} onSubmit={() => {}} className="w-full max-w-sm">
      <Form.Select name="role" label="Role" rules={{ required: 'Select a role' }}>
        <SelectTrigger placeholder="Choose a role" />
        <SelectContent>
          <SelectItem value="member">Member</SelectItem>
          <SelectItem value="officer">Officer</SelectItem>
          <SelectItem value="president">President</SelectItem>
        </SelectContent>
      </Form.Select>
    </Form>
  )
}

/* ── CheckboxDemo ─────────────────────────────────────────── */

type CheckboxDemoValues = { terms: boolean }

export function CheckboxDemo() {
  const form = useForm<CheckboxDemoValues>({ defaultValues: { terms: false } })

  return (
    <Form form={form} onSubmit={() => {}} className="w-full max-w-sm">
      <Form.Checkbox
        name="terms"
        label="I agree to the terms and conditions"
        rules={{ required: 'You must agree to continue' }}
      />
    </Form>
  )
}

/* ── RadioDemo ────────────────────────────────────────────── */

type RadioDemoValues = { contact: string }

export function RadioDemo() {
  const form = useForm<RadioDemoValues>({ defaultValues: { contact: '' } })

  return (
    <Form form={form} onSubmit={() => {}} className="w-full max-w-sm">
      <Form.Radio
        name="contact"
        label="Preferred contact method"
        rules={{ required: 'Select a contact method' }}
      >
        <RadioItem value="email" text="Email" />
        <RadioItem value="kakao" text="KakaoTalk" />
        <RadioItem value="phone" text="Phone" />
      </Form.Radio>
    </Form>
  )
}

/* ── SwitchDemo ───────────────────────────────────────────── */

type SwitchDemoValues = { notifications: boolean }

export function SwitchDemo() {
  const form = useForm<SwitchDemoValues>({ defaultValues: { notifications: false } })

  return (
    <Form form={form} onSubmit={() => {}} className="w-full max-w-sm">
      <Form.Switch
        name="notifications"
        label="Email notifications"
        description="Receive updates about KISA events and announcements."
      />
    </Form>
  )
}

/* ── DatePickerDemo ───────────────────────────────────────── */

type DatePickerDemoValues = { eventDate: Date | undefined }

export function DatePickerDemo() {
  const form = useForm<DatePickerDemoValues>({ defaultValues: { eventDate: undefined } })

  return (
    <Form form={form} onSubmit={() => {}} className="w-full max-w-sm">
      <Form.DatePicker
        name="eventDate"
        label="Event date"
        rules={{ required: 'Date is required' }}
        placeholder="Pick a date"
      />
    </Form>
  )
}

/* ── DateRangePickerDemo ──────────────────────────────────── */

type DateRangePickerDemoValues = { availability: { from?: Date; to?: Date } | undefined }

export function DateRangePickerDemo() {
  const form = useForm<DateRangePickerDemoValues>({ defaultValues: { availability: undefined } })

  return (
    <Form form={form} onSubmit={() => {}} className="w-full max-w-sm">
      <Form.DateRangePicker
        name="availability"
        label="Availability"
        description="When are you available for this event?"
        placeholder="Select dates"
      />
    </Form>
  )
}

/* ── ButtonDemo ───────────────────────────────────────────── */

type ButtonDemoValues = { name: string }

export function ButtonDemo() {
  const form = useForm<ButtonDemoValues>({ defaultValues: { name: '' } })

  return (
    <div className="w-full max-w-sm">
      <Form form={form} onSubmit={(data) => alert(`Hello, ${data.name}!`)}>
        <Form.Input name="name" label="Name" rules={{ required: 'Name is required' }} />
        <Form.Button disableWhenInvalid>Submit</Form.Button>
      </Form>
    </div>
  )
}
