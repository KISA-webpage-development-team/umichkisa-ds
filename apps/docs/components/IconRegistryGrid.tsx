'use client'

import { Card, Grid, Icon, iconNames } from '@umichkisa-ds/web'

export function IconRegistryGrid() {
  return (
    <>
      <p className="type-body-sm mb-4 text-muted-foreground max-w-prose">
        {iconNames.length} icons in the current registry.
      </p>
      <Grid columns={{ base: 3, md: 4, lg: 6 }} gap="component" className="my-6">
        {iconNames.map((name) => (
          <Card key={name} className="items-center">
            <Icon name={name} size="md" />
            <p className="type-caption font-mono text-muted-foreground text-center break-all">{name}</p>
          </Card>
        ))}
      </Grid>
    </>
  )
}
