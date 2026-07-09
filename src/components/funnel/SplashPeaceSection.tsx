import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { FunnelLogo } from "@/components/funnel/FunnelLogo";
import { PhoneOrbitVisual } from "@/components/funnel/PhoneOrbitVisual";
import { PulsingButton } from "@/components/funnel/PulsingButton";
import { landingAssets } from "@/config/landing";

export function SplashPeaceSection() {
  return (
    <section className="relative h-[100vh] overflow-hidden bg-white">
      {/* Use your provided background image; keep it readable with light white overlays */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src={landingAssets.background}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/45 to-white/85" />
      </div>

      <div className="relative mx-auto flex justify-center h-full max-w-6xl flex-col px-5 pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-12">
          <div className="text-left">
            <FunnelLogo
              size="hero"
              className="mb-4 justify-start"
            />

            <h1 className="font-display text-[2.1rem] font-bold leading-tight text-brand-navy sm:text-4xl lg:text-[2.65rem]">
            Whether its the daily run or family outing,
            </h1>
            <h1 className="font-display text-[1.4rem] font-bold leading-tight text-brand-navy sm:text-4xl lg:text-[1.4rem] mt-4">
            you can see everyone's location and help keep them safe
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-navy/85 sm:text-lg lg:text-xl">
              Serendipity brings you real-time safety tracking for all of your
              family and friends. Whether it&apos;s the daily run or family
              outing, now they are safe.
            </p>

            <p className="mt-3 text-base font-semibold leading-relaxed text-brand-navy sm:text-lg lg:text-xl">
              Discover effortless protection today.
            </p>

            <div className="relative z-30 mt-5">
              <PulsingButton
                href="/start"
                fullWidth={false}
                className="group gap-2 px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base"
              >
                Start Protecting My Loved Ones
                <ChevronRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </PulsingButton>
            </div>

            <div className="relative z-30 mt-6 flex justify-start">
              <Image
                src={landingAssets.shield}
                alt=""
                width={170}
                height={190}
                className="h-28 w-auto drop-shadow-lg sm:h-32 sheild"
                priority
              />
            </div>
          </div>

          <div className="flex justify-center">
            <PhoneOrbitVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
