import Link from "next/link";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { siteConfig } from "@/config/site";

export default function PrivacyPage() {
  return (
    <FunnelShell>
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-navy">
        Privacy Policy
      </h1>
      <div className="prose prose-sm max-w-none space-y-4 text-brand-muted">
        <p>
          This assessment funnel is operated by {siteConfig.name}. Information
          you provide during the safety check (including email and quiz answers)
          is used to personalize your plan and, if you choose to subscribe,
          create your account.
        </p>
        <p>
          For our full privacy policy, visit{" "}
          <a
            href={`${siteConfig.mainSiteUrl}/privacy-policy`}
            className="text-brand-blue underline"
          >
            {siteConfig.mainSiteUrl}/privacy-policy
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
