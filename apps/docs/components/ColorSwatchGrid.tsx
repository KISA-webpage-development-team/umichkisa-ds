type ColorSwatchGridProps = {
  children: React.ReactNode
}

export function ColorSwatchGrid({ children }: ColorSwatchGridProps) {
  return (
    <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  )
}
