'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const FOUNDATION_ITEMS = [
  { label: 'Colors',        href: '/foundation/colors' },
  { label: 'Typography',    href: '/foundation/typography' },
  { label: 'Iconography',   href: '/foundation/iconography' },
  { label: 'Layout Tokens', href: '/foundation/layout-tokens' },
]

// Component items are placeholders — will expand as MDX content is added
const COMPONENT_ITEMS = [
  { label: 'Button',   href: '/components/button' },
  { label: 'Icon',     href: '/components/icon' },
  { label: 'Form',     href: '/components/form' },
  { label: 'Feedback', href: '/components/feedback' },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Backdrop: mobile-only, shown when open */}
      <div
        className={`fixed inset-0 bg-black/35 z-[var(--docs-z-backdrop)] ${open ? 'block lg:hidden' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/*
       * Sidebar:
       *   Desktop (lg+): always visible — lg:translate-x-0 overrides the mobile default
       *   Mobile: slides in from left when open, hidden behind viewport otherwise
       */}
      <nav
        id="docs-sidebar"
        className={`fixed top-[var(--docs-header-h)] left-0 bottom-0 w-[var(--docs-sidebar-w)] bg-surface border-r border-border overflow-y-auto z-[var(--docs-z-sidebar)] py-6 pb-8 flex flex-col transition-transform duration-[250ms] ease-in-out lg:translate-x-0 ${
          open
            ? 'translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.08)]'
            : '-translate-x-full lg:shadow-none'
        }`}
        aria-label="Documentation navigation"
      >
        <div className="px-4">
          <span className="block font-sejong-light text-[10px] uppercase tracking-[0.1em] text-text-muted pb-2">
            Foundation
          </span>
          {FOUNDATION_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center min-h-11 lg:min-h-9 py-3 lg:py-[7px] px-2 rounded-md text-sm transition-[background,color] duration-[120ms] border-l-2 -ml-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-[-2px] ${
                  isActive
                    ? 'border-brand-primary text-brand-primary font-sejong-bold pl-1.5'
                    : 'border-transparent text-text-primary font-sejong-light hover:bg-surface-muted'
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="px-4 mt-7">
          <span className="block font-sejong-light text-[10px] uppercase tracking-[0.1em] text-text-muted pb-2">
            Components
          </span>
          {COMPONENT_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center min-h-11 lg:min-h-9 py-3 lg:py-[7px] px-2 rounded-md text-sm transition-[background,color] duration-[120ms] border-l-2 -ml-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-[-2px] ${
                  isActive
                    ? 'border-brand-primary text-brand-primary font-sejong-bold pl-1.5'
                    : 'border-transparent text-text-primary font-sejong-light hover:bg-surface-muted'
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
