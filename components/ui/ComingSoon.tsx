"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BitmapChevron } from "@/components/bitmap-chevron";
import TransitionLink from "@/components/transition-link";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import { GlitchReveal } from "@/components/ui/glitch-reveal";
export default function ComingSoon() {
  const [revealKey, setRevealKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const handleStayHere = () => {
    setShowPopup(false);
    setRevealKey((prev) => prev + 1);
  };

  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <>
      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="bg-black border-primary text-white p-6 max-w-md w-fit mx-4">
            <h2 className="text-xl font-medium mb-3">
              This page is still in development
            </h2>

            <p className="text-sm mb-8 opacity-70">
              Do you want to go back to homepage or stay here?
            </p>

            <div className="flex flex-col sm:flex-row gap-8 xl:gap-4">
              {/* Never Mind */}
              <button
                onClick={handleStayHere}
                className="
     group
      inline-flex w-full items-center justify-center gap-3

      px-5 py-3
        border border-white/20
      font-mono
      text-[10px] uppercase tracking-[0.25em]
      text-white
      
      transition-all duration-200
      hover:text-primary hover:border-primary

      sm:w-auto
      sm:px-6
      sm:text-xs
    "
              >
                <ScrambleTextOnHover
                  text="Never Mind"
                  as="span"
                  duration={0.6}
                  data-cursor="hover"
                />
              </button>

              {/* Back to Home */}
              <TransitionLink
                href="/"
                className="
      group
      inline-flex w-full items-center justify-center gap-3

      border border-white/20
      px-5 py-3

      font-mono
      text-[10px] uppercase tracking-[0.25em]
      text-white

      transition-all duration-200
      hover:border-primary hover:text-primary

      sm:w-auto
      sm:px-6
      sm:text-xs
    "
                data-cursor="hover"
              >
                <ScrambleTextOnHover
                  text="Back to Home"
                  as="span"
                  duration={0.6}
                  data-cursor="hover"
                />
              </TransitionLink>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PAGE */}
      <GlitchReveal key={revealKey}>
        <div className="h-screen w-full overflow-hidden bg-[#0078D7] text-white flex flex-col justify-between px-5 py-5 sm:px-6 sm:py-6 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-24">
          {/* Top */}
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[120px] xl:text-[160px] leading-none font-light mb-4 sm:mb-6 md:mb-8">
              :{")"}
            </h1>

            <p className="max-w-[1400px] text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-[40px] leading-[1.15] font-light">
              This page can’t be opened because this project is still under
              development. The system is currently preparing this content for
              future release. Please check back again later.
            </p>
          </div>

          {/* Middle */}
          <div className="my-4 sm:my-5 md:my-6">
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-light leading-none">
              20%{" "}
              <span className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-[30px]">
                complete
              </span>
            </p>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 lg:gap-8">
            <div className="shrink-0">
              <img
                src="/resume-barcode.png"
                alt="Download CV QR Code"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
              />
            </div>

            <div className="flex-1">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] leading-snug font-light mb-3 md:mb-4">
                For more information and to see what I’ve built so far, scan
                this code to download my CV.
              </p>

              <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-[16px] leading-snug font-light">
                If you want to contact me or know more about who I am, you can
                check it out on.
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
      </GlitchReveal>
    </>
  );
}
