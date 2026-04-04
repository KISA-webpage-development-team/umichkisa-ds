'use client'

import { Badge, Container, DS_VERSION, IconButton } from '@umichkisa-ds/web'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SECTIONS = [
  { label: 'Foundation', href: '/foundation', prefix: '/foundation' },
  { label: 'Components', href: '/components', prefix: '/components' },
  { label: 'Forms', href: '/forms/overview', prefix: '/forms' },
]

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  return (
    <header
      className="fixed top-0 left-0 right-0 h-16
       bg-surface border-b border-border
       z-[var(--docs-z-header)]"
      role="banner"
    >
      <Container className="flex items-center justify-between h-full">
        <div className="flex items-center gap-10">
          {/* Hamburger: mobile only, always visible */}
          <IconButton
            icon="menu"
            variant="tertiary"
            size="sm"
            aria-label="Open navigation menu"
            aria-controls="docs-sidebar"
            onClick={onMenuClick}
            className="flex lg:hidden"
          />

          <Link
            href="/"
            className="flex items-center gap-2
              type-body font-sejong-bold text-brand-primary"
          >
            <Image
              src="/kisa_logo.png"
              alt="KISA logo"
              width={28}
              height={28}
              className="rounded-full shrink-0"
              priority
            />
            <span className="hidden md:inline">KISA Design System</span>
          </Link>

          {/* Section nav — desktop only */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Sections">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`px-3 py-1.5 rounded-md
                  type-body font-sejong-bold transition-colors duration-150 ${
                  pathname.startsWith(s.prefix)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:bg-brand-accent-subtle hover:text-foreground'
                }`}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            size="sm"
            className="hidden lg:inline-flex bg-brand-accent text-brand-primary border-brand-accent font-sejong-bold rounded-full"
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
      </Container>
    </header>
  )
}
