import * as RadixAccordion from "@radix-ui/react-accordion";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/icon/Icon";

// ── Accordion (Root) ────────────────────────────────────
type AccordionSingleProps = {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

type AccordionMultipleProps = {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  children: React.ReactNode;
  className?: string;
};

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

function Accordion({ className, ...props }: AccordionProps) {
  const rootProps =
    props.type === "multiple"
      ? { ...props, type: "multiple" as const }
      : { ...props, type: "single" as const, collapsible: true };

  return (
    <RadixAccordion.Root
      {...rootProps}
      className={cn("divide-y divide-border", className)}
    />
  );
}

// ── AccordionItem ───────────────────────────────────────
type AccordionItemProps = {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

function AccordionItem({
  className,
  ...props
}: AccordionItemProps) {
  return (
    <RadixAccordion.Item
      {...props}
      className={cn("", className)}
    />
  );
}

// ── AccordionTrigger ────────────────────────────────────
type AccordionTriggerProps = {
  children: React.ReactNode;
  showChevron?: boolean;
  className?: string;
};

function AccordionTrigger({
  children,
  showChevron = true,
  className,
}: AccordionTriggerProps) {
  return (
    <RadixAccordion.Header asChild>
      <div>
        <RadixAccordion.Trigger
          className={cn(
            "flex w-full items-center justify-between py-4 type-body !font-semibold text-foreground",
            "underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] duration-150",
            "hover:decoration-brand-accent",
            "data-[state=open]:text-brand-primary",
            "disabled:pointer-events-none disabled:text-disabled-foreground",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            "focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)]",
            "[&[data-state=open]>svg]:rotate-180",
            className,
          )}
        >
          {children}
          {showChevron && (
            <Icon
              name="chevron-down"
              size="sm"
              className="shrink-0 transition-transform duration-200"
            />
          )}
        </RadixAccordion.Trigger>
      </div>
    </RadixAccordion.Header>
  );
}

// ── AccordionContent ────────────────────────────────────
type AccordionContentProps = {
  children: React.ReactNode;
  className?: string;
};

function AccordionContent({
  children,
  className,
}: AccordionContentProps) {
  return (
    <RadixAccordion.Content
      className={cn(
        "overflow-hidden",
        "data-[state=open]:animate-[accordion-down_200ms_ease-out]",
        "data-[state=closed]:animate-[accordion-up_200ms_ease-in]",
      )}
    >
      <div className={cn("pb-4 type-body text-foreground", className)}>
        {children}
      </div>
    </RadixAccordion.Content>
  );
}

// ── Exports ─────────────────────────────────────────────
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
};
