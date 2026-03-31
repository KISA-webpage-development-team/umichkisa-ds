import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/utils/cn";

// ── RadioGroup (Root) ─────────────────────────────────────
type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> & {
  invalid?: boolean;
  className?: string;
};

function RadioGroup({ invalid = false, orientation = "vertical", className, ...props }: RadioGroupProps) {
  return (
    <RadixRadioGroup.Root
      data-invalid={invalid ? "" : undefined}
      orientation={orientation}
      className={cn(
        "group flex",
        orientation === "horizontal" ? "flex-row gap-4" : "flex-col gap-2",
        className
      )}
      {...props}
    />
  );
}

// ── RadioItem ─────────────────────────────────────────────
type RadioItemProps = {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

function RadioItem({ value, children, disabled, className }: RadioItemProps) {
  return (
    <label className={cn("flex items-center gap-2", className)}>
      <RadixRadioGroup.Item
        value={value}
        disabled={disabled}
        className={cn(
          "relative flex items-center justify-center size-5 rounded-full border border-border-strong bg-surface transition-colors",
          "data-[state=checked]:bg-foreground data-[state=checked]:border-foreground",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
          "disabled:pointer-events-none disabled:bg-surface-subtle disabled:border-border",
          "disabled:data-[state=checked]:bg-disabled-foreground disabled:data-[state=checked]:border-disabled-foreground",
          "group-data-[invalid]:border-error group-data-[invalid]:focus-visible:border-error"
        )}
      >
        <RadixRadioGroup.Indicator className="flex items-center justify-center">
          <span className="size-2.5 rounded-full bg-surface" />
        </RadixRadioGroup.Indicator>
      </RadixRadioGroup.Item>
      <span className="type-body-sm text-foreground">{children}</span>
    </label>
  );
}

// ── Exports ───────────────────────────────────────────────
export { RadioGroup, RadioItem };
export type { RadioGroupProps, RadioItemProps };
