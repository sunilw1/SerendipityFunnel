import Image from "next/image";
import { landingAssets } from "@/config/landing";

const ORBIT_DURATION_S = 24;
const USER_COUNT = landingAssets.users.length;

export function PhoneOrbitVisual() {
  return (
    <div className="phone-orbit-stage mx-auto w-full max-w-[min(100%,520px)]">
      <div aria-hidden className="phone-orbit-ring" />

      {landingAssets.users.map((src, index) => (
        <div
          key={src}
          className="phone-orbit-rotator"
          style={{
            animationDelay: `${-(index * ORBIT_DURATION_S) / USER_COUNT}s`,
          }}
        >
          <div className="phone-orbit-position">
            <div
              className="phone-orbit-counter"
              style={{
                animationDelay: `${-(index * ORBIT_DURATION_S) / USER_COUNT}s`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full bg-white shadow-md">
                <Image
                  src={src}
                  alt={`Connected person ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="phone-orbit-center">
        <Image
          src={landingAssets.phone}
          alt="Serendipity app showing real-time family map"
          width={900}
          height={1100}
          className="h-auto w-full drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  );
}
