export function Footer() {
  return (
    <footer className="lg:ml-[var(--docs-sidebar-w)] py-8 px-6 lg:px-12">
      <p className="type-caption text-muted-foreground">
        KISA Design System · © {new Date().getFullYear()} KISA · Built from
        scratch by{' '}
        <a
          href="https://github.com/retz8"
          className="text-link underline hover:text-brand-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          @retz8
        </a>
      </p>
    </footer>
  )
}
