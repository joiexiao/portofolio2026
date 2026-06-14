"use client";

import TransitionLink from "@/components/transition-link";
import { ScrambleTextOnHover } from "@/components/scramble-text";

export default function ComingSoon() {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#0078D7] text-white flex flex-col justify-between px-5 py-5 sm:px-6 sm:py-6 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-24">
      {/* Top */}
      <div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[120px] xl:text-[160px] leading-none font-light mb-4 sm:mb-6 md:mb-8">
          :{")"}
        </h1>

        <p className="max-w-[1400px] text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-[48px] leading-[1.15] font-light">
          This page can’t be opened because this project is still under
          development. The system is currently preparing this content for future
          release. Please check back again later.
        </p>
      </div>

      {/* Middle */}
      <div className="my-4 sm:my-5 md:my-6">
        <p className="text-sm sm:text-base md:text-xl lg:text-3xl xl:text-[40px] font-light leading-none">
          20%{" "}
          <span className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-[38px]">
            complete
          </span>
        </p>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 lg:gap-8">
        {/* QR */}
        <div className="shrink-0">
          <img
            src="/resume-barcode.png"
            alt="Download CV QR Code"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] leading-snug font-light mb-3 md:mb-4">
            For more information and to see what I’ve built so far, scan this
            code to download my CV.
          </p>

          <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-[16px] leading-snug font-light">
            If you want to contact me or know more about who I am, you can check
            it out on.
          </p>

          <div className="flex flex-wrap items-center gap-1 mt-3 text-xs sm:text-sm md:text-sm lg:text-base xl:text-[16px] font-light">
            <span>Stop code:</span>

            <TransitionLink
              href="/about"
              className="hover:text-primary transition-colors"
              data-cursor="hover"
            >
              <ScrambleTextOnHover
                text="WHO_IS_JAID"
                as="span"
                duration={0.6}
                className="cursor-hover"
                data-cursor="hover"
              />
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
