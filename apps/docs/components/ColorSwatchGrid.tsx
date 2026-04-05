import { Grid } from '@umichkisa-ds/web'

type ColorSwatchGridProps = {
  children: React.ReactNode
}

export function ColorSwatchGrid({ children }: ColorSwatchGridProps) {
  return (
    <Grid
      columns={{ base: 2, md: 3, lg: 4 }}
      gap="element"
      className="my-6"
    >
      {children}
    </Grid>
  )
}
