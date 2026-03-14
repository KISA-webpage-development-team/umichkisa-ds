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
    <div
      className="group overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-lg"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Color block */}
      <div
        className="relative h-20 w-full"
        style={{
          backgroundColor: `var(${token})`,
          backgroundImage: isLight
            ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='4' height='4' fill='%23e5e7eb'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23e5e7eb'/%3E%3C/svg%3E\")"
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
      <div
        className="space-y-1 p-3"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <p
          className="break-all font-mono text-[11px] font-semibold leading-snug"
          style={{ color: "var(--color-text-primary)" }}
        >
          {token}
        </p>

        {value && (
          <p
            className="font-mono text-[10px] leading-snug"
            style={{ color: "var(--color-text-muted)" }}
          >
            {value}
          </p>
        )}

        {hex && (
          <p
            className="font-mono text-[10px] uppercase leading-snug"
            style={{ color: "var(--color-text-muted)" }}
          >
            {hex}
          </p>
        )}

        <p
          className="pt-0.5 text-[11px] font-medium"
          style={{ color: "var(--color-text-muted)" }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}
