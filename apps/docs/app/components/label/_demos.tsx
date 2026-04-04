'use client'

import { useState } from 'react'
import { Label, Input, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

export function WithInputDemo() {
  const [username, setUsername] = useState('')

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="username" required>Username</Label>
      <Input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
    </div>
  )
}

export function WithAriaDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-2">
        <Label htmlFor="fruit" id="fruit-label">Fruit</Label>
        <Select>
          <SelectTrigger placeholder="Select a fruit..." aria-labelledby="fruit-label" />
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
