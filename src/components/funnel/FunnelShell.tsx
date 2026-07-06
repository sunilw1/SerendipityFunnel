import { cn } from "@/lib/utils";

export { FunnelLogo } from "@/components/funnel/FunnelLogo";

type FunnelShellProps = {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
};

export function FunnelShell({
  children,
  className,
  centered = false,
}: FunnelShellProps) {
  return (
    <main
      className={cn(
        "flex min-h-dvh flex-col px-5 py-8",
        centered && "items-center justify-center text-center",
        className
      )}
    >
      <div className="mx-auto w-full max-w-lg">{children}</div>
    </main>
  );
}
