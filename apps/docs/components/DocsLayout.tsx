export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-0 lg:ml-[var(--docs-sidebar-w)] 
    p-6 lg:p-12 min-h-[calc(100vh-var(--docs-header-h))]">
      {children}
    </div>
  )
}
