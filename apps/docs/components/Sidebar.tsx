'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

interface CategoryGroup {
  label: string
  items: NavItem[]
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

const COMPONENT_CATEGORIES: CategoryGroup[] = [
  {
    label: 'Icon',
    items: [
      { label: 'Icon', href: '/components/icon' },
    ],
  },
  {
    label: 'Buttons',
    items: [
      { label: 'Button',     href: '/components/button' },
      { label: 'IconButton',  href: '/components/icon-button' },
      { label: 'LinkButton',  href: '/components/link-button' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { label: 'Container', href: '/components/container' },
      { label: 'Divider',   href: '/components/divider' },
      { label: 'Grid',      href: '/components/grid' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { label: 'Forms Overview', href: '/components/forms' },
      { label: 'Checkbox',       href: '/components/checkbox' },
      { label: 'FormItem',       href: '/components/form-item' },
      { label: 'Input',          href: '/components/input' },
      { label: 'Label',          href: '/components/label' },
      { label: 'Radio',          href: '/components/radio' },
      { label: 'Select',         href: '/components/select' },
      { label: 'Switch',         href: '/components/switch' },
      { label: 'Textarea',       href: '/components/textarea' },
    ],
  },
  {
    label: 'Data Display',
    items: [
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Badge',  href: '/components/badge' },
    ],
  },
]

const SECTIONS = {
  foundation: { label: 'Foundation', items: FOUNDATION_ITEMS, categories: null },
  components: { label: 'Components', items: null, categories: COMPONENT_CATEGORIES },
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const isComponents = pathname.startsWith('/components')
  const section = isComponents ? SECTIONS.components : SECTIONS.foundation

  // Determine which category contains the current route
  const activeCategory = isComponents
    ? COMPONENT_CATEGORIES.find((cat) =>
        cat.items.some((item) => pathname === item.href || pathname.startsWith(item.href + '/'))
      )?.label ?? null
    : null

  // Track categories the user has manually toggled
  const [manualToggles, setManualToggles] = useState<Record<string, boolean>>({})

  // Reset manual toggles when route changes
  useEffect(() => {
    setManualToggles({})
  }, [pathname])

  const isCategoryOpen = useCallback(
    (label: string) => {
      if (label in manualToggles) return manualToggles[label]
      return label === activeCategory
    },
    [manualToggles, activeCategory]
  )

  const toggleCategory = useCallback((label: string) => {
    setManualToggles((prev) => ({
      ...prev,
      [label]: !(prev[label] ?? label === activeCategory),
    }))
  }, [activeCategory])

  return (
    <>
      {/* Backdrop: mobile-only, shown when open */}
      <div
        className={`fixed inset-0 bg-overlay z-[var(--docs-z-backdrop)] ${open ? 'block lg:hidden' : 'hidden'}`}
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
          <span className="block font-sejong-bold text-md text-foreground mb-3">
            {section.label}
          </span>

          {/* Foundation section: render with existing nested children logic */}
          {section.items?.map((item) => {
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
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:bg-surface-subtle'
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
                                : 'font-sejong-light text-muted-foreground hover:bg-surface-subtle'
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
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:bg-surface-subtle'
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            )
          })}

          {/* Components section: render collapsible categories */}
          {section.categories?.map((category) => {
            const isOpen = isCategoryOpen(category.label)
            return (
              <div key={category.label} className="mb-1">
                <button
                  type="button"
                  onClick={() => toggleCategory(category.label)}
                  className="flex w-full items-center justify-between py-2 px-3 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-[120ms]"
                  aria-expanded={isOpen}
                >
                  {category.label}
                  <svg
                    className={`h-3 w-3 transition-transform duration-[150ms] ${isOpen ? 'rotate-90' : ''}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4.5 2.5L8 6L4.5 9.5" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="ml-1">
                    {category.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block py-2 px-3 text-sm transition-colors rounded-md
                            duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px] ${
                            isActive
                              ? 'font-sejong-bold text-foreground'
                              : 'font-sejong-light text-muted-foreground hover:bg-surface-subtle'
                          }`}
                          onClick={onClose}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    </>
  )
}
