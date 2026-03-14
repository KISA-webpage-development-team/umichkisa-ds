export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-content">
      <div className="docs-content-inner">{children}</div>
    </div>
  )
}
