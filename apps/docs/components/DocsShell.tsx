'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <a href="#main-content" className="docs-skip-link">
        Skip to main content
      </a>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="docs-page-shell" id="main-content">
        {children}
      </div>
    </>
  )
}
