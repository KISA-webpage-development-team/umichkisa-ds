'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Skip link: off-screen by default, jumps into view on focus */}
      <a
        href="#main-content"
        className="absolute left-[-9999px] top-4 bg-brand-primary text-brand-foreground px-4 py-2 rounded-md type-body-sm z-[var(--docs-z-skip)] focus:left-4"
      >
        Skip to main content
      </a>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="pt-[var(--docs-header-h)]" id="main-content">
        {children}
      </main>
    </>
  )
}
