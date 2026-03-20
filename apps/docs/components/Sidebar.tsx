'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const FOUNDATION_ITEMS: NavItem[] = [
  {
    label: 'Colors',
    href: '/foundation/colors/overview',
    children: [
      { label: 'Overview',      href: '/foundation/colors/overview' },
      { label: 'Tokens',        href: '/foundation/colors/tokens' },
      { label: 'Usage',         href: '/foundation/colors/usage' },
      { label: 'Primitives',    href: '/foundation/colors/primitives' },
      { label: 'Accessibility', href: '/foundation/colors/accessibility' },
    ],
  },
  {
    label: 'Typography',
    href: '/foundation/typography/overview',
    children: [
      { label: 'Overview',   href: '/foundation/typography/overview' },
      { label: 'Fonts',      href: '/foundation/typography/fonts' },
      { label: 'Type Scale', href: '/foundation/typography/scale' },
      { label: 'Usage',      href: '/foundation/typography/usage' },
    ],
  },
  {
    label: 'Layout',
    href: '/foundation/layout/overview',
    children: [
      { label: 'Overview',     href: '/foundation/layout/overview' },
      { label: 'Breakpoints',  href: '/foundation/layout/breakpoints' },
      { label: 'Spacing',      href: '/foundation/layout/spacing' },
      { label: 'Usage',        href: '/foundation/layout/usage' },
    ],
  },
  {
    label: 'Iconography',
    href: '/foundation/iconography/overview',
    children: [
      { label: 'Overview',      href: '/foundation/iconography/overview' },
      { label: 'Library',       href: '/foundation/iconography/library' },
      { label: 'Sizes',         href: '/foundation/iconography/sizes' },
      { label: 'Usage',         href: '/foundation/iconography/usage' },
      { label: 'Accessibility', href: '/foundation/iconography/accessibility' },
    ],
  },
]

// Component items are placeholders — will expand as MDX content is added
const COMPONENT_ITEMS: NavItem[] = [
  { label: 'Button',   href: '/components/button' },
  { label: 'Icon',     href: '/components/icon' },
  { label: 'Form',     href: '/components/form' },
  { label: 'Feedback', href: '/components/feedback' },
]

const SECTIONS = {
  foundation: { label: 'Foundation', items: FOUNDATION_ITEMS },
  components:  { label: 'Components', items: COMPONENT_ITEMS },
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const section = pathname.startsWith('/components') ? SECTIONS.components : SECTIONS.foundation

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
        <div className="px-8">
          <span className="block font-sejong-bold text-md text-text-primary mb-3">
            {section.label}
          </span>
          {section.items.map((item) => {
            if (item.children) {
              const parentBase = item.href.substring(0, item.href.lastIndexOf('/'))
              const isParentActive = pathname.startsWith(parentBase)
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-3 px-3 text-sm transition-colors
                      font-sejong-bold rounded-md
                      duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px] ${
                      isParentActive
                        ? 'text-text-primary'
                        : 'text-text-muted hover:bg-surface-subtle'
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                  {isParentActive && (
                    <div className="ml-3 border-l border-border pl-3 mb-1">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block py-2 px-3 
                              text-sm transition-colors rounded-md
                              
                              duration-[120ms] focus-visible:outline
                              focus-visible:outline-2 focus-visible:outline-brand-primary 
                              focus-visible:outline-offset-[-2px] ${
                              isChildActive
                                ? 'font-sejong-bold'
                                : 'font-sejong-light text-text-muted hover:bg-surface-subtle'
                            }`}
                            onClick={onClose}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 px-3 text-sm transition-colors
                  font-sejong-bold rounded-md
                  duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px] ${
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-muted hover:bg-surface-subtle'
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
