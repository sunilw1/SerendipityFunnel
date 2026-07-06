import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonStyles = (
  variant: "primary" | "secondary",
  fullWidth: boolean,
  className?: string
) =>
  cn(
    "inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
    fullWidth && "w-full",
    variant === "primary" &&
      "funnel-btn-primary bg-brand-blue text-white shadow-lg animate-pulse-ring",
    variant === "secondary" &&
      "funnel-btn-secondary border-2 border-brand-blue text-brand-blue bg-white",
    className
  );

type PulsingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  href?: string;
};

export function PulsingButton({
  className,
  variant = "primary",
  fullWidth = true,
  href,
  children,
  ...props
}: PulsingButtonProps) {
  if (href) {
    const isExternal = href.startsWith("http");
    const classes = buttonStyles(variant, fullWidth, className);

    if (isExternal) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonStyles(variant, fullWidth, className)}
      {...props}
    >
      {children}
    </button>
  );
}
