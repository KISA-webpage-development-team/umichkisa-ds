'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const showSidebar = pathname.startsWith('/foundation') || pathname.startsWith('/components')

  return (
    <>
      {/* Skip link: off-screen by default, jumps into view on focus */}
      <a
        href="#main-content"
        className="absolute left-[-9999px] top-4 bg-brand-primary text-brand-foreground px-4 py-2 rounded-md text-sm font-bold z-[var(--docs-z-skip)] focus:left-4"
      >
        Skip to main content
      </a>
      <Header showSidebar={showSidebar} onMenuClick={() => setSidebarOpen(true)} />
      {showSidebar && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <div className="pt-[var(--docs-header-h)]" id="main-content">
        {children}
      </div>
    </>
  )
}
