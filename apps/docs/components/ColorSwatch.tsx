import { Card } from '@umichkisa-ds/web'

type ColorSwatchProps = {
  token: string
  value?: string
  hex?: string
  label: string
}

export function ColorSwatch({ token, value, hex, label }: ColorSwatchProps) {
  const isLight =
    token.includes("maize-light") ||
    token.includes("gray-50") ||
    token.includes("gray-100") ||
    token.includes("gray-200") ||
    token.includes("gray-300") ||
    token.includes("white") ||
    token.includes("surface") ||
    token.includes("border") ||
    token.includes("-subtle") ||
    token.includes("muted") ||
    token.includes("overlay")

  return (
    <Card className="overflow-hidden !p-0 !gap-0 !bg-surface">
      {/* Color block */}
      <div
        className="relative h-20 w-full"
        style={{
          backgroundColor: `var(${token})`,
          backgroundImage: isLight
            ? "repeating-conic-gradient(var(--color-border) 0% 25%, transparent 0% 50%)"
            : undefined,
          backgroundSize: isLight ? "8px 8px" : undefined,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `var(${token})` }}
          aria-hidden="true"
        />
      </div>

      {/* Meta */}
      <div className="space-y-1 p-3">
        <p className="break-words type-caption font-mono !font-semibold !leading-snug text-foreground">
          {token}
        </p>

        {value && (
          <p className="type-caption font-mono !leading-snug text-muted-foreground">
            {value}
          </p>
        )}

        {hex && (
          <p className="type-caption font-mono uppercase !leading-snug text-muted-foreground">
            {hex}
          </p>
        )}

        <p className="pt-0.5 type-caption !font-medium text-muted-foreground">
          {label}
        </p>
      </div>
    </Card>
  )
}
