"use client";

import { pricingPlans, type BillingCycle } from "@/config/site";
import { cn } from "@/lib/utils";

type PlanSelectorProps = {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
};

const cycles: BillingCycle[] = ["monthly", "quarterly", "yearly"];

export function PlanSelector({ value, onChange }: PlanSelectorProps) {
  return (
    <div className="space-y-3">
      {cycles.map((cycle) => {
        const plan = pricingPlans[cycle];
        const selected = value === cycle;
        return (
          <button
            key={cycle}
            type="button"
            onClick={() => onChange(cycle)}
            className={cn(
              "funnel-card relative flex w-full cursor-pointer items-center justify-between rounded-2xl border-2 px-4 py-4 text-left",
              selected
                ? "funnel-card--selected border-brand-blue bg-brand-sky shadow-sm"
                : "border-slate-200 bg-white"
            )}
          >
            {plan.badge && (
              <span className="absolute -top-2.5 right-4 rounded-full bg-brand-blue px-2.5 py-0.5 text-xs font-semibold text-white">
                {plan.badge}
              </span>
            )}
            <div>
              <p className="font-semibold text-brand-navy">{plan.label}</p>
              <p className="text-sm text-brand-muted">
                ${plan.perMonth.toFixed(2)}/mo
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-brand-navy">
                ${plan.price.toFixed(2)}
              </p>
              <p className="text-xs text-brand-muted">
                {cycle === "monthly"
                  ? "per month"
                  : cycle === "quarterly"
                    ? "per quarter"
                    : "per year"}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
