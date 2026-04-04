'use client'

import { useForm, Form } from '@umichkisa-ds/form'

type SignupValues = {
  name: string
  email: string
}

export function BasicDemo() {
  const form = useForm<SignupValues>({
    defaultValues: { name: '', email: '' },
  })

  const onSubmit = (data: SignupValues) => {
    alert(`Welcome, ${data.name}!`)
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="w-full max-w-sm">
      <Form.Input name="name" label="Full Name" rules={{ required: 'Name is required' }} />
      <Form.Input name="email" label="Email" type="email" rules={{ required: 'Email is required' }} />
      <Form.Button>Sign up</Form.Button>
    </Form>
  )
}
