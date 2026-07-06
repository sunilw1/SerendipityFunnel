import Link from "next/link";
import { FunnelLogo, FunnelShell } from "@/components/funnel/FunnelShell";
import { PulsingButton } from "@/components/funnel/PulsingButton";
import { siteConfig } from "@/config/site";

export default function WelcomePage() {
  return (
    <FunnelShell centered>
      <FunnelLogo />
      <div className="mb-6 text-6xl">🎉</div>
      <h1 className="mb-4 font-display text-3xl font-bold text-brand-navy">
        Welcome to Serendipity Premium!
      </h1>
      <p className="mb-8 text-lg text-brand-muted">
        Your free trial has started. Download the app and sign in with the
        email you used to get started.
      </p>
      <div className="space-y-3">
        <PulsingButton href={siteConfig.mainSiteUrl}>Go to Serendipity</PulsingButton>
        <Link href="/" className="block text-sm text-brand-muted underline">
          Start over
        </Link>
      </div>
    </FunnelShell>
  );
}
