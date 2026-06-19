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
        <div className="fixed overflow-hidden inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="bg-black border-primary text-white p-6 max-w-md w-fit mx-4">
            <h2 className="text-xl font-medium mb-3">
              This page is still in development
            </h2>

            <p className="text-sm mb-8 opacity-70">
              Do you want to go back to homepage or stay here?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 xl:gap-4">
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
        <div
          className="
      h-screen
      w-full
      overflow-hidden
      bg-[#0078D7]
      text-white

      flex flex-col

      justify-center
      px-8

      sm:px-10

      md:px-12

      lg:justify-between
      lg:px-16
      lg:py-12

      xl:px-24
    "
        >
          {/* Top */}
          <div>
            <h1
              className="
          leading-none
          font-light

          text-[120px]
          sm:text-[140px]
          md:text-[160px]

          lg:text-[120px]
          xl:text-[160px]

          mb-8
        "
            >
              :{")"}
            </h1>

            <p
              className="
          max-w-[1400px]
          font-light

          text-[24px]
          sm:text-[32px]
          md:text-[38px]

          lg:text-4xl
          xl:text-[40px]

          leading-[1.4]
          lg:leading-[1.15]
        "
            >
              This page can’t be opened because this project is still under
              development. The system is currently preparing this content for
              future release. Please check back again later.
            </p>
          </div>

          {/* Progress */}
          <div
            className="
        my-10
        md:my-12
        lg:my-0
      "
          >
            <p
              className="
          font-light

          text-[22px]
          sm:text-[24px]
          md:text-[30px]

          lg:text-2xl
          xl:text-3xl
        "
            >
              20%{" "}
              <span
                className="
            text-[20px]
            sm:text-[22px]
            md:text-[28px]

            lg:text-2xl
            xl:text-3xl
          "
              >
                complete
              </span>
            </p>
          </div>

          {/* Bottom */}
          <div
            className="
    flex
    items-start

    gap-4
    sm:gap-6
    lg:gap-8

    max-w-[850px]
    lg:max-w-none
  "
          >
            <img
              src="/resume-barcode.png"
              alt="Download CV QR Code"
              className="
      shrink-0
      object-contain

      w-24 h-24
      sm:w-24 sm:h-24
      md:w-32 md:h-32
    "
            />

            <div className="flex-1">
              <p
                className="
        font-light
        leading-relaxed

        text-[11px]
        sm:text-[13px]
        md:text-[16px]

        lg:text-lg
        xl:text-[20px]

        mb-2
        xl:mb-4
      "
              >
                For more information and to see what I’ve built so far, scan
                this code to download my CV.
              </p>

              <p
                className="
        font-light
        leading-relaxed

        text-[11px]
        sm:text-[13px]
        md:text-[16px]

        lg:text-base
      "
              >
                If you want to contact me or know more about who I am, you can
                check it out on.
              </p>

              <div
                className="
        flex flex-wrap items-center gap-1

        mt-1
        xl:mt-3

        text-[11px]
        sm:text-[13px]
        md:text-[16px]

        lg:text-base
      "
              >
                <span>More Info:</span>

                <TransitionLink
                  href="/about"
                  className="hover:text-primary transition-colors"
                  data-cursor="hover"
                >
                  <ScrambleTextOnHover
                    text="WHO_IS_JAID"
                    as="span"
                    duration={0.6}
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
