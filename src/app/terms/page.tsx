import Link from "next/link";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { siteConfig } from "@/config/site";

export default function TermsPage() {
  return (
    <FunnelShell>
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-navy">
        Terms of Service
      </h1>
      <div className="prose prose-sm max-w-none space-y-4 text-brand-muted">
        <p>
          By using this safety assessment and starting a free trial, you agree
          to {siteConfig.name}&apos;s terms of service. Your subscription will
          automatically renew after the {siteConfig.trialDays}-day trial unless
          cancelled before the trial ends.
        </p>
        <p>
          For complete terms, visit{" "}
          <a
            href={`${siteConfig.mainSiteUrl}/terms-of-service`}
            className="text-brand-blue underline"
          >
            {siteConfig.mainSiteUrl}/terms-of-service
          </a>
          .
        </p>
      </div>
      <Link href="/plan" className="mt-8 inline-block text-sm text-brand-blue underline">
        ← Back
      </Link>
    </FunnelShell>
  );
}
