import { cn } from "@/utils/cn";

export type ToggleBarItem = {
  view: string;
  text: string;
  icon?: React.ReactNode;
};

export type ToggleBarProps = {
  activeView: string;
  onViewChange: (view: string) => void;
  items: ToggleBarItem[];
  className?: string;
};

export function ToggleBar({ activeView, onViewChange, items, className }: ToggleBarProps) {
  return (
    <div className={cn("flex text-sm md:text-base mt-1", className)}>
      {items.map((item) => (
        <div
          key={item.view}
          role="tab"
          aria-selected={activeView === item.view}
          onClick={() => onViewChange(item.view)}
          className={cn(
            "px-3 py-2 flex items-center gap-1 cursor-pointer border-b-2 border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors",
            activeView === item.view &&
              "border-b-2 border-[var(--color-brand-primary)] text-[var(--color-foreground)] font-semibold"
          )}
        >
          {item.icon}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
