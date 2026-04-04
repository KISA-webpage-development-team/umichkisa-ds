'use client'

import { useState } from 'react'
import { ToggleGroup, Icon } from '@umichkisa-ds/web'

export function ContentViewDemo() {
  const [view, setView] = useState('posts')

  return (
    <div className="w-full">
      <ToggleGroup
        value={view}
        onValueChange={setView}
        items={[
          { value: 'posts', label: 'Posts', icon: <Icon name="list" size="sm" /> },
          { value: 'comments', label: 'Comments', icon: <Icon name="message-square" size="sm" /> },
        ]}
      />
    </div>
  )
}

export function PageSizeDemo() {
  const [pageSize, setPageSize] = useState('10')

  return (
    <div className="w-full">
      <ToggleGroup
        value={pageSize}
        onValueChange={setPageSize}
        items={[
          { value: '10', label: '10' },
          { value: '25', label: '25' },
          { value: '50', label: '50' },
        ]}
      />
    </div>
  )
}

export function FullWidthDemo() {
  const [view, setView] = useState('posts')

  return (
    <div className="w-full">
      <ToggleGroup
        value={view}
        onValueChange={setView}
        fullWidth
        items={[
          { value: 'posts', label: 'Posts', icon: <Icon name="list" size="sm" /> },
          { value: 'comments', label: 'Comments', icon: <Icon name="message-square" size="sm" /> },
        ]}
      />
    </div>
  )
}
