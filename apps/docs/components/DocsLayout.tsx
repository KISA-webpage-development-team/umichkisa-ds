export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:ml-[var(--docs-sidebar-w)] p-6 lg:p-12 min-h-[calc(100vh-var(--docs-header-h))]">
      {children}
    </div>
  )
}
