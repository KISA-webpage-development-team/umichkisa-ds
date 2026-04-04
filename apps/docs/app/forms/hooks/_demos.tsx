'use client'

import { Input, Button, FormItem } from '@umichkisa-ds/web'
import { useForm, Form, useFormField, useFormStatus } from '@umichkisa-ds/form'

/* ── Demo: useFormField ───────────────────────────────────── */

type ProfileValues = { name: string; email: string }

function NameField() {
  const { inputProps, error } = useFormField<ProfileValues>('name', {
    required: 'Name is required',
  })
  const { value, ...rest } = inputProps

  return (
    <FormItem htmlFor="name" label="Name" error={error} required>
      <Input id="name" value={value as string} {...rest} />
    </FormItem>
  )
}

function EmailField() {
  const { inputProps, error } = useFormField<ProfileValues>('email', {
    required: 'Email is required',
  })
  const { value, ...rest } = inputProps

  return (
    <FormItem htmlFor="email" label="Email" error={error} required>
      <Input id="email" type="email" value={value as string} {...rest} />
    </FormItem>
  )
}

export function UseFormFieldDemo() {
  const form = useForm<ProfileValues>({
    defaultValues: { name: '', email: '' },
  })

  return (
    <Form form={form} onSubmit={(data) => alert(`${data.name} / ${data.email}`)} className="w-full max-w-sm">
      <NameField />
      <EmailField />
      <Button type="submit">Save</Button>
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
