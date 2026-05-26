"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GlitchReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // initial (sekali)
      gsap.set(textRef.current, {
        opacity: 0,
        y: 24,
        filter: "blur(10px)",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 30%",
        onEnter: play,
        onEnterBack: play,
        onLeave: fadeOut,
        onLeaveBack: fadeOut,
      });

      function play() {
        tlRef.current?.kill();

        const tl = gsap.timeline();
        tlRef.current = tl;

        // === FADE IN ===
        tl.to(textRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        });

        // === LONG GLITCH SEQUENCE ===
        const GLITCH_STEP = 0.22;

        tl.to(
          textRef.current,
          {
            textShadow:
              "4px 0 0 rgba(255,0,0,0.7), -4px 0 0 rgba(0,255,255,0.7)",
            duration: GLITCH_STEP,
            ease: "none",
          },
          "+=0.05",
        )
          .to(textRef.current, {
            textShadow:
              "-3px 0 0 rgba(255,0,0,0.6), 3px 0 0 rgba(0,255,255,0.6)",
            duration: GLITCH_STEP,
          })
          .to(textRef.current, {
            textShadow:
              "5px 0 0 rgba(255,0,0,0.8), -5px 0 0 rgba(0,255,255,0.8)",
            duration: GLITCH_STEP,
          })
          .to(textRef.current, {
            textShadow:
              "-2px 0 0 rgba(255,0,0,0.5), 2px 0 0 rgba(0,255,255,0.5)",
            duration: GLITCH_STEP,
          })
          .to(textRef.current, {
            textShadow:
              "3px 0 0 rgba(255,0,0,0.4), -3px 0 0 rgba(0,255,255,0.4)",
            duration: GLITCH_STEP,
          })
          .to(textRef.current, {
            textShadow: "none",
            duration: 0.35,
            ease: "power2.out",
          });

        // === SOFT FLICKER (LEBIH KONTROL) ===
        tl.to(
          textRef.current,
          {
            opacity: 0.85,
            duration: 0.08,
            repeat: 2,
            yoyo: true,
            ease: "none",
          },
          "<",
        );
      }

      function fadeOut() {
        tlRef.current?.kill();

        // fade out RINGAN, bukan ilang
        gsap.to(textRef.current, {
          opacity: 0.2,
          filter: "blur(4px)",
          duration: 0.45,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div ref={textRef}>{children}</div>
    </div>
  );
}
