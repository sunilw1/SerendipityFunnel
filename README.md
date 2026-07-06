# Serendipity Funnel

Web-to-app conversion funnel for Serendipity Premium. A separate Next.js app from the main marketing site — designed for paid traffic landing pages.

## Flow

1. **/** — Splash with pulsing CTA
2. **/assessment** — 5-question safety quiz (segmentation, pain points, zones, urgency, email)
3. **/analyzing** — ~4s loader with cycling security copy
4. **/plan** — Personalized paywall with plan selector (yearly default)
5. **/welcome** — Post-checkout success page

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FUNNEL_URL` | Public URL of this funnel (for Stripe success/cancel URLs) |
| `NEXT_PUBLIC_MAIN_SITE_URL` | Main Serendipity site (default: `https://serendipity.app`) |
| `SERENDIPITY_BILLING_PROXY_URL` | Optional: main site URL to proxy authenticated checkout |

## Checkout

By default, **Start My 7-Day Free Trial** redirects to the main site register page with funnel params:

```
/register?email=...&plan=premium&cycle=yearly&from=funnel&trial=7
```

For direct Stripe checkout from the funnel domain, set `SERENDIPITY_BILLING_PROXY_URL` to your main site and pass `Authorization: Bearer <token>` + `x-user-id` from a logged-in user (after inline signup is added).

## Pricing

Aligned with SD-BE / main site:

- Monthly: $12.55/mo
- Quarterly: $35.85/qtr
- Yearly: $125.95/yr (default on paywall)

## Brand

- Navy: `#1B264F`
- Blue: `#1971B2`
- Fonts: Montserrat (headings), Roboto (body)

## Analytics

Add GTM or pixel scripts in `src/app/layout.tsx` when ready.

## Deploy

Deploy to a separate domain (e.g. `start.serendipity.app`). Set `NEXT_PUBLIC_FUNNEL_URL` to the production URL.

```bash
npm run build
npm start
```
