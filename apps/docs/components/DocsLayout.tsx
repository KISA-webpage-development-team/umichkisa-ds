import { PrevNext } from '@/components/PrevNext'

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:ml-[var(--docs-sidebar-w)]">
      {children}
      <PrevNext />
    </div>
  )
}
