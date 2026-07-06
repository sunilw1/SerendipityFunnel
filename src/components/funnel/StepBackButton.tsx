import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type StepBackButtonProps = {
  onClick: () => void;
  label?: string;
  className?: string;
};

export function StepBackButton({
  onClick,
  label = "Back",
  className,
}: StepBackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "funnel-back mb-4 inline-flex cursor-pointer items-center gap-0.5 rounded-lg px-2 py-1 text-sm font-medium text-brand-muted transition-all duration-200",
        className
      )}
    >
      <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden />
      {label}
    </button>
  );
}
