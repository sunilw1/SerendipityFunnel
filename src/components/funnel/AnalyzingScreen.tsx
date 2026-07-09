"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Shield, MapPin, Bell, Lock } from "lucide-react";
import { FunnelLogo, FunnelShell } from "@/components/funnel/FunnelShell";

const MESSAGE_INTERVAL_MS = 2800;
const TOTAL_DURATION_MS = MESSAGE_INTERVAL_MS * 4 + 1200;

const messages = [
  { icon: Shield, text: "Analyzing your safety profile…" },
  { icon: MapPin, text: "Mapping recommended safe zones…" },
  { icon: Bell, text: "Configuring alert preferences…" },
  { icon: Lock, text: "Building your personalized plan…" },
];

export function AnalyzingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, MESSAGE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/plan");
    }, TOTAL_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [router]);

  const current = messages[index];
  const Icon = current.icon;

  return (
    <FunnelShell centered>
      <FunnelLogo />
      <div className="flex flex-col items-center gap-6 py-12">
        <Loader2 className="h-16 w-16 animate-spin text-brand-blue" />
        <div className="flex items-center gap-3 animate-fade-in" key={index}>
          <Icon className="h-7 w-7 shrink-0 text-brand-blue" />
          <p className="text-xl font-semibold text-brand-navy sm:text-2xl">
            {current.text}
          </p>
        </div>
        <p className="text-base text-brand-muted sm:text-lg">
          This usually takes a few seconds
        </p>
      </div>
    </FunnelShell>
  );
}
