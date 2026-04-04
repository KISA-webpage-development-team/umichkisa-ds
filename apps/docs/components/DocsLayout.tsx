'use client'

import { usePathname } from 'next/navigation'

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hasSidebar =
    pathname.startsWith('/foundation') ||
    pathname.startsWith('/components') ||
    pathname.startsWith('/forms')

  return (
    <div
      className={`p-6 lg:p-12 min-h-[calc(100vh-var(--docs-header-h))] ${
        hasSidebar ? 'lg:ml-[var(--docs-sidebar-w)]' : ''
      }`}
    >
      {children}
    </div>
  )
}
