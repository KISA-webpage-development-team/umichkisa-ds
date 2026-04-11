'use client'

import { useForm, Form } from '@umichkisa-ds/form'

type LoginValues = {
  email: string
  password: string
}

export function QuickStartDemo() {
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginValues) => {
    alert(`Logged in as ${data.email}`)
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="w-full max-w-sm">
      <Form.Input
        name="email"
        label="Email"
        type="email"
        placeholder="you@umich.edu"
        rules={{ required: 'Email is required' }}
      />
      <Form.Input
        name="password"
        label="Password"
        type="password"
        rules={{ required: 'Password is required' }}
      />
      <Form.Button>Sign in</Form.Button>
    </Form>
  )
}
