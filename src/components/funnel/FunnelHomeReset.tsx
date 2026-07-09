"use client";

import { useEffect } from "react";
import { useFunnelStore } from "@/store/funnel-store";

export function FunnelHomeReset() {
  const reset = useFunnelStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return null;
}
