"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Shield, Mail } from "lucide-react";
import { FunnelLogo, FunnelShell } from "@/components/funnel/FunnelShell";
import { PlanSelector } from "@/components/funnel/PlanSelector";
import { PulsingButton } from "@/components/funnel/PulsingButton";
import { premiumFeatures, pricingPlans, siteConfig } from "@/config/site";
import {
  getPersonalizedHeadline,
  getPersonalizedSummary,
} from "@/lib/personalization";
import { maskEmail } from "@/lib/mask-email";
import { useFunnelStore } from "@/store/funnel-store";

export default function PlanPage() {
  const [hydrated, setHydrated] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    protecting,
    painPoints,
    zoneNeed,
    urgent,
    email,
    billingCycle,
    setBillingCycle,
  } = useFunnelStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !email) {
      window.location.href = "/assessment";
    }
  }, [hydrated, email]);

  async function handleCheckout() {
    setProcessing(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          billingCycle,
          funnel: {
            protecting,
            painPoints,
            zoneNeed,
            urgent,
          },
        }),
      });

      const data = (await res.json()) as { url?: string; message?: string };

      if (!res.ok) {
        throw new Error(data.message ?? "Checkout failed");
      }

      if (data.url) {
        window.location.assign(data.url);
        return;
      }

      throw new Error("No checkout URL returned");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setProcessing(false);
    }
  }

  if (!hydrated) {
    return (
      <FunnelShell centered>
        <FunnelLogo />
        <p className="text-brand-muted">Loading your plan…</p>
      </FunnelShell>
    );
  }

  const answers = { protecting, painPoints, zoneNeed, urgent };
  const plan = pricingPlans[billingCycle];

  return (
    <FunnelShell>
      <FunnelLogo />

      <div className="mb-6 rounded-2xl border border-brand-blue/20 bg-brand-sky p-5">
        <div className="mb-2 flex items-center gap-2 text-brand-blue">
          <Shield className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Your plan is ready
          </span>
        </div>
        <h1 className="mb-2 font-display text-2xl font-bold text-brand-navy">
          {getPersonalizedHeadline(answers)}
        </h1>
        <p className="text-sm text-brand-muted">
          {getPersonalizedSummary(answers)}
        </p>
        {email && (
          <p className="mt-3 flex items-center gap-2 text-sm text-brand-navy">
            <Mail className="h-4 w-4 text-brand-blue" />
            Sent to {maskEmail(email)}
          </p>
        )}
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-4 font-display text-lg font-semibold text-brand-navy">
          Premium includes
        </h2>
        <ul className="space-y-3">
          {premiumFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="mb-3 font-display text-lg font-semibold text-brand-navy">
        Choose your billing cycle
      </h2>
      <PlanSelector value={billingCycle} onChange={setBillingCycle} />

      <div className="mt-8 space-y-4">
        <PulsingButton onClick={handleCheckout} disabled={processing}>
          {processing
            ? "Redirecting to secure checkout…"
            : `Start My ${siteConfig.trialDays}-Day Free Trial`}
        </PulsingButton>

        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        <p className="text-center text-xs leading-relaxed text-brand-muted">
          ${plan.price.toFixed(2)} billed{" "}
          {billingCycle === "monthly"
            ? "monthly"
            : billingCycle === "quarterly"
              ? "every 3 months"
              : "annually"}{" "}
          after your free trial. We&apos;ll email you on Day{" "}
          {siteConfig.trialDays - 2} as a reminder. Cancel anytime in the app
          or by contacting{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="text-brand-blue underline"
          >
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </div>

      <div className="mt-8 flex justify-center gap-4 text-xs text-brand-muted">
        <Link href="/privacy" className="underline hover:text-brand-blue">
          Privacy
        </Link>
        <Link href="/terms" className="underline hover:text-brand-blue">
          Terms
        </Link>
      </div>
    </FunnelShell>
  );
}
