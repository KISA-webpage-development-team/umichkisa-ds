import * as RadixTooltip from "@radix-ui/react-tooltip";

export type TooltipProps = {
  /** Text content displayed in the tooltip bubble. */
  content: string;
  /** The trigger element — must accept a ref. */
  children: React.ReactNode;
  /** Preferred side of the trigger to render the tooltip. */
  side?: "top" | "right" | "bottom" | "left";
  /** Milliseconds before the tooltip appears on hover. */
  delayDuration?: number;
};

export function Tooltip({
  content,
  children,
  side = "top",
  delayDuration = 200,
}: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={4}
            className="z-50 rounded-md bg-[var(--color-brand-primary)] text-[var(--color-brand-foreground)] type-caption px-3 py-1.5 shadow-sm animate-in fade-in-0 zoom-in-95"
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
