"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./sections/hero";
import Intro from "./sections/intro";
import Bio from "./sections/bio";
import AboutMe from "./sections/aboutme";
import Outro from "./sections/outro";
import { AnimatedNoise } from "@/components/animated-noise";
import { useRef, useEffect, useState } from "react";
import TransitionLink from "@/components/transition-link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const [showMenuCTA, setShowMenuCTA] = useState(false);
  const outroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalSections = gsap.utils.toArray<HTMLElement>(
        ".horizontal-section",
      );

      horizontalSections.forEach((section) => {
        const track = section.querySelector<HTMLElement>(".horizontal-track");
        if (!track) return;

        const panels = track.children;
        const totalWidth = panels.length * window.innerWidth;

        gsap.to(track, {
          x: () => -(totalWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Cek apakah outro section ada dan visible
      if (outroRef.current) {
        const outroTop = outroRef.current.offsetTop;

        // Hide button kalo:
        // 1. Masih di hero (scroll < 120)
        // 2. Udah masuk outro section
        const isInOutro = scrollY + windowHeight > outroTop + 100;
        setShowMenuCTA(scrollY > 120 && !isInOutro);
      } else {
        // Fallback kalo ref belum ready
        setShowMenuCTA(scrollY > 120);
      }
    };

    window.addEventListener("scroll", onScroll);
    // Trigger once on mount
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* =====================
          GLOBAL BACKGROUNDS
      ====================== */}
      <div
        className="grid-bg fixed inset-0 opacity-50 pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <AnimatedNoise opacity={0.03} />
      </div>

      {/* =====================
          CTA MENU (GLOBAL)
      ===================== */}
      <div
        className={`
    fixed top-12 inset-x-0 z-50
    ${showMenuCTA ? "pointer-events-auto" : "pointer-events-none"}
  `}
      >
        <div
          className="mx-auto px-6 md:px-12 flex justify-end"
          data-cursor="hover"
        >
          <TransitionLink
            href="/menu"
            data-cursor="hover"
            className={`
              font-mono text-4xl
              text-primary
              underline underline-offset-5 decoration-2
              leading-none select-none
              transition-all duration-500 ease-out
              hover:bg-primary hover:text-background
      
              ${
                showMenuCTA
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }
            `}
          >
            menu
          </TransitionLink>
        </div>
      </div>

      {/* =====================
          PAGE CONTENT
      ====================== */}
      <div className="relative z-10">
        {/* HERO (VERTICAL) */}
        <Hero />

        {/* HORIZONTAL #1 : INTRO → BIO */}
        <section className="horizontal-section">
          <div className="horizontal-track flex">
            <Intro />
            <Bio />
          </div>
        </section>

        {/* VERTICAL BREAK */}
        <section className="h-fill" />

        {/* HORIZONTAL #2 : ABOUT ME */}
        <section className="horizontal-section">
          <div className="horizontal-track flex">
            <AboutMe />
          </div>
        </section>

        {/* OUTRO (VERTICAL) */}
        <Outro ref={outroRef} />
      </div>
    </main>
  );
}
