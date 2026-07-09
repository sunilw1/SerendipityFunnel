"use client";

import { cn } from "@/lib/utils";

type CircularProgressLoaderProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function CircularProgressLoader({
  progress,
  size = 160,
  strokeWidth = 6,
  className,
}: CircularProgressLoaderProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (clamped / 100) * circumference;
  const displayPercent = Math.round(clamped);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={displayPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Loading ${displayPercent}%`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-brand-blue"
        />
      </svg>
      <span className="absolute font-display text-3xl font-bold tabular-nums text-brand-navy transition-opacity duration-200 sm:text-4xl">
        {displayPercent}%
      </span>
    </div>
  );
}
