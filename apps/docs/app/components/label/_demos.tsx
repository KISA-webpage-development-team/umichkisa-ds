'use client'

import { useState } from 'react'
import { Label, Input } from '@umichkisa-ds/web'

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
