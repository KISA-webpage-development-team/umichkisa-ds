'use client'

import { useForm, Form } from '@umichkisa-ds/form'

type ValidationDemoValues = {
  name: string
  email: string
  password: string
}

export function ValidationDemo() {
  const form = useForm<ValidationDemoValues>({
    defaultValues: { name: '', email: '', password: '' },
  })

  return (
    <Form form={form} onSubmit={(data) => alert(`Valid! ${data.name} / ${data.email}`)} className="w-full max-w-sm">
      <Form.Input
        name="name"
        label="Full Name"
        rules={{ required: 'Full name is required' }}
      />
      <Form.Input
        name="email"
        label="UMich Email"
        type="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^@]+@umich\.edu$/,
            message: 'Must be a @umich.edu email',
          },
        }}
      />
      <Form.Input
        name="password"
        label="Password"
        type="password"
        rules={{
          required: 'Password is required',
          minLength: { value: 8, message: 'At least 8 characters' },
          validate: (value: string) => {
            if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter'
            if (!/[0-9]/.test(value)) return 'Must include a number'
            return true
          },
        }}
      />
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}
