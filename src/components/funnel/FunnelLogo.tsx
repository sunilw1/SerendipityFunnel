import Image from "next/image";
import { siteConfig } from "@/config/site";

export function FunnelLogo() {
  return (
    <div className="mb-8 flex items-center justify-center">
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={180}
        height={52}
        className="h-10 w-auto sm:h-12"
        priority
      />
    </div>
  );
}
