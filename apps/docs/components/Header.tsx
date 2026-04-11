'use client'

import { Badge, DS_VERSION, IconButton } from '@umichkisa-ds/web'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SECTIONS = [
  { label: 'Foundation', href: '/foundation', prefix: '/foundation' },
  { label: 'Components', href: '/components', prefix: '/components' },
  { label: 'Forms', href: '/forms', prefix: '/forms' },
]

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  return (
    <header
      className="fixed top-0 left-0 right-0 h-16
       bg-surface
       flex items-center
       px-6 z-[var(--docs-z-header)]"
      role="banner"
    >
        {/* Left: hamburger (mobile only) */}
        <div className="flex items-center lg:hidden">
          <IconButton
            icon="menu"
            variant="tertiary"
            size="sm"
            aria-label="Open navigation menu"
            aria-controls="docs-sidebar"
            onClick={onMenuClick}
          />
        </div>

        {/* Center on mobile, left-aligned on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0
          flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2
              type-body !font-sejong-bold text-brand-primary"
          >
            <Image
              src="/kisa_logo.png"
              alt="KISA logo"
              width={28}
              height={28}
              className="rounded-full shrink-0"
              priority
            />
            <span className="whitespace-nowrap">KISA Design System</span>
          </Link>

          {/* Section nav — desktop only */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Sections">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                data-label={s.label}
                className={`px-3 py-1.5 rounded-md
                  type-body transition-colors duration-150
                  flex flex-col items-center
                  after:content-[attr(data-label)] after:!font-semibold
                  after:h-0 after:invisible after:overflow-hidden after:pointer-events-none
                  ${
                  pathname.startsWith(s.prefix)
                    ? 'text-brand-primary !font-semibold'
                    : 'text-foreground hover:text-brand-primary hover:!font-semibold'
                }`}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: badge + GitHub */}
        <div className="ml-auto flex items-center gap-3">
          <Badge
            size="sm"
            className="hidden lg:inline-flex bg-brand-accent text-brand-primary border-brand-accent rounded-full"
          >
            {DS_VERSION}
          </Badge>
          <a
            href="https://github.com/umichkisa/umichkisa-ds"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
          >
            <IconButton
              icon="github"
              variant="tertiary"
              size="sm"
              aria-label="View source on GitHub"
              tabIndex={-1}
            />
          </a>
        </div>
    </header>
  )
}
