'use client'

import { useState } from 'react'
import { Switch } from '@umichkisa-ds/web'

export function ControlledDemo() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Switch
        text="Dark mode"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      <p className="type-caption text-muted-foreground">{enabled ? 'On' : 'Off'}</p>
    </div>
  )
}
