import { NextResponse } from "next/server";
import { pricingPlans, siteConfig, type BillingCycle } from "@/config/site";

type CheckoutBody = {
  email?: string;
  billingCycle?: BillingCycle;
  funnel?: Record<string, unknown>;
};

function getFunnelBaseUrl(request: Request) {
  const envUrl = process.env.NEXT_PUBLIC_FUNNEL_URL?.replace(/\/$/, "");
  if (envUrl) return envUrl;
  const origin = new URL(request.url).origin;
  return origin;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const email = body.email?.trim();
    const billingCycle = body.billingCycle ?? "yearly";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Valid email is required" }, { status: 400 });
    }

    if (!pricingPlans[billingCycle]) {
      return NextResponse.json({ message: "Invalid billing cycle" }, { status: 400 });
    }

    const funnelBase = getFunnelBaseUrl(request);
    const plan = pricingPlans[billingCycle];

    // Proxy to Serendipity main site BFF when configured (requires user auth token).
    const billingProxy = process.env.SERENDIPITY_BILLING_PROXY_URL?.replace(/\/$/, "");
    const authHeader = request.headers.get("authorization");

    if (billingProxy && authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const userId = request.headers.get("x-user-id")?.trim();

      if (userId) {
        const successUrl = `${funnelBase}/welcome`;
        const cancelUrl = `${funnelBase}/plan`;

        const res = await fetch(`${billingProxy}/api/billing/checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            items: [
              {
                planId: "premium",
                planName: "Premium",
                billingCycle,
                price: plan.price,
                quantity: 1,
              },
            ],
            successUrl,
            cancelUrl,
            locale: "en",
          }),
        });

        const data = (await res.json()) as { url?: string; message?: string };

        if (res.ok && data.url) {
          return NextResponse.json({ url: data.url });
        }

        return NextResponse.json(
          { message: data.message ?? "Billing proxy error" },
          { status: res.status }
        );
      }
    }

    // Default: hand off to main Serendipity site for account creation + checkout.
    const mainSite = siteConfig.mainSiteUrl.replace(/\/$/, "");
    const params = new URLSearchParams({
      email,
      plan: "premium",
      cycle: billingCycle,
      from: "funnel",
      trial: String(siteConfig.trialDays),
    });

    if (body.funnel) {
      params.set("funnel_data", Buffer.from(JSON.stringify(body.funnel)).toString("base64url"));
    }

    const registerUrl = `${mainSite}/register?${params.toString()}`;

    return NextResponse.json({ url: registerUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start checkout";
    return NextResponse.json({ message }, { status: 500 });
  }
}
