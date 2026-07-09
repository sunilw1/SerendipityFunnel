"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BillingCycle } from "@/config/site";

export type ProtectingOption =
  | "partner"
  | "kids"
  | "parents"
  | "close-friends"
  | "myself"
  | "whole-family";

export type PainPoint =
  | "cant-reach"
  | "unknown-location"
  | "anxiety"
  | "driving"
  | "late-night"
  | "traveling";

export type ZoneNeed = "1-2" | "3-5" | "6-plus";

export type FunnelAnswers = {
  protecting: ProtectingOption | null;
  painPoints: PainPoint[];
  zoneNeed: ZoneNeed | null;
  urgent: boolean | null;
  email: string;
};

type FunnelState = FunnelAnswers & {
  step: number;
  billingCycle: BillingCycle;
  setStep: (step: number) => void;
  setProtecting: (value: ProtectingOption) => void;
  togglePainPoint: (value: PainPoint) => void;
  setZoneNeed: (value: ZoneNeed) => void;
  setUrgent: (value: boolean) => void;
  setEmail: (email: string) => void;
  setBillingCycle: (cycle: BillingCycle) => void;
  reset: () => void;
};

const initialAnswers: FunnelAnswers = {
  protecting: null,
  painPoints: [],
  zoneNeed: null,
  urgent: null,
  email: "",
};

export const useFunnelStore = create<FunnelState>()(
  persist(
    (set) => ({
      ...initialAnswers,
      step: 0,
      billingCycle: "yearly",
      setStep: (step) => set({ step }),
      setProtecting: (protecting) => set({ protecting, step: 1 }),
      togglePainPoint: (value) =>
        set((state) => {
          const exists = state.painPoints.includes(value);
          return {
            painPoints: exists
              ? state.painPoints.filter((p) => p !== value)
              : [...state.painPoints, value],
          };
        }),
      setZoneNeed: (zoneNeed) => set({ zoneNeed, step: 3 }),
      setUrgent: (urgent) => set({ urgent, step: 4 }),
      setEmail: (email) => set({ email }),
      setBillingCycle: (billingCycle) => set({ billingCycle }),
      reset: () => set({ ...initialAnswers, step: 0, billingCycle: "yearly" }),
    }),
    { name: "serendipity-funnel" }
  )
);
