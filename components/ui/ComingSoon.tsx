"use client";

import TransitionLink from "@/components/transition-link";
import { ScrambleTextOnHover } from "@/components/scramble-text";

export default function ComingSoon() {
  return (
    <div className="h-screen w-screen bg-[#0078D7] text-white flex flex-col justify-center px-32 py-32">
      <h1 className="text-7xl md:text-[200px] font-light mb-24">:{")"}</h1>

      <p className="text-2xl md:text-[48px] font-light mb-12">
        This page can’t be opened because this project is still under
        development. The system is currently preparing this content for future
        release. Please check back again later.
      </p>

      <p className="text-lg md:text-[40px] font-light mb-8">
        20% <span className="font-light text-[38px]">complete</span>
      </p>

      <div className="mt-10 flex items-start gap-8">
        {/* QR / Barcode */}
        <div className="shrink-0">
          <img
            src="/resume-barcode.png"
            alt="Download CV QR Code"
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Text */}
        <div>
          <p className="text-lg md:text-[20px] font-light mb-8">
            For more information and to see what I’ve built so far, scan this
            code to download my CV.
          </p>
          <p className="text-lg md:text-[16px] font-light">
            If you want to contact me or know more about who I am, you can check
            it out on.
          </p>

          <div className="flex items-center gap-1 mt-4 font-light text-lg md:text-[16px]">
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
