import { cn } from "@/lib/utils";

type ProtectionBadgeProps = {
  className?: string;
};

export function ProtectionBadge({ className }: ProtectionBadgeProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[260px] sm:max-w-[300px]",
        className
      )}
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/25 blur-2xl" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/20 animate-pulse-soft" />

      <svg
        viewBox="0 0 240 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full animate-float drop-shadow-[0_20px_40px_rgba(25,113,178,0.28)]"
      >
        <defs>
          <linearGradient id="shield-frame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4f7fb" />
            <stop offset="35%" stopColor="#b8c4d4" />
            <stop offset="55%" stopColor="#eef2f7" />
            <stop offset="100%" stopColor="#8a97ab" />
          </linearGradient>
          <linearGradient id="shield-inner" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#243562" />
            <stop offset="55%" stopColor="#1b264f" />
            <stop offset="100%" stopColor="#0f1835" />
          </linearGradient>
          <linearGradient id="shield-glow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#4db8e8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1971b2" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pin-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#1971b2" />
          </linearGradient>
          <filter id="badge-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer metallic frame */}
        <path
          d="M120 18 L188 48 L188 128 C188 178 158 218 120 248 C82 218 52 178 52 128 L52 48 Z"
          fill="url(#shield-frame)"
          stroke="#9aa8bc"
          strokeWidth="1.5"
        />
        {/* Inner bevel */}
        <path
          d="M120 34 L172 58 L172 126 C172 168 150 202 120 224 C90 202 68 168 68 126 L68 58 Z"
          fill="url(#shield-inner)"
          stroke="#2a3d6e"
          strokeWidth="1"
        />
        {/* Top inner glow */}
        <ellipse
          cx="120"
          cy="100"
          rx="52"
          ry="40"
          fill="url(#shield-glow)"
        />

        {/* Signal waves */}
        <g stroke="#4db8e8" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#badge-glow)">
          <path d="M88 88 C96 68 108 58 120 58 C132 58 144 68 152 88" opacity="0.55" />
          <path d="M76 78 C88 50 102 38 120 38 C138 38 152 50 164 78" opacity="0.35" />
          <path d="M64 68 C80 34 98 20 120 20 C142 20 160 34 176 68" opacity="0.2" />
        </g>

        {/* Location pin */}
        <g filter="url(#badge-glow)">
          <path
            d="M120 156 C108 156 98 146 98 134 C98 122 120 96 120 96 C120 96 142 122 142 134 C142 146 132 156 120 156 Z"
            fill="url(#pin-gradient)"
          />
          <circle cx="120" cy="132" r="10" fill="#e8f4fc" />
        </g>

        {/* Map grid */}
        <g stroke="#4db8e8" strokeWidth="1.2" opacity="0.45">
          <path d="M78 188 L162 188" />
          <path d="M84 198 L156 198" />
          <path d="M90 208 L150 208" />
          <path d="M96 218 L144 218" />
          <path d="M102 176 L108 224" />
          <path d="M120 174 L120 226" />
          <path d="M138 176 L132 224" />
        </g>
        <circle cx="120" cy="206" r="4" fill="#4db8e8" filter="url(#badge-glow)" />
      </svg>
    </div>
  );
}
