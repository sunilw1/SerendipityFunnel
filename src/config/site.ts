export const siteConfig = {
  name: "Serendipity",
  description:
    "Free family safety assessment — discover how Serendipity keeps your loved ones safe with real-time location sharing.",
  logo: "/assets/logo.png",
  favicon: "/favicon.png",
  mainSiteUrl:
    process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://serendipity.app",
  supportEmail: "support@serendipity.app",
  trialDays: 7,
} as const;

export type BillingCycle = "monthly" | "quarterly" | "yearly";

export const pricingPlans = {
  monthly: {
    id: "monthly" as const,
    label: "Monthly",
    price: 12.55,
    perMonth: 12.55,
    badge: null,
  },
  quarterly: {
    id: "quarterly" as const,
    label: "Quarterly",
    price: 35.85,
    perMonth: 11.95,
    badge: "Save 5%",
  },
  yearly: {
    id: "yearly" as const,
    label: "Yearly",
    price: 125.95,
    perMonth: 10.5,
    badge: "Best value",
  },
} as const;

export const premiumFeatures = [
  "Unlimited family members on your map",
  "Real-time GPS location sharing",
  "Custom safe zones & arrival alerts",
  "Driving safety & crash detection",
  "SOS emergency alerts",
  "Location history (30 days)",
] as const;
