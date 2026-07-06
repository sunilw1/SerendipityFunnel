import {
  ChevronRight,
  Clock,
  Lock,
  MapPin,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FunnelLogo, FunnelShell } from "@/components/funnel/FunnelShell";
import { PulsingButton } from "@/components/funnel/PulsingButton";

const trustSignals = [
  { icon: Clock, label: "60 seconds", sublabel: "Quick & easy" },
  { icon: ShieldCheck, label: "Private", sublabel: "Data stays yours" },
  { icon: Users, label: "For families", sublabel: "All loved ones" },
] as const;

export function SplashHero() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-brand-sky via-background to-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/8 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-brand-navy/6 blur-3xl" />
        <div className="absolute -bottom-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-blue/6 blur-3xl" />
      </div>

      <FunnelShell centered className="relative bg-transparent py-10 sm:py-12">
        <div className="animate-fade-in-up">
          <FunnelLogo />
        </div>

        <div className="animate-fade-in-up animation-delay-100 mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-blue shadow-sm backdrop-blur-sm">
            <Clock className="h-4 w-4" aria-hidden />
            Free 60-second safety check
          </span>
        </div>

        <div className="animate-fade-in-up animation-delay-200 mb-8 flex justify-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 scale-125 rounded-full border border-brand-blue/15 animate-pulse-soft"
            />
            <div
              aria-hidden
              className="absolute inset-0 scale-150 rounded-full border border-brand-blue/10 animate-pulse-soft animation-delay-500"
            />
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-white to-brand-sky shadow-lg shadow-brand-blue/10 animate-float">
              <Shield
                className="h-[4.5rem] w-[4.5rem] text-brand-blue"
                strokeWidth={1.5}
              />
              <div className="absolute -right-2 -top-2 rounded-full bg-white p-2.5 shadow-md ring-1 ring-brand-blue/10">
                <MapPin className="h-5 w-5 text-brand-blue" aria-hidden />
              </div>
              <div className="absolute -bottom-2 -left-2 rounded-full bg-white p-2.5 shadow-md ring-1 ring-brand-blue/10">
                <Users className="h-5 w-5 text-brand-blue" aria-hidden />
              </div>
            </div>
          </div>
        </div>

        <h1 className="animate-fade-in-up animation-delay-300 mb-4 font-display text-[1.75rem] font-bold leading-tight tracking-tight text-brand-navy sm:text-4xl">
          Is your family as safe as{" "}
          <span className="text-brand-blue">you think?</span>
        </h1>

        <p className="animate-fade-in-up animation-delay-400 mb-8 text-base leading-relaxed text-brand-muted sm:text-lg">
          Take our quick safety assessment and get a personalized plan to keep
          your loved ones protected — wherever they are.
        </p>

        <ul className="animate-fade-in-up animation-delay-500 mb-8 grid grid-cols-3 gap-2 sm:gap-3">
          {trustSignals.map(({ icon: Icon, label, sublabel }) => (
            <li
              key={label}
              className="flex flex-col items-center rounded-2xl border border-white/60 bg-white/70 px-2 py-3 shadow-sm backdrop-blur-sm sm:px-3"
            >
              <Icon
                className="mb-1.5 h-5 w-5 text-brand-blue"
                aria-hidden
              />
              <span className="text-xs font-semibold text-brand-navy sm:text-sm">
                {label}
              </span>
              <span className="mt-0.5 hidden text-[10px] text-brand-muted sm:block">
                {sublabel}
              </span>
            </li>
          ))}
        </ul>

        <div className="animate-fade-in-up animation-delay-600">
          <PulsingButton href="/assessment" className="group gap-2">
            Start Safety Check
            <ChevronRight
              className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </PulsingButton>
        </div>

        <p className="animate-fade-in-up animation-delay-700 mt-4 flex items-center justify-center gap-1.5 text-xs text-brand-muted">
          <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Free assessment · No credit card required
        </p>
      </FunnelShell>
    </div>
  );
}
