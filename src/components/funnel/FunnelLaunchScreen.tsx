"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FunnelLogo, FunnelShell } from "@/components/funnel/FunnelShell";
import { CircularProgressLoader } from "@/components/funnel/CircularProgressLoader";
import { useFunnelStore } from "@/store/funnel-store";

const INTRO_DELAY_MS = 550;
const LOAD_DURATION_MS = 3200;
const COMPLETE_PAUSE_MS = 450;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function FunnelLaunchScreen() {
  const router = useRouter();
  const reset = useFunnelStore((state) => state.reset);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setStarted(true), INTRO_DELAY_MS);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (!started) return;

    const startedAt = performance.now();
    let frameId = 0;
    let completeTimer = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const linear = Math.min(1, elapsed / LOAD_DURATION_MS);
      const eased = easeOutCubic(linear);
      const next = eased * 100;
      setProgress(next);

      if (linear < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      setProgress(100);
      completeTimer = window.setTimeout(() => {
        router.replace("/assessment");
      }, COMPLETE_PAUSE_MS);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(completeTimer);
    };
  }, [router, started]);

  return (
    <FunnelShell centered className="min-h-dvh">
      <div className="animate-fade-in">
        <FunnelLogo />
      </div>

      <div className="flex flex-col items-center py-8">
        <div className="animate-launch-scale-in animation-delay-200">
          <CircularProgressLoader
            progress={started ? progress : 0}
            size={168}
            strokeWidth={5}
          />
        </div>

        <div className="animate-fade-in-up animation-delay-500 mt-10 w-full max-w-md border-t border-slate-200 pt-8">
          <h1 className="font-display text-2xl font-bold leading-tight text-brand-navy sm:text-3xl">
            Let&apos;s keep your loved ones safe.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-brand-muted sm:text-lg">
            First, answer a few questions to build your personalized safety
            plan.
          </p>
        </div>
      </div>
    </FunnelShell>
  );
}
