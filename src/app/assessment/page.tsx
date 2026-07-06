"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Baby,
  Users,
  User,
  Home,
  PhoneOff,
  MapPinOff,
  CloudRain,
  Car,
  Moon,
  Plane,
} from "lucide-react";
import { FunnelLogo, FunnelShell } from "@/components/funnel/FunnelShell";
import { ProgressBar } from "@/components/funnel/ProgressBar";
import { QuizCard, QuizCheckbox } from "@/components/funnel/QuizCard";
import { PulsingButton } from "@/components/funnel/PulsingButton";
import { StepBackButton } from "@/components/funnel/StepBackButton";
import {
  useFunnelStore,
  type PainPoint,
  type ProtectingOption,
  type ZoneNeed,
} from "@/store/funnel-store";

const TOTAL_STEPS = 5;

const protectingOptions: {
  id: ProtectingOption;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  { id: "partner", label: "My partner", description: "Stay connected when apart", icon: <Heart className="h-6 w-6" /> },
  { id: "kids", label: "My children", description: "Know they're safe at school & play", icon: <Baby className="h-6 w-6" /> },
  { id: "parents", label: "My parents", description: "Peace of mind for aging loved ones", icon: <Users className="h-6 w-6" /> },
  { id: "myself", label: "Myself", description: "Let family know I'm okay", icon: <User className="h-6 w-6" /> },
  { id: "whole-family", label: "Whole family", description: "Everyone on one safety map", icon: <Home className="h-6 w-6" /> },
];

const painPointOptions: { id: PainPoint; label: string; icon: React.ReactNode }[] = [
  { id: "cant-reach", label: "Can't reach them when worried", icon: <PhoneOff className="h-5 w-5" /> },
  { id: "unknown-location", label: "Don't know where they are", icon: <MapPinOff className="h-5 w-5" /> },
  { id: "anxiety", label: "Constant anxiety about safety", icon: <CloudRain className="h-5 w-5" /> },
  { id: "driving", label: "Worried about driving safety", icon: <Car className="h-5 w-5" /> },
  { id: "late-night", label: "Late nights out alone", icon: <Moon className="h-5 w-5" /> },
  { id: "traveling", label: "Traveling or commuting far", icon: <Plane className="h-5 w-5" /> },
];

const zoneOptions: { id: ZoneNeed; label: string; description: string }[] = [
  { id: "1-2", label: "1–2 zones", description: "Home, school, or work" },
  { id: "3-5", label: "3–5 zones", description: "Multiple locations to monitor" },
  { id: "6-plus", label: "6+ zones", description: "Full family coverage" },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [emailError, setEmailError] = useState<string | null>(null);

  const {
    step,
    protecting,
    painPoints,
    zoneNeed,
    urgent,
    email,
    setProtecting,
    togglePainPoint,
    setZoneNeed,
    setUrgent,
    setEmail,
    setStep,
  } = useFunnelStore();

  const currentStep = step + 1;

  function handleBack() {
    if (step === 0) {
      router.push("/");
      return;
    }
    setStep(step - 1);
  }

  function goToAnalyzing() {
    router.push("/analyzing");
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmail(trimmed);
    setEmailError(null);
    goToAnalyzing();
  }

  return (
    <FunnelShell>
      <FunnelLogo />
      <ProgressBar current={currentStep} total={TOTAL_STEPS} />
      <StepBackButton
        onClick={handleBack}
        label={step === 0 ? "Back to start" : "Back"}
      />

      {step === 0 && (
        <div className="animate-fade-in space-y-4">
          <h2 className="mb-2 font-display text-2xl font-bold text-brand-navy">
            Who are you trying to keep safe?
          </h2>
          <p className="mb-4 text-brand-muted">Select the option that fits best</p>
          <div className="space-y-3">
            {protectingOptions.map((opt) => (
              <QuizCard
                key={opt.id}
                label={opt.label}
                description={opt.description}
                icon={opt.icon}
                selected={protecting === opt.id}
                onClick={() => setProtecting(opt.id)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-in space-y-4">
          <h2 className="mb-2 font-display text-2xl font-bold text-brand-navy">
            What keeps you up at night?
          </h2>
          <p className="mb-4 text-brand-muted">Select all that apply</p>
          <div className="space-y-2">
            {painPointOptions.map((opt) => (
              <QuizCheckbox
                key={opt.id}
                label={opt.label}
                checked={painPoints.includes(opt.id)}
                onChange={() => togglePainPoint(opt.id)}
              />
            ))}
          </div>
          <PulsingButton
            disabled={painPoints.length === 0}
            onClick={() => setStep(2)}
            className="mt-6"
          >
            Continue
          </PulsingButton>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in space-y-4">
          <h2 className="mb-2 font-display text-2xl font-bold text-brand-navy">
            How many safe zones do you need?
          </h2>
          <p className="mb-4 text-brand-muted">
            Safe zones alert you when family arrives or leaves key places
          </p>
          <div className="space-y-3">
            {zoneOptions.map((opt) => (
              <QuizCard
                key={opt.id}
                label={opt.label}
                description={opt.description}
                selected={zoneNeed === opt.id}
                onClick={() => setZoneNeed(opt.id)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in space-y-4">
          <h2 className="mb-2 font-display text-2xl font-bold text-brand-navy">
            Do you need peace of mind today?
          </h2>
          <p className="mb-4 text-brand-muted">
            We'll prioritize your setup if you're ready to start now
          </p>
          <div className="grid grid-cols-2 gap-3">
            <QuizCard
              label="Yes, today"
              description="I want to start protecting my family now"
              selected={urgent === true}
              onClick={() => setUrgent(true)}
            />
            <QuizCard
              label="Not urgent"
              description="I'm exploring options for later"
              selected={urgent === false}
              onClick={() => setUrgent(false)}
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in">
          <h2 className="mb-2 font-display text-2xl font-bold text-brand-navy">
            Where should we send your results?
          </h2>
          <p className="mb-6 text-brand-muted">
            Enter your email to see your personalized safety plan
          </p>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-4 text-brand-navy outline-none transition-colors focus:border-brand-blue"
            />
            {emailError && (
              <p className="text-sm text-red-600">{emailError}</p>
            )}
            <PulsingButton type="submit">See My Plan</PulsingButton>
          </form>
          <p className="mt-4 text-center text-xs text-brand-muted">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      )}
    </FunnelShell>
  );
}
