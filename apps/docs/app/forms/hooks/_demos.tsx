'use client'

import { Input, Button, Label } from '@umichkisa-ds/web'
import { useForm, Form, useFormField, useFormStatus } from '@umichkisa-ds/form'

/* ── Demo: useFormField ───────────────────────────────────── */

type ProfileValues = { name: string; email: string }

function InlineField({ name, label, rules }: {
  name: keyof ProfileValues
  label: string
  rules?: Record<string, string>
}) {
  const { inputProps, error } = useFormField<ProfileValues>(name, rules)
  const { value, ...rest } = inputProps

  return (
    <div className="flex items-start gap-2">
      <Label htmlFor={name} className="w-20 shrink-0 mt-2">{label}</Label>
      <div className="flex-1">
        <Input id={name} value={value as string} {...rest} />
        {error && <p className="type-caption text-error mt-1">{error}</p>}
      </div>
    </div>
  )
}

export function UseFormFieldDemo() {
  const form = useForm<ProfileValues>({
    defaultValues: { name: '', email: '' },
  })

  return (
    <Form form={form} onSubmit={(data) => alert(`${data.name} / ${data.email}`)} className="w-full max-w-sm">
      <InlineField name="name" label="Name" rules={{ required: 'Name is required' }} />
      <InlineField name="email" label="Email" rules={{ required: 'Email is required' }} />
      <div className="flex items-start gap-2">
        <div className="w-20 shrink-0" />
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}

/* ── Demo: useFormStatus ──────────────────────────────────── */

function SubmitFooter() {
  const { isSubmitting, isValid, isDirty } = useFormStatus()

  return (
    <div className="flex items-center justify-between pt-2">
      <span className="type-body-sm text-muted-foreground">
        {isDirty ? 'Unsaved changes' : 'No changes'}
      </span>
      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Saving...' : 'Save changes'}
      </Button>
    </div>
  )
}

type SettingsValues = { name: string }

export function UseFormStatusDemo() {
  const form = useForm<SettingsValues>({
    defaultValues: { name: '' },
  })

  return (
    <Form form={form} onSubmit={(data) => alert(`Saved: ${data.name}`)} className="w-full max-w-sm">
      <Form.Input name="name" label="Display Name" rules={{ required: 'Required' }} />
      <SubmitFooter />
    </Form>
  )
}
