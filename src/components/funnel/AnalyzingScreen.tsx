"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Shield, MapPin, Bell, Lock } from "lucide-react";
import { FunnelLogo, FunnelShell } from "@/components/funnel/FunnelShell";

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
    }, 900);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/plan");
    }, 3800);
    return () => clearTimeout(timeout);
  }, [router]);

  const current = messages[index];
  const Icon = current.icon;

  return (
    <FunnelShell centered>
      <FunnelLogo />
      <div className="flex flex-col items-center gap-6 py-12">
        <Loader2 className="h-14 w-14 animate-spin text-brand-blue" />
        <div className="flex items-center gap-3 animate-fade-in" key={index}>
          <Icon className="h-6 w-6 text-brand-blue" />
          <p className="text-lg font-medium text-brand-navy">{current.text}</p>
        </div>
        <p className="text-sm text-brand-muted">
          This usually takes a few seconds
        </p>
      </div>
    </FunnelShell>
  );
}
