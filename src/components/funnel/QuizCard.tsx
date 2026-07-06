import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type QuizCardProps = {
  label: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
};

export function QuizCard({
  label,
  description,
  selected,
  onClick,
  icon,
}: QuizCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "funnel-card group flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 text-left",
        selected
          ? "funnel-card--selected border-brand-blue bg-brand-sky shadow-sm"
          : "border-slate-200 bg-white"
      )}
    >
      {icon && (
        <div
          className={cn(
            "funnel-card__icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl transition-colors duration-200",
            selected ? "bg-brand-blue text-white" : "bg-slate-100 text-brand-navy"
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex-1">
        <p className="font-semibold text-brand-navy">{label}</p>
        {description && (
          <p className="mt-0.5 text-sm text-brand-muted">{description}</p>
        )}
      </div>
      {selected && <Check className="h-5 w-5 shrink-0 text-brand-blue" />}
    </button>
  );
}

type QuizCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function QuizCheckbox({ label, checked, onChange }: QuizCheckboxProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "funnel-card group flex w-full cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left",
        checked
          ? "funnel-card--selected border-brand-blue bg-brand-sky shadow-sm"
          : "border-slate-200 bg-white"
      )}
    >
      <div
        className={cn(
          "funnel-card__checkbox flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors duration-200",
          checked ? "border-brand-blue bg-brand-blue" : "border-slate-300 bg-white"
        )}
      >
        {checked && <Check className="h-4 w-4 text-white" />}
      </div>
      <span className="font-medium text-brand-navy">{label}</span>
    </button>
  );
}
