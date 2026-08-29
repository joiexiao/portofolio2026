"use client";

import { useEffect, useRef, useState } from "react";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import {
  SplitFlapText,
  SplitFlapMuteToggle,
  SplitFlapAudioProvider,
} from "@/components/split-flap-text";
import { BitmapChevron } from "@/components/bitmap-chevron";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/transition-link";

gsap.registerPlugin(ScrollTrigger);

const FLAP_WORDS = [
  "PORTFOLIO",
  "DESIGNING",
  "VISUALIZE",
  "INTENTION",
  "IDEASPACE",
];

type Props = {
  triggerGlitch?: boolean; // ✅ NEW PROP
};

export function HeroSection({ triggerGlitch = false }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [wordIndex, setWordIndex] = useState(0);

  // ✅ GLITCH ANIMATION (cuma kalo dari page loader)
  useEffect(() => {
    if (!triggerGlitch || !contentRef.current) return;

    const tl = gsap.timeline({ delay: 0 }); // delay dikit biar ga bentrok sama fade-in

    // PHASE 1: Initial shock
    tl.fromTo(
      contentRef.current,
      { opacity: 0, filter: "blur(10px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.1 },
    );

    // PHASE 2: RGB split glitch
    tl.to(contentRef.current, {
      textShadow: `
        3px 0 0 #ff0000,
        -3px 0 0 #00ffff,
        0 3px 0 #00ff00
      `,
      duration: 0.08,
      repeat: 3,
      yoyo: true,
    });

    // PHASE 3: Horizontal shake
    tl.to(
      contentRef.current,
      {
        x: () => gsap.utils.random(-10, 10),
        duration: 0.05,
        repeat: 4,
        yoyo: true,
      },
      "-=0.2",
    );

    // PHASE 4: Scanline slice
    tl.to(contentRef.current, {
      clipPath: "polygon(0 30%, 100% 35%, 100% 65%, 0 60%)",
      duration: 0.1,
    });

    tl.to(contentRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 0.1,
    });

    // PHASE 5: Reset to normal
    tl.to(contentRef.current, {
      x: 0,
      textShadow: "none",
      filter: "blur(0px)",
      duration: 0.2,
      ease: "power2.out",
    });
  }, [triggerGlitch]);

  // Scroll animation
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Rotate split-flap text
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % FLAP_WORDS.length);
    }, 5800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="
  relative min-h-screen
  flex items-center
  justify-start lg:justify-center
  pl-6 lg:pl-24
  pr-6 lg:pr-24
"
    >
      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-fit">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText
              key={FLAP_WORDS[wordIndex]}
              text={FLAP_WORDS[wordIndex]}
              speed={80}
            />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2
          className="
            text-primary/90
            text-xl sm:text-3xl  md:text-3xl lg:text-4xl
            lg:mt-8 md:mt-4 mt-8
            tracking-wide
            drop-shadow-[0_0_6px_hsl(var(--primary)/0.45)]
          "
        >
          UI UX Designer | Graphic Designer
        </h2>

        <p
          className="
            lg:mt-8 md:mt-4 mt-4
            max-w-xl
            font-mono
            text-xs sm:text-sm md:text-base lg:text-base
            text-muted-foreground/80
            leading-relaxed
            transition-colors duration-300
            hover:text-white
          "
          data-cursor="hover"
        >
          Mujahid Azzam is a UI/UX and Graphic Designer focused on crafting
          clear, functional digital interfaces alongside visual explorations and
          small creative experiments. Currently based in Depok, Indonesia.
        </p>

        <div
          className="
    mt-10
    flex flex-col items-center gap-4

    sm:mt-12 sm:flex-row sm:gap-6
    md:gap-8
  "
        >
          <TransitionLink
            href="#work"
            className="
      group
      inline-flex w-full items-center justify-center gap-3

      border border-foreground/20
      px-5 py-3

      font-mono
      text-[10px] uppercase tracking-[0.25em]
      text-foreground

      transition-all duration-200
      hover:border-accent hover:text-accent

      sm:w-auto
      sm:px-6
      sm:text-xs
    "
            data-cursor="hover"
          >
            <ScrambleTextOnHover
              text="View Projects"
              as="span"
              data-cursor="hover"
              duration={0.6}
            />

            <BitmapChevron className="transition-transform duration-500 ease-in-out group-hover:rotate-45" />
          </TransitionLink>

          <TransitionLink
            href="/about"
            data-cursor="hover"
            className="
      font-mono
      text-[10px] uppercase tracking-[0.25em]
      text-white

      transition-colors duration-200
      hover:text-primary hover:underline

      sm:text-xs
    "
          >
            <ScrambleTextOnHover
              text="about"
              as="span"
              duration={0.6}
              className="cursor-hover"
              data-cursor="hover"
            />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
