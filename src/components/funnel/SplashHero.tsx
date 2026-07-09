import {
  ChevronRight,
  Clock,
  Lock,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { PulsingButton } from "@/components/funnel/PulsingButton";
import { FunnelHomeReset } from "@/components/funnel/FunnelHomeReset";
import { SplashPeaceSection } from "@/components/funnel/SplashPeaceSection";

const trustSignals = [
  { icon: Clock, label: "60 seconds", sublabel: "Quick & easy" },
  { icon: ShieldCheck, label: "Private", sublabel: "Data stays yours" },
  {
    icon: Users,
    label: "For keeping loved ones safe",
    sublabel: "Family & friends",
  },
] as const;

export function SplashHero() {
  return (
    <div className="bg-background">
      <FunnelHomeReset />
      <SplashPeaceSection />

      <section className="border-t border-brand-blue/10 bg-gradient-to-b from-background to-brand-sky/40">
        <FunnelShell centered className="py-12 sm:py-16">
          <h2 className="mb-4 font-display text-[1.75rem] font-bold leading-tight text-brand-navy sm:text-4xl">
            Are Your Family &amp; Friends as safe as{" "}
            <span className="text-brand-blue">you think?</span>
          </h2>

          <p className="mb-8 text-base leading-relaxed text-brand-muted sm:text-lg">
            Take our quick safety assessment and get a personalized plan to keep
            your loved ones protected — wherever they are.
          </p>

          <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {trustSignals.map(({ icon: Icon, label, sublabel }) => (
              <li
                key={label}
                className="flex flex-col items-center rounded-2xl border border-white/80 bg-white px-4 py-4 shadow-sm sm:py-5"
              >
                <Icon
                  className="mb-2 h-6 w-6 text-brand-blue sm:h-7 sm:w-7"
                  aria-hidden
                />
                <span className="text-center text-sm font-semibold leading-snug text-brand-navy sm:text-base">
                  {label}
                </span>
                <span className="mt-1 text-center text-xs text-brand-muted sm:text-sm">
                  {sublabel}
                </span>
              </li>
            ))}
          </ul>

          <PulsingButton href="/start" className="group gap-2">
            Start Safety Check
            <ChevronRight
              className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </PulsingButton>

          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-brand-muted sm:text-base">
            <Lock className="h-4 w-4 shrink-0" aria-hidden />
            Free assessment
          </p>
        </FunnelShell>
      </section>
    </div>
  );
}
