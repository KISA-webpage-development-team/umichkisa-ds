'use client'

import { useState } from 'react'
import { FormItem, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

export function WithSelectDemo() {
  const [role, setRole] = useState('')

  return (
    <div className="w-full max-w-sm">
      <FormItem htmlFor="sel-role" label="Role" required>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger placeholder="Select a role" />
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </FormItem>
    </div>
  )
}
