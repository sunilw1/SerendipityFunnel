import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const logoSizes = {
  default: {
    width: 180,
    height: 52,
    className: "h-10 w-auto sm:h-12",
    wrapperClassName: "mb-8",
  },
  hero: {
    width: 280,
    height: 81,
    className: "h-16 w-auto sm:h-20",
    wrapperClassName: "mb-10 sm:mb-12",
  },
  banner: {
    width: 360,
    height: 104,
    className: "h-20 w-auto sm:h-24 md:h-28",
    wrapperClassName: "mb-6 sm:mb-8",
  },
} as const;

type FunnelLogoProps = {
  size?: keyof typeof logoSizes;
  className?: string;
};

export function FunnelLogo({ size = "default", className }: FunnelLogoProps) {
  const { width, height, className: imageClassName, wrapperClassName } =
    logoSizes[size];

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        wrapperClassName,
        className
      )}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={width}
        height={height}
        className={imageClassName}
        priority={size === "hero" || size === "banner"}
      />
    </div>
  );
}
