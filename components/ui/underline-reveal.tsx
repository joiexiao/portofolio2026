"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UnderlineRevealProps {
  children: ReactNode;
  className?: string;
  parallaxSpeed?: number;
}

export function UnderlineReveal({
  children,
  className = "",
  parallaxSpeed = 0.3,
}: UnderlineRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top -20%",
          toggleActions: "play reverse play reverse",
        },
      });

      // center-out reveal
      tl.fromTo(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "center center",
        },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.out",
        },
      );

      // subtle parallax
      gsap.to(lineRef.current, {
        yPercent: -20 * parallaxSpeed,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [parallaxSpeed]);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* underline */}
      <span
        ref={lineRef}
        className="absolute left-0 right-0"
        style={{
          height: "2px",
          bottom: "-0.2em",
          transform: "scaleX(0)",
          transformOrigin: "center center",
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              oklch(0.82 0.09 255) 14%,
              oklch(0.82 0.09 255) 86%,
              transparent 100%
            )
          `,
          filter: "blur(0.35px)",
          opacity: 0.95,
        }}
      />

      {/* glow */}
      <span
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: "6px",
          bottom: "-0.35em",
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              oklch(0.82 0.09 255 / 0.35) 22%,
              oklch(0.82 0.09 255 / 0.35) 78%,
              transparent 100%
            )
          `,
          filter: "blur(8px)",
        }}
      />

      {/* text */}
      <span className="relative z-10">{children}</span>
    </span>
  );
}
