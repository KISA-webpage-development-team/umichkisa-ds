'use client'

import { DS_VERSION, LinkButton } from '@umichkisa-ds/web'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SECTIONS = [
  { label: 'Foundation', href: '/foundation', prefix: '/foundation' },
  { label: 'Components', href: '/components', prefix: '/components' },
]

interface HeaderProps {
  onMenuClick: () => void
  showSidebar: boolean
}

export function Header({ onMenuClick, showSidebar }: HeaderProps) {
  const pathname = usePathname()
  return (
    <header
      className="fixed top-0 left-0 right-0 h-20
       bg-surface border-b border-border
       flex items-center justify-between
       px-8 z-50
       "

       
      role="banner"
    >
      <div className="flex items-center gap-10">
        {/* Hamburger: mobile only, only when sidebar is active */}
        {showSidebar && (
        <button
          className="flex lg:hidden items-center justify-center min-w-11 min-h-11 bg-transparent border-none cursor-pointer rounded-md text-muted-foreground p-0 hover:bg-surface-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-controls="docs-sidebar"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        )}

        <Link
          href="/"
          className="flex items-center gap-2
          font-sejong-bold text-lg 
          text-brand-primary
          tracking-tight"
        >
          <Image
            src="/kisa_logo.png"
            alt="KISA logo"
            width={28}
            height={28}
            className="rounded-full shrink-0"
            priority
          />
          KISA Design System
        </Link>

        {/* Section nav — desktop only */}
        <nav className="hidden lg:flex items-center gap-2" aria-label="Sections">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`px-3 py-1.5 
                text-md transition-colors duration-150 font-sejong-bold ${
                pathname.startsWith(s.prefix)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <span className="bg-michigan-maize text-michigan-blue font-sejong-bold
          text-xs tracking-wide px-2.5 py-1
          rounded-full whitespace-nowrap">
          {DS_VERSION}
        </span>
        <a
          href="https://github.com/umichkisa/umichkisa-ds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center min-w-10 min-h-10 rounded-md text-muted-foreground transition-colors duration-150 hover:text-brand-primary hover:bg-surface-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
          aria-label="View source on GitHub"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.021C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </header>
  )
}
